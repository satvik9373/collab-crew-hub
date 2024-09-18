export class SecondsWatchedTracker {
    constructor(video, duration, options = {}) {
        this.video = video;
        this.duration = duration;
        this.maxWatchingPlaybackRate = options.maxWatchingPlaybackRate || 8;

        this.video.bind('timechange', this.onTimeChange);
        this.video.bind('playbardragend', this.onPlaybarDragEnd);
        this.video.bind('play', this.onPlay);

        this.reset();
    }

    onTimeChange = () => {
        this.lastTimeChangeAt = this.timeChangeAt;
        this.timeChangeAt = Date.now();
    };

    onPlaybarDragEnd = () => {
        this.playbarDragEndAt = Date.now();
    };

    onPlay = () => {
        this.playedAt = Date.now();
    };

    trackSecond(second, options = {
        force: false
    }) {
        const doTrack = () => {
            if (!options.force && this.shouldIgnoreTrack(second)) {
                return;
            }

            if (second >= this._secondsWatched.length) {
                return;
            }

            this._secondsWatched[second] += 1;
            if (this._secondsWatched[second] === 1) {
                this._totalWatched += 1;
            } else {
                this._totalRewatched += 1;
            }
        };
        if (this.isScrubbing()) {
            clearTimeout(this.delayedScrubTimeout);
            this.delayedScrubTimeout = setTimeout(doTrack, this.eventLoopDuration());
        } else {
            doTrack();
        }
    }

    shouldIgnoreTrack(second) {
        // Our attempt to track the final second of the video can come in a little too late
        // after the video has stopped 'playing', so we'll give that one a pass.
        const isFinalSecondAndEnded =
            second === this._secondsWatched.length - 1 && this.video.state() === 'ended';

        // can't watch a video if it's not playing.
        if (this.video.state() !== 'playing' && !isFinalSecondAndEnded) {
            return true;
        }

        // If the playbackRate is well above the range any reasonable player
        // supports, don't count that as watched. It's basically "fast forwarding"
        // at this point.
        //
        // We allow the customer to control this because some customers may want
        // lower thresholds, but setting a low threshold by default could be
        // surprising to existing customers.
        if (this.video.playbackRate() >= this.maxWatchingPlaybackRate) {
            return true;
        }

        // When the playbar is released, we want to count the second that they
        // seeked to if we can. Without this, because we only get one secondchange
        // event per playback second, we always miss that second.
        if (this.justReleasedPlaybar()) {
            return false;
        }

        // Without this, if the user pauses before secondchange fires for a given
        // second, then plays again, we may "miss" that second. So if the video has
        // just started playing at a new time, we want to count that.
        if (this.justPlayed()) {
            return false;
        }

        if (this.isScrubbing()) {
            return true;
        }
    }

    eventLoopDuration() {
        return this.video._impl ? ._eventLoopDuration || 300;
    }

    // If timechange is being triggered more quickly than the event loop, then we
    // can assume the user is scrubbing, whether it's via the playbar or
    // programmatically. We don't want to count that.
    //
    // We check with this instead of explicitly checking for a flag from the
    // playbar because:
    //
    // 1. While "dragging," if you stop moving the mouse, the video can
    // technically be playing back.  2. We don't have a playbar to check against
    // in iOS fullscreen mode.  3. This captures programmatic scrubbing or a
    // really high playback rate too.
    //
    // We check against the eventLoopDuration because it can change based on the
    // playback rate.
    isScrubbing() {
        return this.lastTimeChangeAt && Date.now() - this.lastTimeChangeAt < this.eventLoopDuration();
    }

    justPlayed() {
        return this.playedAt && Date.now() - this.playedAt < this.eventLoopDuration();
    }

    justReleasedPlaybar() {
        return this.playbarDragEndAt && Date.now() - this.playbarDragEndAt < this.eventLoopDuration();
    }

    secondsWatched() {
        return this._totalWatched || 0;
    }

    secondsWatchedVector() {
        return this._secondsWatched;
    }

    reset() {
        clearTimeout(this.delayedScrubTimeout);
        this.timeChangeAt = null;
        this.lastTimeChangeAt = null;
        this.lastPlaybarDragEndAt = null;

        this._secondsWatched = [];
        for (let i = 0; i < Math.ceil(this.duration); i++) {
            this._secondsWatched.push(0);
        }
        this._totalWatched = 0;
        this._totalRewatched = 0;
    }
}