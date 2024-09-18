import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    getLastTime
} from 'utilities/resumableVideoData.js';
import Control from '../../shared/controls/Control.js';
import {
    ProgressIndicator
} from '../../../../../shared/ProgressIndicator.jsx';
import shouldShowAsBeforePlay from '../../shouldShowAsBeforePlay.js';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';

const safelyGetPercentWatched = (lastTime, duration) => {
    if (lastTime == null || !duration) {
        return;
    }
    return (100 * lastTime) / duration;
};

class PlaybarlessProgressIndicatorControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;
        this.unbinds.push(
            video.on('play', () => this.renderProgressIndicator()),
            video.on('playrejected', () => this.renderProgressIndicator()),
            video.on('playpending', () => this.renderProgressIndicator()),
            video.on('up', () => this.renderProgressIndicator()),
            video.on('end', () => this.renderProgressIndicator()),
        );
    }

    boundedScale() {
        const {
            scale
        } = this.props;
        return Math.min(Math.max(scale, 0.8), 2);
    }

    destroy() {
        destroyControl(this);
    }

    isVisible() {
        return this._isVisible;
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.renderProgressIndicator();
    }

    onControlPropsUpdated(prevProps) {
        if (prevProps.containerWidth !== this.props.containerWidth) {
            this.renderProgressIndicator();
        }
    }

    rootStyle() {
        return {
            bottom: 0,
            left: 0,
            position: 'absolute',
            width: '100%',
        };
    }

    renderProgressIndicator() {
        const lastTime = getLastTime(this.video.hashedId());
        const duration = this.video.duration();
        const percentWatched = safelyGetPercentWatched(lastTime, duration);
        this._isVisible =
            percentWatched > 0 && this.video.shouldResume() && shouldShowAsBeforePlay(this.video);

        render( <
            div style = {
                this.rootStyle()
            } >
            <
            ProgressIndicator color = {
                this.video.playerColor()
            }
            isVisible = {
                this._isVisible
            }
            percentWatched = {
                percentWatched
            }
            scale = {
                this.boundedScale()
            }
            /> <
            /div>,
            this.rootElem,
        );
    }
}

PlaybarlessProgressIndicatorControl.handle = 'playbarlessProgressIndicator';
PlaybarlessProgressIndicatorControl.type = 'foreground';
PlaybarlessProgressIndicatorControl.sortValue = 1800;
PlaybarlessProgressIndicatorControl.shouldMount = (publicApi) => {
    return (!publicApi.isAudio() &&
        publicApi._attrs.resumable !== false &&
        publicApi._opts.version !== 'v1' &&
        publicApi._attrs.controlsVisibleOnLoad === false
    );
};

defineControl(PlaybarlessProgressIndicatorControl);
export default PlaybarlessProgressIndicatorControl;