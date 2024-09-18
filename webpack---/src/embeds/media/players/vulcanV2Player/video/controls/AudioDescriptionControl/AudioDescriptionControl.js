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
import {
    defineControl
} from 'embeds/shared/control_definitions.js';
import AudioDescriptionButton from './AudioDescriptionButton.jsx';
import {
    AudioDescriptionMenu
} from './AudioDescriptionMenu.jsx';
import Control from '../../../shared/controls/Control.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineTranslations,
    getTranslation
} from '../../../../../../shared/translations.js';
import {
    isMouseDownRecently
} from '../../../../../../../utilities/isMouseDown.js';
import {
    RoundedAudioDescriptionButton
} from './RoundedAudioDescriptionButton.tsx';

defineTranslations('en-US', {
    AUDIO_DESCRIPTION_HIDE_MENU: 'Hide audio description menu',
    AUDIO_DESCRIPTION_SHOW_MENU: 'Show audio description menu',
});

class AudioDescriptionControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;

        this.unbinds.push(
            video.on('playerlanguagechange', () => {
                if (this.menuElem) {
                    this.renderMenu();
                }
            }),

            video.on('audiostreamchange', () => {
                if (this.menuElem) {
                    this.renderMenu();
                }
            }),
        );
    }

    controlDialogOpened() {
        this.updateButtonLabel();
    }

    controlDialogClosed() {
        this.updateButtonLabel();
    }

    destroy() {
        destroyControl(this);
    }

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();
    }

    mountDialog(dialogRoot) {
        this.dialogRoot = dialogRoot;
        const codeLoaded = dynamicImport('assets/external/interFontFace.js').then(() => {
            this.renderMenu();
        });

        this.loading(
            new Promise((resolve) => {
                codeLoaded.then(resolve);
            }),
        );

        return codeLoaded;
    }

    onControlPropsUpdated(prevProps) {
        if (this.dialog && this.dialog.isOpen()) {
            this.renderMenu();
        }

        if (
            prevProps.playerLanguage &&
            this.props.playerLanguage.code !== prevProps.playerLanguage.code
        ) {
            this.renderButton();
            this.renderMenu();
        }
    }

    renderButton() {
        this.updateButtonLabel();

        if (this.video.hasNewRoundedIcons()) {
            render( < RoundedAudioDescriptionButton / > , this.buttonRoot);
        } else {
            render( < AudioDescriptionButton / > , this.buttonRoot);
        }

        this.reactMounts.button = [this.buttonRoot];
    }

    renderMenu() {
        if (!this.dialog.isOpen()) {
            return;
        }

        if (!this.dialogRoot) {
            return;
        }

        const allAudioTracks = this.video.engine.getAudioTracks();

        render( <
            AudioDescriptionMenu { ...this.props
            }
            elemRef = {
                (elem) => (this.menuElem = elem)
            }
            onClick = {
                this.onClickTrack
            }
            scale = {
                this.props.scale
            }
            tracks = {
                allAudioTracks
            }
            />,
            this.dialogRoot,
        );

        this.reactMounts.menu = [this.dialogRoot];
    }

    updateButtonLabel() {
        if (!this.dialog) {
            return;
        }
        if (this.dialog.isOpen()) {
            this.setButtonLabel(this.translate('HIDE_MENU'));
        } else {
            this.setButtonLabel(this.translate('SHOW_MENU'));
        }
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `AUDIO_DESCRIPTION_${key}`);
    }

    onClickTrack = (id) => {
        const currentId = this.video.engine.getCurrentAudioTrackId();
        if (Number(currentId) !== Number(id)) {
            this.video.changeAudioTrack(id);
        }

        if (isMouseDownRecently()) {
            setTimeout(() => {
                this.dialog.close();
                this.buttonRoot.parentElement.focus();
            }, 300);
        }
    };
}

// It'll only actually mount if the video also has extended audio descriptions
// uploaded. But we only check the embed options because, if the user is
// switching between them in Customize, we'd rather show nothing than the wrong
// control.
const isExtendedAudioDescriptionsEnabled = (video) => {
    const extendedAudioDescriptionPluginOptions =
        video.embedOptions().plugin ? .extendedAudioDescription;
    return (
        extendedAudioDescriptionPluginOptions && extendedAudioDescriptionPluginOptions.on !== false
    );
};

AudioDescriptionControl.shouldMount = (video) => {
    if (
        // if both AD and EAD are available, mount the EAD control instead of this one
        // Temporarily allow for both `audioDescriptionIsRequired` and `audioDescriptionControl` exist while
        // mediaData falls out of cache.
        !isExtendedAudioDescriptionsEnabled(video) &&
        video._attrs.audioDescriptionIsRequired !== false &&
        video._attrs.audioDescriptionControl !== false &&
        (video._impl ? .getAudioTracks ? .() ? ? []).length > 1
    ) {
        return true;
    }
    return false;
};

AudioDescriptionControl.handle = 'audioDescriptionButton';
AudioDescriptionControl.type = 'control-bar-right';
AudioDescriptionControl.sortValue = 51;
AudioDescriptionControl.isVideoChrome = true;
defineControl(AudioDescriptionControl);

Wistia.AudioDescriptionControl = AudioDescriptionControl;

export default AudioDescriptionControl;