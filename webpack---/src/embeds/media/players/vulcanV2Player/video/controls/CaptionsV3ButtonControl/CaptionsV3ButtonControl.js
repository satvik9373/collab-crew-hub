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
import CaptionsButton from './CaptionsButton.jsx';
import {
    RoundedCaptionsButton
} from './RoundedCaptionsButton.tsx';
// import { CaptionsV3Menu } from './CaptionsV3Menu.jsx';
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

const TRANSLATIONS = {
    CAPTIONS_DISABLED: 'No captions available',
    CAPTIONS_HIDE_MENU: 'Hide captions menu',
    CAPTIONS_OFF: 'Off',
    CAPTIONS_SHOW_MENU: 'Show captions menu',
    CAPTIONS_TURN_OFF: 'Turn off captions',
    CAPTIONS_TURN_ON: 'Turn on captions',
};

defineTranslations('en-US', TRANSLATIONS);

const DISABLED = 'disabled';
const ON = 'on';
const OFF = 'off';
const MENU_OPEN = 'menu-open';
const MENU_CLOSED = 'menu-closed';

class CaptionsV3ButtonControl extends Control {#
    captionsV3Promise;

    #
    buttonState;
    // there are 5 states this button can be in:
    // 1. `disabled` - the button is disabled and not interactive. This is used
    //     when we know we will want captions, but they have not been loaded.
    // 2. `on` - the button is in 'toggle-mode' and on.
    // 3. `off` - the button is in 'toggle-mode' and off
    //     on/off mode are used when there is only one captions track available
    // 4. `menu-open` - the button is in 'menu mode' and the dialog is open
    // 5. `menu-closed` - the button is in 'menu mode' and the dialog is closed
    //     The button activates a menu dialog when there are multiple captions tracks

    constructor(video) {
        super(video);
        this.video = video;
        this.unbinds = [];

        // note: `disabledButton` is a special class field that the UIBehavior will
        // look for on each control button render to know if that button should be enabled/disabled
        this.disabledButton = true;
        this.#buttonState = DISABLED;

        this.#loadCaptionsV3().then(() => {
            if (this.captionsV3Control.captionAndSubtitleTextTracks().length > 0) {
                this.disabledButton = false;
                this.#buttonState = OFF;
                this.renderButton();
            }

            // this ensures that if a track is added at a later time
            // the button will be enabled
            this.unbinds.push(
                this.video.on('addtrack', () => {
                    this.disabledButton = false;
                    this.#buttonState = OFF;
                    this.renderButton();
                }),

                // TODO: this will obvs have to change when we have multiple tracks
                this.video.on('captionschange', () => {
                    if (this.captionsV3Control.selectedLanguage) {
                        this.#buttonState = ON;
                    } else {
                        this.#buttonState = OFF;
                    }
                    this.renderButton();
                }),
            );
        });
    }

    // controlDialogClosed() {
    //   this.updateButtonLabel();
    // }

    // controlDialogOpened() {
    //   this.updateButtonLabel();
    // }

    destroy() {
        destroyControl(this);
    }

    // menuItems() {
    //   const tracks = this.captionAndSubtitleTextTracks().map((track) => {
    //     return {
    //       text: track.label,
    //       isSelected: track.mode === 'showing',
    //       onClick: () => {
    //         this.setSelectedLanguage(track.language);
    //       },
    //     };
    //   });

    //   return [
    //     {
    //       text: this.translate('OFF'),
    //       isSelected: this.selectedLanguage === OFF,
    //       onClick: () => {
    //         this.setSelectedLanguage(OFF);
    //       },
    //     },
    //   ].concat(tracks);
    // }

    #
    loadCaptionsV3() {
        if (this.#captionsV3Promise) {
            return this.#captionsV3Promise;
        }

        this.#captionsV3Promise = dynamicImport('assets/external/captions-v3.js')
            .then((moduleClass) => {
                defineControl(moduleClass.CaptionsV3Control);
                return this.video.whenControlMounted('captionsV3');
            })
            .then(() => {
                this.captionsV3Control = this.video.controls.captionsV3;
            });

        return this.#captionsV3Promise;
    }

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();
    }

    // mountDialog(dialogRoot) {
    //   if (this.captionAndSubtitleTextTracks().length <= 1) {
    //     return;
    //   }

    //   this.dialogRoot = dialogRoot;
    //   const codeLoaded = dynamicImport('assets/external/interFontFace.js').then(() => {
    //     this.selectedLanguage = OFF;

    //     this.renderDialog();
    //   });

    //   this.loading(
    //     new Promise((resolve) => {
    //       codeLoaded.then(resolve);
    //     }),
    //   );

    //   return codeLoaded;
    // }

    // this button is only clickable once the captions-v3 control code has been loaded
    // TODO: will have to change when there are multiple tracks
    onClickButton = () => {
        if (this.captionsV3Control ? .selectedLanguage) {
            this.captionsV3Control.setLanguage(undefined);
            this.#buttonState = OFF;
        } else {
            const lang = this.captionsV3Control.captionAndSubtitleTextTracks()[0].language;
            this.captionsV3Control.setLanguage(lang);
            this.#buttonState = ON;
        }

        this.renderButton();
    };

    onControlPropsUpdated(prevProps) {
        if (this.dialog && this.dialog.isOpen()) {
            this.renderDialog();
        }

        if (
            prevProps.playerLanguage &&
            this.props.playerLanguage.code !== prevProps.playerLanguage.code
        ) {
            this.updateButtonLabel();
        }
    }

    renderButton() {
        if (this.video._inNativeMode() || !this.buttonRoot) {
            return;
        }

        this.updateButtonLabel();
        if (this.video.hasNewRoundedIcons()) {
            render( <
                RoundedCaptionsButton color = {
                    this.video.playerColor()
                }
                filled = {
                    Boolean(this.captionsV3Control ? .selectedTrack)
                }
                />,
                this.buttonRoot,
            );
        } else {
            render( <
                CaptionsButton color = {
                    this.video.playerColor()
                }
                filled = {
                    Boolean(this.captionsV3Control ? .selectedTrack)
                }
                />,
                this.buttonRoot,
            );
        }
        this.reactMounts.button = [this.buttonRoot];
    }

    // renderDialog() {
    //   if (!this.dialogRoot) {
    //     return;
    //   }

    //   render(
    //     <CaptionsV3Menu {...this.props} items={this.menuItems()} scale={this.props.scale} />,
    //     this.dialogRoot,
    //   );
    //   this.reactMounts.menu = [this.dialogRoot];
    // }

    updateButtonLabel() {
        const translationKeys = {
            [ON]: 'CAPTIONS_TURN_OFF',
            [OFF]: 'CAPTIONS_TURN_ON',
            [MENU_CLOSED]: 'CAPTIONS_SHOW_MENU',
            [MENU_OPEN]: 'CAPTIONS_HIDE_MENU',
            [DISABLED]: 'CAPTIONS_DISABLED',
        };

        const key = translationKeys[this.#buttonState];
        const text = getTranslation(this.props.playerLanguage.code, key);

        this.setButtonLabel(text);
    }
}

CaptionsV3ButtonControl.handle = 'captionsV3Button';
CaptionsV3ButtonControl.type = 'control-bar-right';
CaptionsV3ButtonControl.sortValue = 50;
CaptionsV3ButtonControl.shouldMount = (video) => {
    return video.isLiveMedia();
};
defineControl(CaptionsV3ButtonControl);