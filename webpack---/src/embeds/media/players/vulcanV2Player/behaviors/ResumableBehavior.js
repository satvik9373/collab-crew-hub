import {
    getLastTime,
    getResumableKeyForVideo,
    setLastTime,
    setResumableKeyForVideo,
} from 'utilities/resumableVideoData.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';

class ResumableBehavior extends PlayerBehavior {
    init() {
        this._hasPlayed = false;
        this._hashedId = this.impl.hashedId();
        this._unbinds = [];

        this._resumableKey = getResumableKeyForVideo(this._hashedId) || null;
        this.setupBindings();

        // when we initialize, if a resumable key was found, but the video is not
        // within the Resumable time boundaries, it should not be considered a continuation of a
        // video, but a new one. It is important to do it here (in addition to the onsecondchange)
        // because we might send stats before play or before the onsecondchange handler.
        if (!this.impl.shouldResume() && this._resumableKey) {
            this.destroyResumableKey();
        }
    }

    destroy() {
        this._unbinds.forEach((e) => {
            if (typeof e === 'function') {
                e();
            }
        });
        this._unbinds = [];
    }

    destroyResumableKey() {
        setResumableKeyForVideo(this._hashedId, null);
        this._resumableKey = null;
    }

    lastTime() {
        return getLastTime(this._hashedId);
    }

    onEnd = () => {
        // update the lastTime one last time :)
        setLastTime(this._hashedId, this.impl.time());
        this.destroyResumableKey();
    };

    onSecondChange = () => {
        // dont track progress beforeplay
        if (!this._hasPlayed) {
            return;
        }

        setLastTime(this._hashedId, this.impl.time());

        if (!this.impl.shouldResume()) {
            this.destroyResumableKey();
        }

        // if we've reset the resumable key, but new events come in,
        // we need to set the resumable key back to the current event_key
        if (this._resumableKey === null) {
            this.setResumableKeyToEventKey();
        }
    };

    resumableKey() {
        return this._resumableKey;
    }

    setupBindings() {
        this._unbinds.push(
            this.impl.on('play', () => (this._hasPlayed = true)),
            this.impl.on('end', this.onEnd),
            this.impl.on('secondchange', this.onSecondChange),
        );

        // we only want to bind to the first event key change
        const unbindEventKeyChange = this.impl.on('eventkeychange', () => {
            this.initResumableKey();
            unbindEventKeyChange();
        });
    }

    setResumableKeyToEventKey() {
        const eventKey = this.impl.eventKey();

        if (eventKey) {
            this._resumableKey = eventKey;
            setResumableKeyForVideo(this._hashedId, this._resumableKey);
        }
    }

    initResumableKey() {
        // if one exists, dont make a new one
        if (this._resumableKey) {
            return;
        }

        this.setResumableKeyToEventKey();
    }
}

ResumableBehavior.handle = 'resumable';
export default ResumableBehavior;