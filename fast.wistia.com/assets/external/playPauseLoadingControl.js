/*! For license information please see playPauseLoadingControl.js.LICENSE.txt */
var __webpack_modules__ = {
        665: (t, e, n) => {
            n.d(e, {
                default: () => v
            });
            var r = n(2),
                i = n(11),
                o = n(6),
                a = n(24);

            function c(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, d(r.key), r)
                }
            }

            function s(t, e, n) {
                return e = u(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, l() ? Reflect.construct(e, n || [], u(t).constructor) : e.apply(t, n))
            }

            function l() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (l = function() {
                    return !!t
                })()
            }

            function u(t) {
                return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, u(t)
            }

            function f(t, e) {
                return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, f(t, e)
            }

            function p(t, e, n) {
                return (e = d(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function d(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" != typeof r) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var h = (0, i.cachedDetect)();
            const v = function(t) {
                function e() {
                    var t;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                    return p(t = s(this, e, [].concat(r)), "state", {
                        buttons: [{
                            key: (0, a.seqId)(),
                            isFadingUp: !1,
                            isFirstRender: !1
                        }],
                        isDisplayNone: !0,
                        isMouseDown: !1,
                        isOpaque: !1
                    }), p(t, "onClick", (function(e) {
                        if (t.props.fadeUpOnClick) {
                            var n = t.state.buttons,
                                r = (0, o.clone)(n),
                                i = r[r.length - 1];
                            i.isFadingUp = !0;
                            var c = i.key;
                            r.push({
                                key: (0, a.seqId)(),
                                isFadingUp: !1,
                                isFirstRender: !0
                            }), t.setState({
                                buttons: r
                            }), setTimeout((function() {
                                t.setState({
                                    buttons: t.state.buttons.filter((function(t) {
                                        return t.key !== c
                                    }))
                                })
                            }), 700)
                        }
                        var s = t.props.onClick;
                        s && s(e)
                    })), p(t, "onMouseDown", (function() {
                        t.setState({
                            isMouseDown: !0
                        })
                    })), p(t, "onMouseUp", (function() {
                        t.setState({
                            isMouseDown: !1
                        })
                    })), p(t, "onTouchEnd", (function() {
                        t.setState({
                            isMouseDown: !1
                        })
                    })), p(t, "onTouchStart", (function() {
                        t.setState({
                            isMouseDown: !0
                        })
                    })), t
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e && f(t, e)
                }(e, t), n = e, (i = [{
                    key: "buttonStyle",
                    value: function(t) {
                        var e = this.props,
                            n = e.bottom,
                            r = e.left,
                            i = e.right,
                            o = e.scale,
                            a = e.top,
                            c = t.isFadingUp,
                            s = t.isFirstRender,
                            l = this.state,
                            u = l.isDisplayNone,
                            f = l.isMouseDown,
                            p = l.isOpaque,
                            d = 140 * o,
                            h = -50,
                            v = .8;
                        return c ? h = -120 : s && (h = 20), c ? v = 1 : s ? v = .4 : f && (v = .9), {
                            background: "rgba(0,0,0,.6)",
                            border: 0,
                            borderRadius: "50%",
                            bottom: n,
                            cursor: "pointer",
                            display: u ? "none" : "block",
                            height: "".concat(140 * o, "px"),
                            left: r,
                            margin: 0,
                            padding: 0,
                            pointerEvents: "auto",
                            position: "absolute",
                            opacity: !p || c || s ? 0 : 1,
                            outline: "none",
                            right: i,
                            top: a,
                            transform: "translate(-50%, ".concat(h, "%) scale(").concat(v, ")"),
                            transition: "opacity ".concat(c ? 600 : 200, "ms, transform ").concat(f ? 200 : 600, "ms"),
                            webkitTapHighlightColor: "rgba(0,0,0,0)",
                            width: "".concat(d, "px")
                        }
                    }
                }, {
                    key: "componentDidMount",
                    value: function() {
                        this.handleVisibilityChange(this.props, this.state)
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function() {
                        var t = this,
                            e = this.props.isVisible,
                            n = this.state.buttons;
                        if (e && n[n.length - 1].isFirstRender) {
                            var r = (0, o.clone)(n);
                            r[r.length - 1].isFirstRender = !1, setTimeout((function() {
                                t.setState({
                                    buttons: r
                                })
                            }), 10)
                        }
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(t) {
                        t.isVisible !== this.props.isVisible && this.handleVisibilityChange(t, this.state)
                    }
                }, {
                    key: "handleVisibilityChange",
                    value: function(t, e) {
                        var n = this,
                            r = t.isVisible,
                            i = e.isDisplayNone,
                            o = e.isOpaque;
                        r && i ? (this.setState({
                            isDisplayNone: !1
                        }), setTimeout((function() {
                            n.setState({
                                isOpaque: !0
                            })
                        }), 10)) : !r && o && (this.setState({
                            isOpaque: !1
                        }), setTimeout((function() {
                            n.setState({
                                isDisplayNone: !0
                            })
                        }), 100))
                    }
                }, {
                    key: "rootStyle",
                    value: function() {
                        return {
                            height: "100%",
                            left: 0,
                            pointerEvents: "none",
                            position: "absolute",
                            top: 0,
                            width: "100%"
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.props,
                            n = e.ariaLabel,
                            i = e.children,
                            o = this.state.buttons;
                        return (0, r.h)("div", {
                            class: "w-css-reset w-css-reset-tree",
                            style: this.rootStyle()
                        }, o.map((function(e, a) {
                            return (0, r.h)("button", {
                                "aria-label": n,
                                class: "w-vulcan-v2-button",
                                key: e.key,
                                onClick: a === o.length - 1 && t.onClick,
                                onMouseDown: !h.touchScreen && t.onMouseDown,
                                onMouseUp: !h.touchScreen && t.onMouseUp,
                                onTouchEnd: h.touchScreen && t.onTouchEnd,
                                onTouchStart: h.touchScreen && t.onTouchStart,
                                style: t.buttonStyle(e)
                            }, i)
                        })))
                    }
                }]) && c(n.prototype, i), l && c(n, l), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, i, l
            }(r.Component)
        },
        666: (t, e, n) => {
            n.d(e, {
                default: () => h
            });
            var r = n(2),
                i = n(5),
                o = n(24),
                a = n(41);

            function c() {
                return c = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (t[r] = n[r])
                    }
                    return t
                }, c.apply(null, arguments)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, l(r.key), r)
                }
            }

            function l(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" != typeof r) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function u(t, e, n) {
                return e = p(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, f() ? Reflect.construct(e, n || [], p(t).constructor) : e.apply(t, n))
            }

            function f() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (f = function() {
                    return !!t
                })()
            }

            function p(t) {
                return p = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, p(t)
            }

            function d(t, e) {
                return d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, d(t, e)
            }
            const h = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (n = u(this, e, [t])).svgId = (0, o.seqId)("w-loading-swoop-"), n.gradientId = (0, o.seqId)("w-loading-swoop-grad-"), n.animName = (0, o.seqId)("w-loading-swoop-"), n
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e && d(t, e)
                }(e, t), n = e, (l = [{
                    key: "componentDidMount",
                    value: function() {
                        (0, i.addInlineCss)(this.svgEl, "\n@keyframes ".concat(this.animName, " {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n#").concat(this.svgId, " path {\n  animation: ").concat(this.animName, " 1s cubic-bezier(0.495, 0.155, 0.580, 0.845) infinite;\n  transform-origin: center;\n}\n    "))
                    }
                }, {
                    key: "shouldComponentUpdate",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this;
                        return (0, r.h)("svg", c({}, (0, a.standardSvgAttrs)({
                            width: 120,
                            height: 120,
                            styleOverride: {
                                position: "absolute"
                            }
                        }), {
                            id: this.svgId
                        }), (0, r.h)("linearGradient", {
                            gradientUnits: "userSpaceOnUse",
                            id: this.gradientId,
                            ref: function(e) {
                                t.svgEl = e
                            },
                            x1: "31.5",
                            x2: "31.5",
                            y1: "0",
                            y2: "120"
                        }, (0, r.h)("stop", {
                            offset: "0",
                            style: {
                                stopColor: "#FFFFFF"
                            }
                        }), (0, r.h)("stop", {
                            offset: "0.7279",
                            style: {
                                stopColor: "#FFFFFF",
                                stopOpacity: 0
                            }
                        })), (0, r.h)("path", {
                            d: "M60,0C26.9,0,0,26.9,0,60s26.9,60,60,60v-6C30.2,114,6,89.8,6,60S30.2,6,60,6c1.7,0,3-1.3,3-3S61.7,0,60,0z",
                            style: {
                                fill: "url(#".concat(this.gradientId, ")"),
                                opacity: .8
                            }
                        }))
                    }
                }]) && s(n.prototype, l), f && s(n, f), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, l, f
            }(r.Component)
        },
        200: (t, e, n) => {
            n.d(e, {
                RoundedSmallPlayButton: () => o
            });
            var r = n(2),
                i = n(41),
                o = function(t) {
                    var e = t.isPlaying,
                        n = t.svgStyle,
                        o = void 0 === n ? {} : n,
                        a = t.marginLeft,
                        c = void 0 === a ? 0 : a,
                        s = (0, i.standardSvgAttrs)({
                            width: 40,
                            height: 34,
                            ariaHidden: !0,
                            styleOverride: o
                        });
                    return (0, r.h)("div", {
                        style: {
                            width: "100%",
                            height: "100%",
                            marginLeft: null != c ? c : 0
                        }
                    }, (0, r.h)("svg", s, e ? (0, r.h)("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M16.5 11C15.6716 11 15 11.6716 15 12.5V22.5C15 23.3284 15.6716 24 16.5 24H17.5C18.3284 24 19 23.3284 19 22.5V12.5C19 11.6716 18.3284 11 17.5 11H16.5ZM23.5 11C22.6716 11 22 11.6716 22 12.5V22.5C22 23.3284 22.6716 24 23.5 24H24.5C25.3284 24 26 23.3284 26 22.5V12.5C26 11.6716 25.3284 11 24.5 11H23.5Z",
                        fill: "white"
                    }) : (0, r.h)("path", {
                        d: "M24.888 16.1913C25.4371 16.5906 25.4371 17.4094 24.888 17.8087L16.5882 23.845C15.9272 24.3257 15 23.8535 15 23.0362V10.9638C15 10.1465 15.9272 9.67433 16.5882 10.155L24.888 16.1913Z",
                        fill: "white"
                    })))
                }
        },
        199: (t, e, n) => {
            n.d(e, {
                SmallPlayButton: () => d
            });
            var r = n(2),
                i = n(6),
                o = n(41);

            function a() {
                return a = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (t[r] = n[r])
                    }
                    return t
                }, a.apply(null, arguments)
            }

            function c(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, s(r.key), r)
                }
            }

            function s(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" != typeof r) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function l(t, e, n) {
                return e = f(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, u() ? Reflect.construct(e, n || [], f(t).constructor) : e.apply(t, n))
            }

            function u() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (u = function() {
                    return !!t
                })()
            }

            function f(t) {
                return f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, f(t)
            }

            function p(t, e) {
                return p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, p(t, e)
            }
            var d = function(t) {
                function e() {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), l(this, e, arguments)
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e && p(t, e)
                }(e, t), n = e, (s = [{
                    key: "shouldComponentUpdate",
                    value: function(t) {
                        return this.props.isPlaying !== t.isPlaying
                    }
                }, {
                    key: "render",
                    value: function() {
                        return (0, r.h)("div", {
                            style: this.rootStyle()
                        }, (0, r.h)("div", {
                            style: {
                                display: this.props.isPlaying ? "block" : "none",
                                height: "100%",
                                width: "100%"
                            }
                        }, this.renderPauseIcon()), (0, r.h)("div", {
                            style: {
                                display: this.props.isPlaying ? "none" : "block",
                                height: "100%",
                                width: "100%"
                            }
                        }, this.renderPlayIcon()))
                    }
                }, {
                    key: "renderPlayIcon",
                    value: function() {
                        var t = this.props.noPadding,
                            e = t ? 0 : 20,
                            n = t ? 0 : 9,
                            i = 11.556,
                            o = "".concat(e + i, ",").concat(n + 7.5, " ").concat(e, ",").concat(n + 15, " ").concat(e, ",").concat(n);
                        return (0, r.h)("svg", a({}, this.svgAttrs(i + 2 * e, 15 + 2 * n), {
                            class: "w-css-reset w-css-reset-tree"
                        }), (0, r.h)("polygon", {
                            points: o
                        }))
                    }
                }, {
                    key: "renderPauseIcon",
                    value: function() {
                        var t = this.props.noPadding,
                            e = t ? 0 : 20,
                            n = t ? 0 : 11.3;
                        return (0, r.h)("svg", a({}, this.svgAttrs(10 + 2 * e, 12 + 2 * n), {
                            class: "w-css-reset w-css-reset-tree"
                        }), (0, r.h)("g", null, (0, r.h)("rect", {
                            x: e,
                            y: n,
                            width: "3.5",
                            height: 12
                        }), (0, r.h)("rect", {
                            x: e + 6.5,
                            y: n,
                            width: "3.5",
                            height: 12
                        })))
                    }
                }, {
                    key: "rootStyle",
                    value: function() {
                        return {
                            height: "100%",
                            width: "100%"
                        }
                    }
                }, {
                    key: "svgAttrs",
                    value: function() {
                        var t = this.props.noPadding,
                            e = this.props.isPlaying,
                            n = t ? 0 : 20,
                            r = t ? 0 : e ? 11.3 : 9,
                            a = e ? 12 : 16,
                            c = e ? 10 : 11.556,
                            s = (0, o.standardSvgAttrs)({
                                width: c + 2 * n,
                                height: a + 2 * r,
                                ariaHidden: !0
                            });
                        return (0, i.merge)(s.style, this.props.svgStyle), s
                    }
                }]) && c(n.prototype, s), u && c(n, u), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, s, u
            }(r.Component)
        },
        45: (t, e, n) => {
            n.d(e, {
                dynamicImport: () => a
            });
            var r = n(21);

            function i() {
                i = function() {
                    return e
                };
                var t, e = {},
                    n = Object.prototype,
                    r = n.hasOwnProperty,
                    o = Object.defineProperty || function(t, e, n) {
                        t[e] = n.value
                    },
                    a = "function" == typeof Symbol ? Symbol : {},
                    c = a.iterator || "@@iterator",
                    s = a.asyncIterator || "@@asyncIterator",
                    l = a.toStringTag || "@@toStringTag";

                function u(t, e, n) {
                    return Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), t[e]
                }
                try {
                    u({}, "")
                } catch (t) {
                    u = function(t, e, n) {
                        return t[e] = n
                    }
                }

                function f(t, e, n, r) {
                    var i = e && e.prototype instanceof y ? e : y,
                        a = Object.create(i.prototype),
                        c = new W(r || []);
                    return o(a, "_invoke", {
                        value: E(t, n, c)
                    }), a
                }

                function p(t, e, n) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, n)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }
                e.wrap = f;
                var d = "suspendedStart",
                    h = "suspendedYield",
                    v = "executing",
                    _ = "completed",
                    g = {};

                function y() {}

                function m() {}

                function b() {}
                var w = {};
                u(w, c, (function() {
                    return this
                }));
                var P = Object.getPrototypeOf,
                    T = P && P(P(C([])));
                T && T !== n && r.call(T, c) && (w = T);
                var S = b.prototype = y.prototype = Object.create(w);

                function O(t) {
                    ["next", "throw", "return"].forEach((function(e) {
                        u(t, e, (function(t) {
                            return this._invoke(e, t)
                        }))
                    }))
                }

                function k(t, e) {
                    function n(i, o, a, c) {
                        var s = p(t[i], t, o);
                        if ("throw" !== s.type) {
                            var l = s.arg,
                                u = l.value;
                            return u && "object" == typeof u && r.call(u, "__await") ? e.resolve(u.__await).then((function(t) {
                                n("next", t, a, c)
                            }), (function(t) {
                                n("throw", t, a, c)
                            })) : e.resolve(u).then((function(t) {
                                l.value = t, a(l)
                            }), (function(t) {
                                return n("throw", t, a, c)
                            }))
                        }
                        c(s.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(t, r) {
                            function o() {
                                return new e((function(e, i) {
                                    n(t, r, e, i)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function E(e, n, r) {
                    var i = d;
                    return function(o, a) {
                        if (i === v) throw Error("Generator is already running");
                        if (i === _) {
                            if ("throw" === o) throw a;
                            return {
                                value: t,
                                done: !0
                            }
                        }
                        for (r.method = o, r.arg = a;;) {
                            var c = r.delegate;
                            if (c) {
                                var s = x(c, r);
                                if (s) {
                                    if (s === g) continue;
                                    return s
                                }
                            }
                            if ("next" === r.method) r.sent = r._sent = r.arg;
                            else if ("throw" === r.method) {
                                if (i === d) throw i = _, r.arg;
                                r.dispatchException(r.arg)
                            } else "return" === r.method && r.abrupt("return", r.arg);
                            i = v;
                            var l = p(e, n, r);
                            if ("normal" === l.type) {
                                if (i = r.done ? _ : h, l.arg === g) continue;
                                return {
                                    value: l.arg,
                                    done: r.done
                                }
                            }
                            "throw" === l.type && (i = _, r.method = "throw", r.arg = l.arg)
                        }
                    }
                }

                function x(e, n) {
                    var r = n.method,
                        i = e.iterator[r];
                    if (i === t) return n.delegate = null, "throw" === r && e.iterator.return && (n.method = "return", n.arg = t, x(e, n), "throw" === n.method) || "return" !== r && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + r + "' method")), g;
                    var o = p(i, e.iterator, n.arg);
                    if ("throw" === o.type) return n.method = "throw", n.arg = o.arg, n.delegate = null, g;
                    var a = o.arg;
                    return a ? a.done ? (n[e.resultName] = a.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, g) : a : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, g)
                }

                function j(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                }

                function L(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e
                }

                function W(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], t.forEach(j, this), this.reset(!0)
                }

                function C(e) {
                    if (e || "" === e) {
                        var n = e[c];
                        if (n) return n.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var i = -1,
                                o = function n() {
                                    for (; ++i < e.length;)
                                        if (r.call(e, i)) return n.value = e[i], n.done = !1, n;
                                    return n.value = t, n.done = !0, n
                                };
                            return o.next = o
                        }
                    }
                    throw new TypeError(typeof e + " is not iterable")
                }
                return m.prototype = b, o(S, "constructor", {
                    value: b,
                    configurable: !0
                }), o(b, "constructor", {
                    value: m,
                    configurable: !0
                }), m.displayName = u(b, l, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === m || "GeneratorFunction" === (e.displayName || e.name))
                }, e.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, b) : (t.__proto__ = b, u(t, l, "GeneratorFunction")), t.prototype = Object.create(S), t
                }, e.awrap = function(t) {
                    return {
                        __await: t
                    }
                }, O(k.prototype), u(k.prototype, s, (function() {
                    return this
                })), e.AsyncIterator = k, e.async = function(t, n, r, i, o) {
                    void 0 === o && (o = Promise);
                    var a = new k(f(t, n, r, i), o);
                    return e.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                        return t.done ? t.value : a.next()
                    }))
                }, O(S), u(S, l, "Generator"), u(S, c, (function() {
                    return this
                })), u(S, "toString", (function() {
                    return "[object Generator]"
                })), e.keys = function(t) {
                    var e = Object(t),
                        n = [];
                    for (var r in e) n.push(r);
                    return n.reverse(),
                        function t() {
                            for (; n.length;) {
                                var r = n.pop();
                                if (r in e) return t.value = r, t.done = !1, t
                            }
                            return t.done = !0, t
                        }
                }, e.values = C, W.prototype = {
                    constructor: W,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(L), !e)
                            for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done) throw e;
                        var n = this;

                        function i(r, i) {
                            return c.type = "throw", c.arg = e, n.next = r, i && (n.method = "next", n.arg = t), !!i
                        }
                        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                            var a = this.tryEntries[o],
                                c = a.completion;
                            if ("root" === a.tryLoc) return i("end");
                            if (a.tryLoc <= this.prev) {
                                var s = r.call(a, "catchLoc"),
                                    l = r.call(a, "finallyLoc");
                                if (s && l) {
                                    if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return i(a.finallyLoc)
                                } else if (s) {
                                    if (this.prev < a.catchLoc) return i(a.catchLoc, !0)
                                } else {
                                    if (!l) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return i(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var i = this.tryEntries[n];
                            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                                var o = i;
                                break
                            }
                        }
                        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                        var a = o ? o.completion : {};
                        return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, g) : this.complete(a)
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), g
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), L(n), g
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var i = r.arg;
                                    L(n)
                                }
                                return i
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(e, n, r) {
                        return this.delegate = {
                            iterator: C(e),
                            resultName: n,
                            nextLoc: r
                        }, "next" === this.method && (this.arg = t), g
                    }
                }, e
            }

            function o(t, e, n, r, i, o, a) {
                try {
                    var c = t[o](a),
                        s = c.value
                } catch (t) {
                    return void n(t)
                }
                c.done ? e(s) : Promise.resolve(s).then(r, i)
            }
            var a = function() {
                var t, e = (t = i().mark((function t(e) {
                    var n, o, a, c, s = arguments;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (a = null !== (n = (o = s.length > 1 && void 0 !== s[1] ? s[1] : {}).host) && void 0 !== n ? n : (0, r.eV1HostWithPort)(), !("" !== (c = r.TAGGED_VERSION) && c.length > 0 && !0 !== o.mediaData)) {
                                    t.next = 5;
                                    break
                                }
                                return t.abrupt("return",
                                    import ("".concat((0, r.eV1Protocol)(), "//").concat(a, "/").concat(e, "@").concat(c)));
                            case 5:
                                return t.abrupt("return",
                                    import ("".concat((0, r.eV1Protocol)(), "//").concat(a, "/").concat(e)));
                            case 6:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })), function() {
                    var e = this,
                        n = arguments;
                    return new Promise((function(r, i) {
                        var a = t.apply(e, n);

                        function c(t) {
                            o(a, r, i, c, s, "next", t)
                        }

                        function s(t) {
                            o(a, r, i, c, s, "throw", t)
                        }
                        c(void 0)
                    }))
                });
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()
        },
        35: (t, e, n) => {
            n.d(e, {
                getAllApiHandles: () => i
            });
            n(36), n(13);
            var r = n(37);
            var i = function() {
                return (void 0 === (0, r.wData)("video") ? [] : Object.values((0, r.wData)("video"))).concat(void 0 === (0, r.wData)("iframe_api") ? [] : Object.values((0, r.wData)("iframe_api")))
            }
        },
        36: (t, e, n) => {
            n.d(e, {
                getAllApiEmbedElements: () => r
            });
            var r = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia_embed",
                    e = document.querySelectorAll("div.".concat(t, ",span.").concat(t, ",iframe.").concat(t));
                return Array.from(e).map((function(t) {
                    var e;
                    return "WISTIA-PLAYER" === (null === (e = t.lastChild) || void 0 === e ? void 0 : e.nodeName) ? t.lastChild : t
                }))
            }
        },
        12: (t, e, n) => {
            n.d(e, {
                hasPerformanceMeasureSupport: () => r
            });
            var r = function() {
                var t = window.performance;
                return Boolean(t) && Boolean(t.measure)
            }
        },
        41: (t, e, n) => {
            function r(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function i(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? r(Object(n), !0).forEach((function(e) {
                        o(t, e, n[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }))
                }
                return t
            }

            function o(t, e, n) {
                return (e = function(t) {
                    var e = function(t, e) {
                        if ("object" != typeof t || !t) return t;
                        var n = t[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(t, e || "default");
                            if ("object" != typeof r) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === e ? String : Number)(t)
                    }(t, "string");
                    return "symbol" == typeof e ? e : e + ""
                }(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }
            n.d(e, {
                standardSvgAttrs: () => a
            });
            var a = function(t) {
                var e = t.width,
                    n = void 0 === e ? 40 : e,
                    r = t.height,
                    o = void 0 === r ? 34 : r,
                    a = t.styleOverride,
                    c = void 0 === a ? {} : a,
                    s = t.ariaHidden,
                    l = void 0 !== s && s,
                    u = t.fillColor,
                    f = void 0 === u ? "#ffffff" : u;
                return {
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 ".concat(n, " ").concat(o),
                    "enable-background": "new 0 0 ".concat(n, " ").concat(o),
                    "aria-hidden": "".concat(!!l),
                    style: i({
                        fill: f,
                        height: "100%",
                        left: 0,
                        strokeWidth: 0,
                        top: 0,
                        width: "100%"
                    }, c)
                }
            }
        },
        2: (t, e, n) => {
            n.d(e, {
                Component: () => P,
                h: () => m,
                render: () => U
            });
            var r, i, o, a, c, s, l, u, f, p, d = {},
                h = [],
                v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
                _ = Array.isArray;

            function g(t, e) {
                for (var n in e) t[n] = e[n];
                return t
            }

            function y(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }

            function m(t, e, n) {
                var i, o, a, c = {};
                for (a in e) "key" == a ? i = e[a] : "ref" == a ? o = e[a] : c[a] = e[a];
                if (arguments.length > 2 && (c.children = arguments.length > 3 ? r.call(arguments, 2) : n), "function" == typeof t && null != t.defaultProps)
                    for (a in t.defaultProps) void 0 === c[a] && (c[a] = t.defaultProps[a]);
                return b(t, c, i, o, null)
            }

            function b(t, e, n, r, a) {
                var c = {
                    type: t,
                    props: e,
                    key: n,
                    ref: r,
                    __k: null,
                    __: null,
                    __b: 0,
                    __e: null,
                    __d: void 0,
                    __c: null,
                    constructor: void 0,
                    __v: null == a ? ++o : a,
                    __i: -1,
                    __u: 0
                };
                return null == a && null != i.vnode && i.vnode(c), c
            }

            function w(t) {
                return t.children
            }

            function P(t, e) {
                this.props = t, this.context = e
            }

            function T(t, e) {
                if (null == e) return t.__ ? T(t.__, t.__i + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return "function" == typeof t.type ? T(t) : null
            }

            function S(t) {
                var e, n;
                if (null != (t = t.__) && null != t.__c) {
                    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
                        if (null != (n = t.__k[e]) && null != n.__e) {
                            t.__e = t.__c.base = n.__e;
                            break
                        }
                    return S(t)
                }
            }

            function O(t) {
                (!t.__d && (t.__d = !0) && a.push(t) && !k.__r++ || c !== i.debounceRendering) && ((c = i.debounceRendering) || s)(k)
            }

            function k() {
                var t, e, n, r, o, c, s, u;
                for (a.sort(l); t = a.shift();) t.__d && (e = a.length, r = void 0, c = (o = (n = t).__v).__e, s = [], u = [], n.__P && ((r = g({}, o)).__v = o.__v + 1, i.vnode && i.vnode(r), D(n.__P, r, o, n.__n, n.__P.namespaceURI, 32 & o.__u ? [c] : null, s, null == c ? T(o) : c, !!(32 & o.__u), u), r.__v = o.__v, r.__.__k[r.__i] = r, I(s, r, u), r.__e != c && S(r)), a.length > e && a.sort(l));
                k.__r = 0
            }

            function E(t, e, n, r, i, o, a, c, s, l, u) {
                var f, p, v, _, g, y = r && r.__k || h,
                    m = e.length;
                for (n.__d = s, x(n, e, y), s = n.__d, f = 0; f < m; f++) null != (v = n.__k[f]) && "boolean" != typeof v && "function" != typeof v && (p = -1 === v.__i ? d : y[v.__i] || d, v.__i = f, D(t, v, p, i, o, a, c, s, l, u), _ = v.__e, v.ref && p.ref != v.ref && (p.ref && M(p.ref, null, v), u.push(v.ref, v.__c || _, v)), null == g && null != _ && (g = _), 65536 & v.__u || p.__k === v.__k ? s = j(v, s, t) : "function" == typeof v.type && void 0 !== v.__d ? s = v.__d : _ && (s = _.nextSibling), v.__d = void 0, v.__u &= -196609);
                n.__d = s, n.__e = g
            }

            function x(t, e, n) {
                var r, i, o, a, c, s = e.length,
                    l = n.length,
                    u = l,
                    f = 0;
                for (t.__k = [], r = 0; r < s; r++) a = r + f, null != (i = t.__k[r] = null == (i = e[r]) || "boolean" == typeof i || "function" == typeof i ? null : "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? b(null, i, null, null, null) : _(i) ? b(w, {
                    children: i
                }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? b(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) ? (i.__ = t, i.__b = t.__b + 1, c = L(i, n, a, u), i.__i = c, o = null, -1 !== c && (u--, (o = n[c]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == c && f--, "function" != typeof i.type && (i.__u |= 65536)) : c !== a && (c == a - 1 ? f = c - a : c == a + 1 ? f++ : c > a ? u > s - a ? f += c - a : f-- : c < a && f++, c !== r + f && (i.__u |= 65536))) : (o = n[a]) && null == o.key && o.__e && !(131072 & o.__u) && (o.__e == t.__d && (t.__d = T(o)), B(o, o, !1), n[a] = null, u--);
                if (u)
                    for (r = 0; r < l; r++) null != (o = n[r]) && !(131072 & o.__u) && (o.__e == t.__d && (t.__d = T(o)), B(o, o))
            }

            function j(t, e, n) {
                var r, i;
                if ("function" == typeof t.type) {
                    for (r = t.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = t, e = j(r[i], e, n));
                    return e
                }
                t.__e != e && (e && t.type && !n.contains(e) && (e = T(t)), n.insertBefore(t.__e, e || null), e = t.__e);
                do {
                    e = e && e.nextSibling
                } while (null != e && 8 === e.nodeType);
                return e
            }

            function L(t, e, n, r) {
                var i = t.key,
                    o = t.type,
                    a = n - 1,
                    c = n + 1,
                    s = e[n];
                if (null === s || s && i == s.key && o === s.type && !(131072 & s.__u)) return n;
                if (r > (null == s || 131072 & s.__u ? 0 : 1))
                    for (; a >= 0 || c < e.length;) {
                        if (a >= 0) {
                            if ((s = e[a]) && !(131072 & s.__u) && i == s.key && o === s.type) return a;
                            a--
                        }
                        if (c < e.length) {
                            if ((s = e[c]) && !(131072 & s.__u) && i == s.key && o === s.type) return c;
                            c++
                        }
                    }
                return -1
            }

            function W(t, e, n) {
                "-" === e[0] ? t.setProperty(e, null == n ? "" : n) : t[e] = null == n ? "" : "number" != typeof n || v.test(e) ? n : n + "px"
            }

            function C(t, e, n, r, i) {
                var o;
                t: if ("style" === e)
                    if ("string" == typeof n) t.style.cssText = n;
                    else {
                        if ("string" == typeof r && (t.style.cssText = r = ""), r)
                            for (e in r) n && e in n || W(t.style, e, "");
                        if (n)
                            for (e in n) r && n[e] === r[e] || W(t.style, e, n[e])
                    }
                else if ("o" === e[0] && "n" === e[1]) o = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in t || "onFocusOut" === e || "onFocusIn" === e ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? r ? n.u = r.u : (n.u = u, t.addEventListener(e, o ? p : f, o)) : t.removeEventListener(e, o ? p : f, o);
                else {
                    if ("http://www.w3.org/2000/svg" == i) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
                    else if ("width" != e && "height" != e && "href" != e && "list" != e && "form" != e && "tabIndex" != e && "download" != e && "rowSpan" != e && "colSpan" != e && "role" != e && "popover" != e && e in t) try {
                        t[e] = null == n ? "" : n;
                        break t
                    } catch (t) {}
                    "function" == typeof n || (null == n || !1 === n && "-" !== e[4] ? t.removeAttribute(e) : t.setAttribute(e, "popover" == e && 1 == n ? "" : n))
                }
            }

            function A(t) {
                return function(e) {
                    if (this.l) {
                        var n = this.l[e.type + t];
                        if (null == e.t) e.t = u++;
                        else if (e.t < n.u) return;
                        return n(i.event ? i.event(e) : e)
                    }
                }
            }

            function D(t, e, n, r, o, a, c, s, l, u) {
                var f, p, d, h, v, y, m, b, T, S, O, k, x, j, L, W, C = e.type;
                if (void 0 !== e.constructor) return null;
                128 & n.__u && (l = !!(32 & n.__u), a = [s = e.__e = n.__e]), (f = i.__b) && f(e);
                t: if ("function" == typeof C) try {
                    if (b = e.props, T = "prototype" in C && C.prototype.render, S = (f = C.contextType) && r[f.__c], O = f ? S ? S.props.value : f.__ : r, n.__c ? m = (p = e.__c = n.__c).__ = p.__E : (T ? e.__c = p = new C(b, O) : (e.__c = p = new P(b, O), p.constructor = C, p.render = R), S && S.sub(p), p.props = b, p.state || (p.state = {}), p.context = O, p.__n = r, d = p.__d = !0, p.__h = [], p._sb = []), T && null == p.__s && (p.__s = p.state), T && null != C.getDerivedStateFromProps && (p.__s == p.state && (p.__s = g({}, p.__s)), g(p.__s, C.getDerivedStateFromProps(b, p.__s))), h = p.props, v = p.state, p.__v = e, d) T && null == C.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), T && null != p.componentDidMount && p.__h.push(p.componentDidMount);
                    else {
                        if (T && null == C.getDerivedStateFromProps && b !== h && null != p.componentWillReceiveProps && p.componentWillReceiveProps(b, O), !p.__e && (null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(b, p.__s, O) || e.__v === n.__v)) {
                            for (e.__v !== n.__v && (p.props = b, p.state = p.__s, p.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach((function(t) {
                                    t && (t.__ = e)
                                })), k = 0; k < p._sb.length; k++) p.__h.push(p._sb[k]);
                            p._sb = [], p.__h.length && c.push(p);
                            break t
                        }
                        null != p.componentWillUpdate && p.componentWillUpdate(b, p.__s, O), T && null != p.componentDidUpdate && p.__h.push((function() {
                            p.componentDidUpdate(h, v, y)
                        }))
                    }
                    if (p.context = O, p.props = b, p.__P = t, p.__e = !1, x = i.__r, j = 0, T) {
                        for (p.state = p.__s, p.__d = !1, x && x(e), f = p.render(p.props, p.state, p.context), L = 0; L < p._sb.length; L++) p.__h.push(p._sb[L]);
                        p._sb = []
                    } else
                        do {
                            p.__d = !1, x && x(e), f = p.render(p.props, p.state, p.context), p.state = p.__s
                        } while (p.__d && ++j < 25);
                    p.state = p.__s, null != p.getChildContext && (r = g(g({}, r), p.getChildContext())), T && !d && null != p.getSnapshotBeforeUpdate && (y = p.getSnapshotBeforeUpdate(h, v)), E(t, _(W = null != f && f.type === w && null == f.key ? f.props.children : f) ? W : [W], e, n, r, o, a, c, s, l, u), p.base = e.__e, e.__u &= -161, p.__h.length && c.push(p), m && (p.__E = p.__ = null)
                } catch (t) {
                    if (e.__v = null, l || null != a) {
                        for (e.__u |= l ? 160 : 32; s && 8 === s.nodeType && s.nextSibling;) s = s.nextSibling;
                        a[a.indexOf(s)] = null, e.__e = s
                    } else e.__e = n.__e, e.__k = n.__k;
                    i.__e(t, e, n)
                } else null == a && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = N(n.__e, e, n, r, o, a, c, l, u);
                (f = i.diffed) && f(e)
            }

            function I(t, e, n) {
                e.__d = void 0;
                for (var r = 0; r < n.length; r++) M(n[r], n[++r], n[++r]);
                i.__c && i.__c(e, t), t.some((function(e) {
                    try {
                        t = e.__h, e.__h = [], t.some((function(t) {
                            t.call(e)
                        }))
                    } catch (t) {
                        i.__e(t, e.__v)
                    }
                }))
            }

            function N(t, e, n, i, o, a, c, s, l) {
                var u, f, p, h, v, g, m, b = n.props,
                    w = e.props,
                    P = e.type;
                if ("svg" === P ? o = "http://www.w3.org/2000/svg" : "math" === P ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != a)
                    for (u = 0; u < a.length; u++)
                        if ((v = a[u]) && "setAttribute" in v == !!P && (P ? v.localName === P : 3 === v.nodeType)) {
                            t = v, a[u] = null;
                            break
                        }
                if (null == t) {
                    if (null === P) return document.createTextNode(w);
                    t = document.createElementNS(o, P, w.is && w), a = null, s = !1
                }
                if (null === P) b === w || s && t.data === w || (t.data = w);
                else {
                    if (a = a && r.call(t.childNodes), b = n.props || d, !s && null != a)
                        for (b = {}, u = 0; u < t.attributes.length; u++) b[(v = t.attributes[u]).name] = v.value;
                    for (u in b)
                        if (v = b[u], "children" == u);
                        else if ("dangerouslySetInnerHTML" == u) p = v;
                    else if ("key" !== u && !(u in w)) {
                        if ("value" == u && "defaultValue" in w || "checked" == u && "defaultChecked" in w) continue;
                        C(t, u, null, v, o)
                    }
                    for (u in w) v = w[u], "children" == u ? h = v : "dangerouslySetInnerHTML" == u ? f = v : "value" == u ? g = v : "checked" == u ? m = v : "key" === u || s && "function" != typeof v || b[u] === v || C(t, u, v, b[u], o);
                    if (f) s || p && (f.__html === p.__html || f.__html === t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
                    else if (p && (t.innerHTML = ""), E(t, _(h) ? h : [h], e, n, i, "foreignObject" === P ? "http://www.w3.org/1999/xhtml" : o, a, c, a ? a[0] : n.__k && T(n, 0), s, l), null != a)
                        for (u = a.length; u--;) null != a[u] && y(a[u]);
                    s || (u = "value", void 0 !== g && (g !== t[u] || "progress" === P && !g || "option" === P && g !== b[u]) && C(t, u, g, b[u], o), u = "checked", void 0 !== m && m !== t[u] && C(t, u, m, b[u], o))
                }
                return t
            }

            function M(t, e, n) {
                try {
                    if ("function" == typeof t) {
                        var r = "function" == typeof t.__u;
                        r && t.__u(), r && null == e || (t.__u = t(e))
                    } else t.current = e
                } catch (t) {
                    i.__e(t, n)
                }
            }

            function B(t, e, n) {
                var r, o;
                if (i.unmount && i.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || M(r, null, e)), null != (r = t.__c)) {
                    if (r.componentWillUnmount) try {
                        r.componentWillUnmount()
                    } catch (t) {
                        i.__e(t, e)
                    }
                    r.base = r.__P = null
                }
                if (r = t.__k)
                    for (o = 0; o < r.length; o++) r[o] && B(r[o], e, n || "function" != typeof t.type);
                n || null == t.__e || y(t.__e), t.__c = t.__ = t.__e = t.__d = void 0
            }

            function R(t, e, n) {
                return this.constructor(t, n)
            }

            function U(t, e, n) {
                var o, a, c, s;
                i.__ && i.__(t, e), a = (o = "function" == typeof n) ? null : n && n.__k || e.__k, c = [], s = [], D(e, t = (!o && n || e).__k = m(w, null, [t]), a || d, d, e.namespaceURI, !o && n ? [n] : a ? null : e.firstChild ? r.call(e.childNodes) : null, c, !o && n ? n : a ? a.__e : e.firstChild, o, s), I(c, t, s)
            }
            r = h.slice, i = {
                __e: function(t, e, n, r) {
                    for (var i, o, a; e = e.__;)
                        if ((i = e.__c) && !i.__) try {
                            if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(t)), a = i.__d), null != i.componentDidCatch && (i.componentDidCatch(t, r || {}), a = i.__d), a) return i.__E = i
                        } catch (e) {
                            t = e
                        }
                    throw t
                }
            }, o = 0, P.prototype.setState = function(t, e) {
                var n;
                n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = g({}, this.state), "function" == typeof t && (t = t(g({}, n), this.props)), t && g(n, t), null != t && this.__v && (e && this._sb.push(e), O(this))
            }, P.prototype.forceUpdate = function(t) {
                this.__v && (this.__e = !0, t && this.__h.push(t), O(this))
            }, P.prototype.render = w, a = [], s = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, l = function(t, e) {
                return t.__v.__b - e.__v.__b
            }, k.__r = 0, u = 0, f = A(!1), p = A(!0)
        },
        23: (t, e, n) => {
            n.d(e, {
                appHostname: () => r
            });
            var r = function() {
                return "".concat(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "app", ".").concat("wistia.com")
            }
        },
        167: (t, e, n) => {
            function r(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, i(r.key), r)
                }
            }

            function i(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" != typeof r) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function o(t, e, n) {
                (function(t, e) {
                    if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                })(t, e), e.set(t, n)
            }

            function a(t, e, n) {
                if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
                throw new TypeError("Private element is not present on this object")
            }
            n.d(e, {
                default: () => s
            });
            var c = new WeakMap;
            const s = function() {
                return t = function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), o(this, c, void 0), this.video = e, this.embedElement = e.container, this.unbinds = [], this.eventListeners = new Map, this.reactMounts = {}, this.isWistiaPlayer = "WISTIA-PLAYER" === this.embedElement.tagName, this.impl = e, this.api = this.isWistiaPlayer ? this.embedElement : e.publicApi
                }, (e = [{
                    key: "mount",
                    value: function(t) {
                        this.rootElem = t
                    }
                }, {
                    key: "disabledButton",
                    get: function() {
                        return e = this, (t = c).get(a(t, e));
                        var t, e
                    },
                    set: function(t) {
                        var e, n, r;
                        n = this, r = t, (e = c).set(a(e, n), r)
                    }
                }]) && r(t.prototype, e), n && r(t, n), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t;
                var t, e, n
            }()
        },
        664: (t, e, n) => {
            n.d(e, {
                PlayPauseLoadingCircleControl: () => w
            });
            var r = n(2),
                i = n(174),
                o = n(11),
                a = n(167),
                c = n(665),
                s = n(666),
                l = n(199),
                u = n(66),
                f = n(44),
                p = n(200);

            function d(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, m(r.key), r)
                }
            }

            function h(t, e, n) {
                return e = _(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, v() ? Reflect.construct(e, n || [], _(t).constructor) : e.apply(t, n))
            }

            function v() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (v = function() {
                    return !!t
                })()
            }

            function _(t) {
                return _ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, _(t)
            }

            function g(t, e) {
                return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, g(t, e)
            }

            function y(t, e, n) {
                return (e = m(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function m(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" != typeof r) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var b = (0, o.cachedDetect)(),
                w = function(t) {
                    function e(t) {
                        var n;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), y(n = h(this, e, [t]), "onClick", (function() {
                            "playing" === n.video.state() ? n.video.pause() : n.video.play()
                        })), y(n, "renderButton", (function() {
                            var t = "playing" === n.video.state(),
                                e = n.scale(),
                                i = 1.05,
                                o = {
                                    boxSizing: "border-box",
                                    height: "100%",
                                    paddingBottom: "".concat(45 * e * i, "px"),
                                    paddingLeft: "".concat((t ? 51 : 55) * e * i, "px"),
                                    paddingRight: "".concat((t ? 51 : 45) * e * i, "px"),
                                    paddingTop: "".concat(45 * e * i, "px")
                                };
                            n.isLoading && n.video.setAriaLiveText("The video is loading..."), (0, r.render)((0, r.h)(c.default, {
                                ariaLabel: t ? n.translate("TITLE_WHEN_PLAYING") : n.translate("TITLE_WHEN_NOT_PLAYING"),
                                isVisible: n.isVisible(),
                                left: "50%",
                                onClick: n.onClick,
                                scale: e,
                                top: "50%"
                            }, n.isLoading && (0, r.h)(s.default, null), n.video.hasNewRoundedIcons() ? (0, r.h)(p.RoundedSmallPlayButton, {
                                isPlaying: t
                            }) : (0, r.h)("div", {
                                style: o
                            }, (0, r.h)(l.SmallPlayButton, {
                                isPlaying: t,
                                noPadding: !0
                            }))), n.rootElem), n.reactMounts = [n.rootElem]
                        })), n.isLoading = !1, n.hasMounted = !1, n
                    }
                    return function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), Object.defineProperty(t, "prototype", {
                            writable: !1
                        }), e && g(t, e)
                    }(e, t), n = e, (o = [{
                        key: "destroy",
                        value: function() {
                            (0, u.destroyControl)(this)
                        }
                    }, {
                        key: "isVisible",
                        value: function() {
                            var t = this.props.controlsAreVisible,
                                e = this.video,
                                n = e.state(),
                                r = "beforeplay" === n,
                                i = "ended" === n && "reset" === e._attrs.endVideoBehavior,
                                o = e._impl.ui.anyDialogOpen();
                            return this.isLoading || b.touchScreen && t && !o && !r && !i
                        }
                    }, {
                        key: "mount",
                        value: function(t) {
                            this.rootElem = t, this.setupBindings(), this.hasMounted = !0, this.renderButton()
                        }
                    }, {
                        key: "onControlPropsUpdated",
                        value: function(t) {
                            var e = this;
                            ["anyDialogOpen", "controlsAreVisible", "videoWidth"].some((function(n) {
                                return e.props[n] !== t[n]
                            })) && this.renderButton()
                        }
                    }, {
                        key: "setupBindings",
                        value: function() {
                            var t = this,
                                e = -1;
                            this.hasMounted || this.unbinds.push(this.video.on("play", this.renderButton), this.video.on("pause", this.renderButton), this.video.on("end", this.renderButton), this.video.on("waiting", (function(n) {
                                !t.isLoading && e < 2 && n >= 2 && (t.isLoading = !0, t.renderButton()), e = n
                            })), this.video.on("done-waiting", (function() {
                                t.isLoading = !1, t.renderButton(), e = -1
                            })), this.video.on("timechange", (function() {
                                t.isLoading = !1, t.renderButton(), e = -1
                            })))
                        }
                    }, {
                        key: "scale",
                        value: function() {
                            return Math.min(1.3, Math.max(.3, (0, i.controlMultiplierBasedOnVideo)(this.video, [640, 960])))
                        }
                    }, {
                        key: "translate",
                        value: function(t) {
                            return (0, f.getTranslation)(this.props.playerLanguage.code, "PLAY_BUTTON_".concat(t))
                        }
                    }]) && d(n.prototype, o), a && d(n, a), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, o, a
                }(a.default);
            w.shouldMount = function() {
                return !0
            }, w.handle = "playPauseLoading", w.type = "above-control-bar"
        },
        66: (t, e, n) => {
            n.d(e, {
                destroyControl: () => c
            });
            n(7);
            var r = n(11),
                i = (n(67), n(5)),
                o = n(2),
                a = (n(24), n(68), function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                }),
                c = ((0, r.cachedDetect)(), function(t) {
                    t._destroyed = !0,
                        function(t) {
                            t.unbinds instanceof Array && (t.unbinds.forEach((function(t) {
                                try {
                                    "function" == typeof t && t()
                                } catch (t) {
                                    setTimeout((function() {
                                        throw t
                                    }), 1)
                                }
                            })), t.unbinds = null)
                        }(t),
                        function(t) {
                            t.eventListeners instanceof Map && (t.eventListeners.forEach((function(e, n) {
                                try {
                                    "function" == typeof e && t.embedElement.removeEventListener(n, e)
                                } catch (t) {
                                    setTimeout((function() {
                                        throw t
                                    }), 1)
                                }
                            })), t.eventListeners.clear())
                        }(t), s(t), u(t), f(t)
                }),
                s = function(t) {
                    t.rootElem && (0, i.elemRemove)(Array.prototype.slice.call(t.rootElem.childNodes))
                },
                l = function(t) {
                    var e = t[0],
                        n = t[1];
                    e && n && (0, o.render)((0, o.h)("nothing", null), e)
                },
                u = function(t) {
                    var e = t.reactMounts;
                    if (e)
                        if (e instanceof Array) l(e);
                        else
                            for (var n in e) a(e, n) && e[n] && l(e[n])
                },
                f = function(t) {
                    for (var e in t) a(t, e) && ("_" !== (n = e)[0] || "_" !== n[1]) && "mounted" !== e && (t[e] = null);
                    var n;
                    t.__prevProps = null, t._destroyed = !0
                }
        },
        68: (t, e, n) => {
            n.d(e, {
                getControlDefinitions: () => o
            });
            var r = n(3),
                i = n(31);
            null == r.Wistia._controlDefinitions && (r.Wistia._controlDefinitions = {});
            var o = function() {
                return r.Wistia._controlDefinitions || {}
            };
            r.Wistia.defineControl = function(t) {
                var e;
                (0, i.countMetric)("player/custom-control-definition", 1, {
                    name: t.handle,
                    location: location.origin + location.pathname
                }), null != (e = t).handle ? null == r.Wistia._controlDefinitions[e.handle] && (r.Wistia._controlDefinitions[e.handle] = e, r.Wistia.trigger && r.Wistia.trigger("controldefined", e)) : console.error("Please specify a handle property for control", e)
            }
        },
        44: (t, e, n) => {
            n.d(e, {
                getTranslation: () => p
            });
            var r = n(3),
                i = n(6),
                o = (n(45), r.Wistia.languages = r.Wistia.languages || {}),
                a = r.Wistia.translations = r.Wistia.translations || {};
            r.Wistia._translationPromises || (r.Wistia._translationPromises = {});
            var c, s = function(t, e, n) {
                    o[t] = {
                        code: t,
                        text: f(e)
                    }, n && l(t, n)
                },
                l = function(t, e) {
                    if (null == o[t]) throw new Error("Must define a language with code ".concat(t, " before defining its translations."));
                    var n = a[t];
                    n ? (0, i.merge)(n, e) : a[t] = (0, i.clone)(e)
                },
                u = r.Wistia.cachedDecodings = r.Wistia.cachedDecodings || {},
                f = function(t) {
                    return c || (c = document.createElement("textarea")), null != u[t] ? u[t] : (c.innerHTML = t, u[t] = c.value, c.value)
                },
                p = function(t, e) {
                    var n;
                    return n = a[t] && a[t][e] ? a[t][e] : a["en-US"][e], f(function(t) {
                        return null == t ? "?" : t
                    }(n))
                };
            s("en-US", "English"), l("en-US", {
                PLAY: "Play",
                PLAY_BUTTON_LIVE_NOT_STARTED: "Livestream has not started",
                PLAY_BUTTON_TITLE_WHEN_NOT_PLAYING: "Play Video",
                PLAY_BUTTON_TITLE_WHEN_PLAYING: "Pause",
                REWATCH: "Rewatch",
                SKIP: "Skip"
            })
        },
        7: (t, e, n) => {
            n.d(e, {
                assign: () => i
            });
            var r = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                i = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    if (Object.assign) return Object.assign.apply(Object, [t].concat(n));
                    for (var i = 0; i < n.length; i++) o(t, n[i]);
                    return t
                },
                o = function(t, e) {
                    for (var n in e) r(e, n) && (t[n] = e[n]);
                    return t
                }
        },
        16: (t, e, n) => {
            n.d(e, {
                bind: () => l,
                bindNamed: () => v,
                trigger: () => p,
                unbind: () => u,
                unbindAllInNamespace: () => g,
                unbindNamed: () => _
            });
            var r = n(3),
                i = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };

            function o(t) {
                return function(t) {
                    if (Array.isArray(t)) return a(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return a(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function a(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
                return r
            }
            var c, s = Array.prototype.slice,
                l = function(t, e) {
                    var n = this;
                    return n._bindings || (n._bindings = {}), n._bindings[t] || (n._bindings[t] = []), n._bindings[t].push(e),
                        function() {
                            n.unbind(t, e)
                        }
                },
                u = function(t, e) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var n = [], r = 0; r < this._bindings[t].length; r++) {
                        var i = this._bindings[t][r];
                        i !== e && n.push(i)
                    }
                    this._bindings[t] = n
                },
                f = function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), {
                        event: t,
                        fn: e
                    }
                },
                p = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    return this._bindings && null != this._bindings.all && d.apply(this, ["all", t].concat(n)), d.apply(this, [t].concat(n))
                },
                d = function(t) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var e, n = s.call(arguments, 1), i = o(this._bindings[t]), a = 0; a < i.length; a++) {
                        var c = i[a];
                        try {
                            c.apply(this, n) === this.unbind && (null == e && (e = []), e.push({
                                event: t,
                                fn: c
                            }))
                        } catch (t) {
                            if (this._throwTriggerErrors) throw t;
                            r.Wistia.error && r.Wistia.error(t)
                        }
                    }
                    if (e)
                        for (var l = 0; l < e.length; l++) {
                            var u = e[l];
                            this.unbind(u.event, u.fn)
                        }
                    return this
                },
                h = function(t, e) {
                    null == t._namedBindings && (t._namedBindings = {}), null == t._namedBindings[e] && (t._namedBindings[e] = {})
                },
                v = function(t, e, n, r) {
                    return this.unbindNamed(t, e),
                        function(t, e, n, r, i) {
                            h(t, e), t._namedBindings[e][n] = {
                                event: r,
                                fn: i
                            }
                        }(this, t, e, n, r), this.bind(n, r),
                        function() {
                            this.unbindNamed(t, e)
                        }
                },
                _ = function(t, e) {
                    h(this, t);
                    var n = function(t, e, n) {
                        return h(t, e), t._namedBindings[e][n]
                    }(this, t, e);
                    if (n) {
                        var r = n.event,
                            i = n.fn;
                        this.unbind(r, i)
                    }
                    var o = this._namedBindings;
                    return delete o[t][e], y(o[t]) && delete o[t], this
                },
                g = function(t) {
                    var e = this._namedBindings && this._namedBindings[t];
                    if (null == e) return this;
                    for (var n in e) i(e, n) && this.unbindNamed(t, n)
                },
                y = function(t) {
                    for (var e in t)
                        if (i(t, e)) return !1;
                    return !0
                };
            (c = function() {}.prototype).bind = l, c.unbind = u, c.on = l, c.off = u, c.rebind = f, c.trigger = p, c.bindNamed = v, c.unbindNamed = _, c.unbindAllInNamespace = g
        },
        11: (t, e, n) => {
            n.d(e, {
                cachedDetect: () => H
            });
            var r, i = n(3),
                o = n(4),
                a = n(12),
                c = navigator.userAgent,
                s = /(webkit)[ /]([^\s]+)/i,
                l = /OPR\/([^\s]+)/i,
                u = /(edge)\/(\d+(?:\.\d+)?)/i,
                f = /(mozilla)(?:.*? rv:([^\s)]+))?/i,
                p = /(android) ([^;]+)/i,
                d = /(iphone)/i,
                h = /(Windows Phone OS (\d+(?:\.\d+)?))/,
                v = /OS (\d+)_(\d+)/i,
                _ = /(playstation 3)/i,
                g = /BlackBerry|BB10/i,
                y = /(firefox)/i,
                m = /Mobile VR/i,
                b = /Version\/([^\s]+)/i,
                w = function() {
                    return (T()[1] || "webkit").toLowerCase()
                },
                P = function() {
                    return T()[2]
                },
                T = function() {
                    var t;
                    return (t = c.match(u)) || (t = c.match(s)) || (t = c.match(l)) ? t : t ? (null != document.documentMode && (t[2] = document.documentMode), t) : (t = c.match(f)) || []
                },
                S = function() {
                    var t = c.match(p);
                    return null != t && {
                        version: t[2]
                    }
                },
                O = function() {
                    return d.test(c)
                },
                k = function() {
                    return I() > 0 || S() || j()
                },
                E = function() {
                    try {
                        var t = matchMedia("(hover:hover)");
                        if ("not all" !== t.media) return t.matches
                    } catch (t) {}
                    return !k()
                },
                x = function() {
                    return g.test(c)
                },
                j = function() {
                    return /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1
                },
                L = function() {
                    return s.test(c) && !/chrome/i.test(c) && !j() && !O()
                },
                W = function() {
                    return !(!/Chrome/.test(c) || !/Google Inc/.test(navigator.vendor)) && {
                        version: A()
                    }
                },
                C = function() {
                    var t = c.match(/\bSilk\/([^\s]+)/);
                    return t && t[1]
                },
                A = function() {
                    var t = c.match(/\bChrome\/([^\s]+)/);
                    return t && t[1]
                },
                D = function() {
                    return l.test(c)
                },
                I = function() {
                    var t = c.match(v),
                        e = c.match(b);
                    return null != t ? parseFloat("".concat(t[1], ".").concat(t[2])) : null != e && e[1] && j() ? parseFloat(e[1]) : 0
                },
                N = function() {
                    return u.test(c)
                },
                M = function() {
                    return y.test(c)
                },
                B = function() {
                    var t = document.createElement("video"),
                        e = !1;
                    try {
                        if (t.canPlayType) {
                            var n = 'video/mp4; codecs="avc1.42E01E';
                            (e = {}).h264 = !!t.canPlayType("".concat(n, '"')) || !!t.canPlayType("".concat(n, ', mp4a.40.2"')), e.webm = !!t.canPlayType('video/webm; codecs="vp9, vorbis"'), e.nativeHls = !!t.canPlayType("application/vnd.apple.mpegURL")
                        }
                    } catch (t) {
                        e = {
                            ogg: !1,
                            h264: !1,
                            webm: !1,
                            nativeHls: !1
                        }
                    }
                    return e
                },
                R = function() {
                    try {
                        return "localStorage" in o.root && null != o.root.localStorage
                    } catch (t) {
                        return !1
                    }
                },
                U = ["WebKit", "Moz", "O", "Ms", ""],
                F = function() {
                    for (var t = 0; t < U.length; t++) {
                        var e = "".concat(U[t], "MutationObserver");
                        if (o.root[e]) return e
                    }
                    return null
                },
                V = function() {
                    if (null != r) return r;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function() {
                                r = !0
                            }
                        });
                        window.addEventListener("test", null, t)
                    } catch (t) {
                        r = !1
                    }
                    return r
                },
                H = function() {
                    return i.Wistia._detectCache || (i.Wistia._detectCache = q()), i.Wistia._detectCache
                },
                q = function() {
                    var t, e, n, r, i, s, l, u, f, p, d, v, g = {
                        amazonSilk: !!/Silk/.test(c) && {
                            version: C()
                        },
                        browser: {
                            version: P()
                        },
                        edge: N(),
                        firefox: M(),
                        gearvr: m.test(c),
                        android: S(),
                        oldandroid: S() && parseFloat(S().version) < 4.1,
                        iphone: O(),
                        ipad: j(),
                        blackberry: x(),
                        safari: L(),
                        chrome: W(),
                        opera: D(),
                        winphone: {
                            version: h.test(c)[2]
                        },
                        ios: {
                            version: I()
                        },
                        windows: /win/i.test(navigator.platform),
                        mac: /mac/i.test(navigator.platform),
                        linux: /linux/i.test(navigator.platform),
                        retina: null != o.root.devicePixelRatio && o.root.devicePixelRatio > 1,
                        hoverIsNatural: E(),
                        touchScreen: k(),
                        ps3: _.test(c),
                        video: B(),
                        mediaSource: o.root.MediaSource && o.root.MediaSource.isTypeSupported("".concat('video/mp4; codecs="avc1.42E01E', ', mp4a.40.2"')),
                        nativeHls: (O() || j() || L()) && B().nativeHls,
                        localstorage: R(),
                        json: !(!o.root.JSON || "function" != typeof JSON.parse),
                        backgroundSize: (v = document.createElement("div"), "" === v.style.backgroundSize || "" === v.style.webkitBackgroundSize || "" === v.style.mozBackgroundSize || "" === v.style.oBackgroundSize),
                        fullscreenEnabled: document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled,
                        vulcanSupport: (d = /webkit|mozilla|edge/.test(w()), Boolean(!O() && !j() && !S() && !x() && d && B().h264 && Object.defineProperties)),
                        mutationObserver: F(),
                        callingPlayRequiresEventContext: I() > 0 || S() || L(),
                        passiveSupported: V(),
                        webp: (t = W(), e = M(), n = N(), r = D(), i = t && P() >= 32, s = t && P() >= 75 && S(), l = e && P() >= 65, u = e && P() >= 67 && S(), f = n && P() >= 18, p = r && P() >= 19, i || s || l || u || f || p),
                        performanceMeasure: (0, a.hasPerformanceMeasureSupport)()
                    };
                    return g.browser[w()] = !0, g
                }
        },
        8: (t, e, n) => {
            n(9)
        },
        5: (t, e, n) => {
            n.d(e, {
                addInlineCss: () => u,
                elemBind: () => _,
                elemRemove: () => f,
                elemStyle: () => p,
                elemUnbind: () => g
            });
            var r, i = n(6),
                o = (n(8), n(10), n(11)),
                a = n(13),
                c = (n(17), n(18), n(24)),
                s = n(3),
                l = (s.Wistia, (0, o.cachedDetect)()),
                u = function(t, e) {
                    var n = t || document.body || document.head,
                        r = document.createElement("style");
                    return r.id = (0, c.seqId)("wistia_", "_style"), r.setAttribute("type", "text/css"), r.className = "wistia_injected_style", n.appendChild(r, n.nextSibling), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e)), r
                },
                f = function(t) {
                    var e;
                    if ((0, i.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var n = 0; n < t.length; n++) f(t[n]);
                    else null == t || 1 !== t.nodeType && 3 !== t.nodeType || !(e = t.parentNode) || (e.removeChild(t), t = null)
                },
                p = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    if ((0, i.isArray)(t) || window.NodeList && t instanceof NodeList) {
                        for (var o = [], c = 0; c < t.length; c++) {
                            var s = t[c];
                            1 === s.nodeType && o.push(p.apply(void 0, [s].concat(n)))
                        }
                        return o
                    }
                    if (2 === n.length) {
                        var l = n[0],
                            u = n[1];
                        t.style[l] = u
                    } else if (1 === n.length)
                        if ("string" == typeof n[0]) {
                            var f = n[0];
                            try {
                                return t.currentStyle ? t.currentStyle[f] : window.getComputedStyle ? window.getComputedStyle(t, null).getPropertyValue(f) : null
                            } catch (t) {
                                a.wlog.notice(t)
                            }
                        } else {
                            var d = v(n[0]);
                            for (var h in d) {
                                var _ = d[h];
                                t.style[h] = _
                            }
                        }
                    else a.wlog.apply(void 0, ["Unexpected args", t].concat(n))
                },
                d = {
                    borderImage: !0,
                    mixBlendMode: !0,
                    transform: !0,
                    transition: !0,
                    transitionDuration: !0
                },
                h = ["webkit", "moz", "o", "ms"],
                v = function(t) {
                    if (l.chrome) return t;
                    var e = {};
                    for (var n in t) {
                        var r = t[n];
                        if (e[n] = r, d[n])
                            for (var i = h, o = 0; o < i.length; o++) {
                                var a = i[o] + n.charAt(0).toUpperCase() + n.slice(1);
                                n[a] || (e[a] = r)
                            }
                    }
                    return e
                },
                _ = function(t, e, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        i = function(r) {
                            (r = r || window.event).pageX || r.pageY || !r.clientX && !r.clientY || (r.pageX = r.clientX + b(), r.pageY = r.clientY + m()), r.preventDefault || (r.preventDefault = function() {
                                r.returnValue = !1
                            }), r.stopPropagation || (r.stopPropagation = function() {
                                r.cancelBubble = !0
                            }), null == r.which && (r.which = null != r.charCode ? r.charCode : r.keyCode), null == r.which && null != r.button && (1 & r.button ? r.which = 1 : 2 & r.button ? r.which = 3 : 4 & r.button ? r.which = 2 : r.which = 0), r.target || r.srcElement && (r.target = r.srcElement), r.target && 3 === r.target.nodeType && (r.target = r.target.parentNode);
                            for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) o[a - 1] = arguments[a];
                            var c = n.apply(r.target, [r].concat(o));
                            return c === g && g(t, e, n), c
                        };
                    s.Wistia._elemBind = s.Wistia._elemBind || {};
                    var o = y(t, e, n);
                    return s.Wistia._elemBind[o] = i, i.elem = t, i.event = e, t.addEventListener(e, i, r),
                        function() {
                            g(t, e, n, r)
                        }
                },
                g = function(t, e, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (null != t && null != t._wistiaElemId && null != n && n._wistiaBindId) {
                        var i = y(t, e, n),
                            o = s.Wistia._elemBind[i];
                        return o && (t.removeEventListener(e, o, r), o.elem = null, o.event = null), delete s.Wistia._elemBind[i]
                    }
                },
                y = function(t, e, n) {
                    return t._wistiaElemId = t._wistiaElemId || (0, c.seqId)("wistia_elem_"), n._wistiaBindId = n._wistiaBindId || (0, c.seqId)("wistia_bind_"), "".concat(t._wistiaElemId, ".").concat(e, ".").concat(n._wistiaBindId)
                },
                m = function(t) {
                    var e = document.body,
                        n = document.documentElement;
                    if (null == t) return n && n.scrollTop || e && e.scrollTop || 0;
                    e && (e.scrollTop = t), n && (n.scrollTop = t)
                },
                b = function(t) {
                    var e = document.body,
                        n = document.documentElement;
                    if (null == t) return n && n.scrollLeft || e && e.scrollLeft || 0;
                    e && (e.scrollLeft = t), n && (n.scrollLeft = t)
                };
            ["auxclick", "click", "contextmenu", "dblclick", "focus", "keydown", "keypress", "keyup", "mousedown", "mouseup", "reset", "submit", "touchend", "touchstart"].forEach((function(t) {
                _(document, t, (function(t) {
                    r = t, Date.now(), setTimeout((function() {
                        r === t && (r = void 0)
                    }), 0)
                }), !l.passiveSupported || {
                    capture: !0,
                    passive: !0
                })
            }))
        },
        17: (t, e, n) => {
            var r;
            n.d(e, {
                elemOffset: () => o
            });
            var i = function() {
                    if (null != r) return r;
                    var t = document.createElement("div");
                    return t.style.paddingLeft = t.style.width = "1px", document.body.appendChild(t), r = 2 === t.offsetWidth, document.body.removeChild(t), r
                },
                o = function(t) {
                    var e, n, r = document.body,
                        o = document.defaultView,
                        c = document.documentElement,
                        s = t.getBoundingClientRect(),
                        l = c.clientTop || r.clientTop || 0,
                        u = c.clientLeft || r.clientLeft || 0;
                    e = o && null != o.pageYOffset ? o.pageYOffset : i() && c && null != c.scrollTop ? c.scrollTop : r.scrollTop, n = o && null != o.pageXOffset ? o.pageXOffset : i() && c && null != c.scrollLeft ? c.scrollLeft : r.scrollLeft;
                    var f = a(t);
                    return {
                        height: s.height * f,
                        top: s.top * f + e - l,
                        left: s.left * f + n - u,
                        width: s.width * f,
                        zoom: f
                    }
                },
                a = function(t) {
                    return t && t !== document.documentElement ? a(t.parentElement) * (getComputedStyle(t).zoom || 1) : 1
                }
        },
        174: (t, e, n) => {
            n.d(e, {
                controlMultiplierBasedOnVideo: () => l
            });
            n(5), n(67);
            var r = n(11),
                i = n(6);

            function o(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var r, i, o, a, c = [],
                            s = !0,
                            l = !1;
                        try {
                            if (o = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                s = !1
                            } else
                                for (; !(s = (r = o.call(n)).done) && (c.push(r.value), c.length !== e); s = !0);
                        } catch (t) {
                            l = !0, i = t
                        } finally {
                            try {
                                if (!s && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (l) throw i
                            }
                        }
                        return c
                    }
                }(t, e) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return a(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(t, e) : void 0
                    }
                }(t, e) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function a(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
                return r
            }
            var c = (0, r.cachedDetect)(),
                s = function(t) {
                    if (!(c.iphone || c.ipad || c.android)) return [640, 960];
                    if (null != t && t.isAudio()) return [500, 960];
                    var e, n, r, o, a = (e = document.querySelector("meta[name=viewport]"), n = e && e.getAttribute("content"), r = {}, n && n.split(/[\s,]+/).forEach((function(t) {
                        var e = t.split("=");
                        2 === e.length && (r[e[0]] = (0, i.cast)(e[1]))
                    })), r);
                    if (a.width) {
                        o = "number" == typeof a.width ? 0 + a.width : screen.width || window.innerWidth;
                        var s = Math.max(a["minimum-scale"] || 0, Math.min(a["maximum-scale"] || 10, a["initial-scale"] || 1));
                        s < 1 && (o /= s)
                    } else o = window.innerWidth;
                    return [o, 2 * o / 3]
                },
                l = function(t, e) {
                    var n = t.videoWidth(),
                        r = o(e || s(t), 2),
                        i = r[0],
                        a = r[1];
                    return n <= i ? n / i : n > a ? n / a : 1
                }
        },
        14: (t, e, n) => {
            n.d(e, {
                globalTrigger: () => i
            });
            var r = n(3);
            (0, n(15).makeWbindable)(r.Wistia);
            r.Wistia.bind.bind(r.Wistia), r.Wistia.on.bind(r.Wistia), r.Wistia.off.bind(r.Wistia), r.Wistia.rebind.bind(r.Wistia);
            var i = r.Wistia.trigger.bind(r.Wistia);
            r.Wistia.unbind.bind(r.Wistia)
        },
        21: (t, e, n) => {
            n.d(e, {
                TAGGED_VERSION: () => c,
                eV1HostWithPort: () => f,
                eV1Protocol: () => p,
                metricsHost: () => d
            });
            var r = n(4),
                i = n(22),
                o = n(23),
                a = ((0, o.appHostname)("app"), (0, o.appHostname)("fast-protected"), (0, o.appHostname)("fast")),
                c = "",
                s = ("undefined" != typeof window && r.root === window && r.root.location && r.root.location.protocol, function() {
                    return "fast.".concat("wistia.net")
                }),
                l = function() {
                    for (var t = document.getElementsByTagName("script"), e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.src) {
                            var r = new i.Url(n.src),
                                o = /\/assets\/external\/E-v1?\.js$/.test(r.rawPath),
                                c = r.host === (void 0 || a) || r.host === s() || "fast-canary.wistia.net" === r.host,
                                l = "https:" === location.protocol && "https:" === r.protocol,
                                u = "" === r.protocol || null == r.protocol,
                                f = l || u || "http:" === location.protocol,
                                p = !n.readyState || /loaded|complete/.test(n.readyState);
                            if (o && c && f && p) return r
                        }
                    }
                    return new i.Url("".concat((0, i.proto)(), "//").concat(s(), "/E-v1.js"))
                }(),
                u = function() {
                    return l.host
                },
                f = function() {
                    return l.port ? "".concat(u(), ":").concat(l.port) : u()
                },
                p = function() {
                    return l.protocol
                },
                d = function() {
                    return "pipedream.".concat("wistia.com")
                },
                h = [].concat(["wistia.net", "wistia.com"], ["wistia.mx", "wistia.dev", "wistia.tech", "wistia.am", "wistia.se", "wistia.io", "wistia.st"]);
            new RegExp("(".concat(h.map((function(t) {
                return "\\.".concat(t.replace(".", "\\."))
            })).join("|"), ")$"))
        },
        34: (t, e, n) => {
            n.d(e, {
                getLocalStorage: () => s,
                removeLocalStorage: () => l,
                setLocalStorage: () => u,
                updateLocalStorage: () => f
            });
            var r = n(3),
                i = function(t) {
                    setTimeout((function() {
                        throw t
                    }), 0)
                },
                o = "_namespacedLocalStorage",
                a = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia-test-localstorage";
                    if (null != r.Wistia._localStorageWorks) return r.Wistia._localStorageWorks;
                    try {
                        var e = localStorage.getItem(t);
                        localStorage.removeItem(t), localStorage.setItem(t, e), localStorage.removeItem(t), r.Wistia._localStorageWorks = !0
                    } catch (t) {
                        r.Wistia._localStorageWorks = !1
                    }
                    return r.Wistia._localStorageWorks
                },
                c = function() {
                    return null == r.Wistia[o] && (r.Wistia[o] = {}), r.Wistia[o]
                },
                s = function(t) {
                    if (!a()) return c()[t] || {};
                    if (localStorage[t]) try {
                        return "null" === localStorage[t] ? {} : JSON.parse(localStorage[t])
                    } catch (t) {
                        i(t)
                    }
                    return {}
                },
                l = function(t) {
                    if (a()) try {
                        localStorage.removeItem(t)
                    } catch (t) {
                        i(t)
                    } else c()[t] = {}
                },
                u = function(t, e) {
                    if (!a()) return null != e && "object" == typeof e && (c()[t] = e), e;
                    try {
                        c()[t] = e, localStorage[t] = JSON.stringify(e)
                    } catch (t) {
                        i(t)
                    }
                    return e
                },
                f = function(t, e) {
                    var n = s(t);
                    try {
                        e(n)
                    } catch (t) {
                        i(t)
                    }
                    return u(t, n)
                }
        },
        6: (t, e, n) => {
            n.d(e, {
                cast: () => v,
                clone: () => l,
                eachLeaf: () => E,
                getDeep: () => u,
                isArray: () => m,
                isEmpty: () => O,
                isObject: () => w,
                merge: () => o,
                setAndPreserveUndefined: () => p,
                setDeep: () => f,
                unsetDeep: () => h
            });
            n(7);
            var r = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                i = Array.prototype.slice,
                o = function(t) {
                    if (0 == (arguments.length <= 1 ? 0 : arguments.length - 1)) return t;
                    for (var e = 0; e < (arguments.length <= 1 ? 0 : arguments.length - 1); e++) a(t, e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1]);
                    return t
                },
                a = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : s;
                    if (m(e)) {
                        m(t) || (t = []);
                        for (var o = 0; o < e.length; o++) {
                            var l = e[o];
                            null == t[o] && null != l && (m(l) ? t[o] = [] : w(l) && (t[o] = {}));
                            var u = a(t[o], l, n);
                            i(e, o, u) ? delete t[o] : t[o] = u
                        }
                        return n(t)
                    }
                    if (w(e)) {
                        for (var f in e)
                            if (r(e, f) && (r(t, f) || null == t[f])) {
                                var p = e[f];
                                m(p) ? (m(t[f]) || (t[f] = []), a(t[f], p, n), t[f] = n(t[f])) : w(p) ? (w(t[f]) || (t[f] = {}), a(t[f], p, n), t[f] = n(t[f])) : null == t ? (t = {}, i(e, f, p) || (t[f] = n(p))) : i(e, f, p) ? delete t[f] : t[f] = n(p)
                            }
                        return n(t)
                    }
                    return n(e)
                },
                c = function(t) {
                    return t
                },
                s = function(t, e, n) {
                    return null == n
                },
                l = function(t, e) {
                    return m(t) ? a([], t, e) : a({}, t, e)
                },
                u = function(t, e, n) {
                    e = "string" == typeof e ? e.split(".") : i.call(e);
                    for (var o, a = t; null != t && e.length;) {
                        var c = e.shift();
                        void 0 !== t[c] && (w(t[c]) || m(t[c])) || !n || (0 === c ? (t = a[o] = [])[c] = {} : t[c] = {}), a = t, o = c, t = r(t, c) ? t[c] : void 0
                    }
                    return t
                },
                f = function(t, e, n) {
                    return d(t, e, n, !0)
                },
                p = function(t, e, n) {
                    return d(t, e, n, !1)
                },
                d = function(t, e, n) {
                    var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                        o = (e = "string" == typeof e ? e.split(".") : i.call(e)).pop();
                    null != (t = u(t, e, !0)) && (w(t) || m(t)) && null != o && (r && null == n ? delete t[o] : t[o] = n)
                },
                h = function(t, e) {
                    return f(t, e)
                },
                v = function(t) {
                    return null == t ? t : w(t) || m(t) ? g(t) : _("".concat(t), t)
                },
                _ = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                    return /^-?[1-9]\d*?$/.test(t) ? parseInt(t, 10) : "0" === t || "-0" === t ? 0 : /^-?\d*\.\d+$/.test(t) ? parseFloat(t) : !!/^true$/i.test(t) || !/^false$/i.test(t) && e
                },
                g = function(t) {
                    return a(t, t, (function(t) {
                        return "string" == typeof t ? _(t) : t
                    }), (function() {
                        return !1
                    }))
                },
                y = /^\s*function Array()/,
                m = function(t) {
                    return null != t && t.push && y.test(t.constructor)
                },
                b = /^\s*function Object()/,
                w = function(t) {
                    return null != t && "object" == typeof t && b.test(t.constructor)
                },
                P = /^\s*function RegExp()/,
                T = /^string|number|boolean|function$/i,
                S = function(t) {
                    return null != t && (T.test(typeof t) || function(t) {
                        return null != t && P.test(t.constructor)
                    }(t))
                },
                O = function(t) {
                    return null == t || (!(!m(t) || t.length) || !!w(t) && !Object.keys(t).length)
                },
                k = function(t, e, n, o, a) {
                    if (null == n && (n = []), S(t)) e(t, n, o, a);
                    else if (w(t) || m(t)) {
                        for (var c in e(t, n, o, a), t)
                            if (r(t, c)) {
                                var s = i.call(n);
                                s.push(c), k(t[c], e, s, t, c)
                            }
                    } else e(t, n, o, a)
                },
                E = function(t, e) {
                    k(t, (function(t, n, r, i) {
                        m(t) || w(t) || e(t, n, r, i)
                    }))
                }
        },
        10: (t, e, n) => {
            n.d(e, {
                pageLoaded: () => r
            });
            var r = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4e3,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window;
                if (/loaded|complete/.test(n.readyState)) setTimeout(t, 0);
                else {
                    var i = function() {
                            r.removeEventListener("load", o, !1)
                        },
                        o = function() {
                            clearTimeout(a), i(), t()
                        };
                    r.addEventListener("load", o, !1);
                    var a = setTimeout((function() {
                        i(), t()
                    }), e)
                }
            }
        },
        9: (t, e, n) => {
            n.d(e, {
                poll: () => r
            });
            var r = function(t, e, n, r, i) {
                var o = null,
                    a = (new Date).getTime(),
                    c = function() {
                        (new Date).getTime() - a > r ? "function" == typeof i && i() : t() ? e() : (clearTimeout(o), o = setTimeout(c, n))
                    };
                o = setTimeout(c, 1)
            }
        },
        4: (t, e, n) => {
            var r;
            n.d(e, {
                root: () => i
            });
            try {
                (r = self).self !== r && void 0 !== r.self && "undefined" != typeof window && (r = window)
            } catch (t) {
                r = "undefined" != typeof globalThis ? globalThis : window
            }
            var i = r
        },
        20: (t, e, n) => {
            n.d(e, {
                runScript: () => i
            });
            var r = n(21),
                i = function(t, e) {
                    var n = r.TAGGED_VERSION;
                    return new Promise((function(r, i) {
                        var o;
                        null == e && (e = 8e3), (o = document.createElement("script")).src = t, o.async = !0, o.type = "text/javascript", /https?:\/\/fast\.wistia\./.test(o.src) && "" !== n && n.length > 0 && (o.src = "".concat(o.src, "@").concat(n));
                        var a = null,
                            c = !1,
                            s = function() {
                                o.onerror = o.onreadystatechange = o.onload = null, clearTimeout(a), clearTimeout(u), a = setTimeout((function() {
                                    o && o.parentNode && o.parentNode.removeChild(o)
                                }), 500)
                            },
                            l = function() {
                                var t = o.readyState;
                                c || t && !/loaded|complete/.test(t) || (c = !0, setTimeout((function() {
                                    r(), s()
                                }), 1))
                            },
                            u = setTimeout((function() {
                                c = !0, s(), i(new Error("timeout"))
                            }), e);
                        o.onerror = function(t) {
                            c = !0, s(), i(t)
                        }, o.onreadystatechange = l, o.onload = l, (document.body || document.head).appendChild(o)
                    }))
                }
        },
        18: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                execScriptTags: () => execScriptTags,
                getScriptTags: () => getScriptTags,
                removeScriptTags: () => removeScriptTags
            });
            var utilities_script_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19),
                getScriptTags = function(t) {
                    return t.match(/<script.*?src[^>]*>\s*<\/script>|<script.*?>[\s\S]+?<\/script>/gi) || []
                },
                scriptTagsToRunScriptsInput = function scriptTagsToRunScriptsInput(scriptTags) {
                    if (!scriptTags) return [];
                    scriptTags instanceof Array || (scriptTags = getScriptTags(scriptTags));
                    for (var hashes = [], _loop = function _loop() {
                            var scriptTag = scriptTags[i],
                                hash = {},
                                matches = scriptTag.match(/<script.*?>/i);
                            if (matches && (matches = matches[0].match(/src="([^"]+)"/i), matches && (hash.src = matches[1], hash.async = /async/i.test(scriptTag.replace(hash.src, "")))), !matches && (matches = scriptTag.match(/<script>([\s\S]+?)<\/script>/i), matches)) {
                                var src = matches[1];
                                hash.fn = function() {
                                    return eval(src)
                                }
                            }
                            hashes.push(hash)
                        }, i = 0; i < scriptTags.length; i++) _loop();
                    return hashes
                },
                execScriptTags = function(t, e) {
                    if (!t) return null;
                    var n = scriptTagsToRunScriptsInput(t);
                    return (0, utilities_script_utils_js__WEBPACK_IMPORTED_MODULE_0__.runScripts)(n).then(e)
                },
                removeScriptTags = function(t) {
                    return t.replace(/<script.*?src[^>]*>\s*<\/script>|<script>[\s\S]+?<\/script>/g, "")
                }
        },
        19: (t, e, n) => {
            n.d(e, {
                runScripts: () => u
            });
            var r = n(13),
                i = n(6),
                o = n(20);

            function a(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function c(t, e, n) {
                return (e = function(t) {
                    var e = function(t, e) {
                        if ("object" != typeof t || !t) return t;
                        var n = t[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(t, e || "default");
                            if ("object" != typeof r) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === e ? String : Number)(t)
                    }(t, "string");
                    return "symbol" == typeof e ? e : e + ""
                }(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }
            var s = function(t) {
                    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = document.getElementsByTagName("script"), r = 0; r < n.length; r++) {
                        var i = n[r],
                            o = i.getAttribute("src") || "";
                        if (e.ignoreQueryParams) {
                            var a = o.split("?");
                            o = a[0]
                        }
                        if (!e.scriptRegex && e.ignoreProtocol && (o = o.replace(/^https?:/, ""), t = t.replace(/^https?:/, "")), e.scriptRegex && e.scriptRegex.test(o)) return i;
                        if (e.testStartsWith && 0 === o.indexOf(t)) return i;
                        if (o === t) return i
                    }
                    return null
                },
                l = function(t) {
                    var e, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8e3,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return null == r && (r = 8e3), null == i && (i = {}), new Promise((function(a) {
                        !0 === i.once && (e = s(t)) && (n = !0), i.once && n ? e.readyState && !/loaded|complete/.test(e.readyState) || setTimeout((function() {
                            a()
                        }), 1) : (0, o.runScript)(t, r).then(a).catch((function(t) {
                            a(t), setTimeout((function() {
                                console.error(t)
                            }), 1)
                        }))
                    }))
                },
                u = function() {
                    for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    t = n[0] instanceof Array ? n[0] : n, t = f(t);
                    var o = [],
                        s = [],
                        u = [];
                    return t.forEach((function(t) {
                        var e = function(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var n = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? a(Object(n), !0).forEach((function(e) {
                                        c(t, e, n[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                                    }))
                                }
                                return t
                            }({}, t),
                            n = new Promise((function(t) {
                                e.resolve = t
                            }));
                        e.promise = n, u.push(e.promise), t.async ? o.push(e) : s.push(e)
                    })), s.reduce((function(t, e) {
                        if (e.fn) try {
                            e.fn()
                        } catch (t) {
                            r.wlog.error(t)
                        } finally {
                            e.resolve()
                        } else e.src && l(e.src, null, e).then(e.resolve);
                        return t.then(e.promise)
                    }), Promise.resolve()), setTimeout((function() {
                        o.forEach((function(t) {
                            if (t.fn) try {
                                t.fn()
                            } catch (t) {
                                r.wlog.error(t)
                            } finally {
                                t.resolve()
                            } else t.src && l(t.src, null, t).then(t.resolve)
                        }))
                    }), 1), Promise.all(u)
                },
                f = function(t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                        var r = t[n];
                        "string" == typeof r ? e.push({
                            src: r,
                            async: !1
                        }) : (0, i.isObject)(r) ? e.push(r) : e.push({
                            fn: r,
                            async: !1
                        })
                    }
                    return e
                }
        },
        24: (t, e, n) => {
            n.d(e, {
                seqId: () => i
            });
            var r = n(3),
                i = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia_",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = r.Wistia._sequenceVal || 1,
                        i = "".concat(t).concat(n).concat(e);
                    return r.Wistia._sequenceVal = n + 1, i
                }
        },
        31: (t, e, n) => {
            n.d(e, {
                countMetric: () => l
            });
            var r = n(3),
                i = n(7),
                o = n(10),
                a = n(32),
                c = n(21);
            null == r.Wistia._simpleMetricsCache && (r.Wistia._simpleMetricsCache = {}), null == r.Wistia._simpleMetricsDebounceInterval && (r.Wistia._simpleMetricsDebounceInterval = 500);
            var s = r.Wistia._simpleMetricsCache,
                l = function(t) {
                    return f("count", t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})
                },
                u = function() {
                    if ((0, a.isVisitorTrackingEnabled)()) {
                        for (var t = "https://".concat((0, c.metricsHost)(), "/mput?topic=metrics"), e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                        return fetch(t, {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: n.join("\n")
                        }).then((function(t) {
                            t.ok || console.error(t)
                        })).catch((function(t) {
                            console.error(t)
                        }))
                    }
                },
                f = function(t, e, n) {
                    var c, l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    if ((0, a.isVisitorTrackingEnabled)()) try {
                        null == s.toMput && (s.toMput = []);
                        var f = (0, i.assign)({
                                type: t,
                                key: e,
                                value: null != n ? n : null
                            }, l),
                            p = JSON.stringify(f, (c = new WeakSet, function(t, e) {
                                if ("object" == typeof e && null !== e) {
                                    if (c.has(e)) return "[Circular]";
                                    c.add(e)
                                }
                                return e
                            }));
                        s.toMput.push(p), clearTimeout(r.Wistia._msendTimeout), r.Wistia._msendTimeout = setTimeout((function() {
                            (0, o.pageLoaded)((function() {
                                u.apply(undefined, s.toMput), s.toMput = []
                            }))
                        }), r.Wistia._simpleMetricsDebounceInterval)
                    } catch (t) {
                        console.error(t.message), console.error(t.stack)
                    }
                }
        },
        67: (t, e, n) => {
            n.d(e, {
                clearTimeouts: () => a,
                doTimeout: () => o
            });
            var r = n(3),
                i = n(6);
            r.Wistia;
            null == r.Wistia._timeouts && (r.Wistia._timeouts = {});
            var o = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    (0, i.isArray)(t) && (t = t.join("."));
                    var o = s(t);
                    if (a(t, o), e) {
                        var c = r.Wistia._timeouts[o];
                        null == c && (c = r.Wistia._timeouts[o] = {});
                        var l = setTimeout((function() {
                            delete c[t], e()
                        }), n);
                        return c[t] = l, l
                    }
                    return r.Wistia._timeouts[o][t]
                },
                a = function(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if ((0, i.isArray)(t) && (t = t.join(".")), "__global__" === (n = n || s(t)) && (e = r.Wistia._timeouts[t]))
                        for (var o in e) {
                            var a = e[o];
                            clearTimeout(a), delete e[o]
                        }
                    if (e = r.Wistia._timeouts[n])
                        for (var l in e) {
                            var u = e[l];
                            !l.indexOf || 0 !== l.indexOf(t) || l.length !== t.length && "." !== l.charAt(t.length) || (clearTimeout(u), delete e[l])
                        }
                    r.Wistia.blockSweepTimeouts || (r.Wistia.blockSweepTimeouts = !0, setTimeout(c, 0), setTimeout((function() {
                        r.Wistia.blockSweepTimeouts = !1
                    }), 5e3))
                },
                c = function() {
                    for (var t in r.Wistia._timeouts) {
                        var e = r.Wistia._timeouts[t];
                        (0, i.isEmpty)(e) && delete r.Wistia._timeouts[t]
                    }
                },
                s = function(t) {
                    var e = t.indexOf(".");
                    return e > 0 ? t.substring(0, e) : "__global__"
                }
        },
        32: (t, e, n) => {
            n.d(e, {
                isVisitorTrackingEnabled: () => f
            });
            var r = n(3),
                i = n(14),
                o = n(33),
                a = n(35);

            function c(t) {
                return function(t) {
                    if (Array.isArray(t)) return s(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return s(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
                return r
            }
            var l;
            r.Wistia._visitorTrackingDomain || (r.Wistia._visitorTrackingDomain = location.hostname || ""), r.Wistia._visitorTracking || (null != (l = (0, o.getWistiaLocalStorage)().visitorTrackingEnabled) && ((0, o.updateWistiaLocalStorage)((function(t) {
                return delete t.visitorTrackingEnabled
            })), r.Wistia._visitorTracking = {}, r.Wistia._visitorTracking[r.Wistia._visitorTrackingDomain] = {
                isEnabled: l,
                updatedAt: Date.now()
            }, (0, o.updateWistiaLocalStorage)((function(t) {
                return t.visitorTracking = r.Wistia._visitorTracking
            }))), r.Wistia._visitorTracking = (0, o.getWistiaLocalStorage)().visitorTracking || {});
            r.Wistia.consent = function(t) {
                return null == t ? f() : u(t)
            };
            var u = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r.Wistia._visitorTrackingDomain;
                    "default" === t ? delete r.Wistia._visitorTracking[e] : r.Wistia._visitorTracking[e] = {
                        isEnabled: "true" === "".concat(t),
                        updatedAt: Date.now()
                    }, (0, o.updateWistiaLocalStorage)((function(t) {
                        return t.visitorTracking = r.Wistia._visitorTracking
                    })), (0, i.globalTrigger)("visitortrackingchange", t), c(document.getElementsByTagName("wistia-player")).forEach((function(e) {
                        e.dispatchEvent(new CustomEvent("visitor-tracking-change", {
                            detail: {
                                isTrackingEnabled: t
                            }
                        }))
                    }))
                },
                f = function() {
                    if ("boolean" == typeof r.Wistia._visitorTracking) return r.Wistia._visitorTracking;
                    if (r.Wistia._visitorTracking) {
                        var t = function() {
                            if (r.Wistia._visitorTrackingDomain)
                                for (var t = r.Wistia._visitorTrackingDomain.split("."); t.length > 0;) {
                                    var e = r.Wistia._visitorTracking[t.join(".")],
                                        n = e && e.isEnabled;
                                    if (null != n) return n;
                                    t.shift()
                                }
                        }();
                        if (null != t) return Boolean(t)
                    }
                    var e = (0, a.getAllApiHandles)();
                    if (r.Wistia.channel && r.Wistia.channel.all) try {
                        e.push.apply(e, c(r.Wistia.channel.all()))
                    } catch (t) {}
                    return !e.some((function(t) {
                        return !0 === (t._mediaData || t._galleryData || {}).privacyMode
                    }))
                }
        },
        22: (t, e, n) => {
            n.d(e, {
                Url: () => u,
                proto: () => o
            });
            var r = n(6),
                i = n(13),
                o = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.href;
                    return /^http:\/\//.test(t) ? "http:" : "https:"
                },
                a = function(t) {
                    if (null == t) return t;
                    var e;
                    try {
                        e = decodeURIComponent(t)
                    } catch (n) {
                        setTimeout((function() {
                            i.wlog.notice(n)
                        }), 50), e = t
                    }
                    return e
                },
                c = function(t) {
                    for (var e = t[0], n = 1; n < t.length; n++) e += "[".concat(t[n], "]");
                    return e
                },
                s = function(t) {
                    return t.match(/([\w\-_]+)/g)
                },
                l = ["protocol", "host", "port", "params", "path"],
                u = function(t) {
                    var e = this;
                    return e.params = {}, e.path = [], e.host = "", "object" == typeof t ? e.fromOptions(t) : t && e.fromRaw(t), e
                },
                f = u.prototype;
            f.fromOptions = function(t) {
                for (var e = 0; e < l.length; e++) {
                    var n = l[e];
                    null != t[n] && (this[n] = t[n])
                }
                return this
            }, f.fromRaw = function(t) {
                var e;
                return this.rawUrl = t, (e = t.match(/^((?:https?:)|(?:file:)|(?:ftp:))?\/\//)) && (this.protocol = e[1] || void 0), (e = t.match(/\/\/([^:?#/]*)/)) && (this.host = e[1] || void 0), (e = t.match(/\/\/.*?(\/[^?#$]+)/) || t.match(/(^\/[^/][^?#$]+)/)) && this.setPath(e[1]), (e = t.match(/:(\d+)/)) && (this.port = parseInt(e[1], 10)), (e = t.match(/\?([^#]+)/)) && (this.rawParams = e[1], this.params = function(t) {
                    var e = {};
                    if (!t) return e;
                    for (var n = t.split("&"), o = function() {
                            var t = n[c].split("="),
                                o = t[0],
                                l = t[1];
                            try {
                                o = s(decodeURIComponent(o)) || ""
                            } catch (t) {
                                setTimeout((function() {
                                    i.wlog.notice(t)
                                }), 50), o = ""
                            }(0, r.cast)(o);
                            var u = (0, r.getDeep)(e, o);
                            if (null != u)
                                if ((0, r.isArray)(u)) u.push(a(l));
                                else {
                                    var f = [u];
                                    f.push(a(l)), (0, r.setAndPreserveUndefined)(e, o, f)
                                }
                            else(0, r.setAndPreserveUndefined)(e, o, a(l))
                        }, c = 0; c < n.length; c++) o();
                    return e
                }(this.rawParams)), (e = t.match(/#(.*)$/)) && (this.anchor = e[1]), this
            }, f.clone = function() {
                return new u({
                    protocol: this.protocol,
                    host: this.host,
                    port: this.port,
                    path: (0, r.clone)(this.path),
                    params: (0, r.clone)(this.params),
                    anchor: this.anchor
                })
            }, f.ext = function(t) {
                if (null != t) {
                    var e = this.ext(),
                        n = this.path.length - 1,
                        r = new RegExp("\\.".concat(e), "g");
                    return e && (this.path[n] = "".concat(this.path[n].replace(r, ""))), this.path[n] = "".concat(this.path[n], ".").concat(t)
                }
                var i = this.path[this.path.length - 1].match(/\.(.*)$/);
                return null != i && i[1] || null
            }, f.isRelative = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location,
                    e = this.protocol,
                    n = this.host;
                return !(null != e && "" !== e && e !== t.protocol || n && n !== t.hostname)
            }, f.toString = function() {
                return this.isRelative() ? this.relative() : this.absolute()
            }, f.absolute = function() {
                var t = "";
                null != this.protocol && (t = this.protocol);
                var e = "";
                return null != this.port && (e = ":".concat(this.port)), "".concat(t, "//").concat(this.host || location.host).concat(e).concat(this.relative())
            }, f.relative = function() {
                var t, e = "";
                this.path.length > 0 && ("string" == typeof(t = this.path) && (t = t.split("/")), e = null == t ? "" : "/".concat(t.join("/")), this._hasTrailingSlash && (e += "/"));
                var n, i, o = "?".concat((n = this.params, i = [], (0, r.eachLeaf)(n, (function(t, e) {
                    null != t ? i.push("".concat(encodeURIComponent(c(e)), "=").concat(encodeURIComponent(t))) : i.push(encodeURIComponent(c(e)))
                })), i.join("&")));
                return 1 === o.length && (o = ""), "".concat(e).concat(o).concat(this.relativeAnchor())
            }, f.authority = function() {
                var t = null != this.port ? ":".concat(this.port) : "";
                return "".concat(this.host).concat(t)
            }, f.relativeProtocol = function() {
                var t = "";
                return null != this.port && (t = ":".concat(this.port)), "//".concat(this.host).concat(t).concat(this.relative())
            }, f.relativeAnchor = function() {
                var t = "";
                return null != this.anchor && (t = "#".concat(this.anchor)), "".concat(t)
            }, f.setPath = function(t) {
                this.rawPath = t, this._hasTrailingSlash = /\/$/.test(this.rawPath), this.path = function(t) {
                    var e = [];
                    if (null == t) return e;
                    for (var n = t.split(/\/+/), r = 0; r < n.length; r++) {
                        var i = n[r];
                        null != i && "" !== i && e.push(i)
                    }
                    return e
                }(this.rawPath)
            }, u.create = function(t) {
                return new u(t)
            };
            u.create;
            u.parse = function(t) {
                return new u(t)
            };
            u.parse
        },
        15: (t, e, n) => {
            n.d(e, {
                makeWbindable: () => o
            });
            var r = n(3),
                i = n(16);
            r.Wistia.bindable || (r.Wistia.bindable = {
                bind: function(t, e) {
                    return this.specialBind && !0 === this.specialBind.apply(this, arguments) ? this : e ? (i.bind.call(this, t, e), this) : void(r.Wistia.warn && r.Wistia.warn(this.constructor.name, "bind", "falsey value passed in as callback:", e))
                },
                unbind: function(t, e) {
                    return this.specialUnbind && !0 === this.specialUnbind.apply(this, arguments) || (e ? i.unbind.call(this, t, e) : this._bindings && (this._bindings[t] = []), this._bindings && this._bindings[t] && !this._bindings[t].length && (this._bindings[t] = null, delete this._bindings[t])), this
                },
                on: function(t, e) {
                    var n = this.specialBind && this.specialBind.apply(this, arguments);
                    return "function" == typeof n ? n : i.bind.call(this, t, e)
                },
                off: function(t, e) {
                    var n = this.specialUnbind && this.specialUnbind.apply(this, arguments);
                    return "function" == typeof n ? n : i.unbind.call(this, t, e)
                },
                rebind: function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), this
                },
                trigger: function(t) {
                    for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                    return (e = i.trigger).call.apply(e, [this, t].concat(r)), this
                },
                bindNamed: function() {
                    return i.bindNamed.apply(this, arguments)
                },
                unbindNamed: function() {
                    return i.unbindNamed.apply(this, arguments)
                },
                unbindAllInNamespace: function() {
                    return i.unbindAllInNamespace.apply(this, arguments)
                }
            });
            var o = function(t) {
                for (var e in r.Wistia.bindable) {
                    var n = r.Wistia.bindable[e];
                    t[e] || (t[e] = n)
                }
            }
        },
        37: (t, e, n) => {
            n.d(e, {
                wData: () => o
            });
            var r = n(3),
                i = n(6),
                o = function(t, e) {
                    return (0, i.isArray)(t) || (t = t.split(".")), null != e && (0, i.setDeep)(r.Wistia, ["_data"].concat(t), e), (0, i.getDeep)(r.Wistia, ["_data"].concat(t))
                }
        },
        33: (t, e, n) => {
            n.d(e, {
                getWistiaLocalStorage: () => a,
                updateWistiaLocalStorage: () => c
            });
            var r = n(3),
                i = n(34),
                o = "wistia",
                a = function() {
                    return (0, i.getLocalStorage)(o)
                },
                c = function(t) {
                    return r.Wistia._localStorage = (0, i.updateLocalStorage)(o, t), r.Wistia._localStorage
                }
        },
        13: (t, e, n) => {
            n.d(e, {
                wlog: () => _
            });
            var r = n(3),
                i = n(14);

            function o(t) {
                return function(t) {
                    if (Array.isArray(t)) return a(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return a(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function a(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
                return r
            }
            var c = {
                    ERROR: 0,
                    WARNING: 1,
                    NOTICE: 2,
                    INFO: 3,
                    DEBUG: 4,
                    error: 0,
                    warning: 1,
                    notice: 2,
                    info: 3,
                    debug: 4
                },
                s = function() {},
                l = function(t) {
                    var e = this;
                    null == t && (t = {});
                    return e.error = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        return e.log(0, n)
                    }, e.warn = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        return e.log(1, n)
                    }, e.notice = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        return e.log(1, n)
                    }, e.info = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        return e.log(3, n)
                    }, e.debug = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        return e.log(4, n)
                    }, e.ctx = t, e.ctx.initializedAt || e.reset(), e
                },
                u = l.prototype;
            u.reset = function() {
                this.ctx.level = 0, this.ctx.grep = null, this.ctx.grepv = null, this.ctx.first1000LogLines = [], this.ctx.last1000LogLines = [], this.ctx.initializedAt = (new Date).getTime()
            }, u.setLevel = function(t) {
                var e = this.logFunc(3);
                null != c[t] ? (this.ctx.level = c[t], e('Log level set to "'.concat(t, '" (').concat(c[t], ")"))) : e('Unknown log level "'.concat(t, '"'))
            }, u.setGrep = function(t) {
                this.ctx.grep = t
            }, u.setGrepv = function(t) {
                this.ctx.grepv = t
            }, u.first1000LogLines = function() {
                return this.ctx.first1000LogLines
            }, u.last1000LogLines = function() {
                return this.ctx.last1000LogLines
            }, u.matchedGrep = function(t) {
                var e = !1;
                if (this.ctx.grep || this.ctx.grepv) {
                    for (var n = [], r = 0; r < t.length; r++) try {
                        var i = t[r];
                        n.push(i.toString && i.toString())
                    } catch (t) {
                        n.push("")
                    }
                    var o = n.join(" "),
                        a = !this.ctx.grep || o.match(this.ctx.grep),
                        c = !this.ctx.grepv || !o.match(this.ctx.grepv);
                    e = a && c
                } else e = !0;
                return e
            }, u.now = function() {
                return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now().toFixed(3) : Date.now ? Date.now() - this.ctx.initializedAt : (new Date).getTime() - this.ctx.initializedAt
            }, u.messagesToLogLine = function(t, e, n) {
                var r, i = [t, e];
                i = i.concat(n);
                try {
                    (r = i.join(" ") || "").length > 200 && (r = r.slice(0, 200))
                } catch (t) {
                    r = "could not serialize"
                }
                return r
            }, u.persistLine = function(t) {
                this.ctx.first1000LogLines.length < 1e3 ? this.ctx.first1000LogLines.push(t) : (this.ctx.last1000LogLines.length >= 1e3 && this.ctx.last1000LogLines.shift(), this.ctx.last1000LogLines.push(t))
            }, u.log = function(t, e) {
                var n, r = t <= this.ctx.level,
                    a = t < 4,
                    c = (r || a) && this.matchedGrep(e);
                if (0 === t && (0, i.globalTrigger)("problem", {
                        type: "error-logged",
                        data: {
                            messages: e
                        }
                    }), c && (r || a) && (n = this.now()), a && c) {
                    var s = this.messagesToLogLine(t, n, e);
                    this.persistLine(s)
                }
                if (r && c) {
                    var l, u = this.logFunc(t);
                    1 === e.length && (l = e[0]) instanceof Error ? (u(l.message), l.stack && u(l.stack)) : u.apply(void 0, o(e))
                }
            };
            var f = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.error.apply(console, e)
                },
                p = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.warn.apply(console, e)
                },
                d = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.info.apply(console, e)
                },
                h = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.debug.apply(console, e)
                },
                v = function(t) {
                    console.log.apply(console, t)
                };
            u.logFunc = function(t) {
                return null == t && (t = this.level), console ? (0 === t ? e = f : 1 === t ? e = p : 3 === t ? e = d : 4 === t && (e = h), e || (e = v), "function" != typeof e && (this.noConsoleLog = !0, e = s), e) : s;
                var e
            }, u.maybePrefix = function(t, e) {
                if (t) {
                    if ("function" == typeof t) try {
                        t = t()
                    } catch (e) {
                        t = 'prefix err "'.concat(e.message, '"')
                    }
                    return t instanceof Array ? t.concat(e) : [t].concat(e)
                }
                return e
            }, u.getPrefixedFunctions = function(t) {
                var e = this;
                return {
                    log: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(0, e.maybePrefix(t, r))
                    },
                    error: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(0, e.maybePrefix(t, r))
                    },
                    warn: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(1, e.maybePrefix(t, r))
                    },
                    notice: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(1, e.maybePrefix(t, r))
                    },
                    info: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(3, e.maybePrefix(t, r))
                    },
                    debug: function() {
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.log(4, e.maybePrefix(t, r))
                    }
                }
            }, r.Wistia && null == r.Wistia.wlogCtx && (r.Wistia.wlogCtx = {});
            var _ = new l(r.Wistia.wlogCtx)
        },
        3: (t, e, n) => {
            n.d(e, {
                Wistia: () => o
            });
            var r = n(4),
                i = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };
            null == r.root.Wistia && (r.root.Wistia = {});
            var o = r.root.Wistia;
            null == o._initializers && (o._initializers = {}), null == o._destructors && (o._destructors = {}), null == o.mixin && (o.mixin = function(t, e) {
                for (var n in e) i(e, n) && (t[n] = e[n])
            }), null == o._remoteData && (o._remoteData = new Map), null == o._mediaDataPromises && (o._mediaDataPromises = {})
        }
    },
    __webpack_module_cache__ = {};

