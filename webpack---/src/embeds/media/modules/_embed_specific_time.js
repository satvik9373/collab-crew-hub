import {
    onFindApiHandle,
    ALL_API_HANDLES_KEY
} from '../../../utilities/onFindApiHandle.ts';
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// This makes the first embedded video seek to a time derived from the host page's 'wtime' param if given.
//
((Wistia) =>
    (Wistia._initializers.initSpecificTime = function() {
        try {
            // Execute only if E-v1.js is called from the host page
            if (parent !== self) {
                return;
            }
            // And if there is a wtime param in the URL
            const time = location.href.match(/[?&]wtime=([\dhms]*)/);
            const hashedId = location.href.match(/[?&]wvideo(id)?=([^&]+)/) ? .[2];
            if (!(time ? .length >= 2)) {
                return;
            }
            // And if this function has been initiated (reduces the probability of collisions)
            if (Wistia._specificTimeInitiated) {
                return;
            }
            Wistia._specificTimeInitiated = true;
            let foundAVideo = false;
            return onFindApiHandle({
                matcher: ALL_API_HANDLES_KEY,
                shouldOnlyRunWhenVisible: true,
                functionToRun: (video) => {
                    if (hashedId && video.hashedId() !== hashedId) {
                        return;
                    }

                    // And finally, only set the time when a video was not immediately found
                    if (!foundAVideo) {
                        foundAVideo = true;
                        video.embedded(() => video.popover ? .show());
                        return video.time(time[1]).play();
                    }
                },
            });
        } catch (e) {
            Wistia.error(e);
            return (Wistia._specificTimeInitiated = false);
        }
    }))(window.Wistia);