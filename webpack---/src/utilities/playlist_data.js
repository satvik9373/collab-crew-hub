import {
    Wistia
} from 'wistia_namespace.js';
import {
    proto as urlProto
} from 'utilities/url.js';
import {
    cdnFastWistiaComHost
} from 'utilities/hosts.js';
import {
    wlog
} from 'utilities/wlog.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';

if (Wistia._remotePlaylist == null) {
    Wistia._remotePlaylist = {};
}

// e.g. Wistia.remote.playlist("abcd1234", function(media) { ... });
export const fetchPlaylist = (playlistId, callback) => {
    const cachedData = Wistia._remotePlaylist[playlistId];
    if (cachedData) {
        doTimeout(`remote-playlist.${playlistId}.${seqId()}`, () => {
            callback(cachedData);
        });
    } else {
        const url = `${urlProto()}//${cdnFastWistiaComHost()}/embed/playlists/${playlistId}.json`;
        fetch(url)
            .then((resp) => resp.json())
            .then((playlist) => {
                Wistia._remotePlaylist[playlistId] = playlist;
                callback(playlist);
            })
            .catch(() => {
                wlog.error(`Timed out fetching ${url}`);
            });
    }
};