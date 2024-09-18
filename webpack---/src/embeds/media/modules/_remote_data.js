/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import * as Hosts from 'utilities/hosts.js';
import * as MediaData from 'utilities/media_data.js';
import * as PlaylistData from 'utilities/playlist_data.js';
import {
    appHostname
} from '../../../appHostname.js';

(function(Wistia) {
    if (Wistia.remote) {
        return;
    }

    Wistia.remote = {};
    Wistia.remote.appHostname = appHostname;
    Wistia.remote.embedHost = Hosts.cdnFastWistiaComHost;
    Wistia.remote.externalEmbedHost = Hosts.cdnFastWistiaNetHost;
    Wistia.remote.appHost = Hosts.appHost;
    Wistia.remote.assetHost = Hosts.deliveryHost;

    // TODO: can be deleted once all outside references are detected and deleted.
    Wistia.remote.media = MediaData.fetchMedia;
    Wistia.cacheMedia = MediaData.cacheMedia;
    Wistia.uncacheMedia = MediaData.uncacheMedia;
    Wistia.mediaFromCache = MediaData.mediaFromCache;
    Wistia.remote.playlist = PlaylistData.fetchPlaylist;
})(window.Wistia);