import {
    controlMultiplierBasedOnVideo
} from 'utilities/fit-control.js';
import {
    cdnFastWistiaNetHost
} from 'utilities/hosts.js';
import {
    proto
} from 'utilities/url.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    h,
    render
} from 'preact';
import {
    addInlineCss,
    elemBind,
    elemRemove
} from 'utilities/elem.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    defineControl
} from 'embeds/shared/control_definitions.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    fetchCaptions,
    getCaptionsForLanguage,
    shouldShowNativeCaptions,
} from '../../../shared/captionsHelper.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import Captions from './Captions.jsx';
import Control from '../../../shared/controls/Control.js';

const detect = cachedDetect();

const OFF = '_off_';

class CaptionsControl extends Control {
    constructor(video) {
        super(video);
        dynamicImport('assets/external/interFontFace.js');
        this.options = video.plugin.captions.options;
        this._wistiaCaptionsId = seqId('wistia_', '_captions');
        this._userScale = this.options.subtitlesScale || 1;
        this.unbinds = [
            video.on('timechange', this.setActiveLineForTime),
            video.on('extendedaudiodescriptionplay', () => {
                this.setActiveLineForTime(this.video.time());
            }),
            video.on('extendedaudiodescriptionstop', () => {
                this.setActiveLineForTime(this.video.time());
            }),
            video.on('enterfullscreen', () => {
                this.hideOrShowNativeCaptions();
            }),
            video.on('cancelfullscreen', () => {
                this.hideOrShowNativeCaptions();
            }),
            video.on('beforereplace', () => {
                this.removeTextTracks();
            }),
            video.on('extendedaudiodescriptionchange', () => {
                this.resetTextTracks();
                this.video._impl.engine.loadSource ? .();
                this.setActiveLineForTime(this.video.time());
                this.renderCaptions();
            }),
        ];
    }

    destroy() {
        elemRemove(this.clippedCueStyle);
        this.clippedCueStyle = null;
        this.removeTextTracks();

        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.fetchCaptions().then(() => {
            if (this._destroyed) {
                return;
            }
            this.setupTextTracks();
            this.setActiveLineForTime(this.video.time());
            this.renderCaptions();
        });
    }

