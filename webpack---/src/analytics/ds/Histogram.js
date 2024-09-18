import {
    InclusiveRange
} from './InclusiveRange.js';

class Histogram {#
    buckets;

    constructor(buckets = []) {
        this.#buckets = buckets;
    }

    get buckets() {
        return this.#buckets;
    }

    valueAt(index) {
        return this.buckets[index] || 0;
    }

    union(range) {
        if (!range) return this;

        let buckets = [...this.buckets];

        range.foreach((bucket) => {
            buckets[bucket] = this.valueAt(bucket) + 1;
        });

        // Fill in zeros for blank entries
        new InclusiveRange(0, range.start - 1).foreach((bucket) => {
            buckets[bucket] = this.valueAt(bucket);
        });

        return new Histogram(buckets);
    }

    chunkInRangeBy(range, fun) {
        const empty = Symbol('empty');

        const {
            chunks
        } = range.reduce(
            ({
                chunks,
                flip
            }, bucket) => {
                const item = {
                    bucket,
                    value: this.valueAt(bucket)
                };
                const flop = fun(item);

                if (flip !== flop) {
                    return {
                        chunks: [
                            [item], ...chunks
                        ],
                        flip: flop
                    };
                }
                const [chunk, ...other] = chunks;
                return {
                    chunks: [
                        [...chunk, item], ...other
                    ],
                    flip
                };
            }, {
                chunks: [],
                flip: empty
            },
        );

        return chunks.reverse();
    }
}

export {
    Histogram
};