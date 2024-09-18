import {
    h,
    render
} from 'preact';
import {
    bindify
} from 'utilities/bindify.js';
import {
    isMouseDown
} from 'utilities/isMouseDown.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    defineControl
} from 'embeds/shared/control_definitions.js';
import {
    getTranslation,
    defineTranslations
} from '../../../../../../shared/translations.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    ClickForSoundButton
} from './ClickForSoundButton.tsx';
import Control from '../../../shared/controls/Control.js';

const detect = cachedDetect();

defineTranslations('en-US', {
    CLICK_FOR_SOUND_DESKTOP_TEXT: 'Click for sound',
    CLICK_FOR_SOUND_MOBILE_TEXT: 'Tap for sound',
});

class ClickForSoundButtonControl extends Control {
    constructor(video) {
        super(video);
        this.silentAutoPlayBackdropEnabled = this.video._opts.silentAutoPlayBackdropEnabled;

        this.unbinds.push(
            video.on('play', this.renderButton),
            video.on('silentplaybackmodechange', this.renderButton),
            video.on('volumechange', this.renderButton),
        );
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.renderButton();
    }

    renderButton = () => {
        const silentAutoPlayIsChromeless = Boolean(this.video._opts.silentAutoPlayIsChromeless);
        const isVisible = this.isVisible();
        if (silentAutoPlayIsChromeless) {
            if (isVisible) {
                this.video.requestChromeless('clickForSound');
            } else {
                this.video.releaseChromeless('clickForSound');
            }
        }

        this.video.trigger('clickforsoundvisibilitychange', isVisible);

        let loadDeps;
        if (isVisible) {
            const oneSecondElapsed = new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            loadDeps = Promise.race([
                oneSecondElapsed,
                dynamicImport('assets/external/interFontFace.js'),
            ]);
        } else {
            loadDeps = Promise.resolve();
        }

        if (!this.lastRenderPromise) {
            this.lastRenderPromise = Promise.resolve();
        }

        this.lastRenderPromise.then(() => {
            this.lastRenderPromise = new Promise((resolve) => {
                loadDeps.then(() => {
                    render( <
                        ClickForSoundButton { ...this.props
                        }
                        isLiveMedia = {
                            this.video.isLiveMedia()
                        }
                        isTouchscreen = {
                            detect.touchScreen
                        }
                        backdropEnabled = {
                            this.getSilentAutoplayBackdropState()
                        }
                        buttonText = {
                            this.buttonText()
                        }
                        buttonTextEnabled = {
                            this.buttonTextEnabled()
                        }
                        elemRef = {
                            (elem) => (this.buttonRoot = elem)
                        }
                        isVisible = {
                            this.isVisible()
                        }
                        onClick = {
                            this.onClick
                        }
                        scale = {
                            this.scale()
                        }
                        />,
                        this.rootElem,
                    );
                    this.reactMounts = [this.rootElem];
                    this.trigger('buttonrootrendered');
                    resolve();
                });
            });
        });
    };

    onControlPropsUpdated(prevProps) {
        const props = this.props;
        if (
            prevProps.scale !== props.scale ||
            prevProps.controlsAreVisible !== props.controlsAreVisible ||
            prevProps.controlBarHeight !== props.controlBarHeight
        ) {
            this.renderButton();
        }

        if (
            prevProps.playerLanguage &&
            this.props.playerLanguage.code !== prevProps.playerLanguage.code
        ) {
            this.renderButton();
        }
    }

    onClick = (e) => {
        if (!isMouseDown()) {
            // the control will disappear when we unmute. We should at least maintain
            // focus on the player when that happens.
            this.video.focus();
        }

        this.video.unmute();
        this.video.turnOffCaptions();
        this.trigger('click', e);
    };

    getSilentAutoplayBackdropState() {
        if (this.silentAutoPlayBackdropEnabled != undefined) {
            return this.silentAutoPlayBackdropEnabled;
        }

        return true;
    }

    setSilentAutoPlayBackdropEnabled(val) {
        this.silentAutoPlayBackdropEnabled = val;
        this.renderButton();
    }

    isVisible() {
        return this._isVisible != null ? this._isVisible : this.video.inSilentPlaybackMode();
    }

    setIsVisible(v) {
        this._isVisible = v;
        this.renderButton();
        this.video.trigger('clickforsoundvisibilitychange', this.isVisible());
    }

    buttonText() {
        return detect.touchScreen ? this.translate('MOBILE_TEXT') : this.translate('DESKTOP_TEXT');
    }

    buttonTextEnabled() {
        const embedOptions = this.video.embedOptions();
        const videoThumbnail = embedOptions.plugin ? .videoThumbnail;

        if (videoThumbnail ? .on) return videoThumbnail.clickForSound ? .showText ? ? true;
        return embedOptions.clickForSound ? .showText ? ? true;
    }

    afterButtonRenders() {
        return new Promise((resolve) => {
            this.bind('buttonrootrendered', () => {
                resolve(this.buttonRoot);
                return this.unbind;
            });
        });
    }

    translate(key) {
        return getTranslation(this.props ? .playerLanguage.code, `CLICK_FOR_SOUND_${key}`);
    }

    scale() {
        const {
            scale
        } = this.props;
        return detect.touchScreen ? scale : scale * 1.5;
    }
}

bindify(ClickForSoundButtonControl.prototype);

ClickForSoundButtonControl.handle = 'clickForSoundButton';
ClickForSoundButtonControl.type = 'above-control-bar';
defineControl(ClickForSoundButtonControl);

export default ClickForSoundButtonControl;