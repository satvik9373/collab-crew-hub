import {
    Wistia
} from 'wistia_namespace.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    globalOn,
    globalTrigger
} from 'utilities/globalBindAndTrigger.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';
import {
    isNil,
    isNotNil
} from '@wistia/type-guards';
import {
    elemBind,
    elemCancelFullscreen,
    elemHeight,
    elemRebind,
    elemRequestFullscreen,
    elemStyle,
    elemUnbind,
    elemWidth,
    fullscreenElement,
    inUserEventContext,
} from 'utilities/elem.js';
import {
    scrollLeft
} from '../../../../../utilities/scroll.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';

const detect = cachedDetect();

class FullscreenBehavior extends PlayerBehavior {
    init() {
        const impl = this.impl;

        if (isNil(this.impl.embedElement._fullscreenState)) {
            this.impl.embedElement._fullscreenState = {
                heightBeforeFullscreen: undefined,
                inFullscreen: false,
                nativeFullscreen: false,
                widthBeforeFullscreen: undefined,
            };
        }

        this.unbinds.push(
            globalOn('enterfullscreen', this.onEnterFullscreen),
            globalOn('cancelfullscreen', this.onCancelFullscreen),
            elemBind(window, 'resize', () => {
                this.fullscreenResizeToWindowFlurry();
            }),
            impl.on('playpending', this.maybeAutoFullscreen),
        );

        // there's no engine available until whenVideoElementInDom resolves.
        impl.whenVideoElementInDom().then(() => {
            impl.engine.bind('webkitbeginfullscreen', this.onEnterWebkitFullscreen);
            impl.engine.bind('webkitendfullscreen', this.onCancelFullscreen);
        });
    }

    onEnterFullscreen = (elem) => {
        const impl = this.impl;
        if (elem === impl.chrome || impl.embedElement.usingFullscreenContainer === true) {
            // When using fullscreen API
            impl.info('_onEnterFullscreen');
            impl.trigger('beforeenterfullscreen');
            this.setFullscreenStateOnEmbedElement({
                inFullscreen: true
            });
            impl.notFullscreen(false);
            impl.behaviors.embed.updateBackgroundColor();
            if (impl.engine) {
                impl.engine.onEnterFullscreen();
            }

            impl.trigger('enterfullscreen');
            impl.embedElement.dispatchEvent(new CustomEvent('enter-fullscreen'));
            impl.trigger('enter-fullscreen'); // legacy
        }
    };

    onEnterWebkitFullscreen = (_e) => {
        // When fullscreening <video> directly (iOS iframes)
        const impl = this.impl;
        this.setFullscreenStateOnEmbedElement({
            inFullscreen: true,
            nativeFullscreen: true
        });
        impl.notFullscreen(false);
        impl.trigger('enterfullscreen');
        impl.embedElement.dispatchEvent(new CustomEvent('enter-fullscreen'));
        impl.trigger('enter-fullscreen'); // legacy
    };

    onCancelFullscreen = () => {
        const impl = this.impl;
        const {
            inFullscreen,
            nativeFullscreen
        } = this.getFullscreenStateOnEmbedElement();

        if (nativeFullscreen) {
            this.setFullscreenStateOnEmbedElement({
                inFullscreen: false,
                nativeFullscreen: false
            });
            impl.notFullscreen(true);
            if (impl.embedElement.tagName === 'WISTIA-PLAYER') {
                impl.embedElement.cancelFullscreen();
            }
            impl.trigger('cancelfullscreen');
            impl.embedElement.dispatchEvent(new CustomEvent('cancel-fullscreen'));
            impl.trigger('cancel-fullscreen'); // legacy
        } else if (inFullscreen) {
            impl.info('onCancelFullscreen');
            this.setFullscreenStateOnEmbedElement({
                inFullscreen: false
            });
            impl.notFullscreen(true);
            impl.behaviors.embed.updateBackgroundColor();
            if (impl.embedElement.tagName === 'WISTIA-PLAYER') {
                impl.embedElement.cancelFullscreen();
            }
            if (impl.engine) {
                impl.engine.onLeaveFullscreen();
            }
            impl.trigger('cancelfullscreen');
            impl.embedElement.dispatchEvent(new CustomEvent('cancel-fullscreen'));
            impl.trigger('cancel-fullscreen'); // legacy
        }
    };

