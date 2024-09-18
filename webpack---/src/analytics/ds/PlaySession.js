import {
    Histogram
} from './Histogram.js';
import {
    InclusiveRange
} from './InclusiveRange.js';

class PlaySession {#
    state;

    static Scope = Object.freeze({
        LIVE_EVENT: 'live_event',
        LIVE_ANNOTATION: 'live_annotation',
    });

    static Event = Object.freeze({
        LOAD: 'load',
        PLAY: 'play',
        SEEK: 'seek',
        PAUSE: 'pause',
        UNPAUSE: 'unpause',
        UPDATE: 'update',
        FOCUS_CHANGE: 'focus_change',
        END: 'end',
        IMPRESSION: 'impression',
        CLICK: 'click',
    });

    static EMPTY_METRICS = {
        unique_played_time: 0,
        unique_played_ranges: [],
        replayed_time: 0,
        replayed_ranges: [],
    };

    static Role = Object.freeze({
        AUDIENCE_MEMBER: 'audienceMember',
    });

    constructor(state) {
        this.#state = state;
    }

    get meta() {
        return this.#state.meta;
    }

    get startedAt() {
        return this.#state.startedAt;
    }

    get isPlaying() {
        return this.#state.inactiveAt === undefined;
    }

    get scope() {
        return this.#state.scope;
    }

    get histogram() {
        return this.#state.histogram;
    }

    get history() {
        return this.#state.history;
    }

    get lastEvent() {
        return this.history[0];
    }

    get position() {
        return this.lastEvent.player_position;
    }

    static load(
        time,
        meta, {
            first = false,
            scope,
            captions = false,
            live = false,
            email,
            focus = true
        } = {},
    ) {
        const event = {
            time,
            event: PlaySession.Event.LOAD,
            scope,
            first,
            live,
            captions,
            email,
            focus,
            ...PlaySession.EMPTY_METRICS,
        };

        return new PlaySession({
            startedAt: time,
            meta,
            scope,
            inactiveAt: time,
            histogram: new Histogram(),
            history: [event],
        });
    }

    play(
        time,
        position, {
            first = false,
            captions = false,
            live = false,
            email,
            focus = true
        } = {},
    ) {
        const event = {
            time,
            event: this.lastEvent.event === PlaySession.Event.LOAD ?
                PlaySession.Event.PLAY :
                PlaySession.Event.UNPAUSE,
            scope: this.scope,
            first,
            live,
            captions,
            email,
            focus,
            player_position: position,
            ...PlaySession.EMPTY_METRICS,
        };

        return new PlaySession({
            ...this.#state,
            inactiveAt: undefined,
            history: [event, ...this.history],
        });
    }

    pause(time, position, {
        captions = false,
        live = false,
        email,
        focus = true
    } = {}) {
        const range = this.#playRangeThrough(position);
        const metrics = this.#calculateMetrics(range);

        const event = {
            time,
            event: PlaySession.Event.PAUSE,
            scope: this.scope,
            live,
            captions,
            email,
            focus,
            player_position: position,
            ...metrics,
        };

        return new PlaySession({
            ...this.#state,
            inactiveAt: time,
            histogram: this.histogram.union(range),
            history: [event, ...this.history],
        });
    }

    seek(time, from, to, {
        captions = false,
        live = false,
        email,
        focus = true
    } = {}) {
        let metrics = PlaySession.EMPTY_METRICS;
        let histogram = this.histogram;
        let inactiveAt = time;

        if (this.isPlaying) {
            const range = this.#playRangeThrough(from);
            metrics = this.#calculateMetrics(range);
            histogram = histogram.union(range);
            inactiveAt = undefined;
        }

        const event = {
            time,
            event: PlaySession.Event.SEEK,
            scope: this.scope,
            live,
            captions,
            email,
            focus,
            previous_player_position: from,
            player_position: to,
            ...metrics,
        };

        return new PlaySession({
            ...this.#state,
            inactiveAt,
            histogram,
            history: [event, ...this.history],
        });
    }

