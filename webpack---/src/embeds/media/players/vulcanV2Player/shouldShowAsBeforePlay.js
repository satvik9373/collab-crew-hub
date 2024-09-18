import {
    cachedDetect
} from 'utilities/detect.js';

const detect = cachedDetect();

const shouldShowAsBeforePlay = function(video) {
    const lastPlay = video.lastPlayInfo();
    const timeSincePlay = Date.now() - lastPlay.issuedAt;

    const playNeverIssued = !lastPlay.source || lastPlay.rejectedAt;
    const pendingPlayFromRecentClick =
        lastPlay.isPending && lastPlay.source === 'user-event' && timeSincePlay < 2000;
    const hasReset =
        video._opts && video._attrs.endVideoBehavior === 'reset' && video.state() === 'ended';
    const autoPlayProbablyWontWork =
        lastPlay.isPending &&
        lastPlay.source === 'non-user-event' &&
        !video.isMuted() &&
        (video._attrs.silentAutoplay === false || video._attrs.silentAutoplay == null) &&
        (detect.iphone || detect.ipad || detect.safari);

    return (
        video.up() &&
        (video.state() === 'beforeplay' || hasReset) &&
        (playNeverIssued || autoPlayProbablyWontWork || pendingPlayFromRecentClick || hasReset)
    );
};

export default shouldShowAsBeforePlay;