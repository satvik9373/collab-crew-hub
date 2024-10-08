! function() {
    "use strict";

    function k() {
        k = function() {
            return a
        };
        var c, a = {},
            e = Object.prototype,
            l = e.hasOwnProperty,
            u = Object.defineProperty || function(e, t, n) {
                e[t] = n.value
            },
            t = "function" == typeof Symbol ? Symbol : {},
            r = t.iterator || "@@iterator",
            n = t.asyncIterator || "@@asyncIterator",
            o = t.toStringTag || "@@toStringTag";

        function i(e, t, n) {
            return Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            i({}, "")
        } catch (c) {
            i = function(e, t, n) {
                return e[t] = n
            }
        }

        function s(e, t, n, r) {
            var o, i, a, s, t = t && t.prototype instanceof y ? t : y,
                t = Object.create(t.prototype),
                r = new C(r || []);
            return u(t, "_invoke", {
                value: (o = e, i = n, a = r, s = f, function(e, t) {
                    if (s === h) throw new Error("Generator is already running");
                    if (s === m) {
                        if ("throw" === e) throw t;
                        return {
                            value: c,
                            done: !0
                        }
                    }
                    for (a.method = e, a.arg = t;;) {
                        var n = a.delegate;
                        if (n) {
                            n = function e(t, n) {
                                var r = n.method,
                                    o = t.iterator[r];
                                if (o === c) return n.delegate = null, "throw" === r && t.iterator.return && (n.method = "return", n.arg = c, e(t, n), "throw" === n.method) || "return" !== r && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + r + "' method")), v;
                                r = d(o, t.iterator, n.arg);
                                if ("throw" === r.type) return n.method = "throw", n.arg = r.arg, n.delegate = null, v;
                                o = r.arg;
                                return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = c), n.delegate = null, v) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, v)
                            }(n, a);
                            if (n) {
                                if (n === v) continue;
                                return n
                            }
                        }
                        if ("next" === a.method) a.sent = a._sent = a.arg;
                        else if ("throw" === a.method) {
                            if (s === f) throw s = m, a.arg;
                            a.dispatchException(a.arg)
                        } else "return" === a.method && a.abrupt("return", a.arg);
                        s = h;
                        n = d(o, i, a);
                        if ("normal" === n.type) {
                            if (s = a.done ? m : p, n.arg === v) continue;
                            return {
                                value: n.arg,
                                done: a.done
                            }
                        }
                        "throw" === n.type && (s = m, a.method = "throw", a.arg = n.arg)
                    }
                })
            }), t
        }

        function d(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        a.wrap = s;
        var f = "suspendedStart",
            p = "suspendedYield",
            h = "executing",
            m = "completed",
            v = {};

        function y() {}

        function g() {}

        function b() {}
        var t = {},
            w = (i(t, r, function() {
                return this
            }), Object.getPrototypeOf),
            w = w && w(w(_([]))),
            S = (w && w !== e && l.call(w, r) && (t = w), b.prototype = y.prototype = Object.create(t));

        function E(e) {
            ["next", "throw", "return"].forEach(function(t) {
                i(e, t, function(e) {
                    return this._invoke(t, e)
                })
            })
        }

        function x(a, s) {
            var t;
            u(this, "_invoke", {
                value: function(n, r) {
                    function e() {
                        return new s(function(e, t) {
                            ! function t(e, n, r, o) {
                                var i, e = d(a[e], a, n);
                                if ("throw" !== e.type) return (n = (i = e.arg).value) && "object" == typeof n && l.call(n, "__await") ? s.resolve(n.__await).then(function(e) {
                                    t("next", e, r, o)
                                }, function(e) {
                                    t("throw", e, r, o)
                                }) : s.resolve(n).then(function(e) {
                                    i.value = e, r(i)
                                }, function(e) {
                                    return t("throw", e, r, o)
                                });
                                o(e.arg)
                            }(n, r, e, t)
                        })
                    }
                    return t = t ? t.then(e, e) : e()
                }
            })
        }

        function I(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function T(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function C(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(I, this), this.reset(!0)
        }

        function _(t) {
            if (t || "" === t) {
                var n, e = t[r];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) return n = -1, (e = function e() {
                    for (; ++n < t.length;)
                        if (l.call(t, n)) return e.value = t[n], e.done = !1, e;
                    return e.value = c, e.done = !0, e
                }).next = e
            }
            throw new TypeError(typeof t + " is not iterable")
        }
        return u(S, "constructor", {
            value: g.prototype = b,
            configurable: !0
        }), u(b, "constructor", {
            value: g,
            configurable: !0
        }), g.displayName = i(b, o, "GeneratorFunction"), a.isGeneratorFunction = function(e) {
            e = "function" == typeof e && e.constructor;
            return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name))
        }, a.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, i(e, o, "GeneratorFunction")), e.prototype = Object.create(S), e
        }, a.awrap = function(e) {
            return {
                __await: e
            }
        }, E(x.prototype), i(x.prototype, n, function() {
            return this
        }), a.AsyncIterator = x, a.async = function(e, t, n, r, o) {
            void 0 === o && (o = Promise);
            var i = new x(s(e, t, n, r), o);
            return a.isGeneratorFunction(t) ? i : i.next().then(function(e) {
                return e.done ? e.value : i.next()
            })
        }, E(S), i(S, o, "Generator"), i(S, r, function() {
            return this
        }), i(S, "toString", function() {
            return "[object Generator]"
        }), a.keys = function(e) {
            var t, n = Object(e),
                r = [];
            for (t in n) r.push(t);
            return r.reverse(),
                function e() {
                    for (; r.length;) {
                        var t = r.pop();
                        if (t in n) return e.value = t, e.done = !1, e
                    }
                    return e.done = !0, e
                }
        }, a.values = _, C.prototype = {
            constructor: C,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = c, this.done = !1, this.delegate = null, this.method = "next", this.arg = c, this.tryEntries.forEach(T), !e)
                    for (var t in this) "t" === t.charAt(0) && l.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = c)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(n) {
                if (this.done) throw n;
                var r = this;

                function e(e, t) {
                    return i.type = "throw", i.arg = n, r.next = e, t && (r.method = "next", r.arg = c), !!t
                }
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var o = this.tryEntries[t],
                        i = o.completion;
                    if ("root" === o.tryLoc) return e("end");
                    if (o.tryLoc <= this.prev) {
                        var a = l.call(o, "catchLoc"),
                            s = l.call(o, "finallyLoc");
                        if (a && s) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                        } else if (a) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0)
                        } else {
                            if (!s) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                    var r = this.tryEntries[n];
                    if (r.tryLoc <= this.prev && l.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                        var o = r;
                        break
                    }
                }
                var i = (o = o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc ? null : o) ? o.completion : {};
                return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(i)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), v
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), T(n), v
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var n, r, o = this.tryEntries[t];
                    if (o.tryLoc === e) return "throw" === (n = o.completion).type && (r = n.arg, T(o)), r
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: _(e),
                    resultName: t,
                    nextLoc: n
                }, "next" === this.method && (this.arg = c), v
            }
        }, a
    }

    function Mt(e) {
        return (Mt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function c(e, t, n, r, o, i, a) {
        try {
            var s = e[i](a),
                c = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(r, o)
    }

    function o(s) {
        return function() {
            var e = this,
                a = arguments;
            return new Promise(function(t, n) {
                var r = s.apply(e, a);

                function o(e) {
                    c(r, t, n, o, i, "next", e)
                }

                function i(e) {
                    c(r, t, n, o, i, "throw", e)
                }
                o(void 0)
            })
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, u(r.key), r)
        }
    }

    function i(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), e
    }

    function s(e, t, n) {
        (t = u(t)) in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n
    }

    function D(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != n) {
                var r, o, i, a, s = [],
                    c = !0,
                    l = !1;
                try {
                    if (i = (n = n.call(e)).next, 0 === t) {
                        if (Object(n) !== n) return;
                        c = !1
                    } else
                        for (; !(c = (r = i.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
                } catch (e) {
                    l = !0, o = e
                } finally {
                    try {
                        if (!c && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (l) throw o
                    }
                }
                return s
            }
        }(e, t) || n(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function P(e) {
        return function(e) {
            if (Array.isArray(e)) return l(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || n(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function n(e, t) {
        var n;
        if (e) return "string" == typeof e ? l(e, t) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
    }

    function l(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function u(e) {
        e = function(e, t) {
            if ("object" != typeof e || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return ("string" === t ? String : Number)(e);
            if ("object" != typeof(n = n.call(e, t || "default"))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }(e, "string");
        return "symbol" == typeof e ? e : String(e)
    }(function(e) {
        function i(e, t, n, r) {
            var o, i, a, s, t = t && t.prototype instanceof l ? t : l,
                t = Object.create(t.prototype),
                r = new u(r || []);
            return t._invoke = (o = e, i = n, a = r, s = m, function(e, t) {
                if (s === y) throw new Error("Generator is already running");
                if (s === g) {
                    if ("throw" === e) throw t;
                    return f()
                }
                for (a.method = e, a.arg = t;;) {
                    var n = a.delegate;
                    if (n) {
                        n = function e(t, n) {
                            var r = t.iterator[n.method];
                            if (r === h) {
                                if (n.delegate = null, "throw" === n.method) {
                                    if (t.iterator.return && (n.method = "return", n.arg = h, e(t, n), "throw" === n.method)) return b;
                                    n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method")
                                }
                                return b
                            }
                            r = c(r, t.iterator, n.arg);
                            if ("throw" === r.type) return n.method = "throw", n.arg = r.arg, n.delegate = null, b;
                            r = r.arg;
                            if (!r) return n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, b; {
                                if (!r.done) return r;
                                n[t.resultName] = r.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = h)
                            }
                            n.delegate = null;
                            return b
                        }(n, a);
                        if (n) {
                            if (n === b) continue;
                            return n
                        }
                    }
                    if ("next" === a.method) a.sent = a._sent = a.arg;
                    else if ("throw" === a.method) {
                        if (s === m) throw s = g, a.arg;
                        a.dispatchException(a.arg)
                    } else "return" === a.method && a.abrupt("return", a.arg);
                    s = y;
                    n = c(o, i, a);
                    if ("normal" === n.type) {
                        if (s = a.done ? g : v, n.arg !== b) return {
                            value: n.arg,
                            done: a.done
                        }
                    } else "throw" === n.type && (s = g, a.method = "throw", a.arg = n.arg)
                }
            }), t
        }

        function c(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }

        function l() {}

        function t() {}

        function n() {}

        function r(e) {
            ["next", "throw", "return"].forEach(function(t) {
                e[t] = function(e) {
                    return this._invoke(t, e)
                }
            })
        }

        function a(a) {
            var t;
            this._invoke = function(n, r) {
                function e() {
                    return new Promise(function(e, t) {
                        ! function t(e, n, r, o) {
                            e = c(a[e], a, n);
                            if ("throw" === e.type) o(e.arg);
                            else {
                                var i = e.arg;
                                if ((n = i.value) && "object" == typeof n && E.call(n, "__await")) return Promise.resolve(n.__await).then(function(e) {
                                    t("next", e, r, o)
                                }, function(e) {
                                    t("throw", e, r, o)
                                });
                                Promise.resolve(n).then(function(e) {
                                    i.value = e, r(i)
                                }, o)
                            }
                        }(n, r, e, t)
                    })
                }
                return t = t ? t.then(e, e) : e()
            }
        }

        function o(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function s(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function u(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(o, this), this.reset(!0)
        }

        function d(t) {
            if (t) {
                var n, e = t[I];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) return n = -1, (e = function e() {
                    for (; ++n < t.length;)
                        if (E.call(t, n)) return e.value = t[n], e.done = !1, e;
                    return e.value = h, e.done = !0, e
                }).next = e
            }
            return {
                next: f
            }
        }

        function f() {
            return {
                value: h,
                done: !0
            }
        }
        var p, h, m, v, y, g, b, w, S, E, x, I, T, C, _;
        p = function() {
            return this
        }() || Function("return this")(), S = Object.prototype, E = S.hasOwnProperty, x = "function" == typeof Symbol ? Symbol : {}, I = x.iterator || "@@iterator", T = x.asyncIterator || "@@asyncIterator", C = x.toStringTag || "@@toStringTag", (_ = p.regeneratorRuntime) ? e.exports = _ : ((_ = p.regeneratorRuntime = e.exports).wrap = i, m = "suspendedStart", v = "suspendedYield", y = "executing", g = "completed", b = {}, (x = {})[I] = function() {
            return this
        }, (p = (p = Object.getPrototypeOf) && p(p(d([])))) && p !== S && E.call(p, I) && (x = p), w = n.prototype = l.prototype = Object.create(x), (t.prototype = w.constructor = n).constructor = t, n[C] = t.displayName = "GeneratorFunction", _.isGeneratorFunction = function(e) {
            e = "function" == typeof e && e.constructor;
            return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name))
        }, _.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n, C in e || (e[C] = "GeneratorFunction")), e.prototype = Object.create(w), e
        }, _.awrap = function(e) {
            return {
                __await: e
            }
        }, r(a.prototype), a.prototype[T] = function() {
            return this
        }, _.AsyncIterator = a, _.async = function(e, t, n, r) {
            var o = new a(i(e, t, n, r));
            return _.isGeneratorFunction(t) ? o : o.next().then(function(e) {
                return e.done ? e.value : o.next()
            })
        }, r(w), w[C] = "Generator", w[I] = function() {
            return this
        }, w.toString = function() {
            return "[object Generator]"
        }, _.keys = function(n) {
            var e, r = [];
            for (e in n) r.push(e);
            return r.reverse(),
                function e() {
                    for (; r.length;) {
                        var t = r.pop();
                        if (t in n) return e.value = t, e.done = !1, e
                    }
                    return e.done = !0, e
                }
        }, _.values = d, u.prototype = {
            constructor: u,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = h, this.done = !1, this.delegate = null, this.method = "next", this.arg = h, this.tryEntries.forEach(s), !e)
                    for (var t in this) "t" === t.charAt(0) && E.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = h)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(n) {
                if (this.done) throw n;
                var r = this;

                function e(e, t) {
                    return i.type = "throw", i.arg = n, r.next = e, t && (r.method = "next", r.arg = h), !!t
                }
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var o = this.tryEntries[t],
                        i = o.completion;
                    if ("root" === o.tryLoc) return e("end");
                    if (o.tryLoc <= this.prev) {
                        var a = E.call(o, "catchLoc"),
                            s = E.call(o, "finallyLoc");
                        if (a && s) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                        } else if (a) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0)
                        } else {
                            if (!s) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                    var r = this.tryEntries[n];
                    if (r.tryLoc <= this.prev && E.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                        var o = r;
                        break
                    }
                }
                var i = (o = o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc ? null : o) ? o.completion : {};
                return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, b) : this.complete(i)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), b
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), s(n), b
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                    var n, r, o = this.tryEntries[t];
                    if (o.tryLoc === e) return "throw" === (n = o.completion).type && (r = n.arg, s(o)), r
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: d(e),
                    resultName: t,
                    nextLoc: n
                }, "next" === this.method && (this.arg = h), b
            }
        })
    })({
        exports: {}
    });
    var t = function() {
            return this
        }() || Function("return this")(),
        e = t.regeneratorRuntime && 0 <= Object.getOwnPropertyNames(t).indexOf("regeneratorRuntime"),
        d = e && t.regeneratorRuntime;
    if (t.regeneratorRuntime = void 0, e) t.regeneratorRuntime = d;
    else try {
        delete t.regeneratorRuntime
    } catch (e) {
        t.regeneratorRuntime = void 0
    }
    var f = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};

    function p(t) {
        var n = this.constructor;
        return this.then(function(e) {
            return n.resolve(t()).then(function() {
                return e
            })
        }, function(e) {
            return n.resolve(t()).then(function() {
                return n.reject(e)
            })
        })
    }

    function h(n) {
        return new this(function(o, e) {
            if (!n || void 0 === n.length) return e(new TypeError(typeof n + " " + n + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var i = Array.prototype.slice.call(n);
            if (0 === i.length) return o([]);
            var a = i.length;
            for (var t = 0; t < i.length; t++) ! function t(n, e) {
                if (e && ("object" == typeof e || "function" == typeof e)) {
                    var r = e.then;
                    if ("function" == typeof r) return void r.call(e, function(e) {
                        t(n, e)
                    }, function(e) {
                        i[n] = {
                            status: "rejected",
                            reason: e
                        }, 0 == --a && o(i)
                    })
                }
                i[n] = {
                    status: "fulfilled",
                    value: e
                }, 0 == --a && o(i)
            }(t, i[t])
        })
    }

    function m(e, t) {
        this.name = "AggregateError", this.errors = e, this.message = t || ""
    }

    function v(i) {
        var a = this;
        return new a(function(e, t) {
            if (!i || void 0 === i.length) return t(new TypeError("Promise.any accepts an array"));
            var n = Array.prototype.slice.call(i);
            if (0 === n.length) return t();
            for (var r = [], o = 0; o < n.length; o++) try {
                a.resolve(n[o]).then(e).catch(function(e) {
                    r.push(e), r.length === n.length && t(new m(r, "All promises were rejected"))
                })
            } catch (e) {
                t(e)
            }
        })
    }
    m.prototype = Error.prototype;
    var F = setTimeout;

    function y(e) {
        return Boolean(e && void 0 !== e.length)
    }

    function j() {}

    function g(e) {
        if (!(this instanceof g)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], x(e, this)
    }

    function b(n, r) {
        for (; 3 === n._state;) n = n._value;
        0 === n._state ? n._deferreds.push(r) : (n._handled = !0, g._immediateFn(function() {
            var e, t = 1 === n._state ? r.onFulfilled : r.onRejected;
            if (null === t)(1 === n._state ? w : S)(r.promise, n._value);
            else {
                try {
                    e = t(n._value)
                } catch (e) {
                    return void S(r.promise, e)
                }
                w(r.promise, e)
            }
        }))
    }

    function w(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var n = e.then;
                if (e instanceof g) return t._state = 3, t._value = e, void E(t);
                if ("function" == typeof n) return void x((r = n, o = e, function() {
                    r.apply(o, arguments)
                }), t)
            }
            t._state = 1, t._value = e, E(t)
        } catch (e) {
            S(t, e)
        }
        var r, o
    }

    function S(e, t) {
        e._state = 2, e._value = t, E(e)
    }

    function E(e) {
        2 === e._state && 0 === e._deferreds.length && g._immediateFn(function() {
            e._handled || g._unhandledRejectionFn(e._value)
        });
        for (var t = 0, n = e._deferreds.length; t < n; t++) b(e, e._deferreds[t]);
        e._deferreds = null
    }

    function W(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }

    function x(e, t) {
        var n = !1;
        try {
            e(function(e) {
                n || (n = !0, w(t, e))
            }, function(e) {
                n || (n = !0, S(t, e))
            })
        } catch (e) {
            n || (n = !0, S(t, e))
        }
    }
    g.prototype.catch = function(e) {
        return this.then(null, e)
    }, g.prototype.then = function(e, t) {
        var n = new this.constructor(j);
        return b(this, new W(e, t, n)), n
    }, g.prototype.finally = p, g.all = function(t) {
        return new g(function(o, i) {
            if (!y(t)) return i(new TypeError("Promise.all accepts an array"));
            var a = Array.prototype.slice.call(t);
            if (0 === a.length) return o([]);
            var s = a.length;
            for (var e = 0; e < a.length; e++) ! function t(n, e) {
                try {
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var r = e.then;
                        if ("function" == typeof r) return void r.call(e, function(e) {
                            t(n, e)
                        }, i)
                    }
                    a[n] = e, 0 == --s && o(a)
                } catch (e) {
                    i(e)
                }
            }(e, a[e])
        })
    }, g.any = v, g.allSettled = h, g.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === g ? t : new g(function(e) {
            e(t)
        })
    }, g.reject = function(n) {
        return new g(function(e, t) {
            t(n)
        })
    }, g.race = function(o) {
        return new g(function(e, t) {
            if (!y(o)) return t(new TypeError("Promise.race accepts an array"));
            for (var n = 0, r = o.length; n < r; n++) g.resolve(o[n]).then(e, t)
        })
    }, g._immediateFn = "function" == typeof setImmediate ? function(e) {
        setImmediate(e)
    } : function(e) {
        F(e, 0)
    }, g._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };

    function B(e) {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(e)
    }

    function U() {
        var e = void 0 !== (e = (n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).hardwareOnly) && e,
            t = void 0 !== (t = n.enableWebgl) && t,
            n = void 0 !== (n = n.debug) && n,
            r = (f = window.navigator).cookieEnabled,
            o = f.deviceMemory,
            i = f.doNotTrack,
            a = f.hardwareConcurrency,
            s = f.language,
            c = f.languages,
            l = f.maxTouchPoints,
            u = f.platform,
            d = f.userAgent,
            f = f.vendor,
            p = (v = window.screen).width,
            h = v.height,
            m = v.colorDepth,
            v = v.pixelDepth,
            y = (new Date).getTimezoneOffset(),
            g = Intl.DateTimeFormat().resolvedOptions().timeZone,
            b = "ontouchstart" in window,
            w = window.devicePixelRatio,
            S = G(n),
            E = t ? z(n) : void 0,
            t = t ? V() : void 0,
            e = e ? JSON.stringify({
                canvas: S,
                colorDepth: m,
                deviceMemory: o,
                devicePixelRatio: w,
                hardwareConcurrency: a,
                height: h,
                maxTouchPoints: l,
                pixelDepth: v,
                platform: u,
                touchSupport: b,
                webgl: E,
                webglInfo: t,
                width: p
            }) : JSON.stringify({
                canvas: S,
                colorDepth: m,
                cookieEnabled: r,
                deviceMemory: o,
                devicePixelRatio: w,
                doNotTrack: i,
                hardwareConcurrency: a,
                height: h,
                language: s,
                languages: c,
                maxTouchPoints: l,
                pixelDepth: v,
                platform: u,
                timezone: g,
                timezoneOffset: y,
                touchSupport: b,
                userAgent: d,
                vendor: f,
                webgl: E,
                webglInfo: t,
                width: p
            }),
            S = JSON.stringify(e, null, 4);
        return n && console.log("fingerprint data", S), R(S)
    }

    function G(e) {
        try {
            var t = document.createElement("canvas"),
                n = t.getContext("2d"),
                r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?",
                o = (n.textBaseline = "top", n.font = "14px 'Arial'", n.textBaseline = "alphabetic", n.fillStyle = "#f60", n.fillRect(125, 1, 62, 20), n.fillStyle = "#069", n.fillText(r, 2, 15), n.fillStyle = "rgba(102, 204, 0, 0.7)", n.fillText(r, 4, 17), t.toDataURL());
            return e ? document.body.appendChild(t) : n.clearRect(0, 0, t.width, t.height), R(o)
        } catch (e) {
            return null
        }
    }

    function z(e) {
        try {
            var t = document.createElement("canvas"),
                n = t.getContext("webgl"),
                r = (t.width = 256, t.height = 128, n.createBuffer()),
                o = (n.bindBuffer(n.ARRAY_BUFFER, r), new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0])),
                i = (n.bufferData(n.ARRAY_BUFFER, o, n.STATIC_DRAW), r.itemSize = 3, r.numItems = 3, n.createProgram()),
                a = n.createShader(n.VERTEX_SHADER),
                s = (n.shaderSource(a, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), n.compileShader(a), n.createShader(n.FRAGMENT_SHADER)),
                c = (n.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), n.compileShader(s), n.attachShader(i, a), n.attachShader(i, s), n.linkProgram(i), n.useProgram(i), i.vertexPosAttrib = n.getAttribLocation(i, "attrVertex"), i.offsetUniform = n.getUniformLocation(i, "uniformOffset"), n.enableVertexAttribArray(i.vertexPosArray), n.vertexAttribPointer(i.vertexPosAttrib, r.itemSize, n.FLOAT, !1, 0, 0), n.uniform2f(i.offsetUniform, 1, 1), n.drawArrays(n.TRIANGLE_STRIP, 0, r.numItems), new Uint8Array(t.width * t.height * 4)),
                l = (n.readPixels(0, 0, t.width, t.height, n.RGBA, n.UNSIGNED_BYTE, c), JSON.stringify(c).replace(/,?"[0-9]+":/g, ""));
            return e ? document.body.appendChild(t) : n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT | n.STENCIL_BUFFER_BIT), R(l)
        } catch (e) {
            return null
        }
    }

    function V() {
        try {
            var e = document.createElement("canvas").getContext("webgl");
            return {
                VERSION: e.getParameter(e.VERSION),
                SHADING_LANGUAGE_VERSION: e.getParameter(e.SHADING_LANGUAGE_VERSION),
                VENDOR: e.getParameter(e.VENDOR),
                SUPORTED_EXTENSIONS: e.getSupportedExtensions()
            }
        } catch (e) {
            return null
        }
    }

    function I(e) {
        return sessionStorage.getItem(e)
    }

    function T(e) {
        sessionStorage.setItem(e, (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : void 0) || Q())
    }
    var e = function() {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if (void 0 !== f) return f;
            throw new Error("unable to locate global object")
        }(),
        H = ("function" != typeof e.Promise ? e.Promise = g : (e.Promise.prototype.finally || (e.Promise.prototype.finally = p), e.Promise.allSettled || (e.Promise.allSettled = h), e.Promise.any || (e.Promise.any = v)), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(e) {
                if (null == this) throw TypeError('"this" is null or not defined');
                var t = Object(this),
                    n = t.length >>> 0;
                if ("function" != typeof e) throw TypeError("predicate must be a function");
                for (var r = arguments[1], o = 0; o < n;) {
                    var i = t[o];
                    if (e.call(r, i, o, t)) return i;
                    o++
                }
            },
            configurable: !0,
            writable: !0
        }), String.prototype.includes || (String.prototype.includes = function(e, t) {
            if (e instanceof RegExp) throw TypeError("first argument must not be a RegExp");
            return -1 !== this.indexOf(e, t = void 0 === t ? 0 : t)
        }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
            value: function(e, t) {
                if (null == this) throw new TypeError('"this" is null or not defined');
                var n = Object(this),
                    r = n.length >>> 0;
                if (0 != r)
                    for (var o, i, t = 0 | t, a = Math.max(0 <= t ? t : r - Math.abs(t), 0); a < r;) {
                        if ((o = n[a]) === (i = e) || "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i)) return !0;
                        a++
                    }
                return !1
            },
            configurable: !0,
            writable: !0
        }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function(e, t) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), r = 1; r < arguments.length; r++) {
                    var o = arguments[r];
                    if (null != o)
                        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
                }
                return n
            },
            writable: !0,
            configurable: !0
        }), "ccai_hash"),
        C = "cc_page_id",
        _ = "cc_visit_id",
        Y = "cc_fp_id",
        q = ["gclid", "msclkid", "fbclid"],
        X = "cc_recording_time_elapsed",
        d = i(function e() {
            var t, i = this,
                n = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).empty;
            a(this, e), this.scriptResolvedTime = 0, this.times = {}, this.styles = ["display: block", "font-size: ".concat(11, "px"), "font-weight: bold", "background: url('https://www.clickcease.com/assets/img/cc-logo.png') no-repeat", "background-size: auto ".concat(22, "px"), "padding: ".concat(2.75, "px ").concat(5.5, "px ").concat(2.75, "px ").concat(71.5, "px")].join(";");
            for (t in console) ! function(o) {
                console.hasOwnProperty(o) && (i[o] = n ? function() {} : function() {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    return (e = console)[o].apply(e, ["%c |", i.styles].concat(n))
                })
            }(t);
            this.time = function(e) {
                i.times[e] = {
                    start: performance.now()
                }
            }, this.timeEnd = function(e) {
                var t;
                i.times[e] && (t = performance.now() - i.times[e].start, delete i.times[e], i.log.apply(i, [e].concat(P((e = t + i.scriptResolvedTime, [parseInt(e), "ms"])))))
            }
        }),
        t = window.ccConsole = new d,
        M = /ccdebug/i.test(window.location) ? t : new d({
            empty: !0
        }),
        Q = function() {
            for (var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], t = "", n = 0; n < 36; n++) t += 8 === n || 13 === n || 18 === n || 23 === n ? "-" : e[Math.floor(Math.random() * e.length)];
            return t
        },
        K = Date.now(),
        R = function(e) {
            for (var t, n, r = 3 & e.length, o = e.length - r, i = 3432918353, a = 461845907, s = 0; s < o; s++) l = 255 & e.charCodeAt(s) | (255 & e.charCodeAt(++s)) << 8 | (255 & e.charCodeAt(++s)) << 16 | (255 & e.charCodeAt(++s)) << 24, ++s, t = 27492 + (65535 & (n = 5 * (65535 & (t = (t ^= l = (65535 & (l = (l = (65535 & l) * i + (((l >>> 16) * i & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295) << 13 | t >>> 19)) + ((5 * (t >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (n >>> 16) & 65535) << 16);
            var c = o - 1,
                l = 0;
            switch (r) {
                case 3:
                    l ^= (255 & e.charCodeAt(2 + c)) << 16;
                    break;
                case 2:
                    l ^= (255 & e.charCodeAt(1 + c)) << 8;
                    break;
                case 1:
                    l ^= 255 & e.charCodeAt(c)
            }
            return t = 2246822507 * (65535 & (t = (t = t ^ (l = (65535 & (l = (l = (65535 & l) * i + (((l >>> 16) * i & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295) ^ e.length) ^ t >>> 16)) + ((2246822507 * (t >>> 16) & 65535) << 16) & 4294967295, t = 3266489909 * (65535 & (t ^= t >>> 13)) + ((3266489909 * (t >>> 16) & 65535) << 16) & 4294967295, (t ^= t >>> 16) >>> 0
        };
    window.getBrowserFingerprint = U;

    function J(e) {
        return e.href.split(/(&|\?)?utm_content/)[0]
    }

    function $() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.location,
            t = function() {
                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.location).hostname.replace("www.", "")
            }(e);
        return (t = Z[t]) ? t(e) : e.href
    }
    var N = I(Y) || void 0,
        Z = {
            "discounttire.com": J,
            "americastire.com": J
        },
        O = {
            BROWSER_NOT_SUPPORTED: 0,
            BROWSER_COOCKIES_DISABLED: 1
        },
        A = new(function() {
            function e() {
                a(this, e), this.events = [], this.fingerprint = 0
            }
            var t, n, r;
            return i(e, [{
                key: "ccai",
                get: function() {
                    return sessionStorage.getItem(H)
                },
                set: function(e) {
                    return sessionStorage.setItem(H, e)
                }
            }, {
                key: "genStatsV2Body",
                value: (r = o(k().mark(function e() {
                    var i, a = arguments;
                    return k().wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return i = (0 < a.length && void 0 !== a[0] ? a[0] : {}).fp, o = r = n = t = void 0, N || (t = U(), n = (t = t.toString().padStart(9, "0")).substring(0, 3), r = t.substring(3, 6), (o = t.substring(6)).length < 3 && (o += "00"), N = 32 < (t = "c".concat(n, "ab18a").concat(r, "42eca").concat(o, "5fd21dec0538")).length ? t.substring(0, 32) : t, T(Y, N)), i = N || i || Q(), e.abrupt("return", {
                                    referrer: decodeURI(document.referrer),
                                    Fp: i,
                                    href: $(window.location),
                                    ccai: this.ccai
                                });
                            case 3:
                            case "end":
                                return e.stop()
                        }
                        var t, n, r, o
                    }, e, this)
                })), function() {
                    return r.apply(this, arguments)
                })
            }, {
                key: "getStatsV2",
                value: (n = o(k().mark(function e() {
                    var r;
                    return k().wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, this.genStatsV2Body();
                            case 2:
                                return r = e.sent, e.abrupt("return", new Promise(function(e, t) {
                                    var n = new XMLHttpRequest;
                                    n.open("POST", "https://monitor.clickcease.com/monitor/api/statsV2?type=object", !0), n.onreadystatechange = function() {
                                        4 === n.readyState && (e(n.response), M.timeEnd("start -> clientAuth[RES]"))
                                    }, n.send(JSON.stringify(r)), M.timeEnd("start -> clientAuth[REQ]")
                                }));
                            case 4:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                })), function() {
                    return n.apply(this, arguments)
                })
            }, {
                key: "stop",
                value: (t = o(k().mark(function e() {
                    var n = arguments;
                    return k().wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                var t = 0 < n.length && void 0 !== n[0] ? n[0] : 0;
                                t = Object.keys(O)[t], M.log("Engine stop reason : ".concat(t)), this.getStatsV2();
                            case 3:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                })), function() {
                    return t.apply(this, arguments)
                })
            }]), e
        }()),
        ee = function(Ee) {
            var N, xe = function() {
                return (xe = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }).apply(this, arguments)
            };

            function Ie(e) {
                var t = "function" == typeof Symbol && Symbol.iterator,
                    n = t && e[t],
                    r = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return {
                            value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                            done: !e
                        }
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }

            function Te(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r, o, i = n.call(e),
                    a = [];
                try {
                    for (;
                        (void 0 === t || 0 < t--) && !(r = i.next()).done;) a.push(r.value)
                } catch (e) {
                    o = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = i.return) && n.call(i)
                    } finally {
                        if (o) throw o.error
                    }
                }
                return a
            }

            function Ce() {
                for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(Te(arguments[t]));
                return e
            }

            function L(e) {
                return e.nodeType === e.ELEMENT_NODE
            }

            function R(e) {
                var t = null == (t = e) ? void 0 : t.host;
                return Boolean(t && t.shadowRoot && t.shadowRoot === e)
            }

            function Ae(e) {
                var t = e.maskInputOptions,
                    n = e.tagName,
                    r = e.type,
                    o = e.value,
                    e = e.maskInputFn,
                    o = o || "";
                return o = t[n.toLowerCase()] || t[r] ? e ? e(o) : "*".repeat(o.length) : o
            }(t = N = N || {})[t.Document = 0] = "Document", t[t.DocumentType = 1] = "DocumentType", t[t.Element = 2] = "Element", t[t.Text = 3] = "Text", t[t.CDATA = 4] = "CDATA", t[t.Comment = 5] = "Comment";
            var O, D, P = "__rrweb_original__",
                F = 1,
                j = new RegExp("[^a-z0-9-_:]");

            function V(e) {
                try {
                    var t = e.rules || e.cssRules;
                    return t ? Array.from(t).map(f).join("") : null
                } catch (e) {
                    return null
                }
            }

            function f(e) {
                var t = e.cssText;
                if ("styleSheet" in e) try {
                    t = V(e.styleSheet) || t
                } catch (e) {}
                return t
            }
            var p = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
                h = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
                m = /^(data:)([^,]*),(.*)/i;

            function H(e, u) {
                return (e || "").replace(p, function(e, t, n, r, o, i) {
                    n = n || o || i, o = t || r || "";
                    if (!n) return e;
                    if (!h.test(n)) return "url(" + o + n + o + ")";
                    if (m.test(n)) return "url(" + o + n + o + ")";
                    if ("/" === n[0]) return "url(" + o + ((-1 < (i = u).indexOf("//") ? i.split("/").slice(0, 3).join("/") : i.split("/")[0]).split("?")[0] + n) + o + ")";
                    var a = u.split("/"),
                        t = n.split("/");
                    a.pop();
                    for (var s = 0, c = t; s < c.length; s++) {
                        var l = c[s];
                        "." !== l && (".." === l ? a.pop() : a.push(l))
                    }
                    return "url(" + o + a.join("/") + o + ")"
                })
            }
            var v = /^[^ \t\n\r\u000c]+/,
                y = /^[, \t\n\r\u000c]+/;

            function g(e, t) {
                return t && "" !== t.trim() ? ((e = e.createElement("a")).href = t, e.href) : t
            }

            function Y() {
                var e = document.createElement("a");
                return e.href = "", e.href
            }

            function q(e, t, n, r) {
                {
                    if ("src" === n || "href" === n && r || "xlink:href" === n && r && "#" !== r[0] || "background" === n && r && ("table" === t || "td" === t || "th" === t)) return g(e, r);
                    if ("srcset" === n && r) {
                        var o = e,
                            i = r;
                        if ("" === i.trim()) return i;
                        var a = 0;

                        function s(e) {
                            var e = e.exec(i.substring(a));
                            return e ? (e = e[0], a += e.length, e) : ""
                        }
                        for (var c = []; s(y), !(a >= i.length);)
                            if ("," === (u = s(v)).slice(-1)) u = g(o, u.substring(0, u.length - 1)), c.push(u);
                            else
                                for (var l = "", u = g(o, u), d = !1;;) {
                                    var f = i.charAt(a);
                                    if ("" === f) {
                                        c.push((u + l).trim());
                                        break
                                    }
                                    if (d) ")" === f && (d = !1);
                                    else {
                                        if ("," === f) {
                                            a += 1, c.push((u + l).trim());
                                            break
                                        }
                                        "(" === f && (d = !0)
                                    }
                                    l += f, a += 1
                                }
                        return c.join(", ")
                    }
                    return "style" === n && r ? H(r, Y()) : "object" === t && "data" === n && r ? g(e, r) : r
                }
            }

            function X(e, t, n) {
                if (!e) return !1;
                if (e.nodeType !== e.ELEMENT_NODE) return e.nodeType, e.TEXT_NODE, X(e.parentNode, t, n);
                if ("string" == typeof t) {
                    if (e.classList.contains(t)) return !0
                } else e.classList.forEach(function(e) {
                    if (t.test(e)) return !0
                });
                return !(!n || !e.matches(n)) || X(e.parentNode, t, n)
            }

            function A(e) {
                return void 0 === e ? "" : e.toLowerCase()
            }

            function W(t, e) {
                var n = e.doc,
                    r = e.map,
                    o = e.blockClass,
                    i = e.blockSelector,
                    a = e.maskTextClass,
                    s = e.maskTextSelector,
                    c = e.skipChild,
                    c = void 0 !== c && c,
                    l = e.inlineStylesheet,
                    u = void 0 === l || l,
                    l = e.maskInputOptions,
                    d = void 0 === l ? {} : l,
                    f = e.maskTextFn,
                    p = e.maskInputFn,
                    h = e.slimDOMOptions,
                    l = e.dataURLOptions,
                    m = void 0 === l ? {} : l,
                    l = e.inlineImages,
                    v = void 0 !== l && l,
                    l = e.recordCanvas,
                    y = void 0 !== l && l,
                    g = e.onSerialize,
                    b = e.onIframeLoad,
                    l = e.iframeLoadTimeout,
                    w = void 0 === l ? 5e3 : l,
                    l = e.keepIframeSrcFn,
                    S = void 0 === l ? function() {
                        return !1
                    } : l,
                    l = e.preserveWhiteSpace,
                    E = void 0 === l || l,
                    e = function(t, e) {
                        var n, r, o, i = e.doc,
                            a = e.blockClass,
                            s = e.blockSelector,
                            c = e.maskTextClass,
                            l = e.maskTextSelector,
                            u = e.inlineStylesheet,
                            d = e.maskInputOptions,
                            f = void 0 === d ? {} : d,
                            p = e.maskTextFn,
                            h = e.maskInputFn,
                            m = void 0 === (d = e.dataURLOptions) ? {} : d,
                            v = e.inlineImages,
                            y = e.recordCanvas,
                            g = e.keepIframeSrcFn;
                        switch (i.__sn && (o = 1 === (d = i.__sn.id) ? void 0 : d), t.nodeType) {
                            case t.DOCUMENT_NODE:
                                return "CSS1Compat" !== t.compatMode ? {
                                    type: N.Document,
                                    childNodes: [],
                                    compatMode: t.compatMode,
                                    rootId: o
                                } : {
                                    type: N.Document,
                                    childNodes: [],
                                    rootId: o
                                };
                            case t.DOCUMENT_TYPE_NODE:
                                return {
                                    type: N.DocumentType,
                                    name: t.name,
                                    publicId: t.publicId,
                                    systemId: t.systemId,
                                    rootId: o
                                };
                            case t.ELEMENT_NODE:
                                for (var b, w, S = function(e, t, n) {
                                        if ("string" == typeof t) {
                                            if (e.classList.contains(t)) return !0
                                        } else
                                            for (var r = 0; r < e.classList.length; r++) {
                                                var o = e.classList[r];
                                                if (t.test(o)) return !0
                                            }
                                        return !!n && e.matches(n)
                                    }(t, a, s), E = (R = t) instanceof HTMLFormElement ? "form" : (R = R.tagName.toLowerCase().trim(), j.test(R) ? "div" : R), x = {}, I = 0, T = Array.from(t.attributes); I < T.length; I++) {
                                    var C = T[I],
                                        _ = C.name,
                                        k = C.value;
                                    x[_] = q(i, E, _, k)
                                }
                                return "link" === E && u && (M = null, M = (R = Array.from(i.styleSheets).find(function(e) {
                                    return e.href === t.href
                                })) ? V(R) : M) && (delete x.rel, delete x.href, x._cssText = H(M, R.href)), "style" === E && t.sheet && !(t.innerText || t.textContent || "").trim().length && (M = V(t.sheet)) && (x._cssText = H(M, Y())), "input" !== E && "textarea" !== E && "select" !== E || (k = t.value, "radio" !== x.type && "checkbox" !== x.type && "submit" !== x.type && "button" !== x.type && k ? x.value = Ae({
                                    type: x.type,
                                    tagName: E,
                                    value: k,
                                    maskInputOptions: f,
                                    maskInputFn: h
                                }) : t.checked && (x.checked = t.checked)), "option" === E && (t.selected && !f.select ? x.selected = !0 : delete x.selected), "canvas" === E && y && ("2d" === t.__context ? function(e) {
                                    var t = e.getContext("2d");
                                    if (t)
                                        for (var n = 0; n < e.width; n += 50)
                                            for (var r = 0; r < e.height; r += 50) {
                                                var o = t.getImageData,
                                                    o = P in o ? o.__rrweb_original__ : o;
                                                if (new Uint32Array(o.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some(function(e) {
                                                        return 0 !== e
                                                    })) return
                                            }
                                    return 1
                                }(t) || (x.rr_dataURL = t.toDataURL(m.type, m.quality)) : "__context" in t || (R = t.toDataURL(m.type, m.quality), (M = document.createElement("canvas")).width = t.width, M.height = t.height, R !== M.toDataURL(m.type, m.quality) && (x.rr_dataURL = R))), "img" === E && v && (O || (O = i.createElement("canvas"), D = O.getContext("2d")), w = (b = t).crossOrigin, b.crossOrigin = "anonymous", M = function() {
                                    try {
                                        O.width = b.naturalWidth, O.height = b.naturalHeight, D.drawImage(b, 0, 0), x.rr_dataURL = O.toDataURL(m.type, m.quality)
                                    } catch (e) {
                                        console.warn("Cannot inline img src=" + b.currentSrc + "! Error: " + e)
                                    }
                                    w ? x.crossOrigin = w : delete x.crossOrigin
                                }, b.complete && 0 !== b.naturalWidth ? M() : b.onload = M), "audio" !== E && "video" !== E || (x.rr_mediaState = t.paused ? "paused" : "played", x.rr_mediaCurrentTime = t.currentTime), t.scrollLeft && (x.rr_scrollLeft = t.scrollLeft), t.scrollTop && (x.rr_scrollTop = t.scrollTop), S && (M = (R = t.getBoundingClientRect()).width, R = R.height, x = {
                                    class: x.class,
                                    rr_width: M + "px",
                                    rr_height: R + "px"
                                }), "iframe" !== E || g(x.src) || (t.contentDocument || (x.rr_src = x.src), delete x.src), {
                                    type: N.Element,
                                    tagName: E,
                                    attributes: x,
                                    childNodes: [],
                                    isSVG: Boolean("svg" === t.tagName || t.ownerSVGElement) || void 0,
                                    needBlock: S,
                                    rootId: o
                                };
                            case t.TEXT_NODE:
                                var M = t.parentNode && t.parentNode.tagName,
                                    R = t.textContent,
                                    S = "STYLE" === M || void 0,
                                    M = "SCRIPT" === M || void 0;
                                if (S && R) {
                                    try {
                                        null != (n = t.parentNode.sheet) && n.cssRules && (R = (r = t.parentNode.sheet).cssRules ? Array.from(r.cssRules).map(function(e) {
                                            return e.cssText || ""
                                        }).join("") : "")
                                    } catch (e) {
                                        console.warn("Cannot get CSS styles from text's parentNode. Error: " + e, t)
                                    }
                                    R = H(R, Y())
                                }
                                return M && (R = "SCRIPT_PLACEHOLDER"), S || M || !X(t, c, l) || (R = R && (p ? p(R) : R.replace(/[\S]/g, "*"))), {
                                    type: N.Text,
                                    textContent: R || "",
                                    isStyle: S,
                                    rootId: o
                                };
                            case t.CDATA_SECTION_NODE:
                                return {
                                    type: N.CDATA,
                                    textContent: "",
                                    rootId: o
                                };
                            case t.COMMENT_NODE:
                                return {
                                    type: N.Comment,
                                    textContent: t.textContent || "",
                                    rootId: o
                                };
                            default:
                                return !1
                        }
                    }(t, {
                        doc: n,
                        blockClass: o,
                        blockSelector: i,
                        maskTextClass: a,
                        maskTextSelector: s,
                        inlineStylesheet: u,
                        maskInputOptions: d,
                        maskTextFn: f,
                        maskInputFn: p,
                        dataURLOptions: m,
                        inlineImages: v,
                        recordCanvas: y,
                        keepIframeSrcFn: S
                    });
                if (!e) return console.warn(t, "not serialized"), null;
                var l = "__sn" in t ? t.__sn.id : ! function(e, t) {
                        if (t.comment && e.type === N.Comment) return 1;
                        if (e.type === N.Element) {
                            if (t.script && ("script" === e.tagName || "link" === e.tagName && "preload" === e.attributes.rel && "script" === e.attributes.as || "link" === e.tagName && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && e.attributes.href.endsWith(".js"))) return 1;
                            if (t.headFavicon && ("link" === e.tagName && "shortcut icon" === e.attributes.rel || "meta" === e.tagName && (A(e.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === A(e.attributes.name) || "icon" === A(e.attributes.rel) || "apple-touch-icon" === A(e.attributes.rel) || "shortcut icon" === A(e.attributes.rel)))) return 1;
                            if ("meta" === e.tagName) {
                                if (t.headMetaDescKeywords && A(e.attributes.name).match(/^description|keywords$/)) return 1;
                                if (t.headMetaSocial && (A(e.attributes.property).match(/^(og|twitter|fb):/) || A(e.attributes.name).match(/^(og|twitter):/) || "pinterest" === A(e.attributes.name))) return 1;
                                if (t.headMetaRobots && ("robots" === A(e.attributes.name) || "googlebot" === A(e.attributes.name) || "bingbot" === A(e.attributes.name))) return 1;
                                if (t.headMetaHttpEquiv && void 0 !== e.attributes["http-equiv"]) return 1;
                                if (t.headMetaAuthorship && ("author" === A(e.attributes.name) || "generator" === A(e.attributes.name) || "framework" === A(e.attributes.name) || "publisher" === A(e.attributes.name) || "progid" === A(e.attributes.name) || A(e.attributes.property).match(/^article:/) || A(e.attributes.property).match(/^product:/))) return 1;
                                if (t.headMetaVerification && ("google-site-verification" === A(e.attributes.name) || "yandex-verification" === A(e.attributes.name) || "csrf-token" === A(e.attributes.name) || "p:domain_verify" === A(e.attributes.name) || "verify-v1" === A(e.attributes.name) || "verification" === A(e.attributes.name) || "shopify-checkout-api-token" === A(e.attributes.name))) return 1
                            }
                        }
                    }(e, h) && (E || e.type !== N.Text || e.isStyle || e.textContent.replace(/^\s+|\s+$/gm, "").length) ? F++ : -2,
                    x = Object.assign(e, {
                        id: l
                    });
                if (t.__sn = x, -2 === l) return null;
                r[l] = t, g && g(t);
                l = !c;
                if (x.type === N.Element && (l = l && !x.needBlock, delete x.needBlock), (x.type === N.Document || x.type === N.Element) && l) {
                    h.headWhitespace && e.type === N.Element && "head" === e.tagName && (E = !1);
                    for (var I = {
                            doc: n,
                            map: r,
                            blockClass: o,
                            blockSelector: i,
                            maskTextClass: a,
                            maskTextSelector: s,
                            skipChild: c,
                            inlineStylesheet: u,
                            maskInputOptions: d,
                            maskTextFn: f,
                            maskInputFn: p,
                            slimDOMOptions: h,
                            dataURLOptions: m,
                            inlineImages: v,
                            recordCanvas: y,
                            preserveWhiteSpace: E,
                            onSerialize: g,
                            onIframeLoad: b,
                            iframeLoadTimeout: w,
                            keepIframeSrcFn: S
                        }, T = 0, C = Array.from(t.childNodes); T < C.length; T++)(_ = W(C[T], I)) && x.childNodes.push(_);
                    if (L(t) && t.shadowRoot) {
                        x.isShadowHost = !0;
                        for (var _, k = 0, M = Array.from(t.shadowRoot.childNodes); k < M.length; k++)(_ = W(M[k], I)) && (_.isShadow = !0, x.childNodes.push(_))
                    }
                }
                return t.parentNode && R(t.parentNode) && (x.isShadow = !0), x.type === N.Element && "iframe" === x.tagName && function(e, t, n) {
                    var r = e.contentWindow;
                    if (r) {
                        var o, i, a = !1;
                        try {
                            o = r.document.readyState
                        } catch (e) {
                            return
                        }
                        "complete" === o ? r.location.href === (o = "about:blank") && e.src !== o && "" !== e.src ? e.addEventListener("load", t) : setTimeout(t, 0) : (i = setTimeout(function() {
                            a || (t(), a = !0)
                        }, n), e.addEventListener("load", function() {
                            clearTimeout(i), a = !0, t()
                        }))
                    }
                }(t, function() {
                    var e = t.contentDocument;
                    e && b && (e = W(e, {
                        doc: e,
                        map: r,
                        blockClass: o,
                        blockSelector: i,
                        maskTextClass: a,
                        maskTextSelector: s,
                        skipChild: !1,
                        inlineStylesheet: u,
                        maskInputOptions: d,
                        maskTextFn: f,
                        maskInputFn: p,
                        slimDOMOptions: h,
                        dataURLOptions: m,
                        inlineImages: v,
                        recordCanvas: y,
                        preserveWhiteSpace: E,
                        onSerialize: g,
                        onIframeLoad: b,
                        iframeLoadTimeout: w,
                        keepIframeSrcFn: S
                    })) && b(t, e)
                }, w), x
            }
            var T = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

            function b(r, n) {
                void 0 === n && (n = {});
                var o = 1,
                    i = 1;

                function a(e) {
                    var t = e.match(/\n/g),
                        t = (t && (o += t.length), e.lastIndexOf("\n"));
                    i = -1 === t ? i + e.length : e.length - t
                }

                function s() {
                    var t = {
                        line: o,
                        column: i
                    };
                    return function(e) {
                        return e.position = new c(t), m(), e
                    }
                }
                var c = function(e) {
                        this.start = e, this.end = {
                            line: o,
                            column: i
                        }, this.source = n.source
                    },
                    l = (c.prototype.content = r, []);

                function u(e) {
                    var t = new Error(n.source + ":" + o + ":" + i + ": " + e);
                    if (t.reason = e, t.filename = n.source, t.line = o, t.column = i, t.source = r, !n.silent) throw t;
                    l.push(t)
                }

                function d() {
                    return h(/^{\s*/)
                }

                function f() {
                    return h(/^}/)
                }

                function p() {
                    var e, t, n = [];
                    for (m(), v(n); r.length && "}" !== r.charAt(0) && (e = function() {
                            if ("@" === r[0]) return function() {
                                var e = s(),
                                    t = h(/^@([-\w]+)?keyframes\s*/);
                                if (t) {
                                    var n = t[1];
                                    if (!(t = h(/^([-\w]+)\s*/))) return u("@keyframes missing name");
                                    var r, t = t[1];
                                    if (!d()) return u("@keyframes missing '{'");
                                    for (var o = v(); r = function() {
                                            for (var e, t = [], n = s(); e = h(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), h(/^,\s*/);
                                            if (t.length) return n({
                                                type: "keyframe",
                                                values: t,
                                                declarations: w()
                                            })
                                        }();) o.push(r), o = o.concat(v());
                                    return f() ? e({
                                        type: "keyframes",
                                        name: t,
                                        vendor: n,
                                        keyframes: o
                                    }) : u("@keyframes missing '}'")
                                }
                            }() || function() {
                                var e, t = s(),
                                    n = h(/^@media *([^{]+)/);
                                if (n) return n = I(n[1]), d() ? (e = v().concat(p()), f() ? t({
                                    type: "media",
                                    media: n,
                                    rules: e
                                }) : u("@media missing '}'")) : u("@media missing '{'")
                            }() || function() {
                                var e = s(),
                                    t = h(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                                if (t) return e({
                                    type: "custom-media",
                                    name: I(t[1]),
                                    media: I(t[2])
                                })
                            }() || function() {
                                var e, t = s(),
                                    n = h(/^@supports *([^{]+)/);
                                if (n) return n = I(n[1]), d() ? (e = v().concat(p()), f() ? t({
                                    type: "supports",
                                    supports: n,
                                    rules: e
                                }) : u("@supports missing '}'")) : u("@supports missing '{'")
                            }() || S() || E() || x() || function() {
                                var e, t, n = s(),
                                    r = h(/^@([-\w]+)?document *([^{]+)/);
                                if (r) return e = I(r[1]), r = I(r[2]), d() ? (t = v().concat(p()), f() ? n({
                                    type: "document",
                                    document: r,
                                    vendor: e,
                                    rules: t
                                }) : u("@document missing '}'")) : u("@document missing '{'")
                            }() || function() {
                                var e = s();
                                if (h(/^@page */)) {
                                    var t = g() || [];
                                    if (!d()) return u("@page missing '{'");
                                    for (var n, r = v(); n = b();) r.push(n), r = r.concat(v());
                                    return f() ? e({
                                        type: "page",
                                        selectors: t,
                                        declarations: r
                                    }) : u("@page missing '}'")
                                }
                            }() || function() {
                                var e, t = s();
                                if (h(/^@host\s*/)) return d() ? (e = v().concat(p()), f() ? t({
                                    type: "host",
                                    rules: e
                                }) : u("@host missing '}'")) : u("@host missing '{'")
                            }() || function() {
                                var e = s();
                                if (h(/^@font-face\s*/)) {
                                    if (!d()) return u("@font-face missing '{'");
                                    for (var t, n = v(); t = b();) n.push(t), n = n.concat(v());
                                    return f() ? e({
                                        type: "font-face",
                                        declarations: n
                                    }) : u("@font-face missing '}'")
                                }
                            }()
                        }() || (t = e = void 0, e = s(), (t = g()) ? (v(), e({
                            type: "rule",
                            selectors: t,
                            declarations: w()
                        })) : u("selector missing")));) !1 !== e && (n.push(e), v(n));
                    return n
                }

                function h(e) {
                    var t, e = e.exec(r);
                    if (e) return a(t = e[0]), r = r.slice(t.length), e
                }

                function m() {
                    h(/^\s*/)
                }

                function v(e) {
                    var t;
                    for (void 0 === e && (e = []); t = y();) !1 !== t && e.push(t), y();
                    return e
                }

                function y() {
                    var e = s();
                    if ("/" === r.charAt(0) && "*" === r.charAt(1)) {
                        for (var t, n = 2;
                            "" !== r.charAt(n) && ("*" !== r.charAt(n) || "/" !== r.charAt(n + 1));) ++n;
                        return "" === r.charAt((n += 2) - 1) ? u("End of comment missing") : (t = r.slice(2, n - 2), i += 2, a(t), r = r.slice(n), i += 2, e({
                            type: "comment",
                            comment: t
                        }))
                    }
                }

                function g() {
                    var e = h(/^([^{]+)/);
                    if (e) return I(e[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(e) {
                        return e.replace(/,/g, "‌")
                    }).split(/\s*(?![^(]*\)),\s*/).map(function(e) {
                        return e.replace(/\u200C/g, ",")
                    })
                }

                function b() {
                    var e, t = s(),
                        n = h(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
                    if (n) return n = I(n[0]), h(/^:\s*/) ? (e = h(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/), t = t({
                        type: "declaration",
                        property: n.replace(T, ""),
                        value: e ? I(e[0]).replace(T, "") : ""
                    }), h(/^[;\s]*/), t) : u("property missing ':'")
                }

                function w() {
                    var e, t = [];
                    if (!d()) return u("missing '{'");
                    for (v(t); e = b();) !1 !== e && (t.push(e), v(t)), b();
                    return f() ? t : u("missing '}'")
                }
                var e, S = t("import"),
                    E = t("charset"),
                    x = t("namespace");

                function t(r) {
                    var o = new RegExp("^@" + r + "\\s*([^;]+);");
                    return function() {
                        var e, t = s(),
                            n = h(o);
                        if (n) return (e = {
                            type: r
                        })[r] = n[1].trim(), t(e)
                    }
                }
                return function t(e, n) {
                    for (var r = e && "string" == typeof e.type, o = r ? e : n, i = 0, a = Object.keys(e); i < a.length; i++) {
                        var s = e[a[i]];
                        Array.isArray(s) ? s.forEach(function(e) {
                            t(e, o)
                        }) : s && "object" == Mt(s) && t(s, o)
                    }
                    return r && Object.defineProperty(e, "parent", {
                        configurable: !0,
                        writable: !0,
                        enumerable: !1,
                        value: n || null
                    }), e
                }((e = p(), {
                    type: "stylesheet",
                    stylesheet: {
                        source: n.source,
                        rules: e,
                        parsingErrors: l
                    }
                }))
            }

            function I(e) {
                return e ? e.replace(/^\s+|\s+$/g, "") : ""
            }
            var S, w = {
                    script: "noscript",
                    altglyph: "altGlyph",
                    altglyphdef: "altGlyphDef",
                    altglyphitem: "altGlyphItem",
                    animatecolor: "animateColor",
                    animatemotion: "animateMotion",
                    animatetransform: "animateTransform",
                    clippath: "clipPath",
                    feblend: "feBlend",
                    fecolormatrix: "feColorMatrix",
                    fecomponenttransfer: "feComponentTransfer",
                    fecomposite: "feComposite",
                    feconvolvematrix: "feConvolveMatrix",
                    fediffuselighting: "feDiffuseLighting",
                    fedisplacementmap: "feDisplacementMap",
                    fedistantlight: "feDistantLight",
                    fedropshadow: "feDropShadow",
                    feflood: "feFlood",
                    fefunca: "feFuncA",
                    fefuncb: "feFuncB",
                    fefuncg: "feFuncG",
                    fefuncr: "feFuncR",
                    fegaussianblur: "feGaussianBlur",
                    feimage: "feImage",
                    femerge: "feMerge",
                    femergenode: "feMergeNode",
                    femorphology: "feMorphology",
                    feoffset: "feOffset",
                    fepointlight: "fePointLight",
                    fespecularlighting: "feSpecularLighting",
                    fespotlight: "feSpotLight",
                    fetile: "feTile",
                    feturbulence: "feTurbulence",
                    foreignobject: "foreignObject",
                    glyphref: "glyphRef",
                    lineargradient: "linearGradient",
                    radialgradient: "radialGradient"
                },
                C = /([^\\]):hover/,
                _ = new RegExp(C.source, "g");

            function k(e, t) {
                var n, r = null == t ? void 0 : t.stylesWithHoverClass.get(e);
                return r || (!(r = b(e, {
                    silent: !0
                })).stylesheet || (n = [], r.stylesheet.rules.forEach(function(e) {
                    "selectors" in e && (e.selectors || []).forEach(function(e) {
                        C.test(e) && n.push(e)
                    })
                }), 0 === n.length) ? e : (r = new RegExp(n.filter(function(e, t) {
                    return n.indexOf(e) === t
                }).sort(function(e, t) {
                    return t.length - e.length
                }).map(function(e) {
                    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }).join("|"), "g"), r = e.replace(r, function(e) {
                    var t = e.replace(_, "$1.\\:hover");
                    return e + ", " + t
                }), null != t && t.stylesWithHoverClass.set(e, r), r))
            }

            function M() {
                return {
                    stylesWithHoverClass: new Map
                }
            }

            function Q(c, e) {
                var t, n, l = e.doc,
                    u = e.hackCss,
                    d = e.cache;
                switch (c.type) {
                    case N.Document:
                        return l.implementation.createDocument(null, "", null);
                    case N.DocumentType:
                        return l.implementation.createDocumentType(c.name || "html", c.publicId, c.systemId);
                    case N.Element:
                        var r, f = n = "link" === (n = w[(t = c).tagName] || t.tagName) && t.attributes._cssText ? "style" : n,
                            p = c.isSVG ? l.createElementNS("http://www.w3.org/2000/svg", f) : l.createElement(f);
                        for (r in c.attributes) ! function(e) {
                            if (!c.attributes.hasOwnProperty(e)) return;
                            var t, n = c.attributes[e];
                            if ("option" === f && "selected" === e && !1 === n) return;
                            if (n = "boolean" == typeof n || "number" == typeof n ? "" : n, e.startsWith("rr_")) {
                                if ("canvas" === f && "rr_dataURL" === e ? ((t = document.createElement("img")).src = n, t.onload = function() {
                                        var e = p.getContext("2d");
                                        e && e.drawImage(t, 0, 0, t.width, t.height)
                                    }) : "img" !== f || "rr_dataURL" !== e || (r = p).currentSrc.startsWith("data:") || (r.setAttribute("rrweb-original-src", c.attributes.src), r.src = n), "rr_width" === e) p.style.width = n;
                                else if ("rr_height" === e) p.style.height = n;
                                else if ("rr_mediaCurrentTime" === e) p.currentTime = c.attributes.rr_mediaCurrentTime;
                                else if ("rr_mediaState" === e) switch (n) {
                                    case "played":
                                        p.play().catch(function(e) {
                                            return console.warn("media playback error", e)
                                        });
                                        break;
                                    case "paused":
                                        p.pause()
                                }
                            } else {
                                var r = "textarea" === f && "value" === e,
                                    o = "style" === f && "_cssText" === e;
                                if (o && u && (n = k(n, d)), r || o) {
                                    for (var r = l.createTextNode(n), i = 0, a = Array.from(p.childNodes); i < a.length; i++) {
                                        var s = a[i];
                                        s.nodeType === p.TEXT_NODE && p.removeChild(s)
                                    }
                                    return p.appendChild(r)
                                }
                                try {
                                    if (c.isSVG && "xlink:href" === e) p.setAttributeNS("http://www.w3.org/1999/xlink", e, n);
                                    else if ("onload" === e || "onclick" === e || "onmouse" === e.substring(0, 7)) p.setAttribute("_" + e, n);
                                    else {
                                        if ("meta" === f && "Content-Security-Policy" === c.attributes["http-equiv"] && "content" === e) return p.setAttribute("csp-content", n);
                                        "link" === f && "preload" === c.attributes.rel && "script" === c.attributes.as || "link" === f && "prefetch" === c.attributes.rel && "string" == typeof c.attributes.href && c.attributes.href.endsWith(".js") || ("img" === f && c.attributes.srcset && c.attributes.rr_dataURL ? p.setAttribute("rrweb-original-srcset", c.attributes.srcset) : p.setAttribute(e, n))
                                    }
                                } catch (e) {}
                            }
                        }(r);
                        if (c.isShadowHost)
                            if (p.shadowRoot)
                                for (; p.shadowRoot.firstChild;) p.shadowRoot.removeChild(p.shadowRoot.firstChild);
                            else p.attachShadow({
                                mode: "open"
                            });
                        return p;
                    case N.Text:
                        return l.createTextNode(c.isStyle && u ? k(c.textContent, d) : c.textContent);
                    case N.CDATA:
                        return l.createCDATASection(c.textContent);
                    case N.Comment:
                        return l.createComment(c.textContent);
                    default:
                        return null
                }
            }

            function K(e, t) {
                var n = t.doc,
                    r = t.map,
                    o = t.skipChild,
                    o = void 0 !== o && o,
                    i = t.hackCss,
                    a = void 0 === i || i,
                    s = t.afterAppend,
                    c = t.cache,
                    l = Q(e, {
                        doc: n,
                        hackCss: a,
                        cache: c
                    });
                if (!l) return null;
                if (e.rootId && console.assert(r[e.rootId] === n, "Target document should has the same root id."), e.type === N.Document && (n.close(), n.open(), "BackCompat" === e.compatMode && e.childNodes && e.childNodes[0].type !== N.DocumentType && (e.childNodes[0].type === N.Element && "xmlns" in e.childNodes[0].attributes && "http://www.w3.org/1999/xhtml" === e.childNodes[0].attributes.xmlns ? n.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">') : n.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">')), l = n), r[(l.__sn = e).id] = l, (e.type === N.Document || e.type === N.Element) && !o)
                    for (var u = 0, d = e.childNodes; u < d.length; u++) {
                        var f = d[u],
                            p = K(f, {
                                doc: n,
                                map: r,
                                skipChild: !1,
                                hackCss: a,
                                afterAppend: s,
                                cache: c
                            });
                        p ? ((f.isShadow && L(l) && l.shadowRoot ? l.shadowRoot : l).appendChild(p), s && s(p)) : console.warn("Failed to rebuild", f)
                    }
                return l
            }

            function J(e, t) {
                var n, r = t.doc,
                    o = t.onVisit,
                    i = t.hackCss,
                    a = {},
                    e = K(e, {
                        doc: r,
                        map: a,
                        skipChild: !1,
                        hackCss: void 0 === i || i,
                        afterAppend: t.afterAppend,
                        cache: t.cache
                    }),
                    s = a;
                for (n in s)
                    if (s[n]) {
                        n = s[n]; {
                            c = void 0;
                            l = void 0;
                            u = void 0;
                            d = void 0;
                            f = void 0;
                            o && o(n);
                            var c = n,
                                l = c.__sn;
                            if (l.type === N.Element) {
                                var u = c;
                                for (var d in l.attributes)
                                    if (l.attributes.hasOwnProperty(d) && d.startsWith("rr_")) {
                                        var f = l.attributes[d];
                                        "rr_scrollLeft" === d && (u.scrollLeft = f), "rr_scrollTop" === d && (u.scrollTop = f)
                                    }
                            }
                        }
                    }
                return [e, a]
            }

            function _e(e, t, n) {
                void 0 === n && (n = document);
                var r = {
                    capture: !0,
                    passive: !0
                };
                return n.addEventListener(e, t, r),
                    function() {
                        return n.removeEventListener(e, t, r)
                    }
            }
            Ee.EventType = void 0, (t = Ee.EventType || (Ee.EventType = {}))[t.DomContentLoaded = 0] = "DomContentLoaded", t[t.Load = 1] = "Load", t[t.FullSnapshot = 2] = "FullSnapshot", t[t.IncrementalSnapshot = 3] = "IncrementalSnapshot", t[t.Meta = 4] = "Meta", t[t.Custom = 5] = "Custom", t[t.Plugin = 6] = "Plugin", Ee.IncrementalSource = void 0, (t = Ee.IncrementalSource || (Ee.IncrementalSource = {}))[t.Mutation = 0] = "Mutation", t[t.MouseMove = 1] = "MouseMove", t[t.MouseInteraction = 2] = "MouseInteraction", t[t.Scroll = 3] = "Scroll", t[t.ViewportResize = 4] = "ViewportResize", t[t.Input = 5] = "Input", t[t.TouchMove = 6] = "TouchMove", t[t.MediaInteraction = 7] = "MediaInteraction", t[t.StyleSheetRule = 8] = "StyleSheetRule", t[t.CanvasMutation = 9] = "CanvasMutation", t[t.Font = 10] = "Font", t[t.Log = 11] = "Log", t[t.Drag = 12] = "Drag", t[t.StyleDeclaration = 13] = "StyleDeclaration", Ee.MouseInteractions = void 0, (t = Ee.MouseInteractions || (Ee.MouseInteractions = {}))[t.MouseUp = 0] = "MouseUp", t[t.MouseDown = 1] = "MouseDown", t[t.Click = 2] = "Click", t[t.ContextMenu = 3] = "ContextMenu", t[t.DblClick = 4] = "DblClick", t[t.Focus = 5] = "Focus", t[t.Blur = 6] = "Blur", t[t.TouchStart = 7] = "TouchStart", t[t.TouchMove_Departed = 8] = "TouchMove_Departed", t[t.TouchEnd = 9] = "TouchEnd", t[t.TouchCancel = 10] = "TouchCancel", (t = S = S || {})[t["2D"] = 0] = "2D", t[t.WebGL = 1] = "WebGL", t[t.WebGL2 = 2] = "WebGL2", Ee.ReplayerEvents = void 0, (t = Ee.ReplayerEvents || (Ee.ReplayerEvents = {})).Start = "start", t.Pause = "pause", t.Resume = "resume", t.Resize = "resize", t.Finish = "finish", t.FullsnapshotRebuilded = "fullsnapshot-rebuilded", t.LoadStylesheetStart = "load-stylesheet-start", t.LoadStylesheetEnd = "load-stylesheet-end", t.SkipStart = "skip-start", t.SkipEnd = "skip-end", t.MouseInteraction = "mouse-interaction", t.EventCast = "event-cast", t.CustomEvent = "custom-event", t.Flush = "flush", t.StateChange = "state-change", t.PlayBack = "play-back";
            var r = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";

            function ke(i, a, s) {
                void 0 === s && (s = {});
                var c = null,
                    l = 0;
                return function(e) {
                    var t = Date.now(),
                        n = (l || !1 !== s.leading || (l = t), a - (t - l)),
                        r = this,
                        o = arguments;
                    n <= 0 || a < n ? (c && (clearTimeout(c), c = null), l = t, i.apply(r, o)) : c || !1 === s.trailing || (c = setTimeout(function() {
                        l = !1 === s.leading ? 0 : Date.now(), c = null, i.apply(r, o)
                    }, n))
                }
            }

            function Me(e, t, n, r, o) {
                var i = (o = void 0 === o ? window : o).Object.getOwnPropertyDescriptor(e, t);
                return o.Object.defineProperty(e, t, r ? n : {
                        set: function(e) {
                            var t = this;
                            setTimeout(function() {
                                n.set.call(t, e)
                            }, 0), i && i.set && i.set.call(this, e)
                        }
                    }),
                    function() {
                        return Me(e, t, i || {}, !0)
                    }
            }

            function Re(e, t, n) {
                try {
                    var r, o;
                    return t in e ? ("function" == typeof(o = n(r = e[t])) && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
                        __rrweb_original__: {
                            enumerable: !1,
                            value: r
                        }
                    })), e[t] = o, function() {
                        e[t] = r
                    }) : function() {}
                } catch (e) {
                    return function() {}
                }
            }

            function Le() {
                return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
            }

            function De() {
                return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
            }

            function Ne(e, t) {
                if (!e) return !1;
                if (e.nodeType !== e.ELEMENT_NODE) return e.nodeType, e.TEXT_NODE, Ne(e.parentNode, t);
                var n = !1;
                if ("string" == typeof t) {
                    if (void 0 !== e.closest) return null !== e.closest("." + t);
                    n = e.classList.contains(t)
                } else e.classList.forEach(function(e) {
                    t.test(e) && (n = !0)
                });
                return n || Ne(e.parentNode, t)
            }

            function $(e) {
                return "__sn" in e && -2 === e.__sn.id
            }

            function Z(e, t) {
                var n;
                return !R(e) && (n = t.getId(e), !t.has(n) || (!e.parentNode || e.parentNode.nodeType !== e.DOCUMENT_NODE) && (!e.parentNode || Z(e.parentNode, t)))
            }

            function Pe(e) {
                return Boolean(e.changedTouches)
            }

            function ee(e) {
                "NodeList" in (e = void 0 === e ? window : e) && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = function(e) {
                    if (!(0 in arguments)) throw new TypeError("1 argument is required");
                    do {
                        if (this === e) return !0
                    } while (e = e && e.parentNode);
                    return !1
                })
            }
            Ee.mirror = {
                map: {},
                getId: function() {
                    return console.error(r), -1
                },
                getNode: function() {
                    return console.error(r), null
                },
                removeNodeFromMap: function() {
                    console.error(r)
                },
                has: function() {
                    return console.error(r), !1
                },
                reset: function() {
                    console.error(r)
                }
            }, "undefined" != typeof window && window.Proxy && window.Reflect && (Ee.mirror = new Proxy(Ee.mirror, {
                get: function(e, t, n) {
                    return "map" === t && console.error(r), Reflect.get(e, t, n)
                }
            }));
            e.prototype.add = function(e) {
                var t = this.indexes.get(e.parentId),
                    e = {
                        id: e.node.id,
                        mutation: e,
                        children: [],
                        texts: [],
                        attributes: []
                    };
                t ? (e.parent = t).children[e.id] = e : this.tree[e.id] = e, this.indexes.set(e.id, e)
            }, e.prototype.remove = function(n, t) {
                function r(e) {
                    i.removeIdSet.add(e), null != (e = t.getNode(e)) && e.childNodes.forEach(function(e) {
                        "__sn" in e && r(e.__sn.id)
                    })
                }

                function o(e) {
                    var t;
                    i.removeIdSet.add(e.id), Object.values(e.children).forEach(o), (e = i.indexes.get(e.id)) && (t = e.parent) && (delete e.parent, delete t.children[e.id], i.indexes.delete(n.id))
                }
                var i = this,
                    e = this.indexes.get(n.parentId),
                    a = this.indexes.get(n.id);
                a ? (e ? (delete a.parent, delete e.children[a.id], this.indexes.delete(n.id)) : (delete this.tree[a.id], this.indexes.delete(a.id)), o(a)) : (this.removeNodeMutations.push(n), r(n.id))
            }, e.prototype.text = function(e) {
                var t = this.indexes.get(e.id);
                (t ? t.texts : this.textMutations).push(e)
            }, e.prototype.attribute = function(e) {
                var t = this.indexes.get(e.id);
                (t ? t.attributes : this.attributeMutations).push(e)
            }, e.prototype.scroll = function(e) {
                this.scrollMap.set(e.id, e)
            }, e.prototype.input = function(e) {
                this.inputMap.set(e.id, e)
            }, e.prototype.flush = function() {
                function n(e, t) {
                    t && i.removeIdSet.add(e.id), u.texts = u.texts.concat(t ? [] : e.texts).filter(function(e) {
                        return !i.removeIdSet.has(e.id)
                    }), u.attributes = u.attributes.concat(t ? [] : e.attributes).filter(function(e) {
                        return !i.removeIdSet.has(e.id)
                    }), i.removeIdSet.has(e.id) || i.removeIdSet.has(e.mutation.parentId) || t ? Object.values(e.children).forEach(function(e) {
                        return n(e, !0)
                    }) : (u.adds.push(e.mutation), e.children && Object.values(e.children).forEach(function(e) {
                        return n(e, !1)
                    }))
                }
                var t, e, r, o, i = this,
                    a = this.tree,
                    s = this.removeNodeMutations,
                    c = this.textMutations,
                    l = this.attributeMutations,
                    u = {
                        source: Ee.IncrementalSource.Mutation,
                        removes: s,
                        texts: c,
                        attributes: l,
                        adds: []
                    };
                Object.values(a).forEach(function(e) {
                    return n(e, !1)
                });
                try {
                    for (var d = Ie(this.scrollMap.keys()), f = d.next(); !f.done; f = d.next()) {
                        var p = f.value;
                        this.removeIdSet.has(p) && this.scrollMap.delete(p)
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        f && !f.done && (e = d.return) && e.call(d)
                    } finally {
                        if (t) throw t.error
                    }
                }
                try {
                    for (var h = Ie(this.inputMap.keys()), m = h.next(); !m.done; m = h.next()) p = m.value, this.removeIdSet.has(p) && this.inputMap.delete(p)
                } catch (e) {
                    r = {
                        error: e
                    }
                } finally {
                    try {
                        m && !m.done && (o = h.return) && o.call(h)
                    } finally {
                        if (r) throw r.error
                    }
                }
                s = new Map(this.scrollMap), c = new Map(this.inputMap);
                return this.reset(), {
                    mutationData: u,
                    scrollMap: s,
                    inputMap: c
                }
            }, e.prototype.reset = function() {
                this.tree = [], this.indexes = new Map, this.removeNodeMutations = [], this.textMutations = [], this.attributeMutations = [], this.removeIdSet = new Set, this.scrollMap = new Map, this.inputMap = new Map
            }, e.prototype.idRemoved = function(e) {
                return this.removeIdSet.has(e)
            };
            var te = e;

            function e() {
                this.reset()
            }

            function ne(e) {
                function t(e, t) {
                    return t = {
                        value: e,
                        parent: t,
                        children: []
                    }, o[e.node.id] = t
                }
                var n, r, o = {},
                    i = [];
                try {
                    for (var a = Ie(e), s = a.next(); !s.done; s = a.next()) {
                        var c, l, u, d = s.value,
                            f = d.nextId,
                            p = d.parentId;
                        f && f in o ? (c = o[f]).parent ? (l = c.parent.children.indexOf(c), c.parent.children.splice(l, 0, t(d, c.parent))) : (l = i.indexOf(c), i.splice(l, 0, t(d, null))) : p in o ? (u = o[p]).children.push(t(d, u)) : i.push(t(d, null))
                    }
                } catch (e) {
                    n = {
                        error: e
                    }
                } finally {
                    try {
                        s && !s.done && (r = a.return) && r.call(a)
                    } finally {
                        if (n) throw n.error
                    }
                }
                return i
            }

            function re(e, t) {
                t(e.value);
                for (var n = e.children.length - 1; 0 <= n; n--) re(e.children[n], t)
            }

            function B(e) {
                return "__sn" in e && e.__sn.type === N.Element && "iframe" === e.__sn.tagName
            }

            function oe(e, t) {
                var n, e = null == (e = null == (e = e.ownerDocument) ? void 0 : e.defaultView) ? void 0 : e.frameElement;
                return e && e !== t ? (n = e.getBoundingClientRect(), t = oe(e, t), e = n.height / e.clientHeight, {
                    x: n.x * t.relativeScale + t.x,
                    y: n.y * t.relativeScale + t.y,
                    relativeScale: e,
                    absoluteScale: t.absoluteScale * e
                }) : {
                    x: 0,
                    y: 0,
                    relativeScale: 1,
                    absoluteScale: 1
                }
            }

            function U(e) {
                return Boolean(null == (e = e) ? void 0 : e.shadowRoot)
            }
            var t = Object.freeze({
                __proto__: null,
                on: _e,
                createMirror: function() {
                    return {
                        map: {},
                        getId: function(e) {
                            return e && e.__sn ? e.__sn.id : -1
                        },
                        getNode: function(e) {
                            return this.map[e] || null
                        },
                        removeNodeFromMap: function(e) {
                            var t = this,
                                n = e.__sn && e.__sn.id;
                            delete this.map[n], e.childNodes && e.childNodes.forEach(function(e) {
                                return t.removeNodeFromMap(e)
                            })
                        },
                        has: function(e) {
                            return this.map.hasOwnProperty(e)
                        },
                        reset: function() {
                            this.map = {}
                        }
                    }
                },
                get _mirror() {
                    return Ee.mirror
                },
                throttle: ke,
                hookSetter: Me,
                patch: Re,
                getWindowHeight: Le,
                getWindowWidth: De,
                isBlocked: Ne,
                isIgnored: $,
                isAncestorRemoved: Z,
                isTouchEvent: Pe,
                polyfill: ee,
                TreeIndex: te,
                queueToResolveTrees: ne,
                iterateResolveTree: re,
                isIframeINode: B,
                getBaseDimension: oe,
                hasShadowRoot: U
            });

            function ie(e) {
                return "__ln" in e
            }

            function ae(e, t) {
                return e + "@" + t
            }
            ce.prototype.get = function(e) {
                if (e >= this.length) throw new Error("Position outside of list range");
                for (var t = this.head, n = 0; n < e; n++) t = (null == t ? void 0 : t.next) || null;
                return t
            }, ce.prototype.addNode = function(e) {
                var t, n = {
                    value: e,
                    previous: null,
                    next: null
                };
                e.__ln = n, e.previousSibling && ie(e.previousSibling) ? (t = e.previousSibling.__ln.next, n.next = t, n.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = n, t && (t.previous = n)) : e.nextSibling && ie(e.nextSibling) && e.nextSibling.__ln.previous ? (t = e.nextSibling.__ln.previous, n.previous = t, n.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = n, t && (t.next = n)) : (this.head && (this.head.previous = n), n.next = this.head, this.head = n), this.length++
            }, ce.prototype.removeNode = function(e) {
                var t = e.__ln;
                this.head && (t.previous ? (t.previous.next = t.next, t.next && (t.next.previous = t.previous)) : (this.head = t.next, this.head && (this.head.previous = null)), e.__ln && delete e.__ln, this.length--)
            };
            var se = ce;

            function ce() {
                this.length = 0, this.head = null
            }

            function le(e) {
                return "__sn" in e
            }
            n.prototype.init = function(t) {
                var n = this;
                ["mutationCb", "blockClass", "blockSelector", "maskTextClass", "maskTextSelector", "inlineStylesheet", "maskInputOptions", "maskTextFn", "maskInputFn", "recordCanvas", "inlineImages", "slimDOMOptions", "doc", "mirror", "iframeManager", "shadowDomManager", "canvasManager"].forEach(function(e) {
                    n[e] = t[e]
                })
            }, n.prototype.freeze = function() {
                this.frozen = !0, this.canvasManager.freeze()
            }, n.prototype.unfreeze = function() {
                this.frozen = !1, this.canvasManager.unfreeze(), this.emit()
            }, n.prototype.isFrozen = function() {
                return this.frozen
            }, n.prototype.lock = function() {
                this.locked = !0, this.canvasManager.lock()
            }, n.prototype.unlock = function() {
                this.locked = !1, this.canvasManager.unlock(), this.emit()
            }, n.prototype.reset = function() {
                this.canvasManager.reset()
            };
            var ue = n;

            function n() {
                var b = this;
                this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.processMutations = function(e) {
                    e.forEach(b.processMutation), b.emit()
                }, this.emit = function() {
                    var t, n, e;
                    if (!b.frozen && !b.locked) {
                        for (var o = [], i = new se, a = function(e) {
                                for (var t = e, n = -2; - 2 === n;) n = (t = t && t.nextSibling) && b.mirror.getId(t);
                                return n
                            }, r = function(t) {
                                var e = t.getRootNode ? null == (e = t.getRootNode()) ? void 0 : e.host : null,
                                    n = !(b.doc.contains(t) || e instanceof Node && b.doc.contains(e));
                                if (t.parentNode && !n) {
                                    n = R(t.parentNode) ? b.mirror.getId(e) : b.mirror.getId(t.parentNode), e = a(t);
                                    if (-1 === n || -1 === e) return i.addNode(t);
                                    var r = W(t, {
                                        doc: b.doc,
                                        map: b.mirror.map,
                                        blockClass: b.blockClass,
                                        blockSelector: b.blockSelector,
                                        maskTextClass: b.maskTextClass,
                                        maskTextSelector: b.maskTextSelector,
                                        skipChild: !0,
                                        inlineStylesheet: b.inlineStylesheet,
                                        maskInputOptions: b.maskInputOptions,
                                        maskTextFn: b.maskTextFn,
                                        maskInputFn: b.maskInputFn,
                                        slimDOMOptions: b.slimDOMOptions,
                                        recordCanvas: b.recordCanvas,
                                        inlineImages: b.inlineImages,
                                        onSerialize: function(e) {
                                            B(e) && b.iframeManager.addIframe(e), U(t) && b.shadowDomManager.addShadowRoot(t.shadowRoot, document)
                                        },
                                        onIframeLoad: function(e, t) {
                                            b.iframeManager.attachIframe(e, t)
                                        }
                                    });
                                    r && o.push({
                                        parentId: n,
                                        nextId: e,
                                        node: r
                                    })
                                }
                            }; b.mapRemoves.length;) b.mirror.removeNodeFromMap(b.mapRemoves.shift());
                        try {
                            for (var s = Ie(b.movedSet), c = s.next(); !c.done; c = s.next()) {
                                var l = c.value;
                                fe(b.removes, l, b.mirror) && !b.movedSet.has(l.parentNode) || r(l)
                            }
                        } catch (e) {
                            t = {
                                error: e
                            }
                        } finally {
                            try {
                                c && !c.done && (g = s.return) && g.call(s)
                            } finally {
                                if (t) throw t.error
                            }
                        }
                        try {
                            for (var u = Ie(b.addedSet), d = u.next(); !d.done; d = u.next()) l = d.value, !pe(b.droppedSet, l) && !fe(b.removes, l, b.mirror) || pe(b.movedSet, l) ? r(l) : b.droppedSet.add(l)
                        } catch (e) {
                            n = {
                                error: e
                            }
                        } finally {
                            try {
                                d && !d.done && (e = u.return) && e.call(u)
                            } finally {
                                if (n) throw n.error
                            }
                        }
                        for (var f = null; i.length;) {
                            var p, h, m = null;
                            if (!(m = f && (p = b.mirror.getId(f.value.parentNode), h = a(f.value), -1 !== p) && -1 !== h ? f : m))
                                for (var v = i.length - 1; 0 <= v; v--) {
                                    var y = i.get(v);
                                    if (y && (p = b.mirror.getId(y.value.parentNode), h = a(y.value), -1 !== p) && -1 !== h) {
                                        m = y;
                                        break
                                    }
                                }
                            if (!m) {
                                for (; i.head;) i.removeNode(i.head.value);
                                break
                            }
                            f = m.previous, i.removeNode(m.value), r(m.value)
                        }
                        var g = {
                            texts: b.texts.map(function(e) {
                                return {
                                    id: b.mirror.getId(e.node),
                                    value: e.value
                                }
                            }).filter(function(e) {
                                return b.mirror.has(e.id)
                            }),
                            attributes: b.attributes.map(function(e) {
                                return {
                                    id: b.mirror.getId(e.node),
                                    attributes: e.attributes
                                }
                            }).filter(function(e) {
                                return b.mirror.has(e.id)
                            }),
                            removes: b.removes,
                            adds: o
                        };
                        (g.texts.length || g.attributes.length || g.removes.length || g.adds.length) && (b.texts = [], b.attributes = [], b.removes = [], b.addedSet = new Set, b.movedSet = new Set, b.droppedSet = new Set, b.movedMap = {}, b.mutationCb(g))
                    }
                }, this.processMutation = function(r) {
                    var t, e, n, o;
                    if (!$(r.target)) switch (r.type) {
                        case "characterData":
                            var i = r.target.textContent;
                            Ne(r.target, b.blockClass) || i === r.oldValue || b.texts.push({
                                value: X(r.target, b.maskTextClass, b.maskTextSelector) && i ? b.maskTextFn ? b.maskTextFn(i) : i.replace(/[\S]/g, "*") : i,
                                node: r.target
                            });
                            break;
                        case "attributes":
                            var a = r.target,
                                i = r.target.getAttribute(r.attributeName);
                            if ("value" === r.attributeName && (i = Ae({
                                    maskInputOptions: b.maskInputOptions,
                                    tagName: r.target.tagName,
                                    type: r.target.getAttribute("type"),
                                    value: i,
                                    maskInputFn: b.maskInputFn
                                })), !Ne(r.target, b.blockClass) && i !== r.oldValue) {
                                var s = b.attributes.find(function(e) {
                                    return e.node === r.target
                                });
                                if (s || (s = {
                                        node: r.target,
                                        attributes: {}
                                    }, b.attributes.push(s)), "style" === r.attributeName) {
                                    var c = b.doc.createElement("span"),
                                        l = (r.oldValue && c.setAttribute("style", r.oldValue), void 0 !== s.attributes.style && null !== s.attributes.style || (s.attributes.style = {}), s.attributes.style);
                                    try {
                                        for (var u = Ie(Array.from(a.style)), d = u.next(); !d.done; d = u.next()) {
                                            var f = d.value,
                                                p = a.style.getPropertyValue(f),
                                                h = a.style.getPropertyPriority(f);
                                            p === c.style.getPropertyValue(f) && h === c.style.getPropertyPriority(f) || (l[f] = "" === h ? p : [p, h])
                                        }
                                    } catch (e) {
                                        t = {
                                            error: e
                                        }
                                    } finally {
                                        try {
                                            d && !d.done && (e = u.return) && e.call(u)
                                        } finally {
                                            if (t) throw t.error
                                        }
                                    }
                                    try {
                                        for (var m = Ie(Array.from(c.style)), v = m.next(); !v.done; v = m.next()) f = v.value, "" === a.style.getPropertyValue(f) && (l[f] = !1)
                                    } catch (e) {
                                        n = {
                                            error: e
                                        }
                                    } finally {
                                        try {
                                            v && !v.done && (o = m.return) && o.call(m)
                                        } finally {
                                            if (n) throw n.error
                                        }
                                    }
                                } else s.attributes[r.attributeName] = q(b.doc, r.target.tagName, r.attributeName, i)
                            }
                            break;
                        case "childList":
                            r.addedNodes.forEach(function(e) {
                                return b.genAdds(e, r.target)
                            }), r.removedNodes.forEach(function(e) {
                                var t = b.mirror.getId(e),
                                    n = R(r.target) ? b.mirror.getId(r.target.host) : b.mirror.getId(r.target);
                                Ne(r.target, b.blockClass) || $(e) || (b.addedSet.has(e) ? (de(b.addedSet, e), b.droppedSet.add(e)) : b.addedSet.has(r.target) && -1 === t || Z(r.target, b.mirror) || (b.movedSet.has(e) && b.movedMap[ae(t, n)] ? de(b.movedSet, e) : b.removes.push({
                                    parentId: n,
                                    id: t,
                                    isShadow: !!R(r.target) || void 0
                                })), b.mapRemoves.push(e))
                            })
                    }
                }, this.genAdds = function(e, t) {
                    if (!t || !Ne(t, b.blockClass)) {
                        if (le(e)) {
                            if ($(e)) return;
                            b.movedSet.add(e);
                            var n = null;
                            (n = t && le(t) ? t.__sn.id : n) && (b.movedMap[ae(e.__sn.id, n)] = !0)
                        } else b.addedSet.add(e), b.droppedSet.delete(e);
                        Ne(e, b.blockClass) || e.childNodes.forEach(function(e) {
                            return b.genAdds(e)
                        })
                    }
                }
            }

            function de(t, e) {
                t.delete(e), e.childNodes.forEach(function(e) {
                    return de(t, e)
                })
            }

            function fe(e, t, n) {
                var r, t = t.parentNode;
                return !!t && (r = n.getId(t), !!e.some(function(e) {
                    return e.id === r
                }) || fe(e, t, n))
            }

            function pe(e, t) {
                t = t.parentNode;
                return !!t && (!!e.has(t) || pe(e, t))
            }
            var Oe = [],
                Fe = "undefined" != typeof CSSGroupingRule,
                je = "undefined" != typeof CSSMediaRule,
                We = "undefined" != typeof CSSSupportsRule,
                Be = "undefined" != typeof CSSConditionRule;

            function Ue(e) {
                try {
                    if ("composedPath" in e) {
                        var t = e.composedPath();
                        if (t.length) return t[0]
                    } else if ("path" in e && e.path.length) return e.path[0];
                    return e.target
                } catch (t) {
                    return e.target
                }
            }

            function Ge(e, t) {
                var n = new ue,
                    e = (Oe.push(n), n.init(e), window.MutationObserver || window.__rrMutationObserver),
                    r = null == (r = null == (o = null == (o = window) ? void 0 : o.Zone) ? void 0 : o.__symbol__) ? void 0 : r.call(o, "MutationObserver"),
                    o = new(e = r && window[r] ? window[r] : e)(n.processMutations.bind(n));
                return o.observe(t, {
                    attributes: !0,
                    attributeOldValue: !0,
                    characterData: !0,
                    characterDataOldValue: !0,
                    childList: !0,
                    subtree: !0
                }), o
            }

            function ze(e) {
                var t, n, o = e.mouseInteractionCb,
                    i = e.doc,
                    a = e.mirror,
                    s = e.blockClass,
                    e = e.sampling;
                return !1 === e.mouseInteraction ? function() {} : (t = !0 === e.mouseInteraction || void 0 === e.mouseInteraction ? {} : e.mouseInteraction, n = [], Object.keys(Ee.MouseInteractions).filter(function(e) {
                    return Number.isNaN(Number(e)) && !e.endsWith("_Departed") && !1 !== t[e]
                }).forEach(function(e) {
                    var r, t = e.toLowerCase();
                    r = e, n.push(_e(t, function(e) {
                        var t, n = Ue(e);
                        Ne(n, s) || (e = Pe(e) ? e.changedTouches[0] : e) && (n = a.getId(n), t = e.clientX, e = e.clientY, o({
                            type: Ee.MouseInteractions[r],
                            id: n,
                            x: t,
                            y: e
                        }))
                    }, i))
                }), function() {
                    n.forEach(function(e) {
                        return e()
                    })
                })
            }

            function Ve(e) {
                var r = e.scrollCb,
                    o = e.doc,
                    i = e.mirror,
                    a = e.blockClass;
                return _e("scroll", ke(function(e) {
                    var t, n, e = Ue(e);
                    e && !Ne(e, a) && (t = i.getId(e), e === o ? (n = o.scrollingElement || o.documentElement, r({
                        id: t,
                        x: n.scrollLeft,
                        y: n.scrollTop
                    })) : r({
                        id: t,
                        x: e.scrollLeft,
                        y: e.scrollTop
                    }))
                }, e.sampling.scroll || 100), o)
            }

            function He(e, t) {
                e = xe({}, e);
                return t || delete e.userTriggered, e
            }
            var Ye = ["INPUT", "TEXTAREA", "SELECT"],
                qe = new WeakMap;

            function Xe(e) {
                var t = [];
                return e = (Fe && e.parentRule instanceof CSSGroupingRule || je && e.parentRule instanceof CSSMediaRule || We && e.parentRule instanceof CSSSupportsRule || Be && e.parentRule instanceof CSSConditionRule ? Array.from(e.parentRule.cssRules) : Array.from(e.parentStyleSheet.cssRules)).indexOf(e), t.unshift(e), t
            }

            function he(e, t) {
                var n, r, o, P, F, j, W, B, U, G, z, V, H, Y, i = e.doc.defaultView;
                if (!i) return function() {};
                o = t = void 0 === t ? {} : t, P = (t = e).mutationCb, F = t.mousemoveCb, j = t.mouseInteractionCb, W = t.scrollCb, B = t.viewportResizeCb, U = t.inputCb, G = t.mediaInteractionCb, z = t.styleSheetRuleCb, V = t.styleDeclarationCb, H = t.canvasMutationCb, Y = t.fontCb, t.mutationCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.mutation && o.mutation.apply(o, Ce(e)), P.apply(void 0, Ce(e))
                }, t.mousemoveCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.mousemove && o.mousemove.apply(o, Ce(e)), F.apply(void 0, Ce(e))
                }, t.mouseInteractionCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.mouseInteraction && o.mouseInteraction.apply(o, Ce(e)), j.apply(void 0, Ce(e))
                }, t.scrollCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.scroll && o.scroll.apply(o, Ce(e)), W.apply(void 0, Ce(e))
                }, t.viewportResizeCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.viewportResize && o.viewportResize.apply(o, Ce(e)), B.apply(void 0, Ce(e))
                }, t.inputCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.input && o.input.apply(o, Ce(e)), U.apply(void 0, Ce(e))
                }, t.mediaInteractionCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.mediaInteaction && o.mediaInteaction.apply(o, Ce(e)), G.apply(void 0, Ce(e))
                }, t.styleSheetRuleCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.styleSheetRule && o.styleSheetRule.apply(o, Ce(e)), z.apply(void 0, Ce(e))
                }, t.styleDeclarationCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.styleDeclaration && o.styleDeclaration.apply(o, Ce(e)), V.apply(void 0, Ce(e))
                }, t.canvasMutationCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.canvasMutation && o.canvasMutation.apply(o, Ce(e)), H.apply(void 0, Ce(e))
                }, t.fontCb = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.font && o.font.apply(o, Ce(e)), Y.apply(void 0, Ce(e))
                };
                var a, s, c, q, l, u, d, f, p, h, m, v, y, g, b, w, S, X, Q, K, J, $, Z, E, ee, te, ne, x, re, I, T, oe, C, _, k, M, R, ie, ae, se, N, ce, le = Ge(e, e.doc),
                    ue = (se = e.mousemoveCb, t = e.sampling, N = e.doc, ce = e.mirror, !1 === t.mousemove ? function() {} : (M = "number" == typeof t.mousemove ? t.mousemove : 50, t = "number" == typeof t.mousemoveCallback ? t.mousemoveCallback : 500, ie = ke(function(e) {
                        var t = Date.now() - k;
                        se(R.map(function(e) {
                            return e.timeOffset -= t, e
                        }), e), R = [], k = null
                    }, t), t = ke(function(e) {
                        var t = Ue(e),
                            n = Pe(e) ? e.changedTouches[0] : e,
                            r = n.clientX,
                            n = n.clientY;
                        k = k || Date.now(), R.push({
                            x: r,
                            y: n,
                            id: ce.getId(t),
                            timeOffset: Date.now() - k
                        }), ie("undefined" != typeof DragEvent && e instanceof DragEvent ? Ee.IncrementalSource.Drag : e instanceof MouseEvent ? Ee.IncrementalSource.MouseMove : Ee.IncrementalSource.TouchMove)
                    }, M, {
                        trailing: !(R = [])
                    }), ae = [_e("mousemove", t, N), _e("touchmove", t, N), _e("drag", t, N)], function() {
                        ae.forEach(function(e) {
                            return e()
                        })
                    })),
                    de = ze(e),
                    fe = Ve(e),
                    pe = (oe = e.viewportResizeCb, _ = C = -1, _e("resize", ke(function() {
                        var e = Le(),
                            t = De();
                        C === e && _ === t || (oe({
                            width: Number(t),
                            height: Number(e)
                        }), C = e, _ = t)
                    }, 200), window)),
                    he = (Z = e.inputCb, E = e.doc, ee = e.mirror, te = e.blockClass, ne = e.ignoreClass, x = e.maskInputOptions, re = e.maskInputFn, M = e.sampling, I = e.userTriggeredOnInput, T = ("last" === M.input ? ["change"] : ["input", "change"]).map(function(e) {
                        return _e(e, we, E)
                    }), M = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"), t = [
                        [HTMLInputElement.prototype, "value"],
                        [HTMLInputElement.prototype, "checked"],
                        [HTMLSelectElement.prototype, "value"],
                        [HTMLTextAreaElement.prototype, "value"],
                        [HTMLSelectElement.prototype, "selectedIndex"],
                        [HTMLOptionElement.prototype, "selected"]
                    ], M && M.set && T.push.apply(T, Ce(t.map(function(e) {
                        return Me(e[0], e[1], {
                            set: function() {
                                we({
                                    target: this
                                })
                            }
                        })
                    }))), function() {
                        T.forEach(function(e) {
                            return e()
                        })
                    }),
                    me = (X = e.mediaInteractionCb, Q = e.blockClass, K = e.mirror, J = e.sampling, $ = [_e("play", O(0)), _e("pause", O(1)), _e("seeked", O(2)), _e("volumechange", O(3))], function() {
                        $.forEach(function(e) {
                            return e()
                        })
                    }),
                    ve = (m = e.styleSheetRuleCb, v = e.mirror, g = (y = {
                        win: i
                    }.win).CSSStyleSheet.prototype.insertRule, y.CSSStyleSheet.prototype.insertRule = function(e, t) {
                        var n = v.getId(this.ownerNode);
                        return -1 !== n && m({
                            id: n,
                            adds: [{
                                rule: e,
                                index: t
                            }]
                        }), g.apply(this, arguments)
                    }, b = y.CSSStyleSheet.prototype.deleteRule, y.CSSStyleSheet.prototype.deleteRule = function(e) {
                        var t = v.getId(this.ownerNode);
                        return -1 !== t && m({
                            id: t,
                            removes: [{
                                index: e
                            }]
                        }), b.apply(this, arguments)
                    }, w = {}, Fe ? w.CSSGroupingRule = y.CSSGroupingRule : (je && (w.CSSMediaRule = y.CSSMediaRule), Be && (w.CSSConditionRule = y.CSSConditionRule), We && (w.CSSSupportsRule = y.CSSSupportsRule)), S = {}, Object.entries(w).forEach(function(e) {
                        var e = Te(e, 2),
                            r = e[0],
                            e = e[1];
                        S[r] = {
                            insertRule: e.prototype.insertRule,
                            deleteRule: e.prototype.deleteRule
                        }, e.prototype.insertRule = function(e, t) {
                            var n = v.getId(this.parentStyleSheet.ownerNode);
                            return -1 !== n && m({
                                id: n,
                                adds: [{
                                    rule: e,
                                    index: Ce(Xe(this), [t || 0])
                                }]
                            }), S[r].insertRule.apply(this, arguments)
                        }, e.prototype.deleteRule = function(e) {
                            var t = v.getId(this.parentStyleSheet.ownerNode);
                            return -1 !== t && m({
                                id: t,
                                removes: [{
                                    index: Ce(Xe(this), [e])
                                }]
                            }), S[r].deleteRule.apply(this, arguments)
                        }
                    }), function() {
                        y.CSSStyleSheet.prototype.insertRule = g, y.CSSStyleSheet.prototype.deleteRule = b, Object.entries(w).forEach(function(e) {
                            var e = Te(e, 2),
                                t = e[0],
                                e = e[1];
                            e.prototype.insertRule = S[t].insertRule, e.prototype.deleteRule = S[t].deleteRule
                        })
                    }),
                    ye = (u = e.styleDeclarationCb, d = e.mirror, p = (f = {
                        win: i
                    }.win).CSSStyleDeclaration.prototype.setProperty, f.CSSStyleDeclaration.prototype.setProperty = function(e, t, n) {
                        var r = d.getId(null == (r = null == (r = this.parentRule) ? void 0 : r.parentStyleSheet) ? void 0 : r.ownerNode);
                        return -1 !== r && u({
                            id: r,
                            set: {
                                property: e,
                                value: t,
                                priority: n
                            },
                            index: Xe(this.parentRule)
                        }), p.apply(this, arguments)
                    }, h = f.CSSStyleDeclaration.prototype.removeProperty, f.CSSStyleDeclaration.prototype.removeProperty = function(e) {
                        var t = d.getId(null == (t = null == (t = this.parentRule) ? void 0 : t.parentStyleSheet) ? void 0 : t.ownerNode);
                        return -1 !== t && u({
                            id: t,
                            remove: {
                                property: e
                            },
                            index: Xe(this.parentRule)
                        }), h.apply(this, arguments)
                    }, function() {
                        f.CSSStyleDeclaration.prototype.setProperty = p, f.CSSStyleDeclaration.prototype.removeProperty = h
                    }),
                    ge = e.collectFonts && (q = e.fontCb, N = e.doc, l = N.defaultView) ? (a = [], s = new WeakMap, c = l.FontFace, l.FontFace = function(e, t, n) {
                        var r = new c(e, t, n);
                        return s.set(r, {
                            family: e,
                            buffer: "string" != typeof t,
                            descriptors: n,
                            fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
                        }), r
                    }, N = Re(N.fonts, "add", function(e) {
                        return function(t) {
                            return setTimeout(function() {
                                var e = s.get(t);
                                e && (q(e), s.delete(t))
                            }, 0), e.apply(this, [t])
                        }
                    }), a.push(function() {
                        l.FontFace = c
                    }), a.push(N), function() {
                        a.forEach(function(e) {
                            return e()
                        })
                    }) : function() {},
                    be = [];

                function O(o) {
                    return ke(function(e) {
                        var t, n, r, e = Ue(e);
                        e && !Ne(e, Q) && (t = e.currentTime, n = e.volume, r = e.muted, X({
                            type: o,
                            id: K.getId(e),
                            currentTime: t,
                            volume: n,
                            muted: r
                        }))
                    }, J.media || 500)
                }

                function we(e) {
                    var t, n, r, o = Ue(e),
                        e = e.isTrusted;
                    !(o = o && "OPTION" === o.tagName ? o.parentElement : o) || !o.tagName || Ye.indexOf(o.tagName) < 0 || Ne(o, te) || (t = o.type, o.classList.contains(ne)) || (r = o.value, n = !1, "radio" === t || "checkbox" === t ? n = o.checked : (x[o.tagName.toLowerCase()] || x[t]) && (r = Ae({
                        maskInputOptions: x,
                        tagName: o.tagName,
                        type: t,
                        value: r,
                        maskInputFn: re
                    })), Se(o, He({
                        text: r,
                        isChecked: n,
                        userTriggered: e
                    }, I)), r = o.name, "radio" === t && r && n && E.querySelectorAll('input[type="radio"][name="' + r + '"]').forEach(function(e) {
                        e !== o && Se(e, He({
                            text: e.value,
                            isChecked: !n,
                            userTriggered: !1
                        }, I))
                    }))
                }

                function Se(e, t) {
                    var n = qe.get(e);
                    n && n.text === t.text && n.isChecked === t.isChecked || (qe.set(e, t), n = ee.getId(e), Z(xe(xe({}, t), {
                        id: n
                    })))
                }
                try {
                    for (var A = Ie(e.plugins), L = A.next(); !L.done; L = A.next()) {
                        var D = L.value;
                        be.push(D.observer(D.callback, i, D.options))
                    }
                } catch (e) {
                    n = {
                        error: e
                    }
                } finally {
                    try {
                        L && !L.done && (r = A.return) && r.call(A)
                    } finally {
                        if (n) throw n.error
                    }
                }
                return function() {
                    Oe.forEach(function(e) {
                        return e.reset()
                    }), le.disconnect(), ue(), de(), fe(), pe(), he(), me(), ve(), ye(), ge(), be.forEach(function(e) {
                        return e()
                    })
                }
            }
            ge.prototype.addIframe = function(e) {
                this.iframes.set(e, !0)
            }, ge.prototype.addLoadListener = function(e) {
                this.loadListener = e
            }, ge.prototype.attachIframe = function(e, t) {
                this.mutationCb({
                    adds: [{
                        parentId: e.__sn.id,
                        nextId: null,
                        node: t
                    }],
                    removes: [],
                    texts: [],
                    attributes: [],
                    isAttachIframe: !0
                }), null != (t = this.loadListener) && t.call(this, e)
            };
            var me = ge,
                ve = (ye.prototype.addShadowRoot = function(e, t) {
                    Ge(xe(xe({}, this.bypassOptions), {
                        doc: t,
                        mutationCb: this.mutationCb,
                        mirror: this.mirror,
                        shadowDomManager: this
                    }), e), Ve(xe(xe({}, this.bypassOptions), {
                        scrollCb: this.scrollCb,
                        doc: e,
                        mirror: this.mirror
                    }))
                }, ye);

            function ye(e) {
                this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror
            }

            function ge(e) {
                this.iframes = new WeakMap, this.mutationCb = e.mutationCb
            }
            for (var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", be = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), we = 0; we < i.length; we++) be[i.charCodeAt(we)] = we;

            function Se(e, t, n) {
                var r;
                if (e && (Je(e, t) || "object" == Mt(e))) return t = n, n = e.constructor.name, (r = Qe.get(t)) || (r = new Map, Qe.set(t, r)), r.has(n) || r.set(n, []), -1 === (r = (t = r.get(n)).indexOf(e)) && (r = t.length, t.push(e)), r
            }
            var Qe = new Map;

            function Ke(e, t, n) {
                return Ce(e).map(function(e) {
                    return function t(o, n, r) {
                        return o instanceof Array ? o.map(function(e) {
                            return t(e, n, r)
                        }) : null === o ? o : o instanceof Float32Array || o instanceof Float64Array || o instanceof Int32Array || o instanceof Uint32Array || o instanceof Uint8Array || o instanceof Uint16Array || o instanceof Int16Array || o instanceof Int8Array || o instanceof Uint8ClampedArray ? {
                            rr_type: o.constructor.name,
                            args: [Object.values(o)]
                        } : o instanceof ArrayBuffer ? {
                            rr_type: o.constructor.name,
                            base64: function() {
                                for (var e = new Uint8Array(o), t = e.length, n = "", r = 0; r < t; r += 3) n = (n = (n = (n += i[e[r] >> 2]) + i[(3 & e[r]) << 4 | e[r + 1] >> 4]) + i[(15 & e[r + 1]) << 2 | e[r + 2] >> 6]) + i[63 & e[r + 2]];
                                return t % 3 == 2 ? n = n.substring(0, n.length - 1) + "=" : t % 3 == 1 && (n = n.substring(0, n.length - 2) + "=="), n
                            }()
                        } : o instanceof DataView ? {
                            rr_type: o.constructor.name,
                            args: [t(o.buffer, n, r), o.byteOffset, o.byteLength]
                        } : o instanceof HTMLImageElement ? {
                            rr_type: o.constructor.name,
                            src: o.src
                        } : o instanceof ImageData ? {
                            rr_type: o.constructor.name,
                            args: [t(o.data, n, r), o.width, o.height]
                        } : Je(o, n) || "object" == Mt(o) ? {
                            rr_type: o.constructor.name,
                            index: Se(o, n, r)
                        } : o
                    }(e, t, n)
                })
            }
            var Je = function(t, n) {
                var e = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter(function(e) {
                    return "function" == typeof n[e]
                });
                return Boolean(e.find(function(e) {
                    return t instanceof n[e]
                }))
            };

            function $e(a, s, c, l, u, d) {
                var e, t, n = [],
                    r = Object.getOwnPropertyNames(a);
                try {
                    for (var o = Ie(r), i = o.next(); !i.done; i = o.next()) ! function(i) {
                        try {
                            if ("function" != typeof a[i]) return;
                            var t = Re(a, i, function(o) {
                                return function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    var n, r = o.apply(this, e);
                                    return Se(r, d, a), Ne(this.canvas, l) || (u.getId(this.canvas), n = Ke(Ce(e), d, a), c(this.canvas, {
                                        type: s,
                                        property: i,
                                        args: n
                                    })), r
                                }
                            });
                            n.push(t)
                        } catch (e) {
                            t = Me(a, i, {
                                set: function(e) {
                                    c(this.canvas, {
                                        type: s,
                                        property: i,
                                        args: [e],
                                        setter: !0
                                    })
                                }
                            });
                            n.push(t)
                        }
                    }(i.value)
                } catch (a) {
                    e = {
                        error: a
                    }
                } finally {
                    try {
                        i && !i.done && (t = o.return) && t.call(o)
                    } finally {
                        if (e) throw e.error
                    }
                }
                return n
            }
            o.prototype.reset = function() {
                this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers()
            }, o.prototype.freeze = function() {
                this.frozen = !0
            }, o.prototype.unfreeze = function() {
                this.frozen = !1
            }, o.prototype.lock = function() {
                this.locked = !0
            }, o.prototype.unlock = function() {
                this.locked = !1
            }, o.prototype.initCanvasMutationObserver = function(e, t) {
                this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
                var n, r, o, i = function(e, o) {
                        var t = [];
                        try {
                            var n = Re(e.HTMLCanvasElement.prototype, "getContext", function(r) {
                                return function(e) {
                                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                                    return Ne(this, o) || "__context" in this || (this.__context = e), r.apply(this, Ce([e], t))
                                }
                            });
                            t.push(n)
                        } catch (e) {
                            console.error("failed to patch HTMLCanvasElement.prototype.getContext")
                        }
                        return function() {
                            t.forEach(function(e) {
                                return e()
                            })
                        }
                    }(e, t),
                    a = function(a, n, s) {
                        var e, t, r = [],
                            o = Object.getOwnPropertyNames(n.CanvasRenderingContext2D.prototype);
                        try {
                            for (var i = Ie(o), c = i.next(); !c.done; c = i.next()) ! function(i) {
                                try {
                                    if ("function" != typeof n.CanvasRenderingContext2D.prototype[i]) return;
                                    var t = Re(n.CanvasRenderingContext2D.prototype, i, function(t) {
                                        return function() {
                                            for (var r = this, o = [], e = 0; e < arguments.length; e++) o[e] = arguments[e];
                                            return Ne(this.canvas, s) || setTimeout(function() {
                                                var e, t, n = Ce(o);
                                                "drawImage" === i && n[0] && n[0] instanceof HTMLCanvasElement && (t = null == (e = null == (e = (t = n[0]).getContext("2d")) ? void 0 : e.getImageData(0, 0, t.width, t.height)) ? void 0 : e.data, n[0] = JSON.stringify(t)), a(r.canvas, {
                                                    type: S["2D"],
                                                    property: i,
                                                    args: n
                                                })
                                            }, 0), t.apply(this, o)
                                        }
                                    });
                                    r.push(t)
                                } catch (e) {
                                    t = Me(n.CanvasRenderingContext2D.prototype, i, {
                                        set: function(e) {
                                            a(this.canvas, {
                                                type: S["2D"],
                                                property: i,
                                                args: [e],
                                                setter: !0
                                            })
                                        }
                                    });
                                    r.push(t)
                                }
                            }(c.value)
                        } catch (a) {
                            e = {
                                error: a
                            }
                        } finally {
                            try {
                                c && !c.done && (t = i.return) && t.call(i)
                            } finally {
                                if (e) throw e.error
                            }
                        }
                        return function() {
                            r.forEach(function(e) {
                                return e()
                            })
                        }
                    }(this.processMutation.bind(this), e, t, this.mirror),
                    s = (n = this.processMutation.bind(this), e = e, t = t, r = this.mirror, (o = []).push.apply(o, Ce($e(e.WebGLRenderingContext.prototype, S.WebGL, n, t, r, e))), void 0 !== e.WebGL2RenderingContext && o.push.apply(o, Ce($e(e.WebGL2RenderingContext.prototype, S.WebGL2, n, t, r, e))), function() {
                        o.forEach(function(e) {
                            return e()
                        })
                    });
                this.resetObservers = function() {
                    i(), a(), s()
                }
            }, o.prototype.startPendingCanvasMutationFlusher = function() {
                var e = this;
                requestAnimationFrame(function() {
                    return e.flushPendingCanvasMutations()
                })
            }, o.prototype.startRAFTimestamping = function() {
                var n = this;
                requestAnimationFrame(function e(t) {
                    n.rafStamps.latestId = t, requestAnimationFrame(e)
                })
            }, o.prototype.flushPendingCanvasMutations = function() {
                var r = this;
                this.pendingCanvasMutations.forEach(function(e, t) {
                    var n = r.mirror.getId(t);
                    r.flushPendingCanvasMutationFor(t, n)
                }), requestAnimationFrame(function() {
                    return r.flushPendingCanvasMutations()
                })
            }, o.prototype.flushPendingCanvasMutationFor = function(e, t) {
                var n, r;
                this.frozen || this.locked || (r = this.pendingCanvasMutations.get(e)) && -1 !== t && (n = r.map(function(e) {
                    e.type;
                    var t = e,
                        n = ["type"],
                        r = {};
                    for (i in t) Object.prototype.hasOwnProperty.call(t, i) && n.indexOf(i) < 0 && (r[i] = t[i]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols)
                        for (var o = 0, i = Object.getOwnPropertySymbols(t); o < i.length; o++) n.indexOf(i[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[o]) && (r[i[o]] = t[i[o]]);
                    return r
                }), r = r[0].type, this.mutationCb({
                    id: t,
                    type: r,
                    commands: n
                }), this.pendingCanvasMutations.delete(e))
            };
            var G, Ze, et = o;

            function o(e) {
                this.pendingCanvasMutations = new Map, this.rafStamps = {
                    latestId: 0,
                    invokeId: null
                }, this.frozen = !1, this.locked = !1, this.processMutation = function(e, t) {
                    (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []), this.pendingCanvasMutations.get(e).push(t)
                }, this.mutationCb = e.mutationCb, this.mirror = e.mirror, !0 === e.recordCanvas && this.initCanvasMutationObserver(e.win, e.blockClass)
            }

            function z(e) {
                return xe(xe({}, e), {
                    timestamp: Date.now()
                })
            }
            var tt = {
                map: {},
                getId: function(e) {
                    return e && e.__sn ? e.__sn.id : -1
                },
                getNode: function(e) {
                    return this.map[e] || null
                },
                removeNodeFromMap: function(e) {
                    var t = this,
                        n = e.__sn && e.__sn.id;
                    delete this.map[n], e.childNodes && e.childNodes.forEach(function(e) {
                        return t.removeNodeFromMap(e)
                    })
                },
                has: function(e) {
                    return this.map.hasOwnProperty(e)
                },
                reset: function() {
                    this.map = {}
                }
            };

            function a(e) {
                var r = (e = void 0 === e ? {} : e).emit,
                    o = e.checkoutEveryNms,
                    i = e.checkoutEveryNth,
                    t = e.blockClass,
                    a = void 0 === t ? "rr-block" : t,
                    t = e.blockSelector,
                    s = void 0 === t ? null : t,
                    t = e.ignoreClass,
                    n = void 0 === t ? "rr-ignore" : t,
                    t = e.maskTextClass,
                    c = void 0 === t ? "rr-mask" : t,
                    t = e.maskTextSelector,
                    l = void 0 === t ? null : t,
                    t = e.inlineStylesheet,
                    u = void 0 === t || t,
                    t = e.maskAllInputs,
                    d = e.maskInputOptions,
                    f = e.slimDOMOptions,
                    p = e.maskInputFn,
                    h = e.maskTextFn,
                    m = e.hooks,
                    v = e.packFn,
                    y = e.sampling,
                    g = void 0 === y ? {} : y,
                    y = e.mousemoveWait,
                    b = e.recordCanvas,
                    w = void 0 !== b && b,
                    b = e.userTriggeredOnInput,
                    P = void 0 !== b && b,
                    b = e.collectFonts,
                    F = void 0 !== b && b,
                    b = e.inlineImages,
                    S = void 0 !== b && b,
                    E = e.plugins,
                    b = e.keepIframeSrcFn,
                    j = void 0 === b ? function() {
                        return !1
                    } : b;
                if (!r) throw new Error("emit function is required");
                void 0 !== y && void 0 === g.mousemove && (g.mousemove = y);

                function x(e) {
                    G(z({
                        type: Ee.EventType.IncrementalSnapshot,
                        data: xe({
                            source: Ee.IncrementalSource.Mutation
                        }, e)
                    }))
                }

                function I(e) {
                    return G(z({
                        type: Ee.EventType.IncrementalSnapshot,
                        data: xe({
                            source: Ee.IncrementalSource.Scroll
                        }, e)
                    }))
                }

                function T(e) {
                    return G(z({
                        type: Ee.EventType.IncrementalSnapshot,
                        data: xe({
                            source: Ee.IncrementalSource.CanvasMutation
                        }, e)
                    }))
                }
                var C, _ = !0 === t ? {
                        color: !0,
                        date: !0,
                        "datetime-local": !0,
                        email: !0,
                        month: !0,
                        number: !0,
                        range: !0,
                        search: !0,
                        tel: !0,
                        text: !0,
                        time: !0,
                        url: !0,
                        week: !0,
                        textarea: !0,
                        select: !0,
                        password: !0
                    } : void 0 !== d ? d : {
                        password: !0
                    },
                    k = !0 === f || "all" === f ? {
                        script: !0,
                        comment: !0,
                        headFavicon: !0,
                        headWhitespace: !0,
                        headMetaSocial: !0,
                        headMetaRobots: !0,
                        headMetaHttpEquiv: !0,
                        headMetaVerification: !0,
                        headMetaAuthorship: "all" === f,
                        headMetaDescKeywords: "all" === f
                    } : f || {},
                    M = (ee(), 0),
                    R = (G = function(e, t) {
                        var n;
                        null == (n = Oe[0]) || !n.isFrozen() || e.type === Ee.EventType.FullSnapshot || e.type === Ee.EventType.IncrementalSnapshot && e.data.source === Ee.IncrementalSource.Mutation || Oe.forEach(function(e) {
                            return e.unfreeze()
                        }), r(function(e) {
                            var t, n;
                            try {
                                for (var r = Ie(E || []), o = r.next(); !o.done; o = r.next()) {
                                    var i = o.value;
                                    i.eventProcessor && (e = i.eventProcessor(e))
                                }
                            } catch (e) {
                                t = {
                                    error: e
                                }
                            } finally {
                                try {
                                    o && !o.done && (n = r.return) && n.call(r)
                                } finally {
                                    if (t) throw t.error
                                }
                            }
                            return e = v ? v(e) : e
                        }(e), t), e.type === Ee.EventType.FullSnapshot ? (C = e, M = 0) : e.type !== Ee.EventType.IncrementalSnapshot || e.data.source === Ee.IncrementalSource.Mutation && e.data.isAttachIframe || (M++, n = i && i <= M, t = o && e.timestamp - C.timestamp > o, (n || t) && Ze(!0))
                    }, new me({
                        mutationCb: x
                    })),
                    N = new et({
                        recordCanvas: w,
                        mutationCb: T,
                        win: window,
                        blockClass: a,
                        mirror: tt
                    }),
                    O = new ve({
                        mutationCb: x,
                        scrollCb: I,
                        bypassOptions: {
                            blockClass: a,
                            blockSelector: s,
                            maskTextClass: c,
                            maskTextSelector: l,
                            inlineStylesheet: u,
                            maskInputOptions: _,
                            maskTextFn: h,
                            maskInputFn: p,
                            recordCanvas: w,
                            inlineImages: S,
                            sampling: g,
                            slimDOMOptions: k,
                            iframeManager: R,
                            canvasManager: N
                        },
                        mirror: tt
                    });
                Ze = function(e) {
                    void 0 === e && (e = !1), G(z({
                        type: Ee.EventType.Meta,
                        data: {
                            href: window.location.href,
                            width: De(),
                            height: Le()
                        }
                    }), e), Oe.forEach(function(e) {
                        return e.lock()
                    });
                    var t = Te([W(e = document, {
                            doc: e,
                            map: e = {},
                            blockClass: void 0 === (n = (t = {
                                blockClass: a,
                                blockSelector: s,
                                maskTextClass: c,
                                maskTextSelector: l,
                                inlineStylesheet: u,
                                maskAllInputs: _,
                                maskTextFn: h,
                                slimDOM: k,
                                recordCanvas: w,
                                inlineImages: S,
                                onSerialize: function(e) {
                                    B(e) && R.addIframe(e), U(e) && O.addShadowRoot(e.shadowRoot, document)
                                },
                                onIframeLoad: function(e, t) {
                                    R.attachIframe(e, t)
                                },
                                keepIframeSrcFn: j
                            }).blockClass) ? "rr-block" : n,
                            blockSelector: void 0 === (n = t.blockSelector) ? null : n,
                            maskTextClass: void 0 === (n = t.maskTextClass) ? "rr-mask" : n,
                            maskTextSelector: void 0 === (n = t.maskTextSelector) ? null : n,
                            skipChild: !1,
                            inlineStylesheet: void 0 === (n = t.inlineStylesheet) || n,
                            maskInputOptions: !0 === (n = void 0 !== (n = t.maskAllInputs) && n) ? {
                                color: !0,
                                date: !0,
                                "datetime-local": !0,
                                email: !0,
                                month: !0,
                                number: !0,
                                range: !0,
                                search: !0,
                                tel: !0,
                                text: !0,
                                time: !0,
                                url: !0,
                                week: !0,
                                textarea: !0,
                                select: !0,
                                password: !0
                            } : !1 === n ? {
                                password: !0
                            } : n,
                            maskTextFn: t.maskTextFn,
                            maskInputFn: t.maskInputFn,
                            slimDOMOptions: !0 === (n = void 0 !== (n = t.slimDOM) && n) || "all" === n ? {
                                script: !0,
                                comment: !0,
                                headFavicon: !0,
                                headWhitespace: !0,
                                headMetaDescKeywords: "all" === n,
                                headMetaSocial: !0,
                                headMetaRobots: !0,
                                headMetaHttpEquiv: !0,
                                headMetaAuthorship: !0,
                                headMetaVerification: !0
                            } : !1 === n ? {} : n,
                            dataURLOptions: t.dataURLOptions,
                            inlineImages: void 0 !== (n = t.inlineImages) && n,
                            recordCanvas: void 0 !== (n = t.recordCanvas) && n,
                            preserveWhiteSpace: t.preserveWhiteSpace,
                            onSerialize: t.onSerialize,
                            onIframeLoad: t.onIframeLoad,
                            iframeLoadTimeout: t.iframeLoadTimeout,
                            keepIframeSrcFn: void 0 === (n = t.keepIframeSrcFn) ? function() {
                                return !1
                            } : n
                        }), e], 2),
                        n = t[0],
                        e = t[1];
                    if (!n) return console.warn("Failed to snapshot the document");
                    tt.map = e, G(z({
                        type: Ee.EventType.FullSnapshot,
                        data: {
                            node: n,
                            initialOffset: {
                                left: void 0 !== window.pageXOffset ? window.pageXOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollLeft) || (null == (e = null == (t = null === document || void 0 === document ? void 0 : document.body) ? void 0 : t.parentElement) ? void 0 : e.scrollLeft) || (null === document || void 0 === document ? void 0 : document.body.scrollLeft) || 0,
                                top: void 0 !== window.pageYOffset ? window.pageYOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollTop) || (null == (t = null == (n = null === document || void 0 === document ? void 0 : document.body) ? void 0 : n.parentElement) ? void 0 : t.scrollTop) || (null === document || void 0 === document ? void 0 : document.body.scrollTop) || 0
                            }
                        }
                    })), Oe.forEach(function(e) {
                        return e.unlock()
                    })
                };
                try {
                    var A = [],
                        L = (A.push(_e("DOMContentLoaded", function() {
                            G(z({
                                type: Ee.EventType.DomContentLoaded,
                                data: {}
                            }))
                        })), function(e) {
                            return he({
                                mutationCb: x,
                                mousemoveCb: function(e, t) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: {
                                            source: t,
                                            positions: e
                                        }
                                    }))
                                },
                                mouseInteractionCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.MouseInteraction
                                        }, e)
                                    }))
                                },
                                scrollCb: I,
                                viewportResizeCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.ViewportResize
                                        }, e)
                                    }))
                                },
                                inputCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.Input
                                        }, e)
                                    }))
                                },
                                mediaInteractionCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.MediaInteraction
                                        }, e)
                                    }))
                                },
                                styleSheetRuleCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.StyleSheetRule
                                        }, e)
                                    }))
                                },
                                styleDeclarationCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.StyleDeclaration
                                        }, e)
                                    }))
                                },
                                canvasMutationCb: T,
                                fontCb: function(e) {
                                    return G(z({
                                        type: Ee.EventType.IncrementalSnapshot,
                                        data: xe({
                                            source: Ee.IncrementalSource.Font
                                        }, e)
                                    }))
                                },
                                blockClass: a,
                                ignoreClass: n,
                                maskTextClass: c,
                                maskTextSelector: l,
                                maskInputOptions: _,
                                inlineStylesheet: u,
                                sampling: g,
                                recordCanvas: w,
                                inlineImages: S,
                                userTriggeredOnInput: P,
                                collectFonts: F,
                                doc: e,
                                maskInputFn: p,
                                maskTextFn: h,
                                blockSelector: s,
                                slimDOMOptions: k,
                                mirror: tt,
                                iframeManager: R,
                                shadowDomManager: O,
                                canvasManager: N,
                                plugins: (null == (e = null == E ? void 0 : E.filter(function(e) {
                                    return e.observer
                                })) ? void 0 : e.map(function(t) {
                                    return {
                                        observer: t.observer,
                                        options: t.options,
                                        callback: function(e) {
                                            return G(z({
                                                type: Ee.EventType.Plugin,
                                                data: {
                                                    plugin: t.name,
                                                    payload: e
                                                }
                                            }))
                                        }
                                    }
                                })) || []
                            }, m)
                        }),
                        D = (R.addLoadListener(function(e) {
                            A.push(L(e.contentDocument))
                        }), function() {
                            Ze(), A.push(L(document))
                        });
                    return "interactive" === document.readyState || "complete" === document.readyState ? D() : A.push(_e("load", function() {
                            G(z({
                                type: Ee.EventType.Load,
                                data: {}
                            })), D()
                        }, window)),
                        function() {
                            A.forEach(function(e) {
                                return e()
                            })
                        }
                } catch (e) {
                    console.warn(e)
                }
            }

            function nt(r) {
                return r = r || Object.create(null), {
                    on: function(e, t) {
                        (r[e] || (r[e] = [])).push(t)
                    },
                    off: function(e, t) {
                        r[e] && r[e].splice(r[e].indexOf(t) >>> 0, 1)
                    },
                    emit: function(t, n) {
                        (r[t] || []).slice().map(function(e) {
                            e(n)
                        }), (r["*"] || []).slice().map(function(e) {
                            e(t, n)
                        })
                    }
                }
            }
            a.addCustomEvent = function(e, t) {
                if (!G) throw new Error("please add custom event after start recording");
                G(z({
                    type: Ee.EventType.Custom,
                    data: {
                        tag: e,
                        payload: t
                    }
                }))
            }, a.freezePage = function() {
                Oe.forEach(function(e) {
                    return e.freeze()
                })
            }, a.takeFullSnapshot = function(e) {
                if (!Ze) throw new Error("please take full snapshot after start recording");
                Ze(e)
            }, a.mirror = tt;
            Object.freeze({
                __proto__: null,
                default: nt
            });

            function rt(s, c) {
                var e, t, l, u, n;

                function d(e, t) {
                    this.scrollLeft = e, this.scrollTop = t
                }

                function r(e) {
                    if (null === e || "object" != Mt(e) || void 0 === e.behavior || "auto" === e.behavior || "instant" === e.behavior) return !0;
                    if ("object" == Mt(e) && "smooth" === e.behavior) return !1;
                    throw new TypeError("behavior member of ScrollOptions " + e.behavior + " is not a valid value for enumeration ScrollBehavior.")
                }

                function o(e, t) {
                    return "Y" === t ? e.clientHeight + n < e.scrollHeight : "X" === t ? e.clientWidth + n < e.scrollWidth : void 0
                }

                function i(e, t) {
                    e = s.getComputedStyle(e, null)["overflow" + t];
                    return "auto" === e || "scroll" === e
                }

                function f(e) {
                    var t = (u() - e.startTime) / 468,
                        t = (t = 1 < t ? 1 : t, .5 * (1 - Math.cos(Math.PI * t))),
                        n = e.startX + (e.x - e.startX) * t,
                        t = e.startY + (e.y - e.startY) * t;
                    e.method.call(e.scrollable, n, t), n === e.x && t === e.y || s.requestAnimationFrame(f.bind(s, e))
                }

                function a(e, t, n) {
                    var r, o, i, a = u(),
                        e = e === c.body ? (o = (r = s).scrollX || s.pageXOffset, i = s.scrollY || s.pageYOffset, l.scroll) : (o = (r = e).scrollLeft, i = e.scrollTop, d);
                    f({
                        scrollable: r,
                        method: e,
                        startTime: a,
                        startX: o,
                        startY: i,
                        x: t,
                        y: n
                    })
                }
                void 0 === s && (s = window), "scrollBehavior" in (c = void 0 === c ? document : c).documentElement.style && !0 !== s.__forceSmoothScrollPolyfill__ || (t = s.HTMLElement || s.Element, l = {
                    scroll: s.scroll || s.scrollTo,
                    scrollBy: s.scrollBy,
                    elementScroll: t.prototype.scroll || d,
                    scrollIntoView: t.prototype.scrollIntoView
                }, u = s.performance && s.performance.now ? s.performance.now.bind(s.performance) : Date.now, e = s.navigator.userAgent, n = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(e) ? 1 : 0, s.scroll = s.scrollTo = function() {
                    void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? a.call(s, c.body, void 0 !== arguments[0].left ? ~~arguments[0].left : s.scrollX || s.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : s.scrollY || s.pageYOffset) : l.scroll.call(s, void 0 !== arguments[0].left ? arguments[0].left : "object" != Mt(arguments[0]) ? arguments[0] : s.scrollX || s.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : s.scrollY || s.pageYOffset))
                }, s.scrollBy = function() {
                    void 0 !== arguments[0] && (r(arguments[0]) ? l.scrollBy.call(s, void 0 !== arguments[0].left ? arguments[0].left : "object" != Mt(arguments[0]) ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : a.call(s, c.body, ~~arguments[0].left + (s.scrollX || s.pageXOffset), ~~arguments[0].top + (s.scrollY || s.pageYOffset)))
                }, t.prototype.scroll = t.prototype.scrollTo = function() {
                    if (void 0 !== arguments[0])
                        if (!0 !== r(arguments[0])) {
                            var e = arguments[0].left,
                                t = arguments[0].top;
                            a.call(this, this, void 0 === e ? this.scrollLeft : ~~e, void 0 === t ? this.scrollTop : ~~t)
                        } else {
                            if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                            l.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != Mt(arguments[0]) ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                        }
                }, t.prototype.scrollBy = function() {
                    void 0 !== arguments[0] && (!0 !== r(arguments[0]) ? this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    }) : l.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                }, t.prototype.scrollIntoView = function() {
                    var e, t, n;
                    !0 !== r(arguments[0]) ? (t = (e = function(e) {
                        for (; e !== c.body && !1 === function(e) {
                                var t = o(e, "Y") && i(e, "Y"),
                                    e = o(e, "X") && i(e, "X");
                                return t || e
                            }(e);) e = e.parentNode || e.host;
                        return e
                    }(this)).getBoundingClientRect(), n = this.getBoundingClientRect(), e !== c.body ? (a.call(this, e, e.scrollLeft + n.left - t.left, e.scrollTop + n.top - t.top), "fixed" !== s.getComputedStyle(e).position && s.scrollBy({
                        left: t.left,
                        top: t.top,
                        behavior: "smooth"
                    })) : s.scrollBy({
                        left: n.left,
                        top: n.top,
                        behavior: "smooth"
                    })) : l.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                })
            }
            c.prototype.addAction = function(e) {
                var t = this.findActionIndex(e);
                this.actions.splice(t, 0, e)
            }, c.prototype.addActions = function(e) {
                this.actions = this.actions.concat(e)
            }, c.prototype.start = function() {
                this.timeOffset = 0;
                var r = performance.now(),
                    o = this.actions,
                    i = this;
                this.raf = requestAnimationFrame(function e() {
                    var t = performance.now();
                    for (i.timeOffset += (t - r) * i.speed, r = t; o.length;) {
                        var n = o[0];
                        if (!(i.timeOffset >= n.delay)) break;
                        o.shift(), n.doAction()
                    }(0 < o.length || i.liveMode) && (i.raf = requestAnimationFrame(e))
                })
            }, c.prototype.clear = function() {
                this.raf && (cancelAnimationFrame(this.raf), this.raf = null), this.actions.length = 0
            }, c.prototype.setSpeed = function(e) {
                this.speed = e
            }, c.prototype.toggleLiveMode = function(e) {
                this.liveMode = e
            }, c.prototype.isActive = function() {
                return null !== this.raf
            }, c.prototype.findActionIndex = function(e) {
                for (var t = 0, n = this.actions.length - 1; t <= n;) {
                    var r = Math.floor((t + n) / 2);
                    if (this.actions[r].delay < e.delay) t = r + 1;
                    else {
                        if (!(this.actions[r].delay > e.delay)) return r + 1;
                        n = r - 1
                    }
                }
                return t
            };
            var s, ot = c;

            function c(e, t) {
                void 0 === e && (e = []), this.timeOffset = 0, this.raf = null, this.actions = e, this.speed = t
            }

            function it(e, t) {
                var n;
                if (e.type === Ee.EventType.IncrementalSnapshot && e.data.source === Ee.IncrementalSource.MouseMove) return n = e.data.positions[0].timeOffset, n = e.timestamp + n, e.delay = n - t;
                e.delay = e.timestamp - t, e.delay
            }

            function at(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r, o, i = n.call(e),
                    a = [];
                try {
                    for (;
                        (void 0 === t || 0 < t--) && !(r = i.next()).done;) a.push(r.value)
                } catch (e) {
                    o = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = i.return) && n.call(i)
                    } finally {
                        if (o) throw o.error
                    }
                }
                return a
            }(u = s = s || {})[u.NotStarted = 0] = "NotStarted", u[u.Running = 1] = "Running", u[u.Stopped = 2] = "Stopped";
            var st = {
                type: "xstate.init"
            };

            function ct(e) {
                return void 0 === e ? [] : [].concat(e)
            }

            function l(e) {
                return {
                    type: "xstate.assign",
                    assignment: e
                }
            }

            function lt(e, t) {
                return "string" == typeof(e = "string" == typeof e && t && t[e] ? t[e] : e) ? {
                    type: e
                } : "function" == typeof e ? {
                    type: e.name,
                    exec: e
                } : e
            }

            function ut(t) {
                return function(e) {
                    return t === e
                }
            }

            function dt(e) {
                return "string" == typeof e ? {
                    type: e
                } : e
            }

            function ft(e, t) {
                return {
                    value: e,
                    context: t,
                    actions: [],
                    changed: !1,
                    matches: ut(e)
                }
            }

            function pt(e, t, r) {
                var o = t,
                    i = !1;
                return [e.filter(function(t) {
                    var n;
                    return "xstate.assign" !== t.type || (i = !0, n = Object.assign({}, o), "function" == typeof t.assignment ? n = t.assignment(o, r) : Object.keys(t.assignment).forEach(function(e) {
                        n[e] = "function" == typeof t.assignment[e] ? t.assignment[e](o, r) : t.assignment[e]
                    }), o = n, !1)
                }), o, i]
            }

            function ht(T, t) {
                void 0 === t && (t = {});
                var e = at(pt(ct(T.states[T.initial].entry).map(function(e) {
                        return lt(e, t.actions)
                    }), T.context, st), 2),
                    n = e[0],
                    e = e[1],
                    C = {
                        config: T,
                        _options: t,
                        initialState: {
                            value: T.initial,
                            actions: n,
                            context: e,
                            matches: ut(T.initial)
                        },
                        transition: function(e, t) {
                            var n, r, e = "string" == typeof e ? {
                                    value: e,
                                    context: T.context
                                } : e,
                                o = e.value,
                                i = e.context,
                                a = dt(t),
                                s = T.states[o];
                            if (s.on) {
                                e = ct(s.on[a.type]);
                                try {
                                    for (var c = function(e) {
                                            var t = "function" == typeof Symbol && Symbol.iterator,
                                                n = t && e[t],
                                                r = 0;
                                            if (n) return n.call(e);
                                            if (e && "number" == typeof e.length) return {
                                                next: function() {
                                                    return {
                                                        value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                                                        done: !e
                                                    }
                                                }
                                            };
                                            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                                        }(e), l = c.next(); !l.done; l = c.next()) {
                                        var u = l.value;
                                        if (void 0 === u) return ft(o, i);
                                        var d, f, p, h, m, v = "string" == typeof u ? {
                                                target: u
                                            } : u,
                                            y = v.target,
                                            g = v.actions,
                                            b = void 0 === g ? [] : g,
                                            w = v.cond,
                                            S = void 0 === w ? function() {
                                                return !0
                                            } : w,
                                            E = void 0 === y,
                                            x = null != y ? y : o,
                                            I = T.states[x];
                                        if (S(i, a)) return f = (d = at(pt((E ? ct(b) : [].concat(s.exit, b, I.entry).filter(function(e) {
                                            return e
                                        })).map(function(e) {
                                            return lt(e, C._options.actions)
                                        }), i, a), 3))[0], p = d[1], h = d[2], {
                                            value: m = null != y ? y : o,
                                            context: p,
                                            actions: f,
                                            changed: y !== o || 0 < f.length || h,
                                            matches: ut(m)
                                        }
                                    }
                                } catch (e) {
                                    n = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        l && !l.done && (r = c.return) && r.call(c)
                                    } finally {
                                        if (n) throw n.error
                                    }
                                }
                            }
                            return ft(o, i)
                        }
                    };
                return C
            }
            var E, mt = function(t, n) {
                return t.actions.forEach(function(e) {
                    e = e.exec;
                    return e && e(t.context, n)
                })
            };

            function vt(t) {
                var n = t.initialState,
                    r = s.NotStarted,
                    o = new Set,
                    i = {
                        _machine: t,
                        send: function(e) {
                            r === s.Running && (n = t.transition(n, e), mt(n, dt(e)), o.forEach(function(e) {
                                return e(n)
                            }))
                        },
                        subscribe: function(e) {
                            return o.add(e), e(n), {
                                unsubscribe: function() {
                                    return o.delete(e)
                                }
                            }
                        },
                        start: function(e) {
                            return e && (e = "object" == Mt(e) ? e : {
                                context: t.config.context,
                                value: e
                            }, n = {
                                value: e.value,
                                actions: [],
                                context: e.context,
                                matches: ut(e.value)
                            }), r = s.Running, mt(n, st), i
                        },
                        stop: function() {
                            return r = s.Stopped, o.clear(), i
                        },
                        get state() {
                            return n
                        },
                        get status() {
                            return r
                        }
                    };
                return i
            }

            function yt(e, t) {
                var v = t.getCastFn,
                    y = t.applyEventsSynchronously,
                    g = t.emitter;
                return vt(ht({
                    id: "player",
                    context: e,
                    initial: "paused",
                    states: {
                        playing: {
                            on: {
                                PAUSE: {
                                    target: "paused",
                                    actions: ["pause"]
                                },
                                CAST_EVENT: {
                                    target: "playing",
                                    actions: "castEvent"
                                },
                                END: {
                                    target: "paused",
                                    actions: ["resetLastPlayedEvent", "pause"]
                                },
                                ADD_EVENT: {
                                    target: "playing",
                                    actions: ["addEvent"]
                                }
                            }
                        },
                        paused: {
                            on: {
                                PLAY: {
                                    target: "playing",
                                    actions: ["recordTimeOffset", "play"]
                                },
                                CAST_EVENT: {
                                    target: "paused",
                                    actions: "castEvent"
                                },
                                TO_LIVE: {
                                    target: "live",
                                    actions: ["startLive"]
                                },
                                ADD_EVENT: {
                                    target: "paused",
                                    actions: ["addEvent"]
                                }
                            }
                        },
                        live: {
                            on: {
                                ADD_EVENT: {
                                    target: "live",
                                    actions: ["addEvent"]
                                },
                                CAST_EVENT: {
                                    target: "live",
                                    actions: ["castEvent"]
                                }
                            }
                        }
                    }
                }, {
                    actions: {
                        castEvent: l({
                            lastPlayedEvent: function(e, t) {
                                return "CAST_EVENT" === t.type ? t.payload.event : e.lastPlayedEvent
                            }
                        }),
                        recordTimeOffset: l(function(e, t) {
                            var n = e.timeOffset;
                            return "payload" in t && "timeOffset" in t.payload && (n = t.payload.timeOffset), xe(xe({}, e), {
                                timeOffset: n,
                                baselineTime: e.events[0].timestamp + n
                            })
                        }),
                        play: function(e) {
                            var t, n, r, o, i = e.timer,
                                a = e.events,
                                s = e.baselineTime,
                                c = e.lastPlayedEvent;
                            i.clear();
                            try {
                                for (var l = Ie(a), u = l.next(); !u.done; u = l.next()) it(u.value, s)
                            } catch (e) {
                                t = {
                                    error: e
                                }
                            } finally {
                                try {
                                    u && !u.done && (o = l.return) && o.call(l)
                                } finally {
                                    if (t) throw t.error
                                }
                            }
                            var e = function(e, t) {
                                    for (var n = e.length - 1; 0 <= n; n--) {
                                        var r = e[n];
                                        if (r.type === Ee.EventType.Meta && r.timestamp <= t) return e.slice(n)
                                    }
                                    return e
                                }(a, s),
                                d = null == c ? void 0 : c.timestamp,
                                f = ((null == c ? void 0 : c.type) === Ee.EventType.IncrementalSnapshot && c.data.source === Ee.IncrementalSource.MouseMove && (d = c.timestamp + (null == (o = c.data.positions[0]) ? void 0 : o.timeOffset)), s < (d || 0) && g.emit(Ee.ReplayerEvents.PlayBack), new Array),
                                p = new Array;
                            try {
                                for (var h = Ie(e), m = h.next(); !m.done; m = h.next()) ! function(e) {
                                    if (d && d < s && (e.timestamp <= d || e === c)) return;
                                    var t;
                                    e.timestamp < s ? f.push(e) : (t = v(e, !1), p.push({
                                        doAction: function() {
                                            t()
                                        },
                                        delay: e.delay
                                    }))
                                }(m.value)
                            } catch (e) {
                                n = {
                                    error: e
                                }
                            } finally {
                                try {
                                    m && !m.done && (r = h.return) && r.call(h)
                                } finally {
                                    if (n) throw n.error
                                }
                            }
                            y(f), g.emit(Ee.ReplayerEvents.Flush), i.addActions(p), i.start()
                        },
                        pause: function(e) {
                            e.timer.clear()
                        },
                        resetLastPlayedEvent: l(function(e) {
                            return xe(xe({}, e), {
                                lastPlayedEvent: null
                            })
                        }),
                        startLive: l({
                            baselineTime: function(e, t) {
                                return e.timer.toggleLiveMode(!0), e.timer.start(), "TO_LIVE" === t.type && t.payload.baselineTime ? t.payload.baselineTime : Date.now()
                            }
                        }),
                        addEvent: l(function(e, t) {
                            var n = e.baselineTime,
                                r = e.timer,
                                o = e.events;
                            if ("ADD_EVENT" === t.type) {
                                var i = t.payload.event,
                                    a = (it(i, n), o.length - 1);
                                if (!o[a] || o[a].timestamp <= i.timestamp) o.push(i);
                                else {
                                    for (var t = -1, s = 0; s <= a;) {
                                        var c = Math.floor((s + a) / 2);
                                        o[c].timestamp <= i.timestamp ? s = c + 1 : a = c - 1
                                    } - 1 === t && (t = s), o.splice(t, 0, i)
                                }
                                var t = i.timestamp < n,
                                    l = v(i, t);
                                t ? l() : r.isActive() && r.addAction({
                                    doAction: function() {
                                        l()
                                    },
                                    delay: i.delay
                                })
                            }
                            return xe(xe({}, e), {
                                events: o
                            })
                        })
                    }
                }))
            }

            function x(e, t) {
                e = e[t[0]];
                return 1 === t.length ? e : x(e.cssRules[t[1]].cssRules, t.slice(2))
            }

            function gt(e) {
                var e = Ce(e),
                    t = e.pop();
                return {
                    positions: e,
                    index: t
                }
            }

            function bt(e, d) {
                var f = d.sheet;
                f && e.forEach(function(e) {
                    if (e.type === E.Insert) try {
                        var t;
                        Array.isArray(e.index) ? (r = (t = gt(e.index)).positions, o = t.index, x(f.cssRules, r).insertRule(e.cssText, o)) : f.insertRule(e.cssText, e.index)
                    } catch (e) {} else if (e.type === E.Remove) try {
                        var n, r, o;
                        Array.isArray(e.index) ? (r = (n = gt(e.index)).positions, o = n.index, x(f.cssRules, r).deleteRule(o || 0)) : f.deleteRule(e.index)
                    } catch (e) {} else if (e.type === E.Snapshot) {
                        var i, a = e.cssTexts,
                            s = d;
                        try {
                            var c = Array.from((null == (i = s.sheet) ? void 0 : i.cssRules) || []).map(function(e) {
                                    return e.cssText
                                }),
                                l = Object.entries(c).reverse(),
                                u = c.length;
                            l.forEach(function(e) {
                                var t, e = Te(e, 2),
                                    n = e[0],
                                    e = e[1],
                                    e = a.indexOf(e);
                                if (-1 === e || u < e) try {
                                    null != (t = s.sheet) && t.deleteRule(Number(n))
                                } catch (e) {}
                                u = e
                            }), a.forEach(function(e, t) {
                                var n, r, o;
                                try {
                                    (null == (r = null == (n = s.sheet) ? void 0 : n.cssRules[t]) ? void 0 : r.cssText) === e || null != (o = s.sheet) && o.insertRule(e, t)
                                } catch (e) {}
                            })
                        } catch (a) {}
                    } else e.type === E.SetProperty ? x(f.cssRules, e.index).style.setProperty(e.property, e.value, e.priority) : e.type === E.RemoveProperty && x(f.cssRules, e.index).style.removeProperty(e.property)
                })
            }(u = E = E || {})[u.Insert = 0] = "Insert", u[u.Remove = 1] = "Remove", u[u.Snapshot = 2] = "Snapshot", u[u.SetProperty = 3] = "SetProperty", u[u.RemoveProperty = 4] = "RemoveProperty";
            var wt = new Map;

            function St(e, t) {
                var n = wt.get(e);
                return n || (n = new Map, wt.set(e, n)), n.has(t) || n.set(t, []), n.get(t)
            }
            var Et = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject"];

            function xt(f, p) {
                return function(e) {
                    if (e && "object" == Mt(e) && "rr_type" in e) {
                        var t;
                        if ("index" in e) return s = e.rr_type, t = e.index, St(p, s)[t];
                        if ("args" in e) return s = e.rr_type, t = e.args, new((s = window[s]).bind.apply(s, Ce([void 0], t.map(xt(f, p)))));
                        if ("base64" in e) {
                            var n = e.base64;
                            for (var r, o, i, a, s = .75 * n.length, c = n.length, l = 0, s = ("=" === n[n.length - 1] && (s--, "=" === n[n.length - 2]) && s--, new ArrayBuffer(s)), u = new Uint8Array(s), d = 0; d < c; d += 4) r = be[n.charCodeAt(d)], o = be[n.charCodeAt(d + 1)], i = be[n.charCodeAt(d + 2)], a = be[n.charCodeAt(d + 3)], u[l++] = r << 2 | o >> 4, u[l++] = (15 & o) << 4 | i >> 2, u[l++] = (3 & i) << 6 | 63 & a;
                            return s;
                            return
                        }
                        if ("src" in e) return f.get(e.src) || ((t = new Image).src = e.src, f.set(e.src, t), t)
                    } else if (Array.isArray(e)) return e.map(xt(f, p));
                    return e
                }
            }
            var It = nt,
                Tt = "[replayer]",
                Ct = {
                    duration: 500,
                    lineCap: "round",
                    lineWidth: 3,
                    strokeStyle: "red"
                };

            function _t(e) {
                return e.type == Ee.EventType.IncrementalSnapshot && (e.data.source == Ee.IncrementalSource.TouchMove || e.data.source == Ee.IncrementalSource.MouseInteraction && e.data.type == Ee.MouseInteractions.TouchStart)
            }
            Object.defineProperty(d.prototype, "timer", {
                get: function() {
                    return this.service.state.context.timer
                },
                enumerable: !1,
                configurable: !0
            }), d.prototype.on = function(e, t) {
                return this.emitter.on(e, t), this
            }, d.prototype.off = function(e, t) {
                return this.emitter.off(e, t), this
            }, d.prototype.setConfig = function(t) {
                var n = this;
                Object.keys(t).forEach(function(e) {
                    n.config[e] = t[e]
                }), this.config.skipInactive || this.backToNormal(), void 0 !== t.speed && this.speedService.send({
                    type: "SET_SPEED",
                    payload: {
                        speed: t.speed
                    }
                }), void 0 !== t.mouseTail && (!1 === t.mouseTail ? this.mouseTail && (this.mouseTail.style.display = "none") : (this.mouseTail || (this.mouseTail = document.createElement("canvas"), this.mouseTail.width = Number.parseFloat(this.iframe.width), this.mouseTail.height = Number.parseFloat(this.iframe.height), this.mouseTail.classList.add("replayer-mouse-tail"), this.wrapper.insertBefore(this.mouseTail, this.iframe)), this.mouseTail.style.display = "inherit"))
            }, d.prototype.getMetaData = function() {
                var e = this.service.state.context.events[0],
                    t = this.service.state.context.events[this.service.state.context.events.length - 1];
                return {
                    startTime: e.timestamp,
                    endTime: t.timestamp,
                    totalTime: t.timestamp - e.timestamp
                }
            }, d.prototype.getCurrentTime = function() {
                return this.timer.timeOffset + this.getTimeOffset()
            }, d.prototype.getTimeOffset = function() {
                var e = this.service.state.context;
                return e.baselineTime - e.events[0].timestamp
            }, d.prototype.getMirror = function() {
                return this.mirror
            }, d.prototype.play = function(e) {
                void 0 === e && (e = 0), this.service.state.matches("paused") || this.service.send({
                    type: "PAUSE"
                }), this.service.send({
                    type: "PLAY",
                    payload: {
                        timeOffset: e
                    }
                }), null != (e = this.iframe.contentDocument) && e.getElementsByTagName("html")[0].classList.remove("rrweb-paused"), this.emitter.emit(Ee.ReplayerEvents.Start)
            }, d.prototype.pause = function(e) {
                void 0 === e && this.service.state.matches("playing") && this.service.send({
                    type: "PAUSE"
                }), "number" == typeof e && (this.play(e), this.service.send({
                    type: "PAUSE"
                })), null != (e = this.iframe.contentDocument) && e.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(Ee.ReplayerEvents.Pause)
            }, d.prototype.resume = function(e) {
                void 0 === e && (e = 0), console.warn("The 'resume' will be departed in 1.0. Please use 'play' method which has the same interface."), this.play(e), this.emitter.emit(Ee.ReplayerEvents.Resume)
            }, d.prototype.startLive = function(e) {
                this.service.send({
                    type: "TO_LIVE",
                    payload: {
                        baselineTime: e
                    }
                })
            }, d.prototype.addEvent = function(e) {
                var t = this,
                    n = this.config.unpackFn ? this.config.unpackFn(e) : e;
                _t(n) && this.mouse.classList.add("touch-device"), Promise.resolve().then(function() {
                    return t.service.send({
                        type: "ADD_EVENT",
                        payload: {
                            event: n
                        }
                    })
                })
            }, d.prototype.enableInteract = function() {
                this.iframe.setAttribute("scrolling", "auto"), this.iframe.style.pointerEvents = "auto"
            }, d.prototype.disableInteract = function() {
                this.iframe.setAttribute("scrolling", "no"), this.iframe.style.pointerEvents = "none"
            }, d.prototype.resetCache = function() {
                this.cache = M()
            }, d.prototype.setupDom = function() {
                this.wrapper = document.createElement("div"), this.wrapper.classList.add("replayer-wrapper"), this.config.root.appendChild(this.wrapper), this.mouse = document.createElement("div"), this.mouse.classList.add("replayer-mouse"), this.wrapper.appendChild(this.mouse), !1 !== this.config.mouseTail && (this.mouseTail = document.createElement("canvas"), this.mouseTail.classList.add("replayer-mouse-tail"), this.mouseTail.style.display = "inherit", this.wrapper.appendChild(this.mouseTail)), this.iframe = document.createElement("iframe");
                var e = ["allow-same-origin"];
                this.config.UNSAFE_replayCanvas && e.push("allow-scripts"), this.iframe.style.display = "none", this.iframe.setAttribute("sandbox", e.join(" ")), this.disableInteract(), this.wrapper.appendChild(this.iframe), this.iframe.contentWindow && this.iframe.contentDocument && (rt(this.iframe.contentWindow, this.iframe.contentDocument), ee(this.iframe.contentWindow))
            }, d.prototype.handleResize = function(e) {
                var t, n;
                this.iframe.style.display = "inherit";
                try {
                    for (var r = Ie([this.mouseTail, this.iframe]), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        i && (i.setAttribute("width", String(e.width)), i.setAttribute("height", String(e.height)))
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, d.prototype.applyEventsSynchronously = function(e) {
                var t, n;
                try {
                    for (var r = Ie(e), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        switch (i.type) {
                            case Ee.EventType.DomContentLoaded:
                            case Ee.EventType.Load:
                            case Ee.EventType.Custom:
                                continue;
                            case Ee.EventType.FullSnapshot:
                            case Ee.EventType.Meta:
                            case Ee.EventType.Plugin:
                                break;
                            case Ee.EventType.IncrementalSnapshot:
                                if (i.data.source === Ee.IncrementalSource.MediaInteraction) continue
                        }
                        this.getCastFn(i, !0)()
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                this.mousePos && this.moveAndHover(this.mousePos.x, this.mousePos.y, this.mousePos.id, !0, this.mousePos.debugData), !(this.mousePos = null) === this.touchActive ? this.mouse.classList.add("touch-active") : !1 === this.touchActive && this.mouse.classList.remove("touch-active"), this.touchActive = null
            }, d.prototype.getCastFn = function(a, s) {
                var c, l = this;
                switch (void 0 === s && (s = !1), a.type) {
                    case Ee.EventType.DomContentLoaded:
                    case Ee.EventType.Load:
                        break;
                    case Ee.EventType.Custom:
                        c = function() {
                            l.emitter.emit(Ee.ReplayerEvents.CustomEvent, a)
                        };
                        break;
                    case Ee.EventType.Meta:
                        c = function() {
                            return l.emitter.emit(Ee.ReplayerEvents.Resize, {
                                width: a.data.width,
                                height: a.data.height
                            })
                        };
                        break;
                    case Ee.EventType.FullSnapshot:
                        c = function() {
                            if (l.firstFullSnapshot) {
                                if (l.firstFullSnapshot === a) return void(l.firstFullSnapshot = !0)
                            } else l.firstFullSnapshot = !0;
                            l.rebuildFullSnapshot(a, s), l.iframe.contentWindow.scrollTo(a.data.initialOffset)
                        };
                        break;
                    case Ee.EventType.IncrementalSnapshot:
                        c = function() {
                            var e, t;
                            if (l.applyIncremental(a, s), !s && (a === l.nextUserInteractionEvent && (l.nextUserInteractionEvent = null, l.backToNormal()), l.config.skipInactive) && !l.nextUserInteractionEvent) {
                                try {
                                    for (var n = Ie(l.service.state.context.events), r = n.next(); !r.done; r = n.next()) {
                                        var o = r.value;
                                        if (!(o.timestamp <= a.timestamp) && l.isUserInteraction(o)) {
                                            o.delay - a.delay > 1e4 * l.speedService.state.context.timer.speed && (l.nextUserInteractionEvent = o);
                                            break
                                        }
                                    }
                                } catch (e) {
                                    t = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        r && !r.done && (e = n.return) && e.call(n)
                                    } finally {
                                        if (t) throw t.error
                                    }
                                }
                                l.nextUserInteractionEvent && (e = l.nextUserInteractionEvent.delay - a.delay, t = {
                                    speed: Math.min(Math.round(e / 5e3), l.config.maxSpeed)
                                }, l.speedService.send({
                                    type: "FAST_FORWARD",
                                    payload: t
                                }), l.emitter.emit(Ee.ReplayerEvents.SkipStart, t))
                            }
                        }
                }
                return function() {
                    var t, e;
                    c && c();
                    try {
                        for (var n = Ie(l.config.plugins || []), r = n.next(); !r.done; r = n.next()) r.value.handler(a, s, {
                            replayer: l
                        })
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (e = n.return) && e.call(n)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                    l.service.send({
                        type: "CAST_EVENT",
                        payload: {
                            event: a
                        }
                    });
                    var o, i = l.service.state.context.events.length - 1;
                    a === l.service.state.context.events[i] && (o = function() {
                        i < l.service.state.context.events.length - 1 || (l.backToNormal(), l.service.send("END"), l.emitter.emit(Ee.ReplayerEvents.Finish))
                    }, a.type === Ee.EventType.IncrementalSnapshot && a.data.source === Ee.IncrementalSource.MouseMove && a.data.positions.length ? setTimeout(function() {
                        o()
                    }, Math.max(0, 50 - a.data.positions[0].timeOffset)) : o()), l.emitter.emit(Ee.ReplayerEvents.EventCast, a)
                }
            }, d.prototype.rebuildFullSnapshot = function(e, t) {
                var n = this;
                if (void 0 === t && (t = !1), !this.iframe.contentDocument) return console.warn("Looks like your replayer has been destroyed.");
                Object.keys(this.legacy_missingNodeRetryMap).length && console.warn("Found unresolved missing node map", this.legacy_missingNodeRetryMap), this.legacy_missingNodeRetryMap = {};
                var r = [],
                    o = (this.mirror.map = J(e.data.node, {
                        doc: this.iframe.contentDocument,
                        afterAppend: function(e) {
                            n.collectIframeAndAttachDocument(r, e)
                        },
                        cache: this.cache
                    })[1], this);
                try {
                    for (var i = Ie(r), a = i.next(); !a.done; a = i.next()) {
                        var s = a.value;
                        ! function(t, e) {
                            o.attachDocumentToIframe(t, e), o.newDocumentQueue = o.newDocumentQueue.filter(function(e) {
                                return e !== t
                            })
                        }(s.mutationInQueue, s.builtNode)
                    }
                } catch (e) {
                    l = {
                        error: e
                    }
                } finally {
                    try {
                        a && !a.done && (c = i.return) && c.call(i)
                    } finally {
                        if (l) throw l.error
                    }
                }
                var c = this.iframe.contentDocument,
                    l = c.documentElement,
                    c = c.head;
                this.insertStyleRules(l, c), this.service.state.matches("playing") || this.iframe.contentDocument.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(Ee.ReplayerEvents.FullsnapshotRebuilded, e), t || this.waitForStylesheetLoad(), this.config.UNSAFE_replayCanvas && this.preloadAllImages()
            }, d.prototype.insertStyleRules = function(e, t) {
                var n = document.createElement("style");
                e.insertBefore(n, t);
                var r = ["." + this.config.blockClass + " { background: currentColor }", "noscript { display: none !important; }"].concat(this.config.insertStyleRules);
                this.config.pauseAnimation && r.push("html.rrweb-paused *, html.rrweb-paused *:before, html.rrweb-paused *:after { animation-play-state: paused !important; }");
                for (var o = 0; o < r.length; o++) n.sheet.insertRule(r[o], o)
            }, d.prototype.attachDocumentToIframe = function(e, n) {
                var t, r, o = this,
                    i = [];
                if (!n.contentDocument)
                    for (var a = n.parentNode; a;) {
                        if (this.fragmentParentMap.has(a)) {
                            var s = a,
                                c = this.fragmentParentMap.get(s);
                            this.restoreRealParent(s, c);
                            break
                        }
                        a = a.parentNode
                    }
                K(e.node, {
                    doc: n.contentDocument,
                    map: this.mirror.map,
                    hackCss: !0,
                    skipChild: !1,
                    afterAppend: function(e) {
                        var t;
                        o.collectIframeAndAttachDocument(i, e), e.__sn.type === N.Element && "HTML" === e.__sn.tagName.toUpperCase() && (t = (e = n.contentDocument).documentElement, e = e.head, o.insertStyleRules(t, e))
                    },
                    cache: this.cache
                });
                var l = this;
                try {
                    for (var u = Ie(i), d = u.next(); !d.done; d = u.next()) {
                        var f = d.value;
                        ! function(t, e) {
                            l.attachDocumentToIframe(t, e), l.newDocumentQueue = l.newDocumentQueue.filter(function(e) {
                                return e !== t
                            })
                        }(f.mutationInQueue, f.builtNode)
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        d && !d.done && (r = u.return) && r.call(u)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, d.prototype.collectIframeAndAttachDocument = function(e, t) {
                var n;
                B(t) && (n = this.newDocumentQueue.find(function(e) {
                    return e.parentId === t.__sn.id
                })) && e.push({
                    mutationInQueue: n,
                    builtNode: t
                })
            }, d.prototype.waitForStylesheetLoad = function() {
                var t, n, r, e, o, i = this,
                    a = null == (a = this.iframe.contentDocument) ? void 0 : a.head;
                a && (n = new Set, r = this.service.state, e = function() {
                    r = i.service.state
                }, this.emitter.on(Ee.ReplayerEvents.Start, e), this.emitter.on(Ee.ReplayerEvents.Pause, e), o = function() {
                    i.emitter.off(Ee.ReplayerEvents.Start, e), i.emitter.off(Ee.ReplayerEvents.Pause, e)
                }, a.querySelectorAll('link[rel="stylesheet"]').forEach(function(e) {
                    e.sheet || (n.add(e), e.addEventListener("load", function() {
                        n.delete(e), 0 === n.size && -1 !== t && (r.matches("playing") && i.play(i.getCurrentTime()), i.emitter.emit(Ee.ReplayerEvents.LoadStylesheetEnd), t && clearTimeout(t), o())
                    }))
                }), 0 < n.size) && (this.service.send({
                    type: "PAUSE"
                }), this.emitter.emit(Ee.ReplayerEvents.LoadStylesheetStart), t = setTimeout(function() {
                    r.matches("playing") && i.play(i.getCurrentTime()), t = -1, o()
                }, this.config.loadTimeout))
            }, d.prototype.hasImageArg = function(e) {
                var t, n;
                try {
                    for (var r = Ie(e), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        if (i && "object" == Mt(i))
                            if ("rr_type" in i && "args" in i) {
                                if (this.hasImageArg(i.args)) return !0
                            } else {
                                if ("rr_type" in i && "HTMLImageElement" === i.rr_type) return !0;
                                if (i instanceof Array && this.hasImageArg(i)) return !0
                            }
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return !1
            }, d.prototype.getImageArgs = function(e) {
                var t, n, r = [];
                try {
                    for (var o = Ie(e), i = o.next(); !i.done; i = o.next()) {
                        var a = i.value;
                        a && "object" == Mt(a) && ("rr_type" in a && "args" in a ? r.push.apply(r, Ce(this.getImageArgs(a.args))) : "rr_type" in a && "HTMLImageElement" === a.rr_type ? r.push(a.src) : a instanceof Array && r.push.apply(r, Ce(this.getImageArgs(a))))
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        i && !i.done && (n = o.return) && n.call(o)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return r
            }, d.prototype.preloadAllImages = function() {
                function e() {
                    r.service.state
                }
                var t, n, r = this,
                    o = (this.service.state, this.emitter.on(Ee.ReplayerEvents.Start, e), this.emitter.on(Ee.ReplayerEvents.Pause, e), this);
                try {
                    for (var i = Ie(this.service.state.context.events), a = i.next(); !a.done; a = i.next()) ! function(t) {
                        t.type === Ee.EventType.IncrementalSnapshot && t.data.source === Ee.IncrementalSource.CanvasMutation && ("commands" in t.data ? t.data.commands.forEach(function(e) {
                            return r.preloadImages(e, t)
                        }) : o.preloadImages(t.data, t))
                    }(a.value)
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        a && !a.done && (n = i.return) && n.call(i)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, d.prototype.preloadImages = function(e, t) {
                var n, r = this;
                "drawImage" !== e.property || "string" != typeof e.args[0] || this.imageMap.has(t) ? this.hasImageArg(e.args) && this.getImageArgs(e.args).forEach(function(e) {
                    var t = new Image;
                    t.src = e, r.imageMap.set(e, t)
                }) : (null != (t = null == (n = (t = document.createElement("canvas")).getContext("2d")) ? void 0 : n.createImageData(t.width, t.height)) && t.data, JSON.parse(e.args[0]), null != n && n.putImageData(t, 0, 0))
            }, d.prototype.applyIncremental = function(n, r) {
                var e, t, o = this,
                    i = n.data;
                switch (i.source) {
                    case Ee.IncrementalSource.Mutation:
                        r && (i.adds.forEach(function(e) {
                            return o.treeIndex.add(e)
                        }), i.texts.forEach(function(e) {
                            return o.treeIndex.text(e)
                        }), i.attributes.forEach(function(e) {
                            return o.treeIndex.attribute(e)
                        }), i.removes.forEach(function(e) {
                            return o.treeIndex.remove(e, o.mirror)
                        }));
                        try {
                            this.applyMutation(i, r)
                        } catch (e) {
                            this.warn("Exception in mutation " + (e.message || e), i)
                        }
                        break;
                    case Ee.IncrementalSource.Drag:
                    case Ee.IncrementalSource.TouchMove:
                    case Ee.IncrementalSource.MouseMove:
                        r ? (c = i.positions[i.positions.length - 1], this.mousePos = {
                            x: c.x,
                            y: c.y,
                            id: c.id,
                            debugData: i
                        }) : (i.positions.forEach(function(e) {
                            var t = {
                                doAction: function() {
                                    o.moveAndHover(e.x, e.y, e.id, r, i)
                                },
                                delay: e.timeOffset + n.timestamp - o.service.state.context.baselineTime
                            };
                            o.timer.addAction(t)
                        }), this.timer.addAction({
                            doAction: function() {},
                            delay: n.delay - (null == (c = i.positions[0]) ? void 0 : c.timeOffset)
                        }));
                        break;
                    case Ee.IncrementalSource.MouseInteraction:
                        if (-1 !== i.id) {
                            var a = new Event(Ee.MouseInteractions[i.type].toLowerCase());
                            if (!(t = this.mirror.getNode(i.id))) return this.debugNodeNotFound(i, i.id);
                            this.emitter.emit(Ee.ReplayerEvents.MouseInteraction, {
                                type: i.type,
                                target: t
                            });
                            var s = this.config.triggerFocus;
                            switch (i.type) {
                                case Ee.MouseInteractions.Blur:
                                    "blur" in t && t.blur();
                                    break;
                                case Ee.MouseInteractions.Focus:
                                    s && t.focus && t.focus({
                                        preventScroll: !0
                                    });
                                    break;
                                case Ee.MouseInteractions.Click:
                                case Ee.MouseInteractions.TouchStart:
                                case Ee.MouseInteractions.TouchEnd:
                                    r ? (i.type === Ee.MouseInteractions.TouchStart ? this.touchActive = !0 : i.type === Ee.MouseInteractions.TouchEnd && (this.touchActive = !1), this.mousePos = {
                                        x: i.x,
                                        y: i.y,
                                        id: i.id,
                                        debugData: i
                                    }) : (i.type === Ee.MouseInteractions.TouchStart && (this.tailPositions.length = 0), this.moveAndHover(i.x, i.y, i.id, r, i), i.type === Ee.MouseInteractions.Click ? (this.mouse.classList.remove("active"), this.mouse.offsetWidth, this.mouse.classList.add("active")) : i.type === Ee.MouseInteractions.TouchStart ? (this.mouse.offsetWidth, this.mouse.classList.add("touch-active")) : i.type === Ee.MouseInteractions.TouchEnd && this.mouse.classList.remove("touch-active"));
                                    break;
                                case Ee.MouseInteractions.TouchCancel:
                                    r ? this.touchActive = !1 : this.mouse.classList.remove("touch-active");
                                    break;
                                default:
                                    t.dispatchEvent(a)
                            }
                        }
                        break;
                    case Ee.IncrementalSource.Scroll:
                        -1 !== i.id && (r ? this.treeIndex.scroll(i) : this.applyScroll(i, !1));
                        break;
                    case Ee.IncrementalSource.ViewportResize:
                        this.emitter.emit(Ee.ReplayerEvents.Resize, {
                            width: i.width,
                            height: i.height
                        });
                        break;
                    case Ee.IncrementalSource.Input:
                        -1 !== i.id && (r ? this.treeIndex.input(i) : this.applyInput(i));
                        break;
                    case Ee.IncrementalSource.MediaInteraction:
                        if (!(t = this.mirror.getNode(i.id))) return this.debugNodeNotFound(i, i.id);
                        var c = t;
                        try {
                            i.currentTime && (c.currentTime = i.currentTime), i.volume && (c.volume = i.volume), i.muted && (c.muted = i.muted), 1 === i.type && c.pause(), 0 === i.type && c.play()
                        } catch (e) {
                            this.config.showWarning && console.warn("Failed to replay media interactions: " + (e.message || e))
                        }
                        break;
                    case Ee.IncrementalSource.StyleSheetRule:
                        if (!(t = this.mirror.getNode(i.id))) return this.debugNodeNotFound(i, i.id);
                        var l, u = t,
                            c = t.parentNode,
                            d = this.fragmentParentMap.has(c),
                            f = d ? null : u.sheet;
                        f || (this.virtualStyleRulesMap.has(t) ? l = this.virtualStyleRulesMap.get(t) : (l = [], this.virtualStyleRulesMap.set(t, l))), i.adds && i.adds.forEach(function(e) {
                            var t, n, r, o = e.rule,
                                i = e.index;
                            if (f) try {
                                (Array.isArray(i) ? (n = (t = gt(i)).positions, r = t.index, x(f.cssRules, n)) : (r = void 0 === i ? void 0 : Math.min(i, f.cssRules.length), f)).insertRule(o, r)
                            } catch (e) {} else null != l && l.push({
                                cssText: o,
                                index: i,
                                type: E.Insert
                            })
                        }), i.removes && i.removes.forEach(function(e) {
                            var t, n, r, o = e.index;
                            if (d) null != l && l.push({
                                index: o,
                                type: E.Remove
                            });
                            else try {
                                Array.isArray(o) ? (n = (t = gt(o)).positions, r = t.index, x(f.cssRules, n).deleteRule(r || 0)) : null != f && f.deleteRule(o)
                            } catch (e) {}
                        });
                        break;
                    case Ee.IncrementalSource.StyleDeclaration:
                        if (!(t = this.mirror.getNode(i.id))) return this.debugNodeNotFound(i, i.id);
                        u = t, c = t.parentNode, c = this.fragmentParentMap.has(c) ? null : u.sheet, u = [];
                        c || (this.virtualStyleRulesMap.has(t) ? u = this.virtualStyleRulesMap.get(t) : this.virtualStyleRulesMap.set(t, u = [])), i.set && (c ? x(c.rules, i.index).style.setProperty(i.set.property, i.set.value, i.set.priority) : u.push(xe({
                            type: E.SetProperty,
                            index: i.index
                        }, i.set))), i.remove && (c ? x(c.rules, i.index).style.removeProperty(i.remove.property) : u.push(xe({
                            type: E.RemoveProperty,
                            index: i.index
                        }, i.remove)));
                        break;
                    case Ee.IncrementalSource.CanvasMutation:
                        if (this.config.UNSAFE_replayCanvas) {
                            if (!(t = this.mirror.getNode(i.id))) return this.debugNodeNotFound(i, i.id);
                            var p = {
                                    event: n,
                                    mutation: i,
                                    target: t,
                                    imageMap: this.imageMap,
                                    errorHandler: this.warnCanvasMutationFailed.bind(this)
                                },
                                h = p.event,
                                m = p.mutation,
                                v = p.target,
                                y = p.imageMap,
                                g = p.errorHandler;
                            try {
                                var b = "commands" in m ? m.commands : [m];
                                [S.WebGL, S.WebGL2].includes(m.type) ? b.forEach(function(e) {
                                    var t, n, r, o = {
                                            mutation: e,
                                            type: m.type,
                                            target: v,
                                            imageMap: y,
                                            errorHandler: g
                                        },
                                        e = o.mutation,
                                        i = o.target,
                                        a = o.type,
                                        s = o.imageMap,
                                        c = o.errorHandler;
                                    try {
                                        var l, u, d = function(e, t) {
                                            try {
                                                return t === S.WebGL ? e.getContext("webgl") || e.getContext("experimental-webgl") : e.getContext("webgl2")
                                            } catch (e) {
                                                return null
                                            }
                                        }(i, a);
                                        if (d) e.setter ? d[e.property] = e.args[0] : (l = d[e.property], u = e.args.map(xt(s, d)), t = d, null != (n = l.apply(d, u)) && n.constructor && (r = n.constructor.name, Et.includes(r)) && !(t = St(t, r)).includes(n) && t.push(n))
                                    } catch (o) {
                                        c(e, o)
                                    }
                                }) : b.forEach(function(e) {
                                    var t = {
                                            event: h,
                                            mutation: e,
                                            target: v,
                                            imageMap: y,
                                            errorHandler: g
                                        },
                                        e = t.event,
                                        n = t.mutation,
                                        r = t.target,
                                        o = t.imageMap,
                                        i = t.errorHandler;
                                    try {
                                        var a = r.getContext("2d");
                                        if (n.setter) return void(a[n.property] = n.args[0]);
                                        var s, c = a[n.property];
                                        "drawImage" === n.property && "string" == typeof n.args[0] && (s = o.get(e), n.args[0] = s), c.apply(a, n.args)
                                    } catch (t) {
                                        i(n, t)
                                    }
                                })
                            } catch (p) {
                                g(m, p)
                            }
                        }
                        break;
                    case Ee.IncrementalSource.Font:
                        try {
                            var w = new FontFace(i.family, i.buffer ? new Uint8Array(JSON.parse(i.fontSource)) : i.fontSource, i.descriptors);
                            null != (e = this.iframe.contentDocument) && e.fonts.add(w)
                        } catch (e) {
                            this.config.showWarning && console.warn(e)
                        }
                }
            }, d.prototype.applyMutation = function(c, m) {
                function t(e) {
                    var t, n;
                    if (!v.iframe.contentDocument) return console.warn("Looks like your replayer has been destroyed.");
                    var r = v.mirror.getNode(e.parentId);
                    if (!r) return (e.node.type === N.Document ? v.newDocumentQueue : g).push(e);
                    var o = null,
                        i = (v.iframe.contentDocument.contains ? o = v.iframe.contentDocument.contains(r) : v.iframe.contentDocument.body.contains && (o = v.iframe.contentDocument.body.contains(r)), 0 < (null == (i = (c = r).getElementsByTagName) ? void 0 : i.call(c, "iframe").length));
                    if (m && o && !B(r) && !i) {
                        var a = document.createDocumentFragment();
                        for (v.mirror.map[e.parentId] = a, v.fragmentParentMap.set(a, r), v.storeState(r); r.firstChild;) a.appendChild(r.firstChild);
                        r = a
                    }
                    e.node.isShadow && U(r) && (r = r.shadowRoot);
                    var s, i, c = null,
                        o = null;
                    if (e.previousId && (c = v.mirror.getNode(e.previousId)), e.nextId && (o = v.mirror.getNode(e.nextId)), i = null, (s = e).nextId && (i = v.mirror.getNode(s.nextId)), null !== s.nextId && void 0 !== s.nextId && -1 !== s.nextId && !i) return g.push(e);
                    if (!e.node.rootId || v.mirror.getNode(e.node.rootId)) {
                        var l = e.node.rootId ? v.mirror.getNode(e.node.rootId) : v.iframe.contentDocument;
                        if (B(r)) v.attachDocumentToIframe(e, r);
                        else {
                            var u, d = K(e.node, {
                                doc: l,
                                map: v.mirror.map,
                                skipChild: !0,
                                hackCss: !0,
                                cache: v.cache
                            });
                            if (-1 !== e.previousId && -1 !== e.nextId) {
                                if ("__sn" in r && r.__sn.type === N.Element && "textarea" === r.__sn.tagName && e.node.type === N.Text) try {
                                    for (var f = Ie(Array.from(r.childNodes)), p = f.next(); !p.done; p = f.next()) {
                                        var h = p.value;
                                        h.nodeType === r.TEXT_NODE && r.removeChild(h)
                                    }
                                } catch (e) {
                                    t = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        p && !p.done && (n = f.return) && n.call(f)
                                    } finally {
                                        if (t) throw t.error
                                    }
                                }
                                if (c && c.nextSibling && c.nextSibling.parentNode) r.insertBefore(d, c.nextSibling);
                                else if (o && o.parentNode) r.contains(o) ? r.insertBefore(d, o) : r.insertBefore(d, null);
                                else {
                                    if (r === l)
                                        for (; l.firstChild;) l.removeChild(l.firstChild);
                                    r.appendChild(d)
                                }
                                B(d) && (u = v.newDocumentQueue.find(function(e) {
                                    return e.parentId === d.__sn.id
                                })) && (v.attachDocumentToIframe(u, d), v.newDocumentQueue = v.newDocumentQueue.filter(function(e) {
                                    return e !== u
                                })), (e.previousId || e.nextId) && v.legacy_resolveMissingNode(y, r, d, e)
                            } else y[e.node.id] = {
                                node: d,
                                mutation: e
                            }
                        }
                    }
                }
                var e, n, v = this,
                    y = (c.removes.forEach(function(t) {
                        var e = v.mirror.getNode(t.id);
                        if (!e) return c.removes.find(function(e) {
                            return e.id === t.parentId
                        }) ? void 0 : v.warnNodeNotFound(c, t.id);
                        v.virtualStyleRulesMap.has(e) && v.virtualStyleRulesMap.delete(e);
                        var n = v.mirror.getNode(t.parentId);
                        if (!n) return v.warnNodeNotFound(c, t.parentId);
                        if (t.isShadow && U(n) && (n = n.shadowRoot), v.mirror.removeNodeFromMap(e), n) {
                            var r = null,
                                o = "__sn" in n ? v.fragmentParentMap.get(n) : void 0;
                            o && o.contains(e) ? n = o : v.fragmentParentMap.has(e) && (r = v.fragmentParentMap.get(e), v.fragmentParentMap.delete(e), e = r);
                            try {
                                n.removeChild(e)
                            } catch (t) {
                                if (!(t instanceof DOMException)) throw t;
                                v.warn("parent could not remove child in mutation", n, o, e, r, c)
                            }
                        }
                    }), xe({}, this.legacy_missingNodeRetryMap)),
                    g = [];
                c.adds.forEach(function(e) {
                    t(e)
                });
                for (var r = Date.now(); g.length;) {
                    var o = ne(g);
                    if (g.length = 0, 500 < Date.now() - r) {
                        this.warn("Timeout in the loop, please check the resolve tree data:", o);
                        break
                    }
                    try {
                        e = void 0;
                        for (var i = Ie(o), a = i.next(); !a.done; a = i.next()) {
                            var s = a.value;
                            this.mirror.getNode(s.value.parentId) ? re(s, function(e) {
                                t(e)
                            }) : this.debug("Drop resolve tree since there is no parent for the root node.", s)
                        }
                    } catch (c) {
                        e = {
                            error: c
                        }
                    } finally {
                        try {
                            a && !a.done && (n = i.return) && n.call(i)
                        } finally {
                            if (e) throw e.error
                        }
                    }
                }
                Object.keys(y).length && Object.assign(this.legacy_missingNodeRetryMap, y), c.texts.forEach(function(t) {
                    var e = v.mirror.getNode(t.id);
                    if (!e) return c.removes.find(function(e) {
                        return e.id === t.id
                    }) ? void 0 : v.warnNodeNotFound(c, t.id);
                    (e = v.fragmentParentMap.has(e) ? v.fragmentParentMap.get(e) : e).textContent = t.value
                }), c.attributes.forEach(function(t) {
                    var e, n = v.mirror.getNode(t.id);
                    if (!n) return c.removes.find(function(e) {
                        return e.id === t.id
                    }) ? void 0 : v.warnNodeNotFound(c, t.id);
                    for (e in v.fragmentParentMap.has(n) && (n = v.fragmentParentMap.get(n)), t.attributes)
                        if ("string" == typeof e) {
                            var r = t.attributes[e];
                            if (null === r) n.removeAttribute(e);
                            else if ("string" == typeof r) try {
                                n.setAttribute(e, r)
                            } catch (e) {
                                v.config.showWarning && console.warn("An error occurred may due to the checkout feature.", e)
                            } else if ("style" === e) {
                                var o, i, a = r,
                                    s = n;
                                for (o in a) !1 === a[o] ? s.style.removeProperty(o) : a[o] instanceof Array ? (i = a[o], s.style.setProperty(o, i[0], i[1])) : (i = a[o], s.style.setProperty(o, i))
                            }
                        }
                })
            }, d.prototype.applyScroll = function(e, t) {
                var n = this.mirror.getNode(e.id);
                if (!n) return this.debugNodeNotFound(e, e.id);
                if (n === this.iframe.contentDocument) this.iframe.contentWindow.scrollTo({
                    top: e.y,
                    left: e.x,
                    behavior: t ? "auto" : "smooth"
                });
                else if (n.__sn.type === N.Document) n.defaultView.scrollTo({
                    top: e.y,
                    left: e.x,
                    behavior: t ? "auto" : "smooth"
                });
                else try {
                    n.scrollTop = e.y, n.scrollLeft = e.x
                } catch (e) {}
            }, d.prototype.applyInput = function(e) {
                var t = this.mirror.getNode(e.id);
                if (!t) return this.debugNodeNotFound(e, e.id);
                try {
                    t.checked = e.isChecked, t.value = e.text
                } catch (e) {}
            }, d.prototype.legacy_resolveMissingNode = function(e, t, n, r) {
                var o, i, a = r.previousId,
                    r = r.nextId,
                    a = a && e[a],
                    r = r && e[r];
                a && (o = a.node, i = a.mutation, t.insertBefore(o, n), delete e[i.node.id], delete this.legacy_missingNodeRetryMap[i.node.id], i.previousId || i.nextId) && this.legacy_resolveMissingNode(e, t, o, i), r && (o = r.node, i = r.mutation, t.insertBefore(o, n.nextSibling), delete e[i.node.id], delete this.legacy_missingNodeRetryMap[i.node.id], i.previousId || i.nextId) && this.legacy_resolveMissingNode(e, t, o, i)
            }, d.prototype.moveAndHover = function(e, t, n, r, o) {
                var i = this.mirror.getNode(n);
                if (!i) return this.debugNodeNotFound(o, n);
                o = oe(i, this.iframe), n = e * o.absoluteScale + o.x, e = t * o.absoluteScale + o.y;
                this.mouse.style.left = n + "px", this.mouse.style.top = e + "px", r || this.drawMouseTail({
                    x: n,
                    y: e
                }), this.hoverElements(i)
            }, d.prototype.drawMouseTail = function(t) {
                var e, n, r, o, i, a = this;
                this.mouseTail && (o = !0 === this.config.mouseTail ? Ct : Object.assign({}, Ct, this.config.mouseTail), e = o.lineCap, n = o.lineWidth, r = o.strokeStyle, o = o.duration, i = function() {
                    var t;
                    a.mouseTail && (t = a.mouseTail.getContext("2d")) && a.tailPositions.length && (t.clearRect(0, 0, a.mouseTail.width, a.mouseTail.height), t.beginPath(), t.lineWidth = n, t.lineCap = e, t.strokeStyle = r, t.moveTo(a.tailPositions[0].x, a.tailPositions[0].y), a.tailPositions.forEach(function(e) {
                        return t.lineTo(e.x, e.y)
                    }), t.stroke())
                }, this.tailPositions.push(t), i(), setTimeout(function() {
                    a.tailPositions = a.tailPositions.filter(function(e) {
                        return e !== t
                    }), i()
                }, o / this.speedService.state.context.timer.speed))
            }, d.prototype.hoverElements = function(e) {
                var t;
                null != (t = this.iframe.contentDocument) && t.querySelectorAll(".\\:hover").forEach(function(e) {
                    e.classList.remove(":hover")
                });
                for (var n = e; n;) n.classList && n.classList.add(":hover"), n = n.parentElement
            }, d.prototype.isUserInteraction = function(e) {
                return e.type === Ee.EventType.IncrementalSnapshot && e.data.source > Ee.IncrementalSource.Mutation && e.data.source <= Ee.IncrementalSource.Input
            }, d.prototype.backToNormal = function() {
                this.nextUserInteractionEvent = null, this.speedService.state.matches("normal") || (this.speedService.send({
                    type: "BACK_TO_NORMAL"
                }), this.emitter.emit(Ee.ReplayerEvents.SkipEnd, {
                    speed: this.speedService.state.context.normalSpeed
                }))
            }, d.prototype.restoreRealParent = function(e, t) {
                (this.mirror.map[t.__sn.id] = t).__sn.type === N.Element && "textarea" === t.__sn.tagName && e.textContent && (t.value = e.textContent), t.appendChild(e), this.restoreState(t)
            }, d.prototype.storeState = function(e) {
                var t, n;
                if (e && e.nodeType === e.ELEMENT_NODE) {
                    var r = e;
                    if ((r.scrollLeft || r.scrollTop) && this.elementStateMap.set(e, {
                            scroll: [r.scrollLeft, r.scrollTop]
                        }), "STYLE" === r.tagName) {
                        var o = r;
                        var i = this.virtualStyleRulesMap;
                        try {
                            var a = Array.from((null == (s = o.sheet) ? void 0 : s.cssRules) || []).map(function(e) {
                                return e.cssText
                            });
                            i.set(o, [{
                                type: E.Snapshot,
                                cssTexts: a
                            }])
                        } catch (o) {}
                    }
                    var s = r.children;
                    try {
                        for (var c = Ie(Array.from(s)), l = c.next(); !l.done; l = c.next()) {
                            var u = l.value;
                            this.storeState(u)
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            l && !l.done && (n = c.return) && n.call(c)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
            }, d.prototype.restoreState = function(e) {
                var t, n;
                if (e.nodeType === e.ELEMENT_NODE) {
                    var r = e,
                        o = (this.elementStateMap.has(e) && ((o = this.elementStateMap.get(e)).scroll && (r.scrollLeft = o.scroll[0], r.scrollTop = o.scroll[1]), this.elementStateMap.delete(e)), r.children);
                    try {
                        for (var i = Ie(Array.from(o)), a = i.next(); !a.done; a = i.next()) {
                            var s = a.value;
                            this.restoreState(s)
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            a && !a.done && (n = i.return) && n.call(i)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
            }, d.prototype.restoreNodeSheet = function(e) {
                var t = this.virtualStyleRulesMap.get(e);
                "STYLE" === e.nodeName && t && bt(t, e)
            }, d.prototype.warnNodeNotFound = function(e, t) {
                this.treeIndex.idRemoved(t) ? this.warn("Node with id '" + t + "' was previously removed. ", e) : this.warn("Node with id '" + t + "' not found. ", e)
            }, d.prototype.warnCanvasMutationFailed = function(e, t) {
                this.warn("Has error on canvas update", t, "canvas mutation:", e)
            }, d.prototype.debugNodeNotFound = function(e, t) {
                this.treeIndex.idRemoved(t) ? this.debug(Tt, "Node with id '" + t + "' was previously removed. ", e) : this.debug(Tt, "Node with id '" + t + "' not found. ", e)
            }, d.prototype.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.config.showWarning && console.warn.apply(console, Ce([Tt], e))
            }, d.prototype.debug = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.config.showDebug && console.log.apply(console, Ce([Tt], e))
            };
            var u = a.addCustomEvent,
                kt = a.freezePage;

            function d(e, t) {
                var v = this;
                if (this.mouseTail = null, this.tailPositions = [], this.emitter = It(), this.legacy_missingNodeRetryMap = {}, this.cache = M(), this.imageMap = new Map, this.mirror = {
                        map: {},
                        getId: function(e) {
                            return e && e.__sn ? e.__sn.id : -1
                        },
                        getNode: function(e) {
                            return this.map[e] || null
                        },
                        removeNodeFromMap: function(e) {
                            var t = this,
                                n = e.__sn && e.__sn.id;
                            delete this.map[n], e.childNodes && e.childNodes.forEach(function(e) {
                                return t.removeNodeFromMap(e)
                            })
                        },
                        has: function(e) {
                            return this.map.hasOwnProperty(e)
                        },
                        reset: function() {
                            this.map = {}
                        }
                    }, this.firstFullSnapshot = null, this.newDocumentQueue = [], this.mousePos = null, ((this.touchActive = null) == t || !t.liveMode) && e.length < 2) throw new Error("Replayer need at least 2 events.");
                var n, r, o = {
                        speed: 1,
                        maxSpeed: 360,
                        root: document.body,
                        loadTimeout: 0,
                        skipInactive: !1,
                        showWarning: !0,
                        showDebug: !1,
                        blockClass: "rr-block",
                        liveMode: !1,
                        insertStyleRules: [],
                        triggerFocus: !0,
                        UNSAFE_replayCanvas: !1,
                        pauseAnimation: !0,
                        mouseTail: Ct
                    },
                    o = (this.config = Object.assign({}, o, t), this.handleResize = this.handleResize.bind(this), this.getCastFn = this.getCastFn.bind(this), this.applyEventsSynchronously = this.applyEventsSynchronously.bind(this), this.emitter.on(Ee.ReplayerEvents.Resize, this.handleResize), this.setupDom(), this.treeIndex = new te, this.fragmentParentMap = new Map, this.elementStateMap = new Map, this.virtualStyleRulesMap = new Map, this.emitter.on(Ee.ReplayerEvents.Flush, function() {
                        var e, t, n, r, o, i, a = v.treeIndex.flush(),
                            s = a.scrollMap,
                            a = a.inputMap;
                        v.fragmentParentMap.forEach(function(e, t) {
                            return v.restoreRealParent(t, e)
                        });
                        try {
                            for (var c = Ie(v.virtualStyleRulesMap.keys()), l = c.next(); !l.done; l = c.next()) {
                                var u = l.value;
                                v.restoreNodeSheet(u)
                            }
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                l && !l.done && (t = c.return) && t.call(c)
                            } finally {
                                if (e) throw e.error
                            }
                        }
                        v.fragmentParentMap.clear(), v.elementStateMap.clear(), v.virtualStyleRulesMap.clear();
                        try {
                            for (var d = Ie(s.values()), f = d.next(); !f.done; f = d.next()) {
                                var p = f.value;
                                v.applyScroll(p, !0)
                            }
                        } catch (e) {
                            n = {
                                error: e
                            }
                        } finally {
                            try {
                                f && !f.done && (r = d.return) && r.call(d)
                            } finally {
                                if (n) throw n.error
                            }
                        }
                        try {
                            for (var h = Ie(a.values()), m = h.next(); !m.done; m = h.next()) p = m.value, v.applyInput(p)
                        } catch (e) {
                            o = {
                                error: e
                            }
                        } finally {
                            try {
                                m && !m.done && (i = h.return) && i.call(h)
                            } finally {
                                if (o) throw o.error
                            }
                        }
                    }), this.emitter.on(Ee.ReplayerEvents.PlayBack, function() {
                        v.firstFullSnapshot = null, v.mirror.reset()
                    }), new ot([], (null == t ? void 0 : t.speed) || o.speed)),
                    e = (this.service = yt({
                        events: e.map(function(e) {
                            return t && t.unpackFn ? t.unpackFn(e) : e
                        }).sort(function(e, t) {
                            return e.timestamp - t.timestamp
                        }),
                        timer: o,
                        timeOffset: 0,
                        baselineTime: 0,
                        lastPlayedEvent: null
                    }, {
                        getCastFn: this.getCastFn,
                        applyEventsSynchronously: this.applyEventsSynchronously,
                        emitter: this.emitter
                    }), this.service.start(), this.service.subscribe(function(e) {
                        v.emitter.emit(Ee.ReplayerEvents.StateChange, {
                            player: e
                        })
                    }), this.speedService = vt(ht({
                        id: "speed",
                        context: {
                            normalSpeed: -1,
                            timer: o
                        },
                        initial: "normal",
                        states: {
                            normal: {
                                on: {
                                    FAST_FORWARD: {
                                        target: "skipping",
                                        actions: ["recordSpeed", "setSpeed"]
                                    },
                                    SET_SPEED: {
                                        target: "normal",
                                        actions: ["setSpeed"]
                                    }
                                }
                            },
                            skipping: {
                                on: {
                                    BACK_TO_NORMAL: {
                                        target: "normal",
                                        actions: ["restoreSpeed"]
                                    },
                                    SET_SPEED: {
                                        target: "normal",
                                        actions: ["setSpeed"]
                                    }
                                }
                            }
                        }
                    }, {
                        actions: {
                            setSpeed: function(e, t) {
                                "payload" in t && e.timer.setSpeed(t.payload.speed)
                            },
                            recordSpeed: l({
                                normalSpeed: function(e) {
                                    return e.timer.speed
                                }
                            }),
                            restoreSpeed: function(e) {
                                e.timer.setSpeed(e.normalSpeed)
                            }
                        }
                    })), this.speedService.start(), this.speedService.subscribe(function(e) {
                        v.emitter.emit(Ee.ReplayerEvents.StateChange, {
                            speed: e
                        })
                    }), this.service.state.context.events.find(function(e) {
                        return e.type === Ee.EventType.Meta
                    })),
                    i = this.service.state.context.events.find(function(e) {
                        return e.type === Ee.EventType.FullSnapshot
                    });
                e && (o = e.data, n = o.width, r = o.height, setTimeout(function() {
                    v.emitter.emit(Ee.ReplayerEvents.Resize, {
                        width: n,
                        height: r
                    })
                }, 0)), i && setTimeout(function() {
                    v.firstFullSnapshot || (v.firstFullSnapshot = i, v.rebuildFullSnapshot(i), v.iframe.contentWindow.scrollTo(i.data.initialOffset))
                }, 1), this.service.state.context.events.find(_t) && this.mouse.classList.add("touch-device")
            }
            return Ee.Replayer = d, Ee.addCustomEvent = u, Ee.freezePage = kt, Ee.record = a, Ee.utils = t, Object.defineProperty(Ee, "__esModule", {
                value: !0
            }), Ee
        }({}),
        te = 0,
        ne = 1,
        re = 2,
        L = new(function() {
            function e() {
                a(this, e), this.events = [], this.saveInterval = 0, this.firstEvent = !0, this.stopRecordingEvents = function() {}
            }
            return i(e, [{
                key: "eventsProxy",
                get: function() {
                    return this.events
                },
                set: function(e) {
                    this.events.push(e), (this.firstEvent && 4 === e.type || 150 < this.events.length) && (this.save(), this.resetInterval())
                }
            }, {
                key: "hasInvalidGUIDS",
                get: function() {
                    return !B(I(_)) || !B(I(C))
                }
            }, {
                key: "recordingTimeElapsed",
                get: function() {
                    var e = +sessionStorage.getItem(X);
                    return isNaN(e) || !e ? 0 : e
                },
                set: function(e) {
                    return sessionStorage.setItem(X, e)
                }
            }, {
                key: "isReachedMaxTime",
                get: function() {
                    return 6e4 < this.recordingTimeElapsed
                }
            }, {
                key: "start",
                value: function() {
                    var r = this;
                    return M.time("start -> recorder created"), this.stopRecordingEvents = ee.record({
                        SlimDOMOptions: {
                            script: !1,
                            comment: !1,
                            headFavicon: !1,
                            headWhitespace: !1,
                            headMetaDescKeywords: !1,
                            headMetaSocial: !1,
                            headMetaRobots: !1,
                            headMetaHttpEquiv: !1,
                            headMetaAuthorship: !1,
                            headMetaVerification: !1
                        },
                        maskAllInputs: !0,
                        sampling: {
                            mousemove: !0,
                            scroll: 150,
                            media: 600,
                            input: "last"
                        },
                        emit: function(e) {
                            var t, n;
                            4 === e.type && (e.user_agent = encodeURIComponent(navigator.userAgent.replace('"', "")), e.sizes = (t = document.body, n = document.documentElement, {
                                window_inner_width: window.innerWidth,
                                window_inner_height: window.innerHeight,
                                window_outer_width: window.outerWidth,
                                window_outer_height: window.outerHeight,
                                window_screen_width: window.screen.width,
                                window_screen_height: window.screen.height,
                                body_scroll_width: t.scrollWidth,
                                body_scroll_height: t.scrollHeight,
                                body_offset_width: t.offsetWidth,
                                body_offset_height: t.offsetHeight,
                                html_client_width: n.clientWidth,
                                html_client_height: n.clientHeight,
                                html_scroll_width: n.scrollWidth,
                                html_scroll_height: n.scrollHeight,
                                html_offset_width: n.offsetWidth,
                                html_offset_height: n.offsetHeight
                            }), e.meta = {
                                recorder_version: "1.1.7"
                            }, e.startTime = (performance.timing || {}).connectStart || K), r.eventsProxy = e, M.timeEnd("start -> first recorded event")
                        }
                    }), M.timeEnd("start -> recorder created"), this.stopRecordingEvents
                }
            }, {
                key: "stop",
                value: function() {
                    var e, t, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
                    return e = n, s(t = {}, te, function() {
                        return M.log("Session ended")
                    }), s(t, ne, function() {
                        return M.error("No visit id or page id")
                    }), s(t, re, function() {
                        return M.log("Recording not allowed.")
                    }), t[e](), this.stopRecordingEvents(), sessionStorage.removeItem(_), sessionStorage.removeItem(C), clearInterval(this.saveInterval), {
                        stopReason: n
                    }
                }
            }, {
                key: "genEventsBody",
                value: function(e) {
                    var e = e.events,
                        t = this.firstEvent ? "start" : "events",
                        n = location.href,
                        t = {
                            action: t,
                            page_id: I(C),
                            visit_id: I(_),
                            location: n,
                            action_log: {
                                events: e
                            }
                        };
                    return JSON.stringify(t)
                }
            }, {
                key: "save",
                value: function() {
                    var e;
                    return this.recordingTimeElapsed = Date.now() - K, this.isReachedMaxTime ? this.stop(te) : this.hasInvalidGUIDS ? this.stop(ne) : this.eventsProxy.length ? (e = this.genEventsBody({
                        events: this.events
                    }), this.events = [], this.firstEvent = !1, this.sendEvents(e)) : void 0
                }
            }, {
                key: "sendEvents",
                value: function(e) {
                    return M.timeEnd("start -> first save sent"), fetch("https://monitor.clickcease.com/V2/recorder/entry2", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: e
                    }).then(function() {
                        M.timeEnd("start -> after first save")
                    })
                }
            }, {
                key: "resetInterval",
                value: function() {
                    var e = this;
                    clearInterval(this.saveInterval), this.saveInterval = setInterval(function() {
                        return e.save()
                    }, 2500)
                }
            }, {
                key: "startSaving",
                value: function() {
                    var e = this;
                    I(_) ? T(C) : (T(C), T(_)), setTimeout(function() {
                        void 0 === (e.save() || {}).stopReason && e.resetInterval()
                    }, 1)
                }
            }]), e
        }()),
        oe = function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.clientIDS,
                e = e.eventName,
                e = void 0 === e ? "ClickCease Protection – Invalid User" : e;
            M.log("FACEBOOK: fbq", window.fbq), t.forEach(function(e) {
                window.fbq("init", e)
            }), M.log("FACEBOOK: Init users", t), window.fbq("trackCustom", e), M.log("FACEBOOK: Sent event:", "[".concat(e, "]"), "to", t)
        },
        ie = function() {
            return !!window.fbq
        },
        ae = /fbq\(['|"]*init['|"]*,\s*['|"]*(.*?)['|"]*\)/,
        se = new RegExp(ae.source, "g"),
        ce = function() {
            return ((0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : document.documentElement.innerHTML).match(se) || []).map(function(e, t) {
                return D(e.match(ae) || [], 2)[1]
            })
        },
        le = function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.location,
                t = void 0 === t ? window.location : t,
                e = e.referrer,
                e = void 0 === e ? document.referrer : e;
            return function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.location;
                return /utm_source=(facebook|fb)/.test(e)
            }(t) || /fbclid/i.test(t) || /\.facebook\./i.test(e)
        };

    function ue() {
        return (ue = o(k().mark(function e() {
            var t, n, r, o, i, a = arguments;
            return k().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return t = 0 < a.length && void 0 !== a[0] ? a[0] : 0, n = {}, e.prev = 2, e.next = 5, A.getStatsV2();
                    case 5:
                        return r = e.sent, e.next = 8, JSON.parse(r);
                    case 8:
                        if (e.t0 = e.sent, e.t0) {
                            e.next = 11;
                            break
                        }
                        e.t0 = {};
                    case 11:
                        n = e.t0, e.next = 17;
                        break;
                    case 14:
                        e.prev = 14, e.t1 = e.catch(2), M.log(e.t1);
                    case 17:
                        if (r = n.cc, o = n.fb || {
                                fb_enabled: 0,
                                fb_ids: []
                            }, i = o.fb_enabled, o = o.fb_ids, i = i && o.length, M.log("response:", n), M.log("fraudType", t), M.log("shoudSendFBEvents", i), i && Number(t) && ! function() {
                                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                                    t = e.location,
                                    t = void 0 === t ? window.location : t,
                                    n = e.referrer,
                                    n = void 0 === n ? document.referrer : n,
                                    r = e.html,
                                    r = void 0 === r ? document.documentElement.innerHTML : r,
                                    e = e.ids,
                                    e = void 0 === e ? [] : e;
                                le({
                                    location: t,
                                    referrer: n
                                }) && (M.log("FACEBOOK: is coming from facebook"), ie() ? (t = e || ce(r), oe({
                                    clientIDS: t
                                })) : M.log("FACEBOOK: has not facebook script"))
                            }({
                                ids: o[0].split("\n").filter(function(e) {
                                    return !!e
                                })
                            }), r) return e.abrupt("return", L.startSaving());
                        e.next = 26;
                        break;
                    case 26:
                        return e.abrupt("return", L.stop(re));
                    case 27:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [2, 14]
            ])
        }))).apply(this, arguments)
    }
    window.ccinstalled ? t.error("Duplicated clickcease <script/> found, Please remove one of them.") : (window.ccinstalled = !0, M.log("Debug mode."), M.time("start -> first save sent"), M.time("start -> clientAuth[REQ]"), M.time("start -> clientAuth[RES]"), M.time("start -> after first save"), M.time("start -> first recorded event"), M.time("start -> CHEQ response"), function() {
        var e = "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString();
        return 0 < window.navigator.userAgent.indexOf("MSIE") || e
    }() ? A.stop(O.BROWSER_NOT_SUPPORTED) : navigator.cookieEnabled ? function() {
        try {
            var e, t, n, r, o;
            return sessionStorage.getItem(_) ? !0 : (t = (e = window.location).hash, n = e.search, r = new RegExp(q.join("|"), "i"), o = n.includes("utm_source") && ["=ms", "=microsoft", "=bing"].some(function(e) {
                return n.includes(e)
            }), r.test(t) || r.test(n) || o)
        } catch (e) {
            return console.error(e), !1
        }
    }() ? (L.start(), function() {
        ue.apply(this, arguments)
    }()) : M.warn("No keys detected.") : A.stop(O.BROWSER_COOCKIES_DISABLED))
}();