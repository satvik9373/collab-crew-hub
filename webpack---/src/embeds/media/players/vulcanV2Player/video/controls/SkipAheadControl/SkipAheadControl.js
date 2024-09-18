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
import Control from '../../../shared/controls/Control.js';
import CircleOverlayButton from '../../../shared/ui_components/CircleOverlayButton.jsx';
import SkipAheadIcon from './SkipAheadIcon.jsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';

const detect = cachedDetect();

export class SkipAheadControl extends Control {
    constructor(video) {
        super(video);

        this.unbinds.push(
            video.on('play', this.renderButton),
            video.on('pause', this.renderButton),
            video.on('end', this.renderButton),
        );
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
        return controlsAreVisible && !anyDialogOpen && !isVideoBeforePlay && !isVideoResetToThumbnail;
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.renderButton();
    }

    onClick = () => {
        this.video.time(this.video.time() + 15);
    };

    onControlPropsUpdated(prevProps) {
        const changeProps = ['anyDialogOpen', 'controlsAreVisible', 'videoWidth'];
        const anyChanges = changeProps.some((n) => this.props[n] !== prevProps[n]);
        if (anyChanges) {
            this.renderButton();
        }
    }

    renderButton = () => {
        render( <
            CircleOverlayButton ariaLabel = {
                'Skip ahead 15 seconds'
            }
            fadeUpOnClick = {
                true
            }
            isVisible = {
                this.isVisible()
            }
            left = {
                '80%'
            }
            onClick = {
                this.onClick
            }
            scale = {
                this.scale()
            }
            top = {
                '50%'
            } >
            <
            SkipAheadIcon text = "15" / >
            <
            /CircleOverlayButton>,
            this.rootElem,
        );
        this.reactMounts = [this.rootElem];
    };

    scale() {
        return (
            Math.min(1.3, Math.max(0.3, controlMultiplierBasedOnVideo(this.video, [640, 960]))) * 0.7
        );
    }
}

SkipAheadControl.shouldMount = (video) => {
    return detect.touchScreen && video.duration() > 15 && video._attrs.playBarControl !== false;
};

SkipAheadControl.handle = 'skipAhead';
SkipAheadControl.type = 'above-control-bar';

export default SkipAheadControl;