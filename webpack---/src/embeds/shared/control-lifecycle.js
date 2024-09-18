import {
    assign
} from 'utilities/assign.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    doTimeout,
    clearTimeouts
} from 'utilities/timeout-utils.js';
import {
    elemBind,
    elemRemove,
    elemUnbind
} from 'utilities/elem.js';
import {
    h,
    render
} from 'preact';
import {
    seqId
} from 'utilities/seqid.js';
import {
    getControlDefinitions
} from './control_definitions.js';

const detect = cachedDetect();

// Call functions that we've pushed into control.unbinds.
export const callUnbinds = (control) => {
    if (control.unbinds instanceof Array) {
        control.unbinds.forEach((unbind) => {
            try {
                if (typeof unbind === 'function') {
                    unbind();
                }
            } catch (e) {
                setTimeout(() => {
                    throw e;
                }, 1);
            }
        });
        control.unbinds = null;
    }
};

/**
 * Call removeEventListeners that we've pushed into control.eventListeners.
 * @param {Control} control
 */
export const callRemoveEventListeners = (control) => {
    if (control.eventListeners instanceof Map) {
        control.eventListeners.forEach((eventListenerFn, eventName) => {
            try {
                if (typeof eventListenerFn === 'function') {
                    control.embedElement.removeEventListener(eventName, eventListenerFn);
                }
            } catch (e) {
                setTimeout(() => {
                    throw e;
                }, 1);
            }
        });
        control.eventListeners.clear();
    }
};

export const destroyControl = (control) => {
    control._destroyed = true;
    callUnbinds(control);
    callRemoveEventListeners(control);
    removeRootElem(control);
    unmountReactMounts(control);
    unsetObjectProperties(control);
};

export const maybeDestroyControls = ({
    controls,
    isControlDisabled,
    shouldMount
}) => {
    const destroyedControls = [];
    for (let handle in controls) {
        const control = controls[handle];
        if (isControlDisabled(handle) || !shouldMount(control.constructor)) {
            if (control.destroy) {
                try {
                    control.destroy();
                } catch (e) {
                    setTimeout(() => {
                        throw e;
                    }, 1);
                }
            }
            control.__destroyed = true;
            delete controls[control.constructor.handle];
            destroyedControls.push(control);
        }
    }
    return destroyedControls;
};

export const maybeInitializeControls = ({
    controlDefinitions,
    controls,
    isControlDisabled,
    initControl,
    onMount,
    shouldMount,
    reevaluateShouldMount,
}) => {
    const newControls = [];
    const existingControls = [];
    for (let handle in controlDefinitions) {
        const ControlClass = controlDefinitions[handle];
        const hasBeenInitialized = controls[handle] != null;
        const shouldDoMount = !isControlDisabled(handle) && shouldMount(ControlClass);
        reevaluateShouldMount(ControlClass);

        if (shouldDoMount && hasBeenInitialized) {
            existingControls.push(controls[handle]);
        } else if (!hasBeenInitialized && shouldDoMount) {
            try {
                const control = (controls[handle] = initControl(ControlClass));
                control.mounted = new Promise((resolve) => {
                    control.__didMount = () => {
                        control.mounted.isResolved = true;
                        onMount(handle);
                        resolve();
                    };
                });
                newControls.push(control);
            } catch (e) {
                setTimeout(() => {
                    throw e;
                }, 1);
            }
        }
    }
    return [newControls, existingControls];
};

const mountControl = (control, mountFn) => {
    try {
        const handle = control.constructor.handle;
        const mountResult = mountFn();
        if (mountResult && mountResult.then && mountResult.catch) {
            mountResult.handle = handle;
            mountResult.then(() => {
                control.__didMount();
            });
        } else {
            control.__didMount();
        }
        return Promise.resolve(mountResult);
    } catch (e) {
        setTimeout(() => {
            throw e;
        }, 0);
        return Promise.resolve();
    }
};

