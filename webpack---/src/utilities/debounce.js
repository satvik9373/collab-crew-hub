import {
    doTimeout,
    clearTimeouts
} from 'utilities/timeout-utils.js';

export const debounce = (timeoutKey, func, wait) => {
    return (...args) => {
        clearTimeouts(timeoutKey);
        doTimeout(
            timeoutKey,
            () => {
                return func(...args);
            },
            wait,
        );
    };
};

export const asyncDebounce = (timeoutKey, func, wait) => {
    const debounced = debounce(
        timeoutKey,
        (resolve, reject, args) => {
            func(...args)
                .then(resolve)
                .catch(reject);
        },
        wait,
    );
    return (...args) =>
        new Promise((resolve, reject) => {
            debounced(resolve, reject, args);
        });
};