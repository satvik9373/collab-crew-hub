import {
    Wistia
} from 'wistia_namespace.js';
import {
    wData
} from 'utilities/wistiaData.js';
import {
    mediaDataTransforms
} from 'utilities/media-data-transforms.js';
import {
    elemAppend,
    elemFromObject,
    elemPrepend,
    pageLoaded,
    elemRemove
} from 'utilities/elem.js';
import {
    getLastTime,
    atOrNearBeginning,
    atOrNearEnd
} from 'utilities/resumableVideoData.js';
import {
    isMouseDownRecently
} from 'utilities/isMouseDown.js';
import {
    parentFramesLength
} from 'utilities/core.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    clone
} from 'utilities/obj.js';
import {
    READY,
    numericSizeSnapped
} from 'utilities/assets.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    PlayerBehavior
} from './PlayerBehavior.js';
import {
    multivariantM3u8Url
} from '../engines/hls_video/hls_assets.js';

class EmbedBehavior extends PlayerBehavior {
    init() {
        this.unbinds.push(
            this.impl.on('playerbackgroundcolorchange', this.updateBackgroundColor),
            this.impl.publicApi.on('transitiondone', this.updateBackgroundColor),
            this.impl.on('playpending', this.updateStartPosition),
        );
    }

    embed(oldImpl) {
        const impl = this.impl;
        const oldImplFromOpts = impl && impl._opts.oldImpl;
        impl.oldImpl = oldImplFromOpts || oldImpl;

        if (oldImplFromOpts && oldImplFromOpts !== oldImpl) {
            // If we've passed an impl from outside this chrome, we're going to be
            // taking over its content as part of this procedure, which would screw
            // it up if we want that video to live on. But after we've initialized
            // with its <video> element, we can give it a whole new engine and let it
            // start fresh by calling rebuild(). We then call fullRebuild() since it
            // won't destroy the <video> that's passed over, and it will make it so
            // the originating video is a "fresh" and playable.
            this.impl.on('engine-initialized', () => {
                oldImplFromOpts.rebuild();
                oldImplFromOpts.fullRebuild();
            });
            impl.oldImpl = oldImplFromOpts;
        } else {
            impl.oldImpl = oldImpl;
        }

        impl.resetStateVariables();

        impl.videoWrapper = elemFromObject({
            class: 'w-video-wrapper w-css-reset',
            style: {
                width: '100%',
                height: '100%',
            },
        });
        this.updateBackgroundColor();
        elemPrepend(impl.implContainer(), impl.videoWrapper);

        if (!impl.uiContainer) {
            impl.uiContainer = elemFromObject({
                class: 'w-ui-container',
                style: {
                    height: '100%',
                    pointerEvents: impl._inNativeMode() ? 'none' : '',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                },
            });
            elemAppend(impl.implContainer(), impl.uiContainer);
        }

        impl.uiContainer.addEventListener('focusin', this.onFocusIn);

        impl.up(async () => {
            this._preloadPreference = this.preloadValue();

            // DRM-Lite Authorization check!
            // For DRM-Lite, we want to ensure that the m3u8 manifest does not error out before
            // initializing the engine.
            //
            // we don't get very good errors from the <video /> (especially in mobile safari), so we cannot tell if the error
            // is from authorization if we just try and playback normally. we have to make an extra request for the manifest
            // ourselves to ensure all is good.
            //
            // If it does, we will rebuild the player into a NotPlayablePlayer state.
            if (impl._mediaData.protected && impl._attrs.authorization) {
                const url = multivariantM3u8Url({
                    mediaData: impl._mediaData,
                    attributes: this.engineAttributes(),
                });

                const rebuildIntoNotPlayable = (message) => {
                    impl.replaceWith(impl.hashedId(), {
                        notPlayableOptions: {
                            fadeIn: false,
                            message,
                            shouldRefresh: false,
                        },
                        playerForce: 'notplayable',
                    });
                };

                try {
                    const resp = await fetch(url, {
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                    });

                    if (!resp.ok && String(resp.status).startsWith(4)) {
                        rebuildIntoNotPlayable('This video is set to private.');
                    }
                } catch {
                    rebuildIntoNotPlayable('This video cannot be played.');
                }
            }

            // If we're replacing, we need to do some stuff with the engine inline
            // to make autoPlay-on-replacement work. Hope we prefetched it already!
            if (impl._replacing) {
                this.initializeEngine();
                impl.info('embedded');
                impl.embedded(true);
            }

            // UI setup is synchronous right now, but that's not guaranteed forever,
            // so let's design with that in mind.
            impl.renderUI().then(() => {
                try {
                    impl.setupBindings();
                } catch (e) {
                    setTimeout(() => {
                        throw e;
                    }, 0);
                }

                doTimeout(
                    `${impl.uuid}.finish_embedding`,
                    () => {
                        impl.info('embedded');
                        impl.embedded(true);

                        pageLoaded(() => {
                            this.initializeEngine();
                        });
                    },
                    0,
                );
            });
        });

        if (impl.down()) {
            impl.embedded(true);
        }
    }

