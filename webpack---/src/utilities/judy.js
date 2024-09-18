import {
    Wistia
} from 'wistia_namespace.js';
import {
    cast,
    clone,
    except,
    getDeep,
    indexOf,
    merge
} from 'utilities/obj.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    count
} from 'utilities/metrics.js';
import {
    setOrGet as wlocalstorage
} from 'utilities/legacyLocalstorage.js';
import {
    root
} from 'utilities/root.js';
import {
    wlog as wlogRaw
} from 'utilities/wlog.js';
import {
    filter,
    READY,
    readyPublicMp4s,
    readyPublicM3u8s,
    readyPublicMp3s,
    nonfailedPublicOver400,
    readyPublicOver400,
} from './assets.js';

const wlog = wlogRaw.getPrefixedFunctions('judy');

const AUTO = 'auto';
const EXTERNAL = 'external';
const HLS_VIDEO = 'hlsVideo';
const HTML5 = 'html5';
const MANUAL_QUALITY_VIDEO = 'manualQualityVideo';
const NATIVE_HLS_VIDEO = 'nativeHlsVideo';
const NOT_PLAYABLE = 'notplayable';
const PASSWORD_PROTECTED = 'passwordprotected';
const SIMPLE_HTML5 = 'simplehtml5';
const TWO_STROKE_VIDEO = 'twoStrokeVideo';
const VULCAN_V2 = 'vulcan-v2';
const SPHERICAL_VIDEO = 'sphericalVideo';
const PLAYERS = [VULCAN_V2, HTML5, SIMPLE_HTML5, EXTERNAL, NOT_PLAYABLE, PASSWORD_PROTECTED];

export const PLUGIN_CONFIGS = {
    notPlayableVideo: {
        on: true,
        initBeforeHasData: true,
        async: false,
        loadWeight: -1,
    },
    vulcanV2Player: {
        on: true,
        initBeforeHasData: false,
        async: false,
        loadWeight: -1,
    },
    hlsVideo: {
        on: true,
        initBeforeHasData: false,
        async: false,
        loadWeight: 0,
    },
    nativeHlsVideo: {
        on: true,
        initBeforeHasData: false,
        async: false,
        loadWeight: 0,
    },
    passwordProtectedVideo: {
        on: true,
        initBeforeHasData: true,
        async: false,
        loadWeight: -1,
    },
    encodingProgress: {
        on: true,
        initBeforeHasData: false,
        async: true,
        loadWeight: 100,
    },
    externalPlayer: {
        on: true,
        initBeforeHasData: false,
        async: false,
        loadWeight: -1,
    },
    html5Player: {
        on: true,
        initBeforeHasData: false,
        async: false,
        loadWeight: -1,
    },
};

export const bestPlayer = (context, mediaData, embedOptions) => {
    const {
        detect,
        logger
    } = context;

    const isSpherical = isSphericalVideo({
        mediaData,
        options: embedOptions
    }, detect);

    if (detect.oldandroid) {
        logger.info('external on old android');
        return EXTERNAL;
    }
    if (canUsePlayer(context, VULCAN_V2, mediaData)) {
        logger.info('default, ret', VULCAN_V2);
        return VULCAN_V2;
    }
    if (mediaData.mediaType === 'Audio' || mediaData.mediaType === 'LiveStream') {
        // audio and lives are only supported with vulcan_v2
        return VULCAN_V2;
    }
    if (canUsePlayer(context, HTML5, mediaData)) {
        logger.info('default, ret', HTML5);
        return HTML5;
    }
    logger.info('nothing left, use', EXTERNAL);
    // Everything supports external, but nobody likes it. It's just an image
    // and a link to an mp4 file.
    return EXTERNAL;
};

export const bestUsableEngine = (context, mediaData, options = {}) => {
    const {
        detect,
        logger
    } = context;
    logger.info('bestUsableEngineClass');
    const allowHls = shouldServeHls(context, mediaData, options);

    const isSpherical = isSphericalVideo({
            mediaData,
            options,
        },
        detect,
    );

    if (options.engine) {
        return options.engine;
    }

    if (isSpherical) {
        logger.info(SPHERICAL_VIDEO);
        return 'engines/spherical_video.js';
    }

    if (mediaData.mediaType === 'Audio') {
        return 'engines/simple_audio.js';
    }

    if (isTwoStrokeVideo(mediaData)) {
        logger.info(TWO_STROKE_VIDEO);
        return 'engines/two_stroke_video.js';
    }

    if (options.secondaryVideoUrl) {
        logger.info(TWO_STROKE_VIDEO);
        return 'engines/two_stroke_video.js';
    }

    if (allowHls && detect.nativeHls) {
        logger.info(NATIVE_HLS_VIDEO);
        return 'engines/native_hls_video.js';
    }

    if (allowHls) {
        logger.info(HLS_VIDEO);
        return 'engines/hls_video.js';
    }

    logger.info(MANUAL_QUALITY_VIDEO);
    return 'engines/manual_quality_video.js';
};

