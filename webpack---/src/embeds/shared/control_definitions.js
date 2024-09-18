import {
    Wistia
} from 'wistia_namespace.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';

if (Wistia._controlDefinitions == null) {
    Wistia._controlDefinitions = {};
}

export const defineControl = (klass) => {
    if (klass.handle == null) {
        console.error('Please specify a handle property for control', klass);
        return;
    }

    const existingClass = Wistia._controlDefinitions[klass.handle];
    if (existingClass != null) {
        return;
    }

    Wistia._controlDefinitions[klass.handle] = klass;

    // Don't _require_ globalBindAndTrigger to have been included, but use it if
    // it has been. This lets us include this module in async scripts without
    // pulling in all of wbindable and bindify.
    if (Wistia.trigger) {
        Wistia.trigger('controldefined', klass);
    }
};

export const getControlDefinitions = () => {
    return Wistia._controlDefinitions || {};
};

// NOTE: it is important for this to remain on the W global for the time being so that
// 3rd party controls have a mechanism for registering controls
Wistia.defineControl = (controlClass) => {
    countMetric(`player/custom-control-definition`, 1, {
        name: controlClass.handle,
        location: location.origin + location.pathname,
    });

    defineControl(controlClass);
};