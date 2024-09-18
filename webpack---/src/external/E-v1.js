// E-v1 is the legacy "Wistia Library." It is currently used out in the wild
// by our customers so we need to keep it around for backwards compatibility.

import '../embeds/media/modules/_legacy_modules.js';
import './publicApi.js';
import './player.js';

// wrap this in an IIFE, as we had a customer report these vars were being placed on the window global and causing
// an error if they used the same variable name.
(() => {
    let eV1Found = false;

    const logWarning = () => {
        console.warn(
            'E-v1.js is not being hosted from a "fast.wistia" host. Self-hosting, making static copies of this script, or including this script in an optimizer may cause embeds to stop functioning. Check Wistia\'s Help Center for more information.',
        );
    };

    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const s = scripts[i];
        if (s.src) {
            const url = new window.URL(s.src, window.location.href);

            // Check that this is definitely our script.
            const pathIsEv1 = /\/assets\/external\/E-v1?\.js$/.test(url.pathname);

            if (pathIsEv1) {
                eV1Found = true;

                if (url.hostname.includes('fast.wistia') === false) {
                    logWarning();
                }
            }
        }
    }

    // E-v1.js was not found at all, meaning the script has been totally renamed
    if (eV1Found === false) {
        logWarning();
    }
})();