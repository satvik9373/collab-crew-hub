var Url, VideoTrackerLocalStorage, VideoTrackerSession, W, assign, base64Encode, convertIsUniqueValue, doTimeout, getResumableKeyForVideo, getUTMParams, isVisitorTrackingEnabled, merge, pageLoaded, ref, runScript;

W = require('wistia_namespace.js')["default"];

isVisitorTrackingEnabled = require('utilities/trackingConsentApi.js').isVisitorTrackingEnabled;

ref = require('utilities/obj.js'), assign = ref.assign, merge = ref.merge;

getResumableKeyForVideo = require('utilities/resumableVideoData.js').getResumableKeyForVideo;

doTimeout = require('utilities/timeout-utils.js').doTimeout;

Url = require('utilities/url.js').Url;

pageLoaded = require('utilities/elem.js').pageLoaded;

merge = require('utilities/obj.js').merge;

runScript = require('utilities/script-utils.js').runScript;

base64Encode = require('utilities/core.js').base64Encode;

VideoTrackerSession = require('./_video_tracker_session.coffee');

VideoTrackerLocalStorage = require('./_video_tracker_local_storage.coffee');

convertIsUniqueValue = (function(_this) {
  return function(value) {
    var ref1;
    return (ref1 = value === 'none') != null ? ref1 : {
      "true": false
    };
  };
})(this);

getUTMParams = function(publicApi) {
  var params;
  params = new Url(publicApi._attrs.pageUrl).params;
  return {
    campaign: params.utm_campaign || null,
    medium: params.utm_medium || null,
    source: params.utm_source || null
  };
};

