import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import Control from '../../shared/controls/Control.js';
import {
    EllipsisButton
} from '../../shared/ui_components/EllipsisButton.jsx';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';
import {
    getTranslation,
    defineTranslations
} from '../../../../../shared/translations.js';

defineTranslations('en-US', {
    ELLIPSIS_LESS: 'Show fewer buttons',
    ELLIPSIS_MORE: 'Show more buttons',
});

class EllipsisButtonControl extends Control {
    destroy() {
        destroyControl(this);
    }

    mountButton(buttonElem) {
        this.buttonElem = buttonElem;
        this.renderButton();
    }

    renderButton() {
        render( < EllipsisButton / > , this.buttonElem);
        this.setButtonLabel(this.translate(this.video.ui.isShowingMore() ? 'LESS' : 'MORE'));
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `ELLIPSIS_${key}`);
    }

    onClickButton = () => {
        if (this.video.ui.isShowingMore()) {
            this.video.ui.showLess();
            this.renderButton();
        } else {
            this.video.ui.showMore();
            this.renderButton();
        }
    };
}

EllipsisButtonControl.handle = 'ellipsisButton';
EllipsisButtonControl.isVideoChrome = true;
EllipsisButtonControl.type = 'ellipsis';
EllipsisButtonControl.sortValue = 100000;

EllipsisButtonControl.shouldMount = (video) => {
    const buttonsOnRight = video._impl.ui ? .getControlsByType('control-bar-right') || [];
    const playbar = video._impl.ui ? .getControlsByType('playbar') || [];

    return (
        buttonsOnRight.length > 0 &&
        playbar.length > 0 &&
        video._impl.ui &&
        !video._impl.ui.shouldShowMoreDefaultValue()
    );
};

defineControl(EllipsisButtonControl);