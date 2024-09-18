import {
    wlog
} from 'utilities/wlog.js';
import {
    isObject
} from 'utilities/obj.js';
import {
    runScript as runScriptWithPromise
} from 'utilities/runScript.js';

export const findScriptInDomBySrc = (targetSrc, options = {}) => {
    const scriptTags = document.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
        const s = scriptTags[i];
        let src = s.getAttribute('src') || '';

        if (options.ignoreQueryParams) {
            let matches = src.split('?');
            let urlWithoutParams = matches[0];
            src = urlWithoutParams;
        }

        if (!options.scriptRegex && options.ignoreProtocol) {
            src = src.replace(/^https?:/, '');
            targetSrc = targetSrc.replace(/^https?:/, '');
        }

        if (options.scriptRegex && options.scriptRegex.test(src)) {
            return s;
        }
        if (options.testStartsWith && src.indexOf(targetSrc) === 0) {
            return s;
        }
        if (src === targetSrc) {
            return s;
        }
    }
    return null;
};

export const removeScriptsBySrc = (targetSrc, options = {}) => {
    let s;
    while ((s = findScriptInDomBySrc(targetSrc, options))) {
        if (s) {
            s.onload = s.onreadystatechange = s.onerror = null;
            if (s.parentNode && typeof s.parentNode.removeChild) {
                try {
                    s.parentNode.removeChild(s);
                } catch (e) {
                    setTimeout(() => {
                        throw e;
                    }, 0);
                }
            }
        }
    }
};

// fire and forget.
// run a script and immediately remove it from the DOM.
export const runScript = (src, timeout = 8000, options = {}) => {
    if (timeout == null) {
        timeout = 8000;
    }
    if (options == null) {
        options = {};
    }
    let s;
    let alreadyExists;

    return new Promise((resolve) => {
        if (options.once === true && (s = findScriptInDomBySrc(src))) {
            alreadyExists = true;
        }

        if (options.once && alreadyExists) {
            if (!s.readyState || /loaded|complete/.test(s.readyState)) {
                setTimeout(() => {
                    resolve();
                }, 1);
            }
        } else {
            runScriptWithPromise(src, timeout)
                .then(resolve)
                .catch((msg) => {
                    resolve(msg);
                    setTimeout(() => {
                        console.error(msg);
                    }, 1);
                });
        }
    });
};

export const runScripts = (...args) => {
    // support either an array of scripts or a single script as a string
    let scripts;
    if (args[0] instanceof Array) {
        scripts = args[0];
    } else {
        scripts = args;
    }

    scripts = scriptInputsToHash(scripts);

    const asyncScripts = [];
    const syncScripts = [];
    const scriptPromises = [];

    scripts.forEach((s) => {
        const script = { ...s
        };
        const p = new Promise((resolve) => {
            script.resolve = resolve;
        });

        script.promise = p;

        scriptPromises.push(script.promise);

        if (s.async) {
            asyncScripts.push(script);
        } else {
            syncScripts.push(script);
        }
    });

    syncScripts.reduce((prev, script) => {
        if (script.fn) {
            try {
                script.fn();
            } catch (e) {
                wlog.error(e);
            } finally {
                script.resolve();
            }
        } else if (script.src) {
            runScript(script.src, null, script).then(script.resolve);
        }

        return prev.then(script.promise);
    }, Promise.resolve());

    setTimeout(() => {
        asyncScripts.forEach((script) => {
            if (script.fn) {
                try {
                    script.fn();
                } catch (e) {
                    wlog.error(e);
                } finally {
                    script.resolve();
                }
            } else if (script.src) {
                runScript(script.src, null, script).then(script.resolve);
            }
        });
    }, 1);

    return Promise.all(scriptPromises);
};

export const scriptInputsToHash = (scripts) => {
    const result = [];
    for (let i = 0; i < scripts.length; i++) {
        let script = scripts[i];
        if (typeof script === 'string') {
            result.push({
                src: script,
                async: false
            });
        } else if (isObject(script)) {
            result.push(script);
        } else {
            result.push({
                fn: script,
                async: false
            });
        }
    }
    return result;
};