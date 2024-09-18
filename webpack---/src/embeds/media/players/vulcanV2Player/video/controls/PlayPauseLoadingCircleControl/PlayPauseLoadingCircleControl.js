import {
    h,
    render
} from 'preact';
import {
    controlMultiplierBasedOnVideo
} from 'utilities/fit-control.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import Control from '../../../shared/controls/Control.js';
import CircleOverlayButton from '../../../shared/ui_components/CircleOverlayButton.jsx';
import LoadingSwoop from './LoadingSwoop.jsx';
import {
    SmallPlayButton
} from '../../../../../../shared/SmallPlayButton.jsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    getTranslation
} from '../../../../../../shared/translations.js';
import {
    RoundedSmallPlayButton
} from '../../../../../../shared/RoundedSmallPlayButton.tsx';

const detect = cachedDetect();

export class PlayPauseLoadingCircleControl extends Control {
    constructor(video) {
        super(video);
        this.isLoading = false;
        this.hasMounted = false;
    }

    destroy() {
        destroyControl(this);
    }

    isVisible() {
        const {
            controlsAreVisible
        } = this.props;
        const video = this.video;
        const vidState = video.state();
        const isVideoBeforePlay = vidState === 'beforeplay';
        const isVideoResetToThumbnail =
            vidState === 'ended' && video._attrs.endVideoBehavior === 'reset';
        const anyDialogOpen = video._impl.ui.anyDialogOpen();
        return (
            this.isLoading ||
            (detect.touchScreen &&
                controlsAreVisible &&
                !anyDialogOpen &&
                !isVideoBeforePlay &&
                !isVideoResetToThumbnail)
        );
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.setupBindings();
        this.hasMounted = true;
        this.renderButton();
    }

    onClick = () => {
        if (this.video.state() === 'playing') {
            this.video.pause();
        } else {
            this.video.play();
        }
    };

    onControlPropsUpdated(prevProps) {
        const changeProps = ['anyDialogOpen', 'controlsAreVisible', 'videoWidth'];
        const anyChanges = changeProps.some((n) => this.props[n] !== prevProps[n]);
        if (anyChanges) {
            this.renderButton();
        }
    }

    renderButton = () => {
        const isPlaying = this.video.state() === 'playing';
        const scale = this.scale();

        // Changing this by just a little bit is an easy way to make the icon
        // bigger or smaller, but still centered.
        const iconMult = 1.05;

        const spbWrapperStyle = {
            boxSizing: 'border-box',
            height: '100%',
            paddingBottom: `${45 * scale * iconMult}px`,
            paddingLeft: `${(isPlaying ? 51 : 55) * scale * iconMult}px`,
            paddingRight: `${(isPlaying ? 51 : 45) * scale * iconMult}px`,
            paddingTop: `${45 * scale * iconMult}px`,
        };

        if (this.isLoading) {
            this.video.setAriaLiveText('The video is loading...');
        }

        render( <
            CircleOverlayButton ariaLabel = {
                isPlaying ?
                this.translate('TITLE_WHEN_PLAYING') :
                    this.translate('TITLE_WHEN_NOT_PLAYING')
            }
            isVisible = {
                this.isVisible()
            }
            left = {
                '50%'
            }
            onClick = {
                this.onClick
            }
            scale = {
                scale
            }
            top = {
                '50%'
            } >
            {
                this.isLoading && < LoadingSwoop / >
            } {
                this.video.hasNewRoundedIcons() ? ( <
                    RoundedSmallPlayButton isPlaying = {
                        isPlaying
                    }
                    />
                ) : ( <
                    div style = {
                        spbWrapperStyle
                    } >
                    <
                    SmallPlayButton isPlaying = {
                        isPlaying
                    }
                    noPadding = {
                        true
                    }
                    /> <
                    /div>
                )
            } <
            /CircleOverlayButton>,
            this.rootElem,
        );
        this.reactMounts = [this.rootElem];
    };

    setupBindings() {
        let prevDuration = -1;
        if (!this.hasMounted) {
            this.unbinds.push(
                this.video.on('play', this.renderButton),
                this.video.on('pause', this.renderButton),
                this.video.on('end', this.renderButton),

                this.video.on('waiting', (duration) => {
                    if (!this.isLoading && prevDuration < 2 && duration >= 2) {
                        this.isLoading = true;
                        this.renderButton();
                    }
                    prevDuration = duration;
                }),

                this.video.on('done-waiting', () => {
                    this.isLoading = false;
                    this.renderButton();
                    prevDuration = -1;
                }),

                // failsafe, in case we somehow miss the done-waiting event, let's remove
                // the indicator on timechange.
                this.video.on('timechange', () => {
                    this.isLoading = false;
                    this.renderButton();
                    prevDuration = -1;
                }),
            );
        }
    }

    scale() {
        return Math.min(1.3, Math.max(0.3, controlMultiplierBasedOnVideo(this.video, [640, 960])));
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `PLAY_BUTTON_${key}`);
    }
}

PlayPauseLoadingCircleControl.shouldMount = () => {
    return true;
};

PlayPauseLoadingCircleControl.handle = 'playPauseLoading';
PlayPauseLoadingCircleControl.type = 'above-control-bar';