var getDefaultTranslation;

getDefaultTranslation = require('../../shared/translations.js').getDefaultTranslation;

(function(W) {
  var initializeEveryTime, initializeOnce;
  initializeOnce = Wistia.initializeOnce = function() {
    var ref;
    Wistia._initializers.initDetect();
    Wistia._initializers.initWLog();
    Wistia._initializers.initVisitorKey();
    if ((ref = Wistia._initializers) != null ? ref.initEventLoop : void 0) {
      Wistia._initializers.initEventLoop();
    }
    Wistia._initializers.initFullscreenTriggers();
    Wistia.trigger('ev1initonce');
    return performance.mark('player_init_start');
  };
  initializeEveryTime = Wistia.initializeEveryTime = function() {
    var ref, ref1, ref2, ref3;
    Wistia.trigger('ev1initstart');
    if ((ref = Wistia._initializers) != null ? ref.initEmbedShepherd : void 0) {
      Wistia._initializers.initEmbedShepherd();
    }
    if ((ref1 = Wistia._initializers) != null ? ref1.initMux : void 0) {
      Wistia._initializers.initMux();
    }
    if ((ref2 = Wistia._initializers) != null ? ref2.initAsyncEmbeds : void 0) {
      Wistia._initializers.initAsyncEmbeds();
    }
    Wistia._initializers.initSpecificTime();
    getDefaultTranslation();
    if ((ref3 = Wistia.eventLoop) != null) {
      ref3.resync();
    }
    return Wistia.trigger('ev1initend');
  };
  Wistia.destroy = function() {
    Wistia.trigger('ev1destroystart');
    Wistia._destructors.destroyAsyncEmbeds();
    Wistia._destructors.destroyEmbedShepherd();
    Wistia._destructors.destroyEmbedLinks();
    Wistia._destructors.destroyFullscreenTriggers();
    Wistia._destructors.destroyEventLoop();
    Wistia._destructors.destroyVisitorKey();
    Wistia._destructors.destroyWLog();
    Wistia._destructors.destroyMux();
    return Wistia.trigger('ev1destroyend');
  };
  Wistia.destroyGlobals = function() {
    var k, results, v;
    window.Wistia = null;
    window.wistiaApi = null;
    window.wistiaDispatch = null;
    window.wistiaBindIframes = null;
    window.wistiaEmbeds = null;
    window._wistiaElemId = null;
    window.wistiaInitQueue = null;
    window.wistiaInit = null;
    window.wistiaEmbedShepherdReady = null;
    results = [];
    for (k in window) {
      v = window[k];
      if (/^wistiajson/.test(k)) {
        results.push(window[k] = null);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  Wistia.reinitialize = function() {
    Wistia.destroy();
    Wistia.initializeOnce();
    return Wistia.initializeEveryTime();
  };
  if (!Wistia._initialized) {
    Wistia._initialized = true;
    Wistia.initializeOnce();
  }
  return Wistia.initializeEveryTime();
})(Wistia);
