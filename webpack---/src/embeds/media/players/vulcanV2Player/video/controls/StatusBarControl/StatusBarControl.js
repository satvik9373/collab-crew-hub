import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    defineControl
} from 'embeds/shared/control_definitions.js';
import Control from '../../../shared/controls/Control.js';
import StatusBar from './StatusBar.jsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    getTranslation,
    defineTranslations
} from '../../../../../../shared/translations.js';

defineTranslations('en-US', {
    STATUS_BAR_EMBED_CODE_COPIED: 'Embed Code is now copied to your clipboard!',
});

class StatusBarControl extends Control {
    constructor(video) {
        super(video);
        this._isVisible = false;
    }

    destroy() {
        destroyControl(this);
    }

    flash(message, time = 2000) {
        this._isVisible = true;

        this.renderMenu(this.translate(message));

        setTimeout(() => {
            this.hide();
        }, time);
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `STATUS_BAR_${key}`);
    }

    hide() {
        this._isVisible = false;
        render( < nothing / > , this.rootElem);
    }

    renderMenu(message) {
        if (this._isVisible) {
            render( < StatusBar message = {
                    message
                }
                />, this.rootElem);
                this.reactMounts = [this.rootElem];
            }
        }
    }

    StatusBarControl.handle = 'statusBar';
    StatusBarControl.type = 'background';

    defineControl(StatusBarControl);

    export default StatusBarControl;