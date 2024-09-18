import {
    Wistia
} from 'wistia_namespace.js';
import * as Judy from 'utilities/judy.js';
import {
    runScripts
} from 'utilities/script-utils.js';
import {
    pluginScriptsToLoad
} from 'utilities/pluginScriptsToLoad.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';

export const prefetchEngineAndPlugins = (mediaData, opts = {}) => {
    const pluginScripts = pluginScriptsToLoad(mediaData, opts);

    const judyCtx = Judy.buildContext();
    const engineModule = Judy.bestUsableEngine(judyCtx, mediaData, opts);

    const pluginsPromise = prefetchPlugins(pluginScripts);
    const enginePromise = dynamicImport(`assets/external/${engineModule}`);

    return Promise.all([pluginsPromise, enginePromise]);
};

export const prefetchPlugins = (pluginScripts = []) => {
    const scriptsNotFetched = pluginScripts.filter((script) => {
        if (!Wistia.plugin._prefetched[script.src]) {
            // mark that the script is being fetched
            Wistia.plugin._prefetched[script.src] = 'fetching';
        }

        return !Wistia.plugin._prefetched[script.src];
    });

    if (scriptsNotFetched.length === 0) {
        return Promise.resolve();
    }

    return runScripts(scriptsNotFetched).then(() => {
        scriptsNotFetched.forEach((script) => {
            Wistia.plugin._prefetched[script.src] = 'fetched';
        });
    });
};