    onFocusIn = () => {
        const shouldShowFocusOutline = !isMouseDownRecently();

        if (this.impl) {
            this.impl.isKeyboardFocused(shouldShowFocusOutline);
        }
    };

    preloadValue() {
        const impl = this.impl;
        let statedPref;
        if (impl._attrs.autoplay && !impl.publicApi.popover && impl.looksUp()) {
            statedPref = 'auto';
        } else if (impl._attrs.preload != null) {
            statedPref = impl._attrs.preload;
        } else {
            statedPref = impl._mediaData.preloadPreference;
        }

        let result;
        if (impl._mediaData.spherical) {
            // Hi, it's Brendan. I have been encountering a race condition that's
            // next to impossible to track down. On occasion, if you have several
            // 360 videos on a page (and maybe if you have just one), you can get
            // into a state where Chrome thinks that crossorigin='anonymous' is NOT
            // set for your video and throws tons of security errors when you try
            // to use the video as a texture. Schnur suggested that there may be a
            // Chrome bug related to the preload metadata where it starts getting
            // data for the video before internally registering its allowed to be
            // used cross-origin. Eek. In any case, impl seems to fix it.
            // XXX: When we're fully HLS, let's remove impl because it won't matter
            // as all 360 video will use HLS and not mp4 <video> elts.
            if (impl._opts._inIframe) {
                result = 'none';
            } else {
                const handles = [];
                const apiEmbeds = wData('video');
                for (let k in apiEmbeds) {
                    handles.push(apiEmbeds[k]);
                }
                if (handles.length > 1) {
                    // We're not the first video on the page: don't preload
                    result = 'none';
                } else {
                    // We're likely the first video: let's preload!
                    result = 'auto';
                }
            }
        } else if (statedPref === 'metadata') {
            result = 'metadata';
        } else if (statedPref === true || statedPref === 'auto') {
            result = 'auto';
        } else if (statedPref === false || statedPref === 'none') {
            result = 'none';
        } else {
            // figure out if there are other videos on the page already.
            // iframes keep track of other iframes via wistiaEmbed._otherIframes.
            const handles = [];
            const apiEmbeds = wData('video');
            for (let k in apiEmbeds) {
                handles.push(apiEmbeds[k]);
            }

            if (impl._opts._inIframe && top !== parent) {
                // we have an iframe-within-an-iframe situation. too complicated.
                // don't preload.
                result = 'none';
            } else if (impl._opts._inIframe && parentFramesLength() > 25) {
                // There are a ton of iframes on the parent page, so our iframe script
                // won't have bothered to find other wistia iframes.
                result = 'none';
            } else if (impl._opts._inIframe && (!window._allIframes || window._allIframes.length > 2)) {
                // if an iframe is not one of the first 2 on the page, don't preload.
                result = 'none';
            } else if (!impl._opts._inIframe && handles.length > 2) {
                // if an api embed and is not one of the first 2 on the page, don't
                // preload.
                result = 'none';
            } else if (
                impl._mediaData.stats &&
                impl._mediaData.stats.loadCount > 5000 &&
                impl._mediaData.stats.uniquePlayCount / impl._mediaData.stats.uniqueLoadCount < 0.1
            ) {
                // impl video has a low play rate (tons of loads, few plays) so default
                // preload to 'none'. The reason for impl is we don't want to charge
                // a customer for tons of bandwidth in the case they embed a video on
                // their homepage that barely gets played.
                result = 'none';
            } else {
                // impl is the default case: suck down that data!
                result = 'metadata';
            }
        }

        return result;
    }

