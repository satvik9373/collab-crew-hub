(function() {
    var n, aa;

    function ba(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var ca = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function da(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var ea = da(this),
        fa = typeof Symbol === "function" && typeof Symbol("x") === "symbol",
        r = {},
        ia = {};

    function v(a, b, c) {
        if (!c || a != null) {
            c = ia[b];
            if (c == null) return a[b];
            c = a[c];
            return c !== void 0 ? c : a[b]
        }
    }

    function w(a, b, c) {
        if (b) a: {
            var d = a.split(".");a = d.length === 1;
            var e = d[0],
                f;!a && e in r ? f = r : f = ea;
            for (e = 0; e < d.length - 1; e++) {
                var g = d[e];
                if (!(g in f)) break a;
                f = f[g]
            }
            d = d[d.length - 1];c = fa && c === "es6" ? f[d] : null;b = b(c);b != null && (a ? ca(r, d, {
                configurable: !0,
                writable: !0,
                value: b
            }) : b !== c && (ia[d] === void 0 && (a = Math.random() * 1E9 >>> 0, ia[d] = fa ? ea.Symbol(d) : "$jscp$" + a + "$" + d), ca(f, ia[d], {
                configurable: !0,
                writable: !0,
                value: b
            })))
        }
    }
    w("Symbol", function(a) {
        function b(f) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++, f)
        }

        function c(f, g) {
            this.g = f;
            ca(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.g
        };
        var d = "jscomp_symbol_" + (Math.random() * 1E9 >>> 0) + "_",
            e = 0;
        return b
    }, "es6");
    w("Symbol.iterator", function(a) {
        if (a) return a;
        a = (0, r.Symbol)("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            typeof d === "function" && typeof d.prototype[a] != "function" && ca(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return la(ba(this))
                }
            })
        }
        return a
    }, "es6");

    function la(a) {
        a = {
            next: a
        };
        a[v(r.Symbol, "iterator")] = function() {
            return this
        };
        return a
    }

    function ma(a) {
        return na(a, a)
    }

    function na(a, b) {
        a.raw = b;
        Object.freeze && (Object.freeze(a), Object.freeze(b));
        return a
    }

    function z(a) {
        var b = typeof r.Symbol != "undefined" && v(r.Symbol, "iterator") && a[v(r.Symbol, "iterator")];
        if (b) return b.call(a);
        if (typeof a.length == "number") return {
            next: ba(a)
        };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }

    function A(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    var oa = fa && typeof v(Object, "assign") == "function" ? v(Object, "assign") : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d) A(d, e) && (a[e] = d[e])
        }
        return a
    };
    w("Object.assign", function(a) {
        return a || oa
    }, "es6");

    function pa() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    }
    w("WeakMap", function(a) {
        function b(g) {
            this.g = (f += Math.random() + 1).toString();
            if (g) {
                g = z(g);
                for (var h; !(h = g.next()).done;) h = h.value, this.set(h[0], h[1])
            }
        }

        function c() {}

        function d(g) {
            var h = typeof g;
            return h === "object" && g !== null || h === "function"
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var g = Object.seal({}),
                        h = Object.seal({}),
                        k = new a([
                            [g, 2],
                            [h, 3]
                        ]);
                    if (k.get(g) != 2 || k.get(h) != 3) return !1;
                    k.delete(g);
                    k.set(h, 4);
                    return !k.has(g) && k.get(h) == 4
                } catch (l) {
                    return !1
                }
            }()) return a;
        var e = "$jscomp_hidden_" + Math.random(),
            f = 0;
        b.prototype.set = function(g, h) {
            if (!d(g)) throw Error("Invalid WeakMap key");
            if (!A(g, e)) {
                var k = new c;
                ca(g, e, {
                    value: k
                })
            }
            if (!A(g, e)) throw Error("WeakMap key fail: " + g);
            g[e][this.g] = h;
            return this
        };
        b.prototype.get = function(g) {
            return d(g) && A(g, e) ? g[e][this.g] : void 0
        };
        b.prototype.has = function(g) {
            return d(g) && A(g, e) && A(g[e], this.g)
        };
        b.prototype.delete = function(g) {
            return d(g) && A(g, e) && A(g[e], this.g) ? delete g[e][this.g] : !1
        };
        return b
    }, "es6");
    w("Map", function(a) {
        function b() {
            var h = {};
            return h.m = h.next = h.head = h
        }

        function c(h, k) {
            var l = h[1];
            return la(function() {
                if (l) {
                    for (; l.head != h[1];) l = l.m;
                    for (; l.next != l.head;) return l = l.next, {
                        done: !1,
                        value: k(l)
                    };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }

        function d(h, k) {
            var l = k && typeof k;
            l == "object" || l == "function" ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
            var m = h[0][l];
            if (m && A(h[0], l))
                for (h = 0; h < m.length; h++) {
                    var p = m[h];
                    if (k !== k && p.key !== p.key || k === p.key) return {
                        id: l,
                        list: m,
                        index: h,
                        j: p
                    }
                }
            return {
                id: l,
                list: m,
                index: -1,
                j: void 0
            }
        }

        function e(h) {
            this[0] = {};
            this[1] = b();
            this.size = 0;
            if (h) {
                h = z(h);
                for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
            }
        }
        if (function() {
                if (!a || typeof a != "function" || !v(a.prototype, "entries") || typeof Object.seal != "function") return !1;
                try {
                    var h = Object.seal({
                            x: 4
                        }),
                        k = new a(z([
                            [h, "s"]
                        ]));
                    if (k.get(h) != "s" || k.size != 1 || k.get({
                            x: 4
                        }) || k.set({
                            x: 4
                        }, "t") != k || k.size != 2) return !1;
                    var l = v(k, "entries").call(k),
                        m = l.next();
                    if (m.done || m.value[0] != h || m.value[1] != "s") return !1;
                    m = l.next();
                    return m.done ||
                        m.value[0].x != 4 || m.value[1] != "t" || !l.next().done ? !1 : !0
                } catch (p) {
                    return !1
                }
            }()) return a;
        var f = new r.WeakMap;
        e.prototype.set = function(h, k) {
            h = h === 0 ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this[0][l.id] = []);
            l.j ? l.j.value = k : (l.j = {
                next: this[1],
                m: this[1].m,
                head: this[1],
                key: h,
                value: k
            }, l.list.push(l.j), this[1].m.next = l.j, this[1].m = l.j, this.size++);
            return this
        };
        e.prototype.delete = function(h) {
            h = d(this, h);
            return h.j && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this[0][h.id], h.j.m.next = h.j.next, h.j.next.m =
                h.j.m, h.j.head = null, this.size--, !0) : !1
        };
        e.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].m = b();
            this.size = 0
        };
        e.prototype.has = function(h) {
            return !!d(this, h).j
        };
        e.prototype.get = function(h) {
            return (h = d(this, h).j) && h.value
        };
        e.prototype.entries = function() {
            return c(this, function(h) {
                return [h.key, h.value]
            })
        };
        e.prototype.keys = function() {
            return c(this, function(h) {
                return h.key
            })
        };
        e.prototype.values = function() {
            return c(this, function(h) {
                return h.value
            })
        };
        e.prototype.forEach = function(h, k) {
            for (var l = v(this,
                    "entries").call(this), m; !(m = l.next()).done;) m = m.value, h.call(k, m[1], m[0], this)
        };
        e.prototype[v(r.Symbol, "iterator")] = v(e.prototype, "entries");
        var g = 0;
        return e
    }, "es6");
    w("globalThis", function(a) {
        return a || ea
    }, "es_2020");

    function qa(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[v(r.Symbol, "iterator")] = function() {
            return e
        };
        return e
    }
    w("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return qa(this, function(b) {
                return b
            })
        }
    }, "es6");

    function ra(a, b, c) {
        if (a == null) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    }
    w("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return qa(this, function(b, c) {
                return [b, c]
            })
        }
    }, "es6");
    w("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) A(b, d) && c.push([d, b[d]]);
            return c
        }
    }, "es8");
    w("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            var d = ra(this, b, "endsWith");
            c === void 0 && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var e = b.length; e > 0 && c > 0;)
                if (d[--c] != b[--e]) return !1;
            return e <= 0
        }
    }, "es6");
    w("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) A(b, d) && c.push(b[d]);
            return c
        }
    }, "es8");
    w("Array.prototype.values", function(a) {
        return a ? a : function() {
            return qa(this, function(b, c) {
                return c
            })
        }
    }, "es8");
    w("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? b !== 0 || 1 / b === 1 / c : b !== b && c !== c
        }
    }, "es6");
    w("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || v(Object, "is").call(Object, f, b)) return !0
            }
            return !1
        }
    }, "es7");
    w("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return ra(this, b, "includes").indexOf(b, c || 0) !== -1
        }
    }, "es6");
    w("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = c != null ? c : function(h) {
                return h
            };
            var e = [],
                f = typeof r.Symbol != "undefined" && v(r.Symbol, "iterator") && b[v(r.Symbol, "iterator")];
            if (typeof f == "function") {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
            return e
        }
    }, "es6");
    /* 
     
     Copyright The Closure Library Authors. 
     SPDX-License-Identifier: Apache-2.0 
    */
    var B = this || self;

    function C(a) {
        a = parseFloat(a);
        return isNaN(a) || a > 1 || a < 0 ? 0 : a
    };

    function sa(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };
    var wa = Array.prototype.indexOf ? function(a, b) {
            return Array.prototype.indexOf.call(a, b, void 0)
        } : function(a, b) {
            if (typeof a === "string") return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
            for (var c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        xa = Array.prototype.some ? function(a, b) {
            return Array.prototype.some.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = typeof a === "string" ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1
        };
    /* 
     
     Copyright Google LLC 
     SPDX-License-Identifier: Apache-2.0 
    */
    var ya = r.globalThis.trustedTypes,
        za;

    function Aa() {
        var a = null;
        if (!ya) return a;
        try {
            var b = function(c) {
                return c
            };
            a = ya.createPolicy("goog#html", {
                createHTML: b,
                createScript: b,
                createScriptURL: b
            })
        } catch (c) {}
        return a
    };

    function Ba(a) {
        this.g = a
    }
    Ba.prototype.toString = function() {
        return this.g + ""
    };

    function Ca(a) {
        za === void 0 && (za = Aa());
        var b = za;
        return new Ba(b ? b.createScriptURL(a) : a)
    }

    function Da(a) {
        if (a instanceof Ba) return a.g;
        throw Error("");
    };

    function Ea(a) {
        var b = pa.apply(1, arguments);
        if (b.length === 0) return Ca(a[0]);
        for (var c = a[0], d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1];
        return Ca(c)
    }

    function Fa(a, b, c, d) {
        function e(g, h) {
            g != null && (Array.isArray(g) ? g.forEach(function(k) {
                return e(k, h)
            }) : (b += f + encodeURIComponent(h) + "=" + encodeURIComponent(g), f = "&"))
        }
        var f = b.length ? "&" : "?";
        d.constructor === Object && (d = v(Object, "entries").call(Object, d));
        Array.isArray(d) ? d.forEach(function(g) {
            return e(g[1], g[0])
        }) : d.forEach(e);
        return Ca(a + b + c)
    };

    function Ga(a, b) {
        a.src = Da(b);
        var c, d;
        (c = (b = (d = (c = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) == null ? void 0 : d.call(c, "script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", c)
    };
    var Ha, Ia;
    a: {
        for (var Ja = ["CLOSURE_FLAGS"], Ka = B, La = 0; La < Ja.length; La++)
            if (Ka = Ka[Ja[La]], Ka == null) {
                Ia = null;
                break a
            }
        Ia = Ka
    }
    var Ma = Ia && Ia[610401301];
    Ha = Ma != null ? Ma : !1;

    function Oa() {
        var a = B.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var Qa, Ra = B.navigator;
    Qa = Ra ? Ra.userAgentData || null : null;

    function Sa(a) {
        return Ha ? Qa ? Qa.brands.some(function(b) {
            return (b = b.brand) && b.indexOf(a) != -1
        }) : !1 : !1
    }

    function E(a) {
        return Oa().indexOf(a) != -1
    };

    function I() {
        return Ha ? !!Qa && Qa.brands.length > 0 : !1
    }

    function Ta() {
        return I() ? Sa("Chromium") : (E("Chrome") || E("CriOS")) && !(I() ? 0 : E("Edge")) || E("Silk")
    };

    function Ua(a) {
        Ua[" "](a);
        return a
    }
    Ua[" "] = function() {};
    var Va = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function Wa(a) {
        var b = a.match(Va);
        a = b[5];
        var c = b[6];
        b = b[7];
        var d = "";
        a && (d += a);
        c && (d += "?" + c);
        b && (d += "#" + b);
        return d
    }

    function Xa(a, b, c, d) {
        for (var e = c.length;
            (b = a.indexOf(c, b)) >= 0 && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (f == 38 || f == 63)
                if (f = a.charCodeAt(b + e), !f || f == 61 || f == 38 || f == 35) return b;
            b += e + 1
        }
        return -1
    }
    var Ya = /#|$/;

    function Za(a, b) {
        var c = a.search(Ya),
            d = Xa(a, 0, b, c);
        if (d < 0) return null;
        var e = a.indexOf("&", d);
        if (e < 0 || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.slice(d, e !== -1 ? e : 0).replace(/\+/g, " "))
    }
    var $a = /[?&]($|#)/;

    function ab(a, b, c) {
        for (var d = a.search(Ya), e = 0, f, g = [];
            (f = Xa(a, e, b, d)) >= 0;) g.push(a.substring(e, f)), e = Math.min(a.indexOf("&", f) + 1 || d, d);
        g.push(a.slice(e));
        a = g.join("").replace($a, "$1");
        c = c != null ? "=" + encodeURIComponent(String(c)) : "";
        (b += c) ? (c = a.indexOf("#"), c < 0 && (c = a.length), d = a.indexOf("?"), d < 0 || d > c ? (d = c, e = "") : e = a.substring(d + 1, c), c = [a.slice(0, d), e, a.slice(c)], a = c[1], c[1] = b ? a ? a + "&" + b : b : a, b = c[0] + (c[1] ? "?" + c[1] : "") + c[2]) : b = a;
        return b
    };

    function bb(a) {
        try {
            var b;
            if (b = !!a && a.location.href != null) a: {
                try {
                    Ua(a.foo);
                    b = !0;
                    break a
                } catch (c) {}
                b = !1
            }
            return b
        } catch (c) {
            return !1
        }
    }

    function cb() {
        if (!r.globalThis.crypto) return Math.random();
        try {
            var a = new Uint32Array(1);
            r.globalThis.crypto.getRandomValues(a);
            return a[0] / 65536 / 65536
        } catch (b) {
            return Math.random()
        }
    }

    function db(a, b) {
        if (a)
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }
    var fb = sa(function() {
            return xa(["Google Web Preview", "Mediapartners-Google", "Google-Read-Aloud", "Google-Adwords"], eb) || Math.random() < 1E-4
        }),
        gb = sa(function() {
            return eb("MSIE")
        });

    function eb(a) {
        return Oa().indexOf(a) != -1
    }

    function hb(a) {
        return /^true$/.test(a)
    }

    function ib(a, b) {
        if (!a || !b.head) return null;
        var c = jb("META");
        b.head.appendChild(c);
        c.httpEquiv = "origin-trial";
        c.content = a;
        return c
    }

    function jb(a, b) {
        b = b === void 0 ? document : b;
        return b.createElement(String(a).toLowerCase())
    };
    var kb = C("0.20"),
        lb = C("0.002"),
        mb = C("1.0"),
        nb = C("1.0"),
        pb = C("0.00"),
        qb = C("0.00"),
        rb = hb("true"),
        sb = hb("true"),
        tb = hb("true"),
        ub = hb("true"),
        vb = hb("true");
    var wb = null;

    function xb() {
        if (wb === null) {
            wb = "";
            try {
                var a = "";
                try {
                    a = B.top.location.hash
                } catch (c) {
                    a = B.location.hash
                }
                if (a) {
                    var b = a.match(/\bdeid=([\d,]+)/);
                    wb = b ? b[1] : ""
                }
            } catch (c) {}
        }
        return wb
    }

    function J(a, b, c) {
        var d = K;
        if (c ? d.g.hasOwnProperty(c) && d.g[c] == "" : 1) {
            var e;
            e = (e = xb()) ? (e = e.match(new RegExp("\\b(" + a.join("|") + ")\\b"))) ? e[0] : null : null;
            if (e) a = e;
            else a: {
                if (!gb() && !fb() && (e = Math.random(), e < b)) {
                    e = cb();
                    a = a[Math.floor(e * a.length)];
                    break a
                }
                a = null
            }
            a && a != "" && (c ? d.g.hasOwnProperty(c) && (d.g[c] = a) : d.J[a] = !0)
        }
    }

    function M(a) {
        var b = K;
        return b.g.hasOwnProperty(a) ? b.g[a] : ""
    }

    function zb() {
        var a = K,
            b = [];
        db(a.J, function(c, d) {
            b.push(d)
        });
        db(a.g, function(c) {
            c != "" && b.push(c)
        });
        return b
    };
    var Ab = {
            Y: 2,
            fa: 13,
            ea: 14,
            ba: 16,
            aa: 17,
            Z: 18,
            X: 19,
            ia: 20,
            ga: 21,
            W: 22
        },
        K = null;

    function Bb() {
        return !!K && (M(20) == "466465926" || M(20) == "466465925")
    }

    function Cb() {
        return !!K && M(16) == "592230571"
    }

    function Db() {
        return !!K && (M(22) == "512247839" || M(22) == "512247838")
    };

    function Eb(a) {
        var b = b === void 0 ? B : b;
        var c, d;
        return ((c = b.performance) == null ? void 0 : (d = c.timing) == null ? void 0 : d[a]) || 0
    };

    function Fb() {
        var a = Gb,
            b = "G";
        if (a.G && a.hasOwnProperty(b)) return a.G;
        b = new a;
        return a.G = b
    };
    var Hb = {
        ca: 0,
        T: 1,
        da: 2,
        V: 3,
        U: 4
    };

    function Gb() {
        this.g = {}
    }

    function Ib(a, b, c) {
        typeof c === "number" && c > 0 && (a.g[b] = Math.round(c))
    }

    function Jb(a) {
        var b = Fb();
        var c = c === void 0 ? B : c;
        c = c.performance;
        Ib(b, a, c && c.now ? c.now() : null)
    }

    function Kb() {
        function a() {
            return Ib(b, 0, Eb("loadEventStart") - Eb("navigationStart"))
        }
        var b = Fb();
        Eb("loadEventStart") != 0 ? a() : window.addEventListener("load", a)
    }

    function Lb(a, b) {
        b.google_tag_manager && b.google_tag_manager._li && (b = b.google_tag_manager._li, Ib(a, 4, b.cbt), Ib(a, 3, b.cst))
    }

    function Mb() {
        var a = Fb();
        return v(Object, "values").call(Object, Hb).map(function(b) {
            return [b, a.g[b] || 0]
        })
    };
    var Nb = hb("false");
    var Ob = {};

    function N(a) {
        Ob.TAGGING = Ob.TAGGING || [];
        Ob.TAGGING[a] = !0
    };
    var Pb = [],
        Qb = {};

    function O(a) {
        return Pb[a] === void 0 ? !1 : Pb[a]
    };

    function Rb() {}

    function Sb(a) {
        return typeof a === "function"
    }

    function Tb(a) {
        return typeof a === "string"
    }

    function Ub(a, b) {
        if (a && Array.isArray(a))
            for (var c = 0; c < a.length; c++)
                if (a[c] && b(a[c])) return a[c]
    }

    function Vb(a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function Wb() {
        return new Date(Date.now())
    };
    var P = window,
        Q = document,
        Xb = navigator,
        Yb = {
            async: 1,
            nonce: 1,
            onerror: 1,
            onload: 1,
            src: 1,
            type: 1
        },
        Zb = {
            onload: 1,
            src: 1,
            width: 1,
            height: 1,
            style: 1
        };

    function $b(a, b, c) {
        b && Vb(b, function(d, e) {
            d = d.toLowerCase();
            c.hasOwnProperty(d) || a.setAttribute(d, e)
        })
    }

    function ac(a, b, c, d, e) {
        var f = Q.createElement("script");
        $b(f, d, Yb);
        f.type = "text/javascript";
        f.async = d && d.async === !1 ? !1 : !0;
        a = Ca(a === null ? "null" : a === void 0 ? "undefined" : a);
        Ga(f, a);
        b && (f.onload = b);
        c && (f.onerror = c);
        e ? e.appendChild(f) : (b = Q.getElementsByTagName("script")[0] || Q.body || Q.head, b.parentNode.insertBefore(f, b))
    }

    function bc(a, b, c, d, e, f) {
        f = f === void 0 ? !0 : f;
        var g = e;
        e = !1;
        g || (g = Q.createElement("iframe"), e = !0);
        $b(g, c, Zb);
        d && Vb(d, function(h, k) {
            g.dataset[h] = k
        });
        f && (g.height = "0", g.width = "0", g.style.display = "none", g.style.visibility = "hidden");
        a !== void 0 && (g.src = a);
        e && (a = Q.body && Q.body.lastChild || Q.body || Q.head, a.parentNode.insertBefore(g, a));
        b && (g.onload = b)
    }

    function cc(a) {
        var b = new Image(1, 1);
        $b(b, void 0, {});
        b.onload = function() {
            b.onload = null
        };
        b.onerror = function() {
            b.onerror = null
        };
        b.src = a
    }
    var dc = {
        cache: "no-store",
        credentials: "include",
        keepalive: !0,
        method: "POST",
        mode: "no-cors",
        redirect: "follow"
    };

    function ec() {
        var a = a === void 0 ? document : a;
        var b;
        return !((b = a.featurePolicy) == null || !(aa = b.allowedFeatures(), v(aa, "includes")).call(aa, "attribution-reporting"))
    };

    function fc(a) {
        try {
            a.parentNode.removeChild(a)
        } catch (b) {}
    };

    function gc(a, b, c) {
        a = hc(a, !0);
        if (a[b]) return !1;
        a[b] = [];
        a[b][0] = c;
        return !0
    }

    function hc(a, b) {
        var c = a.GooglebQhCsO;
        c || (c = {}, b && (a.GooglebQhCsO = c));
        return c
    };
    !E("Android") || Ta();
    Ta();
    E("Safari") && (Ta() || (I() ? 0 : E("Coast")) || (I() ? 0 : E("Opera")) || (I() ? 0 : E("Edge")) || (I() ? Sa("Microsoft Edge") : E("Edg/")) || I() && Sa("Opera"));
    var ic = {},
        jc = null;

    function kc(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            e > 255 && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        a = 4;
        a === void 0 && (a = 0);
        if (!jc)
            for (jc = {}, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; e < 5; e++) {
                var f = c.concat(d[e].split(""));
                ic[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    jc[h] === void 0 && (jc[h] = g)
                }
            }
        a = ic[a];
        c = Array(Math.floor(b.length / 3));
        d = a[64] || "";
        for (e = f = 0; f < b.length - 2; f += 3) {
            var k = b[f],
                l = b[f + 1];
            h = b[f + 2];
            g = a[k >> 2];
            k = a[(k &
                3) << 4 | l >> 4];
            l = a[(l & 15) << 2 | h >> 6];
            h = a[h & 63];
            c[e++] = g + k + l + h
        }
        g = 0;
        h = d;
        switch (b.length - f) {
            case 2:
                g = b[f + 1], h = a[(g & 15) << 2] || d;
            case 1:
                b = b[f], c[e] = a[b >> 2] + a[(b & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };

    function lc(a, b, c, d, e, f) {
        var g = Za(c, "fmt");
        if (d) {
            var h = Za(c, "random"),
                k = Za(c, "label") || "";
            if (!h) return !1;
            h = kc(decodeURIComponent(k.replace(/\+/g, " ")) + ":" + decodeURIComponent(h.replace(/\+/g, " ")));
            if (!gc(a, h, d)) return !1
        }
        g && Number(g) !== 4 && (c = ab(c, "rfmt", g));
        c = ab(c, "fmt", 4);
        ac(c, function() {
            a.google_noFurtherRedirects && d && (a.google_noFurtherRedirects = null, d())
        }, e, f, b.getElementsByTagName("script")[0].parentElement || void 0);
        return !0
    };
    var mc = {},
        nc = (mc.k = {
            D: /^[\w-]+$/
        }, mc.b = {
            D: /^[\w-]+$/,
            H: !0
        }, mc.i = {
            D: /^[1-9]\d*$/
        }, mc.u = {
            D: /^[1-9]\d*$/
        }, mc);
    var oc = {},
        rc = (oc[5] = {
            M: {
                2: pc
            },
            F: ["k", "i", "b", "u"]
        }, oc[4] = {
            M: {
                2: pc,
                GCL: qc
            },
            F: ["k", "i", "b"]
        }, oc);

    function pc(a, b) {
        var c = a.split(".");
        if (c.length === 3 && (a = {}, b = rc[b])) {
            b = b.F;
            c = z(c[2].split("$"));
            for (var d = c.next(); !d.done; d = c.next()) {
                d = d.value;
                var e = d[0];
                if (b.indexOf(e) !== -1) try {
                    var f = decodeURIComponent(d.substring(1)),
                        g = nc[e];
                    g && (g.H ? (a[e] = a[e] || [], a[e].push(f)) : a[e] = f)
                } catch (h) {}
            }
            return a
        }
    }

    function qc(a) {
        a = a.split(".");
        a.shift();
        var b = a.shift(),
            c = a.shift(),
            d = {};
        return d.k = c, d.i = b, d.b = a, d
    };

    function sc() {
        var a = {};
        var b = P.google_tag_data;
        P.google_tag_data = b === void 0 ? a : b;
        a = P.google_tag_data;
        return a.ics = a.ics || new tc
    }

    function tc() {
        this.entries = {};
        this.waitPeriodTimedOut = this.wasSetLate = this.accessedAny = this.accessedDefault = this.usedImplicit = this.usedUpdate = this.usedDefault = this.usedDeclare = this.active = !1;
        this.g = []
    }
    n = tc.prototype;
    n.default = function(a, b, c, d, e, f, g) {
        this.usedDefault || this.usedDeclare || !this.accessedDefault && !this.accessedAny || (this.wasSetLate = !0);
        this.usedDefault = this.active = !0;
        N(19);
        b == null ? N(18) : uc(this, a, b === "granted", c, d, e, f, g)
    };
    n.waitForUpdate = function(a, b, c) {
        for (var d = 0; d < a.length; d++) uc(this, a[d], void 0, void 0, "", "", b, c)
    };

    function uc(a, b, c, d, e, f, g, h) {
        var k = v(a, "entries"),
            l = k[b] || {},
            m = l.region;
        d = d && Tb(d) ? d.toUpperCase() : void 0;
        e = e.toUpperCase();
        f = f.toUpperCase();
        if (e === "" || d === f || (d === e ? m !== f : !d && !m)) {
            f = !!(g && g > 0 && l.update === void 0);
            var p = {
                region: d,
                declare_region: l.declare_region,
                implicit: l.implicit,
                default: c !== void 0 ? c : l.default,
                declare: l.declare,
                update: l.update,
                quiet: f
            };
            if (e !== "" || l.default !== !1) k[b] = p;
            f && P.setTimeout(function() {
                    k[b] === p && p.quiet && (N(2), a.waitPeriodTimedOut = !0, a.clearTimeout(b, void 0, h), a.notifyListeners())
                },
                g)
        }
    }
    n.clearTimeout = function(a, b, c) {
        var d = [a],
            e = c.delegatedConsentTypes,
            f;
        for (f in e) e.hasOwnProperty(f) && e[f] === a && d.push(f);
        e = v(this, "entries")[a] || {};
        a = this.getConsentState(a, c);
        if (e.quiet)
            for (e.quiet = !1, b = z(d), d = b.next(); !d.done; d = b.next()) vc(this, d.value);
        else if (b !== void 0 && a !== b)
            for (b = z(d), d = b.next(); !d.done; d = b.next()) vc(this, d.value)
    };
    n.update = function(a, b, c) {
        this.usedDefault || this.usedDeclare || this.usedUpdate || !this.accessedAny || (this.wasSetLate = !0);
        this.usedUpdate = this.active = !0;
        if (b != null) {
            var d = this.getConsentState(a, c),
                e = v(this, "entries");
            (e[a] = e[a] || {}).update = b === "granted";
            this.clearTimeout(a, d, c)
        }
    };
    n.declare = function(a, b, c, d, e) {
        this.usedDeclare = this.active = !0;
        var f = v(this, "entries"),
            g = f[a] || {},
            h = g.declare_region;
        c = c && Tb(c) ? c.toUpperCase() : void 0;
        d = d.toUpperCase();
        e = e.toUpperCase();
        if (d === "" || c === e || (c === d ? h !== e : !c && !h))
            if (b = {
                    region: g.region,
                    declare_region: c,
                    declare: b === "granted",
                    implicit: g.implicit,
                    default: g.default,
                    update: g.update,
                    quiet: g.quiet
                }, d !== "" || g.declare !== !1) f[a] = b
    };
    n.implicit = function(a, b) {
        this.usedImplicit = !0;
        var c = v(this, "entries");
        a = c[a] = c[a] || {};
        a.implicit !== !1 && (a.implicit = b === "granted")
    };
    n.getConsentState = function(a, b) {
        var c = v(this, "entries"),
            d = c[a] || {},
            e = d.update;
        if (e !== void 0) return e ? 1 : 2;
        if (O(8) && b.usedContainerScopedDefaults) {
            e = b.containerScopedDefaults[a];
            if (e === 3) return 1;
            if (e === 2) return 2
        } else if (e = d.default, e !== void 0) return e ? 1 : 2;
        if (b == null ? 0 : b.delegatedConsentTypes.hasOwnProperty(a)) {
            a = b.delegatedConsentTypes[a];
            c = c[a] || {};
            e = c.update;
            if (e !== void 0) return e ? 1 : 2;
            if (O(8) && b.usedContainerScopedDefaults) {
                b = b.containerScopedDefaults[a];
                if (b === 3) return 1;
                if (b === 2) return 2
            } else if (e =
                c.default, e !== void 0) return e ? 1 : 2
        }
        e = d.declare;
        if (e !== void 0) return e ? 1 : 2;
        e = d.implicit;
        return e !== void 0 ? e ? 3 : 4 : 0
    };
    n.addListener = function(a, b) {
        this.g.push({
            consentTypes: a,
            N: b
        })
    };

    function vc(a, b) {
        for (var c = 0; c < a.g.length; ++c) {
            var d = a.g[c];
            Array.isArray(d.consentTypes) && d.consentTypes.indexOf(b) !== -1 && (d.L = !0)
        }
    }
    n.notifyListeners = function(a, b) {
        for (var c = 0; c < this.g.length; ++c) {
            var d = this.g[c];
            if (d.L) {
                d.L = !1;
                try {
                    d.N({
                        consentEventId: a,
                        consentPriorityId: b
                    })
                } catch (e) {}
            }
        }
    };
    var wc = {},
        xc = {
            delegatedConsentTypes: {},
            corePlatformServices: {},
            usedCorePlatformServices: !1,
            selectedAllCorePlatformServices: !1,
            containerScopedDefaults: (wc.ad_storage = 1, wc.analytics_storage = 1, wc.ad_user_data = 1, wc.ad_personalization = 1, wc),
            usedContainerScopedDefaults: !1
        };

    function yc(a) {
        var b = sc();
        b.accessedAny = !0;
        return (Tb(a) ? [a] : a).every(function(c) {
            switch (b.getConsentState(c, xc)) {
                case 1:
                case 3:
                    return !0;
                case 2:
                case 4:
                    return !1;
                default:
                    return !0
            }
        })
    }

    function zc(a) {
        var b = sc();
        b.accessedAny = !0;
        return !(v(b, "entries")[a] || {}).quiet
    }

    function Ac(a, b) {
        sc().addListener(a, b)
    }

    function Bc(a, b) {
        function c() {
            for (var e = 0; e < b.length; e++)
                if (!zc(b[e])) return !0;
            return !1
        }
        if (c()) {
            var d = !1;
            Ac(b, function(e) {
                d || c() || (d = !0, a(e))
            })
        } else a({})
    }

    function Cc(a, b) {
        function c() {
            for (var g = [], h = 0; h < e.length; h++) {
                var k = e[h];
                yc(k) && !f[k] && g.push(k)
            }
            return g
        }

        function d(g) {
            for (var h = 0; h < g.length; h++) f[g[h]] = !0
        }
        var e = Tb(b) ? [b] : b,
            f = {};
        b = c();
        b.length !== e.length && (d(b), Ac(e, function(g) {
            function h(m) {
                m.length !== 0 && (d(m), g.consentTypes = m, a(g))
            }
            var k = c();
            if (k.length !== 0) {
                var l = v(Object, "keys").call(Object, f).length;
                k.length + l >= e.length ? h(k) : P.setTimeout(function() {
                    h(c())
                }, 500)
            }
        }))
    };
    var Dc = /:[0-9]+$/;

    function Ec(a, b) {
        a = z(a.split("&"));
        for (var c = a.next(); !c.done; c = a.next()) {
            var d = z(c.value.split("="));
            c = d.next().value;
            for (var e, f = []; !(e = d.next()).done;) f.push(e.value);
            d = f;
            if (decodeURIComponent(c.replace(/\+/g, " ")) === b) return decodeURIComponent(d.join("=").replace(/\+/g, " "))
        }
    }

    function Fc(a, b) {
        var c = "query";
        var d = (d = a.protocol) ? d.replace(":", "").toLowerCase() : "";
        c && (c = String(c).toLowerCase());
        switch (c) {
            case "url_no_fragment":
                b = "";
                a && a.href && (b = a.href.indexOf("#"), b = b < 0 ? a.href : a.href.substring(0, b));
                a = b;
                break;
            case "protocol":
                a = d;
                break;
            case "host":
                a = a.hostname.replace(Dc, "").toLowerCase();
                break;
            case "port":
                a = String(Number(a.port) || (d === "http" ? 80 : d === "https" ? 443 : ""));
                break;
            case "path":
                a.pathname || a.hostname || N(1);
                a = a.pathname.charAt(0) === "/" ? a.pathname : "/" + a.pathname;
                a = a.split("/");
                [].indexOf(a[a.length - 1]) >= 0 && (a[a.length - 1] = "");
                a = a.join("/");
                break;
            case "query":
                a = a.search.replace("?", "");
                b && (a = Ec(a, b));
                break;
            case "extension":
                a = a.pathname.split(".");
                a = a.length > 1 ? a[a.length - 1] : "";
                a = a.split("/")[0];
                break;
            case "fragment":
                a = a.hash.replace("#", "");
                break;
            default:
                a = a && a.href
        }
        return a
    }
    var Gc = {},
        Hc = 0;

    function Ic(a) {
        for (var b = 0; b < 3; ++b) try {
            var c = decodeURIComponent(a).replace(/\+/g, " ");
            if (c === a) break;
            a = c
        } catch (d) {
            return ""
        }
        return a
    };

    function Jc(a, b, c, d) {
        if (Kc(d)) {
            d = [];
            b = String(b || Lc()).split(";");
            for (var e = 0; e < b.length; e++) {
                var f = b[e].split("="),
                    g = f[0].replace(/^\s*|\s*$/g, "");
                g && g === a && ((f = f.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && c && (f = decodeURIComponent(f)), d.push(f))
            }
            a = d
        } else a = [];
        return a
    }

    function Nc(a, b, c, d) {
        var e = Lc(),
            f = window;
        f.origin !== "null" && (f.document.cookie = a);
        a = Lc();
        return e !== a || c !== void 0 && Jc(b, a, !1, d).indexOf(c) >= 0
    }

    function Oc(a, b, c) {
        function d(p, q, t) {
            if (t == null) return delete g[q], p;
            g[q] = t;
            return p + "; " + q + "=" + t
        }

        function e(p, q) {
            if (q == null) return p;
            g[q] = !0;
            return p + "; " + q
        }
        if (Kc(c.A)) {
            if (b == null) var f = a + "=deleted; expires=" + (new Date(0)).toUTCString();
            else c.encode && (b = encodeURIComponent(b)), b = Pc(b), f = a + "=" + b;
            var g = {};
            f = d(f, "path", c.path);
            if (c.expires instanceof Date) var h = c.expires.toUTCString();
            else c.expires != null && (h = c.expires);
            f = d(f, "expires", h);
            f = d(f, "max-age", c.ja);
            f = d(f, "samesite", c.ka);
            c.la && (f = e(f, "secure"));
            if ((h = c.domain) && h.toLowerCase() === "auto") {
                h = Qc();
                for (var k = 0; k < h.length; ++k) {
                    var l = h[k] !== "none" ? h[k] : void 0,
                        m = d(f, "domain", l);
                    m = e(m, c.flags);
                    if (!Rc(l, c.path) && Nc(m, a, b, c.A)) break
                }
            } else h && h.toLowerCase() !== "none" && (f = d(f, "domain", h)), f = e(f, c.flags), Rc(h, c.path) || Nc(f, a, b, c.A)
        }
    }

    function Sc(a, b, c) {
        c.path == null && (c.path = "/");
        c.domain || (c.domain = "auto");
        Oc(a, b, c)
    }

    function Pc(a) {
        a && a.length > 1200 && (a = a.substring(0, 1200));
        return a
    }
    var Tc = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
        Uc = /(^|\.)doubleclick\.net$/i;

    function Rc(a, b) {
        return a !== void 0 && (Uc.test(window.document.location.hostname) || b === "/" && Tc.test(a))
    }

    function Lc() {
        return window.origin !== "null" ? window.document.cookie : ""
    }

    function Kc(a) {
        return a && O(12) ? (Array.isArray(a) ? a : [a]).every(function(b) {
            return zc(b) && yc(b)
        }) : !0
    }

    function Qc() {
        var a = [],
            b = window.document.location.hostname.split(".");
        if (b.length === 4) {
            var c = b[b.length - 1];
            if (Number(c).toString() === c) return ["none"]
        }
        for (c = b.length - 2; c >= 0; c--) a.push(b.slice(c).join("."));
        b = window.document.location.hostname;
        Uc.test(b) || Tc.test(b) || a.push("none");
        return a
    };

    function Vc(a, b, c, d) {
        var e, f = Number(a.K != null ? a.K : void 0);
        f !== 0 && (e = new Date((b || Wb().getTime()) + 1E3 * (f || 7776E3)));
        return {
            path: a.path,
            domain: a.domain,
            flags: a.flags,
            encode: !!c,
            expires: e,
            A: d
        }
    };
    var Wc = new r.Map([
        [5, "ad_storage"],
        [4, ["ad_storage", "ad_user_data"]]
    ]);

    function Xc(a) {
        if (rc[5]) {
            var b = [];
            a = Jc(a, void 0, void 0, Wc.get(5));
            a = z(a);
            for (var c = a.next(); !c.done; c = a.next()) {
                a: {
                    c = c.value;
                    var d = rc[5];
                    if (d) {
                        var e = c.split(".")[0];
                        if (e && (d = d.M[e])) {
                            c = d(c, 5);
                            break a
                        }
                    }
                    c = void 0
                }
                c && (Yc(c), b.push(c))
            }
            return b
        }
    }

    function Zc(a, b, c, d) {
        c = c || {};
        var e;
        if (e = c.domain) {
            var f = e;
            O(11) && e === "none" && (f = window.document.location.hostname);
            f = f.indexOf(".") === 0 ? f.substring(1) : f;
            e = f.split(".").length
        } else e = 1;
        e = "" + e;
        (f = c.path) && f !== "/" ? (f[0] !== "/" && (f = "/" + f), f[f.length - 1] !== "/" && (f += "/"), f = f.split("/").length - 1) : f = 1;
        f > 1 && (e += "-" + f);
        var g = rc[5];
        if (g) {
            f = [];
            g = z(g.F);
            for (var h = g.next(); !h.done; h = g.next()) {
                h = h.value;
                var k = nc[h];
                if (k) {
                    var l = b[h];
                    if (l !== void 0)
                        if (k.H && Array.isArray(l))
                            for (k = z(l), l = k.next(); !l.done; l = k.next()) f.push(encodeURIComponent(h +
                                l.value));
                        else f.push(encodeURIComponent(h + l))
                }
            }
            b = ["2", e || "1", f.join("$")].join(".")
        } else b = void 0;
        b && (c = Vc(c, d, void 0, Wc.get(5)), Sc(a, b, c))
    }

    function $c(a, b) {
        b = b.D;
        return typeof b === "function" ? b(a) : b.test(a)
    }

    function Yc(a) {
        for (var b = z(v(Object, "keys").call(Object, a)), c = b.next(), d = {}; !c.done; d = {
                v: void 0
            }, c = b.next()) {
            c = c.value;
            var e = a[c];
            d.v = nc[c];
            d.v ? d.v.H ? a[c] = Array.isArray(e) ? e.filter(function(f) {
                return function(g) {
                    return $c(g, f.v)
                }
            }(d)) : void 0 : typeof e === "string" && $c(e, d.v) || (a[c] = void 0) : a[c] = void 0
        }
    };

    function ad(a) {
        var b = [],
            c = Q.cookie.split(";");
        a = new RegExp("^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
        for (var d = 0; d < c.length; d++) {
            var e = c[d].match(a);
            e && b.push({
                I: e[1],
                value: e[2],
                timestamp: Number(e[2].split(".")[1]) || 0
            })
        }
        b.sort(function(f, g) {
            return g.timestamp - f.timestamp
        });
        return b
    }

    function bd(a, b) {
        a = ad(a);
        var c = {};
        if (!a || !a.length) return c;
        for (var d = 0; d < a.length; d++) {
            var e = a[d].value.split(".");
            if (!(e[0] !== "1" || b && e.length < 3 || !b && e.length !== 3) && Number(e[1])) {
                c[a[d].I] || (c[a[d].I] = []);
                var f = {
                    version: e[0],
                    timestamp: Number(e[1]) * 1E3,
                    l: e[2]
                };
                b && e.length > 3 && (f.labels = e.slice(3));
                c[a[d].I].push(f)
            }
        }
        return c
    };
    var cd = /^\w+$/,
        dd = /^[\w-]+$/,
        R = {},
        ed = (R.aw = "_aw", R.dc = "_dc", R.gf = "_gf", R.gp = "_gp", R.gs = "_gs", R.ha = "_ha", R.ag = "_ag", R.gb = "_gb", R);

    function S() {
        return ["ad_storage", "ad_user_data"]
    }

    function U(a) {
        return !O(12) || yc(a)
    }

    function fd(a) {
        function b() {
            var d = U(c);
            d && a();
            return d
        }
        var c = S();
        Bc(function() {
            b() || Cc(b, c)
        }, c)
    }

    function gd(a) {
        return V(a).map(function(b) {
            return b.l
        })
    }

    function hd(a) {
        function b(d) {
            return function(e) {
                e.type = d;
                return e
            }
        }
        var c = id(a.prefix);
        a = W("gb", c);
        c = W("ag", c);
        if (!c || !a) return [];
        a = V(a).map(b("gb"));
        c = (O(7) ? jd(c) : []).map(b("ag"));
        return a.concat(c).sort(function(d, e) {
            return e.timestamp - d.timestamp
        })
    }

    function kd(a, b, c, d, e, f) {
        var g = Ub(a, function(h) {
            return h.l === c
        });
        g ? (g.timestamp < d && (g.timestamp = d, g.S = f), g.labels = ld(g.labels || [], e || [])) : a.push({
            version: b,
            l: c,
            timestamp: d,
            labels: e,
            S: f
        })
    }

    function jd(a) {
        var b = Xc(a) || [];
        a = [];
        b = z(b);
        for (var c = b.next(); !c.done; c = b.next()) {
            var d = c = c.value,
                e = d.k;
            d = d.b;
            var f = c ? (Number(c.i) || 0) * 1E3 : 0;
            if (f) {
                var g = void 0;
                O(13) && (g = c.u);
                kd(a, "2", e, f, d || [], g)
            }
        }
        return a.sort(function(h, k) {
            return k.timestamp - h.timestamp
        })
    }

    function V(a) {
        var b = [];
        a = Jc(a, Q.cookie, void 0, S());
        a = z(a);
        for (var c = a.next(); !c.done; c = a.next()) c = md(c.value), c != null && kd(b, c.version, c.l, c.timestamp, c.labels);
        b.sort(function(d, e) {
            return e.timestamp - d.timestamp
        });
        return nd(b)
    }

    function ld(a, b) {
        if (!a.length) return b;
        if (!b.length) return a;
        var c = {};
        return a.concat(b).filter(function(d) {
            return c.hasOwnProperty(d) ? !1 : c[d] = !0
        })
    }

    function id(a) {
        return a && typeof a === "string" && a.match(cd) ? a : "_gcl"
    }

    function od(a, b) {
        var c = O(7),
            d = Gc[a];
        if (!d) {
            d = Q.createElement("a");
            a && (d.href = a);
            var e = d.pathname;
            e[0] !== "/" && (a || N(1), e = "/" + e);
            var f = d.hostname.replace(Dc, "");
            d = {
                href: d.href,
                protocol: d.protocol,
                host: d.host,
                hostname: f,
                pathname: e,
                search: d.search,
                hash: d.hash,
                port: d.port
            };
            Hc < 5 && (Gc[a] = d, Hc++)
        }
        e = d;
        a = Fc(e, "gclid");
        d = Fc(e, "gclsrc");
        f = Fc(e, "wbraid");
        if (f) {
            var g = f;
            if (O(3)) try {
                g = decodeURIComponent(f)
            } catch (l) {}
            g = g.split(",");
            f = g.length === 2 && g[0] === g[1] ? g[0] : f
        }
        var h;
        c && (h = Fc(e, "gbraid"));
        g = Fc(e, "gad_source");
        var k = Fc(e, "dclid");
        !b || a && d && f && (!c || h) || (b = e.hash.replace("#", ""), a = a || Ec(b, "gclid"), d = d || Ec(b, "gclsrc"), f = f || Ec(b, "wbraid"), c && (h = h || Ec(b, "gbraid")), g = g || Ec(b, "gad_source"));
        return pd(a, d, k, f, h, g)
    }

    function pd(a, b, c, d, e, f) {
        function g(k, l) {
            h[l] || (h[l] = []);
            h[l].push(k)
        }
        var h = {};
        h.gclid = a;
        h.gclsrc = b;
        h.dclid = c;
        if (a !== void 0 && a.match(dd)) switch (b) {
            case void 0:
                g(a, "aw");
                break;
            case "aw.ds":
                g(a, "aw");
                g(a, "dc");
                break;
            case "ds":
                g(a, "dc");
                break;
            case "3p.ds":
                g(a, "dc");
                break;
            case "gf":
                g(a, "gf");
                break;
            case "ha":
                g(a, "ha")
        }
        c && g(c, "dc");
        d !== void 0 && dd.test(d) && (h.wbraid = d, g(d, "gb"));
        O(7) && e !== void 0 && dd.test(e) && (h.gbraid = e, g(e, "ag"));
        f !== void 0 && dd.test(f) && (h.gad_source = f, g(f, "gs"));
        return h
    }

    function qd(a, b, c, d, e) {
        function f() {
            if (U(l)) {
                var q = Vc(c, h, !0);
                q.A = l;
                for (var t = function(y, ob) {
                        var D = W(y, g);
                        D && (Sc(D, ob, q), y !== "gb" && (m = !0))
                    }, u = function(y) {
                        y = ["GCL", k, y];
                        e.length > 0 && y.push(e.join("."));
                        return y.join(".")
                    }, F = z(["aw", "dc", "gf", "ha", "gp"]), L = F.next(); !L.done; L = F.next()) L = L.value, a[L] && t(L, u(a[L][0]));
                if (!m && a.gb) {
                    var ha = a.gb[0];
                    F = W("gb", g);
                    !b && V(F).some(function(y) {
                        return y.l === ha && y.labels && y.labels.length > 0
                    }) || t("gb", u(ha))
                }
            }
            if (!p && O(7) && a.gbraid && U("ad_storage") && (p = !0, !m)) {
                var Na =
                    a.gbraid;
                t = W("ag", g);
                if (b || !(O(7) ? jd(t) : []).some(function(y) {
                        return y.l === Na && y.labels && y.labels.length > 0
                    })) u = {}, u = (u.k = Na, u.i = "" + k, u.b = e, u), Zc(t, u, c, h)
            }
            rd(a, g, h, c)
        }
        c = c || {};
        e = e || [];
        var g = id(c.prefix),
            h = d || Wb().getTime(),
            k = Math.round(h / 1E3),
            l = S(),
            m = !1,
            p = !1;
        Bc(function() {
            f();
            U(l) || Cc(f, l)
        }, l)
    }

    function rd(a, b, c, d) {
        if (a.gad_source !== void 0 && U("ad_storage") && (a = a.gad_source, b = W("gs", b))) {
            var e = (e = P.performance) && Sb(e.now) ? e.now() : void 0;
            e = Math.round((Wb().getTime() - (e || 0)) / 1E3);
            if (O(13)) {
                var f = P.location.hostname;
                var g = P.location.pathname;
                f = Ic(f);
                f.split(".").length > 2 && (f = f.replace(/^(www[0-9]*|web|ftp|wap|home|m|w|amp|mobile)\./, ""));
                g = Ic(g);
                g = g.split(";")[0];
                g = g.replace(/\/(ar|slp|web|index)?\/?$/, "");
                g = (f + g).toLowerCase();
                f = 1;
                var h;
                if (g)
                    for (f = 0, h = g.length - 1; h >= 0; h--) {
                        var k = g.charCodeAt(h);
                        f = (f << 6 & 268435455) + k + (k << 14);
                        k = f & 266338304;
                        f = k !== 0 ? f ^ k >> 21 : f
                    }
                g = String(f);
                f = {};
                a = (f.k = a, f.i = "" + e, f.u = g, f)
            } else g = {}, a = (g.k = a, g.i = "" + e, g);
            Zc(b, a, d, c)
        }
    }

    function W(a, b) {
        a = ed[a];
        if (a !== void 0) return b + a
    }

    function sd(a) {
        return td(a.split(".")).length !== 0 ? (Number(a.split(".")[1]) || 0) * 1E3 : 0
    }

    function md(a) {
        a = td(a.split("."));
        return a.length === 0 ? null : {
            version: a[0],
            l: a[2],
            timestamp: (Number(a[1]) || 0) * 1E3,
            labels: a.slice(3)
        }
    }

    function td(a) {
        return a.length < 3 || a[0] !== "GCL" && a[0] !== "1" || !/^\d+$/.test(a[1]) || !dd.test(a[2]) ? [] : a
    }

    function nd(a) {
        return a.filter(function(b) {
            return dd.test(b.l)
        })
    }

    function ud() {
        var a = ["aw"],
            b = {};
        if (P.origin !== "null") {
            for (var c = id(b.prefix), d = {}, e = 0; e < a.length; e++) ed[a[e]] && (d[a[e]] = ed[a[e]]);
            fd(function() {
                Vb(d, function(f, g) {
                    g = Jc(c + g, Q.cookie, void 0, S());
                    g.sort(function(m, p) {
                        return sd(p) - sd(m)
                    });
                    if (g.length) {
                        var h = g[0];
                        g = sd(h);
                        var k = td(h.split(".")).length !== 0 ? h.split(".").slice(3) : [],
                            l = {};
                        h = td(h.split(".")).length !== 0 ? h.split(".")[2] : void 0;
                        l[f] = [h];
                        qd(l, !0, b, g, k)
                    }
                })
            })
        }
    }

    function vd(a, b, c, d) {
        var e = [];
        c = c || {};
        if (!U(S())) return e;
        var f = V(a);
        var g = [];
        if (f.length !== 0)
            for (var h = {}, k = 0; k < f.length; k++) {
                var l = f[k],
                    m = l.type ? l.type : "gcl";
                (l.labels || []).indexOf(b) === -1 ? (e.push(0), h[m] || g.push(l)) : e.push(1);
                h[m] = !0
            }
        if (g.length && !d)
            for (d = z(g), f = d.next(); !f.done; f = d.next()) g = f.value, f = g.timestamp, g = [g.version, Math.round(f / 1E3), g.l].concat(g.labels || [], [b]).join("."), f = Vc(c, f, !0), f.A = S(), Sc(a, g, f);
        return e
    }

    function wd(a, b) {
        b = id(b);
        b = W(a, b);
        if (!b) return 0;
        a = a === "ag" ? O(7) ? jd(b) : [] : V(b);
        for (var c = b = 0; c < a.length; c++) b = Math.max(b, a[c].timestamp);
        return b
    }

    function xd(a) {
        for (var b = 0, c = z(v(Object, "keys").call(Object, a)), d = c.next(); !d.done; d = c.next()) {
            d = a[d.value];
            for (var e = 0; e < d.length; e++) b = Math.max(b, Number(d[e].timestamp))
        }
        return b
    };
    var yd = RegExp("^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$"),
        zd = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
        Ad = /^\d+\.fls\.doubleclick\.net$/,
        Bd = /;gac=([^;?]+)/,
        Cd = /;gacgb=([^;?]+)/;

    function Dd(a, b, c) {
        if (Ad.test(a.location.host)) return (b = a.location.href.match(c)) && b.length === 2 && b[1].match(yd) ? decodeURIComponent(b[1]) : "";
        a = [];
        c = z(v(Object, "keys").call(Object, b));
        for (var d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            for (var e = [], f = b[d], g = 0; g < f.length; g++) e.push(f[g].l);
            a.push(d + ":" + e.join(","))
        }
        return a.length > 0 ? a.join(";") : ""
    }

    function Ed(a, b, c, d) {
        for (var e = U(S()) ? bd("_gac_gb", !0) : {}, f = [], g = !1, h = z(v(Object, "keys").call(Object, e)), k = h.next(); !k.done; k = h.next()) {
            k = k.value;
            var l = vd("_gac_gb_" + k, b, c, d);
            g = g || l.length !== 0 && l.some(function(m) {
                return m === 1
            });
            f.push(k + ":" + l.join(","))
        }
        return {
            P: g ? f.join(";") : "",
            O: Dd(a, e, Cd)
        }
    }

    function Fd(a, b) {
        return (a = a.location.href.match(new RegExp(";" + b + "=([^;?]+)"))) && a.length === 2 && a[1].match(zd) ? a[1] : void 0
    }

    function Gd(a, b, c, d) {
        if (Ad.test(a.location.host)) {
            if (a = Fd(a, d)) return [{
                l: a
            }]
        } else {
            if (c === "gclid") return V((b || "_gcl") + "_aw");
            if (c === "wbraid") return V((b || "_gcl") + "_gb");
            if (c === "braids") return hd({
                prefix: b
            })
        }
        return []
    }

    function Hd(a, b) {
        return Gd(a, b, "gclid", "gclaw").map(function(c) {
            return c.l
        }).join(".")
    }

    function Id(a, b) {
        return Gd(a, b, "wbraid", "gclgb").map(function(c) {
            return c.l
        }).join(".")
    }

    function Jd(a, b) {
        var c = Id(a, b) !== "" || v(Object, "keys").call(Object, U(S()) ? bd("_gac_gb", !0) : {}).length > 0;
        a = Hd(a, b) !== "" || Dd(a, U(S()) ? bd() : {}, Bd) !== "";
        return c && a
    }

    function Kd(a) {
        if (gd("_gcl_aw").length === 0 && (!a || gd(a + "_aw").length === 0)) {
            a = od(P.location.href, !0);
            if (O(6)) {
                for (var b = !0, c = z(v(Object, "keys").call(Object, a)), d = c.next(); !d.done; d = c.next())
                    if (a[d.value] !== void 0) {
                        b = !1;
                        break
                    }
                b && (a = od(P.document.referrer, !1), a.gad_source = void 0)
            }
            qd(a, !1, {});
            ud()
        }
    }

    function Ld(a, b, c) {
        a = vd((b && b.prefix || "_gcl") + "_gb", a, b, c);
        return a.length === 0 || a.every(function(d) {
            return d === 0
        }) ? "" : a.join(".")
    };

    function Md() {
        var a = P.__uspapi;
        if (Sb(a)) {
            var b = "";
            try {
                a("getUSPData", 1, function(c, d) {
                    d && c && (c = c.uspString) && RegExp("^[\\da-zA-Z-]{1,20}$").test(c) && (b = c)
                })
            } catch (c) {}
            return b
        }
    };
    var Nd = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");

    function Od(a) {
        var b;
        return (b = a.google_tag_data) != null ? b : a.google_tag_data = {}
    }

    function Pd(a) {
        a = a.google_tag_data;
        if (a != null && a.uach) {
            a = a.uach;
            var b = v(Object, "assign").call(Object, {}, a);
            a.fullVersionList && (b.fullVersionList = a.fullVersionList.slice(0));
            a = b
        } else a = null;
        return a
    }

    function Qd(a) {
        var b, c;
        return typeof((b = a.navigator) == null ? void 0 : (c = b.userAgentData) == null ? void 0 : c.getHighEntropyValues) === "function"
    }

    function Rd() {
        var a = window;
        if (Qd(a)) {
            var b = Od(a);
            b.uach_promise || (a = a.navigator.userAgentData.getHighEntropyValues(Nd).then(function(c) {
                b.uach != null || (b.uach = c);
                return c
            }), b.uach_promise = a)
        }
    };
    var Sd = {
            id: !0,
            origin: !0,
            destination: !0,
            start_date: !0,
            end_date: !0,
            location_id: !0
        },
        Td = /^[a-zA-Z0-9_]+$/,
        Ud = !1,
        Vd = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_gtag_event_data google_remarketing_only google_conversion_linker google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_allow_ad_personalization_signals google_restricted_data_processing google_conversion_items google_conversion_merchant_id google_user_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_gtm_url_processor google_conversion_page_url google_conversion_referrer_url google_gcl_cookie_prefix google_gcl_cookie_path google_gcl_cookie_flags google_gcl_cookie_domain google_gcl_cookie_max_age_seconds google_read_gcl_cookie_opt_out google_basket_feed_country google_basket_feed_language google_basket_discount google_basket_transaction_type google_additional_conversion_params google_additional_params google_transport_url google_gtm_experiments".split(" ");

    function Wd(a, b) {
        var c = a;
        return function() {
            --c;
            c <= 0 && b()
        }
    }

    function Xd(a) {
        return a != null ? encodeURIComponent(String(a)) : ""
    }

    function Yd(a) {
        if (a != null) {
            a = String(a).substring(0, 512);
            var b = a.indexOf("#");
            return b == -1 ? a : a.substring(0, b)
        }
        return ""
    }

    function X(a, b) {
        b = Xd(b);
        return b != "" && (a = Xd(a), a != "") ? "&".concat(a, "=", b) : ""
    }

    function Zd(a) {
        var b = typeof a;
        return a == null || b == "object" || b == "function" ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }

    function $d(a) {
        if (!a || typeof a != "object" || typeof a.join == "function") return "";
        var b = [],
            c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = a[c];
                if (d && typeof d.join === "function") {
                    for (var e = [], f = 0; f < d.length; ++f) {
                        var g = Zd(d[f]);
                        g != null && e.push(g)
                    }
                    d = e.length == 0 ? null : e.join(",")
                } else d = Zd(d);
                (e = Zd(c)) && d != null && b.push(e + "=" + d)
            }
        return b.join(";")
    }

    function ae(a) {
        return typeof a != "number" && typeof a != "string" ? "" : Xd(a.toString())
    }

    function be(a, b) {
        if (b.google_read_gcl_cookie_opt_out || b.google_remarketing_only || b.google_conversion_domain && (!b.google_gcl_cookie_prefix || !/^_ycl/.test(b.google_gcl_cookie_prefix))) return "";
        var c = "",
            d = ce(b),
            e = {};
        b.google_gcl_cookie_domain && (e.domain = b.google_gcl_cookie_domain);
        b.google_gcl_cookie_flags && (e.flags = b.google_gcl_cookie_flags);
        b.google_gcl_cookie_max_age_seconds != null && (e.K = b.google_gcl_cookie_max_age_seconds);
        b.google_gcl_cookie_path && (e.path = b.google_gcl_cookie_path);
        d && (e.prefix = d);
        if (de(b) && b.B) var f = b.C === void 0;
        else Ad.test(a.location.host) ? f = !(Fd(a, "gclaw") || Fd(a, "gac")) : (f = Math.max(wd("aw", d), xd(U(S()) ? bd() : {})), f = Math.max(wd("gb", d), xd(U(S()) ? bd("_gac_gb", !0) : {})) > f);
        if (f) {
            if (b.C !== void 0) return b.C;
            c = Id(a, d || void 0);
            f = b.google_conversion_label;
            var g = Ld(f, e, b.B);
            c = X("gclgb", c) + (g ? X("mcov", g) : "");
            if (d) return b.C = c;
            d = Ed(a, f, e, b.B);
            a = d.O;
            d = d.P;
            c += (a ? X("gacgb", a) : "") + (d ? X("gacmcov", d) : "");
            return b.C = c
        }
        if (d) return b = Hd(a, d), X("gclaw", b);
        (b = Hd(a)) && (c = X("gclaw", b));
        b = Dd(a, U(S()) ?
            bd() : {}, Bd);
        return c + (b ? X("gac", b) : "")
    }

    function ee(a) {
        function b(d) {
            try {
                return decodeURIComponent(d), !0
            } catch (e) {
                return !1
            }
        }
        a = a ? a.title : "";
        if (a == void 0 || a == "") return "";
        a = encodeURIComponent(a);
        for (var c = 256; !b(a.substr(0, c));) c--;
        return "&tiba=" + a.substr(0, c)
    }

    function fe(a, b, c, d, e, f) {
        var g = "https://",
            h = d.google_conversion_type === "landing" ? "/extclk" : "/";
        switch (e) {
            default: return "";
            case 2:
                    case 3:
                    var k = "googleads.g.doubleclick.net/";
                var l = "pagead/viewthroughconversion/";
                break;
            case 1:
                    k = "www.google.com/";l = "pagead/1p-conversion/";
                break;
            case 6:
                    k = "www.google.com/";l = "ccm/conversion/";
                break;
            case 0:
                    k = d.google_conversion_domain || "www.googleadservices.com/";l = "pagead/conversion/";
                break;
            case 5:
                    k = d.google_conversion_domain || "www.googleadservices.com/";l = "ccm/conversion/";
                break;
            case 4:
                    k = (k = d.google_gtm_experiments) && k.apcm ? "www.google.com" : k && k.capiorig ? d.google_conversion_id + ".privacysandbox.googleadservices.com" : "www.google.com/";l = "pagead/privacysandbox/conversion/";
                break;
            case 7:
                    k = "googleads.g.doubleclick.net/",
                l = "td/rul/"
        }
        rb && d.google_transport_url && (k = d.google_transport_url);
        k[k.length - 1] !== "/" && (k += "/");
        if (k.indexOf("http://") === 0 || k.indexOf("https://") === 0) g = "";
        g = [g, k, l, Xd(d.google_conversion_id), h, "?random=", Xd(d.google_conversion_time)].join("");
        h = X("cv",
            d.google_conversion_js_version);
        k = X("fst", d.google_conversion_first_time);
        l = X("num", d.google_conversion_snippets);
        var m = X("fmt", d.google_conversion_format),
            p = d.google_remarketing_only ? X("userId", d.google_user_id) : "";
        var q = d.google_tag_for_child_directed_treatment;
        q = q == null || q !== 0 && q !== 1 ? "" : X("tfcd", q);
        var t = d.google_tag_for_under_age_of_consent;
        t = t == null || t !== 0 && t !== 1 ? "" : X("tfua", t);
        var u = d.google_allow_ad_personalization_signals;
        u = u === !1 ? X("npa", 1) : u === !0 ? X("npa", 0) : "";
        var F = d.google_restricted_data_processing;
        F = tb ? F === !0 ? X("rdp", 1) : F === !1 ? X("rdp", 0) : "" : "";
        var L = X("value", d.google_conversion_value),
            ha = X("currency_code", d.google_conversion_currency),
            Na = X("label", d.google_conversion_label),
            y = X("oid", d.google_conversion_order_id),
            ob = X("bg", d.google_conversion_color);
        a: {
            var D = d.google_conversion_language;
            if (D != null) {
                D = D.toString();
                if (2 == D.length) {
                    D = X("hl", D);
                    break a
                }
                if (5 == D.length) {
                    D = X("hl", D.substring(0, 2)) + X("gl", D.substring(3, 5));
                    break a
                }
            }
            D = ""
        }
        var re = X("guid", "ON"),
            se = !d.google_conversion_domain && "GooglemKTybQhCsO" in
            B && typeof B.GooglemKTybQhCsO == "function" ? X("resp", "GooglemKTybQhCsO") : "",
            te = X("disvt", d.google_disable_viewthrough),
            ue = X("eid", zb().join());
        var ta = d.google_conversion_date;
        var H = [];
        if (a) {
            var T = a.screen;
            T && (H.push(X("u_h", T.height)), H.push(X("u_w", T.width)), H.push(X("u_ah", T.availHeight)), H.push(X("u_aw", T.availWidth)), H.push(X("u_cd", T.colorDepth)));
            a.history && H.push(X("u_his", a.history.length))
        }
        ta && typeof ta.getTimezoneOffset == "function" && H.push(X("u_tz", -ta.getTimezoneOffset()));
        b && (typeof b.javaEnabled ==
            "function" && H.push(X("u_java", b.javaEnabled())), b.plugins && H.push(X("u_nplug", b.plugins.length)), b.mimeTypes && H.push(X("u_nmime", b.mimeTypes.length)));
        ta = H.join("");
        b = b && b.sendBeacon ? X("sendb", "1") : "";
        H = ge();
        T = X("ig", /googleadservices\.com/.test("www.googleadservices.com") ? 1 : 0);
        var Pa = $d(d.google_custom_params);
        f = $d(f);
        f = Pa.concat(Pa.length > 0 && f.length > 0 ? ";" : "", f);
        f = f == "" ? "" : "&".concat("data=", encodeURIComponent(f));
        Pa = be(c, d);
        var ua = d.google_conversion_page_url,
            we = d.google_conversion_referrer_url,
            va = "";
        if (c) {
            var ja = a.top == a ? 0 : (ja = a.location.ancestorOrigins) ? ja[ja.length - 1] == a.location.origin ? 1 : 2 : bb(a.top) ? 1 : 2;
            ua = ua ? ua : ja == 1 ? a.top.location.href : a.location.href;
            var Mc = "";
            K && J(["509562772", "509562773"], nb, 21);
            if (K && (M(21) == "509562773" || M(21) == "509562772")) {
                for (var G, x = a, ka = x; x && x != x.parent;) x = x.parent, bb(x) && (ka = x);
                G = ka;
                x = G.location.href;
                if (G === G.top) x = {
                    url: x,
                    R: !0
                };
                else {
                    ka = !1;
                    var yb = G.document;
                    yb && yb.referrer && (x = yb.referrer, G.parent === G.top && (ka = !0));
                    (G = G.location.ancestorOrigins) && (G = G[G.length -
                        1]) && x.indexOf(G) === -1 && (ka = !1, x = G);
                    x = {
                        url: x,
                        R: ka
                    }
                }
                x.url && ua !== x.url && (Mc = x.url)
            }
            va += X("frm", ja);
            va += X("url", Yd(ua));
            va += X("ref", Yd(we || c.referrer));
            va += X("top", Yd(Mc))
        }
        a = [h, k, l, m, p, q, t, u, F, L, ha, Na, y, ob, D, re, se, te, ue, ta, b, H, T, f, Pa, va, ee(c), he(d.google_additional_params), he(d.google_remarketing_only ? {} : d.google_additional_conversion_params), "&hn=" + Xd("www.googleadservices.com"), ie(a), je(a)].join("");
        c = xb();
        a += c.length > 0 ? "&debug_experiment_id=" + c : "";
        if (!d.google_remarketing_only && !d.google_conversion_domain) {
            c = [X("mid", d.google_conversion_merchant_id), X("fcntr", d.google_basket_feed_country), X("flng", d.google_basket_feed_language), X("dscnt", d.google_basket_discount), X("bttype", d.google_basket_transaction_type)].join("");
            if (d)
                if (h = d.google_conversion_items) {
                    k = [];
                    l = 0;
                    for (m = h.length; l < m; l++) p = h[l], q = [], p && (q.push(ae(p.value)), q.push(ae(p.quantity)), q.push(ae(p.item_id)), q.push(ae(p.start_date)), q.push(ae(p.end_date)), k.push("(" + q.join("*") + ")"));
                    h = k.length > 0 ? "&item=" + k.join("") : ""
                } else h = "";
            else h = "";
            c = [a,
                c, h
            ].join("");
            a = c.length > 4E3 ? [a, X("item", "elngth")].join("") : c
        }
        g += a;
        e === 1 || e === 6 ? g += [X("gcp", 1), X("sscte", 1), X("ct_cookie_present", 1)].join("") : e == 3 && (g += X("gcp", 1), g += X("ct_cookie_present", 1));
        sb && (e = Md(), e !== void 0 && (g += X("us_privacy", e || "error")));
        de(d) && (g = d.B ? g + X("gbcov", 1) : g + X("gbcov", 0));
        return g
    }

    function ke(a) {
        if (!Nb) {
            var b = document;
            var c = "IFRAME";
            b.contentType === "application/xhtml+xml" && (c = c.toLowerCase());
            c = b.createElement(c);
            c.style.display = "none";
            c.src = "https://bid.g.doubleclick.net/xbbe/pixel?d=KAE";
            a.body.appendChild(c)
        }
    }

    function le() {
        return new Image
    }

    function me(a, b, c, d, e, f) {
        var g = c.onload_callback;
        e = e && g && g.call ? g : function() {};
        K && J(["512247838", "512247839"], vb ? 1 : 0, 22);
        d += X("async", "1");
        g = c.google_gtm_url_processor;
        Sb(g) && (d = g(d));
        var h = (g = c.opt_image_generator) && g.call,
            k = Db() ? {
                attributionsrc: ""
            } : void 0;
        if (!(f = h || !f)) {
            if (c.google_conversion_domain) var l = !1;
            else try {
                l = lc(a, b, d, e, void 0, k)
            } catch (m) {
                l = !1
            }
            f = !l
        }
        f && (a = le, h && (a = g), a = a(), a.src = d, Db() && a.setAttribute("attributionsrc", ""), a.onload = e)
    }

    function ne(a, b) {
        K && M(2) == "376635471" && (b.readyState === "complete" ? ke(b) : a.addEventListener ? a.addEventListener("load", function() {
            ke(b)
        }) : a.attachEvent("onload", function() {
            ke(b)
        }))
    }

    function oe(a) {
        if (a.google_conversion_type === "landing" || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough) return !1;
        a.google_conversion_date = new Date;
        a.google_conversion_time = a.google_conversion_date.getTime();
        a.google_conversion_snippets = typeof a.google_conversion_snippets === "number" && a.google_conversion_snippets > 0 ? a.google_conversion_snippets + 1 : 1;
        a.google_conversion_first_time === void 0 && (a.google_conversion_first_time = a.google_conversion_time);
        a.google_conversion_js_version =
            "9";
        a.google_conversion_format != 0 && a.google_conversion_format != 1 && a.google_conversion_format != 2 && a.google_conversion_format != 3 && (a.google_conversion_format = 3);
        a.google_enable_display_cookie_match !== !1 && (a.google_enable_display_cookie_match = !0);
        return !0
    }

    function pe(a, b) {
        function c(f) {
            d[f] = b && b[f] != null ? b[f] : a[f]
        }
        for (var d = {}, e = 0; e < Vd.length; e++) c(Vd[e]);
        c("onload_callback");
        return d
    }

    function qe(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c],
                e = void 0;
            d.hasOwnProperty("google_business_vertical") ? (e = d.google_business_vertical, b[e] = b[e] || {
                google_business_vertical: e
            }) : (e = "", Object.prototype.hasOwnProperty.call(b, e) || (b[e] = {}));
            e = b[e];
            for (var f = v(Object, "keys").call(Object, d).filter(function(k) {
                    return Sd.hasOwnProperty(k)
                }), g = 0; g < f.length; g++) {
                var h = f[g];
                h in e || (e[h] = []);
                e[h].push(d[h])
            }
        }
        return v(Object, "values").call(Object, b)
    }

    function ge() {
        var a = "";
        Cb() && (a = Mb().map(function(b) {
            return b.join("-")
        }).join("_"));
        return X("li", a)
    }

    function ie(a) {
        if (!ub || !a.__gsaExp || !a.__gsaExp.id) return "";
        a = a.__gsaExp.id;
        if (!Sb(a)) return "";
        try {
            var b = Number(a());
            return isNaN(b) ? "" : X("gsaexp", b)
        } catch (c) {
            return ""
        }
    }

    function je(a) {
        function b(d, e) {
            e != null && c.push(d + "=" + encodeURIComponent(e))
        }
        if (!Bb()) return "";
        a = Pd(a);
        if (!a) return "";
        var c = [];
        b("&uaa", a.architecture);
        b("&uab", a.bitness);
        b("&uam", a.model);
        b("&uap", a.platform);
        b("&uapv", a.platformVersion);
        a.wow64 != null && b("&uaw", a.wow64 ? "1" : "0");
        a.fullVersionList && b("&uafvl", a.fullVersionList.map(function(d) {
            return encodeURIComponent(d.brand || "") + ";" + encodeURIComponent(d.version || "")
        }).join("|"));
        return c.join("")
    }

    function he(a) {
        if (!a) return "";
        var b = "",
            c;
        for (c in a) a.hasOwnProperty(c) && (b += X(c, a[c]));
        return b
    }

    function de(a) {
        return (a = a.google_gtm_experiments) && a.gbcov ? !0 : !1
    }

    function ce(a) {
        return a.google_gcl_cookie_prefix && a.google_gcl_cookie_prefix !== "_gcl" && Td.test(a.google_gcl_cookie_prefix) ? a.google_gcl_cookie_prefix : ""
    }

    function ve(a, b) {
        if (!b.google_remarketing_only && xe(a, b)) {
            a = b.google_additional_conversion_params || {};
            var c = b.google_gtm_experiments;
            a.capi = c && c.apcm ? "2" : "1";
            b.google_additional_conversion_params = a
        }
    }

    function xe(a, b) {
        if (b.google_transport_url) return !1;
        if ((b = b.google_gtm_experiments) && b.apcm) return !0;
        if (!b || !b.capi) return !1;
        a: {
            if (!Ud) {
                ib("AzMBwcG8UIaKM1GV43UaxMDFsS7hsiLx0FXw9ULTOHJRGxkUVw+UPCxlzz5CudOm+WnidygXLcAHmad6rC6C9QEAAACUeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZWFkc2VydmljZXMuY29tOjQ0MyIsImZlYXR1cmUiOiJBdHRyaWJ1dGlvblJlcG9ydGluZ0Nyb3NzQXBwV2ViIiwiZXhwaXJ5IjoxNzE0NTIxNTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ\x3d\x3d", a);
                if (!ec() && !ib(ye() ? "" : "A2kc5o2ErHAbqJvF2MHSdYtnc2Bp3n6Jn2kNeko6SgHH6zXBHn0+4BbAW2No9ylVJMkzJAPwMqCVHqXm+IF1DgQAAACKeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZWFkc2VydmljZXMuY29tOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2OTUxNjc5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9", a)) {
                    a = !1;
                    break a
                }
                Ud = !0
            }
            a = ec()
        }
        return a
    }

    function ze(a, b, c, d, e) {
        a = fe(a, b, c, d, 7, e);
        b = "AW-" + d.google_conversion_id;
        (d = d.google_conversion_label) && (b = b + "/" + d);
        a: {
            d = b;b = Qb[3] === void 0 ? 1 : Qb[3];e = 'iframe[data-tagging-id="' + d + '"]';c = [];
            try {
                if (b === 1) {
                    var f = Q.querySelector(e);
                    f && (c = [f])
                } else c = v(Array, "from").call(Array, Q.querySelectorAll(e))
            } catch (h) {}
            b: {
                try {
                    var g = Q.querySelectorAll('iframe[allow="join-ad-interest-group"][data-tagging-id*="-"]');
                    break b
                } catch (h) {}
                g = void 0
            }
            f = g;g = ((f == null ? void 0 : f.length) || 0) >= (Qb[2] === void 0 ? 50 : Qb[2]);
            if (e = c.length >=
                1) e = Number(c[c.length - 1].dataset.loadTime),
            e !== void 0 && Wb().getTime() - e < (Qb[1] === void 0 ? 6E4 : Qb[1]) ? (N(9), e = !0) : e = !1;
            if (!e) {
                if (b === 1)
                    if (c.length >= 1) fc(c[0]);
                    else {
                        if (g) {
                            N(10);
                            break a
                        }
                    }
                else c.length >= b ? fc(c[0]) : g && fc(f[0]);
                bc(a, void 0, {
                    allow: "join-ad-interest-group"
                }, {
                    taggingId: d,
                    loadTime: Wb().getTime()
                })
            }
        }
    }

    function ye() {
        return !!v("www.googleadservices.com", "endsWith").call("www.googleadservices.com", "google.com")
    };
    var Ae = ma(["https://www.googletagmanager.com/debug/bootstrap"]),
        Be = !1,
        Ce = document.currentScript && document.currentScript.src || "";

    function De(a, b, c) {
        try {
            if (!Be && (Be = !0, !c.google_gtm)) {
                var d = void 0,
                    e = void 0,
                    f = Za(a.location.href, "gtm_debug");
                Ee(f) && (d = 2);
                d || b.referrer.indexOf("https://tagassistant.google.com/") !== 0 || (d = 3);
                !d && wa(b.cookie.split("; "), "__TAG_ASSISTANT=x") >= 0 && (d = 4);
                d || (e = b.documentElement.getAttribute("data-tag-assistant-present"), Ee(e) && (d = 5));
                if (d) {
                    var g = "AW-" + (c.google_conversion_id || "");
                    if (!a["google.tagmanager.debugui2.queue"]) {
                        a["google.tagmanager.debugui2.queue"] = [];
                        var h = Ea(Ae),
                            k = new r.Map([
                                ["id", g],
                                ["src",
                                    "LEGACY"
                                ],
                                ["cond", d]
                            ]),
                            l = Da(h).toString(),
                            m = l.split(/[?#]/),
                            p = /[?]/.test(l) ? "?" + m[1] : "";
                        var q = Fa(m[0], p, /[#]/.test(l) ? "#" + (p ? m[2] : m[1]) : "", k);
                        var t = jb("SCRIPT", b);
                        Ga(t, q);
                        var u = b.getElementsByTagName("script")[0];
                        u && u.parentNode && u.parentNode.insertBefore(t, u)
                    }
                    a["google.tagmanager.debugui2.queue"].push({
                        messageType: "LEGACY_CONTAINER_STARTING",
                        data: {
                            id: g,
                            scriptSource: Ce
                        }
                    })
                }
            }
        } catch (F) {}
    }

    function Ee(a) {
        if (a == null || a.length === 0) return !1;
        a = Number(a);
        var b = Date.now();
        return a < b + 3E5 && a > b - 9E5
    };

    function Fe(a, b) {
        a.onload_callback = a.onload_callback && typeof a.onload_callback.call == "function" ? Wd(b, a.onload_callback) : function() {}
    }

    function Ge(a, b, c, d) {
        De(a, c, d);
        Cb() && (Jb(2), d.google_gtm && Lb(Fb(), a));
        var e = !1;
        if (d.google_conversion_format != 3) return !1;
        try {
            if (oe(d)) {
                d.google_remarketing_only && d.google_enable_display_cookie_match && !Nb && K && J(["376635470", "376635471"], kb, 2);
                d.google_remarketing_only && !d.google_conversion_domain && K && J(["759238990", "759238991"], qb, 13);
                !d.google_remarketing_only || d.google_conversion_domain || K && (M(14) == "759248991" || M(14) == "759248990") || K && J(["759248990", "759248991"], pb, 14);
                d.google_conversion_linker !==
                    !1 && (d.google_gtm || Kd(d.google_gcl_cookie_prefix));
                if (d.google_remarketing_only == 1 && d.google_gtag_event_data != null && d.google_gtag_event_data.items != null && d.google_gtag_event_data.items.constructor === Array && d.google_gtag_event_data.items.length > 0) He(a, b, c, d);
                else {
                    var f = d.google_gtm_experiments && d.google_gtm_experiments.ccmpp;
                    if (d.google_conversion_domain || d.google_transport_url && d.google_transport_url !== "https://pagead2.googlesyndication.com/") f = !1;
                    var g = !1;
                    ye() && (g = !0);
                    var h = d.google_additional_params;
                    h && h.dg && (g = h.dg === "e");
                    h = function(k, l, m) {
                        l = l === void 0 ? !0 : l;
                        m = m === void 0 ? !0 : m;
                        me(a, c, d, fe(a, b, c, d, k), l, m)
                    };
                    d.google_gtm_experiments && d.google_gtm_experiments.fledge && (d.google_additional_params = d.google_additional_params || {}, d.google_additional_params.fledge = "1");
                    d.google_remarketing_only ? h(2) : g ? (Fe(d, f ? 3 : 2), ve(c, d), h(1), h(3), f && h(6, !0, !1)) : (Fe(d, f ? 2 : 1), ve(c, d), h(0), f && h(5, !0, !1), de(d) && Jd(c, ce(d)) && (d.B = !0, h(0, !1)));
                    d.google_gtm_experiments && d.google_gtm_experiments.fledge && ze(a, b, c, d)
                }
                d.google_remarketing_only &&
                    d.google_enable_display_cookie_match && ne(a, c);
                e = !0
            }
        } catch (k) {}
        return e
    }

    function He(a, b, c, d) {
        var e = qe(d.google_gtag_event_data.items);
        Fe(d, e.length);
        for (var f = 0; f < e.length; f++) {
            var g = e[f];
            d.google_gtm_experiments && d.google_gtm_experiments.fledge && (d.google_additional_params = d.google_additional_params || {}, d.google_additional_params.fledge = "1");
            me(a, c, d, fe(a, b, c, d, 2, g), !0, !0);
            d.google_gtm_experiments && d.google_gtm_experiments.fledge && ze(a, b, c, d, g);
            d.google_conversion_time = d.google_conversion_time + 1
        }
    };
    K = new function() {
        var a = [];
        var b = 0,
            c;
        for (c in Ab) a[b++] = Ab[c];
        a = a === void 0 ? [] : a;
        this.J = {};
        this.g = {};
        for (b = 0; b < a.length; ++b) this.g[a[b]] = ""
    };
    J(["466465925", "466465926"], mb, 20);
    Bb() && Rd();
    K && J(["592230570", "592230571"], lb, 16);
    Cb() && (Jb(1), Kb());

    function Ie(a, b, c, d) {
        function e(m, p, q) {
            q = q === void 0 ? function() {} : q;
            var t = new Image;
            t.onload = m;
            t.onerror = q;
            t.src = p
        }

        function f() {
            --g;
            if (g <= 0) {
                var m = hc(a, !1),
                    p = m[b];
                p && (delete m[b], (m = p[0]) && m.call && m())
            }
        }
        d = d === void 0 ? [] : d;
        var g = c.length + 1;
        if (c.length === 2) {
            var h = c[0],
                k = c[1];
            Xa(h, 0, "rmt_tld", h.search(Ya)) >= 0 && Xa(h, 0, "ipr", h.search(Ya)) >= 0 && !k.match(Va)[6] && (k += Wa(h), c[1] = ab(k, "rmt_tld", "1"))
        }
        for (h = {
                o: 0
            }; h.o < c.length; h = {
                o: h.o
            }, h.o++) {
            k = c[h.o];
            var l = Za(k, "fmt");
            switch (Number(l)) {
                case 1:
                case 2:
                    (l = a.document.getElementById("goog_conv_iframe")) &&
                    !l.src ? bc(k, f, void 0, void 0, l, !1) : e(f, k);
                    break;
                case 4:
                    lc(a, a.document, k, f);
                    break;
                case 5:
                    if (a.navigator && a.navigator.sendBeacon)
                        if (a.navigator.sendBeacon(k, "")) {
                            f();
                            break
                        } else k = ab(k, "sendb", 2);
                    k = ab(k, "fmt", 3);
                    e(f, k);
                    break;
                default:
                    l = void 0, d && d[h.o] && (l = function(m) {
                        return function() {
                            a: {
                                var p = d[m.o],
                                    q = {
                                        priority: "high"
                                    };
                                if (typeof P.fetch === "function") {
                                    var t = v(Object, "assign").call(Object, {}, dc);
                                    q && (q.attributionReporting && (t.attributionReporting = q.attributionReporting), q.browsingTopics && (t.browsingTopics =
                                        q.browsingTopics));
                                    try {
                                        var u = P.fetch(p, t);
                                        u && u.catch(Rb);
                                        var F = !0;
                                        break a
                                    } catch (ha) {}
                                }
                                if (q && q.noFallback) F = !1;
                                else {
                                    try {
                                        var L = Xb.sendBeacon && Xb.sendBeacon(p)
                                    } catch (ha) {
                                        N(15)
                                    }
                                    L || cc(p);
                                    F = !0
                                }
                            }
                            F && f()
                        }
                    }(h)), e(f, k, l)
            }
        }
        f()
    }
    var Je = ["GooglemKTybQhCsO"],
        Y = B;
    Je[0] in Y || typeof Y.execScript == "undefined" || Y.execScript("var " + Je[0]);
    for (var Z; Je.length && (Z = Je.shift());) Je.length || Ie === void 0 ? Y[Z] && Y[Z] !== Object.prototype[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = Ie;
    window.google_trackConversion = function(a) {
        var b = window,
            c = navigator,
            d = document;
        a = pe(b, a);
        a.google_conversion_format = 3;
        return Ge(b, c, d, a)
    };
}).call(this);