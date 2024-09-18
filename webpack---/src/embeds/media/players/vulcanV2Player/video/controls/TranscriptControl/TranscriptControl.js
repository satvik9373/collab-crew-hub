import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    elemAppend,
    elemFromObject,
    elemStyle,
    elemAnimate
} from 'utilities/elem.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    defineControl
} from 'embeds/shared/control_definitions.js';
import Control from '../../../shared/controls/Control.js';
import Transcript from './Transcript.jsx';
import {
    fetchCaptions,
    getPreferredCaptionsIndex
} from '../../../shared/captionsHelper.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';

class TranscriptControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;
        this.options = video.plugin.captions.options;

        this._isVisible = false;
        this._turnstileClosed = false;

        this.unbinds = [];
        this.unbinds.push(
            this.video.on('captionschange', (options) => {
                this.setSelectedLanguage(options);
            }),

            this.video.on('timechange', () => {
                if (this._isVisible) {
                    this.renderTranscript();
                }
            }),

            this.video.on('turnstileclose', () => {
                this._turnstileClosed = true;
                if (this._isVisible) {
                    this.renderTranscript();
                }
            }),

            this.video.on('extendedaudiodescriptionchange', () => {
                if (this._isVisible) {
                    this.rerenderTranscript();
                }
            }),
        );
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.fetchCaptions().then(() => {
            const style = {
                position: 'absolute',
            };

            const container = elemFromObject({
                style,
                class: 'w-css-reset'
            });
            elemAppend(rootElem, container);

            this.rootElem = container;
        });
    }

    open() {
        // hide the big play button if they enter transcripts from before play
        if (this.video.state() === 'beforeplay') {
            this.video.setControlEnabled('bigPlayButton', false);
        }

        // make sure we hide custom captions
        this.video.controls.captions.hideCustomCaptions();

        this._isVisible = true;

        this.renderTranscript();
        this.animateIn();
    }

    close = () => {
        this._isVisible = false;

        this.animateOut().then(() => {
            // bring custom captions back
            this.video.controls.captions.showCustomCaptions();

            render( < nothing / > , this.rootElem);
            this.reactMounts = [this.rootElem];
        });
    };

    onControlPropsUpdated(prevProps) {
        if (this._isVisible) {
            if (this.props.controlsAreVisible !== prevProps.controlsAreVisible) {
                this.fetchCaptions().then(() => {
                    this.renderTranscript();
                });
            }

            if (this.props.videoWidth !== prevProps.videoWidth) {
                this.fetchCaptions().then(() => {
                    this.renderTranscript();
                });
            }

            if (this.props.videoHeight !== prevProps.videoHeight) {
                this.fetchCaptions().then(() => {
                    this.renderTranscript();
                });
            }
        }
    }

    fetchCaptions() {
        return fetchCaptions(this.video, this.options).then((resp) => {
            this.captionsResp = resp;
            return resp;
        });
    }

    setSelectedLanguage(options) {
        this.selectedLanguage = options.language;

        // make sure we have a rootElem and we're open
        if (!this.rootElem || !this._isVisible) {
            return;
        }

        // if setting the language off we should close the transcript
        // else re-render with the new language
        if (options.language === '_off_') {
            this.close();
        } else {
            this.renderTranscript();
        }
    }

    seekTranscript = (time) => {
        this.video.time(time);
    };

    metricsVideoCount = (eventName) => {
        Wistia.Metrics.videoCount(this.video._impl, `player/${eventName}`);
    };

    onClickCloseTranscript = () => {
        this.close();
        this.video.controls.captionsButton.buttonElement.focus();
    };

    onSearchHitCounterChange = ({
        activeHitIndex,
        totalHits
    }) => {
        this.video.behaviors.ui.setAriaLiveText(`${activeHitIndex} of ${totalHits} results.`);
    };

    renderTranscript() {
        // safari keeps the captions coming back
        this.video.controls.captions.hideCustomCaptions();

        const preferredLanguageIndex = getPreferredCaptionsIndex(
            this.captionsResp,
            this.video.embedOptions().plugin ? .['captions-v1'],
        );
        let preferredLanguage;
        if (preferredLanguageIndex >= 0) {
            preferredLanguage = this.captionsResp.captions[preferredLanguageIndex].language;
        }

        return new Promise((resolve) => {
            dynamicImport('assets/external/interFontFace.js').then(() => {
                render( <
                    Transcript closeTranscript = {
                        this.onClickCloseTranscript
                    }
                    controlBarHeight = {
                        this.props.controlBarHeight
                    }
                    controlsAreVisible = {
                        this.props.controlsAreVisible
                    }
                    preferredLanguage = {
                        preferredLanguage
                    }
                    playerLanguage = {
                        this.video.playerLanguage()
                    }
                    scale = {
                        this.props.scale
                    }
                    seekTranscript = {
                        this.seekTranscript
                    }
                    selectedLanguage = {
                        this.selectedLanguage || this.captionsResp.preferred_languages[0]
                    }
                    srtCaptions = {
                        this.getSrtCaptions()
                    }
                    metricsVideoCount = {
                        this.metricsVideoCount
                    }
                    turnstileClosed = {
                        this._turnstileClosed
                    }
                    turnstileEmail = {
                        this.video.email()
                    }
                    turnstilePlugin = {
                        this.video.plugin['requireEmail-v1']
                    }
                    videoDuration = {
                        this.video.duration()
                    }
                    videoHeight = {
                        this.video.videoHeight()
                    }
                    videoTime = {
                        this.video.time()
                    }
                    videoWidth = {
                        this.video.videoWidth()
                    }
                    onSearchHitCounterChange = {
                        this.onSearchHitCounterChange
                    }
                    />,
                    this.rootElem,
                );
                this.reactMounts = [this.rootElem];
                resolve();
            });
        });
    }

    rerenderTranscript() {
        render( < nothing / > , this.rootElem);
        return this.renderTranscript();
    }

    getSrtCaptions() {
        if (!this.video.controls.extendedAudioDescriptionButton ? .isEnabled()) {
            if (!this.captionsWithoutExtendedAudioDescription) {
                this.captionsWithoutExtendedAudioDescription = {};
                this.captionsWithoutExtendedAudioDescription.captions = this.captionsResp.captions.map(
                    (entry) => {
                        const filteredLines = entry.hash.lines.filter((line) => {
                            return !line.extendedAudioDescription;
                        });
                        return {
                            ...entry,
                            hash: {
                                ...entry.hash,
                                lines: filteredLines,
                            },
                        };
                    },
                );
            }

            return this.captionsWithoutExtendedAudioDescription.captions;
        }

        return this.captionsResp.captions;
    }

    // animation helpers
    animateIn() {
        return new Promise((resolve) => {
            elemStyle(this.rootElem, {
                opacity: 0,
                height: '100%',
                width: '100%'
            });
            setTimeout(() => {
                elemAnimate(this.rootElem, {
                    opacity: 1
                }, {
                    time: 200,
                    callback: resolve
                });
            }, 0);
        });
    }

    animateOut() {
        return new Promise((resolve) => {
            elemStyle(this.rootElem, {
                opacity: 1
            });
            setTimeout(() => {
                elemAnimate(
                    this.rootElem, {
                        opacity: 0
                    }, {
                        time: 200,
                        callback: () => {
                            elemStyle(this.rootElem, {
                                height: 0,
                                width: 0
                            });
                            resolve();
                        },
                    },
                );
            }, 0);
        });
    }
}

TranscriptControl.handle = 'transcript';
TranscriptControl.type = 'above-control-bar';
TranscriptControl.sortValue = 600;
TranscriptControl.shouldMount = (video) => {
    const disabledViaEmbed =
        video.embedOptions().plugin &&
        video.embedOptions().plugin['captions-v1'] &&
        video.embedOptions().plugin['captions-v1'].transcript === false;
    if (disabledViaEmbed) {
        return false;
    }

    const enabledViaCaptionsOptions = video.plugin.captions && video.plugin.captions.options;
    return enabledViaCaptionsOptions && !disabledViaEmbed;
};

defineControl(TranscriptControl);

export default TranscriptControl;