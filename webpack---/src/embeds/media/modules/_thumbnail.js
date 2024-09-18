/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    eV1Protocol
} from 'utilities/hosts.js';
import {
    isObject,
    clone
} from 'utilities/obj.js';
import {
    elemAddClass,
    elemAppend,
    elemBind,
    elemFromObject,
    elemHeight,
    elemInDom,
    elemIsHidden,
    elemPrepend,
    elemRebind,
    elemRemove,
    elemRemoveClass,
    elemStyle,
    elemUnbind,
    elemWidth,
} from 'utilities/elem.js';
import {
    doTimeout,
    clearTimeouts
} from 'utilities/timeout-utils.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    isMouseDownRecently
} from 'utilities/isMouseDown.js';
import {
    Color
} from 'utilities/color.js';

(function(Wistia) {
    if (Wistia.Thumbnail) {
        return;
    }

    return (Wistia.Thumbnail = class Thumbnail {
        constructor(container, options) {
            let url;
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
            this.showOverlay = this.showOverlay.bind(this);
            this.hideOverlay = this.hideOverlay.bind(this);
            this.container = container;
            this.options = options;
            this.uuid = `${this.options.uuid || seqId()}.thumbnail`;
            if (this.options.tabbable == null) {
                this.options.tabbable = true;
            }

            if (!(this.options.images ? .length > 0)) {
                url =
                    eV1Protocol() === 'http:' ?
                    'http://embed.wistia.com/deliveries/c0612aa8586d19f8471478c66c73ef7ab3f8e334/default-thumb.jpg' :
                    'https://embed-ssl.wistia.com/deliveries/c0612aa8586d19f8471478c66c73ef7ab3f8e334/default-thumb.jpg';
                this.options.images = [{
                    url,
                    height: 360,
                    width: 640,
                }, ];
            }

            this.elem = this.createElem();
            if (this.options.prepend) {
                elemPrepend(this.container, this.elem);
            } else {
                elemAppend(this.container, this.elem);
            }
            this.img = this.createImg();
            this.overlay = this.createOverlay();
            this.focusIndicator = this.createFocusIndicator();
            elemAppend(this.elem, this.focusIndicator);
            this.fit();
            this.setupBindings();

            if (this.options.delayInit) {
                const bestImage = this.bestImage();
                this.quickPreload(bestImage.url);
            } else {
                this.initialize();
            }

            if (this.options.bigPlayButton != null && this.options.bigPlayButton !== false) {
                const bpbOptions = isObject(this.options.bigPlayButton) ?
                    clone(this.options.bigPlayButton) :
                    {};
                this.bigPlayButton = new Wistia.BigPlayButton(this.elem, bpbOptions);
            }
        }

        initialize() {
            if (this.isBakeryThumbnail()) {
                return this.loadImageFirstTime();
            }
            return this.loadImageFirstTimeAndGetDimensions();
        }

        destroy() {
            this.bigPlayButton ? .destroy();
            this.destroyBindings();
            elemRemove(this.elem);
            return (this.elem = this.img = this.overlay = this.focusIndicator = null);
        }

        preventDefault(event) {
            return event.preventDefault();
        }

        setupBindings() {
            elemBind(this.elem, 'mouseover', this.mouseover);
            elemBind(this.elem, 'mouseout', this.mouseout);
            elemBind(this.elem, 'focus', this.focus);
            elemBind(this.elem, 'blur', this.blur);
            elemBind(this.elem, 'mousedown', this.mousedown);
            elemBind(this.elem, 'mouseup', this.mouseup);
            elemBind(this.elem, 'click', this.click);
            elemBind(this.elem, 'touchstart', this.touchstart);
            return elemBind(this.img, 'mousedown', this.preventDefault);
        }

        destroyBindings() {
            elemUnbind(this.elem, 'mouseover', this.mouseover);
            elemUnbind(this.elem, 'mouseout', this.mouseout);
            elemUnbind(this.elem, 'focus', this.focus);
            elemUnbind(this.elem, 'blur', this.blur);
            elemUnbind(this.elem, 'mousedown', this.mousedown);
            elemUnbind(this.elem, 'mouseup', this.mouseup);
            elemUnbind(this.elem, 'click', this.click);
            elemUnbind(this.elem, 'touchstart', this.touchstart);
            elemUnbind(this.img, 'mousedown', this.preventDefault);
            elemUnbind(document, 'touchmove', this.touchmove);
            elemUnbind(document, 'touchend', this.touchend);
            return elemUnbind(document, 'keyup', this.keyup);
        }

        focus() {
            elemAddClass(this.elem, 'wistia_focus');
            if (this.options.tabbable && !isMouseDownRecently()) {
                this.focusIndicator.style.boxShadow = '0 0 0 2px #fff inset';
            }
            elemRebind(document, 'keyup', this.keyup);
            this._focus = true;
            this.options.onFocus ? .(...arguments);
            return true;
        }

        keyup(event) {
            this.options.onKeyup ? .(...arguments);
            // spacebar: 32, enter: 13
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.options.onActivate ? .(...arguments);
            }
            return true;
        }

        blur() {
            elemUnbind(document, 'keyup', this.keyup);
            elemRemoveClass(this.elem, 'wistia_focus');
            this.focusIndicator.style.boxShadow = 'none';
            this._focus = false;
            this.options.onBlur ? .(...arguments);
            return true;
        }

        mouseover() {
            elemAddClass(this.elem, 'wistia_mouseover');
            this.options.onMouseover ? .(...arguments);
            return true;
        }

        mouseout() {
            elemRemoveClass(this.elem, 'wistia_mouseover');
            return this.options.onMouseout ? .(...arguments);
        }

        mousedown() {
            elemAddClass(this.elem, 'wistia_mousedown');
            this.options.onMousedown ? .(...arguments);
            return true;
        }

        mouseup() {
            elemRemoveClass(this.elem, 'wistia_mousedown');
            this.options.onMouseup ? .(...arguments);
            return true;
        }

        click() {
            this.options.onClick ? .(...arguments);
            if (!this._blockClickActivate && !this._swiped) {
                this.options.onActivate ? .(...arguments);
            }
            return true;
        }

        touchstart() {
            this.options.onTouchstart ? .(...arguments);
            this._swiped = false;
            elemBind(document, 'touchmove', this.touchmove);
            elemBind(document, 'touchend', this.touchend);
            return true;
        }

        touchmove() {
            doTimeout(`${this.uuid}.hide_overlay_later`, this.hideOverlay, 300);
            this._swiped = true;
            this.options.onTouchmove ? .(...arguments);
            return true;
        }

        touchend() {
            elemUnbind(document, 'touchmove', this.touchmove);
            elemUnbind(document, 'touchend', this.touchend);
            this.options.onTouchend ? .(...arguments);

            if (!this._swiped) {
                this.options.onActivate ? .(...arguments);
                // "onActivate" should only trigger once on touchend, but the click
                // event might fire too after a 300ms delay. Let's block that if we've
                // already triggered activate via touchend.
                this.blockClickActivateTemporarily();
            }

            this._swiped = false;

            return true;
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

        hide() {
            return (this.elem.style.display = 'none');
        }

        show() {
            return (this.elem.style.display = 'block');
        }

        isBakeryThumbnail() {
            return !this.isNonBakeryThumbnail();
        }

        isNonBakeryThumbnail() {
            return (
                this.options.images.length === 1 && !Wistia.Player.isBakeryUrl(this.options.images[0].url)
            );
        }

        bestImage(forceHi) {
            if (forceHi == null) {
                forceHi = false;
            }
            const sortedImages = this.sortedImages();

            // When this first loads it's possible that @img will have a width of -1
            // until fit() fully takes hold. This could probably be fixed a better
            // way, but this code is here to ensure that we don't return a bogus
            // bestImage() if that's the case.
            const currentWidth = Math.max(elemWidth(this.img), elemWidth(this.container));

            // For sharper screens, let's load up larger images so the thumbnail
            // looks hella sharp
            const desiredWidth = (window.devicePixelRatio || 1) * currentWidth;

            if (!forceHi) {
                if (desiredWidth <= sortedImages[0].width) {
                    return sortedImages[0];
                }

                for (let image of Array.from(sortedImages)) {
                    if (image.width >= desiredWidth) {
                        return image;
                    }
                }
            }

            return sortedImages[sortedImages.length - 1];
        }

        sortedImages() {
            return this._sortedImages != null ?
                this._sortedImages :
                (this._sortedImages = (() => {
                    const result = [];

                    for (let image of Array.from(this.options.images.sort((a, b) => a.width - b.width))) {
                        const h = clone(image);
                        h.aspect = h.width / h.height;
                        result.push(h);
                    }

                    return result;
                })());
        }

        quickPreload(url) {
            let imgPromise;
            if (this._quickPreloads == null) {
                this._quickPreloads = {};
            }

            // We're already preloading this url; just wait on the existing one.
            if (this._quickPreloads[url]) {
                return this._quickPreloads[url];
            }

            this._quickPreloads[url] = imgPromise = new Promise((resolve) => {
                const img = new Image();
                const finishImgLoad = () => {
                    elemUnbind(img, 'load', finishImgLoad);
                    elemUnbind(img, 'error', finishImgLoad);
                    clearTimeouts(`${this.uuid}.long_still_load`);
                    return resolve(img);
                };

                elemBind(img, 'load', finishImgLoad);
                elemBind(img, 'error', finishImgLoad);
                doTimeout(`${this.uuid}.long_still_load`, finishImgLoad, 1000);

                img.src = url;

                if (img.complete) {
                    finishImgLoad();
                }
            });

            return imgPromise;
        }

        surePreload(url, callback) {
            const img = new Image();
            const finishImgLoad = () => {
                elemUnbind(img, 'load', finishImgLoad);
                clearTimeouts(`${this.uuid}.long_still_load`);
                return callback ? .(img);
            };
            elemBind(img, 'load', finishImgLoad);

            return (img.src = url);
        }

        loadImageFirstTimeAndGetDimensions() {
            const bestImage = this.bestImage();
            return this.quickPreload(bestImage.url).then((img) => {
                elemStyle(img, {
                    visibility: 'hidden',
                    position: 'absolute'
                });
                elemAppend(document.body, img);
                this._customHeight = elemHeight(img);
                this._customWidth = elemWidth(img);
                this._customAspect = this._customWidth / this._customHeight;
                elemRemove(img);
                this._sortedImages = null;

                if (!this.elem || !this.img) {
                    return;
                }
                elemAppend(this.elem, this.img);
                this.img.src = bestImage.url;
                return this.fitWithoutReload();
            });
        }

        loadImageFirstTime() {
            const bestImage = this.bestImage();
            return this.quickPreload(bestImage.url).then(() => {
                if (!this.elem || !this.img) {
                    return;
                }
                elemAppend(this.elem, this.img);
                this.img.src = bestImage.url;
                return this.fitWithoutReload();
            });
        }

        loadImageAtProperSize() {
            const bestImage = this.bestImage();
            return this.surePreload(bestImage.url, () => {
                if (!this.elem || !this.img) {
                    return;
                }
                this.img.src = bestImage.url;
                return this.fitWithoutReload();
            });
        }

        createElem() {
            return elemFromObject({
                id: this.uuid,
                tabindex: this.options.tabbable ? '0' : '-1',
                style: {
                    cursor: 'default',
                    borderRadius: this.options.borderRadius ? `${this.options.borderRadius}px` : '0',
                    display: 'block',
                    height: '100%',
                    overflow: 'hidden',
                    outline: 'none',
                    position: 'relative',
                    width: '100%',
                },
            });
        }

        createImg() {
            return elemFromObject({
                tagName: 'img',
                id: `${this.uuid}_img`,
                alt: this.getAltTextValue(),
                style: {
                    border: 0,
                    display: 'block',
                    float: 'none',
                    height: '100%',
                    margin: 0,
                    maxHeight: 'none',
                    maxWidth: 'none',
                    padding: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: '100%',
                },
            });
        }

        createFocusIndicator() {
            return elemFromObject({
                id: `${this.uuid}_focus_indicator`,
                style: {
                    height: '100%',
                    left: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: 1,
                },
            });
        }

        getAltTextValue() {
            if (this.options.altText != null) {
                return this.options.altText;
            }
            const baseText = 'Wistia video thumbnail';
            const mediaSpecificText = this.options.name != null ? ` - ${this.options.name}` : '';
            return baseText + mediaSpecificText;
        }

        // This can only be used on browsers that support pointer-events: none.
        // Otherwise the element will appear and block mouseup on the originating
        // element.
        createOverlay() {
            const elem = elemFromObject({
                id: `${this.uuid}_overlay`,
                style: {
                    border: 0,
                    display: 'block',
                    float: 'none',
                    height: '100%',
                    margin: 0,
                    maxWidth: 'none',
                    padding: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: '100%',
                },
            });
            elemStyle(elem, {
                backgroundColor: 'rgba(0,0,0,.5)'
            });
            return elem;
        }

        showOverlay() {
            return elemAppend(this.elem, this.overlay);
        }

        hideOverlay() {
            return elemRemove(this.overlay);
        }

        containerWidth() {
            return elemWidth(this.container);
        }

        containerHeight() {
            return elemHeight(this.container);
        }

        containerAspect() {
            return this.containerWidth() / this.containerHeight();
        }

        fitStrategy(strategy) {
            if (strategy != null) {
                this.options.fitStrategy = strategy;
                return this.fit();
            }
            if (/^cropfill|letterbox$/.test(this.options.fitStrategy)) {
                return this.options.fitStrategy;
            }
            return 'letterbox';
        }

        fit() {
            this.fitWithoutReload();
            return this.loadImageAtProperSize();
        }

        fitWithoutReload() {
            elemStyle(this.elem, {
                height: `${this.containerHeight()}px`,
                width: `${this.containerWidth()}px`,
            });

            if (this.fitStrategy() === 'cropfill') {
                this.cropFillFit();
            } else {
                this.letterboxFit();
            }

            return this.bigPlayButton ? .fit();
        }

        setBorderRadius(radius) {
            elemStyle(this.elem, {
                borderRadius: `${radius}px`
            });
        }

        stretchLimit() {
            if (this.options.stretchLimit != null) {
                return this.options.stretchLimit;
            }
            return 10;
        }

        cropFillFit() {
            let newHeight;
            let newWidth;
            const bestImageAspect = this._customAspect || this.bestImage().aspect;
            const containerWidth = this.containerWidth();
            const containerHeight = this.containerHeight();
            const containerAspect = this.containerAspect();

            if (this.options.stillSnap === false) {
                newWidth = containerWidth;
                newHeight = containerHeight;
            } else if (containerAspect > bestImageAspect) {
                newWidth = containerWidth;
                newHeight = Math.round(newWidth / bestImageAspect);
            } else if (containerAspect <= bestImageAspect) {
                newHeight = containerHeight;
                newWidth = Math.round(newHeight * bestImageAspect);
            }

            const ySpace = containerHeight - newHeight;
            const xSpace = containerWidth - newWidth;
            let yOffset = Math.round(ySpace / 2);
            let xOffset = Math.round(xSpace / 2);

            // Don't worry about stretching up to 10px
            if (Math.abs(yOffset * 2) <= this.stretchLimit()) {
                yOffset = 0;
                newHeight = containerHeight;
            }
            if (Math.abs(xOffset * 2) <= this.stretchLimit()) {
                xOffset = 0;
                newWidth = containerWidth;
            }

            if (elemIsHidden(this.elem) || !elemInDom(this.elem)) {
                // If the video is hidden, then the width and height will be really
                // wrong. Just fall back to 100% so it doesn't look weird when it comes
                // unhidden.
                elemStyle(this.img, {
                    height: '100%',
                    width: '100%'
                });
                xOffset = yOffset = 0;
            } else {
                // Use the magical logic above to set the width and height!
                elemStyle(this.img, {
                    height: `${newHeight}px`,
                    width: `${newWidth}px`
                });
            }

            // Apply the offset to the image. Also reset the border in case the
            // letterbox strategy was being used.
            return elemStyle(this.img, {
                border: 0,
                left: `${xOffset}px`,
                top: `${yOffset}px`
            });
        }

        letterboxFit() {
            let bottomBorder;
            let left;
            let newHeight;
            let newWidth;
            let rightBorder;
            const bestImageAspect = this._customAspect || this.bestImage().aspect;
            const containerWidth = this.containerWidth();
            const containerHeight = this.containerHeight();
            const containerAspect = this.containerAspect();

            if (this.options.stillSnap === false) {
                newWidth = containerWidth;
                newHeight = containerHeight;
            } else if (containerAspect > bestImageAspect) {
                newHeight = containerHeight;
                newWidth = Math.round(newHeight * bestImageAspect);
            } else if (containerAspect <= bestImageAspect) {
                newWidth = containerWidth;
                newHeight = Math.round(newWidth / bestImageAspect);
            }

            // Figure out how much border we need to add
            const ySpace = Math.max(0, containerHeight - newHeight);
            const xSpace = Math.max(0, containerWidth - newWidth);
            const yBorder = Math.round(ySpace / 2);
            const xBorder = Math.round(xSpace / 2);
            let topBorder = (bottomBorder = yBorder);
            let leftBorder = (rightBorder = xBorder);

            // Don't worry about stretching up to 10px
            if (bottomBorder * 2 <= this.stretchLimit()) {
                bottomBorder = 0;
                topBorder = 0;
                newHeight = containerHeight;
            }
            if (leftBorder * 2 <= this.stretchLimit()) {
                leftBorder = 0;
                rightBorder = 0;
                newWidth = containerWidth;
            }

            // When letterboxing, we show a black background by default. We can use
            const borderColor = this.options.backgroundColor || '#000';
            if (borderColor === 'transparent') {
                // eslint-disable-next-line no-unused-expressions
                borderColor;
            } else {
                new Color(borderColor).alpha(0.8).toRgbaOrHex();
            }

            if (elemIsHidden(this.elem) || !elemInDom(this.elem)) {
                // If the video is hidden, then the width and height will be really
                // wrong. Just fall back to 100% so it doesn't look weird when it comes
                // unhidden.
                elemStyle(this.img, {
                    height: '100%',
                    width: '100%'
                });
                topBorder = bottomBorder = left = rightBorder = 0;
            } else {
                // Use the magical logic above to set the width and height!
                elemStyle(this.img, {
                    height: `${newHeight}px`,
                    width: `${newWidth}px`
                });
            }

            // Apply the border to the image. It also resets left/top in case the
            // cropfill strategy was being used.
            return elemStyle(this.img, {
                borderTop: `${topBorder}px solid ${borderColor}`,
                borderBottom: `${bottomBorder}px solid ${borderColor}`,
                borderLeft: `${leftBorder}px solid ${borderColor}`,
                borderRight: `${rightBorder}px solid ${borderColor}`,
                left: 0,
                top: 0,
            });
        }
    });
})(window.Wistia);