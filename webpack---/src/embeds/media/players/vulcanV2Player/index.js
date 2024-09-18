import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    shorterThanResumableThreshold,
    withinResumableTime,
} from 'utilities/resumableVideoData.js';
import {
    onDocReady
} from 'utilities/docReady.js';
import {
    LiveMediaTracker
} from 'analytics';
import * as Judy from 'utilities/judy.js';
import {
    Color
} from 'utilities/color.js';
import {
    currentEventSource,
    inUserEventContext
} from 'utilities/elem.js';
import {
    merge,
    equalsDeep,
    clone
} from 'utilities/obj.js';
import {
    clearTimeouts,
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    defineControl
} from '../../../shared/control_definitions.js';
import './video/controls/AudioDescriptionControl/AudioDescriptionControl.js';
import './video/controls/CaptionsV3ButtonControl/CaptionsV3ButtonControl.js';
import './video/controls/BackgroundFocusControl.js';
import './video/controls/BigPlayButtonControl.js';
import './video/controls/ClickForSoundControl/ClickForSoundControl.js';
import './shared/controls/ContextMenuControl/ContextMenuControl.js';
import './video/controls/EllipsisButtonControl.js';
import './video/controls/FocusOutlineControl.js';
import './video/controls/FullscreenButtonControl/FullscreenButtonControl.js';
import './shared/controls/LoadingHourglassControl/LoadingHourglassControl.js';
import './video/controls/PlaybarControl.js';
import './video/controls/PlayPauseNotifierControl.js';
import './video/controls/PlaybarlessProgressIndicatorControl.js';
import './video/controls/SettingsControl/SettingsControl.js';
import './shared/controls/SmallPlayButtonControl.js';
import './video/controls/StatusBarControl/StatusBarControl.js';
import './video/controls/ThumbnailControl/ThumbnailControl.js';
import './video/controls/VolumeButtonControl.js';
import './video/controls/LiveStreamStatusControl/LiveStreamStatusControl.js';
import BandwidthTestBehavior from './behaviors/BandwidthTestBehavior.js';
import EmbedBehavior from './behaviors/EmbedBehavior.js';
import FullscreenBehavior from './behaviors/FullscreenBehavior.js';
import MetricsBehavior from './behaviors/MetricsBehavior.js';
import PlaybackErrorHandlingBehavior from './behaviors/PlaybackErrorHandlingBehavior.js';
import {
    ProblemMonitoringBehavior
} from './behaviors/ProblemMonitoringBehavior.js';
import RelayEventsBehavior from './behaviors/RelayEventsBehavior.js';
import ResumableBehavior from './behaviors/ResumableBehavior.js';
import UIBehavior from './behaviors/UIBehavior.js';
import {
    PlaySuspendedOffScreenBehavior
} from './behaviors/PlaySuspendedOffScreenBehavior.js';
import {
    getDurationAfterCuts
} from './engines/simple_video/cutsCalc.js';
import {
    allHlsAudioAssets,
    audioTracksForVideo
} from './engines/hls_video/hls_assets.js';
import {
    PLAYER_VERSION
} from '../../../../utilities/player-version.js';
import {
    TAGGED_VERSION
} from '../../../../utilities/hosts.js';

const detect = cachedDetect();

