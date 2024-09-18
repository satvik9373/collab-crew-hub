import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import Control from './Control.js';
import {
    SmallPlayButton
} from '../../../../../shared/SmallPlayButton.jsx';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';
import {
    getTranslation
} from '../../../../../shared/translations.js';
import {
    RoundedSmallPlayButton
} from '../../../../../shared/RoundedSmallPlayButton.tsx';

class SmallPlayButtonControl extends Control {
    constructor(video) {
        super(video);

        this.unbinds.push(
            video.on('play', this.renderButton),
            video.on('pause', this.renderButton),
            video.on('end', this.renderButton),
        );

        // note: `disabledButton` is a special class field that the UIBehavior will
        // look for on each control button render to know if that button should be enabled/disabled
        if (video.isLiveMedia()) {
            this.disabledButton = true;

            video.ready(() => {
                this.disabledButton = false;
                this.renderButton();
            });
        } else {
            this.disabledButton = false;
        }
    }

    destroy() {
        destroyControl(this);
    }

    #
    getTranslation() {
        if (this.disabledButton) {
            return this.translate('LIVE_NOT_STARTED');
        }

        if (this.video.state() === 'playing') {
            return this.translate('TITLE_WHEN_PLAYING');
        }

        return this.translate('TITLE_WHEN_NOT_PLAYING');
    }

    onControlPropsUpdated(prevProps) {
        if (
            (prevProps.playerLanguage &&
                this.props.playerLanguage.code !== prevProps.playerLanguage.code) ||
            this.props.scale !== prevProps.scale
        ) {
            this.renderButton();
        }
    }

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();
    }

    renderButton = () => {
        if (!this.buttonRoot) {
            return;
        }

        this.setButtonLabel(this.#getTranslation());

        const marginLeft = !(this.video.state() === 'playing') ? `${this.props.scale * 1.5}px` : 0;

        if (this.video.hasNewRoundedIcons()) {
            render( <
                RoundedSmallPlayButton isPlaying = {
                    this.video.state() === 'playing'
                }
                svgStyle = {
                    {
                        verticalAlign: 'top'
                    }
                }
                marginLeft = {
                    marginLeft
                }
                />,
                this.buttonRoot,
            );
        } else {
            render( <
                div style = {
                    this.wrapperStyle()
                } >
                <
                SmallPlayButton isPlaying = {
                    this.video.state() === 'playing'
                }
                noPadding = {
                    true
                }
                svgStyle = {
                    {
                        verticalAlign: 'top'
                    }
                }
                /> <
                /div>,
                this.buttonRoot,
            );
        }

        this.reactMounts = [this.rootElem];
    };

    wrapperStyle() {
        const {
            scale
        } = this.props;

        const isPlaying = this.video.state() === 'playing';
        let padding = isPlaying ?
            `${10 * scale}px 0 ${11 * scale}px 0` :
            `${10 * scale}px 0 ${9 * scale}px 0`;

        return {
            boxSizing: 'border-box',
            height: '100%',
            marginLeft: !isPlaying ? `${scale * 1}px` : 0,
            padding,
            position: 'relative',
            width: '100%',
        };
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `PLAY_BUTTON_${key}`);
    }

    onClickButton = () => {
        const video = this.video;
        if (video.state() === 'playing') {
            video.pause();
        } else {
            video.play();
        }
    };

    onKeyDownButton = (e) => {
        if (e.keyCode === 32 || e.keyCode === 13) {
            // space or return
            e.__handledAlready = true;
        }
    };

    pcfButtonWidth() {
        return 40;
    }
}

SmallPlayButtonControl.shouldMount = (video) => {
    const smallPlayButtonOpt = video._attrs.playPauseControl;
    const isEnabled = smallPlayButtonOpt === true || smallPlayButtonOpt == null;
    const controlBarBigEnoughToFit = video._impl.ui && video._impl.ui.shouldShowMoreDefaultValue();
    return isEnabled && controlBarBigEnoughToFit;
};
SmallPlayButtonControl.handle = 'smallPlayButton';
SmallPlayButtonControl.type = 'control-bar-left';
SmallPlayButtonControl.sortValue = 100;

defineControl(SmallPlayButtonControl);

export default SmallPlayButtonControl;