// Given a media data blob and options--and assuming all engine scripts have
// been loaded--return the engine class that we should initialize.
export const bestUsableEngineClass = (context, mediaData, options = {}) => {
    const {
        detect,
        logger
    } = context;
    logger.info('bestUsableEngineClass');
    const allowHls = shouldServeHls(context, mediaData, options);

    const engines = Wistia.engines || {};

    if (mediaData.mediaType === 'Audio') {
        return engines.SimpleAudio;
    }

    if (isTwoStrokeVideo(mediaData) && engines.TwoStrokeVideo) {
        logger.info(TWO_STROKE_VIDEO);
        return engines.TwoStrokeVideo;
    }

    if (options.secondaryVideoUrl && engines.TwoStrokeVideo) {
        logger.info(TWO_STROKE_VIDEO);
        return engines.TwoStrokeVideo;
    }

    if (allowHls && detect.nativeHls && engines.NativeHlsVideo) {
        logger.info(NATIVE_HLS_VIDEO);
        return engines.NativeHlsVideo;
    }

    if (allowHls && engines.HlsVideo) {
        logger.info(HLS_VIDEO);
        return engines.HlsVideo;
    }

    logger.info(MANUAL_QUALITY_VIDEO);
    return engines.ManualQualityVideo;
};

export const buildContext = (overrides = {}) => {
    const pageUrl = contextUrl(overrides);
    return { ...getDefaultContext(),
        ...overrides,
        pageUrl
    };
};

export const canPlayInline = (context) => {
    const {
        detect
    } = context;
    return detect.android || detect.ios.version >= 10;
};

export const canUsePlayer = (context, player, mediaData) => {
    return isSupportedPlayer(context, player) && hasAssetsForPlayer(context, player, mediaData);
};

export const choosePlayer = (context, mediaData, embedOptions) => {
    const {
        detect
    } = context;
    const {
        logger
    } = context;
    let {
        playerForce
    } = embedOptions;

    logger.info('choosePlayer input', mediaData.hashedId);

    // This can be falsey if there is no specific player preference. Users may
    // also pass in "auto" to be explicit, which means there should be no
    // preference.
    let playerPreference = determinePlayerPreferenceFromInput(context, mediaData, embedOptions);

    // Loudly error but don't die if given invalid input.
    if (playerForce && !isValidPlayer(context, playerForce)) {
        logger.error(`Invalid playerForce option: "${playerForce}", ignoring`);
        playerForce = null;
    }
    if (playerPreference && playerPreference !== AUTO && !isValidPlayer(context, playerPreference)) {
        logger.error(`Invalid playerPreference option: "${playerPreference}", ignoring`);
        playerPreference = AUTO;
    }

    logger.info('playerPreference is', playerPreference);

    if (playerForce) {
        // This is really only used when testing.
        logger.info('"playerForce" used, return', playerForce);
        return playerForce;
    }
    if (isPasswordProtected(context, embedOptions)) {
        // the video is marked as being password protected. it's expected that the
        // password protected player, upon a successful password entry, changes an
        // option and is replaced such that isPasswordProtected() returns false.
        logger.info('return', PASSWORD_PROTECTED);
        return PASSWORD_PROTECTED;
    }
    if (isNotPlayable(context, mediaData, embedOptions)) {
        // 1. We can generate embed codes before a video can actually be played. If we
        //    can't field any kind of player, we want to embed NOT_PLAYABLE instead,
        //    which shows upload and encoding progress, then re-embeds as a "real"
        //    player once it reaches 100%.
        // 2. DRM-lite customers must include their `authorization` credentials as embedOptions. If we know
        //    a media is "protected", but there are no authorization credentials for the embed, we can build
        //    directly into the NotPlayablePlayer state.
        // 3. DRM-lite customers that either do not have HLS enabled or cannot use HLS
        //    will reach a NOT_PLAYABLE state.
        logger.info('return', NOT_PLAYABLE);
        return NOT_PLAYABLE;
    }

    // DRM-lite medias are marked as "protected". And those medias must be played back using our
    // VULCAN_V2 player.
    if (mediaData.protected) {
        return VULCAN_V2;
    }

    if (playerPreference !== AUTO && canUsePlayer(context, playerPreference, mediaData)) {
        const isSpherical = isSphericalVideo({
            mediaData,
            options: embedOptions
        }, detect);
        if (playerPreference !== VULCAN_V2 && isSpherical) {
            logger.info("this player doesn't support spherical, return", VULCAN_V2);
            return VULCAN_V2;
        }
        // Hooray! The customer has chosen a preference that we can actually use.
        // Let's use it.
        logger.info('"playerPreference" used, return', playerPreference);
        return playerPreference;
    }
    // Okay, we are not being compelled to use any particular player. Choose
    // the best one that we can support.
    logger.info('choosing player with no preference');
    return bestPlayer(context, mediaData, embedOptions);
};

