import {
    filter,
    READY
} from 'utilities/assets.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';

const DEFAULT_QUALITY_MIN = 360;
const DEFAULT_QUALITY_MAX = 2160;

const assetSizeShorthandToNumeric = (size) => {
    if (size === '4k') {
        return 2160;
    }
    // Strings like 1080p will be parsed as 1080
    return parseInt(size, 10);
};

export const inferQualityRangeFromOpts = (opts, mediaData) => {
    if (opts.videoQuality && opts.videoQuality !== 'auto') {
        // Legacy videoQuality option overrides qualityMin and qualityMax

        countMetric('legacy/videoquality-embed-option', 1, {
            videoQuality: opts.videoQuality,
            hashedId: mediaData ? .hashedId,
            url: window.location.href,
        });
        if (opts.videoQuality === 'sd-only') {
            return [200, 360];
        }
        if (opts.videoQuality === 'md') {
            return [540, DEFAULT_QUALITY_MAX];
        }
        if (opts.videoQuality === 'hd-only') {
            return [720, DEFAULT_QUALITY_MAX];
        }
        return [DEFAULT_QUALITY_MIN, DEFAULT_QUALITY_MAX];
    }
    let qualityMin;
    let qualityMax;
    if (opts.qualityMin) {
        qualityMin = assetSizeShorthandToNumeric(opts.qualityMin);
    } else {
        qualityMin = DEFAULT_QUALITY_MIN;
    }
    if (opts.qualityMax) {
        qualityMax = assetSizeShorthandToNumeric(opts.qualityMax);
    } else {
        qualityMax = DEFAULT_QUALITY_MAX;
    }
    return [qualityMin, qualityMax];
};