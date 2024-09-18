import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import Control from '../../../shared/controls/Control.js';
import AirplayButton from './AirplayButton.jsx';
import {
    RoundedAirplayButton
} from './RoundedAirplayButton.tsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';

class AirplayControl extends Control {
    mountButton(buttonElem) {
        this.buttonElem = buttonElem;
        this.renderButton();
    }

    destroy() {
        destroyControl(this);
    }

    renderButton() {
        if (!this.buttonElem) {
            return;
        }

        this.setButtonLabel('Airplay');

        if (this.video.hasNewRoundedIcons()) {
            render( < RoundedAirplayButton / > , this.buttonElem);
        } else {
            render( < AirplayButton / > , this.buttonElem);
        }
        this.reactMounts = [this.buttonElem];
    }

    onClickButton = () => {
        this.video.getMediaElement().webkitShowPlaybackTargetPicker();
    };
}

AirplayControl.shouldMount = (video) => {
    if (
        Wistia.engines &&
        Wistia.engines.TwoStrokeVideo &&
        video.getMediaElement() &&
        video._impl.engine instanceof Wistia.engines.TwoStrokeVideo
    ) {
        return false;
    }
    if (window.WebKitPlaybackTargetAvailabilityEvent && !video._checkingForAirplay) {
        video._checkingForAirplay = true;
        video._airplayAvailable = false;
        video.whenVideoElementInDom().then(() => {
            video._impl.engine.bind('webkitplaybacktargetavailabilitychanged', (event) => {
                video._airplayAvailable = event.availability === 'available';
            });
        });
        video.bind('beforereplace', () => {
            delete video._checkingForAirplay;
            delete video._airplayAvailable;
        });
    }
    const airplaySupported = video._airplayAvailable && video.plugin.airplay;
    const shouldShowButton =
        video._opts.airplayButton != null ?
        video._opts.airplayButton :
        !video._impl.behaviors.ui.isChromeless();
    return airplaySupported && shouldShowButton;
};

AirplayControl.handle = 'airplayButton';
AirplayControl.type = 'control-bar-right';
AirplayControl.sortValue = 800;
defineControl(AirplayControl);

export default AirplayControl;