    rebuild() {
        const impl = this.impl;
        impl.info('rebuild');
        impl.trigger('beforerebuild');
        impl.embedded(() => {
            impl.embedded(false);
            impl.ready(false);

            // We can't simply remove @wrapperElem here because impl.ui has
            // bindings set up internally that need to be unbound to avoid leaks.
            impl.removeBehaviors();
            impl.enginePromise = null;
            impl.engine = null;
            impl._oldVideoElem = impl.elem();
            impl._whenVideoElementInDom = null;
            impl.stopStreaming();
            elemRemove(impl.videoWrapper);
            impl.videoWrapper = null;
            impl.ui = null;
            impl._lastPlayType = null;
            impl._lastPlaySource = null;
            impl._lastPlayIssuedAt = null;
            impl._lastPlayResolvedAt = null;
            impl._lastPlayRejectedAt = null;
            impl.wipeOutstandingAsyncFunctions();
            impl.setupBehaviors();
            impl.embed();
            impl.trigger('afterrebuild');
        });
        return impl;
    }

    checkForReady() {
        const impl = this.impl;
        impl._checkDownState();
        impl.up(() => {
            impl.embedded(() => {
                impl.onDimensionChangeSafe();
                if (!impl.engine) {
                    return;
                }
                impl.engine.onReady().then(() => {
                    impl.onDimensionChangeSafe();
                    impl.ready(true);
                });
            });
        });
    }

    cleanOldImplEngine() {
        this.impl.oldImpl = null;

        if (this.impl.embedElement._oldEngine) {
            this.impl.embedElement._oldEngine = null;
        }
    }

    initializeEngine() {
        const impl = this.impl;
        if (!impl) {
            return;
        }
        if (impl.enginePromise) {
            return impl.enginePromise;
        }
        const modulePath = impl.bestEngine();
        return (impl.enginePromise = dynamicImport(`assets/external/${modulePath}`).then((mod) => {
            const EngineClass = mod.default;
            if (!impl.grid) {
                // the video may have been removed while we were initializing.
                return;
            }
            try {
                impl._mediaData = mediaDataTransforms(impl._mediaData, impl._opts);
                impl.engine = new EngineClass(
                    impl.videoWrapper,
                    impl._mediaData,
                    this.engineAttributes(),
                    this.otherEngine(),
                );

                this.cleanOldImplEngine();
                impl.trigger('engine-initialized');
                impl.setupBindings();
                this.checkForReady();
            } catch (e) {
                impl.error(e);
            }
        }));
    }

    engineAttributes() {
        const impl = this.impl;

        let videoQuality;
        if (impl._opts.videoQuality) {
            videoQuality = impl._opts.videoQuality;
        } else if (impl._opts.videoFoam || impl.videoWidth() >= 720) {
            videoQuality = 'md';
        }

        let savedBandwidth;
        if (impl._bandwidthTest().isFresh()) {
            savedBandwidth = impl._bandwidthTest().savedResult().clientKbps;
        }

        let secondaryMediaData;
        if (impl._mediaData.secondaryMediaData) {
            secondaryMediaData = clone(impl._mediaData.secondaryMediaData);
        } else if (impl._opts.secondaryVideoUrl) {
            const mediaData = clone(impl._mediaData);
            const original = impl.originalAsset();
            mediaData.assets = [{
                container: 'mp4',
                ext: 'mp4',
                codec: 'x264',
                public: true,
                url: impl._opts.secondaryVideoUrl,
                height: original.height,
                width: original.width,
                type: 'mp4_video',
                display_name: `${numericSizeSnapped(original.width, original.height)}p`,
                status: READY,
                created_at: new Date().getTime(),
            }, ];
            secondaryMediaData = mediaData;
        }

        let layoutTiming = impl._opts.layoutTiming;
        if (impl._opts.twoStroke && impl._opts.twoStroke.layoutTiming) {
            layoutTiming = impl._opts.twoStroke.layoutTiming;
        }

        // It's important to pass the startPosition here before we set up the engine if we
        // think we might be Resuming. This is because our Preloading logic will need to know
        // the startPosition in order to preload the right frags.
        //
        // If a scenario arises where we want to bail on Resuming before play, that is handled
        // in the playpending callback.
        let startPosition;

        if (impl._startPosition || impl.shouldResume()) {
            startPosition = impl._startPosition || getLastTime(impl.hashedId());
        }

        // do some metrics counting if the video would have resumed, but is outside the
        // time boundaries
        if (impl.isResumableEnabled()) {
            if (atOrNearBeginning(impl.hashedId())) {
                Wistia.Metrics.videoCount(impl, 'player/resumable-close-to-beginning');
            } else if (atOrNearEnd(impl.hashedId(), impl.duration())) {
                Wistia.Metrics.videoCount(impl, 'player/resumable-close-to-end');
            }
        }

        const isTrimDisabled = impl._opts.trimStart === 0 && impl._opts.trimEnd === -1;

        const isBackgroundTransparent = impl._attrs.transparentLetterbox === true;

        return {
            assetHost: impl._opts.assetHost,
            authorization: impl._attrs.authorization,
            backgroundColor: isBackgroundTransparent ? 'transparent' : impl.playerBackgroundColor(),
            clipForPoster: impl._opts.clipForPoster,
            clipFrom: impl._opts.clipFrom,
            clipTo: impl._opts.clipTo,
            controls: impl._inNativeMode(),
            cuts: impl._opts.cuts,
            deliveryCdn: impl._opts.deliveryCdn,
            duration: impl._mediaData.duration,
            embedHost: impl._opts.embedHost,
            forceInstantHls: impl._opts.forceInstantHls,
            fitStrategy: impl._opts.fitStrategy,
            hashedId: impl.hashedId(),
            height: impl.videoHeight(),
            hls: impl._opts.hls,
            layoutTiming,
            liveMedia: impl.isLiveMedia(),
            loop: impl._attrs.endVideoBehavior === 'loop',
            muted: impl._muted,
            password: impl._opts.password, // used by HLS for password protected m3u8 manifests
            playsinline: true,
            preload: this._preloadPreference,
            qualityMax: impl._attrs.qualityMax,
            qualityMin: impl._attrs.qualityMin,
            savedBandwidth,
            secondaryMediaData,
            silentAutoplay: impl._attrs.silentAutoplay,
            startPosition,
            trimEnd: isTrimDisabled ? undefined : impl._opts.trimEnd,
            trimStart: isTrimDisabled ? undefined : impl._opts.trimStart,
            videoQuality,
            volume: impl._attrs.volume,
            width: impl.videoWidth(),
        };
    }

