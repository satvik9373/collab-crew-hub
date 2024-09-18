/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    globalEventLoop
} from 'utilities/event_loop.js';

(function(Wistia) {
    if (Wistia._initializers != null ? Wistia._initializers.initEventLoop : undefined) {
        return;
    }

    Wistia._initializers.initEventLoop = () =>
        // This will set Wistia.eventLoop if it's not set already.
        (Wistia.eventLoop = globalEventLoop);

    return (Wistia._destructors.destroyEventLoop = function() {
        if (Wistia.eventLoop != null) {
            Wistia.eventLoop.stop();
        }
        return (Wistia.eventLoop = null);
    });
})(window.Wistia);