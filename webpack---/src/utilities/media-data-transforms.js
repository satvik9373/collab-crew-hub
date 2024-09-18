import {
    assign
} from 'utilities/obj.js';
import {
    Url
} from 'utilities/url.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    readyPublicOver400
} from './assets.js';

const detect = cachedDetect();

const convertStillImageToWebp = (media) => {
    if (media.assets && detect.webp) {
        media.assets = media.assets.map((asset) => {
            // there was a flow with the uploader + notPlayablePlayer where we have assets
            // but they're not ready and don't have urls, so just double check for that here
            if (asset.type === 'still_image' && Object(asset).url) {
                const url = new Url(asset.url);
                url.ext('webp');
                asset.url = url.absolute();
            }

            return asset;
        });
    }

    return media;
};

const maybeCloneOriginalAsMp4 = (media, options = {}) => {
    if (options.allowOriginalAsMp4 !== true) {
        // only transform if the embed options ask for it
        return media;
    }

    const original = media.assets.filter((a) => a.type === 'original')[0];

    if (readyPublicOver400(media.assets).length > 0) {
        // we have a derivative we can show instead
        return media;
    }

    media.assets = [
        ...media.assets,
        assign({}, original, {
            display_name: `${original.display_name} copy`,
            container: 'mp4',
            codec: 'h264',
            type: 'mp4_video',
        }),
    ];

    return media;
};

export const mediaDataTransforms = (media, options = {}) => {
    let transformedMedia = assign({}, media);

    transformedMedia = maybeCloneOriginalAsMp4(transformedMedia, options);
    transformedMedia = convertStillImageToWebp(transformedMedia);

    return transformedMedia;
};