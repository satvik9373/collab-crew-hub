/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    globalBind
} from 'utilities/globalBindAndTrigger.js';
import {
    isVisitorTrackingEnabled
} from 'utilities/trackingConsentApi.js';
import {
    uniqId
} from 'utilities/uniqId.js';
import {
    getAllApiHandles
} from 'utilities/getApiHandles.ts';
import {
    onFindApiHandle,
    ALL_API_HANDLES_KEY
} from 'utilities/onFindApiHandle.ts';

(function(Wistia) {
    const W = Wistia;

    if (Wistia.VisitorKey) {
        return;
    }

    const DISTILLERY_PREFIX = '__distillery';

    globalBind('visitortrackingchange', (val, domain) => {
        // post the message down to all iframes whenever this changes.
        for (let v of Array.from(getAllApiHandles())) {
            v._postDownVisitorTrackingEnabled ? .();
        }

        if (Wistia.visitorKey) {
            const isEnabled = isVisitorTrackingEnabled();
            if (isEnabled) {
                if (Wistia.visitorKey.value()) {
                    return Wistia.visitorKey.persist(Wistia.visitorKey.value());
                }
            } else {
                Wistia.visitorKey.unpersist();
                return Wistia._destructors.destroyMux ? .();
            }
        }
    });

    Wistia.VisitorKey = class VisitorKey {
        constructor() {
            this.ready = this.ready.bind(this);
            this.unbinds = [];

            // In a timeout because we'll want to make sure rendering has
            // completed before we try to access the DOM
            setTimeout(() => {
                return this.unbinds.push(
                    onFindApiHandle({
                        matcher: ALL_API_HANDLES_KEY,
                        functionToRun: (video) => {
                            return video.hasData(() => {
                                if (!video.iframe && video._mediaData ? .privacyMode === true) {
                                    this.unpersist();
                                }
                                return this.ready();
                            });
                        },
                    }),
                );
            }, 0);
        }

        ready() {
            if (this._readyPromise) {
                return this._readyPromise;
            }

            this._readyPromise = new Promise((resolve) => {
                if (!this.savedValue()) {
                    this.persist(Wistia.VisitorKey.generate());
                }
                resolve();
            });

            return this._readyPromise;
        }

        reinitialize() {
            this.destroy();
            this.unbinds = [];
            this._readyPromise = null;
            return this.ready();
        }

        persist(newValue) {
            if (!Wistia.VisitorKey.isValid(newValue)) {
                this.error(new Error(`Attempted to persist invalid visitor key '${newValue}'`));
                return;
            }

            this.info('@persist', newValue);

            // Persist to memory for speed.
            this._value = newValue;

            if (!isVisitorTrackingEnabled()) {
                return;
            }

            // Persist via localStorage. This is so all iframes on the page can access
            // the value immediately.
            if (window.wistiaDisableCookies !== true && this.localStorageValue() !== this._value) {
                return Wistia.localStorage(DISTILLERY_PREFIX, this._value);
            }
        }

        unpersist() {
            return this.clearFromCurrentDomain();
        }

        clear() {
            this.info('clear');
            this.unpersist();
            return (this._value = null);
        }

        clearFromCurrentDomain() {
            return Wistia.removeLocalStorage(DISTILLERY_PREFIX, null);
        }

        value() {
            let result = this._value || this.savedValue();
            if (!result) {
                result = Wistia.VisitorKey.generate();
                this.persist(result);
            }
            return result;
        }

        savedValue() {
            if (isVisitorTrackingEnabled()) {
                return this.localStorageValue();
            }
            return undefined;
        }

        localStorageValue() {
            return Wistia.localStorage(DISTILLERY_PREFIX);
        }

        isValid() {
            return Wistia.VisitorKey.isValid(this.value());
        }

        destroy() {
            for (let u of Array.from(this.unbinds)) {
                u();
            }
            return (this.unbinds = []);
        }

        static isValid(key) {
            return key ? .length > 25 && /^[a-z0-9_\-.]+$/i.test(key);
        }

        static generate() {
            return uniqId(`${Date.now().toString().substring(0, 7)}_`);
        }
    };

    // Allow @warn, @error, @info, etc. in VisitorKey.
    Wistia.mixin(Wistia.VisitorKey.prototype, Wistia.logHelpers);

    Wistia._initializers.initVisitorKey = () => (Wistia.visitorKey = new Wistia.VisitorKey());

    return (Wistia._destructors.destroyVisitorKey = function() {
        Wistia.visitorKey ? .destroy();
        return (Wistia.visitorKey = null);
    });
})(window.Wistia);