function __webpack_require__(t) {
    var e = __webpack_module_cache__[t];
    if (void 0 !== e) return e.exports;
    var n = __webpack_module_cache__[t] = {
        exports: {}
    };
    return __webpack_modules__[t](n, n.exports, __webpack_require__), n.exports
}
__webpack_require__.d = (t, e) => {
    for (var n in e) __webpack_require__.o(e, n) && !__webpack_require__.o(t, n) && Object.defineProperty(t, n, {
        enumerable: !0,
        get: e[n]
    })
}, __webpack_require__.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var __webpack_exports__ = {};
__webpack_require__.d(__webpack_exports__, {
    PlayPauseLoadingCircleControl: () => _embeds_media_players_vulcanV2Player_video_controls_PlayPauseLoadingCircleControl_PlayPauseLoadingCircleControl_js__WEBPACK_IMPORTED_MODULE_0__.PlayPauseLoadingCircleControl
});
var _embeds_media_players_vulcanV2Player_video_controls_PlayPauseLoadingCircleControl_PlayPauseLoadingCircleControl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(664),
    __webpack_exports__PlayPauseLoadingCircleControl = __webpack_exports__.PlayPauseLoadingCircleControl;
export {
    __webpack_exports__PlayPauseLoadingCircleControl as PlayPauseLoadingCircleControl
};
//# sourceMappingURL=playPauseLoadingControl.js.map