import {
    Wistia
} from 'wistia_namespace.js';
import {
    assign,
    merge
} from 'utilities/obj.js';
import * as Judy from 'utilities/judy.js';
import {
    eV1HostWithPort,
    eV1Protocol
} from 'utilities/hosts.js';
import {
    cachedDetect
} from 'utilities/detect.js';

const detect = cachedDetect();

const AUDIO = 'Audio';

const PLUGIN_LIST = [
    'airplay',
    'audioChapters',
    'audioShare',
    'captions',
    'captions-v1',
    'chapters',
    'cropFill', // used in es3 labs
    'customizePreview',
    'customerLogo',
    'dimTheLights', // used in es3 labs
    'dimthelights', // used in es3 labs
    'encodingProgress',
    'eventbrite',
    'externalPlayer',
    'facebookPixel',
    'googleAnalytics4',
    'hlsVideo',
    'html5Player',
    'hubspotForm',
    'marketoForm',
    'midrollLink-v1',
    'midrollLink-v2',
    'nativeHlsVideo',
    'notPlayableVideo',
    'passwordProtectedVideo',
    'postRoll-v1',
    'postRoll-v2',
    'requireEmail-v1',
    'share',
    'share-v2',
    'socialbar-v1',
    'thumbnailTextOverlay',
    'thumbnailTextOverlay-v2',
    'turnstile',
    'videoThumbnail',
    'vulcanV2Player',
    'watchNext',
    'wistiaLogo',
];

const isPluginSupported = (name) => {
    if (name === 'socialbar-v1' || name.indexOf('transcript') !== -1) {
        return false;
    }

    return true;
};

export const getPluginsNotInList = (plugins = {}) => {
    return plugins.reduce((filteredPlugins, plugin) => {
        if (PLUGIN_LIST.indexOf(plugin.name) === -1) {
            filteredPlugins.push(plugin);
        }

        return filteredPlugins;
    }, []);
};

// Given a video, look at its plugin options and generate an
// array of hashes that can be used as an argument to
// `runScripts`.
export const pluginScriptsToLoad = (mediaData, embedOptions = {}, playerPlugins = {}) => {
    const ctx = Judy.buildContext();

    const {
        mediaType
    } = mediaData;
    const embedOptionsFromMediaData = mediaData.embedOptions;
    const mediaDataPlugins = Object(embedOptionsFromMediaData).plugin;

    const pluginOptions = embedOptions.plugin || mediaDataPlugins || {};
    const allPlugins = merge({}, pluginOptions, playerPlugins);

    const chosenPlayer = Judy.choosePlayer(ctx, mediaData, embedOptions);

    // loop over all the plugins and create all the wonderful plugin scripts objects
    const pluginScripts = pluginScriptsFromDefinedPlugins(allPlugins, embedOptions);

    // add the airplay plugin if we detect it is not set off
    if ((detect.safari || detect.iphone || detect.ipad) && embedOptions.airplayButton !== false) {
        const airplay = {
            name: 'airplay',
            options: allPlugins.airplay || {},
            async: true,
            src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/airplay.js`,
        };

        pluginScripts.push(airplay);
    }

    // transform layer between old v1 scripts and new scripts v2
    const transformedPluginScripts = translatePlugins(
        pluginScripts,
        embedOptions,
        chosenPlayer,
        mediaType,
    );

    // chapters is a special case: it's a plugin, but we also supported defining
    // it as a root embed option via `chaptersOn` and a `chaptersList`
    // via a root embed option.
    if (chosenPlayer === 'vulcan-v2' && embedOptions.chaptersOn && !allPlugins.chapters) {
        transformedPluginScripts.push({
            name: getSourceName('chapters'),
            src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/chapters.js`,
            async: true,
        });
    }

    // conditionally add customer logo
    if (
        embedOptions.showCustomerLogo &&
        embedOptions.customerLogoImageUrl &&
        mediaData.enableCustomerLogo
    ) {
        transformedPluginScripts.push({
            name: 'customerLogo',
            options: allPlugins.customerLogo || {},
            async: true,
            src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/customerLogo.js`,
        });
    }

    // conditionally add wistia logo
    if (embedOptions.branding === true || mediaData.branding === true) {
        transformedPluginScripts.push({
            name: 'wistiaLogo',
            options: allPlugins.wistiaLogo || {},
            async: true,
            src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/wistiaLogo.js`,
        });
    }

    // This can be true in dev. We should handle it there so we can be sure we're
    // prefetching all the scripts we absolutely need to show the video.
    if (chosenPlayer === 'vulcan-v2' && !Wistia.VulcanV2Player) {
        transformedPluginScripts.push({
            name: 'vulcanV2Player',
            options: {},
            async: false,
            src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/vulcanV2Player.js`,
        });
    }

    return orderScripts(transformedPluginScripts);
};

export const pluginScriptsFromDefinedPlugins = (plugins, embedOptions) => {
    const pluginScripts = {};

    Object.keys(plugins).forEach((name) => {
        if (!Object.hasOwn(plugins, name)) {
            return;
        }

        // legacy plugins that we don't want to load any longer
        if (!isPluginSupported(getSourceName(name))) {
            return;
        }
        if (!isValidPluginName(name)) {
            console.warn('invalid plugin name', name);
            return;
        }

        const options = plugins[name];

        if (options && options.on !== false) {
            const srcName = getSourceName(name);
            const newPluginOptions = {
                name: srcName,
                src: `${eV1Protocol()}//${eV1HostWithPort()}/assets/external/${srcName}.js`,
                async: options.async != null ?
                    options.async :
                    !/^(requireEmail|captions|midrollLink|share|turnstile)/.test(name),
                options,
            };

            // if there's a predefined options source and it's allowed to use third party, prefer that plugin src.
            if (options.src && allow3rdParty(embedOptions)) {
                newPluginOptions.src = options.src;
            }

            // add the plugin options to plugin scripts
            const existingPluginOptions = pluginScripts[srcName];
            if (existingPluginOptions) {
                assign(existingPluginOptions, newPluginOptions);
            } else {
                pluginScripts[srcName] = newPluginOptions;
            }
        }
    });

    return Object.values(pluginScripts);
};

