"use strict";
(self.webpackChunk_segment_analytics_next = self.webpackChunk_segment_analytics_next || []).push([
    [464], {
        9254: function(t, n, i) {
            function e(t, n) {
                var i, e;
                return "boolean" == typeof(null == n ? void 0 : n.enabled) ? n.enabled : null === (e = null === (i = null == t ? void 0 : t.__default) || void 0 === i ? void 0 : i.enabled) || void 0 === e || e
            }
            i.d(n, {
                n: function() {
                    return e
                }
            })
        },
        3162: function(t, n, i) {
            i.r(n), i.d(n, {
                LegacyDestination: function() {
                    return G
                },
                ajsDestinations: function() {
                    return S
                }
            });
            var e = i(5163),
                r = i(4122),
                o = i(94),
                s = i(8404),
                a = i(1494),
                u = i(204),
                c = i(6096),
                l = i(9254),
                d = i(5944),
                h = i(8044),
                v = i(3098),
                f = i(3061),
                p = i(6338),
                m = i(7566),
                g = i(7070);

            function y(t) {
                return t.toLowerCase().replace(".", "").replace(/\s+/g, "-")
            }

            function w(t, n) {
                return void 0 === n && (n = !1), n ? btoa(t).replace(/=/g, "") : void 0
            }

            function b(t, n, i, r) {
                return (0, e.mG)(this, void 0, Promise, (function() {
                    var o, s, a, u, c, l;
                    return (0, e.Jh)(this, (function(d) {
                        switch (d.label) {
                            case 0:
                                o = y(n), s = w(o, r), a = (0, m.Kg)(), u = "".concat(a, "/integrations/").concat(null != s ? s : o, "/").concat(i, "/").concat(null != s ? s : o, ".dynamic.js.gz"), d.label = 1;
                            case 1:
                                return d.trys.push([1, 3, , 4]), [4, (0, g.v)(u)];
                            case 2:
                                return d.sent(),
                                    function(t, n, i) {
                                        var r, o;
                                        try {
                                            var s = (null !== (o = null === (r = null === window || void 0 === window ? void 0 : window.performance) || void 0 === r ? void 0 : r.getEntriesByName(t, "resource")) && void 0 !== o ? o : [])[0];
                                            s && n.stats.gauge("legacy_destination_time", Math.round(s.duration), (0, e.ev)([i], s.duration < 100 ? ["cached"] : [], !0))
                                        } catch (t) {}
                                    }(u, t, n), [3, 4];
                            case 3:
                                throw c = d.sent(), t.stats.gauge("legacy_destination_time", -1, ["plugin:".concat(n), "failed"]), c;
                            case 4:
                                return l = window["".concat(o, "Deps")], [4, Promise.all(l.map((function(t) {
                                    return (0, g.v)(a + t + ".gz")
                                })))];
                            case 5:
                                return d.sent(), window["".concat(o, "Loader")](), [2, window["".concat(o, "Integration")]]
                        }
                    }))
                }))
            }
            var P = i(7595),
                _ = i(98),
                z = i(7848);

            function k(t, n) {
                return (0, e.mG)(this, void 0, Promise, (function() {
                    var i, r = this;
                    return (0, e.Jh)(this, (function(a) {
                        switch (a.label) {
                            case 0:
                                return i = [], (0, o.s)() ? [2, n] : [4, (0, h.x)((function() {
                                    return n.length > 0 && (0, o.G)()
                                }), (function() {
                                    return (0, e.mG)(r, void 0, void 0, (function() {
                                        var r, o;
                                        return (0, e.Jh)(this, (function(e) {
                                            switch (e.label) {
                                                case 0:
                                                    return (r = n.pop()) ? [4, (0, c.a)(r, t)] : [2];
                                                case 1:
                                                    return o = e.sent(), o instanceof s._ || i.push(r), [2]
                                            }
                                        }))
                                    }))
                                }))];
                            case 1:
                                return a.sent(), i.map((function(t) {
                                    return n.pushWithBackoff(t)
                                })), [2, n]
                        }
                    }))
                }))
            }
            var G = function() {
                function t(t, n, i, r, o, s) {
                    void 0 === r && (r = {});
                    var a = this;
                    this.options = {}, this.type = "destination", this.middleware = [], this.initializePromise = (0, z.d)(), this.flushing = !1, this.name = t, this.version = n, this.settings = (0, e.pi)({}, r), this.disableAutoISOConversion = o.disableAutoISOConversion || !1, this.integrationSource = s, this.settings.type && "browser" === this.settings.type && delete this.settings.type, this.initializePromise.promise.then((function(t) {
                        return a._initialized = t
                    }), (function() {})), this.options = o, this.buffer = o.disableClientPersistence ? new v.Z(4, []) : new f.$(4, "".concat(i, ":dest-").concat(t)), this.scheduleFlush()
                }
                return t.prototype.isLoaded = function() {
                    return !!this._ready
                }, t.prototype.ready = function() {
                    var t = this;
                    return this.initializePromise.promise.then((function() {
                        var n;
                        return null !== (n = t.onReady) && void 0 !== n ? n : Promise.resolve()
                    }))
                }, t.prototype.load = function(t, n) {
                    var i;
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        var r, o, s = this;
                        return (0, e.Jh)(this, (function(e) {
                            switch (e.label) {
                                case 0:
                                    return this._ready || void 0 !== this.onReady ? [2] : null === (i = this.integrationSource) || void 0 === i ? [3, 1] : (o = i, [3, 3]);
                                case 1:
                                    return [4, b(t, this.name, this.version, this.options.obfuscate)];
                                case 2:
                                    o = e.sent(), e.label = 3;
                                case 3:
                                    r = o, this.integration = function(t, n, i) {
                                        var e;
                                        "Integration" in t ? (t({
                                            user: function() {
                                                return i.user()
                                            },
                                            addIntegration: function() {}
                                        }), e = t.Integration) : e = t;
                                        var r = new e(n);
                                        return r.analytics = i, r
                                    }(r, this.settings, n), this.onReady = new Promise((function(t) {
                                        s.integration.once("ready", (function() {
                                            s._ready = !0, t(!0)
                                        }))
                                    })), this.integration.on("initialize", (function() {
                                        s.initializePromise.resolve(!0)
                                    }));
                                    try {
                                        (0, _.z)(t, {
                                            integrationName: this.name,
                                            methodName: "initialize",
                                            type: "classic"
                                        }), this.integration.initialize()
                                    } catch (n) {
                                        throw (0, _.z)(t, {
                                            integrationName: this.name,
                                            methodName: "initialize",
                                            type: "classic",
                                            didError: !0
                                        }), this.initializePromise.resolve(!1), n
                                    }
                                    return [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function(t, n) {
                    return function(t, n, i) {
                        return (0, e.mG)(this, void 0, Promise, (function() {
                            var r, o, s, a;
                            return (0, e.Jh)(this, (function(e) {
                                return r = (0, m.Kg)(), o = y(t), s = w(t, i), a = "".concat(r, "/integrations/").concat(null != s ? s : o, "/").concat(n, "/").concat(null != s ? s : o, ".dynamic.js.gz"), [2, (0, g.t)(a)]
                            }))
                        }))
                    }(this.name, this.version, this.options.obfuscate)
                }, t.prototype.addMiddleware = function() {
                    for (var t, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                    this.middleware = (t = this.middleware).concat.apply(t, n)
                }, t.prototype.shouldBuffer = function(t) {
                    return "page" !== t.event.type && ((0, o.s)() || !0 !== this._ready || !0 !== this._initialized)
                }, t.prototype.send = function(t, n, i) {
                    var r, o;
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        var s, u, c, d, h, v;
                        return (0, e.Jh)(this, (function(f) {
                            switch (f.label) {
                                case 0:
                                    return this.shouldBuffer(t) ? (this.buffer.push(t), this.scheduleFlush(), [2, t]) : (s = null === (o = null === (r = this.options) || void 0 === r ? void 0 : r.plan) || void 0 === o ? void 0 : o.track, u = t.event.event, s && u && "Segment.io" !== this.name && (c = s[u], (0, l.n)(s, c) ? t.updateEvent("integrations", (0, e.pi)((0, e.pi)({}, t.event.integrations), null == c ? void 0 : c.integrations)) : (t.updateEvent("integrations", (0, e.pi)((0, e.pi)({}, t.event.integrations), {
                                        All: !1,
                                        "Segment.io": !0
                                    })), t.cancel(new a.Y({
                                        retry: !1,
                                        reason: "Event ".concat(u, " disabled for integration ").concat(this.name, " in tracking plan"),
                                        type: "Dropped by plan"
                                    }))), (null == c ? void 0 : c.enabled) && !1 === (null == c ? void 0 : c.integrations[this.name]) && t.cancel(new a.Y({
                                        retry: !1,
                                        reason: "Event ".concat(u, " disabled for integration ").concat(this.name, " in tracking plan"),
                                        type: "Dropped by plan"
                                    }))), [4, (0, p.applyDestinationMiddleware)(this.name, t.event, this.middleware)]);
                                case 1:
                                    if (null === (d = f.sent())) return [2, t];
                                    h = new n(d, {
                                        traverse: !this.disableAutoISOConversion
                                    }), (0, _.z)(t, {
                                        integrationName: this.name,
                                        methodName: i,
                                        type: "classic"
                                    }), f.label = 2;
                                case 2:
                                    return f.trys.push([2, 5, , 6]), this.integration ? [4, this.integration.invoke.call(this.integration, i, h)] : [3, 4];
                                case 3:
                                    f.sent(), f.label = 4;
                                case 4:
                                    return [3, 6];
                                case 5:
                                    throw v = f.sent(), (0, _.z)(t, {
                                        integrationName: this.name,
                                        methodName: i,
                                        type: "classic",
                                        didError: !0
                                    }), v;
                                case 6:
                                    return [2, t]
                            }
                        }))
                    }))
                }, t.prototype.track = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Track, "track")]
                        }))
                    }))
                }, t.prototype.page = function(t) {
                    var n;
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(i) {
                            switch (i.label) {
                                case 0:
                                    return (null === (n = this.integration) || void 0 === n ? void 0 : n._assumesPageview) && !this._initialized && this.integration.initialize(), [4, this.initializePromise.promise];
                                case 1:
                                    return i.sent(), [2, this.send(t, r.Page, "page")]
                            }
                        }))
                    }))
                }, t.prototype.identify = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Identify, "identify")]
                        }))
                    }))
                }, t.prototype.alias = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Alias, "alias")]
                        }))
                    }))
                }, t.prototype.group = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Group, "group")]
                        }))
                    }))
                }, t.prototype.scheduleFlush = function() {
                    var t = this;
                    this.flushing || setTimeout((function() {
                        return (0, e.mG)(t, void 0, void 0, (function() {
                            var t;
                            return (0, e.Jh)(this, (function(n) {
                                switch (n.label) {
                                    case 0:
                                        return (0, o.s)() || !0 !== this._ready || !0 !== this._initialized ? (this.scheduleFlush(), [2]) : (this.flushing = !0, t = this, [4, k(this, this.buffer)]);
                                    case 1:
                                        return t.buffer = n.sent(), this.flushing = !1, this.buffer.todo > 0 && this.scheduleFlush(), [2]
                                }
                            }))
                        }))
                    }), 5e3 * Math.random())
                }, t
            }();

            function S(t, n, i, r, o, s) {
                var a, c;
                if (void 0 === i && (i = {}), void 0 === r && (r = {}), (0, u.s)()) return [];
                n.plan && ((r = null != r ? r : {}).plan = n.plan);
                var l = null !== (c = null === (a = n.middlewareSettings) || void 0 === a ? void 0 : a.routingRules) && void 0 !== c ? c : [],
                    h = n.integrations,
                    v = r.integrations,
                    f = (0, d.o)(n, null != r ? r : {}),
                    p = null == s ? void 0 : s.reduce((function(t, n) {
                        var i;
                        return (0, e.pi)((0, e.pi)({}, t), ((i = {})[function(t) {
                            return ("Integration" in t ? t.Integration : t).prototype.name
                        }(n)] = n, i))
                    }), {}),
                    m = new Set((0, e.ev)((0, e.ev)([], Object.keys(h).filter((function(t) {
                        return function(t, n) {
                            var i, e = n.type,
                                r = n.bundlingStatus,
                                o = n.versionSettings,
                                s = "unbundled" !== r && ("browser" === e || (null === (i = null == o ? void 0 : o.componentTypes) || void 0 === i ? void 0 : i.includes("browser")));
                            return !t.startsWith("Segment") && "Iterable" !== t && s
                        }(t, h[t])
                    })), !0), Object.keys(p || {}).filter((function(t) {
                        return (0, P.PO)(h[t]) || (0, P.PO)(null == v ? void 0 : v[t])
                    })), !0));
                return Array.from(m).filter((function(t) {
                    return ! function(t, n) {
                        var i = !1 === n.All && void 0 === n[t];
                        return !1 === n[t] || i
                    }(t, i)
                })).map((function(n) {
                    var i = function(t) {
                            var n, i, e, r;
                            return null !== (r = null !== (i = null === (n = null == t ? void 0 : t.versionSettings) || void 0 === n ? void 0 : n.override) && void 0 !== i ? i : null === (e = null == t ? void 0 : t.versionSettings) || void 0 === e ? void 0 : e.version) && void 0 !== r ? r : "latest"
                        }(h[n]),
                        e = new G(n, i, t, f[n], r, null == p ? void 0 : p[n]);
                    return l.filter((function(t) {
                        return t.destinationName === n
                    })).length > 0 && o && e.addMiddleware(o), e
                }))
            }
        }
    }
]);
//# sourceMappingURL=ajs-destination.bundle.ed53a26b6edc80c65d73.js.map