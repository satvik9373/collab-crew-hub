import {
    Wistia
} from 'wistia_namespace.js';
import {
    root
} from 'utilities/root.js';
import {
    hasPerformanceMeasureSupport
} from './performance.ts';

const na = navigator.userAgent;

// ua regexes taken from http://code.jquery.com/jquery-1.6.4.js
const rwebkit = /(webkit)[ /]([^\s]+)/i;
const ropera = /OPR\/([^\s]+)/i;
const redge = /(edge)\/(\d+(?:\.\d+)?)/i;
const rmozilla = /(mozilla)(?:.*? rv:([^\s)]+))?/i;

// special platform regexes
const randroid = /(android) ([^;]+)/i;
const riphone = /(iphone)/i;
const ripad = /(ipad)/i;
const rwinphone = /(Windows Phone OS (\d+(?:\.\d+)?))/;
const rios = /OS (\d+)_(\d+)/i;
const rps3 = /(playstation 3)/i;
const rblackberry = /BlackBerry|BB10/i;
const rfirefox = /(firefox)/i;
const rgearvr = /Mobile VR/i;

// Apple keeps their Safari version the same as their iOS version
// (with the exception being that they occasionally release the new safari
// slightly before the new iOS is available)
const riosVersion = /Version\/([^\s]+)/i;

const browser = () => {
    return (browserMatch()[1] || 'webkit').toLowerCase();
};

const browserVersion = () => {
    return browserMatch()[2];
};

const browserMatch = () => {
    let match;

    match = na.match(redge);
    if (match) {
        return match;
    }

    match = na.match(rwebkit);
    if (match) {
        return match;
    }

    match = na.match(ropera);
    if (match) {
        return match;
    }

    if (match) {
        if (document.documentMode != null) {
            match[2] = document.documentMode;
        }
        return match;
    }

    match = na.match(rmozilla);
    if (match) {
        return match;
    }

    return [];
};

// return false if not android, version info if android
const android = () => {
    const matches = na.match(randroid);
    if (matches == null) {
        return false;
    }
    return {
        version: matches[2]
    };
};

const oldandroid = () => {
    return android() && parseFloat(android().version) < 4.1;
};

const iphone = () => {
    return riphone.test(na);
};

const touchScreen = () => {
    return iosVersion() > 0 || android() || ipad();
};

const hoverIsNatural = () => {
    // The (hover: hover) query matches when two conditions are met:
    //
    // 1. hover is supported
    // 2. hover is easy to access for the user based on their primary input device
    //
    // So for example, when the user’s primary input is touch, this returns false
    // even though hover interactions are technically supported.
    //
    // If matchMedia is unsupported or the hover query is unsupported, we fall
    // back on returning the heuristic check for iOS or Android. If it is true,
    // we assume hover is not natural. This can produce false negatives and false
    // positives, but most agents support the hover query.
    //
    // This is an alternative to using touchScreen() when deciding whether to
    // attach enter/leave mouse event handlers based on hover capability.

    try {
        const mediaQueryList = matchMedia('(hover:hover)');

        if (mediaQueryList.media !== 'not all') {
            return mediaQueryList.matches;
        }
    } catch (err) {
        // feature detection: swallow errors.
    }

    return !touchScreen();
};

const blackberry = () => {
    return rblackberry.test(na);
};

const retina = () => {
    return root.devicePixelRatio != null && root.devicePixelRatio > 1;
};

const ipad = () => {
    return (
        /Macintosh/i.test(navigator.userAgent) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1
    );
};

const safari = () => {
    return rwebkit.test(na) && !/chrome/i.test(na) && !ipad() && !iphone();
};

const amazonSilk = () => {
    if (/Silk/.test(na)) {
        return {
            version: silkVersion()
        };
    }

    return false;
};

const chrome = () => {
    if (/Chrome/.test(na) && /Google Inc/.test(navigator.vendor)) {
        return {
            version: chromeVersion()
        };
    }
    return false;
};

const silkVersion = () => {
    const match = na.match(/\bSilk\/([^\s]+)/);
    return match && match[1];
};

const chromeVersion = () => {
    const match = na.match(/\bChrome\/([^\s]+)/);
    return match && match[1];
};

const opera = () => {
    return ropera.test(na);
};

const iosVersion = () => {
    const iosMatch = na.match(rios);
    const versionMatch = na.match(riosVersion);

    if (iosMatch != null) {
        return parseFloat(`${iosMatch[1]}.${iosMatch[2]}`);
    }
    if (versionMatch != null && versionMatch[1] && ipad()) {
        // to get the version of an ipad that is reporting as a Mac in its
        // user agent, we can rely on the Version part of the ua to be
        // fairly certain
        return parseFloat(versionMatch[1]);
    }
    return 0;
};

const windowsPhone = () => {
    return rwinphone.test(na);
};

const ps3 = () => {
    return rps3.test(na);
};

const edge = () => {
    return redge.test(na);
};

const firefox = () => {
    return rfirefox.test(na);
};

const gearvr = () => {
    return rgearvr.test(na);
};

const windows = () => {
    return /win/i.test(navigator.platform);
};

const mac = () => {
    return /mac/i.test(navigator.platform);
};

const linux = () => {
    return /linux/i.test(navigator.platform);
};

// modified slightly from http://www.modernizr.com/downloads/modernizr-2.0.6.js
const html5Video = () => {
    const elem = document.createElement('video');
    let result = false;

    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
    try {
        if (elem.canPlayType) {
            result = {};
            // Workaround required for IE9, which doesn't report video support without audio codec specified.
            // bug 599718 @ msft connect
            const h264 = 'video/mp4; codecs="avc1.42E01E';
            result.h264 = !!elem.canPlayType(`${h264}"`) || !!elem.canPlayType(`${h264}, mp4a.40.2"`);
            result.webm = !!elem.canPlayType('video/webm; codecs="vp9, vorbis"');
            result.nativeHls = !!elem.canPlayType('application/vnd.apple.mpegURL');
        }
    } catch (e) {
        result = {
            ogg: false,
            h264: false,
            webm: false,
            nativeHls: false,
        };
    }
    return result;
};