const translatePlugins = (pluginScripts, embedOptions, chosenPlayer, mediaType) => {
    return pluginScripts.map((script) => {
        if (chosenPlayer === 'vulcan-v2') {
            switch (script.name) {
                case 'captions-v1':
                    script.name = 'captions';
                    script.src = script.src.replace(/captions-v1/, 'captions');
                    break;
                case 'share':
                    if (mediaType === AUDIO) {
                        // Some customers may have saved embed options with the plugin
                        // called 'share' during the podcasting beta. Or at any time, a
                        // customer could try to enable the 'share' plugin via inline
                        // embed options. This makes the audio-version of the share plugin
                        // load instead.
                        script.name = 'audioShare';
                        script.src = script.src.replace(/share/, 'audioShare');
                    } else {
                        script.name = 'share-v2';
                        script.src = script.src.replace(/share/, 'share-v2');
                    }
                    break;

                case 'chapters':
                    if (mediaType === AUDIO) {
                        // see the above comment about share. The same is applicable here
                        script.name = 'audioChapters';
                        script.src = script.src.replace(/chapters/, 'audioChapters');
                    } else {
                        script.name = 'chapters';
                    }
                    break;
                case 'postRoll-v1':
                    script.name = 'postRoll-v2';
                    script.src = script.src.replace(/postRoll-v1/, 'postRoll-v2');
                    break;
                case 'midrollLink-v1':
                    script.name = 'midrollLink-v2';
                    script.src = script.src.replace(/midrollLink-v1/, 'midrollLink-v2');
                    break;
                case 'requireEmail-v1':
                    if (!embedOptions._inLegacyPlaylist) {
                        script.name = 'turnstile';
                        script.src = script.src.replace(/requireEmail-v1/, 'turnstile');
                    }
                    break;
                default:
                    break;
            }
        }

        return script;
    });
};

const orderScripts = (inputScripts) => {
    const loadWeight = (plugin) => {
        let weight = 0;

        if (plugin && plugin.options && plugin.options.loadWeight) {
            weight = plugin.options.loadWeight;
        }
        return weight;
    };

    return inputScripts.sort((a, b) => {
        return loadWeight(a) - loadWeight(b);
    });
};

/**
 *
 * @param {string} pluginName
 * @returns {string}
 */
export const getSourceName = (pluginName) => {
    switch (pluginName) {
        case 'requireEmail':
            return 'turnstile';
        case 'requireEmail-v1':
            return 'turnstile';
        case 'postRoll':
            return 'postRoll-v2';
        case 'captions':
            return 'captions-v1';
        default:
            return pluginName;
    }
};

// Must be alphanumeric with dashes or underscores. Dots and slashes are
// disallowed since they can form paths which can cause arbitrary GET requests
// on the *.wistia.com domain.
const isValidPluginName = (pluginName) => {
    return /^[a-zA-Z0-9_-]+$/.test(pluginName);
};

export const allow3rdParty = (options = {}) => {
    return (
        options.allowThirdParty !== false &&
        !/([\w_-]+\.)?wistia\.(com|st|io)$/.test(window.location.hostname)
    );
};