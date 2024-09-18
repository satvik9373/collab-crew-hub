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
        71: (t, e, i) => {
            i.d(e, {
                flexibleDuration: () => r
            });
            i(72), i(27);
            var n = function(t) {
                    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = "".concat(t); i.length < e;) i = "0".concat(i);
                    return i
                },
                o = function(t, e) {
                    var i = 0,
                        n = 0,
                        o = 0,
                        r = t,
                        s = e.includes("h"),
                        a = e.includes("m");
                    return s && r > 0 && (i += Math.floor(r / 3600), r %= 3600), a && r > 0 && (n += Math.floor(r / 60), r %= 60), o = Math.round(r), s && 60 === n && (i += 1, n = 0), a && 60 === o && (n += 1, o = 0), {
                        hours: i,
                        minutes: n,
                        seconds: o
                    }
                },
                r = function(t) {
                    var e = o(t, "hms"),
                        i = e.hours,
                        r = e.minutes,
                        s = e.seconds;
                    return 0 === i ? "".concat(r, ":").concat(n(s, 2)) : "".concat(i, ":").concat(n(r, 2), ":").concat(n(s, 2))
                }
        },
        12: (t, e, i) => {
            i.d(e, {
                hasPerformanceMeasureSupport: () => n
            });
            var n = function() {
                var t = window.performance;
                return Boolean(t) && Boolean(t.measure)
            }
        },
        72: (t, e) => {
            e.toSeconds = e.end = e.parse = e.pattern = void 0;
            var i = "\\d+",
                n = "".concat(i, "(?:[\\.,]").concat(i, ")?"),
                o = "(".concat(i, "Y)?(").concat(i, "M)?(").concat(i, "W)?(").concat(i, "D)?"),
                r = "T(".concat(n, "H)?(").concat(n, "M)?(").concat(n, "S)?"),
                s = "P(?:".concat(o, "(?:").concat(r, ")?)"),
                a = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"],
                l = Object.freeze({
                    years: 0,
                    months: 0,
                    weeks: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            e.pattern = new RegExp(s);
            e.parse = function(t) {
                var i = t.replace(/,/g, ".").match(e.pattern);
                if (!i) throw new RangeError("invalid duration: ".concat(t));
                var n = i.slice(1);
                if (0 === n.filter((function(t) {
                        return null != t
                    })).length) throw new RangeError("invalid duration: ".concat(t));
                if (n.filter((function(t) {
                        return /\./.test(t || "")
                    })).length > 1) throw new RangeError("only the smallest unit can be fractional");
                return n.reduce((function(t, e, i) {
                    return t[a[i]] = parseFloat(e || "0") || 0, t
                }), {})
            };
            e.end = function(t, e) {
                void 0 === e && (e = new Date);
                var i = Object.assign({}, l, t),
                    n = e.getTime(),
                    o = new Date(n);
                o.setFullYear(o.getFullYear() + i.years), o.setMonth(o.getMonth() + i.months), o.setDate(o.getDate() + i.days);
                var r = 3600 * i.hours * 1e3,
                    s = 60 * i.minutes * 1e3;
                return o.setMilliseconds(o.getMilliseconds() + 1e3 * i.seconds + r + s), o.setDate(o.getDate() + 7 * i.weeks), o
            };
            e.toSeconds = function(t, i) {
                void 0 === i && (i = new Date);
                var n = Object.assign({}, l, t),
                    o = i.getTime(),
                    r = new Date(o),
                    s = (0, e.end)(n, r),
                    a = 60 * (i.getTimezoneOffset() - s.getTimezoneOffset());
                return (s.getTime() - r.getTime()) / 1e3 + a
            }, e.end, e.toSeconds, e.pattern, e.parse
        },
        23: (t, e, i) => {
            i.d(e, {
                appHostname: () => n
            });
            var n = function() {
                return "".concat(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "app", ".").concat("wistia.com")
            }
        },
        701: (t, e, i) => {
            i.r(e);
            var n = i(76),
                o = i(5),
                r = i(67),
                s = i(24),
                a = i(6);

            function l(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, u(n.key), n)
                }
            }

            function u(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var i = t[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var n = i.call(t, e || "default");
                        if ("object" != typeof n) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }! function(t) {
                if (!t.BigPlayButton) t.BigPlayButton = function() {
                    return e = function t(e, i) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this.getBottomTextElemProps = this.getBottomTextElemProps.bind(this), this.focus = this.focus.bind(this), this.keyup = this.keyup.bind(this), this.blur = this.blur.bind(this), this.mouseover = this.mouseover.bind(this), this.mouseout = this.mouseout.bind(this), this.mousedown = this.mousedown.bind(this), this.mouseup = this.mouseup.bind(this), this.click = this.click.bind(this), this.touchstart = this.touchstart.bind(this), this.touchmove = this.touchmove.bind(this), this.touchend = this.touchend.bind(this), this.container = e, null == i && (i = {}), this.options = this.getDefaultOptions(i), this.uuid = "".concat(this.options.uuid, ".big_play_button"), this.color(this.options.color), this.backgroundElem = this.createBackgroundElem(), this.resetBackground(), this.elem = this.playElem = this.createPlayElem(), this.addTopText(), this.addBottomText(), (0, o.elemAppend)(this.container, this.backgroundElem), (0, o.elemAppend)(this.container, this.playElem), this.setupBindings()
                    }, i = [{
                        key: "destroy",
                        value: function() {
                            return this.destroyBindings(), (0, o.elemRemove)(this.playElem), (0, o.elemRemove)(this.backgroundElem), this._bottomTextElem && (0, o.elemRemove)(this._bottomTextElem), this._topTextElem && (0, o.elemRemove)(this._topTextElem), this.elem = null, this.backgroundElem = null, this.playElem = null, this._bottomTextElem = null, this._topTextElem = null
                        }
                    }, {
                        key: "getDefaultOptions",
                        value: function(t) {
                            var e = {
                                tabbable: !0,
                                uuid: (0, s.seqId)(),
                                color: "636155",
                                borderRadius: 0,
                                bottomTextColor: "#fff",
                                bottomTextFontFamily: "Courier New, Courier, Sans-Serif",
                                bottomTextBackground: "none",
                                bottomTextInsideButton: !1,
                                topTextColor: "#fff",
                                topTextFontFamily: "Courier New, Courier, Sans-Serif",
                                topTextBackground: "none",
                                widthCorrection: 0,
                                heightCorrection: 0
                            };
                            return (0, a.merge)(e, t)
                        }
                    }, {
                        key: "createBackgroundElem",
                        value: function() {
                            return (0, o.elemFromObject)({
                                id: "".concat(this.uuid, "_background"),
                                style: {
                                    borderRadius: "".concat(this.options.borderRadius, "px"),
                                    height: "".concat(this.height(), "px"),
                                    position: "absolute",
                                    width: "".concat(this.width(), "px"),
                                    zIndex: 1
                                }
                            })
                        }
                    }, {
                        key: "createPlayElem",
                        value: function() {
                            var t = this.options.newRoundedIcons ? this.svgBackgroundPlayIcon() : this.iconBase64();
                            return (0, o.elemFromObject)({
                                id: "".concat(this.uuid, "_graphic"),
                                tabindex: this.options.tabbable ? "0" : "-1",
                                role: "button",
                                "aria-label": "Play",
                                style: {
                                    background: "transparent url(".concat(t, ") no-repeat 0 0"),
                                    cursor: "pointer",
                                    display: "block",
                                    height: "".concat(this.graphicHeight(), "px"),
                                    outline: "none",
                                    position: "absolute",
                                    width: "".concat(this.graphicWidth(), "px"),
                                    zIndex: 1
                                }
                            })
                        }
                    }, {
                        key: "createBottomTextElem",
                        value: function() {
                            return (0, o.elemFromObject)({
                                id: "".concat(this.uuid, "_bottom_text"),
                                style: this.getBottomTextElemProps(),
                                childNodes: this.options.bottomText
                            })
                        }
                    }, {
                        key: "getBottomTextElemProps",
                        value: function() {
                            var t = {
                                color: this.options.bottomTextColor,
                                fontFamily: this.options.bottomTextFontFamily,
                                fontSize: this.textFontSize(),
                                background: this.options.bottomTextBackground,
                                left: 0,
                                position: "absolute",
                                textAlign: "center",
                                width: "100%",
                                zIndex: 1
                            };
                            if (this.options.bottomTextInsideButton) {
                                var e = "".concat(30, "px");
                                t.lineHeight = e, t.bottom = "-".concat(e)
                            }
                            return t
                        }
                    }, {
                        key: "createTopTextElem",
                        value: function() {
                            return (0, o.elemFromObject)({
                                id: "".concat(this.uuid, "_top_text"),
                                style: {
                                    color: this.options.topTextColor,
                                    fontFamily: this.options.topTextFontFamily,
                                    background: this.options.topTextBackground,
                                    fontSize: this.textFontSize(),
                                    left: 0,
                                    position: "absolute",
                                    textAlign: "center",
                                    width: "100%",
                                    zIndex: 1
                                },
                                childNodes: this.options.topText
                            })
                        }
                    }, {
                        key: "textFontSize",
                        value: function() {
                            return this.options.bottomTextInsideButton ? "18px" : this.height() < 100 ? "11px" : this.shouldShrink() ? "16px" : "22px"
                        }
                    }, {
                        key: "setupBindings",
                        value: function() {
                            return (0, o.elemBind)(this.playElem, "mouseover", this.mouseover), (0, o.elemBind)(this.playElem, "mouseout", this.mouseout), (0, o.elemBind)(this.playElem, "focus", this.focus), (0, o.elemBind)(this.playElem, "blur", this.blur), (0, o.elemBind)(this.playElem, "mousedown", this.mousedown), (0, o.elemBind)(this.playElem, "mouseup", this.mouseup), (0, o.elemBind)(this.playElem, "click", this.click), (0, o.elemBind)(this.playElem, "touchstart", this.touchstart)
                        }
                    }, {
                        key: "destroyBindings",
                        value: function() {
                            return (0, o.elemUnbind)(this.playElem, "mouseover", this.mouseover), (0, o.elemUnbind)(this.playElem, "mouseout", this.mouseout), (0, o.elemUnbind)(this.playElem, "focus", this.focus), (0, o.elemUnbind)(this.playElem, "blur", this.blur), (0, o.elemUnbind)(this.playElem, "mousedown", this.mousedown), (0, o.elemUnbind)(this.playElem, "mouseup", this.mouseup), (0, o.elemUnbind)(this.playElem, "click", this.click), (0, o.elemUnbind)(this.playElem, "touchstart", this.touchstart), (0, o.elemUnbind)(document, "touchmove", this.touchmove), (0, o.elemUnbind)(document, "touchend", this.touchend), (0, o.elemUnbind)(document, "keyup", this.keyup)
                        }
                    }, {
                        key: "focus",
                        value: function() {
                            var t;
                            return (0, o.elemAddClass)(this.playElem, "wistia_focus"), this.onMobile() || !1 === this.options.autoHighlight || this.highlightBackground(), (0, o.elemRebind)(document, "keyup", this.keyup), this._focus = !0, "function" == typeof this.options.onFocus && (t = this.options).onFocus.apply(t, arguments), !0
                        }
                    }, {
                        key: "keyup",
                        value: function(t) {
                            var e, i;
                            return "function" == typeof this.options.onKeyup && (e = this.options).onKeyup.apply(e, arguments), 32 !== t.keyCode && 13 !== t.keyCode || "function" == typeof this.options.onActivate && (i = this.options).onActivate.apply(i, arguments), !0
                        }
                    }, {
                        key: "blur",
                        value: function() {
                            var t;
                            return (0, o.elemUnbind)(this.playElem, "keyup", this.keyup), (0, o.elemRemoveClass)(this.playElem, "wistia_focus"), this.onMobile() || !1 === this.options.autoHighlight || this.resetBackground(), this._focus = !1, "function" == typeof this.options.onBlur && (t = this.options).onBlur.apply(t, arguments), !0
                        }
                    }, {
                        key: "mouseover",
                        value: function() {
                            var t;
                            return (0, o.elemAddClass)(this.playElem, "wistia_mouseover"), this.onMobile() || !1 === this.options.autoHighlight || this.highlightBackground(), "function" == typeof this.options.onMouseover && (t = this.options).onMouseover.apply(t, arguments), !0
                        }
                    }, {
                        key: "mouseout",
                        value: function() {
                            var t;
                            return (0, o.elemRemoveClass)(this.playElem, "wistia_mouseover"), this.onMobile() || !1 === this.options.autoHighlight || this.resetBackground(), "function" == typeof this.options.onMouseout && (t = this.options).onMouseout.apply(t, arguments), !0
                        }
                    }, {
                        key: "mousedown",
                        value: function() {
                            var t;
                            return (0, o.elemAddClass)(this.playElem, "wistia_mousedown"), "function" == typeof this.options.onMousedown && (t = this.options).onMousedown.apply(t, arguments), !0
                        }
                    }, {
                        key: "mouseup",
                        value: function() {
                            var t;
                            return (0, o.elemRemoveClass)(this.playElem, "wistia_mousedown"), "function" == typeof this.options.onMouseup && (t = this.options).onMouseup.apply(t, arguments), !0
                        }
                    }, {
                        key: "click",
                        value: function() {
                            var t, e;
                            return "function" == typeof this.options.onClick && (t = this.options).onClick.apply(t, arguments), this._blockClickActivate || "function" == typeof this.options.onActivate && (e = this.options).onActivate.apply(e, arguments), !0
                        }
                    }, {
                        key: "touchstart",
                        value: function() {
                            var t;
                            return (this.onMobile() || !1 === this.options.autoHighlight) && this.highlightBackground(), "function" == typeof this.options.onTouchstart && (t = this.options).onTouchstart.apply(t, arguments), this._swiped = !1, (0, o.elemBind)(document, "touchmove", this.touchmove), (0, o.elemBind)(document, "touchend", this.touchend), !0
                        }
                    }, {
                        key: "touchmove",
                        value: function() {
                            var t;
                            return this._highlighted && this.onMobile() && !1 !== this.options.autoHighlight && this.resetBackground(), this._swiped = !0, "function" == typeof this.options.onTouchmove && (t = this.options).onTouchmove.apply(t, arguments), !0
                        }
                    }, {
                        key: "touchend",
                        value: function() {
                            var t, e;
                            ((0, o.elemUnbind)(document, "touchmove", this.touchmove), (0, o.elemUnbind)(document, "touchend", this.touchend), this.onMobile() && !1 !== this.options.autoHighlight && this.resetBackground(), "function" == typeof this.options.onTouchend && (t = this.options).onTouchend.apply(t, arguments), this._swiped) || ("function" == typeof this.options.onActivate && (e = this.options).onActivate.apply(e, arguments), this.blockClickActivateTemporarily());
                            return this._swiped = !1, !0
                        }
                    }, {
                        key: "onMobile",
                        value: function() {
                            return t.detect.iphone || t.detect.ipad || t.detect.android
                        }
                    }, {
                        key: "blockClickActivateTemporarily",
                        value: function() {
                            var t = this;
                            return this._blockClickActivate = !0, (0, r.doTimeout)("".concat(this.uuid, ".block_click_activate"), (function() {
                                return t._blockClickActivate = !1
                            }), 350)
                        }
                    }, {
                        key: "highlightBackground",
                        value: function() {
                            return this._highlighted = !0, this.backgroundElem.style.backgroundColor = this.highlightColor().alpha(.8).toRgbaOrHex()
                        }
                    }, {
                        key: "resetBackground",
                        value: function() {
                            return this._highlighted = !1, this.backgroundElem.style.backgroundColor = this.color().alpha(.8).toRgbaOrHex()
                        }
                    }, {
                        key: "fit",
                        value: function() {
                            (0, o.elemStyle)(this.backgroundElem, {
                                height: "".concat(this.height(), "px"),
                                width: "".concat(this.width(), "px")
                            });
                            var t = this.options.newRoundedIcons ? this.svgBackgroundPlayIcon() : this.iconBase64();
                            return (0, o.elemStyle)(this.playElem, {
                                backgroundImage: "url(".concat(t, ")"),
                                backgroundSize: "".concat(this.graphicWidth(), "px ").concat(this.graphicHeight(), "px"),
                                height: "".concat(this.graphicHeight(), "px"),
                                width: "".concat(this.graphicWidth(), "px")
                            }), this._bottomTextElem && (0, o.elemStyle)(this._bottomTextElem, {
                                fontSize: this.textFontSize()
                            }), this._topTextElem && (0, o.elemStyle)(this._topTextElem, {
                                fontSize: this.textFontSize()
                            }), this.center()
                        }
                    }, {
                        key: "show",
                        value: function() {
                            return this.fit(), (0, o.elemStyle)([this.backgroundElem, this.playElem], {
                                display: "block"
                            })
                        }
                    }, {
                        key: "hide",
                        value: function() {
                            return (0, o.elemStyle)([this.backgroundElem, this.playElem], {
                                display: "none"
                            })
                        }
                    }, {
                        key: "correctedWidth",
                        value: function() {
                            var t = this.containerWidth();
                            return t += this.options.widthCorrection
                        }
                    }, {
                        key: "correctedHeight",
                        value: function() {
                            var t = this.containerHeight();
                            return t += this.options.heightCorrection
                        }
                    }, {
                        key: "mouseEventTargetIsInside",
                        value: function(t) {
                            return (0, o.elemIsInside)(t.target, this.playElem) || this._bottomTextElem && (0, o.elemIsInside)(t.target, this._bottomTextElem) || this._topTextElem && (0, o.elemIsInside)(t.target, this._topTextElem)
                        }
                    }, {
                        key: "center",
                        value: function() {
                            if ((0, o.elemStyle)(this.backgroundElem, {
                                    left: "".concat(this.leftBackgroundOffset(), "px"),
                                    top: "".concat(this.topBackgroundOffset(), "px")
                                }), (0, o.elemStyle)(this.playElem, {
                                    left: "".concat(this.leftGraphicOffset(), "px"),
                                    top: "".concat(this.topGraphicOffset(), "px")
                                }), this._bottomTextElem && !this.options.bottomTextInsideButton && (0, o.elemStyle)(this._bottomTextElem, {
                                    left: 0,
                                    top: "".concat(this.bottomGraphicOffset() + 3, "px")
                                }), this._topTextElem) return (0, o.elemStyle)(this._topTextElem, {
                                bottom: "".concat(this.bottomGraphicOffset() + 3, "px"),
                                left: 0
                            })
                        }
                    }, {
                        key: "leftBackgroundOffset",
                        value: function() {
                            return Math.round((this.correctedWidth() - this.width()) / 2)
                        }
                    }, {
                        key: "topBackgroundOffset",
                        value: function() {
                            return Math.round((this.correctedHeight() - this.height()) / 2)
                        }
                    }, {
                        key: "topGraphicOffset",
                        value: function() {
                            return Math.round((this.correctedHeight() - this.graphicHeight()) / 2)
                        }
                    }, {
                        key: "leftGraphicOffset",
                        value: function() {
                            return Math.round((this.correctedWidth() - this.graphicWidth()) / 2)
                        }
                    }, {
                        key: "rightGraphicOffset",
                        value: function() {
                            return this.leftGraphicOffset() + this.graphicWidth()
                        }
                    }, {
                        key: "bottomGraphicOffset",
                        value: function() {
                            return this.topGraphicOffset() + this.graphicHeight()
                        }
                    }, {
                        key: "containerWidth",
                        value: function() {
                            return (0, o.elemWidth)(this.container)
                        }
                    }, {
                        key: "containerHeight",
                        value: function() {
                            return (0, o.elemHeight)(this.container)
                        }
                    }, {
                        key: "shouldShrink",
                        value: function() {
                            return this.containerWidth() <= 320 || this.containerHeight() <= 200
                        }
                    }, {
                        key: "graphicWidth",
                        value: function() {
                            return this.shouldShrink() ? 60 : 127
                        }
                    }, {
                        key: "graphicHeight",
                        value: function() {
                            return this.shouldShrink() ? 38 : 81
                        }
                    }, {
                        key: "width",
                        value: function() {
                            return this._cover ? this.containerWidth() : this.graphicWidth()
                        }
                    }, {
                        key: "height",
                        value: function() {
                            return this._cover ? this.containerHeight() : this.graphicHeight()
                        }
                    }, {
                        key: "cover",
                        value: function() {
                            return this._cover = !0, this.supportsMultiply() ? ((0, o.elemStyle)(this.backgroundElem, {
                                mixBlendMode: "multiply"
                            }), this.color(this.color(), .5)) : this.color(this.color(), .3), this.addBottomText(), this.addTopText(), this.fit()
                        }
                    }, {
                        key: "uncover",
                        value: function() {
                            return this._cover = !1, this.supportsMultiply() && (0, o.elemStyle)(this.backgroundElem, {
                                mixBlendMode: "normal"
                            }), this.color(this.color(), .76), this.removeBottomText(), this.removeTopText(), this.fit()
                        }
                    }, {
                        key: "addBottomText",
                        value: function() {
                            if (this.options.bottomText && !this._bottomTextElem) {
                                var t = this.options.bottomTextInsideButton ? this.playElem : this.container;
                                return this.removeBottomText(), this._bottomTextElem = this.createBottomTextElem(), (0, o.elemAppend)(t, this._bottomTextElem)
                            }
                        }
                    }, {
                        key: "addBottomTextFromNewOptions",
                        value: function(t) {
                            return this.options = (0, a.merge)(this.options, t), this.removeBottomText(), this.addBottomText()
                        }
                    }, {
                        key: "removeBottomText",
                        value: function() {
                            if (this._bottomTextElem) return (0, o.elemRemove)(this._bottomTextElem), this._bottomTextElem = null
                        }
                    }, {
                        key: "addTopText",
                        value: function() {
                            if (this.options.topText && !this._topTextElem) return this.removeTopText(), this._topTextElem = this.createTopTextElem(), (0, o.elemAppend)(this.container, this._topTextElem)
                        }
                    }, {
                        key: "removeTopText",
                        value: function() {
                            if (this._topTextElem) return (0, o.elemRemove)(this._topTextElem), this._topTextElem = null
                        }
                    }, {
                        key: "setBorderRadius",
                        value: function(t) {
                            (0, o.elemStyle)(this.backgroundElem, {
                                borderRadius: "".concat(t, "px")
                            })
                        }
                    }, {
                        key: "uncoverImmediately",
                        value: function() {
                            var t = this;
                            return (0, o.elemStyle)(this.backgroundElem, {
                                transition: "none"
                            }), requestAnimationFrame((function() {
                                return t.uncover(), requestAnimationFrame((function() {
                                    return (0, o.elemStyle)(t.backgroundElem, {
                                        transition: "all 80ms ease-out"
                                    })
                                }))
                            }))
                        }
                    }, {
                        key: "supportsMultiply",
                        value: function() {
                            return t.detect.chrome || t.detect.safari
                        }
                    }, {
                        key: "color",
                        value: function(t, e) {
                            return null == e && (e = .8), null != t ? (this._color = new n.Color(t).alpha(e), null != this.backgroundElem && (this.backgroundElem.style.backgroundColor = this._color.toRgbaOrHex()), this._color) : this._color.clone()
                        }
                    }, {
                        key: "highlightColor",
                        value: function() {
                            return this.color().clone().lighten(40)
                        }
                    }, {
                        key: "iconBase64",
                        value: function() {
                            return window.devicePixelRatio > 1 ? this.retinaBase64() : this.shouldShrink() ? this.smallNonRetinaBase64() : this.bigNonRetinaBase64()
                        }
                    }, {
                        key: "svgBackgroundPlayIcon",
                        value: function() {
                            var t = encodeURIComponent(' <svg width="254" height="162" xmlns="http://www.w3.org/2000/svg"> <path clip-rule="evenodd" d="m106.06,44.61c-3.05,-2.12 -7.21,0.08 -7.21,3.79l0,65.2c0,3.73 4.16,5.91 7.21,3.79l47.1,-32.63c2.65,-1.82 2.65,-5.72 0,-7.54l-47.1,-32.63l0,0.02l0,-0.01z" fill="white" fill-rule="evenodd"/></svg>');
                            return "data:image/svg+xml;utf8,".concat(t)
                        }
                    }, {
                        key: "retinaBase64",
                        value: function() {
                            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAACiCAYAAABh2nDdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAulJREFUeNrs3d1tGlEQBtAlSgEpgXSAO8AdxB2QDuwONhWQDpxUAB14OyAdmA5IB+SOvDdCSHnLn/WdI91XP4z1aYY77DIMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAvnc/nQzsrlYCs4JdTOxvVgKzgd7t23qkKZAW/PLezVhnICn43qg7kBb88tbNUJcgKfr/4+6BSkBX8buviD/KCf7bzh8zgd/cqB3nBt/OH0OD3i7+1KkJW8O38ITj4/eJvqaKQFXw7fwgNfvfo4i/PQgleV/D/0J8+tnO3WCy+qXKGN0pAU5/3D3b+Oj5ZHf/SNHf/7yqu45Nj3Y7n/AWfQHXZV4/5bpXCqE/GqH+tLvw+uvjT8cmymrv/Ril0fHI6/qX93P1d/Ak+QcEvx8HO36hPnOXwsvMflULHJ6fjX5oGO38dnzjr4WXn72EfwSdM7fx3XvBp1Cdn1L9m56/jE6jv/D3so+MT1PEv2fnr+ASqC7+Dh30EnzzLefQflcKoT8aof60u/Grnf/Sf1PHJsZpHfzt/wSfMz52/Ugg+WWrk/6oMgk+OL+3c+oLPv/dWCfgLapdfO/29Uuj4ZJjauRF6wSfHpxb4Wys8oz4ZjvNoPymFjk+G/TzaC73gE6Au8B5a4L2Rx6hPCM/h6/iE+dwCfyP0Oj45o73dvOATZBq8XdeoT5S+mxd6HZ8Ax8Ev6Oj4ROm7eaEXfAL0Czyf5436hPCqLB2fMH03L/Q6PiGj/Z3v2ev45Kiwvxd6wSfHg908/KfOv1+97nqlspAT/Ec/aw05wT/5UQvICn6N9kuVhJzgjyoIOcE/+alqyAr+zgUe5AS/uvy9ikFO8O3mISz4W6M95ATfbh7Cgv9kNw9ZwR9VBXKC/+wCD7KCbzcPYcHfqAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvE4/BBgAB9Vp0xXzB8AAAAAASUVORK5CYII="
                        }
                    }, {
                        key: "bigNonRetinaBase64",
                        value: function() {
                            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAABRCAYAAAD7G3lVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATFJREFUeNrs22FtwkAYx+F2QcAkMAfgYBKQwBxMQh1MwiRQB+CgEoaDzkG5S1a+E5IF+n+e5D4ve3+7N0s4mgYAAAAAAAAAAAAA7jFN06cp5MavjuWsTSMzfjWWszORzPizQzmvJpMZ3xYIj28LiG8LpMeffdsCufGrn3LeTS0z/uzLFsiNbwuEx7cFxL9ugY1pZsafdSaaG78abIHc+LaA+MvbAi/+XG5Sww9L2QLtEm/+P/2oUzkfbduexc+LX51L/DdrP09fzvaZf4GVhjf7/Vv3vVFk/bfvMUhg/PoAZG+6efE9Aw+MP/oCSGZ8tz0wvtseGn9w2zPjdyaXF99n9aHx3fbA+G57aHy3PTC+N/mh8b3DD4zvtofGd9tD47vtAAAAAAAAAAAAADymiwADAOSj1JBfF8xMAAAAAElFTkSuQmCC"
                        }
                    }, {
                        key: "smallNonRetinaBase64",
                        value: function() {
                            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAmCAYAAACYsfiPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJNJREFUeNrs1ksNhEAURNGWgAQkjAQkIAUJ7QApIwEJSEACEh6PBatJhmZJ1T1JCahU+lMKAACAioj4Zjqnwqc9MzoVvszya8evLTM4FdZeO/7TWzva6Kwd7dbMx6nwpboV3l99rh+WXV5/lh+sOrlcWueqvcOzpLNqQ2GtVW8KT0WZ3MeisXAtLixWBQAAQDoEGACTzSwy3SX7YgAAAABJRU5ErkJggg=="
                        }
                    }], i && l(e.prototype, i), u && l(e, u), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e;
                    var e, i, u
                }()
            }(window.Wistia)
        },
        702: (t, e, i) => {
            i.r(e);
            var n = i(21),
                o = i(6),
                r = i(5),
                s = i(67),
                a = i(24),
                l = i(43),
                u = i(76);

            function c(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, h(n.key), n)
                }
            }

            function h(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var i = t[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var n = i.call(t, e || "default");
                        if ("object" != typeof n) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }! function(t) {
                if (!t.Thumbnail) t.Thumbnail = function() {
                    return e = function e(i, s) {
                        var l, u;
                        if (function(t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.focus = this.focus.bind(this), this.keyup = this.keyup.bind(this), this.blur = this.blur.bind(this), this.mouseover = this.mouseover.bind(this), this.mouseout = this.mouseout.bind(this), this.mousedown = this.mousedown.bind(this), this.mouseup = this.mouseup.bind(this), this.click = this.click.bind(this), this.touchstart = this.touchstart.bind(this), this.touchmove = this.touchmove.bind(this), this.touchend = this.touchend.bind(this), this.showOverlay = this.showOverlay.bind(this), this.hideOverlay = this.hideOverlay.bind(this), this.container = i, this.options = s, this.uuid = "".concat(this.options.uuid || (0, a.seqId)(), ".thumbnail"), null == this.options.tabbable && (this.options.tabbable = !0), (null === (l = this.options.images) || void 0 === l ? void 0 : l.length) > 0 || (u = "http:" === (0, n.eV1Protocol)() ? "http://embed.wistia.com/deliveries/c0612aa8586d19f8471478c66c73ef7ab3f8e334/default-thumb.jpg" : "https://embed-ssl.wistia.com/deliveries/c0612aa8586d19f8471478c66c73ef7ab3f8e334/default-thumb.jpg", this.options.images = [{
                                url: u,
                                height: 360,
                                width: 640
                            }]), this.elem = this.createElem(), this.options.prepend ? (0, r.elemPrepend)(this.container, this.elem) : (0, r.elemAppend)(this.container, this.elem), this.img = this.createImg(), this.overlay = this.createOverlay(), this.focusIndicator = this.createFocusIndicator(), (0, r.elemAppend)(this.elem, this.focusIndicator), this.fit(), this.setupBindings(), this.options.delayInit) {
                            var c = this.bestImage();
                            this.quickPreload(c.url)
                        } else this.initialize();
                        if (null != this.options.bigPlayButton && !1 !== this.options.bigPlayButton) {
                            var h = (0, o.isObject)(this.options.bigPlayButton) ? (0, o.clone)(this.options.bigPlayButton) : {};
                            this.bigPlayButton = new t.BigPlayButton(this.elem, h)
                        }
                    }, i = [{
                        key: "initialize",
                        value: function() {
                            return this.isBakeryThumbnail() ? this.loadImageFirstTime() : this.loadImageFirstTimeAndGetDimensions()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            var t;
                            return null === (t = this.bigPlayButton) || void 0 === t || t.destroy(), this.destroyBindings(), (0, r.elemRemove)(this.elem), this.elem = this.img = this.overlay = this.focusIndicator = null
                        }
                    }, {
                        key: "preventDefault",
                        value: function(t) {
                            return t.preventDefault()
                        }
                    }, {
                        key: "setupBindings",
                        value: function() {
                            return (0, r.elemBind)(this.elem, "mouseover", this.mouseover), (0, r.elemBind)(this.elem, "mouseout", this.mouseout), (0, r.elemBind)(this.elem, "focus", this.focus), (0, r.elemBind)(this.elem, "blur", this.blur), (0, r.elemBind)(this.elem, "mousedown", this.mousedown), (0, r.elemBind)(this.elem, "mouseup", this.mouseup), (0, r.elemBind)(this.elem, "click", this.click), (0, r.elemBind)(this.elem, "touchstart", this.touchstart), (0, r.elemBind)(this.img, "mousedown", this.preventDefault)
                        }
                    }, {
                        key: "destroyBindings",
                        value: function() {
                            return (0, r.elemUnbind)(this.elem, "mouseover", this.mouseover), (0, r.elemUnbind)(this.elem, "mouseout", this.mouseout), (0, r.elemUnbind)(this.elem, "focus", this.focus), (0, r.elemUnbind)(this.elem, "blur", this.blur), (0, r.elemUnbind)(this.elem, "mousedown", this.mousedown), (0, r.elemUnbind)(this.elem, "mouseup", this.mouseup), (0, r.elemUnbind)(this.elem, "click", this.click), (0, r.elemUnbind)(this.elem, "touchstart", this.touchstart), (0, r.elemUnbind)(this.img, "mousedown", this.preventDefault), (0, r.elemUnbind)(document, "touchmove", this.touchmove), (0, r.elemUnbind)(document, "touchend", this.touchend), (0, r.elemUnbind)(document, "keyup", this.keyup)
                        }
                    }, {
                        key: "focus",
                        value: function() {
                            var t, e;
                            return (0, r.elemAddClass)(this.elem, "wistia_focus"), this.options.tabbable && !(0, l.isMouseDownRecently)() && (this.focusIndicator.style.boxShadow = "0 0 0 2px #fff inset"), (0, r.elemRebind)(document, "keyup", this.keyup), this._focus = !0, null === (t = (e = this.options).onFocus) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "keyup",
                        value: function(t) {
                            var e, i, n, o;
                            return null === (e = (i = this.options).onKeyup) || void 0 === e || e.call.apply(e, [i].concat(Array.prototype.slice.call(arguments))), (32 === t.keyCode || 13 === t.keyCode) && (null === (n = (o = this.options).onActivate) || void 0 === n || n.call.apply(n, [o].concat(Array.prototype.slice.call(arguments)))), !0
                        }
                    }, {
                        key: "blur",
                        value: function() {
                            var t, e;
                            return (0, r.elemUnbind)(document, "keyup", this.keyup), (0, r.elemRemoveClass)(this.elem, "wistia_focus"), this.focusIndicator.style.boxShadow = "none", this._focus = !1, null === (t = (e = this.options).onBlur) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "mouseover",
                        value: function() {
                            var t, e;
                            return (0, r.elemAddClass)(this.elem, "wistia_mouseover"), null === (t = (e = this.options).onMouseover) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "mouseout",
                        value: function() {
                            var t, e;
                            return (0, r.elemRemoveClass)(this.elem, "wistia_mouseover"), null === (t = (e = this.options).onMouseout) || void 0 === t ? void 0 : t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments)))
                        }
                    }, {
                        key: "mousedown",
                        value: function() {
                            var t, e;
                            return (0, r.elemAddClass)(this.elem, "wistia_mousedown"), null === (t = (e = this.options).onMousedown) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "mouseup",
                        value: function() {
                            var t, e;
                            return (0, r.elemRemoveClass)(this.elem, "wistia_mousedown"), null === (t = (e = this.options).onMouseup) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "click",
                        value: function() {
                            var t, e, i, n;
                            return null === (t = (e = this.options).onClick) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), this._blockClickActivate || this._swiped || null === (i = (n = this.options).onActivate) || void 0 === i || i.call.apply(i, [n].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "touchstart",
                        value: function() {
                            var t, e;
                            return null === (t = (e = this.options).onTouchstart) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), this._swiped = !1, (0, r.elemBind)(document, "touchmove", this.touchmove), (0, r.elemBind)(document, "touchend", this.touchend), !0
                        }
                    }, {
                        key: "touchmove",
                        value: function() {
                            var t, e;
                            return (0, s.doTimeout)("".concat(this.uuid, ".hide_overlay_later"), this.hideOverlay, 300), this._swiped = !0, null === (t = (e = this.options).onTouchmove) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), !0
                        }
                    }, {
                        key: "touchend",
                        value: function() {
                            var t, e, i, n;
                            return (0, r.elemUnbind)(document, "touchmove", this.touchmove), (0, r.elemUnbind)(document, "touchend", this.touchend), null === (t = (e = this.options).onTouchend) || void 0 === t || t.call.apply(t, [e].concat(Array.prototype.slice.call(arguments))), this._swiped || (null === (i = (n = this.options).onActivate) || void 0 === i || i.call.apply(i, [n].concat(Array.prototype.slice.call(arguments))), this.blockClickActivateTemporarily()), this._swiped = !1, !0
                        }
                    }, {
                        key: "blockClickActivateTemporarily",
                        value: function() {
                            var t = this;
                            return this._blockClickActivate = !0, (0, s.doTimeout)("".concat(this.uuid, ".block_click_activate"), (function() {
                                return t._blockClickActivate = !1
                            }), 350)
                        }
                    }, {
                        key: "hide",
                        value: function() {
                            return this.elem.style.display = "none"
                        }
                    }, {
                        key: "show",
                        value: function() {
                            return this.elem.style.display = "block"
                        }
                    }, {
                        key: "isBakeryThumbnail",
                        value: function() {
                            return !this.isNonBakeryThumbnail()
                        }
                    }, {
                        key: "isNonBakeryThumbnail",
                        value: function() {
                            return 1 === this.options.images.length && !t.Player.isBakeryUrl(this.options.images[0].url)
                        }
                    }, {
                        key: "bestImage",
                        value: function(t) {
                            null == t && (t = !1);
                            var e = this.sortedImages(),
                                i = Math.max((0, r.elemWidth)(this.img), (0, r.elemWidth)(this.container)),
                                n = (window.devicePixelRatio || 1) * i;
                            if (!t) {
                                if (n <= e[0].width) return e[0];
                                for (var o = 0, s = Array.from(e); o < s.length; o++) {
                                    var a = s[o];
                                    if (a.width >= n) return a
                                }
                            }
                            return e[e.length - 1]
                        }
                    }, {
                        key: "sortedImages",
                        value: function() {
                            var t = this;
                            return null != this._sortedImages ? this._sortedImages : this._sortedImages = function() {
                                for (var e = [], i = 0, n = Array.from(t.options.images.sort((function(t, e) {
                                        return t.width - e.width
                                    }))); i < n.length; i++) {
                                    var r = n[i],
                                        s = (0, o.clone)(r);
                                    s.aspect = s.width / s.height, e.push(s)
                                }
                                return e
                            }()
                        }
                    }, {
                        key: "quickPreload",
                        value: function(t) {
                            var e, i = this;
                            return null == this._quickPreloads && (this._quickPreloads = {}), this._quickPreloads[t] ? this._quickPreloads[t] : (this._quickPreloads[t] = e = new Promise((function(e) {
                                var n = new Image,
                                    o = function() {
                                        return (0, r.elemUnbind)(n, "load", o), (0, r.elemUnbind)(n, "error", o), (0, s.clearTimeouts)("".concat(i.uuid, ".long_still_load")), e(n)
                                    };
                                (0, r.elemBind)(n, "load", o), (0, r.elemBind)(n, "error", o), (0, s.doTimeout)("".concat(i.uuid, ".long_still_load"), o, 1e3), n.src = t, n.complete && o()
                            })), e)
                        }
                    }, {
                        key: "surePreload",
                        value: function(t, e) {
                            var i = this,
                                n = new Image,
                                o = function() {
                                    return (0, r.elemUnbind)(n, "load", o), (0, s.clearTimeouts)("".concat(i.uuid, ".long_still_load")), null == e ? void 0 : e(n)
                                };
                            return (0, r.elemBind)(n, "load", o), n.src = t
                        }
                    }, {
                        key: "loadImageFirstTimeAndGetDimensions",
                        value: function() {
                            var t = this,
                                e = this.bestImage();
                            return this.quickPreload(e.url).then((function(i) {
                                if ((0, r.elemStyle)(i, {
                                        visibility: "hidden",
                                        position: "absolute"
                                    }), (0, r.elemAppend)(document.body, i), t._customHeight = (0, r.elemHeight)(i), t._customWidth = (0, r.elemWidth)(i), t._customAspect = t._customWidth / t._customHeight, (0, r.elemRemove)(i), t._sortedImages = null, t.elem && t.img) return (0, r.elemAppend)(t.elem, t.img), t.img.src = e.url, t.fitWithoutReload()
                            }))
                        }
                    }, {
                        key: "loadImageFirstTime",
                        value: function() {
                            var t = this,
                                e = this.bestImage();
                            return this.quickPreload(e.url).then((function() {
                                if (t.elem && t.img) return (0, r.elemAppend)(t.elem, t.img), t.img.src = e.url, t.fitWithoutReload()
                            }))
                        }
                    }, {
                        key: "loadImageAtProperSize",
                        value: function() {
                            var t = this,
                                e = this.bestImage();
                            return this.surePreload(e.url, (function() {
                                if (t.elem && t.img) return t.img.src = e.url, t.fitWithoutReload()
                            }))
                        }
                    }, {
                        key: "createElem",
                        value: function() {
                            return (0, r.elemFromObject)({
                                id: this.uuid,
                                tabindex: this.options.tabbable ? "0" : "-1",
                                style: {
                                    cursor: "default",
                                    borderRadius: this.options.borderRadius ? "".concat(this.options.borderRadius, "px") : "0",
                                    display: "block",
                                    height: "100%",
                                    overflow: "hidden",
                                    outline: "none",
                                    position: "relative",
                                    width: "100%"
                                }
                            })
                        }
                    }, {
                        key: "createImg",
                        value: function() {
                            return (0, r.elemFromObject)({
                                tagName: "img",
                                id: "".concat(this.uuid, "_img"),
                                alt: this.getAltTextValue(),
                                style: {
                                    border: 0,
                                    display: "block",
                                    float: "none",
                                    height: "100%",
                                    margin: 0,
                                    maxHeight: "none",
                                    maxWidth: "none",
                                    padding: 0,
                                    pointerEvents: "none",
                                    position: "absolute",
                                    width: "100%"
                                }
                            })
                        }
                    }, {
                        key: "createFocusIndicator",
                        value: function() {
                            return (0, r.elemFromObject)({
                                id: "".concat(this.uuid, "_focus_indicator"),
                                style: {
                                    height: "100%",
                                    left: 0,
                                    pointerEvents: "none",
                                    position: "absolute",
                                    top: 0,
                                    width: "100%",
                                    zIndex: 1
                                }
                            })
                        }
                    }, {
                        key: "getAltTextValue",
                        value: function() {
                            return null != this.options.altText ? this.options.altText : "Wistia video thumbnail" + (null != this.options.name ? " - ".concat(this.options.name) : "")
                        }
                    }, {
                        key: "createOverlay",
                        value: function() {
                            var t = (0, r.elemFromObject)({
                                id: "".concat(this.uuid, "_overlay"),
                                style: {
                                    border: 0,
                                    display: "block",
                                    float: "none",
                                    height: "100%",
                                    margin: 0,
                                    maxWidth: "none",
                                    padding: 0,
                                    pointerEvents: "none",
                                    position: "absolute",
                                    width: "100%"
                                }
                            });
                            return (0, r.elemStyle)(t, {
                                backgroundColor: "rgba(0,0,0,.5)"
                            }), t
                        }
                    }, {
                        key: "showOverlay",
                        value: function() {
                            return (0, r.elemAppend)(this.elem, this.overlay)
                        }
                    }, {
                        key: "hideOverlay",
                        value: function() {
                            return (0, r.elemRemove)(this.overlay)
                        }
                    }, {
                        key: "containerWidth",
                        value: function() {
                            return (0, r.elemWidth)(this.container)
                        }
                    }, {
                        key: "containerHeight",
                        value: function() {
                            return (0, r.elemHeight)(this.container)
                        }
                    }, {
                        key: "containerAspect",
                        value: function() {
                            return this.containerWidth() / this.containerHeight()
                        }
                    }, {
                        key: "fitStrategy",
                        value: function(t) {
                            return null != t ? (this.options.fitStrategy = t, this.fit()) : /^cropfill|letterbox$/.test(this.options.fitStrategy) ? this.options.fitStrategy : "letterbox"
                        }
                    }, {
                        key: "fit",
                        value: function() {
                            return this.fitWithoutReload(), this.loadImageAtProperSize()
                        }
                    }, {
                        key: "fitWithoutReload",
                        value: function() {
                            var t;
                            return (0, r.elemStyle)(this.elem, {
                                height: "".concat(this.containerHeight(), "px"),
                                width: "".concat(this.containerWidth(), "px")
                            }), "cropfill" === this.fitStrategy() ? this.cropFillFit() : this.letterboxFit(), null === (t = this.bigPlayButton) || void 0 === t ? void 0 : t.fit()
                        }
                    }, {
                        key: "setBorderRadius",
                        value: function(t) {
                            (0, r.elemStyle)(this.elem, {
                                borderRadius: "".concat(t, "px")
                            })
                        }
                    }, {
                        key: "stretchLimit",
                        value: function() {
                            return null != this.options.stretchLimit ? this.options.stretchLimit : 10
                        }
                    }, {
                        key: "cropFillFit",
                        value: function() {
                            var t, e, i = this._customAspect || this.bestImage().aspect,
                                n = this.containerWidth(),
                                o = this.containerHeight(),
                                s = this.containerAspect();
                            !1 === this.options.stillSnap ? (e = n, t = o) : s > i ? (e = n, t = Math.round(e / i)) : s <= i && (t = o, e = Math.round(t * i));
                            var a = o - t,
                                l = n - e,
                                u = Math.round(a / 2),
                                c = Math.round(l / 2);
                            return Math.abs(2 * u) <= this.stretchLimit() && (u = 0, t = o), Math.abs(2 * c) <= this.stretchLimit() && (c = 0, e = n), (0, r.elemIsHidden)(this.elem) || !(0, r.elemInDom)(this.elem) ? ((0, r.elemStyle)(this.img, {
                                height: "100%",
                                width: "100%"
                            }), c = u = 0) : (0, r.elemStyle)(this.img, {
                                height: "".concat(t, "px"),
                                width: "".concat(e, "px")
                            }), (0, r.elemStyle)(this.img, {
                                border: 0,
                                left: "".concat(c, "px"),
                                top: "".concat(u, "px")
                            })
                        }
                    }, {
                        key: "letterboxFit",
                        value: function() {
                            var t, e, i, n, o = this._customAspect || this.bestImage().aspect,
                                s = this.containerWidth(),
                                a = this.containerHeight(),
                                l = this.containerAspect();
                            !1 === this.options.stillSnap ? (i = s, e = a) : l > o ? (e = a, i = Math.round(e * o)) : l <= o && (i = s, e = Math.round(i / o));
                            var c = Math.max(0, a - e),
                                h = Math.max(0, s - i),
                                d = t = Math.round(c / 2),
                                p = n = Math.round(h / 2);
                            2 * t <= this.stretchLimit() && (t = 0, d = 0, e = a), 2 * p <= this.stretchLimit() && (p = 0, n = 0, i = s);
                            var f = this.options.backgroundColor || "#000";
                            return "transparent" === f || new u.Color(f).alpha(.8).toRgbaOrHex(), (0, r.elemIsHidden)(this.elem) || !(0, r.elemInDom)(this.elem) ? ((0, r.elemStyle)(this.img, {
                                height: "100%",
                                width: "100%"
                            }), d = t = n = 0) : (0, r.elemStyle)(this.img, {
                                height: "".concat(e, "px"),
                                width: "".concat(i, "px")
                            }), (0, r.elemStyle)(this.img, {
                                borderTop: "".concat(d, "px solid ").concat(f),
                                borderBottom: "".concat(t, "px solid ").concat(f),
                                borderLeft: "".concat(p, "px solid ").concat(f),
                                borderRight: "".concat(n, "px solid ").concat(f),
                                left: 0,
                                top: 0
                            })
                        }
                    }], i && c(e.prototype, i), h && c(e, h), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e;
                    var e, i, h
                }()
            }(window.Wistia)
        },
        7: (t, e, i) => {},
        100: (t, e, i) => {
            i.d(e, {
                asyncChain: () => l
            });
            var n = i(96),
                o = i(13),
                r = i(67);

            function s(t, e) {
                var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!i) {
                    if (Array.isArray(t) || (i = function(t, e) {
                            if (t) {
                                if ("string" == typeof t) return a(t, e);
                                var i = {}.toString.call(t).slice(8, -1);
                                return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? a(t, e) : void 0
                            }
                        }(t)) || e && t && "number" == typeof t.length) {
                        i && (t = i);
                        var n = 0,
                            o = function() {};
                        return {
                            s: o,
                            n: function() {
                                return n >= t.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: t[n++]
                                }
                            },
                            e: function(t) {
                                throw t
                            },
                            f: o
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var r, s = !0,
                    l = !1;
                return {
                    s: function() {
                        i = i.call(t)
                    },
                    n: function() {
                        var t = i.next();
                        return s = t.done, t
                    },
                    e: function(t) {
                        l = !0, r = t
                    },
                    f: function() {
                        try {
                            s || null == i.return || i.return()
                        } finally {
                            if (l) throw r
                        }
                    }
                }
            }

            function a(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
                return n
            }
            var l = function(t, e) {
                var i, a = [],
                    l = s(e);
                try {
                    for (l.s(); !(i = l.n()).done;) {
                        ! function(t) {
                            a.push((new n.StopGo).run((function() {
                                try {
                                    return t()
                                } catch (t) {
                                    return o.wlog.error(t)
                                }
                            })))
                        }(i.value)
                    }
                } catch (t) {
                    l.e(t)
                } finally {
                    l.f()
                }
                var u = a[a.length - 1];
                n.StopGo._drainStopGosAsync(t, a);
                var c = new n.StopGo;
                return u.then((function() {
                    return (0, r.doTimeout)("".concat(t, ".last"), (function() {
                        return c.go()
                    }), 0)
                })), c
            }
        },
        16: (t, e, i) => {
            i.d(e, {
                bind: () => u,
                bindNamed: () => m,
                trigger: () => d,
                unbind: () => c,
                unbindAllInNamespace: () => y,
                unbindNamed: () => v
            });
            var n = i(3),
                o = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };

            function r(t) {
                return function(t) {
                    if (Array.isArray(t)) return s(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return s(t, e);
                        var i = {}.toString.call(t).slice(8, -1);
                        return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? s(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
                return n
            }
            var a, l = Array.prototype.slice,
                u = function(t, e) {
                    var i = this;
                    return i._bindings || (i._bindings = {}), i._bindings[t] || (i._bindings[t] = []), i._bindings[t].push(e),
                        function() {
                            i.unbind(t, e)
                        }
                },
                c = function(t, e) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var i = [], n = 0; n < this._bindings[t].length; n++) {
                        var o = this._bindings[t][n];
                        o !== e && i.push(o)
                    }
                    this._bindings[t] = i
                },
                h = function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), {
                        event: t,
                        fn: e
                    }
                },
                d = function(t) {
                    for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
                    return this._bindings && null != this._bindings.all && p.apply(this, ["all", t].concat(i)), p.apply(this, [t].concat(i))
                },
                p = function(t) {
                    if (!this._bindings) return this;
                    if (!this._bindings[t]) return this;
                    for (var e, i = l.call(arguments, 1), o = r(this._bindings[t]), s = 0; s < o.length; s++) {
                        var a = o[s];
                        try {
                            a.apply(this, i) === this.unbind && (null == e && (e = []), e.push({
                                event: t,
                                fn: a
                            }))
                        } catch (t) {
                            if (this._throwTriggerErrors) throw t;
                            n.Wistia.error && n.Wistia.error(t)
                        }
                    }
                    if (e)
                        for (var u = 0; u < e.length; u++) {
                            var c = e[u];
                            this.unbind(c.event, c.fn)
                        }
                    return this
                },
                f = function(t, e) {
                    null == t._namedBindings && (t._namedBindings = {}), null == t._namedBindings[e] && (t._namedBindings[e] = {})
                },
                m = function(t, e, i, n) {
                    return this.unbindNamed(t, e),
                        function(t, e, i, n, o) {
                            f(t, e), t._namedBindings[e][i] = {
                                event: n,
                                fn: o
                            }
                        }(this, t, e, i, n), this.bind(i, n),
                        function() {
                            this.unbindNamed(t, e)
                        }
                },
                v = function(t, e) {
                    f(this, t);
                    var i = function(t, e, i) {
                        return f(t, e), t._namedBindings[e][i]
                    }(this, t, e);
                    if (i) {
                        var n = i.event,
                            o = i.fn;
                        this.unbind(n, o)
                    }
                    var r = this._namedBindings;
                    return delete r[t][e], g(r[t]) && delete r[t], this
                },
                y = function(t) {
                    var e = this._namedBindings && this._namedBindings[t];
                    if (null == e) return this;
                    for (var i in e) o(e, i) && this.unbindNamed(t, i)
                },
                g = function(t) {
                    for (var e in t)
                        if (o(t, e)) return !1;
                    return !0
                };
            (a = function() {}.prototype).bind = u, a.unbind = c, a.on = u, a.off = c, a.rebind = h, a.trigger = d, a.bindNamed = m, a.unbindNamed = v, a.unbindAllInNamespace = y
        },
        76: (t, e, i) => {
            function n(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, o(n.key), n)
                }
            }

            function o(t) {
                var e = function(t, e) {
                    if ("object" != typeof t || !t) return t;
                    var i = t[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var n = i.call(t, e || "default");
                        if ("object" != typeof n) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(t, "string");
                return "symbol" == typeof e ? e : e + ""
            }
            i.d(e, {
                Color: () => h
            });
            var r = /^#?([0-9a-f]{3,4}|[0-9a-f]{6,8})$/i,
                s = /^rgba?\((\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?),\s*(\d{1,3}(?:\.\d+)?%?)(?:,\s*([01]?\.?\d*))?\)$/,
                a = /^\d+(\.\d+)*%$/,
                l = /([0-9a-f])/gi,
                u = function(t) {
                    return a.test(t) ? 2.55 * parseFloat(t) : t
                },
                c = function(t, e, i) {
                    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
                },
                h = function() {
                    function t(e) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), e instanceof t ? (this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a) : e ? this.parse(e) : (this.r = this.g = this.b = 0, this.a = 1)
                    }
                    return e = t, (i = [{
                        key: "parse",
                        value: function(t) {
                            if (t = String(t), r.test(t)) {
                                var e = t.replace(/^#/, "");
                                3 !== e.length && 4 !== e.length || (e = e.replace(l, "$1$1")), this.r = parseInt(e.substr(0, 2), 16), this.g = parseInt(e.substr(2, 2), 16), this.b = parseInt(e.substr(4, 2), 16), 8 === e.length ? this.a = parseInt(e.substr(6, 2), 16) / 255 : this.a = 1
                            } else if (s.test(t)) {
                                var i = t.match(s);
                                this.r = parseFloat(u(i[1])), this.g = parseFloat(u(i[2])), this.b = parseFloat(u(i[3])), i[4] ? this.a = parseFloat(i[4]) : this.a = 1
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
                                i = this.b / 255,
                                n = Math.max(t, e, i),
                                o = Math.min(t, e, i),
                                r = (n + o) / 2;
                            n === o && (this._h = this._s = 0);
                            var s, a, l = n - o;
                            return 0 === l ? (this._h = 0, this._s = 0, this._l = 100 * t, this) : (s = r > .5 ? l / (2 - n - o) : l / (n + o), a = n === t ? (e - i) / l + (e < i ? 6 : 0) : n === e ? (i - t) / l + 2 : (t - e) / l + 4, a /= 6, this._h = 360 * a, this._s = 100 * s, this._l = 100 * r, this)
                        }
                    }, {
                        key: "_rgbFromHsl",
                        value: function() {
                            var t = this._h / 360,
                                e = this._s / 100,
                                i = this._l / 100,
                                n = i < .5 ? i * (1 + e) : i + e - i * e,
                                o = 2 * i - n;
                            return this.r = 255 * c(o, n, t + 1 / 3), this.g = 255 * c(o, n, t), this.b = 255 * c(o, n, t - 1 / 3), this
                        }
                    }, {
                        key: "blendChannel",
                        value: function(t, e, i) {
                            return this[t] = i * e + (1 - i) * this[t], this
                        }
                    }, {
                        key: "blend",
                        value: function(e, i) {
                            return e = new t(e), this.blendChannel("r", e.r, i), this.blendChannel("g", e.g, i), this.blendChannel("b", e.b, i), this
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
                            return ["r", "g", "b"].sort((function(e, i) {
                                return t[i] - t[e]
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
                                i = Math.round(this.b).toString(16);
                            return 1 === t.length && (t = "0".concat(t)), 1 === e.length && (e = "0".concat(e)), 1 === i.length && (i = "0".concat(i)), "".concat(t).concat(e).concat(i)
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
                    }]) && n(e.prototype, i), o && n(e, o), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e;
                    var e, i, o
                }()
        },
        51: (t, e, i) => {
            i.d(e, {
                notSetOrTrue: () => n
            });
            i(3), i(9), i(52), i(53);
            var n = function(t) {
                return null == t || !0 === t
            }
        },
        11: (t, e, i) => {
            i.d(e, {
                cachedDetect: () => U
            });
            var n, o = i(3),
                r = i(4),
                s = i(12),
                a = navigator.userAgent,
                l = /(webkit)[ /]([^\s]+)/i,
                u = /OPR\/([^\s]+)/i,
                c = /(edge)\/(\d+(?:\.\d+)?)/i,
                h = /(mozilla)(?:.*? rv:([^\s)]+))?/i,
                d = /(android) ([^;]+)/i,
                p = /(iphone)/i,
                f = /(Windows Phone OS (\d+(?:\.\d+)?))/,
                m = /OS (\d+)_(\d+)/i,
                v = /(playstation 3)/i,
                y = /BlackBerry|BB10/i,
                g = /(firefox)/i,
                b = /Mobile VR/i,
                _ = /Version\/([^\s]+)/i,
                w = function() {
                    return (k()[1] || "webkit").toLowerCase()
                },
                A = function() {
                    return k()[2]
                },
                k = function() {
                    var t;
                    return (t = a.match(c)) || (t = a.match(l)) || (t = a.match(u)) ? t : t ? (null != document.documentMode && (t[2] = document.documentMode), t) : (t = a.match(h)) || []
                },
                x = function() {
                    var t = a.match(d);
                    return null != t && {
                        version: t[2]
                    }
                },
                T = function() {
                    return p.test(a)
                },
                B = function() {
                    return I() > 0 || x() || S()
                },
                C = function() {
                    try {
                        var t = matchMedia("(hover:hover)");
                        if ("not all" !== t.media) return t.matches
                    } catch (t) {}
                    return !B()
                },
                E = function() {
                    return y.test(a)
                },
                S = function() {
                    return /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1
                },
                O = function() {
                    return l.test(a) && !/chrome/i.test(a) && !S() && !T()
                },
                P = function() {
                    return !(!/Chrome/.test(a) || !/Google Inc/.test(navigator.vendor)) && {
                        version: F()
                    }
                },
                W = function() {
                    var t = a.match(/\bSilk\/([^\s]+)/);
                    return t && t[1]
                },
                F = function() {
                    var t = a.match(/\bChrome\/([^\s]+)/);
                    return t && t[1]
                },
                M = function() {
                    return u.test(a)
                },
                I = function() {
                    var t = a.match(m),
                        e = a.match(_);
                    return null != t ? parseFloat("".concat(t[1], ".").concat(t[2])) : null != e && e[1] && S() ? parseFloat(e[1]) : 0
                },
                H = function() {
                    return c.test(a)
                },
                R = function() {
                    return g.test(a)
                },
                N = function() {
                    var t = document.createElement("video"),
                        e = !1;
                    try {
                        if (t.canPlayType) {
                            var i = 'video/mp4; codecs="avc1.42E01E';
                            (e = {}).h264 = !!t.canPlayType("".concat(i, '"')) || !!t.canPlayType("".concat(i, ', mp4a.40.2"')), e.webm = !!t.canPlayType('video/webm; codecs="vp9, vorbis"'), e.nativeHls = !!t.canPlayType("application/vnd.apple.mpegURL")
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
                L = function() {
                    try {
                        return "localStorage" in r.root && null != r.root.localStorage
                    } catch (t) {
                        return !1
                    }
                },
                D = ["WebKit", "Moz", "O", "Ms", ""],
                j = function() {
                    for (var t = 0; t < D.length; t++) {
                        var e = "".concat(D[t], "MutationObserver");
                        if (r.root[e]) return e
                    }
                    return null
                },
                z = function() {
                    if (null != n) return n;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function() {
                                n = !0
                            }
                        });
                        window.addEventListener("test", null, t)
                    } catch (t) {
                        n = !1
                    }
                    return n
                },
                U = function() {
                    return o.Wistia._detectCache || (o.Wistia._detectCache = q()), o.Wistia._detectCache
                },
                q = function() {
                    var t, e, i, n, o, l, u, c, h, d, p, m, y = {
                        amazonSilk: !!/Silk/.test(a) && {
                            version: W()
                        },
                        browser: {
                            version: A()
                        },
                        edge: H(),
                        firefox: R(),
                        gearvr: b.test(a),
                        android: x(),
                        oldandroid: x() && parseFloat(x().version) < 4.1,
                        iphone: T(),
                        ipad: S(),
                        blackberry: E(),
                        safari: O(),
                        chrome: P(),
                        opera: M(),
                        winphone: {
                            version: f.test(a)[2]
                        },
                        ios: {
                            version: I()
                        },
                        windows: /win/i.test(navigator.platform),
                        mac: /mac/i.test(navigator.platform),
                        linux: /linux/i.test(navigator.platform),
                        retina: null != r.root.devicePixelRatio && r.root.devicePixelRatio > 1,
                        hoverIsNatural: C(),
                        touchScreen: B(),
                        ps3: v.test(a),
                        video: N(),
                        mediaSource: r.root.MediaSource && r.root.MediaSource.isTypeSupported("".concat('video/mp4; codecs="avc1.42E01E', ', mp4a.40.2"')),
                        nativeHls: (T() || S() || O()) && N().nativeHls,
                        localstorage: L(),
                        json: !(!r.root.JSON || "function" != typeof JSON.parse),
                        backgroundSize: (m = document.createElement("div"), "" === m.style.backgroundSize || "" === m.style.webkitBackgroundSize || "" === m.style.mozBackgroundSize || "" === m.style.oBackgroundSize),
                        fullscreenEnabled: document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled,
                        vulcanSupport: (p = /webkit|mozilla|edge/.test(w()), Boolean(!T() && !S() && !x() && !E() && p && N().h264 && Object.defineProperties)),
                        mutationObserver: j(),
                        callingPlayRequiresEventContext: I() > 0 || x() || O(),
                        passiveSupported: z(),
                        webp: (t = P(), e = R(), i = H(), n = M(), o = t && A() >= 32, l = t && A() >= 75 && x(), u = e && A() >= 65, c = e && A() >= 67 && x(), h = i && A() >= 18, d = n && A() >= 19, o || l || u || c || h || d),
                        performanceMeasure: (0, s.hasPerformanceMeasureSupport)()
                    };
                    return y.browser[w()] = !0, y
                }
        },
        8: (t, e, i) => {
            i.d(e, {
                isDocReady: () => o,
                onDocReady: () => r
            });
            var n = i(9),
                o = function() {
                    return /loaded|complete/.test(document.readyState)
                },
                r = function() {
                    var t, e;
                    if (arguments.length > 1 ? (t = arguments[0], e = arguments[1]) : (t = 1e4, e = arguments[0]), o()) e();
                    else if (top === self && document.documentElement.doScroll) {
                        (0, n.poll)((function() {
                            try {
                                return document.documentElement.doScroll("left"), !0
                            } catch (t) {
                                return !1
                            }
                        }), e, 50, t, e)
                    } else {
                        var i = function() {
                                o() && (clearTimeout(s), r(), e())
                            },
                            r = function() {
                                document.removeEventListener("DOMContentLoaded", i, !1), document.removeEventListener("readystatechange", i, !1), window.removeEventListener("load", i, !1)
                            },
                            s = setTimeout((function() {
                                r(), e()
                            }), t);
                        document.addEventListener("DOMContentLoaded", i, !1), document.addEventListener("readystatechange", i, !1), window.addEventListener("load", i, !1)
                    }
                }
        },
        5: (t, e, i) => {
            i.r(e), i.d(e, {
                addInlineCss: () => b,
                currentEventSource: () => mt,
                docScrollLeft: () => dt,
                docScrollTop: () => ht,
                elemAddClass: () => S,
                elemAfter: () => B,
                elemAncestorHasClass: () => X,
                elemAncestorWithClass: () => Z,
                elemAncestors: () => K,
                elemAnimate: () => J,
                elemAppend: () => k,
                elemBefore: () => T,
                elemBind: () => Y,
                elemBindKey: () => it,
                elemBindOnce: () => ot,
                elemCancelFullscreen: () => lt,
                elemClasses: () => F,
                elemClone: () => A,
                elemContainsOffset: () => z,
                elemFromObject: () => _,
                elemHasClass: () => O,
                elemHeight: () => j,
                elemHtml: () => m,
                elemInDom: () => V,
                elemIsDescendantOf: () => G,
                elemIsHidden: () => q,
                elemIsInside: () => Q,
                elemMutationObserver: () => ct,
                elemOffset: () => u.elemOffset,
                elemPrepend: () => x,
                elemRebind: () => nt,
                elemRemove: () => C,
                elemRemoveClass: () => E,
                elemRequestFullscreen: () => at,
                elemScrollOffset: () => U,
                elemStripEventAttributes: () => ut,
                elemStyle: () => I,
                elemToObject: () => w,
                elemTrigger: () => rt,
                elemUnbind: () => $,
                elemUnbindAll: () => tt,
                elemUnbindAllInside: () => et,
                elemWidth: () => D,
                elemZoom: () => u.elemZoom,
                execCssTags: () => y,
                execScriptTags: () => c.execScriptTags,
                formInputIsFocused: () => ft,
                fullscreenElement: () => st,
                getComputedStyle: () => L,
                getCssTags: () => v,
                getLastActiveEventAt: () => yt,
                getScriptTags: () => c.getScriptTags,
                inUserEventContext: () => vt,
                isBoxModel: () => u.isBoxModel,
                isDocReady: () => r.isDocReady,
                onDocReady: () => r.onDocReady,
                pageLoaded: () => s.pageLoaded,
                propsWithVendorPrefixes: () => N,
                removeCssTags: () => g,
                removeScriptTags: () => c.removeScriptTags,
                safeRequestAnimationFrame: () => pt
            });
            var n, o = i(6),
                r = i(8),
                s = i(10),
                a = i(11),
                l = i(13),
                u = i(17),
                c = i(18),
                h = i(24),
                d = i(3),
                p = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                f = (d.Wistia, (0, a.cachedDetect)()),
                m = function(t, e) {
                    var i = v(e),
                        n = (0, c.getScriptTags)(e);
                    return e = g(e), e = (0, c.removeScriptTags)(e), t.innerHTML = e, y(i, t), (0, c.execScriptTags)(n)
                },
                v = function(t) {
                    return t.match(/<link.*?rel=['"]stylesheet['"][^>]*>|<style>[\s\S]+?<\/style>/gi) || []
                },
                y = function(t, e) {
                    if (!t) return null;
                    (0, o.isArray)(t) || (t = v(t));
                    for (var i = [], n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (/<link.*?rel=['"]stylesheet['"][^>]*>/.test(r)) {
                            var s = r.match(/href=['"](.*?)['"]/i);
                            if (s) {
                                var a = document.createElement("link");
                                a.setAttribute("rel", "stylesheet"), a.setAttribute("href", s[1]), a.className = "wistia_injected_style", (e || document.body || document.head).appendChild(a), i.push(a)
                            }
                        } else if (/<style>[\s\S]+?<\/style>/gi.test(r)) {
                            var l = r.match(/<style>([\s\S]+?)<\/style>/i);
                            if (l) {
                                var u = b(e || document.body || document.head, l[1]);
                                i.push(u)
                            }
                        }
                    }
                    return i
                },
                g = function(t) {
                    return t.replace(/<link.*?rel=['"]stylesheet['"][^>]*>|<style>[\s\S]+?<\/style>/gi, "")
                },
                b = function(t, e) {
                    var i = t || document.body || document.head,
                        n = document.createElement("style");
                    return n.id = (0, h.seqId)("wistia_", "_style"), n.setAttribute("type", "text/css"), n.className = "wistia_injected_style", i.appendChild(n, i.nextSibling), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e)), n
                },
                _ = function(t) {
                    if ((0, o.isArray)(t)) {
                        for (var e = [], i = 0; i < t.length; i++) e.push(_(t[i]));
                        return e
                    }
                    var n = t.tagName || "div",
                        r = t.childNodes || [];
                    (0, o.isArray)(r) || (r = [r]);
                    var s = document.createElement(n);
                    for (var a in t)
                        if (p(t, a)) {
                            var l = t[a];
                            if ("childNodes" !== a && "tagName" !== a && "ref" !== a) {
                                var u = a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                                if ("style" === a)
                                    if ((0, o.isObject)(l))
                                        for (var c in l) s.style[c] = l[c];
                                    else
                                        for (var h = l.split(";"), d = 0; d < h.length; d++) {
                                            var f = h[d].split(/\s*:\s*/),
                                                m = f[0],
                                                v = f[1];
                                            m && v && (s.style[m] = v)
                                        } else if ("events" === a)
                                            for (var y in l) {
                                                var g = l[y];
                                                Y(s, y, g)
                                            } else "className" === a || "class" === a ? s.className = l : "innerHTML" === a ? s.innerHTML = l : "innerText" === a ? s.innerText = l : null != l && "function" == typeof l.toString && s.setAttribute(u, l.toString())
                            }
                        }
                    for (var b = 0; b < r.length; b++) {
                        var w = r[b];
                        if ((0, o.isObject)(w)) {
                            var A = _(w);
                            k(s, A)
                        } else {
                            var x = document.createTextNode(w.toString());
                            k(s, x)
                        }
                    }
                    return "function" == typeof t.ref && t.ref(s), s
                },
                w = function(t) {
                    if ((0, o.isArray)(t))
                        for (var e = [], i = 0; i < t.length; i++) e.push(w(t[i]));
                    var n = {};
                    n.tagName = t.tagName.toLowerCase();
                    for (var r = Object.keys(t), s = 0; s < r.length; s++) {
                        var a = r[s];
                        if ("tagName" !== a && "childNodes" !== a && "nodeType" !== a && "nodeValue" !== a)
                            if ("style" === a) {
                                n.style = {};
                                for (var l = Object.keys(t.style), u = 0; u < l.length; u++) {
                                    var c = l[u],
                                        h = t.style[c];
                                    h && !/^\d/.test(c) && "length" !== c && (n.style[c] = h)
                                }
                            } else {
                                var d = t.getAttribute(a);
                                null != d && (n[a] = d)
                            }
                    }
                    for (var p = [], f = 0; f < t.childNodes.length; f++) {
                        var m = t.childNodes[f];
                        1 === m.nodeType ? p.push(w(m)) : 3 === m.nodeType && p.push(m.nodeValue)
                    }
                    return p.length > 0 && (n.childNodes = p), n
                },
                A = function(t) {
                    var e = w(t);
                    return _(e)
                },
                k = function(t, e) {
                    if ((0, o.isArray)(e))
                        for (var i = 0; i < e.length; i++) k(t, e[i]);
                    else t.tagName.includes("-") ? t.shadowRoot.appendChild(e, {
                        wistiaGridCaller: !0
                    }) : t.appendChild(e, {
                        wistiaGridCaller: !0
                    })
                },
                x = function(t, e) {
                    if (!(0, o.isArray)(e)) return 0 === t.childNodes.length ? k(t, e) : t.insertBefore(e, t.childNodes[0]);
                    for (var i = 0; i < e.length; i++) x(t, e[i])
                },
                T = function(t, e) {
                    if (!(0, o.isArray)(e)) return t.parentNode.insertBefore(e, t);
                    e = e.reverse();
                    for (var i = 0; i < e.length; i++) T(t, e[i])
                },
                B = function(t, e) {
                    if (!(0, o.isArray)(e)) return t.parentNode.insertBefore(e, t.nextSibling);
                    e = e.reverse();
                    for (var i = 0; i < e.length; i++) B(t, e[i])
                },
                C = function(t) {
                    var e;
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var i = 0; i < t.length; i++) C(t[i]);
                    else null == t || 1 !== t.nodeType && 3 !== t.nodeType || !(e = t.parentNode) || (e.removeChild(t), t = null)
                },
                E = function(t, e) {
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var i = 0; i < t.length; i++) E(t[i], e);
                    else if (O(t, e)) {
                        var n = t.getAttribute("class");
                        if (n) {
                            var r = new RegExp("\\b".concat(e, "\\b"), "g"),
                                s = M(n.replace(r, ""));
                            t.setAttribute("class", s)
                        }
                    }
                },
                S = function(t, e) {
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList)
                        for (var i = 0; i < t.length; i++) S(t[i], e);
                    else if (!O(t, e)) {
                        var n, r = t.getAttribute("class");
                        r ? (E(t, e), n = M("".concat(r, " ").concat(e))) : n = e, t.setAttribute("class", n)
                    }
                },
                O = function(t, e) {
                    var i = null != t && "function" == typeof t.getAttribute && t.getAttribute("class");
                    if (!i && t && "string" == typeof t.className && (i = t.className), !i) return !1;
                    var n = !1;
                    return W(i, e, (function(t) {
                        var o = 0 === t || " " === i.charAt(t - 1),
                            r = t + e.length === i.length,
                            s = " " === i.charAt(t + e.length);
                        if (o && (r || s)) return n = !0, P
                    })), n
                },
                P = {},
                W = function(t, e, i) {
                    for (var n = -1; - 1 != (n = t.indexOf(e, n + 1)) && i(n) !== P;);
                },
                F = function(t) {
                    return t && "string" != typeof t.className ? [""] : (t && t.className || "").split(/\s+/)
                },
                M = function(t) {
                    return t.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ")
                },
                I = function(t) {
                    for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
                    if ((0, o.isArray)(t) || window.NodeList && t instanceof NodeList) {
                        for (var r = [], s = 0; s < t.length; s++) {
                            var a = t[s];
                            1 === a.nodeType && r.push(I.apply(void 0, [a].concat(i)))
                        }
                        return r
                    }
                    if (2 === i.length) {
                        var u = i[0],
                            c = i[1];
                        t.style[u] = c
                    } else if (1 === i.length)
                        if ("string" == typeof i[0]) {
                            var h = i[0];
                            try {
                                return t.currentStyle ? t.currentStyle[h] : window.getComputedStyle ? window.getComputedStyle(t, null).getPropertyValue(h) : null
                            } catch (t) {
                                l.wlog.notice(t)
                            }
                        } else {
                            var d = N(i[0]);
                            for (var p in d) {
                                var f = d[p];
                                t.style[p] = f
                            }
                        }
                    else l.wlog.apply(void 0, ["Unexpected args", t].concat(i))
                },
                H = {
                    borderImage: !0,
                    mixBlendMode: !0,
                    transform: !0,
                    transition: !0,
                    transitionDuration: !0
                },
                R = ["webkit", "moz", "o", "ms"],
                N = function(t) {
                    if (f.chrome) return t;
                    var e = {};
                    for (var i in t) {
                        var n = t[i];
                        if (e[i] = n, H[i])
                            for (var o = R, r = 0; r < o.length; r++) {
                                var s = o[r] + i.charAt(0).toUpperCase() + i.slice(1);
                                i[s] || (e[s] = n)
                            }
                    }
                    return e
                },
                L = function(t, e) {
                    if (!window.getComputedStyle) return null;
                    var i = window.getComputedStyle(t, null);
                    return null == i ? null : null != e ? i[e] : i
                },
                D = function(t) {
                    if (t === window) return window.innerWidth ? window.innerWidth : document.documentElement ? document.documentElement.offsetWidth : document.body.offsetWidth;
                    if (t === document) {
                        var e = document.body,
                            i = document.documentElement;
                        return Math.max(e.scrollWidth, e.offsetWidth, i.clientWidth, i.scrollWidth, i.offsetWidth)
                    }
                    var n;
                    return (n = L(t, "width")) && null != n ? parseFloat(n) : t.currentStyle ? t.offsetWidth : -1
                },
                j = function(t) {
                    if (t === window) return window.innerHeight ? window.innerHeight : document.documentElement ? document.documentElement.offsetHeight : document.body.offsetHeight;
                    if (t === document) {
                        var e = document.body,
                            i = document.documentElement;
                        return Math.max(e.scrollHeight, e.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight)
                    }
                    var n;
                    return (n = L(t, "height")) && null != n ? parseFloat(n) : t.currentStyle ? t.offsetHeight : -1
                },
                z = function(t, e, i) {
                    var n = (0, u.elemOffset)(t);
                    return n.right = n.left + D(t), n.bottom = n.top + j(t), n.left <= e && e < n.right && n.top <= i && i < n.bottom
                },
                U = function(t) {
                    var e = 0,
                        i = 0;
                    if (t.parentNode)
                        for (; t && t.offsetParent;) i += t.scrollTop, e += t.scrollLeft, t = t.parentNode;
                    return {
                        left: e,
                        top: i
                    }
                },
                q = function(t) {
                    for (; t && 1 === t.nodeType;) {
                        if ("none" === I(t, "display")) return !0;
                        t = t.parentNode
                    }
                    return !1
                },
                V = function(t) {
                    for (; t;) {
                        if (t === document) return !0;
                        t = t.parentNode || t.getRootNode().host
                    }
                    return !1
                },
                G = function(t, e) {
                    for (var i = K(t), n = 0; n < i.length; n++)
                        if (i[n] === e) return !0;
                    return !1
                },
                Z = function(t, e) {
                    for (var i = K(t), n = 0; n < i.length; n++)
                        if (O(i[n], e)) return i[n];
                    return null
                },
                X = function(t, e) {
                    return !!Z(t, e)
                },
                K = function(t) {
                    for (var e = t, i = []; e = e.parentNode;) i.push(e);
                    return i
                },
                Q = function(t, e) {
                    return t === e || G(t, e)
                },
                J = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    i = (0, o.merge)({
                        time: 400,
                        easing: "ease"
                    }, i);
                    var n = function(t, e, i) {
                        var n = [];
                        for (var o in t) n.push("".concat(o, " ").concat(e, "ms ").concat(i));
                        return n.join(",")
                    }(e, i.time, i.easing);
                    I(t, {
                        transition: n
                    }), pt((function() {
                        I(t, e), setTimeout((function() {
                            I(t, {
                                transition: ""
                            }), "function" == typeof i.callback && i.callback()
                        }), i.time)
                    }))
                },
                Y = function(t, e, i) {
                    var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        o = function(n) {
                            (n = n || window.event).pageX || n.pageY || !n.clientX && !n.clientY || (n.pageX = n.clientX + dt(), n.pageY = n.clientY + ht()), n.preventDefault || (n.preventDefault = function() {
                                n.returnValue = !1
                            }), n.stopPropagation || (n.stopPropagation = function() {
                                n.cancelBubble = !0
                            }), null == n.which && (n.which = null != n.charCode ? n.charCode : n.keyCode), null == n.which && null != n.button && (1 & n.button ? n.which = 1 : 2 & n.button ? n.which = 3 : 4 & n.button ? n.which = 2 : n.which = 0), n.target || n.srcElement && (n.target = n.srcElement), n.target && 3 === n.target.nodeType && (n.target = n.target.parentNode);
                            for (var o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++) r[s - 1] = arguments[s];
                            var a = i.apply(n.target, [n].concat(r));
                            return a === $ && $(t, e, i), a
                        };
                    d.Wistia._elemBind = d.Wistia._elemBind || {};
                    var r = it(t, e, i);
                    return d.Wistia._elemBind[r] = o, o.elem = t, o.event = e, t.addEventListener(e, o, n),
                        function() {
                            $(t, e, i, n)
                        }
                },
                $ = function(t, e, i) {
                    var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (null != t && null != t._wistiaElemId && null != i && i._wistiaBindId) {
                        var o = it(t, e, i),
                            r = d.Wistia._elemBind[o];
                        return r && (t.removeEventListener(e, r, n), r.elem = null, r.event = null), delete d.Wistia._elemBind[o]
                    }
                },
                tt = function(t) {
                    for (var e in d.Wistia._elemBind) {
                        var i = d.Wistia._elemBind[e];
                        if (i && t === i.elem) {
                            var n = i.event;
                            i.elem.removeEventListener(n, i, !1), i.elem = null, i.event = null, delete d.Wistia._elemBind[e]
                        }
                    }
                },
                et = function(t) {
                    var e = 0;
                    for (var i in d.Wistia._elemBind) {
                        var n = d.Wistia._elemBind[i];
                        if (n && Q(n.elem, t)) {
                            var o = n.event;
                            n.elem.removeEventListener(o, n, !1), n.elem = null, n.event = null, delete d.Wistia._elemBind[i], e += 1
                        }
                    }
                    return e
                },
                it = function(t, e, i) {
                    return t._wistiaElemId = t._wistiaElemId || (0, h.seqId)("wistia_elem_"), i._wistiaBindId = i._wistiaBindId || (0, h.seqId)("wistia_bind_"), "".concat(t._wistiaElemId, ".").concat(e, ".").concat(i._wistiaBindId)
                },
                nt = function(t, e, i) {
                    if (i) return $(t, e, i), Y(t, e, i)
                },
                ot = function(t, e, i) {
                    return Y(t, e, (function() {
                        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        return i.apply(this, e), $
                    }))
                },
                rt = function(t, e) {
                    for (var i = arguments.length, n = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) n[o - 2] = arguments[o];
                    if (t.dispatchEvent) {
                        var r = document.createEvent("Events");
                        return r.initEvent(e, !0, !1), "click" === e || "doubleclick" === e ? r.which = 1 : "rightclick" === e && (r.which = 2), r.customArguments = n, t.dispatchEvent(r)
                    }
                    if (t.fireEvent) {
                        var s = {
                            customArguments: n
                        };
                        return t.fireEvent("on".concat(e), s)
                    }
                    l.wlog.error("neither dispatchEvent nor fireEvent is defined for", t, e)
                },
                st = function() {
                    return document.fullscreenElement || document.webkitFullscreenElement
                },
                at = function(t) {
                    return t.requestFullscreen ? t.requestFullscreen() : t.webkitEnterFullscreen ? new Promise((function(e) {
                        t.webkitEnterFullscreen(), e()
                    })) : (l.wlog.notice("no requestFullscreen functionality detected"), Promise.resolve())
                },
                lt = function(t) {
                    return document.exitFullscreen ? document.exitFullscreen() : t && t.webkitExitFullscreen ? new Promise((function(e) {
                        t.webkitExitFullscreen(), e()
                    })) : (l.wlog.notice("no cancelFullscreen functionality detected"), Promise.resolve())
                },
                ut = function(t) {
                    var e = t && t.attributes || [];
                    try {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            /^on.+/i.test(n.name) && (t[n.name] = null, t.removeAttribute(n.name))
                        }
                    } catch (t) {
                        l.wlog.error(t)
                    }
                    if (t.childNodes)
                        for (var o = 0; o < t.childNodes.length; o++) {
                            var r = t.childNodes[o];
                            1 === r.nodeType && ut(r)
                        }
                },
                ct = function(t) {
                    var e = f.mutationObserver;
                    return e ? new window[e](t) : null
                },
                ht = function(t) {
                    var e = document.body,
                        i = document.documentElement;
                    if (null == t) return i && i.scrollTop || e && e.scrollTop || 0;
                    e && (e.scrollTop = t), i && (i.scrollTop = t)
                },
                dt = function(t) {
                    var e = document.body,
                        i = document.documentElement;
                    if (null == t) return i && i.scrollLeft || e && e.scrollLeft || 0;
                    e && (e.scrollLeft = t), i && (i.scrollLeft = t)
                },
                pt = function(t) {
                    return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                        return setTimeout(t, 1e3 / 60)
                    })(t)
                },
                ft = function() {
                    var t = "WISTIA-PLAYER" === document.activeElement.tagName ? document.activeElement.shadowRoot.activeElement : document.activeElement;
                    return /^textarea|input|select$/i.test(t.tagName) || t.isContentEditable
                },
                mt = function() {
                    return vt() ? "user-event" : "non-user-event"
                },
                vt = function() {
                    return !!n
                },
                yt = function() {
                    return gt
                },
                gt = -1;
            ["auxclick", "click", "contextmenu", "dblclick", "focus", "keydown", "keypress", "keyup", "mousedown", "mouseup", "reset", "submit", "touchend", "touchstart"].forEach((function(t) {
                Y(document, t, (function(t) {
                    n = t, gt = Date.now(), setTimeout((function() {
                        n === t && (n = void 0)
                    }), 0)
                }), !f.passiveSupported || {
                    capture: !0,
                    passive: !0
                })
            }))
        },
        17: (t, e, i) => {
            var n;
            i.d(e, {
                elemOffset: () => r,
                elemZoom: () => s,
                isBoxModel: () => o
            });
            var o = function() {
                    if (null != n) return n;
                    var t = document.createElement("div");
                    return t.style.paddingLeft = t.style.width = "1px", document.body.appendChild(t), n = 2 === t.offsetWidth, document.body.removeChild(t), n
                },
                r = function(t) {
                    var e, i, n = document.body,
                        r = document.defaultView,
                        a = document.documentElement,
                        l = t.getBoundingClientRect(),
                        u = a.clientTop || n.clientTop || 0,
                        c = a.clientLeft || n.clientLeft || 0;
                    e = r && null != r.pageYOffset ? r.pageYOffset : o() && a && null != a.scrollTop ? a.scrollTop : n.scrollTop, i = r && null != r.pageXOffset ? r.pageXOffset : o() && a && null != a.scrollLeft ? a.scrollLeft : n.scrollLeft;
                    var h = s(t);
                    return {
                        height: l.height * h,
                        top: l.top * h + e - u,
                        left: l.left * h + i - c,
                        width: l.width * h,
                        zoom: h
                    }
                },
                s = function(t) {
                    return t && t !== document.documentElement ? s(t.parentElement) * (getComputedStyle(t).zoom || 1) : 1
                }
        },
        174: (t, e, i) => {
            i.d(e, {
                controlMultiplierEstimatedByWidth: () => u
            });
            i(5), i(67);
            var n = i(11),
                o = i(6);

            function r(t, e) {
                return function(t) {
                    if (Array.isArray(t)) return t
                }(t) || function(t, e) {
                    var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != i) {
                        var n, o, r, s, a = [],
                            l = !0,
                            u = !1;
                        try {
                            if (r = (i = i.call(t)).next, 0 === e) {
                                if (Object(i) !== i) return;
                                l = !1
                            } else
                                for (; !(l = (n = r.call(i)).done) && (a.push(n.value), a.length !== e); l = !0);
                        } catch (t) {
                            u = !0, o = t
                        } finally {
                            try {
                                if (!l && null != i.return && (s = i.return(), Object(s) !== s)) return
                            } finally {
                                if (u) throw o
                            }
                        }
                        return a
                    }
                }(t, e) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return s(t, e);
                        var i = {}.toString.call(t).slice(8, -1);
                        return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? s(t, e) : void 0
                    }
                }(t, e) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
                return n
            }
            var a = (0, n.cachedDetect)(),
                l = function(t) {
                    if (!(a.iphone || a.ipad || a.android)) return [640, 960];
                    if (null != t && t.isAudio()) return [500, 960];
                    var e, i, n, r, s = (e = document.querySelector("meta[name=viewport]"), i = e && e.getAttribute("content"), n = {}, i && i.split(/[\s,]+/).forEach((function(t) {
                        var e = t.split("=");
                        2 === e.length && (n[e[0]] = (0, o.cast)(e[1]))
                    })), n);
                    if (s.width) {
                        r = "number" == typeof s.width ? 0 + s.width : screen.width || window.innerWidth;
                        var l = Math.max(s["minimum-scale"] || 0, Math.min(s["maximum-scale"] || 10, s["initial-scale"] || 1));
                        l < 1 && (r /= l)
                    } else r = window.innerWidth;
                    return [r, 2 * r / 3]
                },
                u = function(t, e) {
                    var i = r(e || l(), 2),
                        n = i[0],
                        o = i[1];
                    return t <= n ? t / n : t > o ? t / o : 1
                }
        },
        14: (t, e, i) => {
            i.d(e, {
                globalTrigger: () => o
            });
            var n = i(3);
            (0, i(15).makeWbindable)(n.Wistia);
            n.Wistia.bind.bind(n.Wistia), n.Wistia.on.bind(n.Wistia), n.Wistia.off.bind(n.Wistia), n.Wistia.rebind.bind(n.Wistia);
            var o = n.Wistia.trigger.bind(n.Wistia);
            n.Wistia.unbind.bind(n.Wistia)
        },
        21: (t, e, i) => {
            i.r(e), i.d(e, {
                EMBED_HOST: () => u,
                PROD_EMBED_HOST: () => d,
                PROD_FASTLY_SSL_HOST: () => f,
                PROD_FAST_HOSTNAME_COM: () => h,
                PROD_FAST_HOSTNAME_NET: () => c,
                PROD_SSL_EMBED_HOST: () => p,
                SSL_EMBED_HOST: () => m,
                TAGGED_VERSION: () => v,
                VALID_FASTLY_HOSTS: () => O,
                appHost: () => b,
                cdnFastProtectedWistiaComHost: () => w,
                cdnFastWistiaCanaryHost: () => k,
                cdnFastWistiaComHost: () => _,
                cdnFastWistiaNetHost: () => A,
                deliveryHost: () => g,
                eV1Host: () => T,
                eV1HostWithPort: () => B,
                eV1Protocol: () => C,
                eV1Url: () => x,
                forceValidFastWistiaHost: () => W,
                mediaDataHost: () => E,
                metricsHost: () => S
            });
            var n = i(4),
                o = i(22),
                r = i(23),
                s = (0, r.appHostname)("app"),
                a = (0, r.appHostname)("fast-protected"),
                l = (0, r.appHostname)("fast"),
                u = "embed.wistia.com",
                c = "fast.wistia.net",
                h = "fast.wistia.com",
                d = "embed.wistia.com",
                p = "embed-ssl.wistia.com",
                f = "embed-fastly.wistia.com",
                m = "embed-ssl.wistia.com",
                v = "",
                y = "undefined" != typeof window && n.root === window && n.root.location ? n.root.location.protocol : "https:",
                g = function() {
                    return function(t, e, i) {
                        return "https:" === t ? e : i
                    }(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y, m, u)
                },
                b = function() {
                    return s
                },
                _ = function(t) {
                    return t || l
                },
                w = function(t) {
                    return t || a
                },
                A = function() {
                    return "fast.".concat("wistia.net")
                },
                k = function() {
                    return "fast-canary.wistia.net"
                },
                x = function() {
                    for (var t = document.getElementsByTagName("script"), e = 0; e < t.length; e++) {
                        var i = t[e];
                        if (i.src) {
                            var n = new o.Url(i.src),
                                r = /\/assets\/external\/E-v1?\.js$/.test(n.rawPath),
                                s = n.host === _() || n.host === A() || n.host === k(),
                                a = "https:" === location.protocol && "https:" === n.protocol,
                                l = "" === n.protocol || null == n.protocol,
                                u = a || l || "http:" === location.protocol,
                                c = !i.readyState || /loaded|complete/.test(i.readyState);
                            if (r && s && u && c) return n
                        }
                    }
                    return new o.Url("".concat((0, o.proto)(), "//").concat(A(), "/E-v1.js"))
                }(),
                T = function() {
                    return x.host
                },
                B = function() {
                    return x.port ? "".concat(T(), ":").concat(x.port) : T()
                },
                C = function() {
                    return x.protocol
                },
                E = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return t.embedHost ? W(t.embedHost) : B()
                },
                S = function() {
                    return "pipedream.".concat("wistia.com")
                },
                O = [].concat(["wistia.net", "wistia.com"], ["wistia.mx", "wistia.dev", "wistia.tech", "wistia.am", "wistia.se", "wistia.io", "wistia.st"]),
                P = new RegExp("(".concat(O.map((function(t) {
                    return "\\.".concat(t.replace(".", "\\."))
                })).join("|"), ")$")),
                W = function(t) {
                    return t && P.test(t) ? t : B()
                }
        },
        43: (t, e, i) => {
            i.d(e, {
                isMouseDownRecently: () => u
            });
            var n = i(3),
                o = i(5),
                r = (0, i(11).cachedDetect)();
            if (null == n.Wistia._isMouseDown) {
                n.Wistia._isMouseDown = !1;
                var s = function(t) {
                        n.Wistia._isMouseDown = !0, n.Wistia._lastMouseDownAt = Date.now(), setTimeout((function() {
                            t.defaultPrevented && (n.Wistia._isMouseDown = !1)
                        }), 0)
                    },
                    a = function() {
                        n.Wistia._lastMouseUpAt = Date.now(), setTimeout((function() {
                            n.Wistia._isMouseDown = !1
                        }), 0)
                    };
                r.touchScreen ? ((0, o.elemBind)(document, "touchstart", s, !0), (0, o.elemBind)(document, "touchend", (function() {
                    n.Wistia._lastMouseUpAt = Date.now(), setTimeout((function() {
                        n.Wistia._isMouseDown = !1
                    }), 0)
                }), !0)) : ((0, o.elemBind)(document, "mousedown", s, !0), (0, o.elemBind)(document, "mouseup", a, !0));
                var l = r.windows ? a : s;
                (0, o.elemBind)(document, "contextmenu", l, !0)
            }
            var u = function() {
                return null != n.Wistia._mouseDownForceReturnVal ? n.Wistia._mouseDownForceReturnVal : (t = 500, Math.max(n.Wistia._lastMouseDownAt || 0, (n.Wistia._lastMouseUpAt || 0) - 1) > Date.now() - t);
                var t
            }
        },
        6: (t, e, i) => {
            i.d(e, {
                cast: () => p,
                clone: () => u,
                eachLeaf: () => T,
                getDeep: () => c,
                isArray: () => y,
                isEmpty: () => k,
                isObject: () => b,
                merge: () => r,
                setAndPreserveUndefined: () => h
            });
            i(7);
            var n = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                },
                o = Array.prototype.slice,
                r = function(t) {
                    if (0 == (arguments.length <= 1 ? 0 : arguments.length - 1)) return t;
                    for (var e = 0; e < (arguments.length <= 1 ? 0 : arguments.length - 1); e++) s(t, e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1]);
                    return t
                },
                s = function(t, e) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l;
                    if (y(e)) {
                        y(t) || (t = []);
                        for (var r = 0; r < e.length; r++) {
                            var u = e[r];
                            null == t[r] && null != u && (y(u) ? t[r] = [] : b(u) && (t[r] = {}));
                            var c = s(t[r], u, i);
                            o(e, r, c) ? delete t[r] : t[r] = c
                        }
                        return i(t)
                    }
                    if (b(e)) {
                        for (var h in e)
                            if (n(e, h) && (n(t, h) || null == t[h])) {
                                var d = e[h];
                                y(d) ? (y(t[h]) || (t[h] = []), s(t[h], d, i), t[h] = i(t[h])) : b(d) ? (b(t[h]) || (t[h] = {}), s(t[h], d, i), t[h] = i(t[h])) : null == t ? (t = {}, o(e, h, d) || (t[h] = i(d))) : o(e, h, d) ? delete t[h] : t[h] = i(d)
                            }
                        return i(t)
                    }
                    return i(e)
                },
                a = function(t) {
                    return t
                },
                l = function(t, e, i) {
                    return null == i
                },
                u = function(t, e) {
                    return y(t) ? s([], t, e) : s({}, t, e)
                },
                c = function(t, e, i) {
                    e = "string" == typeof e ? e.split(".") : o.call(e);
                    for (var r, s = t; null != t && e.length;) {
                        var a = e.shift();
                        void 0 !== t[a] && (b(t[a]) || y(t[a])) || !i || (0 === a ? (t = s[r] = [])[a] = {} : t[a] = {}), s = t, r = a, t = n(t, a) ? t[a] : void 0
                    }
                    return t
                },
                h = function(t, e, i) {
                    return d(t, e, i, !1)
                },
                d = function(t, e, i) {
                    var n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                        r = (e = "string" == typeof e ? e.split(".") : o.call(e)).pop();
                    null != (t = c(t, e, !0)) && (b(t) || y(t)) && null != r && (n && null == i ? delete t[r] : t[r] = i)
                },
                p = function(t) {
                    return null == t ? t : b(t) || y(t) ? m(t) : f("".concat(t), t)
                },
                f = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                    return /^-?[1-9]\d*?$/.test(t) ? parseInt(t, 10) : "0" === t || "-0" === t ? 0 : /^-?\d*\.\d+$/.test(t) ? parseFloat(t) : !!/^true$/i.test(t) || !/^false$/i.test(t) && e
                },
                m = function(t) {
                    return s(t, t, (function(t) {
                        return "string" == typeof t ? f(t) : t
                    }), (function() {
                        return !1
                    }))
                },
                v = /^\s*function Array()/,
                y = function(t) {
                    return null != t && t.push && v.test(t.constructor)
                },
                g = /^\s*function Object()/,
                b = function(t) {
                    return null != t && "object" == typeof t && g.test(t.constructor)
                },
                _ = /^\s*function RegExp()/,
                w = /^string|number|boolean|function$/i,
                A = function(t) {
                    return null != t && (w.test(typeof t) || function(t) {
                        return null != t && _.test(t.constructor)
                    }(t))
                },
                k = function(t) {
                    return null == t || (!(!y(t) || t.length) || !!b(t) && !Object.keys(t).length)
                },
                x = function(t, e, i, r, s) {
                    if (null == i && (i = []), A(t)) e(t, i, r, s);
                    else if (b(t) || y(t)) {
                        for (var a in e(t, i, r, s), t)
                            if (n(t, a)) {
                                var l = o.call(i);
                                l.push(a), x(t[a], e, l, t, a)
                            }
                    } else e(t, i, r, s)
                },
                T = function(t, e) {
                    x(t, (function(t, i, n, o) {
                        y(t) || b(t) || e(t, i, n, o)
                    }))
                }
        },
        10: (t, e, i) => {
            i.d(e, {
                pageLoaded: () => n
            });
            var n = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4e3,
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
                    n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window;
                if (/loaded|complete/.test(i.readyState)) setTimeout(t, 0);
                else {
                    var o = function() {
                            n.removeEventListener("load", r, !1)
                        },
                        r = function() {
                            clearTimeout(s), o(), t()
                        };
                    n.addEventListener("load", r, !1);
                    var s = setTimeout((function() {
                        o(), t()
                    }), e)
                }
            }
        },
        9: (t, e, i) => {
            i.d(e, {
                poll: () => n
            });
            var n = function(t, e, i, n, o) {
                var r = null,
                    s = (new Date).getTime(),
                    a = function() {
                        (new Date).getTime() - s > n ? "function" == typeof o && o() : t() ? e() : (clearTimeout(r), r = setTimeout(a, i))
                    };
                r = setTimeout(a, 1)
            }
        },
        4: (t, e, i) => {
            var n;
            i.d(e, {
                root: () => o
            });
            try {
                (n = self).self !== n && void 0 !== n.self && "undefined" != typeof window && (n = window)
            } catch (t) {
                n = "undefined" != typeof globalThis ? globalThis : window
            }
            var o = n
        },
        20: (t, e, i) => {
            i.d(e, {
                runScript: () => o
            });
            var n = i(21),
                o = function(t, e) {
                    var i = n.TAGGED_VERSION;
                    return new Promise((function(n, o) {
                        var r;
                        null == e && (e = 8e3), (r = document.createElement("script")).src = t, r.async = !0, r.type = "text/javascript", /https?:\/\/fast\.wistia\./.test(r.src) && "" !== i && i.length > 0 && (r.src = "".concat(r.src, "@").concat(i));
                        var s = null,
                            a = !1,
                            l = function() {
                                r.onerror = r.onreadystatechange = r.onload = null, clearTimeout(s), clearTimeout(c), s = setTimeout((function() {
                                    r && r.parentNode && r.parentNode.removeChild(r)
                                }), 500)
                            },
                            u = function() {
                                var t = r.readyState;
                                a || t && !/loaded|complete/.test(t) || (a = !0, setTimeout((function() {
                                    n(), l()
                                }), 1))
                            },
                            c = setTimeout((function() {
                                a = !0, l(), o(new Error("timeout"))
                            }), e);
                        r.onerror = function(t) {
                            a = !0, l(), o(t)
                        }, r.onreadystatechange = u, r.onload = u, (document.body || document.head).appendChild(r)
                    }))
                }
        },
        124: (t, e, i) => {
            i.d(e, {
                sanePlayerColor: () => n
            });
            var n = function(t) {
                if (t) {
                    if ((t = "".concat(t).replace(/^#/g, "")).length < 6) {
                        for (var e = "", i = 0; i < 6 - t.length; i++) e += "0";
                        t = "".concat(e).concat(t)
                    }
                    return /^[\da-f]{6}$/i.test(t) || (t = "636155"), t
                }
                return "636155"
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
                    var i = scriptTagsToRunScriptsInput(t);
                    return (0, utilities_script_utils_js__WEBPACK_IMPORTED_MODULE_0__.runScripts)(i).then(e)
                },
                removeScriptTags = function(t) {
                    return t.replace(/<script.*?src[^>]*>\s*<\/script>|<script>[\s\S]+?<\/script>/g, "")
                }
        },
        19: (t, e, i) => {
            i.d(e, {
                runScripts: () => c
            });
            var n = i(13),
                o = i(6),
                r = i(20);

            function s(t, e) {
                var i = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t);
                    e && (n = n.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), i.push.apply(i, n)
                }
                return i
            }

            function a(t, e, i) {
                return (e = function(t) {
                    var e = function(t, e) {
                        if ("object" != typeof t || !t) return t;
                        var i = t[Symbol.toPrimitive];
                        if (void 0 !== i) {
                            var n = i.call(t, e || "default");
                            if ("object" != typeof n) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === e ? String : Number)(t)
                    }(t, "string");
                    return "symbol" == typeof e ? e : e + ""
                }(e)) in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }
            var l = function(t) {
                    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = document.getElementsByTagName("script"), n = 0; n < i.length; n++) {
                        var o = i[n],
                            r = o.getAttribute("src") || "";
                        if (e.ignoreQueryParams) {
                            var s = r.split("?");
                            r = s[0]
                        }
                        if (!e.scriptRegex && e.ignoreProtocol && (r = r.replace(/^https?:/, ""), t = t.replace(/^https?:/, "")), e.scriptRegex && e.scriptRegex.test(r)) return o;
                        if (e.testStartsWith && 0 === r.indexOf(t)) return o;
                        if (r === t) return o
                    }
                    return null
                },
                u = function(t) {
                    var e, i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8e3,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return null == n && (n = 8e3), null == o && (o = {}), new Promise((function(s) {
                        !0 === o.once && (e = l(t)) && (i = !0), o.once && i ? e.readyState && !/loaded|complete/.test(e.readyState) || setTimeout((function() {
                            s()
                        }), 1) : (0, r.runScript)(t, n).then(s).catch((function(t) {
                            s(t), setTimeout((function() {
                                console.error(t)
                            }), 1)
                        }))
                    }))
                },
                c = function() {
                    for (var t, e = arguments.length, i = new Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                    t = i[0] instanceof Array ? i[0] : i, t = h(t);
                    var r = [],
                        l = [],
                        c = [];
                    return t.forEach((function(t) {
                        var e = function(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var i = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? s(Object(i), !0).forEach((function(e) {
                                        a(t, e, i[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                                    }))
                                }
                                return t
                            }({}, t),
                            i = new Promise((function(t) {
                                e.resolve = t
                            }));
                        e.promise = i, c.push(e.promise), t.async ? r.push(e) : l.push(e)
                    })), l.reduce((function(t, e) {
                        if (e.fn) try {
                            e.fn()
                        } catch (t) {
                            n.wlog.error(t)
                        } finally {
                            e.resolve()
                        } else e.src && u(e.src, null, e).then(e.resolve);
                        return t.then(e.promise)
                    }), Promise.resolve()), setTimeout((function() {
                        r.forEach((function(t) {
                            if (t.fn) try {
                                t.fn()
                            } catch (t) {
                                n.wlog.error(t)
                            } finally {
                                t.resolve()
                            } else t.src && u(t.src, null, t).then(t.resolve)
                        }))
                    }), 1), Promise.all(c)
                },
                h = function(t) {
                    for (var e = [], i = 0; i < t.length; i++) {
                        var n = t[i];
                        "string" == typeof n ? e.push({
                            src: n,
                            async: !1
                        }) : (0, o.isObject)(n) ? e.push(n) : e.push({
                            fn: n,
                            async: !1
                        })
                    }
                    return e
                }
        },
        125: (t, e, i) => {
            i.r(e), i.d(e, {
                scrollLeft: () => n,
                scrollTop: () => o
            });
            var n = function(t) {
                    var e, i, n, o;
                    if (!t) return (null === (e = document) || void 0 === e || null === (i = e.documentElement) || void 0 === i ? void 0 : i.scrollLeft) || (null === (n = document) || void 0 === n || null === (o = n.body) || void 0 === o ? void 0 : o.scrollLeft) || 0;
                    document.body && (document.body.scrollLeft = t), document.documentElement && (document.documentElement.scrollLeft = t)
                },
                o = function(t) {
                    var e, i, n, o;
                    if (!t) return (null === (e = document) || void 0 === e || null === (i = e.documentElement) || void 0 === i ? void 0 : i.scrollTop) || (null === (n = document) || void 0 === n || null === (o = n.body) || void 0 === o ? void 0 : o.scrollTop) || 0;
                    document.body && (document.body.scrollTop = t), document.documentElement && (document.documentElement.scrollTop = t)
                }
        },
        24: (t, e, i) => {
            i.d(e, {
                seqId: () => o
            });
            var n = i(3),
                o = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wistia_",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        i = n.Wistia._sequenceVal || 1,
                        o = "".concat(t).concat(i).concat(e);
                    return n.Wistia._sequenceVal = i + 1, o
                }
        },
        96: (t, e, i) => {
            i.d(e, {
                StopGo: () => n
            });
            var n, o = i(67);
            (function() {
                var t = [].slice;
                n = function() {
                    function e() {
                        var t;
                        return this._queue = [], this._green = !1, this._lock = !1, this.allInOne = (t = this, function() {
                            return t._allInOne.apply(t, arguments)
                        }), this.defineMethodsOn(this.allInOne), this.allInOne
                    }
                    return e.prototype.defineMethodsOn = function(t) {
                        var e, i, n, o;
                        for (i in e = {}, this, n = [], this) o = this[i], n.push(function(i, n, o) {
                            if ("[object Function]" === e.toString.call(n)) return t[i] = function() {
                                return o[i].apply(o, arguments)
                            }
                        }(i, o, this));
                        return n
                    }, e.prototype.flush = function() {
                        var e, i;
                        if (e = arguments.length >= 1 ? t.call(arguments, 0) : [], !this._green) return this;
                        for (this._lock = !0; this._queue.length > 0 && (i = this._queue.shift(), e.length || !this.goArgs ? this.tryAndReport((function() {
                                return i.apply(null, e)
                            })) : this.tryAndReport(function(t) {
                                return function() {
                                    return i.apply(null, t.goArgs)
                                }
                            }(this)), !this._block && this._green););
                        return this._lock = !1, this
                    }, e.prototype._debug = function() {
                        return "undefined" != typeof console && null !== console ? console.log.apply(console, arguments) : void 0
                    }, e.prototype.synchronize = function() {
                        var e, i, n, o;
                        for (n = 0, o = (i = arguments.length >= 1 ? t.call(arguments, 0) : []).length; n < o; n++) e = i[n], this.synchronizeFn(e);
                        return this
                    }, e.prototype.synchronizeFn = function(t) {
                        var e, i, n, o;
                        return i = null, o = this, e = function() {
                            return clearTimeout(i), o._block = !1, o.go()
                        }, n = function(i) {
                            return function() {
                                return i._block = !0, i.stop(), t(e)
                            }
                        }(this), i = setTimeout(function(i) {
                            return function() {
                                return i._debug("StopGo#synchronize timed out", t), e()
                            }
                        }(this), 5e3), this.runFn(n), this
                    }, e.prototype.tryAndReport = function(t) {
                        var e;
                        try {
                            return t()
                        } catch (t) {
                            return (e = t).stack ? ("undefined" != typeof console && null !== console && console.log(e.message), "undefined" != typeof console && null !== console ? console.log(e.stack) : void 0) : "undefined" != typeof console && null !== console ? console.log(e) : void 0
                        }
                    }, e.prototype.clearSynchronized = function() {
                        return this.setQueue([]), this._block = !1, this._green = !0
                    }, e.prototype.filter = function(t) {
                        var e;
                        return this._queue = function() {
                            var i, n, o, r;
                            for (r = [], i = 0, n = (o = this._queue).length; i < n; i++) e = o[i], t(e) && r.push(e);
                            return r
                        }.call(this), this
                    }, e.prototype.push = function(t) {
                        return this._queue.push(t), this
                    }, e.prototype.go = function() {
                        var e;
                        return e = arguments.length >= 1 ? t.call(arguments, 0) : [], this._green = !0, this.goArgs = e, this.flush.apply(this, e), this
                    }, e.prototype.stop = function() {
                        return this._green = !1, this
                    }, e.prototype.run = function() {
                        var e, i, n, o;
                        for (n = 0, o = (i = arguments.length >= 1 ? t.call(arguments, 0) : []).length; n < o; n++) e = i[n], this.runFn(e);
                        return this
                    }, e.prototype.then = function() {
                        return this.run.apply(this, arguments)
                    }, e.prototype.runFn = function(t) {
                        return this._green && !this._block ? this._lock ? this.tryAndReport(t) : (this.push(t), this.flush()) : this.push(t), this
                    }, e.prototype.remove = function() {
                        var e, i, n, o;
                        for (n = 0, o = (i = arguments.length >= 1 ? t.call(arguments, 0) : []).length; n < o; n++) e = i[n], this.removeFn(e);
                        return this
                    }, e.prototype.removeFn = function(t) {
                        return this.filter((function(e) {
                            return t !== e
                        })), this
                    }, e.prototype.setQueue = function(t) {
                        return this._queue = t, this
                    }, e.prototype.getQueue = function() {
                        return this._queue
                    }, e.prototype._allInOne = function() {
                        var e, i;
                        return e = arguments[0], i = arguments.length >= 2 ? t.call(arguments, 1) : [], !0 === e ? this.go.apply(this, i) : !1 === e ? this.stop() : null != e ? e instanceof Array ? this.run.apply(this, e) : "string" == typeof e ? this[e].apply(this, i) : this.run.apply(this, arguments) : this._green
                    }, e
                }(), n.when = function() {
                    var e, i, o, r, s, a, l, u;
                    for (u = arguments.length >= 1 ? t.call(arguments, 0) : [], a = new n, o = function() {
                            return a.go.apply(a, arguments)
                        }, e = function(t, e) {
                            return o = function() {
                                return e((function() {
                                    return t.apply(null, arguments)
                                }))
                            }
                        }, i = 0, r = (s = u.reverse()).length; i < r; i++) l = s[i], e(o, l);
                    return o(), a
                }, n._drainStopGosAsync = function(t, e, i) {
                    var r;
                    if (null == i && (i = 0), !(e.length < 1)) return (r = e.shift()).run((function() {
                        return n._drainStopGosAsync(t, e, i + 1)
                    })), (0, o.doTimeout)("".concat(t, ".").concat(i), (function() {
                        return r.go()
                    }), 0), r
                }
            }).call(void 0)
        },
        52: (t, e, i) => {},
        67: (t, e, i) => {
            i.r(e), i.d(e, {
                clearTimeouts: () => s,
                doTimeout: () => r
            });
            var n = i(3),
                o = i(6);
            n.Wistia;
            null == n.Wistia._timeouts && (n.Wistia._timeouts = {});
            var r = function(t, e) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    (0, o.isArray)(t) && (t = t.join("."));
                    var r = l(t);
                    if (s(t, r), e) {
                        var a = n.Wistia._timeouts[r];
                        null == a && (a = n.Wistia._timeouts[r] = {});
                        var u = setTimeout((function() {
                            delete a[t], e()
                        }), i);
                        return a[t] = u, u
                    }
                    return n.Wistia._timeouts[r][t]
                },
                s = function(t) {
                    var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if ((0, o.isArray)(t) && (t = t.join(".")), "__global__" === (i = i || l(t)) && (e = n.Wistia._timeouts[t]))
                        for (var r in e) {
                            var s = e[r];
                            clearTimeout(s), delete e[r]
                        }
                    if (e = n.Wistia._timeouts[i])
                        for (var u in e) {
                            var c = e[u];
                            !u.indexOf || 0 !== u.indexOf(t) || u.length !== t.length && "." !== u.charAt(t.length) || (clearTimeout(c), delete e[u])
                        }
                    n.Wistia.blockSweepTimeouts || (n.Wistia.blockSweepTimeouts = !0, setTimeout(a, 0), setTimeout((function() {
                        n.Wistia.blockSweepTimeouts = !1
                    }), 5e3))
                },
                a = function() {
                    for (var t in n.Wistia._timeouts) {
                        var e = n.Wistia._timeouts[t];
                        (0, o.isEmpty)(e) && delete n.Wistia._timeouts[t]
                    }
                },
                l = function(t) {
                    var e = t.indexOf(".");
                    return e > 0 ? t.substring(0, e) : "__global__"
                }
        },
        53: (t, e, i) => {},
        22: (t, e, i) => {
            i.d(e, {
                Url: () => c,
                proto: () => r
            });
            var n = i(6),
                o = i(13),
                r = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.href;
                    return /^http:\/\//.test(t) ? "http:" : "https:"
                },
                s = function(t) {
                    if (null == t) return t;
                    var e;
                    try {
                        e = decodeURIComponent(t)
                    } catch (i) {
                        setTimeout((function() {
                            o.wlog.notice(i)
                        }), 50), e = t
                    }
                    return e
                },
                a = function(t) {
                    for (var e = t[0], i = 1; i < t.length; i++) e += "[".concat(t[i], "]");
                    return e
                },
                l = function(t) {
                    return t.match(/([\w\-_]+)/g)
                },
                u = ["protocol", "host", "port", "params", "path"],
                c = function(t) {
                    var e = this;
                    return e.params = {}, e.path = [], e.host = "", "object" == typeof t ? e.fromOptions(t) : t && e.fromRaw(t), e
                },
                h = c.prototype;
            h.fromOptions = function(t) {
                for (var e = 0; e < u.length; e++) {
                    var i = u[e];
                    null != t[i] && (this[i] = t[i])
                }
                return this
            }, h.fromRaw = function(t) {
                var e;
                return this.rawUrl = t, (e = t.match(/^((?:https?:)|(?:file:)|(?:ftp:))?\/\//)) && (this.protocol = e[1] || void 0), (e = t.match(/\/\/([^:?#/]*)/)) && (this.host = e[1] || void 0), (e = t.match(/\/\/.*?(\/[^?#$]+)/) || t.match(/(^\/[^/][^?#$]+)/)) && this.setPath(e[1]), (e = t.match(/:(\d+)/)) && (this.port = parseInt(e[1], 10)), (e = t.match(/\?([^#]+)/)) && (this.rawParams = e[1], this.params = function(t) {
                    var e = {};
                    if (!t) return e;
                    for (var i = t.split("&"), r = function() {
                            var t = i[a].split("="),
                                r = t[0],
                                u = t[1];
                            try {
                                r = l(decodeURIComponent(r)) || ""
                            } catch (t) {
                                setTimeout((function() {
                                    o.wlog.notice(t)
                                }), 50), r = ""
                            }(0, n.cast)(r);
                            var c = (0, n.getDeep)(e, r);
                            if (null != c)
                                if ((0, n.isArray)(c)) c.push(s(u));
                                else {
                                    var h = [c];
                                    h.push(s(u)), (0, n.setAndPreserveUndefined)(e, r, h)
                                }
                            else(0, n.setAndPreserveUndefined)(e, r, s(u))
                        }, a = 0; a < i.length; a++) r();
                    return e
                }(this.rawParams)), (e = t.match(/#(.*)$/)) && (this.anchor = e[1]), this
            }, h.clone = function() {
                return new c({
                    protocol: this.protocol,
                    host: this.host,
                    port: this.port,
                    path: (0, n.clone)(this.path),
                    params: (0, n.clone)(this.params),
                    anchor: this.anchor
                })
            }, h.ext = function(t) {
                if (null != t) {
                    var e = this.ext(),
                        i = this.path.length - 1,
                        n = new RegExp("\\.".concat(e), "g");
                    return e && (this.path[i] = "".concat(this.path[i].replace(n, ""))), this.path[i] = "".concat(this.path[i], ".").concat(t)
                }
                var o = this.path[this.path.length - 1].match(/\.(.*)$/);
                return null != o && o[1] || null
            }, h.isRelative = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location,
                    e = this.protocol,
                    i = this.host;
                return !(null != e && "" !== e && e !== t.protocol || i && i !== t.hostname)
            }, h.toString = function() {
                return this.isRelative() ? this.relative() : this.absolute()
            }, h.absolute = function() {
                var t = "";
                null != this.protocol && (t = this.protocol);
                var e = "";
                return null != this.port && (e = ":".concat(this.port)), "".concat(t, "//").concat(this.host || location.host).concat(e).concat(this.relative())
            }, h.relative = function() {
                var t, e = "";
                this.path.length > 0 && ("string" == typeof(t = this.path) && (t = t.split("/")), e = null == t ? "" : "/".concat(t.join("/")), this._hasTrailingSlash && (e += "/"));
                var i, o, r = "?".concat((i = this.params, o = [], (0, n.eachLeaf)(i, (function(t, e) {
                    null != t ? o.push("".concat(encodeURIComponent(a(e)), "=").concat(encodeURIComponent(t))) : o.push(encodeURIComponent(a(e)))
                })), o.join("&")));
                return 1 === r.length && (r = ""), "".concat(e).concat(r).concat(this.relativeAnchor())
            }, h.authority = function() {
                var t = null != this.port ? ":".concat(this.port) : "";
                return "".concat(this.host).concat(t)
            }, h.relativeProtocol = function() {
                var t = "";
                return null != this.port && (t = ":".concat(this.port)), "//".concat(this.host).concat(t).concat(this.relative())
            }, h.relativeAnchor = function() {
                var t = "";
                return null != this.anchor && (t = "#".concat(this.anchor)), "".concat(t)
            }, h.setPath = function(t) {
                this.rawPath = t, this._hasTrailingSlash = /\/$/.test(this.rawPath), this.path = function(t) {
                    var e = [];
                    if (null == t) return e;
                    for (var i = t.split(/\/+/), n = 0; n < i.length; n++) {
                        var o = i[n];
                        null != o && "" !== o && e.push(o)
                    }
                    return e
                }(this.rawPath)
            }, c.create = function(t) {
                return new c(t)
            };
            c.create;
            c.parse = function(t) {
                return new c(t)
            };
            c.parse
        },
        15: (t, e, i) => {
            i.d(e, {
                makeWbindable: () => r
            });
            var n = i(3),
                o = i(16);
            n.Wistia.bindable || (n.Wistia.bindable = {
                bind: function(t, e) {
                    return this.specialBind && !0 === this.specialBind.apply(this, arguments) ? this : e ? (o.bind.call(this, t, e), this) : void(n.Wistia.warn && n.Wistia.warn(this.constructor.name, "bind", "falsey value passed in as callback:", e))
                },
                unbind: function(t, e) {
                    return this.specialUnbind && !0 === this.specialUnbind.apply(this, arguments) || (e ? o.unbind.call(this, t, e) : this._bindings && (this._bindings[t] = []), this._bindings && this._bindings[t] && !this._bindings[t].length && (this._bindings[t] = null, delete this._bindings[t])), this
                },
                on: function(t, e) {
                    var i = this.specialBind && this.specialBind.apply(this, arguments);
                    return "function" == typeof i ? i : o.bind.call(this, t, e)
                },
                off: function(t, e) {
                    var i = this.specialUnbind && this.specialUnbind.apply(this, arguments);
                    return "function" == typeof i ? i : o.unbind.call(this, t, e)
                },
                rebind: function(t, e) {
                    return this.unbind(t, e), this.bind(t, e), this
                },
                trigger: function(t) {
                    for (var e, i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) n[r - 1] = arguments[r];
                    return (e = o.trigger).call.apply(e, [this, t].concat(n)), this
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
            var r = function(t) {
                for (var e in n.Wistia.bindable) {
                    var i = n.Wistia.bindable[e];
                    t[e] || (t[e] = i)
                }
            }
        },
        13: (t, e, i) => {
            i.d(e, {
                wlog: () => v
            });
            var n = i(3),
                o = i(14);

            function r(t) {
                return function(t) {
                    if (Array.isArray(t)) return s(t)
                }(t) || function(t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return s(t, e);
                        var i = {}.toString.call(t).slice(8, -1);
                        return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? s(t, e) : void 0
                    }
                }(t) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
                return n
            }
            var a = {
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
                        for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                        return e.log(0, i)
                    }, e.warn = function() {
                        for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                        return e.log(1, i)
                    }, e.notice = function() {
                        for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                        return e.log(1, i)
                    }, e.info = function() {
                        for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                        return e.log(3, i)
                    }, e.debug = function() {
                        for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                        return e.log(4, i)
                    }, e.ctx = t, e.ctx.initializedAt || e.reset(), e
                },
                c = u.prototype;
            c.reset = function() {
                this.ctx.level = 0, this.ctx.grep = null, this.ctx.grepv = null, this.ctx.first1000LogLines = [], this.ctx.last1000LogLines = [], this.ctx.initializedAt = (new Date).getTime()
            }, c.setLevel = function(t) {
                var e = this.logFunc(3);
                null != a[t] ? (this.ctx.level = a[t], e('Log level set to "'.concat(t, '" (').concat(a[t], ")"))) : e('Unknown log level "'.concat(t, '"'))
            }, c.setGrep = function(t) {
                this.ctx.grep = t
            }, c.setGrepv = function(t) {
                this.ctx.grepv = t
            }, c.first1000LogLines = function() {
                return this.ctx.first1000LogLines
            }, c.last1000LogLines = function() {
                return this.ctx.last1000LogLines
            }, c.matchedGrep = function(t) {
                var e = !1;
                if (this.ctx.grep || this.ctx.grepv) {
                    for (var i = [], n = 0; n < t.length; n++) try {
                        var o = t[n];
                        i.push(o.toString && o.toString())
                    } catch (t) {
                        i.push("")
                    }
                    var r = i.join(" "),
                        s = !this.ctx.grep || r.match(this.ctx.grep),
                        a = !this.ctx.grepv || !r.match(this.ctx.grepv);
                    e = s && a
                } else e = !0;
                return e
            }, c.now = function() {
                return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now().toFixed(3) : Date.now ? Date.now() - this.ctx.initializedAt : (new Date).getTime() - this.ctx.initializedAt
            }, c.messagesToLogLine = function(t, e, i) {
                var n, o = [t, e];
                o = o.concat(i);
                try {
                    (n = o.join(" ") || "").length > 200 && (n = n.slice(0, 200))
                } catch (t) {
                    n = "could not serialize"
                }
                return n
            }, c.persistLine = function(t) {
                this.ctx.first1000LogLines.length < 1e3 ? this.ctx.first1000LogLines.push(t) : (this.ctx.last1000LogLines.length >= 1e3 && this.ctx.last1000LogLines.shift(), this.ctx.last1000LogLines.push(t))
            }, c.log = function(t, e) {
                var i, n = t <= this.ctx.level,
                    s = t < 4,
                    a = (n || s) && this.matchedGrep(e);
                if (0 === t && (0, o.globalTrigger)("problem", {
                        type: "error-logged",
                        data: {
                            messages: e
                        }
                    }), a && (n || s) && (i = this.now()), s && a) {
                    var l = this.messagesToLogLine(t, i, e);
                    this.persistLine(l)
                }
                if (n && a) {
                    var u, c = this.logFunc(t);
                    1 === e.length && (u = e[0]) instanceof Error ? (c(u.message), u.stack && c(u.stack)) : c.apply(void 0, r(e))
                }
            };
            var h = function() {
                    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                    console.error.apply(console, e)
                },
                d = function() {
                    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                    console.warn.apply(console, e)
                },
                p = function() {
                    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                    console.info.apply(console, e)
                },
                f = function() {
                    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                    console.debug.apply(console, e)
                },
                m = function(t) {
                    console.log.apply(console, t)
                };
            c.logFunc = function(t) {
                return null == t && (t = this.level), console ? (0 === t ? e = h : 1 === t ? e = d : 3 === t ? e = p : 4 === t && (e = f), e || (e = m), "function" != typeof e && (this.noConsoleLog = !0, e = l), e) : l;
                var e
            }, c.maybePrefix = function(t, e) {
                if (t) {
                    if ("function" == typeof t) try {
                        t = t()
                    } catch (e) {
                        t = 'prefix err "'.concat(e.message, '"')
                    }
                    return t instanceof Array ? t.concat(e) : [t].concat(e)
                }
                return e
            }, c.getPrefixedFunctions = function(t) {
                var e = this;
                return {
                    log: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(0, e.maybePrefix(t, n))
                    },
                    error: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(0, e.maybePrefix(t, n))
                    },
                    warn: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(1, e.maybePrefix(t, n))
                    },
                    notice: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(1, e.maybePrefix(t, n))
                    },
                    info: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(3, e.maybePrefix(t, n))
                    },
                    debug: function() {
                        for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
                        return e.log(4, e.maybePrefix(t, n))
                    }
                }
            }, n.Wistia && null == n.Wistia.wlogCtx && (n.Wistia.wlogCtx = {});
            var v = new u(n.Wistia.wlogCtx)
        },
        3: (t, e, i) => {
            i.d(e, {
                Wistia: () => r
            });
            var n = i(4),
                o = function(t, e) {
                    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                    return Object.prototype.hasOwnProperty.call(Object(t), e)
                };
            null == n.root.Wistia && (n.root.Wistia = {});
            var r = n.root.Wistia;
            null == r._initializers && (r._initializers = {}), null == r._destructors && (r._destructors = {}), null == r.mixin && (r.mixin = function(t, e) {
                for (var i in e) o(e, i) && (t[i] = e[i])
            }), null == r._remoteData && (r._remoteData = new Map), null == r._mediaDataPromises && (r._mediaDataPromises = {})
        }
    },
    __webpack_module_cache__ = {};

