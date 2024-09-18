/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import {
    cachedDetect
} from 'utilities/detect.js';

((Wistia) =>
    (Wistia._initializers.initDetect = function() {
        // Detect on load, to be accessed like Wistia.detect.browser.version > 8
        //
        // NOTE: Do not re-detect. There is an issue with iOS + jQuery 1.10 + multiple
        // declarations of E-v1 that somehow screws up injecting HTML5 video elements
        // into the page.
        if (!Wistia.detect) {
            return (Wistia.detect = cachedDetect());
        }
    }))(window.Wistia);