(function(Wistia) {
  if (Wistia.VideoTracker2) {
    return;
  }
  return Wistia.VideoTracker2 = (function() {
    VideoTracker2.prototype.NUM_BUCKETS = 1000;

    VideoTracker2.prototype.conversions = {
      'missing-conversion': 0,
      'pre-roll-email': 1,
      'post-roll-email': 2,
      'mid-roll-email': 3,
      'post-roll-click': 4,
      'mid-roll-click': 5,
      'non-video': 6
    };

    function VideoTracker2(publicApi1) {
      this.publicApi = publicApi1;
      this.eventQueue = [];
      this.initializedOnce = false;
      this.monitoring = false;
      this._setStartValues();
      this.publicApi.hasData((function(_this) {
        return function() {
          _this.utmParams = getUTMParams(_this.publicApi);
          _this.params = merge({
            transmitInterval: (_this.publicApi._mediaData.trackingTransmitInterval || 10) * 1000
          }, _this.publicApi._opts);
          if (!_this.publicApi._attrs.shouldTrack) {

          }
        };
      })(this));
      this;
    }

    VideoTracker2.prototype._setStartValues = function() {
      this.clockStart = new Date().getTime();
      this._played = false;
      this.lastRecordedTime = 0;
      this.lastSeekTime = 0;
      this.lastSecondsWatched = 0;
      return this.lastBucket = -1;
    };

    VideoTracker2.prototype._getAccountKey = function() {
      return this.publicApi._opts.accountKey || this.publicApi._mediaData.accountKey;
    };

    VideoTracker2.prototype._getEnabledEmbedOptions = function() {
      var embedOptions, key, keyToPluginName, name, options, plugins, ref1, ref2;
      embedOptions = this.publicApi.embedOptions();
      plugins = embedOptions['plugin'] || {};
      keyToPluginName = {
        turnstile_enabled: 'requireEmail-v1',
        annotation_link_enabled: 'midrollLink-v1',
        call_to_action_enabled: 'postRoll-v1',
        eventbrite_enabled: 'eventbrite',
        hubspot_form_enabled: 'hubspotForm',
        marketo_form_enabled: 'marketoForm'
      };
      options = {};
      for (key in keyToPluginName) {
        name = keyToPluginName[key];
        options[key] = plugins[name] ? (ref1 = plugins[name]['on']) === 'true' || ref1 === true : false;
      }
      options.auto_play_enabled = (ref2 = embedOptions['autoPlay']) === 'true' || ref2 === true;
      options.looping_enabled = this.publicApi._attrs['endVideoBehavior'] === 'loop';
      return options;
    };

    VideoTracker2.prototype._data = function() {
      var result;
      result = merge({
        account_key: this._getAccountKey(),
        event_details: this.eventQueue,
        page_title: this.publicApi._getPageTitle(),
        browser_language: this.publicApi._getBrowserLanguage(),
        foreign_data: this.publicApi.foreignData(),
        media_duration: parseFloat(this.publicApi._mediaData.duration),
        media_id: this.publicApi._mediaData.mediaKey,
        media_type: this._mediaType(),
        referrer: this.publicApi._attrs.pageUrl,
        referrer_url: this.publicApi._attrs.referrerUrl,
        resumable_key: this.resumableKey(),
        session_id: this.visitorKey(),
        utm_params: this.utmParams,
        visitor_version: this.videoTrackerLocalStorage.getVisitorVersion(),
        event_version: '1.0.0',
        player_type: 'modern',
        enabled_embed_options: this._getEnabledEmbedOptions(),
        visibility_metrics: this.publicApi._getEmbedVisibilityMetrics()
      }, this.videoTrackerSession.fetchSessionData());
      if (this.publicApi.email()) {
        result['email'] = this.publicApi.email();
      }
      if (this.publicApi._opts.anonymizeIp || !isVisitorTrackingEnabled()) {
        result['anonymizeIp'] = true;
      }
      if (this.params.conversionType) {
        result['conversion_type'] = this.conversions[this.params.conversionType];
      }
      if (this.params.conversionData) {
        result['conversion_data'] = this.params.conversionData;
      }
      if (this.publicApi._opts.channel) {
        result['channel'] = this.publicApi._opts.channel;
      }
      if (this.publicApi.embedOptions().channelId) {
        result['channel_id'] = this.publicApi.embedOptions().channelId;
      }
      if (this.publicApi._mediaData.projectId) {
        result['project_id'] = this.publicApi._mediaData.projectId;
      }
      result['episode_id'] = this.publicApi.embedOptions().episodeIdMappings ? this.publicApi.embedOptions().episodeIdMappings[this.publicApi._mediaData.hashedId] : this.publicApi.embedOptions().episodeId ? this.publicApi.embedOptions().episodeId : void 0;
      return JSON.stringify(result);
    };

    VideoTracker2.prototype._mediaType = function() {
      return this.publicApi._mediaData.mediaType;
    };

    VideoTracker2.prototype.reset = function() {
      this.stopMonitoring();
      this._setStartValues();
      return this.initializedOnce = false;
    };

    VideoTracker2.prototype.initialize = function() {
      if (!this.initializedOnce) {
        this.publicApi.info('video tracker initialize');
        this.videoTrackerLocalStorage = new VideoTrackerLocalStorage(this._getAccountKey(), this.publicApi.hashedId(), (function(_this) {
          return function() {
            var ref1;
            return (ref1 = _this.publicApi).info.apply(ref1, arguments);
          };
        })(this));
        this._failedEventsQueue = [];
        this._retryTimer = null;
        this._retryInterval = 1000;
        this.initializedOnce = true;
        this._setStartValues();
        this.log('initialized');
        this.videoTrackerLocalStorage.recordLoad();
        this.debounceTransmit();
      }
      return this;
    };

    VideoTracker2.prototype.monitor = function() {
      if (!this.initializedOnce) {
        this.publicApi.hasData((function(_this) {
          return function() {
            return _this.videoTrackerSession = new VideoTrackerSession(_this.publicApi);
          };
        })(this));
      }
      return this.publicApi.embedded((function(_this) {
        return function() {
          _this.stopMonitoring();
          _this.publicApi.info('_tracker.monitor');
          _this.initialize();
          if (_this.onPlaybackRateChange == null) {
            _this.onPlaybackRateChange = function(rate) {
              return _this.log('playbackRateChange', null, rate);
            };
          }
          if (_this.onPlay == null) {
            _this.onPlay = function() {
              _this.log('play');
              _this.videoTrackerLocalStorage.recordPlay();
              if (!_this._played) {
                _this._played = true;
                return _this.debounceTransmit();
              }
            };
          }
          if (_this.onPause == null) {
            _this.onPause = function() {
              if (Math.abs(_this.publicApi.duration() - _this.publicApi.time()) > .3) {
                return _this.log('pause');
              }
            };
          }
          if (_this.onEnd == null) {
            _this.onEnd = function() {
              _this.log('end');
              return _this.transmit();
            };
          }
          if (_this.onSeek == null) {
            _this.onSeek = function(t, lastT) {
              if (Math.abs(lastT - t) < 5) {
                return;
              }
              _this.lastSeekTime = lastT;
              return _this.log('seek');
            };
          }
          if (_this.onConversionLink == null) {
            _this.onConversionLink = function(data) {
              return _this.logConversionOpportunity(data);
            };
          }
          if (_this.onPercentWatchedThreshold == null) {
            _this.onPercentWatchedThreshold = function(threshold) {
              _this.log('percentWatchedThreshold', null, threshold);
              return _this.transmit();
            };
          }
          _this.monitoring = true;
          _this.publicApi.rebind('play', _this.onPlay);
          _this.publicApi.rebind('pause', _this.onPause);
          _this.publicApi.rebind('end', _this.onEnd);
          _this.publicApi.rebind('seek', _this.onSeek);
          _this.publicApi.rebind('playbackratechange', _this.onPlaybackRateChange);
          _this.publicApi.rebind('conversion-link', _this.onConversionLink);
          _this.publicApi.rebind('percentWatchedThreshold', _this.onPercentWatchedThreshold);
          _this.videoTrackerSession.setupBindings();
          if (_this.publicApi.state() === 'playing') {
            _this.onPlay();
          }
          return doTimeout(_this.publicApi.uuid + ".start_tracking_timeout", function() {
            _this.publicApi.info('_tracker start tracking_loop');
            return Wistia.eventLoop.add(_this.publicApi.uuid + ".tracking_loop", _this.params.transmitInterval, function() {
              if (_this.publicApi.state() === 'playing') {
                _this.log('update');
              }
              return _this.transmit();
            });
          }, Math.random() * _this.params.transmitInterval + 1000);
        };
      })(this));
    };

    VideoTracker2.prototype.stopMonitoring = function() {
      this.publicApi.info('_tracker.stopMonitoring');
      this.monitoring = false;
      if (this.onPlay) {
        this.publicApi.unbind('play', this.onPlay);
      }
      if (this.onPause) {
        this.publicApi.unbind('pause', this.onPause);
      }
      if (this.onEnd) {
        this.publicApi.unbind('end', this.onEnd);
      }
      if (this.onSeek) {
        this.publicApi.unbind('seek', this.onSeek);
      }
      if (this.onConversionLink) {
        this.publicApi.unbind('conversion-link', this.onConversionLink);
      }
      if (this.onPercentWatchedChanged) {
        this.publicApi.unbind('percentwatchedchanged', this.onPercentWatchedChanged);
      }
      if (this.videoTrackerSession) {
        return this.videoTrackerSession.removeBindings();
      }
    };

    VideoTracker2.prototype.distilleryUrl = function() {
      return this.publicApi._attrs.statsUrl || this.publicApi._mediaData.distilleryUrl;
    };

    VideoTracker2.prototype.sendToDistillery = function(data) {
      return fetch(this.distilleryUrl(), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: encodeURIComponent(data)
      })["catch"]((function(_this) {
        return function(error) {
          return Wistia.Metrics.videoCount(_this.publicApi, "player/distillery-error-response/" + error.status);
        };
      })(this));
    };

    VideoTracker2.prototype.readyToTrack = function(fn) {
      return this.publicApi.hasData((function(_this) {
        return function() {
          return pageLoaded(function() {
            return Wistia.visitorKey.ready().then(fn);
          });
        };
      })(this));
    };

    VideoTracker2.prototype.transmit = function(options) {
      if (options == null) {
        options = {};
      }
      if (!this.publicApi._attrs.shouldTrack) {
        return;
      }
      return this.readyToTrack((function(_this) {
        return function() {
          var data;
          if (_this.eventQueue.length > 0 || options.force) {
            data = _this._data();
            _this.publicApi.info('_tracker.transmit', data);
            _this.publicApi.trigger('transmit-stats', data);
            _this.sendToDistillery(base64Encode(data));
            return _this.eventQueue = [];
          }
        };
      })(this));
    };

    VideoTracker2.prototype.debounceTransmit = function() {
      return doTimeout(this.publicApi.uuid + ".transmit_play_data", ((function(_this) {
        return function() {
          return _this.transmit();
        };
      })(this)), 350);
    };

    VideoTracker2.prototype.log = function(action, type, data) {
      var payload, secondsWatched, uniquePlayedRatio, uniquePlayedTime;
      if (!this.publicApi._attrs.shouldTrack) {
        return;
      }
      this.publicApi.info('_tracker.log', action, type, data);
      this.videoTrackerSession.ping();
      secondsWatched = this.videoTrackerSession.secondsWatched();
      uniquePlayedTime = secondsWatched - this.lastSecondsWatched;
      uniquePlayedRatio = uniquePlayedTime / this.publicApi.duration();
      this.lastSecondsWatched = secondsWatched;
      if (action === 'conversion') {
        this.params.conversionType = type;
        this.params.conversionData = data;
        return this.transmit({
          force: true
        });
      } else {
        payload = {
          key: action,
          value: this.timeInVideo(),
          timeDelta: this.timeDelta(),
          uniquePlayedTime: uniquePlayedTime,
          uniquePlayedRatio: uniquePlayedRatio
        };
        if (action === 'initialized') {
          payload.lastAccountInstance = this.videoTrackerLocalStorage.lastLoadForAccount();
          payload.lastMediaInstance = this.videoTrackerLocalStorage.lastLoadForMedia();
          payload.isUnique = convertIsUniqueValue(this.videoTrackerLocalStorage.lastLoadForMedia());
        } else if (action === 'play') {
          payload.lastAccountInstance = this.videoTrackerLocalStorage.lastPlayForAccount();
          payload.lastMediaInstance = this.videoTrackerLocalStorage.lastPlayForMedia();
          payload.isUnique = convertIsUniqueValue(this.videoTrackerLocalStorage.lastPlayForMedia());
          if (this._played) {
            payload.key = 'unpause';
          } else {
            this.addPlayedTime(payload);
            this.addBuckets(payload);
            this.lastRecordedTime = this.timeInVideo();
          }
        } else if (action === 'seek') {
          this.addPlayedTime(payload, this.lastSeekTime);
          this.addBuckets(payload, this.lastSeekTime);
          this.lastRecordedTime = this.timeInVideo();
        } else if (action === 'update') {
          this.addPlayedTime(payload);
          this.addBuckets(payload);
          this.lastRecordedTime = this.timeInVideo();
        } else if (action === 'playbackRateChange') {
          payload.value = data;
        } else if (action === 'percentWatchedThreshold') {
          payload.value = data;
        } else if (action === 'end') {
          this.addPlayedTime(payload);
          this.addBuckets(payload);
          this.lastBucket = -1;
          this.lastRecordedTime = this.timeInVideo();
        }
        this.publicApi.debug('_tracker.log', payload);
        return this.eventQueue.push(payload);
      }
    };

    VideoTracker2.prototype.addPlayedTime = function(payload, value) {
      var currentTime, playedTime;
      currentTime = value !== void 0 ? value : this.timeInVideo();
      playedTime = Math.max(currentTime - this.lastRecordedTime, 0);
      return payload.playedTime = String(playedTime);
    };

    VideoTracker2.prototype.addBuckets = function(payload, endTime) {
      var endBucket, now;
      if (this.publicApi.state() !== 'beforeplay') {
        now = this.publicApi.time();
        endBucket = this._timeToBucket(endTime || now);
        if (this.lastBucket < endBucket) {
          payload.startBucket = this.lastBucket + 1;
          payload.endBucket = endBucket;
        }
        this.lastBucket = this._timeToBucket(now);
        if (endTime) {
          return this.lastBucket -= 1;
        }
      }
    };

    VideoTracker2.prototype._timeToBucket = function(time) {
      return Math.floor(time / this.publicApi.duration() * this.NUM_BUCKETS);
    };

    VideoTracker2.prototype.logConversionOpportunity = function(data) {
      var payload;
      if (!this.publicApi._attrs.shouldTrack) {
        return;
      }
      this.videoTrackerSession.ping();
      if (data.co_key != null) {
        data.is_new_lead = this.videoTrackerLocalStorage.isNewLead();
        payload = {
          key: 'conversion',
          value: data,
          timeDelta: this.timeDelta()
        };
        this.publicApi.info('_tracker.logConversionOpportunity', data);
        return this.eventQueue.push(payload);
      } else {
        return Wistia.Metrics.videoCount(this.publicApi, 'player/no-co-key', 1);
      }
    };

    VideoTracker2.prototype.logAction = function(action, providedDetails) {
      var defaultDetails, details, payload;
      if (providedDetails == null) {
        providedDetails = {};
      }
      this.videoTrackerSession.ping();
      defaultDetails = {
        time: this.publicApi.time(),
        key: action,
        type: 'default',
        category: 'default',
        text: 'test',
        uniqueToVisitor: false
      };
      details = assign({}, defaultDetails, providedDetails);
      payload = {
        value: details,
        key: 'action',
        timeDelta: this.timeDelta()
      };
      return this.eventQueue.push(payload);
    };

    VideoTracker2.prototype.logCaptionSelection = function(data) {
      var payload;
      if (!this.publicApi._attrs.shouldTrack) {
        return;
      }
      this.videoTrackerSession.ping();
      if (!data.caption_key) {
        return;
      }
      payload = {
        key: 'caption',
        value: data,
        timeDelta: this.timeDelta()
      };
      this.publicApi.info('_tracker.logCaptionSelection', data);
      return this.eventQueue.push(payload);
    };

    VideoTracker2.prototype.logChapterClick = function(chapter, time) {
      this.logAction('chapterConversion', {
        text: chapter.title,
        type: 'conversion',
        category: 'chapter',
        uniqueToVisitor: true,
        time: time
      });
      return this.logAction("chapterSelection-" + chapter.id, {
        text: chapter.title,
        type: 'interaction',
        category: 'chapter',
        time: time
      });
    };

    VideoTracker2.prototype.logShareClick = function(channel) {
      this.logAction('shareConversion', {
        text: channel,
        type: 'conversion',
        category: 'share',
        uniqueToVisitor: true
      });
      return this.logAction("shareClick-" + channel, {
        text: channel,
        type: 'interaction',
        category: 'share'
      });
    };

    VideoTracker2.prototype.resumableKey = function() {
      if (this.publicApi.embedOptions().resumable !== false) {
        return getResumableKeyForVideo(this.publicApi.hashedId());
      } else {
        return null;
      }
    };

    VideoTracker2.prototype.timeInVideo = function() {
      var timeInVideo;
      timeInVideo = this.publicApi.time();
      if (timeInVideo == null) {
        if (this.publicApi.state() === 'beforeplay') {
          timeInVideo = 0;
        } else {
          timeInVideo = this.publicApi.duration();
        }
      }
      return timeInVideo.toFixed(1);
    };

    VideoTracker2.prototype.timeDelta = function() {
      return (new Date().getTime()) - this.clockStart;
    };

    VideoTracker2.prototype.visitorKey = function() {
      return this.publicApi.visitorKey();
    };

    VideoTracker2.prototype.eventKey = function() {
      if (this.videoTrackerSession) {
        return this.videoTrackerSession.eventKey();
      }
    };

    return VideoTracker2;

  })();
})(Wistia);
