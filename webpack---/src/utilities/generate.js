import {
    isObject
} from 'utilities/obj.js';

const generateHtml = (hash) => {
    // if obj doesn't have any children/properties, just return it as a string
    if (/string|number|boolean/.test(typeof hash)) {
        return hash.toString();
    }

    // if hash is an array, do the conversion on all its entries
    if (hash instanceof Array) {
        let result = '';
        for (const entry of hash) {
            result += generateHtml(entry);
        }
        return result;
    }

    // if we don't know what hash is, just return it as a string
    if (typeof hash !== 'object') {
        return hash.toString();
    }

    // if obj is an object, convert it to HTML
    const attributes = [];
    let tagName;
    let childNodes;
    for (const key in hash) {
        let val = hash[key];
        if (key === 'tagName') {
            tagName = val;
        } else if (key === 'childNodes') {
            childNodes = val;
        } else {
            attributes.push({
                key,
                val
            });
        }
    }

    if (!tagName) {
        tagName = 'div';
    }

    // start tag
    let result = `<${tagName}`;

    // tag attributes
    for (const attr of attributes) {
        if (attr.key === 'style' && isObject(attr.val)) {
            attr.val = `${(() => {
        const result1 = [];

        for (let prop in attr.val) {
          const value = attr.val[prop];
          result1.push(`${prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}:${value}`);
        }

        return result1;
      })().join(';')};`;
        }
        result += ` ${attr.key}="${attr.val}"`;
    }

    // close tag or recurse for child nodes
    if (/^(br|hr|img|link|meta|input)$/i.test(tagName)) {
        result += ' />';
    } else {
        result += '>';
        if (childNodes) {
            if (typeof childNodes === 'string') {
                result += childNodes;
            } else if (typeof childNodes === 'object') {
                result += generateHtml(childNodes);
            }
        }
        result += `</${tagName}>`;
    }

    return result;
};

const generateRelativeBlockCss = `display:inline-block;height:100%;line-height:normal;margin:0;padding:0;position:relative;vertical-align:top;width:100%;`;

export {
    generateHtml,
    generateRelativeBlockCss
};