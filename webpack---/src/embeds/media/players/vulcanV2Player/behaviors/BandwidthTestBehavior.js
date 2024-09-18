import {
    Wistia
} from 'wistia_namespace.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';

// NOTE ON WHERE THIS IS RELEVANT:
//
// This is used for the ManualQualityVideo engine in order to determine
// if we should switch to the HD asset on fullscreen.
//
class BandwidthTestBehavior extends PlayerBehavior {
    init() {
        const impl = this.impl;

        // If we haven't determined whether HD is supported, run the test on play.
        impl.embedded(() => {
            if (impl.bestEngine() === 'engines/manual_quality_video.js') {
                if (this.bandwidthTest().isFresh()) {
                    this._supportsHd = this.bandwidthTest().savedResult().supportsHd;
                    this.impl.whenVideoElementInDom().then(() => {
                        this.impl.engine.setAttributes({
                            supportsHd: this._supportsHd
                        });
                    });
                } else if (this.hdAsset()) {
                    this.unbinds.push(
                        impl.on('play', () => {
                            this.doBandwidthTest();
                            return impl.unbind;
                        }),
                    );
                }
            }
        });
    }

    bandwidthTest() {
        if (this._bandwidthTest) {
            return this._bandwidthTest;
        }
        this._bandwidthTest = new Wistia.BandwidthTest({
            timeoutLength: 4000,
            uuid: this.impl.uuid,
            saveKey: 'vulcan.bandwidth',
        });
        return this._bandwidthTest;
    }

    doBandwidthTest() {
        const impl = this.impl;
        impl.info('doBandwidthTest');

        // If there's an interruption in play, give up early.
        if (!this._endBandwidthTestEarly) {
            this._endBandwidthTestEarly = () => {
                impl.info('_endBandwidthTestEarly');
                this.bandwidthTest().endEarly();
                Wistia.Metrics.videoCount(impl, 'player/bandwidth_test/ended_early');
            };
        }
        const bandwidthAffectingEvents = ['seek', 'pause', 'end', 'switched-to-asset-without-load'];
        bandwidthAffectingEvents.forEach((event) => {
            this.unbinds.push(impl.on(event, this._endBandwidthTestEarly));
        });

        // If the video stalls while downloading, bail.
        if (!this._failBandwidthTestOnWaiting) {
            this._failBandwidthTestOnWaiting = () => {
                impl.info('_failBandwidthTestOnWaiting');
                this.bandwidthTest().fail();
                Wistia.Metrics.videoCount(impl, 'player/bandwidth_test/failed');
                return impl.unbind;
            };
        }
        this.unbinds.push(impl.on('waiting', this._failBandwidthTestOnWaiting));

        // Use test results and clean up bindings when the test is finished.
        this._endBandwidthTestOnTime = () => {
            impl.info('_endBandwidthTestOnTime');
            this._supportsHd = this.bandwidthTest().supportsHd();
            impl.engine.setAttributes({
                supportsHd: true
            });
            if (this._failBandwidthTestOnWaiting) {
                impl.unbind('waiting', this._failBandwidthTestOnWaiting);
            }
            if (this._endBandwidthTestEarly) {
                bandwidthAffectingEvents.forEach((event) => {
                    impl.unbind(event, this._endBandwidthTestEarly);
                });
            }
            Wistia.Metrics.videoCount(impl, 'player/bandwidth_test/ended_on_time');
        };
        this.bandwidthTest().bind('ended', this._endBandwidthTestOnTime);
        this.bandwidthTest().start();
    }

    supportsHd() {
        if (this.hdAsset()) {
            if (this._supportsHd != null) {
                return this._supportsHd;
            }
            return true;
        }
        return false;
    }

    hdAsset() {
        if (this._hdAsset) {
            return this._hdAsset;
        }
        const impl = this.impl;
        this._hdAsset = impl.playableAssetInRange({
            width: [980, impl._opts.maxHdWidth || 2000],
            sortBy: 'width desc, bitrate desc',
        });
        return this._hdAsset;
    }
}

BandwidthTestBehavior.handle = 'bandwidthTest';

export default BandwidthTestBehavior;