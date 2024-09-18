import {
    poll
} from 'utilities/poll.js';

export const isDocReady = () => {
    return /loaded|complete/.test(document.readyState);
};

export const onDocReady = function() {
    let timeout;
    let fn;

    if (arguments.length > 1) {
        timeout = arguments[0];
        fn = arguments[1];
    } else {
        timeout = 10000;
        fn = arguments[0];
    }

    if (isDocReady()) {
        fn();
    } else if (top === self && document.documentElement.doScroll) {
        // IE < 9 is ready earlier than the 'readystatechange' event
        // would have you believe. This doScroll check won't throw an error
        // when it's finally ready. This will bomb in an iframe though, which
        // is why we have the 'top is self' check. Fortunately,
        // readystatechange should fire just fine in an iframe context.
        const scrollTest = function() {
            try {
                document.documentElement.doScroll('left');
                return true;
            } catch (e) {
                return false;
            }
        };
        poll(scrollTest, fn, 50, timeout, fn);
    } else {
        const runFnOnComplete = function() {
            if (isDocReady()) {
                clearTimeout(giveUpTimeout);
                unbindListeners();
                fn();
            }
        };

        const bindListeners = function() {
            document.addEventListener('DOMContentLoaded', runFnOnComplete, false);
            document.addEventListener('readystatechange', runFnOnComplete, false);
            window.addEventListener('load', runFnOnComplete, false);
        };

        const unbindListeners = function() {
            document.removeEventListener('DOMContentLoaded', runFnOnComplete, false);
            document.removeEventListener('readystatechange', runFnOnComplete, false);
            window.removeEventListener('load', runFnOnComplete, false);
        };

        const giveUpOnEvent = function() {
            unbindListeners();
            fn();
        };

        // Wait for the ready event for up to 10 seconds.
        const giveUpTimeout = setTimeout(giveUpOnEvent, timeout);
        bindListeners();
    }
};