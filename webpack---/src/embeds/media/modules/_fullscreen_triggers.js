/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import * as Elem from 'utilities/elem.js';

(function(Wistia) {
    if (Wistia._onFullscreenChange == null) {
        Wistia._onFullscreenChange = function() {
            if (Elem.fullscreenElement()) {
                return Wistia.trigger('enterfullscreen', Elem.fullscreenElement());
            }
            return Wistia.trigger('cancelfullscreen');
        };
    }

    Wistia._initializers.initFullscreenTriggers = function() {
        // The fullscreenchange event is a global thing, not for a specific element.
        // This sets up one binding that marshalls the fullscreenchange event so we
        // can receive it like Wistia.bind 'fullscreenchange', (theElem) -> ...
        //
        // If embed codes use it, they should examine theElem to figure out if it's
        // actually the embed going fullscreen, and not something else on the page.
        Elem.elemRebind(document, 'webkitfullscreenchange', Wistia._onFullscreenChange);
        return Elem.elemRebind(document, 'fullscreenchange', Wistia._onFullscreenChange);
    };

    return (Wistia._destructors.destroyFullscreenTriggers = function() {
        Elem.elemUnbind(document, 'webkitfullscreenchange', Wistia._onFullscreenChange);
        return Elem.elemUnbind(document, 'fullscreenchange', Wistia._onFullscreenChange);
    });
})(window.Wistia);