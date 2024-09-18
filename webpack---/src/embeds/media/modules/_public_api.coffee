var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice;

(function(Wistia) {
  var DEFAULT_ASPECT, GLOBAL_ID_KEY, Judy, StopGo, TranslationApi, Url, W, assign, cacheMedia, cast, clearTimeouts, clone, countMetric, debounce, doTimeout, dynamicImport, eV1HostWithPort, eV1Protocol, elemAddClass, elemAfter, elemAnimate, elemAppend, elemBefore, elemFromObject, elemHasClass, elemHeight, elemInDom, elemIsHidden, elemOffset, elemPrepend, elemRebind, elemRemove, elemStyle, elemUnbind, elemUnbindAll, elemUnbindAllInside, elemWidth, embedOptionsFromQueryParams, extractEmailFromParams, fetchMedia, findScriptInDomBySrc, formattedDurationToSeconds, generateRelativeBlockCss, getChannelStorage, getDeep, getDefaultBigPlayButtonBorderRadius, getDefaultControlBarBorderRadius, getDefaultControlBarDistance, getDefaultPlayerBorderRadius, getEmbedOptionStore, getOneApiHandleFromHashedId, getPluginsNotInList, getViewerPreferences, globalTrigger, inUserEventContext, inferPageUrl, inferQualityRangeFromOpts, injectJsonLd, insertIntoArray, isEmpty, isObject, maybeLoadAndSetupEmbedLinksThrottled, mediaDataScriptRegExp, mediaDataTransforms, mediaDataUrl, merge, oldTrigger, parseUrl, pluginScriptsToLoad, poll, prefetchEngineAndPlugins, proto, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, removeInjectedJsonLd, root, sampleMetric, sanePlayerColor, scrollTop, seqId, setDeep, throttle, toArray, transformResponse, uniqId, wData, wRemoveData;
  W = Wistia;
  if (Wistia.PublicApi) {
    return;
  }
  Judy = require('utilities/judy.js');
  StopGo = require('utilities/stopgo.js').StopGo;
  root = require('utilities/root.js').root;
  ref = require('utilities/pluginScriptsToLoad.js'), pluginScriptsToLoad = ref.pluginScriptsToLoad, getPluginsNotInList = ref.getPluginsNotInList;
  prefetchEngineAndPlugins = require('utilities/prefetching.js').prefetchEngineAndPlugins;
  ref1 = require('utilities/injectJsonLd.js'), injectJsonLd = ref1.injectJsonLd, removeInjectedJsonLd = ref1.removeInjectedJsonLd;
  ref2 = require('utilities/url.js'), proto = ref2.proto, parseUrl = ref2.parseUrl, Url = ref2.Url;
  ref3 = require('utilities/wistiaData.js'), wData = ref3.wData, wRemoveData = ref3.wRemoveData;
  ref4 = require('utilities/timeout-utils.js'), doTimeout = ref4.doTimeout, clearTimeouts = ref4.clearTimeouts;
  seqId = require('utilities/seqid.js').seqId;
  assign = require('utilities/assign.js').assign;
  ref5 = require('utilities/obj.js'), clone = ref5.clone, merge = ref5.merge, isEmpty = ref5.isEmpty, cast = ref5.cast, setDeep = ref5.setDeep, getDeep = ref5.getDeep, isObject = ref5.isObject;
  ref6 = require('utilities/simpleMetrics.js'), countMetric = ref6.countMetric, sampleMetric = ref6.sampleMetric;
  poll = require('utilities/core.js').poll;
  extractEmailFromParams = require('utilities/extractEmailFromParams.ts').extractEmailFromParams;
  inferPageUrl = require('utilities/inferPageUrl.ts').inferPageUrl;
  getViewerPreferences = require('utilities/viewerPreferences.js').getViewerPreferences;
  dynamicImport = require('utilities/dynamicImport.ts').dynamicImport;
  getChannelStorage = require('embeds/channel/channelStorage.js').getChannelStorage;
  maybeLoadAndSetupEmbedLinksThrottled = require('./_embed_links.js').maybeLoadAndSetupEmbedLinksThrottled;
  debounce = require('utilities/debounce.js').debounce;
  formattedDurationToSeconds = require('utilities/duration.ts').formattedDurationToSeconds;
  DEFAULT_ASPECT = require('../../wistiaPlayer/utilities/constants.ts').DEFAULT_ASPECT;
  inferQualityRangeFromOpts = require('utilities/inferQualityRangeFromOpts.js').inferQualityRangeFromOpts;
  generateRelativeBlockCss = require('utilities/generate.js').generateRelativeBlockCss;
  ref7 = require('utilities/embedOptionStore.ts'), getEmbedOptionStore = ref7.getEmbedOptionStore, GLOBAL_ID_KEY = ref7.GLOBAL_ID_KEY;
  getOneApiHandleFromHashedId = require('utilities/getApiHandles.ts').getOneApiHandleFromHashedId;
  ref8 = require('utilities/roundedPlayerDefaults.ts'), getDefaultPlayerBorderRadius = ref8.getDefaultPlayerBorderRadius, getDefaultBigPlayButtonBorderRadius = ref8.getDefaultBigPlayButtonBorderRadius, getDefaultControlBarBorderRadius = ref8.getDefaultControlBarBorderRadius, getDefaultControlBarDistance = ref8.getDefaultControlBarDistance;
  ref9 = require('utilities/media_data.js'), fetchMedia = ref9.fetchMedia, mediaDataUrl = ref9.mediaDataUrl, mediaDataScriptRegExp = ref9.mediaDataScriptRegExp, transformResponse = ref9.transformResponse, cacheMedia = ref9.cacheMedia;
  findScriptInDomBySrc = require('utilities/script-utils.js').findScriptInDomBySrc;
  sanePlayerColor = require('utilities/sane-player-color.js').sanePlayerColor;
  TranslationApi = require('../players/AuroraPlayer/translationApi.ts').TranslationApi;
  Wistia.Judy = Judy;
  Wistia.Assets = require('utilities/assets.js');
  ref10 = require('utilities/elem.js'), elemUnbindAllInside = ref10.elemUnbindAllInside, elemWidth = ref10.elemWidth, elemAddClass = ref10.elemAddClass, elemAfter = ref10.elemAfter, elemAnimate = ref10.elemAnimate, elemAppend = ref10.elemAppend, elemBefore = ref10.elemBefore, elemFromObject = ref10.elemFromObject, elemHasClass = ref10.elemHasClass, elemHeight = ref10.elemHeight, elemInDom = ref10.elemInDom, elemIsHidden = ref10.elemIsHidden, elemOffset = ref10.elemOffset, elemPrepend = ref10.elemPrepend, elemRebind = ref10.elemRebind, elemRemove = ref10.elemRemove, elemStyle = ref10.elemStyle, elemUnbind = ref10.elemUnbind, elemUnbindAll = ref10.elemUnbindAll, inUserEventContext = ref10.inUserEventContext;
  scrollTop = require('utilities/scroll.js').scrollTop;
  ref11 = require('utilities/hosts.js'), eV1Protocol = ref11.eV1Protocol, eV1HostWithPort = ref11.eV1HostWithPort;
  globalTrigger = require('utilities/globalBindAndTrigger.js').globalTrigger;
  uniqId = require('utilities/uniqId.js').uniqId;
  throttle = require('utilities/core.js').throttle;
  ref12 = require('utilities/array.js'), insertIntoArray = ref12.insertIntoArray, toArray = ref12.toArray;
  mediaDataTransforms = require('utilities/media-data-transforms.js').mediaDataTransforms;
  embedOptionsFromQueryParams = require('utilities/embedOptionsFromQueryParams').embedOptionsFromQueryParams;
  Wistia.PublicApi = (function() {
    function PublicApi(hashedId, options) {
      this._definePluginMethod = bind(this._definePluginMethod, this);
      this._doResize = bind(this._doResize, this);
      this._doMonitor = bind(this._doMonitor, this);
      this._initWithMediaData = bind(this._initWithMediaData, this);
      this._allocEmbedSlot = bind(this._allocEmbedSlot, this);
      var bucket, doInit, e, j, len, ref13, ref14;
      this.on('problem', (function(_this) {
        return function(data) {
          data.video = _this;
          return globalTrigger('problem', data);
        };
      })(this));
      this.info('initialize');
      this._hasImpl = new StopGo();
      this._notReplacing = new StopGo();
      this._notReplacing(true);
      this.hasPlugins = new StopGo();
      this.up = new StopGo();
      this.up(true);
      this.down = new StopGo();
      this.down(false);
      this.inViewport = new StopGo();
      this.inViewport(false);
      this._implVersion = 0;
      this._playlistIndex = 0;
      this._attrs = {};
      this.params = {};
      this.options = {};
      this.controls = {};
      this._pluginStopGos = {};
      this.plugins = {};
      this.data = {};
      this._definePluginMethod();
      this.hashedId(hashedId);
      this._givenOptions = options;
      this._playlist = [];
      this._setupContainer();
      this._setupTranslationApiForLegacyEmbeds();
      this._validate();
      this._inferPropertiesBeforeMediaData();
      this._dedupContainer();
      this._addToGlobalCache();
      this._setupBindings();
      this.supportedPlayers = [];
      this.addToPlaylist(this.hashedId(), options);
      this.down(this.looksDown());
      this.up(this.looksUp());
      this._hasImpl((function(_this) {
        return function() {
          if (_this._wvideoInUrl()) {
            _this._scrollToContainer();
            if (_this.popover) {
              return _this.embedded(function() {
                return _this.popover.showAndPlay();
              });
            } else {
              return _this.play();
            }
          }
        };
      })(this));
      if ((ref13 = window.wistiaEmbeds) != null) {
        ref13.bindHandles();
      }
      this.monitor();
      this.embedded((function(_this) {
        return function() {
          return _this.monitor();
        };
      })(this));
      this.ready((function(_this) {
        return function() {
          return _this.monitor();
        };
      })(this));
      doInit = (function(_this) {
        return function() {
          return _this._onInitializable(function() {
            return _this._withFreeEmbedSlots(function() {
              var cacheKey, isJsonPScriptAlreadyInDom, matchUrl, opts, parsed, url;
              _this._initTime = new Date().getTime();
              _this.hasData(function() {
                return _this._hasDataTime = new Date().getTime();
              });
              _this.embedded(function() {
                return _this._embeddedTime = new Date().getTime();
              });
              _this.ready(function() {
                _this._readyTime = new Date().getTime();
                return _this.removeSwatch();
              });
              opts = _this._gatherOptions();
              url = mediaDataUrl(hashedId, _this._gatherOptions());
              matchUrl = url.replace(/\.json(?!p)/, '.jsonp').replace(/&$/, '');
              isJsonPScriptAlreadyInDom = findScriptInDomBySrc(matchUrl, {
                ignoreProtocol: true,
                scriptRegex: mediaDataScriptRegExp(hashedId)
              });
              if (opts.mediaData) {
                return _this._initWithMediaData(opts.mediaData);
              } else if (isJsonPScriptAlreadyInDom) {
                parsed = new Url(matchUrl);
                cacheKey = "wistiajsonp-" + (parsed.relative());
                return poll(function() {
                  return root[cacheKey] !== null && root[cacheKey] !== void 0;
                }, function() {
                  var mediaData, mediaWithOpts;
                  mediaWithOpts = root[cacheKey];
                  mediaData = transformResponse(mediaWithOpts, _this._gatherOptions());
                  cacheMedia(hashedId, mediaData);
                  return _this._initWithMediaData(mediaData);
                }, 15, 30000);
              } else {
                return fetchMedia(_this.hashedId(), _this._gatherOptions()).then(function(mediaData) {
                  return _this._initWithMediaData(mediaData);
                })["catch"](function() {
                  return countMetric('player/failure/init-failed');
                });
              }
            });
          });
        };
      })(this);
      if (this._shouldBePopover()) {
        this.popover = {
          show: (function(_this) {
            return function() {
              return _this._hasImpl(function() {
                return _this.popover.show();
              });
            };
          })(this),
          hide: (function(_this) {
            return function() {
              return _this._hasImpl(function() {
                return _this.popover.hide();
              });
            };
          })(this),
          height: (function(_this) {
            return function(h, options) {
              if (h != null) {
                return _this._hasImpl(function() {
                  return _this.popover.height(h, options);
                });
              } else {
                return 0;
              }
            };
          })(this),
          width: (function(_this) {
            return function(w, options) {
              if (w != null) {
                return _this._hasImpl(function() {
                  return _this.popover.width(w, options);
                });
              } else {
                return 0;
              }
            };
          })(this)
        };
        dynamicImport('assets/external/popover.js').then((function(_this) {
          return function() {
            _this.popover = new Wistia.Popover(_this);
            return doInit();
          };
        })(this));
      } else {
        doInit();
      }
      this.trigger('initembed');
      this.container.dispatchEvent(new CustomEvent('initembed', {
        detail: {
          api: this
        }
      }));
      maybeLoadAndSetupEmbedLinksThrottled();
      performance.mark('player_init_complete');
      try {
        if (Wistia.detect.performanceMeasure) {
          sampleMetric('player/initembed-latency', performance.measure('player_init_latency', 'player_init_start', 'player_init_complete').duration);
          ref14 = Wistia.Metrics.embedTypeBuckets(this.container);
          for (j = 0, len = ref14.length; j < len; j++) {
            bucket = ref14[j];
            sampleMetric('player/initembed-latency.' + bucket, performance.measure('player_init_latency', 'player_init_start', 'player_init_complete').duration);
          }
        }
      } catch (error1) {
        e = error1;
        setTimeout(((function(_this) {
          return function() {
            throw e;
          };
        })(this)), 0);
      }
      setTimeout(((function(_this) {
        return function() {
          return _this.container.dispatchEvent(new CustomEvent('legacypublicapicreated'));
        };
      })(this)), 0);
    }

    PublicApi.prototype._withFreeEmbedSlots = function(fn) {
      var freeSlotTimeout;
      this._setupEmbedSlots();
      freeSlotTimeout = null;
      this.embedded((function(_this) {
        return function() {
          clearTimeout(freeSlotTimeout);
          return freeSlotTimeout = setTimeout((function() {
            return _this._freeEmbedSlot();
          }), _this._embedSlotThrottleInterval());
        };
      })(this));
      if (this._freeEmbedSlotOnError == null) {
        this._freeEmbedSlotOnError = (function(_this) {
          return function() {
            _this._freeEmbedSlot();
            return _this.unbind;
          };
        })(this);
      }
      this.rebind('servererror', this._freeEmbedSlotOnError);
      return Wistia._embedSlotFree((function(_this) {
        return function() {
          _this._allocEmbedSlot();
          freeSlotTimeout = setTimeout((function() {
            return _this._freeEmbedSlot();
          }), 1000);
          return fn();
        };
      })(this));
    };

    PublicApi.prototype._onInitializable = function(callback) {
      if (!this.popover) {
        return callback();
      }
      if (!elemIsHidden(this.container)) {
        return callback();
      }
      this.info('popover, delaying init until container is visible');
      return Wistia.eventLoop.add(this.uuid + ".wait_for_container_visible", 500, (function(_this) {
        return function() {
          var e;
          if (!elemIsHidden(_this.container)) {
            _this.info('container became visible, initializing');
            try {
              callback();
            } catch (error1) {
              e = error1;
              Wistia.error(e);
            }
            return Wistia.eventLoop.remove;
          }
        };
      })(this));
    };

    PublicApi.prototype._setupEmbedSlots = function() {
      if (Wistia._embedSlots == null) {
        Wistia._embedSlots = [];
      }
      if (!Wistia._embedSlotFree) {
        Wistia._embedSlotFree = new StopGo();
        return Wistia._embedSlotFree(true);
      }
    };

    PublicApi.prototype._maxEmbedSlots = function() {
      var k, v, videoCount;
      videoCount = ((function() {
        var ref13, results;
        ref13 = wData('video');
        results = [];
        for (k in ref13) {
          v = ref13[k];
          results.push(k);
        }
        return results;
      })()).length;
      if (videoCount > 20) {
        return 5;
      } else if (videoCount > 10) {
        return 8;
      } else {
        return 13;
      }
    };

    PublicApi.prototype._embedSlotThrottleInterval = function() {
      return 500;
    };

    PublicApi.prototype._freeEmbedSlot = function() {
      var video;
      this._setupEmbedSlots();
      Wistia._embedSlots = (function() {
        var j, len, ref13, results;
        ref13 = Wistia._embedSlots;
        results = [];
        for (j = 0, len = ref13.length; j < len; j++) {
          video = ref13[j];
          if (video !== this) {
            results.push(video);
          }
        }
        return results;
      }).call(this);
      if (Wistia._embedSlots.length < this._maxEmbedSlots()) {
        return Wistia._embedSlotFree(true);
      }
    };

    PublicApi.prototype._allocEmbedSlot = function() {
      this._setupEmbedSlots();
      Wistia._embedSlots.push(this);
      if (Wistia._embedSlots.length >= this._maxEmbedSlots()) {
        return Wistia._embedSlotFree(false);
      }
    };

    PublicApi.prototype._shouldLazyLoad = function() {
      var opts;
      opts = this._gatherOptions();
      return (!window._inWistiaIframe && parent === self) && (opts.lazyLoad || (this.popover && opts.lazyLoad !== false));
    };

    PublicApi.prototype._initWithMediaData = function(mediaData) {
      var error, implVersion, newPlayerType, optionSources, ref13;
      this.info('_initWithMediaData', mediaData);
      try {
        if (Wistia.Player.assets(mediaData, {
          "public": true
        }).length === 0) {
          Wistia.Metrics.videoCount(this, 'player/no-public-assets');
        }
      } catch (error1) {
        error = error1;
        this.debug(error);
      }
      if (this.isRemoved()) {
        this.notice('abort, video already removed');
        return;
      }
      if (mediaData.error) {
        this.notice('display error message from server');
        this._displayServerError(mediaData);
        this.trigger('servererror');
        return;
      }
      this.hashedId(mediaData.hashedId);
      this._originalMediaData = clone(mediaData);
      this._mediaData = mediaData;
      this.container.dispatchEvent(new CustomEvent('loaded-mediadata', {
        detail: {
          mediaData: mediaData
        }
      }));
      this._mediaData = mediaDataTransforms(mediaData, this._gatherOptions());
      this.data.media = mediaData;
      optionSources = this._optionSources();
      this.info('_optionSources', optionSources);
      if (((ref13 = optionSources.inline) != null ? ref13.container : void 0) instanceof HTMLElement) {
        optionSources.inline = assign({}, optionSources.inline, {
          container: optionSources.inline.container.uniqueId || optionSources.inline.container.id || 'container-with-no-id'
        });
      }
      countMetric('player/option-sources', 1, {
        optionSources: optionSources,
        hashedId: this._hashedId,
        url: window.location.href
      });
      this._opts = this._gatherOptions();
      this.info('_opts', clone(this._opts));
      merge(this._mediaData, this._opts.mergeMediaData);
      this._inferPropertiesAfterMediaData();
      newPlayerType = Judy.choosePlayer(this.judyCtx(), this._mediaData, this._opts);
      this._playerPlugins = Judy.playerPlugins(this.judyCtx(), newPlayerType, this._mediaData, this._opts);
      Judy.logWarnings(this.judyCtx(), newPlayerType, this._mediaData, this._opts);
      this._implVersion += 1;
      implVersion = this._implVersion;
      return this._execPlugins().then((function(_this) {
        return function() {
          var e, klass, ref14;
          if (_this._implVersion !== implVersion) {
            _this.notice('_initWithMediaData(): impl changed from', implVersion, 'to', _this._implVersion, 'not completing init');
            return;
          }
          _this.hasPlugins(true);
          klass = Wistia.PublicApi.classFor(newPlayerType);
          _this.supportedPlayers = Judy.supportedPlayers(_this.judyCtx(), _this._mediaData.assets);
          try {
            _this._impl = new klass(_this).init();
          } catch (error1) {
            e = error1;
            _this.error("Failed to initialize impl of class", klass, 'preferred', newPlayerType, 'supported', _this.supportedPlayers);
            throw e;
          }
          _this.grid = _this._impl.setupGrid({
            initDimensions: false
          });
          _this._hasImpl(true);
          _this.hasData(true);
          if ((ref14 = _this._embedContainer) != null ? ref14.parentNode : void 0) {
            _this._runMethodsFromOptions();
            _this._impl.embed();
            if (_this._getFadeInTime() > 0) {
              elemStyle(_this._impl.gridChildren(), {
                opacity: 0
              });
            }
            _this._impl.embedded(function() {
              if (_this._getFadeInTime() > 0) {
                return elemAnimate(_this._impl.gridChildren(), {
                  opacity: 1
                }, {
                  time: _this._getFadeInTime(),
                  callback: function() {
                    return _this.trigger('transitiondone');
                  }
                });
              } else {
                return _this.trigger('transitiondone');
              }
            });
            doTimeout(_this.uuid + ".prefetch_next_media", (function() {
              return _this.prefetchNextMedia();
            }), 2000);
            return _this._injectJsonLd();
          } else {
            return _this.notice('embed(): container removed, giving up');
          }
        };
      })(this));
    };

    PublicApi.prototype._getFadeInTime = function() {
      if (this._opts.fadeInTime != null) {
        return this._opts.fadeInTime;
      } else {
        return 200;
      }
    };

    PublicApi.prototype.judyCtx = function() {
      return this._judyCtx || (this._judyCtx = Judy.buildContext({
        pageUrl: this._attrs.pageUrl
      }));
    };

    PublicApi.prototype._wvideoInUrl = function() {
      var url;
      if (this._opts._inIframe) {
        return false;
      }
      url = parseUrl(this._attrs.pageUrl);
      return url.params.wvideo === this.hashedId();
    };

    PublicApi.prototype._scrollToContainer = function() {
      var offset;
      offset = elemOffset(this.container);
      return scrollTop(offset.top - 100);
    };

    PublicApi.prototype._injectJsonLd = function() {
      if (this.container.tagName === 'WISTIA-PLAYER') {
        return;
      }
      if (this._jsonLdId) {
        removeInjectedJsonLd(this._jsonLdId);
      }
      if (this.playerType === 'notplayable' || this.playerType === 'passwordprotected' || this._attrs.seo === false) {
        return;
      }
      this._jsonLdId = "w-json-ld" + this._impl.uuid;
      return injectJsonLd(this._jsonLdId, this._mediaData, {
        videoWidth: this.videoWidth(),
        videoHeight: this.videoHeight(),
        embedOptions: this._opts
      });
    };

    PublicApi.prototype._setDeprecatedProperties = function() {
      this.options = clone(this._opts);
      this.params = clone(this._opts);
      merge(this.params, this._attrs);
      if (this._attrs.email) {
        this.params.trackEmail = this._attrs.email;
      }
      return this._hasImpl((function(_this) {
        return function() {
          var ref13;
          return _this.playerType = _this.embedType = (ref13 = _this._impl) != null ? ref13.playerType : void 0;
        };
      })(this));
    };

    PublicApi.prototype.elem = function() {
      var ref13;
      return (ref13 = this._impl) != null ? typeof ref13.elem === "function" ? ref13.elem() : void 0 : void 0;
    };

    PublicApi.prototype._execPlugins = function() {
      var customPlugins;
      this._pluginScripts = pluginScriptsToLoad(this._mediaData, this._opts, this._playerPlugins);
      Wistia.plugin._setFnForDefinedPlugins(this, this._pluginScripts);
      customPlugins = getPluginsNotInList(this._pluginScripts);
      if (customPlugins.length > 0) {
        countMetric('custom-plugin-exec', 1, {
          customPlugins: customPlugins,
          hashedId: this._hashedId,
          url: window.location.href
        });
      }
      this.info('_execPlugins', this._pluginScripts);
      return Wistia.plugin._execQueue(this, this._pluginScripts);
    };

    PublicApi.prototype._optionSources = function(options) {
      var containerId, customizeOptions, inferredOptions, inlineOptions, k, queryParamOptions, queryParamWhitelist, ref13, result, v;
      if (options == null) {
        options = {};
      }
      options = merge({
        givenOptions: clone(this._givenOptions),
        mediaData: clone(this._mediaData),
        hashedId: this._hashedId,
        container: this.container
      }, options);
      inlineOptions = options.givenOptions;
      if (inlineOptions.version === 'v1') {
        customizeOptions = {};
      } else {
        if (options.mediaData) {
          customizeOptions = clone(options.mediaData.embedOptions);
          delete customizeOptions.stillUrl;
        } else {
          customizeOptions = {};
        }
      }
      queryParamWhitelist = ['autoPlay', 'deliveryCdn', 'hls', 'techInfo', 'newRoundedIcons', 'forceInstantHls'];
      queryParamOptions = embedOptionsFromQueryParams(queryParamWhitelist, this._inferPageUrl());
      containerId = options.container.uniqueId || options.container.id;
      inferredOptions = {};
      result = {
        customize: customizeOptions,
        global: getEmbedOptionStore(GLOBAL_ID_KEY),
        hashedId: getEmbedOptionStore(options.hashedId, getOneApiHandleFromHashedId),
        dom: getEmbedOptionStore("__" + containerId + "_dom_options__"),
        container: getEmbedOptionStore(containerId),
        inline: inlineOptions,
        inferredOptions: inferredOptions,
        viewerPreferences: getViewerPreferences(),
        channelPreferences: inlineOptions.channelPreferences || {},
        queryParamOptions: queryParamOptions,
        override: options.override || {}
      };
      if (inlineOptions.optionSourceOverrides) {
        ref13 = inlineOptions.optionSourceOverrides;
        for (k in ref13) {
          v = ref13[k];
          if (result.hasOwnProperty(k)) {
            result[k] = v;
          }
        }
      }
      for (k in result) {
        v = result[k];
        if (isEmpty(v)) {
          delete result[k];
        }
      }
      return result;
    };

    PublicApi.prototype._mergeSources = function(sources, options) {
      var k, opt, ref13, ref14, v;
      opt = {};
      for (k in sources) {
        v = sources[k];
        if (((ref13 = options.only) != null ? ref13.indexOf(k) : void 0) >= 0) {
          merge(opt, v);
        } else if (((ref14 = options.except) != null ? ref14.indexOf(k) : void 0) < 0) {
          merge(opt, v);
        } else if (!options.only && !options.except) {
          merge(opt, v);
        }
      }
      return opt;
    };

    PublicApi.prototype._gatherOptions = function(options) {
      var opt, sources;
      if (options == null) {
        options = {};
      }
      sources = this._optionSources(options);
      opt = this._mergeSources(sources, options);
      if (opt.version === 'v1') {
        sources.customize = {};
        opt = this._mergeSources(sources, options);
      }
      cast(opt);
      this._normalizeOptions(opt);
      return opt;
    };

    PublicApi.prototype.hashedId = function(val) {
      if (val != null) {
        this._hashedId = val;
        return this;
      } else {
        return this._hashedId;
      }
    };

    PublicApi.prototype.isAudio = function() {
      return this._mediaData.mediaType === 'Audio';
    };

    PublicApi.prototype.isLiveMedia = function() {
      var ref13;
      return ((ref13 = this._mediaData) != null ? ref13.mediaType : void 0) === 'LiveStream';
    };

    PublicApi.prototype._normalizeOptions = function(options) {
      if (options.twitter) {
        this.info('twitter detected');
        if (getDeep(options, 'plugin.socialbar-v1')) {
          this.info('disabled socialbar');
          setDeep(options, 'plugin.socialbar-v1.on', false);
        }
      }
      if (options.playButtonVisible != null) {
        options.playButton = cast(options.playButtonVisible);
        delete options.playButtonVisible;
      }
      return options;
    };

    PublicApi.prototype._setupContainer = function() {
      var child, j, l, len, len1, len2, m, ref13, ref14, ref15;
      this._containerId = (this._givenOptions.container ? this._givenOptions.container : "wistia_" + (this.hashedId()));
      if (typeof this._containerId === 'string') {
        this.container = document.getElementById(this._containerId);
      } else {
        this.container = this._containerId;
      }
      if (this.container) {
        if (this.container.tagName === 'WISTIA-PLAYER' && this._shouldBePopover()) {
          this.webComponentParent = this.container.parentNode;
          this._startingHtml = this.webComponentParent.cloneNode(true);
          ref13 = Array.prototype.slice.call(this._startingHtml.childNodes);
          for (j = 0, len = ref13.length; j < len; j++) {
            child = ref13[j];
            if (child.tagName === 'WISTIA-PLAYER') {
              elemRemove(child);
            }
          }
          this._startingHtml = this._startingHtml.innerHTML;
          ref14 = Array.prototype.slice.call(this.webComponentParent.childNodes);
          for (l = 0, len1 = ref14.length; l < len1; l++) {
            child = ref14[l];
            if (!elemHasClass(child, 'wistia_swatch') && child.tagName !== 'WISTIA-PLAYER') {
              elemRemove(child);
            }
          }
        } else if (this.container.tagName !== 'WISTIA-PLAYER') {
          this.container.wistiaApi = this;
          this._startingHtml = this.container.innerHTML;
          ref15 = Array.prototype.slice.call(this.container.childNodes);
          for (m = 0, len2 = ref15.length; m < len2; m++) {
            child = ref15[m];
            if (!elemHasClass(child, 'wistia_swatch')) {
              elemRemove(child);
            }
          }
          elemAddClass(this.container, 'wistia_embed_initialized');
        }
      } else if (typeof this._containerId === 'string') {
        this.container = document.querySelector("[unique-id='" + this._containerId + "']");
        this._startingHtml = this.container.innerHTML;
      }
      return this.info('container', this.container);
    };

    PublicApi.prototype._setupTranslationApiForLegacyEmbeds = function() {
      if (this.container && this.container.tagName === 'WISTIA-PLAYER' && this.container.getAttribute('use-web-component') && !this.container.translationApi) {
        this.translationApi = new TranslationApi(this.container);
        return this.container.translationApi = this.translationApi;
      }
    };

    PublicApi.prototype._inferPropertiesBeforeMediaData = function() {
      var opt, ref13, ref14, ref15, ref16, ref17, ref18;
      this.chrome = elemFromObject({
        id: seqId('wistia_chrome_'),
        "class": 'w-chrome notranslate',
        style: generateRelativeBlockCss,
        tabindex: -1
      });
      elemStyle(this.chrome, {
        outline: 'none',
        overflow: 'hidden',
        boxSizing: 'content-box',
        mozBoxSizing: 'content-box',
        webkitBoxSizing: 'content-box'
      });
      if (this.container.tagName === 'WISTIA-PLAYER' && ((ref13 = this._givenOptions) != null ? (ref14 = ref13.mediaData) != null ? ref14.mediaType : void 0 : void 0) !== 'Audio') {
        elemStyle(this.chrome, {
          aspectRatio: ((ref15 = this._givenOptions) != null ? (ref16 = ref15.embedOptions) != null ? ref16.aspect : void 0 : void 0) || ((ref17 = this._givenOptions) != null ? (ref18 = ref17.mediaData) != null ? ref18.aspectRatio : void 0 : void 0) || DEFAULT_ASPECT
        });
      }
      opt = this._gatherOptions();
      if (this._shouldBePopover()) {
        this._popoverContainer = elemFromObject({
          role: 'dialog',
          id: this.container.id + "_popover_container"
        });
        if (!(Wistia.detect.safari || Wistia.detect.iphone || Wistia.detect.ipad)) {
          this._popoverContainer.setAttribute('aria-modal', true);
        }
        this._embedContainer = elemFromObject({
          id: this.container.id + "_popover",
          style: {
            height: (this._popoverSize(opt).height) + "px",
            width: (this._popoverSize(opt).width) + "px"
          }
        });
        if (this.container.tagName === 'WISTIA-PLAYER') {
          elemStyle(this._embedContainer, {
            position: 'absolute'
          });
        }
        elemAppend(this._popoverContainer, this._embedContainer);
        elemAppend(document.body, this._popoverContainer);
      } else {
        this._embedContainer = this.container;
      }
      elemAppend(this._embedContainer, this.chrome);
      if (opt.uuid) {
        this.uuid = opt.uuid;
      } else {
        this.uuid = seqId();
      }
      this.info('uuid', this.uuid);
      if (opt.playlistLoop != null) {
        this._attrs.playlistLoop = opt.playlistLoop;
      }
      if (this._embedContainer) {
        this._attrs.startingWidth = elemWidth(this._embedContainer);
        return this._attrs.startingHeight = elemHeight(this._embedContainer);
      }
    };

    PublicApi.prototype._shouldBePopover = function() {
      var opt;
      opt = this._gatherOptions();
      return !opt._inIframe && (opt.wistiaPopover === true || opt.popover === true || opt.popover === 'v2');
    };

    PublicApi.prototype._popoverSize = function(opt) {
      var height, nonHdAsset, ref13, ref14, width;
      if (opt == null) {
        opt = this._opts;
      }
      if (opt == null) {
        opt = {};
      }
      if (opt.popoverSize) {
        ref14 = ((ref13 = opt.popoverSize) != null ? ref13.split('x') : void 0) || [640, 360], width = ref14[0], height = ref14[1];
        width = parseInt(width);
        height = parseInt(height);
      } else if (this._mediaData) {
        if (nonHdAsset = this.asset({
          container: 'mp4',
          width: [0, 960],
          sortBy: 'width desc'
        })) {
          width = nonHdAsset.width;
          height = nonHdAsset.height;
        } else {
          width = 640;
          height = 360;
        }
      } else {
        width = 640;
        height = 360;
      }
      return {
        width: width,
        height: height
      };
    };

    PublicApi.prototype._inferPropertiesAfterMediaData = function() {
      var captionsBackgroundColorDidChange, captionsBorderRadiusDidChange, captionsFontFamilyDidChange, captionsTextSizeDidChange, lastCaptionsBackgroundColor, lastCaptionsBorderRadius, lastCaptionsFontFamily, lastCaptionsTextSize, lastPlayerColor, playerColorDidChange, qualityMax, qualityMin, ref13, ref14, ref15, ref16, ref17, ref18, urlEmail;
      if (this.container.tagName === 'WISTIA-PLAYER') {
        if (this.isAudio()) {
          this.chrome.style.aspectRatio = '';
        } else {
          elemStyle(this.chrome, {
            aspectRatio: ((ref13 = this._mediaData.embedOptions) != null ? ref13.aspect : void 0) || this._mediaData.aspectRatio
          });
        }
      }
      if (this._opts.authorization) {
        this._attrs.authorization = this._opts.authorization;
      }
      this._attrs.shouldTrack = !this._opts.doNotTrack;
      this._attrs.seekThreshold = this._opts.seekThreshold || 1.5;
      ref14 = inferQualityRangeFromOpts(this._opts, this._mediaData), qualityMin = ref14[0], qualityMax = ref14[1];
      this._attrs.qualityMin = qualityMin;
      this._attrs.qualityMax = qualityMax;
      if (((ref15 = this.container.parentNode) != null ? ref15.classList.contains('wistia_responsive_wrapper') : void 0) && ((ref16 = this.container.parentNode) != null ? (ref17 = ref16.parentNode) != null ? ref17.classList.contains('wistia_responsive_padding') : void 0 : void 0)) {
        this.container.parentNode.style.height = '100%';
        this.container.parentNode.style.left = 0;
        this.container.parentNode.style.position = 'absolute';
        this.container.parentNode.style.top = 0;
        this.container.parentNode.style.width = '100%';
        this.container.parentNode.parentNode.style.padding = ((1 / this._mediaData.aspectRatio) * 100) + "% 0 0 0";
        this.container.parentNode.parentNode.style.position = "relative";
      }
      if (this._opts.videoQuality) {
        countMetric('legacy/video-quality-set', 1, {
          hashedId: this._hashedId,
          videoQuality: this._opts.videoQuality,
          url: window.location.href
        });
      }
      if (this._attrs.qualityMax < this._attrs.qualityMin) {
        this.error("qualityMax " + this._attrs.qualityMax + " is less than qualityMin " + this._attrs.qualityMin + ". Setting qualityMax to " + this._attrs.qualityMin + ".");
        this._attrs.qualityMax = this._attrs.qualityMin;
      }
      this._attrs.pageUrl = this._inferPageUrl();
      if (!this._attrs.referrerUrl) {
        this._attrs.referrerUrl = ((ref18 = this._opts) != null ? ref18.referrerUrl : void 0) || document.referrer;
      }
      if (this._opts.trackEmail != null) {
        this._attrs.email = this._opts.trackEmail;
      }
      if (!this._attrs.email && this._attrs.shouldTrack) {
        urlEmail = extractEmailFromParams(this._attrs.pageUrl);
        if (urlEmail) {
          this._attrs.email = urlEmail;
        }
      }
      if (!this._attrs.email && Wistia.localStorage([this._attrs.pageUrl, "trackEmail"])) {
        this._attrs.email = Wistia.localStorage([this._attrs.pageUrl, "trackEmail"]);
      }
      lastPlayerColor = this._attrs.playerColor;
      playerColorDidChange = lastPlayerColor && lastPlayerColor !== this._opts.playerColor;
      this._attrs.playerColor = sanePlayerColor(this._opts.playerColor || '636155');
      if (playerColorDidChange) {
        this.container.dispatchEvent(new CustomEvent('playercolorchange', {
          detail: {
            color: this._attrs.playerColor,
            prevColor: lastPlayerColor
          }
        }));
      }
      lastCaptionsBackgroundColor = this._attrs.captionsBackgroundColor;
      captionsBackgroundColorDidChange = lastCaptionsBackgroundColor && lastCaptionsBackgroundColor !== this._opts.captionsBackgroundColor;
      this._attrs.captionsBackgroundColor = this._opts.captionsBackgroundColor;
      if (captionsBackgroundColorDidChange) {
        this.container.dispatchEvent(new CustomEvent('captionsbackgroundcolorchange', {
          detail: {
            color: this._attrs.captionsBackgroundColor,
            prevColor: lastCaptionsBackgroundColor
          }
        }));
      }
      lastCaptionsTextSize = this._attrs.captionsTextSize;
      captionsTextSizeDidChange = lastCaptionsTextSize && lastCaptionsTextSize !== this._opts.captionsTextSize;
      this._attrs.captionsTextSize = this._opts.captionsTextSize;
      if (captionsTextSizeDidChange) {
        this.container.dispatchEvent(new CustomEvent('captionstextsizechange', {
          detail: {
            size: this._attrs.captionsTextSize,
            prevSize: lastCaptionsTextSize
          }
        }));
      }
      lastCaptionsFontFamily = this._attrs.captionsFontFamily;
      captionsFontFamilyDidChange = lastCaptionsFontFamily && lastCaptionsFontFamily !== this._opts.captionsFontFamily;
      this._attrs.captionsFontFamily = this._opts.captionsFontFamily;
      if (captionsFontFamilyDidChange) {
        this.container.dispatchEvent(new CustomEvent('captionsfontfamilychange', {
          detail: {
            font: this._attrs.captionsFontFamily,
            prevFont: lastCaptionsFontFamily
          }
        }));
      }
      lastCaptionsBorderRadius = this._attrs.captionsBorderRadius;
      captionsBorderRadiusDidChange = lastCaptionsBorderRadius && lastCaptionsBorderRadius !== this._opts.captionsBorderRadius;
      this._attrs.captionsBorderRadius = this._opts.captionsBorderRadius;
      if (captionsBorderRadiusDidChange) {
        this.container.dispatchEvent(new CustomEvent('captionsborderradiuschange', {
          detail: {
            borderRadius: this._attrs.captionsBorderRadius,
            prevBorderRadius: lastCaptionsBorderRadius
          }
        }));
      }
      this._attrs.aspect = this._opts.aspect;
      if (this._opts.audioDescriptionControl !== null && this._opts.audioDescriptionControl !== void 0) {
        this._attrs.audioDescriptionControl = this._opts.audioDescriptionControl;
      }
      if (this._opts.audioDescriptionIsRequired !== null && this._opts.audioDescriptionIsRequired !== void 0) {
        this._attrs.audioDescriptionControl = this._opts.audioDescriptionIsRequired;
      }
      if (this._opts.autoplay !== null && this._opts.autoplay !== void 0) {
        this._attrs.autoplay = this._opts.autoplay;
      } else {
        this._attrs.autoplay = this._opts.autoPlay;
      }
      if (this._opts.bigPlayButton !== null && this._opts.bigPlayButton !== void 0) {
        this._attrs.bigPlayButton = this._opts.bigPlayButton;
      } else {
        this._attrs.bigPlayButton = this._opts.playButton;
      }
      if (this._opts.controlsVisibleOnLoad !== null && this._opts.controlsVisibleOnLoad !== void 0) {
        this._attrs.controlsVisibleOnLoad = this._opts.controlsVisibleOnLoad;
      } else {
        this._attrs.controlsVisibleOnLoad = true;
      }
      if (this._opts.copyLinkAndThumbnailEnabled !== null && this._opts.copyLinkAndThumbnailEnabled !== void 0) {
        this._attrs.copyLinkAndThumbnail = this._opts.copyLinkAndThumbnailEnabled;
      } else if (this._opts.copyLinkAndThumbnail !== null && this._opts.copyLinkAndThumbnail !== void 0) {
        this._attrs.copyLinkAndThumbnail = this._opts.copyLinkAndThumbnail;
      } else {
        this._attrs.copyLinkAndThumbnail = true;
      }
      this._attrs.doNotTrack = this._opts.doNotTrack;
      this._attrs.endVideoBehavior = this._opts.endVideoBehavior || 'default';
      if (this._opts.fullscreenControl !== null && this._opts.fullscreenControl !== void 0) {
        this._attrs.fullscreenControl = this._opts.fullscreenControl;
      } else {
        this._attrs.fullscreenControl = this._opts.fullscreenButton;
      }
      this._attrs.playbackRateControl = this._opts.playbackRateControl;
      if (this._opts.playBarControl !== null && this._opts.playBarControl !== void 0) {
        this._attrs.playBarControl = this._opts.playBarControl;
      } else {
        this._attrs.playBarControl = this._opts.playbar;
      }
      this._attrs.playerBackgroundColor = this._opts.playerBackgroundColor || '#000000';
      this._attrs.playlistLinks = this._opts.playlistLinks;
      if (this._opts.playPauseControl !== null && this._opts.playPauseControl !== void 0) {
        this._attrs.playPauseControl = this._opts.playPauseControl;
      } else {
        this._attrs.playPauseControl = this._opts.smallPlayButton;
      }
      this._attrs.playPauseNotifier = this._opts.playPauseNotifier;
      this._attrs.popoverAnimateThumbnail = this._opts.popoverAnimateThumbnail;
      this._attrs.popoverAnimation = this._opts.popoverAnimation;
      this._attrs.popoverBorderColor = this._opts.popoverBorderColor;
      this._attrs.popoverBorderRadius = this._opts.popoverBorderRadius;
      this._attrs.popoverBorderWidth = this._opts.popoverBorderWidth;
      this._attrs.popoverBoxShadow = this._opts.popoverBoxShadow;
      this._attrs.popoverCaption = this._opts.popoverCaption;
      this._attrs.popoverCaptionContainer = this._opts.popoverCaptionContainer;
      this._attrs.popoverContent = this._opts.popoverContent;
      if (this._opts.popoverDisableAutoplay !== null && this._opts.popoverDisableAutoplay !== void 0) {
        this._attrs.popoverDisableAutoplay = this._opts.popoverDisableAutoplay;
      } else {
        this._attrs.popoverDisableAutoplay = this._opts.popoverDisableAutoPlay;
      }
      this._attrs.popoverShowOnLoad = this._opts.popoverShowOnLoad;
      this._attrs.popoverOverlayColor = this._opts.popoverOverlayColor;
      this._attrs.popoverOverlayOpacity = this._opts.popoverOverlayOpacity;
      this._attrs.popoverPreventScroll = this._opts.popoverPreventScroll;
      if (this._opts.poster !== null && this._opts.poster !== void 0) {
        this._attrs.poster = this._opts.poster;
      } else {
        this._attrs.poster = this._opts.stillUrl;
      }
      this._attrs.preload = this._opts.preload;
      this._attrs.qualityControl = this._opts.qualityControl;
      this._attrs.resumable = this._opts.resumable;
      this._attrs.seo = this._opts.seo;
      if (this.container.tagName === 'WISTIA-PLAYER' && (this._opts.seo === null || this._opts.seo === void 0)) {
        this._attrs.seo = true;
      }
      this._attrs.settingsControl = this._opts.settingsControl;
      if (this._opts.silentAutoplay !== null && this._opts.silentAutoplay !== void 0) {
        this._attrs.silentAutoplay = this._opts.silentAutoplay;
      } else {
        this._attrs.silentAutoplay = this._opts.silentAutoPlay;
      }
      this._attrs.statsUrl = this._opts.statsUrl;
      if (this._opts.transparentLetterbox !== null && this._opts.transparentLetterbox !== void 0) {
        this._attrs.transparentLetterbox = this._opts.transparentLetterbox;
      } else {
        if (this._opts.wmode === 'transparent' || getDefaultPlayerBorderRadius(this._opts) > 0) {
          this._attrs.transparentLetterbox = true;
        }
      }
      if (this._opts.volume) {
        this._attrs.volume = this._opts.volume;
      }
      this._attrs.volumeControl = this._opts.volumeControl;
      if (this._opts.wistiaPopover !== null && this._opts.wistiaPopover !== void 0) {
        this._attrs.wistiaPopover = this._opts.wistiaPopover;
      } else {
        this._attrs.wistiaPopover = this._opts.popover;
      }
      this._attrs.bigPlayButtonBorderRadius = getDefaultBigPlayButtonBorderRadius(this._opts);
      this._attrs.controlBarBorderRadius = getDefaultControlBarBorderRadius(this._opts);
      this._attrs.floatingControlBar = this._opts.floatingControlBar || false;
      this._attrs.controlBarDistance = getDefaultControlBarDistance(this._opts);
      this._attrs.playerBorderRadius = getDefaultPlayerBorderRadius(this._opts);
      this._attrs.roundedPlayer = this._opts.roundedPlayer || 0;
      this._attrs.captionsBackgroundColor = this._opts.captionsBackgroundColor;
      this._attrs.captionsTextColor = this._opts.captionsTextColor;
      this._attrs.captionsTextSize = this._opts.captionsTextSize;
      this._attrs.captionsFontFamily = this._opts.captionsFontFamily;
      this._attrs.captionsBorderRadius = this._opts.captionsBorderRadius;
      if (!this._opts.noDeprecatedProperties) {
        this._setDeprecatedProperties();
      }
      return this;
    };

    PublicApi.prototype._inferPageUrl = function() {
      var ref13;
      if ((ref13 = this._opts) != null ? ref13.pageUrl : void 0) {
        return this._opts.pageUrl;
      } else {
        return inferPageUrl();
      }
    };

    PublicApi.prototype._runMethodsFromOptions = function() {
      var base, isClosedPopover, isMobile, shouldDelayUntilPlay;
      if (this._opts.foreignData != null) {
        this.foreignData(this._opts.foreignData);
      }
      if (this._opts.email != null) {
        this.email(this._opts.email);
      } else if (this._opts.trackEmail != null) {
        this.email(this._opts.trackEmail);
      }
      if (this._opts.playerLanguage != null) {
        this.playerLanguage(this._opts.playerLanguage);
      }
      if (this._opts.videoFoam != null) {
        this.videoFoam(this._opts.videoFoam);
      }
      if (this._opts.controlScaling) {
        this.controlScaling(this._opts.controlScaling);
      }
      this._hasImpl((function(_this) {
        return function() {
          if (_this._opts.playerColor != null) {
            return _this.playerColor(_this._opts.playerColor);
          }
        };
      })(this));
      if (this._attrs.volume != null) {
        this.volume(this._attrs.volume);
      }
      if (!this.isLiveMedia()) {
        if (this._opts.muted === true || this._attrs.volume === 0) {
          this.mute();
        }
        if (this._opts.muted === false) {
          this.unmute();
        }
      }
      if (this._opts.suppressPlay) {
        this.suppressPlay(this._opts.suppressPlay);
      }
      if ((!this.popover || (typeof (base = this.popover).isVisible === "function" ? base.isVisible() : void 0)) && this._attrs.autoplay) {
        this._hasImpl((function(_this) {
          return function() {
            if (_this._playSuspendedOffScreenEnabled()) {
              if (_this.inViewport()) {
                return _this.play();
              } else {
                return _this.bind('enterviewport', function() {
                  _this.play();
                  return _this.unbind;
                });
              }
            } else {
              return _this.play();
            }
          };
        })(this));
      }
      if (this._opts.pause) {
        this.pause();
      }
      if (this._opts.time != null) {
        isMobile = Wistia.detect.iphone || Wistia.detect.ipad || Wistia.detect.android;
        isClosedPopover = this.popover && !this.popover._visible;
        shouldDelayUntilPlay = this.state() !== 'playing' && (isMobile || isClosedPopover);
        return this.time(this._opts.time, {
          lazy: shouldDelayUntilPlay
        });
      }
    };

    PublicApi.prototype._playSuspendedOffScreenEnabled = function() {
      if ((this._opts.playSuspendedOffScreen != null) && this._opts.playSuspendedOffScreen !== 'auto') {
        return this._opts.playSuspendedOffScreen;
      } else {
        return this.isMuted();
      }
    };

    PublicApi.prototype._validate = function() {
      var errors;
      errors = this._errors();
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
        return false;
      } else {
        return true;
      }
    };

    PublicApi.prototype._errors = function() {
      var errors;
      errors = [];
      if (!this.container) {
        errors.push("Could not find element with ID \"" + this._containerId + "\" in DOM. Failed to initialize video \"" + this._hashedId + "\".");
      }
      return errors;
    };

    PublicApi.prototype._dedupContainer = function() {
      var containerId, handle, handleId, j, len, ref13, ref14, ref15, toRemove, uuid;
      if (wData('video')) {
        toRemove = [];
        ref13 = wData('video');
        for (uuid in ref13) {
          handle = ref13[uuid];
          containerId = this.container.uniqueId || this.container.id;
          handleId = ((ref14 = handle.container) != null ? ref14.uniqueId : void 0) || ((ref15 = handle.container) != null ? ref15.id : void 0);
          if (containerId && handleId === containerId) {
            toRemove.push(handle);
          }
        }
        for (j = 0, len = toRemove.length; j < len; j++) {
          handle = toRemove[j];
          handleId = handle.container.uniqueId || handle.container.id;
          this.notice('_dedupContainer', handleId);
          handle.remove();
        }
        if (toRemove.length > 0) {
          return this.container.wistiaApi = this;
        }
      }
    };

    PublicApi.prototype._addToGlobalCache = function() {
      var api;
      this.info('_addToGlobalCache', this.uuid);
      if (this.container.translationApi) {
        api = this.container.translationApi;
      } else {
        api = this;
      }
      return wData(['video', this.uuid], api);
    };

    PublicApi.prototype._displayServerError = function(errorResponse) {
      var baseUrl;
      if (this.container.tagName === 'WISTIA-PLAYER') {
        if (errorResponse.iframe) {
          baseUrl = (eV1Protocol()) + "//" + (eV1HostWithPort());
          this.container.shadowRoot.innerHTML = "<iframe src='" + baseUrl + "/embed/iframe/" + (this.hashedId()) + "' height='" + (this.height()) + "' width='" + (this.width()) + "' frameborder='0' scrolling='no'></iframe>";
        } else {
          this.container.shadowRoot.innerHTML = "<div style='background:#fff;border:2px dashed #ddd;color:#aaa;font-family:Century Gothic,Arial;font-size:14px;text-align:center;width:" + (this.width()) + ";height:" + (this.height()) + ";'><div style='padding:20px;'>" + (errorResponse.message || errorResponse.error) + "</div></div>";
        }
      }
      if (errorResponse.iframe) {
        baseUrl = (eV1Protocol()) + "//" + (eV1HostWithPort());
        return this.container.innerHTML = "<iframe src='" + baseUrl + "/embed/iframe/" + (this.hashedId()) + "' height='" + (this.height()) + "' width='" + (this.width()) + "' frameborder='0' scrolling='no'></iframe>";
      } else {
        return this.container.innerHTML = "<div style='background:#fff;border:2px dashed #ddd;color:#aaa;font-family:Century Gothic,Arial;font-size:14px;text-align:center;width:" + (this.width()) + ";height:" + (this.height()) + ";'><div style='padding:20px;'>" + (errorResponse.message || errorResponse.error) + "</div></div>";
      }
    };

    PublicApi.prototype._implExec = function() {
      var args, methodName;
      methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      this._hasImpl((function(_this) {
        return function() {
          var ref13;
          if (_this._impl[methodName]) {
            if (_this._impl[methodName]._originalMethod === _this[methodName] && _this[methodName] !== void 0) {
              _this.warn("calling " + methodName + " would result in an infinite loop");
              return;
            }
            return (ref13 = _this._impl)[methodName].apply(ref13, args);
          } else {
            return _this.warn(methodName + " is not defined", Wistia.stacktrace());
          }
        };
      })(this));
      return this;
    };

    PublicApi.prototype._implGet = function() {
      var args, defaultReturn, methodName, ref13;
      methodName = arguments[0], defaultReturn = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (defaultReturn == null) {
        defaultReturn = null;
      }
      if (this._hasImpl()) {
        if (this._impl[methodName]) {
          if (this._impl[methodName]._originalMethod === this[methodName] && this[methodName] !== void 0) {
            this.warn("calling " + methodName + " would result in an infinite loop");
            return;
          }
          return (ref13 = this._impl)[methodName].apply(ref13, args);
        } else {
          return this.warn(methodName + " is not defined", Wistia.stacktrace());
        }
      } else {
        return defaultReturn;
      }
    };

    PublicApi.prototype._implSetOrGet = function() {
      var args, defaultReturn, methodName;
      methodName = arguments[0], defaultReturn = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (args.length > 0) {
        return this._implExec.apply(this, [methodName].concat(slice.call(args)));
      } else {
        return this._implGet(methodName, defaultReturn);
      }
    };

    PublicApi.prototype._implPromise = function() {
      var args, methodName;
      methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this._hasImpl(function() {
            var ref13, result;
            if (_this._impl[methodName]) {
              if (_this._impl[methodName]._originalMethod === _this[methodName] && _this[methodName] !== void 0) {
                _this.warn("calling " + methodName + " would result in an infinite loop");
                return;
              }
              result = (ref13 = _this._impl)[methodName].apply(ref13, args);
              if (result instanceof Promise) {
                return result.then(resolve)["catch"](reject);
              } else {
                return resolve(result);
              }
            } else {
              return reject(new Error(methodName + " is not defined on _impl"));
            }
          });
        };
      })(this));
    };

    PublicApi.prototype._commandQueueImplPromise = function() {
      var args, methodName;
      methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      this._hasImpl((function(_this) {
        return function() {
          if (_this._impl[methodName] && _this._impl.commandQueueOpen) {
            if (_this._impl[methodName]._originalMethod === _this[methodName] && _this[methodName] !== void 0) {
              _this.warn("calling " + methodName + " would result in an infinite loop");
              return;
            }
            return _this._impl.commandQueueOpen.synchronize(function(done) {
              var ref13;
              if (_this._impl) {
                return (ref13 = _this._impl)[methodName].apply(ref13, args)["finally"](function() {
                  return done();
                });
              } else {
                return Promise.resolve();
              }
            });
          } else {
            return _this.warn(methodName + " is not defined", Wistia.stacktrace());
          }
        };
      })(this));
      return this;
    };

    PublicApi.prototype.rebuild = function() {
      return this._hasImpl((function(_this) {
        return function() {
          _this._impl.rebuild();
          return _this._runMethodsFromOptions();
        };
      })(this));
    };

    PublicApi.prototype.fullRebuild = function(options) {
      if (options == null) {
        options = {};
      }
      return this.replaceWith(this._impl._mediaData, merge({
        force: this._impl.playerType,
        inPlace: false,
        transition: 'none'
      }, options));
    };

    PublicApi.prototype.rebuildAs = function(platformPreference, options) {
      if (options == null) {
        options = {};
      }
      return this.fullRebuild(merge(this._givenOptions, options, {
        force: platformPreference,
        transition: 'none'
      }));
    };

    PublicApi.prototype.replace = function(hashedId, options) {
      if (options == null) {
        options = {};
      }
      return this.replaceWith(hashedId, merge({
        inlineOptionsOnly: true
      }, options));
    };

    PublicApi.prototype.replaceWith = function(hashedId, options) {
      var replaceWithFn;
      if (options == null) {
        options = {};
      }
      this.info('replaceWith', hashedId, options);
      replaceWithFn = (function(_this) {
        return function() {
          var gatheredOpts, mediaData, optsForFetch, replaceFn;
          replaceFn = _this._impl ? _this._replaceWithMediaData : _this._initWithMediaData;
          _this._impl.trigger('beforereplace', hashedId);
          _this._notReplacing(false);
          _this.hasData(false);
          _this._hasImpl(false);
          _this._initTime = new Date().getTime();
          _this.hasData(function() {
            _this._hasDataTime = new Date().getTime();
            return _this.embedded(function() {
              return _this._embeddedTime = new Date().getTime();
            });
          });
          if (isObject(hashedId)) {
            return replaceFn.call(_this, hashedId, options);
          } else if (mediaData = Wistia.mediaFromCache(hashedId)) {
            return replaceFn.call(_this, mediaData, options);
          } else {
            gatheredOpts = clone(_this._gatherOptions());
            optsForFetch = merge({}, gatheredOpts, options);
            return fetchMedia(hashedId, optsForFetch).then(function(mediaData) {
              return replaceFn.call(_this, mediaData, options);
            })["catch"](function() {
              return countMetric('player/failure/replace-failed');
            });
          }
        };
      })(this);
      this._hasImpl((function(_this) {
        return function() {
          return _this._notReplacing(replaceWithFn);
        };
      })(this));
      return this;
    };

    PublicApi.prototype._replaceWithMediaData = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this._impl.commandQueueOpen.synchronize((function(_this) {
        return function(done) {
          _this._replaceWithMediaDataQueuable.apply(_this, args);
          return _this._notReplacing(done);
        };
      })(this));
    };

    PublicApi.prototype._replaceWithMediaDataQueuable = function(mediaData, options) {
      var engine, implVersion, inPlace, inPlacePreference, inlineOptionsOnly, newPlayerType, oldImpl, oldImplStopGo, ref13, ref14, ref15, ref16, resolveOldImplStopGo, transition, transitionTime;
      if (options == null) {
        options = {};
      }
      options = clone(options);
      this.info('_replaceWithMediaData', mediaData, options);
      if (mediaData.error) {
        this._displayServerError(mediaData);
        this.trigger('servererror');
        return;
      }
      if (options.playlistIndex != null) {
        this._playlistIndex = options.playlistIndex;
        delete options.playlistIndex;
      } else if (this._inPlaylist(mediaData.hashedId)) {
        this._playlistIndex = this._playlistIndexOf(mediaData.hashedId);
      }
      if (options.playlistShouldAutoAdvance != null) {
        this._playlistShouldAutoAdvance = options.playlistShouldAutoAdvance;
      }
      if (options.inlineOptionsOnly) {
        inlineOptionsOnly = options.inlineOptionsOnly;
        delete options.inlineOptionsOnly;
      }
      if (options.inPlace != null) {
        inPlacePreference = options.inPlace;
        delete options.inPlace;
      }
      if (options.transition != null) {
        transition = options.transition;
        delete options.transition;
      }
      if (options.transitionTime != null) {
        transitionTime = options.transitionTime;
        delete options.transitionTime;
      }
      this.hasData(false);
      this._hasImpl(false);
      if ((ref13 = this._impl._tracker) != null) {
        ref13.stopMonitoring();
      }
      this._clobberVideoBindings();
      this._savedState = {};
      this._suspended = false;
      oldImpl = this._impl;
      if (typeof oldImpl.wipeOutstandingAsyncFunctions === "function") {
        oldImpl.wipeOutstandingAsyncFunctions();
      }
      this._hashedId = mediaData.hashedId;
      this._originalMediaData = mediaData;
      this.data.media = mediaData;
      this._givenOptions = options;
      this._mediaData = mediaData;
      this.container.dispatchEvent(new CustomEvent('loaded-mediadata', {
        detail: {
          mediaData: mediaData
        }
      }));
      this._opts = (inlineOptionsOnly ? this._gatherOptions({
        only: 'inline'
      }) : this._gatherOptions());
      this._embedOptions = null;
      this._mediaData = mediaDataTransforms(mediaData, this._opts);
      oldImpl.trigger('beforereplaceengine');
      oldImpl.freezeLastFrame();
      oldImplStopGo = new StopGo();
      resolveOldImplStopGo = function() {
        return oldImplStopGo.go();
      };
      if (inUserEventContext() && this._attrs.autoplay === true && !oldImpl.isMuted()) {
        engine = oldImpl.engine;
        if (engine) {
          engine.stopStreaming();
          engine.play().then(resolveOldImplStopGo)["catch"](resolveOldImplStopGo);
          setTimeout(resolveOldImplStopGo, 2000);
        } else {
          resolveOldImplStopGo();
        }
      } else {
        resolveOldImplStopGo();
      }
      if (cast((ref14 = this._mediaData.embedOptions.plugin) != null ? (ref15 = ref14.passwordProtectedVideo) != null ? ref15.on : void 0 : void 0) === false) {
        if (((ref16 = this._opts.plugin) != null ? ref16.passwordProtectedVideo : void 0) != null) {
          this._opts.plugin.passwordProtectedVideo.on = false;
        }
      }
      this.info('_opts', clone(this._opts));
      merge(this._mediaData, this._opts.mediaData);
      this._inferPropertiesAfterMediaData();
      inPlace = (oldImpl.playerType === 'notplayable' ? false : oldImpl.playerType === 'passwordprotected' ? false : oldImpl.playerType === 'html5' && (Wistia.detect.iphone || Wistia.detect.android || Wistia.detect.ipad || Wistia.detect.safari) ? true : inPlacePreference != null ? inPlacePreference : false);
      this.info('inPlace', inPlace);
      newPlayerType = Judy.choosePlayer(this.judyCtx(), this._mediaData, this._opts);
      this._playerPlugins = Judy.playerPlugins(this.judyCtx(), newPlayerType, this._mediaData, this._opts);
      Judy.logWarnings(this.judyCtx(), newPlayerType, this._mediaData, this._opts);
      if (inPlace) {
        this.removePlugins();
        oldImpl.stopStreaming();
      }
      this.plugin = null;
      this._pluginStopGos = {};
      this._definePluginMethod();
      this.hasPlugins(false);
      oldImpl.commandQueueOpen.setQueue([]);
      this.removeSwatch();
      this._implVersion += 1;
      implVersion = this._implVersion;
      return oldImplStopGo((function(_this) {
        return function() {
          var ref17;
          if ((ref17 = oldImpl.engine) != null) {
            ref17.destroy();
          }
          return _this._execPlugins().then(function() {
            var base, klass, ref18;
            if (_this._implVersion !== implVersion) {
              _this.notice('replaceWith(): impl changed from', implVersion, 'to', _this._implVersion, 'not completing replacement');
              return;
            }
            _this.hasPlugins(true);
            _this.supportedPlayers = Judy.supportedPlayers(_this.judyCtx(), _this._mediaData.assets);
            klass = Wistia.PublicApi.classFor(newPlayerType);
            _this._impl = new klass(_this).init();
            _this._setupBindings();
            if (inPlace) {
              _this.grid = _this._impl.grid = oldImpl.grid;
            } else {
              _this.grid = _this._impl.setupGrid({
                initDimensions: false
              });
            }
            if (typeof (base = _this._impl).transferStateFrom === "function") {
              base.transferStateFrom(oldImpl);
            }
            _this._hasImpl(true);
            _this.hasData(true);
            if (!inPlace) {
              _this._runMethodsFromOptions();
            }
            if (inPlace) {
              _this._replaceMode(function() {
                return _this._impl.initFrom(oldImpl);
              });
            } else {
              _this._replaceMode(function() {
                return _this._embedWithTransitionFrom(oldImpl, transition, {
                  time: transitionTime
                });
              });
            }
            _this.embedded(function() {
              return _this._notReplacing(true);
            });
            if (inPlace) {
              _this._runMethodsFromOptions();
            }
            if (_this._allowContainerMatch()) {
              if (_this._allowFoam() && !oldImpl._opts.videoFoam) {
                _this.container.style.width = '';
                _this.container.style.height = '';
              }
              if ((ref18 = _this._impl) != null) {
                ref18.width(_this.containerWidth(), {
                  constrain: true
                });
              }
            }
            doTimeout(_this._impl.uuid + ".inject_json_ld", function() {
              return _this._injectJsonLd();
            });
            _this.trigger('afterreplace');
            _this.container.dispatchEvent(new CustomEvent('afterreplace', {
              detail: {
                api: _this
              }
            }));
            return doTimeout(_this.uuid + ".prefetch_next_media", (function() {
              return _this.prefetchNextMedia();
            }), 2000);
          });
        };
      })(this));
    };

    PublicApi.prototype._embedWithTransitionFrom = function(oldImpl, transition, more) {
      var whenAutoPlayOrEmbedded;
      if (transition == null) {
        transition = 'none';
      }
      this.info('_embedWithTransitionFrom', oldImpl, transition);
      if (transition !== 'none') {
        countMetric('player/replacewith-transition', 1, {
          transition: transition,
          hashedId: this._hashedId,
          url: window.location.href
        });
      }
      whenAutoPlayOrEmbedded = new Promise((function(_this) {
        return function(resolve) {
          var ref13, unbindPlay;
          if ((ref13 = _this._impl.lastPlayInfo()) != null ? ref13.isPending : void 0) {
            unbindPlay = _this._impl.on('play', function() {
              unbindPlay();
              return resolve();
            });
            return doTimeout(_this._impl.uuid + ".slow_play_fallback", function() {
              return _this._impl.embedded(function() {
                unbindPlay();
                return resolve();
              });
            }, 2000);
          } else {
            return _this._impl.embedded(resolve);
          }
        };
      })(this));
      if (transition === 'slide' || transition === 'slideleft') {
        this.info('slideleft');
        this._impl.embed(oldImpl);
        return whenAutoPlayOrEmbedded.then((function(_this) {
          return function() {
            oldImpl.slideOutLeft(more, function() {
              return oldImpl.remove();
            });
            return _this._impl.slideInLeft(more, function() {
              return _this._impl.trigger('transitiondone');
            });
          };
        })(this));
      } else if (transition === 'slideright') {
        this.info('slideright');
        this._impl.embed(oldImpl);
        return whenAutoPlayOrEmbedded.then((function(_this) {
          return function() {
            oldImpl.slideOutRight(more, function() {
              return oldImpl.remove();
            });
            return _this._impl.slideInRight(more, function() {
              return _this._impl.trigger('transitiondone');
            });
          };
        })(this));
      } else if (transition === 'fade') {
        this.info('fade');
        if (oldImpl._attrs.transparentLetterbox !== true) {
          oldImpl.grid.center.style.backgroundColor = '#000';
        }
        if (more.time != null) {
          more.time = Math.round(more.time / 2);
        }
        return oldImpl.fadeOut(more, (function(_this) {
          return function() {
            var ref13;
            oldImpl.remove();
            if (_this._impl._attrs.transparentLetterbox !== true) {
              if ((ref13 = _this._impl.grid) != null) {
                ref13.center.style.backgroundColor = '#000';
              }
            }
            _this._impl.embed(oldImpl);
            return whenAutoPlayOrEmbedded.then(function() {
              return _this._impl.fadeIn(more, function() {
                var ref14;
                if ((ref14 = _this._impl) != null) {
                  ref14.grid.center.style.backgroundColor = '';
                }
                return _this._impl.trigger('transitiondone');
              });
            });
          };
        })(this));
      } else if (transition === 'crossfade') {
        this.info('crossfade');
        if (oldImpl.grid) {
          elemStyle(oldImpl.grid.root, {
            position: 'absolute',
            zIndex: 0
          });
        }
        elemStyle(this._impl.grid.root, {
          zIndex: 1
        });
        this._impl.embed(oldImpl);
        return whenAutoPlayOrEmbedded.then((function(_this) {
          return function() {
            return _this._impl.fadeIn(more, function() {
              oldImpl.remove();
              elemStyle(_this._impl.grid.root, {
                zIndex: ''
              });
              return _this._impl.trigger('transitiondone');
            });
          };
        })(this));
      } else {
        this.info('no transition');
        this._impl.embed(oldImpl);
        oldImpl.remove();
        return whenAutoPlayOrEmbedded.then((function(_this) {
          return function() {
            return setTimeout((function() {
              if (_this._impl) {
                return _this._impl.trigger('transitiondone');
              }
            }), 0);
          };
        })(this));
      }
    };

    PublicApi.prototype._clobberVideoBindings = function() {
      var k, ref13, results, v;
      ref13 = this._bindings;
      results = [];
      for (k in ref13) {
        v = ref13[k];
        if (!(k === 'afterreplace' || k === 'beforereplace' || k === 'all')) {
          results.push(this.unbind(k));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    PublicApi.prototype._replaceMode = function(fn) {
      this.info('_replaceMode', true);
      this._impl._replacing = true;
      fn();
      return this._impl.embedded((function(_this) {
        return function() {
          _this._impl._replacing = false;
          return _this.info('_replaceMode', false);
        };
      })(this));
    };

    PublicApi.prototype.remove = function(opts) {
      var ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref20, ref21;
      if (opts == null) {
        opts = {};
      }
      this.info('remove');
      this.trigger('down');
      this.trigger('beforeremove');
      this._freeEmbedSlot();
      if ((ref13 = this.elem()) != null) {
        if ((ref14 = ref13.mux) != null) {
          if (typeof ref14.destroy === "function") {
            ref14.destroy();
          }
        }
      }
      this.removeSwatch();
      this._implExec('remove', {
        trigger: false
      });
      this._hasImpl(false);
      removeInjectedJsonLd(this._jsonLdId);
      if ((ref15 = this.popover) != null) {
        if (typeof ref15.remove === "function") {
          ref15.remove();
        }
      }
      if ((ref16 = this._impl) != null) {
        ref16.stopStreaming();
      }
      if ((ref17 = this._intersectionObserver) != null) {
        ref17.disconnect();
      }
      elemUnbindAll(this._foamDummyElem);
      elemRemove(this._foamDummyElem);
      if ((ref18 = Wistia.eventLoop) != null) {
        ref18.remove(this.uuid);
      }
      if ((ref19 = this._resizeObserver) != null) {
        ref19.disconnect();
      }
      this._resizeObserver = null;
      clearTimeouts(this.uuid);
      this._unbindListeners();
      elemRemove(this.chrome);
      wRemoveData(['video', this.uuid]);
      this.trigger('afterremove');
      this._bindings = {};
      if (this.container.tagName === 'WISTIA-PLAYER' && this.container.getAttribute('use-web-component')) {
        elemRemove(this.container);
      }
      if (opts.unsetWistiaApiOnContainer) {
        this.container.wistiaApi = void 0;
        if (this.container.tagName === 'WISTIA-PLAYER' && this.container.getAttribute('use-web-component')) {
          this.container.originalContainer.uniqueId = this.container.uniqueId;
          this.container.originalContainer._convertingToAurora = false;
          elemRemove(this.container);
        }
      } else {
        this.container.wistiaApi = 'removed';
      }
      this._impl = null;
      if ((ref20 = window.__wistiaStores) != null) {
        ref20[this.uuid] = null;
      }
      return (ref21 = window.__wistiaStores) != null ? delete ref21[this.uuid] : void 0;
    };

    PublicApi.prototype.removeSwatch = function() {
      var ref13, swatch;
      swatch = this.container.querySelector('.wistia_swatch') || ((ref13 = this.container.originalContainer) != null ? ref13.querySelector('.wistia_swatch') : void 0);
      if (swatch) {
        elemRemove(swatch);
      }
      if (this.container.tagName === 'WISTIA-PLAYER') {
        swatch = this.container.shadowRoot.querySelector('.wistia_swatch');
        if (swatch) {
          return elemRemove(swatch);
        }
      }
    };

    PublicApi.prototype.fullRemove = function() {
      var container, embedContainer, popoverContainer;
      embedContainer = this._embedContainer;
      popoverContainer = this._popoverContainer;
      container = this.container;
      this.remove();
      elemRemove(embedContainer);
      elemRemove(popoverContainer);
      elemRemove(container);
      this.container = this._embedContainer = null;
      return this;
    };

    PublicApi.prototype.isRemoved = function() {
      return !wData(['video', this.uuid]);
    };

    PublicApi.prototype._unbindListeners = function() {
      elemUnbindAllInside(this.chrome);
      if (this._throttleTriggerViewport) {
        elemUnbind(window, 'scroll', this._throttleTriggerViewport);
      }
      if (this._doResize) {
        return elemUnbind(window, 'resize', this._doResize);
      }
    };

    PublicApi.prototype._saveState = function() {
      var ref13;
      return this._savedState = {
        state: this.state(),
        time: this.time(),
        volume: this.volume(),
        inFullscreen: this.inFullscreen(),
        uuid: (ref13 = this._impl) != null ? ref13.uuid : void 0
      };
    };

    PublicApi.prototype.suspend = function() {
      var ref13;
      if (this._suspended) {
        return;
      }
      this._saveState();
      this.info('suspend', clone(this._savedState));
      this.pause();
      this.suppressPlay(true);
      if (((ref13 = this._impl) != null ? typeof ref13._inNativeMode === "function" ? ref13._inNativeMode() : void 0 : void 0) || !Wistia.detect.fullscreenEnabled) {
        this.cancelFullscreen();
      }
      this._suspended = true;
      this._suspendPlayBinding = (function(_this) {
        return function() {
          return _this.pause();
        };
      })(this);
      this._suspendSeekBinding = (function(_this) {
        return function() {
          _this.pause();
          return _this.time(_this._savedState.time);
        };
      })(this);
      this.bind('play', this._suspendPlayBinding);
      this.bind('seek', this._suspendSeekBinding);
      this.trigger('suspendstatechange', true);
      return this;
    };

    PublicApi.prototype.unsuspend = function(newState) {
      var ref13, saved, seekOptions;
      if (newState == null) {
        newState = {};
      }
      if (!this._suspended) {
        return;
      }
      saved = merge({}, this._savedState, newState);
      this.info('unsuspend', clone(saved));
      this._suspended = false;
      this.unbind('play', this._suspendPlayBinding);
      this.unbind('seek', this._suspendSeekBinding);
      if (saved.uuid !== ((ref13 = this._impl) != null ? ref13.uuid : void 0)) {
        return this;
      }
      this.suppressPlay(false);
      this.volume(saved.volume);
      seekOptions = {
        pause: saved.state !== 'playing'
      };
      if ((saved.time != null) && Math.abs(saved.time - this.time()) > 0.5) {
        if (saved.state === 'ended') {
          this.time(saved.time - 1, seekOptions);
        } else {
          this.time(saved.time, seekOptions);
        }
      }
      if (saved.state === 'playing') {
        this.play();
      }
      this.trigger('suspendstatechange', false);
      return this;
    };

    PublicApi.prototype._setupBindings = function() {
      this.bind('afterend', (function(_this) {
        return function() {
          if (!_this.playlistShouldAutoAdvance()) {
            return;
          }
          if (_this._suspended) {
            return _this.bind('suspendstatechange', function(isSuspended) {
              if (isSuspended === false) {
                if (_this.state() === 'ended') {
                  _this._nextEmbedOrPlaylistLoop();
                }
                return _this.unbind;
              }
            });
          } else {
            return _this._nextEmbedOrPlaylistLoop();
          }
        };
      })(this));
      this.bind('widthchange', (function(_this) {
        return function() {
          var ref13, ref14;
          if ((ref13 = _this._impl) != null) {
            ref13._width = _this._width = _this.width();
          }
          return (ref14 = _this._impl) != null ? ref14._videoWidth = _this._videoWidth = _this.videoWidth() : void 0;
        };
      })(this));
      this.bind('heightchange', (function(_this) {
        return function() {
          _this._impl._height = _this._height = _this.height();
          return _this._impl._videoHeight = _this._videoHeight = _this.videoHeight();
        };
      })(this));
      if (this.looksUp()) {
        this.inViewport(this._isInViewportNow());
        if (this.inViewport()) {
          this.trigger('enterviewport');
        } else {
          this.trigger('leaveviewport');
        }
      }
      this._intersectionObserver = new window.IntersectionObserver((function(_this) {
        return function(entries) {
          if (entries[0].isIntersecting) {
            _this.trigger('enterviewport');
            return _this.inViewport(true);
          } else {
            _this.trigger('leaveviewport');
            return _this.inViewport(false);
          }
        };
      })(this));
      this._intersectionObserver.observe(this.container);
      return elemRebind(window, 'resize', this._doResize);
    };

    PublicApi.prototype._nextEmbedOrPlaylistLoop = function() {
      if (this.nextVideo()) {
        return this.embedNext();
      } else if (this._attrs.playlistLoop) {
        this.info('playlistLoop');
        return this.embedIndex(0, {
          autoPlay: true
        });
      }
    };

    PublicApi.prototype._isInViewportNow = function() {
      var offset, offsetBottom, offsetTop, scrollBottom, scrollTopDistance;
      if (this.down() || this.looksDown()) {
        return false;
      }
      if (!window.IntersectionObserver && top !== self) {
        return true;
      }
      offset = elemOffset(this.container);
      offsetTop = offset.top;
      offsetBottom = offsetTop + elemHeight(this.container);
      scrollTopDistance = scrollTop();
      scrollBottom = scrollTop() + elemHeight(window);
      return (offsetTop >= scrollTopDistance && offsetTop < scrollBottom) || (offsetBottom >= scrollTopDistance && offsetBottom < scrollBottom) || (offsetTop <= scrollTopDistance && offsetBottom >= scrollBottom);
    };

    PublicApi.prototype._pauseEventLoop = function() {
      var ref13;
      Wistia.eventLoop.pause(this.uuid);
      if ((ref13 = this._impl) != null ? ref13.uuid : void 0) {
        return Wistia.eventLoop.pause(this._impl.uuid);
      }
    };

    PublicApi.prototype._unpauseEventLoop = function() {
      var ref13;
      Wistia.eventLoop.unpause(this.uuid);
      if ((ref13 = this._impl) != null ? ref13.uuid : void 0) {
        return Wistia.eventLoop.unpause(this._impl.uuid);
      }
    };

    PublicApi.prototype.playlistIndex = function() {
      return this._playlistIndexOf(this.hashedId());
    };

    PublicApi.prototype.nextVideo = function() {
      if (this.playlistIndex() >= 0) {
        return this._playlist[this.playlistIndex() + 1] || null;
      } else {
        return null;
      }
    };

    PublicApi.prototype.previousVideo = function() {
      if (this.playlistIndex() > 0) {
        return this._playlist[this.playlistIndex() - 1] || null;
      } else {
        return null;
      }
    };

    PublicApi.prototype._playlistIndexOf = function(hashedId) {
      var i, j, ref13, ref14;
      for (i = j = 0, ref13 = this._playlist.length; 0 <= ref13 ? j <= ref13 : j >= ref13; i = 0 <= ref13 ? ++j : --j) {
        if (((ref14 = this._playlist[i]) != null ? ref14.hashedId : void 0) === hashedId) {
          return i;
        }
      }
      return -1;
    };

    PublicApi.prototype._inPlaylist = function(hashedId) {
      return this._playlistIndexOf(hashedId) >= 0;
    };

    PublicApi.prototype._setTransitionOptions = function(options) {
      if (!options.transition) {
        options.transition = this._opts.playlistTransition || 'fade';
      }
      if (!options.transitionTime) {
        options.transitionTime = this._opts.playlistTransitionTime;
      }
      if (options.playlistIndex && options.transition === 'slide') {
        if (options.playlistIndex >= this._playlistIndex) {
          return options.transition = 'slideleft';
        } else {
          return options.transition = 'slideright';
        }
      }
    };

    PublicApi.prototype.embedNext = function(extra) {
      var options, video;
      video = this.nextVideo();
      this.info('embedNext', video);
      options = merge({
        autoPlay: true,
        resumable: false
      }, video.options, extra);
      options.playlistIndex = this._playlistIndex + 1;
      options.playlistShouldAutoAdvance = this._playlistShouldAutoAdvance;
      this._setTransitionOptions(options);
      return this.replaceWith(video.hashedId, options);
    };

    PublicApi.prototype.embedPrevious = function(extra) {
      var options, video;
      video = this.previousVideo();
      this.info('embedPrevious', video);
      options = merge({
        autoPlay: true,
        resumable: false
      }, video.options, extra);
      options.playlistIndex = this._playlistIndex - 1;
      options.playlistShouldAutoAdvance = this._playlistShouldAutoAdvance;
      return this.replaceWith(video.hashedId, options);
    };

    PublicApi.prototype.embedIndex = function(index, extra) {
      var options, video;
      video = this._playlist[index];
      this.info('embedIndex', index, video);
      options = merge({
        autoPlay: true
      }, video.options, extra);
      options.playlistIndex = index;
      options.playlistShouldAutoAdvance = this._playlistShouldAutoAdvance;
      return this.replaceWith(video.hashedId, options);
    };

    PublicApi.prototype.addToPlaylist = function(hashedIds, embedOptions, positionOptions) {
      var entry, hashedId, j, len, ref13;
      if (embedOptions == null) {
        embedOptions = {};
      }
      if (positionOptions == null) {
        positionOptions = {};
      }
      if (this._playlist == null) {
        this._playlist = [];
      }
      ref13 = toArray(hashedIds);
      for (j = 0, len = ref13.length; j < len; j++) {
        hashedId = ref13[j];
        entry = {
          hashedId: hashedId,
          options: embedOptions
        };
        positionOptions = clone(positionOptions);
        if (positionOptions.after) {
          positionOptions.detect = function(v) {
            return v.hashedId === positionOptions.after;
          };
        } else if (positionOptions.before) {
          positionOptions.detect = function(v) {
            return v.hashedId === positionOptions.before;
          };
        }
        this.info('addToPlaylist', entry, positionOptions);
        insertIntoArray(this._playlist, entry, positionOptions);
        this.hasData((function(_this) {
          return function() {
            var ref14, ref15;
            if (hashedId === ((ref14 = _this.nextVideo()) != null ? ref14.hashedId : void 0)) {
              return _this.prefetchMedia(hashedId, embedOptions);
            } else if (hashedId === ((ref15 = _this.previousVideo()) != null ? ref15.hashedId : void 0)) {
              return _this.prefetchMedia(hashedId, embedOptions);
            }
          };
        })(this));
      }
      this.info('updated _playlist', clone(this._playlist));
      this.trigger('playlistchange', this._playlist);
      return this._playlist;
    };

    PublicApi.prototype.setPlaylist = function(hashedIds, embedOptions) {
      if (embedOptions == null) {
        embedOptions = {};
      }
      this._playlist = [];
      this.addToPlaylist(hashedIds, embedOptions);
      this._playlistIndex = this._playlistIndexOf(this.hashedId());
      return this.trigger('playlistchange', this._playlist);
    };

    PublicApi.prototype.playlistShouldAutoAdvance = function() {
      if (this._playlistShouldAutoAdvance != null) {
        return this._playlistShouldAutoAdvance;
      }
      return true;
    };

    PublicApi.prototype.setPlaylistShouldAutoAdvance = function(bool) {
      return this._playlistShouldAutoAdvance = bool;
    };

    PublicApi.prototype.prefetchNextMedia = function() {
      var next;
      if (!this._opts._inLegacyPlaylist && (next = this.nextVideo())) {
        return this.prefetchMedia(next.hashedId, next.options);
      }
    };

    PublicApi.prototype.prefetchMedia = function(hashedId, options) {
      if (options == null) {
        options = {};
      }
      options = assign({
        embedHost: this._opts.embedHost
      }, options);
      this.info('@prefetchMedia', hashedId);
      return fetchMedia(hashedId, clone(options)).then((function(_this) {
        return function(mediaData) {
          var opts;
          _this.info('prefetched', hashedId);
          opts = _this._gatherOptions({
            givenOptions: options,
            mediaData: mediaData,
            hashedId: mediaData.hashedId,
            container: _this.container
          });
          return prefetchEngineAndPlugins(mediaData, opts);
        };
      })(this))["catch"]((function(_this) {
        return function() {
          return countMetric('player/failure/prefetch-failed');
        };
      })(this));
    };

    PublicApi.prototype.addPlugin = function(name, options) {
      if (options == null) {
        options = {};
      }
      this.info('addPlugin', name, options);
      return new Promise((function(_this) {
        return function(resolve) {
          return _this._hasImpl(function() {
            if (!_this.hasPlugin(name)) {
              Wistia.plugin._inject(_this, name, options);
            }
            return _this.plugin(name).then(function(plugin) {
              return resolve(plugin);
            });
          });
        };
      })(this));
    };

    PublicApi.prototype.hasPlugin = function(name) {
      return !!this.plugin[name];
    };

    PublicApi.prototype.turnOffPluginApis = function() {
      var base, pluginHandle, pluginName, ref13, results;
      this.info('turnOffPluginApis');
      ref13 = this.plugin;
      results = [];
      for (pluginName in ref13) {
        pluginHandle = ref13[pluginName];
        results.push(typeof (base = this._pluginStopGos)[pluginName] === "function" ? base[pluginName](false) : void 0);
      }
      return results;
    };

    PublicApi.prototype.removePlugin = function(name) {
      var e, plugin, ref13;
      plugin = this.plugin[name];
      if (!plugin) {
        return;
      }
      try {
        if (typeof plugin.remove === "function") {
          plugin.remove();
        }
      } catch (error1) {
        e = error1;
        setTimeout(((function(_this) {
          return function() {
            throw e;
          };
        })(this)), 0);
      }
      delete this.plugin[name];
      if ((ref13 = this._impl.plugin) != null ? ref13[name] : void 0) {
        delete this._impl.plugin[name];
      }
      if (plugin.uuid && this.plugins) {
        delete this.plugins[this.uuid];
        wRemoveData(['plugins', name, this.uuid, plugin.uuid]);
      }
      return this.trigger('pluginremoved', name);
    };

    PublicApi.prototype.removePlugins = function() {
      var pluginHandle, pluginName, ref13, results;
      this.info('removePlugins');
      ref13 = this.plugin;
      results = [];
      for (pluginName in ref13) {
        pluginHandle = ref13[pluginName];
        results.push(this.removePlugin(pluginName));
      }
      return results;
    };

    PublicApi.prototype.containerWidth = function() {
      return elemWidth(this._embedContainer);
    };

    PublicApi.prototype.containerHeight = function() {
      return elemHeight(this._embedContainer);
    };

    PublicApi.prototype._getScreenScrolls = function(dimensions, viewHeight) {
      var bottom, screenScrolls;
      bottom = dimensions.bottom + window.pageYOffset;
      return screenScrolls = Math.max(0, (bottom / viewHeight) - 1);
    };

    PublicApi.prototype._getEmbedVisibilityMetrics = function() {
      var containerDimensions, dimensions, screenScrolls, videoHeight, viewHeight;
      if (this.embedOptions()._inIframe) {
        return null;
      }
      if (this.isRemoved()) {
        return null;
      }
      viewHeight = elemHeight(window);
      dimensions = this.elem().getBoundingClientRect();
      videoHeight = dimensions.height;
      screenScrolls = this._getScreenScrolls(dimensions, viewHeight);
      if (this.popover) {
        containerDimensions = this.container.getBoundingClientRect();
        screenScrolls = this._getScreenScrolls(containerDimensions, viewHeight);
      }
      return {
        screen_scrolls: screenScrolls,
        ratio_of_screen: videoHeight / viewHeight,
        screen_width: window.screen.width,
        screen_height: window.screen.height
      };
    };

    PublicApi.prototype._getPageTitle = function() {
      return this._attrs.pageTitle || document.title;
    };

    PublicApi.prototype._getBrowserLanguage = function() {
      return window.navigator.language;
    };

    PublicApi.prototype._goToDownState = function() {
      var ref13;
      this.info('_goToDownState');
      this._stateBeforeDown = this._lastState;
      this.up(false);
      this.down(true);
      if ((ref13 = this._impl.engine) != null) {
        ref13.pause();
      }
      this.ready(false);
      return this.trigger('down');
    };

    PublicApi.prototype._goToUpState = function() {
      var ref13;
      this.info('_goToUpState');
      this.down(false);
      this._ignoreUp = true;
      this._doSizing();
      this._ignoreUp = false;
      this.up(true);
      this.ready(false);
      if ((ref13 = this._impl) != null) {
        ref13.checkForReady();
      }
      if (this._stateBeforeDown === 'playing') {
        this.play();
      }
      return this.trigger('up');
    };

    PublicApi.prototype._checkDownState = function() {
      var looksDown;
      looksDown = this.looksDown();
      if (this.up() && looksDown) {
        this.info('moving to down state');
        return this._goToDownState();
      } else if (this.down() && !looksDown) {
        this.info('moving to up state');
        return this._goToUpState();
      }
    };

    PublicApi.prototype._removeHandleIfGoneFromDOM = function() {
      if (!this.embedded()) {
        return false;
      } else if (!this.elem()) {
        this.warn('video element removed from DOM', this._embedContainer.id);
        this.remove();
        return true;
      } else if (this._embedContainer && !this._embedContainer.parentNode) {
        this.warn('container removed from DOM', this._embedContainer.id);
        this.remove({
          unsetWistiaApiOnContainer: true
        });
        return true;
      } else {
        return false;
      }
    };

    PublicApi.prototype._doFoam = function() {
      var dims, distanceFromEdge, newHeight, newVideoHeight, newVideoWidth, newWidth, parentWidthNow, ref13, smallestDim, winAspect, winHeight, winWidth;
      if (this._parentBoxSizing == null) {
        this._parentBoxSizing = elemStyle(this._embedContainer.parentNode, 'box-sizing');
      }
      if (this.container.tagName === 'WISTIA-PLAYER') {
        return;
      }
      if (this.popover) {
        winWidth = elemWidth(window);
        winHeight = elemHeight(window);
        winAspect = winWidth / winHeight;
        smallestDim = Math.min(winWidth, winHeight);
        if (smallestDim > 500) {
          distanceFromEdge = 160;
        } else {
          if (Math.abs(winAspect - this.aspect()) < 0.2) {
            distanceFromEdge = smallestDim * 0.2;
          } else {
            distanceFromEdge = smallestDim * 0.1;
          }
        }
        if (winAspect > this.aspect()) {
          parentWidthNow = Math.round((winHeight - distanceFromEdge) * this.aspect());
        } else {
          parentWidthNow = winWidth - distanceFromEdge;
        }
      } else if (this._parentBoxSizing === 'border-box') {
        if (!this._foamDummyElem) {
          this._foamDummyElem = elemFromObject({
            "class": 'wistia_video_foam_dummy',
            'data-source-container-id': this._embedContainer.id,
            style: {
              border: 0,
              display: 'block',
              height: 0,
              margin: 0,
              padding: 0,
              position: 'static',
              visibility: 'hidden',
              width: 'auto'
            }
          });
          elemBefore(this._embedContainer, this._foamDummyElem);
        }
        parentWidthNow = elemWidth(this._foamDummyElem);
      } else {
        parentWidthNow = elemWidth(this._embedContainer.parentNode);
      }
      if (!isNaN(parentWidthNow) && (this._lastParentWidth !== parentWidthNow || !this._didFoam)) {
        this._didFoam = true;
        newWidth = parentWidthNow;
        newVideoWidth = newWidth - this.extraWidth();
        newVideoHeight = this.heightForWidth(newVideoWidth);
        newHeight = newVideoHeight + this.extraHeight();
        dims = this.videoFoam();
        if (dims.maxHeight && newHeight > dims.maxHeight) {
          newHeight = dims.maxHeight;
          newVideoHeight = newHeight - this.extraHeight();
          newVideoWidth = this.widthForHeight(newVideoHeight);
          newWidth = newVideoWidth + this.extraWidth();
        }
        if (dims.maxWidth && newWidth > dims.maxWidth) {
          newWidth = dims.maxWidth;
          newVideoWidth = newWidth - this.extraWidth();
          newVideoHeight = this.heightForWidth(newVideoWidth);
          newHeight = newVideoHeight + this.extraHeight();
        }
        if (dims.minHeight && newHeight < dims.minHeight) {
          newHeight = dims.minHeight;
          newVideoHeight = newHeight - this.extraHeight();
          newVideoWidth = this.widthForHeight(newVideoHeight);
          newWidth = newVideoWidth + this.extraWidth();
        }
        if (dims.minWidth && newWidth < dims.minWidth) {
          newWidth = dims.minWidth;
          newVideoWidth = newWidth - this.extraWidth();
          newVideoHeight = this.heightForWidth(newVideoWidth);
          newHeight = newVideoHeight + this.extraHeight();
        }
        this.info('videoFoam set width', newWidth);
        if ((ref13 = this._impl) != null) {
          ref13.width(newWidth, {
            constrain: true
          });
        }
        return this._lastParentWidth = parentWidthNow;
      }
    };

    PublicApi.prototype._allowFoam = function() {
      var ref13;
      return this._hasImpl() && this.grid && (this.up() || this._ignoreUp) && this.looksUp() && (this._attrs.videoFoam || ((ref13 = this.popover) != null ? ref13.isResponsive() : void 0)) && !this.isAudio();
    };

    PublicApi.prototype._allowContainerMatch = function() {
      return (this.up() || this._ignoreUp) && !this._opts.dontMonitorSize && !this.inFullscreen();
    };

    PublicApi.prototype._doContainerMatch = function() {
      var heightNow, ref13, ref14, widthNow;
      widthNow = this.containerWidth();
      heightNow = this.containerHeight();
      if (this._lastWidth !== widthNow) {
        this.notice("container width changed to " + widthNow + ", matching");
        if ((ref13 = this._impl) != null) {
          ref13.width(widthNow);
        }
        this.info('_doContainerMatch set width', widthNow);
        this.trigger("widthchange", widthNow, this._lastWidth);
        this._lastWidth = widthNow;
      }
      if (this._lastHeight !== heightNow) {
        this.notice("container height changed to " + heightNow + ", matching");
        if ((ref14 = this._impl) != null) {
          ref14.height(heightNow);
        }
        this.trigger("heightchange", heightNow, this._lastHeight);
        return this._lastHeight = heightNow;
      }
    };

    PublicApi.prototype.monitor = function() {
      this.info('monitor');
      this._lastWidth = this._attrs.startingWidth;
      this._lastHeight = this._attrs.startingHeight;
      this._lastParentWidth = this.width();
      this._didFoam = false;
      return this._hasImpl((function(_this) {
        return function() {
          var resizeCallback, resizeCallbackDebounced;
          Wistia.eventLoop.add(_this.uuid + ".monitor", 500, _this._doMonitor);
          if (window.ResizeObserver) {
            resizeCallback = function(entries) {
              var entry;
              entry = entries[0];
              if (!entry) {
                return;
              }
              if (!_this._allowFoam()) {
                return;
              }
              if (_this._lastWidth !== entry.contentRect.width) {
                _this.trigger('widthchange', entry.contentRect.width, _this._lastWidth);
              }
              if (_this._lastHeight !== entry.contentRect.height) {
                _this.trigger('heightchange', entry.contentRect.height, _this._lastHeight);
              }
              _this._lastWidth = entry.contentRect.width;
              _this._lastHeight = entry.contentRect.height;
              return _this._doSizing();
            };
            resizeCallbackDebounced = debounce('player_container_resize', resizeCallback, 10);
            _this._resizeObserver = new ResizeObserver(resizeCallbackDebounced);
            return _this._resizeObserver.observe(_this.container);
          }
        };
      })(this));
    };

    PublicApi.prototype._doMonitor = function() {
      if (this._removeHandleIfGoneFromDOM()) {
        return;
      }
      this._checkDownState();
      if (this.chrome && !elemInDom(this.chrome)) {
        this.notice('Chrome was removed from DOM. Injecting it back in.');
        elemAppend(this._embedContainer, this.chrome);
      }
      return this._doSizing();
    };

    PublicApi.prototype._doSizing = function() {
      var ref13, ref14;
      if (this.container.tagName === 'WISTIA-PLAYER') {
        return;
      }
      if (this.popover) {
        if (this.popover.fixedSizeTooBigForWindow()) {
          return this._doFoam();
        } else if (this._opts.popoverSize) {
          this._lastWidth = this.width();
          this._lastHeight = this.height();
          if (this._lastWidth !== this._popoverSize().width || this._lastHeight !== this._popoverSize().height) {
            if ((ref13 = this._impl) != null) {
              ref13.width(this._popoverSize().width);
            }
            return (ref14 = this._impl) != null ? ref14.height(this._popoverSize().height) : void 0;
          }
        } else {
          return this._doFoam();
        }
      } else if (this._allowFoam()) {
        return this._doFoam();
      } else if (this._allowContainerMatch()) {
        return this._doContainerMatch();
      }
    };

    PublicApi.prototype.looksDown = function() {
      return !this._embedContainer || !elemInDom(this._embedContainer) || elemIsHidden(this._embedContainer);
    };

    PublicApi.prototype.looksUp = function() {
      return !this.looksDown();
    };

    PublicApi.prototype._doResize = function() {
      if (typeof this._throttleTriggerViewport === "function") {
        this._throttleTriggerViewport();
      }
      if (!this._debounceDoMonitor) {
        this.embedded((function(_this) {
          return function() {
            return requestAnimationFrame(function() {
              _this._doMonitor();
              return _this._debounceDoMonitor = false;
            });
          };
        })(this));
      }
      return this._debounceDoMonitor = true;
    };

    PublicApi.prototype._definePluginMethod = function() {
      if (this.plugin) {
        return;
      }
      return this.plugin = (function(_this) {
        return function(name, fn) {
          var stopGo;
          if (!(stopGo = _this._pluginStopGos[name])) {
            stopGo = _this._pluginStopGos[name] = new StopGo();
            stopGo(!!_this.plugin[name], _this.plugin[name]);
          }
          if (fn) {
            return stopGo(function() {
              return fn(_this.plugin[name]);
            });
          } else {
            return stopGo;
          }
        };
      })(this);
    };

    PublicApi.prototype.videoFoam = function(setValue) {
      if (setValue != null) {
        this.info('videoFoam', setValue);
        this._attrs.videoFoam = setValue;
        this.monitor();
        return setValue;
      } else {
        return this._attrs.videoFoam || false;
      }
    };

    PublicApi.prototype._transformAndUpdateMediaData = function() {
      var ref13, ref14, ref15;
      this._mediaData = mediaDataTransforms(this._originalMediaData, this._opts);
      if ((ref13 = this._impl) != null) {
        if ((ref14 = ref13.engine) != null) {
          ref14.onMediaDataChanged(this._mediaData, this._opts);
        }
      }
      return (ref15 = this._impl) != null ? ref15._mediaData = this._mediaData : void 0;
    };

    PublicApi.prototype.specialBind = function() {
      var args, event, fn, t, t1, t2;
      event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (event === 'crosstime') {
        t = args[0], fn = args[1];
        this.onCrossTime(t, fn);
        return (function(_this) {
          return function() {
            return _this.unbindOnCrossTime(t, fn);
          };
        })(this);
      } else if (event === 'betweentimes') {
        t1 = args[0], t2 = args[1], fn = args[2];
        this.betweenTimes(t1, t2, fn);
        return (function(_this) {
          return function() {
            return _this.unbindBetweenTimes(t1, t2, fn);
          };
        })(this);
      } else {
        return false;
      }
    };

    PublicApi.prototype.specialUnbind = function() {
      var args, event, fn, t, t1, t2;
      event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (event === 'crosstime') {
        t = args[0];
        fn = args[1];
        this.unbindOnCrossTime(t, fn);
        return true;
      } else if (event === 'betweentimes') {
        t1 = args[0];
        t2 = args[1];
        fn = args[2];
        this.unbindBetweenTimes(t1, t2, fn);
        return true;
      } else {
        return false;
      }
    };

    PublicApi.prototype.onCrossTime = function(t, fn) {
      var afterT, base, runFn, setupTimeoutFromNow, setupTimeoutFromNowIfClose, suspendTimeoutIndefinitely, timeoutKey;
      if (!/^(\d+\.)?\d+$/.test(t)) {
        throw 'onCrossTime: Expected first argument to be a number';
      }
      if (typeof fn !== 'function') {
        throw 'onCrossTime: Expected second argument to be a function';
      }
      if (this._onCrossTimeBindings == null) {
        this._onCrossTimeBindings = {};
      }
      if ((base = this._onCrossTimeBindings)[t] == null) {
        base[t] = [];
      }
      timeoutKey = this.uuid + "." + (uniqId('after_time_'));
      afterT = this.time() > t;
      runFn = (function(_this) {
        return function() {
          var result;
          if (_this.time() < t) {
            return setupTimeoutFromNow();
          } else {
            if (!afterT) {
              afterT = true;
              result = fn.call(_this);
              if (result === _this.unbind) {
                return _this.unbindOnCrossTime(t, fn);
              }
            }
          }
        };
      })(this);
      setupTimeoutFromNow = (function(_this) {
        return function() {
          if (_this.time() >= t) {
            clearTimeouts(timeoutKey);
            return runFn();
          } else if (!afterT) {
            return doTimeout(timeoutKey, runFn, (t - _this.time()) * 1000);
          }
        };
      })(this);
      setupTimeoutFromNowIfClose = (function(_this) {
        return function() {
          if (_this.time() < t) {
            afterT = false;
            if (t - _this.time() < 2) {
              return setupTimeoutFromNow();
            }
          } else {
            if (!afterT) {
              return runFn();
            }
          }
        };
      })(this);
      suspendTimeoutIndefinitely = (function(_this) {
        return function() {
          return clearTimeouts(timeoutKey);
        };
      })(this);
      this.bind('play', setupTimeoutFromNowIfClose);
      this.bind('timechange', setupTimeoutFromNowIfClose);
      this.bind('pause', suspendTimeoutIndefinitely);
      this.bind('end', suspendTimeoutIndefinitely);
      this.bind('waiting', suspendTimeoutIndefinitely);
      if (this.state() === 'playing' && !afterT) {
        setupTimeoutFromNowIfClose();
      }
      this._onCrossTimeBindings[t].push({
        fn: fn,
        setupTimeoutFromNowIfClose: setupTimeoutFromNowIfClose,
        suspendTimeoutIndefinitely: suspendTimeoutIndefinitely
      });
      return this;
    };

    PublicApi.prototype.unbindOnCrossTime = function(t, fn) {
      var bindings, hash, index, j, len, ref13;
      if (!(this._onCrossTimeBindings && this._onCrossTimeBindings[t])) {
        return this;
      }
      bindings = null;
      index = 0;
      ref13 = this._onCrossTimeBindings[t];
      for (j = 0, len = ref13.length; j < len; j++) {
        hash = ref13[j];
        if (hash.fn === fn) {
          bindings = hash;
          break;
        }
        index += 1;
      }
      if (!bindings) {
        return this;
      }
      this.unbind('play', bindings.setupTimeoutFromNowIfClose);
      this.unbind('timechange', bindings.setupTimeoutFromNowIfClose);
      this.unbind('pause', bindings.suspendTimeoutIndefinitely);
      this.unbind('end', bindings.suspendTimeoutIndefinitely);
      this.unbind('waiting', bindings.suspendTimeoutIndefinitely);
      this._onCrossTimeBindings[t].splice(index, 1);
      if (this._onCrossTimeBindings[t].length === 0) {
        delete this._onCrossTimeBindings[t];
      }
      return this;
    };

    PublicApi.prototype.betweenTimes = function(t1, t2, fn) {
      var base, onTimechange, timeKey, withinInterval;
      if (!(/^(\d+\.)?\d+$/.test(t1) && /^(\d+\.)?\d+$/.test(t2))) {
        throw 'betweenTimes: Expected first two arguments to be numbers';
      }
      if (typeof fn !== 'function') {
        throw 'betweenTimes: Expected second argument to be a function';
      }
      timeKey = t1 + "-" + t2;
      if (this._betweenTimeBindings == null) {
        this._betweenTimeBindings = {};
      }
      if ((base = this._betweenTimeBindings)[timeKey] == null) {
        base[timeKey] = [];
      }
      withinInterval = false;
      onTimechange = (function(_this) {
        return function() {
          var result, t;
          t = _this.time();
          if ((t1 <= t && t < t2) && !withinInterval) {
            withinInterval = true;
            result = fn.call(_this, withinInterval);
          } else if (!((t1 <= t && t < t2)) && withinInterval) {
            withinInterval = false;
            result = fn.call(_this, withinInterval);
          }
          if (result === _this.unbind) {
            return _this.unbindBetweenTimes(t1, t2, fn);
          }
        };
      })(this);
      this.onCrossTime(t1, onTimechange);
      this.onCrossTime(t2, onTimechange);
      this.bind('timechange', onTimechange);
      onTimechange();
      this._betweenTimeBindings[timeKey].push({
        fn: fn,
        onTimechange: onTimechange
      });
      return this;
    };

    PublicApi.prototype.unbindBetweenTimes = function(t1, t2, fn) {
      var bindings, hash, index, j, len, ref13, timeKey;
      timeKey = t1 + "-" + t2;
      if (!this._betweenTimeBindings[timeKey]) {
        return this;
      }
      bindings = null;
      index = 0;
      ref13 = this._betweenTimeBindings[timeKey];
      for (j = 0, len = ref13.length; j < len; j++) {
        hash = ref13[j];
        if (hash.fn === fn) {
          bindings = hash;
          break;
        }
        index += 1;
      }
      if (!bindings) {
        return this;
      }
      this.unbindOnCrossTime(t1, bindings.onTimechange);
      this.unbindOnCrossTime(t2, bindings.onTimechange);
      this.unbind('timechange', bindings.onTimechange);
      this._betweenTimeBindings[timeKey].splice(index, 1);
      if (this._betweenTimeBindings[timeKey].length === 0) {
        delete this._betweenTimeBindings[timeKey];
      }
      return this;
    };

    PublicApi.prototype._trackVideoFoamManualSizeChange = function(method) {
      return Wistia.Metrics.count('player/videofoam-manual-sizechange', 1, {
        method: method,
        href: window.location.href
      });
    };


    /*
     _____       _     _ _        __  __      _   _               _
    |  __ \     | |   | (_)      |  \/  |    | | | |             | |
    | |__) |   _| |__ | |_  ___  | \  / | ___| |_| |__   ___   __| |___
    |  ___/ | | | '_ \| | |/ __| | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
    | |   | |_| | |_) | | | (__  | |  | |  __/ |_| | | | (_) | (_| \__ \
    |_|    \__,_|_.__/|_|_|\___| |_|  |_|\___|\__|_| |_|\___/ \__,_|___/
     */

    PublicApi.prototype.aspect = function() {
      return this._implGet('aspect', 0);
    };

    PublicApi.prototype.asset = function() {
      return this._implGet.apply(this, ['asset', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.assets = function() {
      return this._implGet.apply(this, ['assets', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.audioDescriptionControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['audioDescriptionControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.bigPlayButtonEnabled = function() {
      return this._implSetOrGet.apply(this, ['bigPlayButtonEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.bigPlayButtonTimeEnabled = function() {
      return this._implSetOrGet.apply(this, ['bigPlayButtonTimeEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.cancelOverlay = function() {
      return this._implPromise.apply(this, ['cancelOverlay'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.cancelFullscreen = function() {
      return this._commandQueueImplPromise('cancelFullscreen');
    };

    PublicApi.prototype.captureCurrentFrame = function() {
      return this._implGet.apply(this, ['captureCurrentFrame', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.closeTabMenu = function() {
      return this._implExec('closeTabMenu');
    };

    PublicApi.prototype.controlScaling = function() {
      return this._implSetOrGet.apply(this, ['controlScaling', 'auto'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.createControl = function() {
      return this._implGet.apply(this, ['createControl', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.defineOverlay = function() {
      return this._implExec.apply(this, ['defineOverlay'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.destroyControl = function() {
      return this._implExec.apply(this, ['destroyControl'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.doNotTrack = function() {
      return this._opts.doNotTrack;
    };

    PublicApi.prototype.duration = function() {
      return this._implGet('duration', null);
    };

    PublicApi.prototype.embedded = function() {
      return this._implSetOrGet.apply(this, ['embedded', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.embedOptions = function() {
      if (this._hasImpl()) {
        return this._implGet.apply(this, ['embedOptions', {}].concat(slice.call(arguments)));
      } else {
        if (this._embedOptions) {
          return this._embedOptions;
        }
        return this._embedOptions = this._gatherOptions();
      }
    };

    PublicApi.prototype.enterInputContext = function() {
      return this._implExec.apply(this, ['enterInputContext'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.eventKey = function() {
      return this._implGet('eventKey', null);
    };

    PublicApi.prototype.exitInputContext = function() {
      return this._implExec.apply(this, ['exitInputContext'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.extraHeight = function() {
      return this._implGet('extraHeight', 0);
    };

    PublicApi.prototype.extraWidth = function() {
      return this._implGet('extraWidth', 0);
    };

    PublicApi.prototype.fit = function() {
      return this._implExec('fit');
    };

    PublicApi.prototype.fullscreenControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['fullscreenControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.focus = function() {
      return this._implPromise.apply(this, ['focus'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.getBuffered = function() {
      return this._implGet('getBuffered', []);
    };

    PublicApi.prototype.getFocusedChapter = function() {
      return this._implGet('getFocusedChapter', null);
    };

    PublicApi.prototype.getInputContext = function() {
      return this._implGet('getInputContext', []);
    };

    PublicApi.prototype.getMediaElement = function() {
      return this._implGet('getMediaElement', null);
    };

    PublicApi.prototype.getMediaType = function() {
      return this._implGet('getMediaType', null);
    };

    PublicApi.prototype.getOverlays = function() {
      return this._implGet('getOverlays', {});
    };

    PublicApi.prototype.getRegion = function() {
      return this._implGet.apply(this, ['getRegion', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.getSelectedCaptions = function() {
      var ref13, ref14;
      return (ref13 = this.controls) != null ? (ref14 = ref13.captions) != null ? ref14.getSelectedCaptions() : void 0 : void 0;
    };

    PublicApi.prototype.hasData = function() {
      return this._implSetOrGet.apply(this, ['hasData', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.height = function() {
      var h, ref13;
      if (arguments.length > 0) {
        if (((ref13 = this._opts) != null ? ref13.videoFoam : void 0) !== true) {
          h = parseFloat(arguments[0]);
          this.container.style.height = h + "px";
          return this._implExec.apply(this, ['height'].concat(slice.call(arguments)));
        } else {
          this._trackVideoFoamManualSizeChange('height');
          console.warn('setting `height` while `videoFoam` is enabled results in a no-op');
          return this;
        }
      } else {
        return this._implGet('height', null);
      }
    };

    PublicApi.prototype.heightForWidth = function() {
      return this._implGet.apply(this, ['heightForWidth', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.hideControls = function() {
      return this._implExec.apply(this, ['hideControls', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.ieSizeHack = function() {
      return this._implExec('ieSizeHack');
    };

    PublicApi.prototype.inFullscreen = function() {
      return this._implGet('inFullscreen', false);
    };

    PublicApi.prototype.inSilentPlaybackMode = function() {
      return this._implGet('inSilentPlaybackMode', false);
    };

    PublicApi.prototype.isMuted = function() {
      return this._implGet('isMuted');
    };

    PublicApi.prototype.isResumableEnabled = function() {
      return this._implGet('isResumableEnabled');
    };

    PublicApi.prototype.lastPauseInfo = function() {
      return this._implGet('lastPauseInfo', {});
    };

    PublicApi.prototype.lastPlayInfo = function() {
      return this._implGet('lastPlayInfo', {});
    };

    PublicApi.prototype.layout = function() {
      return this._implSetOrGet.apply(this, ['layout', 'primary'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.look = function() {
      return this._implSetOrGet.apply(this, ['look', {}].concat(slice.call(arguments)));
    };

    PublicApi.prototype.mp4Asset = function() {
      return this._implGet.apply(this, ['mp4Asset', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.mute = function() {
      return this._implExec('mute');
    };

    PublicApi.prototype.playerLanguage = function(code) {
      if (code) {
        this._wasPlayerLanguageSetViaApi = true;
      }
      return this._implSetOrGet.apply(this, ['playerLanguage', 'en-US'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.name = function() {
      return this._implSetOrGet.apply(this, ['name', ''].concat(slice.call(arguments)));
    };

    PublicApi.prototype.openChaptersTab = function() {
      return this._implExec('openChaptersTab');
    };

    PublicApi.prototype.openShareTab = function() {
      return this._implExec('openShareTab');
    };

    PublicApi.prototype.openTabMenu = function() {
      return this._implExec('openTabMenu');
    };

    PublicApi.prototype.openTranscriptTab = function() {
      return this._implExec('openTranscriptTab');
    };

    PublicApi.prototype.originalAsset = function() {
      return this._implGet.apply(this, ['originalAsset', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.pause = function() {
      return this._commandQueueImplPromise('pause');
    };

    PublicApi.prototype.percentWatched = function() {
      return this._implGet('percentWatched', 0);
    };

    PublicApi.prototype.playbarControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['playbarControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.play = function() {
      return this._commandQueueImplPromise('play');
    };

    PublicApi.prototype.playbackRate = function() {
      return this._implSetOrGet.apply(this, ['playbackRate', 1].concat(slice.call(arguments)));
    };

    PublicApi.prototype.playbackRateControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['playbackRateControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.playerColor = function() {
      return this._implSetOrGet.apply(this, ['playerColor', '636155'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.playerBackgroundColor = function() {
      return this._implSetOrGet.apply(this, ['playerBackgroundColor', '000000'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.playPauseControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['playPauseControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.qualityControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['qualityControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.requestFullscreen = function() {
      return this._commandQueueImplPromise('requestFullscreen');
    };

    PublicApi.prototype.requestOverlay = function() {
      return this._implPromise.apply(this, ['requestOverlay'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.ready = function() {
      return this._implSetOrGet.apply(this, ['ready', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.releaseChromeless = function() {
      return this._implExec.apply(this, ['releaseChromeless'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.releaseControls = function() {
      return this._implExec.apply(this, ['releaseControls'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.requestChromeless = function() {
      return this._implExec.apply(this, ['requestChromeless'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.requestControls = function() {
      return this._implExec.apply(this, ['requestControls'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.secondsWatched = function() {
      return this._implGet('secondsWatched', 0);
    };

    PublicApi.prototype.secondsWatchedVector = function() {
      return this._implGet('secondsWatchedVector', []);
    };

    PublicApi.prototype.selectableQualities = function() {
      return this._implGet('selectableQualities', []);
    };

    PublicApi.prototype.selectedQuality = function() {
      return this._implGet('selectedQuality', []);
    };

    PublicApi.prototype.setFocusedChapter = function() {
      return this._implSetOrGet.apply(this, ['setFocusedChapter', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.settingsControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['settingsControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.shouldResume = function() {
      return this._implGet('shouldResume');
    };

    PublicApi.prototype.showControls = function() {
      return this._implExec.apply(this, ['showControls', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.state = function() {
      return this._implGet('state', 'beforeplay');
    };

    PublicApi.prototype.stillUrl = function() {
      return this._implGet.apply(this, ['stillUrl', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.suppressPlay = function() {
      return this._implSetOrGet.apply(this, ['suppressPlay', this].concat(slice.call(arguments)));
    };

    PublicApi.prototype.thumbnailAssets = function() {
      return this._implGet('thumbnailAssets', []);
    };

    PublicApi.prototype.time = function() {
      var args, t;
      t = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (t != null) {
        return this._commandQueueImplPromise.apply(this, ['time', formattedDurationToSeconds(t)].concat(slice.call(args)));
      } else {
        return this._implGet('time', 0);
      }
    };

    PublicApi.prototype.trim = function() {
      return this._implSetOrGet.apply(this, ['trim', {
        start: 0,
        end: -1
      }].concat(slice.call(arguments)));
    };

    PublicApi.prototype.unmute = function() {
      return this._implExec('unmute');
    };

    PublicApi.prototype.undefineOverlay = function() {
      return this._implPromise.apply(this, ['undefineOverlay'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.videoHeight = function() {
      var h, ref13;
      if (arguments.length > 0) {
        if (((ref13 = this._opts) != null ? ref13.videoFoam : void 0) !== true) {
          h = parseFloat(arguments[0]);
          this.container.style.height = h + "px";
          return this._implExec.apply(this, ['videoHeight'].concat(slice.call(arguments)));
        } else {
          this._trackVideoFoamManualSizeChange('videoHeight');
          console.warn('setting `videoHeight` while `videoFoam` is enabled results in a no-op');
          return this;
        }
      } else {
        return this._implGet('videoHeight', null);
      }
    };

    PublicApi.prototype.videoQuality = function(qual) {
      if (qual != null) {
        return this._commandQueueImplPromise.apply(this, ['setVideoQuality', qual].concat(slice.call(arguments)));
      } else {
        return this._implGet('getVideoQuality');
      }
    };

    PublicApi.prototype.videoWidth = function() {
      var ref13, w;
      if (arguments.length > 0) {
        if (((ref13 = this._opts) != null ? ref13.videoFoam : void 0) !== true) {
          w = parseFloat(arguments[0]);
          this.container.style.width = w + "px";
          return this._implExec.apply(this, ['videoWidth'].concat(slice.call(arguments)));
        } else {
          this._trackVideoFoamManualSizeChange('videoWidth');
          console.warn('setting `videoWidth` while `videoFoam` is enabled results in a no-op');
          return this;
        }
      } else {
        return this._implGet('videoWidth', null);
      }
    };

    PublicApi.prototype.visitorKey = function() {
      return Wistia.visitorKey.value() || null;
    };

    PublicApi.prototype.volume = function() {
      return this._implSetOrGet.apply(this, ['volume', 0].concat(slice.call(arguments)));
    };

    PublicApi.prototype.volumeControlEnabled = function() {
      return this._implSetOrGet.apply(this, ['volumeControlEnabled', false].concat(slice.call(arguments)));
    };

    PublicApi.prototype.whenVideoElementInDom = function() {
      return new Promise((function(_this) {
        return function(resolve) {
          return _this._hasImpl(function() {
            return resolve(_this._implGet.apply(_this, ['whenVideoElementInDom', null].concat(slice.call(arguments))));
          });
        };
      })(this));
    };

    PublicApi.prototype.width = function() {
      var ref13, w;
      if (arguments.length > 0) {
        if (((ref13 = this._opts) != null ? ref13.videoFoam : void 0) !== true) {
          w = parseFloat(arguments[0]);
          this.container.style.width = w + "px";
          return this._implExec.apply(this, ['width'].concat(slice.call(arguments)));
        } else {
          this._trackVideoFoamManualSizeChange('width');
          console.warn('setting `width` while `videoFoam` is enabled results in a no-op');
          return this;
        }
      } else {
        return this._implGet('width', null);
      }
    };

    PublicApi.prototype.widthForHeight = function() {
      return this._implGet.apply(this, ['widthForHeight', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.chaptersEnabled = function() {
      return this._implSetOrGet.apply(this, ['chaptersEnabled', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.chaptersVisibleOnLoad = function() {
      return this._implSetOrGet.apply(this, ['chaptersVisibleOnLoad', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.addChapter = function() {
      return this._implExec.apply(this, ['addChapter'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.getChapter = function() {
      return this._implGet.apply(this, ['getChapter', null].concat(slice.call(arguments)));
    };

    PublicApi.prototype.removeChapter = function() {
      return this._implExec.apply(this, ['removeChapter'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.chapters = function() {
      return this._implSetOrGet.apply(this, ['chapters', []].concat(slice.call(arguments)));
    };

    PublicApi.prototype.customerLogo = function() {
      return this._implExec.apply(this, ['customerLogo'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.setControlEnabled = function(handle, bool) {
      return this._implSetOrGet('setControlEnabled', null, handle, bool);
    };

    PublicApi.prototype.isControlDisabled = function(handle) {
      return this._implGet('isControlDisabled', false, handle);
    };

    PublicApi.prototype.isControlEnabled = function(handle) {
      return this._implGet('isControlEnabled', false, handle);
    };

    PublicApi.prototype.whenControlMounted = function(handle) {
      return this._implPromise('whenControlMounted', handle);
    };

    PublicApi.prototype.getControl = function(handle) {
      return this._implGet('getControl', null, handle);
    };

    PublicApi.prototype.getEmail = function() {
      return this.email();
    };

    PublicApi.prototype.getEventKey = function() {
      return this.eventKey();
    };

    PublicApi.prototype.getVisitorKey = function() {
      return this.visitorKey();
    };

    PublicApi.prototype.setEmail = function(email) {
      return this.email(email);
    };

    PublicApi.prototype.setPlayerColor = function() {
      return this._implExec.apply(this, ['playerColor'].concat(slice.call(arguments)));
    };

    PublicApi.prototype.removeReadyFn = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this._hasImpl((function(_this) {
        return function() {
          var ref13;
          return (ref13 = _this._impl.ready).remove.apply(ref13, args);
        };
      })(this));
    };

    PublicApi.prototype.isKeyboardFocused = function(bool) {
      return this._implSetOrGet('isKeyboardFocused', null, bool);
    };

    PublicApi.prototype.email = function(email) {
      var lastEmail, ref13;
      if (email != null) {
        this.info('email', email);
        lastEmail = this._attrs.email;
        this._attrs.email = email;
        Wistia.localStorage([this._attrs.pageUrl, "trackEmail"], email);
        if (!((ref13 = this._opts) != null ? ref13.noDeprecatedProperties : void 0)) {
          this.params.trackEmail = email;
        }
        if (email !== lastEmail) {
          this.container.dispatchEvent(new CustomEvent('emailchange', {
            detail: {
              email: email
            }
          }));
        }
        return this;
      } else {
        return this._attrs.email || null;
      }
    };

    PublicApi.prototype.foreignData = function(fd) {
      var ref13, ref14;
      if (fd === void 0) {
        return this._attrs.foreignData || this._foreignData || null;
      } else if (fd === null) {
        this._attrs.foreignData = null;
        return this.trigger('foreigndatachange', fd);
      } else {
        this.info('foreignData', fd);
        if (!isObject(fd)) {
          throw new Error('foreignData can only be an Object');
        }
        fd = clone(fd);
        this._attrs.foreignData = fd;
        if ((ref13 = this._impl) != null) {
          if ((ref14 = ref13.tracker) != null) {
            ref14.transmit({
              force: true
            });
          }
        }
        return this.trigger('foreigndatachange', fd);
      }
    };

    PublicApi.classFor = function(embedType) {
      var ref13, result;
      if (embedType instanceof Wistia.Player) {
        embedType = embedType.embedType;
      } else if (embedType instanceof Wistia.PublicApi) {
        embedType = (ref13 = embedType._impl) != null ? ref13.embedType : void 0;
      }
      result = (function() {
        switch (embedType) {
          case 'vulcan':
            return Wistia.VulcanPlayer;
          case 'vulcan-v2':
            return Wistia.VulcanV2Player;
          case 'html5':
            return Wistia.Html5Player;
          case 'external':
            return Wistia.ExternalPlayer;
          case 'notplayable':
            return Wistia.NotPlayablePlayer;
          case 'passwordprotected':
            return Wistia.PasswordProtectedPlayer;
          default:
            return Wistia.Player;
        }
      })();
      if (result) {
        return result;
      } else {
        Wistia.Metrics.count("player/" + embedType + "-class-not-defined", 1, {
          ua: navigator.userAgent,
          detect: Wistia.detect
        });
        Wistia.error("PublicApi.classFor: embedType is " + embedType + " but its class is not defined. Using 'vulcan-v2' instead.");
        return Wistia.VulcanV2Player;
      }
    };

    return PublicApi;

  })();
  Wistia.mixin(Wistia.PublicApi.prototype, Wistia.bindable);
  oldTrigger = Wistia.PublicApi.prototype.trigger;
  Wistia.PublicApi.prototype._triggerNoImpl = function() {
    var api, args, event, ref13;
    event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    oldTrigger.call.apply(oldTrigger, [this, event].concat(slice.call(args)));
    if (this.container.translationApi) {
      api = this.container.translationApi;
    } else {
      api = this;
    }
    return (ref13 = window.wistiaEmbeds) != null ? ref13.trigger.apply(ref13, [event, api].concat(slice.call(args))) : void 0;
  };
  Wistia.PublicApi.prototype.trigger = function() {
    var args, ref13;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this._impl) {
      return (ref13 = this._impl).trigger.apply(ref13, args);
    } else {
      return this._triggerNoImpl.apply(this, args);
    }
  };
  Wistia.mixin(Wistia.PublicApi.prototype, Wistia.logHelpers);
  return Wistia.PublicApi.prototype._logPrefix = function() {
    var ref13;
    return [this.constructor.name, this.hashedId() || 'no hashedId', (ref13 = this.container) != null ? ref13.id : void 0, this.uuid];
  };
})(Wistia);