    fullscreenResizeToWindowFlurry = () => {
        const impl = this.impl;
        this.fullscreenResizeToWindow();
        [0, 50, 100, 200, 300, 500, 1000].forEach((timeout) => {
            doTimeout(`${impl.uuid}.fs-resize-flurry-${timeout}`, this.fullscreenResizeToWindow, timeout);
        });
    };

    fullscreenResizeToWindow = () => {
        const impl = this.impl;
        if (impl.inFullscreen() && !this.getFullscreenStateOnEmbedElement().nativeFullscreen) {
            impl.debug('fullscreenResizeToWindow');

            // We only want to change the dimensions of the chrome, when in
            // fullscreen mode, not the embed container itself. Otherwise, if the
            // width of the page is dependent on the width of the embed container,
            // we'll cause an infinite resizing loop.
            const currentWidth = impl.width();
            const currentHeight = impl.height();
            const winWidth = elemWidth(window);
            const winHeight = elemHeight(window);
            // Notify components that care about the width and height changing
            impl.trigger('widthchange', winWidth, currentWidth);
            impl.trigger('heightchange', winHeight, currentHeight);
        }
    };

    requestFullscreen() {
        if (
            this.impl._opts._inIframe &&
            /two_stroke/i.test(this.impl.bestEngine()) &&
            (detect.iphone || detect.ipad)
        ) {
            return Promise.reject();
        }
        const impl = this.impl;

        if (impl.inFullscreen()) {
            return Promise.resolve();
        }

        impl.info('requestFullscreen');

        if (impl._inNativeMode() && impl.engine) {
            return impl.engine.requestFullscreen();
        }
        if (detect.fullscreenEnabled) {
            // aurora web components use a wrapper div and that element needs to be
            // fullscreened to allow for replacing during fullscreen without interruption
            const elemToFullscreen = impl.embedElement.usingFullscreenContainer ?
                impl.embedElement.parentNode :
                impl.chrome;

            return elemRequestFullscreen(elemToFullscreen);
        }
        if (this.getAllowFakeFullscreen()) {
            // We're likely on iOS and don't have a proper fullscreen API, so
            // we can either do a fake full screen or full screen the video element
            // and get the native quicktime controls.
            this.enterFakeFullscreen();
            return Promise.resolve();
        }
        if (impl.engine) {
            if (impl.state() === 'beforeplay' && (detect.iphone || detect.ipad)) {
                // without this, if the video is fullscreened before play, it takes a few
                // clicks to actually work.
                impl.engine.play().then(() => impl.engine.pause());
            }

            return impl.engine.requestFullscreen();
        }

        return Promise.resolve();
    }

    cancelFullscreen() {
        const impl = this.impl;

        if (!impl.inFullscreen()) {
            return Promise.resolve();
        }

        impl.info('cancelFullscreen');

        if (impl._inNativeMode()) {
            return impl.engine.cancelFullscreen();
        }

        if (detect.fullscreenEnabled) {
            return elemCancelFullscreen();
        }

        if (this.getAllowFakeFullscreen()) {
            this.cancelFakeFullscreen();
            return Promise.resolve();
        }

        return impl.engine.cancelFullscreen();
    }

    // On iOS there's no proper fullscreen API so we normally just fullscreen
    // the video and use the native quicktime controls, but sometimes we want
    // to do this hack to attempt fullscreen vulcan -- like in the case where
    // we're playing back multiple streams at once
    getAllowFakeFullscreen() {
        // Only allow this on iOS10+ where playsinline works
        return (!this.impl._opts._inIframe &&
            detect.ios.version >= 10 &&
            (this.impl._opts.fakeFullscreen || /two_stroke/i.test(this.impl.bestEngine()))
        );
    }

    enterFakeFullscreen() {
        const impl = this.impl;

        this.setFullscreenStateOnEmbedElement({
            widthBeforeFullscreen: impl.width(),
            heightBeforeFullscreen: impl.height(),
        });

        this._inFakeFullscreen = true;
        this._chromeParent = impl.chrome.parentNode;
        document.body.appendChild(impl.chrome);

        this._leftOffsetBeforeFullscreen = scrollLeft();

        this.onEnterFullscreen(impl.chrome);
        this.setupFakeFullscreenBindings();

        elemStyle(impl.chrome, {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2147483647, // max 32bit int
        });
        scrollLeft(0);
        if (impl.engine) {
            impl.engine.onEnterFullscreen();
        }
    }

