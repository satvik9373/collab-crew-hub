import {
    assign
} from 'utilities/assign.js';

const backgroundResetStyles = {
    'background-attachment': 'scroll',
    'background-color': 'transparent',
    'background-image': 'none',
    'background-position': '0 0',
    'background-repeat': 'no-repeat',
    'background-size': '100% 100%',
};

const defaultResetStyles = {
    'box-sizing': 'inherit',
    'box-shadow': 'none',
    color: 'inherit',
    display: 'block',
    float: 'none',
    font: 'inherit',
    'font-family': 'inherit',
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': 'inherit',
    'letter-spacing': 0,
    'line-height': 'inherit',
    margin: 0,
    'max-height': 'none',
    'max-width': 'none',
    'min-height': 0,
    'min-width': 0,
    padding: 0,
    position: 'static',
    'text-decoration': 'none',
    'text-transform': 'none',
    'text-shadow': 'none',
    transition: 'none',
    'word-wrap': 'normal',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    '-webkit-user-select': 'none',
    '-webkit-font-smoothing': 'antialiased',
};

const listResetStyles = {
    'list-style-type': 'none',
    position: 'static',
};

const h1ResetStyles = {
    'font-size': '2em',
};

const h2ResetStyles = {
    'font-size': '1.5em',
};

const h3ResetStyles = {
    'font-size': '1.17em',
};

const labelResetStyles = {
    float: 'none',
    outline: 'none',
};

const buttonResetStyles = {
    border: 0,
    'border-radius': 0,
    outline: 'none',
    position: 'static',
};

const imgResetStyles = {
    border: 0,
    display: 'inline-block',
    'vertical-align': 'top',
};

const joinHashAsStyles = (hash) => {
    const pairs = [];
    for (let name in hash) {
        const value = hash[name];
        pairs.push(`${name}:${value}`);
    }
    return pairs.join(';');
};

const resetDeclarations = `
&{font-size:14px;}
div,span,ul,li,label,fieldset,button,img,a,svg,p{${joinHashAsStyles(defaultResetStyles)}}
a{border:0;}
h1{${joinHashAsStyles(assign({}, defaultResetStyles, h1ResetStyles))}}
h2{${joinHashAsStyles(assign({}, defaultResetStyles, h2ResetStyles))}}
h3{${joinHashAsStyles(assign({}, defaultResetStyles, h3ResetStyles))}}
p{margin:1.4em 0;}
a,span,svg{display:inline;}
ul,ol,li{${joinHashAsStyles(assign({}, defaultResetStyles, listResetStyles))}}
ul:before,ol:before,li:before{display:none}
ul:after,ol:after,li:after{display:none}
label{${joinHashAsStyles(assign({}, backgroundResetStyles, labelResetStyles))}}
button{${joinHashAsStyles(assign({}, backgroundResetStyles, buttonResetStyles))}}
img{${joinHashAsStyles(assign({}, imgResetStyles, buttonResetStyles))}}
button::-moz-focus-inner{border: 0;}
`;

const expandLine = (prefixSelector, suffixSelector, line) => {
    const startOfPropsIndex = line.indexOf('{');
    const selectorString = line.substring(0, startOfPropsIndex);
    const declString = line.substring(startOfPropsIndex, line.length);
    const selectors = selectorString.split(/,\s*/);
    return selectors
        .map((selector) => {
            if (selector.indexOf('&') >= 0) {
                return `${selector.replace(/&/g, prefixSelector)}${suffixSelector}${declString}`;
            }
            if (selector.indexOf('::') >= 0) {
                return `${prefixSelector}${suffixSelector} ${selector}${declString}`;
            }
            return `${prefixSelector}${selector}${suffixSelector}${declString}`;
        })
        .join('\n');
};

export const cssResetForSelector = (prefixSelector, suffixSelector) => {
    return resetDeclarations
        .trim()
        .split(/\n+/)
        .map((line) => {
            return expandLine(prefixSelector, suffixSelector, line);
        })
        .join('\n');
};