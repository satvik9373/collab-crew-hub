var slice = [].slice;

(function(Wistia) {
  var IframeApiProxy, countMetric, dynamicImport, elemRebind, elemUnbind, k, ref, ref1, v;
  ref = require('utilities/elem.js'), elemRebind = ref.elemRebind, elemUnbind = ref.elemUnbind;
  dynamicImport = require('utilities/dynamicImport.ts').dynamicImport;
  countMetric = require('utilities/simpleMetrics.js').countMetric;
  if (!Wistia.iframeInit) {
    Wistia.iframeInit = function(media, options) {
      return dynamicImport('assets/external/insideIframe.js').then(function(mod) {
        return mod.iframeInit(media, options);
      });
    };
  }
  if (!Wistia.IframeApiProxy) {
    IframeApiProxy = (function() {
      function IframeApiProxy(iframe1) {
        this.iframe = iframe1;
        this.loadIframeApi();
      }

      IframeApiProxy.prototype.loadIframeApi = function() {
        return new Promise((function(_this) {
          return function(resolve) {
            return setTimeout(function() {
              return dynamicImport('assets/external/iframeApi.js').then((function(_this) {
                return function() {
                  _this._loaded = true;
                  return resolve();
                };
              })(this));
            }, 0);
          };
        })(this));
      };

      IframeApiProxy.prototype.proxyFn = function() {
        var args, methodName, ref1;
        methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        countMetric('player/iframeApiProxy-praxyfn', 1, {
          methodName: methodName
        });
        if (this._loaded) {
          return (ref1 = this.iframe.wistiaApi)[methodName].apply(ref1, args);
        } else {
          this.loadIframeApi().then((function(_this) {
            return function() {
              var ref2;
              if (_this.iframe.wistiaApi !== _this) {
                return (ref2 = _this.iframe.wistiaApi)[methodName].apply(ref2, args);
              }
            };
          })(this));
          return this;
        }
      };

      IframeApiProxy.prototype._hasImpl = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.proxyFn.apply(this, ['_hasImpl'].concat(slice.call(args)));
      };

      IframeApiProxy.prototype.hasData = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.proxyFn.apply(this, ['hasData'].concat(slice.call(args)));
      };

      IframeApiProxy.prototype.embedded = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.proxyFn.apply(this, ['embedded'].concat(slice.call(args)));
      };

      IframeApiProxy.prototype.ready = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.proxyFn.apply(this, ['ready'].concat(slice.call(args)));
      };

      IframeApiProxy.prototype.up = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.proxyFn.apply(this, ['up'].concat(slice.call(args)));
      };

      IframeApiProxy.prototype.down = function() {
        return this.proxyFn.apply(this, ['down'].concat(slice.call(args)));
      };

      return IframeApiProxy;

    })();
    ref1 = Wistia.PublicApi.prototype;
    for (k in ref1) {
      v = ref1[k];
      if (!IframeApiProxy.prototype[k] && typeof v === 'function') {
        (function(k) {
          return IframeApiProxy.prototype[k] = function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return this.proxyFn.apply(this, [k].concat(slice.call(args)));
          };
        })(k);
      }
    }
    Wistia.IframeApiProxy = IframeApiProxy;
  }
  if (Wistia.maybeRequireIframeApi == null) {
    Wistia.maybeRequireIframeApi = function() {
      var i, iframe, len, results, wistiaIframes;
      wistiaIframes = document.querySelectorAll('iframe.wistia_embed,iframe[name=wistia_embed],iframe.wistia_playlist,iframe[name=wistia_playlist]');
      if (wistiaIframes.length > 0) {
        results = [];
        for (i = 0, len = wistiaIframes.length; i < len; i++) {
          iframe = wistiaIframes[i];
          if (!iframe.wistiaApi) {
            results.push(iframe.wistiaIframeApiProxy = iframe.wistiaApi = new IframeApiProxy(iframe));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    };
  }
  if (Wistia.onIframePostMessage == null) {
    Wistia.onIframePostMessage = function(event) {
      if (event.data === 'new-wistia-iframe') {
        dynamicImport('assets/external/iframeApi.js');
        return elemUnbind;
      }
    };
  }
  elemRebind(window, 'message', Wistia.onIframePostMessage);
  Wistia.bind('ev1initend', function() {
    Wistia.maybeRequireIframeApi();
    return elemRebind(window, 'message', Wistia.onIframePostMessage);
  });
  return Wistia.bind('ev1destroystart', function() {
    return elemUnbind(window, 'message', Wistia.onIframePostMessage);
  });
})(Wistia);
