import {
    Wistia
} from 'wistia_namespace.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';

class MetricsBehavior extends PlayerBehavior {
    init() {
        this.impl.whenVideoElementInDom().then(() => this.doInit());
    }

    doInit() {
        const impl = this.impl;

        // This is for getting data on time-to-first-byte. If we're preloading, set
        // the timer NOWistia. Otherwise, we wait until 'play' is received to start
        // the timer.
        if (impl.engine && impl.engine.getPreload()) {
            this._startedLoadingAt = Date.now();
        }

        this.unbinds.push(
            impl.on('play', this.onPlay),
            impl.on('progress', this.onProgress),
            impl.on('waiting', this.onWaiting),
            impl.on('clicked-play-before-ready', this.onClickedPlayBeforeReady),
        );
    }

    onPlay = () => {
        if (this._startedLoadingAt == null) {
            this._startedLoadingAt = Date.now();
            return this.impl.unbind;
        }
    };

    onProgress = () => {
        const impl = this.impl;
        if (impl.engine.anyBuffered()) {
            this._firstByteReceivedAt = Date.now();
            if (this._startedLoadingAt != null) {
                this._timeToFirstByte = this._firstByteReceivedAt - this._startedLoadingAt;
            }
            return impl.unbind;
        }
    };

    onWaiting = (duration) => {
        const impl = this.impl;

        // This is a test to see how often we don't get data for various time
        // intervals.
        const receivedAnyVideoData = impl.engine.anyBuffered();
        if (!this._noDataFor5Seconds && duration >= 5 && !receivedAnyVideoData) {
            this._noDataFor5Seconds = true;
            Wistia.Metrics.videoCount(impl, 'player/no-data/5-seconds');
        }
        if (!this._noDataFor10Seconds && duration >= 10 && !receivedAnyVideoData) {
            this._noDataFor10Seconds = true;
            Wistia.Metrics.videoCount(impl, 'player/no-data/10-seconds');
        }
        if (!this._noDataFor15Seconds && duration >= 15 && !receivedAnyVideoData) {
            this._noDataFor15Seconds = true;
            Wistia.Metrics.videoCount(impl, 'player/no-data/15-seconds');
        }
    };

    onClickedPlayBeforeReady = () => {
        Wistia.Metrics.videoCount(this.impl, 'player/clicked-play-before-ready');
    };
}

MetricsBehavior.handle = 'metrics';

export default MetricsBehavior;