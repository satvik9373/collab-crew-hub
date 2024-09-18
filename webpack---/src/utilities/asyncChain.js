import {
    StopGo
} from 'utilities/stopgo.js';
import {
    wlog
} from 'utilities/wlog.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';

// Compose all of our functions in stopGos and pass to
// StopGo._drainStopGosAsync, which handles async draining. Add one more after
// the last, so that `then` is naturally on a separate tick too.
export const asyncChain = (prefix, functions, _i = 1) => {
    const stopGos = [];
    for (let fn of functions) {
        (function(fn) {
            const safeFn = function() {
                try {
                    return fn();
                } catch (e) {
                    return wlog.error(e);
                }
            };
            return stopGos.push(new StopGo().run(safeFn));
        })(fn);
    }
    const lastStopGo = stopGos[stopGos.length - 1];
    StopGo._drainStopGosAsync(prefix, stopGos);
    const result = new StopGo();
    lastStopGo.then(() => doTimeout(`${prefix}.last`, () => result.go(), 0));
    return result;
};