export const poll = (cond, fn, interval, timeout, failFn) => {
    let pollTimeout = null;
    const start = new Date().getTime();
    const pollFn = () => {
        if (new Date().getTime() - start > timeout) {
            if (typeof failFn === 'function') {
                failFn();
            }
            return;
        }

        if (cond()) {
            fn();
        } else {
            clearTimeout(pollTimeout);
            pollTimeout = setTimeout(pollFn, interval);
        }
    };
    pollTimeout = setTimeout(pollFn, 1);
};