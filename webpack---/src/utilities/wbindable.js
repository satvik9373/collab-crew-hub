import {
    Wistia
} from 'wistia_namespace.js';
import * as bindify from 'utilities/bindify.js';

// This is an adaptation on top of bindify that is intended to provide both
// legacy functionality (returning `this` instead of an "unbind" function) and
// and "specialBind" functionality, which is what we use for special
// "composite" bindings like "crosstime" and "betweentimes".
//
// If you're setting up on/off/trigger for any new things, you should use
// bindify directly instead.

if (!Wistia.bindable) {
    Wistia.bindable = {
        bind(event, callback) {
            if (this.specialBind && this.specialBind(...arguments) === true) {
                // Allow the object to define a `specialBind` method which, if it
                // should perform an operation different from the standard `bind`, it
                // does that and returns true.
                return this;
            }

            if (callback) {
                bindify.bind.call(this, event, callback);
                return this;
            }
            if (Wistia.warn) {
                Wistia.warn(this.constructor.name, 'bind', 'falsey value passed in as callback:', callback);
            }
        },

        // unbind the matching callback and event for this video
        unbind(event, callback) {
            if (this.specialUnbind && this.specialUnbind(...arguments) === true) {
                // Allow the object to define a `specialUnbind` method which, if it
                // should perform an operation different from the standard `bind`, it
                // does that and returns true.
                return this;
            }

            if (callback) {
                bindify.unbind.call(this, event, callback);
            } else if (this._bindings) {
                // no callback passed in, so clear all callbacks for this event
                this._bindings[event] = [];
            }

            // null/delete the event keys if they have no events
            if (this._bindings && this._bindings[event] && !this._bindings[event].length) {
                this._bindings[event] = null;
                delete this._bindings[event];
            }

            return this;
        },

        on(event, fn) {
            const specialBindResult = this.specialBind && this.specialBind(...arguments);
            if (typeof specialBindResult === 'function') {
                // Allow the object to define a `specialBind` method which, if it
                // should perform an operation different from the standard `bind`, it
                // does that and returns an unbind function.
                return specialBindResult;
            }

            return bindify.bind.call(this, event, fn);
        },

        off(event, fn) {
            const specialUnbindResult = this.specialUnbind && this.specialUnbind(...arguments);
            if (typeof specialUnbindResult === 'function') {
                // Allow the object to define a `specialUnbind` method which, if it
                // should perform an operation different from the standard `Unbind`, it
                // does that and returns an unUnbind function.
                return specialUnbindResult;
            }

            return bindify.unbind.call(this, event, fn);
        },

        rebind(event, callback) {
            this.unbind(event, callback);
            this.bind(event, callback);
            return this;
        },

        // fire an event trigger on the video. for play/pause/ended callbacks.
        trigger(event, ...args) {
            bindify.trigger.call(this, event, ...args);
            return this;
        },

        bindNamed() {
            return bindify.bindNamed.apply(this, arguments);
        },

        unbindNamed() {
            return bindify.unbindNamed.apply(this, arguments);
        },

        unbindAllInNamespace() {
            return bindify.unbindAllInNamespace.apply(this, arguments);
        },
    };
}

export const makeWbindable = function(obj) {
    for (let k in Wistia.bindable) {
        const v = Wistia.bindable[k];
        if (!obj[k]) {
            obj[k] = v;
        }
    }
};