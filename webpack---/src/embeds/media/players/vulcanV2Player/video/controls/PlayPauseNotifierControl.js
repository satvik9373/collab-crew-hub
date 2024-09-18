import {
    Wistia
} from 'wistia_namespace.js';
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
import Control from '../../shared/controls/Control.js';
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
    RoundedSmallPlayButton
} from '../../../../../shared/RoundedSmallPlayButton.tsx';

const detect = cachedDetect();

class PlayPauseNotifierControl extends Control {
    constructor(video) {
        super(video);
        this.isOpaque = false;

        this.unbinds.push(
            video.on('play', this.showIconAndFade),
            video.on('pause', this.showIconAndFade),
        );
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
    }

    onControlPropsUpdated(prevProps) {
        if (prevProps.videoWidth !== this.props.videoWidth) {
            this.renderButton();
        }
    }

    showIconAndFade = () => {
        if (!this.playedOnce) {
            this.playedOnce = true;
            return;
        }

        // This control conflicts with the CenteredPlayPauseTogglerControl unless
        // the video is chromeless.
        if (this.video.isControlEnabled('centeredPlayPauseToggler') && !this.props.chromeless) {
            return;
        }

        if (this.video._inNativeMode()) {
            return;
        }

        if (this.ignoreNextPlayOrPause) {
            this.ignoreNextPlayOrPause = false;
            return;
        }

        this.isPlaying = this.video.state() === 'playing';
        this.renderAndFade();
    };

    renderAndFade() {
        // Show this if the play/pause was driven by a user-event and recently
        // occurred.
        const lastPlay = this.video.lastPlayInfo();
        if (this.isPlaying && lastPlay.source !== 'user-event') {
            return;
        }

        const lastPause = this.video.lastPauseInfo();
        if (!this.isPlaying && lastPause.source !== 'user-event') {
            return;
        }

        this.isOpaque = true;
        this.renderButton();
        clearTimeout(this.fadeTimeout);
        this.fadeTimeout = setTimeout(() => {
            this.isOpaque = false;
            this.renderButton();
        }, 20);
    }

    renderButton() {
        // note that we show the _inverse_ of whether the video is playing because
        // we want to show the state we're _currently in_, which is the opposite of
        // what the small play button does. kinda counterintuitive.
        render( <
            div class = "w-play-pause-notifier"
            style = {
                this.rootStyle()
            } > {
                this.video.hasNewRoundedIcons() ? ( <
                    RoundedSmallPlayButton isPlaying = {!this.isPlaying
                    }
                    />
                ) : ( <
                    div style = {
                        this.graphicStyle()
                    } >
                    <
                    SmallPlayButton isPlaying = {!this.isPlaying
                    }
                    noPadding = {
                        true
                    }
                    /> <
                    /div>
                )
            } <
            /div>,
            this.rootElem,
        );
        this.reactMounts = [this.rootElem];
    }

    oldRootStyle() {
        const scale = this.scale();
        const isPlaying = this.isPlaying;
        const graphicHeight = isPlaying ? 72 : 80;
        const graphicWidth = isPlaying ? 60 : 50;
        return {
            height: `${graphicHeight * scale}px`,
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            opacity: this.isOpaque ? 0.5 : 0,
            top: '50%',
            transform: `translate(-${isPlaying ? 33 : 50}%, -50%) scale(${this.isOpaque ? 0.9 : 1.1})`,
            transition: this.isOpaque ? '' : 'opacity .8s, transform .8s',
            width: `${graphicWidth * scale}px`,
        };
    }

    rootStyle() {
        const scale = this.scale();
        const graphicHeight = 140;
        const graphicWidth = 140;
        return {
            background: 'rgba(0,0,0,.6)',
            borderRadius: '50%',
            height: `${graphicHeight * scale}px`,
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            opacity: this.isOpaque ? 0.6 : 0,
            top: '50%',
            transform: `translate(-50%, -50%) scale(${this.isOpaque ? 0.7 : 0.8})`,
            transition: this.isOpaque ? '' : 'opacity .8s, transform .8s',
            width: `${graphicWidth * scale}px`,
        };
    }

    graphicStyle() {
        const scale = this.scale();
        const isPlaying = this.isPlaying;
        const graphicHeight = isPlaying ? 72 : 80;
        const graphicWidth = isPlaying ? 60 : 50;
        return {
            height: `${graphicHeight * scale}px`,
            left: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            transform: `translate(-${isPlaying ? 38 : 50}%, -${isPlaying ? 47 : 50}%)`,
            width: `${graphicWidth * scale}px`,
        };
    }

    scale() {
        return Math.min(1.3, Math.max(0.3, controlMultiplierBasedOnVideo(this.video, [640, 960])));
    }

    svgStyle() {
        return {
            filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,0.5))',
        };
    }
}

PlayPauseNotifierControl.shouldMount = (video) => {
    return video._attrs.playPauseNotifier !== false && !detect.touchScreen;
};

PlayPauseNotifierControl.handle = 'playPauseNotifier';
PlayPauseNotifierControl.type = 'above-control-bar';

defineControl(PlayPauseNotifierControl);

export default PlayPauseNotifierControl;