import {
    uniqId
} from 'utilities/uniqId.js';
import {
    pageLoaded
} from 'utilities/elem.js';
import {
    isVisitorTrackingEnabled
} from 'utilities/trackingConsentApi.js';
import {
    PlaySession
} from './ds/index.js';
import {
    getOrSetIsFirst
} from './util/getOrSetIsFirst.js';
import {
    Client
} from './api/Client.js';

class LiveMediaTracker {#
    clockStart;

    #
    api;

    #
    client;

    #
    events = [];

    #
    intervals = {};

    #
    playSession;

    constructor(publicApi) {
        this.#clockStart = Date.now();
        this.#api = publicApi;
    }

    get meta() {
        return this.#playSession ? .meta;
    }

    get lastEvent() {
        return this.#playSession ? .lastEvent;
    }

    get isPlaying() {
        return this.#playSession ? .isPlaying;
    }

    get captionsEnabled() {
        return !!this.#api.getSelectedCaptions();
    }

    get isLive() {
        return !!this.#api._mediaData ? .liveStreamEventDetails ? .startedAt;
    }

    get hashedId() {
        return this.#api.hashedId();
    }

    get shouldAnonymizeIp() {
        return Boolean(this.#api._opts.anonymizeIp || !isVisitorTrackingEnabled());
    }

    get email() {
        return this.#api.email();
    }

    monitor() {
        if (this.#api.doNotTrack()) return;

        this.stopMonitoring();
        this.#api.hasData(() => pageLoaded(this.#onLoad));
    }

    stopMonitoring() {
        this.#send();
        this.#clearInterval('flush');
        this.#clearInterval('update');

        document.removeEventListener('visibilitychange', this.#onVisibilityChange);

        this.#api.unbind('play', this.#onPlay);
        this.#api.unbind('pause', this.#onPause);
        this.#api.unbind('seek', this.#onSeek);
        this.#api.unbind('end', this.#onEnd);
        this.#api.unbind('annotation-impression', this.#onAnnotationImpression);
        this.#api.unbind('annotation-click', this.#onAnnotationClick);
    }

    // Required by tracker interface
    timeDelta() {
        return new Date().getTime() - this.#clockStart;
    }

    // Required by tracker interface
    eventKey() {
        return this.meta ? .session_key;
    }

    // Required by tracker interface
    visitorKey() {
        return this.#api.visitorKey();
    }

    #
    onLoad = () => {
        const mediaData = this.#api._mediaData;
        this.#events = [];
        this.#client = new Client(mediaData.analyticsHost);

        const first = getOrSetIsFirst(this.hashedId, PlaySession.Scope.LIVE_EVENT, 'load');
        this.#playSession = PlaySession.load(
            this.#clockStart, {
                visitor_key: this.#api.visitorKey(),
                session_key: uniqId(`${Date.now().toString().substring(0, 7)}_`),
                embed_url: this.#api._attrs.pageUrl,
                referrer_url: this.#api._attrs.referrerUrl,
                account_id: mediaData.accountId,
                live_stream_event_id: mediaData.liveStreamEventDetails.id,
                media_id: mediaData.mediaId,
                media_type: 'Video',
                player_type: 'modern',
            }, {
                first,
                scope: PlaySession.Scope.LIVE_EVENT,
                captions: this.captionsEnabled,
                live: this.isLive,
                email: this.email,
            },
        );

        this.#track(this.lastEvent, {
            force: true
        });

