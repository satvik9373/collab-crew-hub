import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import Control from '../../../shared/controls/Control.js';
import LiveStreamStatus from './LiveStreamStatus.jsx';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';

class LiveStreamStatusControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;

        // setup binding to play/pause events
        // then re-render status control and pause that into the component
        this.undbinds = [];
        this.undbinds.push(
            this.video.on('play', () => {
                this.renderLiveStreamStatus();
            }),
            this.video.on('pause', () => {
                this.renderLiveStreamStatus();
            }),
            this.video.on('end', () => {
                this.renderLiveStreamStatus();
            }),
            this.video.on('widthchange', () => {
                this.renderLiveStreamStatus();
            }),
            this.video.on('playerlanguagechange', () => {
                this.renderLiveStreamStatus();
            }),
        );

        this.video.ready(() => {
            this.renderLiveStreamStatus();
        });
    }

    onControlPropsUpdated(prevProps) {
        if (prevProps.controlsAreVisible !== this.props.controlsAreVisible) {
            this.renderLiveStreamStatus();
        }
    }

    mount(rootElem) {
        this.rootElem = rootElem;

        return dynamicImport('assets/external/interFontFace.js').then(() => {
            this.renderLiveStreamStatus();
            this.reactMounts = [this.rootElem];
        });
    }

    renderLiveStreamStatus() {
        let scheduledFor = null;

        if (this.video._mediaData.liveStreamEventDetails ? .scheduledFor) {
            scheduledFor = new Date(this.video._mediaData.liveStreamEventDetails.scheduledFor);
        }

        render( <
            LiveStreamStatus videoState = {
                this.video.state()
            }
            videoReady = {
                this.video.ready()
            }
            scheduledFor = {
                scheduledFor
            }
            setAriaLiveText = {
                this.setAriaLiveText
            } { ...this.props
            }
            />,
            this.rootElem,
        );
    }

    setAriaLiveText = (text) => {
        this.video.setAriaLiveText(text);
    };
}

LiveStreamStatusControl.handle = 'liveStreamStatusOverlay';
LiveStreamStatusControl.type = 'foreground';
LiveStreamStatusControl.sortValue = 500;
LiveStreamStatusControl.shouldMount = (video) => {
    return video.isLiveMedia();
};

defineControl(LiveStreamStatusControl);

export default LiveStreamStatusControl;