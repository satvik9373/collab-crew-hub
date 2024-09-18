import {
    Wistia
} from 'wistia_namespace.js';
import {
    assign
} from 'utilities/assign.js';
import {
    pageLoaded
} from 'utilities/pageLoaded.js';
import {
    isVisitorTrackingEnabled
} from 'utilities/trackingConsentApi.js';
import {
    metricsHost
} from './hosts.js';

if (Wistia._simpleMetricsCache == null) {
    Wistia._simpleMetricsCache = {};
}

if (Wistia._simpleMetricsDebounceInterval == null) {
    Wistia._simpleMetricsDebounceInterval = 500;
}

const METRICS_CACHE = Wistia._simpleMetricsCache;

export const countMetric = (key, val = 1, extraData = {}) => {
    return sendMetric('count', key, val, extraData);
};

export const sendMetrics = (...messages) => {
    if (!isVisitorTrackingEnabled()) {
        return;
    }
    const url = `https://${metricsHost()}/mput?topic=metrics`;
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: messages.join('\n'),
        })
        .then((response) => {
            if (!response.ok) {
                // If fetch returns a response with an HTTP error code,
                // print an error in the console
                console.error(response);
            }
        })
        .catch((reason) => {
            // If fetch fails (such as when this URL is blocked by an ad blocking extension),
            // print an error in the console
            console.error(reason);
        });
};

export const sampleMetric = (key, val, extraData) => {
    return sendMetric('sample', key, val, extraData);
};

const getCircularReplacer = () => {
    // form a closure and use this
    // weakset to monitor object reference.
    const seen = new WeakSet();

    // return the replacer function
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    };
};

export const sendMetric = (type, key, val, extraData = {}) => {
    if (!isVisitorTrackingEnabled()) {
        return;
    }
    try {
        if (METRICS_CACHE.toMput == null) {
            METRICS_CACHE.toMput = [];
        }

        const messageObj = assign({
                type,
                key,
                value: val != null ? val : null,
            },
            extraData,
        );

        const serialized = JSON.stringify(messageObj, getCircularReplacer());
        METRICS_CACHE.toMput.push(serialized);

        clearTimeout(Wistia._msendTimeout);
        Wistia._msendTimeout = setTimeout(() => {
            pageLoaded(() => {
                sendMetrics.apply(this, METRICS_CACHE.toMput);
                METRICS_CACHE.toMput = [];
            });
        }, Wistia._simpleMetricsDebounceInterval);
    } catch (e) {
        console.error(e.message);
        console.error(e.stack);
    }
};

// only used in testing to clear the cache
export const _clearMetricsCache = () => {
    METRICS_CACHE.toMput = [];
};