import {
    clipsFromChapters,
    shouldAddKeyMoments,
    shouldAddClipsFromChapters,
    seekToAction,
} from 'utilities/keyMoments.ts';
import {
    cast,
    clone
} from 'utilities/obj.js';
import {
    cdnFastWistiaNetHost
} from 'utilities/hosts.js';
import {
    stillUrl,
    findClosestAssetByQuality,
    readyPublicMp3s,
    readyPublicMp4s,
} from 'utilities/assets.js';
import {
    Url
} from 'utilities/url.js';
import {
    secondsToIso8601Duration
} from './iso8601Helper.ts';
import {
    normalizeChapters
} from './normalizeChapters.ts';

const generateAudioJsonLd = (mediaData, options = {}) => {
    const {
        videoWidth,
        videoHeight
    } = options;
    let {
        embedOptions
    } = options;

    if (!embedOptions) {
        embedOptions = cast(clone(mediaData.embedOptions));
    }

    const obj = {
        '@context': 'http://schema.org/',
        '@id': `https://${cdnFastWistiaNetHost()}/embed/iframe/${mediaData.hashedId}`,
        '@type': 'AudioObject',
        duration: `PT${secondsToIso8601Duration(mediaData.duration)}`,
        name: mediaData.name,
        thumbnailUrl: stillUrl(mediaData.assets, {
            ext: 'jpg',
            protocol: 'https:',
            videoWidth,
            videoHeight,
            embedHost: embedOptions.embedHost,
        }),
        contentUrl: generateContentUrl(mediaData),
        embedUrl: generateEmbedUrl(mediaData, embedOptions),
        uploadDate: new Date(mediaData.createdAt * 1000).toISOString(),
        description: mediaData.seoDescription,
    };

    // multilingual captions should come as array of transcript objects.
    if (mediaData.captions && mediaData.captions[0]) {
        obj.transcript = mediaData.captions[0].text;
    }

    return obj;
};

const generateEmbedUrl = (mediaData, embedOptions) => {
    const baseUrl = `https://${cdnFastWistiaNetHost()}/embed/iframe/${mediaData.hashedId}`;
    // if we're doing SeekToAction for Google KeyMoments AND video thumbnail
    // is enabled, we need to attach a query param so that it is disabled when
    // Google tries to crawl it
    if (
        shouldAddKeyMoments(mediaData, embedOptions) &&
        !shouldAddClipsFromChapters(embedOptions) &&
        mediaData.embedOptions.plugin ? .videoThumbnail
    ) {
        return `${baseUrl}?wseektoaction=true`;
    }
    return baseUrl;
};

// Google has been struggling with Key Moments using our normal iframe pages as the embedUrl
// and have asked us to use a contentUrl with a direct m3u8 asset instead.
const generateContentUrl = (mediaData) => {
    const {
        assets
    } = mediaData;
    if (mediaData.mediaType === 'Audio') {
        return readyPublicMp3s(assets)[0] ? .url;
    }

    const availableMp4s = readyPublicMp4s(assets);
    if (availableMp4s.length === 0) {
        return;
    }

    const highestQuality = findClosestAssetByQuality(availableMp4s, 1080);
    if (!highestQuality) {
        return;
    }
    const url = new Url(highestQuality.url);

    url.ext('m3u8');
    return url.absolute();
};

const generateVideoJsonLd = (mediaData, options = {}) => {
    const {
        videoWidth,
        videoHeight
    } = options;
    let {
        embedOptions
    } = options;

    if (!embedOptions) {
        embedOptions = cast(clone(mediaData.embedOptions));
    }

    const obj = {
        '@context': 'http://schema.org/',
        '@id': `https://${cdnFastWistiaNetHost()}/embed/iframe/${mediaData.hashedId}`,
        '@type': 'VideoObject',
        duration: `PT${secondsToIso8601Duration(mediaData.duration)}`,
        name: mediaData.name,
        thumbnailUrl: stillUrl(mediaData.assets, {
            ext: 'jpg',
            protocol: 'https:',
            videoWidth,
            videoHeight,
            embedHost: embedOptions.embedHost,
        }),
        embedUrl: generateEmbedUrl(mediaData, embedOptions),
        uploadDate: new Date(mediaData.createdAt * 1000).toISOString(),
        description: mediaData.seoDescription,
    };

    // LiveStream Medias should not get content urls as we might not have any video assets available
    if (mediaData.mediaType === 'Video') {
        obj.contentUrl = generateContentUrl(mediaData);
    }

    // multilingual captions should come as array of transcript objects. Like
    // Scar in Lion King, we should Be Prepared!
    if (mediaData.captions && mediaData.captions[0]) {
        obj.transcript = mediaData.captions[0].text;
    }

    if (shouldAddKeyMoments(mediaData, embedOptions)) {
        // keyMoments come in two flavors.
        // A. If we have chapters, then we will manually define the key moments via the "Clip" schema property
        // B. If we don't, we will use the "SeekToAction" property that lets google parse via `wtime`
        if (shouldAddClipsFromChapters(embedOptions)) {
            const chapters = normalizeChapters(embedOptions);
            const chapterList = chapters.chapterList;
            obj.hasPart = clipsFromChapters(chapterList, location.href, mediaData.duration);
        } else {
            obj.potentialAction = seekToAction();
        }
    }

    return obj;
};

export const injectJsonLd = (id, mediaData, options = {}) => {
    let jsonLdObj;

    if (mediaData.mediaType === 'Audio') {
        jsonLdObj = generateAudioJsonLd(mediaData, options);
    } else {
        jsonLdObj = generateVideoJsonLd(mediaData, options);
    }

    const stringified = JSON.stringify(jsonLdObj);
    const jsonLd = document.createElement('script');
    jsonLd.className = 'w-json-ld';
    jsonLd.type = 'application/ld+json';
    jsonLd.innerHTML = stringified;
    jsonLd._wistia = true;
    jsonLd.setAttribute('id', id);
    removeInjectedJsonLd(id);

    const existingScripts = document.querySelectorAll('script.w-json-ld');
    const existingScript = existingScripts[existingScripts.length - 1];
    if (existingScript) {
        // insert JSON-LD after last JSON-LD script we injected.
        existingScript.parentNode.insertBefore(jsonLd, existingScript.nextSibling);
    } else {
        // prepend JSON-LD to head if we don't see any others yet
        document.head.insertBefore(jsonLd, document.head.childNodes[0]);
    }
};

export const removeInjectedJsonLd = (id) => {
    if (!id) {
        return;
    }

    const el = document.getElementById(id);
    if (!el) {
        return;
    }

    el.remove();
};