import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    unescapeHtml
} from 'utilities/core.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import Control from '../../shared/controls/Control.js';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';
import {
    getTranslation,
    defineTranslations
} from '../../../../../shared/translations.js';

const detect = cachedDetect();

defineTranslations('en-US', {
    BACKGROUND_FOCUS_SHOW_CONTROLS: 'Show controls',
});

class BackgroundFocusControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;
        this._focusImmediately = false;

        this.unbinds.push(
            this.video.on('play', this.render),
            this.video.on('pause', this.render),
            this.video.on('end', this.render),
        );
    }

    destroy() {
        destroyControl(this);
    }

    onControlPropsUpdated = (prevProps) => {
        const {
            isFocusable
        } = this.props;
        // If the grandparent of this element is not yet visible when we try to
        // focus, which can happen within a popover, focus would silently fail.
        // So if it is not yet focusable when we call `focus` we set the
        // _focusImmediately flag and keep checking the changed props to see
        // if we are able to focus yet.
        if (prevProps.isFocusable != isFocusable && isFocusable && this._focusImmediately) {
            this.el.focus({
                preventScroll: true
            });
            this._focusImmediately = false;
        }
    };

    focus = () => {
        if (this.props.isFocusable) {
            this.el.focus({
                preventScroll: true
            });
        } else {
            this._focusImmediately = true;
        }
    };

    mount(rootElem) {
        this.rootElem = rootElem;
        this.render();
    }

    onBlur = () => {
        this.video.exitInputContext('background-focus');
        this.video.controls.focusOutline.hide();
    };

    onFocus = () => {
        this.video.enterInputContext('background-focus');
        if (this.video.isKeyboardFocused() === true) {
            this.video.controls.focusOutline.show();
        }
    };

    style() {
        return {
            width: 0,
            height: 0,
            pointerEvents: 'none',
        };
    }

    // The background focus button will do different things
    // based on the state of the video
    getTranslation() {
        if (detect.touchScreen && !this.props.chromeless) {
            return this.translate('BACKGROUND_FOCUS_SHOW_CONTROLS');
        }
        // all other times we can just say play/pause
        return this.video.state() === 'playing' ?
            this.translate('PLAY_BUTTON_TITLE_WHEN_PLAYING') :
            this.translate('PLAY_BUTTON_TITLE_WHEN_NOT_PLAYING');
    }

    // using the same key as the small button translations
    translate(key) {
        return getTranslation(this.props.playerLanguage.code, key);
    }

    render = () => {
        const buttonTabIndex = !this.video.publicApi.popover || this.video.publicApi.popover.isVisible() ? 0 : -1;
        render( <
            button ref = {
                (elem) => (this.el = elem)
            } // used in `focus` method of VulcanV2Player
            aria - label = {
                `${this.getTranslation()}: ${unescapeHtml(this.video.name() || '')}`
            }
            class = "w-css-reset w-vulcan-v2-button"
            onBlur = {
                this.onBlur
            }
            onFocus = {
                this.onFocus
            }
            style = {
                this.style()
            }
            tabIndex = {
                buttonTabIndex
            }
            />,
            this.rootElem,
        );

        this.reactMounts = [this.rootElem];
    };
}

BackgroundFocusControl.shouldMount = () => true;

BackgroundFocusControl.handle = 'backgroundFocus';
BackgroundFocusControl.type = 'background';
BackgroundFocusControl.sortValue = 100;

defineControl(BackgroundFocusControl);
export default BackgroundFocusControl;