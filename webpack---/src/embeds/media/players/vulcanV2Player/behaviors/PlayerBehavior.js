export class PlayerBehavior {
    constructor(impl) {
        this.impl = impl;
        this.embedElement = impl.container;
        this.unbinds = [];
        this.eventListeners = new Map();
        this.namedUnbinds = {};
    }

    addNamedUnbind(name, unbind) {
        // guard against double-binding
        if (this.namedUnbinds[name]) {
            this.namedUnbinds[name]();
        }
        this.namedUnbinds[name] = unbind;
    }

    removeNamedUnbind(name) {
        if (this.namedUnbinds[name]) {
            this.namedUnbinds[name]();
            delete this.namedUnbinds[name];
        }
    }

    destroy() {
        if (this.unbinds instanceof Array) {
            this.unbinds.map((unbind) => unbind());
        }
        if (this.eventListeners instanceof Map) {
            this.eventListeners.forEach((eventListenerFn, eventName) => {
                this.embedElement.removeEventListener(eventName, eventListenerFn);
            });
            this.eventListeners.clear();
        }
        for (let name in this.namedUnbinds) {
            if (Object.hasOwn(this.namedUnbinds, name)) {
                this.namedUnbinds[name].map((unbind) => unbind());
            }
        }
        this.unbinds = [];
        this.namedUnbinds = {};
        this.impl = null;
        this._destroyed = true;
    }
}