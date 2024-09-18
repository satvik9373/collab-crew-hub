import {
    h,
    render
} from 'preact';
import {
    elemBind,
    formInputIsFocused
} from 'utilities/elem.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import Control from '../../../shared/controls/Control.js';
import FullscreenButton from './FullscreenButton.jsx';
import {
    RoundedFullscreenButton
} from './RoundedFullscreenButton.tsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';
import {
    getTranslation,
    defineTranslations
} from '../../../../../../shared/translations.js';

const detect = cachedDetect();

const F_KEY = 70;

defineTranslations('en-US', {
    FULLSCREEN_DOUBLE_TAP: 'Double-tap to zoom in or out',
    FULLSCREEN_TITLE_WHEN_IN_FULLSCREEN: 'Unfullscreen',
    FULLSCREEN_TITLE_WHEN_NOT_IN_FULLSCREEN: 'Fullscreen',
});

class FullscreenButtonControl extends Control {
    constructor(video) {
        super(video);

        this.unbinds.push(
            this.impl.on('enterfullscreen', () => {
                this.renderButton();
            }),
            this.impl.on('cancelfullscreen', () => {
                this.renderButton();
            }),
            elemBind(document, 'keyup', this.onKeyUp),
        );

        if (!supportsRealFullscreen() &&
            !supportsFakeFullscreen(this.impl) &&
            supportsDoubleTapToZoom()
        ) {
            this.mountDialog = this.maybeMountDialog;
        }
    }

    destroy() {
        destroyControl(this);
    }

    inFullscreen() {
        if (this.isWistiaPlayer) {
            return this.api.inFullscreen;
        }

        return this.api.inFullscreen();
    }

    onControlPropsUpdated(prevProps) {
        if (
            prevProps.playerLanguage &&
            this.props.playerLanguage.code !== prevProps.playerLanguage.code
        ) {
            this.renderButton();

            if (this.dialog && this.dialog.isOpen()) {
                this.renderDialog();
            }
        }
    }

    maybeMountDialog(dialogElem) {
        this.dialogElem = dialogElem;
        this.renderDialog();
    }

    renderDialog() {
        this.dialogElem.innerHTML = this.translate('DOUBLE_TAP');
    }

    mountButton(buttonElem) {
        this.buttonElem = buttonElem;
        this.renderButton();
    }

    renderButton() {
        if (!this.buttonElem) {
            return;
        }

        const label = this.inFullscreen() ?
            this.translate('TITLE_WHEN_IN_FULLSCREEN') :
            this.translate('TITLE_WHEN_NOT_IN_FULLSCREEN');
        this.setButtonLabel(label);

        if (this.video.hasNewRoundedIcons()) {
            render( < RoundedFullscreenButton / > , this.buttonElem);
        } else {
            render( < FullscreenButton / > , this.buttonElem);
        }
        this.reactMounts = [this.buttonElem];
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `FULLSCREEN_${key}`);
    }

    onClickButton = () => {
        this.toggleFullscreen();
    };

    onKeyUp = (e) => {
        if (formInputIsFocused()) {
            return;
        }

        const context = this.impl.getInputContext();
        if (
            context === 'background-focus' ||
            context === 'player-mouseover' ||
            context === 'player-focus' ||
            context === 'playbar-focus'
        ) {
            if (e.keyCode === F_KEY) {
                this.toggleFullscreen();
            }
        }
    };

    toggleFullscreen() {
        if (!supportsRealFullscreen() && !supportsFakeFullscreen(this.impl)) {
            return;
        }
        if (this.inFullscreen()) {
            this.api.cancelFullscreen();
        } else {
            this.api.requestFullscreen();
        }
    }
}

FullscreenButtonControl.handle = 'fullscreenControl';
FullscreenButtonControl.type = 'control-bar-right';
FullscreenButtonControl.sortValue = 1000;
defineControl(FullscreenButtonControl);

const supportsRealFullscreen = () => {
    return detect.fullscreenEnabled;
};

const supportsFakeFullscreen = (publicApi) => {
    const mediaData = publicApi._mediaData;
    const embedOptions = publicApi._opts;
    const isSpherical =
        (mediaData.spherical || embedOptions.spherical) && !embedOptions.overrideSpherical;
    const isSoapbox = !!mediaData.secondaryMediaData;
    const inIframe = top !== self;

    // On iOS, we do fake fullscreen. This works if we're not in an
    // iframe. If we _are_ in an iframe, then we can fullscreen the
    // <video> element, but then we'd lose basic functionality of
    // spherical and soapbox vids, so just disable fullscreen in that
    // situation.
    return detect.ios.version > 0 && (!inIframe || (!isSpherical && !isSoapbox));
};

const supportsDoubleTapToZoom = () => {
    return detect.ios.version > 0 || detect.android;
};

FullscreenButtonControl.shouldMount = (publicApi) => {
    const fullscreenButtonOpt = publicApi._attrs.fullscreenControl;
    return (
        (fullscreenButtonOpt === true || fullscreenButtonOpt == null) &&
        (supportsRealFullscreen() || supportsFakeFullscreen(publicApi) || supportsDoubleTapToZoom())
    );
};

export default FullscreenButtonControl;