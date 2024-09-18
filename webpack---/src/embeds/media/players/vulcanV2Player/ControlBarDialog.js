import {
    bindify
} from 'utilities/bindify.js';

class ControlBarDialog {
    constructor(ui, config = {}) {
        this.ui = ui;
        this.config = config;
        this._isOpen = false;
        this._hasOpened = false;
        this.control = config.control;
    }

    open() {
        const dialogsCanOpen =
            this.ui.impl.state() !== 'beforeplay' || this.ui.impl._attrs.controlsVisibleOnLoad;
        if (!dialogsCanOpen) {
            // If we don't return early here, there's an infinite loop happening somehow. Modify with caution.
            return;
        }
        return this.control.mounted.then(() => {
            if (this.isOpen()) {
                return Promise.resolve();
            }
            return this.dialogWillOpen().then(this.doOpen).then(this.dialogOpened);
        });
    }

    dialogWillOpen = () => {
        return new Promise((resolve) => {
            if (this.config.dialogWillOpen) {
                const result = this.config.dialogWillOpen();
                if (result && result.then) {
                    result.then(resolve);
                    return;
                }
            }
            resolve();
        });
    };

    doOpen = () => {
        return new Promise((resolve) => {
            if (this._isOpen) {
                resolve();
            } else {
                this._isOpen = true;
                this._hasOpened = true;
                this.ui.openDialog(this);
                setTimeout(resolve, 170);
            }
        });
    };

    dialogOpened = () => {
        return new Promise((resolve) => {
            if (this.config.dialogOpened) {
                this.config.dialogOpened();
            }
            resolve();
        });
    };

    close = () => {
        return this.control.mounted.then(() => {
            if (this.isOpen()) {
                return this.dialogWillClose().then(this.doClose).then(this.dialogClosed);
            }
            return Promise.resolve();
        });
    };

    dialogWillClose = () => {
        return new Promise((resolve) => {
            if (this.config.dialogWillClose) {
                const result = this.config.dialogWillClose();
                if (result && result.then) {
                    result.then(resolve);
                    return;
                }
            }
            resolve();
        });
    };

    doClose = () => {
        return new Promise((resolve) => {
            if (this._isOpen) {
                this._isOpen = false;
                this.ui.closeDialog(this);
                setTimeout(resolve, 200);
            } else {
                resolve();
            }
        });
    };

    dialogClosed = () => {
        return new Promise((resolve) => {
            if (this.config.dialogClosed) {
                this.config.dialogClosed();
            }
            resolve();
        });
    };

    isOpen() {
        return this._isOpen;
    }

    hasOpened() {
        return this._hasOpened;
    }

    resize() {
        this._resizeRequestedAt = Date.now();
        this.ui.resizeDialog(this);
    }
}

bindify(ControlBarDialog.prototype);

export default ControlBarDialog;