// return the url to use for building up the Judy context.
const contextUrl = (opts = {}) => {
    if (opts.pageUrl) {
        return opts.pageUrl;
    }

    if (Object(window.FreshUrl).originalUrl) {
        return window.FreshUrl.originalUrl;
    }

    if (window.top === window.self) {
        return location.href || '';
    }

    return document.referrer || '';
};

export const determinePlayerPreferenceFromInput = (context, mediaData, embedOptions) => {
    // platformPreference is a legacy option. It used to have difference
    // semantics as playerPreference, but let's treat it the same now.
    const playerPreference = embedOptions.playerPreference || embedOptions.platformPreference;

    if (playerPreference && playerPreference !== AUTO) {
        if (playerPreference === HTML5) {
            if (isMobile(context)) {
                return HTML5;
            }
            return VULCAN_V2;
        }
        if (playerPreference === SIMPLE_HTML5) {
            // Because "html5" is an overloaded term on desktop, we add this other one
            // so we can more easily test the simple/mobile html5 player.
            return HTML5;
        }
        return playerPreference;
    }
    // no preference was specified
    return AUTO;
};

// the browser can support hlsjs or native HLS
export const doesBrowserSupportHlsTools = (detect) => {
    const hasPromise = Boolean(window.Promise);

    return (detect.mediaSource || detect.nativeHls) && hasPromise;
};

// Given a media data blob and options, return _all_ engines and sub-engines
// that will need to be loaded. This is how we determine which scripts to load.
export const enginesToLoad = (context, mediaData, options = {}) => {
    const {
        detect,
        logger
    } = context;
    let engineNames = [];

    logger.info('enginesToLoad');

    const allowHls = shouldServeHls(context, mediaData, options);
    if (allowHls && detect.nativeHls) {
        logger.info(NATIVE_HLS_VIDEO);
        engineNames.push(NATIVE_HLS_VIDEO);
    } else if (allowHls) {
        logger.info(HLS_VIDEO);
        engineNames.push(HLS_VIDEO);
    } else {
        logger.info(MANUAL_QUALITY_VIDEO);
        engineNames.push(MANUAL_QUALITY_VIDEO);
    }

    const isSpherical = isSphericalVideo({
        mediaData,
        options
    }, detect);

    if (isSpherical) {
        engineNames.push(SPHERICAL_VIDEO);
        logger.info(SPHERICAL_VIDEO);
    }

    if (isTwoStrokeVideo(mediaData)) {
        logger.info(TWO_STROKE_VIDEO);
        engineNames.push(TWO_STROKE_VIDEO);

        // recursively add more engines based on the secondaryMediaData option.
        const secondaryOptions = except(options, ['twoStroke']);
        const secondaryMediaData = mediaData.secondaryMediaData;
        const secondaryEnginesToLoad = enginesToLoad(context, secondaryMediaData, secondaryOptions);
        engineNames = engineNames.concat(secondaryEnginesToLoad);
    } else if (options.secondaryVideoUrl) {
        logger.info('secondaryVideoUrl', TWO_STROKE_VIDEO);
        engineNames.push(TWO_STROKE_VIDEO);
    }

    // Make sure engine names are unique in this array.
    const tmpHash = {};
    engineNames.forEach((engineName) => {
        tmpHash[engineName] = true;
    });
    const result = [];
    for (let engineName in tmpHash) {
        result.push(engineName);
    }

    return result;
};

