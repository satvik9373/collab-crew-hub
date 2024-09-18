import {
    setViewerPreference
} from 'utilities/viewerPreferences.js';
import {
    elemBind,
    formInputIsFocused
} from 'utilities/elem.js';
import {
    h,
    render
} from 'preact';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    getTranslation,
    defineTranslations
} from '../../../../../shared/translations.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import VolumeButton from '../../shared/ui_components/VolumeButton.jsx';
import {
    RoundedVolumeButton
} from '../../shared/ui_components/RoundedVolumeButton.tsx';
import Control from '../../shared/controls/Control.js';

const detect = cachedDetect();

const UP_KEY = 38;
const DOWN_KEY = 40;
const M_KEY = 77;
const DELAY_IF_DIALOG_OPEN = 300;

defineTranslations('en-US', {
    VOLUME_TITLE_WHEN_MUTED: 'Unmute',
    VOLUME_TITLE_WHEN_UNMUTED: 'Mute',
});

class VolumeButtonControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;

        this.unbinds.push(
            video.on('volumechange', () => {
                if (this.buttonRoot) {
                    this.renderButton();
                }
            }),

            elemBind(document, 'keyup', this.onKeyUp),
            elemBind(document, 'keydown', this.onKeyDown),
        );
    }

    destroy() {
        destroyControl(this);
    }

    onControlPropsUpdated(prevProps) {
        if (
            prevProps.playerLanguage &&
            this.props.playerLanguage.code !== prevProps.playerLanguage.code
        ) {
            this.renderButton();
        }
    }

    loadSliderCode = () => {
        return dynamicImport(
            'assets/external/vulcanV2Player/video/controls/VolumeSliderControl/VolumeSliderControl.js',
        ).then((moduleClass) => {
            defineControl(moduleClass.VolumeSliderControl);
        });
    };

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();
    }

    renderButton() {
        if (!this.buttonRoot) {
            return;
        }

        this.setButtonLabel(
            this.video.isMuted() ?
            this.translate('TITLE_WHEN_MUTED') :
            this.translate('TITLE_WHEN_UNMUTED'),
        );

        if (this.video.hasNewRoundedIcons()) {
            render( <
                RoundedVolumeButton volume = {
                    this.video.isMuted() ? 0 : this.video.volume()
                }
                />,
                this.buttonRoot,
            );
        } else {
            render( <
                VolumeButton volume = {
                    this.video.isMuted() ? 0 : this.video.volume()
                }
                />,
                this.buttonRoot,
            );
        }
        this.reactMounts.button = [this.buttonRoot];
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `VOLUME_${key}`);
    }

    onClickButton = () => {
        // iOS and many phones can't change volume at all. In the event we're using
        // the touchscreen UI with the volume button, though, let's disable the
        // "toggle mute on click" functionality since it conflicts with clicking
        // the button to open the slider.
        //
        // Another option is to differentiate between short and long clicks, which
        // we're not doing here.
        if (!detect.touchScreen) {
            this.toggleMute();
        }
    };

    onFocusInButton = () => {
        this._isFocused = true;
        this.video.enterInputContext('volume-button-focus');
        this.loadSliderCode();
    };

    onFocusOutButton = () => {
        this._isFocused = false;
        this.video.exitInputContext('volume-button-focus');
    };

    onMouseEnter = () => {
        if (this.timeoutForCloseSlider) {
            clearTimeout(this.timeoutForCloseSlider);
        }
        const {
            anyDialogOpen
        } = this.props;
        if (anyDialogOpen) {
            this.timeoutForOpenSlider = setTimeout(() => {
                this.openSlider();
            }, DELAY_IF_DIALOG_OPEN);
            return;
        }
        this.openSlider();
    };

    onMouseLeave = () => {
        clearTimeout(this.timeoutForOpenSlider);
        if (this.timeoutForCloseSlider) {
            clearTimeout(this.timeoutForCloseSlider);
        }
        this._isFocused = false;
        if (this.video.controls.volumeSlider) {
            if (this.props.controlBarBorderRadius) {
                this.timeoutForCloseSlider = setTimeout(() => {
                    if (!this.video.controls.volumeSlider.isVisible()) {
                        this.video.controls.volumeSlider.hide();
                    }
                }, DELAY_IF_DIALOG_OPEN);
            } else {
                this.video.controls.volumeSlider.hide();
            }
        }
    };

    openSlider = () => {
        this._isFocused = true;
        this.loadSliderCode().then(() => {
            if (this._isFocused) {
                this.video.controls.volumeSlider.mounted.then(() => {
                    this.video.controls.volumeSlider.show();
                });
            }
        });
    };

    getButtonTitle() {
        if (this.video.volume() === 0) {
            return 'Unmute';
        }
        return 'Mute';
    }

    mute() {
        this.video.mute();
        setViewerPreference('muted', true);
    }

    unmute() {
        this.video.unmute();
        setViewerPreference('muted', undefined);
    }

    toggleMute() {
        if (this.video.isMuted()) {
            this.unmute();
        } else {
            this.mute();
        }
    }

    onKeyUp = (e) => {
        if (formInputIsFocused() || e.wistiaPlayerHandled) {
            return;
        }
        const video = this.video;
        const context = video.getInputContext();
        if (
            context === 'background-focus' ||
            context === 'player-mouseover' ||
            context === 'player-focus' ||
            context === 'volume-button-focus' ||
            context === 'volume-slider-focus'
        ) {
            if (e.keyCode === M_KEY) {
                if (video.isMuted()) {
                    video.unmute();
                    setViewerPreference('muted', undefined);
                } else {
                    video.mute();
                    setViewerPreference('muted', true);
                }
            }
        }
    };

    onKeyDown = (e) => {
        if (formInputIsFocused() || e.wistiaPlayerHandled) {
            return;
        }
        const video = this.video;
        const context = video.getInputContext();
        if (
            context === 'player-mouseover' ||
            context === 'player-focus' ||
            context === 'volume-button-focus' ||
            context === 'volume-slider-focus'
        ) {
            const keyCode = e.keyCode;
            let dir = 0;
            if (keyCode === UP_KEY) {
                dir = 1;
            } else if (keyCode === DOWN_KEY) {
                dir = -1;
            }
            if (dir === 1) {
                e.preventDefault();
                const increment = e.shiftKey ? 0.01 : 0.1;
                video.volume(video.volume() + increment);
                setViewerPreference('volume', video.volume());
            } else if (dir === -1) {
                e.preventDefault();
                const decrement = e.shiftKey ? 0.01 : 0.1;
                video.volume(video.volume() - decrement);
                setViewerPreference('volume', video.volume());
            }
        }
    };
}

VolumeButtonControl.shouldMount = (video) => {
    const volumeOpt = video._attrs.volumeControl;
    return (
        (volumeOpt === true || volumeOpt == null) && !detect.iphone && !detect.ipad && !detect.android
    );
};

VolumeButtonControl.handle = 'volumeButton';
VolumeButtonControl.type = 'control-bar-right';
VolumeButtonControl.sortValue = 100;

defineControl(VolumeButtonControl);

export default VolumeButtonControl;