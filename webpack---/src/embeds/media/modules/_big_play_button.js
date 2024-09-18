/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    Color
} from 'utilities/color.js';
import {
    elemAddClass,
    elemAppend,
    elemBind,
    elemFromObject,
    elemHeight,
    elemIsInside,
    elemRebind,
    elemRemove,
    elemRemoveClass,
    elemStyle,
    elemUnbind,
    elemWidth,
} from 'utilities/elem.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    merge
} from 'utilities/obj.js';

(function(Wistia) {
    if (Wistia.BigPlayButton) {
        return;
    }

    // This class will give you a big play button to manipulate independent of any
    // video. All it takes is a container elem and a set of options.
    //
    // Public methods include:
    //
    // - color(c)
    // - destroy()
    // - fit()
    // - height()
    // - hide()
    // - show()
    // - width()
    //
    // Options include:
    //
    // - color: string, specify the starting color.
    // - heightCorrection: Add this number to the height when calculating centered position
    // - onActivate: function, this event fires if the user has "activated" the play button by clicking or hitting Return while it's focused.
    // - tabbable: boolean, allow the play button to be tabbed to and activated via keyboard.
    // - widthCorrection: Add this number to the width when calculating centered position
    //
    // More event binding options:
    // - onBlur
    // - onClick
    // - onFocus
    // - onKeyup
    // - onMousedown
    // - onMouseout
    // - onMouseover
    // - onMouseup
    // - onTouchend
    // - onTouchmove
    // - onTouchstart
    return (Wistia.BigPlayButton = class BigPlayButton {
        constructor(container, options) {
            this.getBottomTextElemProps = this.getBottomTextElemProps.bind(this);
            this.focus = this.focus.bind(this);
            this.keyup = this.keyup.bind(this);
            this.blur = this.blur.bind(this);
            this.mouseover = this.mouseover.bind(this);
            this.mouseout = this.mouseout.bind(this);
            this.mousedown = this.mousedown.bind(this);
            this.mouseup = this.mouseup.bind(this);
            this.click = this.click.bind(this);
            this.touchstart = this.touchstart.bind(this);
            this.touchmove = this.touchmove.bind(this);
            this.touchend = this.touchend.bind(this);
            this.container = container;
            if (options == null) {
                options = {};
            }
            this.options = this.getDefaultOptions(options);
            this.uuid = `${this.options.uuid}.big_play_button`;
            this.color(this.options.color);
            this.backgroundElem = this.createBackgroundElem();
            this.resetBackground();
            this.elem = this.playElem = this.createPlayElem();
            this.addTopText();
            this.addBottomText();
            elemAppend(this.container, this.backgroundElem);
            elemAppend(this.container, this.playElem);
            this.setupBindings();
        }

        destroy() {
            this.destroyBindings();
            elemRemove(this.playElem);
            elemRemove(this.backgroundElem);
            if (this._bottomTextElem) {
                elemRemove(this._bottomTextElem);
            }
            if (this._topTextElem) {
                elemRemove(this._topTextElem);
            }
            this.elem = null;
            this.backgroundElem = null;
            this.playElem = null;
            this._bottomTextElem = null;
            return (this._topTextElem = null);
        }

        getDefaultOptions(options) {
            const defaults = {
                tabbable: true,
                uuid: seqId(),
                color: '636155',
                borderRadius: 0,
                bottomTextColor: '#fff',
                bottomTextFontFamily: 'Courier New, Courier, Sans-Serif',
                bottomTextBackground: 'none',
                bottomTextInsideButton: false,
                topTextColor: '#fff',
                topTextFontFamily: 'Courier New, Courier, Sans-Serif',
                topTextBackground: 'none',
                widthCorrection: 0,
                heightCorrection: 0,
            };

            return merge(defaults, options);
        }

        createBackgroundElem() {
            return elemFromObject({
                id: `${this.uuid}_background`,
                style: {
                    borderRadius: `${this.options.borderRadius}px`,
                    height: `${this.height()}px`,
                    position: 'absolute',
                    width: `${this.width()}px`,
                    zIndex: 1,
                },
            });
        }

        createPlayElem() {
            const icon = this.options.newRoundedIcons ? this.svgBackgroundPlayIcon() : this.iconBase64();
            return elemFromObject({
                id: `${this.uuid}_graphic`,
                tabindex: this.options.tabbable ? '0' : '-1',
                role: 'button',
                'aria-label': 'Play',
                style: {
                    background: `transparent url(${icon}) no-repeat 0 0`,
                    cursor: 'pointer',
                    display: 'block',
                    height: `${this.graphicHeight()}px`,
                    outline: 'none',
                    position: 'absolute',
                    width: `${this.graphicWidth()}px`,
                    zIndex: 1,
                },
            });
        }

        createBottomTextElem() {
            return elemFromObject({
                id: `${this.uuid}_bottom_text`,
                style: this.getBottomTextElemProps(),
                childNodes: this.options.bottomText,
            });
        }

        getBottomTextElemProps() {
            const props = {
                color: this.options.bottomTextColor,
                fontFamily: this.options.bottomTextFontFamily,
                fontSize: this.textFontSize(),
                background: this.options.bottomTextBackground,
                left: 0,
                position: 'absolute',
                textAlign: 'center',
                width: '100%',
                zIndex: 1,
            };

            if (this.options.bottomTextInsideButton) {
                const lineHeight = `${30}px`;
                props.lineHeight = lineHeight;
                props.bottom = `-${lineHeight}`;
            }

            return props;
        }

        createTopTextElem() {
            return elemFromObject({
                id: `${this.uuid}_top_text`,
                style: {
                    color: this.options.topTextColor,
                    fontFamily: this.options.topTextFontFamily,
                    background: this.options.topTextBackground,
                    fontSize: this.textFontSize(),
                    left: 0,
                    position: 'absolute',
                    textAlign: 'center',
                    width: '100%',
                    zIndex: 1,
                },
                childNodes: this.options.topText,
            });
        }

        textFontSize() {
            if (this.options.bottomTextInsideButton) {
                return '18px';
            }

            if (this.height() < 100) {
                return '11px';
            }
            if (this.shouldShrink()) {
                return '16px';
            }
            return '22px';
        }

        setupBindings() {
            elemBind(this.playElem, 'mouseover', this.mouseover);
            elemBind(this.playElem, 'mouseout', this.mouseout);
            elemBind(this.playElem, 'focus', this.focus);
            elemBind(this.playElem, 'blur', this.blur);
            elemBind(this.playElem, 'mousedown', this.mousedown);
            elemBind(this.playElem, 'mouseup', this.mouseup);
            elemBind(this.playElem, 'click', this.click);
            return elemBind(this.playElem, 'touchstart', this.touchstart);
        }

        destroyBindings() {
            elemUnbind(this.playElem, 'mouseover', this.mouseover);
            elemUnbind(this.playElem, 'mouseout', this.mouseout);
            elemUnbind(this.playElem, 'focus', this.focus);
            elemUnbind(this.playElem, 'blur', this.blur);
            elemUnbind(this.playElem, 'mousedown', this.mousedown);
            elemUnbind(this.playElem, 'mouseup', this.mouseup);
            elemUnbind(this.playElem, 'click', this.click);
            elemUnbind(this.playElem, 'touchstart', this.touchstart);
            elemUnbind(document, 'touchmove', this.touchmove);
            elemUnbind(document, 'touchend', this.touchend);
            return elemUnbind(document, 'keyup', this.keyup);
        }

        focus() {
            elemAddClass(this.playElem, 'wistia_focus');
            if (!this.onMobile() && this.options.autoHighlight !== false) {
                this.highlightBackground();
            }
            elemRebind(document, 'keyup', this.keyup);
            this._focus = true;
            if (typeof this.options.onFocus === 'function') {
                this.options.onFocus(...arguments);
            }
            return true;
        }

        keyup(event) {
            if (typeof this.options.onKeyup === 'function') {
                this.options.onKeyup(...arguments);
            }
            // spacebar: 32, enter: 13
            if (event.keyCode === 32 || event.keyCode === 13) {
                if (typeof this.options.onActivate === 'function') {
                    this.options.onActivate(...arguments);
                }
            }
            return true;
        }

        blur() {
            elemUnbind(this.playElem, 'keyup', this.keyup);
            elemRemoveClass(this.playElem, 'wistia_focus');
            if (!this.onMobile() && this.options.autoHighlight !== false) {
                this.resetBackground();
            }
            this._focus = false;
            if (typeof this.options.onBlur === 'function') {
                this.options.onBlur(...arguments);
            }
            return true;
        }

        mouseover() {
            elemAddClass(this.playElem, 'wistia_mouseover');
            if (!this.onMobile() && this.options.autoHighlight !== false) {
                this.highlightBackground();
            }
            if (typeof this.options.onMouseover === 'function') {
                this.options.onMouseover(...arguments);
            }
            return true;
        }

        mouseout() {
            elemRemoveClass(this.playElem, 'wistia_mouseover');
            if (!this.onMobile() && this.options.autoHighlight !== false) {
                this.resetBackground();
            }
            if (typeof this.options.onMouseout === 'function') {
                this.options.onMouseout(...arguments);
            }
            return true;
        }

        mousedown() {
            elemAddClass(this.playElem, 'wistia_mousedown');
            if (typeof this.options.onMousedown === 'function') {
                this.options.onMousedown(...arguments);
            }
            return true;
        }

        mouseup() {
            elemRemoveClass(this.playElem, 'wistia_mousedown');
            if (typeof this.options.onMouseup === 'function') {
                this.options.onMouseup(...arguments);
            }
            return true;
        }

        click() {
            if (typeof this.options.onClick === 'function') {
                this.options.onClick(...arguments);
            }
            if (!this._blockClickActivate) {
                if (typeof this.options.onActivate === 'function') {
                    this.options.onActivate(...arguments);
                }
            }
            return true;
        }

        touchstart() {
            if (this.onMobile() || this.options.autoHighlight === false) {
                this.highlightBackground();
            }
            if (typeof this.options.onTouchstart === 'function') {
                this.options.onTouchstart(...arguments);
            }
            this._swiped = false;
            elemBind(document, 'touchmove', this.touchmove);
            elemBind(document, 'touchend', this.touchend);
            return true;
        }

        touchmove() {
            if (this._highlighted && this.onMobile() && this.options.autoHighlight !== false) {
                this.resetBackground();
            }
            this._swiped = true;
            if (typeof this.options.onTouchmove === 'function') {
                this.options.onTouchmove(...arguments);
            }
            return true;
        }

        touchend() {
            elemUnbind(document, 'touchmove', this.touchmove);
            elemUnbind(document, 'touchend', this.touchend);
            if (this.onMobile() && this.options.autoHighlight !== false) {
                this.resetBackground();
            }
            if (typeof this.options.onTouchend === 'function') {
                this.options.onTouchend(...arguments);
            }

            if (!this._swiped) {
                if (typeof this.options.onActivate === 'function') {
                    this.options.onActivate(...arguments);
                }
                // "onActivate" should only trigger once on touchend, but the click
                // event might fire too after a 300ms delay. Let's block that if we've
                // already triggered activate via touchend.
                this.blockClickActivateTemporarily();
            }
            this._swiped = false;
            return true;
        }

        onMobile() {
            return Wistia.detect.iphone || Wistia.detect.ipad || Wistia.detect.android;
        }

        blockClickActivateTemporarily() {
            this._blockClickActivate = true;
            return doTimeout(
                `${this.uuid}.block_click_activate`,
                () => {
                    return (this._blockClickActivate = false);
                },
                350,
            );
        }

        highlightBackground() {
            this._highlighted = true;
            return (this.backgroundElem.style.backgroundColor = this.highlightColor()
                .alpha(0.8)
                .toRgbaOrHex());
        }

        resetBackground() {
            this._highlighted = false;
            return (this.backgroundElem.style.backgroundColor = this.color().alpha(0.8).toRgbaOrHex());
        }

        fit() {
            elemStyle(this.backgroundElem, {
                height: `${this.height()}px`,
                width: `${this.width()}px`,
            });

            const icon = this.options.newRoundedIcons ? this.svgBackgroundPlayIcon() : this.iconBase64();
            elemStyle(this.playElem, {
                backgroundImage: `url(${icon})`,
                backgroundSize: `${this.graphicWidth()}px ${this.graphicHeight()}px`,
                height: `${this.graphicHeight()}px`,
                width: `${this.graphicWidth()}px`,
            });

            if (this._bottomTextElem) {
                elemStyle(this._bottomTextElem, {
                    fontSize: this.textFontSize()
                });
            }

            if (this._topTextElem) {
                elemStyle(this._topTextElem, {
                    fontSize: this.textFontSize()
                });
            }

            return this.center();
        }

        show() {
            this.fit();
            return elemStyle([this.backgroundElem, this.playElem], {
                display: 'block'
            });
        }

        hide() {
            return elemStyle([this.backgroundElem, this.playElem], {
                display: 'none'
            });
        }

        correctedWidth() {
            let result = this.containerWidth();
            result += this.options.widthCorrection;
            return result;
        }

        correctedHeight() {
            let result = this.containerHeight();
            result += this.options.heightCorrection;
            return result;
        }

        mouseEventTargetIsInside(event) {
            return (
                elemIsInside(event.target, this.playElem) ||
                (this._bottomTextElem && elemIsInside(event.target, this._bottomTextElem)) ||
                (this._topTextElem && elemIsInside(event.target, this._topTextElem))
            );
        }

        center() {
            elemStyle(this.backgroundElem, {
                left: `${this.leftBackgroundOffset()}px`,
                top: `${this.topBackgroundOffset()}px`,
            });

            elemStyle(this.playElem, {
                left: `${this.leftGraphicOffset()}px`,
                top: `${this.topGraphicOffset()}px`,
            });

            if (this._bottomTextElem && !this.options.bottomTextInsideButton) {
                elemStyle(this._bottomTextElem, {
                    left: 0,
                    top: `${this.bottomGraphicOffset() + 3}px`,
                });
            }

            if (this._topTextElem) {
                return elemStyle(this._topTextElem, {
                    bottom: `${this.bottomGraphicOffset() + 3}px`,
                    left: 0,
                });
            }
        }

        leftBackgroundOffset() {
            return Math.round((this.correctedWidth() - this.width()) / 2);
        }

        topBackgroundOffset() {
            return Math.round((this.correctedHeight() - this.height()) / 2);
        }

        topGraphicOffset() {
            return Math.round((this.correctedHeight() - this.graphicHeight()) / 2);
        }

        leftGraphicOffset() {
            return Math.round((this.correctedWidth() - this.graphicWidth()) / 2);
        }

        rightGraphicOffset() {
            return this.leftGraphicOffset() + this.graphicWidth();
        }

        bottomGraphicOffset() {
            return this.topGraphicOffset() + this.graphicHeight();
        }

        containerWidth() {
            return elemWidth(this.container);
        }

        containerHeight() {
            return elemHeight(this.container);
        }

        shouldShrink() {
            return this.containerWidth() <= 320 || this.containerHeight() <= 200;
        }

        graphicWidth() {
            if (this.shouldShrink()) {
                return 60;
            }
            return 127;
        }

        graphicHeight() {
            if (this.shouldShrink()) {
                return 38;
            }
            return 81;
        }

        width() {
            if (this._cover) {
                return this.containerWidth();
            }
            return this.graphicWidth();
        }

        height() {
            if (this._cover) {
                return this.containerHeight();
            }
            return this.graphicHeight();
        }

        cover() {
            this._cover = true;

            if (this.supportsMultiply()) {
                elemStyle(this.backgroundElem, {
                    mixBlendMode: 'multiply'
                });
                this.color(this.color(), 0.5);
            } else {
                this.color(this.color(), 0.3);
            }

            this.addBottomText();
            this.addTopText();

            return this.fit();
        }

        uncover() {
            this._cover = false;

            if (this.supportsMultiply()) {
                elemStyle(this.backgroundElem, {
                    mixBlendMode: 'normal'
                });
            }
            this.color(this.color(), 0.76);

            this.removeBottomText();
            this.removeTopText();

            return this.fit();
        }

        addBottomText() {
            if (!this.options.bottomText) {
                return;
            }
            if (this._bottomTextElem) {
                return;
            }

            const parent = this.options.bottomTextInsideButton ? this.playElem : this.container;

            this.removeBottomText();
            this._bottomTextElem = this.createBottomTextElem();
            return elemAppend(parent, this._bottomTextElem);
        }

        addBottomTextFromNewOptions(options) {
            this.options = merge(this.options, options);
            this.removeBottomText();
            return this.addBottomText();
        }

        removeBottomText() {
            if (this._bottomTextElem) {
                elemRemove(this._bottomTextElem);
                return (this._bottomTextElem = null);
            }
        }

        addTopText() {
            if (!this.options.topText) {
                return;
            }
            if (this._topTextElem) {
                return;
            }

            this.removeTopText();
            this._topTextElem = this.createTopTextElem();
            return elemAppend(this.container, this._topTextElem);
        }

        removeTopText() {
            if (this._topTextElem) {
                elemRemove(this._topTextElem);
                return (this._topTextElem = null);
            }
        }

        setBorderRadius(radius) {
            elemStyle(this.backgroundElem, {
                borderRadius: `${radius}px`
            });
        }

        uncoverImmediately() {
            elemStyle(this.backgroundElem, {
                transition: 'none'
            });
            return requestAnimationFrame(() => {
                this.uncover();
                return requestAnimationFrame(() => {
                    return elemStyle(this.backgroundElem, {
                        transition: 'all 80ms ease-out'
                    });
                });
            });
        }

        supportsMultiply() {
            return Wistia.detect.chrome || Wistia.detect.safari;
        }

        color(c, alpha) {
            if (alpha == null) {
                alpha = 0.8;
            }
            if (c != null) {
                this._color = new Color(c).alpha(alpha);
                if (this.backgroundElem != null) {
                    this.backgroundElem.style.backgroundColor = this._color.toRgbaOrHex();
                }
                return this._color;
            }
            return this._color.clone();
        }

        highlightColor() {
            return this.color().clone().lighten(40);
        }

        iconBase64() {
            if (window.devicePixelRatio > 1) {
                return this.retinaBase64();
            }
            if (this.shouldShrink()) {
                return this.smallNonRetinaBase64();
            }
            return this.bigNonRetinaBase64();
        }

        svgBackgroundPlayIcon() {
            const svg = encodeURIComponent(
                ' <svg width="254" height="162" xmlns="http://www.w3.org/2000/svg"> <path clip-rule="evenodd" d="m106.06,44.61c-3.05,-2.12 -7.21,0.08 -7.21,3.79l0,65.2c0,3.73 4.16,5.91 7.21,3.79l47.1,-32.63c2.65,-1.82 2.65,-5.72 0,-7.54l-47.1,-32.63l0,0.02l0,-0.01z" fill="white" fill-rule="evenodd"/></svg>',
            );

            return `\
data:image/svg+xml;utf8,${svg}`;
        }

        retinaBase64() {
            return `\
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAACiCAYAAABh2nDdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAulJREFUeNrs3d1tGlEQBtAlSgEpgXSAO8AdxB2QDuwONhWQDpxUAB14OyAdmA5IB+SOvDdCSHnLn/WdI91XP4z1aYY77DIMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAvnc/nQzsrlYCs4JdTOxvVgKzgd7t23qkKZAW/PLezVhnICn43qg7kBb88tbNUJcgKfr/4+6BSkBX8buviD/KCf7bzh8zgd/cqB3nBt/OH0OD3i7+1KkJW8O38ITj4/eJvqaKQFXw7fwgNfvfo4i/PQgleV/D/0J8+tnO3WCy+qXKGN0pAU5/3D3b+Oj5ZHf/SNHf/7yqu45Nj3Y7n/AWfQHXZV4/5bpXCqE/GqH+tLvw+uvjT8cmymrv/Ril0fHI6/qX93P1d/Ak+QcEvx8HO36hPnOXwsvMflULHJ6fjX5oGO38dnzjr4WXn72EfwSdM7fx3XvBp1Cdn1L9m56/jE6jv/D3so+MT1PEv2fnr+ASqC7+Dh30EnzzLefQflcKoT8aof60u/Grnf/Sf1PHJsZpHfzt/wSfMz52/Ugg+WWrk/6oMgk+OL+3c+oLPv/dWCfgLapdfO/29Uuj4ZJjauRF6wSfHpxb4Wys8oz4ZjvNoPymFjk+G/TzaC73gE6Au8B5a4L2Rx6hPCM/h6/iE+dwCfyP0Oj45o73dvOATZBq8XdeoT5S+mxd6HZ8Ax8Ev6Oj4ROm7eaEXfAL0Czyf5436hPCqLB2fMH03L/Q6PiGj/Z3v2ev45Kiwvxd6wSfHg908/KfOv1+97nqlspAT/Ec/aw05wT/5UQvICn6N9kuVhJzgjyoIOcE/+alqyAr+zgUe5AS/uvy9ikFO8O3mISz4W6M95ATfbh7Cgv9kNw9ZwR9VBXKC/+wCD7KCbzcPYcHfqAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvE4/BBgAB9Vp0xXzB8AAAAAASUVORK5CYII=\
`;
        }

        bigNonRetinaBase64() {
            return `\
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAABRCAYAAAD7G3lVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATFJREFUeNrs22FtwkAYx+F2QcAkMAfgYBKQwBxMQh1MwiRQB+CgEoaDzkG5S1a+E5IF+n+e5D4ve3+7N0s4mgYAAAAAAAAAAAAA7jFN06cp5MavjuWsTSMzfjWWszORzPizQzmvJpMZ3xYIj28LiG8LpMeffdsCufGrn3LeTS0z/uzLFsiNbwuEx7cFxL9ugY1pZsafdSaaG78abIHc+LaA+MvbAi/+XG5Sww9L2QLtEm/+P/2oUzkfbduexc+LX51L/DdrP09fzvaZf4GVhjf7/Vv3vVFk/bfvMUhg/PoAZG+6efE9Aw+MP/oCSGZ8tz0wvtseGn9w2zPjdyaXF99n9aHx3fbA+G57aHy3PTC+N/mh8b3DD4zvtofGd9tD47vtAAAAAAAAAAAAADymiwADAOSj1JBfF8xMAAAAAElFTkSuQmCC\
`;
        }

        smallNonRetinaBase64() {
            return `\
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJNJREFUeNrs1ksNhEAURNGWgAQkjAQkIAUJ7QApIwEJSEACEh6PBatJhmZJ1T1JCahU+lMKAACAioj4Zjqnwqc9MzoVvszya8evLTM4FdZeO/7TWzva6Kwd7dbMx6nwpboV3l99rh+WXV5/lh+sOrlcWueqvcOzpLNqQ2GtVW8KT0WZ3MeisXAtLixWBQAAQDoEGACTzSwy3SX7YgAAAABJRU5ErkJggg==\
`;
        }
    });
})(window.Wistia);