let cachedDefaultContext;
export const getDefaultContext = () => {
    if (cachedDefaultContext) {
        return cachedDefaultContext;
    }

    cachedDefaultContext = {
        detect: clone(cachedDetect()),
        inIframe: top !== self,
        location: window.location,
        logger: wlog,
        pageUrl: location.href,
        silenceGlobalWarnings: root.wistiaSilenceGlobalWarnings,
        userAgent: navigator.userAgent,
    };

    return cachedDefaultContext;
};

const getPluginConfig = (context, pluginName) => {
    const result = {};
    result[pluginName] = PLUGIN_CONFIGS[pluginName];
    return result;
};

const canUseInstantHls = (context, mediaData, embedOptions = {}) => {
    return (
        embedOptions.instantHls !== false &&
        mediaData.instantHlsAssetsReady &&
        shouldServeHls(context, mediaData, embedOptions)
    );
};

export const hasAssetsForPlayer = (context, player, mediaData) => {
    if (!isValidPlayer(context, player)) {
        return false;
    }

    if (player === NOT_PLAYABLE || player === PASSWORD_PROTECTED) {
        // No special asset requirements for these.
        return true;
    }

    const {
        assets
    } = mediaData;

    if (player === VULCAN_V2) {
        return (
            canUseInstantHls(context, mediaData) ||
            hasReadyVideoAssets(assets) ||
            hasReadyAudioAssets(assets)
        );
    }
    if (player === HTML5) {
        return readyPublicMp4s(assets).length > 0;
    }
    if (player === EXTERNAL) {
        return readyPublicMp4s(assets).length > 0;
    }
    throw new Error(`Unhandled player type '${player}'`);
};

const hasReadyVideoAssets = (assets) => {
    return readyPublicMp4s(assets).length > 0 || readyPublicM3u8s(assets).length > 0;
};

const hasReadyAudioAssets = (assets) => {
    return readyPublicMp3s(assets).length > 0;
};

export const hasEnoughReadyMp4Assets = (assets) => {
    const mp4Assets = filter(assets, {
        container: 'mp4',
        metadata: (m) => {
            return m && m.max_bitrate;
        },
        public: true,
        sortBy: 'width desc',
        status: READY,
        type: /\b(?!captioned_video)\S+/, // no burned in captions
    });

    // ensure that we have at least one asset at or above 400 width. This prevents
    // using HLS from using too low quality an asset, say in the scenario where
    // the other assets are still being processed.
    const hasAssetWithBitRateAndSize = Boolean(mp4Assets[0] && mp4Assets[0].width >= 400);
    return hasAssetWithBitRateAndSize;
};

export const hasSupportedHlsAssets = (mediaData, options = {}) => {
    if (options.instantHls !== false && mediaData.instantHlsAssetsReady) {
        return true;
    }
    const hasAssets = hasEnoughReadyMp4Assets(mediaData.assets);
    if (!hasAssets) {
        count('player/originV2/media-has-no-metadata', 1, {
            hashedId: mediaData.hashedId
        });
    }
    return hasAssets;
};

const hlsOverrideValue = ({
    pageUrl
}, embedOptions) => {
    const paramVal = hlsQueryParamValue(pageUrl);
    if (paramVal != null) {
        return paramVal;
    }

    const localStorageVal = wlocalstorage('forceHls');
    if (localStorageVal != null) {
        return localStorageVal;
    }

    return embedOptions.hls;
};

const hlsQueryParamValue = (pageUrl) => {
    const match = pageUrl && pageUrl.match && pageUrl.match(/[&?]whls=([^&]+)/);
    const val = match && match[1];
    if (val != null) {
        return cast(val);
    }
    return null;
};

// Chromecast doesn't work with hlsjs because it only understands a src
// that can be referenced externally. And playsinline=false or
// nativeMode=true is our signal to use something close to a native player.
export const isBrowserInNativeAndroid = (detect, embedOptions) => {
    return detect.android && (embedOptions.playsinline === false || embedOptions.nativeMode === true);
};

// chrome 49 and earlier (the last supported version on Win XP/Vista) does
// not support MSE well enough for hls.js.
export const isBrowserOldChrome = (detect) => {
    return detect.chrome && parseInt(detect.chrome.version, 10) < 50;
};

