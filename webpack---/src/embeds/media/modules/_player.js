import {
    usablePlayers
} from 'utilities/judy.js';
import * as Assets from 'utilities/assets.js';
import {
    Color
} from 'utilities/color.js';
import {
    StopGo
} from 'utilities/stopgo.js';
import {
    appHost,
    eV1Protocol
} from 'utilities/hosts.js';
import {
    globalEventLoop
} from 'utilities/event_loop.js';
import {
    sanePlayerColor
} from 'utilities/sane-player-color.js';
import {
    clearTimeouts,
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    clone,
    keys as objKeys,
    merge
} from 'utilities/obj.js';
import {
    SecondsWatchedTracker
} from 'utilities/secondsWatchedTracker.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';
import {
    elemAnimate,
    elemAppend,
    elemFromObject,
    elemHeight,
    elemRemove,
    elemStyle,
    elemUnbindAllInside,
    elemWidth,
} from 'utilities/elem.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    generateRelativeBlockCss
} from 'utilities/generate.js';
import {
    initializeSentry,
    reportError
} from 'utilities/sentryUtils.ts';
import {
    getLanguage
} from '../../shared/translations.js';

// The width/height we set on an element is different from what the browser will
// report back from getComputedStyle for that dimension. When checking to see if
// the width/height are what we set them to, we need some wiggle room.
const ALLOWABLE_DIMENSION_DELTA = 0.5;