    otherEngine() {
        const impl = this.impl;
        if (impl.oldImpl ? .engine) {
            return impl.oldImpl ? .engine;
        }

        if (impl.embedElement ? ._oldEngine) {
            return impl.embedElement ? ._oldEngine;
        }

        return null;
    }

    updateBackgroundColor = () => {
        const impl = this.impl;
        if (!impl.videoWrapper || impl._replacing || !impl.embedded()) {
            return;
        }

        // impl.ui might not be defined at this point if the video is hidden, since
        // we will have delayed initializing the UI until it comes to an "up" state.
        const isGifLike =
            impl.ui &&
            impl.ui.isChromeless() &&
            (impl.lastPlayInfo().source === 'non-user-event' || impl._attrs.autoplay) &&
            impl.isMuted();

        const isBackgroundTransparent = impl._attrs.transparentLetterbox === true;

        if ((isBackgroundTransparent || isGifLike) && !impl.inFullscreen()) {
            impl.videoWrapper.style.backgroundColor = 'transparent';
        } else {
            const bgColor = impl._attrs.playerBackgroundColor || impl._opts.backgroundColor || '#000';
            impl.videoWrapper.style.backgroundColor = bgColor || '#000';
        }
    };

    // If someone were to try and `play` via the api we should not Resume.
    // Thus, we need to set the engine's startPosition
    // back to the default of -1.
    updateStartPosition = () => {
        const impl = this.impl;
        const stateIsBeforePlay = impl.state() === 'beforeplay';
        const sourceIsUserEvent = impl.lastPlayInfo() ? .source === 'user-event';
        const shouldResume = impl.shouldResume() && sourceIsUserEvent;

        // we should not be updating the start position once playback has begun
        if (!stateIsBeforePlay) {
            return;
        }

        // If we have an engine and know it is an HLS engine, we can update the start position of the hls stream itself,
        // but for non-HLS engines, we will have to manipulate the time and seek.
        if (impl.engine && (impl.engine.name === 'HlsVideo' || impl.engine.name === 'NativeHlsVideo')) {
            // If a video will not attempt to silently autoplay and has been directed to start at a specific time
            // via the wtime param, we should not update the start position.
            const shouldUpdateStartPosition =
                impl._attrs.silentAutoplay !== false || Wistia._specificTimeInitiated !== true;

            if (shouldResume) {
                const resumableTime = getLastTime(impl.hashedId());
                impl.engine.updateStartPosition(resumableTime);
            } else if (shouldUpdateStartPosition) {
                impl.engine.updateStartPosition(-1);
            }
        } else if (shouldResume) {
            const resumableTime = getLastTime(impl.hashedId());
            impl.time(resumableTime, {
                lazy: true
            });
        }
    };
}

EmbedBehavior.handle = 'embed';

export default EmbedBehavior;