    setupFakeFullscreenBindings() {
        const impl = this.impl;
        // iOS Safari's minimal UI is a huge nuissance. In portrait, our controls
        // will be at the very bottom of the screen, but as soon as you tap there
        // it brings up Safari's bottom menu bar instead and does not issue any
        // events as far as I can tell so we must poll. Why there isn't a proper
        // resize event here is beyond me.
        Wistia.eventLoop.add(`${impl.uuid}.fakefullscreen`, 100, () => {
            this.fullscreenResizeToWindow();
        });
        if (!this._preventDefaultForTouchMove) {
            this._preventDefaultForTouchMove = function(event) {
                event.preventDefault();
            };
        }
        elemRebind(impl.uiContainer, 'touchmove', this._preventDefaultForTouchMove);
    }

    cancelFakeFullscreen() {
        const impl = this.impl;

        this._inFakeFullscreen = false;
        this.onCancelFullscreen(impl.chrome);
        if (this._chromeParent) {
            this._chromeParent.appendChild(impl.chrome);
        }
        impl.chrome.style.position = '';
        scrollLeft(this._leftOffsetBeforeFullscreen);

        Wistia.eventLoop.remove(`${impl.uuid}.fakefullscreen`);

        if (impl.engine) {
            impl.engine.onLeaveFullscreen();
        }

        if (this._preventDefaultForTouchMove != null) {
            elemUnbind(impl.uiContainer, 'touchmove', this._preventDefaultForTouchMove);
        }
    }

    transferStateFrom(otherImpl) {
        const otherBehavior = otherImpl.behaviors && otherImpl.behaviors.fullscreen;
        if (!otherBehavior) {
            return;
        }

        this.impl.embedElement._fullscreenState = otherImpl.embedElement._fullscreenState;

        if (otherBehavior.getFullscreenStateOnEmbedElement().inFullscreen) {
            countMetric('player/replacewith-fullscreen', 1, {
                inNativeFullscreen: this.inNativeFullscreen(),
            });
        }
    }

    inFullscreen() {
        return this.getFullscreenStateOnEmbedElement().inFullscreen;
    }

    inNativeFullscreen() {
        return this.getFullscreenStateOnEmbedElement().nativeFullscreen;
    }

    maybeAutoFullscreen = () => {
        if (this.impl.isAudio()) {
            return;
        }
        const shouldAutoFullscreen =
            this.impl._inNativeMode() &&
            this.impl._opts.playsinline === false &&
            inUserEventContext() &&
            !this._hasAutoFullscreened;
        if (shouldAutoFullscreen) {
            this._hasAutoFullscreened = true;
            this.requestFullscreen();
        }
    };

    getFullscreenStateOnEmbedElement() {
        return this.impl.embedElement._fullscreenState || {};
    }

    setFullscreenStateOnEmbedElement(newProperties = {}) {
        if (isNotNil(this.impl.embedElement._fullscreenState)) {
            const newState = { ...this.impl.embedElement._fullscreenState,
                ...newProperties
            };

            this.impl.embedElement._fullscreenState = newState;
        }
    }
}

FullscreenBehavior.handle = 'fullscreen';

if (!Wistia._onFullscreenChange) {
    Wistia._onFullscreenChange = () => {
        if (fullscreenElement()) {
            globalTrigger('enterfullscreen', fullscreenElement());
        } else {
            globalTrigger('cancelfullscreen');
        }
    };

    Wistia._initializers.initFullscreenTriggers = () => {
        // The fullscreenchange event is a global thing, not for a specific
        // element.  This sets up one binding that marshalls the fullscreenchange
        // event so we can receive it like Wistia.bind 'fullscreenchange',
        // (theElem) -> ...
        //
        // If embed codes use it, they should examine theElem to figure out if
        // it's actually the embed going fullscreen, and not something else on
        // the page.
        elemRebind(document, 'webkitfullscreenchange', Wistia._onFullscreenChange);
        elemRebind(document, 'fullscreenchange', Wistia._onFullscreenChange);
    };

    Wistia._destructors.destroyFullscreenTriggers = () => {
        elemUnbind(document, 'webkitfullscreenchange', Wistia._onFullscreenChange);
        elemUnbind(document, 'fullscreenchange', Wistia._onFullscreenChange);
    };
}

export default FullscreenBehavior;