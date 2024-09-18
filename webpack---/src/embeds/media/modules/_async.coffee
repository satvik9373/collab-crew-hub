(function(Wistia) {
  var GLOBAL_ID_KEY, StopGo, assign, asyncChain, cast, clearTimeouts, clone, elemClasses, elemHasClass, elemMutationObserver, getAllApiEmbedElements, getOrSetEmbedOptionStore, isObject, onDocReady, optionsFromElemClass, queryParamsToObject, ref, ref1, ref2, setEmbedOptionStore, throttle, wlog;
  if (Wistia.embeds) {
    return;
  }
  Wistia.embeds = {};
  StopGo = require('utilities/stopgo.js').StopGo;
  wlog = require('utilities/wlog.js').wlog;
  onDocReady = require('utilities/docReady.js').onDocReady;
  asyncChain = require('utilities/asyncChain.js').asyncChain;
  throttle = require('utilities/core.js').throttle;
  ref = require('utilities/elem.js'), elemClasses = ref.elemClasses, elemHasClass = ref.elemHasClass, elemMutationObserver = ref.elemMutationObserver;
  queryParamsToObject = require('utilities/url.js').queryParamsToObject;
  clearTimeouts = require('utilities/timeout-utils.js').clearTimeouts;
  ref1 = require('utilities/obj.js'), cast = ref1.cast, isObject = ref1.isObject, assign = ref1.assign, clone = ref1.clone;
  optionsFromElemClass = require('utilities/optionsFromElemClass.ts').optionsFromElemClass;
  getAllApiEmbedElements = require('utilities/getEmbedElements.ts').getAllApiEmbedElements;
  ref2 = require('utilities/embedOptionStore.ts'), getOrSetEmbedOptionStore = ref2.getOrSetEmbedOptionStore, setEmbedOptionStore = ref2.setEmbedOptionStore, GLOBAL_ID_KEY = ref2.GLOBAL_ID_KEY;
  Wistia.embeds.setup = function(embedElems) {
    return Wistia.embeds.notEmbedding(function() {
      var doEmbedding;
      doEmbedding = function() {
        var e1, e2, elem, functions, hashedId, j, len, newId, options;
        Wistia.embeds.notEmbedding(false);
        functions = [];
        try {
          embedElems = Wistia.embeds.uninitialized(embedElems);
          if (embedElems && embedElems.length && embedElems.length > 0) {
            Wistia.info('initializing', embedElems != null ? embedElems.length : void 0, 'embedElems');
          }
          for (j = 0, len = embedElems.length; j < len; j++) {
            elem = embedElems[j];
            try {
              Wistia.info('initializing elem', elem);
              hashedId = Wistia.embeds.hashedIdForElem(elem, {
                asyncOnly: true
              });
              if (!document.body.contains(elem)) {
                continue;
              }
              if (elem.id) {
                if (document.getElementById(elem.id) !== elem) {
                  newId = Wistia.embeds.genIdFor(hashedId);
                  Wistia.error("Duplicate DOM ID found for container \"" + elem.id + "\". Changing it to \"" + newId + "\" to avoid issues.", elem);
                  elem.id = newId;
                }
              } else {
                elem.id = Wistia.embeds.genIdFor(hashedId);
              }
              elem.uniqueId = elem.id;
              options = optionsFromElemClass(elem);
              setEmbedOptionStore("__" + elem.id + "_dom_options__", options);
              (function(hashedId, elem) {
                return functions.push(function() {
                  if (!Wistia.embeds.containerIsInitialized(elem)) {
                    return Wistia.embed(hashedId, {
                      container: elem.id
                    });
                  }
                });
              })(hashedId, elem);
            } catch (error) {
              e1 = error;
              Wistia.error(e1);
            }
          }
        } catch (error) {
          e2 = error;
          Wistia.error(e2);
        }
        functions.push(function() {
          return Wistia.watchForInit();
        });
        functions.push(function() {
          return Wistia.embeds.notEmbedding(true);
        });
        return asyncChain('embeds_setup', functions);
      };
      onDocReady(doEmbedding);
      if (Wistia.detect.ios.version === 0 && !Wistia.detect.safari) {
        return doEmbedding();
      }
    });
  };
  Wistia.embeds._setupThrottled = throttle(500, Wistia.embeds.setup);
  Wistia.embeds.hashedIdForElem = function(elem, options) {
    var ref3, ref4, ref5, ref6, ref7, ref8;
    if (options == null) {
      options = {};
    }
    if (elem.tagName === 'WISTIA-PLAYER') {
      return elem.mediaId;
    } else {
      if (options.asyncOnly) {
        return ((ref3 = elem.className) != null ? (ref4 = ref3.match(/wistia_async_([^\s]+)/)) != null ? ref4[1] : void 0 : void 0) || null;
      } else {
        return ((ref5 = elem.className) != null ? (ref6 = ref5.match(/wistia_async_([^\s]+)/)) != null ? ref6[1] : void 0 : void 0) || ((ref7 = elem.className) != null ? (ref8 = ref7.match(/wistia_([^\s]+)/)) != null ? ref8[1] : void 0 : void 0) || null;
      }
    }
  };
  Wistia.embeds.genIdFor = function(hashedId) {
    var base, candidate, i;
    base = "wistia-" + hashedId;
    i = 1;
    while (true) {
      candidate = base + "-" + i;
      if (!(document.getElementById(candidate) || document.querySelector("[unique-id=" + candidate + "]"))) {
        break;
      }
      i += 1;
    }
    return candidate;
  };
  Wistia.options = getOrSetEmbedOptionStore;
  Wistia.embeds.uninitialized = function(embedElems) {
    var elem, hashedId, j, len, result;
    if (embedElems == null) {
      embedElems = getAllApiEmbedElements();
    }
    result = [];
    for (j = 0, len = embedElems.length; j < len; j++) {
      elem = embedElems[j];
      hashedId = Wistia.embeds.hashedIdForElem(elem, {
        asyncOnly: true
      });
      if (hashedId && !Wistia.embeds.containerIsInitialized(elem)) {
        result.push(elem);
      }
    }
    return result;
  };
  Wistia.embeds.containerIsInitialized = (function(_this) {
    return function(container) {
      return container && (container.wistiaApi || container.tagName === 'WISTIA-PLAYER' || container._convertingToAurora) && !(container.wistiaApi instanceof Wistia.IframeApiProxy);
    };
  })(this);
  Wistia.embeds.initialized = function(embedElems) {
    var handle, ref3, results, uuid;
    ref3 = Wistia._data.video;
    results = [];
    for (uuid in ref3) {
      handle = ref3[uuid];
      results.push(handle);
    }
    return results;
  };
  Wistia.embeds.observe = function() {
    var config, e;
    if (Wistia.embeds.initObserver) {
      return;
    }
    Wistia.embeds.initObserver = elemMutationObserver(function(mutations) {
      var addedNodes, embedElems, j, k, len, len1, mutation, node, ref3, ref4;
      embedElems = [];
      addedNodes = false;
      for (j = 0, len = mutations.length; j < len; j++) {
        mutation = mutations[j];
        if (((ref3 = mutation.addedNodes) != null ? ref3.length : void 0) > 0) {
          addedNodes = true;
        }
        ref4 = mutation.addedNodes || [];
        for (k = 0, len1 = ref4.length; k < len1; k++) {
          node = ref4[k];
          if (elemHasClass(node, 'wistia_embed')) {
            embedElems.push(node);
          }
        }
      }
      if (embedElems.length > 0) {
        setTimeout((function() {
          return Wistia.embeds.setup(embedElems);
        }), 10);
      }
      if (addedNodes) {
        return Wistia.embeds._setupThrottled();
      }
    });
    config = {
      subtree: true,
      childList: true
    };
    if (Wistia.detect.ios.version > 0 || Wistia.detect.safari) {
      return onDocReady(function() {
        return Wistia.embeds.initObserver.observe(document.body, config);
      });
    } else {
      try {
        return Wistia.embeds.initObserver.observe(document.body, config);
      } catch (error) {
        e = error;
        wlog.notice(e);
        return onDocReady(function() {
          try {
            return Wistia.embeds.initObserver.observe(document.body, config);
          } catch (error) {
            e = error;
            return wlog.error(e);
          }
        });
      }
    }
  };
  Wistia.embeds.unobserve = function() {
    var ref3;
    if ((ref3 = Wistia.embeds.initObserver) != null) {
      ref3.disconnect();
    }
    return Wistia.embeds.initObserver = null;
  };
  Wistia.embeds.poll = function(interval) {
    if (interval == null) {
      interval = 500;
    }
    return Wistia.eventLoop.add('poll_setup_embeds', interval, function() {
      return Wistia.embeds.setup();
    });
  };
  Wistia.embeds.unpoll = function() {
    var ref3;
    return (ref3 = Wistia.eventLoop) != null ? ref3.remove('poll_setup_embeds') : void 0;
  };
  Wistia.embeds.watch = function() {
    Wistia.embeds._dontWatch = false;
    if (Wistia.detect.mutationObserver) {
      Wistia.embeds.observe();
      return Wistia.embeds.poll(2000);
    } else {
      return Wistia.embeds.poll();
    }
  };
  Wistia.embeds.dontWatch = function() {
    Wistia.embeds._dontWatch = true;
    return Wistia.embeds.unwatch();
  };
  Wistia.embeds.unwatch = function() {
    Wistia.embeds.unobserve();
    return Wistia.embeds.unpoll();
  };
  Wistia.flushInit = function() {
    var e, fn, j, len;
    if (!window.wistiaInit) {
      return;
    }
    if (wistiaInit instanceof Array) {
      for (j = 0, len = wistiaInit.length; j < len; j++) {
        fn = wistiaInit[j];
        try {
          if (typeof fn === "function") {
            fn(Wistia);
          }
        } catch (error) {
          e = error;
          wlog.error(e);
        }
      }
    } else {
      if (typeof wistiaInit === "function") {
        wistiaInit(Wistia);
      }
    }
    return window.wistiaInit = null;
  };
  Wistia.addQueue = function(queueName) {
    Wistia._queueNames.push(queueName);
    return Wistia.watchForInit();
  };
  Wistia._queueNames = ['_wq', 'wistiaInitQueue'];
  Wistia._wqBoundListeners = [];
  Wistia.flushInitQueue = function() {
    var apiForPlayerType, e, fn, fn1, fnQueue, j, k, key, len, len1, queue, queueName, ran, ref3, thisElement, val;
    if (Wistia._isFlushingInitQueue) {
      return;
    }
    Wistia._isFlushingInitQueue = true;
    try {
      apiForPlayerType = function(video) {
        if (video.translationApi) {
          return video.translationApi;
        } else {
          return video;
        }
      };
      ref3 = Wistia._queueNames;
      for (j = 0, len = ref3.length; j < len; j++) {
        queueName = ref3[j];
        queue = window[queueName];
        if (!(queue && queue instanceof Array && queue.length > 0)) {
          continue;
        }
        fnQueue = [];
        while (queue.length > 0) {
          thisElement = queue.shift();
          if (isObject(thisElement)) {
            if (thisElement.revoke) {
              Wistia.revokeQueueListener(thisElement.revoke);
            }
            if (!thisElement.__unbinds) {
              thisElement.__unbinds = [];
            }
            if (thisElement.id) {
              ran = false;
              if (thisElement.options) {
                if (thisElement.id === '_all') {
                  setEmbedOptionStore(GLOBAL_ID_KEY, thisElement.options);
                  ran = true;
                } else {
                  setEmbedOptionStore(thisElement.id, thisElement.options);
                  ran = true;
                }
              }
              (function(thisElement) {
                var args, baseArgs;
                baseArgs = thisElement.id === '_all' ? [] : [thisElement.id];
                if (thisElement.onFind) {
                  args = baseArgs.concat([
                    function(video) {
                      return thisElement.onFind(apiForPlayerType(video));
                    }
                  ]);
                  thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api.apply(Wistia, args));
                  ran = true;
                }
                if (thisElement.onHasData) {
                  args = baseArgs.concat([
                    function(video) {
                      return video.hasData(function() {
                        return thisElement.onHasData(apiForPlayerType(video));
                      });
                    }
                  ]);
                  thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api.apply(Wistia, args));
                  ran = true;
                }
                if (thisElement.onEmbedded) {
                  args = baseArgs.concat([
                    function(video) {
                      return video.embedded(function() {
                        return thisElement.onEmbedded(apiForPlayerType(video));
                      });
                    }
                  ]);
                  thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api.apply(Wistia, args));
                  ran = true;
                }
                if (thisElement.onReady) {
                  args = baseArgs.concat([
                    function(video) {
                      return video.ready(function() {
                        return thisElement.onReady(apiForPlayerType(video));
                      });
                    }
                  ]);
                  thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api.apply(Wistia, args));
                  ran = true;
                }
                if (ran) {
                  return Wistia._wqBoundListeners.push(thisElement);
                } else {
                  return Wistia.error("No initialization function provided for ID " + thisElement.id, thisElement);
                }
              })(thisElement);
            } else {
              fn1 = function(thisElement, key, val) {
                var fn, runWhenHasData;
                if (typeof val === 'function') {
                  runWhenHasData = function(video) {
                    return video.hasData(function() {
                      return val(apiForPlayerType(video));
                    });
                  };
                  fn = function() {
                    if (key === '_all') {
                      thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api(runWhenHasData));
                    } else {
                      thisElement.__unbinds = thisElement.__unbinds.concat(Wistia.api(key, runWhenHasData));
                    }
                    return Wistia._wqBoundListeners.push(thisElement);
                  };
                  return fnQueue.push(fn);
                } else if (isObject(val)) {
                  if (key === '_all') {
                    fn = function() {
                      return setEmbedOptionStore(GLOBAL_ID_KEY, val);
                    };
                  } else {
                    fn = function() {
                      return setEmbedOptionStore(key, val);
                    };
                  }
                  return fnQueue.push(fn);
                } else if (key === '__unbinds' || key === 'revoke') {

                } else {
                  return Wistia.error('Unknown initialization object:', val, 'Expected Object or Function.');
                }
              };
              for (key in thisElement) {
                val = thisElement[key];
                fn1(thisElement, key, val);
              }
            }
          } else if (typeof thisElement === 'function') {
            (function(thisElement) {
              var fn;
              fn = function() {
                return thisElement(Wistia);
              };
              return fnQueue.push(fn);
            })(thisElement);
          } else {
            Wistia.notice(queueName + ": Don't know what to do with " + thisElement + ", ignoring.");
          }
        }
        for (k = 0, len1 = fnQueue.length; k < len1; k++) {
          fn = fnQueue[k];
          try {
            if (typeof fn === "function") {
              fn(Wistia);
            }
          } catch (error) {
            e = error;
            wlog.error(e);
          }
        }
        queue.length = 0;
      }
    } catch (error) {
      e = error;
      wlog.error(e);
    }
    return Wistia._isFlushingInitQueue = false;
  };
  Wistia.getInitQueueListeners = function() {
    return assign([], Wistia._wqBoundListeners);
  };
  Wistia.revokeQueueListener = function(listener) {
    var j, k, len, len1, ref3, results, toRevoke, u;
    toRevoke = listener instanceof Array ? listener : [listener];
    results = [];
    for (j = 0, len = toRevoke.length; j < len; j++) {
      listener = toRevoke[j];
      if (listener.__unbinds) {
        ref3 = listener.__unbinds;
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          u = ref3[k];
          if (typeof u === "function") {
            u();
          }
        }
        delete listener.__unbinds;
      }
      results.push(Wistia._wqBoundListeners = Wistia._wqBoundListeners.filter(function(l) {
        return l !== listener;
      }));
    }
    return results;
  };
  Wistia.watchForInit = function() {
    if (Wistia._pollInit == null) {
      Wistia._pollInit = function() {
        Wistia.flushInitQueue();
        return Wistia.flushInit();
      };
    }
    Wistia._pollInit();
    if (Wistia.eventLoop) {
      Wistia.eventLoop.unpause('poll_init');
      return Wistia.eventLoop.add('poll_init', 500, Wistia._pollInit);
    }
  };
  Wistia.api = function(matcher, fn) {
    var all, apiHandles, container, handle, index, j, len, query, ref3, ref4, ref5;
    if (matcher != null) {
      if (fn) {
        return Wistia.api.onFind(matcher, fn);
      }
      if (typeof matcher === 'function') {
        return Wistia.api.onFind(matcher);
      }
      if (typeof matcher === 'string') {
        query = matcher;
        container = document.querySelector("[unique-id='" + query + "']") || document.getElementById(query);
        if (!container) {
          apiHandles = Wistia.api.all();
          for (j = 0, len = apiHandles.length; j < len; j++) {
            handle = apiHandles[j];
            if (((ref3 = handle.hashedId()) != null ? ref3.indexOf(query) : void 0) === 0 || ((ref4 = handle.container.id) != null ? ref4.indexOf(query) : void 0) === 0) {
              container = handle.container;
              break;
            }
          }
        }
      } else if (typeof matcher === 'number') {
        index = matcher;
        all = Wistia.api.all();
        if (index < 0) {
          index = all.length + index;
        }
        container = ((ref5 = all[index]) != null ? ref5.container : void 0) || null;
      } else if (window.HTMLElement && matcher instanceof HTMLElement) {
        container = matcher;
      } else {
        Wistia.error('Wistia.api: Unrecognized matcher', matcher);
      }
      if ((container != null ? container.wistiaApi : void 0) && (container.wistiaApi instanceof Wistia.PublicApi || (Wistia.IframeApi && container.wistiaApi instanceof Wistia.IframeApi))) {
        return container.wistiaApi;
      } else if ((container != null ? container.tagName : void 0) === 'WISTIA-PLAYER' && (container != null ? container.translationApi : void 0)) {
        return container.translationApi;
      } else {
        return null;
      }
    } else {
      return Wistia.api.all()[0] || null;
    }
  };
  Wistia.api.all = function() {
    return Wistia.api._apiHandles().concat(Wistia.api._iframeHandles());
  };
  Wistia.api._apiHandles = function() {
    return Wistia.embeds.initialized();
  };
  Wistia.api._iframeHandles = function() {
    var handle, ref3, results, signature;
    ref3 = Wistia._data.iframe_api;
    results = [];
    for (signature in ref3) {
      handle = ref3[signature];
      results.push(handle);
    }
    return results;
  };
  Wistia.api.onFind = function(matcher, fn) {
    var runIfMatch, unbinds;
    if (typeof matcher === 'function') {
      fn = matcher;
      matcher = null;
    }
    runIfMatch = function(video) {
      if (matcher === null || Wistia.api(matcher) === video) {
        fn(video);
        return true;
      } else {
        return false;
      }
    };
    wistiaEmbeds.each(runIfMatch);
    unbinds = [wistiaEmbeds.on('initembed', runIfMatch), wistiaEmbeds.on('afterreplace', runIfMatch)];
    return (function(_this) {
      return function() {
        var j, len, results, u;
        results = [];
        for (j = 0, len = unbinds.length; j < len; j++) {
          u = unbinds[j];
          results.push(u());
        }
        return results;
      };
    })(this);
  };
  Wistia._asyncInitSoonAfterLoad = function(delay) {
    if (delay == null) {
      delay = 10;
    }
    return setTimeout(function() {
      var e;
      try {
        Wistia.embeds.setup();
        if (!Wistia.embeds._dontWatch) {
          Wistia.embeds.watch();
        }
        return Wistia.watchForInit();
      } catch (error) {
        e = error;
        return wlog.error(e);
      }
    }, delay);
  };
  Wistia._initializers.initAsyncEmbeds = function() {
    var base1, base2, ref3;
    Wistia.embeds.notEmbedding = new StopGo();
    Wistia.embeds.notEmbedding(true);
    if (Wistia._data == null) {
      Wistia._data = {};
    }
    if ((base1 = Wistia._data).video == null) {
      base1.video = {};
    }
    if ((base2 = Wistia._data).iframe_api == null) {
      base2.iframe_api = {};
    }
    if (window._inWistiaIframe) {
      return setTimeout((function() {
        return Wistia.watchForInit();
      }), 10);
    } else {
      Wistia._asyncInitSoonAfterLoad();
      Wistia._asyncInitSoonAfterLoad(500);
      return (ref3 = Wistia.eventLoop) != null ? ref3.pause('poll_init') : void 0;
    }
  };
  return Wistia._destructors.destroyAsyncEmbeds = function() {
    var ref3, ref4;
    clearTimeouts('embeds_setup');
    if ((ref3 = Wistia.eventLoop) != null) {
      ref3.remove('poll_init');
    }
    return (ref4 = Wistia.embeds) != null ? ref4.unwatch() : void 0;
  };
})(Wistia);
