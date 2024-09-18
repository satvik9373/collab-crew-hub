import {
    elemStyle
} from 'utilities/elem.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    cast,
    merge
} from 'utilities/obj.js';

const detect = cachedDetect();

export const scalingOptionsFromVideo = (video, options) => {
    return merge({
            videoWidth: video.videoWidth(),
            videoHeight: video.videoHeight(),
            isInFullscreen: video.inFullscreen(),
            controlScaling: video.controlScaling(),
        },
        options,
    );
};

export const controlDimensions = (options = {}, baseWidth = 40, baseHeight = 34) => {
    options = merge({
            videoWidth: 640,
            videoHeight: 360,
            isInFullscreen: false,
            baseWidth: baseWidth != null ? baseWidth : 40,
            baseHeight: baseHeight != null ? baseHeight : 34,
        },
        options,
    );
    const multiplier = controlMultiplier(options);
    return {
        width: multiplier * options.baseWidth,
        height: multiplier * options.baseHeight
    };
};

export const bigPlayButtonDimensions = (options, baseWidth, baseHeight) => {
    return controlDimensions(options, baseWidth, baseHeight);
};

// abstracted so this can easily be changed if we wanted.
export const fontSizeMultiplier = (options) => {
    return controlMultiplier(options);
};

export const allowBigControls = (options = {}) => {
    const screenHeight = options.screenHeight || window.screen.height;
    const screenWidth = options.screenWidth || window.screen.width;
    return (
        options.controlScaling != 'auto' ||
        detect.iphone ||
        detect.android ||
        screenWidth < screenHeight
    );
};

export const maxMultiplierForVideo = (options) => {
    if (options.controlScaling != 'auto') {
        return options.controlScaling;
    }

    if (allowBigControls(options)) {
        // the device dimensions are oriented vertically; this is probably a phone
        // or tablet, or just a monitor that would be fine with huge controls.
        return 3.5;
    }
    return 1.4;
};

export const minMultiplierForVideo = (options) => {
    if (options.controlScaling != 'auto') {
        return options.controlScaling;
    }

    if (allowBigControls(options)) {
        // the controls are unusable if we scale down too much for on phones and
        // tablets.
        return 1;
    }
    return 0.75;
};

export const getZoomMultiplier = (options) => {
    if (!options.isInFullscreen) {
        return 1;
    }

    const result = Math.max(1, window.innerWidth / Math.max(screen.width, screen.height));
    return result;
};

export const getDeviceMultiplier = (options) => {
    if (allowBigControls(options)) {
        return 1.4;
    }
    return 1;
};

export const controlMultiplierForVideo = (video, options) => {
    return controlMultiplier(scalingOptionsFromVideo(video, options));
};

export const controlMultiplier = (options) => {
    if (options.controlScaling != 'auto') {
        return options.controlScaling;
    }

    const {
        videoWidth,
        videoHeight
    } = options;
    const zoomMultiplier = getZoomMultiplier(options);
    const largestDimension = Math.max(videoWidth, videoHeight);
    if (largestDimension > 960) {
        const percentOverThreshold = largestDimension / 960;
        const scaleFactor = percentOverThreshold * getDeviceMultiplier(options);
        return Math.min(maxMultiplierForVideo(options) * zoomMultiplier, scaleFactor * zoomMultiplier);
    }
    if (largestDimension < 640) {
        const percentUnderThreshold = largestDimension / 640;
        const scaleFactor = percentUnderThreshold * getDeviceMultiplier(options);
        return Math.max(minMultiplierForVideo(options) * zoomMultiplier, scaleFactor * zoomMultiplier);
    }
    return 1 * getDeviceMultiplier(options);
};

// abstracted so this can easily be changed if we wanted.
export const menuMultiplier = (options) => {
    return Math.max(0.75, controlMultiplier(options));
};

export const fitControl = (options) => {
    const {
        controlId,
        video,
        controlElem
    } = options;
    options = merge({
            videoWidth: video.videoWidth(),
            videoHeight: video.videoHeight(),
            controlScaling: video.controlScaling(),
            isInFullscreen: video.inFullscreen(),
        },
        options,
    );
    const {
        width,
        height
    } = controlDimensions(options);
    elemStyle(controlElem, {
        height: `${height}px`,
        width: `${width}px`,
    });
    tapIcon(`${video.uuid}.${controlId}`, controlElem);
    return {
        width,
        height
    };
};

// Often the svg size changes don't visually change the vertical position of
// the icon. "tapping" it by forcing it to reevaluate the stack is one way to
// fix that.
export const tapIcon = (timeoutPrefix, controlElem) => {
    const svgs = controlElem.getElementsByTagName('svg');
    for (let i = 0; i < svgs.length; i++) {
        ((svg) => {
            doTimeout(
                `${timeoutPrefix}.tap_icon`,
                () => {
                    elemStyle(svg, {
                        position: 'relative'
                    });
                    doTimeout(
                        '#{timeoutPrefix}.tap_icon',
                        () => {
                            elemStyle(svg, {
                                position: ''
                            });
                        },
                        30,
                    );
                },
                30,
            );
        })(svgs[i]);
    }
};

export const parseMetaViewport = () => {
    const metaTag = document.querySelector('meta[name=viewport]');
    const content = metaTag && metaTag.getAttribute('content');
    const result = {};
    if (content) {
        const pairs = content.split(/[\s,]+/);
        pairs.forEach((pair) => {
            const keyAndVal = pair.split('=');
            if (keyAndVal.length === 2) {
                result[keyAndVal[0]] = cast(keyAndVal[1]);
            }
        });
    }
    return result;
};

const normalScaleWidthRange = (media) => {
    const onMobile = detect.iphone || detect.ipad || detect.android;

    if (!onMobile) {
        return [640, 960];
    }

    if (media ? .isAudio()) {
        return [500, 960];
    }

    const viewport = parseMetaViewport();

    let screenWidth;
    if (viewport.width) {
        // Initial render being controled by <meta name='viewport' content='...'/>
        if (typeof viewport.width === 'number') {
            screenWidth = 0 + viewport.width;
        } else {
            screenWidth = screen.width || window.innerWidth;
        }

        // This doesn't capture any scaling the user does after the initial
        // render, but the page designer would expect the video to render at the
        // scale they set.
        const scale = Math.max(
            viewport['minimum-scale'] || 0,
            Math.min(viewport['maximum-scale'] || 10, viewport['initial-scale'] || 1),
        );
        if (scale < 1) {
            screenWidth /= scale;
        }
    } else {
        // Initial render will use the width of the document to determine its
        // size, then zoom out to show the whole page.
        screenWidth = window.innerWidth;
    }

    return [screenWidth, (screenWidth * 2) / 3];
};

export const controlMultiplierBasedOnVideo = (video, normalRange) => {
    const vidWidth = video.videoWidth();
    const [lowerCutoff, upperCutoff] = normalRange || normalScaleWidthRange(video);
    if (vidWidth <= lowerCutoff) {
        return vidWidth / lowerCutoff;
    }
    if (vidWidth > upperCutoff) {
        return vidWidth / upperCutoff;
    }
    return 1;
};

// A more general version of controlMultiplierBasedOnVideo that doesn't require
// a video object.
export const controlMultiplierEstimatedByWidth = (width, normalRange) => {
    const [lowerCutoff, upperCutoff] = normalRange || normalScaleWidthRange();
    if (width <= lowerCutoff) {
        return width / lowerCutoff;
    }
    if (width > upperCutoff) {
        return width / upperCutoff;
    }
    return 1;
};