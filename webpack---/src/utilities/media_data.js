import {
    root
} from 'utilities/root.js';
import {
    Wistia
} from 'wistia_namespace.js';
import {
    merge
} from 'utilities/obj.js';
import {
    wlog
} from 'utilities/wlog.js';
import {
    removeScriptsBySrc
} from 'utilities/script-utils.js';
import {
    cacheMediaData,
    uncacheMediaData,
    getMediaDataFromCache,
} from 'utilities/remote-data-cache.ts';
import {
    eV1Protocol,
    cdnFastWistiaComHost,
    cdnFastWistiaNetHost,
    mediaDataHost,
} from 'utilities/hosts.js';
import {
    mediaDataTransforms
} from 'utilities/media-data-transforms.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';

export const fetchFreshMediaDataJson = (hashedId, options) => {
    const url = mediaDataUrl(hashedId, options);
    return fetch(url)
        .then((response) => response.json())
        .catch((e) => {
            wlog.error('error fetching mediaData', e);
        });
};

/**
 *
 * @param {string} hashedId hashedId string of the media or ab-test
 * @param {Object} options options object - can be `password` or any
 * embed options that will be merged into the mediaData.embedOptions
 * @returns {Promise} Returns a promise containing the `mediaData` object
 */
export const fetchMedia = (hashedId, options = {}) => {
    return new Promise((resolve, reject) => {
        const cachedData = dataFromCache(hashedId, options);
        if (cachedData) {
            wlog.info('fetchMedia', hashedId, 'from local cache', cachedData);
            let chosenMedia = cachedData;

            resolve(cachedData);
        } else {
            wlog.info('fetchMedia', hashedId, 'fetching');
            const url = mediaDataUrl(hashedId, options);
            const newUrl = new window.URL(mediaDataUrl(hashedId, options));
            if (options.password != null) {
                newUrl.searchParams.append('password', options.password);
            }

            fetch(newUrl)
                .then((response) => response.json())
                .then((mediaWithOpts) => {
                    let mediaData = mediaWithOpts;
                    if (mediaWithOpts.error) {
                        wlog.info('fetch', hashedId, 'error', mediaWithOpts);
                        cacheMedia(hashedId, mediaWithOpts);
                    } else {
                        mediaData = transformResponse(mediaWithOpts, options);
                        cacheMedia(hashedId, mediaWithOpts.media);
                    }

                    resolve(mediaData);
                })
                .catch((error) => {
                    wlog.error(`error out fetching ${url}`);
                    // This will be an aggregate of any player loading failures
                    countMetric('player/failure/fetch-media-failed');

                    reject(error);
                });
        }
    });
};

export const transformResponse = (mediaData, options) => {
    const mediaWithOpts = { ...mediaData
    };
    const transformOpts = merge({}, mediaWithOpts.media ? .embedOptions, options);

    if (mediaWithOpts.error) {
        return mediaWithOpts;
    }

    delete mediaWithOpts.media.unnamed_assets;
    mediaDataTransforms(mediaWithOpts.media, transformOpts);
    return mediaWithOpts.media;
};

export const mediaDataUrl = (hashedId, options = {}) => {
    const host = mediaDataHost(options);
    return `${eV1Protocol()}//${host}/embed/medias/${hashedId}.json`;
};

export const mediaDataScriptRegExp = (hashedId) => {
    const protocolMatch = location.protocol === 'https:' ? 'https' : 'https?';
    return new RegExp(
        `^(${protocolMatch}:)?//((${cdnFastWistiaComHost().replace(
      '.',
      '\\.',
    )})|(${cdnFastWistiaNetHost().replace('.', '\\.')}))/embed/medias/${hashedId}\\.jsonp\\??`,
    );
};

export const cacheMedia = (hashedId, data) => {
    return cacheMediaData(hashedId, data);
};

export const uncacheMedia = (hashedId) => {
    uncacheMediaData(hashedId);
    removeSpeedDemonScriptAndData(hashedId);
};

const removeSpeedDemonScriptAndData = (hashedId) => {
    window[`wistiajsonp-/embed/medias/${hashedId}.json`] = null;
    removeScriptsBySrc(mediaDataUrl(hashedId), {
        scriptRegex: mediaDataScriptRegExp(hashedId),
    });
};

export const mediaFromCache = (hashedId) => {
    return dataFromCache(hashedId);
};

const dataFromCache = (hashedId) => {
    const resultFromFetchCache = getMediaDataFromCache(hashedId);
    if (resultFromFetchCache) {
        return resultFromFetchCache;
    }

    const speedDemonData = root[`wistiajsonp-/embed/medias/${hashedId}.json`];
    if (speedDemonData != null && speedDemonData.media) {
        return speedDemonData.media;
    }

    return null;
};