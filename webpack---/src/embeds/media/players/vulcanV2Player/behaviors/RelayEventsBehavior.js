import {
    Wistia
} from 'wistia_namespace.js';
import {
    globalEventLoop
} from 'utilities/event_loop.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';
import {
    currentEventSource
} from '../../../../../utilities/elem.js';

class RelayEventsBehavior extends PlayerBehavior {
    init() {
        this.resetState();
        this.impl.whenVideoElementInDom().then(() => this.doInit());
    }

    doInit() {
        const impl = this.impl;
        const engine = impl.engine;

        this.unbinds.push(
            engine.bind('lookchange', this.onLookChange),
            engine.bind('pause', this.onPause),
            engine.bind('playing', this.onPlaying),
            engine.bind('ended', this.onEnded),
            engine.bind('volumechange', this.onVolumeChange),
            engine.bind('audiostreamchange', this.onAudioStreamChanged),
            engine.bind('ratechange', this.onRateChange),
            engine.bind('progress', this.onProgress),
            engine.bind('custom-waiting', this.onCustomWaiting),
            engine.bind('custom-done-waiting', this.onCustomDoneWaiting),
            engine.bind('error', this.onError),
            engine.bind('hlslevelswitched', this.onHlsLevelSwitched),
            engine.bind('fatalerrorrebuild', this.onHlsFatalErrorRebuild),
            engine.bind('seeking', this.onSeeking),
            engine.bind('timeupdate', this.onTimeUpdate),
            engine.bind('loadeddata', this.onLoadedData),
            engine.bind('loadedmetadata', this.onLoadedMetadata),
            engine.bind('canplay', this.onCanPlay),
            engine.bind('canplaythrough', this.onCanPlayThrough),
        );

        globalEventLoop.add(`${impl.uuid}.events`, impl._eventLoopDuration, () => {
            if (!impl.looksDown()) {
                this.fireStateChangedEventsIfChanged();
                this.fireTimeChangedEventsIfChanged();

                const quality = impl.getVideoQuality();
                if (quality !== this._lastQuality) {
                    impl.trigger('qualitychange', quality);
                    this._lastQuality = quality;
                }
            }
        });
    }

    destroy() {
        globalEventLoop.remove(`${this.impl.uuid}.events`);
        super.destroy();
    }

    resetState() {
        this._waiting = -1;
        this._lastTimePosition = -1;
        this._beforePlay = true;
        this._ended = false;
        this._isMuted = this.impl.isMuted();
        this._hasPlayed = false;
    }

    maybeFireStateAndTimeEvents = () => {
        this.fireStateChangedEventsIfChanged();
        this.fireTimeChangedEventsIfChanged();
    };

    onLookChange = (lookData) => {
        this.impl.trigger('lookchange', lookData);
    };

    onPause = () => {
        this.maybeFireStateAndTimeEvents();
    };

    onPlaying = () => {
        this._beforePlay = false;
        this._ended = false;
        this.maybeFireStateAndTimeEvents();
    };

    onEnded = () => {
        this.maybeFireStateAndTimeEvents();
    };

    onAudioStreamChanged = () => {
        this.impl.trigger('audiostreamchange');
    };

    onVolumeChange = () => {
        const isMuted = this.impl.isMuted();
        this.impl.trigger('volumechange', this.impl.volume(), isMuted);
        this.impl.embedElement.dispatchEvent(
            new CustomEvent('volume-change', {
                detail: {
                    volume: this.impl.volume(),
                    isMuted,
                },
            }),
        );

        if (isMuted !== this._isMuted) {
            this._isMuted = isMuted;
            this.impl.embedElement.dispatchEvent(new CustomEvent('mute-change', {
                detail: {
                    isMuted
                }
            }));
            this.impl.trigger('mutechange', isMuted);
        }
    };

    onRateChange = () => {
        this.impl.trigger('playbackratechange', this.impl.playbackRate());
        this.impl.embedElement.dispatchEvent(
            new CustomEvent('rate-change', {
                detail: {
                    playbackRate: this.impl.playbackRate(),
                },
            }),
        );
        globalEventLoop.interval(`${this.impl.uuid}.events`, this.impl._eventLoopDuration);
    };

    onProgress = (e) => {
        this.impl.trigger('progress', e);
    };

    onError = (e) => {
        this.impl.trigger('error', e);
    };

    onHlsLevelSwitched = (e) => {
        this.impl.trigger('hlslevelswitched', e);
    };

    // hls has encountered a fatal error and failed several times to recover.
    // attempt to rebuild the player with manual quality mp4 playback
    onHlsFatalErrorRebuild = (e) => {
        this.impl.fullRebuild({
            engine: 'engines/manual_quality_video.js'
        });
    };

    onSeeking = (e) => {
        this.impl.trigger('seeking', e);
        this.impl.embedElement.dispatchEvent(new CustomEvent('seeking'));
    };

    onTimeUpdate = (e) => {
        this.impl.embedElement.dispatchEvent(new CustomEvent('time-update'));
    };

    onLoadedData = (e) => {
        this.impl.embedElement.dispatchEvent(new CustomEvent('loaded-data'));
    };

    onLoadedMetadata = (e) => {
        this.impl.embedElement.dispatchEvent(new CustomEvent('loaded-metadata'));
    };

    onCanPlay = (e) => {
        this.impl.embedElement.dispatchEvent(new CustomEvent('can-play'));
    };

    onCanPlayThrough = (e) => {
        this.impl.embedElement.dispatchEvent(new CustomEvent('can-play-through'));
    };

    onCustomWaiting = (duration) => {
        this._waiting = duration;
        this.impl.trigger('waiting', duration);
    };

    onCustomDoneWaiting = (duration) => {
        this._waiting = -1;
        this.impl.trigger('done-waiting', duration);
    };

