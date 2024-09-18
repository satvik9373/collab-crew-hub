var SecondsWatchedTracker, VideoTrackerSession, W, secondsSinceTime, uniqId;

W = require('wistia_namespace.js')["default"];

secondsSinceTime = require('utilities/secondsSinceTime.js').secondsSinceTime;

SecondsWatchedTracker = require('utilities/secondsWatchedTracker.js').SecondsWatchedTracker;

uniqId = require('utilities/uniqId.js').uniqId;

VideoTrackerSession = (function() {
  VideoTrackerSession.prototype.EVENT_KEY_REFRESH_INTERVAL = 30 * 60;

  function VideoTrackerSession(publicApi) {
    this.publicApi = publicApi;
    this.lastFetchTime = new Date().getTime();
    this.secondsWatchedTracker = new SecondsWatchedTracker(this.publicApi, this.publicApi.duration(), {
      maxWatchingPlaybackRate: this.publicApi._opts.maxWatchingPlaybackRate
    });
  }

  VideoTrackerSession.prototype.withRefresh = function(func) {
    if (secondsSinceTime(this.lastFetchTime) > this.EVENT_KEY_REFRESH_INTERVAL) {
      this.reset();
    }
    this.lastFetchTime = new Date().getTime();
    if (typeof func === 'function') {
      return func();
    }
  };

  VideoTrackerSession.prototype.fetchSessionData = function() {
    return this.withRefresh((function(_this) {
      return function() {
        var result;
        return result = {
          event_key: _this.eventKey(),
          seconds_watched: _this.secondsWatchedTracker.secondsWatched()
        };
      };
    })(this));
  };

  VideoTrackerSession.prototype.secondsWatched = function() {
    return this.withRefresh((function(_this) {
      return function() {
        return _this.secondsWatchedTracker.secondsWatched();
      };
    })(this));
  };

  VideoTrackerSession.prototype.ping = function() {
    return this.withRefresh();
  };

  VideoTrackerSession.prototype.setupBindings = function() {
    if (this.binding == null) {
      this.binding = (function(_this) {
        return function(s) {
          return _this.secondsWatchedTracker.trackSecond(s);
        };
      })(this);
    }
    return this.publicApi.rebind('secondchange', this.binding);
  };

  VideoTrackerSession.prototype.reset = function() {
    this._eventKey = null;
    return this.secondsWatchedTracker.reset();
  };

  VideoTrackerSession.prototype.removeBindings = function() {
    if (this.binding) {
      return this.publicApi.unbind('secondchange', this.binding);
    }
  };

  VideoTrackerSession.prototype.eventKey = function() {
    if (this.isValidKey(this._eventKey)) {
      return this._eventKey;
    }
    this._eventKey = uniqId((Date.now().toString().substring(0, 7)) + "_");
    this.publicApi.trigger('eventkeychange', this._eventKey);
    return this._eventKey;
  };

  VideoTrackerSession.prototype.isValidKey = function(key) {
    return (key != null ? key.length : void 0) > 25 && /^[a-z0-9_\-\.]+$/i.test(key);
  };

  return VideoTrackerSession;

})();

module.exports = VideoTrackerSession;