        document.addEventListener('visibilitychange', this.#onVisibilityChange);

        // In case loading finishes after the player has started playing
        if (this.#api.state() === 'playing') this.#onPlay();

        this.#api.bind('play', this.#onPlay);
        this.#api.bind('pause', this.#onPause);
        this.#api.bind('seek', this.#onSeek);
        this.#api.bind('end', this.#onEnd);
        this.#api.bind('annotation-impression', this.#onAnnotationImpression);
        this.#api.bind('annotation-click', this.#onAnnotationClick);
        this.#intervals.flush = setInterval(this.#send, 5000);
    };

    #
    onPlay = () => {
        const first = getOrSetIsFirst(
            this.hashedId,
            PlaySession.Scope.LIVE_EVENT,
            PlaySession.Event.PLAY,
        );
        const captions = this.captionsEnabled;
        this.#playSession = this.#playSession.play(Date.now(), this.#api.time(), {
            first,
            captions,
            live: this.isLive,
            email: this.email,
        });
        const force = this.#playSession.lastEvent.event === PlaySession.Event.PLAY;
        this.#track(this.lastEvent, {
            force
        });

        this.#intervals.update = setInterval(this.#onUpdate, 5000);
    };

    #
    onPause = () => {
        this.#clearInterval('update');

        this.#playSession = this.#playSession.pause(Date.now(), this.#api.time(), {
            captions: this.captionsEnabled,
            live: this.isLive,
            email: this.email,
        });

        this.#track(this.lastEvent);
    };

    #
    onUpdate = () => {
        if (this.isPlaying) {
            this.#playSession = this.#playSession.update(Date.now(), this.#api.time(), {
                captions: this.captionsEnabled,
                live: this.isLive,
                email: this.email,
            });
            this.#track(this.lastEvent);
        }
    };

    #
    onSeek = (to, from) => {
        this.#playSession = this.#playSession.seek(Date.now(), from, to, {
            captions: this.captionsEnabled,
            live: this.isLive,
            email: this.email,
        });
        this.#track(this.lastEvent);
    };

    #
    onEnd = () => {
        this.#playSession = this.#playSession.end(Date.now(), this.#api.time(), {
            captions: this.captionsEnabled,
            live: this.isLive,
            email: this.email,
        });
        this.#track(this.lastEvent, {
            force: true
        });
    };

    #
    onVisibilityChange = () => {
        if (this.isPlaying) {
            this.#playSession = this.#playSession.focusChange(Date.now(), this.#api.time(), {
                focus: !document.hidden,
                captions: this.captionsEnabled,
                live: this.isLive,
                email: this.email,
            });

            this.#track(this.lastEvent);
        }
    };

    #
    onAnnotationImpression = ({
        annotationId
    }) => {
        const first = getOrSetIsFirst(
            this.hashedId,
            PlaySession.Scope.LIVE_ANNOTATION,
            `impression_${annotationId}`,
        );
        this.#playSession = this.#playSession.annotationImpression(
            Date.now(),
            this.#api.time(),
            annotationId, {
                first,
                captions: this.captionsEnabled,
                live: this.isLive,
                email: this.email,
            },
        );

        this.#track(this.lastEvent);
    };

    #
    onAnnotationClick = ({
        annotationId
    }) => {
        const first = getOrSetIsFirst(
            this.hashedId,
            PlaySession.Scope.LIVE_ANNOTATION,
            `click_${annotationId}`,
        );
        this.#playSession = this.#playSession.annotationClick(
            Date.now(),
            this.#api.time(),
            annotationId, {
                first,
                captions: this.captionsEnabled,
                live: this.isLive,
                email: this.email,
            },
        );

        this.#track(this.lastEvent);
    };

    #
    track(event, {
        force = false
    } = {}) {
        this.#api.debug(event);
        this.#events = [...this.#events, event];

        if (force) this.#send();
    }

    #
    send = () => {
        if (this.#events.length === 0) return;

        const events = this.#events;
        const data = {
            ...this.#playSession.meta,
            events,
            anonymize_ip: this.shouldAnonymizeIp,
        };
        this.#events = [];

        this.#api.debug('Submitting events', data);
        this.#client
            .liveStream(data)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(
                        `Failed to send tracking events. Server responded with status: ${resp.status}`,
                    );
                }
            })
            .catch((error) => {
                this.#api.error(error);
                // Requeue events to be sent in next batch
                this.#events = [...events, ...this.#events].sort((ev1, ev2) => ev1.time - ev2.time);
            });
    };

    #
    clearInterval(name) {
        if (this.#intervals[name]) {
            clearInterval(this.#intervals[name]);
            delete this.#intervals[name];
        }
    }
}

export {
    LiveMediaTracker
};