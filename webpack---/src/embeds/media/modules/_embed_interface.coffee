(function(Wistia) {
  var Judy, TranslationApi, W, assign, countMetric, createAndSetupWebComponent, dynamicImport, fetchMedia, handleReceivedMediaData, mediaDataTransforms, mediaFromCache, merge, optionsFromElemClass, ref, setEmbedOptionStore, translateEmbedOptionKeyValuePairForWebComponent;
  W = Wistia;
  if (Wistia.embed) {
    return;
  }
  Judy = require('utilities/judy.js');
  ref = require('utilities/media_data.js'), fetchMedia = ref.fetchMedia, mediaFromCache = ref.mediaFromCache;
  mediaDataTransforms = require('utilities/media-data-transforms.js').mediaDataTransforms;
  merge = require('utilities/obj.js').merge;
  assign = require('utilities/assign.js').assign;
  dynamicImport = require('utilities/dynamicImport.ts').dynamicImport;
  countMetric = require('utilities/simpleMetrics.js').countMetric;
  optionsFromElemClass = require('utilities/optionsFromElemClass.ts').optionsFromElemClass;
  setEmbedOptionStore = require('utilities/embedOptionStore.ts').setEmbedOptionStore;
  translateEmbedOptionKeyValuePairForWebComponent = require('utilities/deprecatedEmbedOptionTranslation.ts').translateEmbedOptionKeyValuePairForWebComponent;
  TranslationApi = require('../players/AuroraPlayer/translationApi.ts').TranslationApi;
  Wistia._embed = {};
  Wistia.embed = function(media, options) {
    var apiHandle, containerId, domOptions, hashedId, originalContainer, ref1, ref2, transformOptions, translationApi, wistiaPlayerComponent;
    if (options == null) {
      options = {};
    }
    Wistia.info('Wistia.embed', media, options);
    if (typeof Wistia.flushInitQueue === "function") {
      Wistia.flushInitQueue();
    }
    if (typeof media === 'string') {
      hashedId = media;
    } else {
      hashedId = media.hashedId;
      transformOptions = merge({}, media.embedOptions, options);
      mediaDataTransforms(media, transformOptions);
      Wistia.cacheMedia(hashedId, media);
    }
    if (options.container) {
      if (typeof options.container === 'string') {
        originalContainer = document.getElementById(options.container);
      } else {
        originalContainer = options.container;
        countMetric('legacy/embed-with-container', 1, {
          hashedId: hashedId,
          url: window.location.href
        });
      }
    } else if (media.container) {
      if (typeof media.container === 'string') {
        originalContainer = document.getElementById(options.container);
      } else {
        originalContainer = media.container;
        countMetric('legacy/embed-with-container', 1, {
          hashedId: hashedId,
          url: window.location.href
        });
      }
    } else {
      containerId = "wistia_" + hashedId;
      originalContainer = document.getElementById(containerId);
    }
    domOptions = optionsFromElemClass(originalContainer);
    if (domOptions.useWebComponent || ((ref1 = mediaFromCache(hashedId)) != null ? (ref2 = ref1.embedOptions) != null ? ref2.useWebComponent : void 0 : void 0)) {
      wistiaPlayerComponent = createAndSetupWebComponent(hashedId, Object.assign({}, options, domOptions));
      wistiaPlayerComponent.originalContainer = originalContainer;
      wistiaPlayerComponent.originalContainer._convertingToAurora = true;
      wistiaPlayerComponent.uniqueId = wistiaPlayerComponent.originalContainer.uniqueId;
      wistiaPlayerComponent.originalContainer.uniqueId = void 0;
      translationApi = new TranslationApi(wistiaPlayerComponent);
      wistiaPlayerComponent.translationApi = translationApi;
      originalContainer.append(wistiaPlayerComponent);
      setEmbedOptionStore("__" + wistiaPlayerComponent.uniqueId + "_dom_options__", domOptions);
      return wistiaPlayerComponent.translationApi;
    } else {
      apiHandle = new Wistia.PublicApi(hashedId, options);
      return apiHandle;
    }
  };
  createAndSetupWebComponent = function(hashedId, options) {
    var webComponent;
    webComponent = document.createElement('wistia-player');
    webComponent.setAttribute('media-id', hashedId);
    Object.entries(options).forEach(function(arg) {
      var key, ref1, translatedKey, translatedValue, val;
      key = arg[0], val = arg[1];
      ref1 = translateEmbedOptionKeyValuePairForWebComponent(key, val), translatedKey = ref1[0], translatedValue = ref1[1];
      return webComponent.setAttribute(translatedKey, translatedValue);
    });
    return webComponent;
  };
  Wistia.embedEngine = function(container, media, options, judyContext) {
    var hashedId;
    if (options == null) {
      options = {};
    }
    if (judyContext == null) {
      judyContext = {};
    }
    if (typeof media === 'string') {
      hashedId = media;
    } else {
      hashedId = media.hashedId;
    }
    return new Promise(function(resolve) {
      var doEmbed;
      doEmbed = function(mediaData) {
        var ctx, enginePath;
        ctx = Judy.buildContext(judyContext);
        enginePath = Judy.bestUsableEngine(ctx, mediaData, options);
        return dynamicImport("assets/external/" + enginePath).then(function(mod) {
          var EngineClass, engine;
          EngineClass = mod["default"];
          engine = new EngineClass(container, mediaData, merge({
            duration: mediaData.duration
          }, options));
          return resolve(engine);
        });
      };
      if (typeof media === 'string') {
        return fetchMedia(hashedId, function(mediaData) {
          mediaDataTransforms(mediaData, options);
          Wistia.cacheMedia(hashedId, mediaData);
          return doEmbed(mediaData);
        }, assign({}, options, {
          errorCallback: (function(_this) {
            return function() {
              return countMetric('player/failure/embed-failed');
            };
          })(this)
        }));
      } else {
        return doEmbed(media);
      }
    });
  };
  return handleReceivedMediaData = function(m, options) {
    mediaDataTransforms(m.media, options);
    return Wistia.cacheMedia(m.media.hashedId, m.media);
  };
})(Wistia);