const mediaSource = () => {
    const h264 = 'video/mp4; codecs="avc1.42E01E';
    return root.MediaSource && root.MediaSource.isTypeSupported(`${h264}, mp4a.40.2"`);
};

const nativeHls = () => {
    return (iphone() || ipad() || safari()) && html5Video().nativeHls;
};

const localStorage = () => {
    try {
        return 'localStorage' in root && root.localStorage != null;
    } catch (e) {
        return false;
    }
};

const json = () => {
    return !!(root.JSON && typeof JSON.parse === 'function');
};

const backgroundSize = () => {
    const testEl = document.createElement('div');
    return (
        testEl.style.backgroundSize === '' ||
        testEl.style.webkitBackgroundSize === '' ||
        testEl.style.mozBackgroundSize === '' ||
        testEl.style.oBackgroundSize === ''
    );
};

const fullscreenEnabled = () => {
    return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
    );
};

const browserPrefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
const mutationObserver = () => {
    for (let i = 0; i < browserPrefixes.length; i++) {
        let prefix = browserPrefixes[i];
        let prop = `${prefix}MutationObserver`;
        if (root[prop]) {
            return prop;
        }
    }
    return null;
};

const vulcanSupport = () => {
    const modernBrowser = /webkit|mozilla|edge/.test(browser());
    return Boolean(!iphone() &&
        !ipad() &&
        !android() &&
        !blackberry() &&
        modernBrowser &&
        html5Video().h264 &&
        Object.defineProperties,
    );
};

let isPassiveSupported;
const passiveSupported = () => {
    if (isPassiveSupported != null) {
        return isPassiveSupported;
    }
    try {
        const options = Object.defineProperty({}, 'passive', {
            /* eslint-disable-next-line getter-return */
            get() {
                isPassiveSupported = true;
            },
        });

        window.addEventListener('test', null, options);
    } catch (err) {
        isPassiveSupported = false;
    }
    return isPassiveSupported;
};

export const callingPlayRequiresEventContext = () => {
    return iosVersion() > 0 || android() || safari();
};

// https://caniuse.com/#search=webp
// use user-agent for browser and version webp detection
// we're opting for this over a feature detection mechanism so that our detection
// can be as fast and synchronous as possible. Doing an async feature detection
// occasionally resulted in false negatives.
export const webp = () => {
    const chromeBrowser = chrome();
    const firefoxBrowser = firefox();
    const edgeBrowser = edge();
    const operaBrowser = opera();

    const isChromeDesktopSupported = chromeBrowser && browserVersion() >= 32;
    const isChromeAndroidSupported = chromeBrowser && browserVersion() >= 75 && android();
    const isFirefoxDesktopSupported = firefoxBrowser && browserVersion() >= 65;
    const isFirefoxAndroidSupported = firefoxBrowser && browserVersion() >= 67 && android();
    const isEdgeSupported = edgeBrowser && browserVersion() >= 18;
    const isOperaSupported = operaBrowser && browserVersion() >= 19;

    return (
        isChromeDesktopSupported ||
        isChromeAndroidSupported ||
        isFirefoxDesktopSupported ||
        isFirefoxAndroidSupported ||
        isEdgeSupported ||
        isOperaSupported
    );
};

export const cachedDetect = () => {
    if (Wistia._detectCache) {
        // Allow this to be cached globally so it's not executed once every time
        // it's imported.
        return Wistia._detectCache;
    }

    Wistia._detectCache = uncachedDetect();
    return Wistia._detectCache;
};

export const uncachedDetect = () => {
    const result = {
        amazonSilk: amazonSilk(),
        browser: {
            version: browserVersion(),
        },
        edge: edge(),
        firefox: firefox(),
        gearvr: gearvr(),
        android: android(),
        oldandroid: oldandroid(),
        iphone: iphone(),
        ipad: ipad(),
        blackberry: blackberry(),
        safari: safari(),
        chrome: chrome(),
        opera: opera(),
        winphone: {
            version: windowsPhone()[2]
        },
        ios: {
            version: iosVersion()
        },
        windows: windows(),
        mac: mac(),
        linux: linux(),
        retina: retina(),
        hoverIsNatural: hoverIsNatural(),
        touchScreen: touchScreen(),
        ps3: ps3(),
        video: html5Video(),
        mediaSource: mediaSource(),
        nativeHls: nativeHls(),
        localstorage: localStorage(),
        json: json(),
        backgroundSize: backgroundSize(),
        fullscreenEnabled: fullscreenEnabled(),
        vulcanSupport: vulcanSupport(),
        mutationObserver: mutationObserver(),
        callingPlayRequiresEventContext: callingPlayRequiresEventContext(),
        passiveSupported: passiveSupported(),
        webp: webp(),
        performanceMeasure: hasPerformanceMeasureSupport(),
    };

    result.browser[browser()] = true;

    return result;
};

export const clearDetectCache = () => {
    Wistia._detectCache = null;
};

// Starting a migration away from cachedDetect in the wistia-player web component
// Based on https://github.com/wistia/player-modern/blob/main/docs/ifaq.md#whats-the-deal-with-cacheddetect-and-why-do-we-also-assign-the-result-of-it
export const detectIsMobile = () => {
    const isAndroid = android();
    const isIPad = ipad();
    const isIPhone = iphone();

    return isAndroid || isIPad || isIPhone;
};