const renderHourglassLoader = (control, promise, options) => {
    return new Promise((resolve) => {
        // we wanna wait 300ms before showing the loading indication
        const timeoutKey = `${control.video.uuid}.loading_indicator.${seqId()}`;
        doTimeout(
            timeoutKey,
            () => {
                control.video.controls.loadingHourglass.show(options);

                if (detect.touchScreen) {
                    elemBind(document, 'touchstart', () => {
                        try {
                            control.video.controls.loadingHourglass.hide();
                        } catch (e) {
                            setTimeout(() => {
                                throw e;
                            }, 0);
                        }
                        resolve();
                        return elemUnbind;
                    });
                } else {
                    elemBind(document, 'mousedown', () => {
                        try {
                            control.video.controls.loadingHourglass.hide();
                        } catch (e) {
                            setTimeout(() => {
                                throw e;
                            }, 0);
                        }
                        resolve();
                        return elemUnbind;
                    });
                }
            },
            300,
        );

        promise.then(() => {
            clearTimeouts(timeoutKey);
            control.video.controls.loadingHourglass.hide();
            resolve();
        });
    });
};

export const mountControls = (controls, mountRefs) => {
    return Promise.all(
        controls.map((control) => {
            const handle = control.constructor.handle;

            if (!control.loading) {
                control.loading = (promise, options = {}) => {
                    return renderHourglassLoader(control, promise, options);
                };
            }

            if (control.eventListeners instanceof Map) {
                control.eventListeners.forEach((eventListenerFn, eventName) => {
                    control.embedElement.addEventListener(eventName, eventListenerFn);
                });
            }

            const mountPoint = mountRefs[handle];
            return mountControl(control, () => control.mount(mountPoint));
        }),
    );
};

export const setControlProps = (controls, propsByType) => {
    for (let handle in controls) {
        const control = controls[handle];
        control.__prevProps = control.props || {};
        control.props = assign({}, propsByType[control.constructor.type]);
    }
};

export const removeRootElem = (control) => {
    // Remove all DOM elements inside the rootElem.
    if (control.rootElem) {
        elemRemove(Array.prototype.slice.call(control.rootElem.childNodes));
    }
};

const renderNothingForReactMount = (reactMount) => {
    const containerElem = reactMount[0];
    const renderedElem = reactMount[1];
    if (containerElem && renderedElem) {
        render( < nothing / > , containerElem);
    }
};

export const runOnControlPropsUpdated = (controls) => {
    controls.forEach((control) => {
        if (typeof control.onControlPropsUpdated === 'function') {
            try {
                control.onControlPropsUpdated(control.__prevProps || {});
            } catch (e) {
                setTimeout(() => {
                    throw e;
                }, 0);
            }
        }
        control.__prevProps = null;
    });
};

const startsWithDoubleUnderscore = (str) => {
    return str[0] === '_' && str[1] === '_';
};

export const getSortedControlsByType = (controls) => {
    const result = {};

    // bucket
    for (let handle in controls) {
        const control = controls[handle];
        const type = control.constructor.type;
        if (result[type] == null) {
            result[type] = [];
        }
        result[type].push(control);
    }

    // sort each bucket
    for (let type in result) {
        result[type].sort((control1, control2) => {
            return (control1.constructor.sortValue || 0) - (control2.constructor.sortValue || 0);
        });
    }

    return result;
};

export const pickControlDefinitionsWithTypes = (types) => {
    const globalControlDefinitions = getControlDefinitions();
    const result = {};
    for (let k in globalControlDefinitions) {
        const controlDef = globalControlDefinitions[k];
        if (types.indexOf(controlDef.type) >= 0) {
            result[k] = controlDef;
        }
    }
    return result;
};

export const unmountReactMounts = (control) => {
    // Controls that render to react can save the relevant mount points like:
    //
    // control.reactMounts = [control.rootElem, control.thumbnailElem]
    //
    // or in the case where there are multiple mounts (like button and dialog)
    //
    // control.reactMounts.button = [control.buttonRoot, control.buttonElem]
    // control.reactMounts.dialog = [control.dialogRoot, control.dialogElem]
    //
    // And control code will automatically unmount on destroy to clean up any
    // dangling react DOM nodes.
    const reactMounts = control.reactMounts;
    if (reactMounts) {
        if (reactMounts instanceof Array) {
            renderNothingForReactMount(reactMounts);
        } else {
            for (let mountName in reactMounts) {
                if (Object.hasOwn(reactMounts, mountName) && reactMounts[mountName]) {
                    renderNothingForReactMount(reactMounts[mountName]);
                }
            }
        }
    }
};

export const unsetObjectProperties = (control) => {
    // Null out any object properties that may cause a reference.
    for (let k in control) {
        if (Object.hasOwn(control, k) && !startsWithDoubleUnderscore(k) && k !== 'mounted') {
            control[k] = null;
        }
    }

    control.__prevProps = null;

    // Set control again because we would've just unset it above.
    control._destroyed = true;
};