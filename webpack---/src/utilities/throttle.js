export const throttle = (wait, fn, options = {}) => {
    let context = null;
    let args = null;
    let result = null;
    let timeout = null;
    let previous = 0;
    const later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = fn.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };
    return function() {
        const now = new Date().getTime();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = fn.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};