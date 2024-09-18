/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS201: Simplify complex destructure assignments
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// ## PURPOSE
//
// Sometimes you have two discrete values and instead of showing them
// immediately, you want to animate toward those values. That can be useful when
// showing a progress bar or changing a percentage, for instance.
//
// A use case based on time (i.e. using current time as a "seed") is the most
// obvious, but interpolation can also be used to translate between two
// intervals. For example, if you want to get a scrub bar pixel location based
// on the current time of the video, that can also be configured.
//
// Both of the above cases are solveable without this class, but this provides
// a nice way to get values on an arbitrary timeline while also applying an
// easing function.
//
// ## USAGE
//
// Get some basic interpolated values over 10 seconds:
//
// ```javascript
// interpolation = new Interpolation({ seedRange: 10000 })
// setInterval(function() {
//   console.log(interpolation.value());
// }, 500);
// ```
//
// Translate the video's time into a scrub bar position, considering dynamically
// changing width and duration, with quadratic easing (because why not?).
//
// ```javascript
// timeToPx = new Interpolation({
//   seed: function() { return video.time(); },
//   seedRange: function() { return video.duration(); },
//   outputStart: 0,
//   outputEnd: function() { return video.videoWidth(); },
//   easing: Interpolation.easeInOut
// });
//
// video.bind("timechange", function() {
//   video.scrubBar.style.width = "" + Math.round(timeToPx.value()) + "px";
// });
// ```
//
// ## OPTIONS
//
// ### seedRange (required)
//
// Must be an integer representing the maximum seedRange of seed values. This can
// be negative or positive.
//
// ### seedFunction
//
// This is a function used to compute a seed value at a given instant in time.
// When you instantiate an Interpolation, it is immediately called to get a
// starting seed value. It is used to get the current delta when computing the
// `value()` function.
//
// Default assumes a time-based seed:
//
//     function() { return new Date().getTime() }
//
// ### seedStart
//
// The first value to use as a seed. By default this takes on the value of
// `seedFunction()` at time of initialization.
//
// ### outputStart
//
// This is the start value of the output range. Default is 0.
//
// ### outputEnd
//
// This is the end value of the output range. Default is 1.
//
// ### easing
//
// This is a function used to apply a transformation when running `value()`. It
// ships with two built-in easings: `Interpolation.linear`, and
// `Interpolation.easeInOut`. You can write custom easings by providing a
// function like so:
//
// ```javascript
// new Interpolation({
//   range: 10000,
//   easing: function(outputRange, seedDelta, seedRange, outputStart) {
//     // random easing
//     return outputStart + Math.random() * outputRange;
//   });
// });
// ```
//
// For more formulas and explanation, visit http://gizma.com/easing/. If you're
// mapping closely to that page, you can use the same variable names like so:
//
// ```javascript
// new Interpolation({
//   range: 10000,
//   easing: function(c, t, d, b) {
//     // random easing
//     return b + Math.random() * c;
//   });
// });
// ```
export class Interpolation {
    constructor(...args) {
        const obj = args[0];
        const {
            seedRange,
            seedFunction,
            seedStart
        } = obj;
        const val = obj.outputStart;
        const outputStart = val != null ? val : 0;
        const val1 = obj.outputEnd;
        const outputEnd = val1 != null ? val1 : 1;
        const val2 = obj.easing;
        const easing = val2 != null ? val2 : Interpolation.linear;
        if (seedRange == null) {
            throw new Error('Must provide seedRange argument');
        }
        if (seedFunction != null && typeof seedFunction !== 'function') {
            throw new Error('Given seed is not a function');
        }
        if (typeof easing !== 'function') {
            throw new Error(`Invalid easing function given: ${this.easing}`);
        }
        this._seedRange = seedRange;
        this._seedFunction = seedFunction || (() => new Date().getTime());
        this._outputStart = outputStart;
        this._outputEnd = outputEnd;
        this._easing = easing;
        this._seedStart = seedStart ? .() || this.seed();
    }

    seed() {
        return this.seedFunction()();
    }

    seedStart() {
        return this._seedStart;
    }

    seedRange() {
        return this._valOrFn(this._seedRange);
    }

    seedFunction() {
        return this._seedFunction;
    }

    outputStart() {
        return this._valOrFn(this._outputStart);
    }

    outputEnd() {
        return this._valOrFn(this._outputEnd);
    }

    easing() {
        return this._valOrFn(this._easing);
    }

    value() {
        return this._easing(...Array.from(this.easingArgs() || []));
    }

    atEnd() {
        return this.ratio() === 1;
    }

    atStart() {
        return this.ratio() === 0;
    }

    easingArgs() {
        return [this.c(), this.t(), this.d(), this.b()];
    }

    seedDelta() {
        if (this.seedRange() > 0) {
            return Math.min(this.seedRange(), this.seed() - this.seedStart());
        }
        if (this.seedRange() < 0) {
            return Math.max(this.seedRange(), this.seed() - this.seedStart());
        }
        return 0;
    }

    ratio() {
        let ratioChange;
        const seedRange = this.seedRange();
        if (seedRange === 0) {
            return 1;
        }
        return (ratioChange = Math.max(0, Math.min(1, this.seedDelta() / seedRange)));
    }

    // For ease of translation of formulas from http://gizma.com/easing/, setup
    // aliases for our js. A couple basic ones are implemented below.
    c() {
        return this.outputEnd() - this.outputStart();
    }

    t() {
        return this.seedDelta();
    }

    d() {
        return this.seedRange();
    }

    b() {
        return this.outputStart();
    }

    _valOrFn(val) {
        if (typeof val === 'function') {
            return val();
        }
        return val;
    }

    static linear(c, t, d, b) {
        return (c * t) / (d || 1) + b;
    }

    static easeInOut(c, t, d, b) {
        t /= (d || 1) / 2;
        if (t < 1) {
            return (c / 2) * t * t + b;
        }
        t -= 1;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
}