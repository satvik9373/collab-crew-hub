import {
    Wistia
} from 'wistia_namespace.js';
import {
    bindify
} from 'utilities/bindify.js';
import {
    elemBind,
    elemUnbind,
    elemWidth,
    elemHeight,
    elemOffset
} from 'utilities/elem.js';
import {
    cachedDetect
} from 'utilities/detect.js';

const detect = cachedDetect();

class TouchEvents {
    constructor(rootElem) {
        this.rootElem = rootElem;
        this.xDown = this.yDown = null;
        this.xDiff = this.yDiff = 0;
        this.isSwipe = false;
        this.isPinch = false;
        this.startedAt = null;
        this.initialPinchDistance = null;
        this.touch1 = this.touch2 = null;
        this.pinchDistance = 0;
        this.pinchScale = 0;

        // NOTE: Chrome's Best Practices Audit doesn't like that we don't set the
        // passive: true here, but we need it to properly support pinch to zoom--so
        // the entire browser doesn't zoom when you're specifically pinching the
        // video. Even though this will show up as a penalty in an Audit, I believe
        // it should be okay since the callback will not run except when the
        // touchstart has been initiated within the video boundaries.
        elemBind(
            rootElem,
            'touchstart',
            this.onTouchStart,
            detect.passiveSupported ? {
                passive: false
            } : false,
        );
    }

    updatePinch(e) {
        const rootOffset = this.rootOffset;
        if (e.touches.length === 2) {
            this.touch1 = {
                left: e.touches[0].pageX - rootOffset.left,
                top: e.touches[0].pageY - rootOffset.top,
            };
            this.touch2 = {
                left: e.touches[1].pageX - rootOffset.left,
                top: e.touches[1].pageY - rootOffset.top,
            };
            this.pinchDistance = Math.sqrt(
                (this.touch1.left - this.touch2.left) ** 2,
                (this.touch1.top - this.touch2.top) ** 2,
            );
            if (this.initialPinchDistance == null) {
                this.initialPinchDistance = this.pinchDistance;
            }
            this.pinchScale = this.pinchDistance / this.initialPinchDistance;
            this.pinchDelta = this.pinchDistance - this.initialPinchDistance;

            this.isPinch = true;

            return this.pinchScale;
        }
        return 0;
    }

    getTouchContext(e) {
        const rootOffset = this.rootOffset;
        const timeDelta = Date.now() - this.startedAt;

        // A touchEvent will fire with no touches when touch ends; in this case,
        // xOffset and yOffset will be NaN.

        const touch = Object(e.touches[0]);
        const xOffset = touch.pageX - rootOffset.left;
        const yOffset = touch.pageY - rootOffset.top;

        return {
            xOffset,
            yOffset,
            xDelta: this.xDiff,
            yDelta: this.yDiff,
            absXDelta: Math.abs(this.xDiff),
            absYDelta: Math.abs(this.yDiff),
            delta: Math.sqrt(this.xDiff * this.xDiff + this.yDiff * this.yDiff),
            startedAt: this.startedAt,
            isSwipe: !this.isPinch && this.isSwipe,
            isTap: timeDelta < 1000 && !this.isPinch && !this.isSwipe,
            isLongPress: timeDelta >= 1000 && !this.isPinch && !this.isSwipe,
            isPinch: this.isPinch,
            timeDelta,
            pinchScale: this.pinchScale,
            pinchDistance: this.pinchDistance,
        };
    }

    touchIsInsideRootElem(touch) {
        return (
            touch.left >= 0 &&
            touch.left < this.rootWidth &&
            touch.top >= 0 &&
            touch.top < this.rootHeight
        );
    }

    touchesAreInsideRootElem() {
        return this.touchIsInsideRootElem(this.touch1) && this.touchIsInsideRootElem(this.touch2);
    }

    resetTouchContext() {
        this.xDown = this.yDown = null;
        this.xDiff = this.yDiff = 0;
        this.isSwipe = false;
        this.isPinch = false;
        this.startedAt = null;
        this.pinchDelta = 0;
        this.pinchDistance = 0;
        this.initialPinchDistance = null;
        this.touch1 = this.touch2 = null;
    }

    onTouchStart = (event) => {
        this.rootWidth = elemWidth(this.rootElem);
        this.rootHeight = elemHeight(this.rootElem);
        this.rootOffset = elemOffset(this.rootElem);
        this.resetTouchContext();
        if (event.touches[0]) {
            this.xDown = event.touches[0].clientX;
            this.yDown = event.touches[0].clientY;
        }

        this.updatePinch(event);

        if (event.touches.length == 2 && this.touchesAreInsideRootElem()) {
            event.preventDefault();
        }

        this.startedAt = Date.now();
        elemBind(document, 'touchmove', this.onTouchMoveDocument, {
            passive: false
        });
        elemBind(document, 'touchend', this.onTouchEndDocument);
        elemBind(this.rootElem, 'touchmove', this.onTouchMove, {
            passive: false
        });
        elemBind(this.rootElem, 'touchend', this.onTouchEnd);
        const ctx = this.getTouchContext(event);
        this.trigger('touchstart', event, ctx);
        this.maybeTriggerMoreSpecificEvent(event, ctx);
    };

    onTouchMove = (event) => {
        event._handledByTouchMove = true;
        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        this.updatePinch(event);

        if (!this.isPinch) {
            const dist = Math.sqrt(this.xDiff * this.xDiff + this.yDiff * this.yDiff);
            if (dist > 25 || Date.now() - this.startedAt > 300) {
                this.isSwipe = true;
            }
        }

        const ctx = this.getTouchContext(event);
        this.trigger('touchmove', event, ctx);
        this.maybeTriggerMoreSpecificEvent(event, ctx);
    };

    onTouchMoveDocument = (event) => {
        if (!event._handledByTouchMove) {
            this.onTouchMove(event);
        }
    };

    onTouchEnd = (event) => {
        event._handledByTouchEnd = true;
        const ctx = this.getTouchContext(event);
        this.trigger('touchend', event, ctx);
        this.maybeTriggerMoreSpecificEvent(event, ctx);

        // Run this on next tick because, if pinching or swiping, there will
        // actually be _two_ touchend events, and the second one would not have
        // isPinch or isSwipe set, which could cause tap/longpress to fire instead.
        setTimeout(() => {
            this.resetTouchContext();
            this.unbindTouchEndAndTouchMove();
        }, 0);
    };

    onTouchEndDocument = (event) => {
        if (!event._handledByTouchEnd) {
            this.onTouchEnd(event);
        }
    };

    maybeTriggerMoreSpecificEvent(event, ctx) {
        if (ctx.isLongPress) {
            this.trigger('longpress', event, ctx);
        } else if (ctx.isTap) {
            this.trigger('tap', event, ctx);
        } else if (ctx.isSwipe) {
            this.trigger('swipe', event, ctx);
        } else if (ctx.isPinch) {
            this.trigger('pinch', event, ctx);
        }
    }

    destroy() {
        elemUnbind(this.rootElem, 'touchstart', this.onTouchStart);
        this.unbindTouchEndAndTouchMove();
        this.rootElem = null;
    }

    unbindTouchEndAndTouchMove() {
        elemUnbind(document, 'touchmove', this.onTouchMoveDocument);
        elemUnbind(document, 'touchend', this.onTouchEndDocument);
        elemUnbind(this.rootElem, 'touchmove', this.onTouchMove);
        elemUnbind(this.rootElem, 'touchend', this.onTouchEnd);
    }
}

bindify(TouchEvents.prototype);

export default TouchEvents;