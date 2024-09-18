import {
    TAGGED_VERSION
} from './hosts.js';
// fire and forget.
// run a script and immediately remove it from the DOM.
export const runScript = (src, timeout) => {
    const taggedVersion = TAGGED_VERSION;
    return new Promise((resolve, reject) => {
        if (timeout == null) {
            timeout = 8000;
        }
        let s;

        s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.type = 'text/javascript';

        if (
            /https?:\/\/fast\.wistia\./.test(s.src) &&
            taggedVersion !== '' &&
            taggedVersion.length > 0
        ) {
            s.src = `${s.src}@${taggedVersion}`;
        }

        let cleanupTimeoutId = null;
        let done = false;

        const cleanUp = () => {
            s.onerror = s.onreadystatechange = s.onload = null;
            clearTimeout(cleanupTimeoutId);
            clearTimeout(loadingTimeout);
            cleanupTimeoutId = setTimeout(() => {
                if (s && s.parentNode) {
                    s.parentNode.removeChild(s);
                }
            }, 500);
        };

        const onSuccess = () => {
            const state = s.readyState;
            if (!done && (!state || /loaded|complete/.test(state))) {
                done = true;
                // We call success on next tick to separate script evaluation time from
                // callback execution time. This helps reduce thread-blocking since
                // script-eval and initialization tend to be expensive.
                setTimeout(() => {
                    resolve();
                    cleanUp();
                }, 1);
            }
        };

        const onTimeout = () => {
            done = true;
            cleanUp();
            reject(new Error('timeout'));
        };

        const onError = (e) => {
            done = true;
            cleanUp();
            reject(e);
        };

        const loadingTimeout = setTimeout(onTimeout, timeout);
        s.onerror = onError;
        s.onreadystatechange = onSuccess;
        s.onload = onSuccess;

        (document.body || document.head).appendChild(s);
    });
};