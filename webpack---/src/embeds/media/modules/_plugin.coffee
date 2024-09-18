(function(Wistia) {
  var allow3rdParty, eV1HostWithPort, eV1Protocol, merge, ref, ref1, runScripts, seqId, wData, wRemoveData;
  if (!Wistia.Plugin) {
    Wistia.Plugin = {};
  }
  if (Wistia.Plugin.Base) {
    return;
  }
  ref = require('utilities/hosts.js'), eV1HostWithPort = ref.eV1HostWithPort, eV1Protocol = ref.eV1Protocol;
  allow3rdParty = require('utilities/pluginScriptsToLoad.js').allow3rdParty;
  merge = require('utilities/obj.js').merge;
  ref1 = require('utilities/wistiaData.js'), wData = ref1.wData, wRemoveData = ref1.wRemoveData;
  seqId = require('utilities/seqid.js').seqId;
  runScripts = require('utilities/script-utils.js').runScripts;
  Wistia.Plugin.Base = (function() {
    function Base() {
      this.pluginName = "plugin";
      this;
    }

    Base.prototype.instances = function() {
      return wData(["plugins", this.pluginName, this.video.uuid]);
    };

    Base.prototype.register = function(data) {
      var target;
      target = this.playlist || this.video || this.audio;
      target.plugins[this.uuid] = data;
      return wData(["plugins", this.pluginName, target.uuid, this.uuid], data);
    };

    Base.prototype.remove = function(options) {
      var target;
      if (options == null) {
        options = {};
      }
      target = this.playlist || this.video || this.audio;
      target.plugins[this.uuid] = null;
      wRemoveData(["plugins", this.pluginName, target.uuid, this.uuid]);
      if (target.plugins[this.uuid] === this) {
        delete target.plugins[this.uuid];
      }
      if (target.plugin[this.pluginName] === this) {
        return delete target.plugin[this.pluginName];
      }
    };

    Base.prototype.fit = function() {};

    Base.prototype.init = function(video, pluginOptions) {
      if (video.plugins == null) {
        video.plugins = {};
      }
      if (video != null ? video.playlist : void 0) {
        this.playlist = video;
      } else {
        this.video = video;
      }
      this.target = this.playlist || this.video || this.audio;
      this.options = pluginOptions || {};
      this.params = merge({}, pluginOptions || {});
      return this.uuid = this.params.uuid || seqId("wistia_", "_plugin");
    };

    return Base;

  })();
  if (!Wistia.plugin) {
    Wistia.plugin = function(name, callback) {
      var ctx, initPlugin, initPluginNow, ref2, ref3, ref4;
      if (ctx = (ref2 = Wistia.pluginQueue) != null ? (ref3 = ref2[name]) != null ? ref3.shift() : void 0 : void 0) {
        initPluginNow = function() {
          var pluginHandle, ref4;
          ctx.video.info('initializing plugin', name, ctx.options);
          pluginHandle = callback(ctx.video._impl || ctx.video, ctx.options) || true;
          ctx.video.plugin[name] = pluginHandle;
          if (ctx.video._impl) {
            ctx.video._impl.plugin[name] = pluginHandle;
          }
          ctx.video.trigger('plugininitialized', name);
          return (ref4 = ctx.video._pluginStopGos) != null ? typeof ref4[name] === "function" ? ref4[name](true, pluginHandle) : void 0 : void 0;
        };
        initPlugin = function() {
          if (ctx.options.initBeforeHasData) {
            return initPluginNow();
          } else {
            return ctx.video.hasData(initPluginNow);
          }
        };
        if (ctx.options.initBeforeHasData !== true && ((ref4 = ctx.video) != null ? ref4.looksDown() : void 0)) {
          ctx.video.notice('Wistia.plugin: delaying initialization of plugin until "up"', name, ctx.options);
          ctx.video.bind('up', function() {
            initPlugin();
            return this.unbind;
          });
        } else {
          if (ctx.video._implVersion === ctx.implVersion) {
            initPlugin();
          } else {
            ctx.video.notice('Wistia.plugin impl changed, ignoring initialization', name, ctx.options);
          }
        }
      }
      if (!Wistia.plugin[name]) {
        return Wistia.plugin[name] = callback;
      }
    };
    Wistia.plugin._prefetched = {};
    Wistia.plugin._inject = function(video, pluginName, options) {
      var defaultSrc, pluginScripts;
      if (options == null) {
        options = {};
      }
      if (options['on'] !== false) {
        defaultSrc = (eV1Protocol()) + "//" + (eV1HostWithPort()) + "/assets/external/" + pluginName + ".js";
        pluginScripts = [
          {
            name: pluginName,
            options: options,
            src: options.src && Wistia.plugin._allow3rdParty(video.options) ? options.src : defaultSrc,
            async: true
          }
        ];
        Wistia.plugin._setFnForDefinedPlugins(video, pluginScripts);
        return Wistia.plugin._execQueue(video, pluginScripts);
      }
    };
    Wistia.plugin._allow3rdParty = function(options) {
      return allow3rdParty(options);
    };
    Wistia.plugin._setFnForDefinedPlugins = function(video, plugins) {
      var i, len, results, script;
      results = [];
      for (i = 0, len = plugins.length; i < len; i++) {
        script = plugins[i];
        if (Wistia.plugin[script.name]) {
          results.push((function(script) {
            script.fn = function() {
              var initPluginNow;
              initPluginNow = function() {
                var name1, pluginHandle, ref2;
                pluginHandle = Wistia.plugin[script.name](video._impl || video, script.options) || true;
                video.plugin[script.name] = pluginHandle;
                if (video._impl) {
                  video._impl.plugin[script.name] = pluginHandle;
                  video.trigger('plugininitialized', script.name);
                }
                return (ref2 = video._pluginStopGos) != null ? typeof ref2[name1 = script.name] === "function" ? ref2[name1](true, pluginHandle) : void 0 : void 0;
              };
              if (script.options.initBeforeHasData) {
                return initPluginNow();
              } else {
                return video.hasData(initPluginNow);
              }
            };
            return script.async = false;
          })(script));
        }
      }
      return results;
    };
    Wistia.plugin._queueUndefinedPlugins = function(video, plugins) {
      var i, len, name, plugin, results, script;
      if (Wistia.pluginQueue == null) {
        Wistia.pluginQueue = {};
      }
      results = [];
      for (i = 0, len = plugins.length; i < len; i++) {
        plugin = plugins[i];
        if (plugin.subScripts) {
          results.push((function() {
            var j, len1, ref2, results1;
            ref2 = plugin.subScripts;
            results1 = [];
            for (j = 0, len1 = ref2.length; j < len1; j++) {
              script = ref2[j];
              name = script.name || script.src;
              if (Wistia.pluginQueue[name] == null) {
                Wistia.pluginQueue[name] = [];
              }
              if (!plugin.fn) {
                results1.push(Wistia.pluginQueue[name].push({
                  video: video,
                  implVersion: video._implVersion,
                  options: script.options
                }));
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        } else {
          name = plugin.name || plugin.src;
          if (Wistia.pluginQueue[name] == null) {
            Wistia.pluginQueue[name] = [];
          }
          if (!plugin.fn) {
            results.push(Wistia.pluginQueue[name].push({
              video: video,
              implVersion: video._implVersion,
              options: plugin.options
            }));
          } else {
            results.push(void 0);
          }
        }
      }
      return results;
    };
    Wistia.plugin._execQueue = function(video, plugins, callback) {
      Wistia.plugin._queueUndefinedPlugins(video, plugins);
      return runScripts(plugins).then(callback);
    };
    Wistia.plugin._init = function(pluginName, video, options) {
      var instance, klass, klassName;
      klassName = pluginName.charAt(0).toUpperCase() + pluginName.substr(1);
      klass = Wistia.Plugin[klassName];
      instance = new klass();
      instance.init(video, options);
      return instance;
    };
    Wistia.plugin._instance = function(pluginName, video, pluginUuid) {
      return wData(["plugins", pluginName, video.uuid, pluginUuid]);
    };
    Wistia.plugin._remove = function(pluginName, video, pluginUuid) {
      var ref2;
      if ((ref2 = Wistia.plugin._instance(pluginName, video, pluginUuid)) != null) {
        ref2.remove();
      }
    };
    Wistia.plugin._isActive = function(pluginName, video, pluginUuid) {
      return !!Wistia.plugin._instance(pluginName, video, pluginUuid);
    };
    return Wistia.plugin._defined = function() {
      var key, ref2, results, val;
      ref2 = Wistia.plugin;
      results = [];
      for (key in ref2) {
        val = ref2[key];
        if (!/^_/.test(key)) {
          results.push({
            name: key,
            options: val
          });
        }
      }
      return results;
    };
  }
})(Wistia);
