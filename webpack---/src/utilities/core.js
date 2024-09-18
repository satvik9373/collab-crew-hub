import {
    Wistia
} from 'wistia_namespace.js';
import {
    poll
} from 'utilities/poll.js';
import {
    throttle
} from 'utilities/throttle.js';
import {
    unescapeHtml
} from 'utilities/unescape-html.js';

export {
    poll,
    throttle,
    unescapeHtml
};

// replace spaces in text with &nbsp; this prevents the line from wrapping.
// specifically, it allows menu items in the vulcan ui to push their parent div
// open as wide as the text.
export const unbreakifyText = (text = '') => {
    return text.replace(' ', '&nbsp;');
};

export const stripHtml = (htmlStr) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlStr;
    return tmp.textContent || tmp.innerText || '';
};

export const camelCase = (snakeStr) => {
    return snakeStr.replace(/[_-]([a-z])/g, (g) => {
        return g.charAt(1).toUpperCase();
    });
};

export const snakeCase = (camelStr) => {
    return camelStr.replace(/[A-Z]/g, (g) => {
        return `_${g.toLowerCase()}`;
    });
};

// Not safe IE8 and below.
export const shallowCamelizeKeys = (o) => {
    return Object.keys(o).reduce((memo, key) => {
        memo[camelCase(key)] = o[key];
        return memo;
    }, {});
};

// Not safe IE8 and below.
export const shallowSnakeKeys = (o) => {
    return Object.keys(o).reduce((memo, key) => {
        memo[snakeCase(key)] = o[key];
        return memo;
    }, {});
};

// the implementations of base64Decode and base64Encode here are adapted from
// https://stackoverflow.com/a/30106551/529530, and designed to safely handle
// multibyte characters

export const base64Decode = (input) => {
    return decodeURIComponent(
        atob(input)
        .split('')
        .map((c) => {
            return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );
};

export const base64Encode = (input) => {
    return btoa(
        encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(`0x${p1}`);
        }),
    );
};

export const notSetOrTrue = (val) => {
    return val == null || val === true;
};

// prevent scrolling outside a container
// topMargin and bottomMargin are optional and can be used to provide a cushion to adjust to determine
// if you are at the top. We have seen some weird behavior with some uses where the scrollTop maxes out
// at scrollHeight - offsetHeight - 1.  Possible subpixel rendering issue???
export const preventOuterMouseWheel = (e, container, topMargin = 0, bottomMargin = 0) => {
    const {
        scrollTop,
        scrollHeight,
        offsetHeight
    } = container;
    const hitTop = (extra = 0) => {
        return scrollTop + extra - topMargin <= 0;
    };
    const hitBottom = (extra = 0) => {
        return scrollTop + extra + bottomMargin >= scrollHeight - offsetHeight;
    };

    const delta = e.deltaY || -e.wheelDelta;
    const dir = delta > 0 ? 'down' : 'up';
    const isModernBrowser = !!e.deltaY;
    if (isModernBrowser) {
        if ((dir === 'up' && hitTop()) || (dir === 'down' && hitBottom())) {
            e.preventDefault();
        }
    } else {
        // IE scrolls 47.5 pixels each scroll but reports 120
        const extra = (47.5 * delta) / 120;
        if (dir === 'up' && hitTop(extra)) {
            e.preventDefault();
            // Manually set scroll to avoid scrolling parent in IE 11
            container.scrollTop = 0;
        } else if (dir === 'down' && hitBottom(extra)) {
            e.preventDefault();
            container.scrollTop = scrollHeight - offsetHeight;
        }
    }
};

// parent.frames.length should tell us how many iframes exist on the parent
// page. However, if the user has overwritten the accessor with something
// that's not safe for CORS (i.e. they changed it at all), then
// parent.frames.length throws an exception and screws up the embedding
// process. This function just gives a safe way of getting the value, or
// defaulting to something unknown.
export const parentFramesLength = function() {
    try {
        return parent.frames.length;
    } catch (e) {
        Wistia.warn(e);
        return 1;
    }
};