import {
    h,
    render
} from 'preact';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import Control from '../../../shared/controls/Control.js';
import CaptionsButton from './CaptionsButton.jsx';
import {
    RoundedAudioDescriptionButton
} from './RoundedCaptionsButton.tsx';
import {
    CaptionsMenu
} from './CaptionsMenu.jsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';
import {
    defineTranslations,
    getTranslation
} from '../../../../../../shared/translations.js';
import {
    fetchCaptions,
    getCaptionsForLanguage
} from '../../../shared/captionsHelper.js';
import {
    isMouseDownRecently
} from '../../../../../../../utilities/isMouseDown.js';

const detect = cachedDetect();

defineTranslations('en-US', {
    CAPTIONS_HIDE_MENU: 'Hide captions menu',
    CAPTIONS_OFF: 'Off',
    CAPTIONS_SHOW_MENU: 'Show captions menu',
});

const OFF = '_off_';

class CaptionsButtonControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;
        this.options = video.plugin.captions.options;
        this.selectedLanguage = this.options.language || OFF;
        this.unbinds = [];
    }

    destroy() {
        destroyControl(this);
    }

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();

        if (this.options.onByDefault) {
            this.fetchCaptions().then(() => {
                if (this._destroyed) {
                    return;
                }
                const preferredCaptions = this.getPreferredCaptions();
                if (preferredCaptions) {
                    this.setSelectedLanguage(preferredCaptions.language);
                }
            });
        }
    }

    mountDialog(dialogRoot) {
        this.dialogRoot = dialogRoot;
        const codeLoaded = Promise.all([
            dynamicImport('assets/external/interFontFace.js'),
            this.fetchCaptions(),
        ]).then(() => {
            this.renderDialog();
        });

        this.loading(
            new Promise((resolve) => {
                codeLoaded.then(resolve);
            }),
        );

        return codeLoaded;
    }

    renderButton() {
        if (this.video._inNativeMode()) {
            return;
        }

        if (!this.buttonRoot) {
            return;
        }
        this.updateButtonLabel();

        if (this.video.hasNewRoundedIcons) {
            render( < RoundedAudioDescriptionButton / > , this.buttonRoot);
        } else {
            render( < CaptionsButton / > , this.buttonRoot);
        }
        this.reactMounts.button = [this.buttonRoot];
    }

    controlDialogOpened() {
        this.updateButtonLabel();
    }

    controlDialogClosed() {
        this.updateButtonLabel();
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

    renderDialog() {
        if (!this.captionsResp) {
            return;
        }

        if (!this.dialogRoot) {
            return;
        }

        render( <
            CaptionsMenu { ...this.props
            }
            items = {
                this.menuItems()
            }
            scale = {
                this.props.scale
            }
            isPlaybarEnabled = {
                this.video.isControlEnabled('playbar')
            }
            isTranscriptEnabled = {
                this.isTranscriptEnabled()
            }
            toggleTranscript = {
                this.toggleTranscript
            }
            />,
            this.dialogRoot,
        );
        this.reactMounts.menu = [this.dialogRoot];
    }

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

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `CAPTIONS_${key}`);
    }

    toggleTranscript = () => {
        this.video.whenControlMounted('transcript').then((control) => {
            if (control._isVisible) {
                control.close();
            } else {
                control.open();
            }
        });
    };

    isTranscriptEnabled() {
        // dont enable transcript for mobile
        if (this.options.transcript === false) {
            return false;
        }

        return true;
    }

    tearDownDialogIfClickedRecently() {
        if (isMouseDownRecently()) {
            setTimeout(() => {
                this.dialog.close();
                this.buttonRoot.parentElement.focus();
            }, 300);
        }
    }

    menuItems() {
        return [{
            text: this.translate('OFF'),
            isSelected: this.selectedLanguage === OFF,
            onClick: () => {
                if (this.isTranscriptEnabled()) {
                    this.video.whenControlMounted('transcript').then((control) => control.close());
                }
                this.turnOff();

                this.tearDownDialogIfClickedRecently();
            },
        }, ].concat(
            this.captionsResp.captions
            .map((entry) => {
                return {
                    text: entry.native_name,
                    isSelected: this.selectedLanguage === entry.language,
                    onClick: () => {
                        this.setSelectedLanguage(entry.language);

                        this.tearDownDialogIfClickedRecently();
                    },
                };
            })
            .sort((a, b) => {
                if (a.text === this.translate('OFF')) {
                    return -1;
                }
                if (b.text === this.translate('OFF')) {
                    return 1;
                }
                return a.text.localeCompare(b.text);
            }),
        );
    }

    getCaptions() {
        if (this.captionsResp && this.captionsResp.captions) {
            return this.captionsResp.captions;
        }
        return [];
    }

    getPreferredCaptions() {
        const preferredLanguages = this.captionsResp.preferred_languages;
        for (let i = 0; i < preferredLanguages.length; i++) {
            const preferredLanguage = preferredLanguages[i];
            const captions = getCaptionsForLanguage(preferredLanguage, this.captionsResp.captions);
            if (captions) {
                return captions;
            }
        }
        return null;
    }

    turnOff() {
        this.setSelectedLanguage(OFF);
    }

    setSelectedLanguage(lang) {
        const prevLang = this.selectedLanguage;
        this.selectedLanguage = lang;
        this.renderDialog();
        this.video.controls.captions.setLanguage(lang);
        this.logSelectionInStats();
        if (prevLang !== lang) {
            this.video.embedElement.dispatchEvent(
                new CustomEvent('captions-change', {
                    detail: {
                        isVisible: lang !== OFF,
                        language: lang
                    }
                }),
            );
            this.video.trigger('captionschange', {
                visible: lang !== OFF,
                language: lang
            });
        }
    }

    logSelectionInStats() {
        // if we don't have a captionsResponse, we don't have any captions to report on.
        // this can happen if someone tries to turn off legacy captions when they're not on
        if (!this.captionsResp) {
            return;
        }

        const caption = getCaptionsForLanguage(this.selectedLanguage, this.captionsResp.captions);
        if (caption && caption.language !== '_preview_') {
            this._lastStatsData = {
                caption_key: caption.key,
                language: caption.language,
                time: this.video.time(),
                enabled: caption.language !== OFF,
            };
            this.video._tracker.logCaptionSelection(this._lastStatsData);
        } else if (this._lastStatsData) {
            this._lastStatsData.enabled = false;
            this._lastStatsData.time = this.video.time();
            this.video._tracker.logCaptionSelection(this._lastStatsData);
        }
    }

    fetchCaptions() {
        if (this._destroyed) {
            return new Promise(() => {});
        }

        return fetchCaptions(this.video, this.options).then((resp) => {
            this.captionsResp = resp;
            return resp;
        });
    }

    matchMenuToSelectedTextTrack() {
        if (detect.edge && !this.video._inNativeMode()) {
            return;
        }

        const elem = this.video.getMediaElement();
        const previousSelection = this.selectedLanguage;
        this.selectedLanguage = OFF;
        for (let i = 0; i < elem.textTracks.length; i++) {
            const track = elem.textTracks[i];
            if (track.mode === 'showing' && track.kind === 'captions') {
                this.selectedLanguage = track.language;
            }
        }
        this.renderDialog();
        this.video.controls.captions.setLanguage(this.selectedLanguage, {
            track: false
        });

        if (previousSelection !== this.selectedLanguage) {
            this.logSelectionInStats();
        }
    }
}

CaptionsButtonControl.handle = 'captionsButton';
CaptionsButtonControl.type = 'control-bar-right';
CaptionsButtonControl.sortValue = 50;
CaptionsButtonControl.shouldMount = (video) => {
    return video.plugin.captions;
};
defineControl(CaptionsButtonControl);