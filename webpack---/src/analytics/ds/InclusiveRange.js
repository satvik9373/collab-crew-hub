class InclusiveRange {#
    start;

    #
    end;

    constructor(start, end) {
        this.#start = start;
        this.#end = end;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get isEmpty() {
        return this.start == this.end;
    }

    get isAscending() {
        return this.start <= this.end;
    }

    foreach(fun) {
        for (let i = this.start; i <= this.end; ++i) {
            fun(i);
        }
    }

    reduce(fun, initial) {
        let acc = initial;
        this.foreach((num) => {
            acc = fun(acc, num);
        });
        return acc;
    }

    includes(num) {
        const min = Math.min(this.start, this.end);
        const max = Math.max(this.start, this.end);

        return min <= num && num <= max;
    }

    toJSON() {
        return {
            start: this.start,
            end: this.end
        };
    }
}

export {
    InclusiveRange
};