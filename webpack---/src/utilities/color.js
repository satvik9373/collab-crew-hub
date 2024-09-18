// Logic adapted from this Javascript Color class:
// https://github.com/moagrius/Color/blob/master/Color.js
//
// HSL to RGB logic (broken in Color class) taken from:
// http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript

// ## Regular expressions ##
const rHex = /^#?([0-9a-f]{3,4}|[0-9a-f]{6,8})$/i;
const rRgb =
    /^rgba?\((\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?)(?:,\s*([01]?\.?\d*))?\)$/;
const rPercent = /^\d+(\.\d+)*%$/;
const hexBit = /([0-9a-f])/gi;

const p2v = (p) => {
    if (rPercent.test(p)) {
        return parseFloat(p) * 2.55;
    }
    return p;
};

const hue2rgb = (a, b, c) => {
    if (c < 0) {
        c += 1;
    }
    if (c > 1) {
        c -= 1;
    }
    if (c < 1 / 6) {
        return a + (b - a) * 6 * c;
    }
    if (c < 1 / 2) {
        return b;
    }
    if (c < 2 / 3) {
        return a + (b - a) * (2 / 3 - c) * 6;
    }
    return a;
};

export class Color {
    // ## Constructor ##
    //
    // Construct our own color representation either from an
    // existing color, or a color string.
    constructor(input) {
        if (input instanceof Color) {
            this.r = input.r;
            this.g = input.g;
            this.b = input.b;
            this.a = input.a;
        } else if (input) {
            this.parse(input);
        } else {
            this.r = this.g = this.b = 0;
            this.a = 1;
        }
    }

    // ## Parse ##
    //
    // Accept #RRGGBB, #RRGGBBAA, rgba(R,G,B), or rgba(R,G,B,A) formats.
    // The rgb formats also allows percents.
    parse(input) {
        input = String(input);
        if (rHex.test(input)) {
            let stripped = input.replace(/^#/, '');
            if (stripped.length === 3 || stripped.length === 4) {
                stripped = stripped.replace(hexBit, '$1$1');
            }
            this.r = parseInt(stripped.substr(0, 2), 16);
            this.g = parseInt(stripped.substr(2, 2), 16);
            this.b = parseInt(stripped.substr(4, 2), 16);
            if (stripped.length === 8) {
                this.a = parseInt(stripped.substr(6, 2), 16) / 255;
            } else {
                this.a = 1;
            }
        } else if (rRgb.test(input)) {
            const parts = input.match(rRgb);
            this.r = parseFloat(p2v(parts[1]));
            this.g = parseFloat(p2v(parts[2]));
            this.b = parseFloat(p2v(parts[3]));
            if (parts[4]) {
                this.a = parseFloat(parts[4]);
            } else {
                this.a = 1;
            }
        }
        return this;
    }

    clone() {
        return new Color(this);
    }

    // Compute internal HSL values based on internal RGB values.
    _hslFromRgb() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;

        if (max === min) {
            this._h = this._s = 0;
        }

        const d = max - min;
        let s;
        if (d === 0) {
            this._h = 0;
            this._s = 0;
            this._l = r * 100;
            return this;
        }
        if (l > 0.5) {
            s = d / (2 - max - min);
        } else {
            s = d / (max + min);
        }

        let h;
        if (max === r) {
            h = (g - b) / d + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / d + 2;
        } else {
            h = (r - g) / d + 4;
        }
        h /= 6;

        this._h = h * 360;
        this._s = s * 100;
        this._l = l * 100;

        return this;
    }

    // Compute internal RGB values based on internal HSL values.
    _rgbFromHsl() {
        const h = this._h / 360;
        const s = this._s / 100;
        const l = this._l / 100;
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        this.r = hue2rgb(p, q, h + 1 / 3) * 255;
        this.g = hue2rgb(p, q, h) * 255;
        this.b = hue2rgb(p, q, h - 1 / 3) * 255;

        return this;
    }

    // Do math to blend a channel with a different value. Alpha is
    // the strength of the blend.
    blendChannel(channel, value, alpha) {
        this[channel] = alpha * value + (1 - alpha) * this[channel];
        return this;
    }

    // Blend this color with another color by blending each RGB
    // channel individually.
    blend(color, alpha) {
        color = new Color(color);
        this.blendChannel('r', color.r, alpha);
        this.blendChannel('g', color.g, alpha);
        this.blendChannel('b', color.b, alpha);
        return this;
    }