if (!Wistia.VulcanV2Player) {
    const Video = Wistia.Video;
    class VulcanV2Player extends Video {
        constructor(publicApi) {
            super(publicApi);
            this.playerType = 'vulcan-v2';
            this._enabledControls = {};
            this._visibilityRequests = {};
            this._inputContextsToEnter = [];
            this._playerContext = [];
            this._overlays = {};
            this._initialized = this.setupBehaviors();
            this._isKeyboardFocused = undefined;
            this._overlayCodePromise = null;

            // setup tracking initialization
            this.setupTracking();

            if (publicApi._playlist && publicApi._playlist.length > 1) {
                this.loadLastFrameCanvasControl();
            }

            this.on('playlistchange', (playlist) => {
                if (playlist.length > 1) {
                    this.loadLastFrameCanvasControl();
                }
            });

            const unbindBeforeReplace = this.on('beforereplace', () => {
                unbindBeforeReplace();

                // This might not finish loading in time for this replaceWith, but at
                // least it'll be there for the next one.
                this.loadLastFrameCanvasControl();
            });

            onDocReady(() => {
                dynamicImport('assets/external/playPauseLoadingControl.js').then((moduleClass) => {
                    defineControl(moduleClass.PlayPauseLoadingCircleControl);
                });

                if (detect.touchScreen && !this.publicApi.isLiveMedia()) {
                    dynamicImport('assets/external/skipControls.js').then((moduleClass) => {
                        defineControl(moduleClass.SkipAheadControl);
                        defineControl(moduleClass.SkipBackControl);
                    });
                }
            });

            if (this._opts.techInfo) {
                dynamicImport(
                    'assets/external/vulcanV2Player/video/controls/TechInfoControl/TechInfoControl.js',
                ).then((moduleClass) => {
                    defineControl(moduleClass.TechInfoControl);
                });
            }

            if (this._opts.spherical) {
                dynamicImport(
                    'assets/external/vulcanV2Player/video/controls/SphericalControl/SphericalControl.js',
                ).then((moduleClass) => {
                    defineControl(moduleClass.SphericalControl);
                });
            }

            if (this.publicApi.isLiveMedia()) {
                dynamicImport('assets/external/captions-v3.js').then((moduleClass) => {
                    defineControl(moduleClass.CaptionsV3Control);
                });
            }
        }

        loadLastFrameCanvasControl() {
            this.ready(() => {
                dynamicImport(
                    'assets/external/vulcanV2Player/video/controls/LastFrameCanvasControl.js',
                ).then((moduleClass) => {
                    defineControl(moduleClass.LastFrameCanvasControl);
                });
            });
        }

        setupBehaviors() {
            return new Promise((resolve) => {
                this.addBehaviors([
                    BandwidthTestBehavior,
                    EmbedBehavior,
                    FullscreenBehavior,
                    MetricsBehavior,
                    PlaySuspendedOffScreenBehavior,
                    PlaybackErrorHandlingBehavior,
                    ProblemMonitoringBehavior,
                    RelayEventsBehavior,
                ]);

                if (!this.publicApi.isLiveMedia()) {
                    this.addBehavior(ResumableBehavior);
                }

                if (this._mediaData.type === 'Audio') {
                    Promise.all([
                        dynamicImport('assets/external/vulcanV2Player/audio/AudioUIBehavior.js'),
                        dynamicImport('assets/external/interFontFace.js'),
                    ]).then(([moduleClass]) => {
                        this.addBehavior(moduleClass.AudioUIBehavior);
                        resolve();
                    });
                } else {
                    this.addBehavior(UIBehavior);
                    resolve();
                }
            });
        }

        removeBehaviors() {
            for (let handle in this.behaviors) {
                if (Object.hasOwn(this.behaviors, handle)) {
                    this.removeBehavior(handle);
                }
            }
        }

        setupTracking() {
            // have a Live media use its own tracker, since we don't have
            // things like duration available to us
            if (this.publicApi.isLiveMedia()) {
                this._tracker = new LiveMediaTracker(this.publicApi);
                this._tracker.monitor();
            } else {
                this._tracker = new Wistia.VideoTracker2(this.publicApi);
                this._tracker.visitorKey();
                this._tracker.monitor();
            }
        }

        elem() {
            if (this.engine) {
                return this.engine.getMediaElement();
            }
            // Return a dummy in case monitor() runs before we have a video
            // element. If this doesn't return something, it'll think the embed is
            // dead and try to remove it!
            if (!this._dummyVideo) {
                this._dummyVideo = document.createElement('video');
            }
            return this._dummyVideo;
        }

        embed(oldImpl) {
            return this._initialized.then(() => {
                if (oldImpl instanceof VulcanV2Player) {
                    // Note that we could technically accept anything that uses engines and
                    // does not mess with the underlying <video> element. We added this
                    // requirement because the old SphericalVideo plugin monkey patches
                    // stuff and changes styles on the <video> tag. We don't want to think
                    // about that at all in vulcan-v2, so let's just build a new engine
                    // from scratch and give up the "autoplay in playlist" functionality
                    // when switching between spherical and vulcan-v2.
                    return this.behaviors.embed.embed(oldImpl);
                }
                return this.behaviors.embed.embed();
            });
        }

        eventKey() {
            return this._tracker.eventKey();
        }

        renderUI() {
            if (!this.ui) {
                this.ui = this.behaviors.ui;
            }

            const canRender = this.ui.lastRenderPromise || Promise.resolve();
            return canRender.then(() => this.ui.render());
        }

        rebuild() {
            return this.behaviors.embed.rebuild(this);
        }

        onDimensionChangeSafe() {
            if (!this.grid) {
                return;
            }
            try {
                this.onWidthChange(this.videoWidth());
                this.onHeightChange(this.videoHeight());
            } catch (e) {
                this.error(e);
            }
        }

        transferStateFrom(impl) {
            if (this.behaviors.fullscreen) {
                this.behaviors.fullscreen.transferStateFrom(impl);
            }

            this.isKeyboardFocused(impl.isKeyboardFocused());
            if (this.publicApi._opts.skipFocus !== true) {
                this.focus();
            }
        }

        bestEngine() {
            return Judy.bestUsableEngine(this.publicApi.judyCtx(), this._mediaData, this._opts);
        }

        initEngineAfterEmbedded() {
            this.embedded(() => this.behaviors.embed.initializeEngine());
        }

        setupBindings() {
            this.setupVideoBindings();
        }

        setupVideoBindings() {
            this.publicApi.bind('click', () => {
                this.initEngineAfterEmbedded();
            });

            this.publicApi.bind('mouseenter', () => {
                this.initEngineAfterEmbedded();
            });

            this.publicApi.bind('focusin', () => {
                this.initEngineAfterEmbedded();
            });

            // Reposition controls when the video is resized
            this.bind('widthchange', (w) => {
                this.onWidthChange(w);
            });
            this.bind('heightchange', (h) => {
                this.onHeightChange(h);
            });
        }

        addBehavior(BehaviorClass, callInit = true) {
            if (this.behaviors == null) {
                this.behaviors = {};
            }

            const handle = BehaviorClass.handle;
            if (!handle) {
                this.error('No handle defined for', BehaviorClass);
                return;
            }

            if (this.behaviors[handle]) {
                this.behaviors[handle].destroy();
                this.behaviors[handle] = null;
            }

            try {
                const behavior = (this.behaviors[handle] = new BehaviorClass(this));

                if (callInit) {
                    behavior.init();
                }

                return behavior;
            } catch (e) {
                setTimeout(() => {
                    throw e;
                }, 0);
                delete this.behaviors[handle];
            }
        }

        // init() is called after all these behaviors run. This is desirable if
        // some behaviors use methods from others; we want to make sure all the
        // methods are defined before init() runs.
        addBehaviors(behaviorClasses) {
            const behaviors = behaviorClasses.map((k) => this.addBehavior(k, false));
            behaviors.forEach((b) => {
                try {
                    b.init();
                } catch (e) {
                    this.error('error in init for', b.constructor.handle, 'behavior');
                    setTimeout(() => {
                        throw e;
                    }, 0);
                }
            });
            return behaviors;
        }

        removeBehavior(handle) {
            if (this.behaviors[handle]) {
                this.behaviors[handle].destroy();
                delete this.behaviors[handle];
            }
        }

        isMediaDataUsingEmbedSsl() {
            for (let i = 0; i < this._mediaData.assets.length; i++) {
                const a = this._mediaData.assets[i];
                if (a.url && /embed-ssl\.wistia\.com/.test(a.url)) {
                    return true;
                }
            }
            return false;
        }

        onWidthChange(w) {
            if (this.engine) {
                this.engine.onWidthChange(w);
            }
        }

        onHeightChange(h) {
            if (this.engine) {
                this.engine.onHeightChange(h);
            }
        }

        controlScaling(s) {
            if (s != null) {
                const prevControlScaling = this._controlScaling;
                this._controlScaling = s;
                if (prevControlScaling !== s) {
                    this.trigger('controlscalingchange', s, prevControlScaling);
                }
            } else {
                return this._controlScaling || 'auto';
            }
        }

        audioDescriptionControlEnabled(enabled) {
            this.setControlEnabled('audioDescriptionButton', enabled);
        }

        bigPlayButtonEnabled(enabled) {
            super.bigPlayButtonEnabled(enabled);
            this.setControlEnabled('bigPlayButton', enabled);
        }

        bigPlayButtonTimeEnabled(enabled) {
            if (this.isControlEnabled('bigPlayButton')) {
                this.ui.controls.bigPlayButton.setTimeEnabled(enabled);
            }
        }

        playPauseControlEnabled(enabled) {
            super.playPauseControlEnabled(enabled);
            this.setControlEnabled('smallPlayButton', enabled);
        }

        playbarControlEnabled(enabled) {
            super.playbarControlEnabled(enabled);
            this.setControlEnabled('playbar', enabled);
        }

        settingsControlEnabled(enabled) {
            super.settingsControlEnabled(enabled);
            this.setControlEnabled('settingsButton', enabled);
        }

        playbackRateControlEnabled(enabled) {
            if (this.isControlEnabled('settingsButton')) {
                this.ui.controls.settingsButton.setPlaybackRateEnabled(enabled);
            }
        }

        playPauseNotifierEnabled(enabled) {
            super.playPauseNotifierEnabled(enabled);
            this.setControlEnabled('playPauseNotifier', enabled);
        }

        qualityControlEnabled(enabled) {
            if (this.isControlEnabled('settingsButton')) {
                this.ui.controls.settingsButton.setQualityEnabled(enabled);
            }
        }

        volumeControlEnabled(enabled) {
            super.volumeControlEnabled(enabled);
            this.setControlEnabled('volumeButton', enabled);
        }

        fullscreenControlEnabled(enabled) {
            super.fullscreenControlEnabled(enabled);
            this.setControlEnabled('fullscreenControl', enabled);
        }

        hideControls() {
            return this.ui.releaseControls('showControls');
        }

        showControls() {
            return this.requestControls('showControls', 4000);
        }

        requestChromeless(requester, timeout) {
            return this.requestControls(requester, timeout, false);
        }

        releaseChromeless(requester) {
            return this.releaseControls(requester);
        }

        requestControls(requester, timeout, value = true) {
            this._visibilityRequests[requester] = value;
            if (timeout != null) {
                doTimeout(
                    `${this.uuid}.${requester}.release_controls`,
                    () => {
                        this.releaseControls(requester);
                    },
                    timeout,
                );
            }
            return this.ui.maybeToggleControls();
        }

        releaseControls(requester) {
            this._visibilityRequests[requester] = null;
            return this.ui.maybeToggleControls();
        }

        fit() {
            super.fit();
            this.embedded(() => {
                // TODO: Does the UI need to do anything here? The video?
            });
        }

        getBuffered() {
            if (!this.engine) {
                return [];
            }
            const activeBufferRange = this.engine.activeBufferRange();
            if (activeBufferRange) {
                const [start, end] = this.engine.activeBufferRange();
                return [{
                    start,
                    end
                }];
            }
            return [];
        }

        rangeBuffered() {
            this.engine.activeBufferRange();
        }

        timeBuffered() {
            const range = this.rangeBuffered();
            if (range) {
                return range[1] - range[0];
            }
            return 0;
        }

        // Returns how much of the video has been buffered, in seconds.
        totalBuffered() {
            // Note that @videoElem may not have been initialized yet, in scenarios
            // where the video is being replaced (e.g. embed links).
            if (this.engine) {
                return this.engine.totalBuffered();
            }
            return 0;
        }

        // Returns how much of the video has been played, in seconds.
        totalPlayed() {
            // Note that @videoElem may not have been initialized yet, in scenarios
            // where the video is being replaced (e.g. embed links).
            if (this.engine) {
                return this.engine.totalPlayed();
            }
            return 0;
        }

        sequentialBufferedRange() {
            if (this.engine) {
                return this.engine.sequentialBufferedRange();
            }
            return [0, 0];
        }

        requestFullscreen() {
            return this.behaviors.fullscreen.requestFullscreen();
        }

        cancelFullscreen() {
            return this.behaviors.fullscreen.cancelFullscreen();
        }

        inFullscreen() {
            return this.behaviors.fullscreen ? .inFullscreen();
        }

        stopStreaming() {
            this.info('stopStreaming');
            if (this.engine) {
                this.engine.stopStreaming();
            }
        }

        cleanup() {
            this.info('cleanup');
            this.removeBehaviors();
        }

        getVideoQuality() {
            if (this.engine) {
                return this.engine.getCurrentQuality();
            }
            return 'auto';
        }

        setVideoQuality(quality = 'auto') {
            return new Promise((resolve) => {
                this.info('videoQuality', quality);
                this.initEngineAfterEmbedded();
                this.ready(() => {
                    resolve(this.engine.changeQuality(quality, this.state() === 'playing'));
                });
            });
        }

        changeAudioTrack(audioTrackId) {
            if (audioTrackId != null) {
                this.initEngineAfterEmbedded();
                this.info('changeAudioTrack', audioTrackId);

                this.commandQueueOpen.synchronize((done) => {
                    this.ready(() => {
                        this.engine.changeAudioTrack(audioTrackId).then(done);
                    });
                });
            }
        }

        getAudioTracks() {
            const bestEngine = this.bestEngine();

            // if we have an engine, use the engine's mechanism for getting audio tracks.
            // If we don't, create the array of audio tracks that looks like the array of audio
            // audio tracks that will be used when video is loaded
            if (this.engine) {
                return this.engine.getAudioTracks();
            }
            if (bestEngine === 'engines/hls_video.js' || bestEngine === 'engines/native_hls_video.js') {
                return audioTracksForVideo(allHlsAudioAssets(this._mediaData.assets));
            }
            return [];
        }

        getCurrentAudioTrack() {
            return this.engine ? this.engine.getCurrentAudioTrack() : 0;
        }

        selectedQuality() {
            if (this.engine) {
                return this.engine.selectedQuality();
            }
            return 'auto';
        }

        selectableQualities() {
            if (this.engine) {
                return this.engine.selectableQualities();
            }
            return ['auto'];
        }

        stillUrl(options) {
            options = merge({
                playButton: false
            }, options);
            return super.stillUrl(options);
        }

        play() {
            if (!this.suppressPlay()) {
                // this is used for metrics
                this.trigger('playcalled');
            }
            this.initEngineAfterEmbedded();

            const clickedBeforeReady = inUserEventContext() && !this.ready();

            this.info('play');

            const rejectPlay = () => {
                this._isPlayPending = false;
                this._lastPlayType = undefined;
                this._lastPlayRejectedAt = Date.now();
                this.trigger('playrejected', this.lastPlayInfo());
            };

            // live medias that have not started yet, should not attempt to
            // go any further in the play command queue
            if (this.publicApi.isLiveMedia() && this.ready() === false) {
                rejectPlay();
                // eslint-disable-next-line
                console.log(
                    'The call to play() failed likely because the livestream media was not yet ready. Try calling play() in an onReady event instead.',
                );

                return Promise.reject();
            }

            if (this.suppressPlay()) {
                return Promise.resolve();
            }

            this._isPlayPending = true;
            this._lastPlayType = undefined;
            this._lastPlaySource = currentEventSource();
            this._lastPlayIssuedAt = Date.now();
            this._lastPlayResolvedAt = null;
            this._lastPlayRejectedAt = null;
            this.trigger('playpending', this.lastPlayInfo());
            return new Promise((resolve, reject) => {
                this.ready(() => {
                    this._calledPlay = true;
                    if (this._mozillaAtEnd()) {
                        this.engine.setCurrentTime(0);
                    }

                    const playOptions = {};

                    // If play was called when the video was being clicked but we hadn't
                    // loaded the engine yet, then this would always be async, which
                    // means it would trigger the autoplay protocol. In that situation,
                    // since the viewer has actually clicked, we definitely want to play
                    // the video. But if silentAutoplay=false is set, it wouldn't play.
                    // So in that situation, we pass silentAutoplay=allow. This matters
                    // mainly for viewers with very slow or spotty connections--for most
                    // viewers, the engine loads so fast that they can't click before it
                    // loads.
                    if (clickedBeforeReady && this._attrs.silentAutoplay === false) {
                        playOptions.silentAutoplay = 'allow';
                        this.trigger('clicked-play-before-ready');
                    }

                    // iOS could only play inline starting in version 10.1. Before that,
                    // calling play outside of a user event will fail but will not cause
                    // a promise rejection.
                    if (
                        Wistia.detect.ios.version &&
                        Wistia.detect.ios.version < 10.1 &&
                        !inUserEventContext() &&
                        !this.engine.isInitializingFromUnmuted()
                    ) {
                        this.notice('Play rejected because not in user context.');
                        rejectPlay();
                        reject();
                    }

                    this.engine
                        .play(playOptions)
                        .then((playType) => {
                            this._isPlayPending = false;
                            this._lastPlayType = playType;
                            this._lastPlayResolvedAt = Date.now();

                            if (playType === 'play-silently' && !this._inSilentPlaybackMode) {
                                this._inSilentPlaybackMode = true;
                                this.trigger('silentplaybackmodechange', true);
                                this.embedElement.dispatchEvent(
                                    new CustomEvent('silent-playback-mode-change', {
                                        detail: {
                                            isInSilentPlaybackMode: true,
                                        },
                                    }),
                                );
                            }
                            resolve();
                        })
                        .catch((e) => {
                            this.notice(e);
                            rejectPlay();
                            reject();
                        });
                });
            });
        }

        pause() {
            this.info('pause');
            this.trigger('receivepause');
            this.initEngineAfterEmbedded();
            this._isPausePending = false;
            this._lastPauseSource = currentEventSource();
            this._lastPauseIssuedAt = Date.now();
            return new Promise((resolve) => {
                if (this.ready()) {
                    this.engine.pause();
                    this._isPausePending = false;
                    resolve();
                }
            });
        }

        time(t, options) {
            if (t != null) {
                this.info('time', t);

                if (this.state() === 'beforeplay') {
                    this._startPosition = t;
                }

                this.initEngineAfterEmbedded();

                return new Promise((resolve) => {
                    if (this.state() === 'beforeplay') {
                        this._lastPlaySource = currentEventSource();
                        this._lastPlayIssuedAt = Date.now();
                        this._isPlayPending = true;
                        this._lastPlayType = undefined;

                        // if seeking from beforeplay, we'd be ending in 'paused'
                        // state from inside the engine.
                        this._isPausePending = true;
                        this._lastPauseIssuedAt = this._lastPlayIssuedAt;
                        this._lastPauseSource = this._lastPlaySource;
                    }

                    t = Math.max(0, Math.min(this.duration(), t));
                    this.ready(() => {
                        const requestedLazy = options && options.lazy && this.state() !== 'playing';
                        if (requestedLazy) {
                            this.engine
                                .seekOnPlay(t)
                                .then(this.behaviors.relayEvents.fireTimeChangedEventsIfChanged);
                            this._isPlayPending = false;
                            this.embedElement.dispatchEvent(new CustomEvent('seeked'));
                            resolve();
                            return;
                        }

                        if (this.state() === 'beforeplay') {
                            this._seekPromise = this.engine
                                .seek(t, options)
                                .catch((e) => {
                                    // if seek-before-play fails, fall back to seeking _on_ play.
                                    this.notice(e);
                                    this.engine.seekOnPlay(t);

                                    this._isPlayPending = false;
                                    this._lastPlayRejectedAt = Date.now();
                                    this._lastPlayType = undefined;
                                    this.trigger('playrejected', this.lastPlayInfo());
                                    this.embedElement.dispatchEvent(new CustomEvent('seeked'));
                                    resolve();
                                })
                                .then((playType) => {
                                    this.behaviors.relayEvents.fireTimeChangedEventsIfChanged();
                                    this._isPlayPending = false;
                                    this._isPausePending = false;
                                    this._lastPlayType = playType;

                                    if (playType === 'play-silently') {
                                        this._inSilentPlaybackMode = true;
                                        this.trigger('silentplaybackmodechange', true);

                                        this.embedElement.dispatchEvent(
                                            new CustomEvent('silent-playback-mode-change', {
                                                detail: {
                                                    isInSilentPlaybackMode: true,
                                                },
                                            }),
                                        );
                                    }
                                    this.embedElement.dispatchEvent(new CustomEvent('seeked'));
                                    resolve();
                                });
                        } else {
                            this.info(`time ${t}: set immediately`);
                            this.engine.setCurrentTime(t);
                            this.behaviors.relayEvents.fireTimeChangedEventsIfChanged();
                            this.embedElement.dispatchEvent(new CustomEvent('seeked'));
                            resolve();
                        }
                    });
                });
            }
            return (this.engine && this.engine.getCurrentTime()) || 0;
        }

        duration() {
            // for live, we don't have a known duration so return the
            // browser's native duration
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration#value
            if (this.publicApi.isLiveMedia()) {
                return Infinity;
            }

            if (this.engine) {
                return this.engine.getDuration();
            }
            const effectiveDuration = this._mediaData.secondaryMediaData ?
                this._mediaData.secondaryMediaData.duration :
                this._mediaData.duration;

            const fakeEngine = {
                attributes: {
                    cuts: this._opts.cuts,
                    duration: effectiveDuration,
                    trimEnd: this._opts.trimEnd,
                    trimStart: this._opts.trimStart,
                },
            };

            return getDurationAfterCuts(fakeEngine);
        }

        // COMMAND QUEUE ATOMIC - Refer to _video.coffee
        volume(level) {
            if (level != null) {
                this.info('volume', level);
                level = Math.max(0, Math.min(1, level));
                this.initEngineAfterEmbedded();
                super.volumeAttr(level);
                if (this.ready()) {
                    this.engine.setVolume(level);
                }
            }

            if (this.engine) {
                super.volumeAttr(this.engine.getVolume());
                return this.engine.getVolume();
            }

            return this._attrs.volume != null ? this._attrs.volume : 1;
        }

        mute() {
            this._muted = true;
            if (this.ready()) {
                this.engine.mute();
            } else {
                this.ready(() => {
                    this.engine.mute();
                });
            }
        }

        unmute() {
            this._muted = false;
            if (this.ready()) {
                if (Wistia.detect.callingPlayRequiresEventContext) {
                    if (this.state() !== 'playing' || inUserEventContext()) {
                        this.engine.unmute();
                        if (this._inSilentPlaybackMode) {
                            this._inSilentPlaybackMode = false;
                            this.trigger('silentplaybackmodechange', false);
                            this.embedElement.dispatchEvent(
                                new CustomEvent('silent-playback-mode-change', {
                                    detail: {
                                        isInSilentPlaybackMode: false,
                                    },
                                }),
                            );
                        }
                    } else {
                        this.notice('could not unmute');
                    }
                } else {
                    this.engine.unmute();
                    if (this._inSilentPlaybackMode) {
                        this._inSilentPlaybackMode = false;
                        this.trigger('silentplaybackmodechange', false);
                        this.embedElement.dispatchEvent(
                            new CustomEvent('silent-playback-mode-change', {
                                detail: {
                                    isInSilentPlaybackMode: false,
                                },
                            }),
                        );
                    }
                }
            }
        }

        isMuted() {
            if (this.engine) {
                return this.engine.isMuted();
            }
            return this._muted != null ? this._muted : !!this._opts.muted;
        }

        isResumableEnabled() {
            // bail without even checking opts or auto criteria if we don't have the
            // behavior, or we have a preset start time, or are a Live media
            if (!this.behaviors[ResumableBehavior.handle] ||
                this._impl._startPosition != null ||
                this.publicApi.isLiveMedia()
            ) {
                return false;
            }

            return (
                this._attrs.resumable === true ||
                (this._attrs.resumable !== false && this.meetsAutoCriteraForResumable())
            );
        }

        meetsAutoCriteraForResumable() {
            const playbarIsEnabled = this.isControlEnabled('playbar') || this._attrs.playBarControl;

            return (!shorterThanResumableThreshold(this.duration()) &&
                !this._attrs.autoplay &&
                !(this._attrs.endVideoBehavior === 'loop') &&
                (playbarIsEnabled || this.isAudio())
            );
        }

        setResumable(val) {
            super.setResumable(val);

            if (val === false) {
                this.behaviors.resumable.destroyResumableKey();
            } else if (this.shouldResume()) {
                this.behaviors.resumable.initResumableKey();
            }

            this.behaviors.embed.updateStartPosition();
        }

        shouldResume() {
            return (
                this.isResumableEnabled() && withinResumableTime(this.publicApi.hashedId(), this.duration())
            );
        }

        state() {
            if (this.engine) {
                const enginePlaybackMode = this.engine.getPlaybackMode();
                if (enginePlaybackMode === 'beforeplay' && this.behaviors.relayEvents ? ._hasPlayed) {
                    // The engine's playback mode may be "beforeplay" when changing
                    // quality or when being replaced.
                    return 'paused';
                }
                return enginePlaybackMode;
            }
            return 'beforeplay';
        }

        setAriaLiveText(text) {
            if (!this.ui) {
                this.ui = this.behaviors.ui;
            }

            this.ui.setAriaLiveText(text);
        }

        lastPauseInfo() {
            return {
                source: this._lastPauseSource,
                issuedAt: this._lastPauseIssuedAt,
                isPending: !!this._isPausePending,
            };
        }

        lastPlayInfo() {
            return {
                source: this._lastPlaySource,
                issuedAt: this._lastPlayIssuedAt,
                isPending: !!this._isPlayPending,
                playType: this._lastPlayType,
                resolvedAt: this._lastPlayResolvedAt,
                rejectedAt: this._lastPlayRejectedAt,
            };
        }

        playerBackgroundColor(color) {
            if (color != null) {
                this.info('playerBackgroundColor', color);
                const lastPlayerBackgroundColor = this._attrs.playerBackgroundColor;
                this._attrs.playerBackgroundColor = new Color(color).toHex();
                if (lastPlayerBackgroundColor !== this._attrs.playerBackgroundColor) {
                    this.trigger(
                        'playerbackgroundcolorchange',
                        this._attrs.playerBackgroundColor,
                        lastPlayerBackgroundColor,
                    );
                }
                return this;
            }
            return this._attrs.playerBackgroundColor;
        }

        preloadValue() {
            return this.behaviors.embed.preloadValue();
        }

        width(w, options = {}) {
            if (w != null) {
                if (options.fullscreen || !this.inFullscreen()) {
                    return super.width(w, options);
                }
                this.info(`notFullscreen => width(${w})`);
                this.notFullscreen(() => {
                    super.width(w, options);
                });
                return this;
            }
            return super.width(w, options);
        }

        height(h, options = {}) {
            if (h != null) {
                if (options.fullscreen || !this.inFullscreen()) {
                    return super.height(h, options);
                }
                this.info(`notFullscreen => height(${h})`);
                this.notFullscreen(() => {
                    super.height(h, options);
                });
                return this;
            }
            return super.height(h, options);
        }

        videoWidth(w, options = {}) {
            if (w != null) {
                if (options.fullscreen || !this.inFullscreen()) {
                    return super.videoWidth(w, options);
                }
                this.info(`notFullscreen => videoWidth(${w})`);
                this.notFullscreen(() => {
                    super.videoWidth(w, options);
                });
                return this;
            }
            return super.videoWidth(w, options);
        }

        videoHeight(h, options = {}) {
            if (h != null) {
                if (!this.inFullscreen()) {
                    return super.videoHeight(h, options);
                }
                this.info(`notFullscreen => videoHeight(${h})`);
                this.notFullscreen(() => {
                    super.videoHeight(h, options);
                });
                return this;
            }
            return super.videoHeight(h, options);
        }

        playbackRate(rate) {
            if (rate != null) {
                this.initEngineAfterEmbedded();
                this.ready(() => {
                    this.info('playbackRate', rate);
                    const parsedRate = parseFloat(rate);

                    if (isNaN(parsedRate)) {
                        this.error('playbackRate: Invalid argument "#{rate}" given. Expected a float.');
                        return this;
                    }
                    rate = parsedRate;

                    const lastPlaybackRate = this.engine.getPlaybackRate();
                    this.engine.setPlaybackRate(rate);
                    this._eventLoopDuration = Math.max(50, Math.min(500, this._baseEventLoopDuration / rate));
                    this._playbackRate = rate;
                    if (lastPlaybackRate !== this._playbackRate) {
                        this.trigger('playbackratechange', this._playbackRate);
                        this.embedElement.dispatchEvent(
                            new CustomEvent('rate-change', {
                                detail: {
                                    playbackRate: this._playbackRate,
                                },
                            }),
                        );
                    }
                });
                return this;
            }
            if (this.engine) {
                return this.engine.getPlaybackRate();
            }
            return 1;
        }

        trim(trimSettings) {
            if (trimSettings != null) {
                this.embedded(() => {
                    if (!equalsDeep(trimSettings, this.engine.getTrim())) {
                        this.engine.setTrim(trimSettings);
                        this.trigger('trimchange', trimSettings);
                    }
                });
            } else {
                return this.engine.getTrim();
            }
        }

        captureCurrentFrame(...args) {
            return this.engine.captureCurrentFrame(...args);
        }

        getReportAProblemData(_formData) {
            const safeExec = (fn) => {
                try {
                    return fn();
                } catch (e) {
                    return `threw exception: ${e.message}`;
                }
            };

            const embedOptions = ensureOptionsAreNonCircular(this.publicApi._opts);
            const optionSources = this.publicApi._optionSources();
            Object.keys(optionSources).forEach((key) => {
                optionSources[key] = ensureOptionsAreNonCircular(optionSources[key]);
            });

            // Use the tagged version if it's available, otherwise use the fallback player version
            const playerVersion =
                TAGGED_VERSION !== '' && TAGGED_VERSION.length > 0 ? TAGGED_VERSION : PLAYER_VERSION;

            const data = {
                player_version: playerVersion,
                media_key: this._mediaData.mediaKey,
                account_key: this._mediaData.accountKey,
                visitor_key: this.visitorKey(),
                event_key: this.eventKey(),
                referrer: document.referrer,
                page_url: location.href,
                extra_data: {
                    first_1000_logs: Wistia.wlog.first1000LogLines(),
                    last_1000_logs: Wistia.wlog.last1000LogLines(),
                    browser_time: new Date(),
                    option_sources: safeExec(() => {
                        return optionSources;
                    }),
                    embedOptions,
                    active_plugins: safeExec(() => {
                        return Object.keys(this.publicApi.plugin);
                    }),
                    assets: this._mediaData.assets,
                    selectedAsset: this.engine.selectedAsset(),
                    attrs: this._attrs,
                    judy: safeExec(() => {
                        return Judy.report(this.publicApi.judyCtx(), this._mediaData, this._opts);
                    }),
                    detect: Wistia.detect,
                    engineDiagnostics: safeExec(() => {
                        return this.engine.diagnosticData();
                    }),
                },
            };

            // Let plugins define their own data to be sent
            for (let pluginName in this.publicApi.plugin) {
                const plugin = this.publicApi.plugin[pluginName];
                if (typeof plugin.getReportAProblemData === 'function') {
                    data.extra_data[pluginName] = plugin.getReportAProblemData();
                }
            }

            return data;
        }

        isKeyboardFocused(bool) {
            if (bool != null) {
                this._isKeyboardFocused = bool;
            }
            return this._isKeyboardFocused;
        }

        setControlEnabled(handle, bool) {
            const enabledWillChange = this.isControlEnabled(handle) !== bool;
            this._enabledControls[handle] = bool;

            const triggerFn = () => {
                if (bool) {
                    this.trigger('controlenabled', handle);
                } else {
                    this.trigger('controldisabled', handle);
                }
            };

            if (enabledWillChange) {
                if (this.embedded()) {
                    return this.renderUI().then(triggerFn);
                }
                return new Promise((resolve) => {
                    this.embedded(resolve);
                    triggerFn();
                });
            }
            return (this.ui && this.ui.lastRenderPromise) || Promise.resolve();
        }

        isControlDisabled(handle) {
            const ControlClass = Wistia._controlDefinitions[handle];
            if (ControlClass && ControlClass.isVideoChrome) {
                if (this._opts.chromeless) {
                    return true;
                }
            }
            return this._enabledControls[handle] === false;
        }

        isControlEnabled(handle) {
            if (this._enabledControls[handle] === false) {
                return false;
            }
            if (this.publicApi.controls[handle] != null) {
                return true;
            }
            return false;
        }

        whenControlMounted(handle) {
            return new Promise((resolve) => {
                this.embedded(() => {
                    this.behaviors.ui.whenControlMounted(handle).then(resolve);
                });
            });
        }

        getControl(handle) {
            return this.ui && this.ui.controls && this.ui.controls[handle];
        }

        _doEnterInputContexts() {
            // If we call enterInputContext a bunch rapidly, it's probably due to
            // focusin handlers running for several elements at once, bubbling
            // outwards from the element that was focused. We want the innermost
            // element's context to be the last one we enter, so it becomes the one
            // returned by getInputContext, and then we fall back to the next one out
            // upon exiting the innermost one.
            this._inputContextsToEnter = this._inputContextsToEnter.reverse().map((context) => {
                // Either add or move this context to the front of the array.
                const index = this._playerContext.indexOf(context);
                if (index > 0) {
                    this._playerContext.splice(index, 1);
                }
                if (index === -1 || index > 0) {
                    this._playerContext.unshift(context);
                    this.trigger('inputcontextchange', context);
                }

                return context;
            });
        }

        enterInputContext(context) {
            clearTimeouts(`${this.uuid}.enter_input_contexts`);
            this._inputContextsToEnter.push(context);
            doTimeout(
                `${this.uuid}.enter_input_contexts`,
                () => {
                    this._doEnterInputContexts();
                },
                10,
            );
        }

        originalenterInputContext(context) {
            // Either add or move this context to the front of the array.
            const index = this._playerContext.indexOf(context);
            if (index > 0) {
                this._playerContext.splice(index, 1);
            }
            if (index === -1 || index > 0) {
                this._playerContext.unshift(context);
                this.trigger('inputcontextchange', context);
            }
        }

        exitInputContext(context) {
            const contextBeforeExit = this.getInputContext();
            const index = this._playerContext.indexOf(context);
            if (index === -1) {
                return;
            }
            this._playerContext.splice(index, 1);
            const contextAfterExit = this.getInputContext();
            if (contextBeforeExit !== contextAfterExit) {
                this.trigger('inputcontextchange', contextAfterExit);
            }
        }

        getInputContext() {
            return this._playerContext[0];
        }

        getMediaElement() {
            return this.engine && this.engine.getMediaElement();
        }

        whenVideoElementInDom() {
            if (this._whenVideoElementInDom) {
                return this._whenVideoElementInDom;
            }
            if (this.engine) {
                return Promise.resolve(this.getMediaElement());
            }
            return (this._whenVideoElementInDom = new Promise((resolve) => {
                this.bind('engine-initialized', () => {
                    resolve(this.getMediaElement());
                    return this.unbind;
                });
            }));
        }

        inSilentPlaybackMode() {
            return !!this._inSilentPlaybackMode;
        }

        // This is called from PublicApi when moving to an "up" state.
        checkForReady() {
            this.behaviors.embed.checkForReady();
        }

        loadOverlayCode() {
            if (this._overlayCodePromise) {
                return this._overlayCodePromise;
            }

            this._overlayCodePromise = new Promise((resolve) => {
                if (this.behaviors.overlays) {
                    resolve();
                    return;
                }
                dynamicImport('assets/external/vulcanV2Player/behaviors/OverlaysBehavior.js').then(
                    (moduleClass) => {
                        if (!this.behaviors.overlays) {
                            this.addBehavior(moduleClass.OverlaysBehavior);
                        }
                        resolve();
                    },
                );
            });
            return this._overlayCodePromise;
        }

        defineOverlay(name, config) {
            return this.loadOverlayCode().then(() => {
                this._overlays[name] = config;
            });
        }

        requestOverlay(name) {
            return this.loadOverlayCode().then(() => {
                return this.behaviors.overlays.requestOverlay(name);
            });
        }

        cancelOverlay(name) {
            return this.loadOverlayCode().then(() => {
                return this.behaviors.overlays.cancelOverlay(name);
            });
        }

        undefineOverlay(name) {
            return this.loadOverlayCode().then(() => {
                return this.behaviors.overlays.undefineOverlay(name);
            });
        }

        getOverlays() {
            return this._overlays;
        }

        layout(l, extraOpts = {}) {
            if (l != null) {
                this.whenVideoElementInDom().then(() => {
                    this.engine.setLayout(l, extraOpts);
                });
                this._layout = l;
            } else {
                return this._layout;
            }
        }

        focus() {
            if (this.isAudio()) {
                this.whenControlMounted('audioBackgroundFocus').then((control) => {
                    control.focus();
                });
            } else {
                this.whenControlMounted('backgroundFocus').then((control) => {
                    control.focus();
                });
            }
        }

        // the chapters plugin calls this very early, sometimes before
        // we've asyncly required the audio ui behavior
        _inNativeMode() {
            return this.behaviors.ui ? .inNativeMode() || false;
        }

        _bandwidthTest() {
            return this.behaviors.bandwidthTest.bandwidthTest();
        }

        _mozillaAtEnd() {
            return this.behaviors.relayEvents.mozillaAtEnd();
        }

        _focusNextVisibleElem() {
            return this.behaviors.ui.focusNextVisibleElem();
        }

        openTabMenu() {
            if (!this.isAudio()) {
                return;
            }
            this.ui.openTabMenu();
        }

        closeTabMenu() {
            if (!this.isAudio()) {
                return;
            }
            this.ui.closeTabMenu();
        }

        openChaptersTab() {
            if (!this.isAudio()) {
                return;
            }
            this.whenControlMounted('chaptersTab').then((control) => {
                this.ui.setSelectedTab(control.constructor.handle);
                this.openTabMenu();
            });
        }

        openShareTab() {
            if (!this.isAudio()) {
                return;
            }
            this.whenControlMounted('shareTab').then((control) => {
                this.ui.setSelectedTab(control.constructor.handle);
                this.openTabMenu();
            });
        }

        openTranscriptTab() {
            if (!this.isAudio()) {
                return;
            }
            this.whenControlMounted('transcriptTab').then((control) => {
                this.ui.setSelectedTab(control.constructor.handle);
                this.openTabMenu();
            });
        }

        turnOffCaptions() {
            this.controls.captions ? .turnOff();
            this.controls.captionsButton ? .matchMenuToSelectedTextTrack();
        }
    }

    Wistia.VulcanV2Player = VulcanV2Player;

    Wistia.plugin('vulcanV2Player', (_video, _options) => {
        Wistia.info('vulcanV2Player no-op plugin executed');
    });

    const ensureOptionsAreNonCircular = (options) => {
        const result = clone(options);
        if (result.container) {
            result.container = 'removed to avoid circular';
        }
        return result;
    };
}

export default Wistia.VulcanV2Player;