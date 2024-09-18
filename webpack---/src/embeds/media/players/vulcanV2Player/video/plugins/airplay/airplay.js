import {
    Wistia
} from 'wistia_namespace.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';

class AirplayPlugin extends Wistia.Plugin.Base {
    constructor(video, options) {
        super(video, options);
        this.pluginName = 'airplay';
        this.video = video;
        this.options = options;
        this._isEnabled = options.on !== false;
        this._origImpl = video._impl;
        doTimeout(
            `${video.uuid}.enable_or_disable_airplay_control`,
            () => {
                if (this._isEnabled) {
                    this.enable();
                } else {
                    this.disable();
                }
            },
            1,
        );
    }

    enable() {
        this.video.setControlEnabled('airplayButton', true);
    }

    disable() {
        this.video.setControlEnabled('airplayButton', false);
    }

    remove() {
        if (this.video._impl === this._origImpl) {
            this.disable();
        }
        super.remove();
    }
}

Wistia.plugin('airplay', (video, options) => {
    return new AirplayPlugin(video, options);
});