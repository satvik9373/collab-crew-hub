var __webpack_modules__ = {
        665: (t, e, n) => {
            n.d(e, {
                default: () => _
            });
            var r = n(2),
                o = n(11),
                i = n(6),
                a = n(24);

            function c(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, d(r.key), r)
                }
            }

            function l(t, e, n) {
                return e = s(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, u() ? Reflect.construct(e, n || [], s(t).constructor) : e.apply(t, n))
            }

            function u() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (u = function() {
                    return !!t
                })()
            }

            function s(t) {
                return s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, s(t)
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
            var h = (0, o.cachedDetect)();
            const _ = function(t) {
                function e() {
                    var t;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                    return p(t = l(this, e, [].concat(r)), "state", {
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
                                r = (0, i.clone)(n),
                                o = r[r.length - 1];
                            o.isFadingUp = !0;
                            var c = o.key;
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
                        var l = t.props.onClick;
                        l && l(e)
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
                }(e, t), n = e, (o = [{
                    key: "buttonStyle",
                    value: function(t) {
                        var e = this.props,
                            n = e.bottom,
                            r = e.left,
                            o = e.right,
                            i = e.scale,
                            a = e.top,
                            c = t.isFadingUp,
                            l = t.isFirstRender,
                            u = this.state,
                            s = u.isDisplayNone,
                            f = u.isMouseDown,
                            p = u.isOpaque,
                            d = 140 * i,
                            h = -50,
                            _ = .8;
                        return c ? h = -120 : l && (h = 20), c ? _ = 1 : l ? _ = .4 : f && (_ = .9), {
                            background: "rgba(0,0,0,.6)",
                            border: 0,
                            borderRadius: "50%",
                            bottom: n,
                            cursor: "pointer",
                            display: s ? "none" : "block",
                            height: "".concat(140 * i, "px"),
                            left: r,
                            margin: 0,
                            padding: 0,
                            pointerEvents: "auto",
                            position: "absolute",
                            opacity: !p || c || l ? 0 : 1,
                            outline: "none",
                            right: o,
                            top: a,
                            transform: "translate(-50%, ".concat(h, "%) scale(").concat(_, ")"),
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
                            var r = (0, i.clone)(n);
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
                            o = e.isDisplayNone,
                            i = e.isOpaque;
                        r && o ? (this.setState({
                            isDisplayNone: !1
                        }), setTimeout((function() {
                            n.setState({
                                isOpaque: !0
                            })
                        }), 10)) : !r && i && (this.setState({
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
                            o = e.children,
                            i = this.state.buttons;
                        return (0, r.h)("div", {
                            class: "w-css-reset w-css-reset-tree",
                            style: this.rootStyle()
                        }, i.map((function(e, a) {
                            return (0, r.h)("button", {
                                "aria-label": n,
                                class: "w-vulcan-v2-button",
                                key: e.key,
                                onClick: a === i.length - 1 && t.onClick,
                                onMouseDown: !h.touchScreen && t.onMouseDown,
                                onMouseUp: !h.touchScreen && t.onMouseUp,
                                onTouchEnd: h.touchScreen && t.onTouchEnd,
                                onTouchStart: h.touchScreen && t.onTouchStart,
                                style: t.buttonStyle(e)
                            }, o)
                        })))
                    }
                }]) && c(n.prototype, o), u && c(n, u), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, o, u
            }(r.Component)
        },
        727: (t, e, n) => {
            n.d(e, {
                default: () => f
            });
            var r = n(2),
                o = n(41);

            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, a(r.key), r)
                }
            }

            function a(t) {
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

            function c(t, e, n) {
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

            function s(t, e) {
                return s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, s(t, e)
            }
            const f = function(t) {
                function e() {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), c(this, e, arguments)
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
                    }), e && s(t, e)
                }(e, t), n = e, (a = [{
                    key: "shouldComponentUpdate",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this.props.text;
                        return (0, r.h)("svg", (0, o.standardSvgAttrs)({
                            width: 70,
                            height: 70
                        }), (0, r.h)("g", {
                            stroke: "none",
                            "stroke-width": "1",
                            fill: "none",
                            "fill-rule": "evenodd"
                        }, (0, r.h)("g", {
                            transform: "translate(21, 19)",
                            fill: "#FFFFFF"
                        }, (0, r.h)("path", {
                            d: "M18.8307003,5.48472398 C18.9849549,5.58316208 19.2201549,5.70476208 19.3224821,5.80320017 C19.6096094,6.07390494 19.5836458,6.4430478 19.3240094,6.68914304 C19.2216821,6.78758114 19.0124458,6.93379067 18.7528094,7.08144781 L10.8980456,12.1669336 C10.4566638,12.4361907 10.1221911,12.609905 9.86255472,12.3638098 C9.62888199,12.1423241 9.80910017,11.7731812 9.94044563,11.3562669 L11.3149911,7.64601925 C9.18902743,7.74300973 7.06306377,8.57973355 5.45484556,10.1040764 C1.95586369,13.4205717 1.95586369,18.8752004 5.45484556,22.1916957 C6.52738557,23.2082982 7.8175362,23.9109528 9.19170178,24.2988921 C11.6490035,24.9926103 10.9870366,27.6282987 8.3754991,26.8777119 C6.57455216,26.3600985 4.87919172,25.4282477 3.45870008,24.0822862 C-1.15213636,19.709029 -1.15366363,12.5852955 3.45870008,8.21203831 C5.61062738,6.17234304 8.4620456,5.04175254 11.3394275,4.91870492 L9.96488199,1.11001915 C9.78466381,0.643885812 9.65484562,0.323961998 9.88699108,0.103923899 C10.1466274,-0.142171343 10.5101184,0.103923899 10.7957184,0.274742949 L18.8307003,5.48472398 Z"
                        }), (0, r.h)("text", {
                            style: {
                                fontFamily: "WistiaPlayerInterNumbersSemiBold, Helvetica, Arial",
                                fontSize: "16px",
                                fontWeight: 600
                            }
                        }, (0, r.h)("tspan", {
                            x: "14.2450911",
                            y: "26.5904763"
                        }, t)))))
                    }
                }]) && i(n.prototype, a), l && i(n, l), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, a, l
            }(r.Component)
        },
        729: (t, e, n) => {
            n.d(e, {
                default: () => f
            });
            var r = n(2),
                o = n(41);

            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, a(r.key), r)
                }
            }

            function a(t) {
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

            function c(t, e, n) {
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

            function s(t, e) {
                return s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, s(t, e)
            }
            const f = function(t) {
                function e() {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), c(this, e, arguments)
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
                    }), e && s(t, e)
                }(e, t), n = e, (a = [{
                    key: "shouldComponentUpdate",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this.props.text;
                        return (0, r.h)("svg", (0, o.standardSvgAttrs)({
                            width: 70,
                            height: 70
                        }), (0, r.h)("g", {
                            stroke: "none",
                            "stroke-width": "1",
                            fill: "none",
                            "fill-rule": "evenodd"
                        }, (0, r.h)("g", {
                            fill: "#FFFFFF"
                        }, (0, r.h)("path", {
                            d: "M47.9784762,24.4847239 C48.132381,24.583162 48.3670476,24.704762 48.4691429,24.8032001 C48.7556191,25.0739049 48.7297143,25.4430477 48.4706667,25.6891429 C48.3685715,25.787581 48.1598095,25.9337906 47.9007619,26.0814477 L40.0638095,31.1669334 C39.6234286,31.4361906 39.2897143,31.6099049 39.0306667,31.3638096 C38.7975238,31.1423239 38.9773334,30.773181 39.108381,30.3562668 L40.4798095,26.6460191 C38.3586667,26.7430096 36.2375238,27.5797334 34.6329524,29.1040763 C31.1419048,32.4205715 31.1419048,37.8752001 34.6329524,41.1916953 C35.7030603,42.2082979 36.9902854,42.9109525 38.361335,43.2988917 C40.8130645,43.9926099 40.1525988,46.6282983 37.5469831,45.8777115 C35.75012,45.3600981 34.0586039,44.4282473 32.6413334,43.0822858 C28.0409524,38.7090287 28.0394286,31.5852953 32.6413334,27.2120382 C34.788381,25.1723429 37.6333334,24.0417525 40.5041905,23.9187049 L39.1327619,20.1100191 C38.9529524,19.6438858 38.8234286,19.323962 39.0550476,19.1039239 C39.3140953,18.8578287 39.6767619,19.1039239 39.9617143,19.2747429 L47.9784762,24.4847239 Z",
                            fill: "#FFFFFF",
                            transform: "translate(43.932527, 32.505451) scale(-1, 1) translate(-38.932527, -32.505451)"
                        }), (0, r.h)("text", {
                            style: {
                                fontFamily: "WistiaPlayerInterNumbersSemiBold, Helvetica, Arial",
                                fontSize: "16px",
                                fontWeight: 600
                            }
                        }, (0, r.h)("tspan", {
                            x: "19.0026667",
                            y: "45.5904762"
                        }, t)))))
                    }
                }]) && i(n.prototype, a), l && i(n, l), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, a, l
            }(r.Component)
        },
        35: (t, e, n) => {
            n.d(e, {
                getAllApiHandles: () => o
            });
            n(36), n(13);
            var r = n(37);
            var o = function() {
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

            function o(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? r(Object(n), !0).forEach((function(e) {
                        i(t, e, n[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }))
                }
                return t
            }

            function i(t, e, n) {
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
                    i = void 0 === r ? 34 : r,
                    a = t.styleOverride,
                    c = void 0 === a ? {} : a,
                    l = t.ariaHidden,
                    u = void 0 !== l && l,
                    s = t.fillColor,
                    f = void 0 === s ? "#ffffff" : s;
                return {
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 ".concat(n, " ").concat(i),
                    "enable-background": "new 0 0 ".concat(n, " ").concat(i),
                    "aria-hidden": "".concat(!!u),
                    style: o({
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
                Component: () => k,
                h: () => g,
                render: () => U
            });
            var r, o, i, a, c, l, u, s, f, p, d = {},
                h = [],
                _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
                v = Array.isArray;

            function y(t, e) {
                for (var n in e) t[n] = e[n];
                return t
            }

            function m(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }

            function g(t, e, n) {
                var o, i, a, c = {};
                for (a in e) "key" == a ? o = e[a] : "ref" == a ? i = e[a] : c[a] = e[a];
                if (arguments.length > 2 && (c.children = arguments.length > 3 ? r.call(arguments, 2) : n), "function" == typeof t && null != t.defaultProps)
                    for (a in t.defaultProps) void 0 === c[a] && (c[a] = t.defaultProps[a]);
                return b(t, c, o, i, null)
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
                    __v: null == a ? ++i : a,
                    __i: -1,
                    __u: 0
                };
                return null == a && null != o.vnode && o.vnode(c), c
            }

            function w(t) {
                return t.children
            }

            function k(t, e) {
                this.props = t, this.context = e
            }

            function S(t, e) {
                if (null == e) return t.__ ? S(t.__, t.__i + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return "function" == typeof t.type ? S(t) : null
            }

            function O(t) {
                var e, n;
                if (null != (t = t.__) && null != t.__c) {
                    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
                        if (null != (n = t.__k[e]) && null != n.__e) {
                            t.__e = t.__c.base = n.__e;
                            break
                        }
                    return O(t)
                }
            }

            function T(t) {
                (!t.__d && (t.__d = !0) && a.push(t) && !P.__r++ || c !== o.debounceRendering) && ((c = o.debounceRendering) || l)(P)
            }

            function P() {
                var t, e, n, r, i, c, l, s;
                for (a.sort(u); t = a.shift();) t.__d && (e = a.length, r = void 0, c = (i = (n = t).__v).__e, l = [], s = [], n.__P && ((r = y({}, i)).__v = i.__v + 1, o.vnode && o.vnode(r), L(n.__P, r, i, n.__n, n.__P.namespaceURI, 32 & i.__u ? [c] : null, l, null == c ? S(i) : c, !!(32 & i.__u), s), r.__v = i.__v, r.__.__k[r.__i] = r, B(l, r, s), r.__e != c && O(r)), a.length > e && a.sort(u));
                P.__r = 0
            }

            function j(t, e, n, r, o, i, a, c, l, u, s) {
                var f, p, _, v, y, m = r && r.__k || h,
                    g = e.length;
                for (n.__d = l, E(n, e, m), l = n.__d, f = 0; f < g; f++) null != (_ = n.__k[f]) && "boolean" != typeof _ && "function" != typeof _ && (p = -1 === _.__i ? d : m[_.__i] || d, _.__i = f, L(t, _, p, o, i, a, c, l, u, s), v = _.__e, _.ref && p.ref != _.ref && (p.ref && I(p.ref, null, _), s.push(_.ref, _.__c || v, _)), null == y && null != v && (y = v), 65536 & _.__u || p.__k === _.__k ? l = C(_, l, t) : "function" == typeof _.type && void 0 !== _.__d ? l = _.__d : v && (l = v.nextSibling), _.__d = void 0, _.__u &= -196609);
                n.__d = l, n.__e = y
            }

            function E(t, e, n) {
                var r, o, i, a, c, l = e.length,
                    u = n.length,
                    s = u,
                    f = 0;
                for (t.__k = [], r = 0; r < l; r++) a = r + f, null != (o = t.__k[r] = null == (o = e[r]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? b(null, o, null, null, null) : v(o) ? b(w, {
                    children: o
                }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? b(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = t, o.__b = t.__b + 1, c = W(o, n, a, s), o.__i = c, i = null, -1 !== c && (s--, (i = n[c]) && (i.__u |= 131072)), null == i || null === i.__v ? (-1 == c && f--, "function" != typeof o.type && (o.__u |= 65536)) : c !== a && (c == a - 1 ? f = c - a : c == a + 1 ? f++ : c > a ? s > l - a ? f += c - a : f-- : c < a && f++, c !== r + f && (o.__u |= 65536))) : (i = n[a]) && null == i.key && i.__e && !(131072 & i.__u) && (i.__e == t.__d && (t.__d = S(i)), R(i, i, !1), n[a] = null, s--);
                if (s)
                    for (r = 0; r < u; r++) null != (i = n[r]) && !(131072 & i.__u) && (i.__e == t.__d && (t.__d = S(i)), R(i, i))
            }

            function C(t, e, n) {
                var r, o;
                if ("function" == typeof t.type) {
                    for (r = t.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = t, e = C(r[o], e, n));
                    return e
                }
                t.__e != e && (e && t.type && !n.contains(e) && (e = S(t)), n.insertBefore(t.__e, e || null), e = t.__e);
                do {
                    e = e && e.nextSibling
                } while (null != e && 8 === e.nodeType);
                return e
            }

            function W(t, e, n, r) {
                var o = t.key,
                    i = t.type,
                    a = n - 1,
                    c = n + 1,
                    l = e[n];
                if (null === l || l && o == l.key && i === l.type && !(131072 & l.__u)) return n;
                if (r > (null == l || 131072 & l.__u ? 0 : 1))
                    for (; a >= 0 || c < e.length;) {
                        if (a >= 0) {
                            if ((l = e[a]) && !(131072 & l.__u) && o == l.key && i === l.type) return a;
                            a--
                        }
                        if (c < e.length) {
                            if ((l = e[c]) && !(131072 & l.__u) && o == l.key && i === l.type) return c;
                            c++
                        }
                    }
                return -1
            }

            function x(t, e, n) {
                "-" === e[0] ? t.setProperty(e, null == n ? "" : n) : t[e] = null == n ? "" : "number" != typeof n || _.test(e) ? n : n + "px"
            }

            function A(t, e, n, r, o) {
                var i;
                t: if ("style" === e)
                    if ("string" == typeof n) t.style.cssText = n;
                    else {
                        if ("string" == typeof r && (t.style.cssText = r = ""), r)
                            for (e in r) n && e in n || x(t.style, e, "");
                        if (n)
                            for (e in n) r && n[e] === r[e] || x(t.style, e, n[e])
                    }
                else if ("o" === e[0] && "n" === e[1]) i = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in t || "onFocusOut" === e || "onFocusIn" === e ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + i] = n, n ? r ? n.u = r.u : (n.u = s, t.addEventListener(e, i ? p : f, i)) : t.removeEventListener(e, i ? p : f, i);
                else {
                    if ("http://www.w3.org/2000/svg" == o) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
                    else if ("width" != e && "height" != e && "href" != e && "list" != e && "form" != e && "tabIndex" != e && "download" != e && "rowSpan" != e && "colSpan" != e && "role" != e && "popover" != e && e in t) try {
                        t[e] = null == n ? "" : n;
                        break t
                    } catch (t) {}
                    "function" == typeof n || (null == n || !1 === n && "-" !== e[4] ? t.removeAttribute(e) : t.setAttribute(e, "popover" == e && 1 == n ? "" : n))
                }
            }

            function D(t) {
                return function(e) {
                    if (this.l) {
                        var n = this.l[e.type + t];
                        if (null == e.t) e.t = s++;
                        else if (e.t < n.u) return;
                        return n(o.event ? o.event(e) : e)
                    }
                }
            }

            function L(t, e, n, r, i, a, c, l, u, s) {
                var f, p, d, h, _, m, g, b, S, O, T, P, E, C, W, x, A = e.type;
                if (void 0 !== e.constructor) return null;
                128 & n.__u && (u = !!(32 & n.__u), a = [l = e.__e = n.__e]), (f = o.__b) && f(e);
                t: if ("function" == typeof A) try {
                    if (b = e.props, S = "prototype" in A && A.prototype.render, O = (f = A.contextType) && r[f.__c], T = f ? O ? O.props.value : f.__ : r, n.__c ? g = (p = e.__c = n.__c).__ = p.__E : (S ? e.__c = p = new A(b, T) : (e.__c = p = new k(b, T), p.constructor = A, p.render = N), O && O.sub(p), p.props = b, p.state || (p.state = {}), p.context = T, p.__n = r, d = p.__d = !0, p.__h = [], p._sb = []), S && null == p.__s && (p.__s = p.state), S && null != A.getDerivedStateFromProps && (p.__s == p.state && (p.__s = y({}, p.__s)), y(p.__s, A.getDerivedStateFromProps(b, p.__s))), h = p.props, _ = p.state, p.__v = e, d) S && null == A.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), S && null != p.componentDidMount && p.__h.push(p.componentDidMount);
                    else {
                        if (S && null == A.getDerivedStateFromProps && b !== h && null != p.componentWillReceiveProps && p.componentWillReceiveProps(b, T), !p.__e && (null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(b, p.__s, T) || e.__v === n.__v)) {
                            for (e.__v !== n.__v && (p.props = b, p.state = p.__s, p.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach((function(t) {
                                    t && (t.__ = e)
                                })), P = 0; P < p._sb.length; P++) p.__h.push(p._sb[P]);
                            p._sb = [], p.__h.length && c.push(p);
                            break t
                        }
                        null != p.componentWillUpdate && p.componentWillUpdate(b, p.__s, T), S && null != p.componentDidUpdate && p.__h.push((function() {
                            p.componentDidUpdate(h, _, m)
                        }))
                    }
                    if (p.context = T, p.props = b, p.__P = t, p.__e = !1, E = o.__r, C = 0, S) {
                        for (p.state = p.__s, p.__d = !1, E && E(e), f = p.render(p.props, p.state, p.context), W = 0; W < p._sb.length; W++) p.__h.push(p._sb[W]);
                        p._sb = []
                    } else
                        do {
                            p.__d = !1, E && E(e), f = p.render(p.props, p.state, p.context), p.state = p.__s
                        } while (p.__d && ++C < 25);
                    p.state = p.__s, null != p.getChildContext && (r = y(y({}, r), p.getChildContext())), S && !d && null != p.getSnapshotBeforeUpdate && (m = p.getSnapshotBeforeUpdate(h, _)), j(t, v(x = null != f && f.type === w && null == f.key ? f.props.children : f) ? x : [x], e, n, r, i, a, c, l, u, s), p.base = e.__e, e.__u &= -161, p.__h.length && c.push(p), g && (p.__E = p.__ = null)
                } catch (t) {
                    if (e.__v = null, u || null != a) {
                        for (e.__u |= u ? 160 : 32; l && 8 === l.nodeType && l.nextSibling;) l = l.nextSibling;
                        a[a.indexOf(l)] = null, e.__e = l
                    } else e.__e = n.__e, e.__k = n.__k;
                    o.__e(t, e, n)
                } else null == a && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = M(n.__e, e, n, r, i, a, c, u, s);
                (f = o.diffed) && f(e)
            }

            function B(t, e, n) {
                e.__d = void 0;
                for (var r = 0; r < n.length; r++) I(n[r], n[++r], n[++r]);
                o.__c && o.__c(e, t), t.some((function(e) {
                    try {
                        t = e.__h, e.__h = [], t.some((function(t) {
                            t.call(e)
                        }))
                    } catch (t) {
                        o.__e(t, e.__v)
                    }
                }))
            }

            function M(t, e, n, o, i, a, c, l, u) {
                var s, f, p, h, _, y, g, b = n.props,
                    w = e.props,
                    k = e.type;
                if ("svg" === k ? i = "http://www.w3.org/2000/svg" : "math" === k ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), null != a)
                    for (s = 0; s < a.length; s++)
                        if ((_ = a[s]) && "setAttribute" in _ == !!k && (k ? _.localName === k : 3 === _.nodeType)) {
                            t = _, a[s] = null;
                            break
                        }
                if (null == t) {
                    if (null === k) return document.createTextNode(w);
                    t = document.createElementNS(i, k, w.is && w), a = null, l = !1
                }
                if (null === k) b === w || l && t.data === w || (t.data = w);
                else {
                    if (a = a && r.call(t.childNodes), b = n.props || d, !l && null != a)
                        for (b = {}, s = 0; s < t.attributes.length; s++) b[(_ = t.attributes[s]).name] = _.value;
                    for (s in b)
                        if (_ = b[s], "children" == s);
                        else if ("dangerouslySetInnerHTML" == s) p = _;
                    else if ("key" !== s && !(s in w)) {
                        if ("value" == s && "defaultValue" in w || "checked" == s && "defaultChecked" in w) continue;
                        A(t, s, null, _, i)
                    }
                    for (s in w) _ = w[s], "children" == s ? h = _ : "dangerouslySetInnerHTML" == s ? f = _ : "value" == s ? y = _ : "checked" == s ? g = _ : "key" === s || l && "function" != typeof _ || b[s] === _ || A(t, s, _, b[s], i);
                    if (f) l || p && (f.__html === p.__html || f.__html === t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
                    else if (p && (t.innerHTML = ""), j(t, v(h) ? h : [h], e, n, o, "foreignObject" === k ? "http://www.w3.org/1999/xhtml" : i, a, c, a ? a[0] : n.__k && S(n, 0), l, u), null != a)
                        for (s = a.length; s--;) null != a[s] && m(a[s]);
                    l || (s = "value", void 0 !== y && (y !== t[s] || "progress" === k && !y || "option" === k && y !== b[s]) && A(t, s, y, b[s], i), s = "checked", void 0 !== g && g !== t[s] && A(t, s, g, b[s], i))
                }
                return t
            }

            function I(t, e, n) {
                try {
                    if ("function" == typeof t) {
                        var r = "function" == typeof t.__u;
                        r && t.__u(), r && null == e || (t.__u = t(e))
                    } else t.current = e
                } catch (t) {
                    o.__e(t, n)
                }
            }

            function R(t, e, n) {
                var r, i;
                if (o.unmount && o.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || I(r, null, e)), null != (r = t.__c)) {
                    if (r.componentWillUnmount) try {
                        r.componentWillUnmount()
                    } catch (t) {
                        o.__e(t, e)
                    }
                    r.base = r.__P = null
                }
                if (r = t.__k)
                    for (i = 0; i < r.length; i++) r[i] && R(r[i], e, n || "function" != typeof t.type);
                n || null == t.__e || m(t.__e), t.__c = t.__ = t.__e = t.__d = void 0
            }

            function N(t, e, n) {
                return this.constructor(t, n)
            }

            function U(t, e, n) {
                var i, a, c, l;
                o.__ && o.__(t, e), a = (i = "function" == typeof n) ? null : n && n.__k || e.__k, c = [], l = [], L(e, t = (!i && n || e).__k = g(w, null, [t]), a || d, d, e.namespaceURI, !i && n ? [n] : a ? null : e.firstChild ? r.call(e.childNodes) : null, c, !i && n ? n : a ? a.__e : e.firstChild, i, l), B(c, t, l)
            }
            r = h.slice, o = {
                __e: function(t, e, n, r) {
                    for (var o, i, a; e = e.__;)
                        if ((o = e.__c) && !o.__) try {
                            if ((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(t)), a = o.__d), null != o.componentDidCatch && (o.componentDidCatch(t, r || {}), a = o.__d), a) return o.__E = o
                        } catch (e) {
                            t = e
                        }
                    throw t
                }
            }, i = 0, k.prototype.setState = function(t, e) {
                var n;
                n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = y({}, this.state), "function" == typeof t && (t = t(y({}, n), this.props)), t && y(n, t), null != t && this.__v && (e && this._sb.push(e), T(this))
            }, k.prototype.forceUpdate = function(t) {
                this.__v && (this.__e = !0, t && this.__h.push(t), T(this))
            }, k.prototype.render = w, a = [], l = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, u = function(t, e) {
                return t.__v.__b - e.__v.__b
            }, P.__r = 0, s = 0, f = D(!1), p = D(!0)
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
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, o(r.key), r)
                }
            }

            function o(t) {
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

            function i(t, e, n) {
                (function(t, e) {
                    if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                })(t, e), e.set(t, n)
            }

            function a(t, e, n) {
                if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
                throw new TypeError("Private element is not present on this object")
            }
            n.d(e, {
                default: () => l
            });
            var c = new WeakMap;
            const l = function() {
                return t = function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), i(this, c, void 0), this.video = e, this.embedElement = e.container, this.unbinds = [], this.eventListeners = new Map, this.reactMounts = {}, this.isWistiaPlayer = "WISTIA-PLAYER" === this.embedElement.tagName, this.impl = e, this.api = this.isWistiaPlayer ? this.embedElement : e.publicApi
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
        726: (t, e, n) => {
            n.d(e, {
                SkipAheadControl: () => m
            });
            n(3);
            var r = n(2),
                o = n(174),
                i = n(11),
                a = n(167),
                c = n(665),
                l = n(727),
                u = n(66);

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, v(r.key), r)
                }
            }

            function f(t, e, n) {
                return e = d(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, p() ? Reflect.construct(e, n || [], d(t).constructor) : e.apply(t, n))
            }

            function p() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (p = function() {
                    return !!t
                })()
            }

            function d(t) {
                return d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, d(t)
            }

            function h(t, e) {
                return h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, h(t, e)
            }

            function _(t, e, n) {
                return (e = v(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function v(t) {
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
            var y = (0, i.cachedDetect)(),
                m = function(t) {
                    function e(t) {
                        var n;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), _(n = f(this, e, [t]), "onClick", (function() {
                            n.video.time(n.video.time() + 15)
                        })), _(n, "renderButton", (function() {
                            (0, r.render)((0, r.h)(c.default, {
                                ariaLabel: "Skip ahead 15 seconds",
                                fadeUpOnClick: !0,
                                isVisible: n.isVisible(),
                                left: "80%",
                                onClick: n.onClick,
                                scale: n.scale(),
                                top: "50%"
                            }, (0, r.h)(l.default, {
                                text: "15"
                            })), n.rootElem), n.reactMounts = [n.rootElem]
                        })), n.unbinds.push(t.on("play", n.renderButton), t.on("pause", n.renderButton), t.on("end", n.renderButton)), n
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
                        }), e && h(t, e)
                    }(e, t), n = e, (i = [{
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
                                o = "ended" === n && "reset" === e._attrs.endVideoBehavior,
                                i = e._impl.ui.anyDialogOpen();
                            return t && !i && !r && !o
                        }
                    }, {
                        key: "mount",
                        value: function(t) {
                            this.rootElem = t, this.renderButton()
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
                        key: "scale",
                        value: function() {
                            return .7 * Math.min(1.3, Math.max(.3, (0, o.controlMultiplierBasedOnVideo)(this.video, [640, 960])))
                        }
                    }]) && s(n.prototype, i), a && s(n, a), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, i, a
                }(a.default);
            m.shouldMount = function(t) {
                return y.touchScreen && t.duration() > 15 && !1 !== t._attrs.playBarControl
            }, m.handle = "skipAhead", m.type = "above-control-bar"
        },
        728: (t, e, n) => {
            n.d(e, {
                SkipBackControl: () => m
            });
            n(3);
            var r = n(2),
                o = n(174),
                i = n(11),
                a = n(167),
                c = n(665),
                l = n(729),
                u = n(66);

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, v(r.key), r)
                }
            }

            function f(t, e, n) {
                return e = d(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, p() ? Reflect.construct(e, n || [], d(t).constructor) : e.apply(t, n))
            }

            function p() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (p = function() {
                    return !!t
                })()
            }

            function d(t) {
                return d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, d(t)
            }

            function h(t, e) {
                return h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, h(t, e)
            }

            function _(t, e, n) {
                return (e = v(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function v(t) {
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
            var y = (0, i.cachedDetect)(),
                m = function(t) {
                    function e(t) {
                        var n;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), _(n = f(this, e, [t]), "onClick", (function() {
                            n.video.time(n.video.time() - 15)
                        })), _(n, "renderButton", (function() {
                            (0, r.render)((0, r.h)(c.default, {
                                ariaLabel: "Skip back 15 seconds",
                                fadeUpOnClick: !0,
                                isVisible: n.isVisible(),
                                left: "20%",
                                onClick: n.onClick,
                                scale: n.scale(),
                                top: "50%"
                            }, (0, r.h)(l.default, {
                                text: "15"
                            })), n.rootElem), n.reactMounts = [n.rootElem]
                        })), n.unbinds.push(t.on("play", n.renderButton), t.on("pause", n.renderButton), t.on("end", n.renderButton)), n
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
                        }), e && h(t, e)
                    }(e, t), n = e, (i = [{
                        key: "destroy",
                        value: function() {
                            (0, u.destroyControl)(this)
                        }
                    }, {
                        key: "isVisible",
                        value: function() {
                            var t = this.props.controlsAreVisible,
                                e = this.video,
                                n = "beforeplay" === e.state(),
                                r = e._impl.ui.anyDialogOpen();
                            return t && !n && !r
                        }
                    }, {
                        key: "mount",
                        value: function(t) {
                            this.rootElem = t, this.renderButton()
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
                        key: "scale",
                        value: function() {
                            return .7 * Math.min(1.3, Math.max(.3, (0, o.controlMultiplierBasedOnVideo)(this.video, [640, 960])))
                        }
                    }]) && s(n.prototype, i), a && s(n, a), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, i, a
                }(a.default);
            m.shouldMount = function(t) {
                return y.touchScreen && t.duration() > 15 && !1 !== t._attrs.playBarControl
            }, m.handle = "skipBack", m.type = "above-control-bar"
        },
        66: (t, e, n) => {
            n.d(e, {
                destroyControl: () => c
            });
            n(7);
            var r = n(11),
                o = (n(67), n(5)),
                i = n(2),
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
                        }(t), l(t), s(t), f(t)
                }),
                l = function(t) {
                    t.rootElem && (0, o.elemRemove)(Array.prototype.slice.call(t.rootElem.childNodes))
                },
                u = function(t) {
                    var e = t[0],
                        n = t[1];
                    e && n && (0, i.render)((0, i.h)("nothing", null), e)
                },
                s = function(t) {
                    var e = t.reactMounts;
                    if (e)
                        if (e instanceof Array) u(e);
                        else
                            for (var n in e) a(e, n) && e[n] && u(e[n])
                },
                f = function(t) {
                    for (var e in t) a(t, e) && ("_" !== (n = e)[0] || "_" !== n[1]) && "mounted" !== e && (t[e] = null);
                    var n;
                    t.__prevProps = null, t._destroyed = !0
                }
        },
        68: (t, e, n) => {
            n.d(e, {
                getControlDefinitions: () => i
            });
            var r = n(3),
                o = n(31);
            null == r.Wistia._controlDefinitions && (r.Wistia._controlDefinitions = {});
            var i = function() {
                return r.Wistia._controlDefinitions || {}
            };
            r.Wistia.defineControl = function(t) {
                var e;
                (0, o.countMetric)("player/custom-control-definition", 1, {
                    name: t.handle,
                    location: location.origin + location.pathname
                }), null != (e = t).handle ? null == r.Wistia._controlDefinitions[e.handle] && (r.Wistia._controlDefinitions[e.handle] = e, r.Wistia.trigger && r.Wistia.trigger("controldefined", e)) : console.error("Please specify a handle property for control", e)
            }
        },
        7: (t, e, n) => {
            n.d(e, {
                assign: () => o
            });
            var r = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                o = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    if (Object.assign) return Object.assign.apply(Object, [t].concat(n));
                    for (var o = 0; o < n.length; o++) i(t, n[o]);
                    return t
                },
                i = function(t, e) {
                    for (var n in e) r(e, n) && (t[n] = e[n]);
                    return t
                }
        },
        16: (t, e, n) => {
            n.d(e, {
                bind: () => u,
                bindNamed: () => _,
                trigger: () => p,
                unbind: () => s,
                unbindAllInNamespace: () => y,
                unbindNamed: () => v
            });
            var r = n(3),
                o = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };

            function i(t) {
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
            var c, l = Array.prototype.slice,
                u = function(t, e) {
                    var n = this;
                    return n._bindings || (n._bindings = {}), n._bindings[t] || (n._bindings[t] = []), n._bindings[t].push(e),
                        function() {
                            n.unbind(t, e)
                        }
                },
                s = function(t, e) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var n = [], r = 0; r < this._bindings[t].length; r++) {
                        var o = this._bindings[t][r];
                        o !== e && n.push(o)
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
                    for (var e, n = l.call(arguments, 1), o = i(this._bindings[t]), a = 0; a < o.length; a++) {
                        var c = o[a];
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
                        for (var u = 0; u < e.length; u++) {
                            var s = e[u];
                            this.unbind(s.event, s.fn)
                        }
                    return this
                },
                h = function(t, e) {
                    null == t._namedBindings && (t._namedBindings = {}), null == t._namedBindings[e] && (t._namedBindings[e] = {})
                },
                _ = function(t, e, n, r) {
                    return this.unbindNamed(t, e),
                        function(t, e, n, r, o) {
                            h(t, e), t._namedBindings[e][n] = {
                                event: r,
                                fn: o
                            }
                        }(this, t, e, n, r), this.bind(n, r),
                        function() {
                            this.unbindNamed(t, e)
                        }
                },
                v = function(t, e) {
                    h(this, t);
                    var n = function(t, e, n) {
                        return h(t, e), t._namedBindings[e][n]
                    }(this, t, e);
                    if (n) {
                        var r = n.event,
                            o = n.fn;
                        this.unbind(r, o)
                    }
                    var i = this._namedBindings;
                    return delete i[t][e], m(i[t]) && delete i[t], this
                },
                y = function(t) {
                    var e = this._namedBindings && this._namedBindings[t];
                    if (null == e) return this;
                    for (var n in e) o(e, n) && this.unbindNamed(t, n)
                },
                m = function(t) {
                    for (var e in t)
                        if (o(t, e)) return !1;
                    return !0
                };
            (c = function() {}.prototype).bind = u, c.unbind = s, c.on = u, c.off = s, c.rebind = f, c.trigger = p, c.bindNamed = _, c.unbindNamed = v, c.unbindAllInNamespace = y
        },
        11: (t, e, n) => {
            n.d(e, {
                cachedDetect: () => q
            });
            var r, o = n(3),
                i = n(4),
                a = n(12),
                c = navigator.userAgent,
                l = /(webkit)[ /]([^\s]+)/i,
                u = /OPR\/([^\s]+)/i,
                s = /(edge)\/(\d+(?:\.\d+)?)/i,
                f = /(mozilla)(?:.*? rv:([^\s)]+))?/i,
                p = /(android) ([^;]+)/i,
                d = /(iphone)/i,
                h = /(Windows Phone OS (\d+(?:\.\d+)?))/,
                _ = /OS (\d+)_(\d+)/i,
                v = /(playstation 3)/i,
                y = /BlackBerry|BB10/i,
                m = /(firefox)/i,
                g = /Mobile VR/i,
                b = /Version\/([^\s]+)/i,
                w = function() {
                    return (S()[1] || "webkit").toLowerCase()
                },
                k = function() {
                    return S()[2]
                },
                S = function() {
                    var t;
                    return (t = c.match(s)) || (t = c.match(l)) || (t = c.match(u)) ? t : t ? (null != document.documentMode && (t[2] = document.documentMode), t) : (t = c.match(f)) || []
                },
                O = function() {
                    var t = c.match(p);
                    return null != t && {
                        version: t[2]
                    }
                },
                T = function() {
                    return d.test(c)
                },
                P = function() {
                    return B() > 0 || O() || C()
                },
                j = function() {
                    try {
                        var t = matchMedia("(hover:hover)");
                        if ("not all" !== t.media) return t.matches
                    } catch (t) {}
                    return !P()
                },
                E = function() {
                    return y.test(c)
                },
                C = function() {
                    return /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1
                },
                W = function() {
                    return l.test(c) && !/chrome/i.test(c) && !C() && !T()
                },
                x = function() {
                    return !(!/Chrome/.test(c) || !/Google Inc/.test(navigator.vendor)) && {
                        version: D()
                    }
                },
                A = function() {
                    var t = c.match(/\bSilk\/([^\s]+)/);
                    return t && t[1]
                },
                D = function() {
                    var t = c.match(/\bChrome\/([^\s]+)/);
                    return t && t[1]
                },
                L = function() {
                    return u.test(c)
                },
                B = function() {
                    var t = c.match(_),
                        e = c.match(b);
                    return null != t ? parseFloat("".concat(t[1], ".").concat(t[2])) : null != e && e[1] && C() ? parseFloat(e[1]) : 0
                },
                M = function() {
                    return s.test(c)
                },
                I = function() {
                    return m.test(c)
                },
                R = function() {
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
                N = function() {
                    try {
                        return "localStorage" in i.root && null != i.root.localStorage
                    } catch (t) {
                        return !1
                    }
                },
                U = ["WebKit", "Moz", "O", "Ms", ""],
                F = function() {
                    for (var t = 0; t < U.length; t++) {
                        var e = "".concat(U[t], "MutationObserver");
                        if (i.root[e]) return e
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
                q = function() {
                    return o.Wistia._detectCache || (o.Wistia._detectCache = z()), o.Wistia._detectCache
                },
                z = function() {
                    var t, e, n, r, o, l, u, s, f, p, d, _, y = {
                        amazonSilk: !!/Silk/.test(c) && {
                            version: A()
                        },
                        browser: {
                            version: k()
                        },
                        edge: M(),
                        firefox: I(),
                        gearvr: g.test(c),
                        android: O(),
                        oldandroid: O() && parseFloat(O().version) < 4.1,
                        iphone: T(),
                        ipad: C(),
                        blackberry: E(),
                        safari: W(),
                        chrome: x(),
                        opera: L(),
                        winphone: {
                            version: h.test(c)[2]
                        },
                        ios: {
                            version: B()
                        },
                        windows: /win/i.test(navigator.platform),
                        mac: /mac/i.test(navigator.platform),
                        linux: /linux/i.test(navigator.platform),
                        retina: null != i.root.devicePixelRatio && i.root.devicePixelRatio > 1,
                        hoverIsNatural: j(),
                        touchScreen: P(),
                        ps3: v.test(c),
                        video: R(),
                        mediaSource: i.root.MediaSource && i.root.MediaSource.isTypeSupported("".concat('video/mp4; codecs="avc1.42E01E', ', mp4a.40.2"')),
                        nativeHls: (T() || C() || W()) && R().nativeHls,
                        localstorage: N(),
                        json: !(!i.root.JSON || "function" != typeof JSON.parse),
                        backgroundSize: (_ = document.createElement("div"), "" === _.style.backgroundSize || "" === _.style.webkitBackgroundSize || "" === _.style.mozBackgroundSize || "" === _.style.oBackgroundSize),
                        fullscreenEnabled: document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled,
                        vulcanSupport: (d = /webkit|mozilla|edge/.test(w()), Boolean(!T() && !C() && !O() && !E() && d && R().h264 && Object.defineProperties)),
                        mutationObserver: F(),
                        callingPlayRequiresEventContext: B() > 0 || O() || W(),
                        passiveSupported: V(),
                        webp: (t = x(), e = I(), n = M(), r = L(), o = t && k() >= 32, l = t && k() >= 75 && O(), u = e && k() >= 65, s = e && k() >= 67 && O(), f = n && k() >= 18, p = r && k() >= 19, o || l || u || s || f || p),
                        performanceMeasure: (0, a.hasPerformanceMeasureSupport)()
                    };
                    return y.browser[w()] = !0, y
                }
        },
        8: (t, e, n) => {
            n(9)
        },
        5: (t, e, n) => {
            n.d(e, {
                elemBind: () => _,
                elemRemove: () => s,
                elemStyle: () => f,
                elemUnbind: () => v
            });
            var r, o = n(6),
                i = (n(8), n(10), n(11)),
                a = n(13),
                c = (n(17), n(18), n(24)),
                l = n(3),
                u = (l.Wistia, (0, i.cachedDetect)()),
                s = function(t) {
                    var e;
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var n = 0; n < t.length; n++) s(t[n]);
                    else null == t || 1 !== t.nodeType && 3 !== t.nodeType || !(e = t.parentNode) || (e.removeChild(t), t = null)
                },
                f = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList) {
                        for (var i = [], c = 0; c < t.length; c++) {
                            var l = t[c];
                            1 === l.nodeType && i.push(f.apply(void 0, [l].concat(n)))
                        }
                        return i
                    }
                    if (2 === n.length) {
                        var u = n[0],
                            s = n[1];
                        t.style[u] = s
                    } else if (1 === n.length)
                        if ("string" == typeof n[0]) {
                            var p = n[0];
                            try {
                                return t.currentStyle ? t.currentStyle[p] : window.getComputedStyle ? window.getComputedStyle(t, null).getPropertyValue(p) : null
                            } catch (t) {
                                a.wlog.notice(t)
                            }
                        } else {
                            var d = h(n[0]);
                            for (var _ in d) {
                                var v = d[_];
                                t.style[_] = v
                            }
                        }
                    else a.wlog.apply(void 0, ["Unexpected args", t].concat(n))
                },
                p = {
                    borderImage: !0,
                    mixBlendMode: !0,
                    transform: !0,
                    transition: !0,
                    transitionDuration: !0
                },
                d = ["webkit", "moz", "o", "ms"],
                h = function(t) {
                    if (u.chrome) return t;
                    var e = {};
                    for (var n in t) {
                        var r = t[n];
                        if (e[n] = r, p[n])
                            for (var o = d, i = 0; i < o.length; i++) {
                                var a = o[i] + n.charAt(0).toUpperCase() + n.slice(1);
                                n[a] || (e[a] = r)
                            }
                    }
                    return e
                },
                _ = function(t, e, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        o = function(r) {
                            (r = r || window.event).pageX || r.pageY || !r.clientX && !r.clientY || (r.pageX = r.clientX + g(), r.pageY = r.clientY + m()), r.preventDefault || (r.preventDefault = function() {
                                r.returnValue = !1
                            }), r.stopPropagation || (r.stopPropagation = function() {
                                r.cancelBubble = !0
                            }), null == r.which && (r.which = null != r.charCode ? r.charCode : r.keyCode), null == r.which && null != r.button && (1 & r.button ? r.which = 1 : 2 & r.button ? r.which = 3 : 4 & r.button ? r.which = 2 : r.which = 0), r.target || r.srcElement && (r.target = r.srcElement), r.target && 3 === r.target.nodeType && (r.target = r.target.parentNode);
                            for (var o = arguments.length, i = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
                            var c = n.apply(r.target, [r].concat(i));
                            return c === v && v(t, e, n), c
                        };
                    l.Wistia._elemBind = l.Wistia._elemBind || {};
                    var i = y(t, e, n);
                    return l.Wistia._elemBind[i] = o, o.elem = t, o.event = e, t.addEventListener(e, o, r),
                        function() {
                            v(t, e, n, r)
                        }
                },
                v = function(t, e, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (null != t && null != t._wistiaElemId && null != n && n._wistiaBindId) {
                        var o = y(t, e, n),
                            i = l.Wistia._elemBind[o];
                        return i && (t.removeEventListener(e, i, r), i.elem = null, i.event = null), delete l.Wistia._elemBind[o]
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
                g = function(t) {
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
                }), !u.passiveSupported || {
                    capture: !0,
                    passive: !0
                })
            }))
        },
        17: (t, e, n) => {
            var r;
            n.d(e, {
                elemOffset: () => i
            });
            var o = function() {
                    if (null != r) return r;
                    var t = document.createElement("div");
                    return t.style.paddingLeft = t.style.width = "1px", document.body.appendChild(t), r = 2 === t.offsetWidth, document.body.removeChild(t), r
                },
                i = function(t) {
                    var e, n, r = document.body,
                        i = document.defaultView,
                        c = document.documentElement,
                        l = t.getBoundingClientRect(),
                        u = c.clientTop || r.clientTop || 0,
                        s = c.clientLeft || r.clientLeft || 0;
                    e = i && null != i.pageYOffset ? i.pageYOffset : o() && c && null != c.scrollTop ? c.scrollTop : r.scrollTop, n = i && null != i.pageXOffset ? i.pageXOffset : o() && c && null != c.scrollLeft ? c.scrollLeft : r.scrollLeft;
                    var f = a(t);
                    return {
                        height: l.height * f,
                        top: l.top * f + e - u,
                        left: l.left * f + n - s,
                        width: l.width * f,
                        zoom: f
                    }
                },
                a = function(t) {
                    return t && t !== document.documentElement ? a(t.parentElement) * (getComputedStyle(t).zoom || 1) : 1
                }
        },
        174: (t, e, n) => {
            n.d(e, {
                controlMultiplierBasedOnVideo: () => u
            });
            n(5), n(67);
            var r = n(11),
                o = n(6);

            function i(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var r, o, i, a, c = [],
                            l = !0,
                            u = !1;
                        try {
                            if (i = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                l = !1
                            } else
                                for (; !(l = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); l = !0);
                        } catch (t) {
                            u = !0, o = t
                        } finally {
                            try {
                                if (!l && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (u) throw o
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
                l = function(t) {
                    if (!(c.iphone || c.ipad || c.android)) return [640, 960];
                    if (null != t && t.isAudio()) return [500, 960];
                    var e, n, r, i, a = (e = document.querySelector("meta[name=viewport]"), n = e && e.getAttribute("content"), r = {}, n && n.split(/[\s,]+/).forEach((function(t) {
                        var e = t.split("=");
                        2 === e.length && (r[e[0]] = (0, o.cast)(e[1]))
                    })), r);
                    if (a.width) {
                        i = "number" == typeof a.width ? 0 + a.width : screen.width || window.innerWidth;
                        var l = Math.max(a["minimum-scale"] || 0, Math.min(a["maximum-scale"] || 10, a["initial-scale"] || 1));
                        l < 1 && (i /= l)
                    } else i = window.innerWidth;
                    return [i, 2 * i / 3]
                },
                u = function(t, e) {
                    var n = t.videoWidth(),
                        r = i(e || l(t), 2),
                        o = r[0],
                        a = r[1];
                    return n <= o ? n / o : n > a ? n / a : 1
                }
        },
        14: (t, e, n) => {
            n.d(e, {
                globalTrigger: () => o
            });
            var r = n(3);
            (0, n(15).makeWbindable)(r.Wistia);
            r.Wistia.bind.bind(r.Wistia), r.Wistia.on.bind(r.Wistia), r.Wistia.off.bind(r.Wistia), r.Wistia.rebind.bind(r.Wistia);
            var o = r.Wistia.trigger.bind(r.Wistia);
            r.Wistia.unbind.bind(r.Wistia)
        },
        21: (t, e, n) => {
            n.d(e, {
                TAGGED_VERSION: () => c,
                metricsHost: () => u
            });
            var r = n(4),
                o = n(22),
                i = n(23),
                a = ((0, i.appHostname)("app"), (0, i.appHostname)("fast-protected"), (0, i.appHostname)("fast")),
                c = "",
                l = ("undefined" != typeof window && r.root === window && r.root.location && r.root.location.protocol, function() {
                    return "fast.".concat("wistia.net")
                }),
                u = (function() {
                    for (var t = document.getElementsByTagName("script"), e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.src) {
                            var r = new o.Url(n.src),
                                i = /\/assets\/external\/E-v1?\.js$/.test(r.rawPath),
                                c = r.host === (void 0 || a) || r.host === l() || "fast-canary.wistia.net" === r.host,
                                u = "https:" === location.protocol && "https:" === r.protocol,
                                s = "" === r.protocol || null == r.protocol,
                                f = u || s || "http:" === location.protocol,
                                p = !n.readyState || /loaded|complete/.test(n.readyState);
                            if (i && c && f && p) return r
                        }
                    }
                    new o.Url("".concat((0, o.proto)(), "//").concat(l(), "/E-v1.js"))
                }(), function() {
                    return "pipedream.".concat("wistia.com")
                }),
                s = [].concat(["wistia.net", "wistia.com"], ["wistia.mx", "wistia.dev", "wistia.tech", "wistia.am", "wistia.se", "wistia.io", "wistia.st"]);
            new RegExp("(".concat(s.map((function(t) {
                return "\\.".concat(t.replace(".", "\\."))
            })).join("|"), ")$"))
        },
        34: (t, e, n) => {
            n.d(e, {
                getLocalStorage: () => l,
                removeLocalStorage: () => u,
                setLocalStorage: () => s,
                updateLocalStorage: () => f
            });
            var r = n(3),
                o = function(t) {
                    setTimeout((function() {
                        throw t
                    }), 0)
                },
                i = "_namespacedLocalStorage",
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
                    return null == r.Wistia[i] && (r.Wistia[i] = {}), r.Wistia[i]
                },
                l = function(t) {
                    if (!a()) return c()[t] || {};
                    if (localStorage[t]) try {
                        return "null" === localStorage[t] ? {} : JSON.parse(localStorage[t])
                    } catch (t) {
                        o(t)
                    }
                    return {}
                },
                u = function(t) {
                    if (a()) try {
                        localStorage.removeItem(t)
                    } catch (t) {
                        o(t)
                    } else c()[t] = {}
                },
                s = function(t, e) {
                    if (!a()) return null != e && "object" == typeof e && (c()[t] = e), e;
                    try {
                        c()[t] = e, localStorage[t] = JSON.stringify(e)
                    } catch (t) {
                        o(t)
                    }
                    return e
                },
                f = function(t, e) {
                    var n = l(t);
                    try {
                        e(n)
                    } catch (t) {
                        o(t)
                    }
                    return s(t, n)
                }
        },
        6: (t, e, n) => {
            n.d(e, {
                cast: () => _,
                clone: () => u,
                eachLeaf: () => j,
                getDeep: () => s,
                isArray: () => g,
                isEmpty: () => T,
                isObject: () => w,
                merge: () => i,
                setAndPreserveUndefined: () => p,
                setDeep: () => f,
                unsetDeep: () => h
            });
            n(7);
            var r = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                o = Array.prototype.slice,
                i = function(t) {
                    if (0 == (arguments.length <= 1 ? 0 : arguments.length - 1)) return t;
                    for (var e = 0; e < (arguments.length <= 1 ? 0 : arguments.length - 1); e++) a(t, e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1]);
                    return t
                },
                a = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l;
                    if (g(e)) {
                        g(t) || (t = []);
                        for (var i = 0; i < e.length; i++) {
                            var u = e[i];
                            null == t[i] && null != u && (g(u) ? t[i] = [] : w(u) && (t[i] = {}));
                            var s = a(t[i], u, n);
                            o(e, i, s) ? delete t[i] : t[i] = s
                        }
                        return n(t)
                    }
                    if (w(e)) {
                        for (var f in e)
                            if (r(e, f) && (r(t, f) || null == t[f])) {
                                var p = e[f];
                                g(p) ? (g(t[f]) || (t[f] = []), a(t[f], p, n), t[f] = n(t[f])) : w(p) ? (w(t[f]) || (t[f] = {}), a(t[f], p, n), t[f] = n(t[f])) : null == t ? (t = {}, o(e, f, p) || (t[f] = n(p))) : o(e, f, p) ? delete t[f] : t[f] = n(p)
                            }
                        return n(t)
                    }
                    return n(e)
                },
                c = function(t) {
                    return t
                },
                l = function(t, e, n) {
                    return null == n
                },
                u = function(t, e) {
                    return g(t) ? a([], t, e) : a({}, t, e)
                },
                s = function(t, e, n) {
                    e = "string" == typeof e ? e.split(".") : o.call(e);
                    for (var i, a = t; null != t && e.length;) {
                        var c = e.shift();
                        void 0 !== t[c] && (w(t[c]) || g(t[c])) || !n || (0 === c ? (t = a[i] = [])[c] = {} : t[c] = {}), a = t, i = c, t = r(t, c) ? t[c] : void 0
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
                        i = (e = "string" == typeof e ? e.split(".") : o.call(e)).pop();
                    null != (t = s(t, e, !0)) && (w(t) || g(t)) && null != i && (r && null == n ? delete t[i] : t[i] = n)
                },
                h = function(t, e) {
                    return f(t, e)
                },
                _ = function(t) {
                    return null == t ? t : w(t) || g(t) ? y(t) : v("".concat(t), t)
                },
                v = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                    return /^-?[1-9]\d*?$/.test(t) ? parseInt(t, 10) : "0" === t || "-0" === t ? 0 : /^-?\d*\.\d+$/.test(t) ? parseFloat(t) : !!/^true$/i.test(t) || !/^false$/i.test(t) && e
                },
                y = function(t) {
                    return a(t, t, (function(t) {
                        return "string" == typeof t ? v(t) : t
                    }), (function() {
                        return !1
                    }))
                },
                m = /^\s*function Array()/,
                g = function(t) {
                    return null != t && t.push && m.test(t.constructor)
                },
                b = /^\s*function Object()/,
                w = function(t) {
                    return null != t && "object" == typeof t && b.test(t.constructor)
                },
                k = /^\s*function RegExp()/,
                S = /^string|number|boolean|function$/i,
                O = function(t) {
                    return null != t && (S.test(typeof t) || function(t) {
                        return null != t && k.test(t.constructor)
                    }(t))
                },
                T = function(t) {
                    return null == t || (!(!g(t) || t.length) || !!w(t) && !Object.keys(t).length)
                },
                P = function(t, e, n, i, a) {
                    if (null == n && (n = []), O(t)) e(t, n, i, a);
                    else if (w(t) || g(t)) {
                        for (var c in e(t, n, i, a), t)
                            if (r(t, c)) {
                                var l = o.call(n);
                                l.push(c), P(t[c], e, l, t, c)
                            }
                    } else e(t, n, i, a)
                },
                j = function(t, e) {
                    P(t, (function(t, n, r, o) {
                        g(t) || w(t) || e(t, n, r, o)
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
                    var o = function() {
                            r.removeEventListener("load", i, !1)
                        },
                        i = function() {
                            clearTimeout(a), o(), t()
                        };
                    r.addEventListener("load", i, !1);
                    var a = setTimeout((function() {
                        o(), t()
                    }), e)
                }
            }
        },
        9: (t, e, n) => {
            n.d(e, {
                poll: () => r
            });
            var r = function(t, e, n, r, o) {
                var i = null,
                    a = (new Date).getTime(),
                    c = function() {
                        (new Date).getTime() - a > r ? "function" == typeof o && o() : t() ? e() : (clearTimeout(i), i = setTimeout(c, n))
                    };
                i = setTimeout(c, 1)
            }
        },
        4: (t, e, n) => {
            var r;
            n.d(e, {
                root: () => o
            });
            try {
                (r = self).self !== r && void 0 !== r.self && "undefined" != typeof window && (r = window)
            } catch (t) {
                r = "undefined" != typeof globalThis ? globalThis : window
            }
            var o = r
        },
        20: (t, e, n) => {
            n.d(e, {
                runScript: () => o
            });
            var r = n(21),
                o = function(t, e) {
                    var n = r.TAGGED_VERSION;
                    return new Promise((function(r, o) {
                        var i;
                        null == e && (e = 8e3), (i = document.createElement("script")).src = t, i.async = !0, i.type = "text/javascript", /https?:\/\/fast\.wistia\./.test(i.src) && "" !== n && n.length > 0 && (i.src = "".concat(i.src, "@").concat(n));
                        var a = null,
                            c = !1,
                            l = function() {
                                i.onerror = i.onreadystatechange = i.onload = null, clearTimeout(a), clearTimeout(s), a = setTimeout((function() {
                                    i && i.parentNode && i.parentNode.removeChild(i)
                                }), 500)
                            },
                            u = function() {
                                var t = i.readyState;
                                c || t && !/loaded|complete/.test(t) || (c = !0, setTimeout((function() {
                                    r(), l()
                                }), 1))
                            },
                            s = setTimeout((function() {
                                c = !0, l(), o(new Error("timeout"))
                            }), e);
                        i.onerror = function(t) {
                            c = !0, l(), o(t)
                        }, i.onreadystatechange = u, i.onload = u, (document.body || document.head).appendChild(i)
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
                runScripts: () => s
            });
            var r = n(13),
                o = n(6),
                i = n(20);

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
            var l = function(t) {
                    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = document.getElementsByTagName("script"), r = 0; r < n.length; r++) {
                        var o = n[r],
                            i = o.getAttribute("src") || "";
                        if (e.ignoreQueryParams) {
                            var a = i.split("?");
                            i = a[0]
                        }
                        if (!e.scriptRegex && e.ignoreProtocol && (i = i.replace(/^https?:/, ""), t = t.replace(/^https?:/, "")), e.scriptRegex && e.scriptRegex.test(i)) return o;
                        if (e.testStartsWith && 0 === i.indexOf(t)) return o;
                        if (i === t) return o
                    }
                    return null
                },
                u = function(t) {
                    var e, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8e3,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return null == r && (r = 8e3), null == o && (o = {}), new Promise((function(a) {
                        !0 === o.once && (e = l(t)) && (n = !0), o.once && n ? e.readyState && !/loaded|complete/.test(e.readyState) || setTimeout((function() {
                            a()
                        }), 1) : (0, i.runScript)(t, r).then(a).catch((function(t) {
                            a(t), setTimeout((function() {
                                console.error(t)
                            }), 1)
                        }))
                    }))
                },
                s = function() {
                    for (var t, e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                    t = n[0] instanceof Array ? n[0] : n, t = f(t);
                    var i = [],
                        l = [],
                        s = [];
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
                        e.promise = n, s.push(e.promise), t.async ? i.push(e) : l.push(e)
                    })), l.reduce((function(t, e) {
                        if (e.fn) try {
                            e.fn()
                        } catch (t) {
                            r.wlog.error(t)
                        } finally {
                            e.resolve()
                        } else e.src && u(e.src, null, e).then(e.resolve);
                        return t.then(e.promise)
                    }), Promise.resolve()), setTimeout((function() {
                        i.forEach((function(t) {
                            if (t.fn) try {
                                t.fn()
                            } catch (t) {
                                r.wlog.error(t)
                            } finally {
                                t.resolve()
                            } else t.src && u(t.src, null, t).then(t.resolve)
                        }))
                    }), 1), Promise.all(s)
                },
                f = function(t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                        var r = t[n];
                        "string" == typeof r ? e.push({
                            src: r,
                            async: !1
                        }) : (0, o.isObject)(r) ? e.push(r) : e.push({
                            fn: r,
                            async: !1
                        })
                    }
                    return e
                }
        },
        24: (t, e, n) => {
            n.d(e, {
                seqId: () => o
            });
            var r = n(3),
                o = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia_",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = r.Wistia._sequenceVal || 1,
                        o = "".concat(t).concat(n).concat(e);
                    return r.Wistia._sequenceVal = n + 1, o
                }
        },
        31: (t, e, n) => {
            n.d(e, {
                countMetric: () => u
            });
            var r = n(3),
                o = n(7),
                i = n(10),
                a = n(32),
                c = n(21);
            null == r.Wistia._simpleMetricsCache && (r.Wistia._simpleMetricsCache = {}), null == r.Wistia._simpleMetricsDebounceInterval && (r.Wistia._simpleMetricsDebounceInterval = 500);
            var l = r.Wistia._simpleMetricsCache,
                u = function(t) {
                    return f("count", t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})
                },
                s = function() {
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
                    var c, u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    if ((0, a.isVisitorTrackingEnabled)()) try {
                        null == l.toMput && (l.toMput = []);
                        var f = (0, o.assign)({
                                type: t,
                                key: e,
                                value: null != n ? n : null
                            }, u),
                            p = JSON.stringify(f, (c = new WeakSet, function(t, e) {
                                if ("object" == typeof e && null !== e) {
                                    if (c.has(e)) return "[Circular]";
                                    c.add(e)
                                }
                                return e
                            }));
                        l.toMput.push(p), clearTimeout(r.Wistia._msendTimeout), r.Wistia._msendTimeout = setTimeout((function() {
                            (0, i.pageLoaded)((function() {
                                s.apply(undefined, l.toMput), l.toMput = []
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
                doTimeout: () => i
            });
            var r = n(3),
                o = n(6);
            r.Wistia;
            null == r.Wistia._timeouts && (r.Wistia._timeouts = {});
            var i = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    (0, o.isArray)(t) && (t = t.join("."));
                    var i = l(t);
                    if (a(t, i), e) {
                        var c = r.Wistia._timeouts[i];
                        null == c && (c = r.Wistia._timeouts[i] = {});
                        var u = setTimeout((function() {
                            delete c[t], e()
                        }), n);
                        return c[t] = u, u
                    }
                    return r.Wistia._timeouts[i][t]
                },
                a = function(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if ((0, o.isArray)(t) && (t = t.join(".")), "__global__" === (n = n || l(t)) && (e = r.Wistia._timeouts[t]))
                        for (var i in e) {
                            var a = e[i];
                            clearTimeout(a), delete e[i]
                        }
                    if (e = r.Wistia._timeouts[n])
                        for (var u in e) {
                            var s = e[u];
                            !u.indexOf || 0 !== u.indexOf(t) || u.length !== t.length && "." !== u.charAt(t.length) || (clearTimeout(s), delete e[u])
                        }
                    r.Wistia.blockSweepTimeouts || (r.Wistia.blockSweepTimeouts = !0, setTimeout(c, 0), setTimeout((function() {
                        r.Wistia.blockSweepTimeouts = !1
                    }), 5e3))
                },
                c = function() {
                    for (var t in r.Wistia._timeouts) {
                        var e = r.Wistia._timeouts[t];
                        (0, o.isEmpty)(e) && delete r.Wistia._timeouts[t]
                    }
                },
                l = function(t) {
                    var e = t.indexOf(".");
                    return e > 0 ? t.substring(0, e) : "__global__"
                }
        },
        32: (t, e, n) => {
            n.d(e, {
                isVisitorTrackingEnabled: () => f
            });
            var r = n(3),
                o = n(14),
                i = n(33),
                a = n(35);

            function c(t) {
                return function(t) {
                    if (Array.isArray(t)) return l(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return l(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function l(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
                return r
            }
            var u;
            r.Wistia._visitorTrackingDomain || (r.Wistia._visitorTrackingDomain = location.hostname || ""), r.Wistia._visitorTracking || (null != (u = (0, i.getWistiaLocalStorage)().visitorTrackingEnabled) && ((0, i.updateWistiaLocalStorage)((function(t) {
                return delete t.visitorTrackingEnabled
            })), r.Wistia._visitorTracking = {}, r.Wistia._visitorTracking[r.Wistia._visitorTrackingDomain] = {
                isEnabled: u,
                updatedAt: Date.now()
            }, (0, i.updateWistiaLocalStorage)((function(t) {
                return t.visitorTracking = r.Wistia._visitorTracking
            }))), r.Wistia._visitorTracking = (0, i.getWistiaLocalStorage)().visitorTracking || {});
            r.Wistia.consent = function(t) {
                return null == t ? f() : s(t)
            };
            var s = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r.Wistia._visitorTrackingDomain;
                    "default" === t ? delete r.Wistia._visitorTracking[e] : r.Wistia._visitorTracking[e] = {
                        isEnabled: "true" === "".concat(t),
                        updatedAt: Date.now()
                    }, (0, i.updateWistiaLocalStorage)((function(t) {
                        return t.visitorTracking = r.Wistia._visitorTracking
                    })), (0, o.globalTrigger)("visitortrackingchange", t), c(document.getElementsByTagName("wistia-player")).forEach((function(e) {
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
                Url: () => s,
                proto: () => i
            });
            var r = n(6),
                o = n(13),
                i = function() {
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
                            o.wlog.notice(n)
                        }), 50), e = t
                    }
                    return e
                },
                c = function(t) {
                    for (var e = t[0], n = 1; n < t.length; n++) e += "[".concat(t[n], "]");
                    return e
                },
                l = function(t) {
                    return t.match(/([\w\-_]+)/g)
                },
                u = ["protocol", "host", "port", "params", "path"],
                s = function(t) {
                    var e = this;
                    return e.params = {}, e.path = [], e.host = "", "object" == typeof t ? e.fromOptions(t) : t && e.fromRaw(t), e
                },
                f = s.prototype;
            f.fromOptions = function(t) {
                for (var e = 0; e < u.length; e++) {
                    var n = u[e];
                    null != t[n] && (this[n] = t[n])
                }
                return this
            }, f.fromRaw = function(t) {
                var e;
                return this.rawUrl = t, (e = t.match(/^((?:https?:)|(?:file:)|(?:ftp:))?\/\//)) && (this.protocol = e[1] || void 0), (e = t.match(/\/\/([^:?#/]*)/)) && (this.host = e[1] || void 0), (e = t.match(/\/\/.*?(\/[^?#$]+)/) || t.match(/(^\/[^/][^?#$]+)/)) && this.setPath(e[1]), (e = t.match(/:(\d+)/)) && (this.port = parseInt(e[1], 10)), (e = t.match(/\?([^#]+)/)) && (this.rawParams = e[1], this.params = function(t) {
                    var e = {};
                    if (!t) return e;
                    for (var n = t.split("&"), i = function() {
                            var t = n[c].split("="),
                                i = t[0],
                                u = t[1];
                            try {
                                i = l(decodeURIComponent(i)) || ""
                            } catch (t) {
                                setTimeout((function() {
                                    o.wlog.notice(t)
                                }), 50), i = ""
                            }(0, r.cast)(i);
                            var s = (0, r.getDeep)(e, i);
                            if (null != s)
                                if ((0, r.isArray)(s)) s.push(a(u));
                                else {
                                    var f = [s];
                                    f.push(a(u)), (0, r.setAndPreserveUndefined)(e, i, f)
                                }
                            else(0, r.setAndPreserveUndefined)(e, i, a(u))
                        }, c = 0; c < n.length; c++) i();
                    return e
                }(this.rawParams)), (e = t.match(/#(.*)$/)) && (this.anchor = e[1]), this
            }, f.clone = function() {
                return new s({
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
                var o = this.path[this.path.length - 1].match(/\.(.*)$/);
                return null != o && o[1] || null
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
                var n, o, i = "?".concat((n = this.params, o = [], (0, r.eachLeaf)(n, (function(t, e) {
                    null != t ? o.push("".concat(encodeURIComponent(c(e)), "=").concat(encodeURIComponent(t))) : o.push(encodeURIComponent(c(e)))
                })), o.join("&")));
                return 1 === i.length && (i = ""), "".concat(e).concat(i).concat(this.relativeAnchor())
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
                        var o = n[r];
                        null != o && "" !== o && e.push(o)
                    }
                    return e
                }(this.rawPath)
            }, s.create = function(t) {
                return new s(t)
            };
            s.create;
            s.parse = function(t) {
                return new s(t)
            };
            s.parse
        },
        15: (t, e, n) => {
            n.d(e, {
                makeWbindable: () => i
            });
            var r = n(3),
                o = n(16);
            r.Wistia.bindable || (r.Wistia.bindable = {
                bind: function(t, e) {
                    return this.specialBind && !0 === this.specialBind.apply(this, arguments) ? this : e ? (o.bind.call(this, t, e), this) : void(r.Wistia.warn && r.Wistia.warn(this.constructor.name, "bind", "falsey value passed in as callback:", e))
                },
                unbind: function(t, e) {
                    return this.specialUnbind && !0 === this.specialUnbind.apply(this, arguments) || (e ? o.unbind.call(this, t, e) : this._bindings && (this._bindings[t] = []), this._bindings && this._bindings[t] && !this._bindings[t].length && (this._bindings[t] = null, delete this._bindings[t])), this
                },
                on: function(t, e) {
                    var n = this.specialBind && this.specialBind.apply(this, arguments);
                    return "function" == typeof n ? n : o.bind.call(this, t, e)
                },
                off: function(t, e) {
                    var n = this.specialUnbind && this.specialUnbind.apply(this, arguments);
                    return "function" == typeof n ? n : o.unbind.call(this, t, e)
                },
                rebind: function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), this
                },
                trigger: function(t) {
                    for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                    return (e = o.trigger).call.apply(e, [this, t].concat(r)), this
                },
                bindNamed: function() {
                    return o.bindNamed.apply(this, arguments)
                },
                unbindNamed: function() {
                    return o.unbindNamed.apply(this, arguments)
                },
                unbindAllInNamespace: function() {
                    return o.unbindAllInNamespace.apply(this, arguments)
                }
            });
            var i = function(t) {
                for (var e in r.Wistia.bindable) {
                    var n = r.Wistia.bindable[e];
                    t[e] || (t[e] = n)
                }
            }
        },
        37: (t, e, n) => {
            n.d(e, {
                wData: () => i
            });
            var r = n(3),
                o = n(6),
                i = function(t, e) {
                    return (0, o.isArray)(t) || (t = t.split(".")), null != e && (0, o.setDeep)(r.Wistia, ["_data"].concat(t), e), (0, o.getDeep)(r.Wistia, ["_data"].concat(t))
                }
        },
        33: (t, e, n) => {
            n.d(e, {
                getWistiaLocalStorage: () => a,
                updateWistiaLocalStorage: () => c
            });
            var r = n(3),
                o = n(34),
                i = "wistia",
                a = function() {
                    return (0, o.getLocalStorage)(i)
                },
                c = function(t) {
                    return r.Wistia._localStorage = (0, o.updateLocalStorage)(i, t), r.Wistia._localStorage
                }
        },
        13: (t, e, n) => {
            n.d(e, {
                wlog: () => v
            });
            var r = n(3),
                o = n(14);

            function i(t) {
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
                l = function() {},
                u = function(t) {
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
                s = u.prototype;
            s.reset = function() {
                this.ctx.level = 0, this.ctx.grep = null, this.ctx.grepv = null, this.ctx.first1000LogLines = [], this.ctx.last1000LogLines = [], this.ctx.initializedAt = (new Date).getTime()
            }, s.setLevel = function(t) {
                var e = this.logFunc(3);
                null != c[t] ? (this.ctx.level = c[t], e('Log level set to "'.concat(t, '" (').concat(c[t], ")"))) : e('Unknown log level "'.concat(t, '"'))
            }, s.setGrep = function(t) {
                this.ctx.grep = t
            }, s.setGrepv = function(t) {
                this.ctx.grepv = t
            }, s.first1000LogLines = function() {
                return this.ctx.first1000LogLines
            }, s.last1000LogLines = function() {
                return this.ctx.last1000LogLines
            }, s.matchedGrep = function(t) {
                var e = !1;
                if (this.ctx.grep || this.ctx.grepv) {
                    for (var n = [], r = 0; r < t.length; r++) try {
                        var o = t[r];
                        n.push(o.toString && o.toString())
                    } catch (t) {
                        n.push("")
                    }
                    var i = n.join(" "),
                        a = !this.ctx.grep || i.match(this.ctx.grep),
                        c = !this.ctx.grepv || !i.match(this.ctx.grepv);
                    e = a && c
                } else e = !0;
                return e
            }, s.now = function() {
                return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now().toFixed(3) : Date.now ? Date.now() - this.ctx.initializedAt : (new Date).getTime() - this.ctx.initializedAt
            }, s.messagesToLogLine = function(t, e, n) {
                var r, o = [t, e];
                o = o.concat(n);
                try {
                    (r = o.join(" ") || "").length > 200 && (r = r.slice(0, 200))
                } catch (t) {
                    r = "could not serialize"
                }
                return r
            }, s.persistLine = function(t) {
                this.ctx.first1000LogLines.length < 1e3 ? this.ctx.first1000LogLines.push(t) : (this.ctx.last1000LogLines.length >= 1e3 && this.ctx.last1000LogLines.shift(), this.ctx.last1000LogLines.push(t))
            }, s.log = function(t, e) {
                var n, r = t <= this.ctx.level,
                    a = t < 4,
                    c = (r || a) && this.matchedGrep(e);
                if (0 === t && (0, o.globalTrigger)("problem", {
                        type: "error-logged",
                        data: {
                            messages: e
                        }
                    }), c && (r || a) && (n = this.now()), a && c) {
                    var l = this.messagesToLogLine(t, n, e);
                    this.persistLine(l)
                }
                if (r && c) {
                    var u, s = this.logFunc(t);
                    1 === e.length && (u = e[0]) instanceof Error ? (s(u.message), u.stack && s(u.stack)) : s.apply(void 0, i(e))
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
                _ = function(t) {
                    console.log.apply(console, t)
                };
            s.logFunc = function(t) {
                return null == t && (t = this.level), console ? (0 === t ? e = f : 1 === t ? e = p : 3 === t ? e = d : 4 === t && (e = h), e || (e = _), "function" != typeof e && (this.noConsoleLog = !0, e = l), e) : l;
                var e
            }, s.maybePrefix = function(t, e) {
                if (t) {
                    if ("function" == typeof t) try {
                        t = t()
                    } catch (e) {
                        t = 'prefix err "'.concat(e.message, '"')
                    }
                    return t instanceof Array ? t.concat(e) : [t].concat(e)
                }
                return e
            }, s.getPrefixedFunctions = function(t) {
                var e = this;
                return {
                    log: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(0, e.maybePrefix(t, r))
                    },
                    error: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(0, e.maybePrefix(t, r))
                    },
                    warn: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(1, e.maybePrefix(t, r))
                    },
                    notice: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(1, e.maybePrefix(t, r))
                    },
                    info: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(3, e.maybePrefix(t, r))
                    },
                    debug: function() {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return e.log(4, e.maybePrefix(t, r))
                    }
                }
            }, r.Wistia && null == r.Wistia.wlogCtx && (r.Wistia.wlogCtx = {});
            var v = new u(r.Wistia.wlogCtx)
        },
        3: (t, e, n) => {
            n.d(e, {
                Wistia: () => i
            });
            var r = n(4),
                o = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };
            null == r.root.Wistia && (r.root.Wistia = {});
            var i = r.root.Wistia;
            null == i._initializers && (i._initializers = {}), null == i._destructors && (i._destructors = {}), null == i.mixin && (i.mixin = function(t, e) {
                for (var n in e) o(e, n) && (t[n] = e[n])
            }), null == i._remoteData && (i._remoteData = new Map), null == i._mediaDataPromises && (i._mediaDataPromises = {})
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
    SkipAheadControl: () => _embeds_media_players_vulcanV2Player_video_controls_SkipAheadControl_SkipAheadControl_js__WEBPACK_IMPORTED_MODULE_0__.SkipAheadControl,
    SkipBackControl: () => _embeds_media_players_vulcanV2Player_video_controls_SkipBackControl_SkipBackControl_js__WEBPACK_IMPORTED_MODULE_1__.SkipBackControl
});
var _embeds_media_players_vulcanV2Player_video_controls_SkipAheadControl_SkipAheadControl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(726),
    _embeds_media_players_vulcanV2Player_video_controls_SkipBackControl_SkipBackControl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(728),
    __webpack_exports__SkipAheadControl = __webpack_exports__.SkipAheadControl,
    __webpack_exports__SkipBackControl = __webpack_exports__.SkipBackControl;
export {
    __webpack_exports__SkipAheadControl as SkipAheadControl, __webpack_exports__SkipBackControl as SkipBackControl
};
//# sourceMappingURL=skipControls.js.map