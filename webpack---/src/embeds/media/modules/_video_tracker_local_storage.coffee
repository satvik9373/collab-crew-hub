var VideoTrackerLocalStorage, W, secondsSinceTime;

W = require('wistia_namespace.js')["default"];

secondsSinceTime = require('utilities/secondsSinceTime.js').secondsSinceTime;

VideoTrackerLocalStorage = (function() {
  function VideoTrackerLocalStorage(accountKey, hashedId, logFn) {
    this.accountKey = accountKey;
    this.hashedId = hashedId;
    this.logFn = logFn;
    this;
  }

  VideoTrackerLocalStorage.prototype.nullToNone = function(value) {
    if (value === null) {
      return "none";
    } else {
      return value;
    }
  };

  VideoTrackerLocalStorage.prototype.lastLoadForAccount = function() {
    return this._lastLoadForAccount || (this._lastLoadForAccount = this.nullToNone(secondsSinceTime(Wistia.localStorage("accounts_loaded." + this.accountKey))));
  };

  VideoTrackerLocalStorage.prototype.lastLoadForMedia = function() {
    return this._lastLoadForMedia || (this._lastLoadForMedia = this.nullToNone(secondsSinceTime(Wistia.localStorage("medias_loaded." + this.hashedId))));
  };

  VideoTrackerLocalStorage.prototype.lastPlayForAccount = function() {
    return this._lastPlayForAccount || (this._lastPlayForAccount = this.nullToNone(secondsSinceTime(Wistia.localStorage("accounts_played." + this.accountKey))));
  };

  VideoTrackerLocalStorage.prototype.lastPlayForMedia = function() {
    return this._lastPlayForMedia || (this._lastPlayForMedia = this.nullToNone(secondsSinceTime(Wistia.localStorage("medias_played." + this.hashedId))));
  };

  VideoTrackerLocalStorage.prototype.lastRecordingOfActionForMedia = function(actionKey) {
    return this.nullToNone(secondsSinceTime(Wistia.localStorage("action_recorded." + this.hashedId + "." + actionKey)));
  };

  VideoTrackerLocalStorage.prototype.isNewLead = function() {
    var key, v;
    key = "action_recorded.conversion";
    v = Wistia.localStorage(key);
    if (v) {
      return !v;
    } else {
      this.logFn('recordNewLead');
      return Wistia.localStorage(key, true);
    }
  };

  VideoTrackerLocalStorage.prototype.recordLastActionForMedia = function(actionKey) {
    return Wistia.localStorage("action_recorded." + this.hashedId + "." + actionKey, new Date().getTime());
  };

  VideoTrackerLocalStorage.prototype.recordLoad = function() {
    this.logFn('recordLoad');
    Wistia.localStorage("accounts_loaded." + this.accountKey, new Date().getTime());
    return Wistia.localStorage("medias_loaded." + this.hashedId, new Date().getTime());
  };

  VideoTrackerLocalStorage.prototype.recordPlay = function() {
    this.logFn('recordPlay');
    Wistia.localStorage("accounts_played." + this.accountKey, new Date().getTime());
    return Wistia.localStorage("medias_played." + this.hashedId, new Date().getTime());
  };

  VideoTrackerLocalStorage.prototype._saveVisitorVersion = function(version) {
    if (version == null) {
      version = 1;
    }
    if (Wistia.localStorage('visitor_version') == null) {
      return Wistia.localStorage('visitor_version', version);
    }
  };

  VideoTrackerLocalStorage.prototype.getVisitorVersion = function() {
    var v;
    v = Wistia.localStorage('visitor_version');
    if (v) {
      return v;
    } else {
      this._saveVisitorVersion(0);
      return 0;
    }
  };

  VideoTrackerLocalStorage.prototype.clearActionRecordings = function() {
    return ['chapterImpression', 'chapterConversion', 'shareImpression', 'shareConversion'].forEach((function(_this) {
      return function(key) {
        return Wistia.localStorage("action_recorded." + _this.hashedId + "." + key, '', true);
      };
    })(this));
  };

  return VideoTrackerLocalStorage;

})();

module.exports = VideoTrackerLocalStorage;
