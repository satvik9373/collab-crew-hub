import {
    Wistia
} from 'wistia_namespace.js';
import {
    onDocReady
} from 'utilities/docReady.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    throttle
} from 'utilities/throttle.js';
import {
    getAllApiHandlesByDomOrder
} from 'utilities/getApiHandles.ts';

// Check for presence of embed links, and load the rest of the code if we spot
// any clues, such as:
//
// - Any embeds with playlistLinks embed option.
// - Any <a> tags that look like href="#wistia_hashedid"

Wistia._destructors.destroyEmbedLinks = () => {
    if (Wistia.EmbedLink.EmbedLinkClass) {
        Wistia.EmbedLink.EmbedLinkClass._onEv1Destroy();
    }
};

const shouldLoadEmbedLinks = () => {
    // Do any embeds have the playlistLinks option?
    const videos = getAllApiHandlesByDomOrder();
    for (let i = 0; i < videos.length; i++) {
        if (videos[i]._attrs && videos[i]._attrs.playlistLinks) {
            return true;
        }
    }

    // Are there any <a> tags that have #wistia_hashedid as their src?
    if (document.querySelectorAll('a[href^="#wistia_"]').length > 0) {
        return true;
    }

    return false;
};

const conditionallyLoadAndSetUpEmbedLinks = (...args) => {
    if (shouldLoadEmbedLinks()) {
        dynamicImport('assets/external/embedLinks.js').then((module) => {
            module.EmbedLink.setupAll(...args);
        });
    }
};

const maybeLoadAndSetupAllEmbedLinks = (...args) => {
    conditionallyLoadAndSetUpEmbedLinks(...args);

    onDocReady(() => {
        conditionallyLoadAndSetUpEmbedLinks(...args);
        doTimeout('maybe_load_embed_links_5000', conditionallyLoadAndSetUpEmbedLinks, 5000);
    });
};

export const maybeLoadAndSetupEmbedLinksThrottled = throttle(1000, maybeLoadAndSetupAllEmbedLinks);

// We have to keep this global for now because it is publicly documented at
// https://wistia.com/support/developers/embed-links#notes
Wistia.EmbedLink = {};
Wistia.EmbedLink.setupAll = conditionallyLoadAndSetUpEmbedLinks;