export const isHlsEnabled = (context, mediaData, embedOptions) => {
    // always prefer the hls override value if it is present, regardless of the
    // hls_enabled value
    const overrideValue = hlsOverrideValue(context, embedOptions);
    if (overrideValue === true || overrideValue === false) {
        return overrideValue;
    }

    if (mediaData.hls_enabled === false) {
        return false;
    }
    return true;
};

export const isMobile = ({
    detect
}) => {
    return detect.iphone || detect.ipad || detect.android;
};

export const isNotPlayable = (context, mediaData, embedOptions = {}) => {
    const {
        assets
    } = mediaData;

    if (!mediaData.protected && canUseInstantHls(context, mediaData, embedOptions)) {
        return false;
    }

    const assetsArentReady =
        mediaData.type === 'Audio' ?
        readyPublicMp3s(assets).length == 0 :
        readyPublicMp4s(assets).length == 0;

    // LiveStreams won't have ready assets, but that does not mean we're in an
    // unplayable position.
    if (mediaData.mediaType === 'LiveStream') {
        return false;
    }

    // DRM-lite authorization check!
    // For DRM-lite, customers must include their `authorization` credentials as embedOptions. If we know
    // a media is "protected", but there are no authorization credentials for the embed, we can build
    // directly into the NotPlayablePlayer state.
    if (mediaData.protected && !embedOptions.authorization ? .jwt) {
        embedOptions.notPlayableOptions = {
            fadeIn: false,
            message: 'This video is set to private.',
            shouldRefresh: false,
        };

        return true;
    }

    const allowHls = shouldServeHls(context, mediaData, embedOptions);
    if (mediaData.protected && allowHls === false) {
        embedOptions.notPlayableOptions = {
            fadeIn: false,
            message: 'This video is not playable.',
            shouldRefresh: false,
        };

        return true;
    }

    return (
        assets.length === 0 ||
        (assets.length === 1 && assets[0].type === 'original') ||
        assetsArentReady ||
        (nonfailedPublicOver400(assets).length > 0 && readyPublicOver400(assets).length === 0) ||
        (isTwoStrokeVideo(mediaData) && isNotPlayable(context, mediaData.secondaryMediaData))
    );
};

export const isPasswordProtected = (context, embedOptions) => {
    const pluginOpts = getDeep(embedOptions, 'plugin.passwordProtectedVideo');
    return pluginOpts != null && pluginOpts.on !== false;
};

const isSphericalVideo = (mediaInfo = {}) => {
    if (mediaInfo.options.overrideSpherical) {
        return false;
    }

    const mediaDataSpherical = String(mediaInfo.mediaData ? .spherical);
    const optsSpherical = String(mediaInfo.opts ? .spherical);

    return mediaDataSpherical === 'true' || optsSpherical === 'true';
};

export const isSupportedPlayer = (context, player) => {
    if (!isValidPlayer(context, player)) {
        return false;
    }
    return indexOf(supportedPlayers(context), player) >= 0;
};

const isTwoStrokeVideo = (mediaData) => {
    return !!mediaData.secondaryMediaData;
};

export const isValidPlayer = (context, player) => {
    return indexOf(PLAYERS, player) >= 0;
};

export const logWarnings = (context) => {
    const {
        detect,
        userAgent,
        logger,
        silenceGlobalWarnings
    } = context;

    if (silenceGlobalWarnings) {
        // Customers can set window.wistiaSilenceGlobalWarnings = true, and that
        // will be included in the default judy context.
        return;
    }

    const isHeadless = /phantomjs/i.test(userAgent);
    if (xhrHasBeenTamperedWith()) {
        if (!isHeadless) {
            logger.error(
                'The XMLHttpRequest constructor has been tampered with. Because this affects CORS/Range XHR requests, HLS playback has been disabled. To enable HLS playback and other important features, please remove code that changes the definition of window.XMLHttpRequest.',
            );
        }
    }

    if (urlHasBeenTamperedWith()) {
        if (detect.mediaSource && !isHeadless) {
            logger.error(
                'window.URL.createObjectURL has been tampered with. Because this affects use of Media Source Extensions, HLS playback has been disabled. window.URL is a browser API that should not be clobbered. Its current value is:',
                window.URL,
            );
        }
    }
};

