import {
    eV1HostWithPort
} from 'utilities/hosts.js';

export const bestImage = (images, opts = {}) => {
    const _sortedImages = sortedImages(images);

    if (_sortedImages.length === 0) {
        // If the still failed to process, we might find ourselves going down
        // this path.
        return blankImage(opts.videoWith, opts.videoHeight);
    }

    // When this first loads it's possible that @img will have a width of -1
    // until fit() fully takes hold. This could probably be fixed a better
    // way, but this code is here to ensure that we don't return a bogus
    // bestImage() if that's the case.
    const currentWidth = opts.videoWidth;

    // For sharper screens, let's load up larger images so the thumbnail
    // looks hella sharp
    const desiredWidth = (window.devicePixelRatio || 1) * currentWidth;

    if (desiredWidth <= _sortedImages[0].width) {
        return _sortedImages[0];
    }

    for (let i = 0; i < _sortedImages.length; i++) {
        const image = _sortedImages[i];
        if (image.width >= desiredWidth) {
            return image;
        }
    }

    return _sortedImages[_sortedImages.length - 1];
};

export const blankImage = (videoWidth, videoHeight) => {
    return {
        height: videoHeight,
        url: `https://${eV1HostWithPort()}/assets/images/blank.gif`,
        width: videoWidth,
    };
};

export const sortedImages = (images) => {
    return images.map((image) => {
        image.aspect = image.width / image.height;
        return image;
    });
};