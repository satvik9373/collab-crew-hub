import {
    Wistia
} from 'wistia_namespace.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';

const detect = cachedDetect();

const MEDIA_ERR_DECODE = 3;

class PlaybackErrorHandlingBehavior extends PlayerBehavior {
    init() {
        this.unbinds.push(this.impl.on('error', this.onError));
    }

    onError = () => {
        const impl = this.impl;
        const videoEl = impl.getMediaElement();
        if (!videoEl) {
            return;
        }

        // Paul is having issues playing back Native HLS videos in Safari 11.0.3
        // in vulcan-v2 but not vulcan. I have no explanation as to why this is--
        // the src of the `<video>` is exactly the same and the problem doesn't
        // surface on my computer with the same version of OSX and Safari. I can
        // only surmise it's related to drivers or hardware versions.
        //
        // Anyway, this is an attempt to deal with that error. When we see a
        // decoding error and we're using native HLS, let's immediately rebuild
        // without HLS and start playing.
        if (
            videoEl.error &&
            videoEl.error.code === MEDIA_ERR_DECODE &&
            /native_hls_video/.test(this.impl.bestEngine())
        ) {
            const wasTryingToPlay = impl.lastPlayInfo().isPending;

            // fullRebuild needs a lock on commandQueueOpen to run, but there's
            // probably a lock on it from play() when this error happens. If we don't
            // clear it, we need to wait 5 seconds for it to timeout.
            impl.commandQueueOpen.clearSynchronized();

            const playingString = wasTryingToPlay ? 'playing' : 'not-playing';
            Wistia.Metrics.videoCount(impl, `player/rebuild-non-hls-on-error/${playingString}`);
            this.unbinds.push(
                impl.on('play', () => {
                    Wistia.Metrics.videoCount(impl, `player/rebuild-non-hls-on-error/${playingString}`);
                    return impl.unbind;
                }),
            );

            // Try rebuilding without HLS.
            impl.publicApi.fullRebuild({
                hls: false,
                autoPlay: wasTryingToPlay && !(detect.ios.version && detect.ios.version < 10.1),
            });
        }
    };
}

PlaybackErrorHandlingBehavior.handle = 'playbackErrorHandling';

export default PlaybackErrorHandlingBehavior;