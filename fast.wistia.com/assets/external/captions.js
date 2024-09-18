/*! For license information please see captions.js.LICENSE.txt */
var __webpack_modules__ = {
        27: (t, e) => {
            e.isBoolean = e.isFunction = e.isArray = e.isNonEmptyRecord = e.isRecord = e.isNumber = e.isEmptyString = e.isString = e.isNotNil = e.isNil = e.isUndefined = e.isNull = void 0;
            e.isNull = t => null === t;
            e.isUndefined = t => void 0 === t;
            e.isNil = t => (0, e.isNull)(t) || (0, e.isUndefined)(t);
            e.isNotNil = t => !(0, e.isNil)(t);
            e.isString = t => "string" == typeof t;
            e.isEmptyString = t => (0, e.isString)(t) && "" === t;
            e.isNumber = t => "number" == typeof t;
            e.isRecord = t => (0, e.isNotNil)(t) && "object" == typeof t && !(t instanceof Array);
            e.isNonEmptyRecord = t => (0, e.isRecord)(t) && Object.keys(t).length > 0;
            e.isArray = t => (0, e.isNotNil)(t) && "object" == typeof t && t instanceof Array;
            e.isFunction = t => (0, e.isNotNil)(t) && "function" == typeof t;
            e.isBoolean = t => (0, e.isNotNil)(t) && "boolean" == typeof t
        },
        165: (t, e, n) => {
            n.d(e, {
                default: () => f
            });
            var i = n(2);

            function r() {
                return r = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, r.apply(null, arguments)
            }

            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, a(i.key), i)
                }
            }

            function a(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
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
                    }(t, c() ? Reflect.construct(e, n || [], u(t).constructor) : e.apply(t, n))
            }

            function c() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (c = function() {
                    return !!t
                })()
            }

            function u(t) {
                return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, u(t)
            }

            function l(t, e) {
                return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, l(t, e)
            }
            const f = function(t) {
                function e() {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), s(this, e, arguments)
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
                    }), e && l(t, e)
                }(e, t), n = e, (a = [{
                    key: "render",
                    value: function() {
                        var t = this.props.tagName || "div";
                        return (0, i.h)(t, r({}, this.props, {
                            ref: this.props.elemRef,
                            style: this.visuallyHiddenStyles()
                        }), this.props.children)
                    }
                }, {
                    key: "visuallyHiddenStyles",
                    value: function() {
                        return {
                            clip: "rect(1px, 1px, 1px, 1px)",
                            height: "1px",
                            overflow: "hidden",
                            position: "absolute",
                            whiteSpace: "nowrap",
                            width: "1px"
                        }
                    }
                }]) && o(n.prototype, a), c && o(n, c), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, a, c
            }(i.Component)
        },
        423: (t, e, n) => {
            n.d(e, {
                default: () => p
            });
            var i = n(2),
                r = n(41);

            function o() {
                return o = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, o.apply(null, arguments)
            }

            function a(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, s(i.key), i)
                }
            }

            function s(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function c(t, e, n) {
                return e = l(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, u() ? Reflect.construct(e, n || [], l(t).constructor) : e.apply(t, n))
            }

            function u() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (u = function() {
                    return !!t
                })()
            }

            function l(t) {
                return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, l(t)
            }

            function f(t, e) {
                return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, f(t, e)
            }
            const p = function(t) {
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
                    }), e && f(t, e)
                }(e, t), n = e, (s = [{
                    key: "shouldComponentUpdate",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = {
                            fill: "none",
                            stroke: "#ffffff",
                            "stroke-linecap": "round",
                            "stroke-miterlimit": 10
                        };
                        return (0, i.h)("svg", (0, r.standardSvgAttrs)({
                            width: 40,
                            height: 34,
                            ariaHidden: !0
                        }), (0, i.h)("g", null, (0, i.h)("path", o({}, t, {
                            "stroke-width": "1.8",
                            d: "M18.4,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
                        }))), (0, i.h)("g", null, (0, i.h)("path", o({}, t, {
                            "stroke-width": "1.8",
                            d: "M25.8,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
                        }))), (0, i.h)("g", null, (0, i.h)("path", o({}, t, {
                            "stroke-width": "2",
                            d: "M31,21.9c0,1.6-1.4,3-3,3H12c-1.6,0-3-1.4-3-3V12c0-1.6,1.4-3,3-3h16c1.6,0,3,1.4,3,3V21.9z"
                        }))))
                    }
                }]) && a(n.prototype, s), u && a(n, u), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, s, u
            }(i.Component)
        },
        427: (t, e, n) => {
            n.d(e, {
                CaptionsItem: () => g
            });
            var i = n(2),
                r = n(39),
                o = n(43),
                a = n(24),
                s = n(41),
                c = n(165);

            function u() {
                return u = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, u.apply(null, arguments)
            }

            function l(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, y(i.key), i)
                }
            }

            function f(t, e, n) {
                return e = h(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, p() ? Reflect.construct(e, n || [], h(t).constructor) : e.apply(t, n))
            }

            function p() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (p = function() {
                    return !!t
                })()
            }

            function h(t) {
                return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, h(t)
            }

            function d(t, e) {
                return d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, d(t, e)
            }

            function v(t, e, n) {
                return (e = y(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function y(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var g = function(t) {
                    function e() {
                        var t;
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return v(t = f(this, e, [].concat(i)), "onBlur", (function() {
                            t.state.isKeyboardFocused && t.setState({
                                isKeyboardFocused: !1
                            })
                        })), v(t, "onClick", (function() {
                            t.props.item.onClick()
                        })), v(t, "onFocus", (function() {
                            (0, o.isMouseDown)() || t.setState({
                                isKeyboardFocused: !0
                            })
                        })), v(t, "onMouseEnter", (function() {
                            t.setState({
                                isHovering: !0
                            })
                        })), v(t, "onMouseLeave", (function() {
                            t.setState({
                                isHovering: !1
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
                        }), e && d(t, e)
                    }(e, t), n = e, (p = [{
                        key: "render",
                        value: function() {
                            var t = this.props.item,
                                e = (0, a.seqId)("w-captions-".concat(t.text, "-"));
                            return (0, i.h)("div", {
                                style: this.menuItemStyle(),
                                onMouseEnter: this.onMouseEnter,
                                onMouseLeave: this.onMouseLeave
                            }, (0, i.h)(c.default, {
                                checked: Boolean(t.isSelected),
                                id: e,
                                name: "Captions Menu",
                                onFocus: this.onFocus,
                                onClick: this.onClick,
                                onBlur: this.onBlur,
                                tagName: "input",
                                type: "radio",
                                value: t.text
                            }), (0, i.h)("label", {
                                class: "w-css-reset",
                                for: e,
                                "data-handle": "captions-menu-item-".concat(this.props.index)
                            }, (0, i.h)("svg", u({}, (0, s.standardSvgAttrs)({
                                width: 40,
                                height: 34,
                                styleOverride: this.checkStyle(),
                                ariaHidden: !0
                            }), {
                                class: "w-checkmark"
                            }), (0, i.h)("polyline", {
                                fill: "none",
                                stroke: "#ffffff",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-miterlimit": "10",
                                points: "17,17 20,20 25,14 "
                            })), t.text))
                        }
                    }, {
                        key: "checkStyle",
                        value: function() {
                            return {
                                height: b(this),
                                verticalAlign: "middle",
                                visibility: this.props.item.isSelected ? "visible" : "hidden",
                                width: m(this)
                            }
                        }
                    }, {
                        key: "menuItemStyle",
                        value: function() {
                            return {
                                background: this.state.isHovering ? "rgba(0,0,0,.3)" : "",
                                boxShadow: this.state.isKeyboardFocused ? "0 0 0 2px #fff inset" : "none",
                                borderBottomLeftRadius: this.props.isLastItem ? "".concat(this.props.controlBarBorderRadius, "px") : 0,
                                borderBottomRightRadius: this.props.isLastItem ? "".concat(this.props.controlBarBorderRadius, "px") : 0,
                                display: "block",
                                fontFamily: r.interFontFamily,
                                fontSize: _(this),
                                lineHeight: b(this),
                                marginRight: "".concat(10 * this.props.scale, "px"),
                                textAlign: "left",
                                width: "100%"
                            }
                        }
                    }]) && l(n.prototype, p), h && l(n, h), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, p, h
                }(i.Component),
                m = function(t) {
                    return "".concat(function(t) {
                        return 40 * t.props.scale
                    }(t), "px")
                },
                b = function(t) {
                    return "".concat(function(t) {
                        return 34 * t.props.scale
                    }(t), "px")
                },
                _ = function(t) {
                    return 14 * t.props.scale
                }
        },
        425: (t, e, n) => {
            n.d(e, {
                CaptionsMenu: () => d
            });
            var i = n(2),
                r = n(165),
                o = n(426),
                a = n(427);

            function s() {
                return s = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, s.apply(null, arguments)
            }

            function c(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, u(i.key), i)
                }
            }

            function u(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function l(t, e, n) {
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

            function h(t, e) {
                return h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, h(t, e)
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
                    }), e && h(t, e)
                }(e, t), n = e, (u = [{
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.props,
                            n = e.isTranscriptEnabled,
                            c = e.isPlaybarEnabled;
                        return (0, i.h)("div", {
                            class: "w-captions-menu w-css-reset w-css-reset-tree"
                        }, n && c && (0, i.h)(o.TranscriptItem, this.props), (0, i.h)("fieldset", {
                            style: {
                                border: 0,
                                padding: 0,
                                margin: 0
                            }
                        }, (0, i.h)(r.default, {
                            tagName: "legend"
                        }, "Captions Menu"), this.props.items.map((function(e, n) {
                            return (0, i.h)(a.CaptionsItem, s({}, t.props, {
                                item: e,
                                index: n,
                                isLastItem: n === t.props.items.length - 1
                            }))
                        }))))
                    }
                }]) && c(n.prototype, u), f && c(n, f), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, u, f
            }(i.Component)
        },
        424: (t, e, n) => {
            n.d(e, {
                RoundedAudioDescriptionButton: () => o
            });
            var i = n(2),
                r = n(41),
                o = function() {
                    var t = (0, r.standardSvgAttrs)({
                        width: 40,
                        height: 34,
                        ariaHidden: !0,
                        styleOverride: {
                            fill: "none"
                        }
                    });
                    return (0, i.h)("svg", t, (0, i.h)("path", {
                        d: "M18.4 18.7C17.9 19.4 17.3 19.9 16.3 19.9C15 19.9 13.9 18.8 13.9 17.1C13.9 15.5 14.9 14.3 16.3 14.3C17.3 14.3 17.9 14.8 18.3 15.5",
                        stroke: "white",
                        "stroke-width": "1.8",
                        "stroke-linecap": "round"
                    }), (0, i.h)("path", {
                        d: "M25.8 18.7C25.3 19.4 24.7 19.9 23.7 19.9C22.4 19.9 21.3 18.8 21.3 17.1C21.3 15.5 22.3 14.3 23.7 14.3C24.7 14.3 25.3 14.8 25.7 15.5",
                        stroke: "white",
                        "stroke-width": "1.8",
                        "stroke-linecap": "round"
                    }), (0, i.h)("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M31 21.9811C31 23.5912 29.6 25 28 25H12C10.4 25 9 23.5912 9 21.9811V12.0189C9 10.4088 10.4 9 12 9H28C29.6 9 31 10.4088 31 12.0189V21.9811Z",
                        stroke: "white",
                        "stroke-width": "2",
                        "stroke-linecap": "round"
                    }))
                }
        },
        426: (t, e, n) => {
            n.d(e, {
                TranscriptItem: () => g
            });
            var i = n(2),
                r = n(39),
                o = n(41),
                a = n(43),
                s = n(44),
                c = n(63);

            function u() {
                return u = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, u.apply(null, arguments)
            }

            function l(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, y(i.key), i)
                }
            }

            function f(t, e, n) {
                return e = h(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, p() ? Reflect.construct(e, n || [], h(t).constructor) : e.apply(t, n))
            }

            function p() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (p = function() {
                    return !!t
                })()
            }

            function h(t) {
                return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, h(t)
            }

            function d(t, e) {
                return d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, d(t, e)
            }

            function v(t, e, n) {
                return (e = y(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function y(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }(0, s.defineTranslations)("en-US", {
                CAPTIONS_READ_TRANSCRIPT: "Search Video"
            });
            var g = function(t) {
                    function e() {
                        var t;
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return v(t = f(this, e, [].concat(i)), "onFocus", (function() {
                            (0, a.isMouseDown)() || t.setState({
                                isKeyboardFocused: !0
                            })
                        })), v(t, "onBlur", (function() {
                            t.state.isKeyboardFocused && t.setState({
                                isKeyboardFocused: !1
                            })
                        })), v(t, "onMouseEnter", (function() {
                            t.setState({
                                isHovering: !0
                            })
                        })), v(t, "onMouseLeave", (function() {
                            t.setState({
                                isHovering: !1
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
                        }), e && d(t, e)
                    }(e, t), n = e, (p = [{
                        key: "render",
                        value: function() {
                            return (0, i.h)(c.CustomEventsWrapper, {
                                class: "w-css-reset-button-important w-vulcan-v2-button",
                                tagName: "button",
                                onClick: this.props.toggleTranscript,
                                onfocusin: this.onFocus,
                                onfocusout: this.onBlur,
                                onMouseEnter: this.onMouseEnter,
                                onMouseLeave: this.onMouseLeave,
                                style: this.menuItemStyle()
                            }, (0, i.h)("svg", u({}, (0, o.standardSvgAttrs)({
                                width: 40,
                                height: 34,
                                styleOverride: this.transcriptStyle(),
                                ariaHidden: !0
                            }), {
                                class: "w-checkmark"
                            }), (0, i.h)("g", {
                                fill: "none",
                                stroke: "#ffffff",
                                "stroke-width": "1.5",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-miterlimit": "10"
                            }, (0, i.h)("line", {
                                x1: "17",
                                x2: "27",
                                y1: "12",
                                y2: "12"
                            }), (0, i.h)("line", {
                                x1: "17",
                                x2: "30",
                                y1: "17",
                                y2: "17"
                            }), (0, i.h)("line", {
                                x1: "17",
                                x2: "25",
                                y1: "22",
                                y2: "22"
                            }))), this.translate("READ_TRANSCRIPT"))
                        }
                    }, {
                        key: "transcriptStyle",
                        value: function() {
                            return {
                                height: _(this),
                                verticalAlign: "middle",
                                visibility: "visible",
                                width: m(this)
                            }
                        }
                    }, {
                        key: "menuItemStyle",
                        value: function() {
                            return {
                                background: this.state.isHovering ? "rgba(0,0,0,.3)" : "",
                                boxShadow: this.state.isKeyboardFocused ? "0 0 0 2px #fff inset" : "none",
                                borderTopLeftRadius: "".concat(this.props.controlBarBorderRadius, "px"),
                                borderTopRightRadius: "".concat(this.props.controlBarBorderRadius, "px"),
                                cursor: "pointer",
                                display: "block",
                                fontFamily: r.interFontFamily,
                                fontSize: b(this),
                                lineHeight: _(this),
                                marginRight: "".concat(10 * this.props.scale, "px"),
                                textAlign: "left",
                                width: "100%"
                            }
                        }
                    }, {
                        key: "translate",
                        value: function(t) {
                            return (0, s.getTranslation)(this.props.playerLanguage.code, "CAPTIONS_".concat(t))
                        }
                    }]) && l(n.prototype, p), h && l(n, h), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, p, h
                }(i.Component),
                m = function(t) {
                    return "".concat(function(t) {
                        return 40 * t.props.scale
                    }(t), "px")
                },
                b = function(t) {
                    return 14 * t.props.scale
                },
                _ = function(t) {
                    return "".concat(w(t), "px")
                },
                w = function(t) {
                    return 34 * t.props.scale
                }
        },
        430: (t, e, n) => {
            n.d(e, {
                default: () => h
            });
            var i = n(2),
                r = n(76),
                o = n(294);

            function a(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, s(i.key), i)
                }
            }

            function s(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }

            function c(t, e, n) {
                return e = l(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, u() ? Reflect.construct(e, n || [], l(t).constructor) : e.apply(t, n))
            }

            function u() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (u = function() {
                    return !!t
                })()
            }

            function l(t) {
                return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, l(t)
            }

            function f(t, e) {
                return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, f(t, e)
            }
            var p = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), n = c(this, e, [t]), (0, o.getLoadedSelfHostedGoogleFonts)().includes(t.captionsFontFamily) || (0, o.loadSelfHostedGoogleFont)(t.captionsFontFamily), n
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
                }(e, t), n = e, (s = [{
                    key: "componentDidUpdate",
                    value: function(t) {
                        var e = (0, o.getLoadedSelfHostedGoogleFonts)();
                        this.props.captionsFontFamily == t.captionsFontFamily || e.includes(this.props.captionsFontFamily) || (0, o.loadSelfHostedGoogleFont)(this.props.captionsFontFamily)
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.props.text.map((function(e, n) {
                                return t.renderLine(e, n)
                            }));
                        return (0, i.h)("div", {
                            class: "w-captions w-css-reset w-css-reset-tree w-vulcan-v2-button",
                            style: this.rootContainerStyle()
                        }, (0, i.h)("div", {
                            style: this.groupStyle()
                        }, e))
                    }
                }, {
                    key: "renderLine",
                    value: function(t, e) {
                        var n = {
                                isFirst: 0 === e,
                                isLast: e === this.props.text.length - 1
                            },
                            r = this.props.rtl ? "rtl" : "ltr";
                        return (0, i.h)("p", {
                            class: "w-captions-line",
                            style: this.lineStyle()
                        }, (0, i.h)("div", {
                            style: {
                                display: "inline-block",
                                transition: "all 200ms ease",
                                verticalAlign: "bottom"
                            },
                            class: "w-css-reset"
                        }, (0, i.h)("span", {
                            dir: r,
                            style: this.spanStyle(n),
                            dangerouslySetInnerHTML: {
                                __html: t
                            }
                        })))
                    }
                }, {
                    key: "rootContainerStyle",
                    value: function() {
                        var t = this.props,
                            e = 18 * t.scale,
                            n = t.controlsAreVisible ? 0 : -t.controlBarHeight;
                        return {
                            bottom: "".concat(n + e, "px"),
                            left: 0,
                            pointerEvents: "none",
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            transition: "all 100ms ease"
                        }
                    }
                }, {
                    key: "groupStyle",
                    value: function() {
                        return {
                            display: "inline-block",
                            position: "relative",
                            margin: "auto",
                            maxWidth: "80%",
                            outline: "none",
                            cursor: "pointer"
                        }
                    }
                }, {
                    key: "lineStyle",
                    value: function() {
                        return {
                            lineHeight: "1em",
                            margin: 0,
                            padding: 0
                        }
                    }
                }, {
                    key: "spanStyle",
                    value: function() {
                        var t = this.props.scale,
                            e = new r.Color(this.props.captionsBackgroundColor).alpha(.7),
                            n = this.props.captionsBorderRadius,
                            i = new r.Color(this.props.captionsTextColor),
                            o = this.props.captionsTextSize,
                            a = this.props.captionsFontFamily;
                        return {
                            background: e,
                            borderRadius: "".concat(n, "px"),
                            color: i,
                            display: "block",
                            fontFamily: a,
                            fontSize: "".concat(o * t, "px"),
                            lineHeight: "1em",
                            overflow: "hidden",
                            padding: ".25em .6em",
                            textOverflow: "ellipsis",
                            webkitFontSmoothing: "antialiased",
                            width: "100%",
                            transition: "all 200ms ease-in-out"
                        }
                    }
                }]) && a(n.prototype, s), u && a(n, u), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, s, u
            }(i.Component);
            p.defaultProps = {
                captionsBorderRadius: 0,
                captionsBackgroundColor: "#000",
                captionsTextColor: "#fff",
                captionsTextSize: 18,
                captionsFontFamily: "Inter"
            };
            const h = p
        },
        432: (t, e, n) => {
            n.d(e, {
                default: () => g
            });
            var i = n(2),
                r = n(39),
                o = n(43),
                a = n(433),
                s = n(435),
                c = n(436);

            function u(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, v(i.key), i)
                }
            }

            function l(t, e, n) {
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

            function h(t, e) {
                return h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, h(t, e)
            }

            function d(t, e, n) {
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
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var y = 20;
            const g = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), d(n = l(this, e, [t]), "setRefs", (function(t) {
                        n.sectionRefs = t
                    })), d(n, "resetFirstHitIndex", (function() {
                        n.setState({
                            activeSearchHitIndex: void 0
                        })
                    })), d(n, "setCloseFocus", (function() {
                        (0, o.isMouseDown)() || n.setState({
                            closeFocus: !0
                        })
                    })), d(n, "setCloseBlur", (function() {
                        n.setState({
                            closeFocus: !1
                        })
                    })), d(n, "setClearSearchFocus", (function() {
                        (0, o.isMouseDown)() || n.setState({
                            clearSearchFocus: !0
                        })
                    })), d(n, "setClearSearchBlur", (function() {
                        n.setState({
                            clearSearchFocus: !1
                        })
                    })), d(n, "updateSearchValue", (function(t) {
                        n.setState({
                            searchKey: t.target.value
                        })
                    })), d(n, "inputKeyDown", (function(t) {
                        var e = n.state,
                            i = e.hitCounter,
                            r = e.activeSearchHitIndex,
                            o = e.hitAndMissIndices,
                            a = e.searchKey,
                            s = 40 === t.which ? 0 : r + 1,
                            c = o.indexOf(!0, s),
                            u = o.indexOf(!0);
                        u = -1 === u ? 0 : u;
                        var l, f = i;
                        switch (-1 === c ? (l = u, f = a ? 1 : 0) : (l = c, f += 1), t.which) {
                            case 40:
                                n.setState({
                                    activeSearchHitIndex: l,
                                    hitCounter: a ? 1 : 0
                                }), setTimeout((function() {
                                    requestAnimationFrame((function() {
                                        n.sectionRefs[l].focus()
                                    }))
                                }), 20);
                                break;
                            case 13:
                                n.setState({
                                    activeSearchHitIndex: l,
                                    hitCounter: f
                                })
                        }
                    })), d(n, "inputOnFocus", (function() {
                        n.setState({
                            inputHasFocus: !0
                        })
                    })), d(n, "inputOnBlur", (function() {
                        n.setState({
                            inputHasFocus: !1
                        })
                    })), d(n, "focusInput", (function(t) {
                        n.inputElem.focus(), n.setState({
                            activeSearchHitIndex: t
                        })
                    })), d(n, "updateHitCounter", (function(t) {
                        var e = n.state.hitCounter,
                            i = t ? e + 1 : e - 1;
                        n.state.searchKey && n.setState({
                            hitCounter: i
                        })
                    })), d(n, "onMouseMove", (function() {
                        !1 === n.state.recentlyMoused && n.setState({
                            recentlyMoused: !0
                        }), n.isMousingTimeout && clearTimeout(n.isMousingTimeout), n.isMousingTimeout = setTimeout((function() {
                            n.setState({
                                recentlyMoused: !1
                            })
                        }), 7e3)
                    })), d(n, "onKeyUp", (function(t) {
                        27 !== t.which || t.escapeHandled || (t.escapeHandled = !0, n.props.closeTranscript())
                    })), n.state = {
                        captions: n.formatCaptions(),
                        clearSearchFocus: !1,
                        closeFocus: !1,
                        hitAndMissIndices: [],
                        hitCounter: 0,
                        inputHasFocus: !1,
                        isContainerHover: null,
                        recentlyMoused: !1,
                        searchKey: "",
                        totalHits: 0,
                        turnstile: {}
                    }, n.isMousingTimeout = null, n.searchTimeout = null, n.setTurnstileOptions(), n
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
                }(e, t), n = e, (f = [{
                    key: "componentDidMount",
                    value: function() {
                        this.setState({
                            hitAndMissIndices: this.initialHitAndMissIndices()
                        }), this.props.metricsVideoCount("interactiveCaptions-open"), this.inputElem.focus()
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        this.props.metricsVideoCount("interactiveCaptions-close")
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function(t, e) {
                        this.state.searchKey !== e.searchKey && this.debounceSearch(), this.props.selectedLanguage !== t.selectedLanguage && (this.setState({
                            captions: this.formatCaptions()
                        }), this.setState({
                            hitAndMissIndices: this.initialHitAndMissIndices()
                        })), (this.props.turnstileClosed !== t.turnstileClosed || this.props.turnstileEmail !== t.turnstileEmail || void 0 !== this.props.turnstilePlugin && void 0 === t.turnstilePlugin) && this.setTurnstileOptions(), e.hitCounter === this.state.hitCounter && e.totalHits === this.state.totalHits || this.props.onSearchHitCounterChange({
                            activeHitIndex: this.state.hitCounter,
                            totalHits: this.state.totalHits
                        })
                    }
                }, {
                    key: "initialHitAndMissIndices",
                    value: function() {
                        var t = this.state.captions.length;
                        return Array.apply(null, Array(t)).map((function() {
                            return !1
                        }))
                    }
                }, {
                    key: "setTurnstileOptions",
                    value: function() {
                        var t = this.props.turnstilePlugin;
                        t ? this.setState({
                            turnstile: {
                                enabled: !0,
                                time: t.options.time,
                                hasClosed: this.props.turnstileClosed || Boolean(this.props.turnstileEmail) || !1
                            }
                        }) : this.setState({
                            turnstile: {
                                enabled: !1,
                                time: void 0,
                                hasClosed: void 0
                            }
                        })
                    }
                }, {
                    key: "debounceSearch",
                    value: function() {
                        var t = this;
                        clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout((function() {
                            t.doSearch()
                        }), 350)
                    }
                }, {
                    key: "doSearch",
                    value: function() {
                        var t, e = this.state,
                            n = e.searchKey,
                            i = e.captions,
                            r = new RegExp(n, "ig"),
                            o = 0;
                        if (i && n) {
                            var a = i.map((function(e, n) {
                                    var i = r.test(e.text);
                                    return void 0 === t && i && (t = n), i && (o += 1), i
                                })),
                                s = t ? 1 : 0;
                            this.setState({
                                hitAndMissIndices: a,
                                activeSearchHitIndex: t,
                                hitCounter: s,
                                totalHits: o
                            }), this.props.metricsVideoCount("interactiveCaptions-search")
                        } else this.setState({
                            hitAndMissIndices: this.initialHitAndMissIndices(),
                            totalHits: o,
                            hitCounter: 0,
                            activeSearchHitIndex: t
                        })
                    }
                }, {
                    key: "getCaptionsForLanguage",
                    value: function() {
                        var t = this.props,
                            e = t.srtCaptions,
                            n = t.selectedLanguage,
                            i = t.preferredLanguage,
                            r = n && "_off_" !== n ? n : i;
                        return e.filter((function(t) {
                            return t.language === r
                        }))[0]
                    }
                }, {
                    key: "formatCaptions",
                    value: function() {
                        var t = this.getCaptionsForLanguage(),
                            e = null == t ? void 0 : t.hash.lines.map((function(t) {
                                return t.text.map((function(e) {
                                    return {
                                        start: t.start,
                                        end: t.end,
                                        text: e
                                    }
                                }))
                            }));
                        return [].concat.apply([], e)
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t, e = this,
                            n = (this.props.scale, this.state),
                            r = n.captions,
                            o = n.hitCounter,
                            u = n.totalHits,
                            l = null !== (t = this.getCaptionsForLanguage()) && void 0 !== t && t.right_to_left ? "rtl" : "ltr";
                        return (0, i.h)("div", {
                            class: "w-css-reset w-css-reset-tree",
                            onKeyUp: this.onKeyUp,
                            onMouseMove: this.onMouseMove,
                            style: this.rootStyles()
                        }, (0, i.h)("div", {
                            dir: l,
                            style: this.searchAndCloseContainerStyles()
                        }, (0, i.h)("div", {
                            style: {
                                position: "absolute",
                                width: "50%",
                                left: 0,
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: "auto"
                            }
                        }, (0, i.h)("div", {
                            style: this.searchIconStyles()
                        }, (0, i.h)(c.SearchIcon, {
                            color: this.state.inputHasFocus || this.state.searchKey ? "#505050" : "#FFF"
                        })), (0, i.h)("style", {
                            dangerouslySetInnerHTML: {
                                __html: "\n                .w-interactive-captions--search-input::placeholder {\n                  color: ".concat(this.state.inputHasFocus || this.state.searchKey ? "#505050" : "#FFF", ";\n                  opacity: 1;\n                }\n                .w-interactive-captions--search-input::-webkit-search-cancel-button {\n                  display: none;\n                }\n              ")
                            }
                        }), (0, i.h)("input", {
                            "aria-label": "Search Captions",
                            class: "w-interactive-captions--search-input",
                            onBlur: this.inputOnBlur,
                            onInput: this.updateSearchValue,
                            onFocus: this.inputOnFocus,
                            onKeyDown: this.inputKeyDown,
                            placeholder: "Search",
                            style: this.searchInputStyles(),
                            type: "search",
                            value: this.state.searchKey,
                            ref: function(t) {
                                return e.inputElem = t
                            }
                        }), (0, i.h)("button", {
                            style: this.stylesForClearSearchButton(),
                            class: "w-vulcan-v2-button w-css-reset",
                            onClick: function() {
                                e.setState({
                                    searchKey: ""
                                }), e.inputElem.focus()
                            },
                            onFocus: this.setClearSearchFocus,
                            onBlur: this.setClearSearchBlur,
                            tabIndex: 0,
                            "aria-label": "Clear search input"
                        }, (0, i.h)(s.CloseIcon, {
                            color: "#000"
                        })), (0, i.h)("div", {
                            style: this.hitCountStyle()
                        }, o, " / ", u)), (0, i.h)("div", {
                            style: {
                                position: "absolute",
                                right: "5%",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "inline-block"
                            }
                        }, (0, i.h)("button", {
                            style: this.closeButtonStyles(),
                            class: "w-vulcan-v2-button w-css-reset",
                            onClick: this.props.closeTranscript,
                            onFocus: this.setCloseFocus,
                            onBlur: this.setCloseBlur,
                            tabIndex: 0,
                            "aria-label": "Close Interactive Captions"
                        }, (0, i.h)(s.CloseIcon, {
                            color: "#FFF"
                        })))), (0, i.h)(a.default, {
                            activeSearchHitIndex: this.state.activeSearchHitIndex,
                            allRefs: this.sectionRefs,
                            captions: r,
                            closeTranscript: this.props.closeTranscript,
                            controlsAreVisible: this.props.controlsAreVisible,
                            controlBarHeight: this.calculateSearchHeight(),
                            focusInput: this.focusInput,
                            hitAndMissIndices: this.state.hitAndMissIndices,
                            recentlyMoused: this.state.recentlyMoused,
                            scale: this.props.scale,
                            setRefs: this.setRefs,
                            searchKey: this.state.searchKey,
                            seekTranscript: this.props.seekTranscript,
                            turnstile: this.state.turnstile,
                            updateHitCounter: this.updateHitCounter,
                            videoDuration: this.props.videoDuration,
                            videoHeight: this.props.videoHeight,
                            videoTime: this.props.videoTime,
                            dir: l
                        }))
                    }
                }, {
                    key: "rootStyles",
                    value: function() {
                        return {
                            backgroundColor: "rgba(0,0,0,.65)",
                            clip: "rect(0,0,0,0)",
                            color: "#fff",
                            height: "calc(100% + ".concat(this.props.controlBarHeight, "px)")
                        }
                    }
                }, {
                    key: "calculateSearchHeight",
                    value: function() {
                        return this.props.controlBarHeight ? this.props.controlBarHeight : 34 * this.props.scale
                    }
                }, {
                    key: "searchAndCloseContainerStyles",
                    value: function() {
                        return {
                            position: "relative",
                            height: "".concat(2 * this.calculateSearchHeight(), "px"),
                            minHeight: "".concat(2 * this.calculateSearchHeight(), "px")
                        }
                    }
                }, {
                    key: "searchIconStyles",
                    value: function() {
                        var t = this.props.scale,
                            e = "".concat(16 * t, "px");
                        return {
                            position: "absolute",
                            display: "inline-block",
                            top: "".concat(y * t, "px"),
                            transform: "translateY(-50%)",
                            left: e,
                            transition: "all 300ms ease",
                            width: "".concat(y * t, "px")
                        }
                    }
                }, {
                    key: "closeButtonStyles",
                    value: function() {
                        var t = this.props.scale;
                        return {
                            boxShadow: this.state.closeFocus ? "0 0 0 2px #fff inset" : "none",
                            borderWidth: "1px",
                            borderRadius: "0%",
                            cursor: "pointer",
                            padding: "2px",
                            height: "".concat(22.5 * t, "px"),
                            width: "".concat(22.5 * t, "px"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }
                    }
                }, {
                    key: "hitCountStyle",
                    value: function() {
                        var t, e = this.props.scale,
                            n = this.state.searchKey,
                            i = {
                                position: "absolute",
                                transform: "translateY(-50%)",
                                color: "#888",
                                top: "50%",
                                fontSize: "".concat(10 * e, "px"),
                                fontWeight: 600,
                                fontFamily: r.interFontFamily,
                                opacity: n ? 1 : 0,
                                transition: "all 300ms ease"
                            };
                        return (null === (t = this.getCaptionsForLanguage()) || void 0 === t ? void 0 : t.right_to_left) ? i.left = "".concat(48 * e + 45, "px") : i.right = "".concat(48 * e, "px"), i
                    }
                }, {
                    key: "stylesForClearSearchButton",
                    value: function() {
                        var t = this.props.scale,
                            e = this.state.searchKey;
                        return {
                            boxShadow: this.state.clearSearchFocus ? "0 0 0 2px #000 inset" : "none",
                            cursor: "pointer",
                            display: "flex",
                            opacity: e ? 1 : 0,
                            outline: "none",
                            padding: "2px",
                            pointerEvents: e ? "auto" : "none",
                            position: "absolute",
                            right: "".concat(16 * t, "px"),
                            top: "50%",
                            transform: "translateY(-50%)",
                            transition: "all 300ms ease",
                            width: "".concat(15 * t, "px")
                        }
                    }
                }, {
                    key: "searchInputStyles",
                    value: function() {
                        var t = this.props.scale,
                            e = this.state,
                            n = e.inputHasFocus,
                            i = e.searchKey,
                            o = Boolean(n || i),
                            a = o ? "white" : "transparent",
                            s = 8 * t;
                        return {
                            "-webkit-appearance": "none",
                            padding: "".concat(s, "px ").concat(85 * t, "px ").concat(s, "px ").concat(45 * t, "px"),
                            fontSize: "".concat(17 * t, "px"),
                            display: "block",
                            fontFamily: r.interFontFamily,
                            transition: "all 300ms ease",
                            color: o ? "#505050" : "white",
                            backgroundColor: a,
                            border: "1px solid white",
                            width: "100%",
                            margin: 0,
                            outline: "none",
                            boxSizing: "border-box"
                        }
                    }
                }]) && u(n.prototype, f), p && u(n, p), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, f, p
            }(i.Component)
        },
        434: (t, e, n) => {
            n.d(e, {
                default: () => v
            });
            var i = n(2),
                r = n(39),
                o = n(43);

            function a(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var i, r, o, a, s = [],
                            c = !0,
                            u = !1;
                        try {
                            if (o = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                c = !1
                            } else
                                for (; !(c = (i = o.call(n)).done) && (s.push(i.value), s.length !== e); c = !0);
                        } catch (t) {
                            u = !0, r = t
                        } finally {
                            try {
                                if (!c && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (u) throw r
                            }
                        }
                        return s
                    }
                }(t, e) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return s(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(t, e) : void 0
                    }
                }(t, e) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }

            function c(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, d(i.key), i)
                }
            }

            function u(t, e, n) {
                return e = f(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, l() ? Reflect.construct(e, n || [], f(t).constructor) : e.apply(t, n))
            }

            function l() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (l = function() {
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

            function h(t, e, n) {
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
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            const v = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), h(n = u(this, e, [t]), "clickLine", (function(t) {
                        var e = n.props,
                            i = e.seek,
                            r = e.line;
                        t.preventDefault(), i(r.start + .001)
                    })), h(n, "onMouseEnter", (function() {
                        !0 !== n.state.isHovered && n.setState({
                            isHovered: !0
                        })
                    })), h(n, "onMouseLeave", (function() {
                        !1 !== n.state.isHovered && n.setState({
                            isHovered: !1
                        })
                    })), h(n, "onFocus", (function() {
                        (0, o.isMouseDown)() || (n.props.setFocusIndex(n.props.index), n.setState({
                            isKeyboardFocused: !0
                        }))
                    })), h(n, "unsetKeyboardFocus", (function() {
                        n.setState({
                            isKeyboardFocused: !1
                        })
                    })), h(n, "onKeyDown", (function(t) {
                        var e = a(n.props.focusNeighbors, 2),
                            i = e[0],
                            r = e[1];
                        switch (t.which) {
                            case 40:
                                t.preventDefault(), t.wistiaPlayerHandled = !0, -1 !== r && (n.unsetKeyboardFocus(), n.props.focusNextOrPrevious(r), n.props.updateHitCounter(!0));
                                break;
                            case 38:
                                t.preventDefault(), t.wistiaPlayerHandled = !0, n.unsetKeyboardFocus(), -1 !== i ? (n.props.focusNextOrPrevious(i), n.props.updateHitCounter(!1)) : n.props.focusInput(n.props.index)
                        }
                    })), h(n, "onKeyUp", (function(t) {
                        27 === t.which && (n.props.focusInput(n.props.index), t.escapeHandled = !0)
                    })), n.state = {
                        isHovered: !1,
                        isKeyboardFocused: !1
                    }, n
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
                    key: "componentDidMount",
                    value: function() {
                        if (this.el) {
                            var t = this.props.focusHelper ? "focusHelper" : this.props.index;
                            this.props.setSectionRef(this.el, t)
                        }
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function() {
                        if (this.el) {
                            var t = this.props.focusHelper ? "focusHelper" : this.props.index;
                            this.props.setSectionRef(this.el, t)
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.props,
                            n = e.searchKey,
                            r = e.line,
                            o = e.isActive,
                            a = e.scale,
                            s = new RegExp(n, "ig"),
                            c = this.props.focusHelper ? "div" : "button",
                            u = r.text;
                        return "" !== n && s.test(r.text) && (u = r.text.replace(s, (function(t) {
                            return "<mark>".concat(t, "</mark>")
                        }))), (0, i.h)("div", {
                            role: !this.props.focusHelper && "gridcell"
                        }, (0, i.h)(c, {
                            "aria-describedby": this.props.focusHelper ? "" : this.props.containerId,
                            onBlur: this.unsetKeyboardFocus,
                            onClick: this.clickLine,
                            onFocus: this.onFocus,
                            onKeyDown: this.onKeyDown,
                            onKeyUp: this.onKeyUp,
                            onMouseLeave: this.onMouseLeave,
                            onMouseEnter: this.onMouseEnter,
                            ref: function(e) {
                                return t.el = e
                            },
                            style: this.lineStyles(o),
                            tabIndex: -1
                        }, !1 === this.props.focusHelper && (0, i.h)("span", {
                            dangerouslySetInnerHTML: {
                                __html: u
                            },
                            style: {
                                backgroundColor: this.state.isHovered ? "black" : "transparent",
                                boxShadow: this.state.isKeyboardFocused ? "0 0 0 2px #fff inset" : "none",
                                cursor: "pointer",
                                padding: "".concat(3.4 * a, "px ").concat(8 * a, "px"),
                                textAlign: "rtl" === this.props.dir ? "right" : "left"
                            }
                        })))
                    }
                }, {
                    key: "lineStyles",
                    value: function(t) {
                        var e = this.props.scale;
                        return {
                            display: "inline-flex",
                            minHeight: this.props.focusHelper ? "0" : "".concat(30 * e, "px"),
                            fontFamily: r.interFontFamily,
                            fontSize: "".concat(17 * e, "px"),
                            fontWeight: t ? "700" : "500",
                            lineHeight: this.props.focusHelper ? "0" : "".concat(26 * e, "px"),
                            outline: "none",
                            marginLeft: "".concat(20 / 3.3 * e, "px")
                        }
                    }
                }]) && c(n.prototype, s), l && c(n, l), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, s, l
            }(i.Component)
        },
        433: (t, e, n) => {
            n.d(e, {
                default: () => m
            });
            var i = n(149),
                r = n(2),
                o = n(39),
                a = n(5),
                s = n(43),
                c = n(24),
                u = n(434);

            function l(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, y(i.key), i)
                }
            }

            function f(t, e, n) {
                return e = h(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, p() ? Reflect.construct(e, n || [], h(t).constructor) : e.apply(t, n))
            }

            function p() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (p = function() {
                    return !!t
                })()
            }

            function h(t) {
                return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, h(t)
            }

            function d(t, e) {
                return d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, d(t, e)
            }

            function v(t, e, n) {
                return (e = y(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function y(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var g = 20;
            const m = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), v(n = f(this, e, [t]), "focusNextOrPrevious", (function(t) {
                        n.setState({
                            scrollToIndex: t,
                            focusIndex: t
                        }), setTimeout((function() {
                            requestAnimationFrame((function() {
                                n.props.allRefs[t].focus()
                            }))
                        }), 20)
                    })), v(n, "handleScroll", (function(t) {
                        n.setState({
                            scrollTop: t.target.scrollTop
                        })
                    })), v(n, "onKeyDown", (function(t) {
                        if ((38 === t.which || 40 === t.which) && !t.wistiaPlayerHandled) {
                            t.preventDefault(), t.wistiaPlayerHandled = !0;
                            var e = n.props.hitAndMissIndices.indexOf(!0),
                                i = -1 !== e ? e : 0;
                            n.setState({
                                scrollToIndex: i,
                                focusIndex: i
                            }), setTimeout((function() {
                                requestAnimationFrame((function() {
                                    n.props.allRefs[i].focus()
                                }))
                            }), 20)
                        }
                    })), v(n, "onWheel", (function() {
                        !1 === n.state.recentlyScrolled && n.setState({
                            recentlyScrolled: !0
                        }), n.scrollingTimeout && clearTimeout(n.scrollingTimeout), n.scrollingTimeout = setTimeout((function() {
                            n.setState({
                                recentlyScrolled: !1
                            })
                        }), 7e3)
                    })), v(n, "setSectionBlur", (function() {
                        n.setState({
                            sectionFocus: !1
                        })
                    })), v(n, "setSectionFocus", (function() {
                        (0, s.isMouseDown)() || n.setState({
                            sectionFocus: !0
                        })
                    })), v(n, "setFocusIndex", (function(t) {
                        n.setState({
                            focusIndex: t
                        })
                    })), v(n, "setSectionRef", (function(t, e) {
                        n.savedRefs[e] = t
                    })), v(n, "renderRowAtIndex", (function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return n.renderLine(n.props.captions[t], t, e)
                    })), n.state = {
                        sectionFocus: !1,
                        availableHeight: 0,
                        scrollTop: 0,
                        scrollToIndex: void 0,
                        prevScrollToIndex: void 0,
                        recentlyScrolled: !1
                    }, n.savedRefs = {}, n.scrollingTimeout = null, n.containerId = (0, c.seqId)("w-interactive-transcript-"), n
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
                }(e, t), n = e, (p = [{
                    key: "componentDidMount",
                    value: function() {
                        var t = this.props.captions;
                        if (this.props.setRefs && this.props.setRefs(this.savedRefs), this.setState({
                                availableHeight: this.calculateAvailableHeight()
                            }), this.props.videoTime > 0)
                            for (var e = 0; e < t.length; e++)
                                if (this.isWithinTime(t[e])) {
                                    this.setState({
                                        scrollToIndex: e
                                    });
                                    break
                                }
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function(t, e) {
                        var n = this.props.captions;
                        if (this.props.setRefs && this.props.setRefs(this.savedRefs), this.props.controlsAreVisible === t.controlsAreVisible && this.props.videoHeight === t.videoHeight || this.setState({
                                availableHeight: this.calculateAvailableHeight()
                            }), this.props.activeSearchHitIndex !== t.activeSearchHitIndex && this.setState({
                                scrollToIndex: this.props.activeSearchHitIndex,
                                prevScrollToIndex: t.activeSearchHitIndex
                            }), this.state.scrollToIndex !== e.scrollToIndex && this.setState({
                                prevScrollToIndex: this.state.scrollToIndex
                            }), this.props.videoTime !== t.videoTime && !1 === this.props.recentlyMoused && !1 === this.state.recentlyScrolled)
                            for (var i = 0; i < n.length; i++)
                                if (this.isWithinTime(n[i])) {
                                    this.props.allRefs[i - 1] && null !== this.props.allRefs[i - 1].offsetParent ? this.startScrollAnimation(i) : this.setState({
                                        scrollToIndex: i
                                    });
                                    break
                                }
                        this.props.controlsAreVisible && !t.controlsAreVisible && this.isAtBottomOfCaptions() && this.scrollToBottom()
                    }
                }, {
                    key: "animate",
                    value: function() {
                        var t = this;
                        this.scollInterpolation && !this.scollInterpolation.atEnd() ? this.scrollingAnimation = requestAnimationFrame((function() {
                            t.transcriptText.scrollTop = t.scollInterpolation.value(), t.scollInterpolation.atEnd() || t.animate()
                        })) : cancelAnimationFrame(this.scrollingAnimation)
                    }
                }, {
                    key: "calculateAvailableHeight",
                    value: function() {
                        var t = this.props,
                            e = t.controlsAreVisible,
                            n = t.controlBarHeight;
                        return t.videoHeight - (2 * n + (e ? n : 0))
                    }
                }, {
                    key: "focusMaintainer",
                    value: function(t, e) {
                        this.state.focusIndex && (0, a.elemIsInside)(document.activeElement, this.transcriptTextRoot) && (this.state.focusIndex < t || this.state.focusIndex >= e ? this.props.allRefs.focusHelper && this.props.allRefs.focusHelper.focus({
                            preventScroll: !0
                        }) : this.state.focusIndex > t && this.state.focusIndex < e && this.props.allRefs[this.state.focusIndex].focus())
                    }
                }, {
                    key: "calculateNumberOfRowsToRender",
                    value: function() {
                        var t = this.props,
                            e = t.captions,
                            n = t.turnstile;
                        if (n.enabled && !1 === n.hasClosed && "end" !== n.time) {
                            for (var i = 0, r = e.length - 1, o = Math.floor((i + r) / 2); e[o].start > n.time && o - 1 < r;) n.time > e[o].start ? i = o - 1 : r = o + 1, o = Math.floor((i + r) / 2);
                            return e[o].start <= n.time ? o + 1 : 1
                        }
                        return e.length
                    }
                }, {
                    key: "getNeighboringIndices",
                    value: function(t) {
                        var e = t,
                            n = t,
                            i = this.props.hitAndMissIndices;
                        if (!this.props.searchKey) return [t - 1, t === i.length - 1 ? -1 : t + 1];
                        for (;
                            (e -= 1) >= 0 && !i[e];);
                        for (;
                            (n += 1) < i.length && !i[n];);
                        return [e, n === i.length ? -1 : n]
                    }
                }, {
                    key: "isAtBottomOfCaptions",
                    value: function() {
                        var t = this.transcriptText;
                        return t.scrollTop + 5 >= t.scrollHeight - t.offsetHeight
                    }
                }, {
                    key: "isWithinTime",
                    value: function(t) {
                        var e = this.props.videoTime,
                            n = t.start,
                            i = t.end;
                        return e >= n && e < i
                    }
                }, {
                    key: "scrollToBottom",
                    value: function() {
                        var t = this.props.captions.length - 1;
                        this.startScrollAnimation(t)
                    }
                }, {
                    key: "sectionContainerStyles",
                    value: function() {
                        return {
                            height: "100%",
                            overflowY: "scroll",
                            boxShadow: this.state.sectionFocus ? "0 0 0 2px #fff inset" : "none",
                            outline: "none"
                        }
                    }
                }, {
                    key: "startScrollAnimation",
                    value: function(t) {
                        var e = t * g * 1.5 * this.props.scale,
                            n = Math.max(0, e),
                            r = this.transcriptText.scrollTop;
                        cancelAnimationFrame(this.scrollingAnimation), this.scollInterpolation = new i.Interpolation({
                            seedRange: 300,
                            outputStart: r,
                            outputEnd: n
                        }), this.animate()
                    }
                }, {
                    key: "turnstileText",
                    value: function() {
                        var t = this.props.scale;
                        return {
                            display: "block",
                            fontWeight: "500",
                            fontSize: "".concat(16 * t, "px"),
                            lineHeight: "".concat(30 * t, "px"),
                            fontFamily: o.interFontFamily,
                            textAlign: "center",
                            textStyle: "italic"
                        }
                    }
                }, {
                    key: "renderLine",
                    value: function(t, e, n) {
                        var i = t.start,
                            o = t.end,
                            a = this.isWithinTime({
                                start: i,
                                end: o
                            }),
                            s = this.getNeighboringIndices(e);
                        return (0, r.h)("div", {
                            key: e,
                            style: {
                                boxShadow: a && !n.focusHelper ? "2px 0 0 0 #fff inset" : "none",
                                boxSizing: "border-box"
                            },
                            dir: this.props.dir,
                            "aria-rowindex": e + 1,
                            role: !n.focusHelper && "row"
                        }, (0, r.h)(u.default, {
                            containerId: this.containerId,
                            dir: this.props.dir,
                            line: t,
                            focusHelper: n.focusHelper || !1,
                            focusInput: this.props.focusInput,
                            focusNeighbors: s,
                            focusNextOrPrevious: this.focusNextOrPrevious,
                            index: e,
                            isActive: a,
                            isHovered: !1,
                            key: e,
                            scale: this.props.scale,
                            searchKey: this.props.searchKey,
                            seek: this.props.seekTranscript,
                            setSectionRef: this.setSectionRef,
                            setFocusIndex: this.setFocusIndex,
                            updateHitCounter: this.props.updateHitCounter
                        }))
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t, e = this,
                            n = this.props,
                            i = n.scale,
                            o = n.turnstile,
                            a = n.videoDuration,
                            s = this.calculateNumberOfRowsToRender(),
                            c = 30 * i,
                            u = c * s;
                        t = "end" === o.time || a - 5 <= o.time;
                        var l = this.state,
                            f = l.availableHeight,
                            p = l.scrollTop,
                            h = Math.floor(p / c);
                        this.state.prevScrollToIndex !== this.state.scrollToIndex && this.transcriptText && void 0 !== this.state.scrollToIndex && (h = this.state.scrollToIndex, this.transcriptText.scrollTop = h * c);
                        var d = h + Math.ceil(f / c);
                        d > s && (d = s);
                        for (var v = [], y = h; y < d;) v.push(this.renderRowAtIndex(y, {})), y += 1;
                        this.focusMaintainer(h, d);
                        var g = {
                            height: u,
                            paddingTop: "".concat(h * c, "px")
                        };
                        "rtl" === this.props.dir ? (g.marginRight = "".concat(25, "%"), g.textAlign = "right") : (g.marginLeft = "".concat(29, "%"), g.textAlign = "left", g.width = "".concat(60, "%"));
                        var m = this.props.captions.length > 0;
                        return (0, r.h)("div", {
                            style: {
                                height: "".concat(f, "px")
                            },
                            ref: function(t) {
                                return e.transcriptTextRoot = t
                            }
                        }, (0, r.h)("div", {
                            key: "focusHelper",
                            style: {
                                height: 0
                            }
                        }, m && this.renderRowAtIndex(this.state.focusIndex || 0, {
                            focusHelper: !0
                        })), (0, r.h)("div", {
                            "aria-label": "Use the arrow keys to move between the different caption lines. Click each line to seek the video to that line",
                            id: this.containerId,
                            onBlur: this.setSectionBlur,
                            onFocus: this.setSectionFocus,
                            onKeyDown: this.onKeyDown,
                            onScroll: this.handleScroll,
                            onWheel: this.onWheel,
                            ref: function(t) {
                                return e.transcriptText = t
                            },
                            style: this.sectionContainerStyles(),
                            tabIndex: 0
                        }, (0, r.h)("div", {
                            style: g,
                            role: "grid",
                            "aria-rowcount": s
                        }, (0, r.h)("div", {
                            role: "rowgroup"
                        }, v)), o.enabled && !1 === o.hasClosed && !t && (0, r.h)("span", {
                            style: this.turnstileText()
                        }, "-- You must enter your email to access the rest of the video. --")))
                    }
                }]) && l(n.prototype, p), h && l(n, h), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, p, h
            }(r.Component)
        },
        435: (t, e, n) => {
            n.d(e, {
                CloseIcon: () => o
            });
            var i = n(2),
                r = n(41),
                o = function(t) {
                    var e = t.color;
                    return (0, i.h)("svg", (0, r.standardSvgAttrs)({
                        width: 24,
                        height: 24,
                        ariaHidden: !0
                    }), (0, i.h)("g", {
                        stroke: "none",
                        strokeWidth: "1",
                        fill: "".concat(e) || "#fff",
                        fillRule: "evenodd"
                    }, (0, i.h)("path", {
                        d: "M18.643128,20.7643515 C19.228878,21.3502515 20.178678,21.3502515 20.764428,20.7643515 C21.350178,20.1786015 21.350178,19.2288015 20.764428,18.6430515 L14.121378,12.0000015 L20.764428,5.3569065 C21.350178,4.7711115 21.350178,3.8213715 20.764428,3.2355765 C20.178678,2.6497965 19.228878,2.6497965 18.643128,3.2355765 L12.000018,9.8786715 L5.356893,3.2355465 C4.771098,2.6497515 3.821358,2.6497515 3.235563,3.2355465 C2.649783,3.8213265 2.649783,4.7710815 3.235563,5.3568615 L9.878703,12.0000015 L3.235578,18.6430515 C2.649783,19.2289515 2.649783,20.1786015 3.235578,20.7645015 C3.821358,21.3502515 4.771113,21.3502515 5.356893,20.7645015 L12.000018,14.1213165 L18.643128,20.7643515 Z"
                    })))
                }
        },
        63: (t, e, n) => {
            n.d(e, {
                CustomEventsWrapper: () => v
            });
            var i = n(2),
                r = n(11),
                o = n(64);

            function a() {
                return a = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, a.apply(null, arguments)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, h(i.key), i)
                }
            }

            function c(t, e, n) {
                return e = l(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, u() ? Reflect.construct(e, n || [], l(t).constructor) : e.apply(t, n))
            }

            function u() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (u = function() {
                    return !!t
                })()
            }

            function l(t) {
                return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, l(t)
            }

            function f(t, e) {
                return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, f(t, e)
            }

            function p(t, e, n) {
                return (e = h(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function h(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var d = (0, r.cachedDetect)(),
                v = function(t) {
                    function e() {
                        var t;
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return p(t = c(this, e, [].concat(i)), "onSwipe", (function(e, n) {
                            var i = t.props.onSwipe;
                            i && i(e, n)
                        })), p(t, "onPinch", (function(e, n) {
                            var i = t.props.onPinch;
                            i && i(e, n)
                        })), p(t, "onLongPress", (function(e, n) {
                            var i = t.props.onLongPress;
                            i && i(e, n)
                        })), p(t, "onCustomTouchMove", (function(e, n) {
                            var i = t.props.onCustomTouchMove;
                            i && i(e, n)
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
                    }(e, t), n = e, (r = [{
                        key: "render",
                        value: function() {
                            var t = this.props.tagName || "div";
                            return (0, i.h)(t, a({}, this.props, {
                                ref: this.props.elemRef
                            }), this.props.children)
                        }
                    }, {
                        key: "componentDidMount",
                        value: function() {
                            this._savedBase = this.base, this.setupBindings()
                        }
                    }, {
                        key: "componentDidUpdate",
                        value: function() {
                            this.base !== this._savedBase && (this._savedBase = this.base, this.destroyBindings(), this.setupBindings())
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function() {
                            this.destroyBindings()
                        }
                    }, {
                        key: "setupBindings",
                        value: function() {
                            if (this.unbinds = [], d.touchScreen) {
                                var t = this.touchEvents = new o.default(this.base);
                                t.on("swipe", this.onSwipe), t.on("pinch", this.onPinch), t.on("longpress", this.onLongPress), t.on("touchmove", this.onCustomTouchMove)
                            }
                        }
                    }, {
                        key: "destroyBindings",
                        value: function() {
                            this.touchEvents && (this.touchEvents.destroy(), this.touchEvents = null), this.unbinds && (this.unbinds.map((function(t) {
                                return t()
                            })), this.unbinds = null)
                        }
                    }]) && s(n.prototype, r), u && s(n, u), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, r, u
                }(i.Component)
        },
        436: (t, e, n) => {
            n.d(e, {
                SearchIcon: () => o
            });
            var i = n(2),
                r = n(41),
                o = function(t) {
                    var e = t.color;
                    return (0, i.h)("svg", (0, r.standardSvgAttrs)({
                        width: 24,
                        height: 24,
                        ariaHidden: !0
                    }), (0, i.h)("g", {
                        stroke: "none",
                        strokeWidth: "1",
                        fill: "".concat(e) || "#fff",
                        fillRule: "evenodd"
                    }, (0, i.h)("path", {
                        d: "M3 10.5C3 6.364 6.364 3 10.5 3S18 6.364 18 10.5 14.636 18 10.5 18 3 14.636 3 10.5m20.562 10.941l-4.661-4.661C20.213 15.027 21 12.858 21 10.5 21 4.701 16.298 0 10.5 0 4.7 0 0 4.701 0 10.5 0 16.298 4.7 21 10.5 21c2.358 0 4.527-.787 6.28-2.098l4.661 4.66c.292.291.677.438 1.06.438.386 0 .77-.147 1.061-.438.584-.584.584-1.539 0-2.121"
                    })))
                }
        },
        45: (t, e, n) => {
            n.d(e, {
                dynamicImport: () => a
            });
            var i = n(21);

            function r() {
                r = function() {
                    return e
                };
                var t, e = {},
                    n = Object.prototype,
                    i = n.hasOwnProperty,
                    o = Object.defineProperty || function(t, e, n) {
                        t[e] = n.value
                    },
                    a = "function" == typeof Symbol ? Symbol : {},
                    s = a.iterator || "@@iterator",
                    c = a.asyncIterator || "@@asyncIterator",
                    u = a.toStringTag || "@@toStringTag";

                function l(t, e, n) {
                    return Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), t[e]
                }
                try {
                    l({}, "")
                } catch (t) {
                    l = function(t, e, n) {
                        return t[e] = n
                    }
                }

                function f(t, e, n, i) {
                    var r = e && e.prototype instanceof m ? e : m,
                        a = Object.create(r.prototype),
                        s = new A(i || []);
                    return o(a, "_invoke", {
                        value: C(t, n, s)
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
                var h = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    y = "completed",
                    g = {};

                function m() {}

                function b() {}

                function _() {}
                var w = {};
                l(w, s, (function() {
                    return this
                }));
                var S = Object.getPrototypeOf,
                    k = S && S(S(I([])));
                k && k !== n && i.call(k, s) && (w = k);
                var T = _.prototype = m.prototype = Object.create(w);

                function O(t) {
                    ["next", "throw", "return"].forEach((function(e) {
                        l(t, e, (function(t) {
                            return this._invoke(e, t)
                        }))
                    }))
                }

                function x(t, e) {
                    function n(r, o, a, s) {
                        var c = p(t[r], t, o);
                        if ("throw" !== c.type) {
                            var u = c.arg,
                                l = u.value;
                            return l && "object" == typeof l && i.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                                n("next", t, a, s)
                            }), (function(t) {
                                n("throw", t, a, s)
                            })) : e.resolve(l).then((function(t) {
                                u.value = t, a(u)
                            }), (function(t) {
                                return n("throw", t, a, s)
                            }))
                        }
                        s(c.arg)
                    }
                    var r;
                    o(this, "_invoke", {
                        value: function(t, i) {
                            function o() {
                                return new e((function(e, r) {
                                    n(t, i, e, r)
                                }))
                            }
                            return r = r ? r.then(o, o) : o()
                        }
                    })
                }

                function C(e, n, i) {
                    var r = h;
                    return function(o, a) {
                        if (r === v) throw Error("Generator is already running");
                        if (r === y) {
                            if ("throw" === o) throw a;
                            return {
                                value: t,
                                done: !0
                            }
                        }
                        for (i.method = o, i.arg = a;;) {
                            var s = i.delegate;
                            if (s) {
                                var c = P(s, i);
                                if (c) {
                                    if (c === g) continue;
                                    return c
                                }
                            }
                            if ("next" === i.method) i.sent = i._sent = i.arg;
                            else if ("throw" === i.method) {
                                if (r === h) throw r = y, i.arg;
                                i.dispatchException(i.arg)
                            } else "return" === i.method && i.abrupt("return", i.arg);
                            r = v;
                            var u = p(e, n, i);
                            if ("normal" === u.type) {
                                if (r = i.done ? y : d, u.arg === g) continue;
                                return {
                                    value: u.arg,
                                    done: i.done
                                }
                            }
                            "throw" === u.type && (r = y, i.method = "throw", i.arg = u.arg)
                        }
                    }
                }

                function P(e, n) {
                    var i = n.method,
                        r = e.iterator[i];
                    if (r === t) return n.delegate = null, "throw" === i && e.iterator.return && (n.method = "return", n.arg = t, P(e, n), "throw" === n.method) || "return" !== i && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + i + "' method")), g;
                    var o = p(r, e.iterator, n.arg);
                    if ("throw" === o.type) return n.method = "throw", n.arg = o.arg, n.delegate = null, g;
                    var a = o.arg;
                    return a ? a.done ? (n[e.resultName] = a.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, g) : a : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, g)
                }

                function E(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                }

                function j(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e
                }

                function A(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], t.forEach(E, this), this.reset(!0)
                }

                function I(e) {
                    if (e || "" === e) {
                        var n = e[s];
                        if (n) return n.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var r = -1,
                                o = function n() {
                                    for (; ++r < e.length;)
                                        if (i.call(e, r)) return n.value = e[r], n.done = !1, n;
                                    return n.value = t, n.done = !0, n
                                };
                            return o.next = o
                        }
                    }
                    throw new TypeError(typeof e + " is not iterable")
                }
                return b.prototype = _, o(T, "constructor", {
                    value: _,
                    configurable: !0
                }), o(_, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = l(_, u, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === b || "GeneratorFunction" === (e.displayName || e.name))
                }, e.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, _) : (t.__proto__ = _, l(t, u, "GeneratorFunction")), t.prototype = Object.create(T), t
                }, e.awrap = function(t) {
                    return {
                        __await: t
                    }
                }, O(x.prototype), l(x.prototype, c, (function() {
                    return this
                })), e.AsyncIterator = x, e.async = function(t, n, i, r, o) {
                    void 0 === o && (o = Promise);
                    var a = new x(f(t, n, i, r), o);
                    return e.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                        return t.done ? t.value : a.next()
                    }))
                }, O(T), l(T, u, "Generator"), l(T, s, (function() {
                    return this
                })), l(T, "toString", (function() {
                    return "[object Generator]"
                })), e.keys = function(t) {
                    var e = Object(t),
                        n = [];
                    for (var i in e) n.push(i);
                    return n.reverse(),
                        function t() {
                            for (; n.length;) {
                                var i = n.pop();
                                if (i in e) return t.value = i, t.done = !1, t
                            }
                            return t.done = !0, t
                        }
                }, e.values = I, A.prototype = {
                    constructor: A,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(j), !e)
                            for (var n in this) "t" === n.charAt(0) && i.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
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

                        function r(i, r) {
                            return s.type = "throw", s.arg = e, n.next = i, r && (n.method = "next", n.arg = t), !!r
                        }
                        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                            var a = this.tryEntries[o],
                                s = a.completion;
                            if ("root" === a.tryLoc) return r("end");
                            if (a.tryLoc <= this.prev) {
                                var c = i.call(a, "catchLoc"),
                                    u = i.call(a, "finallyLoc");
                                if (c && u) {
                                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return r(a.finallyLoc)
                                } else if (c) {
                                    if (this.prev < a.catchLoc) return r(a.catchLoc, !0)
                                } else {
                                    if (!u) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return r(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var o = r;
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
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), j(n), g
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var i = n.completion;
                                if ("throw" === i.type) {
                                    var r = i.arg;
                                    j(n)
                                }
                                return r
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(e, n, i) {
                        return this.delegate = {
                            iterator: I(e),
                            resultName: n,
                            nextLoc: i
                        }, "next" === this.method && (this.arg = t), g
                    }
                }, e
            }

            function o(t, e, n, i, r, o, a) {
                try {
                    var s = t[o](a),
                        c = s.value
                } catch (t) {
                    return void n(t)
                }
                s.done ? e(c) : Promise.resolve(c).then(i, r)
            }
            var a = function() {
                var t, e = (t = r().mark((function t(e) {
                    var n, o, a, s, c = arguments;
                    return r().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (a = null !== (n = (o = c.length > 1 && void 0 !== c[1] ? c[1] : {}).host) && void 0 !== n ? n : (0, i.eV1HostWithPort)(), !("" !== (s = i.TAGGED_VERSION) && s.length > 0 && !0 !== o.mediaData)) {
                                    t.next = 5;
                                    break
                                }
                                return t.abrupt("return",
                                    import ("".concat((0, i.eV1Protocol)(), "//").concat(a, "/").concat(e, "@").concat(s)));
                            case 5:
                                return t.abrupt("return",
                                    import ("".concat((0, i.eV1Protocol)(), "//").concat(a, "/").concat(e)));
                            case 6:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })), function() {
                    var e = this,
                        n = arguments;
                    return new Promise((function(i, r) {
                        var a = t.apply(e, n);

                        function s(t) {
                            o(a, i, r, s, c, "next", t)
                        }

                        function c(t) {
                            o(a, i, r, s, c, "throw", t)
                        }
                        s(void 0)
                    }))
                });
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()
        },
        294: (t, e, n) => {
            n.d(e, {
                getLoadedSelfHostedGoogleFonts: () => o,
                loadSelfHostedGoogleFont: () => a
            });
            n(27);
            var i = ["Arsenal", "Barlow Condensed", "Catamaran", "Chivo", "Corben", "Dancing Script", "Fira Mono", "Inconsolata", "Inter", "Lato", "Libre Franklin", "Lora", "Merriweather", "Montserrat", "Nunito", "Open Sans", "Oswald", "PT Serif", "Playfair Display", "Poppins", "Roboto", "Slabo 13px", "Source Sans Pro", "Source Serif Pro", "Work Sans", "Zilla Slab"],
                r = "https://fast.wistia.com/fonts/google_fonts/",
                o = function() {
                    var t = document.querySelectorAll('link[rel="stylesheet"][href^="'.concat(r, '"]'));
                    return 0 === t.length ? [] : Array.from(t).reduce((function(t, e) {
                        var n = new URL(e.href).pathname.split("/")[3];
                        return t.includes(n) || t.push(n), t
                    }), [])
                },
                a = function(t) {
                    if (i.includes(t)) {
                        var e = encodeURIComponent(t).replaceAll("%20", "_");
                        if (!o().includes(e)) {
                            var n = document.createElement("link");
                            n.rel = "stylesheet", n.href = "".concat(r).concat(e, "/").concat(e, ".css"), document.head.appendChild(n)
                        }
                    }
                }
        },
        35: (t, e, n) => {
            n.d(e, {
                getAllApiHandles: () => r
            });
            n(36), n(13);
            var i = n(37);
            var r = function() {
                return (void 0 === (0, i.wData)("video") ? [] : Object.values((0, i.wData)("video"))).concat(void 0 === (0, i.wData)("iframe_api") ? [] : Object.values((0, i.wData)("iframe_api")))
            }
        },
        36: (t, e, n) => {
            n.d(e, {
                getAllApiEmbedElements: () => i
            });
            var i = function() {
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
                hasPerformanceMeasureSupport: () => i
            });
            var i = function() {
                var t = window.performance;
                return Boolean(t) && Boolean(t.measure)
            }
        },
        41: (t, e, n) => {
            function i(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(t);
                    e && (i = i.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, i)
                }
                return n
            }

            function r(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(n), !0).forEach((function(e) {
                        o(t, e, n[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(e) {
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
                            var i = n.call(t, e || "default");
                            if ("object" != typeof i) return i;
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
                    i = t.height,
                    o = void 0 === i ? 34 : i,
                    a = t.styleOverride,
                    s = void 0 === a ? {} : a,
                    c = t.ariaHidden,
                    u = void 0 !== c && c,
                    l = t.fillColor,
                    f = void 0 === l ? "#ffffff" : l;
                return {
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 ".concat(n, " ").concat(o),
                    "enable-background": "new 0 0 ".concat(n, " ").concat(o),
                    "aria-hidden": "".concat(!!u),
                    style: r({
                        fill: f,
                        height: "100%",
                        left: 0,
                        strokeWidth: 0,
                        top: 0,
                        width: "100%"
                    }, s)
                }
            }
        },
        2: (t, e, n) => {
            n.d(e, {
                Component: () => S,
                h: () => b,
                render: () => B
            });
            var i, r, o, a, s, c, u, l, f, p, h = {},
                d = [],
                v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
                y = Array.isArray;

            function g(t, e) {
                for (var n in e) t[n] = e[n];
                return t
            }

            function m(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }

            function b(t, e, n) {
                var r, o, a, s = {};
                for (a in e) "key" == a ? r = e[a] : "ref" == a ? o = e[a] : s[a] = e[a];
                if (arguments.length > 2 && (s.children = arguments.length > 3 ? i.call(arguments, 2) : n), "function" == typeof t && null != t.defaultProps)
                    for (a in t.defaultProps) void 0 === s[a] && (s[a] = t.defaultProps[a]);
                return _(t, s, r, o, null)
            }

            function _(t, e, n, i, a) {
                var s = {
                    type: t,
                    props: e,
                    key: n,
                    ref: i,
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
                return null == a && null != r.vnode && r.vnode(s), s
            }

            function w(t) {
                return t.children
            }

            function S(t, e) {
                this.props = t, this.context = e
            }

            function k(t, e) {
                if (null == e) return t.__ ? k(t.__, t.__i + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return "function" == typeof t.type ? k(t) : null
            }

            function T(t) {
                var e, n;
                if (null != (t = t.__) && null != t.__c) {
                    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
                        if (null != (n = t.__k[e]) && null != n.__e) {
                            t.__e = t.__c.base = n.__e;
                            break
                        }
                    return T(t)
                }
            }

            function O(t) {
                (!t.__d && (t.__d = !0) && a.push(t) && !x.__r++ || s !== r.debounceRendering) && ((s = r.debounceRendering) || c)(x)
            }

            function x() {
                var t, e, n, i, o, s, c, l;
                for (a.sort(u); t = a.shift();) t.__d && (e = a.length, i = void 0, s = (o = (n = t).__v).__e, c = [], l = [], n.__P && ((i = g({}, o)).__v = o.__v + 1, r.vnode && r.vnode(i), L(n.__P, i, o, n.__n, n.__P.namespaceURI, 32 & o.__u ? [s] : null, c, null == s ? k(o) : s, !!(32 & o.__u), l), i.__v = o.__v, i.__.__k[i.__i] = i, M(c, i, l), i.__e != s && T(i)), a.length > e && a.sort(u));
                x.__r = 0
            }

            function C(t, e, n, i, r, o, a, s, c, u, l) {
                var f, p, v, y, g, m = i && i.__k || d,
                    b = e.length;
                for (n.__d = c, P(n, e, m), c = n.__d, f = 0; f < b; f++) null != (v = n.__k[f]) && "boolean" != typeof v && "function" != typeof v && (p = -1 === v.__i ? h : m[v.__i] || h, v.__i = f, L(t, v, p, r, o, a, s, c, u, l), y = v.__e, v.ref && p.ref != v.ref && (p.ref && W(p.ref, null, v), l.push(v.ref, v.__c || y, v)), null == g && null != y && (g = y), 65536 & v.__u || p.__k === v.__k ? c = E(v, c, t) : "function" == typeof v.type && void 0 !== v.__d ? c = v.__d : y && (c = y.nextSibling), v.__d = void 0, v.__u &= -196609);
                n.__d = c, n.__e = g
            }

            function P(t, e, n) {
                var i, r, o, a, s, c = e.length,
                    u = n.length,
                    l = u,
                    f = 0;
                for (t.__k = [], i = 0; i < c; i++) a = i + f, null != (r = t.__k[i] = null == (r = e[i]) || "boolean" == typeof r || "function" == typeof r ? null : "string" == typeof r || "number" == typeof r || "bigint" == typeof r || r.constructor == String ? _(null, r, null, null, null) : y(r) ? _(w, {
                    children: r
                }, null, null, null) : void 0 === r.constructor && r.__b > 0 ? _(r.type, r.props, r.key, r.ref ? r.ref : null, r.__v) : r) ? (r.__ = t, r.__b = t.__b + 1, s = j(r, n, a, l), r.__i = s, o = null, -1 !== s && (l--, (o = n[s]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == s && f--, "function" != typeof r.type && (r.__u |= 65536)) : s !== a && (s == a - 1 ? f = s - a : s == a + 1 ? f++ : s > a ? l > c - a ? f += s - a : f-- : s < a && f++, s !== i + f && (r.__u |= 65536))) : (o = n[a]) && null == o.key && o.__e && !(131072 & o.__u) && (o.__e == t.__d && (t.__d = k(o)), F(o, o, !1), n[a] = null, l--);
                if (l)
                    for (i = 0; i < u; i++) null != (o = n[i]) && !(131072 & o.__u) && (o.__e == t.__d && (t.__d = k(o)), F(o, o))
            }

            function E(t, e, n) {
                var i, r;
                if ("function" == typeof t.type) {
                    for (i = t.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = t, e = E(i[r], e, n));
                    return e
                }
                t.__e != e && (e && t.type && !n.contains(e) && (e = k(t)), n.insertBefore(t.__e, e || null), e = t.__e);
                do {
                    e = e && e.nextSibling
                } while (null != e && 8 === e.nodeType);
                return e
            }

            function j(t, e, n, i) {
                var r = t.key,
                    o = t.type,
                    a = n - 1,
                    s = n + 1,
                    c = e[n];
                if (null === c || c && r == c.key && o === c.type && !(131072 & c.__u)) return n;
                if (i > (null == c || 131072 & c.__u ? 0 : 1))
                    for (; a >= 0 || s < e.length;) {
                        if (a >= 0) {
                            if ((c = e[a]) && !(131072 & c.__u) && r == c.key && o === c.type) return a;
                            a--
                        }
                        if (s < e.length) {
                            if ((c = e[s]) && !(131072 & c.__u) && r == c.key && o === c.type) return s;
                            s++
                        }
                    }
                return -1
            }

            function A(t, e, n) {
                "-" === e[0] ? t.setProperty(e, null == n ? "" : n) : t[e] = null == n ? "" : "number" != typeof n || v.test(e) ? n : n + "px"
            }

            function I(t, e, n, i, r) {
                var o;
                t: if ("style" === e)
                    if ("string" == typeof n) t.style.cssText = n;
                    else {
                        if ("string" == typeof i && (t.style.cssText = i = ""), i)
                            for (e in i) n && e in n || A(t.style, e, "");
                        if (n)
                            for (e in n) i && n[e] === i[e] || A(t.style, e, n[e])
                    }
                else if ("o" === e[0] && "n" === e[1]) o = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in t || "onFocusOut" === e || "onFocusIn" === e ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? i ? n.u = i.u : (n.u = l, t.addEventListener(e, o ? p : f, o)) : t.removeEventListener(e, o ? p : f, o);
                else {
                    if ("http://www.w3.org/2000/svg" == r) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
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
                        if (null == e.t) e.t = l++;
                        else if (e.t < n.u) return;
                        return n(r.event ? r.event(e) : e)
                    }
                }
            }

            function L(t, e, n, i, o, a, s, c, u, l) {
                var f, p, h, d, v, m, b, _, k, T, O, x, P, E, j, A, I = e.type;
                if (void 0 !== e.constructor) return null;
                128 & n.__u && (u = !!(32 & n.__u), a = [c = e.__e = n.__e]), (f = r.__b) && f(e);
                t: if ("function" == typeof I) try {
                    if (_ = e.props, k = "prototype" in I && I.prototype.render, T = (f = I.contextType) && i[f.__c], O = f ? T ? T.props.value : f.__ : i, n.__c ? b = (p = e.__c = n.__c).__ = p.__E : (k ? e.__c = p = new I(_, O) : (e.__c = p = new S(_, O), p.constructor = I, p.render = H), T && T.sub(p), p.props = _, p.state || (p.state = {}), p.context = O, p.__n = i, h = p.__d = !0, p.__h = [], p._sb = []), k && null == p.__s && (p.__s = p.state), k && null != I.getDerivedStateFromProps && (p.__s == p.state && (p.__s = g({}, p.__s)), g(p.__s, I.getDerivedStateFromProps(_, p.__s))), d = p.props, v = p.state, p.__v = e, h) k && null == I.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), k && null != p.componentDidMount && p.__h.push(p.componentDidMount);
                    else {
                        if (k && null == I.getDerivedStateFromProps && _ !== d && null != p.componentWillReceiveProps && p.componentWillReceiveProps(_, O), !p.__e && (null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(_, p.__s, O) || e.__v === n.__v)) {
                            for (e.__v !== n.__v && (p.props = _, p.state = p.__s, p.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach((function(t) {
                                    t && (t.__ = e)
                                })), x = 0; x < p._sb.length; x++) p.__h.push(p._sb[x]);
                            p._sb = [], p.__h.length && s.push(p);
                            break t
                        }
                        null != p.componentWillUpdate && p.componentWillUpdate(_, p.__s, O), k && null != p.componentDidUpdate && p.__h.push((function() {
                            p.componentDidUpdate(d, v, m)
                        }))
                    }
                    if (p.context = O, p.props = _, p.__P = t, p.__e = !1, P = r.__r, E = 0, k) {
                        for (p.state = p.__s, p.__d = !1, P && P(e), f = p.render(p.props, p.state, p.context), j = 0; j < p._sb.length; j++) p.__h.push(p._sb[j]);
                        p._sb = []
                    } else
                        do {
                            p.__d = !1, P && P(e), f = p.render(p.props, p.state, p.context), p.state = p.__s
                        } while (p.__d && ++E < 25);
                    p.state = p.__s, null != p.getChildContext && (i = g(g({}, i), p.getChildContext())), k && !h && null != p.getSnapshotBeforeUpdate && (m = p.getSnapshotBeforeUpdate(d, v)), C(t, y(A = null != f && f.type === w && null == f.key ? f.props.children : f) ? A : [A], e, n, i, o, a, s, c, u, l), p.base = e.__e, e.__u &= -161, p.__h.length && s.push(p), b && (p.__E = p.__ = null)
                } catch (t) {
                    if (e.__v = null, u || null != a) {
                        for (e.__u |= u ? 160 : 32; c && 8 === c.nodeType && c.nextSibling;) c = c.nextSibling;
                        a[a.indexOf(c)] = null, e.__e = c
                    } else e.__e = n.__e, e.__k = n.__k;
                    r.__e(t, e, n)
                } else null == a && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = R(n.__e, e, n, i, o, a, s, u, l);
                (f = r.diffed) && f(e)
            }

            function M(t, e, n) {
                e.__d = void 0;
                for (var i = 0; i < n.length; i++) W(n[i], n[++i], n[++i]);
                r.__c && r.__c(e, t), t.some((function(e) {
                    try {
                        t = e.__h, e.__h = [], t.some((function(t) {
                            t.call(e)
                        }))
                    } catch (t) {
                        r.__e(t, e.__v)
                    }
                }))
            }

            function R(t, e, n, r, o, a, s, c, u) {
                var l, f, p, d, v, g, b, _ = n.props,
                    w = e.props,
                    S = e.type;
                if ("svg" === S ? o = "http://www.w3.org/2000/svg" : "math" === S ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != a)
                    for (l = 0; l < a.length; l++)
                        if ((v = a[l]) && "setAttribute" in v == !!S && (S ? v.localName === S : 3 === v.nodeType)) {
                            t = v, a[l] = null;
                            break
                        }
                if (null == t) {
                    if (null === S) return document.createTextNode(w);
                    t = document.createElementNS(o, S, w.is && w), a = null, c = !1
                }
                if (null === S) _ === w || c && t.data === w || (t.data = w);
                else {
                    if (a = a && i.call(t.childNodes), _ = n.props || h, !c && null != a)
                        for (_ = {}, l = 0; l < t.attributes.length; l++) _[(v = t.attributes[l]).name] = v.value;
                    for (l in _)
                        if (v = _[l], "children" == l);
                        else if ("dangerouslySetInnerHTML" == l) p = v;
                    else if ("key" !== l && !(l in w)) {
                        if ("value" == l && "defaultValue" in w || "checked" == l && "defaultChecked" in w) continue;
                        I(t, l, null, v, o)
                    }
                    for (l in w) v = w[l], "children" == l ? d = v : "dangerouslySetInnerHTML" == l ? f = v : "value" == l ? g = v : "checked" == l ? b = v : "key" === l || c && "function" != typeof v || _[l] === v || I(t, l, v, _[l], o);
                    if (f) c || p && (f.__html === p.__html || f.__html === t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
                    else if (p && (t.innerHTML = ""), C(t, y(d) ? d : [d], e, n, r, "foreignObject" === S ? "http://www.w3.org/1999/xhtml" : o, a, s, a ? a[0] : n.__k && k(n, 0), c, u), null != a)
                        for (l = a.length; l--;) null != a[l] && m(a[l]);
                    c || (l = "value", void 0 !== g && (g !== t[l] || "progress" === S && !g || "option" === S && g !== _[l]) && I(t, l, g, _[l], o), l = "checked", void 0 !== b && b !== t[l] && I(t, l, b, _[l], o))
                }
                return t
            }

            function W(t, e, n) {
                try {
                    if ("function" == typeof t) {
                        var i = "function" == typeof t.__u;
                        i && t.__u(), i && null == e || (t.__u = t(e))
                    } else t.current = e
                } catch (t) {
                    r.__e(t, n)
                }
            }

            function F(t, e, n) {
                var i, o;
                if (r.unmount && r.unmount(t), (i = t.ref) && (i.current && i.current !== t.__e || W(i, null, e)), null != (i = t.__c)) {
                    if (i.componentWillUnmount) try {
                        i.componentWillUnmount()
                    } catch (t) {
                        r.__e(t, e)
                    }
                    i.base = i.__P = null
                }
                if (i = t.__k)
                    for (o = 0; o < i.length; o++) i[o] && F(i[o], e, n || "function" != typeof t.type);
                n || null == t.__e || m(t.__e), t.__c = t.__ = t.__e = t.__d = void 0
            }

            function H(t, e, n) {
                return this.constructor(t, n)
            }

            function B(t, e, n) {
                var o, a, s, c;
                r.__ && r.__(t, e), a = (o = "function" == typeof n) ? null : n && n.__k || e.__k, s = [], c = [], L(e, t = (!o && n || e).__k = b(w, null, [t]), a || h, h, e.namespaceURI, !o && n ? [n] : a ? null : e.firstChild ? i.call(e.childNodes) : null, s, !o && n ? n : a ? a.__e : e.firstChild, o, c), M(s, t, c)
            }
            i = d.slice, r = {
                __e: function(t, e, n, i) {
                    for (var r, o, a; e = e.__;)
                        if ((r = e.__c) && !r.__) try {
                            if ((o = r.constructor) && null != o.getDerivedStateFromError && (r.setState(o.getDerivedStateFromError(t)), a = r.__d), null != r.componentDidCatch && (r.componentDidCatch(t, i || {}), a = r.__d), a) return r.__E = r
                        } catch (e) {
                            t = e
                        }
                    throw t
                }
            }, o = 0, S.prototype.setState = function(t, e) {
                var n;
                n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = g({}, this.state), "function" == typeof t && (t = t(g({}, n), this.props)), t && g(n, t), null != t && this.__v && (e && this._sb.push(e), O(this))
            }, S.prototype.forceUpdate = function(t) {
                this.__v && (this.__e = !0, t && this.__h.push(t), O(this))
            }, S.prototype.render = w, a = [], c = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, u = function(t, e) {
                return t.__v.__b - e.__v.__b
            }, x.__r = 0, l = 0, f = D(!1), p = D(!0)
        },
        23: (t, e, n) => {
            n.d(e, {
                appHostname: () => i
            });
            var i = function() {
                return "".concat(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "app", ".").concat("wistia.com")
            }
        },
        64: (t, e, n) => {
            n.d(e, {
                default: () => l
            });
            n(3);
            var i = n(16),
                r = n(5);

            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, s(i.key), i)
                }
            }

            function a(t, e, n) {
                return (e = s(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function s(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var c = (0, n(11).cachedDetect)(),
                u = function() {
                    return t = function t(e) {
                        var n = this;
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), a(this, "onTouchStart", (function(t) {
                            n.rootWidth = (0, r.elemWidth)(n.rootElem), n.rootHeight = (0, r.elemHeight)(n.rootElem), n.rootOffset = (0, r.elemOffset)(n.rootElem), n.resetTouchContext(), t.touches[0] && (n.xDown = t.touches[0].clientX, n.yDown = t.touches[0].clientY), n.updatePinch(t), 2 == t.touches.length && n.touchesAreInsideRootElem() && t.preventDefault(), n.startedAt = Date.now(), (0, r.elemBind)(document, "touchmove", n.onTouchMoveDocument, {
                                passive: !1
                            }), (0, r.elemBind)(document, "touchend", n.onTouchEndDocument), (0, r.elemBind)(n.rootElem, "touchmove", n.onTouchMove, {
                                passive: !1
                            }), (0, r.elemBind)(n.rootElem, "touchend", n.onTouchEnd);
                            var e = n.getTouchContext(t);
                            n.trigger("touchstart", t, e), n.maybeTriggerMoreSpecificEvent(t, e)
                        })), a(this, "onTouchMove", (function(t) {
                            t._handledByTouchMove = !0;
                            var e = t.touches[0].clientX,
                                i = t.touches[0].clientY;
                            n.xDiff = n.xDown - e, n.yDiff = n.yDown - i, n.updatePinch(t), n.isPinch || (Math.sqrt(n.xDiff * n.xDiff + n.yDiff * n.yDiff) > 25 || Date.now() - n.startedAt > 300) && (n.isSwipe = !0);
                            var r = n.getTouchContext(t);
                            n.trigger("touchmove", t, r), n.maybeTriggerMoreSpecificEvent(t, r)
                        })), a(this, "onTouchMoveDocument", (function(t) {
                            t._handledByTouchMove || n.onTouchMove(t)
                        })), a(this, "onTouchEnd", (function(t) {
                            t._handledByTouchEnd = !0;
                            var e = n.getTouchContext(t);
                            n.trigger("touchend", t, e), n.maybeTriggerMoreSpecificEvent(t, e), setTimeout((function() {
                                n.resetTouchContext(), n.unbindTouchEndAndTouchMove()
                            }), 0)
                        })), a(this, "onTouchEndDocument", (function(t) {
                            t._handledByTouchEnd || n.onTouchEnd(t)
                        })), this.rootElem = e, this.xDown = this.yDown = null, this.xDiff = this.yDiff = 0, this.isSwipe = !1, this.isPinch = !1, this.startedAt = null, this.initialPinchDistance = null, this.touch1 = this.touch2 = null, this.pinchDistance = 0, this.pinchScale = 0, (0, r.elemBind)(e, "touchstart", this.onTouchStart, !!c.passiveSupported && {
                            passive: !1
                        })
                    }, e = [{
                        key: "updatePinch",
                        value: function(t) {
                            var e = this.rootOffset;
                            return 2 === t.touches.length ? (this.touch1 = {
                                left: t.touches[0].pageX - e.left,
                                top: t.touches[0].pageY - e.top
                            }, this.touch2 = {
                                left: t.touches[1].pageX - e.left,
                                top: t.touches[1].pageY - e.top
                            }, this.pinchDistance = Math.sqrt(Math.pow(this.touch1.left - this.touch2.left, 2), Math.pow(this.touch1.top - this.touch2.top, 2)), null == this.initialPinchDistance && (this.initialPinchDistance = this.pinchDistance), this.pinchScale = this.pinchDistance / this.initialPinchDistance, this.pinchDelta = this.pinchDistance - this.initialPinchDistance, this.isPinch = !0, this.pinchScale) : 0
                        }
                    }, {
                        key: "getTouchContext",
                        value: function(t) {
                            var e = this.rootOffset,
                                n = Date.now() - this.startedAt,
                                i = Object(t.touches[0]);
                            return {
                                xOffset: i.pageX - e.left,
                                yOffset: i.pageY - e.top,
                                xDelta: this.xDiff,
                                yDelta: this.yDiff,
                                absXDelta: Math.abs(this.xDiff),
                                absYDelta: Math.abs(this.yDiff),
                                delta: Math.sqrt(this.xDiff * this.xDiff + this.yDiff * this.yDiff),
                                startedAt: this.startedAt,
                                isSwipe: !this.isPinch && this.isSwipe,
                                isTap: n < 1e3 && !this.isPinch && !this.isSwipe,
                                isLongPress: n >= 1e3 && !this.isPinch && !this.isSwipe,
                                isPinch: this.isPinch,
                                timeDelta: n,
                                pinchScale: this.pinchScale,
                                pinchDistance: this.pinchDistance
                            }
                        }
                    }, {
                        key: "touchIsInsideRootElem",
                        value: function(t) {
                            return t.left >= 0 && t.left < this.rootWidth && t.top >= 0 && t.top < this.rootHeight
                        }
                    }, {
                        key: "touchesAreInsideRootElem",
                        value: function() {
                            return this.touchIsInsideRootElem(this.touch1) && this.touchIsInsideRootElem(this.touch2)
                        }
                    }, {
                        key: "resetTouchContext",
                        value: function() {
                            this.xDown = this.yDown = null, this.xDiff = this.yDiff = 0, this.isSwipe = !1, this.isPinch = !1, this.startedAt = null, this.pinchDelta = 0, this.pinchDistance = 0, this.initialPinchDistance = null, this.touch1 = this.touch2 = null
                        }
                    }, {
                        key: "maybeTriggerMoreSpecificEvent",
                        value: function(t, e) {
                            e.isLongPress ? this.trigger("longpress", t, e) : e.isTap ? this.trigger("tap", t, e) : e.isSwipe ? this.trigger("swipe", t, e) : e.isPinch && this.trigger("pinch", t, e)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            (0, r.elemUnbind)(this.rootElem, "touchstart", this.onTouchStart), this.unbindTouchEndAndTouchMove(), this.rootElem = null
                        }
                    }, {
                        key: "unbindTouchEndAndTouchMove",
                        value: function() {
                            (0, r.elemUnbind)(document, "touchmove", this.onTouchMoveDocument), (0, r.elemUnbind)(document, "touchend", this.onTouchEndDocument), (0, r.elemUnbind)(this.rootElem, "touchmove", this.onTouchMove), (0, r.elemUnbind)(this.rootElem, "touchend", this.onTouchEnd)
                        }
                    }], e && o(t.prototype, e), n && o(t, n), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), t;
                    var t, e, n
                }();
            (0, i.bindify)(u.prototype);
            const l = u
        },
        428: (t, e, n) => {
            n.d(e, {
                captionsPromises: () => o,
                fetchCaptions: () => u,
                getCaptionsForLanguage: () => f,
                getPreferredCaptionsIndex: () => c,
                shouldShowNativeCaptions: () => l
            });
            n(22);
            var i = n(21),
                r = n(13),
                o = {},
                a = Array.from(new Set((navigator.languages || [navigator.language]).concat(["en"]))),
                s = function(t) {
                    return t.split("-")[0]
                },
                c = function(t) {
                    var e = -1,
                        n = a;
                    return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).language && t.captions.length > 0 && t.preferred_languages.some((function(n) {
                        return (e = t.captions.findIndex((function(t) {
                            var e = t.alpha3_bibliographic || t.language,
                                i = t.alpha3_terminologic || "";
                            return e === n || "" !== i && i === n
                        }))) >= 0
                    })), -1 === e && n.some((function(n) {
                        return (e = t.captions.findIndex((function(t) {
                            return t.iso639_2_language_code === n
                        }))) >= 0
                    })), -1 === e && n.some((function(n) {
                        var i = s(n);
                        return (e = t.captions.findIndex((function(t) {
                            return s(t.iso639_2_language_code) === i
                        }))) >= 0
                    })), e
                },
                u = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = t.hashedId(),
                        a = e.language ? "-".concat(e.language) : "",
                        s = "".concat(n).concat(a);
                    return o[s] ? o[s] : o[s] = new Promise((function(o) {
                        var a = "".concat((0, i.eV1Protocol)(), "//").concat((0, i.mediaDataHost)(t._opts)),
                            s = new window.URL("".concat(a, "/embed/captions/").concat(n, ".json"));
                        e.language && s.searchParams.append("language", e.language), r.wlog.info(s, e), fetch(s).then((function(t) {
                            return t.json()
                        })).then((function(t) {
                            ! function(t) {
                                var e = c(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
                                if (e > 0) {
                                    var n = e >= 0 ? t.captions[e] : t.captions[0];
                                    t.captions.splice(e, 1), t.captions.unshift(n), t.preferred_languages = [n.language]
                                }
                            }(t, e), o(t)
                        }))
                    }))
                },
                l = function(t) {
                    return t._inNativeMode() || t._impl.behaviors.fullscreen && t._impl.behaviors.fullscreen.inNativeFullscreen()
                },
                f = function(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        if (i.language === t) return i
                    }
                    return null
                }
        },
        167: (t, e, n) => {
            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, r(i.key), i)
                }
            }

            function r(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
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
                default: () => c
            });
            var s = new WeakMap;
            const c = function() {
                return t = function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), o(this, s, void 0), this.video = e, this.embedElement = e.container, this.unbinds = [], this.eventListeners = new Map, this.reactMounts = {}, this.isWistiaPlayer = "WISTIA-PLAYER" === this.embedElement.tagName, this.impl = e, this.api = this.isWistiaPlayer ? this.embedElement : e.publicApi
                }, (e = [{
                    key: "mount",
                    value: function(t) {
                        this.rootElem = t
                    }
                }, {
                    key: "disabledButton",
                    get: function() {
                        return e = this, (t = s).get(a(t, e));
                        var t, e
                    },
                    set: function(t) {
                        var e, n, i;
                        n = this, i = t, (e = s).set(a(e, n), i)
                    }
                }]) && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t;
                var t, e, n
            }()
        },
        422: (t, e, n) => {
            var i = n(2),
                r = n(11),
                o = n(45),
                a = n(167),
                s = n(423),
                c = n(424),
                u = n(425),
                l = n(66),
                f = n(68),
                p = n(44),
                h = n(428),
                d = n(43);

            function v() {
                return v = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, v.apply(null, arguments)
            }

            function y(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, w(i.key), i)
                }
            }

            function g(t, e, n) {
                return e = b(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, m() ? Reflect.construct(e, n || [], b(t).constructor) : e.apply(t, n))
            }

            function m() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (m = function() {
                    return !!t
                })()
            }

            function b(t) {
                return b = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, b(t)
            }

            function _(t, e) {
                return _ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, _(t, e)
            }

            function w(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var S = (0, r.cachedDetect)();
            (0, p.defineTranslations)("en-US", {
                CAPTIONS_HIDE_MENU: "Hide captions menu",
                CAPTIONS_OFF: "Off",
                CAPTIONS_SHOW_MENU: "Show captions menu"
            });
            var k = "_off_",
                T = function(t) {
                    function e(t) {
                        var n, i, r, o;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), n = g(this, e, [t]), i = n, o = function() {
                            n.video.whenControlMounted("transcript").then((function(t) {
                                t._isVisible ? t.close() : t.open()
                            }))
                        }, (r = w(r = "toggleTranscript")) in i ? Object.defineProperty(i, r, {
                            value: o,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : i[r] = o, n.video = t, n.options = t.plugin.captions.options, n.selectedLanguage = n.options.language || k, n.unbinds = [], n
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
                        }), e && _(t, e)
                    }(e, t), n = e, (r = [{
                        key: "destroy",
                        value: function() {
                            (0, l.destroyControl)(this)
                        }
                    }, {
                        key: "mountButton",
                        value: function(t) {
                            var e = this;
                            this.buttonRoot = t, this.renderButton(), this.options.onByDefault && this.fetchCaptions().then((function() {
                                if (!e._destroyed) {
                                    var t = e.getPreferredCaptions();
                                    t && e.setSelectedLanguage(t.language)
                                }
                            }))
                        }
                    }, {
                        key: "mountDialog",
                        value: function(t) {
                            var e = this;
                            this.dialogRoot = t;
                            var n = Promise.all([(0, o.dynamicImport)("assets/external/interFontFace.js"), this.fetchCaptions()]).then((function() {
                                e.renderDialog()
                            }));
                            return this.loading(new Promise((function(t) {
                                n.then(t)
                            }))), n
                        }
                    }, {
                        key: "renderButton",
                        value: function() {
                            this.video._inNativeMode() || this.buttonRoot && (this.updateButtonLabel(), this.video.hasNewRoundedIcons ? (0, i.render)((0, i.h)(c.RoundedAudioDescriptionButton, null), this.buttonRoot) : (0, i.render)((0, i.h)(s.default, null), this.buttonRoot), this.reactMounts.button = [this.buttonRoot])
                        }
                    }, {
                        key: "controlDialogOpened",
                        value: function() {
                            this.updateButtonLabel()
                        }
                    }, {
                        key: "controlDialogClosed",
                        value: function() {
                            this.updateButtonLabel()
                        }
                    }, {
                        key: "updateButtonLabel",
                        value: function() {
                            this.dialog && (this.dialog.isOpen() ? this.setButtonLabel(this.translate("HIDE_MENU")) : this.setButtonLabel(this.translate("SHOW_MENU")))
                        }
                    }, {
                        key: "renderDialog",
                        value: function() {
                            this.captionsResp && this.dialogRoot && ((0, i.render)((0, i.h)(u.CaptionsMenu, v({}, this.props, {
                                items: this.menuItems(),
                                scale: this.props.scale,
                                isPlaybarEnabled: this.video.isControlEnabled("playbar"),
                                isTranscriptEnabled: this.isTranscriptEnabled(),
                                toggleTranscript: this.toggleTranscript
                            })), this.dialogRoot), this.reactMounts.menu = [this.dialogRoot])
                        }
                    }, {
                        key: "onControlPropsUpdated",
                        value: function(t) {
                            this.dialog && this.dialog.isOpen() && this.renderDialog(), t.playerLanguage && this.props.playerLanguage.code !== t.playerLanguage.code && this.updateButtonLabel()
                        }
                    }, {
                        key: "translate",
                        value: function(t) {
                            return (0, p.getTranslation)(this.props.playerLanguage.code, "CAPTIONS_".concat(t))
                        }
                    }, {
                        key: "isTranscriptEnabled",
                        value: function() {
                            return !1 !== this.options.transcript
                        }
                    }, {
                        key: "tearDownDialogIfClickedRecently",
                        value: function() {
                            var t = this;
                            (0, d.isMouseDownRecently)() && setTimeout((function() {
                                t.dialog.close(), t.buttonRoot.parentElement.focus()
                            }), 300)
                        }
                    }, {
                        key: "menuItems",
                        value: function() {
                            var t = this;
                            return [{
                                text: this.translate("OFF"),
                                isSelected: this.selectedLanguage === k,
                                onClick: function() {
                                    t.isTranscriptEnabled() && t.video.whenControlMounted("transcript").then((function(t) {
                                        return t.close()
                                    })), t.turnOff(), t.tearDownDialogIfClickedRecently()
                                }
                            }].concat(this.captionsResp.captions.map((function(e) {
                                return {
                                    text: e.native_name,
                                    isSelected: t.selectedLanguage === e.language,
                                    onClick: function() {
                                        t.setSelectedLanguage(e.language), t.tearDownDialogIfClickedRecently()
                                    }
                                }
                            })).sort((function(e, n) {
                                return e.text === t.translate("OFF") ? -1 : n.text === t.translate("OFF") ? 1 : e.text.localeCompare(n.text)
                            })))
                        }
                    }, {
                        key: "getCaptions",
                        value: function() {
                            return this.captionsResp && this.captionsResp.captions ? this.captionsResp.captions : []
                        }
                    }, {
                        key: "getPreferredCaptions",
                        value: function() {
                            for (var t = this.captionsResp.preferred_languages, e = 0; e < t.length; e++) {
                                var n = t[e],
                                    i = (0, h.getCaptionsForLanguage)(n, this.captionsResp.captions);
                                if (i) return i
                            }
                            return null
                        }
                    }, {
                        key: "turnOff",
                        value: function() {
                            this.setSelectedLanguage(k)
                        }
                    }, {
                        key: "setSelectedLanguage",
                        value: function(t) {
                            var e = this.selectedLanguage;
                            this.selectedLanguage = t, this.renderDialog(), this.video.controls.captions.setLanguage(t), this.logSelectionInStats(), e !== t && (this.video.embedElement.dispatchEvent(new CustomEvent("captions-change", {
                                detail: {
                                    isVisible: t !== k,
                                    language: t
                                }
                            })), this.video.trigger("captionschange", {
                                visible: t !== k,
                                language: t
                            }))
                        }
                    }, {
                        key: "logSelectionInStats",
                        value: function() {
                            if (this.captionsResp) {
                                var t = (0, h.getCaptionsForLanguage)(this.selectedLanguage, this.captionsResp.captions);
                                t && "_preview_" !== t.language ? (this._lastStatsData = {
                                    caption_key: t.key,
                                    language: t.language,
                                    time: this.video.time(),
                                    enabled: t.language !== k
                                }, this.video._tracker.logCaptionSelection(this._lastStatsData)) : this._lastStatsData && (this._lastStatsData.enabled = !1, this._lastStatsData.time = this.video.time(), this.video._tracker.logCaptionSelection(this._lastStatsData))
                            }
                        }
                    }, {
                        key: "fetchCaptions",
                        value: function() {
                            var t = this;
                            return this._destroyed ? new Promise((function() {})) : (0, h.fetchCaptions)(this.video, this.options).then((function(e) {
                                return t.captionsResp = e, e
                            }))
                        }
                    }, {
                        key: "matchMenuToSelectedTextTrack",
                        value: function() {
                            if (!S.edge || this.video._inNativeMode()) {
                                var t = this.video.getMediaElement(),
                                    e = this.selectedLanguage;
                                this.selectedLanguage = k;
                                for (var n = 0; n < t.textTracks.length; n++) {
                                    var i = t.textTracks[n];
                                    "showing" === i.mode && "captions" === i.kind && (this.selectedLanguage = i.language)
                                }
                                this.renderDialog(), this.video.controls.captions.setLanguage(this.selectedLanguage, {
                                    track: !1
                                }), e !== this.selectedLanguage && this.logSelectionInStats()
                            }
                        }
                    }]) && y(n.prototype, r), a && y(n, a), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, r, a
                }(a.default);
            T.handle = "captionsButton", T.type = "control-bar-right", T.sortValue = 50, T.shouldMount = function(t) {
                return t.plugin.captions
            }, (0, f.defineControl)(T)
        },
        429: (t, e, n) => {
            var i = n(174),
                r = n(21),
                o = n(22),
                a = n(24),
                s = n(2),
                c = n(5),
                u = n(11),
                l = n(68),
                f = n(45),
                p = n(428),
                h = n(66),
                d = n(430),
                v = n(167);

            function y() {
                return y = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)({}).hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }, y.apply(null, arguments)
            }

            function g(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, S(i.key), i)
                }
            }

            function m(t, e, n) {
                return e = _(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, b() ? Reflect.construct(e, n || [], _(t).constructor) : e.apply(t, n))
            }

            function b() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (b = function() {
                    return !!t
                })()
            }

            function _(t) {
                return _ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, _(t)
            }

            function w(t, e) {
                return w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, w(t, e)
            }

            function S(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var k = (0, u.cachedDetect)(),
                T = "_off_",
                O = function(t) {
                    function e(t) {
                        var n, i, r, o;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), n = m(this, e, [t]), i = n, o = function(t) {
                            if (n.captions && n.captions.language !== T) {
                                var e, i, r = n.captions.hash.lines.filter((function(e) {
                                        return e.start <= t && t < e.end
                                    })),
                                    o = r[0];
                                if (null !== (e = n.video.controls.extendedAudioDescriptionButton) && void 0 !== e && e.isEnabled() && null !== (i = n.video.controls.extendedAudioDescriptionButton) && void 0 !== i && i.isAudioPlaying()) {
                                    var a = r.find((function(t) {
                                        return t.extendedAudioDescription
                                    }));
                                    a && (o = a)
                                } else o = r.find((function(t) {
                                    return !t.extendedAudioDescription
                                }));
                                if (o) return n.setActiveLine(o.text, n.captions.right_to_left), void n.renderCaptions()
                            }
                            n.setNoActiveLine(), n.renderCaptions()
                        }, (r = S(r = "setActiveLineForTime")) in i ? Object.defineProperty(i, r, {
                            value: o,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : i[r] = o, (0, f.dynamicImport)("assets/external/interFontFace.js"), n.options = t.plugin.captions.options, n._wistiaCaptionsId = (0, a.seqId)("wistia_", "_captions"), n._userScale = n.options.subtitlesScale || 1, n.unbinds = [t.on("timechange", n.setActiveLineForTime), t.on("extendedaudiodescriptionplay", (function() {
                            n.setActiveLineForTime(n.video.time())
                        })), t.on("extendedaudiodescriptionstop", (function() {
                            n.setActiveLineForTime(n.video.time())
                        })), t.on("enterfullscreen", (function() {
                            n.hideOrShowNativeCaptions()
                        })), t.on("cancelfullscreen", (function() {
                            n.hideOrShowNativeCaptions()
                        })), t.on("beforereplace", (function() {
                            n.removeTextTracks()
                        })), t.on("extendedaudiodescriptionchange", (function() {
                            var t, e;
                            n.resetTextTracks(), null === (t = (e = n.video._impl.engine).loadSource) || void 0 === t || t.call(e), n.setActiveLineForTime(n.video.time()), n.renderCaptions()
                        }))], n
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
                        }), e && w(t, e)
                    }(e, t), n = e, u = [{
                        key: "destroy",
                        value: function() {
                            (0, c.elemRemove)(this.clippedCueStyle), this.clippedCueStyle = null, this.removeTextTracks(), (0, h.destroyControl)(this)
                        }
                    }, {
                        key: "mount",
                        value: function(t) {
                            var e = this;
                            this.rootElem = t, this.fetchCaptions().then((function() {
                                e._destroyed || (e.setupTextTracks(), e.setActiveLineForTime(e.video.time()), e.renderCaptions())
                            }))
                        }
                    }, {
                        key: "getSelectedCaptions",
                        value: function() {
                            return this.captions
                        }
                    }, {
                        key: "fetchCaptions",
                        value: function() {
                            var t = this;
                            return this._destroyed ? new Promise((function() {})) : (0, p.fetchCaptions)(this.video, this.options).then((function(e) {
                                return t.captionsResp = e, e
                            }))
                        }
                    }, {
                        key: "resetTextTracks",
                        value: function() {
                            this.removeTextTracks(), this._setupTextTracksPromise = null, this.setupTextTracks()
                        }
                    }, {
                        key: "setupTextTracks",
                        value: function() {
                            var t = this;
                            if (this._setupTextTracksPromise) return this._setupTextTracksPromise;
                            if (k.edge && !this.video._inNativeMode()) return this._setupTextTracksPromise = new Promise((function() {}));
                            var e = this.video;
                            return this._setupTextTracksPromise = new Promise((function(n) {
                                t.fetchCaptions();
                                var i = function() {
                                    t.fetchCaptions().then((function(i) {
                                        t.removeTextTracks(), e.whenVideoElementInDom().then((function(a) {
                                            if (!t._destroyed) {
                                                if (e.engine) {
                                                    var s = i.captions.map((function(n) {
                                                        n._wistiaCaptionsId = t._wistiaCaptionsId;
                                                        var i = "".concat((0, o.proto)(), "//").concat((0, r.cdnFastWistiaNetHost)(), "/embed/captions/").concat(e.hashedId(), ".vtt?language=").concat(n.language);
                                                        return n.src = i, n
                                                    })).filter((function(t) {
                                                        return "_preview_" !== t.language
                                                    }));
                                                    e.engine.addTextTracks(s)
                                                }
                                                t.hideOrShowNativeCaptions(), t.unbinds.push((0, c.elemBind)(a.textTracks, "change", (function() {
                                                    (0, p.shouldShowNativeCaptions)(e) && e.controls.captionsButton && e.controls.captionsButton.matchMenuToSelectedTextTrack()
                                                }))), n()
                                            }
                                        }))
                                    }))
                                };
                                "beforeplay" === e.state() && (k.safari || k.ios.version) ? e.bind("play", (function() {
                                    return i(), e.unbind
                                })) : i()
                            }))
                        }
                    }, {
                        key: "removeTextTracks",
                        value: function() {
                            this.video.engine && this.video.engine.removeTextTracks(this._wistiaCaptionsId)
                        }
                    }, {
                        key: "renderCaptions",
                        value: function() {
                            this.video._inNativeMode() || (this.activeLine && !this._captionsHidden ? (0, s.render)((0, s.h)(d.default, y({}, this.props, this.activeLine, {
                                scale: this.scale(),
                                isInFullscreen: this.video.inFullscreen(),
                                isPlaybarEnabled: this.video.isControlEnabled("playbar"),
                                isTranscriptEnabled: this.isTranscriptEnabled()
                            })), this.rootElem) : (0, s.render)((0, s.h)("nothing", null), this.rootElem), this.reactMounts.captions = [this.rootElem])
                        }
                    }, {
                        key: "isTranscriptEnabled",
                        value: function() {
                            return !1 !== this.options.transcript
                        }
                    }, {
                        key: "onControlPropsUpdated",
                        value: function(t) {
                            t.videoWidth === this.props.videoWidth && t.controlsAreVisible === this.props.controlsAreVisible && t.controlBarHeight === this.props.controlBarHeight && t.captionsBackgroundColor === this.props.captionsBackgroundColor && t.captionsTextSize === this.props.captionsTextSize && t.captionsFontFamily === this.props.captionsFontFamily && t.captionsBorderRadius === this.props.captionsBorderRadius || this.renderCaptions()
                        }
                    }, {
                        key: "setActiveLine",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            this.activeLine = {
                                text: t,
                                rtl: e
                            }
                        }
                    }, {
                        key: "setNoActiveLine",
                        value: function() {
                            this.activeLine = null
                        }
                    }, {
                        key: "setLanguage",
                        value: function(t) {
                            var e = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            this.fetchCaptions().then((function() {
                                var i = (0, p.getCaptionsForLanguage)(t, e.captionsResp.captions);
                                e.captions = i, e.setActiveLineForTime(e.video.time()), e.renderCaptions(), !1 !== n.track && e.showCorrespondingTrack(i), e.video.trigger("captionslanguagechange", t)
                            }))
                        }
                    }, {
                        key: "turnOff",
                        value: function() {
                            this.setLanguage(T)
                        }
                    }, {
                        key: "showCorrespondingTrack",
                        value: function(t) {
                            var e = this;
                            k.edge && !this.video._inNativeMode() || this.setupTextTracks().then((function() {
                                for (var n = e.video.getMediaElement(), i = 0; i < n.textTracks.length; i++) {
                                    var r = n.textTracks[i];
                                    "captions" === r.kind && (t && r.language === t.language ? r.mode = "showing" : r.mode = "disabled")
                                }
                            }))
                        }
                    }, {
                        key: "hideOrShowNativeCaptions",
                        value: function() {
                            (0, p.shouldShowNativeCaptions)(this.video) ? this.allowShowingNativeCaptions(): this.disallowShowingNativeCaptions()
                        }
                    }, {
                        key: "allowShowingNativeCaptions",
                        value: function() {
                            this.clippedCueStyle && ((0, c.elemRemove)(this.clippedCueStyle), this.clippedCueStyle = null), this.hideCustomCaptions()
                        }
                    }, {
                        key: "disallowShowingNativeCaptions",
                        value: function() {
                            if (this.clippedCueStyle) return this.clippedCueStyle;
                            var t = "WISTIA-PLAYER" === this.embedElement.tagName ? this.embedElement.shadowRoot : document.head;
                            this.clippedCueStyle = (0, c.addInlineCss)(t, "\n      #".concat(this.video.chrome.id, " ::cue {\n        visibility: hidden;\n      }\n      #").concat(this.video.chrome.id, " ::-webkit-media-text-track-container {\n        visibility: hidden;\n      }\n      #").concat(this.video.chrome.id, " ::-webkit-media-text-track-background {\n        visibility: hidden;\n      }\n      #").concat(this.video.chrome.id, " ::-webkit-media-text-track-display {\n        visibility: hidden;\n      }\n    ")), this.showCustomCaptions()
                        }
                    }, {
                        key: "hideCustomCaptions",
                        value: function() {
                            this._captionsHidden = !0, this.renderCaptions()
                        }
                    }, {
                        key: "showCustomCaptions",
                        value: function() {
                            this._captionsHidden = !1, this.renderCaptions()
                        }
                    }, {
                        key: "setUserScale",
                        value: function(t) {
                            this._userScale = t, this.renderCaptions()
                        }
                    }, {
                        key: "getUserScale",
                        value: function() {
                            return this._userScale
                        }
                    }, {
                        key: "scale",
                        value: function() {
                            return this._userScale * Math.min(2, Math.max(.6, (0, i.controlMultiplierBasedOnVideo)(this.video, [640, 850])))
                        }
                    }], u && g(n.prototype, u), l && g(n, l), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), n;
                    var n, u, l
                }(v.default);
            O.handle = "captions", O.type = "above-control-bar", O.shouldMount = function(t) {
                return t.plugin.captions
            }, (0, l.defineControl)(O)
        },
        431: (t, e, n) => {
            var i = n(3),
                r = n(2),
                o = n(5),
                a = n(45),
                s = n(68),
                c = n(167),
                u = n(432),
                l = n(428),
                f = n(66);

            function p(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(t);
                    e && (i = i.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, i)
                }
                return n
            }

            function h(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? p(Object(n), !0).forEach((function(e) {
                        b(t, e, n[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }))
                }
                return t
            }

            function d(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, _(i.key), i)
                }
            }

            function v(t, e, n) {
                return e = g(e),
                    function(t, e) {
                        if (e && ("object" == typeof e || "function" == typeof e)) return e;
                        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t)
                    }(t, y() ? Reflect.construct(e, n || [], g(t).constructor) : e.apply(t, n))
            }

            function y() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (t) {}
                return (y = function() {
                    return !!t
                })()
            }

            function g(t) {
                return g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, g(t)
            }

            function m(t, e) {
                return m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, m(t, e)
            }

            function b(t, e, n) {
                return (e = _(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function _(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            var w = function(t) {
                function e(t) {
                    var n;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), b(n = v(this, e, [t]), "close", (function() {
                        n._isVisible = !1, n.animateOut().then((function() {
                            n.video.controls.captions.showCustomCaptions(), (0, r.render)((0, r.h)("nothing", null), n.rootElem), n.reactMounts = [n.rootElem]
                        }))
                    })), b(n, "seekTranscript", (function(t) {
                        n.video.time(t)
                    })), b(n, "metricsVideoCount", (function(t) {
                        i.Wistia.Metrics.videoCount(n.video._impl, "player/".concat(t))
                    })), b(n, "onClickCloseTranscript", (function() {
                        n.close(), n.video.controls.captionsButton.buttonElement.focus()
                    })), b(n, "onSearchHitCounterChange", (function(t) {
                        var e = t.activeHitIndex,
                            i = t.totalHits;
                        n.video.behaviors.ui.setAriaLiveText("".concat(e, " of ").concat(i, " results."))
                    })), n.video = t, n.options = t.plugin.captions.options, n._isVisible = !1, n._turnstileClosed = !1, n.unbinds = [], n.unbinds.push(n.video.on("captionschange", (function(t) {
                        n.setSelectedLanguage(t)
                    })), n.video.on("timechange", (function() {
                        n._isVisible && n.renderTranscript()
                    })), n.video.on("turnstileclose", (function() {
                        n._turnstileClosed = !0, n._isVisible && n.renderTranscript()
                    })), n.video.on("extendedaudiodescriptionchange", (function() {
                        n._isVisible && n.rerenderTranscript()
                    }))), n
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
                    }), e && m(t, e)
                }(e, t), n = e, (s = [{
                    key: "destroy",
                    value: function() {
                        (0, f.destroyControl)(this)
                    }
                }, {
                    key: "mount",
                    value: function(t) {
                        var e = this;
                        this.fetchCaptions().then((function() {
                            var n = (0, o.elemFromObject)({
                                style: {
                                    position: "absolute"
                                },
                                class: "w-css-reset"
                            });
                            (0, o.elemAppend)(t, n), e.rootElem = n
                        }))
                    }
                }, {
                    key: "open",
                    value: function() {
                        "beforeplay" === this.video.state() && this.video.setControlEnabled("bigPlayButton", !1), this.video.controls.captions.hideCustomCaptions(), this._isVisible = !0, this.renderTranscript(), this.animateIn()
                    }
                }, {
                    key: "onControlPropsUpdated",
                    value: function(t) {
                        var e = this;
                        this._isVisible && (this.props.controlsAreVisible !== t.controlsAreVisible && this.fetchCaptions().then((function() {
                            e.renderTranscript()
                        })), this.props.videoWidth !== t.videoWidth && this.fetchCaptions().then((function() {
                            e.renderTranscript()
                        })), this.props.videoHeight !== t.videoHeight && this.fetchCaptions().then((function() {
                            e.renderTranscript()
                        })))
                    }
                }, {
                    key: "fetchCaptions",
                    value: function() {
                        var t = this;
                        return (0, l.fetchCaptions)(this.video, this.options).then((function(e) {
                            return t.captionsResp = e, e
                        }))
                    }
                }, {
                    key: "setSelectedLanguage",
                    value: function(t) {
                        this.selectedLanguage = t.language, this.rootElem && this._isVisible && ("_off_" === t.language ? this.close() : this.renderTranscript())
                    }
                }, {
                    key: "renderTranscript",
                    value: function() {
                        var t, e = this;
                        this.video.controls.captions.hideCustomCaptions();
                        var n, i = (0, l.getPreferredCaptionsIndex)(this.captionsResp, null === (t = this.video.embedOptions().plugin) || void 0 === t ? void 0 : t["captions-v1"]);
                        return i >= 0 && (n = this.captionsResp.captions[i].language), new Promise((function(t) {
                            (0, a.dynamicImport)("assets/external/interFontFace.js").then((function() {
                                (0, r.render)((0, r.h)(u.default, {
                                    closeTranscript: e.onClickCloseTranscript,
                                    controlBarHeight: e.props.controlBarHeight,
                                    controlsAreVisible: e.props.controlsAreVisible,
                                    preferredLanguage: n,
                                    playerLanguage: e.video.playerLanguage(),
                                    scale: e.props.scale,
                                    seekTranscript: e.seekTranscript,
                                    selectedLanguage: e.selectedLanguage || e.captionsResp.preferred_languages[0],
                                    srtCaptions: e.getSrtCaptions(),
                                    metricsVideoCount: e.metricsVideoCount,
                                    turnstileClosed: e._turnstileClosed,
                                    turnstileEmail: e.video.email(),
                                    turnstilePlugin: e.video.plugin["requireEmail-v1"],
                                    videoDuration: e.video.duration(),
                                    videoHeight: e.video.videoHeight(),
                                    videoTime: e.video.time(),
                                    videoWidth: e.video.videoWidth(),
                                    onSearchHitCounterChange: e.onSearchHitCounterChange
                                }), e.rootElem), e.reactMounts = [e.rootElem], t()
                            }))
                        }))
                    }
                }, {
                    key: "rerenderTranscript",
                    value: function() {
                        return (0, r.render)((0, r.h)("nothing", null), this.rootElem), this.renderTranscript()
                    }
                }, {
                    key: "getSrtCaptions",
                    value: function() {
                        var t;
                        return null !== (t = this.video.controls.extendedAudioDescriptionButton) && void 0 !== t && t.isEnabled() ? this.captionsResp.captions : (this.captionsWithoutExtendedAudioDescription || (this.captionsWithoutExtendedAudioDescription = {}, this.captionsWithoutExtendedAudioDescription.captions = this.captionsResp.captions.map((function(t) {
                            var e = t.hash.lines.filter((function(t) {
                                return !t.extendedAudioDescription
                            }));
                            return h(h({}, t), {}, {
                                hash: h(h({}, t.hash), {}, {
                                    lines: e
                                })
                            })
                        }))), this.captionsWithoutExtendedAudioDescription.captions)
                    }
                }, {
                    key: "animateIn",
                    value: function() {
                        var t = this;
                        return new Promise((function(e) {
                            (0, o.elemStyle)(t.rootElem, {
                                opacity: 0,
                                height: "100%",
                                width: "100%"
                            }), setTimeout((function() {
                                (0, o.elemAnimate)(t.rootElem, {
                                    opacity: 1
                                }, {
                                    time: 200,
                                    callback: e
                                })
                            }), 0)
                        }))
                    }
                }, {
                    key: "animateOut",
                    value: function() {
                        var t = this;
                        return new Promise((function(e) {
                            (0, o.elemStyle)(t.rootElem, {
                                opacity: 1
                            }), setTimeout((function() {
                                (0, o.elemAnimate)(t.rootElem, {
                                    opacity: 0
                                }, {
                                    time: 200,
                                    callback: function() {
                                        (0, o.elemStyle)(t.rootElem, {
                                            height: 0,
                                            width: 0
                                        }), e()
                                    }
                                })
                            }), 0)
                        }))
                    }
                }]) && d(n.prototype, s), c && d(n, c), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, s, c
            }(c.default);
            w.handle = "transcript", w.type = "above-control-bar", w.sortValue = 600, w.shouldMount = function(t) {
                var e = t.embedOptions().plugin && t.embedOptions().plugin["captions-v1"] && !1 === t.embedOptions().plugin["captions-v1"].transcript;
                return !e && (t.plugin.captions && t.plugin.captions.options && !e)
            }, (0, s.defineControl)(w)
        },
        437: (t, e, n) => {
            var i = n(3),
                r = n(6),
                o = n(13),
                a = n(428);

            function s(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var i, r, o, a, s = [],
                            c = !0,
                            u = !1;
                        try {
                            if (o = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                c = !1
                            } else
                                for (; !(c = (i = o.call(n)).done) && (s.push(i.value), s.length !== e); c = !0);
                        } catch (t) {
                            u = !0, r = t
                        } finally {
                            try {
                                if (!c && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (u) throw r
                            }
                        }
                        return s
                    }
                }(t, e) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return c(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(t, e) : void 0
                    }
                }(t, e) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function c(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }

            function u(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, l(i.key), i)
                }
            }

            function l(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
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

            function h() {
                return h = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
                    var i = function(t, e) {
                        for (; !{}.hasOwnProperty.call(t, e) && null !== (t = d(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(arguments.length < 3 ? t : n) : r.value
                    }
                }, h.apply(null, arguments)
            }

            function d(t) {
                return d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, d(t)
            }

            function v(t, e) {
                return v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, v(t, e)
            }
            var y = function(t) {
                function e(t, n) {
                    var i;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (i = f(this, e, [t, n])).video = t, i.options = n, i.captions = null;
                    var r = i.options.language ? {
                        language: i.options.language
                    } : {};
                    return i.fetched = (0, a.fetchCaptions)(t, r).then((function(t) {
                        i.captions = t.captions
                    })), i.isEnabled = !1 !== n.on, i.unbinds = [], i.unbinds.push(i.video.on("plugininitialized", (function(t) {
                        "captions" === t && (i.isEnabled ? (i.enable(), i.options.onByDefault ? i.turnOn() : !1 !== i.options.autoEnableForSilentAutoPlay && ("playing" === i.video.state() && i.video.inSilentPlaybackMode() && i.turnOn(), i.video.on("play", (function() {
                            return i.video.inSilentPlaybackMode() && i.turnOn(), i.video.unbind
                        })), i.video.on("silentplaybackmodechange", (function(t) {
                            return t && i.turnOn(), i.video.unbind
                        })))) : i.disable())
                    }))), i
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
                    }), e && v(t, e)
                }(e, t), n = e, i = [{
                    key: "customizePreview",
                    value: function(t) {
                        var e = this;
                        if (t.anyChanged(["plugin[captions]", "plugin[captions-v1]", "ephemeral[captions]"])) return new Promise((function(n) {
                            var i = t.currentValue("plugin[captions]") || t.currentValue("plugin[captions-v1]") || {
                                on: !1
                            };
                            t.changed("ephemeral[captions][captionsArray]") && e.clearCache(), e.allMountedAndFetched().then((function() {
                                e.video.requestControls("customizePreview-captions", 4e3);
                                var t = (0, r.getDeep)(e.video, "controls.captionsButton.dialog");
                                null == t || t.open(), setTimeout((function() {
                                    var t = (0, r.getDeep)(e.video, "controls.captionsButton.dialog");
                                    null == t || t.close()
                                }), 4e3), e.captions.length ? i.onByDefault ? e.turnOn() : e.turnOff() : (e.insertCaptions([{
                                    start: 0,
                                    end: 5,
                                    text: ["These captions are only an example."]
                                }, {
                                    start: 5,
                                    end: 10,
                                    text: ["When you get real captions,", "they'll be automatically enabled."]
                                }, {
                                    start: 10,
                                    end: 15,
                                    text: ["Go ahead: upload an SRT or VTT file,", "or order a transcript!"]
                                }]), e.turnOn()), n()
                            }))
                        }))
                    }
                }, {
                    key: "captionsOptionsChanged",
                    value: function(t) {
                        return t.some((function(t) {
                            return 0 === t.indexOf("plugin[captions-v1]") || 0 === t.indexOf("ephemeral[captions]")
                        }))
                    }
                }, {
                    key: "captionsArrayChanged",
                    value: function(t) {
                        return t.some((function(t) {
                            return 0 === t.indexOf("ephemeral[captions][captionsArray]")
                        }))
                    }
                }, {
                    key: "enable",
                    value: function() {
                        this.video.setControlEnabled("captions", !0), this.video.setControlEnabled("captionsButton", !0), this.video.addPlugin("captions-v1", {
                            legacy: !0
                        })
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this.video.setControlEnabled("captions", !1), this.video.setControlEnabled("captionsButton", !1), this.video.removePlugin("captions-v1")
                    }
                }, {
                    key: "allMountedAndFetched",
                    value: function() {
                        var t = [this.video.whenControlMounted("captionsButton"), this.video.whenControlMounted("captions")];
                        return Promise.all(t).then((function(t) {
                            var e = s(t, 2),
                                n = e[0],
                                i = e[1];
                            return Promise.all([n.fetchCaptions(), i.fetchCaptions()])
                        }))
                    }
                }, {
                    key: "turnOn",
                    value: function() {
                        var t = this;
                        this.allMountedAndFetched().then((function() {
                            var e = t.video.controls.captionsButton;
                            if (e) {
                                var n = e.getPreferredCaptions();
                                if (n) e.setSelectedLanguage(n.language);
                                else {
                                    var i = e.captionsResp.captions[0];
                                    i && e.setSelectedLanguage(i.language)
                                }
                            }
                        }))
                    }
                }, {
                    key: "remove",
                    value: function() {
                        var t, n, i, r, a;
                        this.unbinds.forEach((function(t) {
                            "function" == typeof t ? t() : o.wlog.warn("trying to unbind a non-function", t)
                        })), this.disable(), delete this.video.plugin.captions, delete this.video.plugin["captions-v1"], (t = e, n = "remove", i = this, a = h(d(1 & (r = 3) ? t.prototype : t), n, i), 2 & r ? function(t) {
                            return a.apply(i, t)
                        } : a)([])
                    }
                }, {
                    key: "turnOff",
                    value: function() {
                        this.video.controls.captionsButton.turnOff()
                    }
                }, {
                    key: "show",
                    value: function() {
                        this.video.setControlEnabled("captions", !0)
                    }
                }, {
                    key: "hide",
                    value: function() {
                        this.video.setControlEnabled("captions", !1)
                    }
                }, {
                    key: "setSubtitlesScale",
                    value: function(t) {
                        var e = this;
                        this.video.whenControlMounted("captions").then((function() {
                            e.video.controls.captions.setUserScale(t)
                        }))
                    }
                }, {
                    key: "getSubtitlesScale",
                    value: function() {
                        return this.video.controls.captions ? this.video.controls.captions.getUserScale() : 1
                    }
                }, {
                    key: "saveOriginalHash",
                    value: function(t) {
                        if (this.captions && (this.originalHashByLanguage || (this.originalHashByLanguage = {}), !this.originalHashByLanguage[t])) {
                            var e = this.captions.find((function(e) {
                                return e.language === t
                            }));
                            e && (this.originalHashByLanguage[t] = e.hash)
                        }
                    }
                }, {
                    key: "restoreOriginalHash",
                    value: function(t) {
                        var e;
                        if (this.captions) {
                            if (this.originalHashByLanguage || (this.originalHashByLanguage = {}), this.originalHashByLanguage[t]) {
                                var n = this.captions.find((function(e) {
                                    return e.language === t
                                }));
                                n && (n.hash = this.originalHashByLanguage[t]), delete this.originalHashByLanguage[t]
                            }
                            null === (e = this.video.controls.captions) || void 0 === e || e.setActiveLineForTime(this.video.time())
                        }
                    }
                }, {
                    key: "restoreOriginalCaptions",
                    value: function() {
                        var t = this;
                        Object.keys(this.originalHashByLanguage || {}).forEach((function(e) {
                            t.restoreOriginalHash(e)
                        }))
                    }
                }, {
                    key: "setCaptionsHash",
                    value: function(t, e) {
                        var n;
                        this.captions && (this.captions.forEach((function(n) {
                            n.language === t && (n.hash = e)
                        })), null === (n = this.video.controls.captions) || void 0 === n || n.setActiveLineForTime(this.video.time()))
                    }
                }, {
                    key: "refreshDataFromServer",
                    value: function() {
                        var t = this;
                        return new Promise((function(e) {
                            if (t.clearCache(), t.video.isControlEnabled("captions") || t.video.isControlEnabled("captionsButton")) {
                                t.video.setControlEnabled("captions", !1), t.video.setControlEnabled("captionsButton", !1);
                                var n = t.video.on("controldisabled", (function(i) {
                                    "captions" !== i && "captionsButton" !== i || (n(), t.video.setControlEnabled("captions", !0), t.video.setControlEnabled("captionsButton", !0), t.video.whenControlMounted("captions").then((function(n) {
                                        n.setActiveLineForTime(t.video.time()), e()
                                    })))
                                }))
                            }
                        }))
                    }
                }, {
                    key: "insertCaptions",
                    value: function(t) {
                        var e = {
                                english_name: "English",
                                hash: {
                                    lines: t
                                },
                                language: "_preview_",
                                native_name: "English",
                                right_to_left: !1
                            },
                            n = {
                                captions: [e],
                                preferred_languages: []
                            };
                        this.video.controls.captions.captionsResp = n, this.video.controls.captionsButton.captionsResp = n, this.video.controls.transcript.captionsResp = n, this.captions = [e], a.captionsPromises[this.video.hashedId()] = Promise.resolve(n)
                    }
                }, {
                    key: "clearCache",
                    value: function() {
                        var t = this;
                        this.captions = null, delete a.captionsPromises[this.video.hashedId()], this.fetched = (0, a.fetchCaptions)(this.video, this.options).then((function(e) {
                            t.captions = e.captions
                        }))
                    }
                }, {
                    key: "setLanguage",
                    value: function(t) {
                        this.video.controls.captionsButton.setSelectedLanguage(t)
                    }
                }], i && u(n.prototype, i), c && u(n, c), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, i, c
            }(i.Wistia.Plugin.Base);
            i.Wistia.plugin("captions", (function(t, e) {
                return new y(t, e)
            })), i.Wistia.plugin("captions-v1", (function(t, e) {
                return {
                    turnOn: function() {
                        t.plugin.captions.turnOn()
                    },
                    turnOff: function() {
                        t.plugin.captions.turnOff()
                    }
                }
            }))
        },
        66: (t, e, n) => {
            n.d(e, {
                destroyControl: () => s
            });
            n(7);
            var i = n(11),
                r = (n(67), n(5)),
                o = n(2),
                a = (n(24), n(68), function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                }),
                s = ((0, i.cachedDetect)(), function(t) {
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
                        }(t), c(t), l(t), f(t)
                }),
                c = function(t) {
                    t.rootElem && (0, r.elemRemove)(Array.prototype.slice.call(t.rootElem.childNodes))
                },
                u = function(t) {
                    var e = t[0],
                        n = t[1];
                    e && n && (0, o.render)((0, o.h)("nothing", null), e)
                },
                l = function(t) {
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
                defineControl: () => o,
                getControlDefinitions: () => a
            });
            var i = n(3),
                r = n(31);
            null == i.Wistia._controlDefinitions && (i.Wistia._controlDefinitions = {});
            var o = function(t) {
                    null != t.handle ? null == i.Wistia._controlDefinitions[t.handle] && (i.Wistia._controlDefinitions[t.handle] = t, i.Wistia.trigger && i.Wistia.trigger("controldefined", t)) : console.error("Please specify a handle property for control", t)
                },
                a = function() {
                    return i.Wistia._controlDefinitions || {}
                };
            i.Wistia.defineControl = function(t) {
                (0, r.countMetric)("player/custom-control-definition", 1, {
                    name: t.handle,
                    location: location.origin + location.pathname
                }), o(t)
            }
        },
        44: (t, e, n) => {
            n.d(e, {
                defineTranslations: () => u,
                getTranslation: () => p
            });
            var i = n(3),
                r = n(6),
                o = (n(45), i.Wistia.languages = i.Wistia.languages || {}),
                a = i.Wistia.translations = i.Wistia.translations || {};
            i.Wistia._translationPromises || (i.Wistia._translationPromises = {});
            var s, c = function(t, e, n) {
                    o[t] = {
                        code: t,
                        text: f(e)
                    }, n && u(t, n)
                },
                u = function(t, e) {
                    if (null == o[t]) throw new Error("Must define a language with code ".concat(t, " before defining its translations."));
                    var n = a[t];
                    n ? (0, r.merge)(n, e) : a[t] = (0, r.clone)(e)
                },
                l = i.Wistia.cachedDecodings = i.Wistia.cachedDecodings || {},
                f = function(t) {
                    return s || (s = document.createElement("textarea")), null != l[t] ? l[t] : (s.innerHTML = t, l[t] = s.value, s.value)
                },
                p = function(t, e) {
                    var n;
                    return n = a[t] && a[t][e] ? a[t][e] : a["en-US"][e], f(function(t) {
                        return null == t ? "?" : t
                    }(n))
                };
            c("en-US", "English"), u("en-US", {
                PLAY: "Play",
                PLAY_BUTTON_LIVE_NOT_STARTED: "Livestream has not started",
                PLAY_BUTTON_TITLE_WHEN_NOT_PLAYING: "Play Video",
                PLAY_BUTTON_TITLE_WHEN_PLAYING: "Pause",
                REWATCH: "Rewatch",
                SKIP: "Skip"
            })
        },
        149: (t, e, n) => {
            function i(t) {
                return function(t) {
                    if (Array.isArray(t)) return r(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return r(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function r(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }

            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, a(i.key), i)
                }
            }

            function a(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            n.d(e, {
                Interpolation: () => s
            });
            var s = function() {
                return t = function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var e = arguments.length <= 0 ? void 0 : arguments[0],
                        n = e.seedRange,
                        i = e.seedFunction,
                        r = e.seedStart,
                        o = e.outputStart,
                        a = null != o ? o : 0,
                        s = e.outputEnd,
                        c = null != s ? s : 1,
                        u = e.easing,
                        l = null != u ? u : t.linear;
                    if (null == n) throw new Error("Must provide seedRange argument");
                    if (null != i && "function" != typeof i) throw new Error("Given seed is not a function");
                    if ("function" != typeof l) throw new Error("Invalid easing function given: ".concat(this.easing));
                    this._seedRange = n, this._seedFunction = i || function() {
                        return (new Date).getTime()
                    }, this._outputStart = a, this._outputEnd = c, this._easing = l, this._seedStart = (null == r ? void 0 : r()) || this.seed()
                }, n = [{
                    key: "linear",
                    value: function(t, e, n, i) {
                        return t * e / (n || 1) + i
                    }
                }, {
                    key: "easeInOut",
                    value: function(t, e, n, i) {
                        return (e /= (n || 1) / 2) < 1 ? t / 2 * e * e + i : -t / 2 * ((e -= 1) * (e - 2) - 1) + i
                    }
                }], (e = [{
                    key: "seed",
                    value: function() {
                        return this.seedFunction()()
                    }
                }, {
                    key: "seedStart",
                    value: function() {
                        return this._seedStart
                    }
                }, {
                    key: "seedRange",
                    value: function() {
                        return this._valOrFn(this._seedRange)
                    }
                }, {
                    key: "seedFunction",
                    value: function() {
                        return this._seedFunction
                    }
                }, {
                    key: "outputStart",
                    value: function() {
                        return this._valOrFn(this._outputStart)
                    }
                }, {
                    key: "outputEnd",
                    value: function() {
                        return this._valOrFn(this._outputEnd)
                    }
                }, {
                    key: "easing",
                    value: function() {
                        return this._valOrFn(this._easing)
                    }
                }, {
                    key: "value",
                    value: function() {
                        return this._easing.apply(this, i(Array.from(this.easingArgs() || [])))
                    }
                }, {
                    key: "atEnd",
                    value: function() {
                        return 1 === this.ratio()
                    }
                }, {
                    key: "atStart",
                    value: function() {
                        return 0 === this.ratio()
                    }
                }, {
                    key: "easingArgs",
                    value: function() {
                        return [this.c(), this.t(), this.d(), this.b()]
                    }
                }, {
                    key: "seedDelta",
                    value: function() {
                        return this.seedRange() > 0 ? Math.min(this.seedRange(), this.seed() - this.seedStart()) : this.seedRange() < 0 ? Math.max(this.seedRange(), this.seed() - this.seedStart()) : 0
                    }
                }, {
                    key: "ratio",
                    value: function() {
                        var t = this.seedRange();
                        return 0 === t ? 1 : Math.max(0, Math.min(1, this.seedDelta() / t))
                    }
                }, {
                    key: "c",
                    value: function() {
                        return this.outputEnd() - this.outputStart()
                    }
                }, {
                    key: "t",
                    value: function() {
                        return this.seedDelta()
                    }
                }, {
                    key: "d",
                    value: function() {
                        return this.seedRange()
                    }
                }, {
                    key: "b",
                    value: function() {
                        return this.outputStart()
                    }
                }, {
                    key: "_valOrFn",
                    value: function(t) {
                        return "function" == typeof t ? t() : t
                    }
                }]) && o(t.prototype, e), n && o(t, n), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t;
                var t, e, n
            }()
        },
        7: (t, e, n) => {
            n.d(e, {
                assign: () => r
            });
            var i = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                r = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];
                    if (Object.assign) return Object.assign.apply(Object, [t].concat(n));
                    for (var r = 0; r < n.length; r++) o(t, n[r]);
                    return t
                },
                o = function(t, e) {
                    for (var n in e) i(e, n) && (t[n] = e[n]);
                    return t
                }
        },
        16: (t, e, n) => {
            n.d(e, {
                bind: () => c,
                bindNamed: () => d,
                bindify: () => m,
                trigger: () => f,
                unbind: () => u,
                unbindAllInNamespace: () => y,
                unbindNamed: () => v
            });
            var i = n(3),
                r = function(t, e) {
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
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }
            var s = Array.prototype.slice,
                c = function(t, e) {
                    var n = this;
                    return n._bindings || (n._bindings = {}), n._bindings[t] || (n._bindings[t] = []), n._bindings[t].push(e),
                        function() {
                            n.unbind(t, e)
                        }
                },
                u = function(t, e) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var n = [], i = 0; i < this._bindings[t].length; i++) {
                        var r = this._bindings[t][i];
                        r !== e && n.push(r)
                    }
                    this._bindings[t] = n
                },
                l = function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), {
                        event: t,
                        fn: e
                    }
                },
                f = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];
                    return this._bindings && null != this._bindings.all && p.apply(this, ["all", t].concat(n)), p.apply(this, [t].concat(n))
                },
                p = function(t) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var e, n = s.call(arguments, 1), r = o(this._bindings[t]), a = 0; a < r.length; a++) {
                        var c = r[a];
                        try {
                            c.apply(this, n) === this.unbind && (null == e && (e = []), e.push({
                                event: t,
                                fn: c
                            }))
                        } catch (t) {
                            if (this._throwTriggerErrors) throw t;
                            i.Wistia.error && i.Wistia.error(t)
                        }
                    }
                    if (e)
                        for (var u = 0; u < e.length; u++) {
                            var l = e[u];
                            this.unbind(l.event, l.fn)
                        }
                    return this
                },
                h = function(t, e) {
                    null == t._namedBindings && (t._namedBindings = {}), null == t._namedBindings[e] && (t._namedBindings[e] = {})
                },
                d = function(t, e, n, i) {
                    return this.unbindNamed(t, e),
                        function(t, e, n, i, r) {
                            h(t, e), t._namedBindings[e][n] = {
                                event: i,
                                fn: r
                            }
                        }(this, t, e, n, i), this.bind(n, i),
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
                        var i = n.event,
                            r = n.fn;
                        this.unbind(i, r)
                    }
                    var o = this._namedBindings;
                    return delete o[t][e], g(o[t]) && delete o[t], this
                },
                y = function(t) {
                    var e = this._namedBindings && this._namedBindings[t];
                    if (null == e) return this;
                    for (var n in e) r(e, n) && this.unbindNamed(t, n)
                },
                g = function(t) {
                    for (var e in t)
                        if (r(t, e)) return !1;
                    return !0
                },
                m = function(t) {
                    return t.bind = c, t.unbind = u, t.on = c, t.off = u, t.rebind = l, t.trigger = f, t.bindNamed = d, t.unbindNamed = v, t.unbindAllInNamespace = y, t
                };
            m(function() {}.prototype)
        },
        76: (t, e, n) => {
            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, r(i.key), i)
                }
            }

            function r(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            n.d(e, {
                Color: () => f
            });
            var o = /^#?([0-9a-f]{3,4}|[0-9a-f]{6,8})$/i,
                a = /^rgba?\((\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?)(?:,\s*([01]?\.?\d*))?\)$/,
                s = /^\d+(\.\d+)*%$/,
                c = /([0-9a-f])/gi,
                u = function(t) {
                    return s.test(t) ? 2.55 * parseFloat(t) : t
                },
                l = function(t, e, n) {
                    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
                },
                f = function() {
                    function t(e) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), e instanceof t ? (this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a) : e ? this.parse(e) : (this.r = this.g = this.b = 0, this.a = 1)
                    }
                    return e = t, (n = [{
                        key: "parse",
                        value: function(t) {
                            if (t = String(t), o.test(t)) {
                                var e = t.replace(/^#/, "");
                                3 !== e.length && 4 !== e.length || (e = e.replace(c, "$1$1")), this.r = parseInt(e.substr(0, 2), 16), this.g = parseInt(e.substr(2, 2), 16), this.b = parseInt(e.substr(4, 2), 16), 8 === e.length ? this.a = parseInt(e.substr(6, 2), 16) / 255 : this.a = 1
                            } else if (a.test(t)) {
                                var n = t.match(a);
                                this.r = parseFloat(u(n[1])), this.g = parseFloat(u(n[2])), this.b = parseFloat(u(n[3])), n[4] ? this.a = parseFloat(n[4]) : this.a = 1
                            }
                            return this
                        }
                    }, {
                        key: "clone",
                        value: function() {
                            return new t(this)
                        }
                    }, {
                        key: "_hslFromRgb",
                        value: function() {
                            var t = this.r / 255,
                                e = this.g / 255,
                                n = this.b / 255,
                                i = Math.max(t, e, n),
                                r = Math.min(t, e, n),
                                o = (i + r) / 2;
                            i === r && (this._h = this._s = 0);
                            var a, s, c = i - r;
                            return 0 === c ? (this._h = 0, this._s = 0, this._l = 100 * t, this) : (a = o > .5 ? c / (2 - i - r) : c / (i + r), s = i === t ? (e - n) / c + (e < n ? 6 : 0) : i === e ? (n - t) / c + 2 : (t - e) / c + 4, s /= 6, this._h = 360 * s, this._s = 100 * a, this._l = 100 * o, this)
                        }
                    }, {
                        key: "_rgbFromHsl",
                        value: function() {
                            var t = this._h / 360,
                                e = this._s / 100,
                                n = this._l / 100,
                                i = n < .5 ? n * (1 + e) : n + e - n * e,
                                r = 2 * n - i;
                            return this.r = 255 * l(r, i, t + 1 / 3), this.g = 255 * l(r, i, t), this.b = 255 * l(r, i, t - 1 / 3), this
                        }
                    }, {
                        key: "blendChannel",
                        value: function(t, e, n) {
                            return this[t] = n * e + (1 - n) * this[t], this
                        }
                    }, {
                        key: "blend",
                        value: function(e, n) {
                            return e = new t(e), this.blendChannel("r", e.r, n), this.blendChannel("g", e.g, n), this.blendChannel("b", e.b, n), this
                        }
                    }, {
                        key: "lightenChannel",
                        value: function(t, e) {
                            return this[t] += e, this[t] < 0 ? this[t] = 0 : this[t] > 255 && (this[t] = 255), this
                        }
                    }, {
                        key: "lighten",
                        value: function(t) {
                            return this.looksLikePercent(t) ? this.lightness(this.lightness() + parseFloat(t)) : (this.lightenChannel("r", t), this.lightenChannel("g", t), this.lightenChannel("b", t)), this
                        }
                    }, {
                        key: "darken",
                        value: function(t) {
                            return "string" == typeof t ? this.lighten("-".concat(t)) : this.lighten(-t)
                        }
                    }, {
                        key: "looksLikePercent",
                        value: function(t) {
                            return /^-?\d+(\.\d+)?%$/.test(t)
                        }
                    }, {
                        key: "lightness",
                        value: function(t) {
                            return this._hslFromRgb(), null != t ? (this._l = Math.max(0, Math.min(100, t)), this._rgbFromHsl(), this) : this._l
                        }
                    }, {
                        key: "saturation",
                        value: function(t) {
                            return this._hslFromRgb(), null != t ? (this._s = Math.max(0, Math.min(100, t)), this._rgbFromHsl(), this) : this._s
                        }
                    }, {
                        key: "grayLevel",
                        value: function() {
                            return (.299 * this.r + .587 * this.g + .114 * this.b) / 255
                        }
                    }, {
                        key: "whiteLevel",
                        value: function() {
                            return Math.min(Math.min(this.r, this.g), this.b)
                        }
                    }, {
                        key: "isLight",
                        value: function() {
                            return this.grayLevel() > .4
                        }
                    }, {
                        key: "isGrayscale",
                        value: function() {
                            return this.r === this.g && this.g === this.b
                        }
                    }, {
                        key: "distanceFrom",
                        value: function(t) {
                            return Math.sqrt(Math.pow(this.r - t.r, 2) + Math.pow(this.g - t.g, 2) + Math.pow(this.b - t.b, 2))
                        }
                    }, {
                        key: "channelDominance",
                        value: function() {
                            var t = this;
                            return ["r", "g", "b"].sort((function(e, n) {
                                return t[n] - t[e]
                            }))
                        }
                    }, {
                        key: "alpha",
                        value: function(t) {
                            return null != t ? (this.a = t, this) : this.a
                        }
                    }, {
                        key: "red",
                        value: function(t) {
                            return null != t ? (this.r = t, this) : this.r
                        }
                    }, {
                        key: "green",
                        value: function(t) {
                            return null != t ? (this.g = t, this) : this.g
                        }
                    }, {
                        key: "blue",
                        value: function(t) {
                            return null != t ? (this.b = t, this) : this.b
                        }
                    }, {
                        key: "toHex",
                        value: function() {
                            var t = Math.round(this.r).toString(16),
                                e = Math.round(this.g).toString(16),
                                n = Math.round(this.b).toString(16);
                            return 1 === t.length && (t = "0".concat(t)), 1 === e.length && (e = "0".concat(e)), 1 === n.length && (n = "0".concat(n)), "".concat(t).concat(e).concat(n)
                        }
                    }, {
                        key: "toHexWithAlpha",
                        value: function() {
                            var t = Math.round(255 * this.a).toString(16);
                            return 1 === t.length && (t = "0".concat(t)), "".concat(t).concat(this.toHex())
                        }
                    }, {
                        key: "toRgb",
                        value: function() {
                            return "rgb(".concat(Math.round(this.r), ",").concat(Math.round(this.g), ",").concat(Math.round(this.b), ")")
                        }
                    }, {
                        key: "toRgba",
                        value: function() {
                            return "rgba(".concat(Math.round(this.r), ",").concat(Math.round(this.g), ",").concat(Math.round(this.b), ",").concat(this.a, ")")
                        }
                    }, {
                        key: "toRgbaOrHex",
                        value: function() {
                            return this.toRgba()
                        }
                    }, {
                        key: "toPercent",
                        value: function() {
                            return "rgba(".concat(this.r / 255 * 100, "%,").concat(this.g / 255 * 100, "%,").concat(this.b / 255 * 100, "%,").concat(this.a, ")")
                        }
                    }, {
                        key: "toIeGradient",
                        value: function() {
                            return "progid:DXImageTransform.Microsoft.gradient(startColorStr='#".concat(this.toHexWithAlpha(), "', endColorStr='#").concat(this.toHexWithAlpha(), "')")
                        }
                    }, {
                        key: "toString",
                        value: function() {
                            return this.toPercent()
                        }
                    }]) && i(e.prototype, n), r && i(e, r), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e;
                    var e, n, r
                }()
        },
        11: (t, e, n) => {
            n.d(e, {
                cachedDetect: () => V
            });
            var i, r = n(3),
                o = n(4),
                a = n(12),
                s = navigator.userAgent,
                c = /(webkit)[ /]([^\s]+)/i,
                u = /OPR\/([^\s]+)/i,
                l = /(edge)\/(\d+(?:\.\d+)?)/i,
                f = /(mozilla)(?:.*? rv:([^\s)]+))?/i,
                p = /(android) ([^;]+)/i,
                h = /(iphone)/i,
                d = /(Windows Phone OS (\d+(?:\.\d+)?))/,
                v = /OS (\d+)_(\d+)/i,
                y = /(playstation 3)/i,
                g = /BlackBerry|BB10/i,
                m = /(firefox)/i,
                b = /Mobile VR/i,
                _ = /Version\/([^\s]+)/i,
                w = function() {
                    return (k()[1] || "webkit").toLowerCase()
                },
                S = function() {
                    return k()[2]
                },
                k = function() {
                    var t;
                    return (t = s.match(l)) || (t = s.match(c)) || (t = s.match(u)) ? t : t ? (null != document.documentMode && (t[2] = document.documentMode), t) : (t = s.match(f)) || []
                },
                T = function() {
                    var t = s.match(p);
                    return null != t && {
                        version: t[2]
                    }
                },
                O = function() {
                    return h.test(s)
                },
                x = function() {
                    return M() > 0 || T() || E()
                },
                C = function() {
                    try {
                        var t = matchMedia("(hover:hover)");
                        if ("not all" !== t.media) return t.matches
                    } catch (t) {}
                    return !x()
                },
                P = function() {
                    return g.test(s)
                },
                E = function() {
                    return /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1
                },
                j = function() {
                    return c.test(s) && !/chrome/i.test(s) && !E() && !O()
                },
                A = function() {
                    return !(!/Chrome/.test(s) || !/Google Inc/.test(navigator.vendor)) && {
                        version: D()
                    }
                },
                I = function() {
                    var t = s.match(/\bSilk\/([^\s]+)/);
                    return t && t[1]
                },
                D = function() {
                    var t = s.match(/\bChrome\/([^\s]+)/);
                    return t && t[1]
                },
                L = function() {
                    return u.test(s)
                },
                M = function() {
                    var t = s.match(v),
                        e = s.match(_);
                    return null != t ? parseFloat("".concat(t[1], ".").concat(t[2])) : null != e && e[1] && E() ? parseFloat(e[1]) : 0
                },
                R = function() {
                    return l.test(s)
                },
                W = function() {
                    return m.test(s)
                },
                F = function() {
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
                H = function() {
                    try {
                        return "localStorage" in o.root && null != o.root.localStorage
                    } catch (t) {
                        return !1
                    }
                },
                B = ["WebKit", "Moz", "O", "Ms", ""],
                N = function() {
                    for (var t = 0; t < B.length; t++) {
                        var e = "".concat(B[t], "MutationObserver");
                        if (o.root[e]) return e
                    }
                    return null
                },
                U = function() {
                    if (null != i) return i;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function() {
                                i = !0
                            }
                        });
                        window.addEventListener("test", null, t)
                    } catch (t) {
                        i = !1
                    }
                    return i
                },
                V = function() {
                    return r.Wistia._detectCache || (r.Wistia._detectCache = K()), r.Wistia._detectCache
                },
                K = function() {
                    var t, e, n, i, r, c, u, l, f, p, h, v, g = {
                        amazonSilk: !!/Silk/.test(s) && {
                            version: I()
                        },
                        browser: {
                            version: S()
                        },
                        edge: R(),
                        firefox: W(),
                        gearvr: b.test(s),
                        android: T(),
                        oldandroid: T() && parseFloat(T().version) < 4.1,
                        iphone: O(),
                        ipad: E(),
                        blackberry: P(),
                        safari: j(),
                        chrome: A(),
                        opera: L(),
                        winphone: {
                            version: d.test(s)[2]
                        },
                        ios: {
                            version: M()
                        },
                        windows: /win/i.test(navigator.platform),
                        mac: /mac/i.test(navigator.platform),
                        linux: /linux/i.test(navigator.platform),
                        retina: null != o.root.devicePixelRatio && o.root.devicePixelRatio > 1,
                        hoverIsNatural: C(),
                        touchScreen: x(),
                        ps3: y.test(s),
                        video: F(),
                        mediaSource: o.root.MediaSource && o.root.MediaSource.isTypeSupported("".concat('video/mp4; codecs="avc1.42E01E', ', mp4a.40.2"')),
                        nativeHls: (O() || E() || j()) && F().nativeHls,
                        localstorage: H(),
                        json: !(!o.root.JSON || "function" != typeof JSON.parse),
                        backgroundSize: (v = document.createElement("div"), "" === v.style.backgroundSize || "" === v.style.webkitBackgroundSize || "" === v.style.mozBackgroundSize || "" === v.style.oBackgroundSize),
                        fullscreenEnabled: document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled,
                        vulcanSupport: (h = /webkit|mozilla|edge/.test(w()), Boolean(!O() && !E() && !T() && !P() && h && F().h264 && Object.defineProperties)),
                        mutationObserver: N(),
                        callingPlayRequiresEventContext: M() > 0 || T() || j(),
                        passiveSupported: U(),
                        webp: (t = A(), e = W(), n = R(), i = L(), r = t && S() >= 32, c = t && S() >= 75 && T(), u = e && S() >= 65, l = e && S() >= 67 && T(), f = n && S() >= 18, p = i && S() >= 19, r || c || u || l || f || p),
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
                addInlineCss: () => p,
                elemAnimate: () => O,
                elemAppend: () => d,
                elemBind: () => x,
                elemFromObject: () => h,
                elemHeight: () => S,
                elemIsInside: () => T,
                elemOffset: () => s.elemOffset,
                elemRemove: () => v,
                elemStyle: () => y,
                elemUnbind: () => C,
                elemWidth: () => w
            });
            var i, r = n(6),
                o = (n(8), n(10), n(11)),
                a = n(13),
                s = n(17),
                c = (n(18), n(24)),
                u = n(3),
                l = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                f = (u.Wistia, (0, o.cachedDetect)()),
                p = function(t, e) {
                    var n = t || document.body || document.head,
                        i = document.createElement("style");
                    return i.id = (0, c.seqId)("wistia_", "_style"), i.setAttribute("type", "text/css"), i.className = "wistia_injected_style", n.appendChild(i, n.nextSibling), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e)), i
                },
                h = function(t) {
                    if ((0, r.isArray)(t)) {
                        for (var e = [], n = 0; n < t.length; n++) e.push(h(t[n]));
                        return e
                    }
                    var i = t.tagName || "div",
                        o = t.childNodes || [];
                    (0, r.isArray)(o) || (o = [o]);
                    var a = document.createElement(i);
                    for (var s in t)
                        if (l(t, s)) {
                            var c = t[s];
                            if ("childNodes" !== s && "tagName" !== s && "ref" !== s) {
                                var u = s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                                if ("style" === s)
                                    if ((0, r.isObject)(c))
                                        for (var f in c) a.style[f] = c[f];
                                    else
                                        for (var p = c.split(";"), v = 0; v < p.length; v++) {
                                            var y = p[v].split(/\s*:\s*/),
                                                g = y[0],
                                                m = y[1];
                                            g && m && (a.style[g] = m)
                                        } else if ("events" === s)
                                            for (var b in c) {
                                                var _ = c[b];
                                                x(a, b, _)
                                            } else "className" === s || "class" === s ? a.className = c : "innerHTML" === s ? a.innerHTML = c : "innerText" === s ? a.innerText = c : null != c && "function" == typeof c.toString && a.setAttribute(u, c.toString())
                            }
                        }
                    for (var w = 0; w < o.length; w++) {
                        var S = o[w];
                        if ((0, r.isObject)(S)) {
                            var k = h(S);
                            d(a, k)
                        } else {
                            var T = document.createTextNode(S.toString());
                            d(a, T)
                        }
                    }
                    return "function" == typeof t.ref && t.ref(a), a
                },
                d = function(t, e) {
                    if ((0, r.isArray)(e))
                        for (var n = 0; n < e.length; n++) d(t, e[n]);
                    else t.tagName.includes("-") ? t.shadowRoot.appendChild(e, {
                        wistiaGridCaller: !0
                    }) : t.appendChild(e, {
                        wistiaGridCaller: !0
                    })
                },
                v = function(t) {
                    var e;
                    if ((0, r.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var n = 0; n < t.length; n++) v(t[n]);
                    else null == t || 1 !== t.nodeType && 3 !== t.nodeType || !(e = t.parentNode) || (e.removeChild(t), t = null)
                },
                y = function(t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];
                    if ((0, r.isArray)(t) || window.NodeList && t instanceof NodeList) {
                        for (var o = [], s = 0; s < t.length; s++) {
                            var c = t[s];
                            1 === c.nodeType && o.push(y.apply(void 0, [c].concat(n)))
                        }
                        return o
                    }
                    if (2 === n.length) {
                        var u = n[0],
                            l = n[1];
                        t.style[u] = l
                    } else if (1 === n.length)
                        if ("string" == typeof n[0]) {
                            var f = n[0];
                            try {
                                return t.currentStyle ? t.currentStyle[f] : window.getComputedStyle ? window.getComputedStyle(t, null).getPropertyValue(f) : null
                            } catch (t) {
                                a.wlog.notice(t)
                            }
                        } else {
                            var p = b(n[0]);
                            for (var h in p) {
                                var d = p[h];
                                t.style[h] = d
                            }
                        }
                    else a.wlog.apply(void 0, ["Unexpected args", t].concat(n))
                },
                g = {
                    borderImage: !0,
                    mixBlendMode: !0,
                    transform: !0,
                    transition: !0,
                    transitionDuration: !0
                },
                m = ["webkit", "moz", "o", "ms"],
                b = function(t) {
                    if (f.chrome) return t;
                    var e = {};
                    for (var n in t) {
                        var i = t[n];
                        if (e[n] = i, g[n])
                            for (var r = m, o = 0; o < r.length; o++) {
                                var a = r[o] + n.charAt(0).toUpperCase() + n.slice(1);
                                n[a] || (e[a] = i)
                            }
                    }
                    return e
                },
                _ = function(t, e) {
                    if (!window.getComputedStyle) return null;
                    var n = window.getComputedStyle(t, null);
                    return null == n ? null : null != e ? n[e] : n
                },
                w = function(t) {
                    if (t === window) return window.innerWidth ? window.innerWidth : document.documentElement ? document.documentElement.offsetWidth : document.body.offsetWidth;
                    if (t === document) {
                        var e = document.body,
                            n = document.documentElement;
                        return Math.max(e.scrollWidth, e.offsetWidth, n.clientWidth, n.scrollWidth, n.offsetWidth)
                    }
                    var i;
                    return (i = _(t, "width")) && null != i ? parseFloat(i) : t.currentStyle ? t.offsetWidth : -1
                },
                S = function(t) {
                    if (t === window) return window.innerHeight ? window.innerHeight : document.documentElement ? document.documentElement.offsetHeight : document.body.offsetHeight;
                    if (t === document) {
                        var e = document.body,
                            n = document.documentElement;
                        return Math.max(e.scrollHeight, e.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)
                    }
                    var i;
                    return (i = _(t, "height")) && null != i ? parseFloat(i) : t.currentStyle ? t.offsetHeight : -1
                },
                k = function(t) {
                    for (var e = t, n = []; e = e.parentNode;) n.push(e);
                    return n
                },
                T = function(t, e) {
                    return t === e || function(t, e) {
                        for (var n = k(t), i = 0; i < n.length; i++)
                            if (n[i] === e) return !0;
                        return !1
                    }(t, e)
                },
                O = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    n = (0, r.merge)({
                        time: 400,
                        easing: "ease"
                    }, n);
                    var i = function(t, e, n) {
                        var i = [];
                        for (var r in t) i.push("".concat(r, " ").concat(e, "ms ").concat(n));
                        return i.join(",")
                    }(e, n.time, n.easing);
                    y(t, {
                        transition: i
                    }), A((function() {
                        y(t, e), setTimeout((function() {
                            y(t, {
                                transition: ""
                            }), "function" == typeof n.callback && n.callback()
                        }), n.time)
                    }))
                },
                x = function(t, e, n) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        r = function(i) {
                            (i = i || window.event).pageX || i.pageY || !i.clientX && !i.clientY || (i.pageX = i.clientX + j(), i.pageY = i.clientY + E()), i.preventDefault || (i.preventDefault = function() {
                                i.returnValue = !1
                            }), i.stopPropagation || (i.stopPropagation = function() {
                                i.cancelBubble = !0
                            }), null == i.which && (i.which = null != i.charCode ? i.charCode : i.keyCode), null == i.which && null != i.button && (1 & i.button ? i.which = 1 : 2 & i.button ? i.which = 3 : 4 & i.button ? i.which = 2 : i.which = 0), i.target || i.srcElement && (i.target = i.srcElement), i.target && 3 === i.target.nodeType && (i.target = i.target.parentNode);
                            for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) o[a - 1] = arguments[a];
                            var s = n.apply(i.target, [i].concat(o));
                            return s === C && C(t, e, n), s
                        };
                    u.Wistia._elemBind = u.Wistia._elemBind || {};
                    var o = P(t, e, n);
                    return u.Wistia._elemBind[o] = r, r.elem = t, r.event = e, t.addEventListener(e, r, i),
                        function() {
                            C(t, e, n, i)
                        }
                },
                C = function(t, e, n) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (null != t && null != t._wistiaElemId && null != n && n._wistiaBindId) {
                        var r = P(t, e, n),
                            o = u.Wistia._elemBind[r];
                        return o && (t.removeEventListener(e, o, i), o.elem = null, o.event = null), delete u.Wistia._elemBind[r]
                    }
                },
                P = function(t, e, n) {
                    return t._wistiaElemId = t._wistiaElemId || (0, c.seqId)("wistia_elem_"), n._wistiaBindId = n._wistiaBindId || (0, c.seqId)("wistia_bind_"), "".concat(t._wistiaElemId, ".").concat(e, ".").concat(n._wistiaBindId)
                },
                E = function(t) {
                    var e = document.body,
                        n = document.documentElement;
                    if (null == t) return n && n.scrollTop || e && e.scrollTop || 0;
                    e && (e.scrollTop = t), n && (n.scrollTop = t)
                },
                j = function(t) {
                    var e = document.body,
                        n = document.documentElement;
                    if (null == t) return n && n.scrollLeft || e && e.scrollLeft || 0;
                    e && (e.scrollLeft = t), n && (n.scrollLeft = t)
                },
                A = function(t) {
                    return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                        return setTimeout(t, 1e3 / 60)
                    })(t)
                };
            ["auxclick", "click", "contextmenu", "dblclick", "focus", "keydown", "keypress", "keyup", "mousedown", "mouseup", "reset", "submit", "touchend", "touchstart"].forEach((function(t) {
                x(document, t, (function(t) {
                    i = t, Date.now(), setTimeout((function() {
                        i === t && (i = void 0)
                    }), 0)
                }), !f.passiveSupported || {
                    capture: !0,
                    passive: !0
                })
            }))
        },
        17: (t, e, n) => {
            var i;
            n.d(e, {
                elemOffset: () => o
            });
            var r = function() {
                    if (null != i) return i;
                    var t = document.createElement("div");
                    return t.style.paddingLeft = t.style.width = "1px", document.body.appendChild(t), i = 2 === t.offsetWidth, document.body.removeChild(t), i
                },
                o = function(t) {
                    var e, n, i = document.body,
                        o = document.defaultView,
                        s = document.documentElement,
                        c = t.getBoundingClientRect(),
                        u = s.clientTop || i.clientTop || 0,
                        l = s.clientLeft || i.clientLeft || 0;
                    e = o && null != o.pageYOffset ? o.pageYOffset : r() && s && null != s.scrollTop ? s.scrollTop : i.scrollTop, n = o && null != o.pageXOffset ? o.pageXOffset : r() && s && null != s.scrollLeft ? s.scrollLeft : i.scrollLeft;
                    var f = a(t);
                    return {
                        height: c.height * f,
                        top: c.top * f + e - u,
                        left: c.left * f + n - l,
                        width: c.width * f,
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
            var i = n(11),
                r = n(6);

            function o(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var i, r, o, a, s = [],
                            c = !0,
                            u = !1;
                        try {
                            if (o = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                c = !1
                            } else
                                for (; !(c = (i = o.call(n)).done) && (s.push(i.value), s.length !== e); c = !0);
                        } catch (t) {
                            u = !0, r = t
                        } finally {
                            try {
                                if (!c && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (u) throw r
                            }
                        }
                        return s
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
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }
            var s = (0, i.cachedDetect)(),
                c = function(t) {
                    if (!(s.iphone || s.ipad || s.android)) return [640, 960];
                    if (null != t && t.isAudio()) return [500, 960];
                    var e, n, i, o, a = (e = document.querySelector("meta[name=viewport]"), n = e && e.getAttribute("content"), i = {}, n && n.split(/[\s,]+/).forEach((function(t) {
                        var e = t.split("=");
                        2 === e.length && (i[e[0]] = (0, r.cast)(e[1]))
                    })), i);
                    if (a.width) {
                        o = "number" == typeof a.width ? 0 + a.width : screen.width || window.innerWidth;
                        var c = Math.max(a["minimum-scale"] || 0, Math.min(a["maximum-scale"] || 10, a["initial-scale"] || 1));
                        c < 1 && (o /= c)
                    } else o = window.innerWidth;
                    return [o, 2 * o / 3]
                },
                u = function(t, e) {
                    var n = t.videoWidth(),
                        i = o(e || c(t), 2),
                        r = i[0],
                        a = i[1];
                    return n <= r ? n / r : n > a ? n / a : 1
                }
        },
        14: (t, e, n) => {
            n.d(e, {
                globalTrigger: () => r
            });
            var i = n(3);
            (0, n(15).makeWbindable)(i.Wistia);
            i.Wistia.bind.bind(i.Wistia), i.Wistia.on.bind(i.Wistia), i.Wistia.off.bind(i.Wistia), i.Wistia.rebind.bind(i.Wistia);
            var r = i.Wistia.trigger.bind(i.Wistia);
            i.Wistia.unbind.bind(i.Wistia)
        },
        21: (t, e, n) => {
            n.d(e, {
                TAGGED_VERSION: () => s,
                cdnFastWistiaNetHost: () => c,
                eV1HostWithPort: () => f,
                eV1Protocol: () => p,
                mediaDataHost: () => h,
                metricsHost: () => d
            });
            var i = n(4),
                r = n(22),
                o = n(23),
                a = ((0, o.appHostname)("app"), (0, o.appHostname)("fast-protected"), (0, o.appHostname)("fast")),
                s = "",
                c = ("undefined" != typeof window && i.root === window && i.root.location && i.root.location.protocol, function() {
                    return "fast.".concat("wistia.net")
                }),
                u = function() {
                    for (var t = document.getElementsByTagName("script"), e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.src) {
                            var i = new r.Url(n.src),
                                o = /\/assets\/external\/E-v1?\.js$/.test(i.rawPath),
                                s = i.host === (void 0 || a) || i.host === c() || "fast-canary.wistia.net" === i.host,
                                u = "https:" === location.protocol && "https:" === i.protocol,
                                l = "" === i.protocol || null == i.protocol,
                                f = u || l || "http:" === location.protocol,
                                p = !n.readyState || /loaded|complete/.test(n.readyState);
                            if (o && s && f && p) return i
                        }
                    }
                    return new r.Url("".concat((0, r.proto)(), "//").concat(c(), "/E-v1.js"))
                }(),
                l = function() {
                    return u.host
                },
                f = function() {
                    return u.port ? "".concat(l(), ":").concat(u.port) : l()
                },
                p = function() {
                    return u.protocol
                },
                h = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return t.embedHost ? g(t.embedHost) : f()
                },
                d = function() {
                    return "pipedream.".concat("wistia.com")
                },
                v = [].concat(["wistia.net", "wistia.com"], ["wistia.mx", "wistia.dev", "wistia.tech", "wistia.am", "wistia.se", "wistia.io", "wistia.st"]),
                y = new RegExp("(".concat(v.map((function(t) {
                    return "\\.".concat(t.replace(".", "\\."))
                })).join("|"), ")$")),
                g = function(t) {
                    return t && y.test(t) ? t : f()
                }
        },
        39: (t, e, n) => {
            n.d(e, {
                interFontFamily: () => i
            });
            var i = "WistiaPlayerInter, Helvetica, Sans-Serif"
        },
        43: (t, e, n) => {
            n.d(e, {
                isMouseDown: () => u,
                isMouseDownRecently: () => l
            });
            var i = n(3),
                r = n(5),
                o = (0, n(11).cachedDetect)();
            if (null == i.Wistia._isMouseDown) {
                i.Wistia._isMouseDown = !1;
                var a = function(t) {
                        i.Wistia._isMouseDown = !0, i.Wistia._lastMouseDownAt = Date.now(), setTimeout((function() {
                            t.defaultPrevented && (i.Wistia._isMouseDown = !1)
                        }), 0)
                    },
                    s = function() {
                        i.Wistia._lastMouseUpAt = Date.now(), setTimeout((function() {
                            i.Wistia._isMouseDown = !1
                        }), 0)
                    };
                o.touchScreen ? ((0, r.elemBind)(document, "touchstart", a, !0), (0, r.elemBind)(document, "touchend", (function() {
                    i.Wistia._lastMouseUpAt = Date.now(), setTimeout((function() {
                        i.Wistia._isMouseDown = !1
                    }), 0)
                }), !0)) : ((0, r.elemBind)(document, "mousedown", a, !0), (0, r.elemBind)(document, "mouseup", s, !0));
                var c = o.windows ? s : a;
                (0, r.elemBind)(document, "contextmenu", c, !0)
            }
            var u = function() {
                    return null != i.Wistia._mouseDownForceReturnVal ? i.Wistia._mouseDownForceReturnVal : i.Wistia._isMouseDown
                },
                l = function() {
                    return null != i.Wistia._mouseDownForceReturnVal ? i.Wistia._mouseDownForceReturnVal : (t = 500, Math.max(i.Wistia._lastMouseDownAt || 0, (i.Wistia._lastMouseUpAt || 0) - 1) > Date.now() - t);
                    var t
                }
        },
        34: (t, e, n) => {
            n.d(e, {
                getLocalStorage: () => c,
                removeLocalStorage: () => u,
                setLocalStorage: () => l,
                updateLocalStorage: () => f
            });
            var i = n(3),
                r = function(t) {
                    setTimeout((function() {
                        throw t
                    }), 0)
                },
                o = "_namespacedLocalStorage",
                a = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia-test-localstorage";
                    if (null != i.Wistia._localStorageWorks) return i.Wistia._localStorageWorks;
                    try {
                        var e = localStorage.getItem(t);
                        localStorage.removeItem(t), localStorage.setItem(t, e), localStorage.removeItem(t), i.Wistia._localStorageWorks = !0
                    } catch (t) {
                        i.Wistia._localStorageWorks = !1
                    }
                    return i.Wistia._localStorageWorks
                },
                s = function() {
                    return null == i.Wistia[o] && (i.Wistia[o] = {}), i.Wistia[o]
                },
                c = function(t) {
                    if (!a()) return s()[t] || {};
                    if (localStorage[t]) try {
                        return "null" === localStorage[t] ? {} : JSON.parse(localStorage[t])
                    } catch (t) {
                        r(t)
                    }
                    return {}
                },
                u = function(t) {
                    if (a()) try {
                        localStorage.removeItem(t)
                    } catch (t) {
                        r(t)
                    } else s()[t] = {}
                },
                l = function(t, e) {
                    if (!a()) return null != e && "object" == typeof e && (s()[t] = e), e;
                    try {
                        s()[t] = e, localStorage[t] = JSON.stringify(e)
                    } catch (t) {
                        r(t)
                    }
                    return e
                },
                f = function(t, e) {
                    var n = c(t);
                    try {
                        e(n)
                    } catch (t) {
                        r(t)
                    }
                    return l(t, n)
                }
        },
        6: (t, e, n) => {
            n.d(e, {
                cast: () => v,
                clone: () => u,
                eachLeaf: () => C,
                getDeep: () => l,
                isArray: () => b,
                isEmpty: () => O,
                isObject: () => w,
                merge: () => o,
                setAndPreserveUndefined: () => p,
                setDeep: () => f,
                unsetDeep: () => d
            });
            n(7);
            var i = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                r = Array.prototype.slice,
                o = function(t) {
                    if (0 == (arguments.length <= 1 ? 0 : arguments.length - 1)) return t;
                    for (var e = 0; e < (arguments.length <= 1 ? 0 : arguments.length - 1); e++) a(t, e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1]);
                    return t
                },
                a = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s,
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : c;
                    if (b(e)) {
                        b(t) || (t = []);
                        for (var o = 0; o < e.length; o++) {
                            var u = e[o];
                            null == t[o] && null != u && (b(u) ? t[o] = [] : w(u) && (t[o] = {}));
                            var l = a(t[o], u, n);
                            r(e, o, l) ? delete t[o] : t[o] = l
                        }
                        return n(t)
                    }
                    if (w(e)) {
                        for (var f in e)
                            if (i(e, f) && (i(t, f) || null == t[f])) {
                                var p = e[f];
                                b(p) ? (b(t[f]) || (t[f] = []), a(t[f], p, n), t[f] = n(t[f])) : w(p) ? (w(t[f]) || (t[f] = {}), a(t[f], p, n), t[f] = n(t[f])) : null == t ? (t = {}, r(e, f, p) || (t[f] = n(p))) : r(e, f, p) ? delete t[f] : t[f] = n(p)
                            }
                        return n(t)
                    }
                    return n(e)
                },
                s = function(t) {
                    return t
                },
                c = function(t, e, n) {
                    return null == n
                },
                u = function(t, e) {
                    return b(t) ? a([], t, e) : a({}, t, e)
                },
                l = function(t, e, n) {
                    e = "string" == typeof e ? e.split(".") : r.call(e);
                    for (var o, a = t; null != t && e.length;) {
                        var s = e.shift();
                        void 0 !== t[s] && (w(t[s]) || b(t[s])) || !n || (0 === s ? (t = a[o] = [])[s] = {} : t[s] = {}), a = t, o = s, t = i(t, s) ? t[s] : void 0
                    }
                    return t
                },
                f = function(t, e, n) {
                    return h(t, e, n, !0)
                },
                p = function(t, e, n) {
                    return h(t, e, n, !1)
                },
                h = function(t, e, n) {
                    var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                        o = (e = "string" == typeof e ? e.split(".") : r.call(e)).pop();
                    null != (t = l(t, e, !0)) && (w(t) || b(t)) && null != o && (i && null == n ? delete t[o] : t[o] = n)
                },
                d = function(t, e) {
                    return f(t, e)
                },
                v = function(t) {
                    return null == t ? t : w(t) || b(t) ? g(t) : y("".concat(t), t)
                },
                y = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                    return /^-?[1-9]\d*?$/.test(t) ? parseInt(t, 10) : "0" === t || "-0" === t ? 0 : /^-?\d*\.\d+$/.test(t) ? parseFloat(t) : !!/^true$/i.test(t) || !/^false$/i.test(t) && e
                },
                g = function(t) {
                    return a(t, t, (function(t) {
                        return "string" == typeof t ? y(t) : t
                    }), (function() {
                        return !1
                    }))
                },
                m = /^\s*function Array()/,
                b = function(t) {
                    return null != t && t.push && m.test(t.constructor)
                },
                _ = /^\s*function Object()/,
                w = function(t) {
                    return null != t && "object" == typeof t && _.test(t.constructor)
                },
                S = /^\s*function RegExp()/,
                k = /^string|number|boolean|function$/i,
                T = function(t) {
                    return null != t && (k.test(typeof t) || function(t) {
                        return null != t && S.test(t.constructor)
                    }(t))
                },
                O = function(t) {
                    return null == t || (!(!b(t) || t.length) || !!w(t) && !Object.keys(t).length)
                },
                x = function(t, e, n, o, a) {
                    if (null == n && (n = []), T(t)) e(t, n, o, a);
                    else if (w(t) || b(t)) {
                        for (var s in e(t, n, o, a), t)
                            if (i(t, s)) {
                                var c = r.call(n);
                                c.push(s), x(t[s], e, c, t, s)
                            }
                    } else e(t, n, o, a)
                },
                C = function(t, e) {
                    x(t, (function(t, n, i, r) {
                        b(t) || w(t) || e(t, n, i, r)
                    }))
                }
        },
        10: (t, e, n) => {
            n.d(e, {
                pageLoaded: () => i
            });
            var i = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4e3,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
                    i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window;
                if (/loaded|complete/.test(n.readyState)) setTimeout(t, 0);
                else {
                    var r = function() {
                            i.removeEventListener("load", o, !1)
                        },
                        o = function() {
                            clearTimeout(a), r(), t()
                        };
                    i.addEventListener("load", o, !1);
                    var a = setTimeout((function() {
                        r(), t()
                    }), e)
                }
            }
        },
        9: (t, e, n) => {
            n.d(e, {
                poll: () => i
            });
            var i = function(t, e, n, i, r) {
                var o = null,
                    a = (new Date).getTime(),
                    s = function() {
                        (new Date).getTime() - a > i ? "function" == typeof r && r() : t() ? e() : (clearTimeout(o), o = setTimeout(s, n))
                    };
                o = setTimeout(s, 1)
            }
        },
        4: (t, e, n) => {
            var i;
            n.d(e, {
                root: () => r
            });
            try {
                (i = self).self !== i && void 0 !== i.self && "undefined" != typeof window && (i = window)
            } catch (t) {
                i = "undefined" != typeof globalThis ? globalThis : window
            }
            var r = i
        },
        20: (t, e, n) => {
            n.d(e, {
                runScript: () => r
            });
            var i = n(21),
                r = function(t, e) {
                    var n = i.TAGGED_VERSION;
                    return new Promise((function(i, r) {
                        var o;
                        null == e && (e = 8e3), (o = document.createElement("script")).src = t, o.async = !0, o.type = "text/javascript", /https?:\/\/fast\.wistia\./.test(o.src) && "" !== n && n.length > 0 && (o.src = "".concat(o.src, "@").concat(n));
                        var a = null,
                            s = !1,
                            c = function() {
                                o.onerror = o.onreadystatechange = o.onload = null, clearTimeout(a), clearTimeout(l), a = setTimeout((function() {
                                    o && o.parentNode && o.parentNode.removeChild(o)
                                }), 500)
                            },
                            u = function() {
                                var t = o.readyState;
                                s || t && !/loaded|complete/.test(t) || (s = !0, setTimeout((function() {
                                    i(), c()
                                }), 1))
                            },
                            l = setTimeout((function() {
                                s = !0, c(), r(new Error("timeout"))
                            }), e);
                        o.onerror = function(t) {
                            s = !0, c(), r(t)
                        }, o.onreadystatechange = u, o.onload = u, (document.body || document.head).appendChild(o)
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
                runScripts: () => l
            });
            var i = n(13),
                r = n(6),
                o = n(20);

            function a(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(t);
                    e && (i = i.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, i)
                }
                return n
            }

            function s(t, e, n) {
                return (e = function(t) {
                    var e = function(t, e) {
                        if ("object" != typeof t || !t) return t;
                        var n = t[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var i = n.call(t, e || "default");
                            if ("object" != typeof i) return i;
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
            var c = function(t) {
                    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = document.getElementsByTagName("script"), i = 0; i < n.length; i++) {
                        var r = n[i],
                            o = r.getAttribute("src") || "";
                        if (e.ignoreQueryParams) {
                            var a = o.split("?");
                            o = a[0]
                        }
                        if (!e.scriptRegex && e.ignoreProtocol && (o = o.replace(/^https?:/, ""), t = t.replace(/^https?:/, "")), e.scriptRegex && e.scriptRegex.test(o)) return r;
                        if (e.testStartsWith && 0 === o.indexOf(t)) return r;
                        if (o === t) return r
                    }
                    return null
                },
                u = function(t) {
                    var e, n, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8e3,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return null == i && (i = 8e3), null == r && (r = {}), new Promise((function(a) {
                        !0 === r.once && (e = c(t)) && (n = !0), r.once && n ? e.readyState && !/loaded|complete/.test(e.readyState) || setTimeout((function() {
                            a()
                        }), 1) : (0, o.runScript)(t, i).then(a).catch((function(t) {
                            a(t), setTimeout((function() {
                                console.error(t)
                            }), 1)
                        }))
                    }))
                },
                l = function() {
                    for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    t = n[0] instanceof Array ? n[0] : n, t = f(t);
                    var o = [],
                        c = [],
                        l = [];
                    return t.forEach((function(t) {
                        var e = function(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var n = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? a(Object(n), !0).forEach((function(e) {
                                        s(t, e, n[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                                    }))
                                }
                                return t
                            }({}, t),
                            n = new Promise((function(t) {
                                e.resolve = t
                            }));
                        e.promise = n, l.push(e.promise), t.async ? o.push(e) : c.push(e)
                    })), c.reduce((function(t, e) {
                        if (e.fn) try {
                            e.fn()
                        } catch (t) {
                            i.wlog.error(t)
                        } finally {
                            e.resolve()
                        } else e.src && u(e.src, null, e).then(e.resolve);
                        return t.then(e.promise)
                    }), Promise.resolve()), setTimeout((function() {
                        o.forEach((function(t) {
                            if (t.fn) try {
                                t.fn()
                            } catch (t) {
                                i.wlog.error(t)
                            } finally {
                                t.resolve()
                            } else t.src && u(t.src, null, t).then(t.resolve)
                        }))
                    }), 1), Promise.all(l)
                },
                f = function(t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                        var i = t[n];
                        "string" == typeof i ? e.push({
                            src: i,
                            async: !1
                        }) : (0, r.isObject)(i) ? e.push(i) : e.push({
                            fn: i,
                            async: !1
                        })
                    }
                    return e
                }
        },
        24: (t, e, n) => {
            n.d(e, {
                seqId: () => r
            });
            var i = n(3),
                r = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia_",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = i.Wistia._sequenceVal || 1,
                        r = "".concat(t).concat(n).concat(e);
                    return i.Wistia._sequenceVal = n + 1, r
                }
        },
        31: (t, e, n) => {
            n.d(e, {
                countMetric: () => u
            });
            var i = n(3),
                r = n(7),
                o = n(10),
                a = n(32),
                s = n(21);
            null == i.Wistia._simpleMetricsCache && (i.Wistia._simpleMetricsCache = {}), null == i.Wistia._simpleMetricsDebounceInterval && (i.Wistia._simpleMetricsDebounceInterval = 500);
            var c = i.Wistia._simpleMetricsCache,
                u = function(t) {
                    return f("count", t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})
                },
                l = function() {
                    if ((0, a.isVisitorTrackingEnabled)()) {
                        for (var t = "https://".concat((0, s.metricsHost)(), "/mput?topic=metrics"), e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
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
                    var s, u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    if ((0, a.isVisitorTrackingEnabled)()) try {
                        null == c.toMput && (c.toMput = []);
                        var f = (0, r.assign)({
                                type: t,
                                key: e,
                                value: null != n ? n : null
                            }, u),
                            p = JSON.stringify(f, (s = new WeakSet, function(t, e) {
                                if ("object" == typeof e && null !== e) {
                                    if (s.has(e)) return "[Circular]";
                                    s.add(e)
                                }
                                return e
                            }));
                        c.toMput.push(p), clearTimeout(i.Wistia._msendTimeout), i.Wistia._msendTimeout = setTimeout((function() {
                            (0, o.pageLoaded)((function() {
                                l.apply(undefined, c.toMput), c.toMput = []
                            }))
                        }), i.Wistia._simpleMetricsDebounceInterval)
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
            var i = n(3),
                r = n(6);
            i.Wistia;
            null == i.Wistia._timeouts && (i.Wistia._timeouts = {});
            var o = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    (0, r.isArray)(t) && (t = t.join("."));
                    var o = c(t);
                    if (a(t, o), e) {
                        var s = i.Wistia._timeouts[o];
                        null == s && (s = i.Wistia._timeouts[o] = {});
                        var u = setTimeout((function() {
                            delete s[t], e()
                        }), n);
                        return s[t] = u, u
                    }
                    return i.Wistia._timeouts[o][t]
                },
                a = function(t) {
                    var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if ((0, r.isArray)(t) && (t = t.join(".")), "__global__" === (n = n || c(t)) && (e = i.Wistia._timeouts[t]))
                        for (var o in e) {
                            var a = e[o];
                            clearTimeout(a), delete e[o]
                        }
                    if (e = i.Wistia._timeouts[n])
                        for (var u in e) {
                            var l = e[u];
                            !u.indexOf || 0 !== u.indexOf(t) || u.length !== t.length && "." !== u.charAt(t.length) || (clearTimeout(l), delete e[u])
                        }
                    i.Wistia.blockSweepTimeouts || (i.Wistia.blockSweepTimeouts = !0, setTimeout(s, 0), setTimeout((function() {
                        i.Wistia.blockSweepTimeouts = !1
                    }), 5e3))
                },
                s = function() {
                    for (var t in i.Wistia._timeouts) {
                        var e = i.Wistia._timeouts[t];
                        (0, r.isEmpty)(e) && delete i.Wistia._timeouts[t]
                    }
                },
                c = function(t) {
                    var e = t.indexOf(".");
                    return e > 0 ? t.substring(0, e) : "__global__"
                }
        },
        32: (t, e, n) => {
            n.d(e, {
                isVisitorTrackingEnabled: () => f
            });
            var i = n(3),
                r = n(14),
                o = n(33),
                a = n(35);

            function s(t) {
                return function(t) {
                    if (Array.isArray(t)) return c(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return c(t, e);
                        var n = {}.toString.call(t).slice(8, -1);
                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function c(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }
            var u;
            i.Wistia._visitorTrackingDomain || (i.Wistia._visitorTrackingDomain = location.hostname || ""), i.Wistia._visitorTracking || (null != (u = (0, o.getWistiaLocalStorage)().visitorTrackingEnabled) && ((0, o.updateWistiaLocalStorage)((function(t) {
                return delete t.visitorTrackingEnabled
            })), i.Wistia._visitorTracking = {}, i.Wistia._visitorTracking[i.Wistia._visitorTrackingDomain] = {
                isEnabled: u,
                updatedAt: Date.now()
            }, (0, o.updateWistiaLocalStorage)((function(t) {
                return t.visitorTracking = i.Wistia._visitorTracking
            }))), i.Wistia._visitorTracking = (0, o.getWistiaLocalStorage)().visitorTracking || {});
            i.Wistia.consent = function(t) {
                return null == t ? f() : l(t)
            };
            var l = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.Wistia._visitorTrackingDomain;
                    "default" === t ? delete i.Wistia._visitorTracking[e] : i.Wistia._visitorTracking[e] = {
                        isEnabled: "true" === "".concat(t),
                        updatedAt: Date.now()
                    }, (0, o.updateWistiaLocalStorage)((function(t) {
                        return t.visitorTracking = i.Wistia._visitorTracking
                    })), (0, r.globalTrigger)("visitortrackingchange", t), s(document.getElementsByTagName("wistia-player")).forEach((function(e) {
                        e.dispatchEvent(new CustomEvent("visitor-tracking-change", {
                            detail: {
                                isTrackingEnabled: t
                            }
                        }))
                    }))
                },
                f = function() {
                    if ("boolean" == typeof i.Wistia._visitorTracking) return i.Wistia._visitorTracking;
                    if (i.Wistia._visitorTracking) {
                        var t = function() {
                            if (i.Wistia._visitorTrackingDomain)
                                for (var t = i.Wistia._visitorTrackingDomain.split("."); t.length > 0;) {
                                    var e = i.Wistia._visitorTracking[t.join(".")],
                                        n = e && e.isEnabled;
                                    if (null != n) return n;
                                    t.shift()
                                }
                        }();
                        if (null != t) return Boolean(t)
                    }
                    var e = (0, a.getAllApiHandles)();
                    if (i.Wistia.channel && i.Wistia.channel.all) try {
                        e.push.apply(e, s(i.Wistia.channel.all()))
                    } catch (t) {}
                    return !e.some((function(t) {
                        return !0 === (t._mediaData || t._galleryData || {}).privacyMode
                    }))
                }
        },
        22: (t, e, n) => {
            n.d(e, {
                Url: () => l,
                proto: () => o
            });
            var i = n(6),
                r = n(13),
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
                            r.wlog.notice(n)
                        }), 50), e = t
                    }
                    return e
                },
                s = function(t) {
                    for (var e = t[0], n = 1; n < t.length; n++) e += "[".concat(t[n], "]");
                    return e
                },
                c = function(t) {
                    return t.match(/([\w\-_]+)/g)
                },
                u = ["protocol", "host", "port", "params", "path"],
                l = function(t) {
                    var e = this;
                    return e.params = {}, e.path = [], e.host = "", "object" == typeof t ? e.fromOptions(t) : t && e.fromRaw(t), e
                },
                f = l.prototype;
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
                    for (var n = t.split("&"), o = function() {
                            var t = n[s].split("="),
                                o = t[0],
                                u = t[1];
                            try {
                                o = c(decodeURIComponent(o)) || ""
                            } catch (t) {
                                setTimeout((function() {
                                    r.wlog.notice(t)
                                }), 50), o = ""
                            }(0, i.cast)(o);
                            var l = (0, i.getDeep)(e, o);
                            if (null != l)
                                if ((0, i.isArray)(l)) l.push(a(u));
                                else {
                                    var f = [l];
                                    f.push(a(u)), (0, i.setAndPreserveUndefined)(e, o, f)
                                }
                            else(0, i.setAndPreserveUndefined)(e, o, a(u))
                        }, s = 0; s < n.length; s++) o();
                    return e
                }(this.rawParams)), (e = t.match(/#(.*)$/)) && (this.anchor = e[1]), this
            }, f.clone = function() {
                return new l({
                    protocol: this.protocol,
                    host: this.host,
                    port: this.port,
                    path: (0, i.clone)(this.path),
                    params: (0, i.clone)(this.params),
                    anchor: this.anchor
                })
            }, f.ext = function(t) {
                if (null != t) {
                    var e = this.ext(),
                        n = this.path.length - 1,
                        i = new RegExp("\\.".concat(e), "g");
                    return e && (this.path[n] = "".concat(this.path[n].replace(i, ""))), this.path[n] = "".concat(this.path[n], ".").concat(t)
                }
                var r = this.path[this.path.length - 1].match(/\.(.*)$/);
                return null != r && r[1] || null
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
                var n, r, o = "?".concat((n = this.params, r = [], (0, i.eachLeaf)(n, (function(t, e) {
                    null != t ? r.push("".concat(encodeURIComponent(s(e)), "=").concat(encodeURIComponent(t))) : r.push(encodeURIComponent(s(e)))
                })), r.join("&")));
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
                    for (var n = t.split(/\/+/), i = 0; i < n.length; i++) {
                        var r = n[i];
                        null != r && "" !== r && e.push(r)
                    }
                    return e
                }(this.rawPath)
            }, l.create = function(t) {
                return new l(t)
            };
            l.create;
            l.parse = function(t) {
                return new l(t)
            };
            l.parse
        },
        15: (t, e, n) => {
            n.d(e, {
                makeWbindable: () => o
            });
            var i = n(3),
                r = n(16);
            i.Wistia.bindable || (i.Wistia.bindable = {
                bind: function(t, e) {
                    return this.specialBind && !0 === this.specialBind.apply(this, arguments) ? this : e ? (r.bind.call(this, t, e), this) : void(i.Wistia.warn && i.Wistia.warn(this.constructor.name, "bind", "falsey value passed in as callback:", e))
                },
                unbind: function(t, e) {
                    return this.specialUnbind && !0 === this.specialUnbind.apply(this, arguments) || (e ? r.unbind.call(this, t, e) : this._bindings && (this._bindings[t] = []), this._bindings && this._bindings[t] && !this._bindings[t].length && (this._bindings[t] = null, delete this._bindings[t])), this
                },
                on: function(t, e) {
                    var n = this.specialBind && this.specialBind.apply(this, arguments);
                    return "function" == typeof n ? n : r.bind.call(this, t, e)
                },
                off: function(t, e) {
                    var n = this.specialUnbind && this.specialUnbind.apply(this, arguments);
                    return "function" == typeof n ? n : r.unbind.call(this, t, e)
                },
                rebind: function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), this
                },
                trigger: function(t) {
                    for (var e, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                    return (e = r.trigger).call.apply(e, [this, t].concat(i)), this
                },
                bindNamed: function() {
                    return r.bindNamed.apply(this, arguments)
                },
                unbindNamed: function() {
                    return r.unbindNamed.apply(this, arguments)
                },
                unbindAllInNamespace: function() {
                    return r.unbindAllInNamespace.apply(this, arguments)
                }
            });
            var o = function(t) {
                for (var e in i.Wistia.bindable) {
                    var n = i.Wistia.bindable[e];
                    t[e] || (t[e] = n)
                }
            }
        },
        37: (t, e, n) => {
            n.d(e, {
                wData: () => o
            });
            var i = n(3),
                r = n(6),
                o = function(t, e) {
                    return (0, r.isArray)(t) || (t = t.split(".")), null != e && (0, r.setDeep)(i.Wistia, ["_data"].concat(t), e), (0, r.getDeep)(i.Wistia, ["_data"].concat(t))
                }
        },
        33: (t, e, n) => {
            n.d(e, {
                getWistiaLocalStorage: () => a,
                updateWistiaLocalStorage: () => s
            });
            var i = n(3),
                r = n(34),
                o = "wistia",
                a = function() {
                    return (0, r.getLocalStorage)(o)
                },
                s = function(t) {
                    return i.Wistia._localStorage = (0, r.updateLocalStorage)(o, t), i.Wistia._localStorage
                }
        },
        13: (t, e, n) => {
            n.d(e, {
                wlog: () => y
            });
            var i = n(3),
                r = n(14);

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
                for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
                return i
            }
            var s = {
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
                c = function() {},
                u = function(t) {
                    var e = this;
                    null == t && (t = {});
                    return e.error = function() {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return e.log(0, n)
                    }, e.warn = function() {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return e.log(1, n)
                    }, e.notice = function() {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return e.log(1, n)
                    }, e.info = function() {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return e.log(3, n)
                    }, e.debug = function() {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return e.log(4, n)
                    }, e.ctx = t, e.ctx.initializedAt || e.reset(), e
                },
                l = u.prototype;
            l.reset = function() {
                this.ctx.level = 0, this.ctx.grep = null, this.ctx.grepv = null, this.ctx.first1000LogLines = [], this.ctx.last1000LogLines = [], this.ctx.initializedAt = (new Date).getTime()
            }, l.setLevel = function(t) {
                var e = this.logFunc(3);
                null != s[t] ? (this.ctx.level = s[t], e('Log level set to "'.concat(t, '" (').concat(s[t], ")"))) : e('Unknown log level "'.concat(t, '"'))
            }, l.setGrep = function(t) {
                this.ctx.grep = t
            }, l.setGrepv = function(t) {
                this.ctx.grepv = t
            }, l.first1000LogLines = function() {
                return this.ctx.first1000LogLines
            }, l.last1000LogLines = function() {
                return this.ctx.last1000LogLines
            }, l.matchedGrep = function(t) {
                var e = !1;
                if (this.ctx.grep || this.ctx.grepv) {
                    for (var n = [], i = 0; i < t.length; i++) try {
                        var r = t[i];
                        n.push(r.toString && r.toString())
                    } catch (t) {
                        n.push("")
                    }
                    var o = n.join(" "),
                        a = !this.ctx.grep || o.match(this.ctx.grep),
                        s = !this.ctx.grepv || !o.match(this.ctx.grepv);
                    e = a && s
                } else e = !0;
                return e
            }, l.now = function() {
                return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now().toFixed(3) : Date.now ? Date.now() - this.ctx.initializedAt : (new Date).getTime() - this.ctx.initializedAt
            }, l.messagesToLogLine = function(t, e, n) {
                var i, r = [t, e];
                r = r.concat(n);
                try {
                    (i = r.join(" ") || "").length > 200 && (i = i.slice(0, 200))
                } catch (t) {
                    i = "could not serialize"
                }
                return i
            }, l.persistLine = function(t) {
                this.ctx.first1000LogLines.length < 1e3 ? this.ctx.first1000LogLines.push(t) : (this.ctx.last1000LogLines.length >= 1e3 && this.ctx.last1000LogLines.shift(), this.ctx.last1000LogLines.push(t))
            }, l.log = function(t, e) {
                var n, i = t <= this.ctx.level,
                    a = t < 4,
                    s = (i || a) && this.matchedGrep(e);
                if (0 === t && (0, r.globalTrigger)("problem", {
                        type: "error-logged",
                        data: {
                            messages: e
                        }
                    }), s && (i || a) && (n = this.now()), a && s) {
                    var c = this.messagesToLogLine(t, n, e);
                    this.persistLine(c)
                }
                if (i && s) {
                    var u, l = this.logFunc(t);
                    1 === e.length && (u = e[0]) instanceof Error ? (l(u.message), u.stack && l(u.stack)) : l.apply(void 0, o(e))
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
                h = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.info.apply(console, e)
                },
                d = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    console.debug.apply(console, e)
                },
                v = function(t) {
                    console.log.apply(console, t)
                };
            l.logFunc = function(t) {
                return null == t && (t = this.level), console ? (0 === t ? e = f : 1 === t ? e = p : 3 === t ? e = h : 4 === t && (e = d), e || (e = v), "function" != typeof e && (this.noConsoleLog = !0, e = c), e) : c;
                var e
            }, l.maybePrefix = function(t, e) {
                if (t) {
                    if ("function" == typeof t) try {
                        t = t()
                    } catch (e) {
                        t = 'prefix err "'.concat(e.message, '"')
                    }
                    return t instanceof Array ? t.concat(e) : [t].concat(e)
                }
                return e
            }, l.getPrefixedFunctions = function(t) {
                var e = this;
                return {
                    log: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(0, e.maybePrefix(t, i))
                    },
                    error: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(0, e.maybePrefix(t, i))
                    },
                    warn: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(1, e.maybePrefix(t, i))
                    },
                    notice: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(1, e.maybePrefix(t, i))
                    },
                    info: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(3, e.maybePrefix(t, i))
                    },
                    debug: function() {
                        for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
                        return e.log(4, e.maybePrefix(t, i))
                    }
                }
            }, i.Wistia && null == i.Wistia.wlogCtx && (i.Wistia.wlogCtx = {});
            var y = new u(i.Wistia.wlogCtx)
        },
        3: (t, e, n) => {
            n.d(e, {
                Wistia: () => o
            });
            var i = n(4),
                r = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };
            null == i.root.Wistia && (i.root.Wistia = {});
            var o = i.root.Wistia;
            null == o._initializers && (o._initializers = {}), null == o._destructors && (o._destructors = {}), null == o.mixin && (o.mixin = function(t, e) {
                for (var n in e) r(e, n) && (t[n] = e[n])
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
var __webpack_exports__ = {},
    _embeds_media_players_vulcanV2Player_video_controls_CaptionsButtonControl_CaptionsButtonControl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(422),
    _embeds_media_players_vulcanV2Player_video_controls_CaptionsControl_CaptionsControl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(429),
    _embeds_media_players_vulcanV2Player_video_controls_TranscriptControl_TranscriptControl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(431),
    _embeds_media_players_vulcanV2Player_video_plugins_captions_captions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(437);
//# sourceMappingURL=captions.js.map