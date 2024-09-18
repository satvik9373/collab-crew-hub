const unescapedCache = {};

export const unescapeHtml = (encodedHtmlStr, options = {}) => {
    if (!encodedHtmlStr) {
        return '';
    }

    if (options.cache) {
        const cachedVal = unescapedCache[encodedHtmlStr];
        if (unescapedCache[encodedHtmlStr]) {
            return cachedVal;
        }
    }

    const e = document.createElement('div');
    e.innerHTML = encodedHtmlStr.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let result;
    if (e.childNodes.length > 0) {
        result = e.childNodes[0].nodeValue;
    } else {
        result = '';
    }

    if (options.cache) {
        unescapedCache[encodedHtmlStr] = result;
    }

    return result;
};