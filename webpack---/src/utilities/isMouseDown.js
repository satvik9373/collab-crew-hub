import {
    Wistia
} from 'wistia_namespace.js';
import {
    elemBind
} from 'utilities/elem.js';
import {
    cachedDetect
} from 'utilities/detect.js';

const detect = cachedDetect();

if (Wistia._isMouseDown == null) {
    Wistia._isMouseDown = false;

    const onMouseDown = (event) => {
        Wistia._isMouseDown = true;
        Wistia._lastMouseDownAt = Date.now();
        setTimeout(() => {
            if (event.defaultPrevented) {
                // the corresponding mouseup or touchend won't be fired.
                Wistia._isMouseDown = false;
            }
        }, 0);
    };

    const onMouseUp = () => {
        Wistia._lastMouseUpAt = Date.now();
        setTimeout(() => {
            Wistia._isMouseDown = false;
        }, 0);
    };

    // we need to wait a tick before we can reset ._isMouseDown because on ios
    // we can get into the situation where if _isMouseDown is still true, we actually
    // 'click' on the first item in the context menu, which is not what we want
    const onTouchEnd = () => {
        Wistia._lastMouseUpAt = Date.now();
        setTimeout(() => {
            Wistia._isMouseDown = false;
        }, 0);
    };

    if (detect.touchScreen) {
        elemBind(document, 'touchstart', onMouseDown, true);
        elemBind(document, 'touchend', onTouchEnd, true);
    } else {
        elemBind(document, 'mousedown', onMouseDown, true);
        elemBind(document, 'mouseup', onMouseUp, true);
    }

    // windows/osx handle the firing of the contextMenu differently
    const contextHandler = detect.windows ? onMouseUp : onMouseDown;
    elemBind(document, 'contextmenu', contextHandler, true);
}

export const isMouseDown = () => {
    if (Wistia._mouseDownForceReturnVal != null) {
        return Wistia._mouseDownForceReturnVal;
    }

    return Wistia._isMouseDown;
};

const isMouseDownWithinInterval = (interval) => {
    const lastMouseDownAt = Math.max(Wistia._lastMouseDownAt || 0, (Wistia._lastMouseUpAt || 0) - 1);
    return lastMouseDownAt > Date.now() - interval;
};

// iOS has a 350ms delay on click events. This can make it so an event
// like "focus" may fire after the touchstart/touchend handlers
export const isMouseDownRecently = () => {
    if (Wistia._mouseDownForceReturnVal != null) {
        return Wistia._mouseDownForceReturnVal;
    }
    return isMouseDownWithinInterval(500);
};