function __webpack_require__(t) {
    var e = __webpack_module_cache__[t];
    if (void 0 !== e) return e.exports;
    var i = __webpack_module_cache__[t] = {
        exports: {}
    };
    return __webpack_modules__[t](i, i.exports, __webpack_require__), i.exports
}
__webpack_require__.d = (t, e) => {
    for (var i in e) __webpack_require__.o(e, i) && !__webpack_require__.o(t, i) && Object.defineProperty(t, i, {
        enumerable: !0,
        get: e[i]
    })
}, __webpack_require__.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), __webpack_require__.r = t => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
    }), Object.defineProperty(t, "__esModule", {
        value: !0
    })
};
var __webpack_exports__ = {},
    bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    };
! function(t) {
    var e, i, n, o, r, s, a, l, u, c, h, d, p, f, m, v, y, g, b, _, w, A, k, x, T, B, C, E, S, O, P, W, F, M, I;
    if (!Wistia.Popover) __webpack_require__(701), __webpack_require__(702), e = __webpack_require__(76).Color, E = __webpack_require__(21), a = E.eV1HostWithPort, l = E.eV1Protocol, S = __webpack_require__(125), M = S.scrollTop, F = S.scrollLeft, B = __webpack_require__(71).flexibleDuration, n = __webpack_require__(100).asyncChain, C = __webpack_require__(51).notSetOrTrue, O = __webpack_require__(67), s = O.doTimeout, o = O.clearTimeouts, r = __webpack_require__(174).controlMultiplierEstimatedByWidth, I = __webpack_require__(24).seqId, P = __webpack_require__(5), i = P.addInlineCss, u = P.elemAddClass, c = P.elemAnimate, h = P.elemAppend, d = P.elemBind, p = P.elemContainsOffset, f = P.elemFromObject, m = P.elemHeight, v = P.elemInDom, y = P.elemIsInside, g = P.elemPrepend, b = P.elemRebind, _ = P.elemRemove, w = P.elemRemoveClass, A = P.elemStyle, k = P.elemUnbind, x = P.elemUnbindAllInside, T = P.elemWidth, W = __webpack_require__(124).sanePlayerColor, Wistia.Popover = function() {
        function t(t) {
            var e, i;
            (this.video = t, this.fitVideo = bind(this.fitVideo, this), this.show = bind(this.show, this), this.showAndPlay = bind(this.showAndPlay, this), this.showHandler = bind(this.showHandler, this), this.showAndMaybePlay = bind(this.showAndMaybePlay, this), this.hide = bind(this.hide, this), this.fitCloseButton = bind(this.fitCloseButton, this), this.fitOverlay = bind(this.fitOverlay, this), this.fit = bind(this.fit, this), this.fitEmbedContainer = bind(this.fitEmbedContainer, this), this.fitNatural = bind(this.fitNatural, this), this._closeButtonBlurStyle = bind(this._closeButtonBlurStyle, this), this._closeButtonFocusStyle = bind(this._closeButtonFocusStyle, this), this._onLeaveVideoOrCloseButton = bind(this._onLeaveVideoOrCloseButton, this), this._onEnterVideoOrCloseButton = bind(this._onEnterVideoOrCloseButton, this), this.setupBindings = bind(this.setupBindings, this), this.unexpandPlayButtonOnMouseOut = bind(this.unexpandPlayButtonOnMouseOut, this), this.unexpandPlayButtonImmediately = bind(this.unexpandPlayButtonImmediately, this), this.unexpandPlayButton = bind(this.unexpandPlayButton, this), this.expandPlayButton = bind(this.expandPlayButton, this), this.setupThumbnailAfterMediaData = bind(this.setupThumbnailAfterMediaData, this), this.inlineHtmlHandler = bind(this.inlineHtmlHandler, this), this.video.isRemoved()) ? this.video.notice("abort popover initialization, video already removed"): (this.info("init"), this.uuid = I(), this._embedContainer = this.video._embedContainer, this._popoverContainer = this.video._popoverContainer, u(this._embedContainer, "wistia_popover_embed"), this._scaleFactor = this.containerScaleFactor() || 1, this._thumbContainer = f({
                id: I() + ".thumb_container",
                class: "wistia_click_to_play",
                style: {
                    position: "relative"
                }
            }), "inline" === this.video.container.style.display && A(this._thumbContainer, {
                display: "inline"
            }), h(this.video.container, this._thumbContainer), e = this.video._gatherOptions(), this.info("opts", e), "thumbnail" === e.popoverContent || null == e.popoverContent ? (this._hasThumbnail = !0, this.video.hasData(this.setupThumbnailAfterMediaData)) : (this.info("init with bare html", this.video._startingHtml), this._thumbContainer.innerHTML = this.video._startingHtml, d(this._thumbContainer, "keydown", this.inlineHtmlHandler), d(this._thumbContainer, "click", this.inlineHtmlHandler)), this.resizeToContainer(), this.createCloseButton(), this.hide(!0), this.setupBindings(), this.video.embedded((i = this, function() {
                if (i._popoverContainer.setAttribute("aria-label", i.video.name()), i.video._attrs.popoverShowOnLoad) return !1 === i.video._attrs.autoplay ? i.show() : i.showAndPlay(), i.video.focus(), i._closeButtonSetVisibleStyle()
            })))
        }
        return t.prototype.inlineHtmlHandler = function(t) {
            var e, i, n, o;
            return e = t instanceof KeyboardEvent, i = t instanceof MouseEvent, o = null != t ? t.target.tagName.toLowerCase() : void 0, n = null != t ? t.keyCode : void 0, e && ("button" === o && (13 === n || 32 === n) || "a" === o && 13 === n) || i ? (t.preventDefault(), this.showHandler(t)) : void 0
        }, t.prototype.isMobile = function() {
            return Wistia.detect.ipad || Wistia.detect.iphone || Wistia.detect.android
        }, t.prototype.setupThumbnailAfterMediaData = function() {
            return this.info("setupThumbnailAfterMediaData"), n(this.video.uuid + ".popover.setup_thumbnail", [(t = this, function() {
                return t.initThumbnail(), A(t.thumbnail.elem, {
                    cursor: "pointer"
                })
            }), function(t) {
                return function() {
                    return t.resizeToContainer()
                }
            }(this), function(t) {
                return function() {
                    return t.monitor()
                }
            }(this)]);
            var t
        }, t.prototype.initThumbnail = function() {
            var t, e, i;
            return e = {
                tabbable: !0,
                fitStrategy: "cropfill",
                onActivate: this.showHandler,
                images: this.video._impl.thumbnailAssets(),
                borderRadius: this.video._attrs.playerBorderRadius * this._scaleFactor || 0,
                bigPlayButton: !!C(this.video._attrs.bigPlayButton) && (t = {
                    color: this.video.playerColor(),
                    tabbable: !1,
                    borderRadius: this.video._attrs.bigPlayButtonBorderRadius * this._scaleFactor || 0,
                    newRoundedIcons: this.video._opts.newRoundedIcons
                }, this.shouldAnimate() && (C(this.video._opts.popoverHoverDuration) && (t.bottomText = this.shortHumanDuration(this.video.duration())), this.video._opts.popoverHoverName && (t.topText = this.video.name())), t),
                onMouseover: this.shouldAnimate() ? this.expandPlayButton : null,
                onMouseout: this.shouldAnimate() ? this.unexpandPlayButtonOnMouseOut : null
            }, null != this.video._opts.thumbnailAltText && (e.altText = this.video._opts.thumbnailAltText), this.thumbnail = new Wistia.Thumbnail(this._thumbContainer, e), null != (i = this.thumbnail.bigPlayButton) && "function" == typeof i.removeBottomText && i.removeBottomText(), this.thumbnail
        }, t.prototype.shortHumanDuration = function(t) {
            return B(t)
        }, t.prototype.shouldAnimate = function() {
            return !0 === this.video._attrs.popoverAnimateThumbnail
        }, t.prototype.expandPlayButton = function() {
            var t, e;
            return null != (t = this.thumbnail) && null != (e = t.bigPlayButton) ? e.cover() : void 0
        }, t.prototype.unexpandPlayButton = function() {
            var t, e;
            return null != (t = this.thumbnail) && null != (e = t.bigPlayButton) ? e.uncover() : void 0
        }, t.prototype.unexpandPlayButtonImmediately = function() {
            var t, e;
            return null != (t = this.thumbnail) && null != (e = t.bigPlayButton) ? e.uncoverImmediately() : void 0
        }, t.prototype.unexpandPlayButtonOnMouseOut = function(t) {
            if (!p(this.thumbnail.elem, t.pageX, t.pageY)) return this.unexpandPlayButton()
        }, t.prototype.fixedSizeTooBigForWindow = function() {
            return this.video._popoverSize().width + 160 > T(window) || this.video._popoverSize().height + 160 > m(window)
        }, t.prototype.isResponsive = function() {
            return !this.isFixedSize()
        }, t.prototype.isFixedSize = function() {
            return !!this.video._opts.popoverSize
        }, t.prototype.monitor = function() {
            return this.info("monitor container size"), this._lastWidth = this.containerWidth(), this._lastHeight = this.containerHeight(), Wistia.eventLoop.add(this.video.uuid + "_popover.watch_popover_thumb_elem", 300, (t = this, function() {
                if (t._lastWidth === t.containerWidth() && t._lastHeight === t.containerHeight() || (t.preventAnimation(), t.resizeToContainer(), t.allowAnimation(), t._lastWidth = t.containerWidth(), t._lastHeight = t.containerHeight()), t._thumbContainer && !v(t._thumbContainer)) return h(t.video.container, t._thumbContainer)
            }));
            var t
        }, t.prototype.resizeToContainer = function() {
            var t, e, i, n, o, r, s;
            return r = this.containerHeight(), "WISTIA-PLAYER" === this.video.container.tagName && this._hasThumbnail && "" === this.video.container.style.width && "" === this.video.container.style.height && (r = this.video.heightForWidth(this.containerWidth()), A(this.video.container, {
                height: r + "px"
            })), A(this._thumbContainer, {
                height: r + "px",
                width: this.containerWidth() + "px"
            }), null != (e = this.thumbnail) && e.fit(), this._scaleFactor = this.containerScaleFactor() || 1, s = this.video._attrs.playerBorderRadius * this._scaleFactor || 0, null != (i = this.thumbnail) && i.setBorderRadius(s), t = this.video._attrs.bigPlayButtonBorderRadius * this._scaleFactor || 0, null != (n = this.thumbnail) && null != (o = n.bigPlayButton) ? o.setBorderRadius(t) : void 0
        }, t.prototype.containerWidth = function() {
            return T(this.video.container)
        }, t.prototype.containerHeight = function() {
            return m(this.video.container)
        }, t.prototype.containerScaleFactor = function() {
            return Math.min(1.3, Math.max(.6, r(this.containerWidth()))) || 1
        }, t.prototype.setupBindings = function() {
            var t;
            return this.video.videoFoam() || b(window, "resize", this.fit), this.video.rebind("cancel-fullscreen", this.fitNatural), this.video.rebind("widthchange", this.fitEmbedContainer), this.video.rebind("widthchange", this.fit), this.video.rebind("heightchange", this.fit), null == this._showIfHidden && (this._showIfHidden = (t = this, function() {
                if (!t._visible) return t.show()
            })), this.video.rebind("play", this._showIfHidden), this.video.rebind("afterreplace", this.setupBindings), b(this._embedContainer, "mouseover", this._onEnterVideoOrCloseButton), b(this._embedContainer, "mouseout", this._onLeaveVideoOrCloseButton), b(this._closeButton, "mouseover", this._onEnterVideoOrCloseButton), b(this._closeButton, "mouseout", this._onLeaveVideoOrCloseButton), b(this._closeButton, "focus", this._closeButtonFocusStyle), b(this._closeButton, "blur", this._closeButtonBlurStyle)
        }, t.prototype._onEnterVideoOrCloseButton = function(t) {
            var e;
            if (this._visible) return (e = t.target || t.srcElement) && (y(e, this._embedContainer) || y(e, this._closeButton)) ? this._closeButtonSetVisibleStyle() : void 0
        }, t.prototype._onLeaveVideoOrCloseButton = function(t) {
            var e;
            if ((e = t.relatedTarget || t.toElement) && y(e, this._overlay)) return A(this._closeButton, {
                opacity: 0
            })
        }, t.prototype._closeButtonFocusStyle = function(t) {
            return A(this._closeButton, {
                outline: "2px solid white"
            })
        }, t.prototype._closeButtonBlurStyle = function(t) {
            return A(this._closeButton, {
                outline: "none"
            })
        }, t.prototype._closeButtonSetVisibleStyle = function() {
            return A(this._closeButton, {
                opacity: .8
            })
        }, t.prototype.unbindAll = function() {
            return k(window, "resize", this.fit), this._overlay && this._hideOnClick && k(this._overlay, "click", this._hideOnClick), this._hideOnEscape && k(document, "keyup", this._hideOnEscape), this.video.unbind("widthchange", this.fitEmbedContainer), this.video.unbind("widthchange", this.fit), this.video.unbind("heightchange", this.fit), this._showIfHidden && this.video.unbind("play", this._showIfHidden), x(this._thumbContainer), k(this._thumbContainer, "keydown", this.inlineHtmlHandler), k(this._thumbContainer, "mousedown", this.inlineHtmlHandler), k(this._dummyStartFocusTrap, "focus"), k(this._dummyEndFocusTrap, "focus")
        }, t.prototype.remove = function() {
            var t;
            return null != (t = this.thumbnail) && t.destroy(), this.unbindAll(), Wistia.eventLoop.remove(this.video.uuid + "_popover"), o(this.video.uuid + "_popover"), _(this._thumbContainer), _(this._overlay), _(this._closeButton), _(this._captionElem), this._thumbContainer = this._overlay = this._captionElem = this.thumbnail = null
        }, t.prototype.letViewportReturnToNaturalSize = function() {
            return this._overlay && A(this._overlay, {
                height: "1px",
                width: "1px"
            }), this._closeButton && A(this._closeButton, {
                left: 0
            }), this._embedContainer && A(this._embedContainer, {
                bottom: "",
                left: 0,
                right: "",
                top: 0
            }), this.video.width(100, {
                constrain: !0
            })
        }, t.prototype.fitNatural = function() {
            return this.letViewportReturnToNaturalSize(), this.fit(), this.video.monitor()
        }, t.prototype.fitEmbedContainer = function(t) {
            var e;
            if ((this.isResponsive && this._embedContainer.style.width !== t || this.fixedSizeTooBigForWindow()) && (e = "WISTIA-PLAYER" === this.video.container.tagName ? this.getEmbedContainerWidth() : t, A(this._embedContainer, {
                    height: this.video.heightForWidth(e) + "px",
                    width: e + "px"
                })), this.isFixedSize && this._embedContainer.style.width !== this.video._popoverSize().width && !this.fixedSizeTooBigForWindow()) return A(this._embedContainer, {
                height: this.video._popoverSize().height + "px",
                width: this.video._popoverSize().width + "px"
            })
        }, t.prototype.fit = function() {
            var t;
            if (!(this._fitCount > 20)) return this._fitCount += 1, this.video.embedded((t = this, function() {
                return t._overlay ? (A(t._overlay, {
                    height: "1px",
                    width: "1px"
                }), setTimeout((function() {
                    return t._fitCount = 0, t.fitOverlay()
                }), 1)) : t._fitCount = 0, t._closeButton && (A(t._closeButton, {
                    left: 0
                }), requestAnimationFrame((function() {
                    return t.fitCloseButton()
                }))), requestAnimationFrame((function() {
                    return t.fitVideo(), t.resizeToContainer()
                }))
            }))
        }, t.prototype.bestOverlayHeight = function() {
            return Math.max(m(document), m(window))
        }, t.prototype.bestOverlayWidth = function() {
            return Math.max(T(document), T(window))
        }, t.prototype.createCloseButton = function() {
            var t;
            return this._closeButton = f({
                id: this._embedContainer.id + "_popover_close_button",
                class: "wistia_placebo_close_button",
                alt: "Close",
                tagName: "button",
                role: "button",
                tabindex: -1,
                "aria-label": "Close",
                style: {
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    height: "34px",
                    left: 0,
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    width: "34px",
                    zIndex: 10002,
                    overflow: "hidden",
                    margin: 0,
                    padding: 0
                },
                childNodes: [{
                    tagName: "img",
                    alt: "Click to close video",
                    style: {
                        height: "34px",
                        width: "34px",
                        position: "absolute",
                        maxWidth: "none",
                        right: "2px",
                        top: "1px"
                    }
                }]
            }), null == this._hideOnClickClose && (this._hideOnClickClose = (t = this, function() {
                return t.hide()
            })), b(this._closeButton, "click", this._hideOnClickClose), h(this._popoverContainer, this._closeButton)
        }, t.prototype._closeButtonBase64 = function() {
            return "data:image/gif;base64,R0lGODlhRABEAIABAP///////yH5BAEAAAEALAAAAABEAEQAAAKVjI+py+0Po5y02oszBPxyoGFfR41gWJlnpKJWu5muJzvw/NbLjefjruvRfgiecPg5GI/IzpLZfEKjyelMtbKisFoXltQVfcHhkkxaZtzQ6WIwwG4/42E03Rq/M+/6Xr9/RTTxVkc2aNiWqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGyvbUwAAOw=="
        }, t.prototype.createAndAddDummyFocusTraps = function() {
            var t;
            return this._dummyStartFocusTrap = f({
                id: this.video.uuid + "_start_focus",
                tabindex: 0
            }), this._dummyEndFocusTrap = f({
                id: this.video.uuid + "_end_focus",
                tabindex: 0
            }), g(this._popoverContainer, this._dummyStartFocusTrap), h(this._popoverContainer, this._dummyEndFocusTrap), this._unbindFocusOnFocusTrapStart && this._unbindFocusOnFocusTrapStart(), this._unbindFocusOnFocusTrapStart = d(this._dummyStartFocusTrap, "focus", (t = this, function(e) {
                return t._focusHelper = !0, t._dummyEndFocusTrap.focus()
            })), this._unbindFocusOnFocusTrapEnd && this._unbindFocusOnFocusTrapEnd(), this._unbindFocusOnFocusTrapEnd = d(this._dummyEndFocusTrap, "focus", function(t) {
                return function(e) {
                    return !0 === t._focusHelper ? (t._focusHelper = !1, t._captionElem ? t._captionElem.focus() : t._closeButton.focus()) : t.video.focus()
                }
            }(this))
        }, t.prototype.createOverlay = function() {
            var t;
            return this.destroyOverlay(), this.info("createOverlay"), this._overlay = f({
                id: this._embedContainer.id + "_overlay",
                class: "wistia_popover_overlay",
                style: {
                    backgroundImage: "url(" + l() + "//" + a() + "/assets/images/blank.gif)",
                    height: this.bestOverlayHeight() + "px",
                    left: 0,
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    width: this.bestOverlayWidth() + "px",
                    zIndex: 1e4
                }
            }), A(this._overlay, {
                backgroundColor: this._overlayColor().toRgba()
            }), h(document.body, this._overlay), this._blockClick = !0, null == this._hideOnClick && (this._hideOnClick = (t = this, function() {
                if (t.info("hideOnClick", t._blockClick), !t._blockClick) return t.hide()
            })), b(this._overlay, "click", this._hideOnClick), s(this.video.uuid + ".popover.allow_click", function(t) {
                return function() {
                    return t._blockClick = !1
                }
            }(this), 600)
        }, t.prototype._popoverBorderWidth = function() {
            var t;
            return t = this.video._attrs.popoverBorderWidth || 0, String(t).replace(/\D/g, "")
        }, t.prototype._overlayColor = function() {
            var t, i;
            return t = W(this.video._attrs.popoverOverlayColor || "000000"), i = null != this.video._attrs.popoverOverlayOpacity ? this.video._attrs.popoverOverlayOpacity : .5, new e(t).alpha(i)
        }, t.prototype._playerColor = function() {
            return new e(this.video.playerColor()).alpha(.9)
        }, t.prototype.destroyOverlay = function() {
            return this.info("destroyOverlay"), _(this._overlay), this._overlay = null
        }, t.prototype.destroyDummyFocusElems = function() {
            return _(this._dummyStartFocusTrap), _(this._dummyEndFocusTrap)
        }, t.prototype.fitOverlay = function() {
            if (this._visible && this._overlay) return A(this._overlay, {
                height: this.bestOverlayHeight() + "px",
                width: this.bestOverlayWidth() + "px"
            })
        }, t.prototype.closeButtonHeight = function() {
            return Math.min(18, this.bestVideoBoundingBox().left)
        }, t.prototype.closeButtonWidth = function() {
            return Math.min(21, this.bestVideoBoundingBox().left)
        }, t.prototype.fitCloseButton = function() {
            return A(this._closeButton, {
                width: this.closeButtonWidth() + "px",
                height: this.closeButtonHeight() + "px"
            })
        }, t.prototype.hide = function(t) {
            var e, i, n, o, r, a, l;
            return null == t && (t = !1), this.info("hide"), this.video.trigger("beforepopoverhide"), a = this._visible, this._visible = !1, w(document.body, "wistia_popover_mode"), (null != (n = this.video._opts) ? n.popoverResume : void 0) && this.video.time() > 0 && this.video._saveState(), l = this, i = function() {
                var t, e, i;
                return A([l._embedContainer, l._closeButton], {
                    boxShadow: "",
                    position: "absolute",
                    top: 0
                }), l._closeButton.setAttribute("tabindex", -1), t = (null != (e = document.getElementsByTagName("html")) && null != (i = e[0]) ? i.dir : void 0) || "", A([l._embedContainer, l._closeButton], "rtl" === t ? {
                    right: "-99999px"
                } : {
                    left: "-99999px"
                }), l.destroyOverlay(), l.destroyCaption(), l.destroyDummyFocusElems(), !l.video._attrs || l.video._attrs.popoverPreventScroll ? l.allowScroll() : l.allowHorizontalScroll()
            }, "playing" === this.video.state() && (r = this.video.isControlEnabled("playPauseNotifier"), this.video.setControlEnabled("playPauseNotifier", !1), this.video.on("pause", function(t) {
                return function() {
                    return s(t.uuid + ".disable_notifier_on_hide", (function() {
                        return t.video.setControlEnabled("playPauseNotifier", r)
                    }), 1), t.video.unbind
                }
            }(this)), this.video.pause()), a && s(this.uuid + ".delayed_rebuild", function(t) {
                return function() {
                    return t.video.rebuild()
                }
            }(this), 600), this.video.embedded(function(t) {
                return function() {
                    if (t.video._pauseEventLoop(), t.shouldAnimate()) return t.unexpandPlayButtonImmediately()
                }
            }(this)), this.video.trigger("popoverhide"), this.video.container.dispatchEvent(new CustomEvent("popover-hide")), null != (o = this._prevActiveEelement) && o.focus(), !0 === t ? i() : ((e = this.animateArgs()).push(i), this.animateClose.apply(this, e))
        }, t.prototype.animateClose = function(t, e, i) {
            var n;
            if (null == t && (t = !0), this.info("animateClose", t, e), this._overlay && (t || A(this._overlay, {
                    opacity: 0
                }), setTimeout((n = this, function() {
                    return c(n._overlay, {
                        opacity: 0
                    })
                }), 1)), t || A([this._embedContainer, this._closeButton], {
                    opacity: 0
                }), setTimeout(function(t) {
                    return function() {
                        return c([t._embedContainer, t._closeButton], {
                            opacity: 0,
                            transform: t.transformProp(e)
                        }, {
                            callback: i
                        })
                    }
                }(this), 1), this._captionElem) return t || A(this._captionElem, {
                opacity: 0
            }), setTimeout(function(t) {
                return function() {
                    return c(t._captionElem, {
                        opacity: 0,
                        transform: t.transformProp(e)
                    })
                }
            }(this), 1)
        }, t.prototype.showAndMaybePlay = function() {
            return this.video._attrs.popoverDisableAutoplay ? this.show() : this.showAndPlay()
        }, t.prototype.showHandler = function(t) {
            var e;
            if (this.showAndMaybePlay(), setTimeout((e = this, function() {
                    return e.video.focus()
                }), 0), "click" !== (null != t ? t.type : void 0)) return this._closeButtonSetVisibleStyle()
        }, t.prototype.showAndPlay = function() {
            return this.info("showAndPlay"), this.show(), this.video.play()
        }, t.prototype.transformProp = function(t) {
            return "up" === t ? "translate(0, " + Math.round(this.fullHeight() / 6) + "px)" : "down" === t ? "translate(0, " + -Math.round(this.fullHeight() / 6) + "px)" : "left" === t ? "translate(" + Math.round(this.fullWidth() / 6) + "px, 0)" : "right" === t ? "translate(" + -Math.round(this.fullWidth() / 6) + "px, 0)" : ""
        }, t.prototype.animateOpen = function(t, e) {
            var i;
            if (null == t && (t = !0), this.info("animateOpen", t, e), t || A(this._overlay, {
                    opacity: 1
                }), t || A([this._embedContainer], {
                    opacity: 1
                }), A([this._embedContainer], {
                    transform: this.transformProp(e)
                }), setTimeout((i = this, function() {
                    return c([i._embedContainer], {
                        opacity: 1,
                        transform: "translate(0px, 0px)"
                    }), c(i._overlay, {
                        opacity: 1
                    })
                }), 1), this._captionElem) return t || A(this._captionElem, {
                opacity: 1
            }), A(this._captionElem, {
                transform: this.transformProp(e)
            }), setTimeout(function(t) {
                return function() {
                    return c(t._captionElem, {
                        opacity: 1,
                        transform: "translate(0px, 0px)"
                    })
                }
            }(this), 1)
        }, t.prototype.animateArgs = function() {
            return "fade" === this.video._attrs.popoverAnimation ? [!0, "none"] : "slide" === this.video._attrs.popoverAnimation ? this.slideOrFadeBasedOnPlayerType() : "none" === this.video._attrs.popoverAnimation ? [!1, "none"] : this.slideOrFadeBasedOnPlayerType()
        }, t.prototype.slideOrFadeBasedOnPlayerType = function() {
            return [!0, "none"]
        }, t.prototype.isVisible = function() {
            return this._visible
        }, t.prototype.show = function() {
            var t, e;
            return this.info("show"), this._visible = !0, u(document.body, "wistia_popover_mode"), o(this.uuid + ".delayed_rebuild"), this.video._attrs.popoverPreventScroll ? this.preventScroll() : this.preventHorizontalScroll(), this._closeButton.childNodes[0].setAttribute("src", this._closeButtonBase64()), this._closeButton.setAttribute("tabindex", 0), this.createOverlay(), this.applyVisibleStyles(), this.addCaption(), this.createAndAddDummyFocusTraps(), this.fitVideo(), this.animateOpen.apply(this, this.animateArgs()), this.setupVisibleBindings(), this._prevActiveEelement = document.activeElement, (null != (t = this.video._opts) ? t.popoverResume : void 0) && this.video.unsuspend(), this.video.embedded((e = this, function() {
                return e.video._unpauseEventLoop()
            })), this.video.trigger("popovershow"), this.video.container.dispatchEvent(new CustomEvent("popover-show"))
        }, t.prototype.preventScroll = function() {
            if (!this._savedCss) return this._savedCss = {
                height: document.body.style.height || "",
                overflow: document.body.style.overflow || ""
            }, A(document.body, {
                height: "100%",
                overflow: "hidden"
            })
        }, t.prototype.allowScroll = function() {
            if (this._savedCss) return A(document.body, {
                height: this._savedCss.height,
                overflow: this._savedCss.overflow
            }), this._savedCss = null
        }, t.prototype.preventHorizontalScroll = function() {
            if (!this._savedCss) return this._savedCss = {
                width: document.body.style.width || "",
                "overflow-x": document.body.style["overflow-x"] || ""
            }, A(document.body, {
                width: "100%",
                "overflow-x": "hidden"
            })
        }, t.prototype.allowHorizontalScroll = function() {
            if (this._savedCss) return A(document.body, {
                width: this._savedCss.width,
                "overflow-x": this._savedCss["overflow-x"]
            }), this._savedCss = null
        }, t.prototype.setupVisibleBindings = function() {
            var t;
            return null == this._hideOnEscape && (this._hideOnEscape = (t = this, function(e) {
                if (27 === e.keyCode && !e.escapeHandled) return t.info("hide on escape"), t.hide(), k(document, "keyup", t._hideOnEscape)
            })), b(document, "keyup", this._hideOnEscape)
        }, t.prototype.applyVisibleStyles = function() {
            var t, i, n, o, r, s, a, l, u, c;
            return n = this._popoverBorderWidth(), t = new e(this.video._attrs.popoverBorderColor || "#ffffff").toHex(), c = 1, this.video._impl && this.video._impl.ui && (c = this.video._impl.ui.scale()), i = this.video._opts.popoverborderradius || this.video._attrs.popoverBorderRadius || this.video._attrs.playerBorderRadius * c || 0, a = String(i).replace(/\D/g, ""), r = null != this.video._opts.popoverBoxShadowBlur ? this.video._opts.popoverBoxShadowBlur : 50, l = String(r).replace(/\D/g, ""), s = null != this.video._opts.popoverBoxShadowSpread ? this.video._opts.popoverBoxShadowSpread : 20, u = String(s).replace(/\D/g, ""), o = null == this.video._attrs.popoverBoxShadow || this.video._attrs.popoverBoxShadow ? "0 0 " + l + "px " + u + "px rgba(0,0,0,.2)" : "", A(this._embedContainer, {
                border: n + "px solid #" + t,
                borderRadius: a + "px",
                boxShadow: o,
                boxSizing: "content-box",
                left: 0,
                opacity: 0,
                position: "absolute",
                top: 0,
                zIndex: 10001
            })
        }, t.prototype.addCaption = function() {
            if (this.video._attrs.popoverCaption || this.video._attrs.popoverCaptionContainer) return this.destroyCaption(), this.info("addCaption"), this._captionElem = f({
                id: this.video.uuid + "_popover_caption",
                tabindex: "-1",
                style: {
                    color: "#ffffff",
                    fontFamily: "Verdana, Geneva, sans-serif",
                    fontSize: "14px",
                    left: 0,
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    width: 0,
                    zIndex: 10001
                }
            }), h(this._popoverContainer, this._captionElem), this.video._attrs.popoverCaption ? (this.info("build new caption with content", this.video._attrs.popoverCaption), this._captionContainer ? this._captionContainer.style.display = "block" : this._captionContainer = f({
                innerHTML: this.video._attrs.popoverCaption,
                style: {
                    padding: "10px 0 0 0"
                }
            }), h(this._captionElem, this._captionContainer)) : this.video._attrs.popoverCaptionContainer ? (this.info("use caption container", this.video._attrs.popoverCaptionContainer), this._captionContainer ? this._captionContainer.style.display = "block" : this._captionContainer = document.getElementById(this.video._attrs.popoverCaptionContainer), A(this._captionContainer, {
                display: "block"
            }), h(this._captionElem, this._captionContainer)) : void 0
        }, t.prototype.destroyCaption = function() {
            return this.info("destroyCaption"), this._captionContainer && (A(this._captionContainer, {
                display: "none"
            }), h(this._popoverContainer, this._captionContainer)), _(this._captionElem), this._captionElem = null
        }, t.prototype.fitCaption = function() {
            if (this._captionElem) return A(this._captionElem, {
                left: parseInt(A(this._embedContainer, "left"), 10) + "px",
                top: parseInt(A(this._embedContainer, "top"), 10) + this.fullHeight() + "px",
                width: this.fullWidth() + "px"
            })
        }, t.prototype.height = function(t, e) {
            return null == e && (e = {}), null != t ? (this.preventAnimation(), A(this.video.container, {
                height: t + "px"
            }), e.constrain && A(this.video.container, {
                width: this.video.widthForHeight(t) + "px"
            }), this.resizeToContainer(), this.allowAnimation(), this) : m(this.video.container)
        }, t.prototype.width = function(t, e) {
            return null == e && (e = {}), null != t ? (this.preventAnimation(), A(this.video.container, {
                width: t + "px"
            }), e.constrain && A(this.video.container, {
                height: this.video.heightForWidth(t) + "px"
            }), this.resizeToContainer(), this.allowAnimation(), this) : T(this.video.container)
        }, t.prototype.preventAnimation = function() {
            return null == this._wistiaNoAnimateStyle && (this._wistiaNoAnimateStyle = i(this._thumbContainer, ".wistia_no_animate * {\ntransition: none !important;\n-mozilla-transition: none !important;\n-ms-transition: none !important;\n-o-transition: none !important;\n-webkit-transition: none !important;\n}")), u(this._thumbContainer, "wistia_no_animate")
        }, t.prototype.allowAnimation = function() {
            return this._thumbContainer.offsetTop, w(this._thumbContainer, "wistia_no_animate")
        }, t.prototype.fullWidth = function() {
            return this.video.width() + 2 * this._popoverBorderWidth()
        }, t.prototype.fullHeight = function() {
            return this.video.height() + 2 * this._popoverBorderWidth()
        }, t.prototype.fitVideo = function() {
            var t;
            if (this._visible) return this.video.embedded((t = this, function() {
                var e, i, n, o;
                return t.video._doMonitor(), e = t.bestVideoBoundingBox(), "rtl" === ((null != (n = document.getElementsByTagName("html")) && null != (o = n[0]) ? o.dir : void 0) || "") ? (A(t._embedContainer, {
                    right: e.left + "px",
                    top: e.top + "px"
                }), A(t._closeButton, {
                    right: e.right + 17 + "px",
                    top: e.top + "px"
                })) : (A(t._embedContainer, {
                    left: e.left + "px",
                    top: e.top + "px"
                }), i = t.closeButtonWidth() + 10 > e.left ? (e.left - t.closeButtonWidth()) / 2 : 10, A(t._closeButton, {
                    left: e.right + i + "px",
                    top: e.top - 2 + "px"
                })), t.fitCaption()
            }))
        }, t.prototype.bestVideoBoundingBox = function() {
            var t, e, i, n, o, r;
            return n = T(window), i = m(window), r = this.fullWidth(), t = this.fullHeight(), e = F() + Math.round((n - r) / 2), {
                top: o = M() + Math.round((i - t) / 2),
                left: e,
                right: e + r,
                bottom: o + t,
                width: r,
                height: t
            }
        }, t.prototype.getEmbedContainerWidth = function() {
            var t, e, i, n, o;
            return i = (o = T(window)) / (n = m(window)), t = (e = Math.min(o, n)) > 500 ? 160 : Math.abs(i - this.video.aspect()) < .2 ? .2 * e : .1 * e, i > this.video.aspect() ? Math.round((n - t) * this.video.aspect()) : o - t
        }, t
    }(), Wistia.mixin(Wistia.Popover.prototype, Wistia.logHelpers), Wistia.Popover.prototype._logPrefix = function() {
        var t, e;
        return ["popover", (null != (t = this.video) ? t.hashedId() : void 0) || "no hashedId", null != (e = this._thumbContainer) ? e.id : void 0]
    }
}(Wistia);
//# sourceMappingURL=popover.js.map