    fireStateChangedEventsIfChanged() {
        if (this._destroyed) {
            return;
        }
        const impl = this.impl;
        const state = impl.state();
        if (state !== this._lastState) {
            impl.trigger('statechange', state, this._lastState);

            if (state === 'playing') {
                this._hasPlayed = true;
                this._ended = false;
                impl.trigger('play', impl.lastPlayInfo());
                impl.embedElement.dispatchEvent(
                    new CustomEvent('play', {
                        detail: {
                            lastPlayInfo: impl.lastPlayInfo()
                        }
                    }),
                );
            }

            if (state === 'paused') {
                impl.trigger('pause', impl.lastPauseInfo());
                impl.embedElement.dispatchEvent(
                    new CustomEvent('pause', {
                        detail: {
                            lastPauseInfo: impl.lastPauseInfo()
                        }
                    }),
                );
            }

            // This is a hack for firefox, which apparently never leaves the
            // "playing" state for our test video. This artificial "ended" state
            // basically says "we're stuck in a playing state at the very end of
            // the video". For all intents and purposes, the video has ended.
            if (state === 'ended') {
                this._ended = true;
                impl.trigger('end');
                impl.embedElement.dispatchEvent(new Event('end'));
                impl.embedElement.dispatchEvent(new Event('ended'));
                this.triggerAfterendTimeout();
            }
            if (state !== 'ended' && this.mozillaAtEnd()) {
                // XXX: this hack seems out of place here; I wouldn't expect a
                // function that inspects state to also possibly modify state.
                impl.engine.pause();
                this._ended = true;
                impl.trigger('end');
                impl.embedElement.dispatchEvent(new Event('ended'));
                impl.embedElement.dispatchEvent(new Event('end'));
                this.triggerAfterendTimeout();
            }

            this._lastState = state;
        }
    }

    fireTimeChangedEventsIfChanged = () => {
        if (this._destroyed) {
            return;
        }

        const impl = this.impl;
        let skipSeek = false;

        const currentTime = Date.now();
        const timePosition = impl.time();

        const timeChanged = timePosition !== this._lastTimePosition;
        const timePositionChange = timePosition - this._lastTimePosition;
        const timePositionFloored = Math.floor(timePosition);
        const lastTimePositionFloored = Math.floor(this._lastTimePosition);

        const clockTimeChanged = (currentTime - this._lastClockTime) / 1000;
        const playbackRate = impl.playbackRate();

        // Some media sources (see: HLS) don't actually start the stream at 0. To
        // avoid triggering a timechange before the video has even been played,
        // we check against this heuristic.
        const withinInitialBufferHole = impl.state() === 'beforeplay' && timePosition < 0.3;

        const flooredTimeDifferenceGreaterThanOne =
            Math.abs(Math.floor(timePosition) - Math.floor(this._lastTimePosition)) > 1;

        if (timeChanged && timePosition >= 0 && !withinInitialBufferHole) {
            this._ended = false;
            impl.trigger('timechange', timePosition);
            impl.embedElement.dispatchEvent(new CustomEvent('timechange', {
                detail: {
                    timePosition
                }
            }));

            if (timePositionFloored !== lastTimePositionFloored) {
                // 1. determine if the time changed in the media is roughly the same as the amount of time changed
                // since we last ran this function. If they're roughly the same, it can't have been a proper seek.
                // 2. determine if the difference between the last media time and the current media time is greater than one
                //
                // It follows that if we've been moving the time of the media at the same rate as the clock, but have a
                // gap of more than one uncounted second -- we've missed at least one, maybe more. We should fire the
                // second change event for all seconds missed
                if (
                    Math.abs(timePositionChange / playbackRate - clockTimeChanged) < 0.05 &&
                    flooredTimeDifferenceGreaterThanOne
                ) {
                    skipSeek = true;
                    for (let i = lastTimePositionFloored + 1; i < timePositionFloored; i++) {
                        impl.trigger('secondchange', i);
                        impl.embedElement.dispatchEvent(
                            new CustomEvent('second-change', {
                                detail: {
                                    second: i,
                                },
                            }),
                        );
                    }
                }

                impl.trigger('secondchange', timePositionFloored);
                impl.embedElement.dispatchEvent(
                    new CustomEvent('second-change', {
                        detail: {
                            second: timePositionFloored,
                        },
                    }),
                );
            }

            if (!this._beforePlay &&
                !this._ended &&
                !skipSeek &&
                flooredTimeDifferenceGreaterThanOne &&
                Math.abs(timePosition - this._lastTimePosition) > impl._attrs.seekThreshold
            ) {
                // the 4th param with the source property was added for the Live team, which wanted to know this info not just for
                // play/pause - but also for seeks
                impl.trigger('seek', timePosition, this._lastTimePosition, {
                    source: currentEventSource(),
                });
            }
            this._lastTimePosition = timePosition;
        }

        this._lastClockTime = currentTime;
        return Promise.resolve();
    };

    mozillaAtEnd() {
        return (!this._ended &&
            Wistia.detect.browser.mozilla &&
            Wistia.detect.browser.version < 45 &&
            !Wistia.detect.edge &&
            Wistia.detect.windows &&
            this._waiting >= 0.6 &&
            Math.abs(this.impl.time() - this.impl.duration()) < 2.0
        );
    }

    // we wait a tick before triggering `afterend` after the `end` event
    // so that events working off `end` have a chance to run before
    // `afterend` events take place.
    // E.g. CTA/Turnstile overlays at the end of videos in a playlist
    triggerAfterendTimeout() {
        setTimeout(() => {
            this.impl.trigger('afterend');
        }, 0);
    }
}

RelayEventsBehavior.handle = 'relayEvents';

export default RelayEventsBehavior;