    // Increase a channel by a fixed value, but within the [0,255] range.
    lightenChannel(channel, steps) {
        this[channel] += steps;
        if (this[channel] < 0) {
            this[channel] = 0;
        } else if (this[channel] > 255) {
            this[channel] = 255;
        }
        return this;
    }

    // Lighten this color by increasing each channel by a fixed value.
    lighten(steps) {
        if (this.looksLikePercent(steps)) {
            this.lightness(this.lightness() + parseFloat(steps));
        } else {
            this.lightenChannel('r', steps);
            this.lightenChannel('g', steps);
            this.lightenChannel('b', steps);
        }
        return this;
    }

    darken(steps) {
        if (typeof steps === 'string') {
            return this.lighten(`-${steps}`);
        }
        return this.lighten(-steps);
    }

    looksLikePercent(str) {
        return /^-?\d+(\.\d+)?%$/.test(str);
    }

    // Set the lightness of this color by modifying the L value in
    // HSL, then recomputing the RGB.
    //
    // No args gets the current lightness.
    lightness(l) {
        this._hslFromRgb();
        if (l != null) {
            this._l = Math.max(0, Math.min(100, l));
            this._rgbFromHsl();
            return this;
        }
        return this._l;
    }

    // Set the saturation of this color by modifying the S value in
    // HSL, then recomputing the RGB.
    //
    // No args gets the current saturation.
    saturation(s) {
        this._hslFromRgb();
        if (s != null) {
            this._s = Math.max(0, Math.min(100, s));
            this._rgbFromHsl();
            return this;
        }
        return this._s;
    }

    // Gray level accounts for the strength of each individual channel.
    // This is more visually accurate than just averaging all the channels.
    grayLevel() {
        return (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
    }

    // The white level is basically paleness, and is determined by the
    // minimum of all the RGB channels.
    whiteLevel() {
        return Math.min(Math.min(this.r, this.g), this.b);
    }

    isLight() {
        return this.grayLevel() > 0.4;
    }

    isGrayscale() {
        return this.r === this.g && this.g === this.b;
    }

    distanceFrom(color) {
        return Math.sqrt((this.r - color.r) ** 2 + (this.g - color.g) ** 2 + (this.b - color.b) ** 2);
    }

    channelDominance() {
        return ['r', 'g', 'b'].sort((a, b) => this[b] - this[a]);
    }

    alpha(a) {
        if (a != null) {
            this.a = a;
            return this;
        }
        return this.a;
    }

    red(r) {
        if (r != null) {
            this.r = r;
            return this;
        }
        return this.r;
    }

    green(g) {
        if (g != null) {
            this.g = g;
            return this;
        }
        return this.g;
    }

    blue(b) {
        if (b != null) {
            this.b = b;
            return this;
        }
        return this.b;
    }

    toHex() {
        let r = Math.round(this.r).toString(16);
        let g = Math.round(this.g).toString(16);
        let b = Math.round(this.b).toString(16);
        if (r.length === 1) {
            r = `0${r}`;
        }
        if (g.length === 1) {
            g = `0${g}`;
        }
        if (b.length === 1) {
            b = `0${b}`;
        }
        return `${r}${g}${b}`;
    }

    toHexWithAlpha() {
        let a = Math.round(this.a * 255).toString(16);
        if (a.length === 1) {
            a = `0${a}`;
        }
        return `${a}${this.toHex()}`;
    }

    toRgb() {
        return `rgb(${Math.round(this.r)},${Math.round(this.g)},${Math.round(this.b)})`;
    }

    toRgba() {
        return `rgba(${Math.round(this.r)},${Math.round(this.g)},${Math.round(this.b)},${this.a})`;
    }

    toRgbaOrHex() {
        return this.toRgba();
    }

    toPercent() {
        return `rgba(${(this.r / 255) * 100}%,${(this.g / 255) * 100}%,${(this.b / 255) * 100}%,${
      this.a
    })`;
    }

    // IE8 and below don't support RGBA, but we can use this gradient hack to
    // do the same thing. The catch is that it functions as a background image
    // instead of a color, and therefore overrides other background images in IE.
    //
    // This should go after a `filter` CSS property.
    toIeGradient() {
        return `progid:DXImageTransform.Microsoft.gradient(startColorStr='#${this.toHexWithAlpha()}', endColorStr='#${this.toHexWithAlpha()}')`;
    }

    toString() {
        return this.toPercent();
    }
}

// @param {string} hex
// @return {string}
export const addHashToHex = (hex) => {
    // return if already has hash
    if (hex.charAt(0) === '#') {
        return hex;
    }

    return `#${hex}`;
};