class Control {#
    disabledButton;

    constructor(video) {
        this.video = video;
        this.embedElement = video.container;
        this.unbinds = [];
        this.eventListeners = new Map();
        this.reactMounts = {};

        this.isWistiaPlayer = this.embedElement.tagName === 'WISTIA-PLAYER';
        this.impl = video;
        this.api = this.isWistiaPlayer ? this.embedElement : video.publicApi;
    }

    mount(rootElem) {
        this.rootElem = rootElem;
    }

    // The `disabledButton` is used in the UIBehavior and fed into the
    // ControlBarButtonWithDialog to disable control bar buttons
    set disabledButton(state) {
        this.#disabledButton = state;
    }

    get disabledButton() {
        return this.#disabledButton;
    }
}

export default Control;