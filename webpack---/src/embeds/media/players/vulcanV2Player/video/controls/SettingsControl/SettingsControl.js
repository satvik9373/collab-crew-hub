import {
    Wistia
} from 'wistia_namespace.js';
import {
    elemBind,
    formInputIsFocused
} from 'utilities/elem.js';
import {
    h,
    render
} from 'preact';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import SettingsButton from './SettingsButton.jsx';
import Control from '../../../shared/controls/Control.js';
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
import {
    RoundedSettingsButton
} from './RoundedSettingsButton.tsx';

defineTranslations('en-US', {
    SETTINGS_PLAYBACK_RATE_TITLE: 'Speed',
    SETTINGS_QUALITY_AUTO: 'Auto',
    SETTINGS_QUALITY_TITLE: 'Quality',
    SETTINGS_TITLE: 'Settings',
    SETTINGS_HIDE_MENU: 'Hide settings menu',
    SETTINGS_SHOW_MENU: 'Show settings menu',
});

const PLAYBACK_RATE_INCREMENT = 0.25;
const PLAYBACK_RATE_MAX = 2;
const PLAYBACK_RATE_MIN = 0.5;

class SettingsControl extends Control {
    constructor(video) {
        super(video);

        this.unbinds.push(
            video.on('playbackratechange', () => {
                if (this.menuElem) {
                    this.renderMenu();
                }
            }),
            video.on('qualitychange', () => {
                if (this.menuElem) {
                    this.renderMenu();
                }
            }),
            video.on('playerlanguagechange', () => {
                if (this.menuElem) {
                    this.renderMenu();
                }
            }),
            elemBind(document, 'keyup', this.onKeyUp),
        );

        video.hasData(() => {
            if (this._isQualityEnabled == null) {
                const qualityOpt = video._attrs.qualityControl;
                this._isQualityEnabled = qualityOpt === true || qualityOpt == null;
            }

            // see comment below setPlaybackRateEnabled for an explanation about the detect checks
            // present here.
            if (this._isPlaybackRateEnabled == null) {
                const playbackRateOpt = video._attrs.playbackRateControl;
                this._isPlaybackRateEnabled = playbackRateOpt === true || playbackRateOpt == null;
            }
        });
    }

    destroy() {
        destroyControl(this);
    }

    translate(key) {
        return getTranslation(this.props.playerLanguage.code, `SETTINGS_${key}`);
    }

    controlDialogOpened() {
        this.updateButtonLabel();
    }

    controlDialogClosed() {
        this.updateButtonLabel();
    }

    mountButton(buttonRoot) {
        this.buttonRoot = buttonRoot;
        this.renderButton();
    }

    mountDialog(dialogRoot) {
        this.dialogRoot = dialogRoot;
        return this.renderMenu();
    }

    onKeyUp = (event) => {
        const context = this.video.getInputContext();
        const suitableContexts = [
            'player-mouseover',
            'player-focus',
            'playbar-focus',
            'background-focus',
        ];
        const inSuitableInputContext = suitableContexts.indexOf(context) >= 0;

        if (formInputIsFocused() || !inSuitableInputContext || !this.getPlaybackRateEnabled()) {
            return;
        }

        if (event.key === '>') {
            const newPlaybackRate = Math.min(
                this.video.playbackRate() + PLAYBACK_RATE_INCREMENT,
                PLAYBACK_RATE_MAX,
            );
            this.video.playbackRate(newPlaybackRate);
        }

        if (event.key === '<') {
            const newPlaybackRate = Math.max(
                this.video.playbackRate() - PLAYBACK_RATE_INCREMENT,
                PLAYBACK_RATE_MIN,
            );
            this.video.playbackRate(newPlaybackRate);
        }
    };

    renderButton() {
            this.setButtonLabel(this.translate('TITLE'));

            this.updateButtonLabel();

            if (this.video.hasNewRoundedIcons()) {
                render( < RoundedSettingsButton onMouseEnter = {
                        this.onMouseEnterButton
                    }
                    />, this.buttonRoot);
                }
                else {
                    render( < SettingsButton onMouseEnter = {
                            this.onMouseEnterButton
                        }
                        />, this.buttonRoot);
                    }
                    this.reactMounts.button = [this.buttonRoot];
                }

                loadMenuCode = () => {
                    return Promise.all([
                        dynamicImport('assets/external/interFontFace.js'),
                        dynamicImport('assets/external/vulcanV2Player/video/controls/SettingsControl/dialog.js'),
                    ]).then(([, moduleControlDialog]) => {
                        if (!this.renderMenuImpl) {
                            const {
                                renderMenu,
                                onSelect
                            } = moduleControlDialog;
                            this.renderMenuImpl = renderMenu.bind(this);
                            this.onSelect = onSelect.bind(this);
                        }
                    });
                };

                renderMenu() {
                    if (!this.dialog.isOpen()) {
                        return;
                    }

                    const loadMenuCode = this.loadMenuCode().then(() => {
                        this.renderMenuImpl();
                    });

                    this.loading(
                        new Promise((resolve) => {
                            loadMenuCode.then(resolve);
                        }),
                    );

                    return loadMenuCode;
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

                onMouseEnterButton = () => {
                    this.loadMenuCode();
                };

                setQualityEnabled(isQualityEnabled) {
                    this._isQualityEnabled = isQualityEnabled;
                    return this.loadMenuCode().then(() => {
                        if (this.dialog.isOpen()) {
                            this.renderMenuImpl();
                        }
                    });
                }

                getPlaybackRateEnabled() {
                    return Boolean(this._isPlaybackRateEnabled);
                }

                setPlaybackRateEnabled(isPlaybackRateEnabled) {
                    this._isPlaybackRateEnabled = isPlaybackRateEnabled;

                    return this.loadMenuCode().then(() => {
                        if (this.dialog.isOpen()) {
                            this.renderMenuImpl();
                        }
                    });
                }
            }

            SettingsControl.shouldMount = (video) => {
                const {
                    _attrs
                } = video;
                const settingsOpt = _attrs.settingsControl;
                const qualityOpt = _attrs.qualityControl;
                const playbackRateOpt = _attrs.playbackRateControl;

                // short circuit the settings checks and disable for Live
                // until we refactor the quality control UI
                if (video.isLiveMedia()) {
                    return false;
                }

                return (
                    settingsOpt !== false &&
                    (qualityOpt === true ||
                        qualityOpt == null ||
                        playbackRateOpt === true ||
                        playbackRateOpt == null)
                );
            };

            SettingsControl.handle = 'settingsButton';
            SettingsControl.type = 'control-bar-right';
            SettingsControl.sortValue = 200;
            SettingsControl.isVideoChrome = true;
            defineControl(SettingsControl);

            Wistia.SettingsControl = SettingsControl;

            export default SettingsControl;