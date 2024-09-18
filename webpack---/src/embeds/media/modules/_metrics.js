/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    send,
    count,
    sample
} from 'utilities/metrics.js';
import {
    merge
} from 'utilities/obj.js';
import {
    elemWidth,
    elemHeight
} from 'utilities/elem.js';

(function(Wistia) {
    if (Wistia.Metrics) {
        return;
    }

    return (Wistia.Metrics = {
        count,
        sample,
        send,

        // Used for logging occurrence of an event
        // @param  media   Video   Video embed object
        // @param  key     String  Metrics key to be send to pipedream,
        //                         e.g. 'play' will show as 'player/play' in snowbeast
        // @param  val     Int     Value associated with event
        //                         Most events will use the default of 1
        videoCount(video, key, val, extraData) {
            if (val == null) {
                val = 1;
            }
            if (video._impl ? .engine ? .usingInstantHls ? .()) {
                this.videoSend(video, 'count', `player/instant-hls/${key}`, val, extraData);
            }
            return this.videoSend(video, 'count', key, val, extraData);
        },

        // Used for logging a sampled value, e.g. a timing
        // @param  media   Video   Video embed object
        // @param  key     String  Metrics key to be send to pipedream,
        //                         e.g. 'play' will show as 'player/play' in snowbeast
        // @param  val     Int     Value associated with event
        //                         Can be any jsonifiable value
        videoSample(video, key, val, extraData) {
            return this.videoSend(video, 'sample', key, val, extraData);
        },

        videoSend(video, type, key, val, extraData) {
            if (extraData == null) {
                extraData = {};
            }
            return video.hasData ? .(() => {
                let currentAsset;
                const bandwidth = video.bandwidthTest ? .().savedResult() || {};
                extraData = merge({
                        location: location ? .protocol ? .length && location ? .hostname ? .length ?
                            `${location.protocol}//${location.hostname}` :
                            null,
                        agent: navigator.userAgent,
                        account_key: video._mediaData ? .accountKey,
                        at: video.time(),
                        video_id: video.hashedId(),
                        embed_type: video.playerType,
                        duration: video.duration(),
                        client_kbps: bandwidth.clientKbps,
                        supports_hd: bandwidth.supportsHd,
                        autoplay: !!video._attrs ? .autoplay,
                        in_iframe: top !== self,
                        device_pixel_ratio: window.devicePixelRatio,
                        window_width: elemWidth(window),
                        window_height: elemHeight(window),
                        video_width: video.videoWidth(),
                        video_height: video.videoHeight(),
                        visitor_key: video._tracker ? .visitorKey(),
                        event_key: video._tracker ? .eventKey(),
                        event_time_delta: video._tracker ? .timeDelta(),
                        connection_type: this.connectionType(),
                        version: 9,
                        channel: Wistia.channelName,
                    },
                    extraData,
                );

                if (/romulus|html5|vulcan/.test(video.playerType)) {
                    extraData.errorState = video.elem() ? .error;
                }

                if (video._cacheStatus != null) {
                    extraData.cache_status = video._cacheStatus;
                }
                if (video._assetServer != null) {
                    extraData.asset_server = video._assetServer;
                }
                if (video._cacheHit != null) {
                    extraData.cache_hit = video._cacheHit;
                }
                if (video.inFullscreen) {
                    extraData.in_fullscreen = video.inFullscreen();
                }

                if (video._substream != null) {
                    extraData.substream = video._substream.index;
                    extraData.adaptive = video._substream.adaptive;
                    extraData.current_level = video._substream.currentLevel;
                    extraData.all_level_names = video._substream.allLevelNames;
                    currentAsset = video._substream.asset;
                    extraData.hls_error_counts = video._substream.hlsErrorCounts();
                } else {
                    extraData.substream = null;
                    extraData.adaptive = null;
                    currentAsset = video.data ? .asset;
                }

                if (currentAsset != null) {
                    extraData.asset_type = currentAsset.type;
                    extraData.asset_slug = currentAsset.slug;
                    extraData.bitrate = currentAsset.bitrate;
                    extraData.asset_height = currentAsset.height;
                    extraData.asset_width = currentAsset.width;
                }

                if (video.videoElem ? .buffered ? .length > 0) {
                    extraData.bufferedFrom0 = video.videoElem.buffered.end(0);
                }
                if (video._timeToFirstByte != null) {
                    extraData.time_to_first_byte = video._timeToFirstByte;
                }
                extraData.buffered = video.totalBuffered != null ? video.totalBuffered() : undefined;
                extraData.played = video.totalPlayed != null ? video.totalPlayed() : undefined;

                this.send(type, key, val, extraData);

                if (
                    video._mediaData &&
                    video._mediaData.accountKey &&
                    video._mediaData.accountSpecificMetrics
                ) {
                    return this.send(type, `${video._mediaData.accountKey}/${key}`, val, extraData);
                }
            });
        },

        // Helper to count events on video objects, without accidental double-binding
        countEvent(videoObj, eventName, statsName) {
            if (!statsName) {
                statsName = eventName;
            }
            if (this._private.countEventCallbacks[statsName] == null) {
                this._private.countEventCallbacks[statsName] = this._private.mkCountEventCallback(
                    eventName,
                    statsName,
                );
            }
            return videoObj.rebind(eventName, this._private.countEventCallbacks[statsName]);
        },

        // Helper to count events on video objects, and deal
        // with the possibility of the video object having already
        // been initialized and events bound
        countEventOnce(videoObj, eventName, statsName) {
            if (!statsName) {
                statsName = eventName;
            }
            if (this._private.countEventOnceCallbacks[statsName] == null) {
                this._private.countEventOnceCallbacks[statsName] = this._private.mkCountEventOnceCallback(
                    eventName,
                    statsName,
                );
            }
            return videoObj.rebind(eventName, this._private.countEventOnceCallbacks[statsName]);
        },

        sampleEvent(videoObj, eventName, statsName) {
            if (!statsName) {
                statsName = eventName;
            }
            if (this._private.sampleEventCallbacks[statsName] == null) {
                this._private.sampleEventCallbacks[statsName] = this._private.mkSampleEventCallback(
                    eventName,
                    statsName,
                );
            }
            return videoObj.rebind(eventName, this._private.sampleEventCallbacks[statsName]);
        },

        countShowLoadingOnce(videoObj) {
            let lastDuration = -1;
            return videoObj.bind('waiting', (duration) => {
                if (lastDuration < 2 && duration >= 2) {
                    this.videoCount(videoObj, 'player/show-loading/first', 1);
                    lastDuration = duration;
                    return videoObj.unbind;
                }
                return (lastDuration = duration);
            });
        },

        countShowLoadingAll(videoObj) {
            let lastDuration = -1;
            videoObj.bind('waiting', (duration) => {
                if (lastDuration < 2 && duration >= 2) {
                    this.videoCount(videoObj, 'player/show-loading/all', 1);
                    this.embedTypeBuckets(videoObj.embedElement).forEach((bucket) => {
                        this.videoCount(videoObj, `player/show-loading/all.${bucket}`, 1);
                    });
                }
                return (lastDuration = duration);
            });
            return videoObj.bind('done-waiting', () => (lastDuration = -1));
        },

        countShowLoadingLongTimeOnce(videoObj) {
            let lastDuration = -1;
            return videoObj.bind('waiting', (duration) => {
                if (lastDuration < 5 && duration >= 5) {
                    this.videoCount(videoObj, 'player/show-loading-long-time/first', 1);
                    lastDuration = duration;
                    return videoObj.unbind;
                }
                return (lastDuration = duration);
            });
        },

        countShowLoadingLongTimeAll(videoObj) {
            let lastDuration = -1;
            videoObj.bind('waiting', (duration) => {
                if (lastDuration < 5 && duration >= 5) {
                    this.videoCount(videoObj, 'player/show-loading-long-time/all', 1);
                }
                return (lastDuration = duration);
            });
            return videoObj.bind('done-waiting', () => (lastDuration = -1));
        },

        mobileBuckets() {
            const isMobile =
                Wistia.detect.iphone ||
                Wistia.detect.android ||
                Wistia.detect.blackberry ||
                /mobile/i.test(navigator.userAgent);
            if (isMobile) {
                if (Wistia.detect.iphone) {
                    return ['mobile', 'iphone'];
                }
                if (Wistia.detect.android) {
                    return ['mobile', 'android'];
                }
                return ['mobile'];
            }
            return [];
        },

        embedTypeBuckets(embedElement) {
            if (embedElement ? .tagName === 'WISTIA-PLAYER') {
                if (embedElement ? .useWebComponent === true) {
                    return ['web-component', 'translated-web-component'];
                }
                return ['web-component'];
            }
            return ['legacy'];
        },

        // Uses the Network Information API (https://w3c.github.io/netinfo/) to try
        // to determine if the user is on cellular/wifi/etc. We pretty much only
        // expect this to work on some Android devices.
        connectionType() {
            const connection =
                window.navigator.connection ||
                window.navigator.mozConnection ||
                window.navigator.webkitConnection;
            return connection ? .type;
        },

        // Returns the total number of seconds "covered" by all of the ranges in a
        // normalized TimeRanges object.
        sumTimeRanges(timeRanges) {
            if (timeRanges == null) {
                return null;
            }
            let sum = 0;
            for (
                let i = 0, end = timeRanges.length, asc = end >= 0; asc ? i < end : i > end;
                // eslint-disable-next-line no-plusplus
                asc ? i++ : i--
            ) {
                sum += timeRanges.end(i) - timeRanges.start(i);
            }
            return sum;
        },

        // Returns the time in milliseconds between now and `timeMsec`, which is a
        // positive number of `timeMsec` is in the past.
        millisecondsSince(timeMsec) {
            return new Date().getTime() - timeMsec;
        },

        _private: {
            countEventCallbacks: {},
            mkCountEventCallback(eventName, statsName) {
                return function(event) {
                    if (!statsName) {
                        statsName = eventName;
                    }
                    return Wistia.Metrics.videoCount(this, `player/${statsName}`, event);
                };
            },

            countEventOnceCallbacks: {},
            mkCountEventOnceCallback(eventName, statsName) {
                return function(event) {
                    if (!statsName) {
                        statsName = eventName;
                    }
                    Wistia.Metrics.videoCount(this, `player/${statsName}`, event);
                    return this.unbind;
                };
            },

            sampleEventCallbacks: {},
            mkSampleEventCallback(eventName, statsName) {
                return function(event) {
                    if (!statsName) {
                        statsName = eventName;
                    }
                    return Wistia.Metrics.videoSample(this, `player/${statsName}`, event);
                };
            },
        },
    });
})(window.Wistia);