    update(time, position, {
        captions = false,
        live = false,
        email,
        focus = !document.hidden
    } = {}) {
        if (this.isPlaying) {
            const range = this.#playRangeThrough(position);
            const metrics = this.#calculateMetrics(range);

            const event = {
                time,
                event: PlaySession.Event.UPDATE,
                scope: this.scope,
                live,
                captions,
                email,
                focus,
                player_position: position,
                ...metrics,
            };

            return new PlaySession({
                ...this.#state,
                histogram: this.histogram.union(range),
                history: [event, ...this.history],
            });
        }
        return this;
    }

    focusChange(
        time,
        position, {
            focus = !document.hidden,
            captions = false,
            live = false,
            email
        } = {},
    ) {
        if (!this.isPlaying) return this;

        const event = {
            time,
            event: PlaySession.Event.FOCUS_CHANGE,
            scope: this.scope,
            captions,
            live,
            email,
            focus,
            player_position: position,
            ...PlaySession.EMPTY_METRICS,
        };

        return new PlaySession({
            ...this.#state,
            history: [event, ...this.history],
        });
    }

    end(time, position, {
        captions = false,
        live = false,
        email,
        focus = !document.hidden
    } = {}) {
        const range = this.#playRangeThrough(position);
        const metrics = this.#calculateMetrics(range);

        const event = {
            time,
            event: PlaySession.Event.END,
            scope: this.scope,
            live,
            captions,
            email,
            focus,
            player_position: position,
            ...metrics,
        };

        return new PlaySession({
            ...this.#state,
            inactiveAt: time,
            histogram: this.histogram.union(range),
            history: [event, ...this.history],
        });
    }

    annotationImpression(
        time,
        position,
        annotationId, {
            first = false,
            captions = false,
            live = false,
            email,
            focus = !document.hidden
        } = {},
    ) {
        const event = {
            time,
            scope: PlaySession.Scope.LIVE_ANNOTATION,
            event: PlaySession.Event.IMPRESSION,
            first,
            live,
            captions,
            email,
            focus,
            player_position: position,
            annotation_id: annotationId,
            role: PlaySession.Role.AUDIENCE_MEMBER,
            ...PlaySession.EMPTY_METRICS,
        };

        return new PlaySession({
            ...this.#state,
            history: [event, ...this.history],
        });
    }

    annotationClick(
        time,
        position,
        annotationId, {
            first = false,
            captions = false,
            live = false,
            email,
            focus = !document.hidden
        } = {},
    ) {
        const event = {
            time,
            scope: PlaySession.Scope.LIVE_ANNOTATION,
            event: PlaySession.Event.CLICK,
            first,
            live,
            captions,
            email,
            focus,
            player_position: position,
            annotation_id: annotationId,
            role: PlaySession.Role.AUDIENCE_MEMBER,
            ...PlaySession.EMPTY_METRICS,
        };

        return new PlaySession({
            ...this.#state,
            history: [event, ...this.history],
        });
    }

    #
    playRangeThrough(end) {
        const previousEvent = this.lastEvent.event;
        const isContinuation = previousEvent === PlaySession.Event.UPDATE;
        let start = this.position;

        if (isContinuation) start += 1;
        const range = new InclusiveRange(Math.floor(start), Math.floor(end));

        return range.isAscending ? range : undefined;
    }

    #
    calculateMetrics(range) {
        if (!range) return PlaySession.EMPTY_METRICS;

        return this.histogram
            .chunkInRangeBy(range, ({
                value
            }) => value === 0)
            .reduce(
                (metrics, chunk) => {
                    const {
                        bucket: start,
                        value
                    } = chunk.at(0);
                    const {
                        bucket: end
                    } = chunk.at(-1);

                    if (value === 0) {
                        return {
                            ...metrics,
                            unique_played_time: metrics.unique_played_time + chunk.length,
                            unique_played_ranges: [...metrics.unique_played_ranges, {
                                start,
                                end
                            }],
                        };
                    }
                    return {
                        ...metrics,
                        replayed_time: metrics.replayed_time + chunk.length,
                        replayed_ranges: [...metrics.replayed_ranges, {
                            start,
                            end
                        }],
                    };
                }, {
                    unique_played_time: 0,
                    unique_played_ranges: [],
                    replayed_time: 0,
                    replayed_ranges: []
                },
            );
    }
}

export {
    PlaySession,
    Histogram,
    InclusiveRange
};