(function(Wistia) {
    const W = Wistia;

    if (Wistia.Player) {
        return;
    }

    class Player {
        // EXPLANATION OF COMMAND QUEUE USING @commandQueueOpen
        //
        // The command queue lets us chain asynchronous actions so they can execute
        // sequentially under the hood. This is important especially for "compound"
        // commands; for example, calling time(t) before the video played is
        // actually a compound command that plays, changes volume, and seeks.
        // Therefore, without queueing, if any of those commands (calling play,
        // changing volume, seeking) occurs while seek-before-play is happening, it
        // will cause conflicts.
        //
        // If you have an asynchronous block of code that you want to be part of the
        // command queue, you can wrap it like this:
        //
        //     @commandQueueOpen.synchronize (done) =>
        //       doSomethingAsynchronous -> done()
        //
        // If you have something that's _not_ asynchronous that you still want to
        // be queued, you don't need to call synchronize; just do this:
        //
        //     @commandQueueOpen =>
        //       doSomethingSynchronous()
        //
        // SIMPLE RULES TO LIVE BY
        //
        // 1. Within @commandQueueOpen, you should not be nesting _other_ calls to
        // @commandQueueOpen. We call this making the function "command queue atomic".
        //
        // 2. Annotate functions that implement the command queue by writing
        // "COMMAND QUEUE ATOMIC - Refer to _video.coffee" in a comment above them.

        constructor(publicApi) {
            this.publicApi = publicApi;
            this.embedElement = publicApi.container;
            this.uuid = seqId();

            this._baseEventLoopDuration = 300;
            this._eventLoopDuration = 300;

            this.info('constructor');
            this.transferFacadeProperties();

            // This is for compatibility because we used to pass @publicApi directly
            // to plugins and controls, and some of those may be reaching into
            // video._impl.
            this._impl = this;

            // Transfer all StopGos since they're kinda used as methods.
            objKeys(publicApi).forEach((propName) => {
                const propVal = publicApi[propName];
                if (propVal instanceof StopGo && !Object.hasOwn(this, propName)) {
                    this[propName] = propVal;
                }
            });

            // As usual, @plugin is a kinda weird object/function hybrid. We redefined
            // this in the replaceWith flow, so we can freeze the old value in this
            // impl safely.
            this.plugin = this.publicApi.plugin;

            this.ready = new StopGo();
            this.hasData = new StopGo();
            this.embedded = new StopGo();
            this.commandQueueOpen = new StopGo();
            this.hasData(true);
            this.commandQueueOpen(true);
            this.playing = new StopGo();
            this.notFullscreen = new StopGo();

            this.resetStateVariables();

            if (!this.publicApi.isLiveMedia()) {
                this.setupPercentTracking();
            }

            this._recordFirstEmbedIfEligible();
        }

        addLoopBehavior() {
            this.whenVideoElementInDom().then(() => {
                this.engine ? .getMediaElement().setAttribute('loop', '');
            });
        }

        animate(props = {}, options = {}) {
            this.info('animate', props, options);

            const callback = options.callback;
            options.callback = () => {
                elemStyle(this.grid.root, {
                    position: 'relative'
                });
                callback ? .();
            };

            elemStyle(this.grid.root, {
                position: 'absolute'
            });
            elemAnimate(this.grid.root, props, options);

            return this;
        }

        aspect() {
            if (this._attrs.aspect) {
                return this._attrs.aspect;
            }

            if (this.publicApi.isAudio()) {
                return this.publicApi.width() / this.publicApi.height();
            }

            if (this._currentAsset && this._currentAsset.width == 'variable') {
                return this.mp4Aspect() || this.originalAspect();
            }

            if (this._currentAsset ? .width && this._currentAsset ? .height) {
                return this._currentAsset.width / this._currentAsset.height;
            }

            const readyAsset = this.asset({
                container: /mp4/,
                status: 2
            });

            if (readyAsset ? .width && readyAsset ? .height) {
                return readyAsset.width / readyAsset.height;
            }

            if (this._mediaData.instantHlsAspectRatio != null) {
                return this._mediaData.instantHlsAspectRatio;
            }

            const asset = this.asset({
                container: /mp4/
            });

            if (asset ? .width && asset ? .height) {
                return asset.width / asset.height;
            }

            return 640 / 360;
        }

        // TODO: Replace this function with this:
        //
        // Assets.one(@_mediaData.assets, options)
        //
        // It's keeping this special function calling syntax so prevent breaking
        // cached versions of Share/Socialbar.
        asset(_options) {
            if (typeof arguments[0] === 'string') {
                // Support syntax like .asset('original') or .asset('iphone').  This is
                // convenience instead of adding a million different functions at the
                // PublicApi level. The implementation would define corresponding
                // functions like originalAsset or iphoneAsset respectively.
                const method = `${arguments[0]}Asset`;
                const options = arguments[1];
                return this[method](options);
            }
            const options = arguments[0];
            return this.assets(options)[0] || null;
        }

        assets(options) {
            return Assets.filter(this._mediaData.assets, options);
        }

        // Define in subclass
        bigPlayButtonEnabled(enabled) {
            this.publicApi._attrs.bigPlayButton = enabled;

            return this;
        }

        canAutoPlay() {
            return true;
        }

        cancelFullscreen() {
            this.info('cancelFullscreen');
            this.rebuild();
        }

        checkForReady() {
            throw new Error('Define in subclass!');
        }

        cleanupRefs() {
            this.cleanup ? .();
            objKeys(this).forEach((k) => {
                const v = this[k];
                if (v != null && v !== this) {
                    v.cleanup ? .();
                }
            });
        }

        constrainToHeight() {
            return this.videoWidth(this.widthForHeight(this.videoHeight()));
        }

        constrainToWidth() {
            return this.videoHeight(this.heightForWidth(this.videoWidth()));
        }

        disableTextTracks() {
            this.info('disableTextTracks');
            if (!this._disableTextTracks) {
                this._disableTextTracks = () => {
                    if (!this.elem() ? .textTracks) {
                        return;
                    }
                    Array.prototype.slice.call(this.elem().textTracks).forEach((track) => {
                        track.mode = 'disabled';
                    });
                };
            }
            this.rebind('play', this._disableTextTracks);
        }

        duration() {
            return this._mediaData.duration || null;
        }

        elem() {
            return null;
        }

        embed() {
            throw new Error('Define in subclass!');
        }

        embedOptions() {
            if (this._embedOptions) {
                return this._embedOptions;
            }
            this._embedOptions = clone(this._opts);
            return this._embedOptions;
        }

        eventKey() {
            return this._tracker ? .eventKey();
        }

        extraHeight() {
            const th = Math.max(elemHeight(this.grid.above), elemHeight(this.grid.top));
            const bh = Math.max(elemHeight(this.grid.below), elemHeight(this.grid.bottom));
            return th + bh;
        }

        extraWidth() {
            return elemWidth(this.grid.left) + elemWidth(this.grid.right);
        }

        // We use this.gridChildren() with this.fade() so that we can set the
        // background of grid elements at will without fading them.
        fade(opacity = 0, ...more) {
            return elemAnimate(this.gridChildren(), {
                opacity
            }, ...more);
        }

        fadeIn() {
            const more = this._shortAnimArgs(arguments);
            const callback = more.callback;
            more.callback = () => {
                elemStyle(this.gridChildren(), {
                    opacity: ''
                });
                callback ? .();
            };
            elemStyle(this.gridChildren(), {
                opacity: 0
            });
            setTimeout(() => this.fade(1, more), 1);
        }

        fadeOut() {
            const more = this._shortAnimArgs(arguments);
            elemStyle(this.gridChildren(), {
                opacity: 1
            });
            setTimeout(() => this.fade(0, more), 1);
        }

        // the word fit is still used in certain docs online, so we have a no-op method here.
        fit() {}

        focus() {
            this.chrome ? .focus();
        }

        freezeLastFrame() {}

        fullscreenControlEnabled(enabled) {
            this.publicApi._attrs.fullscreenControl = enabled;

            return this;
        }

        // DEPRECATED
        getVisitorKey() {
            return this.visitorKey();
        }

        // DEPRECATED
        getEventKey() {
            return this.eventKey();
        }

        // Some players (external, NotPlayablePlayer) won't ever have a
        // video element. This implementation covers those.
        getMediaElement() {}

        getMediaType() {
            return this._mediaData.mediaType || null;
        }

        /**
         * Returns the video/audio element readyState property without any modification.
         * @returns {number}
         */
        getReadyState() {
            return this.engine ? .getMediaElement() ? .readyState;
        }

        /**
         * Simply returns the video/audio element buffered property without any modification.
         * @returns {TimeRanges}
         */
        getStandardBuffered() {
            return this.engine ? .getMediaElement() ? .buffered;
        }

        gridChildren() {
            let grid = this.grid;

            // IE11 doesn't support forEach operations on NodeLists
            if (window.NodeList && !NodeList.prototype.forEach) {
                grid = Array.prototype.slice.call(this.grid);
            }

            const result = [];
            objKeys(grid).forEach((sector) => {
                const node = this.grid[sector];
                node.childNodes.forEach((child) => {
                    if (!Wistia.isGridElem(this.grid, child)) {
                        result.push(child);
                    }
                });
            });
            return result;
        }

        handleError(e) {
            Wistia.Metrics.videoCount(this, 'player/playback-error');
            reportError('player', e);
            throw e; // Still throw the original error
        }

        hashedId() {
            return this._hashedId;
        }

        hdAsset() {
            throw new Error('Implement in subclass!');
        }

        hlsAsset(options) {
            return Assets.m3u8(this._mediaData.assets, options);
        }

        hlsAssetInRange(options = {}) {
            return Assets.m3u8(this._mediaData.assets, merge(this.qualityOptions(), options));
        }

        // LEGACY
        height(h, options = {}) {
            if (h != null) {
                this.info('height', h, options);

                h = parseFloat(h);
                const lastH = this.height();
                this.chrome.style.height = `${h}px`;

                // TODO: need to check against these two PRs/issues and ensure we don't get in a popover loop.
                // we may need some other dispatch guard
                // - https://github.com/wistia/player-modern/pull/2661
                // - https://github.com/wistia/player-modern/issues/2526
                this.trigger('heightchange', h, lastH);
                this.embedElement.dispatchEvent(
                    new CustomEvent('heightchange', {
                        detail: {
                            height: h,
                            prevHeight: lastH,
                        },
                    }),
                );
                if (options.constrain) {
                    this.constrainToHeight();
                }
                return this;
            }
            return (
                elemHeight(this.grid.center) +
                Math.max(elemHeight(this.grid.above), elemHeight(this.grid.top)) +
                Math.max(elemHeight(this.grid.below), elemHeight(this.grid.bottom))
            );
        }

        heightForWidth(width) {
            return width / this.aspect();
        }

        implContainer() {
            return this._opts.subContainer ? this._embedContainer : this.grid.center;
        }

        // Define this so the code in the Public API is simpler.
        inFullscreen() {
            return false;
        }

        init() {
            this.setupPipedreamTracking();
            return this;
        }

        inSilentPlaybackMode() {
            return false;
        }

        iphoneAsset(options = {}) {
            if (this._iphoneAsset) {
                return this._iphoneAsset;
            }
            this._iphoneAsset = Assets.iphone(this._mediaData.assets, options);
            return this._iphoneAsset;
        }

        iphoneAssetInRange(options = {}) {
            return Assets.iphone(this._mediaData.assets, merge(this.qualityOptions(), options));
        }

        isMuted() {
            return Boolean(this._opts.muted);
        }

        isRemoved() {
            return this.grid === null;
        }

        lastPlayInfo() {
            return {};
        }

        mp4Aspect() {
            const asset =
                this.mp4Asset({
                    width: 640
                }) || this.mp4Asset({
                    width: 960
                }) || this.mp4Asset();
            return asset ? asset.width / asset.height : null;
        }

        mdAsset() {
            throw new Error('Implement in subclass!');
        }

        mp4Asset(options) {
            return Assets.mp4(this._mediaData.assets, options);
        }

        mp4AssetInRange(options = {}) {
            return Assets.mp4(this._mediaData.assets, merge(this.qualityOptions(), options));
        }

        mute() {
            this._muted = true;
            this.trigger('volumechange', this.volume());
            this.embedElement.dispatchEvent(
                new CustomEvent('volume-change', {
                    detail: {
                        volume: this.volume(),
                        isMuted: true,
                    },
                }),
            );
        }

        originalAspect() {
            const originalAsset = this.originalAsset();
            if (originalAsset) {
                return originalAsset.width / originalAsset.height;
            }
            const bestAsset = this.bestAsset();
            return bestAsset().width / bestAsset().height;
        }

        originalAsset() {
            if (this._original) {
                return this._original;
            }
            this._original = Assets.original(this._mediaData.assets);
            return this._original;
        }

        name(newName) {
            if (newName != null) {
                this._name = newName;
                this.trigger('namechange', newName);
            }

            // allow for empty string names
            if (this._name != null) {
                return this._name;
            }
            return this._mediaData.name || '';
        }

        pageUrl() {
            return this.publicApi._attrs.pageUrl;
        }

        pause() {
            this.info('pause');
            this.ready(() => this.pause());
            return this;
        }

        percentWatched() {
            if (this._secondsWatchedTracker) {
                return this._secondsWatchedTracker.secondsWatched() / Math.ceil(this.duration());
            }

            return 0;
        }

        placeEmbed(embedCode) {
            const container = this.implContainer();

            this.info('placeEmbed', container, embedCode);

            this.wrapperElem = elemFromObject({
                id: seqId('wistia_video_wrapper_'),
                style: generateRelativeBlockCss,
                class: 'wistia_video_wrapper',
            });
            elemStyle(this.wrapperElem, {
                overflow: 'hidden'
            });
            elemAppend(container, this.wrapperElem);

            if (typeof embedCode === 'string') {
                this.wrapperElem.innerHTML += embedCode;
            } else {
                elemAppend(this.wrapperElem, embedCode);
            }
        }

        play() {
            this.info('play');
            this.ready(() => this.play());
            return this;
        }

        playableAsset(options) {
            return Assets.playable(this._mediaData.assets, options);
        }

        playableAssetInRange(options = {}) {
            return Assets.playable(this._mediaData.assets, merge(this.qualityOptions(), options));
        }

        playbackRate(rate) {
            return rate != null ? this : 1;
        }

        playbarControlEnabled(enabled) {
            this.publicApi._attrs.playBarControl = enabled;

            return this;
        }

        playerColor(color) {
            const {
                _attrs,
                embedElement
            } = this;

            if (color != null) {
                this.info('playerColor', color);
                const lastPlayerColor = _attrs.playerColor;
                color = sanePlayerColor(color);
                _attrs.playerColor = new Color(color).toHex();
                if (lastPlayerColor !== _attrs.playerColor) {
                    embedElement.dispatchEvent(
                        new CustomEvent('playercolorchange', {
                            detail: {
                                color: _attrs.playerColor,
                                prevColor: lastPlayerColor
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.playerColor;
        }

        captionsBackgroundColor(color) {
            const {
                _attrs,
                embedElement
            } = this;

            if (color != null) {
                this.info('captionsBackgroundColor', color);
                const lastCaptionsBackgroundColor = _attrs.captionsBackgroundColor;
                const lastCaptionsTextColor = _attrs.captionsTextColor;
                _attrs.captionsBackgroundColor = new Color(color).toHex();
                if (lastCaptionsBackgroundColor !== _attrs.captionsBackgroundColor) {
                    embedElement.dispatchEvent(
                        new CustomEvent('captionsbackgroundcolorchange', {
                            detail: {
                                color: _attrs.captionsBackgroundColor,
                                prevColor: lastCaptionsBackgroundColor,
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.captionsBackgroundColor;
        }

        captionsTextColor(color) {
            const {
                _attrs,
                embedElement
            } = this;

            if (color != null) {
                this.info('captionsTextColor', color);
                const lastCaptionsTextColor = _attrs.captionsTextColor;
                _attrs.captionsTextColor = new Color(color).toHex();
                if (lastCaptionsTextColor !== _attrs.captionsTextColor) {
                    embedElement.dispatchEvent(
                        new CustomEvent('captionstextcolorchange', {
                            detail: {
                                color: _attrs.captionsTextColor,
                                prevColor: lastCaptionsTextColor,
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.captionsTextColor;
        }

        captionsTextSize(size) {
            const {
                _attrs,
                embedElement
            } = this;

            if (size != null) {
                this.info('captionsTextSize', size);
                const lastCaptionsTextSize = _attrs.captionsTextSize;
                _attrs.captionsTextSize = size;
                if (lastCaptionsTextSize !== _attrs.captionsTextSize) {
                    embedElement.dispatchEvent(
                        new CustomEvent('captionstextsizechange', {
                            detail: {
                                color: _attrs.captionsTextSize,
                                prevColor: lastCaptionsTextSize,
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.captionsTextSize;
        }

        captionsFontFamily(font) {
            const {
                _attrs,
                embedElement
            } = this;

            if (font != null) {
                this.info('captionsFontFamily', font);
                const lastCaptionsFontFamily = _attrs.captionsFontFamily;
                _attrs.captionsFontFamily = font;
                if (lastCaptionsFontFamily !== _attrs.captionsFontFamily) {
                    embedElement.dispatchEvent(
                        new CustomEvent('captionsfontfamilychange', {
                            detail: {
                                color: _attrs.captionsFontFamily,
                                prevColor: lastCaptionsFontFamily,
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.captionsFontFamily;
        }

        captionsBorderRadius(borderRadius) {
            const {
                _attrs,
                embedElement
            } = this;

            if (borderRadius != null) {
                this.info('captionsBorderRadius', borderRadius);
                const lastCaptionsBorderRadius = _attrs.captionsBorderRadius;
                _attrs.captionsBorderRadius = borderRadius;
                if (lastCaptionsBorderRadius !== _attrs.captionsBorderRadius) {
                    embedElement.dispatchEvent(
                        new CustomEvent('captionsborderradiuschange', {
                            detail: {
                                color: _attrs.captionsBorderRadius,
                                prevColor: lastCaptionsBorderRadius,
                            },
                        }),
                    );
                }
                return this;
            }
            return _attrs.captionsBorderRadius;
        }

        hasNewRoundedIcons() {
            return this._opts.newRoundedIcons;
        }

        playerLanguage(l) {
            if (l != null) {
                this.embedded(() => {
                    if (!getLanguage(l)) {
                        throw new Error(`Language ${l} isn't defined.`);
                    }
                    if (l !== this._attrs.playerLanguage) {
                        this._attrs.playerLanguage = l;
                        this.trigger('playerlanguagechange', getLanguage(l));
                    }
                });
            } else {
                return getLanguage(this._attrs.playerLanguage) || getLanguage('en-US');
            }
        }

        playPauseNotifierEnabled(enabled) {
            this.publicApi._attrs.playPauseNotifier = enabled;

            return this;
        }

        preloadValue() {
            return this.engine ? .getPreload();
        }

        // can be used after engine initialization to live
        // adjust the qualityMax attribute of the engine
        qualityMax(val) {
            if (this.engine ? .qualityMax) {
                this.engine.qualityMax(val);
            }
        }

        // can be used after engine initialization to live
        // adjust the qualityMin attribute of the engine
        qualityMin(val) {
            if (this.engine ? .qualityMin) {
                this.engine.qualityMin(val);
            }
        }

        qualityOptions() {
            const {
                qualityMin,
                qualityMax
            } = this._attrs;
            return {
                qualityMin,
                qualityMax
            };
        }

        rebuild(_options = {}) {
            this.info('rebuild');
            this.embedded(() => {
                this.ready(false);
                this._oldVideoElem = this.elem();
                this.stopStreaming();
                elemRemove(this.wrapperElem);
                this.wipeOutstandingAsyncFunctions();
                this.embed();
            });
            return this;
        }

        remove(options = {}) {
            this.info('remove');
            if (options.trigger !== false) {
                this.trigger('beforeremove');
            }
            this.hasData(false);
            this.ready(false);
            this.embedded(false);
            this.engine ? .destroy();
            this.stopStreaming();
            if (options.trigger !== false) {
                this.trigger('down');
                this.trigger('afterremove');
            }
            this.wipeOutstandingAsyncFunctions();
            this._bindings = {};
            this.cleanupRefs();
            if (this.grid ? .root) {
                elemUnbindAllInside(this.grid.root);
                elemRemove(this.grid.root);
            }
            this.grid = null;
            if (this.elem()) {
                this.elem().removeEventListener('error', this.handleError);
            }
        }

        removeLoopBehavior() {
            this.whenVideoElementInDom().then(() => {
                this.engine ? .getMediaElement().removeAttribute('loop');
            });
        }

        // defined in base impl class
        renderUI() {}

        requestFullscreen() {}

        // When re-embed the video, we may have set some variables that need
        // resetting to make seek-before-play type logic work.
        resetStateVariables() {
            this.info('resetStateVariables');
            this._lastTimePosition = -1;
            this._lastState = 'beforeplay';
            this._streamSet = false;
            this._issuedPlay = false;
            this._issuedPause = false;
            this._beforePlay = true;
            this._hasPlayed = false;
            this._waiting = 0;
            this._ended = false;
            this.playing(false);
        }

        sdAsset() {
            throw new Error('Implement in subclass!');
        }

        secondsWatched() {
            if (this._secondsWatchedTracker) {
                return this._secondsWatchedTracker.secondsWatched();
            }

            return 0;
        }

        secondsWatchedVector() {
            if (this._secondsWatchedTracker) {
                return this._secondsWatchedTracker.secondsWatchedVector();
            }

            return [];
        }

        setBigPlayButtonBorderRadius(value) {
            this._attrs.bigPlayButtonBorderRadius = value;

            const {
                embedElement
            } = this;
            embedElement.dispatchEvent(new Event('bigplaybuttonborderradiuschange'));
            this.trigger('bigplaybuttonborderradiuschange');
        }

        setControlBarBorderRadius(value) {
            this._attrs.controlBarBorderRadius = value;

            if (this._attrs.playerBorderRadius && value !== 0) {
                this.setControlBarDistance(this._attrs.playerBorderRadius / 4);
            } else {
                this.setControlBarDistance(value * 0.333);
            }

            const {
                embedElement
            } = this;
            embedElement.dispatchEvent(new Event('controlbarborderradiuschange'));
            this.trigger('controlbarborderradiuschange');
        }

        setControlBarDistance(val) {
            this._attrs.controlBarDistance = val;

            const {
                embedElement
            } = this;
            embedElement.dispatchEvent(new Event('controlbardistancechange'));
            this.trigger('controlbardistancechange');
        }

        setFloatingControlBar(bool) {
            this._attrs.floatingControlBar = bool;
        }

        setPlayerBorderRadius(value) {
            this._attrs.playerBorderRadius = value;

            const {
                embedElement
            } = this;
            embedElement.dispatchEvent(new Event('playerborderradiuschange'));
            this.trigger('playerborderradiuschange');
        }

        setPlayerColor(color) {
            this.playerColor(color);
            return this;
        }

        setRoundedPlayer(value) {
            this.setFloatingControlBar(Boolean(value));

            this.setPlayerBorderRadius(value);
            this.setControlBarDistance(value * 0.25);
            this.setBigPlayButtonBorderRadius(value * 0.75);
            this.setControlBarBorderRadius(value * 0.75);

            this.renderUI();
        }

        setResumable(val) {
            this._attrs.resumable = val;
            const {
                embedElement
            } = this;
            embedElement.dispatchEvent(new Event('resumablechange'));
        }

        setupGrid(options) {
            if (!this.grid) {
                this.grid = Wistia.createGrid(this, options);
                elemAppend(this.chrome, this.grid.root);
            }
            return this.grid;
        }

        setupPercentTracking() {
            if (this._trackPercent) {
                return;
            }

            this._secondsWatchedTracker = new SecondsWatchedTracker(this, this.duration(), {
                maxWatchingPlaybackRate: this._opts.maxWatchingPlaybackRate,
            });

            // If this video is already playing, assume they've watched up to now.
            if (this.state() === 'playing') {
                const currentSecond = Math.ceil(this.time());
                for (let i = 0; i < currentSecond; i++) {
                    this._secondsWatchedTracker.trackSecond(i, {
                        force: true
                    });
                }
            }

            this._trackPercent = (s) => {
                const lastPercentWatched = this.percentWatched();
                this._secondsWatchedTracker.trackSecond(s);
                if (this.percentWatched() !== lastPercentWatched) {
                    const {
                        embedElement
                    } = this;
                    embedElement.dispatchEvent(
                        new CustomEvent('percent-watched-change', {
                            detail: {
                                percentWatched: this.percentWatched(),
                                lastPercentWatched
                            },
                        }),
                    );
                    this.trigger('percentwatchedchanged', this.percentWatched(), lastPercentWatched);
                    this._percentWatchedThreshold(this.percentWatched());
                }
            };
            this.rebind('secondchange', this._trackPercent);
        }

        setupPipedreamTracking() {
            // Anything that involves asset requires that this._currentAsset is set. To
            // ensure that, we wait until the video is actually embedded to do any
            // reporting on it.
            this.whenVideoElementInDom().then((videoElement) => {
                doTimeout(
                    `${this.uuid}.track-initembed`,
                    () => {
                        Wistia.Metrics.videoCount(this, 'player/initembed');
                        Wistia.Metrics.mobileBuckets(this).forEach((bucket) => {
                            Wistia.Metrics.videoCount(this, `player/initembed.${bucket}`);
                        });
                        Wistia.Metrics.embedTypeBuckets(this.embedElement).forEach((bucket) => {
                            Wistia.Metrics.videoCount(this, `player/initembed.${bucket}`);
                        });

                        const availablePlayers = usablePlayers(
                            this.publicApi.judyCtx(),
                            this.publicApi._mediaData,
                        );
                        Wistia.Metrics.videoCount(this, 'player/available-players', 1, {
                            available_players: availablePlayers,
                        });
                    },
                    100,
                );
                initializeSentry();
                videoElement.addEventListener('error', this.handleError);
            });

            this.bind('play', () => {
                Wistia.Metrics.videoCount(this, 'player/play');
                Wistia.Metrics.mobileBuckets(this).forEach((bucket) => {
                    Wistia.Metrics.videoCount(this, `player/play.${bucket}`);
                });
                Wistia.Metrics.embedTypeBuckets(this.embedElement).forEach((bucket) => {
                    Wistia.Metrics.videoCount(this, `player/play.${bucket}`);
                });
                return this.unbind;
            });

            Wistia.Metrics.countEventOnce(this, 'enter-fullscreen');
            Wistia.Metrics.countEventOnce(this, 'end');
            Wistia.Metrics.countShowLoadingOnce(this);
            Wistia.Metrics.countShowLoadingAll(this);
            Wistia.Metrics.countShowLoadingLongTimeOnce(this);
            Wistia.Metrics.countShowLoadingLongTimeAll(this);

            this.bind('secondchange', () => {
                if (this.secondsWatched() >= 10) {
                    Wistia.Metrics.videoCount(this, 'player/played-10-seconds');
                    Wistia.Metrics.embedTypeBuckets(this.embedElement).forEach((bucket) => {
                        Wistia.Metrics.videoCount(this, `player/played-10-seconds.${bucket}`);
                    });
                    return this.unbind;
                }
            });

            this.bind('secondchange', () => {
                if (this.secondsWatched() >= 30) {
                    Wistia.Metrics.videoCount(this, 'player/played-30-seconds');
                    return this.unbind;
                }
            });
        }

        settingsControlEnabled(enabled) {
            this.publicApi._attrs.settingsControl = enabled;

            return this;
        }

        slide(left, top, ...more) {
            return this.animate({
                    transform: `translate(${left}px,${top}px)`,
                },
                ...more,
            );
        }

        slideInLeft() {
            const more = this._shortAnimArgs(arguments);
            elemStyle(this.grid.root, {
                transform: `translate(${this.videoWidth()}px, 0px)`,
            });
            setTimeout(() => this.slide(0, 0, more), 1);
            return this;
        }

        slideInRight() {
            const more = this._shortAnimArgs(arguments);
            elemStyle(this.grid.root, {
                transform: `translate(${-this.videoWidth()}px, 0px)`,
            });
            setTimeout(() => this.slide(0, 0, more), 1);
            return this;
        }

        slideOutLeft() {
            const more = this._shortAnimArgs(arguments);
            elemStyle(this.grid.root, {
                transform: 'translate(0px, 0px)'
            });
            setTimeout(() => this.slide(-this.videoWidth(), 0, more), 1);
            return this;
        }

        slideOutRight() {
            const more = this._shortAnimArgs(arguments);
            elemStyle(this.grid.root, {
                transform: 'translate(0px, 0px)'
            });
            setTimeout(() => this.slide(this.videoWidth(), 0, more), 1);
            return this;
        }

        playPauseControlEnabled(enabled) {
            this.publicApi._attrs.playPauseControl = enabled;

            return this;
        }

        suppressPlay(forReal) {
            if (forReal != null) {
                this.info('suppressPlay', forReal);
                this._suppressPlay = Boolean(forReal);
                return this._suppressPlay;
            }
            return this._suppressPlay;
        }

        state() {
            return 'beforeplay';
        }

        stillAsset() {
            return Assets.still(this._mediaData.assets);
        }

        stillUrl(options) {
            options = merge({
                    videoWidth: this.videoWidth(),
                    videoHeight: this.videoHeight(),
                },
                this._opts, {
                    stillUrl: this._attrs.poster
                },
                options,
            );
            if (!options.playerColor) {
                options.playerColor = this._mediaData ? .embedOptions ? .playerColor;
            }
            return Assets.stillUrl(this._mediaData.assets, options);
        }

        stopStreaming() {
            // Implement in sub-classes
        }

        thumbnailAssets() {
            return Assets.thumbnailAssets(
                this._mediaData.assets,
                merge({}, this._opts, {
                    instantHlsStillAsset: this._mediaData.instantHlsStillAsset,
                    playButton: false,
                    stillUrl: this._attrs.poster,
                    videoHeight: this.videoHeight(),
                    videoWidth: this.videoWidth(),
                }),
            );
        }

        time(t) {
            if (t != null) {
                this.info('time', t);
                this.ready(() => this.time(t));
                return this;
            }
            return 0;
        }

        // Every time we make a new impl, these properties are transferred to it
        // from the facade. These are what persist across rebuild, replace, etc.
        //
        // There could be a lot more in here, but the convention is to place most
        // relevant properties in the @_attrs hash.
        transferFacadeProperties() {
            const props = `
      _attrs
      _embedContainer
      _givenOptions
      _hashedId
      _hasImpl
      _mediaData
      _opts
      _originalMediaData
      _tracker
      chrome
      container
      controls
      data
      down
      fullscreenContainer
      options
      params
      plugin
      plugins
      up
      `.split(/[\n\s]+/);

            props.forEach((prop) => {
                this[prop] = this.publicApi[prop];
            });
        }

        trim(t) {
            if (t != null) {
                this._trimSettings = t;
                // do nothing by default; engines must support this
            } else {
                return this._trimSettings || {
                    start: 0,
                    end: -1
                };
            }
        }

        unmute() {
            this._muted = false;
            this._isPlayingSilently = false;
            this.trigger('volumechange', this.volume());
            this.embedElement.dispatchEvent(
                new CustomEvent('volume-change', {
                    detail: {
                        volume: this.volume(),
                        isMuted: false,
                    },
                }),
            );
        }

        /**
         * @see https://wistia.com/support/developers/player-api#videoheight
         * Returns the width of the video itself in pixels
         * @param {number} h height of the video
         * @param {Object} options
         * @param {Boolean} options.constrain if `true`, then the width of the video will also be updated to maintain the correct aspect ratio..
         * @returns {void}
         */
        videoHeight(h, options = {
            constrain: false,
            trigger: false
        }) {
            if (h != null) {
                this.info('videoHeight', h, options);
                h = parseFloat(h);
                const lastH = this.height();

                this.chrome.style.height = `${h}px`;
                // TODO: need to check against these two PRs/issues and ensure we don't get in a popover loop.
                // we may need some other dispatch guard
                // - https://github.com/wistia/player-modern/pull/2661
                // - https://github.com/wistia/player-modern/issues/2526
                this.trigger('heightchange', h, lastH);
                this.embedElement.dispatchEvent(
                    new CustomEvent('heightchange', {
                        detail: {
                            height: h,
                            prevHeight: lastH,
                        },
                    }),
                );
                if (options.constrain) {
                    this.constrainToHeight();
                }
                return this;
            }
            return elemHeight(this.chrome);
        }

        /**
         * @see https://wistia.com/support/developers/player-api#videowidth
         * Returns the width of the video itself in pixels
         * @param {number} w width of the video
         * @param {Object} options
         * @param {Boolean} options.constrain , if `true`, the height of the video will also be updated to maintain the correct aspect ratio.
         * @returns {void}
         */
        videoWidth(w, options = {
            constrain: false,
            trigger: false
        }) {
            if (w != null) {
                this.info('videoWidth', w, options);

                w = parseFloat(w);
                const lastW = this.width();

                this.chrome.style.width = `${w}px`;
                // TODO: need to check against these two PRs/issues and ensure we don't get in a popover loop.
                // we may need some other dispatch guard
                // - https://github.com/wistia/player-modern/pull/2661
                // - https://github.com/wistia/player-modern/issues/2526
                this.trigger('widthchange', w, lastW);
                this.embedElement.dispatchEvent(
                    new CustomEvent('widthchange', {
                        detail: {
                            width: w,
                            prevWidth: lastW,
                        },
                    }),
                );
                if (options.constrain) {
                    this.constrainToWidth();
                }
                return this;
            }
            return elemWidth(this.chrome);
        }

        getVideoQuality() {
            return 'auto';
        }

        setVideoQuality() {
            return this;
        }

        visitorKey() {
            return this._tracker ? .visitorKey();
        }

        volume(level) {
            if (level != null) {
                this.info('volume', level);
                this.volumeAttr(level);
                return this.ready(() => this.volume(level));
            }
            return 0;
        }

        volumeAttr(level) {
            this._attrs.volume = level;
        }

        volumeControlEnabled(enabled) {
            this.publicApi._attrs.volumeControl = enabled;

            return this;
        }

        webmAsset(options) {
            return Assets.webm(this._mediaData.assets, options);
        }

        webmAssetInRange(options = {}) {
            return Assets.webm(this._mediaData.assets, merge(this.qualityOptions(), options));
        }

        whenVideoElementInDom() {
            return new Promise((_resolve) => {
                // never resolve
            });
        }

        width(w, options = {}) {
            if (w != null) {
                this.info('width', w, options);

                w = parseFloat(w);
                const lastW = this.width();

                this.chrome.style.width = `${w}px`;
                // TODO: need to check against these two PRs/issues and ensure we don't get in a popover loop.
                // we may need some other dispatch guard
                // - https://github.com/wistia/player-modern/pull/2661
                // - https://github.com/wistia/player-modern/issues/2526
                this.trigger('widthchange', w, lastW);
                this.embedElement.dispatchEvent(
                    new CustomEvent('widthchange', {
                        detail: {
                            width: w,
                            prevWidth: lastW,
                        },
                    }),
                );
                if (options.constrain) {
                    this.constrainToWidth();
                }
                this._width = w;
                return this;
            }
            return elemWidth(this.grid.left) + elemWidth(this.grid.center) + elemWidth(this.grid.right);
        }

        widthForHeight(height) {
            return height * this.aspect();
        }

        // Some functions might be queued using various methods. When we
        // replace, rebuild, or remove a video, we want to cancel them
        // immediately.
        wipeOutstandingAsyncFunctions() {
            this.info('wipeOutstandingAsyncFunctions');
            globalEventLoop.remove(this.uuid);
            clearTimeouts(this.uuid);
            if (this._remoteMediaKey) {
                clearTimeouts(this._remoteMediaKey);
            }
        }

        _isExternallyEmbedded() {
            return !this._isOnWistia();
        }

        _isLoggedIn() {
            return document.querySelector('body').classList.contains('logged_in');
        }

        // First embed and First Share Tracking ================================= #
        _isOnWistia() {
            const url = this._opts._inIframe ? document.referrer : window.location.href;
            return /wistia\.(io|st|com)/.test(url);
        }

        _isShared() {
            return this._isOnWistia() && !this._isLoggedIn();
        }

        _percentWatchedThreshold(percentWatched) {
            if (!this._thresholds) {
                this._thresholds = [0.25, 0.5, 0.75, 1];
            }

            const untriggeredThresholds = [];
            const percentWatchedRounded = Math.round(percentWatched * 100) / 100;
            this._thresholds.forEach((threshold) => {
                if (percentWatchedRounded >= threshold) {
                    this.trigger('percentWatchedThreshold', threshold);
                } else {
                    untriggeredThresholds.push(threshold);
                }
            });
            this._thresholds = untriggeredThresholds;
        }

        _recordFirstEmbedIfEligible() {
            const {
                accountKey,
                firstEmbedForAccount,
                firstShareForAccount,
                hashedId
            } = this._mediaData;
            const firstExternalEmbed = firstEmbedForAccount && this._isExternallyEmbedded();
            const firstShare = firstShareForAccount && this._isShared();

            if (firstExternalEmbed || firstShare) {
                const url = `${eV1Protocol()}//${appHost()}/account/activities`;
                const payload = {
                    account_key: accountKey,
                    media_hashed_id: hashedId
                };

                if (firstExternalEmbed) {
                    payload.first_embed = this._isExternallyEmbedded();
                }

                if (firstShare) {
                    payload.first_share = this._isShared();
                }

                if (accountKey > 'wistia-production_1819717') {
                    countMetric('wistia/record-first-embed-or-share-metadata', 1, {
                        is_externally_embedded: this._isExternallyEmbedded(),
                        is_shared: this._isShared(),
                        first_embed_for_account: firstEmbedForAccount,
                        first_share_for_account: firstShareForAccount,
                        account_key: accountKey,
                        media_hashed_id: hashedId,
                    });

                    // If an account's first embed is a web component, fire an event so we can check it out!
                    // This is a temporary metric to help us with the rollout of the web component embed code
                    const isFirstExternalEmbedWebComponent =
                        firstExternalEmbed && this.embedElement ? .tagName === 'WISTIA-PLAYER';

                    if (isFirstExternalEmbedWebComponent) {
                        countMetric('player/first-embed-web-component', 1, {
                            account_key: accountKey,
                            media_hashed_id: hashedId,
                            url: window.location.href,
                        });
                    }
                }

                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
            }
        }

        _refreshDataFromServer(callback, errorCallback) {
            const embedHost = this.embedOptions().embedHost || Wistia.remote.embedHost();
            return fetch(`//${embedHost}/embed/medias/${this.hashedId()}.json`)
                .then((resp) => resp.json())
                .then((resp) => {
                    this.publicApi._originalMediaData = resp.media;
                    this._mediaData = this.publicApi._transformAndUpdateMediaData();
                    if (this._newStill) {
                        this._replaceStillAsset(this._newStill);
                    }
                    this.publicApi._mediaData = this._mediaData;
                    Wistia.cacheMedia(this.hashedId(), this._mediaData);
                    callback ? .();
                    this.trigger('refreshed-from-server');

                    return this._mediaData;
                })
                .catch(errorCallback);
        }

        _replaceStillAsset(asset) {
            const assetsWithoutStill = this.assets().filter((a) => {
                return a.type !== 'still_image';
            });
            this._mediaData.assets = assetsWithoutStill;
            this._mediaData.assets.push(asset);
        }

        _shortAnimArgs(args) {
            if (typeof args[0] === 'function') {
                return {
                    callback: args[0]
                };
            }
            return merge({}, args[0], {
                callback: args[1]
            });
        }
    }

    Player.FAILED = -1;
    Player.PROCESSING = 1;
    Player.QUEUED = 0;
    Player.READY = 2;
    Player.asset = Assets.one;
    Player.assets = Assets.filter;
    Player.assetsWithinQualityRange = Assets.withinQualityRange;
    Player.bakeryHosts = () => Assets.BAKERY_HOSTS;
    Player.isBakeryUrl = Assets.isBakeryUrl;
    Player.stillAsset = Assets.still;
    Player.stillUrl = Assets.stillUrl;

    Wistia.mixin(Player.prototype, Wistia.bindable);

    // Allow @warn, @error, @info, etc. in Video subclasses.
    Wistia.mixin(Player.prototype, Wistia.logHelpers);
    Player.prototype._logPrefix = function() {
        return [
            this.constructor.name,
            this.hashedId() || 'no hashedId',
            this._embedContainer ? .id,
            this.uuid,
        ];
    };

    // Monkey-patch trigger to also trigger on the public API. This is more
    // efficient than marshalling.
    const oldTrigger = Player.prototype.trigger;
    Player.prototype.trigger = function(...args) {
        oldTrigger.apply(this, args);
        return this.publicApi._triggerNoImpl(...args);
    };

    // Define all methods that don't exist from the Wistia.PublicApi prototype as
    // proxy methods on the Player prototype.
    Object.getOwnPropertyNames(Wistia.PublicApi.prototype).forEach((propName) => {
        const propVal = Wistia.PublicApi.prototype[propName];
        if (typeof propVal === 'function' && !Object.hasOwn(Player.prototype, propName)) {
            (function(propName, propVal) {
                Player.prototype[propName] = function(...args) {
                    return this.publicApi[propName](...args);
                };
                Player.prototype[propName]._originalMethod = propVal;
            })(propName, propVal);
        }
    });

    Wistia.Player = Wistia.Video = Player;
})(window.Wistia);