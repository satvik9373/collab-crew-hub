import {
    controlMultiplierBasedOnVideo
} from 'utilities/fit-control.js';
import {
    h,
    render
} from 'preact';
import Control from '../../shared/controls/Control.js';
import {
    BigPlayButton
} from '../../shared/ui_components/BigPlayButton.tsx';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';
import withOnClick from '../../higher_order_components/withOnClick.js';

class BigPlayButtonControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;

        this.eventListeners.set('playercolorchange', () => this.renderButton());

        this.unbinds.push(
            video.on('play', this.renderButton),
            video.on('playrejected', this.renderButton),
            video.on('playpending', this.renderButton),
            video.on('playerlanguagechange', this.renderButton),
            video.on('end', this.renderButton),
            video.on('up', this.renderButton),
            video.on('trimchange', this.renderButton),
        );
        this._timeEnabled = this.video._opts.bpbTime;

        this.hiddenButton = this.video.isLiveMedia();

        if (this.video.isLiveMedia()) {
            this.video.ready(() => {
                this.hiddenButton = false;
                this.renderButton();
            });
        }
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.renderButton();
    }

    destroy() {
        destroyControl(this);
    }

    renderButton = () => {
        if (this.__destroyed || this.hiddenButton) {
            return;
        }
        const buttonTabIndex = !this.video.publicApi.popover || this.video.publicApi.popover.isVisible() ? 0 : -1;

        const BigPlayButtonWithOnClick = withOnClick(BigPlayButton);
        render( <
            BigPlayButtonWithOnClick borderRadius = {
                this.props.bigPlayButtonBorderRadius
            }
            buttonTabIndex = {
                buttonTabIndex
            }
            color = {
                this.video.playerColor()
            }
            duration = {
                this.video.duration()
            }
            elemRef = {
                (elem) => (this.buttonElem = elem)
            }
            hasNewRoundedIcons = {
                this.video.hasNewRoundedIcons()
            } // TODO: Remove once rounded icons are fully released
            isLiveMedia = {
                this.video.isLiveMedia()
            }
            isVisible = {
                this.shouldShow()
            }
            leftNudgeFraction = {
                this.getLeftNudgeFraction()
            }
            noMixBlendMode = {
                this.video.embedOptions().noMixBlendMode
            }
            onClick = {
                this.onClick
            }
            controlBarDistance = {
                this.props.controlBarDistance
            }
            playerLanguage = {
                this.props.playerLanguage
            }
            scale = {
                this.scale()
            }
            showBpbTime = {
                this._timeEnabled
            }
            topNudgeFraction = {
                this.getTopNudgeFraction()
            }
            videoHeight = {
                this.props.videoHeight - this.props.controlBarHeight * 0.75
            }
            videoName = {
                this.video.name() || ''
            }
            videoWidth = {
                this.props.videoWidth
            }
            />,
            this.rootElem,
        );
        this.reactMounts = [this.rootElem];
    };

    onControlPropsUpdated(prevProps) {
        if (
            this.props.videoWidth !== prevProps.videoWidth ||
            this.props.videoHeight !== prevProps.videoHeight ||
            this.props.bigPlayButtonBorderRadius !== prevProps.bigPlayButtonBorderRadius
        ) {
            this.renderButton();
        }
    }

    onClick = () => {
        this.video.play();
        this.video.focus();
    };

    shouldShow() {
        const video = this.video;
        return (
            video.lastPlayInfo().isPending === false &&
            (video.state() === 'beforeplay' ||
                (video.state() === 'ended' && video._attrs.endVideoBehavior === 'reset'))
        );
    }

    scale() {
        return Math.min(1.3, Math.max(0.3, controlMultiplierBasedOnVideo(this.video, [640, 960])));
    }

    setTimeEnabled(timeEnabled) {
        this._timeEnabled = timeEnabled;
        this.renderButton();
    }

    setLeftNudgeFraction(f) {
        this._leftNudgeFraction = f;
        this.renderButton();
    }

    setTopNudgeFraction(f) {
        this._topNudgeFraction = f;
        this.renderButton();
    }

    getLeftNudgeFraction() {
        if (this._leftNudgeFraction != null) {
            return this._leftNudgeFraction;
        }
        return this.video._opts.bpbLeftNudge;
    }

    getTopNudgeFraction() {
        if (this._topNudgeFraction != null) {
            return this._topNudgeFraction;
        }
        return this.video._opts.bpbTopNudge;
    }

    getButtonOffsets() {
        const {
            offsetHeight,
            offsetTop
        } = this.buttonElem;
        return {
            offsetHeight,
            offsetTop
        };
    }
}

BigPlayButtonControl.shouldMount = (video) => {
    const bigPlayButtonOpt = video._attrs.bigPlayButton;
    return bigPlayButtonOpt == null || bigPlayButtonOpt === true;
};

BigPlayButtonControl.handle = 'bigPlayButton';
BigPlayButtonControl.type = 'above-control-bar';
defineControl(BigPlayButtonControl);

export default BigPlayButtonControl;