export const playerPlugins = (context, player, mediaData, embedOptions) => {
    const {
        logger
    } = context;
    const plugins = {};

    logger.info('playerPlugins input', player, mediaData.hashedId, mediaData, embedOptions);

    if (player === NOT_PLAYABLE) {
        merge(plugins, getPluginConfig(context, 'notPlayableVideo'));
    } else if (player === PASSWORD_PROTECTED) {
        merge(plugins, getPluginConfig(context, 'passwordProtectedVideo'));
    } else if (player === HTML5) {
        merge(plugins, getPluginConfig(context, 'html5Player'));
    } else if (player === EXTERNAL) {
        merge(plugins, getPluginConfig(context, 'externalPlayer'));
    } else if (player === VULCAN_V2) {
        merge(plugins, getPluginConfig(context, 'vulcanV2Player'));
    }

    const pluginNames = [];
    for (let k in plugins) {
        pluginNames.push(k);
    }
    logger.info('playerPlugins output', ...pluginNames, plugins);

    return plugins;
};

export const report = (context, mediaData, embedOptions) => {
    return {
        bestPlayer: bestPlayer(context, mediaData, embedOptions),
        playerPreferenceFromInput: determinePlayerPreferenceFromInput(context, mediaData, embedOptions),
        supportedPlayers: supportedPlayers(context),
        usablePlayers: usablePlayers(context, mediaData.assets),
    };
};

export const shouldServeHls = (context, mediaData, embedOptions) => {
    // start by forcing HLS when the type is livestream, but later
    // refactor things such that NotPlayablePlayer is used if we can't handle
    // live
    if (mediaData.type === 'LiveStream') {
        return true;
    }
    const {
        detect
    } = context;
    return (
        doesBrowserSupportHlsTools(detect) &&
        !isBrowserOldChrome(detect) &&
        !isBrowserInNativeAndroid(detect, embedOptions) &&
        // the account has hls enabled or explicitly trying to force
        isHlsEnabled(context, mediaData, embedOptions) &&
        // the media actually has desktop assets compatable with the delivery system
        hasSupportedHlsAssets(mediaData) &&
        // Some sites completely replace the XMLHttpRequest constructor with one
        // that doesn't work with hls.js. If we detect that, don't use HLS
        // (...unless we explicitly say to try it.)
        ((!xhrHasBeenTamperedWith(context) && !urlHasBeenTamperedWith(context)) ||
            hlsOverrideValue(context, embedOptions))
    );
};

export const supportedPlayers = (context) => {
    const {
        detect
    } = context;
    const result = [NOT_PLAYABLE, PASSWORD_PROTECTED, EXTERNAL];

    if (detect.vulcanSupport) {
        result.push(VULCAN_V2);
    } else if (detect.iphone || detect.ipad || detect.android) {
        result.push(VULCAN_V2);
    }

    if (detect.video.h264) {
        result.push(HTML5);
    }

    return result;
};

export const usablePlayers = (context, mediaData) => {
    const result = [];
    const candidates = supportedPlayers(context);
    for (let i = 0; i < candidates.length; i++) {
        let player = candidates[i];
        if (canUsePlayer(context, player, mediaData)) {
            result.push(player);
        }
    }
    return result;
};

// `URL` is a built-in type, but a lot sites accidentally clobber it like
// `URL = location.href`. hls.js uses it though.
export const urlHasBeenTamperedWith = () => {
    return typeof(window.URL && window.URL.createObjectURL) !== 'function';
};

// `XMLHttpRequest.prototype.constructor.toString()` should be of this form if it's untampered with
const XMLHTTPREQUEST_CONSTRUCTOR_RE =
    /\s*function\s+XMLHttpRequest\(\)\s*{\s*\[native code\]\s*}\s*/m;
// Oddly, safari 9.x seems to display this in the [object ...] form.
const XMLHTTPREQUEST_CONSTRUCTOR_IN_SAFARI_9_RE = /\[object XMLHttpRequestConstructor\]/m;

export const xhrHasBeenTamperedWith = () => {
    if (XMLHttpRequest && XMLHttpRequest.prototype && XMLHttpRequest.prototype.constructor) {
        const constructorString = XMLHttpRequest.prototype.constructor.toString();
        return !(
            XMLHTTPREQUEST_CONSTRUCTOR_RE.test(constructorString) ||
            XMLHTTPREQUEST_CONSTRUCTOR_IN_SAFARI_9_RE.test(constructorString)
        );
    }
    return true;
};