    getSelectedCaptions() {
        return this.captions;
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

    resetTextTracks() {
        this.removeTextTracks();
        this._setupTextTracksPromise = null;
        this.setupTextTracks();
    }

    setupTextTracks() {
        if (this._setupTextTracksPromise) {
            return this._setupTextTracksPromise;
        }

        if (detect.edge && !this.video._inNativeMode()) {
            // Some versions/hardware/drivers on OSX with Safari have issues with the
            // presence of <track> elements--the video will throw a MEDIA_DECODE_ERR
            // if they're there for unknown reasons. It's a bummer to disable this
            // because it hurts accessibility, but the video sure as heck isn't going
            // to be accessible if it can't play back, and they'll still hopefully be
            // able to view captions via our custom implementation--though we may
            // need to add extra markup to make that visible to screen readers.
            //
            // For Edge, Microsoft is not supporting the ability to target the
            // ::cue pseudo-element we use to hide tracks.
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12079271/
            // se we're not going to add the tracks at all
            return (this._setupTextTracksPromise = new Promise(() => {}));
        }

        const video = this.video;

        return (this._setupTextTracksPromise = new Promise((resolve) => {
            this.fetchCaptions();

            const doSetup = () => {
                this.fetchCaptions().then((resp) => {
                    // So that this method is idempotent; note that it calls
                    // video.whenVideoElementInDom() internally, so this must be called _before_
                    // the below code. Otherwise, it runs _after_ it and destroys the text
                    // tracks that we make there.
                    this.removeTextTracks();

                    video.whenVideoElementInDom().then((elem) => {
                        if (this._destroyed) {
                            return;
                        }

                        if (video.engine) {
                            const captions = resp.captions
                                .map((entry) => {
                                    entry._wistiaCaptionsId = this._wistiaCaptionsId;
                                    let captionsSrc = `${proto()}//${cdnFastWistiaNetHost()}/embed/captions/${video.hashedId()}.vtt?language=${
                    entry.language
                  }`;

                                    // NOTE: This was removed because iOS doesn't know handle overlapping captions well,
                                    // and it turns out that's pretty common with extended audio descriptions. If we figure
                                    // out a way to avoid overlaps in the future, we can re-enable this.
                                    //
                                    // if (video.controls.extendedAudioDescriptionButton?.isEnabled()) {
                                    //   captionsSrc += '&include_extended_audio_description=true';
                                    // }

                                    entry.src = captionsSrc;

                                    return entry;
                                })
                                .filter((entry) => entry.language !== '_preview_');
                            video.engine.addTextTracks(captions);
                        }

                        this.hideOrShowNativeCaptions();

                        this.unbinds.push(
                            elemBind(elem.textTracks, 'change', () => {
                                if (shouldShowNativeCaptions(video)) {
                                    if (video.controls.captionsButton) {
                                        video.controls.captionsButton.matchMenuToSelectedTextTrack();
                                    }
                                }
                            }),
                        );

                        resolve();
                    });
                });
            };

            if (video.state() === 'beforeplay' && (detect.safari || detect.ios.version)) {
                // When we're delivering native HLS and adding captions, sometimes
                // Safari videos fail to play if we add text tracks before play. To
                // deal with that, let's just wait until play in those situations.
                video.bind('play', () => {
                    doSetup();
                    return video.unbind;
                });
            } else {
                doSetup();
            }
        }));
    }

    // This method removes the text tracks that it, itself, has added. It's
    // important that it targets only the ones it has added because, in a
    // playlist setting, it is possible for two impls to target the same
    // <video> element, and while it's transitioning, tracks for both impls
    // would be present. When the old impl is destroyed, then, it'll remove the
    // text tracks that it is responsible for, and all will be right with the
    // world.
    removeTextTracks() {
        if (this.video.engine) {
            this.video.engine.removeTextTracks(this._wistiaCaptionsId);
        }
    }

    renderCaptions() {
        if (this.video._inNativeMode()) {
            return;
        }

        if (this.activeLine && !this._captionsHidden) {
            render( <
                Captions { ...this.props
                } { ...this.activeLine
                }
                scale = {
                    this.scale()
                }
                isInFullscreen = {
                    this.video.inFullscreen()
                }
                isPlaybarEnabled = {
                    this.video.isControlEnabled('playbar')
                }
                isTranscriptEnabled = {
                    this.isTranscriptEnabled()
                }
                />,
                this.rootElem,
            );
        } else {
            render( < nothing / > , this.rootElem);
        }
        this.reactMounts.captions = [this.rootElem];
    }

    isTranscriptEnabled() {
        if (this.options.transcript === false) {
            return false;
        }

        return true;
    }

    onControlPropsUpdated(prevProps) {
        if (
            prevProps.videoWidth !== this.props.videoWidth ||
            prevProps.controlsAreVisible !== this.props.controlsAreVisible ||
            prevProps.controlBarHeight !== this.props.controlBarHeight ||
            prevProps.captionsBackgroundColor !== this.props.captionsBackgroundColor ||
            prevProps.captionsTextSize !== this.props.captionsTextSize ||
            prevProps.captionsFontFamily !== this.props.captionsFontFamily ||
            prevProps.captionsBorderRadius !== this.props.captionsBorderRadius
        ) {
            this.renderCaptions();
        }
    }

    setActiveLine(text, rtl = false) {
        this.activeLine = {
            text,
            rtl,
        };
    }

    setNoActiveLine() {
        this.activeLine = null;
    }

    setActiveLineForTime = (t) => {
        if (this.captions && this.captions.language !== OFF) {
            const lines = this.captions.hash.lines;

            const matchingLines = lines.filter((line) => {
                return line.start <= t && t < line.end;
            });

            let preferredLine = matchingLines[0];

            if (
                this.video.controls.extendedAudioDescriptionButton ? .isEnabled() &&
                this.video.controls.extendedAudioDescriptionButton ? .isAudioPlaying()
            ) {
                const eadLine = matchingLines.find((line) => {
                    return line.extendedAudioDescription;
                });
                if (eadLine) {
                    preferredLine = eadLine;
                }
            } else {
                const nonEadLine = matchingLines.find((line) => {
                    return !line.extendedAudioDescription;
                });
                preferredLine = nonEadLine;
            }

            if (preferredLine) {
                this.setActiveLine(preferredLine.text, this.captions.right_to_left);
                this.renderCaptions();
                return;
            }
        }
        this.setNoActiveLine();
        this.renderCaptions();
    };

    setLanguage(lang, options = {}) {
        // make sure we have a captions resp on hand before trying to pass captions
        this.fetchCaptions().then(() => {
            const captions = getCaptionsForLanguage(lang, this.captionsResp.captions);
            this.captions = captions;
            this.setActiveLineForTime(this.video.time());
            this.renderCaptions();

            // We allow not setting the track to prevent an infinite loop when this is
            // triggered from a texttrack "change" event.
            if (options.track !== false) {
                this.showCorrespondingTrack(captions);
            }

            this.video.trigger('captionslanguagechange', lang);
        });
    }

    turnOff() {
        this.setLanguage(OFF);
    }

    // passing null arg disables all tracks
    showCorrespondingTrack(captions) {
        if (detect.edge && !this.video._inNativeMode()) {
            return;
        }

        this.setupTextTracks().then(() => {
            const video = this.video;
            const elem = video.getMediaElement();
            for (let i = 0; i < elem.textTracks.length; i++) {
                const track = elem.textTracks[i];
                if (track.kind === 'captions') {
                    if (captions && track.language === captions.language) {
                        track.mode = 'showing';
                    } else {
                        track.mode = 'disabled';
                    }
                }
            }
        });
    }

    hideOrShowNativeCaptions() {
        if (shouldShowNativeCaptions(this.video)) {
            // We use the native iOS player in fullscreen, so this is the only way
            // to show captions in that mode. They also don't look bad inline, and
            // switching between native and non-native is janky there. So let's
            // just use the native display in iOS.
            this.allowShowingNativeCaptions();
        } else {
            this.disallowShowingNativeCaptions();
        }
    }

    allowShowingNativeCaptions() {
        if (this.clippedCueStyle) {
            elemRemove(this.clippedCueStyle);
            this.clippedCueStyle = null;
        }

        this.hideCustomCaptions();
    }

    disallowShowingNativeCaptions() {
        if (this.clippedCueStyle) {
            return this.clippedCueStyle;
        }
        const domTarget =
            this.embedElement.tagName === 'WISTIA-PLAYER' ? this.embedElement.shadowRoot : document.head;
        this.clippedCueStyle = addInlineCss(
            domTarget,
            `
      #${this.video.chrome.id} ::cue {
        visibility: hidden;
      }
      #${this.video.chrome.id} ::-webkit-media-text-track-container {
        visibility: hidden;
      }
      #${this.video.chrome.id} ::-webkit-media-text-track-background {
        visibility: hidden;
      }
      #${this.video.chrome.id} ::-webkit-media-text-track-display {
        visibility: hidden;
      }
    `,
        );
        this.showCustomCaptions();
    }

    hideCustomCaptions() {
        this._captionsHidden = true;
        this.renderCaptions();
    }

    showCustomCaptions() {
        this._captionsHidden = false;
        this.renderCaptions();
    }

    setUserScale(s) {
        this._userScale = s;
        this.renderCaptions();
    }

    getUserScale() {
        return this._userScale;
    }

    scale() {
        return (
            this._userScale *
            Math.min(2, Math.max(0.6, controlMultiplierBasedOnVideo(this.video, [640, 850])))
        );
    }
}

CaptionsControl.handle = 'captions';
CaptionsControl.type = 'above-control-bar';
CaptionsControl.shouldMount = (video) => {
    return video.plugin.captions;
};

defineControl(CaptionsControl);