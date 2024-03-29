/*
 https://mths.be/utf8js v2.0.0 by @mathias */
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(z) {
    var q = 0;
    return function() {
        return q < z.length ? {
            done: !1,
            value: z[q++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(z) {
    return {
        next: $jscomp.arrayIteratorImpl(z)
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(z, q, u) {
    if (z == Array.prototype || z == Object.prototype) return z;
    z[q] = u.value;
    return z
};
$jscomp.getGlobal = function(z) {
    z = ["object" == typeof globalThis && globalThis, z, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var q = 0; q < z.length; ++q) {
        var u = z[q];
        if (u && u.Math == Math) return u
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(z, q) {
    var u = $jscomp.propertyToPolyfillSymbol[q];
    if (null == u) return z[q];
    u = z[u];
    return void 0 !== u ? u : z[q]
};
$jscomp.polyfill = function(z, q, u, v) {
    q && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(z, q, u, v) : $jscomp.polyfillUnisolated(z, q, u, v))
};
$jscomp.polyfillUnisolated = function(z, q, u, v) {
    u = $jscomp.global;
    z = z.split(".");
    for (v = 0; v < z.length - 1; v++) {
        var k = z[v];
        if (!(k in u)) return;
        u = u[k]
    }
    z = z[z.length - 1];
    v = u[z];
    q = q(v);
    q != v && null != q && $jscomp.defineProperty(u, z, {
        configurable: !0,
        writable: !0,
        value: q
    })
};
$jscomp.polyfillIsolated = function(z, q, u, v) {
    var k = z.split(".");
    z = 1 === k.length;
    v = k[0];
    v = !z && v in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var r = 0; r < k.length - 1; r++) {
        var t = k[r];
        if (!(t in v)) return;
        v = v[t]
    }
    k = k[k.length - 1];
    u = $jscomp.IS_SYMBOL_NATIVE && "es6" === u ? v[k] : null;
    q = q(u);
    null != q && (z ? $jscomp.defineProperty($jscomp.polyfills, k, {
        configurable: !0,
        writable: !0,
        value: q
    }) : q !== u && ($jscomp.propertyToPolyfillSymbol[k] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(k) : $jscomp.POLYFILL_PREFIX + k, k =
        $jscomp.propertyToPolyfillSymbol[k], $jscomp.defineProperty(v, k, {
            configurable: !0,
            writable: !0,
            value: q
        })))
};
$jscomp.initSymbol = function() {};
$jscomp.polyfill("Symbol", function(z) {
    if (z) return z;
    var q = function(k, r) {
        this.$jscomp$symbol$id_ = k;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: r
        })
    };
    q.prototype.toString = function() {
        return this.$jscomp$symbol$id_
    };
    var u = 0,
        v = function(k) {
            if (this instanceof v) throw new TypeError("Symbol is not a constructor");
            return new q("jscomp_symbol_" + (k || "") + "_" + u++, k)
        };
    return v
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(z) {
        if (z) return z;
        z = Symbol("Symbol.iterator");
        for (var q = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), u = 0; u < q.length; u++) {
            var v = $jscomp.global[q[u]];
            "function" === typeof v && "function" != typeof v.prototype[z] && $jscomp.defineProperty(v.prototype, z, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
                }
            })
        }
        return z
    }, "es6",
    "es3");
$jscomp.iteratorPrototype = function(z) {
    z = {
        next: z
    };
    z[Symbol.iterator] = function() {
        return this
    };
    return z
};
$jscomp.iteratorFromArray = function(z, q) {
    z instanceof String && (z += "");
    var u = 0,
        v = !1,
        k = {
            next: function() {
                if (!v && u < z.length) {
                    var r = u++;
                    return {
                        value: q(r, z[r]),
                        done: !1
                    }
                }
                v = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    k[Symbol.iterator] = function() {
        return k
    };
    return k
};
$jscomp.polyfill("Array.prototype.keys", function(z) {
    return z ? z : function() {
        return $jscomp.iteratorFromArray(this, function(q) {
            return q
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function(z) {
    return z ? z : function(q, u, v) {
        var k = this.length || 0;
        0 > u && (u = Math.max(0, k + u));
        if (null == v || v > k) v = k;
        v = Number(v);
        0 > v && (v = Math.max(0, k + v));
        for (u = Number(u || 0); u < v; u++) this[u] = q;
        return this
    }
}, "es6", "es3");
$jscomp.typedArrayFill = function(z) {
    return z ? z : Array.prototype.fill
};
$jscomp.polyfill("Int8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8ClampedArray.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float64Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
(function() {
    ! function(z) {
        var q;
        "undefined" != typeof window ? q = window : "undefined" != typeof global ? q = global : "undefined" != typeof self && (q = self);
        q.$__TawkEngine = z()
    }(function() {
        return function k(q, u, v) {
            function r(C, I) {
                if (!u[C]) {
                    if (!q[C]) {
                        var W = "function" == typeof require && require;
                        if (!I && W) return W(C, !0);
                        if (t) return t(C, !0);
                        throw Error("Cannot find module '" + C + "'");
                    }
                    I = u[C] = {
                        exports: {}
                    };
                    q[C][0].call(I.exports, function(M) {
                        var G = q[C][1][M];
                        return r(G ? G : M)
                    }, I, I.exports, k, q, u, v)
                }
                return u[C].exports
            }
            for (var t = "function" ==
                    typeof require && require, d = 0; d < v.length; d++) r(v[d]);
            return r
        }({
            debug: [function(q, u, v) {
                u.exports = q("n9i2g6")
            }, {}],
            n9i2g6: [function(q, u, v) {
                u.exports = function() {
                    return function() {}
                }
            }, {}],
            3: [function(q, u, v) {
                function k() {}
                u.exports = function(r, t, d) {
                    function C(W, M) {
                        if (0 >= C.count) throw Error("after called too many times");
                        --C.count;
                        W ? (I = !0, t(W), t = d) : 0 !== C.count || I || t(null, M)
                    }
                    var I = !1;
                    d = d || k;
                    C.count = r;
                    return 0 === r ? t() : C
                }
            }, {}],
            4: [function(q, u, v) {
                u.exports = function(k, r, t) {
                    var d = k.byteLength;
                    r = r || 0;
                    t = t || d;
                    if (k.slice) return k.slice(r,
                        t);
                    0 > r && (r += d);
                    0 > t && (t += d);
                    t > d && (t = d);
                    if (r >= d || r >= t || 0 === d) return new ArrayBuffer(0);
                    k = new Uint8Array(k);
                    d = new Uint8Array(t - r);
                    for (var C = 0; r < t; r++, C++) d[C] = k[r];
                    return d.buffer
                }
            }, {}],
            5: [function(q, u, v) {
                (function(k) {
                    v.encode = function(r) {
                        r = new Uint8Array(r);
                        var t, d = r.length,
                            C = "";
                        for (t = 0; t < d; t += 3) C += k[r[t] >> 2], C += k[(r[t] & 3) << 4 | r[t + 1] >> 4], C += k[(r[t + 1] & 15) << 2 | r[t + 2] >> 6], C += k[r[t + 2] & 63];
                        2 === d % 3 ? C = C.substring(0, C.length - 1) + "=" : 1 === d % 3 && (C = C.substring(0, C.length - 2) + "==");
                        return C
                    };
                    v.decode = function(r) {
                        var t =
                            .75 * r.length,
                            d = r.length,
                            C = 0;
                        "=" === r[r.length - 1] && (t--, "=" === r[r.length - 2] && t--);
                        var I = new ArrayBuffer(t),
                            W = new Uint8Array(I);
                        for (t = 0; t < d; t += 4) {
                            var M = k.indexOf(r[t]);
                            var G = k.indexOf(r[t + 1]);
                            var P = k.indexOf(r[t + 2]);
                            var p = k.indexOf(r[t + 3]);
                            W[C++] = M << 2 | G >> 4;
                            W[C++] = (G & 15) << 4 | P >> 2;
                            W[C++] = (P & 3) << 6 | p & 63
                        }
                        return I
                    }
                })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
            }, {}],
            6: [function(q, u, v) {
                (function(k) {
                    function r(G) {
                        for (var P = 0; P < G.length; P++) {
                            var p = G[P];
                            if (p.buffer instanceof ArrayBuffer) {
                                var w =
                                    p.buffer;
                                if (p.byteLength !== w.byteLength) {
                                    var H = new Uint8Array(p.byteLength);
                                    H.set(new Uint8Array(w, p.byteOffset, p.byteLength));
                                    w = H.buffer
                                }
                                G[P] = w
                            }
                        }
                    }

                    function t(G, P) {
                        P = P || {};
                        var p = new C;
                        r(G);
                        for (var w = 0; w < G.length; w++) p.append(G[w]);
                        return P.type ? p.getBlob(P.type) : p.getBlob()
                    }

                    function d(G, P) {
                        r(G);
                        return new Blob(G, P || {})
                    }
                    var C = k.BlobBuilder || k.WebKitBlobBuilder || k.MSBlobBuilder || k.MozBlobBuilder;
                    try {
                        var I = 2 === (new Blob(["hi"])).size
                    } catch (G) {
                        I = !1
                    }
                    var W;
                    if (W = I) try {
                        W = 2 === (new Blob([new Uint8Array([1, 2])])).size
                    } catch (G) {
                        W = !1
                    }
                    var M = C && C.prototype.append && C.prototype.getBlob;
                    k = I ? W ? k.Blob : d : M ? t : void 0;
                    u.exports = k
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {}],
            7: [function(q, u, v) {}, {}],
            8: [function(q, u, v) {
                function k(r) {
                    if (r) {
                        for (var t in k.prototype) r[t] = k.prototype[t];
                        return r
                    }
                }
                u.exports = k;
                k.prototype.on = k.prototype.addEventListener = function(r, t) {
                    this._callbacks = this._callbacks || {};
                    (this._callbacks[r] = this._callbacks[r] || []).push(t);
                    return this
                };
                k.prototype.once = function(r, t) {
                    function d() {
                        C.off(r,
                            d);
                        t.apply(this, arguments)
                    }
                    var C = this;
                    this._callbacks = this._callbacks || {};
                    d.fn = t;
                    this.on(r, d);
                    return this
                };
                k.prototype.off = k.prototype.removeListener = k.prototype.removeAllListeners = k.prototype.removeEventListener = function(r, t) {
                    this._callbacks = this._callbacks || {};
                    if (0 == arguments.length) return this._callbacks = {}, this;
                    var d = this._callbacks[r];
                    if (!d) return this;
                    if (1 == arguments.length) return delete this._callbacks[r], this;
                    for (var C, I = 0; I < d.length; I++)
                        if (C = d[I], C === t || C.fn === t) {
                            d.splice(I, 1);
                            break
                        }
                    return this
                };
                k.prototype.emit = function(r) {
                    this._callbacks = this._callbacks || {};
                    var t = [].slice.call(arguments, 1),
                        d = this._callbacks[r];
                    if (d) {
                        d = d.slice(0);
                        for (var C = 0, I = d.length; C < I; ++C) d[C].apply(this, t)
                    }
                    return this
                };
                k.prototype.listeners = function(r) {
                    this._callbacks = this._callbacks || {};
                    return this._callbacks[r] || []
                };
                k.prototype.hasListeners = function(r) {
                    return !!this.listeners(r).length
                }
            }, {}],
            9: [function(q, u, v) {
                u.exports = function(k, r) {
                    var t = function() {};
                    t.prototype = r.prototype;
                    k.prototype = new t;
                    k.prototype.constructor =
                        k
                }
            }, {}],
            10: [function(q, u, v) {
                u.exports = q("./lib/")
            }, {
                "./lib/": 11
            }],
            11: [function(q, u, v) {
                u.exports = q("./socket");
                u.exports.parser = q("engine.io-parser")
            }, {
                "./socket": 12,
                "engine.io-parser": 20
            }],
            12: [function(q, u, v) {
                (function(k) {
                    function r(p, w) {
                        if (!(this instanceof r)) return new r(p, w);
                        w = w || {};
                        p && "object" == typeof p && (w = p, p = null);
                        p ? (p = M(p), w.hostname = p.host, w.secure = "https" == p.protocol || "wss" == p.protocol, w.port = p.port, p.query && (w.query = p.query)) : w.host && (w.hostname = M(w.host).host);
                        this.secure = null != w.secure ?
                            w.secure : k.location && "https:" == location.protocol;
                        w.hostname && !w.port && (w.port = this.secure ? "443" : "80");
                        this.agent = w.agent || !1;
                        this.hostname = w.hostname || (k.location ? location.hostname : "localhost");
                        this.port = w.port || (k.location && location.port ? location.port : this.secure ? 443 : 80);
                        this.query = w.query || {};
                        "string" == typeof this.query && (this.query = P.decode(this.query));
                        this.upgrade = !1 !== w.upgrade;
                        this.path = (w.path || "/engine.io").replace(/\/$/, "") + "/";
                        this.forceJSONP = !!w.forceJSONP;
                        this.jsonp = !1 !== w.jsonp;
                        this.forceBase64 = !!w.forceBase64;
                        this.enablesXDR = !!w.enablesXDR;
                        this.timestampParam = w.timestampParam || "t";
                        this.timestampRequests = w.timestampRequests;
                        this.transports = w.transports || ["polling", "websocket"];
                        this.readyState = "";
                        this.writeBuffer = [];
                        this.policyPort = w.policyPort || 843;
                        this.rememberUpgrade = w.rememberUpgrade || !1;
                        this.binaryType = null;
                        this.onlyBinaryUpgrades = w.onlyBinaryUpgrades;
                        this.perMessageDeflate = !1 !== w.perMessageDeflate ? w.perMessageDeflate || {} : !1;
                        !0 === this.perMessageDeflate && (this.perMessageDeflate = {});
                        this.perMessageDeflate &&
                            null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024);
                        this.pfx = w.pfx || null;
                        this.key = w.key || null;
                        this.passphrase = w.passphrase || null;
                        this.cert = w.cert || null;
                        this.ca = w.ca || null;
                        this.ciphers = w.ciphers || null;
                        this.rejectUnauthorized = void 0 === w.rejectUnauthorized ? !0 : w.rejectUnauthorized;
                        p = "object" == typeof k && k;
                        p.global === p && w.extraHeaders && 0 < Object.keys(w.extraHeaders).length && (this.extraHeaders = w.extraHeaders);
                        this.open()
                    }
                    var t = q("./transports"),
                        d = q("component-emitter"),
                        C = q("debug")("engine.io-client:socket"),
                        I = q("indexof"),
                        W = q("engine.io-parser"),
                        M = q("parseuri"),
                        G = q("parsejson"),
                        P = q("parseqs");
                    u.exports = r;
                    r.priorWebsocketSuccess = !1;
                    d(r.prototype);
                    r.protocol = W.protocol;
                    r.Socket = r;
                    r.Transport = q("./transport");
                    r.transports = q("./transports");
                    r.parser = q("engine.io-parser");
                    r.prototype.createTransport = function(p) {
                        C('creating transport "%s"', p);
                        var w = this.query,
                            H = {},
                            T;
                        for (T in w) w.hasOwnProperty(T) && (H[T] = w[T]);
                        H.EIO = W.protocol;
                        H.transport = p;
                        this.id && (H.sid = this.id);
                        return new t[p]({
                            agent: this.agent,
                            hostname: this.hostname,
                            port: this.port,
                            secure: this.secure,
                            path: this.path,
                            query: H,
                            forceJSONP: this.forceJSONP,
                            jsonp: this.jsonp,
                            forceBase64: this.forceBase64,
                            enablesXDR: this.enablesXDR,
                            timestampRequests: this.timestampRequests,
                            timestampParam: this.timestampParam,
                            policyPort: this.policyPort,
                            socket: this,
                            pfx: this.pfx,
                            key: this.key,
                            passphrase: this.passphrase,
                            cert: this.cert,
                            ca: this.ca,
                            ciphers: this.ciphers,
                            rejectUnauthorized: this.rejectUnauthorized,
                            perMessageDeflate: this.perMessageDeflate,
                            extraHeaders: this.extraHeaders
                        })
                    };
                    r.prototype.open =
                        function() {
                            if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) var p = "websocket";
                            else {
                                if (0 === this.transports.length) {
                                    var w = this;
                                    setTimeout(function() {
                                        w.emit("error", "No transports available")
                                    }, 0);
                                    return
                                }
                                p = this.transports[0]
                            }
                            this.readyState = "opening";
                            try {
                                p = this.createTransport(p)
                            } catch (H) {
                                this.transports.shift();
                                this.open();
                                return
                            }
                            p.open();
                            this.setTransport(p)
                        };
                    r.prototype.setTransport = function(p) {
                        C("setting transport %s", p.name);
                        var w = this;
                        this.transport && (C("clearing existing transport %s",
                            this.transport.name), this.transport.removeAllListeners());
                        this.transport = p;
                        p.on("drain", function() {
                            w.onDrain()
                        }).on("packet", function(H) {
                            w.onPacket(H)
                        }).on("error", function(H) {
                            w.onError(H)
                        }).on("close", function() {
                            w.onClose("transport close")
                        })
                    };
                    r.prototype.probe = function(p) {
                        function w() {
                            if (V.onlyBinaryUpgrades) {
                                var Z = !this.supportsBinary && V.transport.supportsBinary;
                                Q = Q || Z
                            }
                            Q || (C('probe transport "%s" opened', p), F.send([{
                                type: "ping",
                                data: "probe"
                            }]), F.once("packet", function(ba) {
                                Q || ("pong" == ba.type &&
                                    "probe" == ba.data ? (C('probe transport "%s" pong', p), V.upgrading = !0, V.emit("upgrading", F), F && (r.priorWebsocketSuccess = "websocket" == F.name, C('pausing current transport "%s"', V.transport.name), V.transport.pause(function() {
                                        Q || "closed" == V.readyState || (C("changing transport and sending upgrade packet"), K(), V.setTransport(F), F.send([{
                                            type: "upgrade"
                                        }]), V.emit("upgrade", F), F = null, V.upgrading = !1, V.flush())
                                    }))) : (C('probe transport "%s" failed', p), ba = Error("probe error"), ba.transport = F.name, V.emit("upgradeError",
                                        ba)))
                            }))
                        }

                        function H() {
                            Q || (Q = !0, K(), F.close(), F = null)
                        }

                        function T(Z) {
                            var ba = Error("probe error: " + Z);
                            ba.transport = F.name;
                            H();
                            C('probe transport "%s" failed because of error: %s', p, Z);
                            V.emit("upgradeError", ba)
                        }

                        function R() {
                            T("transport closed")
                        }

                        function da() {
                            T("socket closed")
                        }

                        function A(Z) {
                            F && Z.name != F.name && (C('"%s" works - aborting "%s"', Z.name, F.name), H())
                        }

                        function K() {
                            F.removeListener("open", w);
                            F.removeListener("error", T);
                            F.removeListener("close", R);
                            V.removeListener("close", da);
                            V.removeListener("upgrading",
                                A)
                        }
                        C('probing transport "%s"', p);
                        var F = this.createTransport(p, {
                                probe: 1
                            }),
                            Q = !1,
                            V = this;
                        r.priorWebsocketSuccess = !1;
                        F.once("open", w);
                        F.once("error", T);
                        F.once("close", R);
                        this.once("close", da);
                        this.once("upgrading", A);
                        F.open()
                    };
                    r.prototype.onOpen = function() {
                        C("socket open");
                        this.readyState = "open";
                        r.priorWebsocketSuccess = "websocket" == this.transport.name;
                        this.emit("open");
                        this.flush();
                        if ("open" == this.readyState && this.upgrade && this.transport.pause) {
                            C("starting upgrade probes");
                            for (var p = 0, w = this.upgrades.length; p <
                                w; p++) this.probe(this.upgrades[p])
                        }
                    };
                    r.prototype.onPacket = function(p) {
                        if ("opening" == this.readyState || "open" == this.readyState) switch (C('socket receive: type "%s", data "%s"', p.type, p.data), this.emit("packet", p), this.emit("heartbeat"), p.type) {
                            case "open":
                                this.onHandshake(G(p.data));
                                break;
                            case "pong":
                                this.setPing();
                                this.emit("pong");
                                break;
                            case "error":
                                var w = Error("server error");
                                w.code = p.data;
                                this.onError(w);
                                break;
                            case "message":
                                this.emit("data", p.data), this.emit("message", p.data)
                        } else C('packet received with socket readyState "%s"',
                            this.readyState)
                    };
                    r.prototype.onHandshake = function(p) {
                        this.emit("handshake", p);
                        this.id = p.sid;
                        this.transport.query.sid = p.sid;
                        this.upgrades = this.filterUpgrades(p.upgrades);
                        this.pingInterval = p.pingInterval;
                        this.pingTimeout = p.pingTimeout;
                        this.onOpen();
                        "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                    };
                    r.prototype.onHeartbeat = function(p) {
                        clearTimeout(this.pingTimeoutTimer);
                        var w = this;
                        w.pingTimeoutTimer = setTimeout(function() {
                            if ("closed" !=
                                w.readyState) w.onClose("ping timeout")
                        }, p || w.pingInterval + w.pingTimeout)
                    };
                    r.prototype.setPing = function() {
                        var p = this;
                        clearTimeout(p.pingIntervalTimer);
                        p.pingIntervalTimer = setTimeout(function() {
                            C("writing ping packet - expecting pong within %sms", p.pingTimeout);
                            p.ping();
                            p.onHeartbeat(p.pingTimeout)
                        }, p.pingInterval)
                    };
                    r.prototype.ping = function() {
                        var p = this;
                        this.sendPacket("ping", function() {
                            p.emit("ping")
                        })
                    };
                    r.prototype.onDrain = function() {
                        this.writeBuffer.splice(0, this.prevBufferLen);
                        this.prevBufferLen =
                            0;
                        0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                    };
                    r.prototype.flush = function() {
                        "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (C("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                    };
                    r.prototype.write = r.prototype.send = function(p, w, H) {
                        this.sendPacket("message", p, w, H);
                        return this
                    };
                    r.prototype.sendPacket = function(p, w, H, T) {
                        "function" == typeof w &&
                            (T = w, w = void 0);
                        "function" == typeof H && (T = H, H = null);
                        if ("closing" != this.readyState && "closed" != this.readyState) {
                            H = H || {};
                            H.compress = !1 !== H.compress;
                            p = {
                                type: p,
                                data: w,
                                options: H
                            };
                            this.emit("packetCreate", p);
                            this.writeBuffer.push(p);
                            if (T) this.once("flush", T);
                            this.flush()
                        }
                    };
                    r.prototype.close = function() {
                        function p() {
                            T.onClose("forced close");
                            C("socket closing - telling transport to close");
                            T.transport.close()
                        }

                        function w() {
                            T.removeListener("upgrade", w);
                            T.removeListener("upgradeError", w);
                            p()
                        }

                        function H() {
                            T.once("upgrade",
                                w);
                            T.once("upgradeError", w)
                        }
                        if ("opening" == this.readyState || "open" == this.readyState) {
                            this.readyState = "closing";
                            var T = this;
                            if (this.writeBuffer.length) this.once("drain", function() {
                                this.upgrading ? H() : p()
                            });
                            else this.upgrading ? H() : p()
                        }
                        return this
                    };
                    r.prototype.onError = function(p) {
                        C("socket error %j", p);
                        r.priorWebsocketSuccess = !1;
                        this.emit("error", p);
                        this.onClose("transport error", p)
                    };
                    r.prototype.onClose = function(p, w) {
                        if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) C('socket close with reason: "%s"',
                            p), clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", p, w), this.writeBuffer = [], this.prevBufferLen = 0
                    };
                    r.prototype.filterUpgrades = function(p) {
                        for (var w = [], H = 0, T = p.length; H < T; H++) ~I(this.transports, p[H]) && w.push(p[H]);
                        return w
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                "./transport": 13,
                "./transports": 14,
                "component-emitter": 8,
                debug: "n9i2g6",
                "engine.io-parser": 20,
                indexof: 24,
                parsejson: 26,
                parseqs: 27,
                parseuri: 28
            }],
            13: [function(q, u, v) {
                function k(t) {
                    this.path = t.path;
                    this.hostname = t.hostname;
                    this.port = t.port;
                    this.secure = t.secure;
                    this.query = t.query;
                    this.timestampParam = t.timestampParam;
                    this.timestampRequests = t.timestampRequests;
                    this.readyState = "";
                    this.agent = t.agent || !1;
                    this.socket = t.socket;
                    this.enablesXDR = t.enablesXDR;
                    this.pfx = t.pfx;
                    this.key = t.key;
                    this.passphrase = t.passphrase;
                    this.cert = t.cert;
                    this.ca = t.ca;
                    this.ciphers = t.ciphers;
                    this.rejectUnauthorized = t.rejectUnauthorized;
                    this.extraHeaders = t.extraHeaders
                }
                var r = q("engine.io-parser");
                q = q("component-emitter");
                u.exports = k;
                q(k.prototype);
                k.prototype.onError = function(t, d) {
                    t = Error(t);
                    t.type = "TransportError";
                    t.description = d;
                    this.emit("error", t);
                    return this
                };
                k.prototype.open = function() {
                    if ("closed" == this.readyState || "" == this.readyState) this.readyState = "opening", this.doOpen();
                    return this
                };
                k.prototype.close = function() {
                    if ("opening" == this.readyState ||
                        "open" == this.readyState) this.doClose(), this.onClose();
                    return this
                };
                k.prototype.send = function(t) {
                    if ("open" == this.readyState) this.write(t);
                    else throw Error("Transport not open");
                };
                k.prototype.onOpen = function() {
                    this.readyState = "open";
                    this.writable = !0;
                    this.emit("open")
                };
                k.prototype.onData = function(t) {
                    t = r.decodePacket(t, this.socket.binaryType);
                    this.onPacket(t)
                };
                k.prototype.onPacket = function(t) {
                    this.emit("packet", t)
                };
                k.prototype.onClose = function() {
                    this.readyState = "closed";
                    this.emit("close")
                }
            }, {
                "component-emitter": 8,
                "engine.io-parser": 20
            }],
            14: [function(q, u, v) {
                (function(k) {
                    var r = q("xmlhttprequest-ssl"),
                        t = q("./polling-xhr"),
                        d = q("./polling-jsonp"),
                        C = q("./websocket");
                    v.polling = function(I) {
                        var W = !1,
                            M = !1,
                            G = !1 !== I.jsonp;
                        k.location && (M = "https:" == location.protocol, (W = location.port) || (W = M ? 443 : 80), W = I.hostname != location.hostname || W != I.port, M = I.secure != M);
                        I.xdomain = W;
                        I.xscheme = M;
                        if ("open" in new r(I) && !I.forceJSONP) return new t(I);
                        if (!G) throw Error("JSONP disabled");
                        return new d(I)
                    };
                    v.websocket = C
                }).call(this, "undefined" !==
                    typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                "./polling-jsonp": 15,
                "./polling-xhr": 16,
                "./websocket": 18,
                "xmlhttprequest-ssl": 19
            }],
            15: [function(q, u, v) {
                (function(k) {
                    function r() {}

                    function t(G) {
                        d.call(this, G);
                        this.query = this.query || {};
                        M || (k.___eio || (k.___eio = []), M = k.___eio);
                        this.index = M.length;
                        var P = this;
                        M.push(function(p) {
                            P.onData(p)
                        });
                        this.query.j = this.index;
                        k.document && k.addEventListener && k.addEventListener("beforeunload", function() {
                            P.script && (P.script.onerror = r)
                        }, !1)
                    }
                    var d = q("./polling"),
                        C = q("component-inherit");
                    u.exports = t;
                    var I = /\n/g,
                        W = /\\n/g,
                        M;
                    C(t, d);
                    t.prototype.supportsBinary = !1;
                    t.prototype.doClose = function() {
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
                        this.form && (this.form.parentNode.removeChild(this.form), this.iframe = this.form = null);
                        d.prototype.doClose.call(this)
                    };
                    t.prototype.doPoll = function() {
                        var G = this,
                            P = document.createElement("script");
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
                        P.async = !0;
                        P.src = this.uri();
                        P.onerror = function(w) {
                            G.onError("jsonp poll error", w)
                        };
                        var p = document.getElementsByTagName("script")[0];
                        p ? p.parentNode.insertBefore(P, p) : (document.head || document.body).appendChild(P);
                        this.script = P;
                        "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                            var w = document.createElement("iframe");
                            document.body.appendChild(w);
                            document.body.removeChild(w)
                        }, 100)
                    };
                    t.prototype.doWrite = function(G, P) {
                        function p() {
                            w();
                            P()
                        }

                        function w() {
                            if (H.iframe) try {
                                H.form.removeChild(H.iframe)
                            } catch (K) {
                                H.onError("jsonp polling iframe removal error",
                                    K)
                            }
                            try {
                                A = document.createElement('<iframe src="javascript:0" name="' + H.iframeId + '">')
                            } catch (K) {
                                A = document.createElement("iframe"), A.name = H.iframeId, A.src = "javascript:0"
                            }
                            A.id = H.iframeId;
                            H.form.appendChild(A);
                            H.iframe = A
                        }
                        var H = this;
                        if (!this.form) {
                            var T = document.createElement("form"),
                                R = document.createElement("textarea"),
                                da = this.iframeId = "eio_iframe_" + this.index,
                                A;
                            T.className = "socketio";
                            T.style.position = "absolute";
                            T.style.top = "-1000px";
                            T.style.left = "-1000px";
                            T.target = da;
                            T.method = "POST";
                            T.setAttribute("accept-charset",
                                "utf-8");
                            R.name = "d";
                            T.appendChild(R);
                            document.body.appendChild(T);
                            this.form = T;
                            this.area = R
                        }
                        this.form.action = this.uri();
                        w();
                        G = G.replace(W, "\\\n");
                        this.area.value = G.replace(I, "\\n");
                        try {
                            this.form.submit()
                        } catch (K) {}
                        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                            "complete" == H.iframe.readyState && p()
                        } : this.iframe.onload = p
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                "./polling": 17,
                "component-inherit": 9
            }],
            16: [function(q, u, v) {
                (function(k) {
                    function r() {}

                    function t(p) {
                        W.call(this, p);
                        if (k.location) {
                            var w = "https:" == location.protocol,
                                H = location.port;
                            H || (H = w ? 443 : 80);
                            this.xd = p.hostname != k.location.hostname || H != p.port;
                            this.xs = p.secure != w
                        } else this.extraHeaders = p.extraHeaders
                    }

                    function d(p) {
                        this.method = p.method || "GET";
                        this.uri = p.uri;
                        this.xd = !!p.xd;
                        this.xs = !!p.xs;
                        this.async = !1 !== p.async;
                        this.data = void 0 != p.data ? p.data : null;
                        this.agent = p.agent;
                        this.isBinary = p.isBinary;
                        this.supportsBinary = p.supportsBinary;
                        this.enablesXDR = p.enablesXDR;
                        this.pfx = p.pfx;
                        this.key =
                            p.key;
                        this.passphrase = p.passphrase;
                        this.cert = p.cert;
                        this.ca = p.ca;
                        this.ciphers = p.ciphers;
                        this.rejectUnauthorized = p.rejectUnauthorized;
                        this.extraHeaders = p.extraHeaders;
                        this.create()
                    }

                    function C() {
                        for (var p in d.requests) d.requests.hasOwnProperty(p) && d.requests[p].abort()
                    }
                    var I = q("xmlhttprequest-ssl"),
                        W = q("./polling"),
                        M = q("component-emitter"),
                        G = q("component-inherit"),
                        P = q("debug")("engine.io-client:polling-xhr");
                    u.exports = t;
                    u.exports.Request = d;
                    G(t, W);
                    t.prototype.supportsBinary = !0;
                    t.prototype.request = function(p) {
                        p =
                            p || {};
                        p.uri = this.uri();
                        p.xd = this.xd;
                        p.xs = this.xs;
                        p.agent = this.agent || !1;
                        p.supportsBinary = this.supportsBinary;
                        p.enablesXDR = this.enablesXDR;
                        p.pfx = this.pfx;
                        p.key = this.key;
                        p.passphrase = this.passphrase;
                        p.cert = this.cert;
                        p.ca = this.ca;
                        p.ciphers = this.ciphers;
                        p.rejectUnauthorized = this.rejectUnauthorized;
                        p.extraHeaders = this.extraHeaders;
                        return new d(p)
                    };
                    t.prototype.doWrite = function(p, w) {
                        p = this.request({
                            method: "POST",
                            data: p,
                            isBinary: "string" !== typeof p && void 0 !== p
                        });
                        var H = this;
                        p.on("success", w);
                        p.on("error",
                            function(T) {
                                H.onError("xhr post error", T)
                            });
                        this.sendXhr = p
                    };
                    t.prototype.doPoll = function() {
                        P("xhr poll");
                        var p = this.request(),
                            w = this;
                        p.on("data", function(H) {
                            w.onData(H)
                        });
                        p.on("error", function(H) {
                            w.onError("xhr poll error", H)
                        });
                        this.pollXhr = p
                    };
                    M(d.prototype);
                    d.prototype.create = function() {
                        var p = {
                            agent: this.agent,
                            xdomain: this.xd,
                            xscheme: this.xs,
                            enablesXDR: this.enablesXDR
                        };
                        p.pfx = this.pfx;
                        p.key = this.key;
                        p.passphrase = this.passphrase;
                        p.cert = this.cert;
                        p.ca = this.ca;
                        p.ciphers = this.ciphers;
                        p.rejectUnauthorized =
                            this.rejectUnauthorized;
                        var w = this.xhr = new I(p),
                            H = this;
                        try {
                            P("xhr open %s: %s", this.method, this.uri);
                            w.open(this.method, this.uri, this.async);
                            try {
                                if (this.extraHeaders) {
                                    w.setDisableHeaderCheck(!0);
                                    for (var T in this.extraHeaders) this.extraHeaders.hasOwnProperty(T) && w.setRequestHeader(T, this.extraHeaders[T])
                                }
                            } catch (R) {}
                            this.supportsBinary && (w.responseType = "arraybuffer");
                            if ("POST" == this.method) try {
                                this.isBinary ? w.setRequestHeader("Content-type", "application/octet-stream") : w.setRequestHeader("Content-type",
                                    "text/plain;charset=UTF-8")
                            } catch (R) {}
                            "withCredentials" in w && (w.withCredentials = !0);
                            this.hasXDR() ? (w.onload = function() {
                                H.onLoad()
                            }, w.onerror = function() {
                                H.onError(w.responseText)
                            }) : w.onreadystatechange = function() {
                                if (4 == w.readyState)
                                    if (200 == w.status || 1223 == w.status) H.onLoad();
                                    else setTimeout(function() {
                                        H.onError(w.status)
                                    }, 0)
                            };
                            P("xhr data %s", this.data);
                            w.send(this.data)
                        } catch (R) {
                            setTimeout(function() {
                                H.onError(R)
                            }, 0);
                            return
                        }
                        k.document && (this.index = d.requestsCount++, d.requests[this.index] = this)
                    };
                    d.prototype.onSuccess =
                        function() {
                            this.emit("success");
                            this.cleanup()
                        };
                    d.prototype.onData = function(p) {
                        this.emit("data", p);
                        this.onSuccess()
                    };
                    d.prototype.onError = function(p) {
                        this.emit("error", p);
                        this.cleanup(!0)
                    };
                    d.prototype.cleanup = function(p) {
                        if ("undefined" != typeof this.xhr && null !== this.xhr) {
                            this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r;
                            if (p) try {
                                this.xhr.abort()
                            } catch (w) {}
                            k.document && delete d.requests[this.index];
                            this.xhr = null
                        }
                    };
                    d.prototype.onLoad = function() {
                        try {
                            try {
                                var p = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                            } catch (da) {}
                            if ("application/octet-stream" ===
                                p) var w = this.xhr.response;
                            else if (this.supportsBinary) try {
                                w = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                            } catch (da) {
                                var H = new Uint8Array(this.xhr.response);
                                p = [];
                                for (var T = 0, R = H.length; T < R; T++) p.push(H[T]);
                                w = String.fromCharCode.apply(null, p)
                            } else w = this.xhr.responseText
                        } catch (da) {
                            this.onError(da)
                        }
                        if (null != w) this.onData(w)
                    };
                    d.prototype.hasXDR = function() {
                        return "undefined" !== typeof k.XDomainRequest && !this.xs && this.enablesXDR
                    };
                    d.prototype.abort = function() {
                        this.cleanup()
                    };
                    k.document &&
                        (d.requestsCount = 0, d.requests = {}, k.attachEvent ? k.attachEvent("onunload", C) : k.addEventListener && k.addEventListener("beforeunload", C, !1))
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                "./polling": 17,
                "component-emitter": 8,
                "component-inherit": 9,
                debug: "n9i2g6",
                "xmlhttprequest-ssl": 19
            }],
            17: [function(q, u, v) {
                function k(M) {
                    var G = M && M.forceBase64;
                    if (!W || G) this.supportsBinary = !1;
                    r.call(this, M)
                }
                var r = q("../transport"),
                    t = q("parseqs"),
                    d = q("engine.io-parser");
                v = q("component-inherit");
                var C = q("yeast"),
                    I = q("debug")("engine.io-client:polling");
                u.exports = k;
                var W = null != (new(q("xmlhttprequest-ssl"))({
                    xdomain: !1
                })).responseType;
                v(k, r);
                k.prototype.name = "polling";
                k.prototype.doOpen = function() {
                    this.poll()
                };
                k.prototype.pause = function(M) {
                    function G() {
                        I("paused");
                        P.readyState = "paused";
                        M()
                    }
                    var P = this;
                    this.readyState = "pausing";
                    if (this.polling || !this.writable) {
                        var p = 0;
                        this.polling && (I("we are currently polling - waiting to pause"), p++, this.once("pollComplete", function() {
                            I("pre-pause polling complete");
                            --p || G()
                        }));
                        this.writable || (I("we are currently writing - waiting to pause"), p++, this.once("drain", function() {
                            I("pre-pause writing complete");
                            --p || G()
                        }))
                    } else G()
                };
                k.prototype.poll = function() {
                    I("polling");
                    this.polling = !0;
                    this.doPoll();
                    this.emit("poll")
                };
                k.prototype.onData = function(M) {
                    var G = this;
                    I("polling got data %s", M);
                    d.decodePayload(M, this.socket.binaryType, function(P, p, w) {
                        if ("opening" == G.readyState) G.onOpen();
                        if ("close" == P.type) return G.onClose(), !1;
                        G.onPacket(P)
                    });
                    "closed" != this.readyState &&
                        (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : I('ignoring poll - transport state "%s"', this.readyState))
                };
                k.prototype.doClose = function() {
                    function M() {
                        I("writing close packet");
                        G.write([{
                            type: "close"
                        }])
                    }
                    var G = this;
                    "open" == this.readyState ? (I("transport open - closing"), M()) : (I("transport not open - deferring close"), this.once("open", M))
                };
                k.prototype.write = function(M) {
                    var G = this;
                    this.writable = !1;
                    var P = function() {
                        G.writable = !0;
                        G.emit("drain")
                    };
                    G = this;
                    d.encodePayload(M,
                        this.supportsBinary,
                        function(p) {
                            G.doWrite(p, P)
                        })
                };
                k.prototype.uri = function() {
                    var M = this.query || {},
                        G = this.secure ? "https" : "http",
                        P = "";
                    !1 !== this.timestampRequests && (M[this.timestampParam] = C());
                    this.supportsBinary || M.sid || (M.b64 = 1);
                    M = t.encode(M);
                    this.port && ("https" == G && 443 != this.port || "http" == G && 80 != this.port) && (P = ":" + this.port);
                    M.length && (M = "?" + M);
                    var p = -1 !== this.hostname.indexOf(":");
                    return G + "://" + (p ? "[" + this.hostname + "]" : this.hostname) + P + this.path + M
                }
            }, {
                "../transport": 13,
                "component-inherit": 9,
                debug: "n9i2g6",
                "engine.io-parser": 20,
                parseqs: 27,
                "xmlhttprequest-ssl": 19,
                yeast: 30
            }],
            18: [function(q, u, v) {
                (function(k) {
                    function r(p) {
                        p && p.forceBase64 && (this.supportsBinary = !1);
                        this.perMessageDeflate = p.perMessageDeflate;
                        t.call(this, p)
                    }
                    var t = q("../transport"),
                        d = q("engine.io-parser"),
                        C = q("parseqs"),
                        I = q("component-inherit"),
                        W = q("yeast"),
                        M = q("debug")("engine.io-client:websocket"),
                        G = k.WebSocket || k.MozWebSocket,
                        P = G;
                    if (!P && "undefined" === typeof window) try {
                        P = q("ws")
                    } catch (p) {}
                    u.exports = r;
                    I(r, t);
                    r.prototype.name = "websocket";
                    r.prototype.supportsBinary = !0;
                    r.prototype.doOpen = function() {
                        if (this.check()) {
                            var p = this.uri(),
                                w = {
                                    agent: this.agent,
                                    perMessageDeflate: this.perMessageDeflate
                                };
                            w.pfx = this.pfx;
                            w.key = this.key;
                            w.passphrase = this.passphrase;
                            w.cert = this.cert;
                            w.ca = this.ca;
                            w.ciphers = this.ciphers;
                            w.rejectUnauthorized = this.rejectUnauthorized;
                            this.extraHeaders && (w.headers = this.extraHeaders);
                            this.ws = G ? new P(p) : new P(p, void 0, w);
                            void 0 === this.ws.binaryType && (this.supportsBinary = !1);
                            this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer";
                            this.addEventListeners()
                        }
                    };
                    r.prototype.addEventListeners = function() {
                        var p = this;
                        this.ws.onopen = function() {
                            p.onOpen()
                        };
                        this.ws.onclose = function() {
                            p.onClose()
                        };
                        this.ws.onmessage = function(w) {
                            p.onData(w.data)
                        };
                        this.ws.onerror = function(w) {
                            p.onError("websocket error", w)
                        }
                    };
                    "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function(p) {
                        var w = this;
                        setTimeout(function() {
                                t.prototype.onData.call(w, p)
                            },
                            0)
                    });
                    r.prototype.write = function(p) {
                        function w() {
                            H.emit("flush");
                            setTimeout(function() {
                                H.writable = !0;
                                H.emit("drain")
                            }, 0)
                        }
                        var H = this;
                        this.writable = !1;
                        for (var T = p.length, R = 0, da = T; R < da; R++)(function(A) {
                            d.encodePacket(A, H.supportsBinary, function(K) {
                                if (!G) {
                                    var F = {};
                                    A.options && (F.compress = A.options.compress);
                                    H.perMessageDeflate && ("string" == typeof K ? k.Buffer.byteLength(K) : K.length) < H.perMessageDeflate.threshold && (F.compress = !1)
                                }
                                try {
                                    G ? H.ws.send(K) : H.ws.send(K, F)
                                } catch (Q) {
                                    M("websocket closed before onclose event")
                                }--T ||
                                    w()
                            })
                        })(p[R])
                    };
                    r.prototype.onClose = function() {
                        t.prototype.onClose.call(this)
                    };
                    r.prototype.doClose = function() {
                        "undefined" !== typeof this.ws && this.ws.close()
                    };
                    r.prototype.uri = function() {
                        var p = this.query || {},
                            w = this.secure ? "wss" : "ws",
                            H = "";
                        this.port && ("wss" == w && 443 != this.port || "ws" == w && 80 != this.port) && (H = ":" + this.port);
                        this.timestampRequests && (p[this.timestampParam] = W());
                        this.supportsBinary || (p.b64 = 1);
                        p = C.encode(p);
                        p.length && (p = "?" + p);
                        var T = -1 !== this.hostname.indexOf(":");
                        return w + "://" + (T ? "[" + this.hostname +
                            "]" : this.hostname) + H + this.path + p
                    };
                    r.prototype.check = function() {
                        return !!P && !("__initialize" in P && this.name === r.prototype.name)
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                "../transport": 13,
                "component-inherit": 9,
                debug: "n9i2g6",
                "engine.io-parser": 20,
                parseqs: 27,
                ws: 7,
                yeast: 30
            }],
            19: [function(q, u, v) {
                var k = q("has-cors");
                u.exports = function(r) {
                    var t = r.xdomain,
                        d = r.xscheme;
                    r = r.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!t || k)) return new XMLHttpRequest
                    } catch (C) {}
                    try {
                        if ("undefined" !=
                            typeof XDomainRequest && !d && r) return new XDomainRequest
                    } catch (C) {}
                    if (!t) try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (C) {}
                }
            }, {
                "has-cors": 23
            }],
            20: [function(q, u, v) {
                (function(k) {
                    function r(A, K, F) {
                        if (!K) return v.encodeBase64Packet(A, F);
                        var Q = new FileReader;
                        Q.onload = function() {
                            A.data = Q.result;
                            v.encodePacket(A, K, !0, F)
                        };
                        return Q.readAsArrayBuffer(A.data)
                    }

                    function t(A, K, F) {
                        var Q = Array(A.length);
                        F = M(A.length, F);
                        for (var V = function(ba, O, ja) {
                                K(O, function(fa, ha) {
                                    Q[ba] = ha;
                                    ja(fa, Q)
                                })
                            }, Z = 0; Z < A.length; Z++) V(Z,
                            A[Z], F)
                    }
                    var d = q("./keys"),
                        C = q("has-binary"),
                        I = q("arraybuffer.slice"),
                        W = q("base64-arraybuffer"),
                        M = q("after"),
                        G = q("utf8"),
                        P = navigator.userAgent.match(/Android/i),
                        p = /PhantomJS/i.test(navigator.userAgent),
                        w = P || p;
                    v.protocol = 3;
                    var H = v.packets = {
                            open: 0,
                            close: 1,
                            ping: 2,
                            pong: 3,
                            message: 4,
                            upgrade: 5,
                            noop: 6
                        },
                        T = d(H),
                        R = {
                            type: "error",
                            data: "parser error"
                        },
                        da = q("blob");
                    v.encodePacket = function(A, K, F, Q) {
                        "function" == typeof K && (Q = K, K = !1);
                        "function" == typeof F && (Q = F, F = null);
                        var V = void 0 === A.data ? void 0 : A.data.buffer || A.data;
                        if (k.ArrayBuffer && V instanceof ArrayBuffer) {
                            if (K) {
                                F = A.data;
                                K = new Uint8Array(F);
                                F = new Uint8Array(1 + F.byteLength);
                                F[0] = H[A.type];
                                for (A = 0; A < K.length; A++) F[A + 1] = K[A];
                                A = Q(F.buffer)
                            } else A = v.encodeBase64Packet(A, Q);
                            return A
                        }
                        if (da && V instanceof k.Blob) return K ? w ? A = r(A, K, Q) : (K = new Uint8Array(1), K[0] = H[A.type], A = new da([K.buffer, A.data]), A = Q(A)) : A = v.encodeBase64Packet(A, Q), A;
                        if (V && V.base64) return Q("b" + v.packets[A.type] + A.data.data);
                        K = H[A.type];
                        void 0 !== A.data && (K += F ? G.encode(String(A.data)) : String(A.data));
                        return Q("" + K)
                    };
                    v.encodeBase64Packet = function(A, K) {
                        var F = "b" + v.packets[A.type];
                        if (da && A.data instanceof k.Blob) {
                            var Q = new FileReader;
                            Q.onload = function() {
                                var ba = Q.result.split(",")[1];
                                K(F + ba)
                            };
                            return Q.readAsDataURL(A.data)
                        }
                        try {
                            var V = String.fromCharCode.apply(null, new Uint8Array(A.data))
                        } catch (ba) {
                            A = new Uint8Array(A.data);
                            V = Array(A.length);
                            for (var Z = 0; Z < A.length; Z++) V[Z] = A[Z];
                            V = String.fromCharCode.apply(null, V)
                        }
                        F += k.btoa(V);
                        return K(F)
                    };
                    v.decodePacket = function(A, K, F) {
                        if ("string" == typeof A || void 0 ===
                            A) {
                            if ("b" == A.charAt(0)) return v.decodeBase64Packet(A.substr(1), K);
                            if (F) try {
                                A = G.decode(A)
                            } catch (Q) {
                                return R
                            }
                            F = A.charAt(0);
                            return Number(F) == F && T[F] ? 1 < A.length ? {
                                type: T[F],
                                data: A.substring(1)
                            } : {
                                type: T[F]
                            } : R
                        }
                        F = (new Uint8Array(A))[0];
                        A = I(A, 1);
                        da && "blob" === K && (A = new da([A]));
                        return {
                            type: T[F],
                            data: A
                        }
                    };
                    v.decodeBase64Packet = function(A, K) {
                        var F = T[A.charAt(0)];
                        if (!k.ArrayBuffer) return {
                            type: F,
                            data: {
                                base64: !0,
                                data: A.substr(1)
                            }
                        };
                        A = W.decode(A.substr(1));
                        "blob" === K && da && (A = new da([A]));
                        return {
                            type: F,
                            data: A
                        }
                    };
                    v.encodePayload =
                        function(A, K, F) {
                            "function" == typeof K && (F = K, K = null);
                            var Q = C(A);
                            if (K && Q) return da && !w ? v.encodePayloadAsBlob(A, F) : v.encodePayloadAsArrayBuffer(A, F);
                            if (!A.length) return F("0:");
                            t(A, function(V, Z) {
                                v.encodePacket(V, Q ? K : !1, !0, function(ba) {
                                    Z(null, ba.length + ":" + ba)
                                })
                            }, function(V, Z) {
                                return F(Z.join(""))
                            })
                        };
                    v.decodePayload = function(A, K, F) {
                        if ("string" != typeof A) return v.decodePayloadAsBinary(A, K, F);
                        "function" === typeof K && (F = K, K = null);
                        if ("" == A) return F(R, 0, 1);
                        var Q = "";
                        for (var V, Z, ba = 0, O = A.length; ba < O; ba++)
                            if (Z =
                                A.charAt(ba), ":" != Z) Q += Z;
                            else {
                                if ("" == Q || Q != (V = Number(Q))) return F(R, 0, 1);
                                Z = A.substr(ba + 1, V);
                                if (Q != Z.length) return F(R, 0, 1);
                                if (Z.length) {
                                    Q = v.decodePacket(Z, K, !0);
                                    if (R.type == Q.type && R.data == Q.data) return F(R, 0, 1);
                                    if (!1 === F(Q, ba + V, O)) return
                                }
                                ba += V;
                                Q = ""
                            }
                        if ("" != Q) return F(R, 0, 1)
                    };
                    v.encodePayloadAsArrayBuffer = function(A, K) {
                        if (!A.length) return K(new ArrayBuffer(0));
                        t(A, function(F, Q) {
                            v.encodePacket(F, !0, !0, function(V) {
                                return Q(null, V)
                            })
                        }, function(F, Q) {
                            F = Q.reduce(function(ba, O) {
                                O = "string" === typeof O ? O.length :
                                    O.byteLength;
                                return ba + O.toString().length + O + 2
                            }, 0);
                            var V = new Uint8Array(F),
                                Z = 0;
                            Q.forEach(function(ba) {
                                var O = "string" === typeof ba,
                                    ja = ba;
                                if (O) {
                                    ja = new Uint8Array(ba.length);
                                    for (var fa = 0; fa < ba.length; fa++) ja[fa] = ba.charCodeAt(fa);
                                    ja = ja.buffer
                                }
                                O ? V[Z++] = 0 : V[Z++] = 1;
                                ba = ja.byteLength.toString();
                                for (fa = 0; fa < ba.length; fa++) V[Z++] = parseInt(ba[fa]);
                                V[Z++] = 255;
                                ja = new Uint8Array(ja);
                                for (fa = 0; fa < ja.length; fa++) V[Z++] = ja[fa]
                            });
                            return K(V.buffer)
                        })
                    };
                    v.encodePayloadAsBlob = function(A, K) {
                        t(A, function(F, Q) {
                            v.encodePacket(F, !0, !0, function(V) {
                                var Z = new Uint8Array(1);
                                Z[0] = 1;
                                if ("string" === typeof V) {
                                    for (var ba = new Uint8Array(V.length), O = 0; O < V.length; O++) ba[O] = V.charCodeAt(O);
                                    V = ba.buffer;
                                    Z[0] = 0
                                }
                                ba = (V instanceof ArrayBuffer ? V.byteLength : V.size).toString();
                                var ja = new Uint8Array(ba.length + 1);
                                for (O = 0; O < ba.length; O++) ja[O] = parseInt(ba[O]);
                                ja[ba.length] = 255;
                                da && (V = new da([Z.buffer, ja.buffer, V]), Q(null, V))
                            })
                        }, function(F, Q) {
                            return K(new da(Q))
                        })
                    };
                    v.decodePayloadAsBinary = function(A, K, F) {
                        "function" === typeof K && (F = K, K = null);
                        for (var Q = [], V = !1; 0 < A.byteLength;) {
                            for (var Z = new Uint8Array(A), ba = 0 === Z[0], O = "", ja = 1; 255 != Z[ja]; ja++) {
                                if (310 < O.length) {
                                    V = !0;
                                    break
                                }
                                O += Z[ja]
                            }
                            if (V) return F(R, 0, 1);
                            A = I(A, 2 + O.length);
                            O = parseInt(O);
                            Z = I(A, 0, O);
                            if (ba) try {
                                Z = String.fromCharCode.apply(null, new Uint8Array(Z))
                            } catch (ha) {
                                for (ba = new Uint8Array(Z), Z = "", ja = 0; ja < ba.length; ja++) Z += String.fromCharCode(ba[ja])
                            }
                            Q.push(Z);
                            A = I(A, O)
                        }
                        var fa = Q.length;
                        Q.forEach(function(ha, Da) {
                            F(v.decodePacket(ha, K, !0), Da, fa)
                        })
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !==
                    typeof window ? window : {})
            }, {
                "./keys": 21,
                after: 3,
                "arraybuffer.slice": 4,
                "base64-arraybuffer": 5,
                blob: 6,
                "has-binary": 22,
                utf8: 29
            }],
            21: [function(q, u, v) {
                u.exports = Object.keys || function(k) {
                    var r = [],
                        t = Object.prototype.hasOwnProperty,
                        d;
                    for (d in k) t.call(k, d) && r.push(d);
                    return r
                }
            }, {}],
            22: [function(q, u, v) {
                (function(k) {
                    var r = q("isarray");
                    u.exports = function(t) {
                        function d(C) {
                            if (!C) return !1;
                            if (k.Buffer && k.Buffer.isBuffer(C) || k.ArrayBuffer && C instanceof ArrayBuffer || k.Blob && C instanceof Blob || k.File && C instanceof File) return !0;
                            if (r(C))
                                for (var I = 0; I < C.length; I++) {
                                    if (d(C[I])) return !0
                                } else if (C && "object" == typeof C)
                                    for (I in C.toJSON && (C = C.toJSON()), C)
                                        if (Object.prototype.hasOwnProperty.call(C, I) && d(C[I])) return !0;
                            return !1
                        }
                        return d(t)
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {
                isarray: 25
            }],
            23: [function(q, u, v) {
                try {
                    u.exports = "undefined" !== typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                } catch (k) {
                    u.exports = !1
                }
            }, {}],
            24: [function(q, u, v) {
                var k = [].indexOf;
                u.exports = function(r, t) {
                    if (k) return r.indexOf(t);
                    for (var d = 0; d < r.length; ++d)
                        if (r[d] === t) return d;
                    return -1
                }
            }, {}],
            25: [function(q, u, v) {
                u.exports = Array.isArray || function(k) {
                    return "[object Array]" == Object.prototype.toString.call(k)
                }
            }, {}],
            26: [function(q, u, v) {
                (function(k) {
                    var r = /^[\],:{}\s]*$/,
                        t = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        d = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        C = /(?:^|:|,)(?:\s*\[)+/g,
                        I = /^\s+/,
                        W = /\s+$/;
                    u.exports = function(M) {
                        if ("string" != typeof M || !M) return null;
                        M = M.replace(I, "").replace(W, "");
                        if (k.JSON && JSON.parse) return JSON.parse(M);
                        if (r.test(M.replace(t, "@").replace(d, "]").replace(C, ""))) return (new Function("return " + M))()
                    }
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {}],
            27: [function(q, u, v) {
                    v.encode = function(k) {
                        var r = "",
                            t;
                        for (t in k) k.hasOwnProperty(t) && (r.length && (r += "&"), r += encodeURIComponent(t) + "=" + encodeURIComponent(k[t]));
                        return r
                    };
                    v.decode = function(k) {
                        var r = {};
                        k = k.split("&");
                        for (var t = 0, d = k.length; t < d; t++) {
                            var C = k[t].split("=");
                            r[decodeURIComponent(C[0])] = decodeURIComponent(C[1])
                        }
                        return r
                    }
                },
                {}
            ],
            28: [function(q, u, v) {
                var k = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    r = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
                u.exports = function(t) {
                    var d = t,
                        C = t.indexOf("["),
                        I = t.indexOf("]"); - 1 != C && -1 != I && (t = t.substring(0, C) + t.substring(C, I).replace(/:/g,
                        ";") + t.substring(I, t.length));
                    t = k.exec(t || "");
                    for (var W = {}, M = 14; M--;) W[r[M]] = t[M] || ""; - 1 != C && -1 != I && (W.source = d, W.host = W.host.substring(1, W.host.length - 1).replace(/;/g, ":"), W.authority = W.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), W.ipv6uri = !0);
                    return W
                }
            }, {}],
            29: [function(q, u, v) {
                (function(k) {
                    (function(r) {
                        function t(R) {
                            for (var da = [], A = 0, K = R.length, F, Q; A < K;) F = R.charCodeAt(A++), 55296 <= F && 56319 >= F && A < K ? (Q = R.charCodeAt(A++), 56320 == (Q & 64512) ? da.push(((F & 1023) << 10) + (Q & 1023) + 65536) : (da.push(F),
                                A--)) : da.push(F);
                            return da
                        }

                        function d(R) {
                            if (55296 <= R && 57343 >= R) throw Error("Lone surrogate U+" + R.toString(16).toUpperCase() + " is not a scalar value");
                        }

                        function C() {
                            if (H >= w) throw Error("Invalid byte index");
                            var R = p[H] & 255;
                            H++;
                            if (128 == (R & 192)) return R & 63;
                            throw Error("Invalid continuation byte");
                        }

                        function I() {
                            if (H > w) throw Error("Invalid byte index");
                            if (H == w) return !1;
                            var R = p[H] & 255;
                            H++;
                            if (0 == (R & 128)) return R;
                            if (192 == (R & 224)) {
                                var da = C();
                                R = (R & 31) << 6 | da;
                                if (128 <= R) return R;
                                throw Error("Invalid continuation byte");
                            }
                            if (224 == (R & 240)) {
                                da = C();
                                var A = C();
                                R = (R & 15) << 12 | da << 6 | A;
                                if (2048 <= R) return d(R), R;
                                throw Error("Invalid continuation byte");
                            }
                            if (240 == (R & 248)) {
                                da = C();
                                A = C();
                                var K = C();
                                R = (R & 15) << 18 | da << 12 | A << 6 | K;
                                if (65536 <= R && 1114111 >= R) return R
                            }
                            throw Error("Invalid UTF-8 detected");
                        }
                        var W = "object" == typeof v && v,
                            M = "object" == typeof u && u && u.exports == W && u,
                            G = "object" == typeof k && k;
                        if (G.global === G || G.window === G) r = G;
                        var P = String.fromCharCode,
                            p, w, H;
                        G = {
                            version: "2.0.0",
                            encode: function(R) {
                                R = t(R);
                                for (var da = R.length, A = -1, K, F = ""; ++A <
                                    da;) {
                                    K = R[A];
                                    if (0 == (K & 4294967168)) K = P(K);
                                    else {
                                        var Q = "";
                                        0 == (K & 4294965248) ? Q = P(K >> 6 & 31 | 192) : 0 == (K & 4294901760) ? (d(K), Q = P(K >> 12 & 15 | 224), Q += P(K >> 6 & 63 | 128)) : 0 == (K & 4292870144) && (Q = P(K >> 18 & 7 | 240), Q += P(K >> 12 & 63 | 128), Q += P(K >> 6 & 63 | 128));
                                        K = Q += P(K & 63 | 128)
                                    }
                                    F += K
                                }
                                return F
                            },
                            decode: function(R) {
                                p = t(R);
                                w = p.length;
                                H = 0;
                                R = [];
                                for (var da; !1 !== (da = I());) R.push(da);
                                da = R.length;
                                for (var A = -1, K, F = ""; ++A < da;) K = R[A], 65535 < K && (K -= 65536, F += P(K >>> 10 & 1023 | 55296), K = 56320 | K & 1023), F += P(K);
                                return F
                            }
                        };
                        if (W && !W.nodeType)
                            if (M) M.exports = G;
                            else {
                                r = {}.hasOwnProperty;
                                for (var T in G) r.call(G, T) && (W[T] = G[T])
                            }
                        else r.utf8 = G
                    })(this)
                }).call(this, "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
            }, {}],
            30: [function(q, u, v) {
                function k(M) {
                    var G = "";
                    do G = t[M % 64] + G, M = Math.floor(M / 64); while (0 < M);
                    return G
                }

                function r() {
                    var M = k(+new Date);
                    return M !== W ? (C = 0, W = M) : M + "." + k(C++)
                }
                for (var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), d = {}, C = 0, I = 0, W; 64 > I; I++) d[t[I]] = I;
                r.encode = k;
                r.decode = function(M) {
                    var G = 0;
                    for (I = 0; I <
                        M.length; I++) G = 64 * G + d[M.charAt(I)];
                    return G
                };
                u.exports = r
            }, {}]
        }, {}, [10])(10)
    })
})();
(function(z) {
    "function" !== typeof Array.isArray && (Array.isArray = function(u) {
        return "[object Array]" === Object.prototype.toString.call(u)
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function(u) {
        for (var v = 0, k = this.length; v < k; v++)
            if (this[v] === u) return v;
        return -1
    });
    z = z.EventEmitter = function() {};
    var q = Array.isArray;
    z.prototype.emit = function(u) {
        if ("error" === u && (!this._events || !this._events.error || q(this._events.error) && !this._events.error.length)) {
            if (arguments[1] instanceof Error) throw arguments[1];
            throw Error("Uncaught, unspecified 'error' event.");
        }
        if (!this._events) return !1;
        var v = this._events[u];
        if (!v) return !1;
        if ("function" == typeof v) {
            switch (arguments.length) {
                case 1:
                    v.call(this);
                    break;
                case 2:
                    v.call(this, arguments[1]);
                    break;
                case 3:
                    v.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    var k = Array.prototype.slice.call(arguments, 1);
                    v.apply(this, k)
            }
            return !0
        }
        if (q(v)) {
            k = Array.prototype.slice.call(arguments, 1);
            v = v.slice();
            for (var r = 0, t = v.length; r < t; r++) v[r].apply(this, k);
            return !0
        }
        return !1
    };
    z.prototype.addListener =
        function(u, v) {
            if ("function" !== typeof v) throw Error("addListener only takes instances of Function");
            this._events || (this._events = {});
            this._events[u] ? q(this._events[u]) ? this._events[u].push(v) : this._events[u] = [this._events[u], v] : this._events[u] = v;
            return this
        };
    z.prototype.on = z.prototype.addListener;
    z.prototype.once = function(u, v) {
        var k = this;
        k.on(u, function t() {
            k.removeListener(u, t);
            v.apply(this, arguments)
        })
    };
    z.prototype.removeListener = function(u, v) {
        if ("function" !== typeof v) throw Error("removeListener only takes instances of Function");
        if (!this._events || !this._events[u]) return this;
        var k = this._events[u];
        if (q(k)) {
            v = k.indexOf(v);
            if (0 > v) return this;
            k.splice(v, 1);
            0 === k.length && delete this._events[u]
        } else this._events[u] === v && delete this._events[u];
        return this
    };
    z.prototype.removeAllListeners = function(u) {
        u ? u && this._events && this._events[u] && (this._events[u] = null) : this._events = {};
        return this
    };
    z.prototype.listeners = function(u) {
        this._events || (this._events = {});
        this._events[u] || (this._events[u] = []);
        q(this._events[u]) || (this._events[u] = [this._events[u]]);
        return this._events[u]
    }
})(window);
(function(z) {
    function q(k, r) {
        if (!r.engineIo) throw Error("You must specify engineIo");
        r.timestampRequests = !0;
        r.timestampParam = "__t";
        this.__callbackIndex = 0;
        this.__callbacks = {};
        this.state = v.OPENING;
        this.socket = new r.engineIo(k, r);
        this.debug = !1;
        if (document.getElementById("tawk__dmz")) {
            var t = this;
            z.getSocketTransport = function() {
                if (t.socket.transport) return t.socket.transport.name
            }
        }
        document.location && "#!tawk-debug" === document.location.hash && (this.debug = !0);
        EventEmitter.call(this);
        this.attachListeners()
    }
    var u, v = {
        OPENING: "opening",
        OPEN: "open",
        CLOSING: "closing",
        CLOSED: "closed"
    };
    for (u in EventEmitter.prototype) "function" === typeof EventEmitter.prototype[u] && Object.prototype.hasOwnProperty.call(EventEmitter.prototype, u) && (q.prototype[u] = EventEmitter.prototype[u]);
    q.prototype.attachListeners = function() {
        var k = this;
        this.socket.on("open", function() {
            k.state = v.OPEN;
            k.emit("connect")
        });
        this.socket.on("close", function(r, t) {
            k.emit("disconnect", r, t);
            k.doClose()
        });
        this.socket.on("error", function(r) {
            k.emit("error",
                r)
        });
        this.socket.on("message", function(r) {
            k.onMessage(r)
        })
    };
    q.prototype.close = q.prototype.disconnect = function() {
        var k = this;
        this.state === v.OPENING && setTimeout(function() {
            k.close()
        }, 1E3);
        this.state === v.OPEN && (this.state = v.CLOSING, this.clearCallbacks(), this.socket.close())
    };
    q.prototype.doClose = function() {
        this.clearCallbacks();
        this.state = v.CLOSED;
        this.socket.removeAllListeners();
        this.removeAllListeners();
        this.socket = null
    };
    q.prototype.clearCallbacks = function() {
        this.__callbacks = {}
    };
    q.prototype.onMessage =
        function(k) {
            (k = this.decode(k)) && ("__callback__" === k.c ? this.executeCallback(k) : this.emit.apply(this, [k.c].concat(k.p)))
        };
    q.prototype.executeCallback = function(k) {
        var r = this.__callbacks[k.cb];
        delete this.__callbacks[k.cb];
        r.apply(null, k.p)
    };
    q.prototype.decode = function(k) {
        this.debug && console && console.log && (data = new Date, console.log("received " + data.toUTCString() + " : " + k));
        try {
            var r = JSON.parse(k)
        } catch (t) {
            this.emit("error", t);
            return
        }
        if (r.c)
            if ("error" === r.c || "connect" === r.c || "disconnect" === r.c) this.emit("error",
                Error("server returned reserved command : `" + r.cmd + "`"));
            else if (r.p && "[object Array]" !== Object.prototype.toString.call(r.p)) this.emit("error", Error("data is expected to be an array"));
        else {
            if ("__callback__" !== r.c) return r;
            k = parseInt(r.cb, 10);
            if (isNaN(k)) this.emit("error", Error("received callback command but there was no valid callback id(`" + k + "`"));
            else {
                if (this.__callbacks[k]) return r.cb = k, r;
                this.emit("error", Error("received callback command but callback isnt present (`" + r.cb + "`)"))
            }
        } else this.emit("error",
            Error("no command was sent by the server"))
    };
    q.prototype.send = function() {
        var k = this.encode(arguments);
        this.debug && console && console.log && (data = new Date, console.log("send " + data.toUTCString() + " : " + k));
        this.state !== v.OPEN ? this.emit("error", Error("Socket isnt open its state is `" + this.state + "` tried to send `" + k + "`")) : k && this.socket.send(k)
    };
    q.prototype.encode = function(k) {
        var r = {};
        k = Array.prototype.slice.call(k);
        if (k[0]) {
            r.c = k[0];
            "function" === typeof k[k.length - 1] && (r.cb = this.enqueuCallback(k.pop()));
            r.p = k.slice(1);
            try {
                var t = JSON.stringify(r)
            } catch (d) {
                this.emit("error", d);
                return
            }
            return t
        }
        this.emit("error", Error("now command specified"))
    };
    q.prototype.enqueuCallback = function(k) {
        this.__callbacks[this.__callbackIndex] = k;
        return this.__callbackIndex++
    };
    z.$__TawkSocket = q
})(window);
(function(z) {
    var q, u, v = {},
        k = this,
        r = (new Date).getTime(),
        t = k.navigator,
        d = {
            viewHandler: null
        };
    z.startTime = r.toString();
    z.loaded = !1;
    z.connected = !1;
    z.ready = !1;
    "undefined" !== typeof Tawk_LoadStart && ($_Tawk_LoadStart = Tawk_LoadStart);
    try {
        var C = function(a, b) {
                this.language = a;
                this.notFoundCallback = "function" === typeof b ? b : function() {}
            },
            I = function() {
                this.started = this.maximize = this.isDocumentReady = !1;
                this.previousSessionKey = null;
                this.waitingForLanguage = !1;
                this.startTime = z.startTime;
                this.versionReloadTimeout = null;
                this.dataIsReady = this.viewIsReady = !1
            },
            W = function() {
                var a = this;
                this.stack = [];
                this.socketConnector = new Ja;
                this.events = {};
                d.eventEmitter.on("socketReady", function() {
                    a.clearStack();
                    d.viewHandler && d.visitorHandler.sendNavigationEvent()
                })
            },
            M = function() {
                this.agentsCount = 0;
                this.totalAgents = S.observable(0)
            },
            G = function() {
                var a = this;
                this.agentHasMessaged = this.visitorHasMessaged = !1;
                this.messageBuffer = [];
                this.messages = {};
                this.agentsTyping = [];
                this.agentProfilesTyping = [];
                this.previousTextTime = this.previousText =
                    this.lastMessageOwner = null;
                this.hasChatEnded = !1;
                this.hasChatStarted = S.observable(!1);
                this.hasWebRTCall = !1;
                d.eventEmitter.on("syncConversation", function(b) {
                    a.conversationUpdate(b)
                });
                d.eventEmitter.on("incomingMessage", function(b) {
                    a.handleMessageFromServer(b)
                });
                d.eventEmitter.on("agentIsTyping", function(b) {
                    f.showAgentTyping && a.handleAgentTyping(b.rsc)
                });
                d.eventEmitter.on("agentStopedTyping", function(b) {
                    a.handleAgentStoppedTyping(b.rsc)
                });
                d.eventEmitter.on("newChatRating", function(b) {
                    a.changeRating(b.rsc, !0)
                });
                d.eventEmitter.on("webrtcCallStatus", function(b) {
                    d.viewHandler.subscribeCallUpdate(b.clid)
                });
                d.eventEmitter.on("visitorChatDismiss", function(b) {
                    d.viewHandler.closeMessagePreview(b)
                });
                d.eventEmitter.on("visitorChatSeen", function(b) {
                    y.lastMessageTimestamp = b.lmst;
                    d.viewHandler.clearUnseenNotification()
                })
            },
            P = function() {
                var a = this;
                d.eventEmitter.on("chatBubbleClosed", function() {
                    y.chatBubbleClosed(!0)
                });
                d.eventEmitter.on("windowStateUpdated", function(b) {
                    y.chatWindowState(b.cw)
                });
                d.eventEmitter.on("pageStatusUpdated",
                    function(b) {
                        var c;
                        b && (c = b.ast) && l.isString(c) && l.isArray(b.dptst) && b.asver > y.pageStatusVersion && (d.scheduler.originalPageStatus = b.ast, y.pageStatusVersion = b.asver, y.departments = b.dptst, y.pageStatus(b.ast), d.scheduler.calculate())
                    });
                d.eventEmitter.on("submitPrechatForm", function(b, c) {
                    a.formatPrechatData(b, c)
                });
                d.eventEmitter.on("submitOfflineForm", function(b, c) {
                    a.formatOfflineData(b, c)
                });
                y.pageStatus.subscribe(function(b) {
                    v.triggerApiHandlers("onStatusChange", b)
                });
                d.eventEmitter.on("visitorTagsUpdate",
                    function(b) {
                        v.triggerApiHandlers("onTagsUpdated", b)
                    })
            },
            p = function() {
                var a = this;
                this.referrer = null;
                ea.name.subscribe(function(b) {
                    ea.displayName(l.parseVisitorName(b))
                });
                d.eventEmitter.on("localeChanged", function() {
                    ea.displayName(l.parseVisitorName(ea.name()))
                });
                d.eventEmitter.on("visitorDataUpdate", function(b) {
                    a.updateVisitorInformation(b)
                });
                d.eventEmitter.on("requestEmailTranscript", function(b, c) {
                    b.chatEndVersion = N.chatEndVersion;
                    d.chatHandler.hasChatEnded ? d.socketManager.sendToConnector("notifyEndChatTranscript",
                        b, c) : d.socketManager.sendToConnector("notifyEmailTranscript", b, c)
                })
            },
            w = function() {},
            H = function() {
                this.registerTime = 0;
                this.registerStart = null;
                this.maxRetrycount = 3;
                this.retryCount = 0;
                this.registerData = this.registerDelayTimeout = this.connectionCookieInterval = this.requestCancelTimeout = this.previousRegisterCall = null;
                this.registerStarted = !1;
                this.retryDelay = null;
                this.retryInitialDelay = 30;
                this.retryMultiplier = 1.5;
                this.minRandom = .5;
                this.maxRandom = 1.5;
                this.maxDelay = 120;
                this.retryRegisterTimeout = null
            },
            T = function() {
                var a =
                    this;
                this.originalPageStatus = this.agentCountSubscription = this.setupTimeout = null;
                this.utcOffset = 0;
                d.eventEmitter.on("scheduleUpdate", function(b) {
                    f.widgetId === b.wdgt && (f.schedule = b.ws ? a.convertOldScheduleFormat(b.ws.sch) : null, f.scheduleTimezone = null === b.wstz ? {} : {
                        utc: b.wstz.utc,
                        tzo: b.wstz.offset
                    }, a.setup())
                })
            },
            R = function() {
                var a = this,
                    b = !1;
                this.onActivityHandler = function() {
                    d && (a.away && z.connected && d.socketManager.sendToConnector("notifySocketStatusUpdate", "online"), a.active = !0, a.away = !1)
                };
                this.popupOnFocusHandler =
                    function() {
                        d && (!z.connected && d.socketManager.isForcedDisconnect() ? d.main.criticalRefresh(y.serverVersion, !1, !0) : (a.hasFocus || (a.active = !0, a.hasFocus = !0, z.connected && d.socketManager.sendToConnector("popupOnFocus", !0)), a.away && z.connected && d.socketManager.sendToConnector("notifySocketStatusUpdate", "online"), a.away = !1))
                    };
                this.popupOnBlurHandler = function() {
                    d && (a.hasFocus = !1, z.connected && d.socketManager.sendToConnector("popupOnFocus", !1))
                };
                this.reconnectOnActivity = function() {
                    d && !b && (b = !0, d.main.criticalRefresh(y.serverVersion))
                };
                this.away = this.active = this.hasFocus = !1;
                this.interval = this.awayTimeout = this.inactivityTimeout = null;
                this.initActivityReset = function() {
                    a.resetTimeout();
                    a.setupListeners();
                    a.interval = setInterval(function() {
                        a.active && (a.resetTimeout(), a.active = !1)
                    }, 1E4)
                }
            },
            da = function(a) {
                O.call(this, a)
            },
            A = function(a) {
                O.call(this, a)
            },
            K = function(a) {
                O.call(this, a)
            },
            F = function(a) {
                O.call(this, a)
            },
            Q = function(a) {
                O.call(this, a);
                this.screenWidth = 0
            },
            V = function(a) {
                O.call(this, a)
            },
            Z = function(a) {
                O.call(this, a)
            },
            ba = function(a) {
                O.call(this,
                    a)
            },
            O = function(a) {
                var b = this;
                arguments.length && (this.browser = a, this.metaContent = this.getMetaContent(), this.landscape = !1, this.zoom = 1, this.resizeTimeout = this.hasKeyboard = this.minAndMaxScalesAreEqual = this.hasViewportHeightWidth = this.hasInitialScale = !1, this.removeAgentNotification = !0, this.clickEvent = "touchend", this.hasChatStarted = this.isMaximized = this.isBottomWidget = !1, this.originalDocumentStyle = null, this.isTherePreChat = f.showPreChatForm, this.noZoomMetaTag = null, this.isIndicatorOn = !1, this.scrollTop = this.scrollLeft =
                    0, this.mainAgent = null, this.shapeChanged(), this.minifiedWidget = new ja, q = new Ia(this.tawktoLinkName, this.bottomContainerName), q.wrapper.addClass("mobile"), this.iframeContainer = new ca(l.getRandomName(), "border: 0 none !important; padding: 0 !important; margin: 0 !important; z-index: 999999999 !important; overflow : visible !important; min-width: 0 !important; min-height: 0 !important; max-width: none !important; max-height: none !important; width : auto !important; height : auto !important;"), this.indicator =
                    new Da(this.minifiedWidget.container), this.iframeContainer.addChildViews([this.minifiedWidget.container, q.container]), "#max-widget" === k.location.hash && (k.history ? k.history.replaceState({}, document.title, ".") : k.location.hash = ""), this.iframeContainer.buildView(), this.chatContainer = q.container, d.eventEmitter.on("resizeIframeHeight", function() {
                        b.resizeIframeHeight()
                    }), d.eventEmitter.on("visitorPopupFocus", function(c) {
                        b.isPopupFocused = c
                    }), d.eventHandler.listen(k, "popstate", function(c) {
                        !f.isPopup && b.isMaximized &&
                            "#max-widget" !== k.location.hash && y.chatWindowState("min")
                    }, "popstateFn"), y.chatWindowState.subscribe(function(c) {
                        f.isPopup || (b.hideWidget(), "max" === c ? (v.disableMobileBackHistory || k.location.hash && "#max-widget" !== k.location.hash || (k.history.pushState ? k.history.pushState(null, null, k.location.href + "#max-widget") : k.location.hash = "max-widget"), b.maximize()) : (v.disableMobileBackHistory || "#max-widget" === k.location.hash && k.history.back(), b.isMaximized = !1, b.show()))
                    }), y.pageStatus.subscribe(function(c) {
                        b.updateViewByStatus(c)
                    }),
                    f.mobileWidget.subscribe(function() {
                        b.renderBottomWidget();
                        b.minifiedWidget.buildView()
                    }), f.chatPosition.subscribe(function() {
                        b.updateWidgetPosition()
                    }), N.rating.subscribe(function(c) {
                        b.changeRating(c)
                    }), f.maxStyle.subscribe(function() {
                        b.chatContainer && b.chatContainer.elementReferrer && b.chatContainer.insertCssFile(f.maxStyle(), !0)
                    }), f.mobileWidget.subscribe(function(c) {
                        b.shapeChanged();
                        b.minifiedWidget.container.massRestyle({
                            width: b.minifiedBoxWidth + "px !important",
                            height: b.minifiedBoxHeight + "px !important",
                            "min-width": b.minifiedBoxWidth + "px !important",
                            "min-height": b.minifiedBoxHeight + "px !important",
                            "max-width": b.minifiedBoxWidth + "px !important",
                            "max-height": b.minifiedBoxHeight + "px !important"
                        })
                    }), d.chatHandler.hasChatStarted.subscribe(function(c) {
                        q.toggleEndChatOption(c)
                    }))
            },
            ja = function() {
                var a = this,
                    b = {
                        width: a.minifiedBoxWidth + "px",
                        height: a.minifiedBoxHeight + "px",
                        minwidth: a.minifiedBoxWidth + "px",
                        minheight: a.minifiedBoxHeight + "px",
                        maxwidth: a.minifiedBoxWidth + "px",
                        maxheight: a.minifiedBoxHeight + "px",
                        zindex: "1000000",
                        display: "none"
                    };
                this.setDimensions();
                this.clickToPopout = this.setPopoutHref = this.isMoving = !1;
                this.offsetY = f.widgetOffsetY;
                this.clickEvent = "touchend";
                f.isCenterPositioned() && "rectangle" === f.mobileWidget() && (f.isRightPositioned() ? (b.transform = "rotate(-90deg)", b.right = "0px") : (b.left = "0px", b.transform = "rotate(90deg)"));
                this.container = new qa(l.getRandomName(), l.getGenericStyle(b), Aa, "iframe");
                y.pageStatus.subscribe(function(c) {
                    a.updateStatus(c)
                });
                f.chatPosition.subscribe(function() {
                    a.updateWidgetPosition()
                });
                f.mobMinStyle.subscribe(function() {
                    a.container && a.container.elementReferrer && a.container.insertCssFile(f.mobMinStyle(), !0)
                });
                f.showMessagePreview.subscribe(function() {
                    f.showMessagePreview() ? a.initMessagePreviewContainer() : a.destroyMessagePreviewContainer()
                });
                d.eventEmitter.on("localeChanged", function() {
                    a.updateStatus()
                })
            },
            fa = function() {
                var a = this;
                this.currentForm = "";
                this.formView = null;
                this.forms = {
                    nameForm: {
                        id: "changeNameForm",
                        title: "NameFormMessage",
                        fields: [{
                            fieldName: "name",
                            valueMaxLength: 40,
                            languageKey: "Name",
                            getValue: d.visitorHandler.getNameValue,
                            validation: "isValidString",
                            type: "input",
                            isRequired: !0
                        }],
                        publish: "notifyNameChange",
                        afterSave: d.visitorHandler.setNameFromForm,
                        resize: "auto"
                    },
                    emailTranscriptForm: {
                        id: "emailTranscriptForm",
                        title: "EmailTranscriptFormMessage",
                        fields: [{
                            fieldName: "name",
                            valueMaxLength: 40,
                            languageKey: "Name",
                            getValue: d.visitorHandler.getNameValue,
                            validation: "isValidString",
                            type: "input",
                            hiddenIE8: !0,
                            isRequired: !0
                        }, {
                            fieldName: "transcriptEmail",
                            valueMaxLength: 150,
                            languageKey: "Email",
                            getValue: d.visitorHandler.getTranscriptEmailValue,
                            validation: "isValidEmail",
                            type: "input",
                            instantValidation: !1,
                            isRequired: !0
                        }],
                        saveFunc: "requestEmailTranscript",
                        afterSave: d.visitorHandler.setTranscriptValue,
                        resize: "auto"
                    },
                    offlineForm: {
                        id: "offlineForm",
                        getTitle: function() {
                            return l.transformGreetings(f.offlineOptions.text)
                        },
                        dynamicFields: null,
                        saveFunc: "submitOfflineForm",
                        dontCloseForm: !0,
                        afterSave: a.showOfflineOverlay
                    },
                    preChatForm: {
                        id: "preChatForm",
                        getTitle: function() {
                            return f.prechatOptions.text ? l.transformGreetings(f.prechatOptions.text) : f.isEmbedded &&
                                "page" === $_Tawk_WidgetId && pageType && "profile" === pageType ? d.languageParser.translate("form", "PreChatFormMessageProfile") : d.languageParser.translate("form", "PreChatFormMessage")
                        },
                        dynamicFields: null,
                        saveFunc: "submitPrechatForm",
                        afterSave: a.handlePrechatForm,
                        dontCloseForm: !1
                    },
                    inactivityOverlay: {
                        id: "inactivityOverlay",
                        overlayMessage: "inactive",
                        otherEvent: {
                            eventName: "click",
                            elementName: "inactivityOverlay",
                            executedFunc: d.main.criticalRefresh
                        }
                    },
                    maintenanceOverlay: {
                        id: "maintenanceOverlay",
                        overlayMessage: "maintenance"
                    },
                    endChatForm: {
                        id: "endChatForm",
                        publish: "endVisitorChat",
                        afterSave: a.handleChatEnded,
                        dontCloseForm: !1,
                        resize: "auto",
                        title: "EndChatTitle"
                    },
                    consentForm: {
                        id: "consentForm",
                        saveFunc: "submitConsent",
                        getTitle: function() {
                            return l.transformGreetings(f.consentOption.text).replace(l.regLineBreaks, l.br)
                        },
                        dynamicFields: null,
                        dontCloseForm: !0,
                        otherEvent: {
                            eventName: "click",
                            elementName: "formDecline",
                            executedFunc: function() {
                                f.isPopup ? k.close() : y.chatWindowState("min")
                            }
                        },
                        customButtons: function() {
                            return f.consentOption.buttons
                        }
                    },
                    restartChatForm: {
                        id: "restartChatForm",
                        dontCloseForm: !0,
                        resize: "auto",
                        title: "chatEnded",
                        fields: [{
                            fieldName: "transcriptEmail",
                            valueMaxLength: 150,
                            languageKey: "Email",
                            getValue: d.visitorHandler.getTranscriptEmailValue,
                            validation: "isValidEmail",
                            type: "input",
                            instantValidation: !1,
                            isRequired: !0
                        }],
                        saveFunc: "requestEmailTranscript",
                        afterSave: d.visitorHandler.setTranscriptValue
                    }
                };
                d.eventEmitter.on("localeChanged", function() {
                    var b = a.currentForm;
                    b && (a.closeForm(), a.openForm(b))
                });
                ea.displayName.subscribe(function(b) {
                    !a.currentForm ||
                        "preChatForm" !== a.currentForm && "offlineForm" !== a.currentForm || a.formView.updateName(b)
                });
                ea.email.subscribe(function(b) {
                    !a.currentForm || "preChatForm" !== a.currentForm && "offlineForm" !== a.currentForm || a.formView.updateEmail(b)
                });
                y.prechatFormSubmitted.subscribe(function() {
                    "preChatForm" === a.currentForm && a.closeForm()
                })
            },
            ha = function(a) {
                this.container = a;
                this.documentRef = this.container.documentRef;
                this.quickReplyContainer = this.messagePreviewContainer = null;
                this.prevSenderUid = "";
                this.messagePreviewCount = 0;
                this.timeIntervalsArr = [];
                this.isQuickReplyInitialized = !1;
                this.maxNumberFileUpload = 5;
                this.chatTextarea = new ca("chatTextarea", null, null, "textarea");
                this.incomingCallContainer = null;
                this.offsetX = f.widgetOffsetX;
                this.offsetY = f.widgetOffsetY;
                this.wrapper = null;
                this.isActionsContainerNotifShown = !1;
                this.lastRadioButton = null;
                this.resizeThrottle = 0
            },
            Da = function(a) {
                var b = this;
                this.container = a;
                this.unansweredMessages = 0;
                d.eventEmitter.on("visitorPopupFocus", function(c) {
                    b.isPopupFocused = c;
                    b.hide()
                });
                y.chatWindowState.subscribe(function(c) {
                    "max" ===
                    c && b.hide()
                });
                this.originalPageTitle = document.title;
                this.pageTitleNotification = {
                    interval: null,
                    on: function() {
                        !this.interval && f.showUnreadInTab() && (this.interval = setInterval(function() {
                            document.title = b.originalPageTitle === document.title ? d.languageParser.translate("chat", "newMessage", {
                                num: b.unansweredMessages
                            }) : b.originalPageTitle
                        }, 1E3))
                    },
                    off: function() {
                        clearInterval(this.interval);
                        this.interval = null;
                        document.title = b.originalPageTitle
                    }
                }
            },
            va = function(a, b) {
                Ea.apply(this, [a]);
                this.formName = b;
                this.isFormRequired = !1
            },
            Ea = function(a) {
                this.template = (this.elementId = (this.formData = a) ? a.id : null) && U[this.elementId] ? U[this.elementId] : "";
                this.elementReferrer = null;
                this.documentRef = document;
                this.attributes = {
                    className: "form"
                };
                this.elementId && (this.attributes.id = this.elementId)
            },
            qa = function() {
                ca.apply(this, arguments)
            },
            ca = function(a, b, c, e, g) {
                var h = this;
                this.elementId = a || "";
                this.style = b || "";
                this.tagName = e || "div";
                this.childViews = [];
                this.template = a && U[a] ? U[a] : "";
                this.elementReferrer = null;
                this.documentRef = g || document;
                this.attributes = {};
                this.isVisible = !1;
                this.classNames = [];
                "iframe" === e && (this.isIframe = !0);
                this.elementId && (this.attributes.id = this.elementId);
                c && Object.keys(c).forEach(function(m) {
                    h.attributes[m] = c[m]
                })
            },
            Ja = function() {
                this.chatWindowStates = {
                    min: !0,
                    max: !0
                };
                this.selfOrigin = this.socket = null;
                this.forceDisconnected = this.banned = this.ready = this.disconnect = !1;
                this.clearRegisterRetryTimeout = null
            },
            bb = function(a) {
                a = la.shortnameToUnicode(a.title);
                D.mobileBrowserName && f.isPopup ? d.viewHandler.addEmojiToInput(a) : "max" === y.chatWindowState() ||
                    f.isPopup || f.isEmbedded ? q.addEmojiToInput(a) : d.viewHandler.messagePreview && d.viewHandler.messagePreview.addEmojiToInput(a)
            },
            jb = function(a) {
                d.eventHandler.listen(a, "touchstart", function(b) {
                    d.eventHandler.getTargetElement(b).setAttribute("data-moved", "0")
                }, a.id + "TouchEmoji");
                d.eventHandler.listen(a, "touchmove", function(b) {
                    d.eventHandler.getTargetElement(b).setAttribute("data-moved", "1")
                }, a.id + "MoveEmoji");
                d.eventHandler.listen(a, "touchend", function(b) {
                    b = d.eventHandler.getTargetElement(b);
                    "0" === b.getAttribute("data-moved") &&
                        bb(b);
                    b.removeAttribute("data-moved")
                }, a.id + "TapEmoji")
            },
            cb = function() {
                for (var a = l.getElementsByClassName(Na, "emoji-select"), b = 0; b < a.length; b++) "touchend" === d.viewHandler.clickEvent ? jb(a[b]) : d.eventHandler.listen(a[b], d.viewHandler.clickEvent, function(c) {
                    c = d.eventHandler.getTargetElement(c);
                    bb(c)
                }, a[b].id + "SelectEmoji")
            },
            db = function(a, b) {
                var c = "";
                var e = U["emoji-tab-pane"];
                var g = U["emoji-list"];
                var h = l.getElementsByClassName(a, "open-tab");
                if (a = "max" !== y.chatWindowState() && d.viewHandler.messagePreview ?
                    d.viewHandler.messagePreview.container.getElementById("tab-content") : D.mobileBrowserName && f.isPopup ? d.viewHandler.chatContainer.getElementById("tab-content") : q.container.getElementById("tab-content")) {
                    b = "open-tab" === b.target.className ? b.target : b.target.offsetParent;
                    b = b.id;
                    for (var m = 0; m < h.length; m++) h[m].className = h[m].id === b ? "open-tab active" : "open-tab";
                    if ("search" === b) a.innerHTML = U["emoji-search-pane"], e = D.mobileBrowserName && f.isPopup ? d.viewHandler.chatContainer.getElementById("search-emoji") : q.container.getElementById("search-emoji"),
                        d.eventHandler.listen(e, "keyup", function(n) {
                            var x = d.eventHandler.getTargetElement(n).value.trim().toLowerCase(),
                                E = U["emoji-list"],
                                L = "";
                            if ((n = D.mobileBrowserName && f.isPopup ? d.viewHandler.chatContainer.getElementById("search-list") : q.container.getElementById("search-list")) && Oa) {
                                if (x)
                                    for (var B = 0; B < Oa.length; B++) {
                                        var J = Oa[B]; - 1 !== J.indexOf(x) && (L += E.replace(/__IMAGE__/, la.shortnameToImage(J)).replace(/__SHORTNAME__/g, J))
                                    }
                                n.innerHTML = L;
                                cb()
                            }
                        }, "searchEmojiKeyup");
                    else if (h = Ta[b]) h.content.forEach(function(n) {
                        c +=
                            g.replace(/__IMAGE__/, la.shortnameToImage(n)).replace(/__SHORTNAME__/g, n)
                    }), a.innerHTML = e.replace(/__EMOJIS__/, c).replace(/__ID__/, "people"), cb()
                }
            },
            Va = function(a) {
                var b, c = "",
                    e = U["emoji-selection"],
                    g = U["emoji-tab-select"];
                Na && Na === a ? l.addClass(a, "showWithFade") : (l.addClass(a, "showWithFade"), "undefined" === typeof la ? 20 === Ka ? a.innerHTML = d.languageParser.translate("chat", "emoji_error_load") : (0 === Ka && Ua(), setTimeout(function() {
                    Va(a)
                }, 20)) : (clearTimeout(La), Na = a, setTimeout(function() {
                    Object.keys(Ta).forEach(function(m) {
                        c +=
                            g.replace(/__ID__/, m).replace(/__IMAGE__/, la.shortnameToImage(Ta[m].header)).replace(/__IS_ACTIVE__/, "")
                    });
                    e = e.replace(/__TAB_LIST__/, c);
                    a.innerHTML = e;
                    b = l.getElementsByClassName(a, "open-tab");
                    db(a, {
                        target: b[0]
                    });
                    for (var h = 0; h < b.length; h++) d.eventHandler.listen(b[h], d.viewHandler.clickEvent, function(m) {
                        m.stopPropagation();
                        db(a, m)
                    }, b[h].id + "OpenTab")
                })))
            },
            Ua = function() {
                clearTimeout(La);
                if (f.isPopup) var a = k;
                else a = D.mobileBrowserName && f.isPopup ? d.viewHandler.chatContainer.elementId : q.container.elementId,
                    a = document.getElementById(a), a = a.contentWindow || a.contentDocument || a;
                "undefined" === typeof a.emojione ? (Ka++, 20 === Ka ? (clearTimeout(La), Ka = 0) : La = setTimeout(function() {
                    Ua()
                }, 20)) : (clearTimeout(La), Ka = 0, la = a.emojione, la.ascii = !0, Oa = la.shortnames.replace(/\\\+/g, "+").split("|"))
            },
            eb = function(a) {
                var b = a.getElementsByTagName("head")[0],
                    c = a.createElement("script");
                a = a.createElement("link");
                c.type = "text/javascript";
                c.src = "https://cdn.jsdelivr.net/emojione/2.2.7/lib/js/emojione.min.js";
                c.async = !0;
                a.type = "text/css";
                a.rel = "stylesheet";
                a.href = "https://cdn.jsdelivr.net/emojione/2.2.7/assets/css/emojione.min.css";
                b.appendChild(a);
                b.appendChild(c);
                Ua()
            },
            Wa = function() {
                var a = this;
                this.uploads = {};
                d.eventEmitter.on("fileUploadProgress", function(b) {
                    d.viewHandler.updateFileProgress(b)
                });
                d.eventEmitter.on("fileUploadFinished", function(b) {
                    a.uploads[b.handle] && (delete a.uploads[b.handle], d.viewHandler.fileUploaded(b.handle), d.chatHandler.sendFileMessage(b))
                });
                d.eventEmitter.on("fileUploadError", function(b) {
                    var c = a.uploads[b.handle];
                    c && d.viewHandler.handleUploadError(null, c, b.handle)
                })
            },
            Xa = function() {
                this.sounds = {};
                this.audioContext = null;
                this.isReadyForInit = !1;
                this.eventUsedForInit = null
            },
            kb = function(a, b, c) {
                this.sourcePath = a;
                this.buffer = null;
                this.name = b;
                this.audioPlayer = c;
                this.source = null;
                this.volume = 1;
                this.play = function() {
                    if (this.buffer) {
                        var e = this.audioPlayer.audioContext.createGain();
                        e.gain.value = this.volume;
                        this.source = this.audioPlayer.audioContext.createBufferSource();
                        this.source.buffer = this.buffer;
                        this.source.connect(e);
                        e.connect(this.audioPlayer.audioContext.destination);
                        this.source.start(0)
                    }
                };
                this.loadBuffer = function() {
                    var e = new XMLHttpRequest,
                        g = this;
                    e.open("GET", g.sourcePath, !0);
                    e.responseType = "arraybuffer";
                    e.onload = function() {
                        g.audioPlayer.audioContext.decodeAudioData(e.response, function(h) {
                            h && (g.buffer = h, g.audioPlayer.isReadyForInit || (g.audioPlayer.eventUsedForInit = g.name, g.audioPlayer.isReadyForInit = !0))
                        }, function(h) {
                            throw Error(h);
                        })
                    };
                    e.onerror = function(h) {
                        throw Error("BufferLoader: XHR error for " + g.sourcePath);
                    };
                    e.send()
                };
                this.loadBuffer()
            },
            lb = function(a) {
                if ("symbian" === D.mobileBrowserName) this.play = function() {};
                else {
                    if ("safari" === D.mobileBrowserName) {
                        var b = document.createElement("audio");
                        b.src = a;
                        b.style.cssText = "position: absolute; position: absolute; width: 0px; height: 0px; top: -10000px; left: -10000px;";
                        document.body.appendChild(b)
                    } else b = new Audio(a);
                    b.addEventListener("timeupdate", function() {
                        .2 <= b.currentTime && b.pause()
                    }, !1);
                    b.load();
                    this.soundEl = b;
                    this.play = function() {
                        try {
                            b.currentTime = 0, b.autoplay = !0, b.load(), b.play()
                        } catch (c) {}
                    }
                }
            },
            ra = function() {
                this.isCookieEnabled = this.checkCookieEnabled();
                this.alphaNumericReg = /[^0-9a-zA-Z]/g;
                this.hasSessionStorage = this.isCookieEnabled && !!k.sessionStorage;
                this.checkLocalStorageUsage();
                this.clearOldCookies("TawkCookie")
            },
            Pa = function() {},
            Fa = function() {
                var a = this;
                this.events = {};
                this.supportsPassive = !1;
                if (k.addEventListener) try {
                    var b = Object.defineProperty({}, "passive", {
                        get: function() {
                            a.supportsPassive = !0
                        }
                    });
                    k.addEventListener("testPassive", null, b);
                    k.removeEventListener("testPassive",
                        null, b)
                } catch (c) {
                    a.supportsPassive = !1
                }
            },
            Ya = function() {
                this.originalErrorHandlerFn = k.onerror
            },
            Ma = function() {
                this.unloading = !1
            },
            Ba = function() {
                this.versionSearchString = this.browserObj = null;
                this.init()
            },
            Y = function() {
                this.br = "<br/>";
                this.regAlphaNumeric = /^[a-z0-9\-]{1,50}$/i;
                this.regNameMach = /^V[0-9]{16}$/;
                this.regTrim = /^\s+|\s+$/g;
                this.regDate = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
                this.regEmail = /^(?:[\w!#\$%&'\*\+\-\/=\?\^`\{\|\}~]+\.)*[\w!#\$%&'\*\+\-\/=\?\^`\{\|\}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/i;
                this.regSurvey = /\[option\](.*?)(<br\/>|$)/g;
                this.regSurveyQuestion = /^(.*?)\[option\]/g;
                this.regOption = /\[option\]/g;
                this.regBr = /<br\/>/;
                this.regMatchUrl = /(?:^(?:(?:[a-z]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:localhost|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#][^\s"]*)?$)/i;
                this.regMatchIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?\/([a-zA-Z0-9!$&'()*+.=-_~:@\/\?#]+)+)\b/gi;
                this.regEmailMatch = /^((mailto:){0,1}[a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]+)$/;
                this.regLineBreaks = /(\r\n|\n|\r)/gm;
                this.decodedAmp = "&";
                this.decodedQuote = '"';
                this.decodedApos = "'";
                this.decodedLess = "<";
                this.decodedGreat = ">";
                this.encodedQuote = "&quot;";
                this.encodedApos = "&#39;";
                this.encodedLess = "&lt;";
                this.encodedGreat = "&gt;";
                this.encodedAmp = "&amp;";
                this.rtlLangTab = ["ar", "he", "fa"];
                this.decodedAmpRegex = new RegExp(this.decodedAmp, "g");
                this.decodedQuoteRegex = new RegExp(this.decodedQuote, "g");
                this.decodedAposRegex = new RegExp(this.decodedApos, "g");
                this.decodedLessRegex = new RegExp(this.decodedLess, "g");
                this.decodedGreatRegex = new RegExp(this.decodedGreat, "g");
                this.encodedQuoteRegex = new RegExp(this.encodedQuote, "g");
                this.encodedAposRegex = new RegExp(this.encodedApos, "g");
                this.encodedLessRegex = new RegExp(this.encodedLess, "g");
                this.encodedGreatRegex = new RegExp(this.encodedGreat, "g");
                this.encodedAmpRegex = new RegExp(this.encodedAmp, "g");
                this.connectionUrl = "https://video.tawk.to"
            },
            mb = function() {
                v = {
                    disableSound: !!Tawk_API.disableSound,
                    embedded: Tawk_API.embedded || null,
                    visitor: Tawk_API.visitor || null,
                    disableMobileBackHistory: !!Tawk_API.disableMobileBackHistory,
                    isPopup: !!Tawk_API.isPopup,
                    onBeforeLoad: {
                        eventName: "tawkBeforeLoad",
                        func: Tawk_API.onBeforeLoad
                    },
                    onLoad: {
                        eventName: "tawkLoad",
                        func: Tawk_API.onLoad
                    },
                    onStatusChange: {
                        eventName: "tawkStatusChange",
                        func: Tawk_API.onStatusChange
                    },
                    onChatMaximized: {
                        eventName: "tawkChatMaximized",
                        func: Tawk_API.onChatMaximized
                    },
                    onChatMinimized: {
                        eventName: "tawkChatMinimized",
                        func: Tawk_API.onChatMinimized
                    },
                    onChatHidden: {
                        eventName: "tawkChatHidden",
                        func: Tawk_API.onChatHidden
                    },
                    onChatStarted: {
                        eventName: "tawkChatStarted",
                        func: Tawk_API.onChatStarted
                    },
                    onChatEnded: {
                        eventName: "tawkChatEnded",
                        func: Tawk_API.onChatEnded
                    },
                    onPrechatSubmit: {
                        eventName: "tawkPrechatSubmit",
                        func: Tawk_API.onPrechatSubmit
                    },
                    onOfflineSubmit: {
                        eventName: "tawkOfflineSubmit",
                        func: Tawk_API.onOfflineSubmit
                    },
                    onChatMessageVisitor: {
                        eventName: "tawkChatMessageVisitor",
                        func: Tawk_API.onChatMessageVisitor
                    },
                    onChatMessageAgent: {
                        eventName: "tawkChatMessageAgent",
                        func: Tawk_API.onChatMessageAgent
                    },
                    onChatMessageSystem: {
                        eventName: "tawkChatMessageSystem",
                        func: Tawk_API.onChatMessageSystem
                    },
                    onAgentJoinChat: {
                        eventName: "tawkAgentJoinChat",
                        func: Tawk_API.onAgentJoinChat
                    },
                    onAgentLeaveChat: {
                        eventName: "tawkAgentLeaveChat",
                        func: Tawk_API.onAgentLeaveChat
                    },
                    onChatSatisfaction: {
                        eventName: "tawkChatSatisfaction",
                        func: Tawk_API.onChatSatisfaction
                    },
                    onVisitorNameChanged: {
                        eventName: "tawkVisitorNameChanged",
                        func: Tawk_API.onVisitorNameChanged
                    },
                    onFileUpload: {
                        eventName: "tawkFileUpload",
                        func: Tawk_API.onFileUpload
                    },
                    onTagsUpdated: {
                        eventName: "tawkTagsUpdated",
                        func: Tawk_API.onTagsUpdated
                    },
                    onUnreadCountChanged: {
                        eventName: "tawkUnreadCountChanged"
                    },
                    triggerApiHandlers: function(a, b) {
                        var c = v[a];
                        if (void 0 !== c) {
                            if ("onBeforeLoad" === a) {
                                if (Tawk_API.onBeforeLoaded) return;
                                Tawk_API.onBeforeLoaded = !0
                            } else if ("onLoad" === a) {
                                if (Tawk_API.onLoaded) return;
                                Tawk_API.onLoaded = !0
                            }
                            this.dispatch(c.eventName, b);
                            if ("function" === typeof c.func) try {
                                c.func(b)
                            } catch (e) {}
                        }
                    },
                    dispatch: function(a, b) {
                        a && (a = "function" === typeof k.CustomEvent ?
                            new CustomEvent(a, {
                                detail: b
                            }) : new d.CustomEventIE(a, {
                                detail: b
                            }), k.dispatchEvent(a))
                    }
                }
            };
        d.ResetStyle = "html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}body{line-height:1}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}nav ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}ins{background-color:#ff9;color:#000;text-decoration:none}mark{background-color:#ff9;color:#000;font-style:italic;font-weight:bold}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}table{border-collapse:collapse;border-spacing:0}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}input,select{vertical-align:middle}html,body{height:100%;width:100%}body{background:transparent;height:100%;width:100%;font:13px Helvetica,Arial,sans-serif;position:relative}.clear{clear:both}.clearfix:after{content:'';display:block;height:0;clear:both;visibility:hidden}";
        d.MaximizedStyle = "body{font-weight:normal;outline:0;font-size:15px;font-family:Helvetica,Arial,sans-serif}body.font-lato{font-family:'Lato','Open Sans',sans-serif!important}*{font-family:inherit}::-webkit-input-placeholder{white-space:normal}::-moz-placeholder{white-space:normal}:-ms-input-placeholder{white-space:normal}:-moz-placeholder{white-space:normal}.rtl-direction{direction:rtl!important}#tawkchat-maximized-wrapper{width:100%;height:100%;position:relative}#tawkchat-maximized-wrapper.noMenu .headerBoxLink{display:none!important}#tawkchat-maximized-wrapper.noMenu #minimizeChat.headerBoxLink{display:block!important}#tawkchat-maximized-wrapper .notShown{display:none!important}#borderWrapper{position:absolute;top:0;bottom:0;z-index:-10;background-color:#e1e1e1;width:100%;height:100%}#innerWrapper{background:#fff;left:0;position:absolute;right:0;top:0;bottom:0;border:1px solid #e9e9e9}#headerBoxWrapper{height:60px}#expandableLink{height:5px;width:100%;font-size:0;cursor:s-resize;visibility:hidden;position:absolute;top:56px;z-index:30}#expandableIcon{width:30px;height:4px;margin:0 auto;background:#a1a1a1}#expandableLink.expanded{cursor:n-resize}#headerBox{height:60px;position:relative;z-index:30;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}#agentBar{height:100px;display:none}#headerBoxControlsContainer{height:60px;position:relative;float:none;display:grid;grid-auto-columns:1fr;padding:0 8px;display:-ms-grid;-ms-grid-columns:1fr}#headerBoxControlsContainer #screenShare{-ms-grid-row:1;-ms-grid-column:2;float:left;width:30px;height:60px}#headerBoxControlsContainer #voiceCall{-ms-grid-row:1;-ms-grid-column:3;float:left;width:30px;height:60px}#headerBoxControlsContainer #videoCall{-ms-grid-row:1;-ms-grid-column:4;float:left;width:30px;height:60px}#headerBoxControlsContainer .headerBoxLink{-ms-grid-row:1;-ms-grid-column:5;float:left;width:30px;height:60px}#headerBoxControlsContainer #minimizeChat{-ms-grid-row:1;-ms-grid-column:6;float:left;width:30px;height:60px}#headerAccountStateContainer{width:fit-content;height:60px;display:grid;grid-template-columns:auto 1fr;-ms-flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;flex-grow:1;-ms-flex-shrink:1;-webkit-flex-shrink:1;-moz-flex-shrink:1;flex-shrink:1;-ms-flex:1;display:-ms-grid;-ms-grid-columns:auto 1fr}#headerAccountStateContainer #headerAccountState{-ms-grid-row:1;-ms-grid-column:1;float:left}#headerAccountStateContainer #agentProfileContainer{-ms-grid-row:1;-ms-grid-column:2;float:left;width:auto}.rtl-direction #headerAccountStateContainer #agentProfileContainer{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#headerAccountStateContainer #agentProfileContainer.show{display:-ms-grid;display:grid;-ms-grid-columns:auto auto 1fr;grid-template-columns:auto auto 1fr}.agent-profile-detailed{-ms-grid-row:1;-ms-grid-column:3}#headerAccountState{padding:0 5px 0 14px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:0;height:100%;box-sizing:border-box;line-height:60px}#shortMessage{font-weight:500}#chatContainerWrapper{position:absolute;bottom:78px;top:0;width:100%;background-color:white}#greetingsText{white-space:pre-wrap}#chatContainerWrapper.chat-ended{bottom:118px}.no-branding #chatContainerWrapper{bottom:48px}.form-opened #bottomContainer{bottom:0;z-index:1}#chatContainer{overflow:scroll;position:absolute;font-size:14px;color:#6c6c6c;min-width:270px;height:auto;overflow-x:hidden;top:0;bottom:0;width:100%;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#fff #fff;-ms-overflow-style:-ms-autohiding-scrollbar}#chatContainer::-webkit-scrollbar,#formFieldsContainer::-webkit-scrollbar{width:7px}#chatContainer::-webkit-scrollbar-thumb,#formFieldsContainer::-webkit-scrollbar-thumb{-webkit-border-radius:3px;border-radius:3px;background:transparent}#tawkchat-maximized-wrapper:hover #chatContainer::-webkit-scrollbar-thumb,#formFieldsContainer:hover::-webkit-scrollbar-thumb{background:#aaa}#tawkchat-maximized-wrapper:hover #chatContainer,#tawkchat-maximized-wrapper:hover #formFieldsContainer{scrollbar-color:#aaa #fff}.uploadFailedNotifContainer,#maxFileNotificationContainer,#maxSizeNotificationContainer{color:black;background-color:white;border:1px solid #ddd;margin:5px 10px;padding:9px 10px 18px 10px;border-radius:6px;font-size:13px;position:relative}.uploadFailedNotifContainer{margin-bottom:25px}#maxFileNotificationContainer #maxFileNumberList,#maxSizeNotificationContainer #maxFileSizeList{margin:0;margin-top:10px;font-weight:600}#maxFileNotificationContainer #maxFileNumberList ul,#maxSizeNotificationContainer #maxFileSizeList ul{list-style:none}.uploadFailedNotifMessage,#maxFileNotificationMessage,#maxSizeNotificationMessage{margin-top:13px}.uploadFailedNotifIconContainer,#maxFileNotifIconContainer,#maxSizeNotifIconContainer{height:30px;width:30px;background-color:#e52f48;border-radius:5px;display:inline-block;position:relative;text-align:center;vertical-align:middle;line-height:30px}.uploadFailedNotifIconWrapper,#maxFileNotifIconWrapper,#maxSizeNotifIconWrapper{height:0;width:0;border-width:0 10px 17px 10px;border-style:solid;border-color:transparent transparent white transparent;display:inline-block;position:absolute;left:50%;top:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.uploadFailedSizeNotifIcon,#maxFileNotifIcon,#maxSizeNotifIcon{color:#e52f48;font-weight:900;font-size:11px;display:inline-block;z-index:9999;position:relative;padding-top:2px}.uploadFailedNotifLabel,#maxFileNotifLabel,#maxSizeNotifLabel{display:inline-block;line-height:30px;vertical-align:top;margin-left:10px;font-weight:600}.uploadFailedRetryContainer{position:absolute;bottom:-18px;right:2px}.rtl-direction .uploadFailedRetryContainer{right:auto;left:2px}.uploadFailedRetryContainer a{font-size:12px;color:#e52f48;font-weight:600}.closeButtonContainer{margin:5px auto auto auto;display:inline-block;float:right;font-size:18px;cursor:pointer}.closeNotification{cursor:pointer;text-transform:uppercase}#maxFileSizeList,#maxFileNumberList{margin:10px}#maxFileSizeList li,#maxFileNumberList li{word-wrap:break-word}#maxFileSizeList a,#maxFileNumberList a{color:#00E}#maxFileNumberList a{display:none}#chatContainer .hidden{display:none}.actionRetry{cursor:pointer;float:right}#actionsContainer{z-index:99998;background-color:#fff;border-top:2px solid #e1e1e1;position:absolute;bottom:0;width:100%;height:46px}#status-message{font-weight:bold;font-style:normal}#resizeBox{width:52px;height:52px;position:absolute;top:0;background-color:#000;z-index:5}body.right #resizeBox{left:0;float:left;-webkit-border-top-left-radius:3px;-moz-border-radius-topleft:3px;border-top-left-radius:3px}body.left #resizeBox{right:0;float:right;-webkit-border-top-right-radius:3px;-moz-border-radius-topright:3px;border-top-right-radius:3px}#resizeInnerBox{background-color:#fefefe;width:47px;height:47px}body.right #resizeInnerBox{-webkit-border-top-left-radius:3px;-moz-border-radius-topleft:3px;border-top-left-radius:3px;margin:5px 0 0 5px}body.left #resizeInnerBox{-webkit-border-top-right-radius:3px;-moz-border-radius-topright:3px;border-top-right-radius:3px;margin:5px 5px 0 0}#pluginsBar{height:23px;background-color:#c2c2c2;min-width:278px}#rateMainWrapper{float:left;position:relative}#ratePositive{background-position:-145px 0}#rateNegative{background-position:-126px 0}#rateNegative:hover,#rateNegative.selected{background-position:-183px 0}#rateNegative:hover,#ratePositive:hover{transform:scale(1.2,1.2)}.activeSound{background-position:0 0;background-repeat:no-repeat}.disabledSound{background-position:-21px 0;background-repeat:no-repeat}#textareaWrapper{display:block;background-color:#fff;position:relative;height:100%;z-index:2}#textareaContainer{height:100%;padding:16px 14px 13px 14px;box-sizing:border-box}#textareaContainer.with-emoji{padding-right:44px;padding-left:14px}.rtl-direction #textareaContainer.with-emoji{padding-left:44px;padding-right:14px}#chatTextarea{padding:0;margin:0;height:100%;width:100%;overflow:hidden;resize:none;border:0;font-size:14px!important;background-color:#fff;color:#000;font-family:inherit}#chatTextarea:active,#chatTextarea:focus{outline:0}#textareaContainer textarea::-webkit-input-placeholder{color:#bdbdbd}#textareaContainer textarea::-moz-placeholder{color:#bdbdbd}#textareaContainer textarea:-ms-input-placeholder{color:#bdbdbd}#chatTextarea::placeholder{color:#bdbdbd!important}#greetingsContainer{margin:7px 45px 0 45px;margin:14px 0;padding:10px 15px;text-align:center;white-space:pre-wrap;word-wrap:break-word;color:black;font-weight:400;margin-top:0}#greetingsText a{color:inherit}#greetingsWaitTime{margin:14px 0 0;display:none}#formContainer #greetingsContainer{margin:0!important}#agentBar.expanded{height:auto;overflow-y:auto;display:block;max-height:153px}#agentList{position:absolute;left:50%;top:0;-ms-transform:translateX(-50%);-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap;overflow-x:hidden;max-width:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}#agentList::-webkit-scrollbar{display:none}#agentList .agentWrapper{border-radius:0;min-width:0;display:inline-block;margin:10px 10px;text-align:center;flex-grow:1}#profileDetail .agentContainer{margin-left:50px}.agentContainer{height:50px}.rtl-direction #profileDetail .agentContainer{margin-right:50px;margin-left:0}#agentBar .agentContainer{height:auto;width:100%;margin-top:5px}.agentContainerNoImage{height:45px}.agentWrapper{width:100%;min-width:280px;clear:both;position:relative;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;border-top-left-radius:10px;border-top-right-radius:10px}#headerBox .agentInformationContainer{padding:10px 0}.rtl-direction #agentBar .agentInformationContainer{margin-right:auto;margin-left:auto}.rtl-direction #agentBar .agentContainer{clear:both}.agentInformationContainerNoImage{padding-top:13px;padding-bottom:13px;font-size:16px}.agentInformationContainer{font-size:14px}.position-label{font-size:12px}.agentNameCentered{font-weight:400;font-size:16px;text-transform:capitalize;margin-top:5px}.rtl-direction .noImageAgentProfileDetail{padding:0 5px 0 0}.agentInformationContainer p{white-space:nowrap;overflow:hidden;box-sizing:border-box;text-overflow:ellipsis}@-ms-keyframes profileShow{0%{-ms-transform:scale(0)}6.25%{-ms-transform:scale(0.1)}12.5%{-ms-transform:scale(0.2)}18.75%{-ms-transform:scale(0.3)}25%{-ms-transform:scale(0.4)}31.25%{-ms-transform:scale(0.5)}37.5%{-ms-transform:scale(0.6)}43.75%{-ms-transform:scale(0.7)}50%{-ms-transform:scale(0.8)}56.25%{-ms-transform:scale(0.9)}62.5%{-ms-transform:scale(1)}68.75%{-ms-transform:scale(1.1)}75%{-ms-transform:scale(1.2)}81.25%{-ms-transform:scale(1.3)}87.5%{-ms-transform:scale(1.2)}93.75%{-ms-transform:scale(1.1)}100%{-ms-transform:scale(1)}}@-webkit-keyframes profileShow{0%{-webkit-transform:scale(0)}6.25%{-webkit-transform:scale(0.1)}12.5%{-webkit-transform:scale(0.2)}18.75%{-webkit-transform:scale(0.3)}25%{-webkit-transform:scale(0.4)}31.25%{-webkit-transform:scale(0.5)}37.5%{-webkit-transform:scale(0.6)}43.75%{-webkit-transform:scale(0.7)}50%{-webkit-transform:scale(0.8)}56.25%{-webkit-transform:scale(0.9)}62.5%{-webkit-transform:scale(1)}68.75%{-webkit-transform:scale(1.1)}75%{-webkit-transform:scale(1.2)}81.25%{-webkit-transform:scale(1.3)}87.5%{-webkit-transform:scale(1.2)}93.75%{-webkit-transform:scale(1.1)}100%{-webkit-transform:scale(1)}}@-moz-keyframes profileShow{0%{-moz-transform:scale(0)}6.25%{-moz-transform:scale(0.1)}12.5%{-moz-transform:scale(0.2)}18.75%{-moz-transform:scale(0.3)}25%{-moz-transform:scale(0.4)}31.25%{-moz-transform:scale(0.5)}37.5%{-moz-transform:scale(0.6)}43.75%{-moz-transform:scale(0.7)}50%{-moz-transform:scale(0.8)}56.25%{-moz-transform:scale(0.9)}62.5%{-moz-transform:scale(1)}68.75%{-moz-transform:scale(1.1)}75%{-moz-transform:scale(1.2)}81.25%{-moz-transform:scale(1.3)}87.5%{-moz-transform:scale(1.2)}93.75%{-moz-transform:scale(1.1)}100%{-moz-transform:scale(1)}}@-o-keyframes profileShow{0%{-o-transform:scale(0)}6.25%{-o-transform:scale(0.1)}12.5%{-o-transform:scale(0.2)}18.75%{-o-transform:scale(0.3)}25%{-o-transform:scale(0.4)}31.25%{-o-transform:scale(0.5)}37.5%{-o-transform:scale(0.6)}43.75%{-o-transform:scale(0.7)}50%{-o-transform:scale(0.8)}56.25%{-o-transform:scale(0.9)}62.5%{-o-transform:scale(1)}68.75%{-o-transform:scale(1.1)}75%{-o-transform:scale(1.2)}81.25%{-o-transform:scale(1.3)}87.5%{-o-transform:scale(1.2)}93.75%{-o-transform:scale(1.1)}100%{-o-transform:scale(1)}}@keyframes profileShow{0%{transform:scale(0)}6.25%{transform:scale(0.1)}12.5%{transform:scale(0.2)}18.75%{transform:scale(0.3)}25%{transform:scale(0.4)}31.25%{transform:scale(0.5)}37.5%{transform:scale(0.6)}43.75%{transform:scale(0.7)}50%{transform:scale(0.8)}56.25%{transform:scale(0.9)}62.5%{transform:scale(1)}68.75%{transform:scale(1.1)}75%{transform:scale(1.2)}81.25%{transform:scale(1.3)}87.5%{transform:scale(1.2)}93.75%{transform:scale(1.1)}100%{transform:scale(1)}}#agentBar .alias-image,#headerBox .alias-image{width:40px;height:40px;margin:0;background-repeat:no-repeat;border-radius:50%;margin:5px 0;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:40px 40px;float:left;margin-left:-100%;animation:fadeIn 1s;-webkit-animation:fadeIn 1s;-moz-animation:fadeIn 1s;-o-animation:fadeIn 1s}#headerBox .alias-image{width:30px;height:30px;position:relative;margin-left:-10px;display:inline-block;margin-top:14px;box-shadow:0 0 0 1px #eee;background-size:30px 30px}#agentBar .alias-image{float:none;margin:0 auto;width:53px;height:53px;background-size:53px 53px}.agentChatContainer .messageBody{margin:-12px 0 0 0;max-width:calc(100% - 30px)}.rtl-direction .agentChatContainer .messageBody{float:right;margin:-12px 00px 0 0;padding-right:40px}.agentChatContainer .message{background:#eee;color:#333;margin-left:0;padding:5px 10px;border-radius:3px;box-shadow:0 0 1px 0 rgba(0,0,0,0.1)}.ie9.rtl-direction .agentChatContainer .message{border-radius:0 15px 15px 15px!important}.agentChatContainer .messageStatusContainer{margin-left:-40px;position:absolute;top:5px;left:100%}.rtl-direction .agentChatContainer .messageStatusContainer{margin:0 -40px 0 0;left:auto;right:100%}.messageContainer.agentChatContainer{margin:15px 40px 12px 11px}.rtl-direction .messageContainer.agentChatContainer{margin:30px 8px 10px 23px}.messageContainer.visitorChatContainer{margin:15px 15px 12px 74px}.rtl-direction .messageContainer.visitorChatContainer{margin:10px 0 10px 12px}.visitorChatContainer .messageBody{margin:0;float:right;max-width:100%;min-height:62px}.rtl-direction .visitorChatContainer .messageBody{float:left}.visitorChatContainer .messageWrapper .message{color:#333;text-align:left;background:#e5e5e5}.rtl-direction .visitorChatContainer .messageWrapper .message{text-align:left;margin:0 30px 0 0;border-radius:0 15px 15px 15px;border-radius:3px}.ie9.rtl-direction .visitorChatContainer .messageWrapper .message{border-radius:15px 0 15px 15px!important;border-radius:3px}.message.agentTypingIndicator,.messageContainer .messageWrapper .message{position:relative}.message.agentTypingIndicator::after,.message.agentTypingIndicator::before,.upload-data::after,.upload-data::before,.messageContainer .messageWrapper .message::after,.messageContainer .messageWrapper .message::before{content:'';display:block;position:absolute;width:0;height:0;border-style:solid;top:6px;border-width:7px}.message.agentTypingIndicator::after,.message.agentTypingIndicator::before,.messageContainer.agentChatContainer .messageWrapper .message::after,.messageContainer.agentChatContainer .messageWrapper .message::before{right:100%}.message.agentTypingIndicator::before,.messageContainer.agentChatContainer .messageWrapper .message::before{border-color:transparent #f9f9f9 transparent transparent;border-width:7px;top:6px}.upload-data::after,.upload-data::before,.messageContainer.visitorChatContainer .messageWrapper .message::after,.messageContainer.visitorChatContainer .messageWrapper .message::before{left:100%}.upload-data::before,.messageContainer.visitorChatContainer .messageWrapper .message::before{border-color:transparent transparent transparent #f9f9f9;border-width:7px;top:5px}.message.agentTypingIndicator::after,.messageContainer.agentChatContainer .messageWrapper .message::after{top:7px;border-width:6px}.upload-data::after,.messageContainer.visitorChatContainer .messageWrapper .message::after{top:6px;border-width:6px}.visitorChatContainer .messageStatusContainer.errorInMessage{width:100%;position:relative;right:auto;text-align:right;font-size:12px;color:#ec6368;font-weight:600;line-height:1;top:3px;float:right}.visitorChatContainer .messageStatusContainer.errorInMessage a{float:right;display:inline-block;font-size:12px;text-decoration:underline;color:#ec6368;width:auto;background:0;text-align:right;top:0;margin:0 0 0 15px;font-weight:900}.messageStatusContainer.pending .failed-label,.messageStatusContainer.pending .icon-alert{display:none}.time-div{visibility:hidden}.mobile .time-div{visibility:visible}.one-agent .agent-div.agent{display:none}.messageBody:hover .time-div{visibility:visible}.rtl-direction .visitorChatContainer .messageStatusContainer.errorInMessage a{float:left;text-align:left}.visitorChatContainer .messageStatusContainer{position:absolute;right:100%;top:0;left:auto}.rtl-direction .visitorChatContainer .messageStatusContainer.errorInMessage{left:auto;margin:0}.rtl-direction .visitorChatContainer .messageStatusContainer{right:auto;left:100%;margin:0 0 0 -40px}.messageHead{position:absolute;z-index:10001}.messageHeadLine{position:relative;top:10px;z-index:1}.messageContainer .messageHead .messageTitle{text-align:center;width:100%}.messageBody{line-height:1.5em;margin:5px 0 0 42px;float:left;position:relative}.notification{margin-left:0;width:100%}.ownerNameContainer,.notificationContainer{float:left}.rtl-direction .notificationContainer{direction:rtl!important;float:right}.notificationContainer .message{margin-right:40px;font-size:14px!important;font-style:italic}.rtl-direction .notificationContainer .message{margin:0 0 0 40px}.message{white-space:pre-wrap;word-wrap:break-word}.messageContainer .messageHead.agent .messageTime,.notificationTime{color:#b3b3b3}.messageContainer .chat-agent-name{position:absolute;bottom:-18px;left:40px;font-size:11px}.rtl-direction .messageContainer .chat-agent-name{left:auto;right:40px}.notificationTime{width:40px;float:left;margin-left:-40px;text-align:right;font-size:12px!important}.rtl-direction .notificationTime{float:right;margin:0 -40px 0 0;text-align:left}.messageStatusContainer{position:relative;z-index:2;width:40px}.messageTime{padding:0 2px 0 8px;font-size:11px!important;color:#777;display:none}.rtl-direction .messageTime{padding:0 8px 0 2px}.messageTime.visitor{padding:0 8px 0 2px}.messageTime.agent,.messageTime.visitor{display:inline-block;margin:0;padding:0;line-height:1;top:auto;bottom:auto;vertical-align:bottom}.rtl-direction .messageTime.visitor{padding:0 2px 0 8px}.messageWrapper{background:0;position:relative;width:auto}.rtl-direction .messageWrapper{float:right;max-width:100%}.messageStatus:active,.messageStatus:focus{outline:0}.messageStatusContainer.pending .lds-spinner{transform:scale(0.3);margin-left:-5px;margin-top:-25%}.messageWrapper.pending{font-style:italic}.messageWrapper.error{font-style:italic;color:#f00;cursor:pointer;float:right;width:auto;max-width:100%}.rtl-direction .messageWrapper.error{max-width:100%;float:left}.messageWrapper.error .message{background-color:#ec6368!important;color:#fff!important}.messageWrapper .message{font-size:14px!important;padding:10px 13px;font-weight:400;border-radius:5px;box-shadow:0 0 1px 0 rgba(0,0,0,0.1)}.messageTitle span{text-transform:uppercase;font-weight:bold;padding:0 10px;color:#ccc;background-color:#fff;z-index:1;position:relative}#formContainer::-webkit-scrollbar{display:none}.formMessageField{padding:10px 20px;line-height:1.2em;color:#616161;font-size:15px;text-align:left;word-wrap:break-word}.form{font-size:13px;color:#a1a1a1;height:auto;position:absolute;top:0;bottom:30px;left:6px;right:6px;overflow:hidden;max-width:400px;margin:0 auto;width:calc(100% - 16px)}.rtl-direction .form{left:0;right:6px}#changeNameForm.form,#emailTranscriptForm.form,#endChatForm.form{max-width:284px}.no-branding .form{bottom:14px}.form::-webkit-scrollbar{display:none}.form fieldset{padding:0}.form textarea{resize:none;display:block;height:40px;width:100%;overflow:auto;padding:0 15px;color:#707070;font-size:13px;font-weight:bold;border:0;background-color:#fff;margin:13px 0;-webkit-appearance:none}.form textarea:active,.form textarea:focus,.inputContainer select:active,.inputContainer select:focus{outline:0}.inputContainer{padding:0 15px;border:1px solid #ccc;-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;-o-border-radius:3px;border-radius:3px;background-color:#fff;margin:0 0 7px 0;position:relative}.inputContainer input,.inputContainer select{width:100%;margin:0;border:0;display:block;line-height:1.2em;padding:10px 0;color:#707070;font-size:13px;font-weight:bold;font-family:inherit;-webkit-appearance:none}.inputContainer input{padding:11px 0}.inputContainer.other-fix{padding:0}.inputContainer select{background-color:#fff;outline:0}#departmentFieldFieldset.safari-fix .inputContainer{position:relative}#departmentFieldFieldset.safari-fix .inputContainer:after{position:absolute;right:24px;top:12px;cursor:pointer;width:10px;height:10px;font-size:10px;padding:0;background:#fff;color:#000;content:'\u25bc';pointer-events:none;cursor:pointer}.inputContainer.error,.form .textareaFieldset.error{border-color:#ef5656;color:#ef5656;margin-bottom:0!important}.inputContainer.error input,.form .textareaFieldset.error textarea,.inputContainer.error select,.error .form-field-label{color:#ef5656;padding-right:30px}.inputContainer.error input::-webkit-input-placeholder,.form .textareaFieldset.error textarea::-webkit-input-placeholder{color:#ef5656}.inputContainer.valid,.form .textareaFieldset.valid{border-color:#92ed9d}.inputContainer.valid{padding-right:30px}.inputContainer.selection.valid{padding:0}.inputContainer input:active,.inputContainer input:focus{margin:0;border:0;outline:0}.inputContainer input:active+.form-field-label,.inputContainer input:focus+.form-field-label,.textareaFieldset textarea:active+.form-field-label,.textareaFieldset textarea:focus+.form-field-label{display:block}.inputContainer input:active::-webkit-input-placeholder,.inputContainer input:focus::-webkit-input-placeholder,.textareaFieldset textarea:active::-webkit-input-placeholder,.textareaFieldset textarea:focus::-webkit-input-placeholder{color:transparent!important}.inputContainer input:focus::-moz-placeholder,.inputContainer input:active::-moz-placeholder,.textareaFieldset textarea:focus::-moz-placeholder,.textareaFieldset textarea:active::-moz-placeholder{color:transparent!important;opacity:0!important}.formErrorContainer{display:none;margin:0 0 7px 15px;color:#e52f48}.formErrorIcon{display:none;position:absolute;top:50%;right:10px;-ms-transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);white-space:nowrap}.form-icon{color:white;font-weight:900;position:absolute;right:-2.5px;font-size:11px;top:1.5px}.rtl-direction .formErrorContainer{margin:0 15px 7px 0}.rtl-direction #preChatForm .formErrorContainer,.rtl-direction #offlineForm .formErrorContainer{margin:-6px 0 7px 15px}#formSavingStatus.errorMessage{color:#ef5656;border:0;visibility:visible}#formSavingStatus{font-size:13px;visibility:hidden;margin:0 auto;max-width:260px}#formSavingStatus img{margin:0 0 0 5px}.formButtonContainer{margin:20px 0 0 0}button{display:inline;zoom:1;vertical-align:baseline;outline:0 none;cursor:pointer;text-align:center;text-decoration:none;overflow:visible;margin:0;padding:7px 15px 8px 15px;font-family:inherit;background-color:#c1c1c1;color:#3d3d3d;border:0;float:left;font-weight:bold;font-size:14px}button::-moz-focus-inner{border:0}button:focus{outline:0}button:active{background-color:#ddd}button:hover{background-color:#a9a9a9}.formButton{width:100%;height:50px}#agentTypingContainer .messageBody{font-size:16px!important;font-weight:bold;min-width:auto;line-height:normal}#offlineOverlay,#inactivityOverlay,#maintenanceOverlay{text-align:center;margin-top:100px;font-size:40px;font-weight:bold;height:auto}#formInnerHeight{margin:0 auto}#tawktoLink{color:#4f4f4f;font-size:12px;font-weight:400;text-decoration:none;padding:5px}#tawktoLink:hover{background:#eee;border-radius:3px}#tawktoLink .emojione{margin-left:-5px;margin-right:-5px;height:3ex;width:auto;min-height:20px;min-width:20px;display:inline-block;vertical-align:middle}#tawktoLink b{font-weight:700}#bottomContainer{text-align:center;width:100%;position:absolute;bottom:48px;height:30px;background:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:30px}.headerBoxLink{width:30px;height:60px;margin:0;display:inline-block;position:relative;grid-row:1;text-decoration:none}#chatMenu{text-decoration:none}.headerBoxLink .headerBoxIcon{font-size:18px;margin:0 auto;display:block;width:18px;line-height:60px;vertical-align:middle}.headerBoxLink#faq{display:none}.headerBoxLink.active::before,#chatMenu.active::before{content:\"\";height:25px;width:25px;background-color:#00000030;position:absolute;border-radius:3px;top:17px;right:3px}#chatMenuControls{background-color:white;width:calc(100vw - 50px);max-width:200px;position:absolute;z-index:9999;border-radius:3px;top:45px;right:0;display:none;border:1px solid #e2e2e2;animation:slideDown .2s;-webkit-animation:slideDown .2s;-moz-animation:slideDown .2s;-o-animation:slideDown .2s}@keyframes slideDown{0%{transform:translateY(-2%)}50%{transform:translateY(-1%)}100%{transform:translateY(0%)}}@-webkit-keyframes slideDown{0%{-webkit-transform:translateY(-2%)}50%{-webkit-transform:translateY(-1%)}100%{-webkit-transform:translateY(0%)}}#chatMenuControls::after{content:\"\";width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid white;position:absolute;top:-6px;right:8px}#chatMenuControlsOverlay{position:fixed;top:50px;left:0;height:calc(100vh - 50px);width:100vw}.rtl-direction #chatMenuControls{right:auto;left:0}.rtl-direction #chatMenuControls::after{right:auto;left:8px}#chatMenuControls ul{padding:0;margin:0;list-style:none;text-align:left;padding:10px;position:relative}#chatMenuControls li{padding:10px;cursor:pointer;font-size:14px;color:#434343}#chatMenuControls li:hover{background-color:#53ce3c;color:white;border-radius:3px}.rtl-direction #endChat{margin-right:5px}#endChat .icon{width:11px;height:11px;float:right;margin:2.5px}.black #endChat .icon{background-position:0 0}.white #endChat .icon{background-position:-63px 0}#minimizeChat .icon{width:11px;height:7px;margin:4.5px 2.5px}.black #minimizeChat .icon{background-position:-32px 0}.white #minimizeChat .icon{background-position:-95px 0}#popoutChat .icon{width:10px;height:10px;margin:3px}.isPopout #popoutChat{display:none}.black #popoutChat .icon{background-position:-48px 0}.white #popoutChat .icon{background-position:-111px 0}#openMenu{position:absolute;left:10px;bottom:0;color:#bdbdbd;font-size:13px;font-weight:700;text-decoration:none;line-height:28px;z-index:100001;cursor:pointer;text-transform:lowercase}.rtl-direction #openMenu{right:10px;left:auto}#options{height:32px;margin-left:110px;text-overflow:ellipsis}.rtl-direction #options{margin:0 110px 0 0}.profileImageContainer .agentProfileImage{background-position:0 0;width:28px;height:28px;background-repeat:no-repeat;border-radius:14px;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:28px 28px;position:absolute;left:0;top:-9px}#tawkToContent{display:none;position:absolute;top:60px;bottom:0;width:100%;background:#fff;z-index:3}#tawkToContent #formFieldsContainer{left:8px;right:8px;margin:14px 0}#tawkToContent .formFrame{position:absolute;overflow:hidden;top:0;bottom:0;left:0;right:0;height:auto;width:auto}#tawkToContent .contentContainer{position:relative;height:100%;overflow:auto}#tawkToContent .buttonContainer{position:absolute;height:50px;bottom:0;width:100%}#tawkToContent .buttonContainer button{width:50%;height:50px}#tawkHeader{font-size:22px;font-weight:bold;text-align:center;padding:20px 0 12px 0;color:#343434;border-bottom:2px solid #ddd;width:150px;margin:0 auto}#tawkContent{font-size:15px;text-align:center;color:#6c6c6c;margin:12px 0 0}#tawkImage{background-image:url('https://static-v.tawk.to/a-v3/images/tawky.png');background-position:-235px 0;width:78px;height:83px;margin:0 auto}#cancelTawkRedirect{float:left}#tawkRedirect{float:right}#optionsContainer{position:absolute;left:0;width:155px;bottom:0;z-index:1000001;padding:3px;text-align:left}.rtl-direction #optionsContainer{left:auto;right:0}#optionsContainer .item{padding:0 3px;color:#696969;cursor:pointer;font-size:12px;font-weight:bold;line-height:30px;display:inline-block;vertical-align:middle;position:relative;height:30px}.rtl-direction #optionsContainer .item{float:right}#optionsContainer .tooltip{position:absolute;top:0;left:0;background:#333;color:#fff;padding:2px;-ms-transform:translate(-50%,-100%);-webkit-transform:translate(-50%,-100%);-moz-transform:translate(-50%,-100%);-o-transform:translate(-50%,-100%);transform:translate(-50%,-100%);min-width:100px;border-radius:3px;display:none;line-height:20px;position:absolute;left:50%;text-align:center}#soundOption .tooltip{left:0;-ms-transform:translate(0%,-100%);-webkit-transform:translate(0%,-100%);-moz-transform:translate(0%,-100%);-o-transform:translate(0%,-100%);transform:translate(0%,-100%)}#emailTranscriptOption .tooltip{left:-26px;-ms-transform:translate(0%,-100%);-webkit-transform:translate(0%,-100%);-moz-transform:translate(0%,-100%);-o-transform:translate(0%,-100%);transform:translate(0%,-100%)}#optionsContainer .item:hover .tooltip{display:block}#emailTranscriptForm .inputContainer,#changeNameForm .inputContainer,#endChatForm .inputContainer{border:0;margin:0}#offlineForm #messageField{height:85px}#offlineFormContainer.success #offlineForm #overlayOfflineForm{display:block}#overlayOfflineForm{position:absolute;top:50%;-ms-transform:translate(0%,-50%);-webkit-transform:translate(0%,-50%);-moz-transform:translate(0%,-50%);-o-transform:translate(0%,-50%);transform:translate(0%,-50%);bottom:0;left:0;right:0;display:none;z-index:1;background-color:#fff;color:#000;text-align:center;padding:20px 15px;font-size:15px}#overlayOfflineForm #resendButton{margin-top:15px;padding:7px 12px;width:100%;font-weight:700;cursor:pointer;height:40px}#overlayOfflineForm p{font-size:17px}.innerTittle{margin:0;padding:15px 0;text-align:left;font-size:14px}.rtl-direction #formInnerHeight .innerTittle{text-align:right}.rtl-direction #emailTranscriptFormMessageContainer,.rtl-direction #changeNameFormMessageContainer{text-align:right}.rtl-direction .longFormBottomContainer #formCancel,.rtl-direction .longFormBottomContainer #formDecline{float:right;margin-left:6px;order:1}.rtl-direction .longFormBottomContainer #newChat{float:right;margin-left:6px}.rtl-direction .longFormBottomContainer #formSubmit{float:right;order:2}#submitWrapper{position:absolute;bottom:0;height:0;width:auto;right:16px;background:#000;border-radius:4px 4px 0 0;color:#fff;-webkit-transition:height .25s ease;-moz-transition:height .25s ease;-ms-transition:height .25s ease;-o-transition:height .25s ease;transition:height .25s ease;z-index:5}#submitWrapper.visible{height:30px}#submitWrapper p{line-height:30px;padding:0 10px;float:left}.rtl-direction #submitWrapper p{float:right}#submitWrapper .loader{transform:scale(0.3);margin-top:-17px;margin-left:-13px;margin-right:-13px}#submitWrapper .spin:after{background:#fff!important}#agentProfileContainer{width:100%;margin-left:10px;display:none}#agentProfileContainer.show{display:block;animation:fadeIn 1s;-webkit-animation:fadeIn 1s;-moz-animation:fadeIn 1s;-o-animation:fadeIn 1s}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}#profileDetail{height:50px;position:static;width:100%;float:left}#profileDetailNoImage{height:45px;position:static;margin-left:0}#agentWrapper{height:0;display:none;float:left;width:100%;height:45px}.messageStatusContainer.pending .messageTime{display:none}#chatEnded{position:absolute;left:0;bottom:32px;height:87px;width:100%;background:#fff;display:none;z-index:10}#chatEnded .title{text-align:center;font-size:14px;margin:10px 0}#chatEnded .buttonContainer{width:100%;height:50px}#offlineButtonContainer,#prechatButtonContainer{top:auto}#newMessageDivider{margin-top:4px;font-size:.7rem;line-height:.6rem}#newMessageDividerLine{border-top:2px solid #e4c0b6;border-bottom:0;margin:0 0 -1px}#newMessageDividerLabel{background:#fcfcfc;margin:-0.3rem 0;float:right;padding:0 .5rem;color:#e4c0b6}.offlineMessageSuccess{color:#6db626}#newMessageContainer{position:relative;left:-50%;cursor:pointer;display:none}#newMessagesBar{position:absolute;bottom:33px;height:0;width:auto;left:50%;color:#fff;-webkit-transition:all .5s ease;-moz-transition:all .5s ease;-ms-transition:all .5s ease;-o-transition:all .5s ease;transition:all .5s ease;visibility:hidden;cursor:pointer;z-index:0}#newMessagesBar.theme-background-color{background-color:transparent!important}#notificationMessageText{font-weight:700}#newMessageArrowDown{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #81bd1d;transform:translate(-50%);position:absolute;left:50%;bottom:-5px}#newMessagesNotificationLink{float:left;margin:6px 6px auto auto;font-weight:bold}.rtl-direction #newMessagesNotificationLink{float:right;-ms-transform:rotateY(180deg);-webkit-transform:rotateY(180deg);transform:rotateY(180deg);margin:7px auto auto 7px}#newMessagesBar.visible{height:27px;bottom:90px;visibility:visible}#newMessagesBar.visible #newMessageContainer{display:block}#newMessagesBar p{line-height:27px;padding:0 10px;text-align:center;background-color:#81bd1d;border-radius:5px}.uploaded-image{max-width:100%;max-height:220px;display:block}.download-file{color:inherit;text-decoration:underline;display:block;margin-top:3px}.progress{height:14px;position:relative;background:#eee;box-shadow:0 1px 0 transparent,0 0 0 1px #e3e3e3 inset;width:200px;margin:5px 0;display:inline-block;vertical-align:middle}.progress-bar{display:block;height:100%;background-color:#71a06a;box-shadow:inset 0 2px 9px rgba(255,255,255,0.3),inset 0 -2px 6px rgba(0,0,0,0.4);position:relative;overflow:hidden;box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.upload-data{margin:7px 12px 0 20px;min-width:250px}.upload-data span{font-style:italic}#uploadFileIcon{font-size:18px;vertical-align:middle;width:20px;height:21px;margin-top:5px}.image-loader{display:block;position:relative;width:64px;height:64px;margin:0 auto}.upload-error{margin:5px}.upload-error span{font-size:16px;color:red;font-weight:bold;vertical-align:middle}.drag-over #textareaWrapper:before{text-align:center;margin:0;font-size:25px;height:auto;line-height:68px;color:#ccc;background:#fff;position:absolute;top:0;bottom:0;right:0;left:0;border:3px dashed #ccc;content:'';white-space:pre-line}#drop-text{text-align:center;font-size:25px;height:auto;color:#ccc;position:absolute;top:2px;bottom:2px;right:2px;left:2px;white-space:pre-line;display:none}.drag-over #drop-text{display:block}#drop-text span{display:block;vertical-align:middle;line-height:normal;top:50%;margin-top:-15px;position:relative}.drag-over .drop-text{display:block}.drag-over #chatTextarea{opacity:0}#upload-form{position:absolute;top:-100000px}#uploadFileOption label{display:block;cursor:pointer}.form-field-label.small{color:#b3b3b3;padding:1px 0 0 0;display:none;font-size:10px;position:absolute;top:0;left:4px;font-weight:bold}.rtl-direction .form-field-label.small{left:auto;right:4px}.form-field-label{color:#707070;font-size:13px;font-weight:bold}.selection-label{vertical-align:middle;cursor:pointer}.selection-container{position:relative}.selections-container.error{border:2px solid #e52f48;border-radius:3px;padding:11px 0 11px 11px;position:relative}.agentInfoNoImage{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.messageContainer{position:relative;margin:10px 12px}#agentTypingContainer{position:relative;margin:24px 12px;display:none}.messageContainer{clear:both}.profileImageContainer{height:28px;width:28px;position:absolute}.ownerNameContainer{float:right}.multi-agent .agentChatContainer .ownerNameContainer{float:left;width:100%;position:absolute;bottom:-13px;left:0}.messageOwnerName{color:#757575;font-weight:400;text-decoration:none;font-size:11px!important;margin:0;padding:0;line-height:1;display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:40px;vertical-align:bottom}.rtl-direction .messageOwnerName{margin-left:0;margin-right:30px}.messageOwnerName.visitor{text-align:right;margin-right:0;margin-left:0;margin-bottom:3px}.messageOwnerName.agent{display:none}.multi-agent .messageOwnerName.agent{display:inline-block}.rtl-direction .messageOwnerName.visitor{text-align:left}#chatTableWrapper{display:table;height:100%;width:100%;table-layout:fixed}#chatRowWrapper{display:table-row;vertical-align:bottom}#chatCellWrapper{position:relative;display:table-cell;vertical-align:bottom;overflow:hidden}.single-agent .profileImageContainer{display:block;margin-top:8px}.rtl-direction .single-agent .profileImageContainer{margin-top:-3px}.single-agent .agentChatContainer .ownerNameContainer.trigger{display:block}.ownerNameContainer.trigger .messageOwnerName{margin-left:0;margin-right:0}.multi-agent .ownerNameContainer.trigger .messageOwnerName{margin-left:30px;margin-right:0}.rtl-direction .multi-agent .agentChatContainer .message{margin-right:30px;margin-left:40px}.rtl-direction .multi-agent .ownerNameContainer.trigger .messageOwnerName{margin-right:30px;margin-left:0}.single-agent .visitorChatContainer .messageBody,.single-agent .messageOwnerName.visitor{margin-right:0;margin-left:0}.agentChatContainer .messageBody,.agentChatContainer .ownerNameContainer{margin-left:0;margin-right:0;margin-top:0}.agentChatContainer .messageBody{padding-left:38px}.visitorChatContainer .pending .message,.rtl-direction .agentChatContainer .message{animation:slideFromRight .1s;-webkit-animation:slideFromRight .1s;-moz-animation:slideFromRight .1s;-o-animation:slideFromRight .1s;max-width:229px}.visitorChatContainer[style] .message{animation:none}.agentChatContainer .message,.visitorChatContainer .pending .message{animation:slideFromLeft .1s;-webkit-animation:slideFromLeft .1s;-moz-animation:slideFromLeft .1s;-o-animation:slideFromLeft .1s}.agentChatContainer .message.agentTypingIndicator{animation:none;padding-top:20px}@keyframes slideFromLeft{0%{margin-left:-50px;opacity:0}100%{margin-left:0;opacity:1}}@-webkit-keyframes slideFromLeft{0%{margin-left:-50px;opacity:0}100%{margin-left:0;opacity:1}}@keyframes slideFromRight{0%{margin-right:-100px;opacity:0}100%{margin-right:0;opacity:1}}@-webkit-keyframes slideFromRight{0%{margin-right:-100px;opacity:0}100%{margin-right:0;opacity:1}}#agentTypingContainer .agentChatContainer{margin-bottom:5px}.has-profile-image #headerBoxWrapper,.has-profile-image #headerBox,.has-profile-image #agentWrapper,.has-profile-image #headerBoxControlsContainer{height:60px}.has-profile-image #agentListLabel{margin-top:17px}.selection-container input{margin:0 3px 0 5px}.agentTypingIndicator{position:relative;text-align:center;margin-left:auto;margin-right:auto}.agentTypingIndicator .dot{display:inline-block;width:5px;height:5px;border-radius:50%;margin-right:3px;background:#303131;animation:typing 1.3s linear infinite}.agentTypingIndicator .dot:nth-child(2){animation-delay:-1.1s;-webkit-animation-delay:-1.1s;-moz-animation-delay:-1.1s;-ms-animation-delay:-1.1s;-o-animation-delay:-1.1s}.agentTypingIndicator .dot:nth-child(3){animation-delay:-0.9s;-webkit-animation-delay:-0.9s;-moz-animation-delay:-0.9s;-ms-animation-delay:-0.9s;-o-animation-delay:-0.9s}@keyframes typing{0%,60%,100%{transform:initial}30%{transform:translateY(-10px)}}@-ms-keyframes typing{0%,60%,100%{transform:initial}30%{transform:translateY(-10px)}}@-webkit-keyframes typing{0%,60%,100%{transform:initial}30%{transform:translateY(-10px)}}@-moz-keyframes typing{0%,60%,100%{transform:initial}30%{transform:translateY(-10px)}}@-o-keyframes typing{0%,60%,100%{transform:initial}30%{transform:translateY(-10px)}}.message a{color:inherit}#formContainer .inputContainer.selection:before{content:\"\";position:absolute;right:14px;top:17px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #707070;z-index:0}.rtl-direction #formContainer .inputContainer.selection:before{right:auto;left:14px}#formContainer .inputContainer{background-color:#fff;overflow:hidden;position:relative;height:33px}#formContainer .inputContainer select{position:absolute;height:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:90%;background:transparent;font-size:13px;font-weight:600;line-height:1;-webkit-appearance:none;-moz-appearance:none;text-indent:.01px;text-overflow:'';-ms-appearance:none}#formContainer .inputContainer select::-ms-expand{display:none}#endChatOption{display:none}#actionButtonsContainer{position:absolute;right:14px;top:11px}.rtl-direction #actionButtonsContainer{left:0;right:auto}#rateContainer{padding:6px 8px;border-radius:5px;box-shadow:0 3px 15px #cbcbcb;display:none;position:absolute;width:50px;background:#fff;left:-100%;top:-8px;animation:fadeIn .5s;-webkit-animation:fadeIn .5s;-moz-animation:fadeIn .5s;-o-animation:fadeIn .5s}.rtl-direction #rateContainer{left:5px}.rtl-direction #rateNegative{float:right;margin-left:11px!important}.rtl-direction #ratePositive{float:right;margin-left:0}#actionButtonsContainer a{font-size:19px;color:#bdbdbd;text-decoration:none;float:left;margin-left:11px}#actionButtonsContainer a:hover{color:#464646}#rateNegative{margin-left:0!important;color:#f99!important}#ratePositive{color:#b4deab!important}#uploadFileOption{margin-left:6px}#viewEmoji{margin-left:12px}.drag-over #viewEmoji{display:none}#emoji-selection-container{position:absolute;bottom:48px;height:185px;background:#f0f0f0;display:none;z-index:2;width:100%;background-color:#f3f3f3}.header-title{text-align:center;margin:5px 0;font-weight:bold;font-size:14px}#tooLongMsgNotification{position:absolute;bottom:20px;z-index:100000;width:100%;text-align:center;display:none;color:red;font-size:12px;background-color:white}#tooLongMsgNotification.visible{display:block}.chatNotifInfoContainer,.callInfoContainer,.callErrorContainer{border:1px solid #ddd;border-radius:5px;padding:10px 8px 10px 8px;display:none;background:#fff}.chatNotifInfoContainer{display:block}.chatNotifIconContainer,.callIconContainer{display:table-cell;width:35px;vertical-align:middle}.chatNotifIconWrapper,.callIconWrapper{width:35px;height:35px;border-radius:50%;vertical-align:middle;display:inline-block}.callDetailsContainer{display:table-cell;vertical-align:middle;padding-left:5px}.rtl-direction .callDetailsContainer{padding-right:5px}.chatNotifDetailsContainer{display:inline-block;vertical-align:middle;margin-left:5px}.chatNotifTitle,.callTitle{font-size:15px;font-weight:bold;color:black}.callEndDetails{display:none;margin-top:5px;color:black}.callEndDetails,.callTitle{color:#3e3e3e}.callErrorContainer .callEndDetails{display:block}.callInfoWrapper{display:table}.callRetryContainer{display:inline-block;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.callLoader .loader{transform:scale(0.3);margin-left:-10px}.rtl-direction .callRetryContainer{right:auto;left:10px}.retry-load{float:none;background:#fafafa;color:#717171;border:1px solid #d3d3d3}#chatEnded{width:100%;height:auto}.longFormContainer{position:relative;display:block;background-color:white;width:100%;z-index:4;margin:0 auto;box-sizing:border-box;border-radius:3px;font-weight:400;font-size:15px;color:#464646;overflow:hidden;height:auto}.rtl-direction #formContainer>#emailTranscriptForm .form-header-text,.rtl-direction #changeNameForm .form-header-text,.rtl-direction #chatEndedForm .form-header-text,.rtl-direction #offlineForm .longFormContainer .form-header-text,.rtl-direction #preChatForm .longFormContainer .form-header-text{padding-right:5px}.rtl-direction #formContainer>#emailTranscriptForm .formMessageField,.rtl-direction #offlineForm .formMessageField,.rtl-direction #preChatForm .formMessageField{text-align:unset}#offlineFormContainer,#prechatFormContainer{height:calc(100% - 250px);display:none;position:relative}#chatEndedForm #emailTranscriptForm{position:relative;height:auto}#offlineForm #formInnerHeight,#preChatForm #formInnerHeight{max-width:100%}#form-container::-webkit-scrollbar,#form-container.longFormContainer::-webkit-scrollbar,#tawkToContent .contentContainer::-webkit-scrollbar{display:none}.form-header-icon{background-color:#53ce3c;display:inline-block;height:30px;width:30px;margin-right:10px;line-height:34px;border-radius:5px;box-sizing:border-box;color:white;font-size:22px;text-align:center}.rtl-direction .form-header-icon{margin-left:10px;margin-right:0}.form-header-text{display:inline-block;line-height:30px;height:30px;vertical-align:top;font-weight:600;font-size:15px}#endChatForm #endChatFormMessageContainer{display:block;font-weight:600;font-size:15px;height:auto;color:#464646;padding:0}#formContainer>#emailTranscriptForm::before,#changeNameForm::before,#chatEndedForm::before,#endChatForm::before{content:\"\";height:100%;width:2px;background-color:#4ac735;position:absolute;left:0;top:0;border:1px solid #53ce3c;border-top-left-radius:3px;border-bottom-left-radius:3px;z-index:9;display:none}#controlsWrapper{position:relative}#offlineForm .formMessageField,#preChatForm .formMessageField{padding:10px 15px;text-align:center;margin-bottom:14px;font-size:14px;-webkit-transition:height .16s ease-out;transition:height .16s ease-out}#formContainer .inputContainer{border:0;padding:0;border-radius:5px;margin:0 0 11px 0;height:42px}#formContainer .textareaFieldset>.inputContainer,#formContainer>#emailTranscriptForm input,#formContainer .inputContainer input,#formContainer .inputContainer select,#formContainer .inputContainer input{box-shadow:none;height:100%;border-style:solid;border-color:#d0d0d0;box-sizing:border-box;display:inline-block;padding-left:11px;width:100%;border-width:2px;color:#656565;font-weight:700;border-radius:5px;width:100%}.rtl-direction #offlineForm .textareaFieldset>.inputContainer,.rtl-direction #preChatForm .textareaFieldset>.inputContainer,.rtl-direction #formContainer>#emailTranscriptForm input,.rtl-direction #changeNameForm .inputContainer input,.rtl-direction #chatEndedForm .inputContainer select,.rtl-direction #chatEndedForm .inputContainer input,.rtl-direction #offlineForm .inputContainer select,.rtl-direction #offlineForm .inputContainer input,.rtl-direction #preChatForm .inputContainer select,.rtl-direction #preChatForm .inputContainer input{padding-left:5px;padding-right:11px}.rtl-direction #changeNameForm .formErrorIcon,.rtl-direction #emailTranscriptForm .formErrorIcon,.rtl-direction #offlineForm .formErrorIcon,.rtl-direction #preChatForm .formErrorIcon{left:15px;right:auto}.rtl-direction #offlineForm .selection-container .selection-input-css-placeholder,.rtl-direction #preChatForm .selection-container .selection-input-css-placeholder{left:auto;right:0}.rtl-direction #offlineForm .selection-label,.rtl-direction #preChatForm .selection-label{padding-right:27px}#offlineForm .textareaFieldset>.error.inputContainer,#preChatForm .textareaFieldset>.error.inputContainer,#chatEndedForm .inputContainer.error select,#offlineForm .inputContainer.error select,#preChatForm .inputContainer.error select,.error.inputContainer input{border-color:#e52f48!important}.inputContainer.error textarea::placeholder{color:#e52f48!important}#offlineForm .textareaFieldset>.inputContainer,#preChatForm .textareaFieldset>.inputContainer{height:70px;padding:11px 0 11px 11px}#offlineForm .textareaFieldset .inputContainer textarea,#preChatForm .textareaFieldset .inputContainer textarea{margin:0;padding:0;height:100%;padding-right:11px;box-sizing:border-box}#changeNameForm fieldset,#emailTranscriptForm fieldset,#offlineForm fieldset,#preChatForm fieldset{position:relative}#chatEndedForm .inputContainer select option:disabled,#offlineForm .inputContainer select option:disabled,#preChatForm .inputContainer select option:disabled{display:none}#chatEndedForm .inputContainer.error select,#offlineForm .inputContainer.error select,#preChatForm .inputContainer.error select{color:#ef5656}#chatEndedForm .inputContainer.error select option,#offlineForm .inputContainer.error select option,#preChatForm .inputContainer.error select option{color:#656565}.longFormBottomContainer{width:100%;float:none;box-sizing:border-box;min-height:42px;margin-bottom:15px;grid-template-columns:1fr 1fr;grid-gap:12px;display:-ms-grid;display:grid;-ms-grid-columns:1fr 1fr}.longFormBottomContainer .clear{grid-column:span 2;-ms-grid-column-span:2}.has-required .longFormBottomContainer{display:block}#formCancel,#formDecline{-ms-grid-row:1;-ms-grid-column:1}#formSubmit{-ms-grid-row:1;-ms-grid-column:2}.formButton{height:100%;border-radius:5px;background-color:#d6d6d6;min-height:42px}#formSubmit-pc,#formSubmit{float:right}#changeNameForm .formErrorContainer,#emailTranscriptForm .formErrorContainer,#offlineForm .formErrorContainer,#preChatForm .formErrorContainer{margin:7px 0;text-align:right;font-size:13px;font-weight:600}#formContainer>#emailTranscriptForm #emailTranscriptFormMessageContainer,#changeNameForm #changeNameFormMessageContainer,#chatEndedForm #emailTranscriptFormMessageContainer{background-color:white;padding:15px 0}#formContainer>#emailTranscriptForm #formSavingStatus,#changeNameForm #formSavingStatus,#endChatForm #formSavingStatus,#chatEndedForm #formSavingStatus{display:none}#chatEndedForm #submitWrapper{bottom:32px;right:5px;display:none}#chatEndedForm #form-header{padding-top:12px}#changeNameForm #nameFieldError,#emailTranscriptForm #transcriptEmailFieldError,#chatEndedForm #transcriptEmailFieldError{color:#ef5656;font-size:13px}#circle-progress-bar-border{height:34px;width:34px;display:inline-block;padding:7px;border-radius:3px;border-width:1px;border-style:solid;border-color:#f4f4f4!important;background:#fff}#circle-progress-bar-container{height:100%;width:100%;display:inline-block}#circle-progress-bar{height:100%;width:100%;overflow:hidden;border-radius:50%;position:relative;background-color:#e3e3e3;display:inline-block}#circle-progress-bar .inner-content{background-color:white;height:calc(100% - 5px);width:calc(100% - 5px);border-radius:50%;position:absolute;transform:translate(-50%,-50%);top:50%;left:50%;z-index:9999}#circle-progress-bar .circle-progress-clip{height:100%;width:50%;position:absolute;top:0;z-index:11;left:0;border-top-left-radius:50%;border-bottom-left-radius:50%;background:#e3e3e3}#circle-progress-bar .circle-progress-right,#circle-progress-bar .circle-progress-left{left:0;border-top-left-radius:50%;border-bottom-left-radius:50%;background:#4f4f4f;transform-origin:right center;transform:rotate(0deg);height:100%;width:50%;z-index:10;position:absolute}#circle-progress-bar .circle-progress-right{display:none;transform:rotate(180deg)}#upload-info-container .file-name{display:block;margin:0 0 0 5px;font-weight:700;font-size:14px;font-style:normal}#upload-info-container .file-status{display:block;margin:0 0 0 5px;font-weight:400;font-size:13px;font-style:normal}#upload-info-container{display:inline-block;height:100%;vertical-align:top;text-align:left;width:calc(100% - 60px);margin-left:10px}#upload-info-container #upload-info{display:table;height:100%}#upload-info-container #upload-info .wrapper{display:table-cell;vertical-align:middle}#upload-info-container .upload-icon{display:none}#circle-progress-bar .inner-content .icon{font-style:normal;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:25px;color:#4f4f4f}.upload-data{margin:24px 15px 12px 16px;display:inline-block;text-align:right;height:72px;padding:11px;border-radius:3px;border-width:1px;border-style:solid;border-color:#f4f4f4!important;float:right;min-width:auto;position:relative;box-sizing:border-box}.visitorChatContainer .messageStatusContainer.messageTimeContainer,.agentChatContainer .messageStatusContainer.messageTimeContainer{position:absolute;top:auto;bottom:-13px;left:0;right:auto;width:auto;margin:0;padding:0}.agentChatContainer .messageStatusContainer.messageTimeContainer{right:0;left:auto}#offlineForm .selection-container,#preChatForm .selection-container{position:relative;margin:11px 0;width:calc(100% - 30px);display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}#offlineForm .selection-container .selection-input-css-placeholder,#preChatForm .selection-container .selection-input-css-placeholder{width:14px;height:14px;position:absolute;border-radius:4px;border-color:#d4d4d4;border-width:2px;border-style:solid}#offlineForm .selection-container.radio .selection-input-css-placeholder,#preChatForm .selection-container.radio .selection-input-css-placeholder{border-radius:50%}#offlineForm .selection-container.checkbox .selection-input-css-placeholder::after,#preChatForm .selection-container.checkbox .selection-input-css-placeholder::after{content:'';width:8px;height:3px;position:absolute;top:4px;left:2px;border:2px solid #53ce3c;border-top:0;border-right:0;background:transparent;opacity:0;transform:rotate(-55deg)}#offlineForm .selection-container.radio .selection-input-css-placeholder::after,#preChatForm .selection-container.radio .selection-input-css-placeholder::after{content:'';display:inline-block;width:calc(100% - 6px);height:calc(100% - 6px);top:50%;left:50%;transform:translate(-50%,-50%);position:absolute;border-radius:50%;background:#53ce3c;opacity:0}#offlineForm .selection-container.radio input[type=radio],#offlineForm .selection-container.checkbox input[type=checkbox],#preChatForm .selection-container.radio input[type=radio],#preChatForm .selection-container.checkbox input[type=checkbox]{display:none}.rtl-direction #offlineForm .selection-container.radio input[type=radio],.rtl-direction #offlineForm .selection-container.checkbox input[type=checkbox],.rtl-direction #preChatForm .selection-container.radio input[type=radio],.rtl-direction #preChatForm .selection-container.checkbox input[type=checkbox]{margin-right:-20px}#offlineForm .selection-container.radio input[type=radio]:checked+.selection-input-css-placeholder::after,#offlineForm .selection-container.checkbox input[type=checkbox]:checked+.selection-input-css-placeholder::after,#preChatForm .selection-container.radio input[type=radio]:checked+.selection-input-css-placeholder::after,#preChatForm .selection-container.checkbox input[type=checkbox]:checked+.selection-input-css-placeholder::after{opacity:1}#offlineForm .selection-label,#preChatForm .selection-label{color:#707070;font-size:13px;font-weight:bold;padding-left:27px;position:relative}.uploaded-file-name{margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uploaded-file-info{display:grid;grid-template-columns:auto auto 1fr;grid-gap:5px;font-size:12px;align-content:normal;justify-content:center;vertical-align:middle;display:-ms-grid;-ms-grid-columns:auto auto 1fr}.uploaded-file-info .uploaded-file-name{-ms-grid-row:1;-ms-grid-column:1}.uploaded-file-info .uploaded-file-size{-ms-grid-row:1;-ms-grid-column:2}.uploaded-file-info .download-file{-ms-grid-row:1;-ms-grid-column:3}.download-file{text-transform:capitalize}.uploaded-file-size{margin-top:4px;font-size:11px}.file-upload-not-img-vid-audio .uploaded-file-name{margin-top:0}.file-upload-not-img-vid-audio .file-size{text-transform:lowercase;margin-top:3px}.file-upload-not-img-vid-audio .separator{margin-top:3px}#incoming-call{background-color:#f8f8f8;padding:13px 13px 12px 13px;box-sizing:border-box;border:#e6e6e6 1px solid;position:absolute;top:0;width:100%;z-index:5}#incoming-call-container{text-align:center}#incoming-call-container .header-label{display:inline-block;line-height:28px;vertical-align:top;font-weight:600;font-size:15px;margin-left:5px;color:#3e3e3e}.rtl-direction #incoming-call-container .header-label{margin-right:5px}#incoming-call .profileImageContainer{position:relative;display:inline-block}.profileImageContainer .incomingCallAgentProfileImage{width:28px;height:28px;background-repeat:no-repeat;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:28px 28px;position:absolute;left:0;display:block;border-radius:50%}#incoming-call-buttons{margin-top:16px}#incoming-call-buttons button{width:calc(50% - 5px);border-radius:5px;border:0;display:inline-block;color:#fff;height:42px;cursor:pointer;padding:0;margin:0}.rtl-direction #incoming-call-buttons{direction:ltr}#incoming-call-buttons button .btn-icon{font-size:17px;color:white;display:inline-block;line-height:41px;vertical-align:top}#incoming-call-buttons button .btn-label{display:inline-block;margin-left:10px;line-height:41px;font-weight:600}#decline-call .btn-icon{transform:rotate(135deg)}#decline-call{background-color:#e52f48;float:right}#accept-call{background-color:#48c82e;float:left}.rtl-direction #decline-call{float:left}.rtl-direction #accept-call{float:right}.visitorChatContainer .ownerNameContainer{display:none}#file-upload-drop-container{display:none;background-color:#fff;box-sizing:border-box;position:absolute;bottom:0;height:80px;width:100%;z-index:10}#fileUploadWrapper{border:#e4e4e4 solid 1px;border-radius:5px;background-color:#f1f1f1;height:calc(100% - 15px);width:90%;margin:10px auto 0;position:relative}#file-upload-drop-icon-label-container{transform:translate(-50%,-50%);position:absolute;top:50%;left:50%;width:100%}#file-upload-drop-icon{font-size:30px;display:block;font-weight:600;text-align:center}#file-upload-drop-label{font-size:15px;display:block;font-weight:600;text-align:center;color:#464646;margin-top:5px}.drag-over #actionsContainer{display:none}.drag-over #file-upload-drop-container{display:block}#tooLongMsgNotification{height:42px;position:absolute;width:calc(100% - 30px);left:15px;margin-top:10px;border-radius:5px;line-height:42px;text-align:center}#notifMessageText{margin-left:5px}.chatNotifIconContainer,.callIconContainer{display:inline-block;height:30px;width:30px;border-radius:5px;color:white;position:relative;background-color:#919191}.rtcIcon,.callIcon{display:inline-block;position:relative;top:8px}.chatNotifInfoWrapper,.callInfoWrapper{height:30px}.callInfo{vertical-align:top;line-height:32px;margin-left:10px;font-weight:600;font-size:15px}.chatNotifIconWrapper,.callIconWrapper{display:inline-block;font-size:17px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center}.callInfoElapsedTime{position:absolute;bottom:8px;right:13px;font-size:13px;color:#bdbdbd}.embedded #consentForm #formCancel{display:none!important}.popup #consentForm #formCancel{display:block!important}.popup #consentForm #formSubmit{width:50%!important}#consentForm .innerTittle,#tawkToContent .innerTittle{text-align:center}#consentForm .formCell,#tawkToContent .formCell{vertical-align:middle}.rtl-direction .uploadFailedNotifLabel,.rtl-direction #maxFileNotifLabel,.rtl-direction #maxSizeNotifLabel{margin-right:10px}#contentContainer{position:absolute;top:59px;bottom:0;width:100%;height:auto;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;display:-ms-flexbox;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;flex-direction:column}#chatPanel,#formContainer{-ms-flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;flex-grow:1;flex-shrink:1;position:relative;-ms-flex:1}#formContainer{display:none;background:#fff}.chatEndVisible #chatPanel{display:block!important}.chatEndVisible #formContainer{position:fixed;bottom:5px;z-index:99999;background:#fff;left:1px;right:1px;width:auto}.chatEndVisible #formFieldsContainer,.chatEndVisible .form{position:static}#greetingsMainContainer{transition:max-height .25s ease-out,opacity .5s ease;-webkit-transition:max-height .25s ease-out,opacity .5s ease;-moz-transition:max-height .25s ease-out,opacity .5s ease;-ms-transition:max-height .25s ease-out,opacity .5s ease;height:auto;max-height:100%}#greetingsMainContainer.minimize{max-height:0;opacity:0}#greetingsContent{padding:5px 15px 20px;text-align:center;font-size:14px;font-weight:400;display:none}#formFieldsContainer{margin:14px 0 0;position:absolute;width:auto;left:7px;right:0;bottom:0;top:0;height:auto;overflow:scroll;overflow-x:auto;animation:slideFadeIn .25s ease;-webkit-animation:slideFadeIn .25s ease;scrollbar-width:thin;scrollbar-color:#fff #fff;-ms-overflow-style:-ms-autohiding-scrollbar;box-sizing:border-box}#formContainer.has-required #formCancel,#formContainer.has-required #formDecline{display:none}#formContainer.has-required #formSubmit{float:none!important;width:100%!important}.formTable{display:table;width:100%;table-layout:fixed;height:100%}.formRow{display:table-row}.formCell{display:table-cell;vertical-align:bottom}.formFrame{border:1px solid #e4e4e4;border-radius:3px;padding:16px 15px 0}.field-error{font-size:17px;color:#ef5656}.rtl-direction .message.agentTypingIndicator::after,.rtl-direction .message.agentTypingIndicator::before,.rtl-direction .upload-data::after,.rtl-direction .upload-data::before,.rtl-direction .messageContainer .messageWrapper .message::after,.rtl-direction .messageContainer .messageWrapper .message::before{transform:rotate(180deg)}.rtl-direction .upload-data::after,.rtl-direction .upload-data::before,.rtl-direction .messageContainer.visitorChatContainer .messageWrapper .message::after,.rtl-direction .messageContainer.visitorChatContainer .messageWrapper .message::before{left:auto;right:100%}.rtl-direction .message.agentTypingIndicator::after,.rtl-direction .message.agentTypingIndicator::before,.rtl-direction .messageContainer.agentChatContainer .messageWrapper .message::after,.rtl-direction .messageContainer.agentChatContainer .messageWrapper .message::before{right:auto;left:100%}.border-corner{border-radius:5px 5px 0 0}.roundWidget #innerWrapper.border-corner{border-radius:5px}.embedded .border-corner{border-radius:0!important}.embedded #innerWrapper{border:0}.time-agent-display{display:grid;grid-template-columns:1fr auto;grid-gap:5px;font-size:12px;display:-ms-grid;-ms-grid-columns:1fr}.time-agent-display .agent-div{-ms-grid-row:1;-ms-grid-column:1;float:left}.time-agent-display .time-div{-ms-grid-row:1;-ms-grid-column:2;font-size:11px;float:left}@keyframes slideFadeIn{0%{opacity:0;transform:translate(0,30px)}to{opacity:1;transform:translate(0,0px)}}#textareaSubmitContainer{width:45px;height:40px;position:absolute;right:0;display:none;top:0}.rtl-direction #textareaSubmitContainer{left:0;right:auto}.icon-mobile-submit{text-align:center;position:relative;top:0;padding-top:11px;font-size:21px;height:40px}#actionsContainer.mobile-typing #textareaSubmitContainer{display:block}#actionsContainer.mobile-typing #actionButtonsContainer{right:45px}.rtl-direction #actionsContainer.mobile-typing #actionButtonsContainer{left:45px}#actionsContainer.mobile-typing #rateMainWrapper,#actionsContainer.mobile-typing #uploadFileOption{display:none}.rtl-direction #rateMainWrapper,.rtl-direction #uploadFileOption,.rtl-direction #viewEmoji{float:right}.agent-profile-detailed{float:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:5px;position:relative}.agent-profile-detailed strong{font-weight:bold}.multiple-agent .agent-profile-detailed{display:none}#headerAccountStateContainer.multiple-agent #agentProfileContainer.show{display:block}.rtl-direction .agent-profile-detailed{margin-left:auto;margin-right:20px}.rtl-direction #shortMessage{margin-left:auto;margin-right:10px}.agentDetailedInfo{position:absolute;top:50%;-ms-transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%)}.agentDetailedInfo,.agentDetailedInfo p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mobile .headerBoxLink .headerBoxIcon{width:21px}.mobile .headerBoxLink .headerBoxIcon,.mobile #actionButtonsContainer a{font-size:21px}.mobile #rateContainer{width:53px}.mobile #changeNameForm.form,.mobile #emailTranscriptForm.form,.mobile #endChatForm.form,.mobile #formInnerHeight{max-width:350px}.mobile button{font-size:15px}.mobile .longFormBottomContainer{height:auto}.mobile .longFormContainer{padding-bottom:15px}.mobile .formMessageField.innerTittle,.mobile .formMessageField,.mobile .form-header-text{font-size:15px}.mobile #endChatForm .longFormContainer{padding-bottom:0}.mobile .form-header-icon{font-size:24px;width:31px;height:31px}#hidableActionsWrapper{float:left}";
        d.MinifiedStyle = "body{font-family:Helvetica,Arial,sans-serif}body.font-lato{font-family:'Lato','Open Sans',sans-serif!important}*{font-family:inherit}.rtl-direction{direction:rtl}#tawkchat-minified-box{height:100%;width:100%;overflow:hidden}#tawkchat-minified-wrapper{z-index:999997;cursor:pointer;height:100%;width:100%}#tawkchat-minified-box.round{width:60px;height:60px}#tawkchat-status-container{height:100%;width:auto;display:inline-block;position:absolute}#tawkchat-status-agent-container{height:100%;width:100%;display:none;margin-right:5px;position:relative}#tawkchat-status-icon-container{margin-right:5px}#tawkchat-status-icon-container,#tawkchat-status-text-container{display:inline-block;vertical-align:top}.round #tawkchat-status-text-container{width:60px;height:60px;display:block;border-radius:50%}.round #tawkchat-status-agent-container{height:60px;width:60px;display:none;margin:0;position:relative}.round.open #tawkchat-status-agent-container{display:none!important}.center #tawkchat-minified-wrapper{position:absolute}#tawkchat-status-agent-container #agent-profile-image{background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:32px 32px;height:32px;width:32px;display:inline-block;position:absolute;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);border-radius:50%}.round #tawkchat-status-agent-container #agent-profile-image{height:60px;width:60px;background-size:60px 60px;position:static;transform:translate(0)}#tawkchat-minified-border{margin:0;border:0 none;padding:0;background-color:#000;filter:alpha(opacity=40);opacity:.4;position:absolute;z-index:999998;border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;-webkit-border-radius:4px 4px 0 0;width:100%;height:100%;right:0;bottom:0}#tawkchat-minified-container{margin:0;border:0 none;padding:0;cursor:pointer;z-index:999999;position:absolute;top:0;bottom:0;width:auto;height:auto;left:0;right:0;border-bottom:0}#tawkchat-status-middle{border:0 none;margin:0 auto;font-size:17px;vertical-align:middle;position:absolute;top:50%;left:15px;right:15px;transform:translate(0%,-50%);-webkit-transform:translate(0%,-50%);-moz-transform:translate(0%,-50%);-ms-transform:translate(0%,-50%);-o-transform:translate(0%,-50%)}#tawkchat-status-message{border:0 none;margin:0 26px 0 0;padding:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:left;font-size:17px}.rtl-direction #tawkchat-status-message{margin:0 0 0 26px;text-align:right}#tawkchat-chat-bubble{border:0 none;padding:0;margin:0;width:190px;height:65px;position:absolute;top:0;display:none;right:32px}.left #tawkchat-chat-bubble{right:2px}#tawkchat-chat-bubble-text-container{border:0 none;padding:0;margin:0 0 0 -58px;width:111px;height:65px;position:absolute;z-index:10;font-style:italic;font-size:15px;top:5px;left:50%;right:auto;text-align:center;overflow:hidden;text-overflow:ellipsis;display:table}.rtl-direction #tawkchat-chat-bubble-text-container{right:50%;left:auto;margin:0 -58px 0 0}#tawkchat-chat-bubble-text{margin:0;display:table-cell;vertical-align:middle}#tawkchat-chat-bubble-graphics-container{border:0 none;padding:0;margin:0;width:146px;height:85px}#tawkchat-chat-bubble-canvas{width:146px;height:85px;border:0 none;padding:0;margin:0}#tawkchat-minified-agent-container{float:left;width:100%;display:none}#tawkchat-minified-agent-information-wrapper{border:0 none;margin:0 88px 0 0;padding:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:left;font-size:17px}.hasImage #tawkchat-minified-agent-information-wrapper{margin-left:60px}#tawkchat-minified-agent-name{border:0 none;padding:0;margin:0;font-weight:bold}.agentNameCentered{margin-top:17px}.agentContainerNoImage{margin-right:26px;margin-left:0}.rtl-direction .agentContainerNoImage{margin-left:19px;margin-right:0}.agentContainer{margin:6px 20px 5px 45px}.rtl-direction .agentContainer{margin-right:45px;margin-left:20px}#tawkchat-minified-agent-position{border:0 none;padding:0;margin:0;font-style:italic}#tawkchat-chat-indicator{text-align:center;border-radius:50%;width:100%;height:100%;border:0 none;margin:0;position:absolute;top:0;right:auto;z-index:1000000;display:none;background:#e52f48}#tawkchat-chat-indicator-text{border:0 none;padding:0;overflow:hidden;vertical-align:baseline;font-weight:bold;font-size:13px;text-align:center;color:white;z-index:1000001;display:block;line-height:21px;width:100%;height:100%}#maximizeChat,#popoutChat{width:16px;height:16px;margin:0;z-index:100001}#maximizeChat,#minimizeChatMinifiedBtn{display:inline-block;font-size:32px;height:100%;width:auto;text-align:center;cursor:pointer}#short-message{display:inline-block;width:auto;cursor:pointer;font-size:15px}#profileDetail{position:static;width:100%;float:left}.agentInformationContainer p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.position-label{font-size:12px}.agentInfoNoImage{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.image-bubble-close{width:15px;height:15px;float:right;margin:0 2.5px;cursor:pointer;display:block;visibility:hidden}.image-bubble-close:before,.image-bubble-close:after{position:absolute;right:5px;content:' ';height:15px;width:2px;background-color:#333}.image-bubble-close:before{transform:rotate(45deg)}.image-bubble-close:after{transform:rotate(-45deg)}#bubble-image{cursor:pointer}#bubble-image.gallery-bubble{position:absolute;top:11px;bottom:0;left:0;right:0}.image-canvas-close{border:0 none;padding:0;margin:0;width:10px;height:13px;position:absolute;right:6px;top:3px;font-size:12px;cursor:pointer;z-index:20}.image-loader{display:block;position:relative;width:64px;height:64px;margin:0 auto}.uploaded-image{width:100%;height:auto;display:block;max-width:220px;margin:0 auto}.uploaded-file-name{margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uploaded-file-info{display:grid;grid-template-columns:auto auto 1fr;grid-gap:5px;font-size:12px;align-content:normal;justify-content:center;vertical-align:middle;display:-ms-grid;-ms-grid-columns:auto auto 1fr}.uploaded-file-info .uploaded-file-name{-ms-grid-row:1;-ms-grid-column:1}.uploaded-file-info .uploaded-file-size{-ms-grid-row:1;-ms-grid-column:2}.uploaded-file-info .download-file{-ms-grid-row:1;-ms-grid-column:3}.download-file{text-transform:capitalize}.uploaded-file-size{margin-top:4px;font-size:11px}.file-upload-not-img-vid-audio .uploaded-file-name{margin-top:0}.file-upload-not-img-vid-audio .file-size{text-transform:lowercase;margin-top:3px}.file-upload-not-img-vid-audio .separator{margin-top:3px}.download-file{color:inherit;text-decoration:underline;display:block;margin-top:3px}.imageMessageBody{padding-right:13px!important}.rtl-direction .image-canvas-close{left:6px!important;right:auto!important}.no-border #tawkchat-minified-container{border:none!important;top:0!important;left:0!important;right:0!important}.top #tawkchat-chat-bubble-text-container{margin-top:10px!important}.top #tawkchat-chat-bubble-close{bottom:0!important;right:0!important;position:absolute!important}.default.top #tawkchat-chat-bubble-close{bottom:3px!important;right:6px!important;top:auto!important}.profileImageContainer .agentProfileImage{width:28px;height:28px;background-repeat:no-repeat;border-radius:14px;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:28px 28px;position:absolute;left:-38px;display:block;background-color:#fff;background-position:0 0}.center-right #tawkchat-chat-bubble-close{float:left}.center.right .profileImageContainer .agentProfileImage,.top.right .profileImageContainer .agentProfileImage,.bottom.right .profileImageContainer .agentProfileImage{left:-38px;right:auto}.rtl-direction.center.right .profileImageContainer .agentProfileImage,.rtl-direction.top.right .profileImageContainer .agentProfileImage,.rtl-direction.bottom.right .profileImageContainer .agentProfileImage{left:auto;right:-38px}.center.left .profileImageContainer .agentProfileImage,.top.left .profileImageContainer .agentProfileImage,.bottom.left .profileImageContainer .agentProfileImage{left:-38px;right:auto}.rtl-direction.center.left .profileImageContainer .agentProfileImage,.rtl-direction.top.left .profileImageContainer .agentProfileImage,.rtl-direction.bottom.left .profileImageContainer .agentProfileImage{left:auto;right:-38px}#incoming-call .profileImageContainer{position:relative}.profileImageContainer .incomingCallAgentProfileImage{width:28px;height:28px;background-repeat:no-repeat;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:28px 28px;position:absolute;left:0;display:block;border-radius:50%;background-position:0 0}#incoming-call-container .header-label{display:inline-block;line-height:28px;vertical-align:top;font-weight:600;font-size:15px;margin-left:33px;color:#3e3e3e}#tawkchat-message-preview-container{height:100%;box-sizing:border-box}.bottom#tawkchat-message-preview-container{position:absolute;bottom:0;top:auto;width:100%;height:auto}.top#tawkchat-message-preview-container{top:0;bottom:auto;width:100%;height:auto;position:absolute}.center#tawkchat-message-preview-container{top:0;bottom:auto;position:absolute;width:100%;height:auto}#tawkchat-message-preview-messages-container{max-height:calc(100vh - 110px);margin-bottom:10px;overflow:auto}#tawkchat-message-preview-messages-container *{cursor:pointer}#tawkchat-message-preview-messages-container::-webkit-scrollbar{display:none}#tawkchat-message-preview-messages-container .message-preview-item{position:relative;opacity:0;transition:opacity .5s ease-in-out;-moz-transition:opacity .5s ease-in-out;-webkit-transition:opacity .5s ease-in-out;margin-bottom:10px}#tawkchat-message-preview-messages-container .message-preview-item.animate-fade-object{opacity:1}#tawkchat-message-preview-messages-container .messageBody{position:relative;height:auto;padding:15px 25px 15px 13px;box-sizing:border-box;border-width:1px;border-style:solid;border-radius:5px;border-color:#e9e9e9}#tawkchat-message-preview-messages-container .message-preview-item:last-child{margin-bottom:0}#tawkchat-message-preview-messages-container .messageBody:after,#tawkchat-message-preview-messages-container .messageBody:before{right:100%;top:15px;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}#tawkchat-message-preview-messages-container .messageBody:after{border-color:rgba(255,255,255,0);border-right-color:#fff;border-width:6px;margin-top:-6px}#tawkchat-message-preview-messages-container .messageBody:before{border-color:rgba(170,170,170,0);border-right-color:#ddd;border-width:7px;margin-top:-7px}.rtl-direction #tawkchat-message-preview-messages-container .messageBody:after,.rtl-direction #tawkchat-message-preview-messages-container .messageBody:before{left:100%;right:unset}.rtl-direction #tawkchat-message-preview-messages-container .messageBody:after{border-right-color:transparent;border-left-color:#fff}.rtl-direction #tawkchat-message-preview-messages-container .messageBody:before{border-right-color:transparent;border-left-color:#ddd}#tawkchat-message-preview-messages-container .message{color:#464646;font-weight:400;font-size:14px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}#tawkchat-message-preview-messages-container .messageTimeContainer,#tawkchat-message-preview-messages-container .messageNameContainer{display:inline-block;font-size:13px;color:#bdbdbd}#tawkchat-message-preview-messages-container .messageInformation{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding-top:5px}#tawkchat-message-preview-messages-container .messageNameContainer{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}#tawkchat-message-preview-messages-container .message-preview-close-button{top:8px;right:8px;z-index:5;position:absolute;color:#bdbdbd;font-size:14px;cursor:pointer;display:none}#tawkchat-message-preview-messages-container .hidden-profile .profileImageContainer,#tawkchat-message-preview-messages-container .hidden-profile .messageBody::after,#tawkchat-message-preview-messages-container .hidden-profile .messageBody::before{display:none}#tawkchat-message-preview-quick-reply-container{position:relative;float:right;width:340px;height:auto;overflow:hidden!important}.center.right #tawkchat-message-preview-messages-container,.center.right #tawkchat-message-preview-quick-reply-container,.bottom.right #tawkchat-message-preview-messages-container,.top.right #tawkchat-message-preview-messages-container,.top.right #tawkchat-message-preview-quick-reply-container,.bottom.right #tawkchat-message-preview-quick-reply-container{padding-left:38px}.rtl-direction.center.right #tawkchat-message-preview-messages-container,.rtl-direction.center.right #tawkchat-message-preview-quick-reply-container,.rtl-direction.bottom.right #tawkchat-message-preview-messages-container,.rtl-direction.top.right #tawkchat-message-preview-messages-container,.rtl-direction.top.right #tawkchat-message-preview-quick-reply-container,.rtl-direction.bottom.right #tawkchat-message-preview-quick-reply-container{padding-left:0;padding-right:38px}.center.left #tawkchat-message-preview-messages-container,.center.left #tawkchat-message-preview-quick-reply-container,.bottom.left #tawkchat-message-preview-messages-container,.top.left #tawkchat-message-preview-messages-container,.top.left #tawkchat-message-preview-quick-reply-container,.bottom.left #tawkchat-message-preview-quick-reply-container{padding-left:38px;padding-right:0}.rtl-direction.center.left #tawkchat-message-preview-messages-container,.rtl-direction.center.left #tawkchat-message-preview-quick-reply-container,.rtl-direction.bottom.left #tawkchat-message-preview-messages-container,.rtl-direction.top.left #tawkchat-message-preview-messages-container,.rtl-direction.top.left #tawkchat-message-preview-quick-reply-container,.rtl-direction.bottom.left #tawkchat-message-preview-quick-reply-container{padding-left:0;padding-right:38px}#actionsContainer{z-index:99998;background-color:#fff;width:100%;height:50px;border-radius:5px}.drag-over#actionsContainer{height:155px!important;padding:8px 8px 35px 8px;box-sizing:border-box}#file-upload-drop-container{display:none;background-color:#f1f1f1;height:100%;width:100%;border:#e4e4e4 solid 1px;border-radius:5px;box-sizing:border-box;position:relative}#file-upload-drop-icon-label-container{transform:translate(-50%,-50%);position:absolute;top:50%;left:50%}#file-upload-drop-label{font-size:15px;display:block;font-weight:600;text-align:center;color:#464646;margin-top:5px}#file-upload-drop-icon{font-size:30px;display:block;font-weight:600;text-align:center}#textareaWrapper{display:block;background-color:transparent;position:relative;height:100%;box-shadow:inset 1px 1px 0 #e9e9e9,inset -1px 0 0 #e9e9e9,inset 0 -1px 0 #e9e9e9;border-radius:5px;max-height:180px}.drag-over #textareaWrapper{display:none}.drag-over #file-upload-drop-container{display:block}#textareaContainer{height:100%;padding:15px 14px 15px 14px;box-sizing:border-box;position:relative}#textareaContainer.with-emoji{padding-right:44px;padding-left:14px}.rtl-direction #textareaContainer.with-emoji{padding-right:14px;padding-left:44px}#chatTextarea{padding:0;margin:0;height:100%;width:100%;overflow:hidden;resize:none;border:0;vertical-align:top;font-size:14px!important;background-color:transparent;color:#000;font-family:inherit}#chatTextarea:active,#chatTextarea:focus{outline:0}#chatTextarea::placeholder{color:#bdbdbd!important}#actionButtonsContainer{position:absolute;right:14px;top:15px}.rtl-direction #actionButtonsContainer{right:auto;left:0}.rtl-direction #rateMainWrapper,.rtl-direction #uploadFileOption,.rtl-direction #viewEmoji{float:right}#rateContainer{padding:6px 8px;border-radius:5px;box-shadow:0 3px 15px #cbcbcb;display:none;position:absolute;width:51px;background:#fff;left:-100%;top:-6px}.rtl-direction #rateContainer{right:-40px}#rateMainWrapper{float:left;position:relative}#rateNegative{margin-left:0!important;color:#f99!important}#ratePositive{color:#b4deab!important}#rateNegative:hover,#ratePositive:hover{transform:scale(1.2,1.2)}#actionButtonsContainer a{font-size:19px;color:#bdbdbd;text-decoration:none;float:left;margin-left:13px}#actionButtonsContainer a:hover{color:#464646}#uploadFileOption label{display:block;cursor:pointer}#upload-form{position:absolute;top:-100000px}#emoji-selection-container{height:200px;background:#fff;display:none;z-index:10001;width:340px;background-color:#f3f3f3;position:relative}#tawktoLink{color:#000;font-size:11px;font-weight:400;text-decoration:none}#tawktoLink b{font-weight:700}#tawktoLink .thin{font-size:11px;font-weight:100}#bottomContainer{text-align:center;width:calc(100% - 38px);position:absolute;bottom:0;height:20px;background:transparent;z-index:100001;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#incoming-call{background-color:#fff;border-radius:5px;padding:13px 13px 12px 13px;box-sizing:border-box;margin-bottom:10px;box-shadow:inset 0 0 1px #aaa}#incoming-call-buttons{margin-top:16px}#incoming-call-buttons button{width:calc(50% - 5px);border-radius:5px;border:0;display:inline-block;color:#fff;height:42px;cursor:pointer}#incoming-call-buttons button .btn-icon{font-size:17px;color:white;display:inline-block;line-height:41px;vertical-align:top}#incoming-call-buttons button .btn-label{display:inline-block;margin-left:10px;line-height:41px;font-weight:600}#decline-call .btn-icon{transform:rotate(135deg)}#decline-call{background-color:#e52f48;float:right}#accept-call{background-color:#48c82e;float:left}.mp-callIconContainer{display:inline-block;height:30px;width:30px;border-radius:5px;color:white;position:relative}#mp-callIcon{display:inline-block;position:relative}.mp-callInfoWrapper{height:30px}#mp-callInfo{vertical-align:top;line-height:32px;margin-left:10px;font-weight:600;font-size:15px;color:#3e3e3e}#mp-callIconWrapper{display:inline-block;font-size:17px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.mp-callInfoElapsedTime{position:absolute;bottom:8px;right:13px;font-size:13px;color:#bdbdbd}.mp-callInfoContainer.messageBody{height:80px!important}#tawkchat-message-preview-close{color:#bdbdbd;font-size:19px;margin:2.5px;cursor:pointer}.icon-close{font-weight:900}.left #tawkchat-message-preview-close{text-align:right}.right #tawkchat-message-preview-close{text-align:right}.top.left #tawkchat-message-preview-close{right:38px;left:auto}.top.right #tawkchat-message-preview-close{left:38px;right:auto}.rtl-direction.right #tawkchat-message-preview-close{text-align:left}.rtl-direction.left #tawkchat-message-preview-close{text-align:left}#tooLongMsgNotification{height:42px;position:absolute;width:calc(100% - 30px);left:15px;margin-top:10px;border-radius:5px;line-height:42px;text-align:center}#notifMessageText{margin-left:5px}.appear{animation:icon-appear .25s ease;display:block!important}.hide{display:none!important}#min-agent-profile-details{position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:block;left:40px;max-width:calc(100% - 37px)}.rtl-direction #min-agent-profile-details{left:auto;right:40px}#min-agent-profile-details .name{font-size:90%;font-weight:bold;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}#min-agent-profile-details .position{font-size:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.rtl-direction #mp-callInfo{padding-right:7px}.rtl-direction #tawkchat-message-preview-messages-container .messageNameContainer{left:initial;right:13px}.rtl-direction #tawkchat-message-preview-messages-container .messageTimeContainer,.rtl-direction .mp-callInfoElapsedTime{right:initial;left:13px}.rtl-direction #accept-call{float:right}.rtl-direction #decline-call{float:left}.rtl-direction .profileImageContainer .incomingCallAgentProfileImage{right:0}.rtl-direction #incoming-call-container .header-label{margin-right:33px;margin-left:0}@keyframes icon-appear{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}#hidableActionsWrapper{float:left}";
        d.MinifiedMobileStyle = "body{position:relative;margin:0;font-size:16px;z-index:1000001;font-family:Helvetica,Arial,sans-serif}body.font-lato{font-family:'Lato','Open Sans',sans-serif!important}*{font-family:inherit}#tawkchat-minified-box{border:0 none;padding:0;margin:0;position:relative;width:100%;height:100%;z-index:999995;text-align:left;font-size:16px}.rectangle #tawkchat-minified-wrapper{width:107px;height:42px;bottom:0}.round #tawkchat-minified-wrapper{bottom:6px;width:60px;height:60px;border-radius:50%;box-shadow:rgba(0,0,0,0.16) 0 2px 10px 0!important}#tawkchat-minified-wrapper{border:0 none;margin:0;z-index:999997;position:absolute;cursor:pointer}.bottom.rectangle #tawkchat-minified-wrapper{bottom:15px}.round #tawkchat-status-text-container{padding:0;position:absolute;z-index:999998;width:100%;height:100%;border-radius:50%;border:0 none}.rectangle #tawkchat-status-text-container{padding:0;position:absolute;z-index:999998;width:100%;height:100%;border-radius:3px;border:0 none;text-align:center}#incoming-call{background-color:#fff;border-radius:5px;padding:13px 13px 12px 13px;box-sizing:border-box;margin-bottom:10px;box-shadow:inset 0 0 1px #aaa}#incoming-call-buttons{margin-top:16px}#incoming-call-buttons button{width:calc(50% - 5px);border-radius:5px;border:0;display:inline-block;color:#fff;height:42px;cursor:pointer}#incoming-call-buttons button .btn-icon{font-size:17px;color:white;display:inline-block;line-height:41px;vertical-align:top}#incoming-call-buttons button .btn-label{display:inline-block;margin-left:10px;line-height:41px;font-weight:600}#decline-call .btn-icon{transform:rotate(135deg)}#decline-call{background-color:#e52f48;float:right}#accept-call{background-color:#48c82e;float:left}#incoming-call .profileImageContainer{position:relative}.profileImageContainer .incomingCallAgentProfileImage{width:28px;height:28px;background-repeat:no-repeat;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:cover;position:absolute;left:0;display:block}#incoming-call-container .header-label{display:inline-block;line-height:28px;vertical-align:top;font-weight:600;font-size:15px;margin-left:33px}#tawkchat-status-message{border:0 none;padding:0;text-decoration:none;height:30px;text-align:center;position:absolute;left:21px;right:21px;width:auto}.rtl-direction{direction:rtl}.rtl-direction #mp-callInfo{padding-right:7px}.rtl-direction #tawkchat-message-preview-messages-container .messageNameContainer{left:initial;right:13px}.rtl-direction #tawkchat-message-preview-messages-container .messageTimeContainer,.rtl-direction .mp-callInfoElapsedTime{right:initial;left:13px}.rtl-direction #accept-call{float:right}.rtl-direction #decline-call{float:left}.rtl-direction .profileImageContainer .incomingCallAgentProfileImage{right:0}.rtl-direction #incoming-call-container .header-label{margin-right:33px;margin-left:0}#tawkchat-chat-indicator{border:0 none;margin:0;padding:0;line-height:1em;position:absolute;z-index:1000000;display:none;left:0;width:21px;height:21px;background-color:#e52f48;border-radius:50%}.bottom #tawkchat-chat-indicator,.center #tawkchat-chat-indicator{top:auto}.center.rectangle #tawkchat-chat-indicator{bottom:27px;left:95px}.center.right.rectangle #tawkchat-chat-indicator{left:95px}.bottom.rectangle #tawkchat-chat-indicator{bottom:42px}.round #tawkchat-chat-indicator{bottom:45px}.top #tawkchat-chat-indicator{top:auto}.top.rectangle #tawkchat-chat-indicator{bottom:27px}.left #tawkchat-chat-indicator{left:42px;right:auto}.left.rectangle #tawkchat-chat-indicator{left:93px}.left.rectangle .rtl-direction #tawkchat-chat-indicator{left:inherit;right:93px}.right #tawkchat-chat-indicator{left:95px;right:auto}.right .rtl-direction #tawkchat-chat-indicator{left:auto;right:93px}.round.right #tawkchat-chat-indicator{left:50px}.round.left #tawkchat-chat-indicator{left:42px}.round.left .rtl-direction #tawkchat-chat-indicator,.round.left .rtl-direction #tawkchat-chat-indicator{left:auto}#tawkchat-chat-indicator-text{border:0 none;padding:0;margin:0;overflow:hidden;vertical-align:baseline;font-weight:bold;font-size:13px;font-family:Arial;text-align:center;color:white;height:100%;width:100%;z-index:1000001;display:block;line-height:21px}#status-message{color:inherit;text-decoration:none;font-weight:bold;font-size:16px;vertical-align:middle;display:block;line-height:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0 5px}#bottomContainer{text-align:center;width:calc(100% - 38px);position:absolute;bottom:0;height:20px;background:transparent;z-index:100001;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rectangle #tawkchat-status-icon{margin:8px;font-size:24px;line-height:1em;text-align:left}.rectangle .rtl-direction #tawkchat-status-icon{text-align:right}#tawkchat-status-icon{speak:none;font-style:normal;font-weight:bold;font-variant:normal;text-transform:none;line-height:60px;color:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:32px;text-align:center}#tawkchat-status-icon .text{display:inline-block;overflow:hidden;padding:0 0 0 7px;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap;word-wrap:break-word;word-break:break-all}.rectangle #tawkchat-status-icon:before{position:absolute}.rectangle #tawkchat-status-icon.offline:before{top:11px}.rectangle .rtl-direction #tawkchat-status-icon .text{padding:0 7px 0 0}#chat-icon svg{width:24px!important;height:24px!important;margin:0!important}#tawkchat-status-agent-container{position:absolute;top:0;right:0;left:0;bottom:0;z-index:999999;display:none}#agent-profile-image{background-repeat:no-repeat;background-size:cover;background-position:center;border-radius:50%;width:60px;height:60px}#agent-profile-image.round{width:100%;height:100%;margin-top:0;margin-left:0}.rectangle #agent-profile-image{width:32px;height:32px;margin:5px}.profileImageContainer .agentProfileImage{width:28px;height:28px;background-repeat:no-repeat;border-radius:14px;background-image:url('https://static-v.tawk.to/a-v3/images/default-profile.svg');background-size:cover;position:absolute;left:-38px;display:block}.center-right #tawkchat-chat-bubble-close{float:left}.center.right .profileImageContainer .agentProfileImage,.top.right .profileImageContainer .agentProfileImage,.bottom.right .profileImageContainer .agentProfileImage{left:-38px;right:auto}.rtl-direction.center.right .profileImageContainer .agentProfileImage,.rtl-direction.top.right .profileImageContainer .agentProfileImage,.rtl-direction.bottom.right .profileImageContainer .agentProfileImage{left:auto;right:-38px}.center.left .profileImageContainer .agentProfileImage,.top.left .profileImageContainer .agentProfileImage,.bottom.left .profileImageContainer .agentProfileImage{left:-38px;right:auto}.rtl-direction.center.left .profileImageContainer .agentProfileImage,.rtl-direction.top.left .profileImageContainer .agentProfileImage,.rtl-direction.bottom.left .profileImageContainer .agentProfileImage{left:auto;right:-38px}#tawkchat-message-preview-container{height:100%;box-sizing:border-box}.bottom#tawkchat-message-preview-container{position:absolute;bottom:0;top:auto;width:100%;height:auto}.top#tawkchat-message-preview-container{top:0;bottom:auto}#tawkchat-message-preview-messages-container{overflow-y:scroll;max-height:calc(100vh - 110px);margin-bottom:10px}#tawkchat-message-preview-messages-container::-webkit-scrollbar{display:none}#tawkchat-message-preview-messages-container .message-preview-close-button{top:8px;right:8px;z-index:5;position:absolute;color:#bdbdbd;font-size:14px;cursor:pointer;display:none}#tawkchat-message-preview-messages-container .hidden-profile .profileImageContainer{display:none}.center.right #tawkchat-message-preview-messages-container,.bottom.right #tawkchat-message-preview-messages-container,.top.right #tawkchat-message-preview-messages-container{padding-left:38px}.center.left #tawkchat-message-preview-messages-container,.bottom.left #tawkchat-message-preview-messages-container,.top.left #tawkchat-message-preview-messages-container{padding-left:38px;padding-right:0}#tawkchat-message-preview-close{color:#bdbdbd;font-size:19px;margin:2.5px;cursor:pointer}.left #tawkchat-message-preview-close{text-align:right}.right #tawkchat-message-preview-close{text-align:right}.top.left #tawkchat-message-preview-close{right:38px;left:auto}.top.right #tawkchat-message-preview-close{left:38px;right:auto}.rtl-direction.right #tawkchat-message-preview-close{text-align:left}.rtl-direction.left #tawkchat-message-preview-close{text-align:left}";
        d.CommonStyle = '@font-face{font-family:\'tawk-widget\';src:local(\'tawk-widget\'),url(\'https://static-v.tawk.to/a-v3/fonts/tawk-widget.woff2?yh9epr\') format(\'woff2\'),url(\'https://static-v.tawk.to/a-v3/fonts/tawk-widget.woff?yh9epr\') format(\'woff\'),url(\'https://static-v.tawk.to/a-v3/fonts/tawk-widget.ttf?yh9epr\') format(\'truetype\'),url(\'https://static-v.tawk.to/a-v3/fonts/tawk-widget.eot?yh9epr#iefix\') format(\'embedded-opentype\'),url(\'https://static-v.tawk.to/a-v3/fonts/tawk-widget.svg?yh9epr#tawk-widget\') format(\'svg\');font-weight:normal;font-style:normal}[class^="icon-"],[class*=" icon-"]{font-family:\'tawk-widget\'!important;speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-menu:before{content:"\\e902"}.icon-mobile-submit:before{content:"\\e900";color:#aaa}.icon-desktop-sharing:before{content:"\\e903"}.icon-close:before{content:"\\e909"}.icon-phone-incoming:before{content:"\\e911"}.icon-chat:before{content:"\\e901"}.icon-upload:before{content:"\\e904"}.icon-voice-chat:before{content:"\\e905"}.icon-vote-down:before{content:"\\e906"}.icon-vote-up:before{content:"\\e907"}.icon-video-chat:before{content:"\\e908"}.icon-mail:before{content:"\\e914"}.icon-alert:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e916"}.icon-user:before{content:"\\e917"}.icon-happy:before{content:"\\e91a"}.icon-error:before{content:\'\\e810\'}.icon-message:before{content:\'\\e811\'}.lds-spinner{display:inline-block;position:relative;width:64px;height:64px}.lds-spinner .spin{transform-origin:32px 32px;animation:lds-spinner 1.2s linear infinite}.lds-spinner .spin:after{content:" ";display:block;position:absolute;top:3px;left:29px;width:5px;height:14px;border-radius:20%;background:rgba(0,0,0,0.4)}.lds-spinner .spin-1{transform:rotate(0deg);animation-delay:-1.1s}.lds-spinner .spin-2{transform:rotate(30deg);animation-delay:-1s}.lds-spinner .spin-3{transform:rotate(60deg);animation-delay:-0.9s}.lds-spinner .spin-4{transform:rotate(90deg);animation-delay:-0.8s}.lds-spinner .spin-5{transform:rotate(120deg);animation-delay:-0.7s}.lds-spinner .spin-6{transform:rotate(150deg);animation-delay:-0.6s}.lds-spinner .spin-7{transform:rotate(180deg);animation-delay:-0.5s}.lds-spinner .spin-8{transform:rotate(210deg);animation-delay:-0.4s}.lds-spinner .spin-9{transform:rotate(240deg);animation-delay:-0.3s}.lds-spinner .spin-10{transform:rotate(270deg);animation-delay:-0.2s}.lds-spinner .spin-11{transform:rotate(300deg);animation-delay:-0.1s}.lds-spinner .spin-12{transform:rotate(330deg);animation-delay:0s}@keyframes lds-spinner{0%{opacity:1}100%{opacity:0}}.emoji-select{display:inline-block;margin:8px}.emoji-select:hover .emojione{transform:scale(2);-ms-transform:scale(2);-webkit-transform:scale(2);-moz-transform:scale(2);-o-transform:scale(2)}.emoji-header{display:block;cursor:pointer}.open-tab{opacity:1;float:left;position:relative;display:block;cursor:pointer;width:11%;text-align:center;height:100%;padding:8px 0;box-sizing:border-box;line-height:24px}.open-tab.active::after{content:"";position:absolute;height:5px;width:calc(100% - 5px);transform:translateX(-50%);left:50%;bottom:0;background-color:#4f4f4f}#people.open-tab.active .emoji-header{border-left:0}.open-tab.active .emoji-header:hover{background:#fff}#tabs-selection{height:40px;background-color:white;list-style:none;box-shadow:inset 0 2px 0 0 rgba(128,128,128,0.14)}#emoji-selection-container .loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#emoji-selection-container .emojione{min-width:auto;min-height:auto;height:3.2ex}.emojione{min-width:auto;min-height:auto;height:3.2ex;vertical-align:middle}.emojionly .emojione{height:4.5ex!important;width:auto}#viewEmoji.active{color:#464646}#emoji-selection-container .inputContainer{padding:0 6px}#emoji-selection-container .textInput{padding:6px 0}#tab-content{position:absolute;top:40px;bottom:0;overflow:auto;left:0;right:0;padding:10px 5px;border:1px solid #e3e3e3}.showWithFade{display:block!important;animation:slideFadeIn .25s ease;-webkit-animation:slideFadeIn .25s ease}#chat-icon{display:inline-block;vertical-align:middle}#tawkchat-status-text-container svg{width:32px;height:32px;margin-top:14px}';
        var U = {
                "chat-notification-container": '<div id="__MESSAGE_ID__" class="messageBody notification clearfix"><div class="notificationContainer"><div class="message">__MESSAGE__</div></div><div class="notificationTime">__TIME__</div><div class="clear"></div></div>',
                "chat-resend-link": '<a id="resendMessage-__MESSAGE_ID__" href="#" class="messageStatus" title="Resend">__NOT_DELIVERED__</a><span class="icon-alert"></span> <span class="failed-label">__FAILED__</span>',
                "tawk-survey-wrapper": '<div class="surveyContainer"><div class="surveyQuestion">__QUESTION__</div><div class="survey-options-wrapper">__OPTIONS__</div></div>',
                departmentOfflineNotification: '<div class="messageBody notification"><div class="messageWrapper"><div class="message">__MESSAGE__</div></div><div class="clear"></div></div>',
                "survey-option": '<input type="radio" id="__RADIO_ID__" name="__RADIO_NAME__" value="__RADIO_VALUE__" /><label for="__RADIO_ID__">__RADIO_VALUE__</label><br />',
                "file-upload": '<div>__FILE_DISPLAY__<div class="uploaded-file-info"><p class="uploaded-file-name"><b>__FILE_NAME__</b></p><div class="uploaded-file-size">&#x25CF; __FILE_SIZE__</div><a class="download-file" href="__DOWNLOAD_URL__" title="__DOWNLOAD_TEXT__" target="_blank">__DOWNLOAD_LABEL__</a></div></div>',
                "file-upload-not-img-vid-audio": '<div class="file-upload-not-img-vid-audio"><p class="uploaded-file-name"><b>__FILE_NAME__</b></p><div class="uploaded-file-info"><span class="file-size">__FILE_SIZE__</span><span class="separator">&#x25CF; __FILE_TYPE__</span><a class="download-file" href="__DOWNLOAD_URL__" title="__DOWNLOAD_TEXT__" target="_blank">__DOWNLOAD_LABEL__</a></div></div>',
                "chat-divider": '    <hr id="newMessageDividerLine">    <span id="newMessageDividerLabel">__NEW_MESSAGES__</span>',
                "default-branding": '<span class="thin">We\'re</span> <img class="emojione" alt="\u26a1" title=":zap:" src="https://cdn.jsdelivr.net/emojione/assets/png/26a1.png?v=2.2.7"> by <b>tawk.to</b>',
                fileUploadProgress: '    <div id="upload-__HANDLE__" class="upload-data">    <div id="circle-progress-bar-border">        <div id="circle-progress-bar-container">        <div id="circle-progress-bar">        <div class="inner-content"><span class="icon-arrow-up icon"></span>        </div><div class="circle-progress-clip"></div><div class="circle-progress-left"></div><div class="circle-progress-right"></div></div>        </div>        </div><div id="upload-info-container"><div id="upload-info"><div class="wrapper"><span class="file-name">__FILE_NAME__</span><span class="file-status">__FILE_STATUS__</span></div></div></div><span class="upload-icon"></span>    </div>    <div class="clearfix"></div>',
                incomingCallRequest: '<div id="incoming-call-container"><div class="profileImageContainer"><div class="incomingCallAgentProfileImage"></div><div style="background-image : __IMAGE_URL__;" class="incomingCallAgentProfileImage"></div></div><div class="header-label">__INCOMING_CALL__</div><div id="incoming-call-buttons"><button id="decline-call"><span class="btn-icon icon-voice-chat"></span><span class="btn-label">__DECLINE_CALL__</span></button><button id="accept-call"><span class="btn-icon icon-voice-chat"></span><span class="btn-label">__ACCEPT_CALL__</span></button></div><div class="clear"></div></div>',
                callInfo: '<div class="callLoader">__LOADER__</div><div class="callInfoContainer"><div class="callInfoWrapper"><div class="callIconContainer"><div class="callIconWrapper"></div></div><div class="callDetailsContainer"><p class="callTitle"></p></div></div><p class="callEndDetails"></p></div>',
                callError: '<div class="callInfoWrapper"><div class="callDetailsContainer"><p class="callTitle missed">__HEADER__</p><p class="callEndDetails">__MESSAGE__</p></div><div class="callRetryContainer"><button class="retry-load">__ACTION__</button></div></div>',
                loader: '<div class="lds-spinner loader"><div class="spin spin-1"></div><div class="spin spin-2"></div><div class="spin spin-3"></div><div class="spin spin-4"></div><div class="spin spin-5"></div><div class="spin spin-6"></div><div class="spin spin-7"></div><div class="spin spin-8"></div><div class="spin spin-9"></div><div class="spin spin-10"></div><div class="spin spin-11"></div><div class="spin spin-12"></div></div>',
                noWebrtc: '<div class="uploadFailedNotifContainer"><div class="uploadFailedNotifHeader"><div class="uploadFailedNotifIconContainer"><div class="uploadFailedNotifIconWrapper"></div><span class="uploadFailedSizeNotifIcon">!</span></div><span class="uploadFailedNotifLabel">__HEADER__</span></div><div class="uploadFailedNotifMessage">__MESSAGE__</div><div class="uploadFailedRetryContainer"></div></div>',
                "emoji-selection": '<ul id="tabs-selection">__TAB_LIST__<li id="search" class="open-tab"><a href="#" class="emoji-header"><img class="emojione only-emoji" alt="search" title=":mag:" src="https://cdn.jsdelivr.net/emojione/assets/png/1f50d.png?v=2.2.7" /></a></li><div class="clearfix"></div></ul><div id="tab-content"></div>',
                "emoji-tab-pane": '<div class="tab-pane"><div class="emoji-list">__EMOJIS__</div></div>',
                "emoji-search-pane": '<div class="tab-pane"><div class="inputContainer"><input id="search-emoji" type="text" class="textInput" placeholder="Search Emoji" /></div><div id="search-list"></div></div>',
                "emoji-tab-select": '<li class="open-tab" id="__ID__"><a href="#" class="emoji-header">__IMAGE__</a></li>',
                "emoji-list": '<a href="#" class="emoji-select" id="__SHORTNAME__" title="__SHORTNAME__">__IMAGE__</a>',
                changeNameForm: '<div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight"><div id="form-header"><span class="form-header-icon"><span class="icon-user"></span></span><div class="form-header-text"><span>__CHANGE_NAME__</span></div>        </div><div id="changeNameFormMessageContainer" class="formMessageField">__TITLE__</div><fieldset><div class="inputContainer"><input type="text" id="nameField" value="__NAME__" title="__NAME_PLACEHOLDER__" class="textInput" maxlength="40" placeholder="__NAME_PLACEHOLDER__" /></div><div id="nameFieldErrorIcon" class="formErrorIcon"><div class="icon-error field-error"></div></div></fieldset><div id="nameFieldError" class="formErrorContainer"></div></div></div><div class="longFormBottomContainer"><button id="formCancel" class="declineButton formButton">__CANCEL_BUTTON__</button><button id="formSubmit" class="approveButton formButton  theme-background-color theme-text-color">__SAVE_BUTTON__</button><div class="clear"></div></div></div></div></div></div></div><div id="submitWrapper"></div>',
                emailTranscriptForm: '<div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight"><div id="form-header" class="email-transcript-form-header"><span class="form-header-icon"><span class="icon-mail"></span></span><div class="form-header-text"><span>__EMAIL_TRANSCRIPT_TO__:</span></div>        </div>        <div id="changeNameFormMessageContainer" class="formMessageField"></div><fieldset><div class="inputContainer"><input type="email" id="transcriptEmailField" title="__TRANSCRIPTEMAIL_PLACEHOLDER__" value="__TRANSCRIPTEMAIL__" class="textInput" maxlength="150" placeholder="__TRANSCRIPTEMAIL_PLACEHOLDER__" /></div><div id="transcriptEmailFieldErrorIcon" class="formErrorIcon"><span class="icon-error field-error"></span></div></fieldset><div id="transcriptEmailFieldError" class="formErrorContainer"></div></div><div class="longFormBottomContainer"><button id="formCancel" class="declineButton formButton">__CANCEL_BUTTON__</button><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__SEND_BUTTON__</button></div></div></div></div></div></div></div><div id="submitWrapper"></div>',
                offlineForm: '<div id="overlayOfflineForm"><p>__OFFLINE_MESSAGE_SUCCESSFULY_SENT__</p></br><button id="resendButton" class="approveButton formButton theme-background-color theme-text-color">__SEND_AGAIN__</button></div><div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight">__FIELDS__</div></div><div id="offlineButtonContainer" class="longFormBottomContainer"><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__SUBMIT_BUTTON__</button></div></div></div></div></div></div><div id="submitWrapper"></div>',
                preChatForm: '<div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight">__FIELDS__</div></div><div id="prechatButtonContainer" class="longFormBottomContainer"><button id="formCancel" class="declineButton formButton">__CANCEL_BUTTON__</button><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__START_CHAT_BUTTON__</button></div></div></div></div></div></div><div id="submitWrapper"></div>',
                departmentSelection: '<fieldset><div class="inputContainer selection "><select id="__ID__Field" title="__LABEL__">__VALUE__</select></div></fieldset><div id="__ID__FieldError" class="formErrorContainer"></div><div id="__ID__FieldErrorIcon" class="formErrorIcon"></div>',
                inputTextFieldType: '<fieldset><div class="inputContainer"><input type="__INPUT_TYPE__" id="__ID__Field" title="__LABEL__" value="__VALUE__" class="textInput" maxlength="__MAXLENGTH__"placeholder="__REQUIRED__ __LABEL__" /><label class="form-field-label small">__REQUIRED__ __LABEL__</label></div><div id="__ID__FieldErrorIcon" class="formErrorIcon"><div class="icon-error field-error"></div></div></fieldset><div id="__ID__FieldError" class="formErrorContainer"></div>',
                textAreaFieldType: '<fieldset class="textareaFieldset"><div class="inputContainer"><textarea id="__ID__Field" title="__LABEL__" maxlength="__MAXLENGTH__" placeholder="__REQUIRED__ __LABEL__"></textarea><label class="form-field-label small">__REQUIRED__ __LABEL__</label></div><div id="__ID__FieldErrorIcon" class="formErrorIcon"><div class="icon-error field-error"></div></div></fieldset><div id="__ID__FieldError" class="formErrorContainer"></div>',
                selectionsType: '<fieldset><label class="form-field-label">__REQUIRED__ __LABEL__</label><div><div class="selections-container" id="__ID__Container">__VALUE__<div id="__ID__FieldErrorIcon" class="formErrorIcon"><div class="icon-error field-error"></div></div></div></div></fieldset><div id="__ID__FieldError" class="formErrorContainer"></div>',
                checkboxSelectionType: '<div class="selection-container checkbox"><input type="checkbox" name="__FIELD_ID__group" id="__ID__" value="__VALUE__" /><span class="selection-input-css-placeholder"></span><label class="selection-label" for="__ID__">__VALUE__</label></div>',
                radioSelectionType: '<div class="selection-container radio"><input type="radio" name="__FIELD_ID__group" id="__ID__" value="__VALUE__" /><span class="selection-input-css-placeholder"></span><label class="selection-label" for="__ID__">__VALUE__</label></div>',
                "close-form-button": '<button id="formCloseChat" class="declineButton formButton">__CLOSE_BUTTON__</button>',
                inactivityOverlay: "<div>__OVERLAY__</div>",
                maintenanceOverlay: "<div>__OVERLAY__</div>",
                endChatForm: '<div id="formFieldsContainer"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight"><div class="formMessageField innerTittle">__TITLE__</div><div class="longFormBottomContainer"><button id="formCancel" class="declineButton formButton">__CANCEL_BUTTON__</button><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__END_CHAT_BUTTON__</button></div></div></div></div></div><div id="submitWrapper"></div>',
                restartChatForm: '<div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight"><div id="form-header"><span class="form-header-icon"><span class="icon-chat"></span></span><div class="form-header-text"><span>__TITLE__</span></div></div><div class="formMessageField innerTittle">__END_CHAT_MESSAGE__</div><fieldset><div class="inputContainer"><input type="email" id="transcriptEmailField" title="__TRANSCRIPTEMAIL_PLACEHOLDER__" value="__TRANSCRIPTEMAIL__" class="textInput" maxlength="150" placeholder="__TRANSCRIPTEMAIL_PLACEHOLDER__" /><div id="transcriptEmailFieldErrorIcon" class="formErrorIcon"><div class="icon-error field-error"></div></div></div></fieldset><div id="transcriptEmailFieldError" class="formErrorContainer"></div></div></div><div class="longFormBottomContainer"><button id="newChat" class="declineButton formButton">__START_CHAT__</button><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__EMAIL_TRANCRIPT__</button></div></div></div></div></div></div><div id="submitWrapper"></div>',
                consentForm: '<div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="longFormContainer"><div id="formInnerHeight"><div class="formMessageField innerTittle">__TITLE__</div><div class="longFormBottomContainer"><button id="formDecline" class="declineButton formButton">__CUSTOM_CLOSE_BUTTON__</button><button id="formSubmit" class="approveButton formButton theme-background-color theme-text-color">__CUSTOM_SUBMIT_BUTTON__</button></div></div></div></div></div></div></div></div><div id="submitWrapper"></div>',
                "tawkchat-minified-iframe-element-rectangle": '<div id="tawkchat-minified-wrapper"><div id="tawkchat-minified-container" class="theme-background-color"><div id="tawkchat-status-middle"><div id="tawkchat-status-agent-container" class="theme-text-color"><div id="agent-profile-image" class="agent-profile">&nbsp;</div><div id="min-agent-profile-details" class="theme-text-color"></div></div><div id="tawkchat-status-text-container" class="theme-text-color"><div id="tawkchat-status-message"><span id="short-message"></span></div></div></div></div></div>',
                "tawkchat-minified-iframe-element-round": '<div id="tawkchat-minified-box" class="round"><div id="tawkchat-minified-wrapper"><div id="tawkchat-status-agent-container"><div id="agent-profile-image" class="agent-profile theme-background-color">&nbsp;</div></div><div id="tawkchat-status-text-container" class="theme-background-color theme-text-color"><span id="maximizeChat" title="__MAXIMIZE__"><svg id="chat-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span><span id="minimizeChatMinifiedBtn" class="icon-close" title="__MINIMIZE__"></span></div></div></div>',
                "tawkchat-chat-bubble-canvas": '<div id="tawkchat-chat-bubble-graphics-container"><canvas id="tawkchat-chat-bubble-canvas"></canvas></div><div id="tawkchat-chat-bubble-close" class="image-canvas-close"></div><div id="tawkchat-chat-bubble-text-container"><p id="tawkchat-chat-bubble-text" class="bubble-text-color"></p></div>',
                "tawkchat-chat-indicator": '<div id="tawkchat-chat-indicator"><p id="tawkchat-chat-indicator-text"></p></div>',
                "tawkchat-chat-bubble-gallery": '<span id="tawkchat-chat-bubble-close" class="image-bubble-close"></span><img src="__IMAGE_SRC__" style="__IMAGE_SIZE__" /><a id="bubble-image" class="gallery-bubble" href="#"></a>',
                "tawkchat-chat-bubble-upload": '<span id="tawkchat-chat-bubble-close" class="image-bubble-close"></span><img id="bubble-image" src="__IMAGE_SRC__" />',
                "tawkchat-message-preview": '<div id="tawkchat-message-preview-container"><div id="tawkchat-message-preview-close"><div class="icon-close"></div></div><div id="tawkchat-message-preview-messages-container"></div><div id="tawkchat-message-preview-quick-reply-container"><div id="emoji-selection-container"></div><div id="actionsContainer"><div id="file-upload-drop-container"><div id="file-upload-drop-icon-label-container"><span id="file-upload-drop-icon" class="icon-upload"></span><span id="file-upload-drop-label"></span></div></div><fieldset id="textareaWrapper"><div id="textareaContainer" class="additionalPadding"><div id="tooLongMsgNotification"><span class="icon-alert"></span><span id="notifMessageText"></span></div></div><div id="actionButtonsContainer"><div id="hidableActionsWrapper"><div id="rateMainWrapper"><a id="rateChat" href="#"><span class="icon-vote-up"></span></a><div id="rateContainer"><a id="rateNegative" href="#" title="__RATE_NEGATIVE__"><span class="icon-vote-down"></span></a><a id="ratePositive" href="#" title="__RATE_POSITIVE__"><span class="icon-vote-up"></span></a></div></div><a id="uploadFileOption" href="#" title="__UPLOAD_FILE__"><label for="fileInput"><span class="icon-upload"></span></label></a></div><a id="viewEmoji" href="#" title="__VIEW_EMOJI__"><span class="icon-happy"></span></a></div></fieldset></div><form enctype="multipart/form-data" id="upload-form" method="post"><input type="file" class="hidden file-input" name="file[]" multiple="multiple" id="fileInput" /><label class="upload-file sprite-background" title="Upload File" for="test"></label></form></div></div>',
                "message-preview-item": '<span class="message-preview-close-button icon-close"></span><div class="profileImageContainer"><div class="agentProfileImage"></div><div style="background-image : __IMAGE_URL__;" class="agentProfileImage"></div></div><div class="messageBody"><div class="message">__MESSAGE__</div><div class="messageInformation"><div class="messageNameContainer"><div class="messageName">__NAME__</div></div><div class="messageTimeContainer"><div class="messageTime">__TIME__</div></div></div></div>',
                "messagePreview-callInfo": '<div class="profileImageContainer"><div class="agentProfileImage"></div><div style="background-image : __IMAGE_URL__;" class="agentProfileImage"></div></div><div class="mp-callInfoContainer messageBody"><div class="mp-callInfoWrapper"><div class="mp-callIconContainer"><div id="mp-callIconWrapper"><span id="mp-callIcon" class="btn-icon icon-voice-chat"></span></div></div><span id="mp-callInfo">__CALL_INFO__ __CALLER_NAME__</span></div><div class="mp-callInfoElapsedTime">__ELAPSED_TIME__</div></div>',
                "tawkchat-maximized-wrapper": '<div id="innerWrapper" class="border-corner"><div id="headerBoxWrapper" class="border-corner"><div id="headerBox" class="theme-background-color theme-text-color border-corner"><div id="headerAccountStateContainer"><p id="headerAccountState"><span id="shortMessage"></span></p><div id="agentProfileContainer">&nbsp;</div></div><div id="headerBoxControlsContainer"><a id="screenShare" class="headerBoxLink" href="#" title="__SCREENSHARE__"><span class="icon-desktop-sharing headerBoxIcon"></span></a><a id="voiceCall" class="headerBoxLink" href="#" title="__VOICECALL__"><span class="icon-voice-chat headerBoxIcon"></span></a><a id="videoCall" class="headerBoxLink" href="#" title="__VIDEOCALL__"><span class="icon-video-chat headerBoxIcon"></span></a><div class="headerBoxLink"><a id="chatMenu" href="#" title="__CHATMENU__"><span class="icon-menu headerBoxIcon"></span></a><div id="chatMenuControls"><div id="chatMenuControlsOverlay"></div><ul><li id="changeName" style="display: none;">__CHANGE_NAME__</li><li id="emailTranscriptOption" style="display: none;"></li><li id="soundOn"></li><li id="soundOff"></li><li id="popoutChat"></li><li id="endChat"></li></ul></div></div><a id="minimizeChat" class="headerBoxLink" href="#" title="__END__"><span class="icon-close headerBoxIcon"></span></a></div></div></div><div id="contentContainer"><div id="greetingsMainContainer" class="theme-background-color theme-text-color"><div id="greetingsContent"><p id="greetingsText"></p><p id="greetingsWaitTime"></p></div><div id="agentBar"><div id="agentList"></div></div></div><div id="chatPanel"><div id="chatContainerWrapper"><div id="chatContainer"><div id="chatTableWrapper"><div id="chatRowWrapper"><div id="chatCellWrapper"><div id="chatWrapper" class="single-agent"><div id="agentTypingContainer"></div></div></div></div></div><div id="maxFileNotificationContainer" class="hidden"><div id="maxFileNotifHeader"><div id="maxFileNotifIconContainer"><div id="maxFileNotifIconWrapper"></div><span id="maxFileNotifIcon">!</span></div><span id="maxFileNotifLabel"></span><div class="closeButtonContainer"><span class="icon-close" id="closeNumberNotification"></span></div></div><div id="maxFileNotificationMessage"></div><div id="maxFileNumberList"></div></div><div id="maxSizeNotificationContainer" class="hidden"><div id="maxSizeNotifHeader"><div id="maxSizeNotifIconContainer"><div id="maxSizeNotifIconWrapper"></div><span id="maxSizeNotifIcon">!</span></div><span id="maxSizeNotifLabel"></span><div class="closeButtonContainer"><span class="icon-close" id="closeSizeNotification"></span></div></div><div id="maxSizeNotificationMessage"></div><div id="maxFileSizeList"></div></div></div></div><div id="actionsContainer"><fieldset id="textareaWrapper"><div id="textareaContainer" class="additionalPadding"><div id="tooLongMsgNotification"><span class="icon-alert"></span><span id="notifMessageText">__TOO_LONG_MESSAGE__</span></div></div><div id="actionButtonsContainer"><div id="hidableActionsWrapper"><div id="rateMainWrapper"><a id="rateChat" href="#"><span class="icon-vote-up"></span></a><div id="rateContainer"><a id="rateNegative" href="#" title="__RATE_NEGATIVE__"><span class="icon-vote-down"></span></a><a id="ratePositive" href="#" title="__RATE_POSITIVE__"><span class="icon-vote-up"></span></a></div></div><a id="uploadFileOption" href="#" title="__UPLOAD_FILE__"><label for="fileInput"><span class="icon-upload"></span></label></a></div><a id="viewEmoji" href="#" title="__VIEW_EMOJI__"><span class="icon-happy"></span></a></div><div id="textareaSubmitContainer"><div class="icon-mobile-submit" id="textareaSubmitButton"></div></div></fieldset></div><div id="file-upload-drop-container"><div id="fileUploadWrapper"><div id="file-upload-drop-icon-label-container"><span id="file-upload-drop-icon" class="icon-upload"></span><span id="file-upload-drop-label"></span></div></div></div><form enctype="multipart/form-data" id="upload-form" method="post"><input type="file" class="hidden file-input" name="file[]" multiple="multiple" id="fileInput" /><label class="upload-file sprite-background" title="Upload File" for="test"></label></form></div><div id="__BOTTOM_CONTAINER__"><a id="__TAWK_TO_LINK__" tabindex="-1"></a></div><div id="newMessagesBar"><div id="newMessageContainer"><p id="newMessagesNotification"><a id="newMessagesNotificationLink" title="" class="icon-message"></a><span id="notificationMessageText"></span></p><div id="newMessageArrowDown"></div></div></div><div id="formContainer"></div></div><div id="emoji-selection-container"></div><div id="tawkToContent"><div id="formFieldsContainer"><div class="formTable"><div class="formRow"><div class="formCell"><div class="formFrame"><div class="contentContainer"><div class="longFormContainer"><div id="formInnerHeight"><div id="tawkImage"></div><p id="tawkHeader">TAWK.TO</p><div id="tawkContent" class="formMessageField innerTittle"></div></div></div><div class="longFormBottomContainer"><button id="cancelTawkRedirect" class="formButton"></button><button id="tawkRedirect" class="theme-background-color theme-text-color formButton"></button><div class="clear"></div></div></div></div></div></div></div></div></div></div>',
                uploadFailedNotification: '<div class="uploadFailedNotifContainer"><div class="uploadFailedNotifHeader"><div class="uploadFailedNotifIconContainer"><div class="uploadFailedNotifIconWrapper"></div><span class="uploadFailedSizeNotifIcon">!</span></div><span class="uploadFailedNotifLabel">__UPLOAD_FAILED_LABEL__</span></div><div class="uploadFailedNotifMessage">__UPLOAD_FAILED_MESSAGE__</div><div class="uploadFailedRetryContainer"></div></div>',
                "mobile-bottom-round": '<div id="tawkchat-minified-box"><div id="tawkchat-chat-indicator"><span id="tawkchat-chat-indicator-text"></span></div><div id="tawkchat-minified-wrapper"><div id="tawkchat-status-agent-container"><div id="agent-profile-image" class="agent-profile theme-background-color">&nbsp;</div></div><div id="tawkchat-status-text-container" class="theme-background-color theme-text-color"><div id="tawkchat-status-icon" class="online"><svg id="chat-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z" fill-rule="evenodd" clip-rule="evenodd" /></svg></div></div></div></div>',
                "mobile-bottom-rectangle": '<div id="tawkchat-minified-box"><div id="tawkchat-chat-indicator"><span id="tawkchat-chat-indicator-text"></span></div><div id="tawkchat-minified-wrapper"><div id="tawkchat-status-agent-container"><div id="agent-profile-image" class="agent-profile theme-background-color">&nbsp;</div></div><div id="tawkchat-status-text-container" class="theme-background-color theme-text-color"><div id="tawkchat-status-icon" class="online"><span id="chat-icon"><svg id="chat-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span><span id="tawk-minified-mobile-text" class="text"></span></div></div></div></div>',
                "chat-message-container": '__OWNER_TPL__<div class="clearfix"></div><div class="messageBody clearfix">__CONTENT__</div>',
                "chat-message-owner-agent": '<div class="ownerNameContainer"><div class="messageOwnerName agent">__NAME__</div></div><div class="profileImageContainer"><div style="background-image : __IMAGE_URL__;" class="agentProfileImage"></div></div>',
                "chat-message-owner-visitor": '<div class="ownerNameContainer"><a class="messageOwnerName visitor" href="#">__NAME__</a></div>',
                "agent-typing": '<div id="agentTyping-__MESSAGE_ID__" class="agentChatContainer clearfix"><div class="ownerNameContainer"><div class="messageOwnerName agent">__NAME__</div></div><div class="profileImageContainer"><div style="background-image : __IMAGE_URL__;" class="agentProfileImage"></div></div><div class="clearfix"></div><div class="messageBody clearfix"><div class="message agentTypingIndicator"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div></div>',
                "agent-profile": "__AGENT_PROFILE_IMAGE____AGENT_PROFILE_DETAIL__",
                "agent-profile-image": '<div class="alias-image theme-background-color" style="__IMAGE_URL__;"></div>',
                "agent-profile-detailed": '<div class="agentDetailedInfo"><strong>__NAME__</strong><p>__POSITION__</p></div>',
                "agent-profile-description": '<div class="agentContainer"><div class="agentInformationContainer"><p class="__POSITION_CLASS__">__NAME__</p><p class="position-label" style="display: none;">__POSITION__</p></div></div>',
                "agent-profile-description-noimage": '<div class="agentContainerNoImage"><div class="agentInformationContainerNoImage"><p class="agentInfoNoImage"><b>__NAME__</b><i>__POSITION__</i></p></div></div>',
                "chat-message-row": '<div class="messageWrapper __PENDING__"><div class="message">__MESSAGE__</div></div>__MESSAGE_STATUS_ROW__<div class="clear"></div>',
                "chat-message-status-row": '<div class="clear"></div><div class="time-agent-display"><div class="agent-div __TIME_CLASS__">__NAME__</div><div class="time-div __TIME_CLASS__">__TIME__</div></div>',
                "chat-message-pending-row": '<div class="messageStatusContainer pending"><div class="lds-spinner loader"><div class="spin spin-1"></div><div class="spin spin-2"></div><div class="spin spin-3"></div><div class="spin spin-4"></div><div class="spin spin-5"></div><div class="spin spin-6"></div><div class="spin spin-7"></div><div class="spin spin-8"></div><div class="spin spin-9"></div><div class="spin spin-10"></div><div class="spin spin-11"></div><div class="spin spin-12"></div></div></div>'
            },
            nb = {
                undefined: 1,
                "boolean": 1,
                number: 1,
                string: 1
            },
            S = {
                exportProperty: function(a, b, c) {
                    a[b] = c
                }
            };
        S.dependencyDetection = function() {
            var a = [];
            return {
                begin: function(b) {
                    a.push(b && {
                        callback: b,
                        distinctDependencies: []
                    })
                },
                end: function() {
                    a.pop()
                },
                registerDependency: function(b) {
                    if (!S.isSubscribable(b)) throw Error("Only subscribable things can act as dependencies");
                    if (0 < a.length) {
                        var c = a[a.length - 1];
                        !c || 0 <= S.utils.arrayIndexOf(c.distinctDependencies, b) || (c.distinctDependencies.push(b), c.callback(b))
                    }
                },
                ignore: function(b,
                    c, e) {
                    try {
                        return a.push(null), b.apply(c, e || [])
                    } finally {
                        a.pop()
                    }
                }
            }
        }();
        S.observable = function(a) {
            function b() {
                if (0 < arguments.length) return b.equalityComparer && b.equalityComparer(c, arguments[0]) || (b.valueWillMutate(), c = arguments[0], b.valueHasMutated()), this;
                S.dependencyDetection.registerDependency(b);
                return c
            }
            var c = a;
            S.subscribable.call(b);
            b.peek = function() {
                return c
            };
            b.valueHasMutated = function() {
                b.notifySubscribers(c)
            };
            b.valueWillMutate = function() {
                b.notifySubscribers(c, "beforeChange")
            };
            S.utils.extend(b,
                S.observable.fn);
            S.exportProperty(b, "peek", b.peek);
            S.exportProperty(b, "valueHasMutated", b.valueHasMutated);
            S.exportProperty(b, "valueWillMutate", b.valueWillMutate);
            return b
        };
        S.subscribable = function() {
            this._subscriptions = {};
            S.utils.extend(this, S.subscribable.fn);
            S.exportProperty(this, "subscribe", this.subscribe);
            S.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount)
        };
        S.subscribable.fn = {
            subscribe: function(a, b, c) {
                c = c || "change";
                a = b ? a.bind(b) : a;
                var e = new S.subscription(this, a, function() {
                    S.utils &&
                        S.utils.arrayRemoveItem && S.utils.arrayRemoveItem(this._subscriptions[c], e)
                }.bind(this));
                this._subscriptions[c] || (this._subscriptions[c] = []);
                this._subscriptions[c].push(e);
                return e
            },
            notifySubscribers: function(a, b) {
                b = b || "change";
                if (this.hasSubscriptionsForEvent(b)) {
                    var c = 0;
                    for (var e = this._subscriptions[b].length; c < e; ++c) {
                        var g = this._subscriptions[b].slice(0);
                        (g = g[c]) && !0 !== g.isDisposed && g.callback(a)
                    }
                }
            },
            hasSubscriptionsForEvent: function(a) {
                return this._subscriptions[a] && this._subscriptions[a].length
            },
            getSubscriptionsCount: function() {
                var a = 0;
                S.utils.objectForEach(this._subscriptions, function(b, c) {
                    a += c.length
                });
                return a
            },
            unsubscribe: function(a, b) {
                S.utils.arrayRemoveItem(this._subscriptions[b || "change"], a)
            }
        };
        S.isSubscribable = function(a) {
            return null !== a && "function" === typeof a.subscribe && "function" === typeof a.notifySubscribers
        };
        S.subscription = function(a, b, c) {
            this.target = a;
            this.callback = b;
            this.disposeCallback = c;
            S.exportProperty(this, "dispose", this.dispose)
        };
        S.subscription.prototype.dispose = function() {
            this.isDisposed = !0;
            this.disposeCallback()
        };
        S.observable.fn = {
            equalityComparer: function(a, b) {
                return null === a || typeof a in nb ? a === b : !1
            }
        };
        var Qa = S.observable.protoProperty = "__tw_proto__";
        S.observable.fn[Qa] = S.observable;
        S.hasPrototype = function(a, b) {
            return null === a || void 0 === a || void 0 === a[Qa] ? !1 : a[Qa] === b ? !0 : S.hasPrototype(a[Qa], b)
        };
        S.isObservable = function(a) {
            return S.hasPrototype(a, S.observable)
        };
        S.utils = {
            arrayIndexOf: function(a, b) {
                if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b);
                for (var c = 0, e = a.length; c < e; c++)
                    if (a[c] === b) return c;
                return -1
            },
            extend: function(a, b) {
                if (b)
                    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                return a
            },
            arrayRemoveItem: function(a, b) {
                b = S.utils.arrayIndexOf(a, b);
                0 <= b && a.splice(b, 1)
            },
            objectForEach: function(a, b) {
                for (var c in a) a.hasOwnProperty(c) && b(c, a[c])
            }
        };
        (function(a) {
            function b(E, L) {
                var B = E.split("@"),
                    J = "";
                1 < B.length && (J = B[0] + "@", E = B[1]);
                E = E.replace(h, ".");
                E = E.split(".");
                B = E.length;
                for (var aa = []; B--;) aa[B] = L(E[B]);
                L = aa.join(".");
                return J + L
            }

            function c(E) {
                for (var L = [], B = 0, J = E.length, aa, ia; B < J;) aa = E.charCodeAt(B++), 55296 <= aa && 56319 >= aa && B < J ? (ia = E.charCodeAt(B++), 56320 == (ia & 64512) ? L.push(((aa & 1023) << 10) + (ia & 1023) + 65536) : (L.push(aa), B--)) : L.push(aa);
                return L
            }

            function e(E) {
                var L, B, J, aa = [];
                E = c(E);
                var ia = E.length;
                var ta = 128;
                var na = 0;
                var wa = 72;
                for (J = 0; J < ia; ++J) {
                    var oa = E[J];
                    128 > oa && aa.push(x(oa))
                }
                for ((L = B = aa.length) && aa.push("-"); L < ia;) {
                    var xa = 2147483647;
                    for (J = 0; J < ia; ++J) oa = E[J], oa >= ta && oa < xa && (xa = oa);
                    var Za = L + 1;
                    if (xa - ta > n((2147483647 - na) / Za)) throw new RangeError(m.overflow);
                    na += (xa - ta) * Za;
                    ta = xa;
                    for (J = 0; J < ia; ++J) {
                        oa = E[J];
                        if (oa < ta && 2147483647 < ++na) throw new RangeError(m.overflow);
                        if (oa == ta) {
                            var Ga = na;
                            for (xa = 36;; xa += 36) {
                                oa = xa <= wa ? 1 : xa >= wa + 26 ? 26 : xa - wa;
                                if (Ga < oa) break;
                                var fb = Ga - oa;
                                Ga = 36 - oa;
                                var gb = aa;
                                oa += fb % Ga;
                                gb.push.call(gb, x(oa + 22 + 75 * (26 > oa) - 0));
                                Ga = n(fb / Ga)
                            }
                            aa.push(x(Ga + 22 + 75 * (26 > Ga) - 0));
                            wa = Za;
                            xa = 0;
                            na = L == B ? n(na / 700) : na >> 1;
                            for (na += n(na / wa); 455 < na; xa += 36) na = n(na / 35);
                            wa = n(xa + 36 * na / (na + 38));
                            na = 0;
                            ++L
                        }
                    }++na;
                    ++ta
                }
                return aa.join("")
            }
            var g = /[^\x20-\x7E]/,
                h = /[\x2E\u3002\uFF0E\uFF61]/g,
                m = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                },
                n = Math.floor,
                x = String.fromCharCode;
            a.punycode = {
                version: "1.4.1",
                ucs2: {
                    decode: c
                },
                encode: e,
                toASCII: function(E) {
                    return b(E, function(L) {
                        return g.test(L) ? "xn--" + e(L) : L
                    })
                }
            }
        })(d);
        v = {};
        k.$_Tawk = k.$_Tawk || {};
        k.Tawk_API = k.Tawk_API || {};
        if ("object" === typeof k.$_Tawk_API)
            for (var $a in k.$_Tawk_API) k.$_Tawk_API.hasOwnProperty($a) && (k.Tawk_API[$a] = k.$_Tawk_API[$a]);
        if ("function" !== typeof k.CustomEvent) {
            var hb = function(a, b) {
                b = b || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var c = document.createEvent("CustomEvent");
                c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail);
                return c
            };
            hb.prototype = k.Event.prototype;
            d.CustomEventIE = hb
        }
        z.begin = function(a) {
            d.main.begin(a)
        };
        z.init = function(a) {
            d.main.init(a)
        };
        z.maximize = Tawk_API.maximize = function() {
            z.ready && d.sessionHandler.notifyWindowState("max")
        };
        z.minimize = Tawk_API.minimize = function() {
            z.ready && d.sessionHandler.notifyWindowState("min")
        };
        z.toggle = Tawk_API.toggle = function() {
            z.ready && d.viewHandler.toggleWidget()
        };
        z.popup = Tawk_API.popup = function() {
            z.ready && d.viewHandler.popoutWidget()
        };
        z.getWindowType = Tawk_API.getWindowType = function() {
            if (z.ready) return f.isEmbedded ? "embed" : f.isPopup ? "popup" : "inline"
        };
        z.showWidget = Tawk_API.showWidget = function() {
            z.ready && d.viewHandler.showWidget()
        };
        z.hideWidget = Tawk_API.hideWidget = function() {
            z.ready && d.viewHandler.hideWidget()
        };
        z.toggleVisibility = Tawk_API.toggleVisibility = function() {
            z.ready && d.viewHandler.toggleVisibility()
        };
        z.getStatus = Tawk_API.getStatus = function() {
            if (z.ready) return y.pageStatus()
        };
        z.isChatMaximized = Tawk_API.isChatMaximized = function() {
            if (z.ready) return "max" === y.chatWindowState()
        };
        z.isChatMinimized = Tawk_API.isChatMinimized = function() {
            if (z.ready) return "min" === y.chatWindowState()
        };
        z.isChatHidden = Tawk_API.isChatHidden = function() {
            if (z.ready) return d.viewHandler.isWidgetHidden()
        };
        z.isChatOngoing = Tawk_API.isChatOngoing = function() {
            if (z.ready) return d.chatHandler.isChatOngoing()
        };
        z.isVisitorEngaged = Tawk_API.isVisitorEngaged =
            function() {
                if (z.ready) return d.chatHandler.isVisitorEngaged()
            };
        z.endChat = Tawk_API.endChat = function() {
            z.ready && d.chatHandler.triggerEndChat()
        };
        z.addEvent = Tawk_API.addEvent = function(a, b, c) {
            d.sessionHandler.addEvent(a, b, c)
        };
        z.setAttributes = Tawk_API.setAttributes = function(a, b) {
            d.sessionHandler.setAttributes(a, !0, b)
        };
        z.addTags = Tawk_API.addTags = function(a, b) {
            d.sessionHandler.addTags(a, b)
        };
        z.removeTags = Tawk_API.removeTags = function(a, b) {
            d.sessionHandler.removeTags(a, b)
        };
        z.widgetPosition = Tawk_API.widgetPosition =
            function() {
                if (z.ready) return f.chatPosition()
            };
        z.setMobilePosition = Tawk_API.setMobilePosition = function(a) {
            z.ready && -1 !== "br bl cr cl tr tl".split(" ").indexOf(a) && D && D.mobileBrowserName && f.chatPosition(a)
        };
        var D = {
                vendor: "",
                version: 0,
                isIE: !1,
                isIE6: !1,
                isIE8: !1,
                windowId: null,
                mobileBrowserName: null,
                html5audio: {},
                isPlaceholderSupported: !0
            },
            f = {
                widgetId: "default",
                isPopup: !1,
                isEmbedded: !1,
                soundOn: S.observable(!0),
                showAgentBar: !0,
                showWaitTime: !0,
                showPreChatForm: !1,
                showOfflineForm: !0,
                hideWidget: !1,
                hideWidgetOnLoad: !1,
                hideWidgetOnOffline: !1,
                greetings: {},
                prechatOptions: {},
                headerBgColor: null,
                headerTxtColor: null,
                isLegacyLayout: !1,
                whiteLabel: S.observable(),
                mobileWidget: S.observable("round"),
                desktopWidget: S.observable("full"),
                chatBubble: S.observable(),
                chatPosition: S.observable("br"),
                maximizedDimensions: S.observable({
                    width: 0,
                    height: 0
                }),
                minimizedDimensions: S.observable({
                    width: 0,
                    height: 0,
                    position: "br"
                }),
                showMessagePreview: S.observable(!0),
                showUploads: S.observable(!0),
                showRating: S.observable(!0),
                showAgentTyping: !0,
                showVisitorTyping: S.observable(!0),
                showEmoji: S.observable(!0),
                showUnreadInTab: S.observable(!0),
                onClickAction: "max",
                widgetVersion: 0,
                locale: "en",
                schedule: null,
                scheduleTimezone: null,
                isTopPositioned: function() {
                    return "tr" === this.chatPosition() || "tl" === this.chatPosition()
                },
                isBottomPositioned: function() {
                    return "br" === this.chatPosition() || "bl" === this.chatPosition()
                },
                isCenterPositioned: function() {
                    return "cr" === this.chatPosition() || "cl" === this.chatPosition()
                },
                isRightPositioned: function() {
                    return "cr" === this.chatPosition() || "tr" === this.chatPosition() ||
                        "br" === this.chatPosition()
                },
                isLeftPositioned: function() {
                    return "cl" === this.chatPosition() || "tl" === this.chatPosition() || "bl" === this.chatPosition()
                },
                isDesktopRectangle: function() {
                    return "round" !== this.desktopWidget()
                },
                agentTextBgColor: null,
                agentTextColor: null,
                visitorTextBgColor: null,
                visitorTextColor: null,
                agentTextBorderColor: null,
                topCorner: null,
                bottomCorner: null,
                widgetOffsetX: 0,
                widgetOffsetY: 0,
                isHeaderCompact: null,
                maxStyle: S.observable(),
                minStyle: S.observable(),
                mobMaxStyle: S.observable(),
                mobMinStyle: S.observable(),
                isRTL: S.observable(!1),
                webRTCSettings: S.observable(),
                key: -180956378
            },
            ea = {
                uuid: null,
                uuidVer: 0,
                visitorId: "",
                name: S.observable(),
                displayName: S.observable(),
                email: S.observable(),
                transcriptEmail: "",
                uuids: []
            },
            sa = {
                pageId: null,
                tawkId: "",
                pageName: S.observable(),
                isStable: !0
            },
            N = {
                chatSynced: !1,
                chatBuffer: [],
                chatVersion: 0,
                chatDepartment: "any",
                agents: {},
                agentProfiles: {},
                profiles: {},
                rating: S.observable(),
                chatHistory: [],
                chatOrder: 0,
                chatEndVersion: 1,
                chatId: null
            },
            y = {
                transferKey: "",
                sessionKey: "",
                transferedSession: !1,
                currentVersion: 709,
                criticalVersion: 0,
                serverVersion: 0,
                agentImgUrl: "https://s3.amazonaws.com/tawk-to-pi",
                visitorAppServer: "https://va.tawk.to",
                visitorSocketServer: "",
                chatWindowState: S.observable("min"),
                pageStatus: S.observable(),
                pageStatusVersion: 0,
                prechatFormSubmitted: S.observable(!1),
                waitTime: 6E4,
                chatBubbleClosed: S.observable(!1),
                restarted: !1,
                departments: []
            },
            ob = {
                chat_sound: "https://static-v.tawk.to/a-v3/audio/chat_sound.mp3"
            },
            pb = {
                chat_sound: "https://static-v.tawk.to/a-v3/audio/chat_sound.ogg"
            },
            qb = {
                chat_sound: "https://static-v.tawk.to/a-v3/audio/chat_sound.wav"
            };
        (function() {
            var a = !1,
                b = /xyz/.test(function() {
                    xyz
                }) ? /\b_super\b/ : /.*/;
            this.TawkClass = function() {};
            TawkClass.extend = function(c) {
                function e() {
                    !a && this.init && this.init.apply(this, arguments)
                }
                var g = this.prototype;
                a = !0;
                var h = new this;
                a = !1;
                for (var m in c) h[m] = "function" === typeof c[m] && "function" === typeof g[m] && b.test(c[m]) ? function(n, x) {
                    return function() {
                        var E = this._super;
                        this._super = g[n];
                        var L = x.apply(this, arguments);
                        this._super = E;
                        return L
                    }
                }(m,
                    c[m]) : c[m];
                e.prototype = h;
                e.prototype.constructor = e;
                e.extend = arguments.callee;
                return e
            }
        })();
        Y.prototype.createElement = function(a, b, c, e, g) {
            var h;
            a = a.createElement(b);
            c = c || {};
            for (h in c) a[h] = c[h];
            g && "iframe" !== b && (a.innerHTML = g);
            e && (a.style.cssText = e);
            return a
        };
        Y.prototype.getDocument = function(a) {
            return a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document ? a.document : null
        };
        Y.prototype.parseQueryString = function(a) {
            var b, c = {};
            var e = (a ? a.replace(/(.*)\?/, "") : k.location.search.substring(1)).split("&");
            a = 0;
            for (b = e.length; a < b; a += 1) {
                var g = e[a].split("=");
                c[g[0]] = g[1]
            }
            return c
        };
        Y.prototype.createQueryString = function(a) {
            var b, c = [];
            for (b in a) a.hasOwnProperty(b) && c.push(encodeURIComponent(b) + "=" + encodeURIComponent(a[b]));
            return c.join("&")
        };
        Y.prototype.getReloadedScript = function() {
            var a, b = document.getElementsByTagName("script"),
                c = null;
            var e = 0;
            for (a = b.length; e < a; e++) b[e].id && -1 !== b[e].id.indexOf("TawkScript") && (c = b[e]);
            return c
        };
        Y.prototype.trim = function(a) {
            return this.isString(a) ? String.prototype.trim ?
                a.trim().toString() : a.replace(this.regTrim, "") : null
        };
        Y.prototype.isString = function(a) {
            return void 0 === a || "string" !== typeof a ? !1 : !0
        };
        Y.prototype.isEmail = function(a) {
            return this.regEmail.test(a)
        };
        Y.prototype.isArray = Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        };
        Y.prototype.parseVisitorName = function(a) {
            return this.isGeneratedName(a) ? d.languageParser.translate("chat", "defaultName") : a
        };
        Y.prototype.generateRandomString = function(a) {
            var b, c = [];
            a = a || 6;
            for (b = 0; b < a; b++) c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 *
                Math.random())));
            return c.join("")
        };
        Y.prototype.computedStyle = function(a, b) {
            if (!a || !b) return null;
            if (a.currentStyle) var c = a.currentStyle[b];
            else try {
                c = getComputedStyle(a, null).getPropertyValue(b)
            } catch (e) {
                c = "none"
            }
            "width" === b && "auto" === c && (c = a.clientWidth);
            return "" + c
        };
        Y.prototype.parseChatTime = function(a) {
            var b = this.getDateFromUTC(a);
            a = b.getHours();
            b = b.getMinutes();
            10 > a && (a = "0" + a);
            10 > b && (b = "0" + b);
            return a + ":" + b
        };
        Y.prototype.getDateFromUTC = function(a) {
            if (a instanceof Date) return a;
            a = this.regDate.exec(a);
            return new Date(Date.UTC(a[1], a[2] - 1, a[3], a[4], a[5], a[6], a[7]))
        };
        Y.prototype.rawEncode = function(a) {
            return a.replace(this.decodedAmpRegex, this.encodedAmp).replace(this.decodedQuoteRegex, this.encodedQuote).replace(this.decodedAposRegex, this.encodedApos).replace(this.decodedLessRegex, this.encodedLess).replace(this.decodedGreatRegex, this.encodedGreat)
        };
        Y.prototype.rawDecode = function(a) {
            return a.replace(this.encodedQuoteRegex, this.decodedQuote).replace(this.encodedAposRegex, this.decodedApos).replace(this.encodedLessRegex,
                this.decodedLess).replace(this.encodedGreatRegex, this.decodedGreat).replace(this.encodedAmpRegex, this.decodedAmp)
        };
        Y.prototype.getMilliseconds = function(a) {
            a instanceof Date || (a = this.regDate.exec(a), a = new Date(Date.UTC(a[1], a[2] - 1, a[3], a[4], a[5], a[6], a[7])));
            return a.getTime()
        };
        Y.prototype.capitalize = function(a) {
            return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
        };
        Y.prototype.getDepartmentStatus = function(a) {
            var b, c = y.departments,
                e = "",
                g = !0,
                h = "";
            if ("any" === a) return {
                status: "",
                isOnline: !0,
                name: ""
            };
            var m = 0;
            for (b = c.length; m < b; m++)
                if (c[m].did === a) {
                    g = "online" === c[m].st;
                    e = c[m].st;
                    h = c[m].n;
                    break
                }
            return {
                status: e,
                isOnline: g,
                name: h
            }
        };
        Y.prototype.getElementsByClassName = function(a, b) {
            var c;
            if (a.getElementsByClassName) return a.getElementsByClassName(b);
            var e = a.getElementsByTagName("*");
            var g = [];
            a = 0;
            for (c = e.length; a < c; a++) - 1 !== e[a].className.indexOf(b) && g.push(e[a]);
            return g
        };
        Y.prototype.insertScript = function(a, b, c) {
            var e = document.getElementsByTagName("script")[0],
                g = document.createElement("script");
            g.async = !0;
            g.src = a;
            g.charset = "UTF-8";
            g.setAttribute("crossorigin", "*");
            b && (g.id = b);
            c ? e.parentNode.insertBefore(g, e) : e.parentNode.appendChild(g)
        };
        Y.prototype.isPlaceholderSupported = function() {
            return "placeholder" in document.createElement("input")
        };
        Y.prototype.togglePlaceholderText = function(a, b, c) {
            d.eventHandler.listen(a, "focus", function(e) {
                this.value === b && (this.value = "")
            }, c + "inputfocus");
            d.eventHandler.listen(a, "blur", function() {
                "" === this.value && (this.value = b)
            }, c + "inputblur")
        };
        Y.prototype.redraw = function(a) {
            var b =
                a.style.display;
            a.style.display = "none !important";
            a.style.display = b + " !important"
        };
        Y.prototype.isTouchDevice = function() {
            try {
                return document.createEvent("TouchEvent"), !0
            } catch (a) {
                return !1
            }
        };
        Y.prototype.shadeColor = function(a, b) {
            var c = "#",
                e;
            a = String(a).replace(/[^0-9a-f]/gi, "");
            6 > a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
            b = b || 0;
            for (e = 0; 6 > e; e += 2) {
                var g = parseInt(a[e] + "" + a[e + 1], 16);
                g = Math.round(Math.min(Math.max(0, g + g * b), 255)).toString(16);
                c += ("00" + g).substring(g.length)
            }
            return c
        };
        Y.prototype.getContrast = function(a) {
            a = a.replace("#", "");
            6 > a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
            return 8388607.5 < parseInt(a, 16) ? "white" : "black"
        };
        Y.prototype.getElementsByTagName = function(a, b) {
            var c = [];
            a = a.getElementsByTagName(b);
            for (b = 0; b < a.length; b++) c.push(a[b]);
            return c
        };
        Y.prototype.chatElementInView = function(a) {
            var b = d.viewHandler.chatContainer.getElementById("chatContainer");
            return !!(a.offsetTop >= b.scrollTop && a.offsetTop <= b.scrollTop + b.offsetHeight &&
                0 !== a.clientWidth && 0 !== a.clientHeight)
        };
        Y.prototype.formatFileSize = function(a) {
            var b = "Bytes KB MB GB TB PB EB ZB YB".split(" ");
            a = parseInt(a, 10);
            if (!a) return "0Bytes";
            for (var c = 1; c < b.length; c++)
                if (a < Math.pow(1024, c)) return Math.round(a / Math.pow(1024, c - 1) * 100) / 100 + b[c - 1];
            return a
        };
        Y.prototype.isFileInputSupported = function() {
            if (t.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
            var a = document.createElement("input");
            a.type = "file";
            return !a.disabled
        };
        Y.prototype.escapeTemplateReplacement = function(a, b) {
            for (var c = 0; c < b.length; c++) {
                var e = b[c],
                    g = e.textReplace;
                "string" === typeof g && (g = g.replace(/\$/g, "$$$"));
                a = a.replace(e.placeholder, g)
            }
            return a
        };
        Y.prototype.getGenericStyle = function(a) {
            return ["outline                     : " + (a.outline ? a.outline : "none") + " !important; ", "visibility                  : " + (a.visibility ? a.visibility : "visible") + " !important; ", "resize                      : " + (a.resize ? a.resize : "none") + " !important; ",
                "box-shadow                  : " + (a.boxshadow ? a.boxshadow : "none") + " !important; ", "overflow                    : " + (a.overflow ? a.overflow : "visible") + " !important; ", "background                  : " + (a.background ? a.background : "none") + " !important; ", "opacity                     : " + (a.opacity ? a.opacity : "1") + " !important; ", "filter                      : alpha(opacity=" + (a.opacity ? 100 * a.opacity : "100") + ") !important; ", "-ms-filter                  : progid:DXImageTransform.Microsoft.Alpha(Opacity" + (a.opacity ?
                    a.opacity : "1") + ") !important; ", "-moz-opacity                : " + (a.opacity ? a.opacity : "1") + " !important; ", "-khtml-opacity              : " + (a.opacity ? a.opacity : "1") + " !important; ", "top                         : " + (a.top ? a.top : "auto") + " !important; ", "right                       : " + (a.right ? a.right : "auto") + " !important; ", "bottom                      : " + (a.bottom ? a.bottom : "auto") + " !important; ", "left                        : " + (a.left ? a.left : "auto") + " !important; ", "position                    : " +
                (a.position ? a.position : "absolute") + " !important; ", "border                      : " + (a.border ? a.border : "0") + " !important; ", "min-height                  : " + (a.minheight ? a.minheight : "auto") + " !important; ", "min-width                   : " + (a.minwidth ? a.minwidth : "auto") + " !important; ", "max-height                  : " + (a.maxheight ? a.maxheight : "none") + " !important; ", "max-width                   : " + (a.maxwidth ? a.maxwidth : "none") + " !important; ", "padding                     : " + (a.padding ? a.padding :
                    "0") + " !important; ", "margin                      : " + (a.margin ? a.margin : "0") + " !important; ", "-moz-transition-property    : " + (a.transition ? a.transition : "none") + " !important; ", "-webkit-transition-property : " + (a.transition ? a.transition : "none") + " !important; ", "-o-transition-property      : " + (a.transition ? a.transition : "none") + " !important; ", "transition-property         : " + (a.transition ? a.transition : "none") + " !important; ", "transform                   : " + (a.transform ? a.transform : "none") + " !important; ",
                "-webkit-transform           : " + (a.transform ? a.transform : "none") + " !important; ", "-ms-transform               : " + (a.transform ? a.transform : "none") + " !important; ", "width                       : " + (a.width ? a.width : "auto") + " !important; ", "height                      : " + (a.height ? a.height : "auto") + " !important; ", "display                     : " + (a.display ? a.display : "block") + " !important; ", "z-index                     : " + (a.zindex ? a.zindex : "none") + " !important; ", "background-color            : " +
                (a.backgroundcolor ? a.backgroundcolor : "transparent") + " !important; ", "cursor                      : " + (a.cursor ? a.cursor : "auto") + " !important; ", "float                       : " + (a["float"] ? a["float"] : "none") + " !important; ", "border-radius               : " + (a.borderRadius ? a.borderRadius : "unset") + " !important; ", "pointer-events              : auto !important"
            ].join("").replace(/\s/gm, "")
        };
        Y.prototype.isGeneratedName = function(a) {
            return this.regNameMach.test(a)
        };
        Y.prototype.getRotateStyling = function(a,
            b) {
            a = "rotate(" + a + "deg) translateZ(0px)";
            return {
                transform: a,
                "-moz-transform": a,
                "-webkit-transform": a,
                "-o-transform": a,
                "-ms-transform": a,
                "transform-origin": b,
                "-moz-transform-origin": b,
                "-webkit-transform-origin": b,
                "-o-transform-origin": b,
                "-ms-transform-origin": b
            }
        };
        Y.prototype.blurElements = function(a) {
            for (var b = 0; b < a.length; b++) a[b].blur()
        };
        Y.prototype.transformGreetings = function(a) {
            for (var b = /\[([^)]+)\]/, c = /\(([^)]+)\)/, e = /\[[^\]\(\)]+\]\((\bhttp:\/\/\b|\bhttps:\/\/\b|\bmailto:\b){1}[^\]\(\)]+\)/i,
                    g = "_blank", h = this.rawEncode(a), m, n; null !== (m = e.exec(h)) && (n = b.exec(m[0]), m = c.exec(m[0]), m[0].indexOf("(mailto:") || (g = "_top"), h = h.replace(n[0] + m[0], '<a target="' + g + '" href="' + m[1] + '" class="link">' + n[1] + "</a>"), h !== a););
            return h
        };
        Y.prototype.checkWhiteLabelLink = function(a, b, c) {
            var e = 1E4 * Math.random(),
                g = this,
                h = d.viewHandler.chatContainer,
                m, n, x = null;
            x = function() {
                if (l.rawDecode(b.label) !== l.rawDecode(a.innerHTML) || b.url && b.url !== a.href || !b.url && a.href || b.id !== a.id || !h.getElementById(a.id) || b.cssText !==
                    a.style.cssText || l.h(a.innerHTML) !== f.key) g.whiteLabelUnexpectedIssueLogged || (d.loggingHandler.logIncident("White label element has changed unexpectedly", {
                        pageId: ea.uuid
                    }), g.whiteLabelUnexpectedIssueLogged = !0), a.id = b.id, a.innerHTML = b.label, a.style.cssText = b.cssText, null !== b.url ? a.href = b.url : a.removeAttribute("href"), !h.getElementById(b.parentElem.id) && b.grandParentName && (m = h.getElementById(b.grandParentName), b.siblingName && (n = h.getElementById(b.siblingName)) && m && m.insertBefore(b.parentElem, n)), m =
                    h.getElementById(b.parentElem.id), !h.getElementById(a.id) && m && m.appendChild(a);
                g.checkWhiteLabelLink(a, b, c)
            };
            c ? this.messagePreviewCheckWhiteLabelRef = setTimeout(x, e) : this.checkWhiteLabelRef = setTimeout(x, e)
        };
        Y.prototype.applyWhiteLabelSettings = function(a, b, c) {
            c ? clearTimeout(this.messagePreviewCheckWhiteLabelRef) : clearTimeout(this.checkWhiteLabelRef);
            null === b.url ? a.removeAttribute("href") : (a.href = b.url, b.url = a.href);
            f.whiteLabel() && null !== b.url && (a.target = "_blank");
            a.innerHTML = b.label;
            a.style.cssText +=
                ";color:" + b.textColor + " !important";
            b.cssText = a.style.cssText;
            f.whiteLabel().whitelabeled || this.checkWhiteLabelLink(a, b, c)
        };
        Y.prototype.transformLabel = function(a) {
            var b;
            (b = a.match(/_[^_]+_/gi)) && 0 < b.length && b.forEach(function(c) {
                var e = c.indexOf("_");
                var g = c.lastIndexOf("_");
                e = c.substring(0, e) + "<i>" + c.substring(e + 1, g) + "</i>" + c.substring(g + 1, c.length);
                a = a.replace(c, e)
            });
            (b = a.match(/\*[^*]+\*/gi)) && 0 < b.length && b.forEach(function(c) {
                var e = c.indexOf("*");
                var g = c.lastIndexOf("*");
                e = c.substring(0, e) + "<b>" +
                    c.substring(e + 1, g) + "</b>" + c.substring(g + 1, c.length);
                a = a.replace(c, e)
            });
            return a = a.replace(":zap", '<img class="emojione" alt="\u26a1" title=":zap:" src="https://cdn.jsdelivr.net/emojione/assets/png/26a1.png?v=2.2.7">')
        };
        Y.prototype.getRandomName = function() {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(52 * Math.random()) + this.generateRandomString() + "-" + (new Date).getTime()
        };
        Y.prototype.insertRandomTagsBeforeAndAfter = function(a, b, c) {
            var e = Math.floor(3 * Math.random() + 1),
                g;
            for (g = 0; g <
                e; g++) {
                var h = document.createElement(c);
                h.id = l.getRandomName();
                b.insertBefore(h, a)
            }
            e = Math.floor(3 * Math.random() + 1);
            for (g = 0; g < e; g++) a = document.createElement(c), a.id = l.getRandomName(), b.appendChild(a)
        };
        Y.prototype.getWebRTCToken = function(a, b, c) {
            if (!this.hasWebRTC()) return c(!0);
            var e = this;
            a = {
                video: a,
                screen: b
            };
            c = c || function() {};
            this.webrtcWin = k.open("", "");
            d.socketManager.sendToConnector("getWebRTCToken", a, function(g, h) {
                if (g) return e.webrtcWin.close(), c(!0, g);
                e.webrtcWin.location.href = e.connectionUrl +
                    "/v2/call?token=" + h.data.token;
                c()
            })
        };
        Y.prototype.rejectCall = function(a, b) {
            a = {
                callId: a
            };
            b = b || function() {};
            d.socketManager.sendToConnector("declineCall", a, function() {
                b()
            })
        };
        Y.prototype.disconnectWebRTC = function() {
            this.webrtcWin && this.webrtcWin.close()
        };
        Y.prototype.debounce = function(a, b, c) {
            var e;
            return function() {
                var g = this,
                    h = arguments,
                    m = c && !e;
                clearTimeout(e);
                e = setTimeout(function() {
                    e = null;
                    c || a.apply(g, h)
                }, b);
                m && a.apply(g, h)
            }
        };
        Y.prototype.isDescendent = function(a, b) {
            for (b = b.parentNode; null !== b;) {
                if (b ===
                    a) return !0;
                b = b.parentNode || null
            }
            return !1
        };
        Y.prototype.getTimeDifference = function(a, b) {
            a = new Date(a);
            endTimeFmt = new Date(b);
            diff = endTimeFmt.getTime() - a.getTime();
            36E5 <= diff ? (b = Math.round(diff / 36E5), a = "hours") : 6E4 <= diff ? (b = Math.round(diff / 6E4), a = "minutes") : (b = Math.round(diff / 1E3), a = "seconds");
            return d.languageParser.translate("chat", a, {
                num: b
            })
        };
        Y.prototype.hasClass = function(a, b) {
            return a.classList ? a.classList.contains(b) : !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
        };
        Y.prototype.addClass = function(a,
            b) {
            a.classList ? a.classList.add(b) : this.hasClass(a, b) || (a.className += " " + b)
        };
        Y.prototype.removeClass = function(a, b) {
            a.classList ? a.classList.remove(b) : this.hasClass(a, b) && (a.className = a.className.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), " "))
        };
        Y.prototype.updateFontStylesheet = function(a) {
            if (a && (a !== document || f.isPopup)) {
                var b = a.getElementById("lato-fonts"),
                    c = a.body;
                l.supportsLatin(f.locale) && !b ? (a.querySelector("head").innerHTML += '<link id="lato-fonts" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&subset=latin-ext" rel="stylesheet"/>',
                    this.addClass(c, "font-lato")) : !l.supportsLatin(f.locale) && b && (b.parentNode.removeChild(b), this.removeClass(c, "font-lato"))
            }
        };
        Y.prototype.updateFonts = function() {
            if (d.viewHandler && d.viewHandler.iframeContainer && d.viewHandler.iframeContainer.childViews)
                for (var a = d.viewHandler.iframeContainer.childViews, b = 0; b < a.length; b++) {
                    var c = a[b];
                    c.isIframe && this.updateFontStylesheet(c.documentRef)
                }
        };
        Y.prototype.supportsLatin = function(a) {
            return -1 < "cat cs da de en et es fi fil fr hr hu id it lv lt ms nl no pl pt pt_br ro sk sl sr_cs sq sv tr vi".split(" ").indexOf(a)
        };
        Y.prototype.hasWebRTC = function() {
            var a = !0;
            D.isIE && (a = !1);
            return a
        };
        Y.prototype.h = function(a) {
            var b = 0;
            if (0 === a.length) return b;
            for (var c = 0; c < a.length; c++) {
                var e = a.charCodeAt(c);
                b = (b << 5) - b + e;
                b &= b
            }
            return b
        };
        Inheritance_Manager = {
            extend: function(a, b) {
                function c() {}
                c.prototype = b.prototype;
                a.prototype = new c;
                a.prototype.constructor = a;
                a.prototype.parent = b.prototype;
                a.baseConstructor = b;
                a.superClass = b.prototype
            }
        };
        var l = new Y;
        "undefined" !== typeof module && module.exports && (module.exports.Utils = Y);
        var rb = [{
                string: t.userAgent,
                subString: "Edge",
                identity: "explorer",
                versionSearch: "Edge"
            }, {
                string: t.userAgent,
                subString: "Trident/7.0",
                identity: "explorer",
                versionSearch: "rv"
            }, {
                string: t.userAgent,
                subString: "(Opera|OPR)",
                identity: "opera",
                versionSearch: "Version"
            }, {
                string: t.userAgent,
                subString: "Chrome",
                identity: "chrome",
                versionSearch: "Chrome"
            }, {
                string: t.userAgent,
                subString: "Mobile Safari",
                identity: "android",
                versionSearch: "Version"
            }, {
                string: t.userAgent,
                subString: "Firefox",
                identity: "firefox",
                versionSearch: "Firefox"
            }, {
                string: t.userAgent,
                subString: "MSIE",
                identity: "explorer",
                versionSearch: "MSIE"
            }, {
                string: t.userAgent,
                subString: "IEMobile",
                identity: "explorer",
                versionSearch: "IEMobile"
            }, {
                string: t.userAgent,
                subString: "Safari",
                identity: "safari",
                versionSearch: "Version"
            }, {
                string: t.userAgent,
                subString: "Gecko",
                identity: "mozilla",
                versionSearch: "rv"
            }],
            sb = [{
                string: t.userAgent,
                subString: "Windows Phone",
                identity: "windows_phone"
            }, {
                string: t.platform,
                subString: "Win",
                identity: "windows"
            }, {
                string: t.platform,
                subString: "Mac",
                identity: "mac"
            }, {
                string: t.userAgent,
                subString: "iPhone",
                identity: "iphone"
            }, {
                string: t.userAgent,
                subString: "Android",
                identity: "android"
            }, {
                string: t.platform,
                subString: "Linux",
                identity: "linux"
            }, {
                string: t.userAgent,
                subString: "iPad",
                identity: "ipad"
            }],
            ib = {
                google: "q",
                yahoo: "p",
                baidu: "wd",
                yandex: "text",
                bing: "q",
                soso: "w",
                ask: "q",
                aol: "q",
                sogou: "query",
                mywebsearch: "searchfor",
                youdao: "q",
                lycos: "q",
                infospace: "q",
                blekko: "q",
                info: "q",
                dogpile: "q",
                duckduckgo: "q",
                webcrawler: "q"
            },
            Aa = {
                src: "about:blank",
                border: "0",
                cellspacing: "0",
                frameBorder: "0",
                scrolling: "no",
                horizontalscrolling: "no",
                verticalscrolling: "no",
                allowTransparency: "true",
                title: "chat widget"
            },
            ab = {
                nokia: [/(NokiaBrowser)\/(\d+)\.(\d+).(\d+)\.(\d+)/, /^(Nokia)/, /(NokiaBrowser)\/(\d+)\.(\d+).(\d+)/, /(NokiaBrowser)\/(\d+)\.(\d+)/, /(BrowserNG)\/(\d+)\.(\d+).(\d+)/, /(Series60)\/5\.0/, /(Series60)\/(\d+)\.(\d+)/, /(S40OviBrowser)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/, /(Nokia)[EN]?(\d+)/],
                blackberry: [/(BB10);/, /(PlayBook).+RIM Tablet OS (\d+)\.(\d+)\.(\d+)/, /(Black[bB]erry).+Version\/(\d+)\.(\d+)\.(\d+)/, /(Black[bB]erry)\s?(\d+)/],
                chrome: [/(CrMo)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/, /(CriOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/, /(Android).*(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+) (Mobile)?/],
                ie: [/(IEMobile)[ \/](\d+)\.(\d+)/],
                firefox: [/Mobile.*(Firefox)\/(\d+)\.(\d+)/, /Tablet.*(Firefox)\/(\d+)\.(\d+)/],
                operamini: [/(Opera Mini)(?:\/att)?\/(\d+)\.(\d+)/],
                opera: [/(Opera Tablet).*Version\/(\d+)\.(\d+)(?:\.(\d+))?/, /(?:Mobile Safari).*(OPR)\/(\d+)\.(\d+)\.(\d+)'/, /(Opera)\/.+Opera Mobi.+Version\/(\d+)\.(\d+)/, /(Opera)\/(\d+)\.(\d+).+Opera Mobi/, /Opera Mobi.+(Opera)\/(\d+)\.(\d+)/,
                    /Opera Mobi/, /(Opera)\/9.80.*Version\/(\d+)\.(\d+)(?:\.(\d+))?/
                ],
                safari: [/(iPod|iPhone|iPad);.*CPU.*OS (\d+)(?:_\d+)?_(\d+).*Mobile/],
                uc: [/(UCBrowser)[ \/](\d+)\.(\d+)\.(\d+)/, /(UC Browser)[ \/](\d+)\.(\d+)\.(\d+)/, /(UC Browser|UCBrowser|UCWEB)(\d+)\.(\d+)\.(\d+)/],
                "android2.3": [/(Android) 2\.3(?:[.\-]([a-z0-9]+))?/],
                android2: [/(Android) 2\.(\d+)(?:[.\-]([a-z0-9]+))?/],
                android: [/Android[\- ][\d]+\.[\d]+; [A-Za-z]{2}\-[A-Za-z]{0,2}; WOWMobile (.+) Build/, /Android[\- ][\d]+\.[\d]+\-update1; [A-Za-z]{2}\-[A-Za-z]{0,2}; (.+) Build/,
                    /Android[\- ][\d]+\.[\d]+\.[\d]+; [A-Za-z]{2}\-[A-Za-z]{0,2}; (.+) Build/, /Android[\- ][\d]+\.[\d]+\.[\d]+;[A-Za-z]{2}\-[A-Za-z]{0,2};(.+) Build/, /Android[\- ][\d]+\.[\d]+; [A-Za-z]{2}\-[A-Za-z]{0,2}; (.+) Build/, /Android[\- ][\d]+\.[\d]+\.[\d]+; (.+) Build/, /Android[\- ][\d]+\.[\d]+; (.+) Build/
                ]
            };
        Ba.prototype.init = function() {
            var a = this.getBrowserVersion();
            D.mobileBrowserName = this.getMobileBrowser();
            D.version = a.version;
            D.vendor = a.vendor;
            D.os = a.os;
            D.plugins = a.plugins;
            D.html5audio = {
                mp3: this.hasHtmlAudio("mp3"),
                ogg: this.hasHtmlAudio("ogg"),
                wav: this.hasHtmlAudio("wav")
            };
            D.html5audio.supported = D.html5audio.mp3 || D.html5audio.ogg || D.html5audio.wav || D.html5audio.aac;
            D.isPlaceholderSupported = l.isPlaceholderSupported();
            "explorer" === D.vendor && (D.isIE = !0, 6 === D.version ? D.isIE6 = !0 : 8 <= D.version && 9 > D.version && (D.isIE8 = !0))
        };
        Ba.prototype.getBrowserVersion = function() {
            return this.browserObj ? this.browserObj : this.browserObj = {
                vendor: this.searchString(rb) || "other",
                version: this.searchVersion(t.userAgent) || this.searchVersion(t.appVersion) ||
                    "other",
                os: this.searchString(sb) || "other",
                plugins: this.getPlugins()
            }
        };
        Ba.prototype.getPlugins = function() {
            var a, b = [];
            var c = 0;
            for (a = t.plugins.length; c < a; c++) t.plugins[c].name && b.push(t.plugins[c].name);
            return b
        };
        Ba.prototype.searchString = function(a) {
            var b;
            for (b = 0; b < a.length; b++) {
                var c = a[b].string;
                var e = new RegExp(a[b].subString);
                this.versionSearchString = a[b].versionSearch || a[b].identity;
                if (e.test(c)) return a[b].identity
            }
        };
        Ba.prototype.searchVersion = function(a) {
            var b = a.indexOf(this.versionSearchString);
            if (-1 !== b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
        };
        Ba.prototype.getMobileBrowser = function() {
            for (var a = !1, b = t.userAgent, c = Object.keys(ab), e = 0; !a && e < c.length;) {
                for (var g = c[e], h = 0; h < ab[g].length; h++)
                    if (b.match(ab[g][h])) {
                        a = g;
                        break
                    }
                e++
            }
            return a
        };
        Ba.prototype.getReferredSearchEngine = function() {
            var a, b, c = "";
            if (document.referrer && (b = this.getHostname(document.referrer)))
                for (a in b = b.toLowerCase(), ib)
                    if (0 <= b.indexOf(a)) {
                        queryString = this.getQuerystring(document.referrer, ib[a]);
                        "blekko" ===
                        a && "" === queryString && (queryString = this.getQuerystring(document.referrer.replace("/ws/", "/?q="), "q"));
                        c = a;
                        break
                    }
            return c
        };
        Ba.prototype.getQuerystring = function(a, b) {
            b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            a = (new RegExp("[\\?&]" + b + "=([^&#]*)")).exec(a);
            return null === a || !l.isArray(a) || 2 > a.length ? null : a[1] ? unescape(a[1].replace(/\+/g, " ")) : null
        };
        Ba.prototype.getHostname = function(a) {
            a = a.match(/^(?:f|ht)tp(?:s)?:\/\/([^/]+)/im);
            return null === a || !l.isArray(a) || 2 > a.length ? null : a[1] ? a[1].toString() :
                null
        };
        Ba.prototype.hasHtmlAudio = function(a) {
            var b = document.createElement("audio");
            try {
                if (!b.canPlayType || "no" === b.canPlayType("audio/" + a) || "" === b.canPlayType("audio/" + a)) return !1
            } catch (c) {
                return !1
            }
            return !0
        };
        d.browserData = new Ba;
        Ma.prototype.logPerformance = function(a) {
            Ra.xhrRequest("https://va.tawk.to/log-performance/v3", {
                params: {
                    logData: JSON.stringify(a)
                }
            }, function() {})
        };
        Ma.prototype.logIncident = function(a, b) {
            var c = ma.getBrowserData();
            c.visitorId = ea.visitorId || "";
            c.message = a;
            c.data = b;
            this.log("warning",
                c)
        };
        Ma.prototype.log = function(a, b) {
            b && a && (b.uiVersion = "v3", b.buildVersion = "709", b.buildCommit = "de3130333f1d8785429922032731546e03b6db77", this.postForm("log", JSON.stringify({
                type: a,
                data: b
            })))
        };
        Ma.prototype.postForm = function(a, b) {
            var c = document.createElement("iframe");
            if (!document.body) return !1;
            c.src = "about:blank";
            c.style.cssText = ";display:none !important;";
            c.title = "chat widget logging";
            document.body.appendChild(c);
            try {
                var e = l.getDocument(c)
            } catch (g) {
                return !1
            }
            D.isIE && (e.open(), e.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body><iframe name="form-receiver" id="form-receiver"></iframe></body></html>'),
                e.close());
            c = e.createElement("form");
            c.method = "POST";
            c.action = "https://va.tawk.to/" + a;
            c.enctype = "application/x-www-form-urlencoded";
            c.acceptCharset = "UTF-8";
            a = e.createElement("input");
            a.type = "text";
            a.name = "logData";
            a.value = b;
            c.appendChild(a);
            D.isIE && (c.target = "form-receiver");
            e.body.appendChild(c);
            c.submit();
            c.parentNode.removeChild(c)
        };
        k.onbeforeunload = function() {
            this.unloading = !0
        };
        k.onunload = function() {
            this.unloading = !0
        };
        Ya.prototype.getBrowserData = function() {
            var a = d.browserData.getBrowserVersion();
            return {
                site: k.location.href,
                browser: a.vendor || "",
                version: a.version || "",
                os: a.os || "",
                plugins: a.plugins || ""
            }
        };
        Ya.prototype.handleError = function(a, b, c, e, g) {
            if (!(b && c || "Script error." !== a && "Script error" !== a) || "string" !== typeof b || -1 === b.indexOf("tawk.to") && -1 === b.indexOf("tawk.js")) return !1;
            var h = this.getBrowserData();
            h.visitorId = ea.visitorId || "";
            h.message = a || "";
            h.file = b || "";
            h.line = c || "";
            h.column = e || "";
            h.stack = g ? JSON.stringify(g) : "";
            h.stack = h.stack.replace(l.regLineBreaks, "");
            d.loggingHandler.log("error",
                h);
            return !0
        };
        var ma = new Ya;
        k.onerror = function() {
            if (!ma) return !1;
            var a = ma.handleError.apply(this, arguments);
            return "function" === typeof ma.originalErrorHandlerFn ? ma.originalErrorHandlerFn.apply(this, arguments) : a
        };
        Fa.prototype.attachEvent = function(a, b, c) {
            var e = this,
                g = function(h) {
                    c.call(a, e.getEvent(h))
                };
            a.attachEvent("on" + b, g);
            return g
        };
        Fa.prototype.listen = function(a, b, c, e) {
            if (e) {
                if (this.events[e]) {
                    var g = this.events[e];
                    this.events[e] = null;
                    this.removeEventHandler(g.element, g.eventName, g.eventListener)
                }
                if (a.addEventListener) a.addEventListener(b,
                    c, this.supportsPassive ? {
                        passive: !1
                    } : !1);
                else if (document.attachEvent) c = this.attachEvent(a, b, c);
                else return null;
                this.events[e] = {
                    element: a,
                    eventName: b,
                    eventListener: c
                };
                return c
            }
        };
        Fa.prototype.cancelEvent = function(a) {
            document.attachEvent && (a = this.getEvent(a));
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        };
        Fa.prototype.removeEventHandler = function(a, b, c) {
            document.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent("on" + b, c)
        };
        Fa.prototype.getEvent = function(a) {
            var b = a || k.event;
            if (!b)
                for (a =
                    this.getEvent.caller; a && (!(b = a.arguments[0]) || Event != b.constructor);) a = a.caller;
            return b
        };
        Fa.prototype.clearEvents = function() {
            var a = this;
            Object.keys(this.events).forEach(function(b) {
                b = a.events[b];
                a.removeEventHandler(b.element, b.eventName, b.eventListener)
            });
            this.events = {}
        };
        Fa.prototype.getTargetElement = function(a) {
            document.attachEvent && (a = this.getEvent(a));
            a = a.target || a.srcElement;
            3 === a.nodeType && (a = a.parentNode);
            return a
        };
        var tb = {
            keypressTimer: 0,
            previousValue: 0,
            initElement: function(a, b) {
                var c = this;
                this.previousValue = "";
                d.eventHandler.listen(a, "focus", function(e) {
                    c.startWatching(e, a, b)
                }, a.id + "focus");
                d.eventHandler.listen(a, "blur", function(e) {
                    c.stopWatching()
                }, a.id + "blur");
                d.eventHandler.listen(a, "keyup", function(e) {
                    c.detectChange(e, a, b)
                }, a.id + "keyup")
            },
            startWatching: function(a, b, c) {
                var e = this;
                this.stopWatching();
                this.keypressTimer = setInterval(function() {
                    e.detectChange(a, b, c)
                }, 100)
            },
            stopWatching: function() {
                0 != this.keypressTimer && (clearInterval(this.keypressTimer), this.keypressTimer = 0)
            },
            detectChange: function(a,
                b, c) {
                b = b.value || "";
                if (this.previousValue === b) return !1;
                c(a, b);
                this.previousValue = b
            }
        };
        Pa.prototype.xhrRequest = function(a, b, c) {
            var e = new XMLHttpRequest;
            b = b || {};
            var g = b.params || {};
            e.onerror = c;
            e.open("POST", a, !0);
            e.withCredentials = !0;
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (b.headers)
                for (var h in b.headers) b.headers[h] && e.setRequestHeader(h, b.headers[h]);
            e.onreadystatechange = function() {
                e.passed || 4 !== e.readyState || (e.passed = !0, c(null, e.responseText))
            };
            e.send(l.createQueryString(g));
            return {
                type: "xhr",
                req: e
            }
        };
        Pa.prototype.abort = function(a) {
            a && "xhr" === a.type && a.req.abort()
        };
        Pa.prototype.get = function(a, b, c) {
            var e = new XMLHttpRequest;
            b = b || {};
            e.onerror = c;
            a += "?" + l.createQueryString(b);
            e.open("GET", a, !0);
            e.onreadystatechange = function() {
                e.passed || 4 !== e.readyState || (e.passed = !0, c(null, e.responseText))
            };
            e.send();
            return {
                type: "xhr",
                req: e
            }
        };
        var Ra = new Pa;
        ra.prototype.checkLocalStorageUsage = function() {
            try {
                localStorage.setItem("exist_test", "yes"), localStorage.removeItem("exist_test"), this.hasLocalStorage = !0
            } catch (a) {
                this.hasLocalStorage = !1
            }
        };
        ra.prototype.setHTTPCookie = function(a, b, c, e) {
            var g = "";
            c || (c = new Date, c.setTime(c.getTime() + 15552E6), g = "; expires=" + c.toGMTString());
            document.cookie = a + "=" + b + g + "; path=/" + (e ? ";domain=" + e : "")
        };
        ra.prototype.getHTTPCookie = function(a) {
            var b, c, e = [],
                g = a + "=",
                h = document.cookie.split(";");
            a = 0;
            for (b = h.length; a < b; a++) {
                for (c = h[a];
                    " " === c.charAt(0);) c = c.substring(1, c.length);
                0 === c.indexOf(g) && e.push(c.substring(g.length, c.length))
            }
            return e
        };
        ra.prototype.setSessionStorage = function(a,
            b) {
            if (this.hasSessionStorage && sessionStorage.setItem) try {
                sessionStorage.setItem(a, b)
            } catch (c) {}
        };
        ra.prototype.getSessionStorage = function(a) {
            return this.hasSessionStorage && sessionStorage.getItem ? sessionStorage.getItem(a) : null
        };
        ra.prototype.setLocalStorage = function(a, b) {
            this.hasLocalStorage && k.localStorage.setItem(a, b)
        };
        ra.prototype.getLocalStorage = function(a) {
            return this.hasLocalStorage ? k.localStorage.getItem(a) : null
        };
        ra.prototype.setWindowName = function(a) {
            k.name && 0 !== k.name.indexOf("TawkWindowName-") ||
                (k.name = "TawkWindowName-" + a)
        };
        ra.prototype.getWindowName = function() {
            if (!k.name) return null;
            if (0 !== k.name.indexOf("TawkWindowName-")) {
                var a = k.name.substring(0, 5);
                var b = a.length;
                if (6 > b) {
                    var c = 0;
                    for (b = 6 - b; c < b; c++) a += "0"
                }
                return a.replace(/[^0-9a-zA-Z]/g, "0").replace(" ", "0")
            }
            return k.name.substring(15, 21)
        };
        ra.prototype.handleWindowId = function() {
            var a = this.getSessionStorage("TawkWindowName");
            "null" === a && (a = null);
            a || this.hasSessionStorage || (a = this.getWindowName());
            "null" === a && (a = null);
            a || (a = l.generateRandomString(),
                this.hasSessionStorage ? this.setSessionStorage("TawkWindowName", a) : this.setWindowName(a));
            D.windowId = a
        };
        ra.prototype.storeUUID = function() {
            var a = this;
            y.transferedSession || ea.uuids && 0 < ea.uuids.length && ea.uuids.forEach(function(b) {
                var c = (b.isExact ? "e::" : "p::") + b.domain + "::" + b.uuid + "::" + ea.uuidVer;
                a.isCookieEnabled && a.setHTTPCookie("__tawkuuid", c, !1, b.domain)
            });
            this.handleWindowId();
            this.storeSessionInformation()
        };
        ra.prototype.getSessionInformation = function() {
            if (this.sessionInformation) var a = this.sessionInformation;
            this.hasLocalStorage && (a = this.getLocalStorage("twk_" + sa.pageId));
            a || (a = this.getHTTPCookie("Tawk_" + sa.pageId)[0]);
            return this.parseSessionInformation(a)
        };
        ra.prototype.storeSessionInformation = function(a, b) {
            var c = this.getSessionInformation();
            if (!a || y.visitorSocketServer) a ? a = y.visitorSocketServer + "::" + d.viewHandler.indicator.unansweredMessages : (a = c[1] || 0, d.main.previousSessionKey !== y.sessionKey && (a = 0), a = y.visitorSocketServer + "::" + a), b ? a += "::cf" : 3 === c.length && (a += "::" + c[2]), this.hasLocalStorage ? (this.setLocalStorage("twk_" +
                sa.pageId, a), this.clearOldCookies("Tawk_" + sa.pageId)) : this.setHTTPCookie("Tawk_" + sa.pageId, a, !1), this.sessionInformation = a
        };
        ra.prototype.parseSessionInformation = function(a) {
            var b = [];
            a && (b = a.split("::"), 1 >= b.length && (b = a.split("||")));
            return b
        };
        ra.prototype.clearOldCookies = function(a) {
            document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        };
        ra.prototype.checkCookieEnabled = function() {
            var a = t.cookieEnabled ? !0 : !1;
            "undefined" != typeof t.cookieEnabled || a || (document.cookie = "testcookie", a = -1 != document.cookie.indexOf("testcookie") ?
                !0 : !1);
            return a
        };
        ra.prototype.getStoredUUID = function() {
            var a;
            this.isCookieEnabled && (a = this.getHTTPCookie("__tawkuuid"));
            return a && 0 < a.length ? a : []
        };
        var ya = new ra;
        Xa.prototype.initAudioPlayer = function() {
            var a, b = {},
                c = this;
            if (D.html5audio.supported) {
                this.audioContext || /Firefox/.test(t.userAgent) || "undefined" === typeof AudioBuffer || void 0 === k.AudioContext && void 0 === k.webkitAudioContext || (k.AudioContext = k.AudioContext || k.webkitAudioContext, this.audioContext = new k.AudioContext);
                D.html5audio.mp3 ? b = ob : D.html5audio.wav ?
                    b = qb : D.html5audio.ogg && (b = pb);
                for (g in b) this.sounds[g] = this.audioContext ? new kb(b[g], g, this) : new lb(b[g]);
                if (this.audioContext) {
                    var e = function() {
                        c.isReadyForInit && c.eventUsedForInit && !c.touchstartInited && (c.sounds[c.eventUsedForInit].volume = 0, c.sounds[c.eventUsedForInit].play(), c.sounds[c.eventUsedForInit].source.stop(0), c.sounds[c.eventUsedForInit].volume = 1, k && "function" === typeof k.removeEventListener && k.removeEventListener("touchstart", e, !1), a && "function" === typeof a.removeEventListener && a.removeEventListener("touchstart",
                            e, !1), c.touchstartInited = !0)
                    };
                    if (D.mobileBrowserName && "ontouchstart" in k) {
                        var g = d.viewHandler.chatContainer.elementReferrer;
                        f.isPopup || (a = g.contentWindow ? g.contentWindow : g.contentDocument.defaultView);
                        a ? a.addEventListener("touchstart", e, !1) : g.addEventListener("touchstart", e, !1);
                        k.addEventListener("touchstart", e, !1)
                    }
                }
            }
        };
        Xa.prototype.play = function(a) {
            v.disableSound || f.soundOn() && this.sounds[a] && this.sounds[a].play()
        };
        Wa.prototype.getUploadHandler = function(a) {
            var b = "https://upload.tawk.to/upload/handle?_t=" +
                (new Date).getTime(),
                c = new XMLHttpRequest;
            c.onreadystatechange = function() {
                4 === this.readyState && (200 <= this.status && 400 > this.status ? a(JSON.parse(this.responseText)) : a(!0))
            };
            c.open("GET", b);
            c.onerror = function() {
                a(!0)
            };
            c.send();
            c = null
        };
        Wa.prototype.uploadFile = function(a, b, c, e) {
            var g = "https://upload.tawk.to/upload/visitor-chat/visitor?handle=" + a + "&visitorSessionId=" + y.sessionKey;
            this.uploads[a] = c;
            if (52428800 < b.size) return e(!0, "limit50");
            a = new FormData;
            a.append("upload", b, b.name || b.filename);
            b = new XMLHttpRequest;
            b.open("POST", g);
            b.onload = function() {
                return e(JSON.parse(this.responseText))
            };
            b.onerror = function() {
                return e(!0)
            };
            b.send(a)
        };
        var Na, la, La, Oa, Ka = 0,
            Ta = {
                people: {
                    header: ":smiley:",
                    content: ":grinning: :grin: :joy: :rofl: :smiley: :smile: :sweat_smile: :laughing: :wink: :blush: :yum: :sunglasses: :heart_eyes: :kissing_heart: :kissing: :kissing_smiling_eyes: :kissing_closed_eyes: :relaxed: :slight_smile: :hugging: :thinking: :neutral_face: :expressionless: :no_mouth: :rolling_eyes: :smirk: :persevere: :disappointed_relieved: :open_mouth: :zipper_mouth: :hushed: :sleepy: :tired_face: :sleeping: :relieved: :nerd: :stuck_out_tongue: :stuck_out_tongue_winking_eye: :stuck_out_tongue_closed_eyes: :drooling_face: :unamused: :sweat: :pensive: :confused: :upside_down: :money_mouth: :astonished: :frowning2: :slight_frown: :confounded: :disappointed: :worried: :triumph: :cry: :sob: :frowning: :anguished: :fearful: :weary: :grimacing: :cold_sweat: :scream: :flushed: :dizzy_face: :rage: :angry: :innocent: :cowboy: :clown: :lying_face: :mask: :thermometer_face: :head_bandage: :nauseated_face: :sneezing_face: :smiling_imp: :imp: :japanese_ogre: :japanese_goblin: :skull: :ghost: :alien: :robot: :poop: :smiley_cat: :smile_cat: :joy_cat: :heart_eyes_cat: :smirk_cat: :kissing_cat: :scream_cat: :crying_cat_face: :pouting_cat: :boy: :boy_tone1: :boy_tone2: :boy_tone3: :boy_tone4: :boy_tone5: :girl: :girl_tone1: :girl_tone2: :girl_tone3: :girl_tone4: :girl_tone5: :man: :man_tone1: :man_tone2: :man_tone3: :man_tone4: :man_tone5: :woman: :woman_tone1: :woman_tone2: :woman_tone3: :woman_tone4: :woman_tone5: :older_man: :older_man_tone1: :older_man_tone2: :older_man_tone3: :older_man_tone4: :older_man_tone5: :older_woman: :older_woman_tone1: :older_woman_tone2: :older_woman_tone3: :older_woman_tone4: :older_woman_tone5: :baby: :baby_tone1: :baby_tone2: :baby_tone3: :baby_tone4: :baby_tone5: :angel: :angel_tone1: :angel_tone2: :angel_tone3: :angel_tone4: :angel_tone5: :cop: :cop_tone1: :cop_tone2: :cop_tone3: :cop_tone4: :cop_tone5: :spy: :spy_tone1: :spy_tone2: :spy_tone3: :spy_tone4: :spy_tone5: :guardsman: :guardsman_tone1: :guardsman_tone2: :guardsman_tone3: :guardsman_tone4: :guardsman_tone5: :construction_worker: :construction_worker_tone1: :construction_worker_tone2: :construction_worker_tone3: :construction_worker_tone4: :construction_worker_tone5: :man_with_turban: :man_with_turban_tone1: :man_with_turban_tone2: :man_with_turban_tone3: :man_with_turban_tone4: :man_with_turban_tone5: :person_with_blond_hair: :person_with_blond_hair_tone1: :person_with_blond_hair_tone2: :person_with_blond_hair_tone3: :person_with_blond_hair_tone4: :person_with_blond_hair_tone5: :santa: :santa_tone1: :santa_tone2: :santa_tone3: :santa_tone4: :santa_tone5: :mrs_claus: :mrs_claus_tone1: :mrs_claus_tone2: :mrs_claus_tone3: :mrs_claus_tone4: :mrs_claus_tone5: :princess: :princess_tone1: :princess_tone2: :princess_tone3: :princess_tone4: :princess_tone5: :prince: :prince_tone1: :prince_tone2: :prince_tone3: :prince_tone4: :prince_tone5: :bride_with_veil: :bride_with_veil_tone1: :bride_with_veil_tone2: :bride_with_veil_tone3: :bride_with_veil_tone4: :bride_with_veil_tone5: :man_in_tuxedo: :man_in_tuxedo_tone1: :man_in_tuxedo_tone2: :man_in_tuxedo_tone3: :man_in_tuxedo_tone4: :man_in_tuxedo_tone5: :pregnant_woman: :pregnant_woman_tone1: :pregnant_woman_tone2: :pregnant_woman_tone3: :pregnant_woman_tone4: :pregnant_woman_tone5: :man_with_gua_pi_mao: :man_with_gua_pi_mao_tone1: :man_with_gua_pi_mao_tone2: :man_with_gua_pi_mao_tone3: :man_with_gua_pi_mao_tone4: :man_with_gua_pi_mao_tone5: :person_frowning: :person_frowning_tone1: :person_frowning_tone2: :person_frowning_tone3: :person_frowning_tone4: :person_frowning_tone5: :person_with_pouting_face: :person_with_pouting_face_tone1: :person_with_pouting_face_tone2: :person_with_pouting_face_tone3: :person_with_pouting_face_tone4: :person_with_pouting_face_tone5: :no_good: :no_good_tone1: :no_good_tone2: :no_good_tone3: :no_good_tone4: :no_good_tone5: :ok_woman: :ok_woman_tone1: :ok_woman_tone2: :ok_woman_tone3: :ok_woman_tone4: :ok_woman_tone5: :information_desk_person: :information_desk_person_tone1: :information_desk_person_tone2: :information_desk_person_tone3: :information_desk_person_tone4: :information_desk_person_tone5: :raising_hand: :raising_hand_tone1: :raising_hand_tone2: :raising_hand_tone3: :raising_hand_tone4: :raising_hand_tone5: :bow: :bow_tone1: :bow_tone2: :bow_tone3: :bow_tone4: :bow_tone5: :face_palm: :face_palm_tone1: :face_palm_tone2: :face_palm_tone3: :face_palm_tone4: :face_palm_tone5: :shrug: :shrug_tone1: :shrug_tone2: :shrug_tone3: :shrug_tone4: :shrug_tone5: :massage: :massage_tone1: :massage_tone2: :massage_tone3: :massage_tone4: :massage_tone5: :haircut: :haircut_tone1: :haircut_tone2: :haircut_tone3: :haircut_tone4: :haircut_tone5: :walking: :walking_tone1: :walking_tone2: :walking_tone3: :walking_tone4: :walking_tone5: :runner: :runner_tone1: :runner_tone2: :runner_tone3: :runner_tone4: :runner_tone5: :dancer: :dancer_tone1: :dancer_tone2: :dancer_tone3: :dancer_tone4: :dancer_tone5: :man_dancing: :man_dancing_tone1: :man_dancing_tone2: :man_dancing_tone3: :man_dancing_tone4: :man_dancing_tone5: :dancers: :speaking_head: :bust_in_silhouette: :busts_in_silhouette: :couple: :two_men_holding_hands: :two_women_holding_hands: :couplekiss: :kiss_mm: :kiss_ww: :couple_with_heart: :couple_mm: :couple_ww: :family: :family_mwg: :family_mwgb: :family_mwbb: :family_mwgg: :family_mmb: :family_mmg: :family_mmgb: :family_mmbb: :family_mmgg: :family_wwb: :family_wwg: :family_wwgb: :family_wwbb: :family_wwgg: :muscle: :muscle_tone1: :muscle_tone2: :muscle_tone3: :muscle_tone4: :muscle_tone5: :selfie: :selfie_tone1: :selfie_tone2: :selfie_tone3: :selfie_tone4: :selfie_tone5: :point_left: :point_left_tone1: :point_left_tone2: :point_left_tone3: :point_left_tone4: :point_left_tone5: :point_right: :point_right_tone1: :point_right_tone2: :point_right_tone3: :point_right_tone4: :point_right_tone5: :point_up: :point_up_tone1: :point_up_tone2: :point_up_tone3: :point_up_tone4: :point_up_tone5: :point_up_2: :point_up_2_tone1: :point_up_2_tone2: :point_up_2_tone3: :point_up_2_tone4: :point_up_2_tone5: :middle_finger: :middle_finger_tone1: :middle_finger_tone2: :middle_finger_tone3: :middle_finger_tone4: :middle_finger_tone5: :point_down: :point_down_tone1: :point_down_tone2: :point_down_tone3: :point_down_tone4: :point_down_tone5: :v: :v_tone1: :v_tone2: :v_tone3: :v_tone4: :v_tone5: :fingers_crossed: :fingers_crossed_tone1: :fingers_crossed_tone2: :fingers_crossed_tone3: :fingers_crossed_tone4: :fingers_crossed_tone5: :vulcan: :vulcan_tone1: :vulcan_tone2: :vulcan_tone3: :vulcan_tone4: :vulcan_tone5: :metal: :metal_tone1: :metal_tone2: :metal_tone3: :metal_tone4: :metal_tone5: :call_me: :call_me_tone1: :call_me_tone2: :call_me_tone3: :call_me_tone4: :call_me_tone5: :hand_splayed: :hand_splayed_tone1: :hand_splayed_tone2: :hand_splayed_tone3: :hand_splayed_tone4: :hand_splayed_tone5: :raised_hand: :raised_hand_tone1: :raised_hand_tone2: :raised_hand_tone3: :raised_hand_tone4: :raised_hand_tone5: :ok_hand: :ok_hand_tone1: :ok_hand_tone2: :ok_hand_tone3: :ok_hand_tone4: :ok_hand_tone5: :thumbsup: :thumbsup_tone1: :thumbsup_tone2: :thumbsup_tone3: :thumbsup_tone4: :thumbsup_tone5: :thumbsdown: :thumbsdown_tone1: :thumbsdown_tone2: :thumbsdown_tone3: :thumbsdown_tone4: :thumbsdown_tone5: :fist: :fist_tone1: :fist_tone2: :fist_tone3: :fist_tone4: :fist_tone5: :punch: :punch_tone1: :punch_tone2: :punch_tone3: :punch_tone4: :punch_tone5: :left_facing_fist: :left_facing_fist_tone1: :left_facing_fist_tone2: :left_facing_fist_tone3: :left_facing_fist_tone4: :left_facing_fist_tone5: :right_facing_fist: :right_facing_fist_tone1: :right_facing_fist_tone2: :right_facing_fist_tone3: :right_facing_fist_tone4: :right_facing_fist_tone5: :raised_back_of_hand: :raised_back_of_hand_tone1: :raised_back_of_hand_tone2: :raised_back_of_hand_tone3: :raised_back_of_hand_tone4: :raised_back_of_hand_tone5: :wave: :wave_tone1: :wave_tone2: :wave_tone3: :wave_tone4: :wave_tone5: :clap: :clap_tone1: :clap_tone2: :clap_tone3: :clap_tone4: :clap_tone5: :writing_hand: :writing_hand_tone1: :writing_hand_tone2: :writing_hand_tone3: :writing_hand_tone4: :writing_hand_tone5: :open_hands: :open_hands_tone1: :open_hands_tone2: :open_hands_tone3: :open_hands_tone4: :open_hands_tone5: :raised_hands: :raised_hands_tone1: :raised_hands_tone2: :raised_hands_tone3: :raised_hands_tone4: :raised_hands_tone5: :pray: :pray_tone1: :pray_tone2: :pray_tone3: :pray_tone4: :pray_tone5: :handshake: :handshake_tone1: :handshake_tone2: :handshake_tone3: :handshake_tone4: :handshake_tone5: :nail_care: :nail_care_tone1: :nail_care_tone2: :nail_care_tone3: :nail_care_tone4: :nail_care_tone5: :ear: :ear_tone1: :ear_tone2: :ear_tone3: :ear_tone4: :ear_tone5: :nose: :nose_tone1: :nose_tone2: :nose_tone3: :nose_tone4: :nose_tone5: :footprints: :eyes: :eye: :tongue: :lips: :kiss: :zzz: :eyeglasses: :dark_sunglasses: :necktie: :shirt: :jeans: :dress: :kimono: :bikini: :womans_clothes: :purse: :handbag: :pouch: :school_satchel: :mans_shoe: :athletic_shoe: :high_heel: :sandal: :boot: :crown: :womans_hat: :tophat: :mortar_board: :helmet_with_cross: :lipstick: :ring: :closed_umbrella: :briefcase:".split(" ")
                },
                nature: {
                    header: ":four_leaf_clover:",
                    content: ":see_no_evil: :hear_no_evil: :speak_no_evil: :sweat_drops: :dash: :monkey_face: :monkey: :gorilla: :dog: :dog2: :poodle: :wolf: :fox: :cat: :cat2: :lion_face: :tiger: :tiger2: :leopard: :horse: :racehorse: :deer: :unicorn: :cow: :ox: :water_buffalo: :cow2: :pig: :pig2: :boar: :pig_nose: :ram: :sheep: :goat: :dromedary_camel: :camel: :elephant: :rhino: :mouse: :mouse2: :rat: :hamster: :rabbit: :rabbit2: :chipmunk: :bat: :bear: :koala: :panda_face: :feet: :turkey: :chicken: :rooster: :hatching_chick: :baby_chick: :hatched_chick: :bird: :penguin: :dove: :eagle: :duck: :owl: :frog: :crocodile: :turtle: :lizard: :snake: :dragon_face: :dragon: :whale: :whale2: :dolphin: :fish: :tropical_fish: :blowfish: :shark: :octopus: :shell: :crab: :shrimp: :squid: :butterfly: :snail: :bug: :ant: :bee: :beetle: :spider: :spider_web: :scorpion: :bouquet: :cherry_blossom: :rosette: :rose: :wilted_rose: :hibiscus: :sunflower: :blossom: :tulip: :seedling: :evergreen_tree: :deciduous_tree: :palm_tree: :cactus: :ear_of_rice: :herb: :shamrock: :four_leaf_clover: :maple_leaf: :fallen_leaf: :leaves: :mushroom: :chestnut: :earth_africa: :earth_americas: :earth_asia: :new_moon: :waxing_crescent_moon: :first_quarter_moon: :waxing_gibbous_moon: :full_moon: :waning_gibbous_moon: :last_quarter_moon: :waning_crescent_moon: :crescent_moon: :new_moon_with_face: :first_quarter_moon_with_face: :last_quarter_moon_with_face: :sunny: :full_moon_with_face: :sun_with_face: :star: :star2: :cloud: :partly_sunny: :thunder_cloud_rain: :white_sun_small_cloud: :white_sun_cloud: :white_sun_rain_cloud: :cloud_rain: :cloud_snow: :cloud_lightning: :cloud_tornado: :fog: :wind_blowing_face: :umbrella2: :umbrella: :zap: :snowflake: :snowman2: :snowman: :comet: :fire: :droplet: :ocean: :jack_o_lantern: :christmas_tree: :sparkles: :tanabata_tree: :bamboo:".split(" ")
                },
                food: {
                    header: ":hamburger:",
                    content: ":grapes: :melon: :watermelon: :tangerine: :lemon: :banana: :pineapple: :apple: :green_apple: :pear: :peach: :cherries: :strawberry: :kiwi: :tomato: :avocado: :eggplant: :potato: :carrot: :corn: :hot_pepper: :cucumber: :peanuts: :bread: :croissant: :french_bread: :pancakes: :cheese: :meat_on_bone: :poultry_leg: :bacon: :hamburger: :fries: :pizza: :hotdog: :taco: :burrito: :stuffed_flatbread: :egg: :cooking: :shallow_pan_of_food: :stew: :salad: :popcorn: :bento: :rice_cracker: :rice_ball: :rice: :curry: :ramen: :spaghetti: :sweet_potato: :oden: :sushi: :fried_shrimp: :fish_cake: :dango: :icecream: :shaved_ice: :ice_cream: :doughnut: :cookie: :birthday: :cake: :chocolate_bar: :candy: :lollipop: :custard: :honey_pot: :baby_bottle: :milk: :coffee: :tea: :sake: :champagne: :wine_glass: :cocktail: :tropical_drink: :beer: :beers: :champagne_glass: :tumbler_glass: :fork_knife_plate: :fork_and_knife: :spoon:".split(" ")
                },
                objects: {
                    header: ":bulb:",
                    content: ":skull_crossbones: :love_letter: :bomb: :hole: :shopping_bags: :prayer_beads: :gem: :knife: :amphora: :map: :barber: :frame_photo: :bellhop: :door: :sleeping_accommodation: :bed: :couch: :toilet: :shower: :bathtub: :hourglass: :hourglass_flowing_sand: :watch: :alarm_clock: :stopwatch: :timer: :clock: :thermometer: :beach_umbrella: :balloon: :tada: :confetti_ball: :dolls: :flags: :wind_chime: :ribbon: :gift: :joystick: :postal_horn: :microphone2: :level_slider: :control_knobs: :radio: :iphone: :calling: :telephone: :telephone_receiver: :pager: :fax: :battery: :electric_plug: :computer: :desktop: :printer: :keyboard: :mouse_three_button: :trackball: :minidisc: :floppy_disk: :cd: :dvd: :movie_camera: :film_frames: :projector: :tv: :camera: :camera_with_flash: :video_camera: :vhs: :mag: :mag_right: :microscope: :telescope: :satellite: :candle: :bulb: :flashlight: :izakaya_lantern: :notebook_with_decorative_cover: :closed_book: :book: :green_book: :blue_book: :orange_book: :books: :notebook: :ledger: :page_with_curl: :scroll: :page_facing_up: :newspaper: :newspaper2: :bookmark_tabs: :bookmark: :label: :moneybag: :yen: :dollar: :euro: :pound: :money_with_wings: :credit_card: :envelope: :e-mail: :incoming_envelope: :envelope_with_arrow: :outbox_tray: :inbox_tray: :package: :mailbox: :mailbox_closed: :mailbox_with_mail: :mailbox_with_no_mail: :postbox: :ballot_box: :pencil2: :black_nib: :pen_fountain: :pen_ballpoint: :paintbrush: :crayon: :pencil: :file_folder: :open_file_folder: :dividers: :date: :calendar: :notepad_spiral: :calendar_spiral: :card_index: :chart_with_upwards_trend: :chart_with_downwards_trend: :bar_chart: :clipboard: :pushpin: :round_pushpin: :paperclip: :paperclips: :straight_ruler: :triangular_ruler: :scissors: :card_box: :file_cabinet: :wastebasket: :lock: :unlock: :lock_with_ink_pen: :closed_lock_with_key: :key: :key2: :hammer: :pick: :hammer_pick: :tools: :dagger: :crossed_swords: :gun: :shield: :wrench: :nut_and_bolt: :gear: :compression: :alembic: :scales: :link: :chains: :syringe: :pill: :smoking: :coffin: :urn: :moyai: :oil: :crystal_ball: :shopping_cart: :triangular_flag_on_post: :crossed_flags: :flag_black: :flag_white: :rainbow_flag:".split(" ")
                },
                activity: {
                    header: ":football:",
                    content: ":space_invader: :levitate: :fencer: :horse_racing: :horse_racing_tone1: :horse_racing_tone2: :horse_racing_tone3: :horse_racing_tone4: :horse_racing_tone5: :skier: :snowboarder: :golfer: :surfer: :surfer_tone1: :surfer_tone2: :surfer_tone3: :surfer_tone4: :surfer_tone5: :rowboat: :rowboat_tone1: :rowboat_tone2: :rowboat_tone3: :rowboat_tone4: :rowboat_tone5: :swimmer: :swimmer_tone1: :swimmer_tone2: :swimmer_tone3: :swimmer_tone4: :swimmer_tone5: :basketball_player: :basketball_player_tone1: :basketball_player_tone2: :basketball_player_tone3: :basketball_player_tone4: :basketball_player_tone5: :lifter: :lifter_tone1: :lifter_tone2: :lifter_tone3: :lifter_tone4: :lifter_tone5: :bicyclist: :bicyclist_tone1: :bicyclist_tone2: :bicyclist_tone3: :bicyclist_tone4: :bicyclist_tone5: :mountain_bicyclist: :mountain_bicyclist_tone1: :mountain_bicyclist_tone2: :mountain_bicyclist_tone3: :mountain_bicyclist_tone4: :mountain_bicyclist_tone5: :cartwheel: :cartwheel_tone1: :cartwheel_tone2: :cartwheel_tone3: :cartwheel_tone4: :cartwheel_tone5: :wrestlers: :wrestlers_tone1: :wrestlers_tone2: :wrestlers_tone3: :wrestlers_tone4: :wrestlers_tone5: :water_polo: :water_polo_tone1: :water_polo_tone2: :water_polo_tone3: :water_polo_tone4: :water_polo_tone5: :handball: :handball_tone1: :handball_tone2: :handball_tone3: :handball_tone4: :handball_tone5: :juggling: :juggling_tone1: :juggling_tone2: :juggling_tone3: :juggling_tone4: :juggling_tone5: :circus_tent: :performing_arts: :art: :slot_machine: :bath: :bath_tone1: :bath_tone2: :bath_tone3: :bath_tone4: :bath_tone5: :reminder_ribbon: :tickets: :ticket: :military_medal: :trophy: :medal: :first_place: :second_place: :third_place: :soccer: :baseball: :basketball: :volleyball: :football: :rugby_football: :tennis: :8ball: :bowling: :cricket: :field_hockey: :hockey: :ping_pong: :badminton: :boxing_glove: :martial_arts_uniform: :goal: :dart: :golf: :ice_skate: :fishing_pole_and_fish: :running_shirt_with_sash: :ski: :video_game: :game_die: :musical_score: :microphone: :headphones: :saxophone: :guitar: :musical_keyboard: :trumpet: :violin: :drum: :clapper: :bow_and_arrow:".split(" ")
                },
                travel: {
                    header: ":red_car:",
                    content: ":race_car: :motorcycle: :japan: :mountain_snow: :mountain: :volcano: :mount_fuji: :camping: :beach: :desert: :island: :park: :stadium: :classical_building: :construction_site: :homes: :cityscape: :house_abandoned: :house: :house_with_garden: :office: :post_office: :european_post_office: :hospital: :bank: :hotel: :love_hotel: :convenience_store: :school: :department_store: :factory: :japanese_castle: :european_castle: :wedding: :tokyo_tower: :statue_of_liberty: :church: :mosque: :synagogue: :shinto_shrine: :kaaba: :fountain: :tent: :foggy: :night_with_stars: :sunrise_over_mountains: :sunrise: :city_dusk: :city_sunset: :bridge_at_night: :milky_way: :carousel_horse: :ferris_wheel: :roller_coaster: :steam_locomotive: :railway_car: :bullettrain_side: :bullettrain_front: :train2: :metro: :light_rail: :station: :tram: :monorail: :mountain_railway: :train: :bus: :oncoming_bus: :trolleybus: :minibus: :ambulance: :fire_engine: :police_car: :oncoming_police_car: :taxi: :oncoming_taxi: :red_car: :oncoming_automobile: :blue_car: :truck: :articulated_lorry: :tractor: :bike: :scooter: :motor_scooter: :busstop: :motorway: :railway_track: :fuelpump: :rotating_light: :traffic_light: :vertical_traffic_light: :construction: :anchor: :sailboat: :canoe: :speedboat: :cruise_ship: :ferry: :motorboat: :ship: :airplane: :airplane_small: :airplane_departure: :airplane_arriving: :seat: :helicopter: :suspension_railway: :mountain_cableway: :aerial_tramway: :rocket: :satellite_orbital: :stars: :rainbow: :fireworks: :sparkler: :rice_scene: :checkered_flag:".split(" ")
                },
                symbols: {
                    header: ":hash:",
                    content: ":100: :1234: :eye_in_speech_bubble: :cupid: :heart: :heartbeat: :broken_heart: :two_hearts: :sparkling_heart: :heartpulse: :blue_heart: :green_heart: :yellow_heart: :purple_heart: :black_heart: :gift_heart: :revolving_hearts: :heart_decoration: :heart_exclamation: :anger: :boom: :dizzy: :speech_balloon: :speech_left: :anger_right: :thought_balloon: :white_flower: :globe_with_meridians: :hotsprings: :octagonal_sign: :clock12: :clock1230: :clock1: :clock130: :clock2: :clock230: :clock3: :clock330: :clock4: :clock430: :clock5: :clock530: :clock6: :clock630: :clock7: :clock730: :clock8: :clock830: :clock9: :clock930: :clock10: :clock1030: :clock11: :clock1130: :cyclone: :spades: :hearts: :diamonds: :clubs: :black_joker: :mahjong: :flower_playing_cards: :mute: :speaker: :sound: :loud_sound: :loudspeaker: :mega: :bell: :no_bell: :musical_note: :notes: :chart: :currency_exchange: :heavy_dollar_sign: :atm: :put_litter_in_its_place: :potable_water: :wheelchair: :mens: :womens: :restroom: :baby_symbol: :wc: :passport_control: :customs: :baggage_claim: :left_luggage: :warning: :children_crossing: :no_entry: :no_entry_sign: :no_bicycles: :no_smoking: :do_not_litter: :non-potable_water: :no_pedestrians: :no_mobile_phones: :underage: :radioactive: :biohazard: :arrow_up: :arrow_upper_right: :arrow_right: :arrow_lower_right: :arrow_down: :arrow_lower_left: :arrow_left: :arrow_upper_left: :arrow_up_down: :left_right_arrow: :leftwards_arrow_with_hook: :arrow_right_hook: :arrow_heading_up: :arrow_heading_down: :arrows_clockwise: :arrows_counterclockwise: :back: :end: :on: :soon: :top: :place_of_worship: :atom: :om_symbol: :star_of_david: :wheel_of_dharma: :yin_yang: :cross: :orthodox_cross: :star_and_crescent: :peace: :menorah: :six_pointed_star: :aries: :taurus: :gemini: :cancer: :leo: :virgo: :libra: :scorpius: :sagittarius: :capricorn: :aquarius: :pisces: :ophiuchus: :twisted_rightwards_arrows: :repeat: :repeat_one: :arrow_forward: :fast_forward: :track_next: :play_pause: :arrow_backward: :rewind: :track_previous: :arrow_up_small: :arrow_double_up: :arrow_down_small: :arrow_double_down: :pause_button: :stop_button: :record_button: :eject: :cinema: :low_brightness: :high_brightness: :signal_strength: :vibration_mode: :mobile_phone_off: :recycle: :name_badge: :fleur-de-lis: :beginner: :trident: :o: :white_check_mark: :ballot_box_with_check: :heavy_check_mark: :heavy_multiplication_x: :x: :negative_squared_cross_mark: :heavy_plus_sign: :heavy_minus_sign: :heavy_division_sign: :curly_loop: :loop: :part_alternation_mark: :eight_spoked_asterisk: :eight_pointed_black_star: :sparkle: :bangbang: :interrobang: :question: :grey_question: :grey_exclamation: :exclamation: :wavy_dash: :copyright: :registered: :tm: :hash: :asterisk: :zero: :one: :two: :three: :four: :five: :six: :seven: :eight: :nine: :keycap_ten: :capital_abcd: :abcd: :symbols: :abc: :a: :ab: :b: :cl: :cool: :free: :information_source: :id: :m: :new: :ng: :o2: :ok: :parking: :sos: :up: :vs: :koko: :sa: :u6708: :u6709: :u6307: :ideograph_advantage: :u5272: :u7121: :u7981: :accept: :u7533: :u5408: :u7a7a: :congratulations: :secret: :u55b6: :u6e80: :black_small_square: :white_small_square: :white_medium_square: :black_medium_square: :white_medium_small_square: :black_medium_small_square: :black_large_square: :white_large_square: :large_orange_diamond: :large_blue_diamond: :small_orange_diamond: :small_blue_diamond: :small_red_triangle: :small_red_triangle_down: :diamond_shape_with_a_dot_inside: :radio_button: :black_square_button: :white_square_button: :white_circle: :black_circle: :red_circle: :blue_circle: :regional_indicator_z: :regional_indicator_y: :regional_indicator_x: :regional_indicator_w: :regional_indicator_v: :regional_indicator_u: :regional_indicator_t: :regional_indicator_s: :regional_indicator_r: :regional_indicator_q: :regional_indicator_p: :regional_indicator_o: :regional_indicator_n: :regional_indicator_m: :regional_indicator_l: :regional_indicator_k: :regional_indicator_j: :regional_indicator_i: :regional_indicator_h: :regional_indicator_g: :regional_indicator_f: :regional_indicator_e: :regional_indicator_d: :regional_indicator_c: :regional_indicator_b: :regional_indicator_a:".split(" ")
                },
                flags: {
                    header: ":flag_black:",
                    content: ":flag_ac: :flag_ad: :flag_ae: :flag_af: :flag_ag: :flag_ai: :flag_al: :flag_am: :flag_ao: :flag_aq: :flag_ar: :flag_as: :flag_at: :flag_au: :flag_aw: :flag_ax: :flag_az: :flag_ba: :flag_bb: :flag_bd: :flag_be: :flag_bf: :flag_bg: :flag_bh: :flag_bi: :flag_bj: :flag_bl: :flag_bm: :flag_bn: :flag_bo: :flag_bq: :flag_br: :flag_bs: :flag_bt: :flag_bv: :flag_bw: :flag_by: :flag_bz: :flag_ca: :flag_cc: :flag_cd: :flag_cf: :flag_cg: :flag_ch: :flag_ci: :flag_ck: :flag_cl: :flag_cm: :flag_cn: :flag_co: :flag_cp: :flag_cr: :flag_cu: :flag_cv: :flag_cw: :flag_cx: :flag_cy: :flag_cz: :flag_de: :flag_dg: :flag_dj: :flag_dk: :flag_dm: :flag_do: :flag_dz: :flag_ea: :flag_ec: :flag_ee: :flag_eg: :flag_eh: :flag_er: :flag_es: :flag_et: :flag_eu: :flag_fi: :flag_fj: :flag_fk: :flag_fm: :flag_fo: :flag_fr: :flag_ga: :flag_gb: :flag_gd: :flag_ge: :flag_gf: :flag_gg: :flag_gh: :flag_gi: :flag_gl: :flag_gm: :flag_gn: :flag_gp: :flag_gq: :flag_gr: :flag_gs: :flag_gt: :flag_gu: :flag_gw: :flag_gy: :flag_hk: :flag_hm: :flag_hn: :flag_hr: :flag_ht: :flag_hu: :flag_ic: :flag_id: :flag_ie: :flag_il: :flag_im: :flag_in: :flag_io: :flag_iq: :flag_ir: :flag_is: :flag_it: :flag_je: :flag_jm: :flag_jo: :flag_jp: :flag_ke: :flag_kg: :flag_kh: :flag_ki: :flag_km: :flag_kn: :flag_kp: :flag_kr: :flag_kw: :flag_ky: :flag_kz: :flag_la: :flag_lb: :flag_lc: :flag_li: :flag_lk: :flag_lr: :flag_ls: :flag_lt: :flag_lu: :flag_lv: :flag_ly: :flag_ma: :flag_mc: :flag_md: :flag_me: :flag_mf: :flag_mg: :flag_mh: :flag_mk: :flag_ml: :flag_mm: :flag_mn: :flag_mo: :flag_mp: :flag_mq: :flag_mr: :flag_ms: :flag_mt: :flag_mu: :flag_mv: :flag_mw: :flag_mx: :flag_my: :flag_mz: :flag_na: :flag_nc: :flag_ne: :flag_nf: :flag_ng: :flag_ni: :flag_nl: :flag_no: :flag_np: :flag_nr: :flag_nu: :flag_nz: :flag_om: :flag_pa: :flag_pe: :flag_pf: :flag_pg: :flag_ph: :flag_pk: :flag_pl: :flag_pm: :flag_pn: :flag_pr: :flag_ps: :flag_pt: :flag_pw: :flag_py: :flag_qa: :flag_re: :flag_ro: :flag_rs: :flag_ru: :flag_rw: :flag_sa: :flag_sb: :flag_sc: :flag_sd: :flag_se: :flag_sg: :flag_sh: :flag_si: :flag_sj: :flag_sk: :flag_sl: :flag_sm: :flag_sn: :flag_so: :flag_sr: :flag_ss: :flag_st: :flag_sv: :flag_sx: :flag_sy: :flag_sz: :flag_ta: :flag_tc: :flag_td: :flag_tf: :flag_tg: :flag_th: :flag_tj: :flag_tk: :flag_tl: :flag_tm: :flag_tn: :flag_to: :flag_tr: :flag_tt: :flag_tv: :flag_tw: :flag_tz: :flag_ua: :flag_ug: :flag_um: :flag_us: :flag_uy: :flag_uz: :flag_va: :flag_vc: :flag_ve: :flag_vg: :flag_vi: :flag_vn: :flag_vu: :flag_wf: :flag_ws: :flag_xk: :flag_ye: :flag_yt: :flag_za: :flag_zm: :flag_zw:".split(" ")
                }
            };
        Ja.prototype = new EventEmitter;
        Ja.prototype.init = function() {
            var a = this,
                b = (new Date).getTime();
            this.forceDisconnected = this.disconnect = z.connected = !1;
            this.removeAllListeners();
            this.socket && (this.socket.removeAllListeners(), this.socket.disconnect());
            null === D.windowId && ya.handleWindowId();
            null !== D.windowId && "null" !== D.windowId || d.loggingHandler.logIncident("windowId is null", {
                windowId: D.windowId,
                type: typeof D.windowId
            });
            var c = {
                k: y.sessionKey,
                u: ea.uuid,
                uv: ea.uuidVer,
                a: sa.pageId,
                cver: N.chatVersion,
                pop: f.isPopup,
                jv: y.currentVersion,
                asver: y.pageStatusVersion,
                ust: $_Tawk_Unstable
            };
            c.p && 255 < c.p.length && (c.p = c.p.substring(0, 255));
            this.socket = new $__TawkSocket("wss://" + y.visitorSocketServer + "/", {
                engineIo: $__TawkEngine,
                path: "/s",
                query: c
            });
            this.socket.on("disconnect", function() {
                a.disconnectHandler()
            });
            this.socket.on("error", function(e) {
                var g = "socket on error";
                if (e instanceof Error) {
                    var h = {
                        toString: e.toString(),
                        stack: e.stack,
                        lineNumber: e.lineNumber,
                        fileName: e.fileName
                    };
                    if (d.loggingHandler.unloading && -1 === h.toString.indexOf("post")) return;
                    "TransportError" === e.type && (h.description = e.description); - 1 !== h.toString.indexOf("post") && (g = "socket post error")
                } else h = e;
                d.loggingHandler.logIncident(g, h);
                a.socket.disconnect();
                a.disconnectHandler()
            });
            this.socket.on("connect", function() {
                a.disconnect = !1
            });
            this.socket.on("ready", function(e, g, h) {
                if (!d) return a.disconnectSocket();
                a.selfOrigin = e;
                z.connected = !0;
                a.ready || (z.loaded = !0, "undefined" !== typeof $_Tawk_LoadStart && d.loggingHandler.logPerformance({
                    socket: (new Date).getTime() - b,
                    register: za.registerTime,
                    widget: (new Date).getTime() - $_Tawk_LoadStart,
                    script: (new Date).getTime() - r,
                    download: r - $_Tawk_LoadStart
                }));
                a.ready = !0;
                try {
                    d.eventEmitter.emit("syncConversation", g)
                } catch (m) {
                    ma.handleError("Unable to emit syncConversation", m.fileName, m.lineNumber, m.stack)
                }
                try {
                    d.eventEmitter.emit("pageStatusUpdated", h)
                } catch (m) {
                    ma.handleError("Unable to emit pageStatusUpdated", m.fileName, m.lineNumber, m.stack)
                }
                try {
                    d.eventEmitter.emit("socketReady")
                } catch (m) {
                    ma.handleError("Unable to emit socketReady", m.fileName, m.lineNumber,
                        m.stack)
                }
                clearTimeout(a.clearRegisterRetryTimeout);
                a.clearRegisterRetryTimeout = setTimeout(function() {
                    a.disconnect || za.resetRetryCount();
                    a.clearRegisterRetryTimeout = null
                }, 5E3)
            });
            this.socket.on("remoteDisconnect", function(e) {
                e = e || {};
                if ("BANNED" === e.msg) {
                    a.banned = !0;
                    try {
                        a.socket.disconnect()
                    } catch (g) {
                        ma.handleError("Unable to emit disconnect socket on ban", g.fileName, g.lineNumber, g.stack)
                    }
                    d.main.hideWidget()
                } else a.socket.disconnect(), a.disconnectHandler()
            });
            this.addEventListeners()
        };
        Ja.prototype.addEventListeners =
            function() {
                function a(c, e) {
                    try {
                        d.eventEmitter.emit(c, e)
                    } catch (g) {
                        ma.handleError("Unable to emit socket event : " + c + " with data : " + JSON.stringify(e), g.fileName, g.lineNumber, g.stack)
                    }
                }
                var b = this;
                this.socket.on("visitorChatWindowState", function(c) {
                    b.selfOrigin !== c.origin && a("windowStateUpdated", c)
                });
                this.socket.on("visitorDataUpdate", function(c) {
                    b.selfOrigin !== c.origin && a("visitorDataUpdate", c)
                });
                this.socket.on("visitorSound", function(c) {
                    c.origin !== b.selfOrigin && d.chatHandler.toggleSound(!!c.sdo)
                });
                this.socket.on("visitorMessage", function(c) {
                    b.selfOrigin !== c.origin && a("incomingMessage", c)
                });
                this.socket.on("visitorConversationPresenceUpdate", function(c) {
                    a("incomingMessage", c)
                });
                this.socket.on("pageStatus", function(c) {
                    a("pageStatusUpdated", c)
                });
                this.socket.on("newCriticalUpdate", function(c) {
                    c = c || 0;
                    c != y.criticalVersion && d.main.criticalRefresh(c, !0)
                });
                this.socket.on("newUnstableCriticalUpdate", function(c) {
                    c = c || 0;
                    $_Tawk_Unstable && c != y.criticalVersion && d.main.criticalRefresh(c, !0)
                });
                this.socket.on("visitorPopupFocus",
                    function(c) {
                        c = c || {};
                        a("visitorPopupFocus", !!c.hasFocus)
                    });
                this.socket.on("chatBubbleClosed", function(c) {
                    c.origin !== b.selfOrigin && a("chatBubbleClosed", !0)
                });
                this.socket.on("agentIsTyping", function(c) {
                    a("agentIsTyping", c)
                });
                this.socket.on("agentStopedTyping", function(c) {
                    a("agentStopedTyping", c)
                });
                this.socket.on("pageDisable", function() {
                    a("removeWidget")
                });
                this.socket.on("widgetScheduleUpdate", function(c) {
                    a("scheduleUpdate", c)
                });
                this.socket.on("uploadProgress", function(c) {
                    a("fileUploadProgress", c)
                });
                this.socket.on("uploadFinished", function(c) {
                    a("fileUploadFinished", c)
                });
                this.socket.on("uploadError", function(c) {
                    a("fileUploadError", c)
                });
                this.socket.on("vCallStatus", function(c) {
                    a("webrtcCallStatus", c)
                });
                this.socket.on("visitorChatSeen", function(c) {
                    a("visitorChatSeen", c)
                });
                this.socket.on("visitorChatDismiss", function(c) {
                    a("visitorChatDismiss", c)
                });
                this.socket.on("visitorTagsUpdate", function(c) {
                    a("visitorTagsUpdate", c)
                });
                this.on("notifyWindowState", function(c) {
                    b.chatWindowStates[c] && b.socket.send("chatWindowState",
                        c)
                });
                this.on("notifyChatBubbleClosed", function() {
                    b.socket.send("chatBubbleClose")
                });
                this.on("notifyMessagePreview", function(c) {
                    b.socket.send("messagePreview", c, (new Date).getTime())
                });
                this.on("sendChatMessage", function(c, e) {
                    b.socket.send("chatMessage", c, e)
                });
                this.on("notifyNameChange", function(c, e) {
                    b.socket.send("saveNameChangeForm", c, e)
                });
                this.on("notifyEmailTranscript", function(c, e) {
                    b.socket.send("saveTranscriptEmailForm", c, e)
                });
                this.on("notifyEndChatTranscript", function(c, e) {
                    b.socket.send("sendTranscript",
                        c, e)
                });
                this.on("notifyOfflineMessage", function(c, e) {
                    b.socket.send("service", "visitor-chat", "/v1/visitor/offline-form", c, e)
                });
                this.on("visitorChatSeen", function(c, e) {
                    this.socket.send("service", "visitor-chat", "/v1/visitor/messages-seen", c, e)
                });
                this.on("visitorChatDismiss", function(c, e) {
                    this.socket.send("service", "visitor-chat", "/v1/visitor/dismiss-preview", c, e)
                });
                this.on("notifyPrechat", function(c, e) {
                    b.socket.send("savePrechatForm", c, e)
                });
                this.on("setRating", function(c) {
                    b.socket.send("visitorRating",
                        c)
                });
                this.on("toggleSound", function(c) {
                    b.socket.send("visitorSound", c)
                });
                this.on("notifyWidgetResized", function() {
                    b.socket.send("chatWindowResize")
                });
                this.on("popupOnFocus", function(c) {
                    b.socket.send("visitorPopupFocus", c)
                });
                this.on("notifySocketStatusUpdate", function(c) {
                    b.socket.send("socketStatusUpdate", c)
                });
                this.on("saveForeignKey", function(c, e) {
                    b.socket.send("saveForeignKey", c, e)
                });
                this.on("saveConversion", function(c, e) {
                    b.socket.send("saveConversion", c, e)
                });
                this.on("submitMultipleOptions", function(c,
                    e) {
                    b.socket.send("saveMultipleOptions", c, e)
                });
                this.on("endVisitorChat", function(c, e) {
                    b.socket.send("endChat", e)
                });
                this.on("fileUploadMessage", function(c, e) {
                    b.socket.send("fileUploadMessage", c, e)
                });
                this.on("addEvent", function(c, e) {
                    b.socket.send("addEvent", c, e)
                });
                this.on("setAttributes", function(c, e) {
                    b.socket.send("setAttributes", c, e)
                });
                this.on("addTags", function(c, e) {
                    b.socket.send("addTags", c, e)
                });
                this.on("removeTags", function(c, e) {
                    b.socket.send("removeTags", c, e)
                });
                this.on("getWebRTCToken", function(c,
                    e) {
                    this.socket.send("service", "webrtc", "/v1/vcall/init/visitor", c, e)
                });
                this.on("getCallStatus", function(c, e) {
                    this.socket.send("service", "webrtc", "/v1/vcall/status/visitor", c, e)
                });
                this.on("declineCall", function(c, e) {
                    this.socket.send("service", "webrtc", "/v1/vcall/reject/visitor", c, e)
                });
                this.on("nav", function(c, e) {
                    this.socket.send("nav", c, e)
                })
            };
        Ja.prototype.disconnectSocket = function() {
            this.forceDisconnected = !0;
            this.socket && (this.socket.disconnect(), this.disconnectHandler())
        };
        Ja.prototype.disconnectHandler =
            function() {
                z.connected = !1;
                this.socket.removeAllListeners();
                this.removeAllListeners();
                d.scheduler.cleanUp();
                this.banned || this.forceDisconnected || this.disconnect || (this.disconnect = !0, za.retryRegister())
            };
        ca.prototype.addChildViews = function(a) {
            var b = this;
            a.forEach(function(c) {
                b.childViews.push(c)
            })
        };
        ca.prototype.buildView = function(a) {
            this.documentRef = a || this.documentRef;
            this.elementReferrer = l.createElement(this.documentRef, this.tagName, this.attributes, this.style, this.template);
            this.elementReferrer.className +=
                this.classNames.join(" ");
            this.isIframe || this.buildChildViews();
            return this.elementReferrer
        };
        ca.prototype.buildChildViews = function(a) {
            var b = this;
            this.childViews.length && (this.documentRef = a || this.documentRef, this.childViews.forEach(function(c) {
                b.elementReferrer.appendChild(c.buildView(b.documentRef))
            }))
        };
        ca.prototype.restyle = function(a, b) {
            b && (-1 === b.indexOf("!important") && (b += " !important"), this.elementReferrer ? this.elementReferrer.style.cssText += ";" + a + ":" + b : this.style += ";" + a + ":" + b)
        };
        ca.prototype.attachUserEventListener =
            function(a, b, c, e) {
                var g;
                if (g = c ? this.getElementById(c) : this.elementReferrer) c = a.split(" "), 1 < c.length ? c.forEach(function(h) {
                    d.eventHandler.listen(g, h, b, h + e)
                }) : d.eventHandler.listen(g, a, b, e)
            };
        ca.prototype.toggle = function() {
            this.isVisible ? (this.restyle("display", "none !important"), this.isVisible = !1) : (this.restyle("display", "block !important"), this.isVisible = !0)
        };
        ca.prototype.getElementById = function(a) {
            return this.elementReferrer ? this.documentRef.getElementById(a) : null
        };
        ca.prototype.insertHtml = function(a) {
            this.elementReferrer.innerHTML =
                a
        };
        ca.prototype.clear = function() {
            this.elementReferrer && (this.elementReferrer.outerHTML = "", this.elementReferrer = null)
        };
        ca.prototype.addClass = function(a) {
            -1 === this.classNames.indexOf(a) && (this.classNames.push(a), this.elementReferrer && (this.elementReferrer.className = this.classNames.join(" ")))
        };
        ca.prototype.removeClass = function(a) {
            for (; - 1 !== this.classNames.indexOf(a);) this.classNames.splice(this.classNames.indexOf(a), 1);
            this.elementReferrer && (this.elementReferrer.className = this.classNames.join(" "))
        };
        ca.prototype.hide = function() {
            this.restyle("display", "none !important");
            this.isVisible = !1
        };
        ca.prototype.show = function() {
            this.restyle("display", "block !important");
            this.isVisible = !0
        };
        ca.prototype.insertCssFile = function(a, b) {
            var c = this.documentRef.getElementsByTagName("head")[0],
                e = this.documentRef.createDocumentFragment(),
                g = l.createElement(this.documentRef, "style", {
                    type: "text/css"
                });
            a = this.documentRef.createTextNode(b ? a : d.ResetStyle + "" + a);
            e.appendChild(g);
            c.appendChild(e);
            g.styleSheet ? g.styleSheet.cssText =
                a.nodeValue : g.appendChild(a)
        };
        ca.prototype.massRestyle = function(a) {
            for (var b in a) a.hasOwnProperty(b) && this.restyle(b, a[b])
        };
        qa.prototype = new ca;
        qa.prototype.constructor = qa;
        qa.prototype.parent = ca.prototype;
        qa.prototype.buildIframe = function(a, b) {
            this.documentRef = l.getDocument(this.elementReferrer);
            if (D.isIE) this.documentRef.open(), this.documentRef.writeln('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /></head><body></body></html>'),
                this.documentRef.close();
            else {
                this.documentRef.open();
                this.documentRef.close();
                var c = document.implementation.createDocumentType("html", "", "");
                this.documentRef.insertBefore(c, this.documentRef.childNodes[0]);
                this.documentRef.head.innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /></head>'
            }
            b || l.updateFontStylesheet(this.documentRef);
            this.insertCssFile(a);
            this.insertContent();
            this.buildChildViews()
        };
        qa.prototype.insertContent = function() {
            this.documentRef.body.innerHTML = this.template
        };
        qa.prototype.buildChildViews = function() {
            var a = this;
            this.childViews.forEach(function(b) {
                a.documentRef.body.appendChild(b.buildView(a.documentRef))
            })
        };
        Ea.prototype.buildForm = function() {
            this.formData.additionalFields = [];
            this.insertTranslatedTexts()
        };
        Ea.prototype.buildView = function(a) {
            this.documentRef = a || this.documentRef;
            return this.elementReferrer = l.createElement(this.documentRef, "div", this.attributes,
                null, this.template)
        };
        Ea.prototype.addPlaceholderText = function(a, b, c, e, g) {
            g = new RegExp("__" + a.toUpperCase() + "_PLACEHOLDER__", "gm");
            a.toUpperCase();
            a = new RegExp("__" + a.toUpperCase() + "__", "gm");
            var h = d.languageParser.translate("form", c + "Placeholder");
            D.isPlaceholderSupported || b || (b = h);
            h && h !== c + "Placeholder" || (h = b, b = "");
            if (e) return l.escapeTemplateReplacement(e, [{
                placeholder: g,
                textReplace: h
            }, {
                placeholder: a,
                textReplace: b
            }]);
            this.template = l.escapeTemplateReplacement(this.template, [{
                    placeholder: g,
                    textReplace: h
                },
                {
                    placeholder: a,
                    textReplace: b
                }
            ])
        };
        Ea.prototype.addPlaceholderHandler = function() {
            var a, b = this;
            D.isPlaceholderSupported || (a = this.formData.fields) && a.forEach(function(c) {
                if ("input" === c.type && (!c.isEnabled || c.isEnabled())) {
                    var e = c.getValue ? c.getValue() : "";
                    if ("input" === c.type && l.isArray(e)) e.forEach(function(m, n) {
                        g = b.documentRef.getElementById(c.fieldName + n);
                        h = m;
                        l.togglePlaceholderText(g, h, c.fieldName + n);
                        "textarea" !== g.tagName.toLowerCase() || l.trim(g.value) || (g.value = h)
                    });
                    else if (!c.hiddenIE8) {
                        var g = b.documentRef.getElementById(c.fieldName +
                            "Field");
                        var h = d.languageParser.translate("form", c.languageKey + "Placeholder");
                        l.togglePlaceholderText(g, h, c.fieldName + "Field");
                        "textarea" !== g.tagName.toLowerCase() || l.trim(g.value) || (g.value = h)
                    }
                }
            })
        };
        Ea.prototype.insertTranslatedTexts = function() {
            var a = this,
                b = "";
            (this.formData.fields || []).forEach(function(c) {
                var e = c.getValue ? c.getValue() : "";
                a.addPlaceholderText(c.fieldName, e, c.languageKey, null, c.labelText)
            });
            this.template = l.escapeTemplateReplacement(this.template, [{
                placeholder: "__TITLE__",
                textReplace: this.formData.getTitle ?
                    this.formData.getTitle() : d.languageParser.translate("form", this.formData.title)
            }, {
                placeholder: "__OVERLAY__",
                textReplace: d.languageParser.translate("overlay", this.formData.overlayMessage)
            }, {
                placeholder: "__CANCEL_BUTTON__",
                textReplace: d.languageParser.translate("form", "CancelButton")
            }, {
                placeholder: "__CLOSE_BUTTON__",
                textReplace: d.languageParser.translate("form", "CloseButton")
            }, {
                placeholder: "__SAVE_BUTTON__",
                textReplace: d.languageParser.translate("form", "SaveButton")
            }, {
                placeholder: "__SEND_BUTTON__",
                textReplace: d.languageParser.translate("form", "SendButton")
            }, {
                placeholder: "__SUBMIT_BUTTON__",
                textReplace: d.languageParser.translate("form", "SubmitButton")
            }, {
                placeholder: "__START_CHAT_BUTTON__",
                textReplace: d.languageParser.translate("form", "StartChatButton")
            }, {
                placeholder: "__END_CHAT_BUTTON__",
                textReplace: d.languageParser.translate("rollover", "end")
            }, {
                placeholder: "__SUBMITTING_INDICATOR__",
                textReplace: d.languageParser.translate("form", "SubmittingProcess")
            }, {
                placeholder: "__ENDING_INDICATOR__",
                textReplace: d.languageParser.translate("form",
                    "EndingProcess")
            }, {
                placeholder: "__SENDING_INDICATOR__",
                textReplace: d.languageParser.translate("form", "SendingProcess")
            }, {
                placeholder: "__SAVING_INDICATOR__",
                textReplace: d.languageParser.translate("form", "SavingProcess")
            }, {
                placeholder: "__EMAIL_TRANSCRIPT_TO__",
                textReplace: d.languageParser.translate("form", "EmailTranscriptTo")
            }, {
                placeholder: "__OFFLINE_MESSAGE_SUCCESSFULY_SENT__",
                textReplace: d.languageParser.translate("form", "OfflineMessageSent")
            }, {
                placeholder: "__SEND_AGAIN__",
                textReplace: d.languageParser.translate("form",
                    "sendAgain")
            }, {
                placeholder: /__STATUS__/gm,
                textReplace: d.languageParser.translate("form", "saving")
            }, {
                placeholder: "__CHANGE_NAME__",
                textReplace: d.languageParser.translate("menu", "change_name")
            }, {
                placeholder: /__SAFARI__/gm,
                textReplace: "safari" === D.vendor ? "safari-fix" : ""
            }, {
                placeholder: /__SKIP_BUTTON__/,
                textReplace: d.languageParser.translate("chat", "skip")
            }, {
                placeholder: "__START_CHAT__",
                textReplace: d.languageParser.translate("chat", "newChat")
            }, {
                placeholder: "__EMAIL_TRANCRIPT__",
                textReplace: d.languageParser.translate("rollover",
                    "emailTranscriptOption")
            }, {
                placeholder: "__END_CHAT_MESSAGE__",
                textReplace: d.languageParser.translate("form", "EndChatMessage")
            }]);
            this.template = "safari" === D.vendor || "chrome" === D.vendor || "firefox" === D.vendor || "mozilla" === D.vendor || D.isIE && 8 <= D.version ? this.template.replace("__NON_MODERN__", "") : this.template.replace("__NON_MODERN__", "other-fix");
            D.mobileBrowserName && (b = l.escapeTemplateReplacement(U["close-form-button"], [{
                placeholder: "__CLOSE_BUTTON__",
                textReplace: d.languageParser.translate("form", "CloseButton")
            }]));
            this.template = l.escapeTemplateReplacement(this.template, [{
                placeholder: "__CLOSE_BUTTON_CONTAINER__",
                textReplace: b
            }]);
            this.formData.customButtons && (this.template = l.escapeTemplateReplacement(this.template, this.formData.customButtons()))
        };
        va.prototype = new Ea;
        va.prototype.constructor = va;
        va.prototype.parent = Ea.prototype;
        va.prototype.buildForm = function() {
            var a = [];
            var b = "preChatForm" == this.formName ? "prechat" : "offline";
            this.formData.additionalFields = [];
            this.insertTranslatedTexts();
            if (null === this.formData.dynamicFields &&
                f[b + "Options"] && f[b + "Options"].fields) {
                for (var c = 0, e = f[b + "Options"].fields.length; c < e; c++) {
                    var g = {},
                        h = f[b + "Options"].fields[c];
                    h.id = b + c;
                    g.label = h.label;
                    g.instantValidation = !1;
                    g.isRequired = h.isRequired;
                    g.fieldName = b + c;
                    g.fieldType = h.type;
                    g.validation = "isValidString";
                    "name" === h.type ? (g.valueMaxLength = 40, g.getValue = d.visitorHandler.getNameValue, g.languageKey = "Name") : "email" === h.type ? (g.valueMaxLength = 150, g.getValue = d.visitorHandler.getEmailValue, g.validation = "isValidEmail", g.languageKey = "Email") : "message" ===
                        h.type || "textarea" === h.type ? g.valueMaxLength = 500 : "text" === h.type ? g.valueMaxLength = 150 : "department" === h.type ? g.getValue = d.sessionHandler.getDeparmentOptions : "checkbox" === h.type || "radio" === h.type ? (g.type = "options", g.selections = h.selections) : "phone" === h.type && (g.valueMaxLength = 20, g.validation = "isValidPhone", g.languageKey = "Phone");
                    g.isRequired && !g.languageKey && (g.languageKey = "Required");
                    a.push(g)
                }
                this.formData.dynamicFields = a
            }
            this.generateDynamicFields()
        };
        va.prototype.generateDynamicFields = function() {
            var a =
                "",
                b = /__LABEL__/gm,
                c = /__ID__/gm,
                e = /__MAXLENGTH__/gm;
            if (this.formData && this.formData.dynamicFields)
                for (var g = 0, h = this.formData.dynamicFields.length; g < h; g++) {
                    var m = "",
                        n = this.formData.dynamicFields[g];
                    if ("name" === n.fieldType || "email" === n.fieldType || "phone" === n.fieldType || "text" === n.fieldType) {
                        var x = U.inputTextFieldType;
                        x = "email" === n.fieldType ? x.replace("__INPUT_TYPE__", "email") : x.replace("__INPUT_TYPE__", "text")
                    } else if ("message" === n.fieldType || "textarea" === n.fieldType) x = U.textAreaFieldType;
                    else if ("department" ===
                        n.fieldType) x = U.departmentSelection;
                    else if ("checkbox" === n.fieldType || "radio" === n.fieldType) x = U.selectionsType, m = "checkbox" === n.fieldType ? this.generateCheckboxOptions(n.fieldName, n.selections) : this.generateRadioOptions(n.fieldName, n.selections);
                    x && (x = x.replace(b, l.rawEncode(n.label) || ""), x = x.replace(c, n.fieldName || ""), x = x.replace(e, n.valueMaxLength || ""), n.isRequired ? (x = x.replace(/__REQUIRED__/gm, "*"), this.isFormRequired || (this.isFormRequired = !0)) : x = x.replace(/__REQUIRED__/gm, ""), n.getValue && ("department" ===
                        n.fieldType ? (m = this.generateDropDownOptions(n.getValue(), n.isRequired, n.label)) || (x = "") : m = n.getValue()), x = x.replace("__VALUE__", m), a += x)
                }
            this.template = this.template.replace("__FIELDS__", a)
        };
        va.prototype.generateDropDownOptions = function(a, b, c) {
            var e = "";
            if (0 === a.length) return !1;
            "preChatForm" === this.formData.id || "offlineForm" === this.formData.id ? e += '<option id="department-default" value="" disabled selected>' + (b ? "* " : "") + (c ? l.rawEncode(c) : d.languageParser.translate("form", "department")) + "</option>" : b ||
                (e += '<option value="0"></option>');
            b = 0;
            for (c = a.length; b < c; b++) e += '<option value="' + a[b].value + '"' + (a[b].selected ? 'selected="selected"' : "") + ">" + a[b].text + "</option>";
            return e
        };
        va.prototype.generateRadioOptions = function(a, b) {
            for (var c = "", e = U.radioSelectionType, g = 0, h = b.length; g < h; g++) c += e.replace(/__ID__/gm, a + "radio" + g).replace(/__FIELD_ID__/gm, a).replace(/__VALUE__/gm, l.rawEncode(b[g]));
            return c
        };
        va.prototype.generateCheckboxOptions = function(a, b) {
            for (var c = "", e = U.checkboxSelectionType, g = 0, h = b.length; g <
                h; g++) c += e.replace(/__ID__/gm, a + "check" + g).replace(/__FIELD_ID__/gm, a).replace(/__VALUE__/gm, l.rawEncode(b[g]));
            return c
        };
        va.prototype.updateName = function(a) {
            for (var b, c = 0, e = this.formData.dynamicFields.length; c < e; c++) {
                var g = this.formData.dynamicFields[c];
                if ("name" === g.fieldType) {
                    b = d.viewHandler.chatContainer.getElementById(g.fieldName + "Field");
                    break
                }
            }
            b && (b.value = a)
        };
        va.prototype.updateEmail = function(a) {
            for (var b, c = 0, e = this.formData.dynamicFields.length; c < e; c++) {
                var g = this.formData.dynamicFields[c];
                if ("email" === g.fieldType) {
                    b = d.viewHandler.chatContainer.getElementById(g.fieldName + "Field");
                    break
                }
            }
            b && (b.value = a)
        };
        va.prototype.addPlaceholderHandler = function() {
            if (!D.isPlaceholderSupported)
                for (var a = 0, b = this.formData.dynamicFields.length; a < b; a++) {
                    var c = this.formData.dynamicFields[a];
                    if ("department" !== c.fieldType && "checkbox" !== c.fieldType && "radio" !== c.fieldType) {
                        this.formData.dynamicFields[a].placeholderText = (c.isRequired ? "* " : "") + c.label;
                        var e = this.documentRef.getElementById(c.fieldName + "Field");
                        l.togglePlaceholderText(e, this.formData.dynamicFields[a].placeholderText, c.fieldName + "Field");
                        l.trim(e.value) || (e.value = this.formData.dynamicFields[a].placeholderText)
                    }
                }
        };
        Da.prototype.initIndicator = function() {
            d.viewHandler.totalUnseenMessages && this.updateUnseenMessages(d.viewHandler.totalUnseenMessages)
        };
        Da.prototype.show = function() {
            var a;
            if (!("max" === y.chatWindowState() && !f.isPopup || this.isPopupFocused && !d.viewHandler.popoutWin.closed || f.hideWidgetOnLoad || "restartChatForm" === d.formHandler.currentForm ||
                    "offlineForm" === d.formHandler.currentForm) && this.container && this.container.elementReferrer) {
                var b = this.container.getElementById("tawkchat-chat-indicator");
                if (a = this.container.getElementById("tawkchat-chat-indicator-text")) a.innerHTML = this.unansweredMessages;
                b && "block" !== b.style.display && (b.style.display = "block", b.style.visibility = "hidden", d.viewHandler.handleIndicatorToggle(!0), d.viewHandler.showWidget(), this.container.show());
                if (!(f.showMessagePreview() && d.viewHandler.messagePreview && d.viewHandler.messagePreview.isShown) ||
                    document.hidden) this.pageTitleNotification.on()
            }
        };
        Da.prototype.hide = function() {
            if (this.container && this.container.elementReferrer) {
                var a = this.container.getElementById("tawkchat-chat-indicator");
                var b = this.container.getElementById("tawkchat-chat-indicator-text");
                a && "block" === a.style.display && (a.style.display = "none", d.viewHandler.handleIndicatorToggle(), D.mobileBrowserName || this.container.hide());
                b && (b.innerHTML = "")
            }
        };
        Da.prototype.updateUnseenMessages = function(a) {
            this.unansweredMessages = a;
            v.triggerApiHandlers("onUnreadCountChanged",
                this.unansweredMessages);
            if (0 === this.unansweredMessages) this.pageTitleNotification.off();
            else if ("min" === y.chatWindowState()) this.show();
            else this.pageTitleNotification.on()
        };
        ha.prototype.init = function() {
            var a = this;
            this.container && (this.wrapper || (this.wrapper = this.container.getElementById("tawkchat-message-preview-container"), f.isRTL() && (this.wrapper.className += "rtl-direction ")), D.mobileBrowserName ? this.updateMobilePositions() : this.updatePositions(), f.chatPosition.subscribe(function() {
                a.updatePositions()
            }))
        };
        ha.prototype.show = function(a, b, c) {
            var e = this;
            0 !== a && this.container && (b || c) && (1 === a ? this.messagePreviewCount = 1 : this.messagePreviewCount++, this.messagePreviewContainer || (this.messagePreviewContainer = this.container.getElementById("tawkchat-message-preview-messages-container"), f.isCenterPositioned() ? this.messagePreviewContainer.style.maxHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight / 2 - 180) - 210 + "px" : this.messagePreviewContainer.style.maxHeight = document.documentElement.clientHeight -
                (f.minimizedDimensions().height + f.widgetOffsetY + 300) + "px", this.toggleUploadsAction(), this.toggleRatingAction(), this.toggleEmojiAction()), this.quickReplyContainer || (this.quickReplyContainer = this.container.getElementById("tawkchat-message-preview-quick-reply-container")), this.isShown = !0, this.container.restyle("display", "block"), u && u.hideBubble(), b && !D.mobileBrowserName ? this.appendMessage(b) : c && (c.isMissed ? this.appendCallInfo(c) : (this.messagePreviewCount--, this.appendCallRequest(c))), this.container.attachUserEventListener(d.viewHandler.clickEvent,
                function() {
                    d.sessionHandler.notifyWindowState("max");
                    d.viewHandler.scrollToBottom()
                }, "tawkchat-message-preview-messages-container", "mp-maximizeClick"), this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                d.sessionHandler.visitorChatDismiss(function() {});
                e.removeAllElements()
            }, "tawkchat-message-preview-close", "mp-closeitemsclick"), this.isQuickReplyInitialized || this.initQuickReply(), this.showQuickReply(), 0 === this.messagePreviewCount ? this.hideQuickReply() : (f.showPreChatForm && !y.prechatFormSubmitted() &&
                f.prechatOptions.fields.forEach(function(g) {
                    g.isRequired && e.hideQuickReply()
                }), this.hideActionsContainerNotif(), this.resizeTextArea(), setTimeout(function() {
                    e.container && e.container.restyle("height", e.container.getElementById("tawkchat-message-preview-container").offsetHeight + "px")
                }, 50), f.showEmoji.subscribe(function() {
                    e.toggleEmojiAction()
                }), f.showUploads.subscribe(function() {
                    e.toggleUploadsAction()
                }), f.showRating.subscribe(function() {
                    e.toggleRatingAction()
                })))
        };
        ha.prototype.toggleUploadsAction = function() {
            var a =
                this,
                b = this.container.documentRef.getElementById("uploadFileOption"),
                c = this.container.documentRef.getElementById("actionsContainer");
            b && (f.showUploads() ? (b.style.display = "block", this.container.attachUserEventListener("change", function(e) {
                d.eventHandler.cancelEvent(e);
                e = d.eventHandler.getTargetElement(e).files;
                var g = [],
                    h = [];
                if (e && e.length) {
                    for (var m = 0; m < e.length; m++) e[m].size > a.maxSizeFileUpload ? g.push(e[m]) : m >= a.maxNumberFileUpload ? h.push(e[m]) : d.viewHandler.startUpload(e[m]);
                    d.viewHandler.checkUploadFileWarning(g,
                        h);
                    d.viewHandler.userAction = !1;
                    d.sessionHandler.notifyWindowState("max")
                }
            }, "fileInput", "mp-fileInputChanged"), this.chatTextarea.attachUserEventListener("paste", function(e) {
                    var g;
                    if ((g = (e.originalEvent || e).clipboardData) && (g = g.items) && g.length) {
                        for (var h = 0; h < g.length; h++)
                            if (-1 !== g[h].type.indexOf("image")) {
                                var m = g[h].getAsFile();
                                if (null !== m) {
                                    var n = m;
                                    n.name = d.languageParser.translate("chat", "pasted_image_title", {
                                        dateTime: l.parseChatTime(new Date)
                                    });
                                    break
                                }
                            }
                        n && (d.viewHandler.startUpload(n), e.preventDefault())
                    }
                },
                null, "mp-chatTextareaPaste"), this.container.attachUserEventListener("dragover", function(e) {
                e.preventDefault();
                e.stopPropagation && e.stopPropagation(); - 1 === c.className.indexOf(" drag-over") && l.addClass(c, "drag-over")
            }, "actionsContainer", "mp-textareaContainerDragOver"), this.container.attachUserEventListener("dragleave", function(e) {
                var g = a.container.getElementById("tawkchat-message-preview-container").getBoundingClientRect();
                if (e.clientY < g.top || e.clientY >= g.bottom || e.clientX < g.left || e.clientX >= g.right) e.preventDefault(),
                    e.stopPropagation && e.stopPropagation(), l.removeClass(c, "drag-over")
            }, "actionsContainer", "mp-textareaContainerDragLeave"), this.container.attachUserEventListener("drop", function(e) {
                e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                c.className = c.className.replace(/ drag-over/g, "");
                e = e.target.files || e.dataTransfer.files;
                var g = [],
                    h = [];
                if (e && 0 !== e.length) {
                    for (var m = 0; m < e.length; m++) e[m].size > a.maxSizeFileUpload ? g.push(e[m]) : m >= a.maxNumberFileUpload ? h.push(e[m]) : d.viewHandler.startUpload(e[m]);
                    a.chatTextarea.elementReferrer.value =
                        "";
                    a.resizeTextArea();
                    a.chatTextarea.elementReferrer.value ? a.toggleActionsContentOnTyping(!1) : a.toggleActionsContentOnTyping(!0);
                    d.viewHandler.checkUploadFileWarning(g, h);
                    d.viewHandler.userAction = !1;
                    d.sessionHandler.notifyWindowState("max")
                }
            }, "actionsContainer", "mp-textareaContainerDrop")) : b.style.display = "none")
        };
        ha.prototype.toggleRatingAction = function() {
            var a = this.container.getElementById("rateMainWrapper"),
                b = this.container.getElementById("rateContainer");
            a && b && (f.showRating() ? (a.style.display =
                "block", this.container.attachUserEventListener(d.viewHandler.clickEvent, function(c) {
                    d.chatHandler.changeRating(1);
                    d.viewHandler.userAction = !1;
                    d.sessionHandler.notifyWindowState("max");
                    d.eventHandler.cancelEvent(c)
                }, "ratePositive", "mp-ratepveclick"), this.container.attachUserEventListener(d.viewHandler.clickEvent, function(c) {
                    d.chatHandler.changeRating(-1);
                    d.viewHandler.userAction = !1;
                    d.sessionHandler.notifyWindowState("max");
                    d.eventHandler.cancelEvent(c)
                }, "rateNegative", "mp-ratenveclick"), this.container.attachUserEventListener("mouseover",
                    function() {
                        b.style.display = "block"
                    }, "rateMainWrapper", "rateMainWrapperOverQR"), this.container.attachUserEventListener("mouseout", function() {
                    b.style.display = "none"
                }, "rateMainWrapper", "rateMainWrapperOutQR")) : a.style.display = "none")
        };
        ha.prototype.updateMobilePositions = function() {
            var a = {},
                b = f.minimizedDimensions().width,
                c = f.minimizedDimensions().height;
            f.isCenterPositioned() ? (-1 === this.wrapper.className.indexOf("center") && (this.wrapper.className += "center"), a.top = "calc(50% - " + (.5 * b + 20) + "px) !important",
                a.bottom = "auto !important", f.isRightPositioned() ? (-1 === this.wrapper.className.indexOf("right") && (this.wrapper.className += " right"), a.right = this.offsetX + c + 15 + 100 + "px !important", a.left = "auto !important") : (-1 === this.wrapper.className.indexOf("left") && (this.wrapper.className += " left"), a.left = this.offsetX + c + 15 + 100 + "px !important", a.right = "auto !important")) : (c = d.viewHandler.minifiedBoxHeight * d.viewHandler.zoom + 30, f.isTopPositioned() ? (a.bottom = "auto !important", a.top = c + 30 + "px !important", -1 === this.wrapper.className.indexOf("top") &&
                (this.wrapper.className += " top")) : (a.bottom = c + 30 + "px !important", a.top = "auto !important", -1 === this.wrapper.className.indexOf("bottom") && (this.wrapper.className += " bottom")), f.isRightPositioned() ? (a.right = "10px !important", a.left = "auto !important", -1 === this.wrapper.className.indexOf("right") && (this.wrapper.className += " right")) : (a.right = "auto !important", a.left = "10px !important", -1 === this.wrapper.className.indexOf("left") && (this.wrapper.className += " left")));
            this.container.massRestyle(a)
        };
        ha.prototype.updatePositions =
            function() {
                var a = {},
                    b = f.minimizedDimensions().width,
                    c = f.minimizedDimensions().height;
                f.isCenterPositioned() ? (-1 === this.wrapper.className.indexOf("center") && (this.wrapper.className += "center"), a.top = "calc(50% - " + (.5 * b + 40) + "px) !important", a.bottom = "auto !important", f.isRightPositioned() ? (-1 === this.wrapper.className.indexOf("right") && (this.wrapper.className += " right"), a.right = this.offsetX + c + 15 + "px !important", a.left = "auto !important") : (-1 === this.wrapper.className.indexOf("left") && (this.wrapper.className +=
                    " left"), a.left = this.offsetX + c + 15 + "px !important", a.right = "auto !important")) : (f.isTopPositioned() ? (a.top = f.minimizedDimensions().height + this.offsetY + "px !important", a.bottom = "auto !important", -1 === this.wrapper.className.indexOf("top") && (this.wrapper.className += " top")) : (f.isDesktopRectangle() ? a.bottom = f.minimizedDimensions().height + this.offsetY + 10 + "px !important" : a.bottom = 80 + this.offsetY + "px !important", a.top = "auto !important", -1 === this.wrapper.className.indexOf("bottom") && (this.wrapper.className +=
                    " bottom")), f.isRightPositioned() ? (a.right = this.offsetX + "px !important", a.left = "auto !important", -1 === this.wrapper.className.indexOf("right") && (this.wrapper.className += " right")) : (a.left = this.offsetX + "px !important", a.right = "auto !important", -1 === this.wrapper.className.indexOf("left") && (this.wrapper.className += " left")));
                this.container.massRestyle(a)
            };
        ha.prototype.setStyleToSingleAgent = function() {
            if (this.messagePreviewContainer && this.container) {
                var a = this.messagePreviewContainer.getElementsByClassName("messageBody");
                var b = this.container.documentRef.getElementById("actionsContainer");
                var c = this.container.documentRef.getElementById("textareaWrapper");
                this.quickReplyContainer.style.marginTop = "10px";
                b.setAttribute("style", "border-radius:5px 5px 5px 5px !important; background-color: #fff");
                c.setAttribute("style", "border-radius:5px 5px 5px 5px !important");
                for (b = 0; b < a.length; b++) c = 10, a[b].setAttribute("style", "border-bottom-width:1px !important; border-radius:5px 5px 5px 5px !important"), 0 === b && (c = 0), a[b].parentElement.setAttribute("style",
                    "margin-top:" + c + "px !important")
            }
        };
        ha.prototype.setStyleToMultipleAgent = function() {
            if (this.messagePreviewContainer && this.container) {
                var a = this.messagePreviewContainer.getElementsByClassName("messageBody");
                var b = this.container.documentRef.getElementById("actionsContainer");
                var c = this.container.documentRef.getElementById("textareaWrapper");
                this.quickReplyContainer.style.marginTop = "0px";
                b.setAttribute("style", "border-radius:0px 0px 5px 5px !important; background-color: #f8f8f8");
                c.setAttribute("style",
                    "border-radius:0px 0px 5px 5px !important");
                for (b = 0; b < a.length; b++) 0 === b ? 1 === this.messagePreviewCount ? a[b].setAttribute("style", "border-bottom-width: 3px !important; border-radius:5px 5px 0px 0px !important") : a[b].setAttribute("style", "border-bottom-width:1px !important; border-radius:5px 5px 0px 0px !important") : (b === a.length - 1 ? a[b].setAttribute("style", "border-bottom-width:3px !important; border-radius:0px 0px 0px 0px !important") : a[b].setAttribute("style", "border-bottom-width:1px !important; border-radius:0px 0px 0px 0px !important"),
                    a[b].parentElement.setAttribute("style", "margin-top:0px !important"))
            }
        };
        ha.prototype.hide = function() {
            this.isShown = !1;
            this.container.restyle("display", "none !important");
            if (this.messagePreviewContainer) {
                this.messagePreviewContainer.innerHTML = "";
                for (var a = 0; a < this.timeIntervalsArr.length; a++) clearInterval(this.timeIntervalsArr[a].timeInterval);
                this.timeIntervalsArr = [];
                this.prevSenderUid = "";
                this.closeEmojiSelection();
                u && u.showBubble()
            }
        };
        ha.prototype.removeCallRequest = function() {
            this.incomingCallContainer &&
                (this.incomingCallContainer.elementReferrer.parentElement && (this.incomingCallContainer.elementReferrer.outerHTML = ""), this.incomingCallContainer = null);
            D.mobileBrowserName && this.hide()
        };
        ha.prototype.appendCallRequest = function(a) {
            var b = U.incomingCallRequest;
            var c = a.callId;
            var e = (e = (a = N.agentProfiles[N.profiles[a.caller.urid]]) && a.pi ? y.agentImgUrl + "/" + a.pi : "") ? "url('" + e + "');" : "transparent;";
            d.chatHandler.webrtcWin && !d.chatHandler.webrtcWin.closed ? d.chatHandler.webrtcWin.focus() : (b = b.replace(/__IMAGE_URL__/,
                    e), b = b.replace(/__INCOMING_CALL__/, d.languageParser.translate("chat", "incoming_call_message", {
                    name: a.n
                })), b = b.replace(/__ACCEPT_CALL__/, d.languageParser.translate("chat", "accept_call")).replace(/__DECLINE_CALL__/, d.languageParser.translate("chat", "decline_call")), a = new ca("incoming-call"), a.template = b, a.buildView(), this.messagePreviewContainer.insertBefore(a.elementReferrer, this.messagePreviewContainer.firstElementChild), a.elementReferrer.style.marginBottom = 0 === this.messagePreviewCount ? "0px" : "10px",
                this.incomingCallContainer = a, b = this.container.getElementById("accept-call"), a = this.container.getElementById("decline-call"), b && d.eventHandler.listen(b, "click", function() {
                    clearTimeout(d.viewHandler.incomingCallTimeout);
                    l.getWebRTCToken(!1, !1, function() {
                        d.viewHandler.removeCallRequest()
                    });
                    d.viewHandler.userAction = !0;
                    d.sessionHandler.notifyWindowState("max")
                }, "mp-acceptVideoCall"), a && d.eventHandler.listen(a, "click", function() {
                    clearTimeout(d.viewHandler.incomingCallTimeout);
                    l.rejectCall(c, function() {
                        d.viewHandler.removeCallRequest()
                    });
                    d.viewHandler.userAction = !0;
                    d.sessionHandler.notifyWindowState("max")
                }, "mp-declineVideoCall"), d.audioPlayer.play("chat_sound"), 0 === this.messagePreviewCount ? (this.container.restyle("height", this.wrapper.offsetHeight + this.messagePreviewContainer.offsetHeight + "px"), this.messagePreviewContainer.style.maxHeight = this.wrapper.offsetHeight + this.messagePreviewContainer.offsetHeight + "px", this.hideQuickReply()) : (this.messagePreviewContainer.style.maxHeight = this.container.elementReferrer.offsetHeight + "px", this.container.restyle("height",
                    this.container.getElementById("tawkchat-message-preview-container").offsetHeight + this.messagePreviewContainer.offsetHeight + "px")))
        };
        ha.prototype.appendCallInfo = function(a) {
            if (!D.mobileBrowserName) {
                var b, c = U["messagePreview-callInfo"],
                    e = a.callId,
                    g = a.caller;
                a = a.isMissed;
                var h = null,
                    m = null,
                    n = Date.now(),
                    x = h = b = null;
                e = "callInfo-" + e;
                x = null;
                var E = "",
                    L = null;
                if (this.container && this.messagePreviewContainer && a) {
                    x = d.languageParser.translate("chat", "missed_visitor_messagePreview");
                    var B = (b = (h = N.agentProfiles[N.profiles[g.urid]]) &&
                        h.pi ? y.agentImgUrl + "/" + h.pi : "") ? "url('" + b + "');" : "transparent;";
                    "transparent" !== B && (B += "background-position:0 0;background-size:28px 28px");
                    b = new ca(e, null, {
                        className: "message-preview-item"
                    }, null, this.documentRef);
                    b.template = l.escapeTemplateReplacement(c, [{
                        placeholder: "__CALL_INFO__",
                        textReplace: x
                    }, {
                        placeholder: "__CALLER_NAME__",
                        textReplace: h.n
                    }, {
                        placeholder: "__IMAGE_URL__",
                        textReplace: B
                    }, {
                        placeholder: "__ELAPSED_TIME__",
                        textReplace: d.languageParser.translate("chat", "justNow")
                    }]);
                    b.buildView();
                    f.isTopPositioned() ?
                        this.messagePreviewContainer.insertBefore(b.elementReferrer, this.messagePreviewContainer.getElementsByClassName("message-preview-item")[0]) : this.messagePreviewContainer.appendChild(b.elementReferrer);
                    h = b.elementReferrer.getElementsByClassName("btn-icon")[0];
                    x = b.elementReferrer.getElementsByClassName("mp-callIconContainer")[0];
                    a && (h.style.transform = "rotate(135deg)", h.style.top = "1px", x.style.backgroundColor = "#e52f48");
                    this.container.getElementById("incoming-call") && (this.container.getElementById("incoming-call").style.marginBottom =
                        "10px");
                    this.prevSenderUid === N.profiles[g.urid] && (E += " hidden-profile");
                    b.elementReferrer.className += E;
                    b.elementReferrer.setAttribute("data-uid", N.profiles[g.urid]);
                    L = b.elementReferrer.getElementsByClassName("mp-callInfoElapsedTime")[0];
                    this.timeIntervalsArr.push({
                        messageId: e,
                        timeInterval: setInterval(function() {
                            m = Math.floor((Date.now() - n) / 1E3);
                            L.innerHTML = 60 > m ? d.languageParser.translate("chat", "justNow") : d.languageParser.translate("chat", "minutes", {
                                num: Math.floor(m / 60)
                            }) + " ago"
                        }, 6E4)
                    });
                    this.prevSenderUid =
                        N.profiles[g.urid];
                    3 < this.messagePreviewCount && (f.isTopPositioned() ? this.removeElement(this.messagePreviewContainer.getElementsByClassName("message-preview-item")[3]) : this.removeElement(this.messagePreviewContainer.getElementsByClassName("message-preview-item")[0]));
                    this.container.restyle("height", this.wrapper.offsetHeight + this.messagePreviewContainer.offsetHeight + "px");
                    b.elementReferrer.className += " animate-fade-object"
                }
            }
        };
        ha.prototype.scrollToBottom = function() {
            this.messagePreviewContainer && (this.messagePreviewContainer.scrollTop =
                1E8)
        };
        ha.prototype.parseSurvey = function(a, b) {
            var c, e = a.match(l.regSurvey),
                g = "";
            if (!e) return {
                message: a,
                isSurvey: !1
            };
            var h = a.match(l.regSurveyQuestion);
            var m = "survey-" + (new Date).getTime();
            a = 0;
            for (c = e.length; a < c; a++) {
                var n = e[a].replace(l.regOption, "");
                n = n.replace(l.regBr, "");
                n = l.trim(n);
                var x = m + a;
                g += l.escapeTemplateReplacement(U["survey-option"], [{
                    placeholder: /__RADIO_ID__/gm,
                    textReplace: x
                }, {
                    placeholder: "__RADIO_NAME__",
                    textReplace: b
                }, {
                    placeholder: /__RADIO_VALUE__/gm,
                    textReplace: n
                }])
            }
            return {
                message: l.escapeTemplateReplacement(U["tawk-survey-wrapper"], [{
                    placeholder: "__QUESTION__",
                    textReplace: h[0].replace(l.regOption, "")
                }, {
                    placeholder: "__OPTIONS__",
                    textReplace: g
                }]),
                isSurvey: !0
            }
        };
        ha.prototype.appendMessage = function(a) {
            var b = this,
                c = null,
                e = U["message-preview-item"],
                g = null,
                h = null,
                m = h = null,
                n = m = m = null,
                x = "",
                E = null;
            E = !1;
            var L = Date.now(),
                B = "msgPreview-messageId-" + (new Date).getTime().toString() + Object.keys(d.chatHandler.messages).length,
                J = (new Date(a.time)).getTime();
            a && this.container && (h = a.message, m = a.profileImg ? a.profileImg ? "https://tawk.link/" + a.profileImg :
                "" : (m = N.agentProfiles[a.ownerId]) && m.pi ? y.agentImgUrl + "/" + m.pi : "", m = m ? "url('" + m + "');" : "transparent;", this.messagePreviewContainer && ("undefined" !== typeof la && (h = la.unifyUnicode(h), 0 === h.replace(la.regUnicode, "").trim().length && (x += " emojionly"), h = la.toImage(h)), h = "s" === a.senderType ? this.limitMessageLength(h, 500) : this.limitMessageLength(h, 150), a.data && a.data.file && (h = d.viewHandler.parseUploadedFile(a.data.file)), E = this.parseSurvey(h, B), h = E.message, E = E.isSurvey, c = new ca(B, null, {
                            className: "message-preview-item"
                        },
                        null, this.documentRef), c.template = l.escapeTemplateReplacement(e, [{
                        placeholder: "__MESSAGE__",
                        textReplace: h
                    }, {
                        placeholder: "__NAME__",
                        textReplace: a.name
                    }, {
                        placeholder: "__IMAGE_URL__",
                        textReplace: m
                    }, {
                        placeholder: "__TIME__",
                        textReplace: d.languageParser.translate("chat", "justNow")
                    }]), c.buildView(), f.isTopPositioned() ? this.messagePreviewContainer.insertBefore(c.elementReferrer, this.messagePreviewContainer.getElementsByClassName("message-preview-item")[0]) : this.messagePreviewContainer.appendChild(c.elementReferrer),
                    a.data && a.data.file && (c.elementReferrer.getElementsByClassName("messageBody")[0].className += " imageMessageBody"), this.container.getElementById("incoming-call") && (this.container.getElementById("incoming-call").style.marginBottom = "10px"), a.ownerId && this.prevSenderUid === a.ownerId && (x += " hidden-profile"), c.elementReferrer.className += x, c.elementReferrer.setAttribute("data-uid", a.ownerId), g = c.elementReferrer.getElementsByClassName("messageTime")[0], this.timeIntervalsArr.push({
                        messageId: B,
                        timeInterval: setInterval(function() {
                            n =
                                Math.floor((Date.now() - L) / 1E3);
                            g.innerHTML = 60 > n ? d.languageParser.translate("chat", "justNow") : d.languageParser.translate("chat", "minutes", {
                                num: Math.floor(n / 60)
                            }) + " ago"
                        }, 1E3),
                        timestamp: J
                    }), this.prevSenderUid = a.ownerId, h = c.elementReferrer.firstElementChild, d.eventHandler.listen(h, d.viewHandler.clickEvent, function() {
                        b.removeElement(c.elementReferrer)
                    }, "close-" + c.elementReferrer.id), 3 < this.messagePreviewCount && (f.isTopPositioned() ? this.removeElement(this.messagePreviewContainer.getElementsByClassName("message-preview-item")[3]) :
                        this.removeElement(this.messagePreviewContainer.getElementsByClassName("message-preview-item")[0])), b.scrollToBottom(), E && this.addSurveyHandlers(B), this.container.restyle("height", this.container.getElementById("tawkchat-message-preview-container").offsetHeight + "px"), c.elementReferrer.className += " animate-fade-object"))
        };
        ha.prototype.addSurveyHandlers = function(a) {
            var b = this;
            if (this.container) {
                var c = this.container.getElementById(a);
                l.getElementsByTagName(c, "input").forEach(function(e, g) {
                    e.id && b.container.attachUserEventListener("click",
                        function() {
                            b.lastRadioButton !== e.id && (b.lastRadioButton = e.id, d.chatHandler.sendMessage(e.value), d.sessionHandler.notifyWindowState("max"), d.viewHandler.scrollToBottom())
                        }, e.id, "survey" + a + g + "click")
                })
            }
        };
        ha.prototype.limitMessageLength = function(a, b) {
            var c;
            if (a.length > b)
                for (c = 0; c < b;)
                    if ('<img class="emojione"' === a.substring(c, c + 21) || '<a target="_blank"' === a.substring(c, c + 18))
                        for (var e = c; e < a.length; e++) {
                            if (c++, b++, ">" === a.substring(e, e + 1)) {
                                --b;
                                break
                            }
                        } else c++;
            return a.substring(0, b) + (a.length > b ? "[...]" :
                "")
        };
        ha.prototype.removeAllElements = function() {
            for (var a, b, c = f.minimizedDimensions().width, e = 0; e < this.timeIntervalsArr.length; e++) clearInterval(this.timeIntervalsArr[e].timeInterval), this.timeIntervalsArr.splice(e, 1);
            if (this.messagePreviewContainer) {
                a = this.messagePreviewContainer.getElementsByClassName("message-preview-item");
                b = a.length;
                for (e = 0; e < b; e++) a[0].parentElement && (a[0].outerHTML = "");
                this.messagePreviewCount = 0;
                this.removeCallRequest();
                this.prevSenderUid = "";
                f.isCenterPositioned() && this.container.restyle("top",
                    "calc(50% - " + .5 * c + "px) !important");
                this.container.getElementById("incoming-call") && (this.container.getElementById("incoming-call").style.marginBottom = "0px");
                this.hide()
            }
        };
        ha.prototype.removeElement = function(a) {
            for (var b, c, e = 0; e < this.timeIntervalsArr.length; e++)
                if (this.timeIntervalsArr[e].messageId === a.id) {
                    clearInterval(this.timeIntervalsArr[e].timeInterval);
                    this.timeIntervalsArr.splice(e, 1);
                    break
                }
            c = this.messagePreviewContainer.getElementsByClassName("message-preview-item");
            if (-1 === a.className.indexOf("hidden-profile"))
                if (f.isTopPositioned())
                    for (e =
                        c.length - 2; e < c.length; e--) {
                        if (b = c[e], b.getAttribute("data-uid") === a.getAttribute("data-uid")) {
                            b.className = b.className.replace(/hidden-profile/gi, "");
                            break
                        }
                    } else
                        for (e = 1; e < c.length; e++)
                            if (b = c[e], b.getAttribute("data-uid") === a.getAttribute("data-uid")) {
                                b.className = b.className.replace(/hidden-profile/gi, "");
                                break
                            }
            a.parentElement && (a.outerHTML = "");
            this.messagePreviewCount--;
            0 === this.messagePreviewCount && this.container.getElementById("incoming-call") && (this.container.getElementById("incoming-call").style.marginBottom =
                "0px")
        };
        ha.prototype.initQuickReply = function() {
            if (!D.mobileBrowserName) {
                var a = this.container.documentRef.getElementById("tooLongMsgNotification");
                this.container.documentRef.getElementById("textareaContainer").insertBefore(this.chatTextarea.buildView(this.container.documentRef), a);
                var b = this.container.getElementById("tawkchat-message-preview-quick-reply-container");
                a = this.container.getElementById("file-upload-drop-label");
                y.pageStatus() && b && (b = l.rawDecode(f.onlineGreeting.actionMessage), D.isPlaceholderSupported ?
                    this.chatTextarea.elementReferrer.placeholder = b : (this.chatTextarea.elementReferrer.value = b, l.togglePlaceholderText(this.chatTextarea.elementReferrer, b, "chatTextarea")), a.innerHTML = d.languageParser.translate("rollover", "uploadFile"), this.container.getElementById("viewEmoji").setAttribute("title", d.languageParser.translate("chat", "insert_emoji")), this.container.getElementById("uploadFileOption").setAttribute("title", d.languageParser.translate("rollover", "uploadFile")), this.container.getElementById("ratePositive").setAttribute("title",
                        d.languageParser.translate("rollover", "positiveRating")), this.container.getElementById("rateNegative").setAttribute("title", d.languageParser.translate("rollover", "negativeRating")), this.attachEventListenerQuickReply(), this.isQuickReplyInitialized = !0)
            }
        };
        ha.prototype.showQuickReply = function() {
            D.mobileBrowserName || (this.quickReplyContainer.style.display = "block", this.toggleActionsContentOnTyping(!0))
        };
        ha.prototype.hideQuickReply = function() {
            this.quickReplyContainer && (this.quickReplyContainer.style.display =
                "none")
        };
        ha.prototype.attachEventListenerQuickReply = function() {
            var a = this;
            this.container.documentRef.getElementById("notifMessageText").innerHTML = d.languageParser.translate("chat", "message_too_long");
            this.hideActionsContainerNotif();
            this.chatTextarea.attachUserEventListener("keydown", function(b) {
                a.resizeTextArea();
                if (13 === b.keyCode && !b.shiftKey) {
                    if (5E3 < this.value.length) {
                        b.preventDefault();
                        return
                    }
                    d.viewHandler.userAction = !1;
                    d.sessionHandler.notifyWindowState("max");
                    d.viewHandler.scrollToBottom()
                }
                this.value ?
                    a.toggleActionsContentOnTyping(!1) : a.toggleActionsContentOnTyping(!0);
                d.chatHandler.sendTextPreview(b)
            }, null, "mp-chatinputkeyupresize");
            this.chatTextarea.attachUserEventListener("keyup", function() {
                5E3 >= this.value.length ? a.hideActionsContainerNotif() : a.showActionsContainerNotif();
                this.value ? a.toggleActionsContentOnTyping(!1) : a.toggleActionsContentOnTyping(!0);
                a.resizeTextArea()
            }, null, "mp-chatinputkeyup")
        };
        ha.prototype.toggleActionsContentOnTyping = function(a) {
            var b = this.container.getElementById("hidableActionsWrapper"),
                c = this.container.getElementById("textareaContainer");
            a ? (b.style.display = "block", l.addClass(c, "additionalPadding")) : (b.style.display = "none", l.removeClass(c, "additionalPadding"))
        };
        ha.prototype.toggleEmojiAction = function() {
            var a = this,
                b = this.container.getElementById("viewEmoji"),
                c = this.container.documentRef.getElementById("emoji-selection-container"),
                e = this.container.getElementById("textareaContainer");
            f.showEmoji() ? (b.style.display = "block", l.addClass(e, "with-emoji"), c.innerHTML = U.loader, this.container.attachUserEventListener("click",
                function(g) {
                    g.stopPropagation();
                    "active" === a.container.getElementById("viewEmoji").className ? a.closeEmojiSelection() : (a.container.getElementById("viewEmoji").className = "active", Va(c), a.container.restyle("height", a.container.getElementById("tawkchat-message-preview-container").offsetHeight + "px"))
                }, "viewEmoji", "mp-viewEmojiClick")) : (b.style.display = "none", l.removeClass(e, "with-emoji"))
        };
        ha.prototype.closeEmojiSelection = function() {
            if (!D.mobileBrowserName) {
                var a = this.container.documentRef.getElementById("actionsContainer"),
                    b = this.container.documentRef.getElementById("emoji-selection-container");
                this.container.getElementById("viewEmoji").className = "";
                a.style.height = "50px";
                l.removeClass(b, "showWithFade");
                this.container.restyle("height", this.container.getElementById("tawkchat-message-preview-container").offsetHeight + "px")
            }
        };
        ha.prototype.resizeTextArea = function() {
            var a = this;
            clearTimeout(this.resizeThrottle);
            D.mobileBrowserName || (this.resizeThrottle = setTimeout(function() {
                var b = a.chatTextarea.elementReferrer.value,
                    c = a.container.documentRef.getElementById("actionsContainer"),
                    e = a.container.documentRef.getElementById("textareaContainer"),
                    g = b.split(/\r\n|\r|\n/).length || 1,
                    h = 20 * g;
                1 === g && a.chatTextarea.elementReferrer.scrollHeight >= a.chatTextarea.elementReferrer.clientHeight && (h = a.chatTextarea.elementReferrer.scrollHeight);
                b && 20 <= h ? (h = 150 < h ? 150 : h, a.isActionsContainerNotifShown ? (h += 52, e.style.paddingBottom = "67px") : e.style.paddingBottom = "15px", c.style.height = 50 + (h - 20) + "px", a.container.getElementById("tawkchat-message-preview-container").offsetHeight > a.container.elementReferrer.offsetHeight &&
                    a.container.restyle("height", a.container.getElementById("tawkchat-message-preview-container").offsetHeight + "px")) : (c.style.height = "50px", e.style.paddingBottom = "15px")
            }, 100))
        };
        ha.prototype.addEmojiToInput = function(a) {
            D.isPlaceholderSupported || this.chatTextarea.elementReferrer.value !== l.rawDecode(f.onlineGreeting.actionMessage) || (this.chatTextarea.elementReferrer.value = "");
            this.chatTextarea.elementReferrer.value += a;
            this.chatTextarea.elementReferrer.focus();
            this.closeEmojiSelection()
        };
        ha.prototype.showActionsContainerNotif =
            function() {
                D.mobileBrowserName || (this.container.documentRef.getElementById("tooLongMsgNotification").style.display = "block", this.isActionsContainerNotifShown = !0)
            };
        ha.prototype.hideActionsContainerNotif = function() {
            D.mobileBrowserName || (this.container.documentRef.getElementById("tooLongMsgNotification").style.display = "none", this.isActionsContainerNotifShown = !1)
        };
        var X = TawkClass.extend({
            init: function() {
                this.chatContainer = null;
                this.removeAgentNotification = !1;
                this.lastRadioButton = null;
                this.clickEvent = "click";
                this.isPopupFocused = !1;
                this.indicator = null;
                this.newMessageNotSeen = !1;
                this.unseenMessages = [];
                this.lastMessageTime = null;
                this.totalUnseenMessages = 0;
                this.retryUploadList = this.removeDividerTimeout = null;
                this.tawktoLinkName = l.getRandomName();
                this.bottomContainerName = l.getRandomName();
                this.currentScrollY = this.incomingCallTimeout = null;
                this.callData = {};
                this.mainAgent = null
            },
            show: function() {
                var a = this,
                    b = "visibilitychange";
                "webkitvisibilitychange" in document ? b = "webkitvisibilitychange" : "mozvisibilitychange" in document ?
                    b = "mozvisibilitychange" : "msvisibilitychange\ufeff" in document && (b = "msvisibilitychange\ufeff");
                d.eventHandler.listen(k, "focus", function() {
                    d.viewHandler.messagePreview && d.viewHandler.indicator.pageTitleNotification.off();
                    a.checkSeenMessageViewport()
                }, "windowOnFocus");
                d.eventHandler.listen(document, b, function() {
                    document.hidden || (d.viewHandler.messagePreview && d.viewHandler.indicator.pageTitleNotification.off(), a.checkSeenMessageViewport())
                }, "documentVisibilityChange");
                d.eventHandler.listen(k, "popstate",
                    function() {
                        d && d.visitorHandler && d.visitorHandler.sendNavigationEvent()
                    }, "windowOnPopstate");
                d.eventHandler.listen(k, "hashchange", function() {
                    k.location && k.location.hash && "#" === k.location.hash || d && d.visitorHandler && d.visitorHandler.sendNavigationEvent()
                }, "windowOnHashchange")
            },
            appendAgent: function(a) {
                var b = "";
                var c = this.chatContainer;
                var e = c.getElementById("agentProfileContainer");
                var g = c.getElementById("agentList");
                var h = c.getElementById("chatWrapper");
                var m = c.getElementById("headerAccountStateContainer");
                var n = c.getElementById("shortMessage");
                c && e && g && (-1 < this.chatContainer.getElementById("greetingsMainContainer").className.indexOf("minimize") && (n.style.display = "none", e.className = "show"), d.agents.agentsCount++, 1 < d.agents.agentsCount || 1 === d.agents.agentsCount && this.mainAgent && this.mainAgent.pid !== a.pid ? h.classList.remove("one-agent") : h.classList.add("one-agent"), 1 === d.agents.agentsCount ? (this.mainAgent = a, d.viewHandler.renderAgentHeader(a.pid), this.renderAgentMinimizedWidget(a.pid)) : (d.viewHandler.renderAgentHeader(a.pid),
                    m.classList.add("multiple-agent")), d.viewHandler.openAgentList(), e = U["agent-profile"], h = U["agent-profile-image"], m = U["agent-profile-description"], c = new ca("agentProfile-" + a.pid, null, {
                    className: "agentWrapper clearfix"
                }, null, c.documentRef), (n = a.pi ? y.agentImgUrl + "/" + a.pi : "") && (b = "background-image : url('" + n + "'); background-position : 0px 0px;"), b += "box-shadow: 0px 0px 0px 1px " + f.headerTxtColor + ";", m = l.escapeTemplateReplacement(m, [{
                    placeholder: "__POSITION_CLASS__",
                    textReplace: "agentName"
                }, {
                    placeholder: "__POSITION__",
                    textReplace: a.pst
                }, {
                    placeholder: "__NAME__",
                    textReplace: a.n
                }]), h = h.replace("__PROFILE_ID__", a.pid).replace("__IMAGE_URL__", b), c.template = l.escapeTemplateReplacement(e, [{
                    placeholder: "__AGENT_PROFILE_DETAIL__",
                    textReplace: m
                }, {
                    placeholder: "__AGENT_PROFILE_IMAGE__",
                    textReplace: h
                }, {
                    placeholder: "__ID__",
                    textReplace: ""
                }]), g.appendChild(c.buildView()), g.style.left = "50%")
            },
            removeAgent: function(a) {
                var b = q.container.elementReferrer ? q.container : null,
                    c = b.getElementById("chatWrapper");
                if (b) {
                    d.agents.agentsCount--;
                    var e = b.getElementById("agentProfileContainer");
                    var g = b.getElementById("agentProfile-" + a);
                    var h = b.getElementById("profileImage-" + a);
                    var m = b.getElementById("profileDetail" + a);
                    0 === d.agents.agentsCount ? (d.viewHandler.clearAgentHeader(), this.clearAgentFooter()) : 1 === d.agents.agentsCount && (d.eventHandler.removeEventHandler(e, "click", this.expandAgentList), b.getElementById("headerAccountStateContainer").classList.remove("multiple-agent"));
                    0 < d.agents.agentsCount && this.mainAgent.pid === a && (this.mainAgent = N.agentProfiles[Object.keys(N.agentProfiles)[0]],
                        this.renderAgentMinimizedWidget(this.mainAgent.pid));
                    g && g.parentNode.removeChild(g);
                    h && (h.parentNode && h.parentNode.removeChild(h), e.style.width = 1 >= d.agents.agentsCount ? "" : 30 * d.agents.agentsCount - 10 * (d.agents.agentsCount - 1) + "px");
                    m && m.parentNode && m.parentNode.removeChild(m);
                    1 === d.agents.agentsCount && (this.renderAgentMinimizedWidget(this.mainAgent.pid), c.className = "single-agent", d.viewHandler.calculateOwnerNameAndMessageTimeSizeAll(), d.viewHandler.messagePreview && d.viewHandler.messagePreview.setStyleToSingleAgent())
                }
                0 ===
                    d.agents.agentsCount && (d.viewHandler.clearAgentHeader(), this.clearAgentFooter(), d.viewHandler.closeAgentList())
            },
            clearAgentFooter: function() {
                var a = u && u.container && u.container.elementReferrer ? u.container : null;
                D.mobileBrowserName && this.minifiedWidget && this.minifiedWidget.container && (a = this.minifiedWidget.container);
                if (a && this.chatContainer) {
                    var b = a.getElementById("tawkchat-status-text-container");
                    var c = a.getElementById("min-agent-profile-details");
                    var e = a.getElementById("agent-profile-image");
                    if ((a =
                            a.getElementById("tawkchat-status-agent-container")) || a) b && (b.style.display = "block"), c && (c.innerHTML = ""), e.innerHTML = "", a.style = "", a.className = ""
                }
            },
            renderAgentMinimizedWidget: function(a) {
                var b = u && u.container && u.container.elementReferrer ? u.container : null;
                D.mobileBrowserName && this.minifiedWidget && this.minifiedWidget.container && (b = this.minifiedWidget.container);
                if (b && this.chatContainer && a) {
                    var c = N.agentProfiles[a];
                    a = b.getElementById("tawkchat-status-agent-container");
                    iconContainer = b.getElementById("tawkchat-status-icon-container");
                    var e = b.getElementById("agent-profile-image");
                    tawkStatusMessage = b.getElementById("tawkchat-status-text-container");
                    profileDetails = b.getElementById("min-agent-profile-details");
                    var g = b.getElementById("tawkchat-chat-indicator");
                    a && (this.clearAgentFooter(), b = c.pi ? y.agentImgUrl + "/" + c.pi : "", e.style.backgroundImage = b ? "url('" + b + "')" : "", e.style.boxShadow = "0px 0px 0px 1px " + f.headerTxtColor, a.className += "appear", profileDetails && (profileDetails.innerHTML = '<p class="name">' + c.n + '</p><p class="position">' + c.pst +
                        "</p>"), tawkStatusMessage && f.isDesktopRectangle() && (tawkStatusMessage.style.display = "none"), g && "block" === g.style.display && d.viewHandler.handleIndicatorToggle(!0))
                }
            },
            clearAgentHeader: function() {},
            handleAcknowledgment: function(a) {
                var b, c, e = this.chatContainer;
                if (e && a.messageId && (b = e.getElementById(a.messageId))) {
                    var g = b.parentNode;
                    var h = 0;
                    for (var m = b.childNodes.length; h < m; h++) {
                        var n = b.childNodes[h];
                        if (-1 !== n.className.indexOf("messageBody")) {
                            var x = l.getElementsByClassName(n, "messageWrapper");
                            var E = l.getElementsByClassName(n,
                                "messageStatusContainer")
                        }
                    }
                    if (x && x.length && E && E.length)
                        if (E = E[0], x = x[0], a.error) {
                            if (E) {
                                g = U["chat-resend-link"].replace("__MESSAGE_ID__", a.messageId).replace("__NOT_DELIVERED__", d.languageParser.translate("chat", "resend")).replace("__FAILED__", d.languageParser.translate("chat", "failed"));
                                x.className = "messageWrapper error";
                                E.className = "messageStatusContainer errorInMessage";
                                E.innerHTML = g;
                                var L = l.rawDecode(x.childNodes[0].textContent || x.childNodes[0].innerText);
                                this.scrollToBottom();
                                var B = d.eventHandler.listen(E,
                                    d.viewHandler.clickEvent,
                                    function(J) {
                                        d.eventHandler.cancelEvent(J);
                                        d.chatHandler.sendMessageToServer(L, a.messageId);
                                        if (c = e.getElementById("errorFor" + a.messageId)) x.className = "messageWrapper pending";
                                        E.className = "messageStatusContainer pending";
                                        E.childNodes[0].className = "";
                                        E.childNodes[0].innerHTML = U.loader;
                                        d.eventHandler.removeEventHandler(x, "click", B)
                                    }, "resend" + a.messageId + "click")
                            }
                        } else h = d.chatHandler.messages[a.order], d.viewHandler.addWaitTime(), g.removeChild(b), d.chatHandler.prepareMessage(h, !0, !1, !0)
                }
            },
            handleEndChat: function() {},
            clearAgents: function() {},
            handleRestartChat: function() {},
            appendMessage: function(a) {
                var b = !1;
                var c = a.message;
                var e = a.time,
                    g = a.senderType,
                    h = this.chatContainer.documentRef,
                    m = this.ifScrollbarDown(),
                    n = h.getElementById("chatWrapper"),
                    x = "messageId-" + (new Date).getTime().toString() + Object.keys(d.chatHandler.messages).length;
                var E = "messageContainer clearfix";
                var L = {
                    "chat-message-row": U["chat-message-row"],
                    "chat-resend-link": U["chat-resend-link"],
                    "chat-message-owner-agent": U["chat-message-owner-agent"],
                    "chat-message-owner-visitor": U["chat-message-owner-visitor"],
                    "chat-message-container": U["chat-message-container"],
                    "chat-notification-container": U["chat-notification-container"],
                    "chat-message-status-row": U["chat-message-status-row"],
                    "chat-divider": U["chat-divider"]
                };
                e = l.parseChatTime(e);
                d.chatHandler.noRedraw || d.viewHandler.isMaximized || f.isEmbedded || f.isPopup || D.mobileBrowserName || "v" === g || "c" !== a.type || (f.hideWidgetOnLoad && "max" === f.onClickAction ? (d.viewHandler.userAction = !1, d.sessionHandler.notifyWindowState("max")) :
                    d.viewHandler.messagePreview && d.viewHandler.messagePreview.show ? d.viewHandler.messagePreview.show(d.viewHandler.indicator.unansweredMessages + 1, a) : d.viewHandler.messagePreview || this.hasBeenMaximizedOnce || "max" !== f.onClickAction || d.chatHandler.agentHasMessaged || (d.viewHandler.userAction = !1, d.sessionHandler.notifyWindowState("max"), this.hasBeenMaximizedOnce = !0));
                var B = a.profileImg ? a.profileImg ? "https://tawk.link/" + a.profileImg : "" : (B = N.agentProfiles[a.ownerId]) && B.pi ? y.agentImgUrl + "/" + B.pi : "";
                B = B ? "url('" +
                    B + "');" : "transparent;";
                if ("a" === a.senderType || "s" === a.senderType) L["chat-message-owner-agent"] = L["chat-message-owner-agent"].replace("__IMAGE_URL__", B);
                L["chat-message-status-row"] = a.isPending ? U["chat-message-pending-row"] : L["chat-message-status-row"].replace("__TIME__", e).replace("__TIME_CLASS__", "v" === a.senderType ? "visitor" : "agent").replace("__NAME__", "v" === a.senderType ? "" : a.name);
                "undefined" !== typeof la && (c = la.unifyUnicode(c), 0 === c.replace(la.regUnicode, "").trim().length && (E += " emojionly"), c = la.toImage(c));
                1 >= N.chatOrder && (d.viewHandler.chatContainer.getElementById("changeName").style.display = "block", d.viewHandler.chatContainer.getElementById("emailTranscriptOption").style.display = "block");
                "a" === g ? (b = this.parseSurvey(c, x), c = b.message, b = b.isSurvey, d.chatHandler.handleAgentStoppedTyping(a.data.rsc)) : d.chatHandler.visitorHasMessaged || "s" === g || (d.chatHandler.visitorHasMessaged = !0);
                a.data && a.data.file && (c = this.parseUploadedFile(a.data.file));
                if ("c" === a.type) {
                    var J = l.escapeTemplateReplacement(L["chat-message-row"], [{
                        placeholder: "__MESSAGE_STATUS_ROW__",
                        textReplace: L["chat-message-status-row"]
                    }, {
                        placeholder: /__MESSAGE_ID__/gm,
                        textReplace: x
                    }, {
                        placeholder: "__MESSAGE__",
                        textReplace: c
                    }, {
                        placeholder: "__PENDING__",
                        textReplace: a.isPending ? "pending" : ""
                    }]);
                    E = "v" === g ? E + " visitorChatContainer " : E + " agentChatContainer "
                }
                E = new ca(x, null, {
                    className: E
                }, null, h);
                this.lastMessageTime = a.isPending ? this.lastMessageTime : e;
                if ("c" === a.type) {
                    d.chatHandler.lastMessageOwner = "s" === g ? "server" : a.isPending ? d.chatHandler.lastMessageOwner :
                        a.ownerId;
                    "a" === g || "s" === g ? ("a" === g && (d.chatHandler.agentHasMessaged = !0, this.removeWaitTime()), c = l.escapeTemplateReplacement(L["chat-message-owner-agent"], [{
                        placeholder: "__NAME__",
                        textReplace: a.name
                    }])) : c = l.isGeneratedName(ea.name()) && L["chat-message-owner-visitor"] ? l.escapeTemplateReplacement(L["chat-message-owner-visitor"], [{
                        placeholder: "__NAME__",
                        textReplace: a.name
                    }]) : "";
                    var aa = l.escapeTemplateReplacement(L["chat-message-container"], [{
                        placeholder: "__OWNER_TPL__",
                        textReplace: c
                    }, {
                        placeholder: "__CONTENT__",
                        textReplace: J
                    }]);
                    a.data && "v" === g && (aa = aa.replace("messageBody", "messageBody file"));
                    "s" === g && (aa = aa.replace("ownerNameContainer", "ownerNameContainer trigger"), aa = aa.replace("messageBody", "messageBody trigger"))
                } else "n" === a.type && (d.chatHandler.lastMessageOwner = "notif", a.isRtcError ? (J = "video" === a.rtcType ? d.languageParser.translate("chat", "video_call_error") : "screen" === a.rtcType ? d.languageParser.translate("chat", "screen_share_error") : d.languageParser.translate("chat", "voice_call_error"), aa = l.escapeTemplateReplacement(U.noWebrtc, [{
                    placeholder: "__MESSAGE__",
                    textReplace: c
                }, {
                    placeholder: "__HEADER__",
                    textReplace: J
                }])) : aa = l.escapeTemplateReplacement(L["chat-notification-container"], [{
                    placeholder: "__MESSAGE_ID__",
                    textReplace: x
                }, {
                    placeholder: "__MESSAGE__",
                    textReplace: c
                }, {
                    placeholder: "__TIME__",
                    textReplace: e
                }]));
                E.template = aa;
                E.buildView();
                try {
                    n.insertBefore(E.elementReferrer, h.getElementById("agentTypingContainer"))
                } catch (ia) {
                    ma.handleError("Chat wrapper is null to append message : " + JSON.stringify(a), ia.fileName, ia.lineNumber,
                        ia.stack)
                }
                a.dontPlaySound || "v" === g || a.isPending || this.popoutWin && !this.popoutWin.closed || d.audioPlayer.play("chat_sound");
                if (a.timeStamp > y.lastMessageTimestamp)
                    if ("v" === g) y.lastMessageTimestamp = a.timeStamp;
                    else if (!document.hidden && l.chatElementInView(E.elementReferrer) && d.viewHandler.isMaximized) this.updateLastTimestamp(a.timeStamp);
                else if (this.unseenMessages.push(x), this.updateTotalUnseenMessages(), 0 < this.totalUnseenMessages && (this.setDivider(E.elementReferrer, L["chat-divider"], E), a = this.chatContainer.documentRef.getElementById("newMessagesBar"))) this.chatContainer.getElementById("notificationMessageText").innerHTML =
                    d.languageParser.translate("chat", "newMessage", {
                        num: this.totalUnseenMessages
                    });
                !m || d.formHandler.currentForm && !d.viewHandler.isMaximized || this.scrollToBottom();
                b && this.addSurveyHandlers(x);
                return x
            },
            parseSurvey: function(a, b) {
                var c, e = a.match(l.regSurvey),
                    g = "";
                if (!e) return {
                    message: a,
                    isSurvey: !1
                };
                var h = a.match(l.regSurveyQuestion);
                var m = "survey-" + (new Date).getTime();
                a = 0;
                for (c = e.length; a < c; a++) {
                    var n = e[a].replace(l.regOption, "");
                    n = n.replace(l.regBr, "");
                    n = l.trim(n);
                    var x = m + a;
                    g += l.escapeTemplateReplacement(U["survey-option"], [{
                        placeholder: /__RADIO_ID__/gm,
                        textReplace: x
                    }, {
                        placeholder: "__RADIO_NAME__",
                        textReplace: b
                    }, {
                        placeholder: /__RADIO_VALUE__/gm,
                        textReplace: n
                    }])
                }
                return {
                    message: l.escapeTemplateReplacement(U["tawk-survey-wrapper"], [{
                        placeholder: "__QUESTION__",
                        textReplace: h[0].replace(l.regOption, "")
                    }, {
                        placeholder: "__OPTIONS__",
                        textReplace: g
                    }]),
                    isSurvey: !0
                }
            },
            updateViewByStatus: function(a) {
                "emailTranscriptFormOnChatEnded" !== d.formHandler.currentForm && "restartChatForm" !== d.formHandler.currentForm && d.formHandler.closeForm();
                if (f.isPopup) {
                    var b = Ca.getShortMessage(a);
                    document.title = b ? sa.pageName() + " - " + l.rawDecode(b) : sa.pageName()
                }
                "online" === a || "away" === a ? (f.showConsentForm ? d.formHandler.openForm("consentForm") : f.showPreChatForm && !y.prechatFormSubmitted() && d.formHandler.openForm("preChatForm"), this.showWidget(), u && (d.viewHandler.isMaximized || u.showBubble())) : "offline" === a && (f.hideWidgetOnOffline ? this.hideWidget() : (d.formHandler.openForm(f.showConsentForm ? "consentForm" : "offlineForm"), this.showWidget()), u && (u.hideBubble(),
                    this.messagePreview && this.messagePreview.removeAllElements()))
            }
        });
        X.prototype.openAgentList = function() {
            var a = this.chatContainer.getElementById("agentBar");
            "preChatForm" !== d.formHandler.currentForm && (this.scrollToBottom(), this.chatContainer.getElementById("greetingsContent") && (this.chatContainer.getElementById("greetingsContent").style.display = "none"), a.style.display = "block")
        };
        X.prototype.addProfileDetail = function(a) {
            var b = this.chatContainer.getElementById("agentProfileContainer");
            if (a.pi || 1 < d.agents.agentsCount) {
                var c =
                    new ca("profileDetail", null, null, null, this.chatContainer.documentRef);
                var e = U["agent-profile-description"];
                c.template = l.escapeTemplateReplacement(e, [{
                    placeholder: "__POSITION_CLASS__",
                    textReplace: a.pst ? "agentName" : "agentNameCentered"
                }, {
                    placeholder: "__POSITION__",
                    textReplace: a.pst
                }, {
                    placeholder: "__NAME__",
                    textReplace: a.n
                }])
            } else {
                c = new ca("profileDetailNoImage", null, {
                    className: "noImageAgentProfileDetail"
                }, null, this.chatContainer.documentRef);
                var g = a.pst ? "&nbsp-&nbsp" + a.pst : "";
                e = U["agent-profile-description-noimage"];
                c.template = l.escapeTemplateReplacement(e, [{
                    placeholder: "__POSITION__",
                    textReplace: g
                }, {
                    placeholder: "__NAME__",
                    textReplace: a.n
                }])
            }
            b.appendChild(c.buildView())
        };
        X.prototype.renderAgentWithPosition = function(a) {
            var b = this.chatContainer;
            var c = b.getElementById("agentProfileContainer");
            if (b && c && a) {
                a = N.agentProfiles[a];
                b = new ca("profileDetail" + a.pid, null, {
                    className: "agent-profile-detailed theme-background-color"
                }, null, b.documentRef);
                var e = a.pst ? a.pst : "";
                b.template = l.escapeTemplateReplacement(U["agent-profile-detailed"], [{
                    placeholder: "__POSITION__",
                    textReplace: e
                }, {
                    placeholder: "__NAME__",
                    textReplace: a.n
                }]);
                c.appendChild(b.buildView())
            }
        };
        X.prototype.renderAgentHeader = function(a) {
            var b, c = "",
                e = this.chatContainer,
                g = e.getElementById("agentProfileContainer");
            if (e && g && a) {
                var h = N.agentProfiles[a];
                (b = h.pi ? y.agentImgUrl + "/" + h.pi : "") && (c = "background-image : url('" + b + "'); background-position : 0px 0px;z-index: " + (7 - d.agents.agentsCount) + ";");
                c += "box-shadow: 0px 0px 0px 1px " + f.headerTxtColor + ";";
                h = new ca("profileImage-" + h.pid,
                    c, {
                        className: "alias-image theme-background-color"
                    }, null, e.documentRef);
                g.appendChild(h.buildView());
                this.renderAgentWithPosition(a);
                1 < d.agents.agentsCount && (g.style.width = 30 * d.agents.agentsCount - 10 * (d.agents.agentsCount - 1) + "px"); - 1 < this.chatContainer.getElementById("greetingsMainContainer").className.indexOf("minimize") && (1 === d.agents.agentsCount && this.chatContainer.getElementById("headerAccountStateContainer").classList.remove("multiple-agent"), this.chatContainer.getElementById("shortMessage").style.display =
                    "none")
            }
        };
        X.prototype.clearAgentHeader = function() {
            var a = this.chatContainer;
            a.getElementById("agentProfileContainer").innerHTML = "";
            a.getElementById("innerWrapper").className = "border-corner";
            a.getElementById("shortMessage").style.display = "block"
        };
        X.prototype.closeAgentList = function() {
            var a = this.chatContainer.getElementById("greetingsContent");
            this.chatContainer.getElementById("agentBar").style.display = "none";
            a && (l.hasClass(a, "no-content") ? this.chatContainer.getElementById("greetingsContent").style.display =
                "none" : this.chatContainer.getElementById("greetingsContent").style.display = "block")
        };
        X.prototype.calculateOwnerNameAndMessageTimeSizeAll = function() {
            var a = this.chatContainer.getElementById("chatWrapper"),
                b = null,
                c = null,
                e = null,
                g = null;
            [].forEach.call(a.getElementsByClassName("agentChatContainer"), function(h) {
                b = h.getElementsByClassName("messageOwnerName")[0];
                c = h.getElementsByClassName("messageTime")[0];
                g = h.getElementsByClassName("message")[0];
                e = h.getElementsByClassName("messageTimeContainer")[0];
                b && c &&
                    g && e && (1 < d.agents.agentsCount && g.offsetWidth < c.offsetWidth + b.offsetWidth ? (e.style.left = 45 + b.offsetWidth + "px", e.style.right = "auto") : (e.style.right = "0", e.style.left = "auto"))
            })
        };
        X.prototype.resetView = function() {};
        X.prototype.styleAgentBar = function() {};
        X.prototype.expandAgentList = function() {};
        X.prototype.hideWidget = function() {};
        X.prototype.showWidget = function() {};
        X.prototype.toggleWidget = function() {
            D.mobileBrowserName && d.viewHandler.maximize()
        };
        X.prototype.popoutWidget = function() {
            D.mobileBrowserName &&
                d.viewHandler.popup()
        };
        X.prototype.handleIndicatorToggle = function() {};
        X.prototype.begin = function() {};
        X.prototype.getViewportDimensions = function(a) {
            var b = {};
            if (a) {
                a = k;
                var c = document
            } else a = q.container.elementReferrer, c = q.container.documentRef;
            if ("undefined" !== typeof a.innerWidth) return b.height = a.innerHeight, b.width = a.innerWidth, b;
            if ("undefined" !== typeof c.documentElement && "undefined" !== typeof c.documentElement.clientWidth && 0 !== c.documentElement.clientWidth) return b.height = c.documentElement.clientHeight,
                b.width = c.documentElement.clientWidth, b;
            b.height = c.getElementsByTagName("body")[0].clientHeight;
            b.width = c.getElementsByTagName("body")[0].clientWidth;
            return b
        };
        X.prototype.getActualViewportDimensions = function() {
            var a = this.getViewportDimensions(!0);
            return {
                width: this.isVerticalScrollbar() ? a.width - this.getScrollerWidth() : a.width,
                height: this.isHorizontalScrollbar() ? a.height - this.getScrollerWidth() : a.height
            }
        };
        X.prototype.isVerticalScrollbar = function() {
            return this.getViewportDimensions(!0).height < document.body.scrollHeight
        };
        X.prototype.isHorizontalScrollbar = function() {
            var a = this.getViewportDimensions(!0).width;
            return document.documentElement && a < document.documentElement.scrollWidth || a < document.body.scrollWidth
        };
        X.prototype.getScrollerWidth = function() {
            var a = document.createElement("div");
            a.style.cssText = "position: absolute; top: -10000px; left: -10000px; width: 100px; height: 50px; overflow: hidden";
            var b = document.createElement("div");
            b.style.cssText = "width: 100%; height: 200px";
            a.appendChild(b);
            document.body.appendChild(a);
            var c = b.offsetWidth;
            a.style.overflow = "auto";
            a = b.offsetWidth;
            document.body.removeChild(document.body.lastChild);
            return c - a
        };
        X.prototype.addSurveyHandlers = function(a) {
            var b = this;
            if (this.chatContainer) {
                var c = this.chatContainer.getElementById(a);
                l.getElementsByTagName(c, "input").forEach(function(e, g) {
                    e.id && b.chatContainer.attachUserEventListener("click", function() {
                        b.lastRadioButton !== e.id && (b.lastRadioButton = e.id, d.chatHandler.sendMessage(e.value))
                    }, e.id, "survey" + a + g + "click")
                })
            }
        };
        X.prototype.ifScrollbarDown =
            function() {
                if (!this.chatContainer || !this.chatContainer.elementReferrer) return !1;
                var a = this.chatContainer.getElementById("chatContainer");
                var b = this.chatContainer.getElementById("chatPanel");
                if (a && b) {
                    if (d.formHandler.currentForm) {
                        b.style.display = "block";
                        var c = a.offsetHeight + 10;
                        a = 30 > a.scrollHeight - (a.scrollTop + c);
                        b.style.display = "none";
                        return a
                    }
                    c = a.offsetHeight + 10;
                    return 30 > a.scrollHeight - (a.scrollTop + c)
                }
            };
        X.prototype.scrollToBottom = function() {
            if (this.chatContainer && this.chatContainer.elementReferrer) {
                var a =
                    this.chatContainer.getElementById("chatContainer"),
                    b = this.chatContainer.getElementById("chatPanel");
                if (a) {
                    var c = a.style.display,
                        e = b.style.display;
                    "none" === c && (a.style.display = "block");
                    "none" === e && (b.style.display = "block");
                    a.scrollTop = 1E8;
                    "none" === c && (a.style.display = c);
                    "none" === e && (b.style.display = e); - 1 === this.chatContainer.getElementById("greetingsMainContainer").className.indexOf("minimize") && 0 !== a.scrollTop && this.toggleGreetingsView(a.scrollHeight < this.chatContainer.getElementById("chatWrapper").offsetHeight)
                }
            }
        };
        X.prototype.isChatScrollbar = function() {
            var a;
            if (this.chatContainer && this.chatContainer.elementReferrer && (a = this.chatContainer.getElementById("chatContainer"))) return a.scrollHeight > this.getViewportDimensions(f.isPopup).height - 139
        };
        X.prototype.addWaitTime = function() {
            var a;
            if (!d.chatHandler.agentHasMessaged && f.showWaitTime) {
                var b = this.chatContainer.getElementById("greetingsContent");
                if ((a = this.chatContainer.getElementById("greetingsWaitTime")) && b) {
                    var c = d.languageParser.translate("chat", "messageQueuedText", {
                        t: Math.ceil(y.waitTime / 6E4),
                        strongStart: "<b>",
                        strongEnd: "</b>"
                    });
                    a.innerHTML = c;
                    a.style.display = "block";
                    b.style.display = "block";
                    this.waitTimeUpdater(!0)
                }
            }
        };
        X.prototype.removeWaitTime = function() {
            if (this.chatContainer && this.chatContainer.elementReferrer) {
                var a = this.chatContainer.getElementById("greetingsWaitTime");
                var b = this.chatContainer.getElementById("greetingsContent");
                a && b && (a.innerHTML = "", a.style.display = "none", l.hasClass(b, "no-content") && (b.style.display = "none"))
            }
        };
        X.prototype.waitTimeUpdater =
            function(a) {
                var b, c = this;
                if (this.chatContainer && this.chatContainer.elementReferrer && (b = this.chatContainer.getElementById("greetingsWaitTime")) && !(6E4 >= y.waitTime)) {
                    var e = y.waitTime % 6E4 || 6E4;
                    if (a) return setTimeout(function() {
                        c.waitTimeUpdater()
                    }, e);
                    y.waitTime -= e;
                    a = d.languageParser.translate("chat", "messageQueuedText", {
                        t: Math.ceil(y.waitTime / 6E4),
                        strongStart: "<b>",
                        strongEnd: "</b>"
                    });
                    b.innerHTML = a;
                    setTimeout(function() {
                        c.waitTimeUpdater()
                    }, 6E4)
                }
            };
        X.prototype.appendAgentIsTypingElement = function(a) {
            var b =
                this.ifScrollbarDown(),
                c = N.agentProfiles[a];
            if (this.chatContainer) {
                var e = c && c.pi ? y.agentImgUrl + "/" + c.pi : "";
                c.strongStart = "<b>";
                c.strongEnd = "</b>";
                var g = U["agent-typing"];
                g = l.escapeTemplateReplacement(g, [{
                    placeholder: "__MESSAGE_ID__",
                    textReplace: a
                }, {
                    placeholder: /__NAME__/gm,
                    textReplace: c.n
                }, {
                    placeholder: "__IMAGE_URL__",
                    textReplace: e ? "url('" + e + "');" : "transparent;"
                }]);
                this.chatContainer.getElementById("agentTypingContainer").innerHTML += g;
                this.chatContainer.getElementById("agentTypingContainer").style.display =
                    "block";
                b && this.scrollToBottom()
            }
        };
        X.prototype.removeAgentTypingElement = function(a) {
            this.chatContainer && ((a = this.chatContainer.getElementById("agentTyping-" + a)) && a.parentNode.removeChild(a), this.chatContainer.getElementById("agentTypingContainer").style.display = "none")
        };
        X.prototype.changeRating = function(a) {
            var b = "c";
            this.chatContainer && (0 > a ? a = f.showEmoji() && "undefined" !== typeof la ? ":thumbsdown_tone2:" : "&#128078;" : 0 < a ? a = f.showEmoji() && "undefined" !== typeof la ? ":thumbsup_tone2:" : "&#128077;" : (a = d.languageParser.translate("chat",
                "remove_rate"), b = "n"), d.viewHandler.appendMessage({
                message: a,
                type: b,
                time: new Date,
                senderType: "v",
                ownerId: ea.visitorId
            }))
        };
        X.prototype.notifiyDepartmentIsNotOnline = function(a, b) {
            var c, e;
            if (e = this.chatContainer)
                if (c = e.getElementById("chatWrapper")) a = l.escapeTemplateReplacement(U.departmentOfflineNotification, [{
                        placeholder: "__TITLE__",
                        textReplace: D.isIE6 ? "<span>" + d.languageParser.translate("chat", "notificationTitle") + "</span>" : "<center><span>" + d.languageParser.translate("chat", "notificationTitle") + "</span></center>"
                    },
                    {
                        placeholder: "__MESSAGE__",
                        textReplace: d.languageParser.translate("chat", "offline" === b ? "departmentIsOffline" : "departmentIsAway", {
                            departmentName: a,
                            strongStart: "<b>",
                            strongEnd: "</b>"
                        })
                    }
                ]), e = l.createElement(e.documentRef, "div", {
                    id: "departmentOfflineNotification",
                    className: "messageContainer"
                }, null, a), c.insertBefore(e, c.firstChild)
        };
        X.prototype.setDivider = function(a, b, c) {
            var e, g = this;
            if (!this.chatContainer.documentRef.getElementById("newMessageDivider")) {
                var h = this.chatContainer.documentRef.getElementById("chatWrapper");
                var m = new ca("newMessageDivider");
                m.template = l.escapeTemplateReplacement(b, [{
                    placeholder: /__NEW_MESSAGES__/gm,
                    textReplace: d.languageParser.translate("chat", "newMessages").toUpperCase()
                }]);
                m.buildView();
                h.insertBefore(m.elementReferrer, c.elementReferrer);
                !l.chatElementInView(m.elementReferrer) && (d.viewHandler.isMaximized || f.isPopup || f.isEmbedded) && (e = this.chatContainer.documentRef.getElementById("newMessagesBar")) && (e.className = "visible", d.eventHandler.listen(e, this.clickEvent, function() {
                    g.scrollToSeeMessage(a);
                    e.className = ""
                }, "newmessagedivider"))
            }
        };
        X.prototype.removeDivider = function() {
            var a, b = this;
            clearTimeout(this.removeDividerTimeout);
            this.removeDividerTimeout = setTimeout(function() {
                (a = b.chatContainer.documentRef.getElementById("newMessageDivider")) && a.parentNode.removeChild(a)
            }, 1E3)
        };
        X.prototype.scrollToSeeMessage = function(a) {
            var b = this.chatContainer.documentRef.getElementById("chatContainer");
            a && b && (b.scrollTop = a.offsetTop - b.offsetHeight + 50, this.checkSeenMessageViewport())
        };
        X.prototype.checkUnseenMessages =
            function() {
                var a;
                if (!this.newMessageNotSeen && !this.unseenMessages.length) return !1;
                for (var b = 0; b < this.unseenMessages.length; b++) l.chatElementInView(this.unseenMessages[b]) && (this.unseenMessages.splice(b, 1), b--);
                if (!this.unseenMessages.length || D.mobileBrowserName && this.ifScrollbarDown()) this.newMessageNotSeen = !1, (a = this.chatContainer.documentRef.getElementById("newMessagesBar")) && setTimeout(function() {
                    a.className = ""
                }, 250), this.removeDivider()
            };
        X.prototype.parseUploadedFile = function(a) {
            var b = "https://tawk.link/" +
                a.name,
                c = this,
                e = U["file-upload"],
                g = this.ifScrollbarDown();
            if (-1 !== ["jpeg", "png", "gif"].indexOf(a.type) && 2E6 >= a.size) {
                var h = new Image;
                h.onload = function() {
                    var m = l.createElement(c.chatContainer.documentRef, "a", {
                            href: b,
                            target: "_blank"
                        }),
                        n = c.chatContainer.getElementById("placeholder-" + a.name),
                        x = null,
                        E = null;
                    if (n) {
                        m.appendChild(h);
                        m.className = "clearfix";
                        n.parentNode.insertBefore(m, n);
                        n.parentNode.removeChild(n);
                        if (!d.viewHandler.isMaximized && c.messagePreview) {
                            x = l.createElement(c.messagePreview.container.documentRef,
                                "a", {
                                    href: b,
                                    target: "_blank"
                                });
                            if (E = c.messagePreview.container.getElementById("placeholder-" + a.name)) x.appendChild(h), x.className = "clearfix", E.parentNode.insertBefore(x, E), E.parentNode.removeChild(E);
                            c.messagePreview.scrollToBottom()
                        }
                        setTimeout(function() {
                            k.requestAnimationFrame(function() {
                                g && c.scrollToBottom()
                            })
                        }, 1E3 / 6)
                    }
                };
                h.setAttribute("src", b);
                h.setAttribute("class", "uploaded-image");
                e = l.escapeTemplateReplacement(e, [{
                    placeholder: "__FILE_DISPLAY__",
                    textReplace: '<div class="image-loader" id="placeholder-' +
                        a.name + '">' + U.loader + "</div>"
                }])
            } else e = -1 !== ["video/mp4", "video/ogg", "video/webm"].indexOf(a.mimeType) ? l.escapeTemplateReplacement(e, [{
                placeholder: "__FILE_DISPLAY__",
                textReplace: '<video width="auto" height="auto" controls style="display: block; max-width: 420px; width: 100%;"><source src="' + b + '" type="' + a.mimeType + '"></source></video>'
            }]) : -1 !== ["audio/mp3", "audio/ogg"].indexOf(a.mimeType) ? l.escapeTemplateReplacement(e, [{
                placeholder: "__FILE_DISPLAY__",
                textReplace: '<audio controls style="display: block; max-width : 220px;"><source src="' +
                    b + '" type="' + a.mimeType + '"></source></audio>'
            }]) : U["file-upload-not-img-vid-audio"];
            return e = l.escapeTemplateReplacement(e, [{
                placeholder: "__FILE_NAME__",
                textReplace: a.fileName
            }, {
                placeholder: "__DOWNLOAD_URL__",
                textReplace: b
            }, {
                placeholder: "__DOWNLOAD_TEXT__",
                textReplace: d.languageParser.translate("chat", "downloadFile")
            }, {
                placeholder: "__FILE_SIZE__",
                textReplace: l.formatFileSize(a.size)
            }, {
                placeholder: "__FILE_TYPE__",
                textReplace: a.type
            }, {
                placeholder: "__DOWNLOAD_LABEL__",
                textReplace: d.languageParser.translate("chat",
                    "download")
            }])
        };
        X.prototype.startUpload = function(a) {
            var b = this,
                c = U.fileUploadProgress,
                e = this.ifScrollbarDown();
            var g = this.chatContainer.getElementById("fileInput");
            var h = a.name || a.fileName;
            var m = l.getElementsByClassName(b.chatContainer.elementReferrer, "upload-error");
            if (m.length)
                for (var n = 0; n < m.length; n++) m[n].parentNode.removeChild(m[n]);
            d.fileUploadHandler.getUploadHandler(function(x) {
                if (x.handle) {
                    var E = x.handle;
                    c = l.escapeTemplateReplacement(c, [{
                        placeholder: "__HANDLE__",
                        textReplace: E
                    }, {
                        placeholder: "__FILE_NAME__",
                        textReplace: l.rawEncode(h)
                    }, {
                        placeholder: "__FILE_STATUS__",
                        textReplace: d.languageParser.translate("chat", "uploading")
                    }]);
                    b.chatContainer.getElementById("chatWrapper").innerHTML += c;
                    e && b.scrollToBottom();
                    d.fileUploadHandler.uploadFile(E, a, h, function(L, B) {
                        g.value = "";
                        L.success || b.handleUploadError(a, h, E, B)
                    })
                } else b.handleUploadError(a, h, E), g.value = ""
            })
        };
        X.prototype.handleUploadError = function(a, b, c, e) {
            var g = this.ifScrollbarDown(),
                h = this,
                m = document.createElement("a"),
                n = new ca("uploadFailedNotification"),
                x = U.uploadFailedNotification;
            x = x.replace(/__UPLOAD_FAILED_LABEL__/, d.languageParser.translate("chat", "generalUploadErrorLabel"));
            x = x.replace(/__UPLOAD_FAILED_MESSAGE__/, d.languageParser.translate("chat", "generalUploadError", {
                fileName: l.rawEncode(b)
            }));
            n.template = x;
            n.buildView();
            if (a) {
                if (c) {
                    b = this.chatContainer.getElementById("upload-" + c);
                    if (!b) return;
                    b.parentNode.removeChild(b);
                    if (a && (!e || "generalUploadError" === e)) {
                        m.innerHTML = d.languageParser.translate("chat", "tryAgain");
                        m.setAttribute("href", "#");
                        m.setAttribute("id", "retry-" + c);
                        n.elementReferrer.getElementsByClassName("uploadFailedRetryContainer")[0].appendChild(m);
                        var E = d.eventHandler.listen(m, this.clickEvent, function() {
                            d.eventHandler.removeEventHandler(m, this.clickEvent, E);
                            n.elementReferrer.parentNode.removeChild(n.elementReferrer);
                            h.startUpload(a)
                        }, "retry-" + c)
                    }
                }
                this.chatContainer.getElementById("chatContainer").appendChild(n.elementReferrer);
                g && this.scrollToBottom()
            }
        };
        X.prototype.updateFileProgress = function(a) {
            var b = this.chatContainer.getElementById("upload-" +
                a.handle);
            a = a.progress / 100 * 360;
            b && (180 >= a ? (b.getElementsByClassName("circle-progress-left")[0].style.transform = "rotate(" + a + "deg)", b.getElementsByClassName("circle-progress-right")[0].style.display = "none", b.getElementsByClassName("circle-progress-clip")[0].style.display = "block") : (b.getElementsByClassName("circle-progress-left")[0].style.transform = "rotate(180deg)", b.getElementsByClassName("circle-progress-right")[0].style.transform = "rotate(" + a + "deg)", b.getElementsByClassName("circle-progress-right")[0].style.display =
                "block", b.getElementsByClassName("circle-progress-clip")[0].style.display = "none"))
        };
        X.prototype.fileUploaded = function(a) {
            (a = this.chatContainer.getElementById("upload-" + a)) && a.parentNode.removeChild(a)
        };
        X.prototype.retryUploadFile = function(a) {
            var b = this,
                c, e;
            this.retryUploadList[a] && this.startUpload(this.retryUploadList[a], function() {
                c = b.chatContainer.getElementById(a);
                e = c.parentNode;
                e.removeChild(c);
                e.parentNode.removeChild(e);
                delete b.retryUploadList[a];
                Object.keys(b.retryUploadList).length || b.chatContainer.getElementById("maxFileNotificationContainer").classList.add("hidden");
                c = null
            })
        };
        X.prototype.checkUploadFileWarning = function(a, b) {
            var c = this.chatContainer.getElementById("maxFileNotificationContainer"),
                e = this.chatContainer.getElementById("maxSizeNotificationContainer"),
                g = this.chatContainer.getElementById("maxFileSizeList"),
                h = this.chatContainer.getElementById("maxFileNumberList"),
                m = this;
            if (b.length) {
                var n = "<ul>";
                this.retryUploadList = {};
                for (var x = 0; x < b.length; x++) this.retryUploadList["retry_upload_" + x] = b[x], n += "<li>" + b[x].name + ' <a id="retry_upload_' + x + '" class="actionRetry">' +
                    d.languageParser.translate("notifications", "retry") + "</a></li>";
                h.innerHTML = n + "</ul>";
                n = l.getElementsByClassName(h, "actionRetry");
                for (b = 0; b < n.length; b++) n[b].addEventListener(m.clickEvent, function() {
                    this.classList.add("hidden");
                    m.retryUploadFile(this.id)
                });
                c.classList.remove("hidden")
            }
            if (a.length) {
                n = "<ul>";
                for (c = 0; c < a.length; c++) n += "<li>" + a[c].name + "</li>";
                g.innerHTML = n + "</ul>";
                e.classList.remove("hidden")
            }
            n && this.scrollToBottom()
        };
        X.prototype.applyWhiteLabelSettings = function() {
            if (this.chatContainer) {
                var a =
                    this.chatContainer.documentRef.getElementById(this.tawktoLinkName);
                var b = this.chatContainer.documentRef.getElementById(this.bottomContainerName);
                var c = {
                    id: this.tawktoLinkName,
                    parentElem: b,
                    siblingName: b.nextSibling ? b.nextSibling.id : null,
                    grandParentName: b.parentNode.id
                };
                f.whiteLabel().text = l.rawEncode(f.whiteLabel().text.replace(/\u26A1/, ":zap"));
                c.url = f.whiteLabel().url || null;
                c.label = l.transformLabel(f.whiteLabel().text) || null;
                f.whiteLabel().whitelabeled && (c.textColor = f.whiteLabel().textColor || "#000000");
                null === c.label ? (a = this.chatContainer.documentRef.getElementById("contentContainer"), a.className += "no-branding", b.parentNode.removeChild(b)) : (l.insertRandomTagsBeforeAndAfter(b, b.parentNode, "div"), l.insertRandomTagsBeforeAndAfter(a, a.parentNode, "a"), l.applyWhiteLabelSettings(a, c))
            }
        };
        X.prototype.showCallRequest = function(a, b, c, e) {
            var g = this;
            var h = U.incomingCallRequest;
            var m = (new Date).getTime();
            var n = (new Date(c)).getTime();
            m = b - (m - n);
            c = {
                callId: a,
                ringTimeout: b,
                startedOn: c,
                caller: e,
                isMissed: null
            };
            n = this.chatContainer.getElementById("incoming-call");
            n || (b = this.ifScrollbarDown(), d.chatHandler.webrtcWin && !d.chatHandler.webrtcWin.closed ? d.chatHandler.webrtcWin.focus() : (n = (e = N.agentProfiles[N.profiles[e.urid]]) && e.pi ? y.agentImgUrl + "/" + e.pi : "default", h = h.replace(/__IMAGE_URL__/, n ? "url('" + n + "');" : "transparent;"), h = h.replace(/__INCOMING_CALL__/, d.languageParser.translate("chat", "incoming_call_message", {
                name: e.n
            })), h = h.replace(/__ACCEPT_CALL__/, d.languageParser.translate("chat", "accept_call")).replace(/__DECLINE_CALL__/, d.languageParser.translate("chat",
                "decline_call")), clearTimeout(this.incomingCallTimeout), n = new ca("incoming-call"), n.template = h, n.buildView(), h = this.chatContainer.getElementById("chatContainer"), e = h.parentNode, h && e && (e.insertBefore(n.elementReferrer, h), h = this.chatContainer.getElementById("accept-call"), e = this.chatContainer.getElementById("decline-call"), b && this.scrollToBottom(), d.eventHandler.listen(h, this.clickEvent, function() {
                    clearTimeout(g.incomingCallTimeout);
                    l.getWebRTCToken(!1, !1, function() {
                        g.removeCallRequest()
                    })
                }, "acceptVideoCall"),
                d.eventHandler.listen(e, this.clickEvent, function() {
                    clearTimeout(g.incomingCallTimeout);
                    l.rejectCall(a, function() {
                        g.removeCallRequest()
                    })
                }, "declineVideoCall"), this.incomingCallTimeout = setTimeout(function() {
                    g.removeCallRequest()
                }, m), f.isPopup || d.viewHandler.isMaximized || f.isEmbedded || (d.viewHandler.indicator.show(), d.viewHandler.messagePreview && d.viewHandler.messagePreview.show(d.viewHandler.indicator.unansweredMessages, null, c)), d.audioPlayer.play("chat_sound"))))
        };
        X.prototype.removeCallRequest = function() {
            var a =
                this.chatContainer.getElementById("incoming-call");
            a && a.parentNode.removeChild(a);
            this.messagePreview && this.messagePreview.incomingCallContainer && this.messagePreview.removeCallRequest()
        };
        X.prototype.subscribeCallUpdate = function(a, b) {
            var c, e, g = this,
                h = this.chatContainer.documentRef,
                m = this.callData[a],
                n = this.ifScrollbarDown();
            if (m) var x = m.callView;
            else x = new ca(a, null, {
                className: "webrtcCallContainer messageContainer clearfix"
            }, null, h), x.template = l.escapeTemplateReplacement(U.callInfo, [{
                placeholder: "__LOADER__",
                textReplace: U.loader
            }]), x.buildView(), h.getElementById("chatWrapper").insertBefore(x.elementReferrer, h.getElementById("agentTypingContainer")), this.callData[a] = {
                callView: x
            };
            var E = l.getElementsByClassName(x.elementReferrer, "callLoader");
            var L = l.getElementsByClassName(x.elementReferrer, "callInfoContainer");
            var B = l.getElementsByClassName(x.elementReferrer, "callIconWrapper");
            var J = l.getElementsByClassName(x.elementReferrer, "callErrorContainer");
            E && E.length && (E[0].style.display = "block");
            J && J.length && (J[0].style.display =
                "none");
            d.socketManager.sendToConnector("getCallStatus", {
                callId: a
            }, function(aa, ia) {
                E && E.length && (E[0].style.display = "none");
                aa ? (L && L.length && (L[0].style.display = "none"), J && J.length ? J[0].style.display = "block" : (e = U.callError.replace("__HEADER__", d.languageParser.translate("chat", "error_title")).replace("__MESSAGE__", d.languageParser.translate("chat", "call_error_load")).replace("__ACTION__", d.languageParser.translate("notifications", "retry")), J = l.createElement(g.chatContainer.documentRef, "div", null,
                    null, e), J.className = "callErrorContainer", J.style.display = "block", x.elementReferrer.appendChild(J)), (c = l.getElementsByClassName(x.elementReferrer, "retry-load")) && c.length && d.eventHandler.listen(c[0], g.clickEvent, function() {
                    g.subscribeCallUpdate(a, b)
                }, "retryCallLoad" + a)) : ia.data.call.f && (L && L.length && (L[0].style.display = "block"), callIcon = ia.data.call.f.vid ? '<span class="callIcon btn-icon icon-video-chat"></span>' : ia.data.call.f.scrn ? '<span class="callIcon btn-icon icon-desktop-sharing"></span>' : '<span class="callIcon btn-icon icon-voice-chat"></span>',
                    B && B.length && (B[0].innerHTML = callIcon), g.callData[a].ver = ia.data.call.ver, n && g.scrollToBottom(), g.updateCallView(ia.data.call, b))
            })
        };
        X.prototype.updateCallView = function(a, b) {
            var c = !!a.mssd;
            var e = !!a.rjctd;
            var g = this.callData[a.clid];
            if (!g) return this.subscribeCallUpdate(a.clid);
            if (!(g.ver > a.ver)) {
                var h = this.ifScrollbarDown();
                g = g.callView;
                var m = g.elementReferrer.getElementsByClassName("btn-icon")[0];
                callIconContainerEl = g.elementReferrer.getElementsByClassName("callIconContainer")[0];
                callIconContainerEl.style.backgroundColor =
                    "#47ca2b";
                if ("ringing" === a.stts) {
                    "v" !== a.cllr.t && this.showCallRequest(a.clid, a.rt, a.so, a.cllr);
                    var n = d.languageParser.translate("chat", ("v" === a.cllr.t ? "visitor_" : "agent_") + "ringing")
                } else if ("in-progress" === a.stts) this.removeCallRequest(), n = d.languageParser.translate("chat", "ongoing_call");
                else if ("completed" === a.stts) {
                    var x = l.parseChatTime(a.so);
                    this.removeCallRequest();
                    a.f.vid || a.f.scrn || (m.style.transform = "rotate(135deg)");
                    callIconContainerEl.style.backgroundColor = "#e52f48";
                    n = {
                        callId: a.clid,
                        ringTimeout: a.rt,
                        startedOn: a.so,
                        caller: a.cllr,
                        isMissed: c
                    };
                    b || !d.viewHandler.messagePreview || D.mobileBrowserName || d.viewHandler.messagePreview.show(d.viewHandler.indicator.unansweredMessages, null, n);
                    c || e ? (n = e ? d.languageParser.translate("chat", "rejected_call") : d.languageParser.translate("chat", "missed_" + ("v" === a.cllr.t ? "agent" : "visitor")), b = d.languageParser.translate("chat", "call_started_on", {
                        startedOn: x
                    })) : (b = l.getTimeDifference(a.so, a.eo), n = d.languageParser.translate("chat", "completed_call"), b = d.languageParser.translate("chat",
                        "call_end_details", {
                            startedOn: x,
                            duration: b
                        }));
                    (e = l.getElementsByClassName(g.elementReferrer, "callEndDetails")) && e.length && (e[0].innerHTML = b, e[0].style.display = "block")
                }(g = l.getElementsByClassName(g.elementReferrer, "callTitle")) && g.length && (g[0].innerHTML = n, c && (g[0].className += " missed"));
                this.callData[a.clid].ver = a.ver;
                h && this.scrollToBottom()
            }
        };
        X.prototype.closeMessagePreview = function(a) {
            a.ts && this.messagePreview && this.messagePreview.removeAllElements(a.ts)
        };
        X.prototype.toggleGreetingsView = function(a) {
            var b =
                this.chatContainer.getElementById("chatContainer"),
                c = this.chatContainer.getElementById("greetingsMainContainer"),
                e = Math.floor(b.scrollHeight),
                g = Math.floor(b.clientHeight);
            a || e === g || 5 >= e - g ? 0 === b.scrollTop && -1 !== c.className.indexOf("minimize") && (c.className = c.className.replace(" minimize", ""), this.chatContainer.getElementById("agentProfileContainer").className = "", 1 === d.agents.agentsCount && this.chatContainer.getElementById("headerAccountStateContainer").classList.remove("multiple-agent"), this.chatContainer.getElementById("shortMessage").style.display =
                "block") : -1 === c.className.indexOf("minimize") && (c.className += " minimize", this.chatContainer.getElementById("agentProfileContainer").className = "show", 1 < d.agents.agentsCount ? this.chatContainer.getElementById("headerAccountStateContainer").classList.add("multiple-agent") : this.chatContainer.getElementById("headerAccountStateContainer").classList.remove("multiple-agent"), 0 < d.agents.agentsCount && (this.chatContainer.getElementById("shortMessage").style.display = "none"))
        };
        X.prototype.checkSeenMessageViewport =
            function() {
                var a = -1,
                    b;
                if (0 !== this.unseenMessages.length) {
                    for (var c = 0; c < this.unseenMessages.length; c++) {
                        var e = this.unseenMessages[c];
                        var g = this.chatContainer.getElementById(e);
                        g && l.chatElementInView(g) && (b = d.chatHandler.getMessageObjectById(e));
                        if (b && b.timeStamp > y.lastMessageTimestamp) {
                            a = c;
                            break
                        }
                    } - 1 !== a && (e = this.unseenMessages[this.unseenMessages.length - 1]) && (b = d.chatHandler.getMessageObjectById(e)) && this.updateLastTimestamp(b.timeStamp)
                }
            };
        X.prototype.updateLastTimestamp = function(a) {
            this.lastUpdateTimeout &&
                clearTimeout(this.lastUpdateTimeout);
            this.clearUnseenNotification();
            this.lastUpdateTimeout = setTimeout(function() {
                !(document.hidden || document.msHidden || document.webkitHidden) && a > y.lastMessageTimestamp && (y.lastMessageTimestamp = a, d.socketManager.sendToConnector("visitorChatSeen", {
                    timestamp: a
                }, function() {}))
            }, 1E3)
        };
        X.prototype.clearUnseenNotification = function() {
            var a = this.chatContainer.documentRef.getElementById("newMessagesBar");
            this.unseenMessages = [];
            a && (a.className = "");
            this.updateTotalUnseenMessages();
            this.removeDivider()
        };
        X.prototype.updateTotalUnseenMessages = function() {
            this.totalUnseenMessages = this.unseenMessages.length;
            d.viewHandler.indicator && d.viewHandler.indicator.updateUnseenMessages(this.totalUnseenMessages)
        };
        X.prototype.scrollToFirstUnseen = function() {
            var a = this.chatContainer.documentRef.getElementById("newMessageDivider");
            a ? this.scrollToSeeMessage(a) : this.scrollToBottom()
        };
        fa.prototype.openForm = function(a) {
            var b, c = this,
                e = d.viewHandler.chatContainer.getElementById("formContainer"),
                g = this.forms[a];
            if (g && this.currentForm !== a && e) {
                this.formView = null;
                if ("preChatForm" === a || "offlineForm" === a) {
                    if (b = d.viewHandler.chatContainer.getElementById("contentContainer")) b.className += " form-opened ";
                    this.formView = new va(g, a);
                    "offlineForm" === a && d.viewHandler.indicator && (d.viewHandler.indicator.pageTitleNotification.off(), d.viewHandler.indicator.hide());
                    q && q.clearTextareaResize()
                } else this.formView = new Ea(g);
                this.currentForm = a;
                this.formView.buildForm();
                this.formView.buildView(d.viewHandler.chatContainer.documentRef);
                var h = d.viewHandler.chatContainer.getElementById("greetingsMainContainer");
                b = d.viewHandler.chatContainer.getElementById("greetingsText");
                d.viewHandler.chatContainer.getElementById("chatPanel").style.display = "none";
                e.innerHTML = "";
                e.appendChild(this.formView.elementReferrer);
                e.style.display = "block";
                this.forms[a].getTitle && "consentForm" !== a && this.forms[a].getTitle() ? (b.innerHTML = this.forms[a].getTitle(), h.style.display = "block") : h.style.display = "none";
                "endChatForm" === a && (h.style.display = "block", d.viewHandler.chatContainer.getElementById("contentContainer").className =
                    "chatEndVisible");
                this.attachEventListeners();
                this.formView.addPlaceholderHandler();
                e.className = this.formView.isFormRequired ? "has-required" : "";
                d.eventHandler.listen(k, "resize", function() {
                    c.resize()
                }, "windowresizeform");
                l.redraw(e);
                "preChatForm" !== a && "offlineForm" !== a || d.eventEmitter.emit("formOpened");
                var m, n = 0,
                    x = 0,
                    E = 0;
                a = /Firefox/i.test(t.userAgent) ? "DOMMouseScroll" : "mousewheel";
                D.mobileBrowserName && (a = "touchstart touchmove touchend");
                var L = d.viewHandler.chatContainer.getElementById("formFieldsContainer");
                d.viewHandler.chatContainer.attachUserEventListener(a, function(B) {
                    var J = Math.ceil(L.scrollHeight),
                        aa = Math.ceil(L.clientHeight);
                    m = B.originalEvent ? B.originalEvent : B;
                    E = m.detail ? -40 * m.detail : m.wheelDelta;
                    var ia = 0 < E;
                    "touchmove" === B.type ? x = B.changedTouches[0].clientY : "touchstart" === B.type ? n = B.touches[0].clientY : "touchend" === B.type && (ia = n < x);
                    if (0 === L.scrollTop && -1 !== h.className.indexOf("minimize")) {
                        if (0 > E || n > x) return
                    } else if (-1 === h.className.indexOf("minimize") && (n < x || 0 < E)) return;
                    ia || J === aa || 5 >= J - aa ? 0 ===
                        L.scrollTop && -1 !== h.className.indexOf("minimize") && (h.className = h.className.replace(" minimize", "")) : -1 === h.className.indexOf("minimize") && (h.className += " minimize")
                }, "formFieldsContainer", "formContainerScroll");
                this.handleResizeofForm()
            }
        };
        fa.prototype.handleResizeofForm = function(a) {
            if (!(D.mobileBrowserName || f.isPopup || f.isEmbedded))
                if (!d.formHandler.currentForm || a) d.viewHandler.chatContainer.restyle("height", f.maximizedDimensions().height + "px !important");
                else {
                    var b = d.viewHandler.chatContainer.getElementById("formContainer");
                    a = d.viewHandler.chatContainer.getElementById("greetingsMainContainer");
                    var c = 120;
                    "offlineForm" === d.formHandler.currentForm && "block" === d.viewHandler.chatContainer.getElementById("overlayOfflineForm").style.display ? b = d.viewHandler.chatContainer.getElementById("offlineForm") : l.getElementsByClassName(b, "formFrame") ? b = l.getElementsByClassName(b, "formFrame")[0] : (b = l.getElementsByClassName(b, "formTable")[0], c = 60);
                    a && (c += a.offsetHeight);
                    a = b.offsetHeight + c;
                    a >= f.maximizedDimensions().height && (a = f.maximizedDimensions().height);
                    d.viewHandler.chatContainer.restyle("height", a + "px !important")
                }
        };
        fa.prototype.showOfflineOverlay = function() {
            d.viewHandler.chatContainer.getElementById("formContainer").className += " success"
        };
        fa.prototype.resize = function() {
            if (null !== this.formView && D.mobileBrowserName) {
                var a = d.viewHandler.chatContainer.getElementById("formContainer");
                var b = d.viewHandler.chatContainer.getElementById("formInnerHeight");
                var c = d.viewHandler.chatContainer.getElementById("headerBoxWrapper");
                if (a) {
                    var e = l.getElementsByClassName(a,
                        "formMessageField");
                    var g = l.getElementsByClassName(a, "longFormContainer");
                    e && e.length && g && g.length && (e = l.getElementsByClassName(a, "longFormBottomContainer")[0].clientHeight, g[0].style.height = d.viewHandler.iframeContainer.clientHeight - c.clientHeight - e + "px");
                    !b || "android" !== D.mobileBrowserName && "android2" !== D.mobileBrowserName && "android2.3" !== D.mobileBrowserName || (b.style.overflow = "hidden", d.viewHandler.addOverflowScroll(b))
                }
            }
        };
        fa.prototype.closeForm = function() {
            var a = d.viewHandler.chatContainer.getElementById("formContainer");
            var b = d.viewHandler.chatContainer.getElementById("submitWrapper");
            var c = d.viewHandler.chatContainer.getElementById("contentContainer");
            var e = "endChatForm" === this.currentForm,
                g = this.formView ? "preChatForm" === this.formView.elementId : null;
            if (this.currentForm || g) c && (c.className = c.className.replace(/form-opened/g, "")), a && this.formView && (this.formView = null, this.currentForm = "", a.innerHTML = "", a.style.display = "none", a.className = "", a = d.viewHandler.chatContainer.getElementById("greetingsMainContainer"), c = d.viewHandler.chatContainer.getElementById("greetingsText"),
                a && (a.style.display = "block", c.innerHTML = ""), b && (b.className = "", b.innerHTML = ""), d.eventEmitter.emit("formClosed"), e && (d.viewHandler.chatContainer.getElementById("contentContainer").className = "", d.formHandler.openForm("emailTranscriptFormOnChatEnded")), this.handleResizeofForm())
        };
        fa.prototype.attachEventListeners = function() {
            var a = this,
                b = this.formView.formData,
                c = d.viewHandler.chatContainer.getElementById("formCancel"),
                e = d.viewHandler.chatContainer.getElementById("formSubmit"),
                g = d.viewHandler.chatContainer.getElementById("formCloseChat"),
                h = this.formView.formData.fields || [],
                m = "preChatForm" === a.formView.elementId,
                n = "offlineForm" === a.formView.elementId,
                x = "formcancelclick",
                E = "formsubmitclick";
            this.formView.formData.dynamicFields && (h = this.formView.formData.dynamicFields);
            if (m) c = d.viewHandler.chatContainer.getElementById("formCancel"), e = d.viewHandler.chatContainer.getElementById("formSubmit"), x = "formcancelclick-pc", E = "formsubmitclick-pc";
            else if (n) {
                e = d.viewHandler.chatContainer.getElementById("formSubmit");
                var L = d.viewHandler.chatContainer.getElementById("resendButton");
                E = "formsubmitclick-ol"
            }
            var B = d.viewHandler.chatContainer.getElementById("newChat");
            c && d.eventHandler.listen(c, d.viewHandler.clickEvent, function(aa) {
                if (m) return d.eventEmitter.emit(a.formView.formData.saveFunc, {}, function(ia, ta) {
                    a.handleAfterSave(ia, {
                        serverData: ta
                    })
                });
                a.closeForm();
                d.eventHandler.cancelEvent(aa)
            }, x);
            e && d.eventHandler.listen(e, d.viewHandler.clickEvent, function() {
                a.submitForm()
            }, E);
            g && d.eventHandler.listen(g, d.viewHandler.clickEvent, function(aa) {
                q ? (q.container.hide(), d.viewHandler.isMaximized = !1, d.viewHandler.show()) : d.main.hideWidget();
                d.eventHandler.cancelEvent(aa)
            }, "formcloseclick");
            L && d.eventHandler.listen(L, d.viewHandler.clickEvent, function() {
                n && (d.viewHandler.chatContainer.getElementById("overlayOfflineForm").style.display = "none", d.viewHandler.chatContainer.getElementById("formFieldsContainer").style.display = "block");
                d.viewHandler.chatContainer.getElementById("submitWrapper").className = d.viewHandler.chatContainer.getElementById("submitWrapper").className.replace("visible", "");
                d.viewHandler.chatContainer.getElementById("formContainer").className =
                    d.viewHandler.chatContainer.getElementById("formContainer").className.replace("success", "")
            }, "resendButtonClick");
            B && d.eventHandler.listen(B, d.viewHandler.clickEvent, function(aa) {
                q.chatStarted();
                d.chatHandler.startNewChat();
                d.eventHandler.cancelEvent(aa)
            }, "newChat", "newChat");
            h.forEach(function(aa) {
                if (!aa.disabled) {
                    var ia = d.viewHandler.chatContainer.getElementById(aa.fieldName + "Field"),
                        ta = d.viewHandler.chatContainer.getElementById(aa.fieldName + "FieldError"),
                        na = d.viewHandler.chatContainer.getElementById(aa.fieldName +
                            "FieldErrorIcon");
                    ia && ("textarea" !== ia.nodeName.toLowerCase() && d.eventHandler.listen(ia, "keypress", function(wa) {
                        13 === wa.keyCode && a.submitForm()
                    }, "formkeypress" + aa.fieldName), d.eventHandler.listen(ia, "keydown", function(wa) {
                        13 !== wa.keyCode && setTimeout(function() {
                            "" !== ta.innerHTML && (ta.innerHTML = "", ta.style.display = "none", na.style.display = "none", ia.parentNode.className = ia.parentNode.className.replace(" error", ""))
                        }, 1)
                    }, "formkeydown" + aa.fieldName))
                }
            });
            if (b.otherEvent) {
                var J = b.otherEvent;
                (L = d.viewHandler.chatContainer.getElementById(J.elementName)) &&
                d.eventHandler.listen(L, J.eventName, function() {
                    J.executedFunc()
                }, "formother")
            }
        };
        fa.prototype.submitForm = function() {
            var a = this,
                b = d.viewHandler.chatContainer.getElementById("formSubmit"),
                c = d.viewHandler.chatContainer.getElementById("formCancel"),
                e = d.viewHandler.chatContainer.getElementById("formCloseChat"),
                g = d.viewHandler.chatContainer.getElementById("submitWrapper");
            var h = this.validateForm();
            if (null === h) g.className = "";
            else {
                g.innerHTML = '<p id="submitWrapperMessage">' + d.languageParser.translate("form",
                    "SubmittingProcess") + "</p>" + U.loader;
                g.className = "visible";
                b && b.setAttribute("disabled", "disabled");
                c && c.setAttribute("disabled", "disabled");
                e && e.setAttribute("disabled", "disabled");
                a.handleResizeofForm(!0);
                if (this.formView.formData.publish) return d.socketManager.sendToConnector(this.formView.formData.publish, h, function(m, n) {
                    h.serverData = n;
                    a.handleAfterSave(m, h)
                });
                if (this.formView.formData.saveFunc) try {
                    d.eventEmitter.emit(this.formView.formData.saveFunc, h, function(m, n) {
                        h.serverData = n;
                        a.handleAfterSave(m,
                            h)
                    })
                } catch (m) {
                    a.handleAfterSave(!0), ma.handleError("Unable to emit form handler save func : " + this.formView.formData.saveFunc + " with data : " + JSON.stringify(h), m.fileName, m.lineNumber, m.stack)
                }
            }
        };
        fa.prototype.handleAfterSave = function(a, b) {
            if (d && d.formHandler.formView && d.formHandler.formView.formData) {
                var c = d.formHandler.formView.formData.afterSave;
                var e = d.viewHandler.chatContainer.getElementById("formSubmit");
                var g = d.viewHandler.chatContainer.getElementById("formCancel");
                var h = d.viewHandler.chatContainer.getElementById("formCloseChat");
                var m = d.viewHandler.chatContainer.getElementById("submitWrapper");
                var n = d.viewHandler.chatContainer.getElementById("transcriptEmailField");
                var x = "emailTranscriptFormOnChatEnded" === this.currentForm;
                var E = "offlineForm" === d.formHandler.formView.elementId;
                m.className = "";
                m.innerHTML = "";
                e && e.removeAttribute("disabled");
                g && g.removeAttribute("disabled");
                h && h.removeAttribute("disabled");
                if (a) return this.updateFormStatus(a);
                c && c(b);
                x ? n.value = "" : (E && (d.viewHandler.chatContainer.getElementById("overlayOfflineForm").style.display =
                    "block", d.viewHandler.chatContainer.getElementById("formFieldsContainer").style.display = "none"), this.formView.formData.dontCloseForm ? this.updateFormStatus() : this.closeForm())
            }
        };
        fa.prototype.updateFormStatus = function(a) {
            if (d.viewHandler.chatContainer) {
                var b = d.viewHandler.chatContainer.getElementById("formSavingStatus");
                var c = d.viewHandler.chatContainer.getElementById("savingStatus");
                var e = d.viewHandler.chatContainer.getElementById("submitWrapper");
                b && c ? a ? (b.className = "errorMessage", c.innerHTML = d.languageParser.translate("form",
                    "errorSaving"), a = l.getElementsByClassName(d.viewHandler.chatContainer.documentRef, "longFormContainer"), a.length && (a[0].scrollTop = 999999999999)) : (b.className = "", c.innerHTML = d.languageParser.translate("form", "saved")) : this.currentForm && "offlineForm" === this.currentForm ? a ? (e.className = "visible", e.innerHTML = "<p>" + d.languageParser.translate("form", "OfflineMessageNotSent") + "</p>", setTimeout(function() {
                    e.className = ""
                }, 3E3)) : (e.className = "", this.clearForm()) : e.className = ""
            }
        };
        fa.prototype.validateForm = function() {
            var a,
                b = {},
                c = 0,
                e = this;
            if (this.formView) {
                var g = this.formView.formData.fields || [];
                this.formView.formData.dynamicFields && (g = this.formView.formData.dynamicFields);
                g.forEach(function(h) {
                    if ("additionalQuestion" === h.fieldName && h.getValue && l.isArray(h.getValue())) b.additionalQuestion = {}, h.getValue().forEach(function(B, J) {
                        (L = d.viewHandler.chatContainer.getElementById(h.fieldName + J)) && (b.additionalQuestion[J] = B === L.value ? null : l.trim(L.value))
                    });
                    else if ("checkbox" === h.fieldType || "radio" === h.fieldType) {
                        var m = d.viewHandler.chatContainer.documentRef.getElementsByName(h.fieldName +
                            "group");
                        var n = d.viewHandler.chatContainer.getElementById(h.fieldName + "FieldError");
                        var x = d.viewHandler.chatContainer.getElementById(h.fieldName + "Container");
                        formLabelEl = x.parentElement.parentElement.getElementsByClassName("form-field-label")[0];
                        errorIconEl = d.viewHandler.chatContainer.getElementById(h.fieldName + "FieldErrorIcon");
                        m = "checkbox" === h.fieldType ? e.getSelectedCheckbox(m, h.isRequired) : e.getSelectedRadio(m, h.isRequired);
                        n.innerHTML = "";
                        n.style.display = "none";
                        errorIconEl.style.display = "none";
                        x.className = x.className.replace("error", "");
                        if (null === m) {
                            c++;
                            var E = !1;
                            n.innerHTML = d.languageParser.translate("form", h.languageKey + "ErrorMessage");
                            n.style.display = "block";
                            errorIconEl.style.display = "block";
                            x.className += " error";
                            formLabelEl.style.color = "#e52f48"
                        } else formLabelEl.style.color = "#707070", b[h.fieldName] = m
                    } else {
                        var L = d.viewHandler.chatContainer.getElementById(h.fieldName + "Field");
                        n = d.viewHandler.chatContainer.getElementById(h.fieldName + "FieldError");
                        errorIconEl = d.viewHandler.chatContainer.getElementById(h.fieldName +
                            "FieldErrorIcon");
                        if (!L) return;
                        x = h.placeholderText === L.value ? null : l.trim(L.value);
                        E = e[h.validation](x, h.valueMaxLength, h.isRequired);
                        n.innerHTML = "";
                        n.style.display = "none";
                        errorIconEl.style.display = "none";
                        L.parentNode.className = L.parentNode.className.replace("error", "");
                        E ? b[h.fieldName] = x : (c++, n.innerHTML = d.languageParser.translate("form", h.languageKey + "ErrorMessage"), n.style.display = "block", errorIconEl.style.display = "block", L.parentNode.className += " error")
                    }
                    a || E || (a = L)
                });
                return 0 < c ? (a && (g = d.viewHandler.chatContainer.getElementById("formContainer"),
                    g.scrollTop = a.offsetTop), null) : b
            }
        };
        fa.prototype.isValidString = function(a, b, c) {
            return c || a ? !(!a || !l.isString(a) || b && !(b && a.length <= b)) : !0
        };
        fa.prototype.isValidEmail = function(a, b, c) {
            return c || a ? !!(a && l.isEmail(a) && l.isString(a) && a.length <= b) : !0
        };
        fa.prototype.isValidDepartment = function(a, b, c) {
            var e;
            b = y.departments;
            if (!(c || a && "0" !== a)) return !0;
            for (e in b)
                if (b[e].did === a) return !0;
            return !1
        };
        fa.prototype.getSelectedCheckbox = function(a, b) {
            for (var c = [], e = 0, g = a.length; e < g; e++) a[e].checked && c.push(a[e].value);
            return !c.length && b ? null : c
        };
        fa.prototype.getSelectedRadio = function(a, b) {
            for (var c = "", e = 0, g = a.length; e < g; e++)
                if (a[e].checked) {
                    c = a[e].value;
                    break
                }
            return !c && b ? null : c
        };
        fa.prototype.isValidPhone = function(a, b, c) {
            if (!c && !a) return !0;
            "+" === a.charAt(0) && (a = a.replace("+", ""));
            return !!(a.length && 7 <= a.length && a.match(/[0-9]/im))
        };
        fa.prototype.handlePrechatForm = function(a) {
            a = l.getDepartmentStatus(a.department);
            a.isOnline || d.viewHandler.notifiyDepartmentIsNotOnline(a.name, a.status);
            d.formHandler.formView.formData.dontCloseForm = !1
        };
        fa.prototype.handleChatEnded = function(a) {
            d.formHandler.formView.formData.dontCloseForm = !1;
            N.chatId = a.serverData.nextChatId;
            d.chatHandler.endChat(a.serverData.chatEndVersion);
            d.viewHandler.resetView()
        };
        fa.prototype.clearForm = function() {
            var a = this.formView.formData.fields || [];
            this.formView.formData.dynamicFields && (a = this.formView.formData.dynamicFields);
            a.forEach(function(b, c) {
                if ("name" !== b.fieldType && "email" !== b.fieldType && "department" !== b.fieldType)
                    if ("checkbox" === b.fieldType || "radio" === b.fieldType) {
                        b =
                            d.viewHandler.chatContainer.documentRef.getElementsByName(b.fieldName + "group");
                        c = 0;
                        for (var e = b.length; c < e; c++) b[c].checked = !1
                    } else if (c = d.viewHandler.chatContainer.getElementById(b.fieldName + "Field")) c.value = "", "checkbox" === b.fieldType || "radio" === b.fieldType || D.isPlaceholderSupported || (c.value = b.placeholderText)
            })
        };
        var pa = TawkClass.extend({
            init: function() {
                var a = this,
                    b = f.minimizedDimensions().width,
                    c = f.minimizedDimensions().height;
                this.shown = this.inDocument = !1;
                this.indicatorWidth = this.indicatorHeight =
                    21;
                this.frameHeight = c + "px";
                this.frameWidth = b + "px";
                this.offsetX = f.widgetOffsetX;
                this.offsetY = f.widgetOffsetY;
                this.messagePreviewHeight = null;
                this.messagePreviewOffset = 25;
                f.isDesktopRectangle() ? (this.container = new qa(l.getRandomName(), l.getGenericStyle({
                        zindex: "1000001",
                        position: "fixed",
                        bottom: this.offsetY,
                        display: "none",
                        height: this.frameHeight,
                        width: this.frameWidth,
                        maxheight: this.frameHeight,
                        maxwidth: this.frameWidth,
                        minheight: "40px",
                        minwidth: "126px"
                    }), Aa, "iframe"), this.container.template = U["tawkchat-minified-iframe-element-rectangle"],
                    this.chatIndicator = new qa(l.getRandomName(), l.getGenericStyle({
                        zindex: "1000003",
                        margin: "0px",
                        width: this.frameWidth,
                        height: "37px",
                        position: "fixed",
                        display: "none",
                        bottom: c + "px",
                        left: "100%",
                        maxheight: "37px",
                        maxwidth: this.frameWidth,
                        minheight: "37px",
                        minwidth: this.frameWidth
                    }), Aa, "iframe")) : (this.frameWidth = this.frameHeight = "60px", this.container = new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "1000001",
                    position: "fixed",
                    bottom: this.offsetY,
                    display: "none",
                    height: this.frameHeight,
                    width: this.frameWidth,
                    maxheight: this.frameHeight,
                    maxwidth: this.frameWidth,
                    minheight: this.frameHeight,
                    minwidth: this.frameWidth,
                    borderRadius: "50%"
                }), Aa, "iframe"), this.container.restyle("box-shadow", "rgba(0, 0, 0, 0.16) 0px 2px 10px 0px !important"), this.container.template = U["tawkchat-minified-iframe-element-round"], this.chatIndicator = new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "1000003",
                    margin: "0px",
                    width: "60px",
                    height: "22px",
                    position: "fixed",
                    display: "none",
                    bottom: "57px",
                    left: "100%",
                    maxheight: "22px",
                    maxwidth: "60px",
                    minheight: "22px",
                    minwidth: "60px"
                }), Aa, "iframe"));
                f.isCenterPositioned() ? this.messagePreviewHeight = .5 * Math.max(document.documentElement.clientHeight, k.innerHeight || 0) + .5 * f.minimizedDimensions().width + 20 - this.messagePreviewOffset + "px" : this.messagePreviewHeight = Math.max(document.documentElement.clientHeight, k.innerHeight || 0) - (f.minimizedDimensions().height + this.offsetY) - this.messagePreviewOffset + "px";
                this.messagePreview = new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "999999",
                    width: "378px",
                    height: this.messagePreviewHeight,
                    position: "fixed",
                    display: "none",
                    bottom: f.minimizedDimensions().height + this.offsetY + 10 + "px",
                    right: this.offsetX + "px"
                }), Aa, "iframe");
                this.bubbleContainer = new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "1000000",
                    width: "146px",
                    height: "85px",
                    position: "fixed",
                    display: "none",
                    bottom: c + 2 + "px",
                    right: "20px",
                    maxheight: "85px",
                    maxwidth: "146px",
                    minheight: "85px",
                    minwidth: "146px"
                }), Aa, "iframe");
                f.minimizedDimensions.subscribe(function(e) {
                    a.frameHeight = e.height + "px";
                    a.frameWidth = e.width + "px";
                    a.widgetDimensionsUpdated()
                });
                y.pageStatus.subscribe(function(e) {
                    a.updateGreetings(e);
                    a.updateStatus(e)
                });
                y.chatBubbleClosed.subscribe(function(e) {
                    e && a.bubbleContainer && a.bubbleContainer.clear()
                });
                f.chatBubble.subscribe(function() {
                    a.bubbleSettingsChanged()
                });
                f.isRTL.subscribe(function() {
                    a.bubbleSettingsChanged()
                });
                f.desktopWidget.subscribe(function() {
                    b = f.minimizedDimensions().width;
                    c = f.minimizedDimensions().height;
                    a.offsetX = f.widgetOffsetX;
                    a.offsetY = f.widgetOffsetY;
                    f.isDesktopRectangle() ? (a.container.template = U["tawkchat-minified-iframe-element-rectangle"],
                        a.chatIndicator.massRestyle(l.getGenericStyle({
                            zindex: "1000003",
                            margin: "0px",
                            width: a.indicatorWidth + "px",
                            height: a.indicatorHeight + "px",
                            position: "fixed",
                            display: "none",
                            bottom: a.offsetY + "px",
                            left: a.offsetY + "px",
                            maxheight: a.indicatorHeight + "px",
                            maxwidth: a.indicatorWidth + "px",
                            minheight: a.indicatorHeight + "px",
                            minwidth: a.indicatorWidth + "px"
                        }))) : (a.container.template = U["tawkchat-minified-iframe-element-round"], a.chatIndicator.massRestyle(l.getGenericStyle({
                        zindex: "1000003",
                        margin: "0px",
                        width: "60px",
                        height: "22px",
                        position: "fixed",
                        display: "none",
                        bottom: "57px",
                        left: "100%",
                        maxheight: "22px",
                        maxwidth: "60px",
                        minheight: "22px",
                        minwidth: "60px"
                    })));
                    a.container.massRestyle(l.getGenericStyle({
                        zindex: "1000001",
                        position: "fixed",
                        bottom: f.isDesktopRectangle() ? "0px" : a.offsetY,
                        display: "none",
                        height: a.frameHeight,
                        width: a.frameWidth,
                        maxheight: a.frameHeight,
                        maxwidth: a.frameWidth,
                        minheight: a.frameHeight,
                        minwidth: a.frameWidth
                    }));
                    a.bubbleContainer && a.bubbleContainer.elementReferrer && a.bubbleContainer.clear();
                    a.buildView();
                    a.updateStatus()
                });
                f.showMessagePreview.subscribe(function() {
                    f.showMessagePreview() ? a.initMessagePreviewContainer() : a.destroyMessagePreviewContainer()
                })
            },
            buildView: function() {
                if (this.container && (d.MinifiedStyle = d.MinifiedStyle.replace(/#tawktoLink/g, "#" + d.viewHandler.tawktoLinkName), d.MinifiedStyle = d.MinifiedStyle.replace(/#bottomContainer/g, "#" + d.viewHandler.bottomContainerName), f.showMessagePreview() ? this.initMessagePreviewContainer() : this.destroyMessagePreviewContainer(), this.chatIndicator.buildIframe(d.MinifiedStyle +
                        f.minStyle(), !0), l.getElementsByTagName(this.chatIndicator.documentRef, "body")[0].innerHTML = U["tawkchat-chat-indicator"], this.container.buildIframe(d.MinifiedStyle + f.minStyle()), this.bubbleContainer && (f.chatBubble() && this.bubbleContainer.elementReferrer ? this.bubbleContainer.buildIframe(d.MinifiedStyle + f.minStyle(), !0) : this.bubbleContainer.clear()), this.widgetDimensionsUpdated(), this.updateGreetings(), this.attachEvents(), this.inDocument = !0, f.isDesktopRectangle())) {
                    var a = this.container.getElementById("tawkchat-minified-container"),
                        b = f.topCorner + "px ",
                        c = f.bottomCorner + "px ";
                    a.style.borderRadius = b + b + c + c
                }
            },
            attachEvents: function() {
                this.container && (this.container.attachUserEventListener(d.viewHandler.clickEvent, function(a) {
                    "max" === y.chatWindowState() ? (d.viewHandler.userAction = !0, d.sessionHandler.notifyWindowState("min")) : "max" === f.onClickAction ? (d.viewHandler.userAction = !0, d.sessionHandler.notifyWindowState("max")) : d.viewHandler.popoutWidget();
                    d.eventHandler.cancelEvent(a)
                }, "tawkchat-minified-wrapper", "minifiedclick"), this.container.attachUserEventListener("mousedown",
                    function(a) {
                        d.viewHandler.lastFocusedElement = k.document.activeElement
                    }, "tawkchat-minified-wrapper", "minifiedWidgetMouseDown"), this.attachBubbleEvents())
            },
            createCanvasChatBubble: function() {}
        });
        pa.prototype.updateStatus = function(a) {
            var b;
            a || (a = y.pageStatus());
            if (this.container && a) {
                if (b = this.container.getElementById("tawkchat-status-icon")) b.className = a;
                if (b = this.container.getElementById("tawk-minified-mobile-text")) b.innerHTML = "online" === a || "away" === a ? d.languageParser.translate("chat", "chat_text") :
                    d.languageParser.translate("chat", "mail_text");
                try {
                    d.eventEmitter.emit("resizeIframeHeight")
                } catch (c) {
                    ma.handleError("Unable to emit resizeIframeHeight", c.fileName, c.lineNumber, c.stack)
                }
            }
        };
        pa.prototype.attachBubbleEvents = function() {
            this.bubbleContainer && this.bubbleContainer.attachUserEventListener(d.viewHandler.clickEvent, d.sessionHandler.closeBubble, "tawkchat-chat-bubble-close", "bubblecloseclick")
        };
        pa.prototype.hide = function() {
            this.container && (this.shown = !1, this.container.restyle("display", "none !important"),
                this.hideBubble())
        };
        pa.prototype.show = function() {
            this.container && (this.shown = !0, this.container.restyle("display", "block !important"), this.showBubble())
        };
        pa.prototype.widgetDimensionsUpdated = function() {
            this.container && (f.isDesktopRectangle() ? (minWidth = f.minimizedDimensions().width, minHeight = f.minimizedDimensions().height) : minHeight = minWidth = 60, this.container.massRestyle({
                height: minHeight + "px !important",
                "min-height": minHeight + "px !important",
                "max-height": minHeight + "px !important",
                width: minWidth + "px !important",
                "min-width": minWidth + "px !important",
                "max-width": minWidth + "px !important",
                "border-radius": f.isDesktopRectangle() ? "0 !important" : "50% !important"
            }), this.widgetPositonChanged(), this.bubbleSettingsChanged(), this.calculateIndicatorPositioning())
        };
        pa.prototype.bubbleSettingsChanged = function() {
            var a = f.chatBubble();
            if (!a && this.bubbleContainer || f.hideWidgetOnLoad) return this.bubbleContainer.clear();
            d && d.viewHandler && d.viewHandler.iframeContainer && d.viewHandler.iframeContainer.elementReferrer && (a && (a.type &&
                "text" !== a.type || this.bubbleContainer.elementReferrer && this.bubbleContainer.insertCssFile(".bubble-text-color{color:" + (f.chatBubble() ? f.chatBubble().config.foreground : "#ffffff") + ";}", !0), a && (this.bubbleContainer || (this.bubbleContainer = new qa(l.getRandomName(), l.getGenericStyle({
                        zindex: "1000000",
                        width: "146px",
                        height: "85px",
                        position: "fixed",
                        display: "none",
                        bottom: minHeight + 2 + "px",
                        right: "20px",
                        maxheight: "85px",
                        maxwidth: "146px",
                        minheight: "85px",
                        minwidth: "146px"
                    }), Aa, "iframe")), this.bubbleContainer.elementReferrer ||
                    (d.viewHandler.iframeContainer.elementReferrer.appendChild(this.bubbleContainer.buildView(), !0), this.bubbleContainer.buildIframe(d.MinifiedStyle + f.minStyle(), !0)))), this.createBubble(), this.attachBubbleEvents())
        };
        pa.prototype.updateGreetings = function(a) {
            var b;
            a || (a = y.pageStatus());
            this.container && a && (b = this.container.getElementById("short-message")) && (a = Ca.getShortMessage(a), null !== a && (b.innerHTML = a))
        };
        pa.prototype.clear = function() {
            this.container.clear();
            this.container = null
        };
        pa.prototype.widgetPositonChanged =
            function() {
                var a = this.offsetX,
                    b = this.offsetY,
                    c = a + "px";
                if (f.isCenterPositioned()) {
                    f.isDesktopRectangle() && (c = .5 * f.minimizedDimensions().height - .5 * f.minimizedDimensions().width + "px");
                    if (f.isRightPositioned()) {
                        bodyClassName = "center right";
                        var e = f.isDesktopRectangle() ? l.getRotateStyling("-90", "49%") : l.getRotateStyling("0", "0");
                        e.right = c;
                        e.left = "auto !important"
                    } else bodyClassName = "center left", e = f.isDesktopRectangle() ? l.getRotateStyling("90", "49%") : l.getRotateStyling("0", "0"), e.left = c, e.right = "auto !important";
                    f.isDesktopRectangle() || (e.transform = "unset");
                    e.top = "calc(50% - " + .5 * f.minimizedDimensions().height + "px) !important";
                    e.bottom = "auto !important"
                } else e = l.getRotateStyling("0", "0"), e.margin = "0px !important", f.isTopPositioned() ? (e.top = b + "px !important", e.bottom = "auto !important", bodyClassName = " top ") : (e.top = "auto !important", e.bottom = b + "px !important", bodyClassName = " bottom "), f.isRightPositioned() ? (bodyClassName += " right ", e.right = a + "px !important", e.left = "auto !important") : (bodyClassName += " left ",
                    e.left = a + "px !important", e.right = "auto !important");
                this.container.massRestyle(e)
            };
        pa.prototype.createBubble = function() {
            if (this.bubbleContainer && this.bubbleContainer.elementReferrer && !f.hideWidget && f.chatBubble && !y.chatBubbleClosed()) {
                f.chatBubble().type && "text" !== f.chatBubble().type ? this.createImageBubble() : this.createDefaultBubble();
                var a = this.bubbleContainer.getElementById("tawkchat-chat-bubble-close");
                this.bubbleContainer.attachUserEventListener("mouseover", function() {
                        a && (a.style.visibility = "visible")
                    },
                    null, "bubbleHover");
                this.bubbleContainer.attachUserEventListener("mouseout", function() {
                    a && (a.style.visibility = "hidden")
                }, null, "bubbleOut");
                this.bubbleContainer.attachUserEventListener(d.viewHandler.clickEvent, function(b) {
                    "max" === f.onClickAction ? (d.viewHandler.userAction = !0, d.sessionHandler.notifyWindowState("max")) : d.viewHandler.popoutWidget();
                    d.eventHandler.cancelEvent(b)
                }, "bubble-image", "bubbleContainerClick");
                d.viewHandler.isMaximized || this.showBubble()
            }
        };
        pa.prototype.calculateBubblePositioning =
            function(a, b, c, e, g, h, m) {
                var n = f.minimizedDimensions().width,
                    x = "image" === f.chatBubble().type && "gallery" === f.chatBubble().config.image.type;
                if (f.isCenterPositioned()) {
                    var E = -.5 * b;
                    var L = e;
                    0 === h ? (n = x ? 0 : .5 * (n - b), c += "px !important") : x ? (L = n = 0, c = -1 * (.5 * (a - b) - e) + "px !important") : (n = .5 * (n - a), c = -1 * (.5 * (a - b) - c) + "px !important");
                    h = l.getRotateStyling(h, "49%");
                    f.isRightPositioned() ? (h.right = c, h.left = "auto !important") : (h.left = c, h.right = "auto !important");
                    h.top = "50% !important";
                    h.bottom = "auto !important";
                    E = E - n + L
                } else h =
                    l.getRotateStyling("0", "0"), E = "0", f.isTopPositioned() ? (h.top = e + "px !important", h.bottom = "auto !important", m += " top ") : (h.bottom = e + "px !important", h.top = "auto !important", m += " bottom "), f.isRightPositioned() ? (h.right = c + "px !important", h.left = "auto !important", m += " right ") : (h.left = c + "px !important", h.right = "auto !important", m += " left ");
                h.width = a + "px !important";
                h["max-width"] = a + "px !important";
                h["min-width"] = a + "px !important";
                h.height = b + "px !important";
                h["max-height"] = b + "px !important";
                h["min-height"] =
                    b + "px !important";
                h["z-index"] = (0 === g ? "1000000" : "1000002") + " !important";
                h.margin = E + "px 0 0 0 !important";
                this.bubbleContainer.massRestyle(h);
                this.bubbleContainer.documentRef.body.className += m
            };
        pa.prototype.createDefaultBubble = function() {
            var a = 0;
            var b = !!document.createElement("canvas").getContext;
            var c = " default ",
                e = D.isIE && 9 > D.version;
            if (b || e) {
                l.getElementsByTagName(this.bubbleContainer.documentRef, "body")[0].innerHTML = U["tawkchat-chat-bubble-canvas"];
                b && this.createCanvasChatBubble();
                b = this.bubbleContainer.getElementById("tawkchat-chat-bubble-text");
                b.innerHTML = l.rawEncode(f.chatBubble().config.content);
                b.style.color = f.chatBubble().config.foreground;
                if (f.isCenterPositioned()) {
                    if (f.isRightPositioned()) {
                        var g = -90;
                        a -= 10;
                        f.isRTL() && (a = f.minimizedDimensions().width - 146)
                    } else g = 90, a = f.isDesktopRectangle() ? f.minimizedDimensions().width - 146 + 10 : 10, f.isRTL() && (a = 0);
                    b = f.minimizedDimensions().height + this.offsetX + 2
                } else a = f.minimizedDimensions().height + this.offsetY + 2, b = !f.isRightPositioned() && !f.isRTL() || f.isRightPositioned() && f.isRTL() ? f.isDesktopRectangle() ?
                    f.minimizedDimensions().width - 146 + 16 : 10 : 0;
                f.isRTL() && (c += " rtl-direction");
                this.calculateBubblePositioning(146, 85, b, a, 0, g, c)
            }
        };
        pa.prototype.createImageBubble = function() {
            var a = l.getElementsByTagName(this.bubbleContainer.documentRef, "body")[0];
            var b = f.chatBubble().config,
                c = b.height + 16,
                e = 0;
            if ("gallery" === b.image.type) {
                var g = parseInt(b.image.content, 10);
                var h = 22 === g;
                f.isDesktopRectangle() || (g += "-r");
                g = f.isCenterPositioned() ? g + (f.isRightPositioned() ? "-cr" : "-cl") : f.isTopPositioned() ? g + (f.isRightPositioned() ?
                    "-tr" : "-tl") : g + (f.isRightPositioned() ? "-br" : "-bl");
                var m = " gallery ";
                g = "https://static-v.tawk.to/a-v3/images/bubbles/" + g + (h ? ".png" : ".svg");
                f.isCenterPositioned() && 0 === b.rotate && (m += " center-right");
                a.innerHTML = l.escapeTemplateReplacement(U["tawkchat-chat-bubble-gallery"], [{
                    placeholder: "__IMAGE_SRC__",
                    textReplace: g
                }, {
                    placeholder: "__IMAGE_SIZE__",
                    textReplace: "width:" + b.width + "px; height:" + b.height + "px;"
                }])
            } else m = " upload ", g = "https://tawk.link/" + b.image.content, a.innerHTML = l.escapeTemplateReplacement(U["tawkchat-chat-bubble-upload"], [{
                placeholder: "__IMAGE_SRC__",
                textReplace: g
            }]);
            f.isTopPositioned() || f.isCenterPositioned() ? (e += b.offsetY, f.isCenterPositioned() && 0 === b.rotate && (e -= 16)) : e += b.offsetY;
            a = b.offsetX;
            f.isCenterPositioned() && 0 !== b.rotate && (a = "gallery" === b.image.type ? a - 3 : a + 2);
            this.calculateBubblePositioning(b.width, c, a, e, b.zIndex, b.rotate, m)
        };
        pa.prototype.toggleBubble = function() {
            f.chatBubble && this.bubbleContainer && this.bubbleContainer.elementReferrer && (this.shown && "offline" !== y.pageStatus() ? this.bubbleContainer.restyle("display",
                "block !important") : this.bubbleContainer.restyle("display", "none !important"))
        };
        pa.prototype.calculateIndicatorPositioning = function() {
            var a = {},
                b = this.indicatorWidth,
                c = this.indicatorHeight,
                e = f.minimizedDimensions().width,
                g = f.minimizedDimensions().height,
                h = "",
                m = this.offsetX,
                n = this.offsetY;
            if (f.isCenterPositioned()) {
                if (f.isRightPositioned()) {
                    a.right = n + g - c + 5 + "px !important";
                    a.top = "calc(50% - " + .5 * e + "px) !important";
                    a.left = "auto !important";
                    var x = "right";
                    a.bottom = "auto !important";
                    f.isDesktopRectangle() ?
                        (a.right = n + g - c + 5 + "px !important", f.isRTL() && (a.bottom = "calc(50% - " + (.5 * e + 5) + "px) !important", a.top = "auto !important")) : (f.isRTL() ? a.right = g + "px !important" : a.right = m - 5 + "px !important", a.left = "auto !important")
                } else a.right = "auto !important", x = "left", a.bottom = "auto !important", f.isDesktopRectangle() ? (a.top = "calc(50% - " + (.5 * e + 5) + "px) !important", a.left = n + g - c + 5 + "px !important", f.isRTL() || (a.top = "calc(50% + " + (.5 * e - .5 * c) + "px) !important")) : (a.top = "calc(50% - " + .5 * e + "px) !important", f.isRTL() ? a.left =
                    m - 5 + "px !important" : a.left = m + e - b + 5 + "px !important", a.right = "auto !important");
                h += " bottom " + x
            } else f.isTopPositioned() ? (h += " top ", a.top = n + "px !important", a.bottom = "auto !important") : (h += " bottom ", a.top = "auto !important", f.isDesktopRectangle() ? a.bottom = g - m - 5 + "px !important" : a.bottom = g + n - f.widgetOffsetY + "px !important"), f.isRightPositioned() ? (h += " right ", f.isRTL() ? f.isDesktopRectangle() ? a.right = e - 5 + "px !important" : a.right = e + "px !important" : f.isDesktopRectangle() ? a.right = "1px !important" : a.right =
                m - 5 + "px !important", a.left = "auto !important") : (h += " left ", f.isRTL() ? a.left = m - 5 + "px !important" : a.left = m + e - b + 5 + "px !important", a.right = "auto !important");
            a.width = b + "px !important";
            a["max-width"] = b + "px !important";
            a["min-width"] = b + "px !important";
            a.height = c + "px !important";
            a["max-height"] = c + "px !important";
            a["min-height"] = c + "px !important";
            this.chatIndicator.documentRef.body.className += " " + h + " round";
            this.chatIndicator.massRestyle(a)
        };
        pa.prototype.showBubble = function() {
            this.bubbleContainer && "offline" !==
                y.pageStatus() && (!d.viewHandler.messagePreview || d.viewHandler.messagePreview && 1 > d.viewHandler.messagePreview.messagePreviewCount) && this.bubbleContainer.show()
        };
        pa.prototype.hideBubble = function() {
            this.bubbleContainer && this.bubbleContainer.hide()
        };
        pa.prototype.initMessagePreviewContainer = function() {
            var a = d.viewHandler.iframeContainer;
            this.messagePreview = new qa(l.getRandomName(), l.getGenericStyle({
                zindex: "999999",
                width: "378px",
                height: this.messagePreviewHeight,
                position: "fixed",
                display: "none",
                bottom: f.minimizedDimensions().height +
                    this.offsetY + 10 + "px",
                right: this.offsetX + "px"
            }), Aa, "iframe");
            d.viewHandler.messagePreview = new ha(this.messagePreview);
            this.messagePreview.elementReferrer || a.elementReferrer.appendChild(this.messagePreview.buildView(a.documentRef));
            this.messagePreview.buildIframe(d.MinifiedStyle + f.minStyle());
            a = l.getElementsByTagName(this.messagePreview.documentRef, "body")[0];
            var b = U["tawkchat-message-preview"];
            b = b.replace(/__TAWK_TO_LINK__/gm, d.viewHandler.tawktoLinkName);
            b = b.replace(/__BOTTOM_CONTAINER__/gm, d.viewHandler.bottomContainerName);
            a.innerHTML = b;
            d.viewHandler.messagePreview.init()
        };
        pa.prototype.destroyMessagePreviewContainer = function() {
            this.messagePreview && this.messagePreview.documentRef && this.messagePreview.documentRef.parentNode && this.messagePreview.documentRef.parentNode.removeChild(this.messagePreview.documentRef);
            this.messagePreview = null;
            d.viewHandler.messagePreview = null
        };
        var Sa = pa.extend({
            init: function() {
                var a = this;
                this._super(this);
                d.eventEmitter.on("localeChanged", function() {
                    a.setLinkTitle()
                });
                f.isRTL.subscribe(function() {
                    a.addClassName()
                })
            },
            buildView: function() {
                this._super(this);
                this.addClassName();
                this.setLinkTitle()
            },
            attachEvents: function() {
                this.container && this._super()
            },
            createCanvasChatBubble: function() {
                var a, b = f.chatBubble().config.background;
                if (a = this.bubbleContainer.getElementById("tawkchat-chat-bubble-canvas")) {
                    f.chatPosition();
                    a.width = "146";
                    a.height = "85";
                    var c = a.getContext("2d");
                    c.clearRect(0, 0, 134, 63);
                    c.fillStyle = b;
                    if (f.isTopPositioned()) {
                        var e = 16;
                        var g = 68;
                        var h = e + 3;
                        var m = 81;
                        var n = 6;
                        var x = !1;
                        a = 1.1;
                        var E = 1.9;
                        var L = 1.6;
                        var B =
                            .85
                    } else g = e = 6, h = e + 63 - 3, m = 55, n = 79, x = !0, a = .9, E = .1, L = .4, B = 1.15;
                    if (f.isRTL()) {
                        var J = 10;
                        closeContainerStart = J - 4;
                        var aa = J + 2;
                        var ia = J + 5;
                        var ta = J - 2;
                        var na = J - 2;
                        var wa = J + 5;
                        m = 81;
                        if (f.isTopPositioned()) {
                            var oa = x;
                            L = .2;
                            B = 1.45
                        } else oa = !x, L = .6, B = 1.85
                    } else J = 2, closeContainerStart = J + 134 + 4, aa = J + 134 - 2, ia = J + 134 - 5, ta = J + 134 + 2, na = J + 134 + 2, wa = J + 134 - 5, oa = x;
                    c.beginPath();
                    c.moveTo(J + 8, e);
                    c.lineTo(68, e);
                    c.lineTo(J + 134 - 8, e);
                    c.quadraticCurveTo(J + 134, e, J + 134, e + 8);
                    c.lineTo(J + 134, e + 63 - 8);
                    c.quadraticCurveTo(J + 134, e + 63, J + 134 - 8, e + 63);
                    c.lineTo(J + 8, e + 63);
                    c.quadraticCurveTo(J, e + 63, J, e + 63 - 8);
                    c.lineTo(J, e + 8);
                    c.quadraticCurveTo(J, e, J + 8, e);
                    c.strokeStyle = "#e3e0e7";
                    c.lineWidth = 2;
                    c.stroke();
                    c.closePath();
                    c.fill();
                    c.beginPath();
                    c.arc(68, h, 10, Math.PI * a, Math.PI * E, x);
                    c.strokeStyle = "#e3e0e7";
                    c.lineWidth = 2;
                    c.stroke();
                    c.fill();
                    f.isDesktopRectangle() || (f.isTopPositioned() && f.isLeftPositioned() ? m -= 30 : f.isBottomPositioned() && f.isRightPositioned() ? m += 30 : f.isCenterPositioned() && f.isRightPositioned() && (m += 30));
                    c.beginPath();
                    c.arc(m, n, 5, 0, 2 * Math.PI, !1);
                    c.strokeStyle = "#e3e0e7";
                    c.lineWidth = 2;
                    c.stroke();
                    c.closePath();
                    c.fill();
                    c.beginPath();
                    c.arc(aa, g + 5, 10, Math.PI * L, Math.PI * B, oa);
                    c.strokeStyle = "#e3e0e7";
                    c.lineWidth = 2;
                    c.stroke();
                    c.closePath();
                    c.fillStyle = b;
                    c.fill();
                    c.beginPath();
                    c.moveTo(ia, g + 1.5);
                    c.lineTo(ta, g + 8);
                    c.closePath();
                    c.lineWidth = 2;
                    c.strokeStyle = f.chatBubble().config.foreground;
                    c.stroke();
                    c.beginPath();
                    c.moveTo(na, g + 1.5);
                    c.lineTo(wa, g + 8);
                    c.closePath();
                    c.lineWidth = 2;
                    c.strokeStyle = f.chatBubble().config.foreground;
                    c.stroke()
                }
            }
        });
        Sa.prototype.setLinkTitle =
            function() {
                var a = this.container.getElementById("minimizeChatMinifiedBtn"),
                    b = this.container.getElementById("maximizeChat");
                this.container && (b && b.setAttribute("title", d.languageParser.translate("rollover", "maximize")), a && a.setAttribute("title", d.languageParser.translate("rollover", "minimize")))
            };
        Sa.prototype.chatEnded = function() {
            var a = this.container.getElementById("tawkchat-minified-agent-container"),
                b = this.container.getElementById("tawkchat-status-text-container"),
                c = this.container.getElementById("tawkchat-minified-link-container");
            a && b && (a.innerHTML = "", a.style.display = "none", b.style.display = "block", c.style.marginTop = "0px")
        };
        Sa.prototype.addClassName = function() {
            var a = f.isRTL() ? " rtl-direction" : " ltr-direction";
            this.container && this.container.elementReferrer && (this.container.getElementById("tawkchat-minified-wrapper").className = l.getContrast(f.headerTxtColor) + a);
            this.chatIndicator && this.chatIndicator.elementReferrer && (this.chatIndicator.getElementById("tawkchat-chat-indicator").className = a)
        };
        var ua = TawkClass.extend({
            init: function(a,
                b) {
                var c = this;
                this.inDocument = !1;
                this.maxNumberFileUpload = 5;
                this.maxSizeFileUpload = 52428800;
                this.frameWidth = D.mobileBrowserName ? "100%" : f.maximizedDimensions().width + "px";
                this.frameHeight = D.mobileBrowserName ? "100%" : f.maximizedDimensions().height + "px";
                this.isActionsContainerNotifShown = this.isChatMenuOpen = !1;
                this.resizeThrottle = 0;
                this.container = f.isPopup ? new ca(l.getRandomName(), "display: none;") : new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "999999",
                    position: "static",
                    display: "none",
                    height: this.frameHeight,
                    width: this.frameWidth
                }), Aa, "iframe");
                this.wrapper = new ca("tawkchat-maximized-wrapper");
                d.MaximizedStyle = d.MaximizedStyle.replace(/#tawktoLink/g, "#" + a);
                d.MaximizedStyle = d.MaximizedStyle.replace(/#bottomContainer/g, "#" + b);
                this.wrapper.template = this.wrapper.template.replace(/__TAWK_TO_LINK__/gm, a);
                this.wrapper.template = this.wrapper.template.replace(/__BOTTOM_CONTAINER__/gm, b);
                this.wrapper.template = this.wrapper.template.replace("__TOO_LONG_MESSAGE__", d.languageParser.translate("chat", "message_too_long"));
                f.isDesktopRectangle() || this.wrapper.addClass("roundWidget");
                this.chatTextarea = new ca("chatTextarea", null, null, "textarea");
                this.container.addChildViews([this.wrapper]);
                f.maximizedDimensions.subscribe(function(e) {
                    f.isEmbedded || f.isPopup || D.mobileBrowserName || (c.frameHeight = e.height + "px", c.frameWidth = e.width + "px", c.container.restyle("height", c.frameHeight + " !important"), c.container.restyle("width", c.frameWidth + " !important"))
                });
                y.pageStatus.subscribe(function(e) {
                    c.updateGreetings(e)
                });
                f.soundOn.subscribe(function() {
                    c.toggleSound()
                });
                d.eventEmitter.on("localeChanged", function() {
                    c.container && c.updateGreetings()
                });
                f.isRTL.subscribe(function() {
                    c.addClassName()
                });
                ea.name.subscribe(function() {
                    if (!l.isGeneratedName(ea.name()))
                        for (var e = l.getElementsByClassName(c.container.documentRef, "messageOwnerName visitor"), g = 0; g < e.length; g++) e[g].style.display = "none"
                });
                f.webRTCSettings.subscribe(function() {
                    c.toggleWebRTCActions()
                });
                f.desktopWidget.subscribe(function() {
                    f.isDesktopRectangle() ? (c.wrapper.removeClass("roundWidget"), c.container.documentRef.getElementById("minimizeChat").className =
                        "headerBoxLink", "br" === f.chatPosition() ? c.container.documentRef.body.className = "right" : c.container.documentRef.body.className = "left") : (c.wrapper.addClass("roundWidget"), c.container.documentRef.getElementById("minimizeChat").className = "notShown")
                });
                f.showEmoji.subscribe(function() {
                    c.toggleEmojiAction()
                });
                f.showUploads.subscribe(function() {
                    c.toggleUploadsAction()
                });
                f.showRating.subscribe(function() {
                    c.toggleRatingAction()
                })
            },
            buildView: function() {
                f.isPopup || this.container.buildIframe(d.MaximizedStyle +
                    f.maxStyle());
                this.container.documentRef.getElementById("textareaContainer").appendChild(this.chatTextarea.buildView(this.container.documentRef));
                f.isEmbedded || f.isPopup || D.mobileBrowserName ? this.restyleEmbed() : "br" == f.chatPosition() ? (l.removeClass(this.container.documentRef.body, "left"), l.addClass(this.container.documentRef.body, "right")) : (l.removeClass(this.container.documentRef.body, "right"), l.addClass(this.container.documentRef.body, "left"));
                this.addClassName();
                this.updateGreetings();
                this.toggleSound();
                this.attachEvents();
                this.toggleUploadsAction();
                this.toggleRatingAction();
                this.toggleEmojiAction();
                "undefined" === typeof la && eb(this.container.documentRef);
                l.redraw(this.container.elementReferrer);
                this.inDocument = !0;
                this.toggleWebRTCActions();
                var a = this.container.documentRef.getElementById("minimizeChat");
                f.isEmbedded || !f.isDesktopRectangle() || f.isPopup ? a.className = "notShown" : a.className = "headerBoxLink"
            },
            toggleUploadsAction: function() {
                var a = this,
                    b = this.container.getElementById("uploadFileOption");
                b &&
                    (f.showUploads() ? (b.style.display = "block", this.container.attachUserEventListener("change", function(c) {
                        d.eventHandler.cancelEvent(c);
                        a.closeMenu();
                        c = d.eventHandler.getTargetElement(c).files;
                        var e = [],
                            g = [];
                        if (c && c.length) {
                            for (var h = 0; h < c.length; h++) c[h].size > a.maxSizeFileUpload ? e.push(c[h]) : h >= a.maxNumberFileUpload ? g.push(c[h]) : d.viewHandler.startUpload(c[h]);
                            d.viewHandler.checkUploadFileWarning(e, g)
                        }
                    }, "fileInput", "fileInputChanged"), this.container.attachUserEventListener("dragover", function(c) {
                        c.preventDefault();
                        c.stopPropagation && c.stopPropagation();
                        a.wrapper.addClass("drag-over")
                    }, "innerWrapper", "textareaContainerDragOver"), b = function(c) {
                        var e = a.container.getElementById("tawkchat-maximized-wrapper").getBoundingClientRect();
                        if (c.clientY < e.top || c.clientY >= e.bottom || c.clientX < e.left || c.clientX >= e.right) c.preventDefault(), c.stopPropagation && c.stopPropagation(), a.wrapper.removeClass("drag-over")
                    }, this.container.attachUserEventListener("dragleave", b, "innerWrapper", "textareaContainerDragLeave"), this.container.attachUserEventListener("dragend",
                        b, "innerWrapper", "textareaContainerDragEnd"), this.container.attachUserEventListener("drop", function(c) {
                        c.preventDefault();
                        c.stopPropagation && c.stopPropagation();
                        a.wrapper.removeClass("drag-over");
                        c = c.target.files || c.dataTransfer.files;
                        var e = [],
                            g = [];
                        if (c && 0 !== c.length) {
                            for (var h = 0; h < c.length; h++) c[h].size > a.maxSizeFileUpload ? e.push(c[h]) : h >= a.maxNumberFileUpload ? g.push(c[h]) : d.viewHandler.startUpload(c[h]);
                            d.viewHandler.checkUploadFileWarning(e, g)
                        }
                    }, "innerWrapper", "textareaContainerDrop"), this.container.attachUserEventListener("paste",
                        function(c) {
                            var e;
                            if ((e = (c.originalEvent || c).clipboardData) && (e = e.items) && e.length) {
                                for (var g = 0; g < e.length; g++)
                                    if (-1 !== e[g].type.indexOf("image")) {
                                        var h = e[g].getAsFile();
                                        if (null !== h) {
                                            var m = h;
                                            m.name = d.languageParser.translate("chat", "pasted_image_title", {
                                                dateTime: l.parseChatTime(new Date)
                                            });
                                            break
                                        }
                                    }
                                m && (d.viewHandler.startUpload(m), c.preventDefault())
                            }
                        }, "chatTextarea", "chatTextareaPaste")) : b.style.display = "none")
            },
            toggleRatingAction: function() {
                var a = this.container.getElementById("rateMainWrapper"),
                    b =
                    this.container.getElementById("rateContainer");
                a && b && (f.showRating() ? (a.style.display = "block", this.container.attachUserEventListener("mouseover", function() {
                        b.style.display = "block"
                    }, "rateMainWrapper", "rateMainWrapperOver"), this.container.attachUserEventListener("mouseout", function() {
                        b.style.display = "none"
                    }, "rateMainWrapper", "rateMainWrapperOut"), this.container.attachUserEventListener(d.viewHandler.clickEvent, function(c) {
                        d.chatHandler.changeRating(1);
                        d.eventHandler.cancelEvent(c)
                    }, "ratePositive", "ratepveclick"),
                    this.container.attachUserEventListener(d.viewHandler.clickEvent, function(c) {
                        d.chatHandler.changeRating(-1);
                        d.eventHandler.cancelEvent(c)
                    }, "rateNegative", "ratenveclick")) : a.style.display = "none")
            },
            toggleEmojiAction: function() {
                var a = this,
                    b = this.container.getElementById("textareaContainer"),
                    c = this.container.getElementById("viewEmoji"),
                    e = this.container.documentRef.getElementById("emoji-selection-container");
                f.showEmoji() ? (e.innerHTML = U.loader, c.style.display = "block", l.addClass(b, "with-emoji"), "undefined" ===
                    typeof la && eb(this.container.documentRef), this.container.attachUserEventListener(d.viewHandler.clickEvent, function(g) {
                        g.stopPropagation ? g.stopPropagation() : g.cancelBubble = !0;
                        "active" === a.container.getElementById("viewEmoji").className ? a.closeEmojiSelection() : (a.container.getElementById("viewEmoji").className = "active", Va(e), d.viewHandler.adjustEmojiContainerHeight())
                    }, "viewEmoji", "viewEmojiClick"), this.wrapper.attachUserEventListener(d.viewHandler.clickEvent, function(g) {
                        g = d.eventHandler.getTargetElement(g);
                        e && ("function" === typeof e.contains ? e.contains(g) || a.closeEmojiSelection() : l.isDescendent(e, g) && a.closeEmojiSelection())
                    }, null, "maxWidgetClick")) : (c.style.display = "none", l.removeClass(b, "with-emoji"))
            },
            attachEvents: function() {
                var a = this,
                    b = this.container.documentRef.getElementById("tooLongMsgNotification"),
                    c = l.hasWebRTC() ? null : "Browser not supported.";
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    f.isPopup ? k.close() : (d.eventHandler.cancelEvent(B), d.sessionHandler.notifyWindowState("min"),
                        a.closeMenu())
                }, "minimizeChat", "minlinkclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    d.viewHandler.popoutWidget();
                    a.closeMenu()
                }, "popoutChat", "poplinkclick");
                if (D.mobileBrowserName) {
                    var e = this.container.getElementById("chatTextarea");
                    e && (tb.initElement(e, function(B, J) {
                        5E3 >= J.length ? (b.className = "", a.isActionsContainerNotifShown = !1) : (b.className = "visible", a.isActionsContainerNotifShown = !0);
                        a.toggleMobileSubmitButton(J);
                        d.chatHandler.sendTextPreview(B)
                    }), this.container.attachUserEventListener(d.viewHandler.clickEvent,
                        function(B) {
                            d.eventHandler.cancelEvent(B);
                            d.chatHandler.sendMessage(e.value);
                            e.value = "";
                            a.toggleMobileSubmitButton("");
                            a.resizeTextArea()
                        }, "textareaSubmitButton", "submitclick"))
                } else this.chatTextarea.attachUserEventListener("keyup", function(B) {
                        5E3 >= this.value.length ? (b.className = "", a.isActionsContainerNotifShown = !1) : (b.className = "visible", a.isActionsContainerNotifShown = !0);
                        f.isEmbedded && d.browserData.getMobileBrowser() && a.toggleMobileSubmitButton(this.value);
                        a.resizeTextArea()
                    }, null, "chatinputkeyup"),
                    this.chatTextarea.attachUserEventListener("keydown", function(B) {
                        var J = a.container.getElementById("hidableActionsWrapper"),
                            aa = a.container.getElementById("textareaContainer");
                        a.resizeTextArea();
                        if (13 === B.keyCode) {
                            if (5E3 < this.value.length) {
                                B.preventDefault();
                                return
                            }
                            b.className = "";
                            a.isActionsContainerNotifShown = !1;
                            d.viewHandler.scrollToBottom()
                        }
                        var ia = d.eventHandler.getTargetElement(B);
                        setTimeout(function() {
                            ia.value ? (J.style.display = "none", aa.className = aa.className.replace("additionalPadding", ""), l.removeClass(aa,
                                "additionalPadding")) : (J.style.display = "block", aa.className += " additionalPadding ", l.addClass(aa, "additionalPadding"))
                        }, 0);
                        d.chatHandler.sendTextPreview(B)
                    }, null, "chatinputkeydown"), this.chatTextarea.attachUserEventListener("blur", function(B) {
                        B = d.eventHandler.getTargetElement(B);
                        var J = a.container.getElementById("hidableActionsWrapper");
                        B.value || (J.style.display = "block", l.addClass(a.container.getElementById("textareaContainer"), "additionalPadding"))
                    }, null, "chatinputblur"), f.isEmbedded && d.browserData.getMobileBrowser() &&
                    this.chatTextarea.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                        d.eventHandler.cancelEvent(B);
                        d.chatHandler.sendMessage(a.chatTextarea.elementReferrer.value);
                        a.chatTextarea.elementReferrer.value = "";
                        a.toggleMobileSubmitButton("");
                        a.resizeTextArea();
                        d.viewHandler.scrollToBottom()
                    }, "textareaSubmitButton", "submitclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    var J = d.eventHandler.getTargetElement(B); - 1 !== J.className.indexOf("messageOwnerName") && -1 !==
                        J.className.indexOf("visitor") && (d.formHandler.openForm("nameForm"), d.eventHandler.cancelEvent(B))
                }, "chatWrapper", "chatWrapperclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    d.formHandler.openForm("nameForm");
                    a.closeMenu();
                    d.eventHandler.cancelEvent(B)
                }, "changeName", "changenameclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                        d.formHandler.openForm("emailTranscriptForm");
                        a.closeMenu();
                        d.eventHandler.cancelEvent(B)
                    }, "emailTranscriptOption",
                    "emailclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    d.eventHandler.cancelEvent(B);
                    d.chatHandler.toggleSound()
                }, "soundOn", "soundonclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    d.eventHandler.cancelEvent(B);
                    d.chatHandler.toggleSound()
                }, "soundOff", "soundoffclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    d.eventHandler.cancelEvent(B);
                    d.viewHandler.expandAgentList(B)
                }, "expandableIcon", "expandclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    var B = d.languageParser.translate("chat", "video_call_error");
                    l.getWebRTCToken(!0, !1, function(J) {
                        J && d.viewHandler.appendMessage({
                            senderType: "s",
                            message: c || B,
                            time: new Date,
                            type: "n",
                            isRtcError: !0,
                            rtcType: "video"
                        })
                    })
                }, "videoCall", "videoCallClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    var B = d.languageParser.translate("chat", "voice_call_error");
                    l.getWebRTCToken(!1, !1, function(J) {
                        J && d.viewHandler.appendMessage({
                            senderType: "s",
                            message: c || B,
                            time: new Date,
                            type: "n",
                            isRtcError: !0,
                            rtcType: "voice"
                        })
                    })
                }, "voiceCall", "voiceCallClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    var B = a.container.getElementById("chatMenu"),
                        J = a.container.getElementById("chatMenuControls");
                    a.chatMenuOpen ? (a.chatMenuOpen = !1, B.className = "", J.style.display = "none") : (a.chatMenuOpen = !0, B.className = "active", J.style.display = "block")
                }, "chatMenu", "chatMenuClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent,
                    function() {
                        a.container.getElementById("chatMenu").className = "";
                        a.closeMenu()
                    }, "chatMenuControlsOverlay", "chatMenuControlsOverlayClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    var B = d.languageParser.translate("chat", "screen_share_error");
                    l.getWebRTCToken(!1, !0, function(J) {
                        J && d.viewHandler.appendMessage({
                            senderType: "s",
                            message: c || B,
                            time: new Date,
                            type: "n",
                            isRtcError: !0,
                            rtcType: "screen"
                        })
                    })
                }, "screenShare", "screenShareClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent,
                    function() {
                        a.container.getElementById("maxFileNotificationContainer").classList.add("hidden")
                    }, "closeNumberNotification", "closeNumberNotification");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function() {
                    a.container.getElementById("maxSizeNotificationContainer").classList.add("hidden")
                }, "closeSizeNotification", "closeSizeNotification");
                this.container.attachUserEventListener("mousedown", function() {
                    var B = k.document.activeElement;
                    !B || "input" !== B.tagName.toLowerCase() && "textarea" !==
                        B.tagName.toLowerCase() || (d.viewHandler.lastFocusedElement = B)
                }, "innerWrapper", "maximizedWidgetMouseDown");
                this.container.attachUserEventListener("click", function(B) {
                    B.preventDefault();
                    a.chatTextarea && a.chatTextarea.elementReferrer && a.chatTextarea.elementReferrer.focus()
                }, "textareaContainer", "textareaContainerClick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(B) {
                    d.formHandler.openForm("nameForm");
                    d.eventHandler.cancelEvent(B)
                }, "changeNameOption", "changenameclick");
                this.wrapper.attachUserEventListener("keydown",
                    function(B) {
                        27 === B.keyCode && a.closeEmojiSelection()
                    }, null, "maxWidgetKeydown");
                var g = function(B) {
                    "cut" !== B.type && "paste" !== B.type || d.chatHandler.sendTextPreview(B);
                    a.resizeTextArea()
                };
                this.chatTextarea.attachUserEventListener("keydown", g, null, "chatinputkeyupresize");
                this.chatTextarea.attachUserEventListener("change", g, null, "chatinputchangeresize");
                this.chatTextarea.attachUserEventListener("input", g, null, "chatinputinputresize");
                this.chatTextarea.attachUserEventListener("paste", g, null, "chatinputpasteresize");
                this.chatTextarea.attachUserEventListener("cut", g, null, "chatinputcutresize");
                var h, m, n, x, E = this.container.getElementById("greetingsMainContainer");
                g = /Firefox/i.test(t.userAgent) ? "DOMMouseScroll" : "mousewheel";
                var L = this.container.getElementById("chatContainer");
                D.mobileBrowserName && (g = "touchstart touchmove touchend");
                D.mobileBrowserName && this.container.attachUserEventListener("scroll", a.chatViewScroll.bind(a), "chatContainer", "chatContainerScroll");
                this.container.attachUserEventListener(g, function(B) {
                    h =
                        B.originalEvent ? B.originalEvent : B;
                    x = h.detail ? -40 * h.detail : h.wheelDelta;
                    var J = 0 < x;
                    "touchmove" === B.type ? n = B.changedTouches[0].clientY : "touchstart" === B.type ? m = B.touches[0].clientY : "touchend" === B.type ? J = m < n : D.mobileBrowserName || a.chatViewScroll(B);
                    if (0 === L.scrollTop && -1 !== E.className.indexOf("minimize")) {
                        if (0 > x || m > n) return
                    } else if (-1 === L.className.indexOf("minimize") && (m < n || 0 < x)) return;
                    d.viewHandler.toggleGreetingsView(J)
                }, "chatPanel", "chatPanelScroll")
            },
            toggleSound: function() {
                var a = this.container.getElementById("soundOn"),
                    b = this.container.getElementById("soundOff");
                a && b && (f.soundOn() ? (a.style.display = "block", b.style.display = "none") : (a.style.display = "none", b.style.display = "block"))
            }
        });
        ua.prototype.chatViewScroll = function() {
            this.isScrolling && clearTimeout(this.isScrolling);
            this.isScrolling = setTimeout(function() {
                "max" === y.chatWindowState() && d.viewHandler.checkSeenMessageViewport()
            }, 1E3 / 66)
        };
        ua.prototype.hide = function() {
            this.container.restyle("display", "none !important")
        };
        ua.prototype.show = function() {
            this.container.restyle("display",
                "block !important");
            d.viewHandler.checkSeenMessageViewport();
            "consentForm" === d.formHandler.currentForm && this.wrapper.addClass("noMenu");
            d.formHandler.handleResizeofForm()
        };
        ua.prototype.restyleEmbed = function() {
            var a = document.getElementById(v.embedded);
            this.wrapper.addClass("embedded");
            if (f.isPopup || f.isEmbedded) this.container.getElementById("popoutChat").outerHTML = "";
            if (f.isEmbedded) return a ? d.viewHandler.onEmbeddedWindowResize() : void 0;
            f.isPopup && (this.wrapper.addClass("popout"), l.updateFontStylesheet(document));
            this.container.restyle("width", "100% !important");
            this.container.restyle("height", "100% !important")
        };
        ua.prototype.updateGreetings = function(a) {
            var b;
            if (this.container.elementReferrer) {
                if (b = this.container.getElementById("file-upload-drop-label")) b.innerHTML = d.languageParser.translate("chat", "dragDropText");
                if (a = a || y.pageStatus()) b = this.container.getElementById("shortMessage"), this.setChatGreetings(), b && this.chatTextarea && (a = Ca.getShortMessage(a), null !== a && (b.innerHTML = a, f.onlineGreeting && (a = l.rawDecode(f.onlineGreeting.actionMessage),
                    D.isPlaceholderSupported ? this.chatTextarea.elementReferrer.placeholder = a : (this.chatTextarea.elementReferrer.value = a, l.togglePlaceholderText(this.chatTextarea.elementReferrer, a, "chatTextarea")))))
            }
        };
        ua.prototype.addClassName = function() {
            this.wrapper && this.wrapper.elementReferrer && (f.isRTL() ? (this.wrapper.addClass("rtl-direction"), this.wrapper.removeClass("ltr-direction")) : (this.wrapper.addClass("ltr-direction"), this.wrapper.removeClass("rtl-direction")))
        };
        ua.prototype.toggleEndChatOption = function(a) {
            var b =
                this.container.getElementById("endChatOption");
            b && (endChatEl = this.container.getElementById("endChat"), chatMenuEl = this.container.getElementById("chatMenuControls"), f.isEmbedded ? a ? (b.style.width = "220px", b.style.marginLeft = "-220px", chatMenuEl.style.right = "34px", endChatEl.style.display = "inline-block") : (b.style.width = "194px", b.style.marginLeft = "-194px", chatMenuEl.style.right = "10px", endChatEl.style.display = "none") : b.style.display = a ? "block" : "none")
        };
        ua.prototype.addEmojiToInput = function(a) {
            D.isPlaceholderSupported ||
                this.chatTextarea.elementReferrer.value !== l.rawDecode(f.onlineGreeting.actionMessage) || (this.chatTextarea.elementReferrer.value = "");
            this.chatTextarea.elementReferrer.value += a;
            this.chatTextarea.elementReferrer.focus();
            this.closeEmojiSelection()
        };
        ua.prototype.closeEmojiSelection = function() {
            this.container.getElementById("viewEmoji").className = "";
            l.removeClass(this.container.getElementById("emoji-selection-container"), "showWithFade")
        };
        ua.prototype.resizeTextArea = function() {
            var a = this;
            clearTimeout(this.resizeThrottle);
            this.resizeThrottle = setTimeout(function() {
                var b = a.chatTextarea.elementReferrer.value,
                    c = a.container.documentRef.getElementById("textareaContainer"),
                    e = a.container.documentRef.getElementById("actionsContainer"),
                    g = a.container.documentRef.getElementById("emoji-selection-container"),
                    h = d.viewHandler.ifScrollbarDown(),
                    m = D.mobileBrowserName ? 18 : 20,
                    n = a.container.documentRef.getElementById(d.viewHandler.bottomContainerName),
                    x = b.split(/\r\n|\r|\n/).length || 1,
                    E = x * m;
                1 === x && a.chatTextarea.elementReferrer.scrollHeight >
                    a.chatTextarea.elementReferrer.clientHeight && (E = a.chatTextarea.elementReferrer.scrollHeight);
                b && E >= m ? (E = 150 < E ? 150 : E, this.isActionsContainerNotifShown && (E += 42, c.style.paddingBottom = "42px"), e.style.height = 46 + (E - m) + "px", h && d.viewHandler.scrollToBottom()) : e.style.height = "46px";
                g && (g.style.bottom = e.clientHeight + 2 + "px");
                n && (n.style.bottom = e.clientHeight + 2 + "px");
                clearTimeout(a.resizeThrottle)
            }, 100)
        };
        ua.prototype.clearTextareaResize = function() {
            var a = this.container.documentRef.getElementById("actionsContainer"),
                b = this.container.documentRef.getElementById("emoji-selection-container"),
                c = this.container.documentRef.getElementById(d.viewHandler.bottomContainerName);
            a && (a.style.height = "46px");
            b && (b.style.bottom = "48px");
            c && (c.style.bottom = "")
        };
        ua.prototype.toggleWebRTCActions = function() {
            if (this.inDocument) {
                var a = "none",
                    b = "none",
                    c = "none";
                f.webRTCSettings() && f.webRTCSettings().enabled && (a = f.webRTCSettings().video ? "inline-block" : "none", b = "inline-block", c = f.webRTCSettings().screen ? "inline-block" : "none");
                this.container.documentRef.getElementById("videoCall").style.display =
                    a;
                this.container.documentRef.getElementById("voiceCall").style.display = b;
                this.container.documentRef.getElementById("screenShare").style.display = c
            }
        };
        ua.prototype.setChatGreetings = function(a) {
            var b, c = this.container.getElementById("greetingsText"),
                e = this.container.getElementById("greetingsContent");
            (b = y.pageStatus()) && e && c && (b = Ca.getLongMessage(b), a && !b ? (e.className += " no-content", e.style.display = "none") : (c.innerHTML = b.replace(l.regLineBreaks, l.br), 1 > d.agents.agentsCount && (e.style.display = "block"), a ||
                (e.className = e.className.replace(" minimize", ""))))
        };
        ua.prototype.toggleMobileSubmitButton = function(a) {
            var b = this.container.getElementById("actionsContainer");
            a && "mobile-typing" !== b.className ? b.className = "mobile-typing" : a || "mobile-typing" !== b.className || (b.className = "")
        };
        var Ia = ua.extend({
            init: function() {
                var a = this;
                this._super.apply(this, arguments);
                d.eventEmitter.on("formClosed", function() {
                    var b = a.container.getElementById("chatPanel");
                    if (b)
                        if (f.showPreChatForm && !y.prechatFormSubmitted()) d.formHandler.openForm("preChatForm");
                        else if (a.setChatGreetings(!0), b.style.display = "block", a.wrapper.removeClass("noMenu"), d.viewHandler.checkSeenMessageViewport(), !D.mobileBrowserName && a.container.getElementById("chatTextarea") && "max" === y.chatWindowState() && d.viewHandler.userAction) {
                        var c = l.getDocument(l.getDocument(k).getElementById(a.container.elementId));
                        if (c && c.getElementById("chatTextarea")) try {
                            setTimeout(function() {
                                c.getElementById("chatTextarea").focus()
                            }, 0)
                        } catch (e) {}
                    }
                });
                d.eventEmitter.on("formOpened", function() {
                    a.container &&
                        a.container.getElementById("chatPanel") && ("preChatForm" !== d.formHandler.currentForm && "offlineForm" !== d.formHandler.currentForm && "consentForm" !== d.formHandler.currentForm || a.wrapper.addClass("noMenu"), a.container.getElementById("chatPanel").style.display = "none")
                });
                d.eventEmitter.on("localeChanged", function() {
                    a.insertText();
                    a.setLinkTitle();
                    a.toggleSound()
                })
            },
            buildView: function() {
                this._super(this);
                this.setLinkTitle();
                this.insertText();
                this.wrapper && this.wrapper.addClass(l.getContrast(f.headerTxtColor));
                this.attachEvents()
            },
            insertText: function() {
                if (this.container) {
                    this.container.getElementById("tawkContent").innerHTML = d.languageParser.translate("overlay", "tawkContent");
                    this.container.getElementById("cancelTawkRedirect").innerHTML = d.languageParser.translate("form", "CancelButton");
                    this.container.getElementById("tawkRedirect").innerHTML = d.languageParser.translate("form", "visitButton");
                    this.container.getElementById("maxFileNotificationMessage").innerHTML = d.languageParser.translate("notifications", "maximum_file_upload_warning", {
                        strongStart: "<strong>",
                        strongEnd: "</strong>",
                        limitFileNumber: "5"
                    });
                    this.container.getElementById("maxSizeNotificationMessage").innerHTML = d.languageParser.translate("notifications", "maximum_size_upload_warning", {
                        strongStart: "<strong>",
                        strongEnd: "</strong>",
                        limitFileSize: "50mb"
                    });
                    this.container.getElementById("emailTranscriptOption").innerHTML = d.languageParser.translate("menu", "email_transcript");
                    this.container.getElementById("changeName").innerHTML = d.languageParser.translate("menu", "change_name");
                    this.container.getElementById("soundOn").innerHTML = d.languageParser.translate("menu", "sound_on");
                    this.container.getElementById("soundOff").innerHTML = d.languageParser.translate("menu", "sound_off");
                    this.container.getElementById("maxSizeNotifLabel").innerHTML = d.languageParser.translate("chat", "Warning");
                    this.container.getElementById("maxFileNotifLabel").innerHTML = d.languageParser.translate("chat", "Warning");
                    this.container.getElementById("endChat").innerHTML = d.languageParser.translate("menu", "end_chat_session");
                    f.isEmbedded || f.isPopup || (this.container.getElementById("popoutChat").innerHTML = d.languageParser.translate("menu", "popout_widget"));
                    var a = l.getElementsByClassName(this.container.getElementById("chatContainer"), "closeNotification");
                    for (var b = 0; b < a.length; b++) a[b].innerHTML = d.languageParser.translate("form", "CloseButton");
                    (a = this.container.getElementById("uploadFileOption")) && (l.isFileInputSupported ? a.setAttribute("title", d.languageParser.translate("rollover", "uploadFile")) : a.parentNode.removeChild(a))
                }
            },
            attachEvents: function() {
                var a = this;
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(b) {
                    d.formHandler.openForm("emailTranscriptForm");
                    d.eventHandler.cancelEvent(b)
                }, "emailTranscriptOption", "emailclick");
                this.container.attachUserEventListener(d.viewHandler.clickEvent, function(b) {
                    "preChatForm" !== d.formHandler.currentForm && "offlineForm" !== d.formHandler.currentForm && "consentForm" !== d.formHandler.currentForm && d.chatHandler.isVisitorEngaged() ? (d.formHandler.openForm("endChatForm"),
                        d.eventHandler.cancelEvent(b)) : (d.eventHandler.cancelEvent(b), d.sessionHandler.notifyWindowState("min"));
                    a.closeMenu()
                }, "endChat", "endChatclick");
                this._super(this)
            }
        });
        Ia.prototype.closeMenu = function() {
            this.chatMenuOpen && (this.chatMenuOpen = !1, this.container.getElementById("chatMenuControls").style.display = "none", this.container.getElementById("chatMenu").className = "")
        };
        Ia.prototype.setLinkTitle = function() {
            this.container && (this.container.getElementById("ratePositive").setAttribute("title", d.languageParser.translate("rollover",
                "positiveRating")), this.container.getElementById("rateNegative").setAttribute("title", d.languageParser.translate("rollover", "negativeRating")), this.container.getElementById("screenShare").setAttribute("title", d.languageParser.translate("rollover", "screenShare")), this.container.getElementById("voiceCall").setAttribute("title", d.languageParser.translate("rollover", "voiceCall")), this.container.getElementById("videoCall").setAttribute("title", d.languageParser.translate("rollover", "videoCall")), this.container.getElementById("chatMenu").setAttribute("title",
                d.languageParser.translate("rollover", "chatMenu")), this.container.getElementById("viewEmoji").setAttribute("title", d.languageParser.translate("chat", "insert_emoji")), f.isEmbedded || this.container.getElementById("minimizeChat").setAttribute("title", d.languageParser.translate("form", "CloseButton")))
        };
        Ia.prototype.chatEnded = function() {
            d.formHandler.openForm("restartChatForm")
        };
        Ia.prototype.chatStarted = function() {
            var a = this.container.getElementById("chatEnded"),
                b = this.container.getElementById("chatContainerWrapper"),
                c = this.container.getElementById("agentList"),
                e = this.container.getElementById("options");
            a && a.parentNode.removeChild(a);
            c && (c.innerHTML = "");
            b && (b.className = b.className.replace("chat-ended", ""));
            e && (e.style.display = "block")
        };
        var ka = X.extend({
            init: function() {
                var a = this;
                this._super(this);
                this.startY = this.startX = 0;
                this.iframeXOffsetPosition = f.widgetOffsetX;
                this.iframeYOffsetPosition = f.widgetOffsetY;
                this.isMaximized = this.isWidgetAnimating = this.userAction = this.isWidgetPositionsUpdated = !1;
                this.overlayElement =
                    new ca(null, l.getGenericStyle({
                        left: "0px",
                        top: "0px",
                        zindex: "1000001",
                        cursor: "move",
                        width: "100%",
                        height: "100%",
                        display: "none",
                        "float": "left"
                    }));
                this.iframeContainerName = l.getRandomName();
                this.iframeContainer = new ca(this.iframeContainerName);
                this.resizeFromLeft = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "100%",
                    left: "0px",
                    top: "0px",
                    zindex: "999998",
                    cursor: "w-resize",
                    width: "6px"
                }));
                this.resizeFromRight = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "100%",
                    width: "6px",
                    right: "0px",
                    top: "0px",
                    zindex: "999998",
                    cursor: "e-resize"
                }));
                this.resizeFromTop = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "6px",
                    width: "100%",
                    right: "0px",
                    top: "0px",
                    zindex: "999998",
                    cursor: "n-resize"
                }));
                this.resizeFromBottom = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "6px",
                    width: "100%",
                    right: "0px",
                    bottom: "0px",
                    zindex: "999998",
                    cursor: "s-resize"
                }));
                this.resizeTopLeft = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "12px",
                    width: "12px",
                    left: "0px",
                    top: "0px",
                    zindex: "999998",
                    cursor: "nw-resize"
                }));
                this.resizeTopRight =
                    new ca(l.getRandomName(), l.getGenericStyle({
                        height: "12px",
                        width: "12px",
                        right: "0px",
                        top: "0px",
                        zindex: "999998",
                        cursor: "ne-resize"
                    }));
                this.resizeBottomLeft = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "12px",
                    width: "12px",
                    bottom: "0px",
                    left: "0px",
                    zindex: "999998",
                    cursor: "sw-resize"
                }));
                this.resizeBottomRight = new ca(l.getRandomName(), l.getGenericStyle({
                    height: "12px",
                    width: "12px",
                    bottom: "0px",
                    right: "0px",
                    zindex: "999999",
                    cursor: "se-resize"
                }));
                q = new Ia(this.tawktoLinkName, this.bottomContainerName);
                this.iframeContainer.addChildViews([q.container]);
                if (!f.isPopup && !f.isEmbedded) {
                    u = new Sa;
                    var b = [u.container, u.chatIndicator, u.bubbleContainer, this.overlayElement];
                    if (f.isDesktopRectangle()) var c = [this.resizeFromLeft, this.resizeFromRight, this.resizeFromTop, this.resizeFromBottom, this.resizeTopLeft, this.resizeTopRight, this.resizeBottomLeft, this.resizeBottomRight];
                    else c = [], f.isRightPositioned() ? c.push(this.resizeFromLeft) : c.push(this.resizeFromRight), f.isCenterPositioned() ? (c = c.concat([this.resizeFromBottom, this.resizeFromTop]), c = f.isRightPositioned() ?
                        c.concat([this.resizeTopLeft, this.resizeBottomLeft]) : c.concat([this.resizeTopRight, this.resizeBottomRight])) : f.isTopPositioned() ? (c.push(this.resizeFromBottom), f.isRightPositioned() ? c.push(this.resizeBottomLeft) : c.push(this.resizeBottomRight)) : (c.push(this.resizeFromTop), f.isRightPositioned() ? c.push(this.resizeTopLeft) : c.push(this.resizeTopRight));
                    this.iframeContainer.addChildViews(b.concat(c))
                }
                this.indicator = new Da(u ? u.chatIndicator : null);
                this.chatContainer = q.container;
                this.iframeContainer.buildView();
                this.insertFrameStyle();
                y.pageStatus.subscribe(function(e) {
                    a.updateViewByStatus(e)
                });
                N.rating.subscribe(function(e) {
                    a.changeRating(e)
                });
                f.isPopup || f.isEmbedded || y.chatWindowState.subscribe(function(e) {
                    "max" === e ? a.maximizeWidget() : a.minimizeWidget()
                });
                f.minStyle.subscribe(function() {
                    u && u.container.elementReferrer && (u.container.insertCssFile(f.minStyle(), !0), u.container.documentRef.getElementById("tawkchat-minified-wrapper").className = l.getContrast(f.headerTxtColor))
                });
                f.maxStyle.subscribe(function() {
                    q &&
                        q.container.elementReferrer && (q.container.insertCssFile(f.maxStyle(), !0), q.wrapper.removeClass("black"), q.wrapper.removeClass("white"), q.wrapper.addClass(l.getContrast(f.headerTxtColor)))
                });
                f.minimizedDimensions.subscribe(function() {
                    var e = a.calculateWidgetPosition();
                    a.iframeContainer.restyle("top", e.top);
                    a.iframeContainer.restyle("bottom", e.bottom);
                    a.iframeContainer.restyle("right", e.right);
                    a.iframeContainer.restyle("left", e.left)
                });
                this.initialDocumentClick = d.eventHandler.listen(document, "click",
                    function() {
                        d.audioPlayer.initAudioPlayer();
                        d.eventHandler.removeEventHandler(document, "click", a.initialDocumentClick)
                    }, "documentinitialclick")
            },
            insertFrameStyle: function() {
                var a = "";
                var b = this.calculateWidgetPosition();
                b = l.getGenericStyle({
                    display: "none",
                    bottom: b.bottom,
                    top: b.top,
                    right: b.right,
                    left: b.left,
                    minwidth: "0",
                    minheight: "0",
                    zindex: D.isIE && 9 > D.version ? "none" : "2000000000",
                    position: "fixed"
                });
                if (f.isTopPositioned()) {
                    var c = "transform:translate(0, -30px);";
                    var e = "transform:translate(0, 0px);"
                } else f.isCenterPositioned() ?
                    (c = f.isRightPositioned() ? "transform:translate(30px,0);" : "transform:translate(-30px,0);", e = "transform:translate(0px,0);") : (c = "transform:translate(0, 30px);", e = "transform:translate(0, 0px);");
                c = "{0%{opacity:0;" + c + ";}to{opacity:1;" + e + "}}";
                a = a + ("@keyframes tawkMaxOpen" + c) + ("@-moz-keyframes tawkMaxOpen" + c) + ("@-webkit-keyframes tawkMaxOpen" + c) + ("#" + this.iframeContainerName + "{" + b + "}");
                a += "#" + q.container.elementId + ".open{animation : tawkMaxOpen .25s ease!important;}";
                this.iframeContainer.insertCssFile(a, !0)
            },
            show: function() {
                q.hide();
                f.isEmbedded || f.isPopup ? (this.iframeContainer.restyle("position", "static"), this.iframeContainer.restyle("right", ""), this.iframeContainer.restyle("left", ""), this.iframeContainer.restyle("width", "100%"), this.iframeContainer.restyle("height", "100%"), q.show()) : (this.isWidgetPositionsUpdated = !0, this.indicator.initIndicator(), d.main.maximize ? this.maximizeWidget() : this.minimizeWidget());
                this.updateViewByStatus(y.pageStatus());
                this._super()
            }
        });
        ka.prototype.calculateWidgetPosition =
            function() {
                var a = Math.max((document.documentElement.clientHeight, k.innerHeight || 0) / 2) - f.maximizedDimensions().height / 2,
                    b = {};
                if (f.isDesktopRectangle()) {
                    var c = 0;
                    var e = f.widgetOffsetX
                } else e = 10, c = f.minimizedDimensions().height + f.widgetOffsetX + 10, e = f.isCenterPositioned() ? f.minimizedDimensions().width + f.widgetOffsetX + e : e;
                f.isTopPositioned() ? (b.bottom = "auto", b.top = c + "px") : (f.isCenterPositioned() ? b.bottom = f.isDesktopRectangle() ? "0px" : a + "px" : b.bottom = c + "px", b.top = "auto");
                f.isRightPositioned() ? (b.right = e +
                    "px", b.left = "auto") : (b.right = "auto", b.left = e + "px");
                return b
            };
        ka.prototype.maximizeWidget = function() {
            var a = null,
                b = null;
            u && (a = u.container.getElementById("minimizeChatMinifiedBtn"), b = u.container.getElementById("maximizeChat"));
            this.messagePreview && this.messagePreview.hide();
            if ("max" !== f.onClickAction) return this.popoutWidget();
            f.hideWidgetOnOffline && "offline" === y.pageStatus() && d.formHandler.openForm(f.showConsentForm ? "consentForm" : "offlineForm");
            (f.hideWidgetOnLoad || f.hideWidgetOnOffline) && this.showWidget();
            q.show();
            u && u.container && (f.isDesktopRectangle() ? u.hide() : (u.shown || u.show(), a && b && (l.removeClass(b, "appear"), l.addClass(b, "hide"), l.removeClass(a, "hide"), l.addClass(a, "appear")), u.hideBubble(), l.addClass(u.container.getElementById("tawkchat-minified-box"), "open")));
            this.isMaximized = !0;
            v.triggerApiHandlers("onChatMaximized");
            d.viewHandler.scrollToFirstUnseen();
            if (!D.mobileBrowserName && this.chatContainer.getElementById("chatTextarea") && "max" === y.chatWindowState() && !d.formHandler.currentForm && d.viewHandler.userAction) {
                var c =
                    l.getDocument(l.getDocument(k).getElementById(q.container.elementId));
                if (c && c.getElementById("chatTextarea")) try {
                    setTimeout(function() {
                        c.getElementById("chatTextarea").focus();
                        d.viewHandler.userAction = !1
                    }, 0)
                } catch (e) {}
            }
            q.container.addClass("open")
        };
        ka.prototype.minimizeWidget = function() {
            var a = null,
                b = null;
            if (!f.isPopup && !f.isEmbedded) {
                q.hide();
                this.isMaximized = !1;
                if (f.hideWidgetOnLoad) return this.hideWidget();
                if (u) {
                    a = u.container.getElementById("minimizeChatMinifiedBtn");
                    b = u.container.getElementById("maximizeChat");
                    var c = u.container.getElementById("tawkchat-minified-box")
                }
                a && b && (l.removeClass(b, "hide"), l.addClass(b, "appear"), l.removeClass(a, "appear"), l.addClass(a, "hide"), l.removeClass(c, "open"));
                u.show();
                v.triggerApiHandlers("onChatMinimized");
                this.indicator.initIndicator()
            }
        };
        ka.prototype.popoutWidget = function() {
            var a = "https://tawk.to/chat/" + sa.pageId + "/";
            this.indicator.hide();
            y.chatWindowState("min");
            this.popoutWin && !this.popoutWin.closed && this.popoutWin.focus ? this.popoutWin.focus() : (f.whiteLabel().whitelabeled &&
                f.whiteLabel().popoutBaseUrl && (a = f.whiteLabel().popoutBaseUrl + "/chat/"), this.popoutWin = k.open(a + $_Tawk_WidgetId + "?$_tawk_sk=" + y.sessionKey + "&$_tawk_tk=" + y.transferKey + "&v=" + y.serverVersion, "Tawk", "height=500, width=450, resizable=yes, toolbar=no, location=no, menubar=no, personalbar=no"))
        };
        ka.prototype.toggleWidget = function() {
            var a = y.chatWindowState();
            y.chatWindowState("min" === a ? "max" : "min")
        };
        ka.prototype.removeBubble = function() {
            try {
                d.eventEmitter.emit("notifyBubbleClosed")
            } catch (a) {
                ma.handleError("Unable to emit notifyBubbleClosed",
                    a.fileName, a.lineNumber, a.stack)
            }
        };
        ka.prototype.insertPopupStyle = function() {
            var a = document.getElementsByTagName("head")[0],
                b = document.createDocumentFragment(),
                c = l.createElement(document, "style", {
                    type: "text/css"
                });
            var e = document.createTextNode(d.ResetStyle + "" + d.MaximizedStyle + f.maxStyle());
            c.styleSheet ? c.styleSheet.cssText = e.nodeValue : c.appendChild(e);
            b.appendChild(c);
            a.appendChild(b);
            document.body.className = "popup"
        };
        ka.prototype.begin = function() {
            var a = this,
                b = document.getElementById(v.embedded),
                c;
            d.main.started || (this.iframeContainer && (c = document.getElementById(this.iframeContainer.elementId)), c && c.parentNode.removeChild(c), f.isEmbedded && b ? (b.appendChild(this.iframeContainer.elementReferrer), d.eventHandler.listen(k, "resize", function() {
                a.onEmbeddedWindowResize()
            }, "windowresize")) : (document.body.appendChild(this.iframeContainer.elementReferrer), f.isPopup ? this.insertPopupStyle() : (u.buildView(), this.resizeFromLeft.attachUserEventListener("mousedown", function(e) {
                    a.onHeaderMouseDown(e, "left")
                },
                null, "resizeLeftfocus"), this.resizeFromRight.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, "right")
            }, null, "resizeRightfocus"), this.resizeFromTop.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, null, "top")
            }, null, "resizeTopfocus"), this.resizeFromBottom.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, null, "bottom")
            }, null, "resizeBottomfocus"), this.resizeTopLeft.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, "left",
                    "top")
            }, null, "resizeTopLeftfocus"), this.resizeTopRight.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, "right", "top")
            }, null, "resizeTopRightfocus"), this.resizeBottomLeft.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, "left", "bottom")
            }, null, "resizeBottomLeftfocus"), this.resizeBottomRight.attachUserEventListener("mousedown", function(e) {
                a.onHeaderMouseDown(e, "right", "bottom")
            }, null, "resizeBottomRightfocus"), d.eventHandler.listen(k, "resize", function() {
                    a.onWindowResize()
                },
                "windowresize"))), q.buildView())
        };
        ka.prototype.hideWidget = function() {
            this.iframeContainer.hide();
            v.triggerApiHandlers("onChatHidden")
        };
        ka.prototype.adjustEmojiContainerHeight = function() {
            var a = this.chatContainer.documentRef.getElementById("emoji-selection-container"),
                b = this.chatContainer.documentRef.getElementById("innerWrapper"),
                c = this.chatContainer.documentRef.getElementById("textareaWrapper"),
                e = this.chatContainer.documentRef.getElementById("headerBoxWrapper");
            b = b.clientHeight - c.clientHeight - e.clientHeight;
            185 > b && (a.style.height = b + "px")
        };
        ka.prototype.showWidget = function() {
            this.iframeContainer.isVisible || this.iframeContainer.show()
        };
        ka.prototype.toggleVisibility = function() {
            this.iframeContainer.toggle()
        };
        ka.prototype.isWidgetHidden = function() {
            return !this.iframeContainer.isVisible
        };
        ka.prototype.onHeaderMouseUp = function() {
            this.overlayElement.restyle("display", "none !important");
            this.resetFrameDimensions();
            this.isResized && (this.isResized = !1, d.socketManager.sendToConnector("notifyWidgetResized"));
            d.eventHandler.removeEventHandler(document,
                "mousemove", this.mouseMovehandler);
            d.eventHandler.removeEventHandler(document, "mouseup", this.mouseUpHandler)
        };
        ka.prototype.onHeaderMouseDown = function(a, b, c) {
            var e = this,
                g = d.eventHandler.getTargetElement(a);
            g.id !== this.resizeFromLeft.elementId && g.id !== this.resizeFromRight.elementId && g.id !== this.resizeFromTop.elementId && g.id !== this.resizeFromBottom.elementId && g.id !== this.resizeTopLeft.elementId && g.id !== this.resizeBottomLeft.elementId && g.id !== this.resizeTopRight.elementId && g.id !== this.resizeBottomRight.elementId ||
                1 === a.button && !k.event && !q.documentRef.event || 1 < a.button || (d.eventHandler.cancelEvent(a), this.overlayElement.restyle("display", "block !important"), a = this.getActualViewportDimensions(), this.actualViewPortWidth = a.width, this.actualViewPortHeight = a.height, this.startOffsetY = this.startOffsetX = 0, this.mouseMovehandler = d.eventHandler.listen(document, "mousemove", function(h) {
                    e.setResizedDimensions(h, b, c);
                    e.isResized = !0;
                    e.redrawIE()
                }, "dragmove"), this.mouseUpHandler = d.eventHandler.listen(document, "mouseup", function(h) {
                        e.onHeaderMouseUp(h)
                    },
                    "dragleave"))
        };
        ka.prototype.redrawIE = function() {
            "explorer" === D.vendor && (this.iframeContainer.restyle("visibility", "hidden !important"), this.iframeContainer.restyle("visibility", "visible !important"))
        };
        ka.prototype.setResizedDimensions = function(a, b, c) {
            var e = this.iframeContainer.elementReferrer,
                g = this.ifScrollbarDown();
            this.isRight && "undefined" !== typeof this.isRight || (this.isRight = f.isRightPositioned());
            this.startX = a.clientX;
            this.startY = a.clientY;
            if (b) {
                var h = this.isRight ? "right" : "left";
                var m = parseInt(l.computedStyle(this.chatContainer.elementReferrer,
                        "width").replace("px", ""), 10),
                    n = parseInt(l.computedStyle(e, h).replace("px", ""), 10),
                    x = this.isRight ? this.actualViewPortWidth - a.clientX : a.clientX;
                x = 0 > x ? 0 : x;
                this.isRight && "right" === b || !this.isRight && "left" === b ? (b = m - (x - n), 280 > b ? b = 280 : (x > this.actualViewPortWidth - b - 1 && (x = this.actualViewPortWidth - b - 1), e.style.cssText += ";" + h + ":" + x + "px !important", this.startOffsetX = b)) : this.startOffsetX = b = this.isRight ? this.actualViewPortWidth - a.clientX - n : a.clientX - n;
                280 <= b && 0 < this.actualViewPortWidth - (b + parseInt(l.computedStyle(e,
                    h).replace("px", ""), 10)) && this.setWidth(b)
            }
            c && ("bottom" === c ? (c = parseInt(e.style.bottom.replace("px", "")), a = this.actualViewPortHeight - a.clientY, 0 > a && (a = 0), c = parseInt(l.computedStyle(this.chatContainer.elementReferrer, "height").replace("px", ""), 10) - (a - c), 330 > c ? c = 330 : (a > this.actualViewPortHeight - c - 1 && (a = this.actualViewPortHeight - c - 1), e.style.cssText += ";bottom:" + a + "px !important", this.startOffsetY = c)) : (startOffsetY = parseInt(l.computedStyle(e, "bottom").replace("px", ""), 10), c = this.actualViewPortHeight -
                a.clientY - startOffsetY, this.startOffsetY = this.startY - startOffsetY), 330 <= c && 0 < this.actualViewPortHeight - (c + parseInt(l.computedStyle(e, "bottom").replace("px", ""), 10)) && this.setHeight(c), d.viewHandler.adjustEmojiContainerHeight());
            g && this.scrollToBottom();
            d && d.formHandler && d.formHandler.resize()
        };
        ka.prototype.setChatWindowXPosition = function(a) {
            var b = parseInt(q.frameWidth.replace("px", ""), 10);
            "undefined" === typeof this.isRight && (this.isRight = f.isRightPositioned());
            if (this.isRight) {
                var c = "right";
                var e =
                    parseInt(this.iframeContainer.elementReferrer.style.right, 10)
            } else c = "left", e = -parseInt(this.iframeContainer.elementReferrer.style.left, 10);
            this.startOffsetX || (this.startOffsetX = a + e);
            a = this.isRight ? this.startOffsetX - a : a - this.startOffsetX;
            20 > a ? a = 0 : 20 > this.actualViewPortWidth - (a + b) && (a = this.actualViewPortWidth - b);
            this.iframeContainer.restyle(c, a + "px !important")
        };
        ka.prototype.setChatWindowYPosition = function(a) {
            var b = parseInt(q.frameHeight.replace("px", ""), 10);
            if ("auto" === this.iframeContainer.elementReferrer.style.bottom) {
                styleKey =
                    "top";
                var c = -parseInt(this.iframeContainer.elementReferrer.style.top, 10);
                var e = !1
            } else styleKey = "bottom", c = parseInt(this.iframeContainer.elementReferrer.style.bottom, 10), e = !0;
            this.startOffsetY || (this.startOffsetY = a + c);
            a = e ? this.startOffsetY - a : a - this.startOffsetY;
            20 > a ? a = 0 : 20 > this.actualViewPortHeight - (a + b) && (a = this.actualViewPortHeight - b);
            this.iframeContainer.restyle(styleKey, a + "px !important")
        };
        ka.prototype.onWindowResize = function() {
            var a = this;
            clearTimeout(this.resizeTimeout);
            this.wasScrollbarDown =
                this.ifScrollbarDown();
            this.resizeTimeout = setTimeout(function() {
                a.onWindowResizeTimeout()
            }, 100)
        };
        ka.prototype.onWindowResizeTimeout = function() {
            var a = this.getActualViewportDimensions(),
                b = a.width;
            a = a.height;
            var c = this.iframeContainer.elementReferrer,
                e = this.isBottom ? parseInt(c.style.bottom.replace("px", ""), 10) : parseInt(c.style.top.replace("px", ""), 10),
                g = this.isRight ? parseInt(c.style.right.replace("px", ""), 10) : parseInt(c.style.left.replace("px", ""), 10),
                h = parseInt(q.frameWidth.replace("px", ""), 10),
                m = parseInt(q.frameHeight.replace("px",
                    ""), 10);
            h + g > b && (g = b - h, 0 > g && (h += g, g = 0, this.setWidth(h)), this.isRight ? c.style.right = g + "px" : c.style.left = g + "px");
            m + e > a && (e = a - m, 0 > e && (m += e, e = 0, this.setHeight(m)), this.isBottom ? c.style.bottom = e + "px" : c.style.top = e + "px");
            this.wasScrollbarDown && this.scrollToBottom();
            this.resetFrameDimensions()
        };
        ka.prototype.setWidth = function(a) {
            if (!a || 300 > a) a = 300;
            this.chatContainer.restyle("width", a + "px !important")
        };
        ka.prototype.setHeight = function(a) {
            if (!a || 350 > a) a = 350;
            this.chatContainer.restyle("height", a + "px !important")
        };
        ka.prototype.onEmbeddedWindowResize = function() {
            null === this.isWidgetElementDimensionsNull && this.setWidgetElementDimensions();
            this.isWidgetElementDimensionsNull ? (this.setWidth(f.maximizedDimensions().width), this.setHeight(f.maximizedDimensions().height)) : (this.chatContainer.restyle("width", "100%"), this.chatContainer.restyle("height", "100%"))
        };
        ka.prototype.setWidgetElementDimensions = function() {
            var a = document.getElementById(v.embedded);
            this.isWidgetElementDimensionsNull = 280 > a.clientWidth || 330 > a.clientHeight ?
                !0 : !1
        };
        ka.prototype.resetFrameDimensions = function() {
            var a = parseInt(l.computedStyle(this.chatContainer.elementReferrer, "width").replace("px", ""), 10),
                b = parseInt(l.computedStyle(this.chatContainer.elementReferrer, "height").replace("px", ""), 10);
            q.frameWidth = a + "px";
            q.frameHeight = b + "px"
        };
        ka.prototype.isWidgetElementDimensionsNull = null;
        ka.prototype.styleAgentBar = function() {
            var a = this.chatContainer;
            if (a) {
                var b = a.getElementById("agentWrapper");
                try {
                    0 < d.agents.agentsCount ? (a.getElementById("headerAccountStateContainer").style.display =
                        "none", b.style.display = "block") : (a.getElementById("headerAccountStateContainer").style.display = "block", b.style.display = "none")
                } catch (c) {
                    ma.handleError("headerAccountStateContainer is null", c.fileName, c.lineNumber, c.stack)
                }
            }
        };
        ka.prototype.expandAgentList = function(a) {
            var b;
            if (b = this.chatContainer) {
                var c = b.getElementById("agentBar");
                b = b.getElementById("expandableLink");
                1 === a.button && !k.event || 1 < a.button || (-1 === c.className.indexOf("expanded") ? (c.className += " expanded", b.className = "expanded") : (c.className =
                    c.className.replace("expanded", ""), b.className = ""), this.styleAgentBar())
            }
        };
        ka.prototype.resetView = function() {
            var a;
            if (a = this.chatContainer) {
                var b = a.getElementById("chatWrapper");
                var c = a.getElementById("agentList");
                var e = a.getElementById("agentBar");
                a = a.getElementById("expandableLink");
                if (b) {
                    var g = b.lastChild;
                    b.innerHTML = "";
                    b.appendChild(g)
                }
                c && (c.innerHTML = "");
                e && (b = e.parentNode.childNodes[0], e.className = "", b && -1 !== b.className.indexOf("agentWrapper") && b.parentNode.removeChild(b));
                a && (a.style.visibility =
                    "hidden", a.className = "");
                this.show()
            }
        };
        ka.prototype.handleIndicatorToggle = function() {
            u && u.container && u.chatIndicator && (u.chatIndicator.getElementById("tawkchat-chat-indicator").style.visibility = "visible")
        };
        var ub = ka.extend({
            init: function() {
                this._super(this)
            },
            changeDragElementSize: function(a) {
                this.dragElement.restyle(f.isRTL() ? "right" : "left", a + "px !important")
            },
            handleEndChat: function() {
                u && u.container && u.chatEnded();
                d.viewHandler.clearAgentHeader();
                f.isEmbedded || (f.isPopup ? (d.socketManager.sendToConnector("popupOnFocus", !1), setTimeout(function() {
                    1 < k.history.length ? k.history.back() : k.close()
                }, 200)) : (d.sessionHandler.notifyWindowState("min"), q.chatEnded()))
            },
            handleRestartChat: function() {
                d.formHandler.closeForm();
                q.chatStarted()
            }
        });
        ja.prototype.setDimensions = function() {
            "rectangle" === f.mobileWidget() ? (this.minifiedBoxWidth = 110, this.minifiedBoxHeight = 68) : this.minifiedBoxHeight = this.minifiedBoxWidth = 60
        };
        ja.prototype.buildView = function() {
            this.container.buildIframe(d.MinifiedMobileStyle + f.mobMinStyle());
            d.MinifiedMobileStyle =
                d.MinifiedMobileStyle.replace(/#tawktoLink/g, "#" + d.viewHandler.tawktoLinkName);
            d.MinifiedMobileStyle = d.MinifiedMobileStyle.replace(/#bottomContainer/g, "#" + d.viewHandler.bottomContainerName);
            f.showMessagePreview() ? this.initMessagePreviewContainer() : this.destroyMessagePreviewContainer();
            f.isRTL() && (this.container.getElementById("tawkchat-minified-box").className += " rtl-direction ");
            this.updateStatus();
            this.attachEvents();
            this.updateWidgetPosition()
        };
        ja.prototype.updateStatus = function(a) {
            var b;
            a || (a =
                y.pageStatus());
            if (this.container && a) {
                if (b = this.container.getElementById("tawkchat-status-icon")) b.className = a;
                if (b = this.container.getElementById("tawk-minified-mobile-text")) b.innerHTML = "online" === a || "away" === a ? d.languageParser.translate("chat", "chat_text") : d.languageParser.translate("form", "message");
                try {
                    d.eventEmitter.emit("resizeIframeHeight")
                } catch (c) {
                    ma.handleError("Unable to emit resizeIframeHeight", c.fileName, c.lineNumber, c.stack)
                }
            }
        };
        ja.prototype.attachEvents = function() {
            var a = this;
            this.container.attachUserEventListener(d.viewHandler.clickEvent,
                function(b) {
                    d.eventHandler.cancelEvent(b);
                    a.isMoving || (d.sessionHandler.notifyWindowState("max"), d.viewHandler.checkSeenMessageViewport());
                    a.isMoving = !1
                }, "tawkchat-minified-box", "mobpclick");
            this.container.attachUserEventListener("touchmove", function() {
                a.isMoving = !0
            }, "tawkchat-minified-box", "mobpmove")
        };
        ja.prototype.show = function() {
            this.container.restyle("display", "block")
        };
        ja.prototype.updateWidgetPosition = function() {
            var a = "";
            this.container && this.container.elementReferrer && (a = f.isCenterPositioned() ?
                a + " center " : f.isTopPositioned() ? a + " top " : a + " bottom ", a = f.isRightPositioned() ? a + " right " : a + " left ", a += " " + f.mobileWidget() + " ", this.container.documentRef.body.className = a)
        };
        ja.prototype.initMessagePreviewContainer = function() {
            var a = d.viewHandler.iframeContainer;
            this.messagePreview = new qa(l.getRandomName(), l.getGenericStyle({
                    zindex: "999999",
                    width: "100%",
                    height: "0px",
                    minwidth: "auto",
                    maxwidth: "378px",
                    minheight: "auto",
                    left: "auto",
                    right: "auto",
                    position: "fixed",
                    display: "none",
                    top: "auto",
                    bottom: "auto"
                }),
                Aa, "iframe");
            d.viewHandler.messagePreview = new ha(this.messagePreview);
            this.messagePreview.elementReferrer || a.elementReferrer.appendChild(this.messagePreview.buildView(a.documentRef));
            this.messagePreview.buildIframe(d.MinifiedStyle + f.minStyle());
            a = l.getElementsByTagName(this.messagePreview.documentRef, "body")[0];
            var b = U["tawkchat-message-preview"];
            b = b.replace(/__TAWK_TO_LINK__/gm, d.viewHandler.tawktoLinkName);
            b = b.replace(/__BOTTOM_CONTAINER__/gm, d.viewHandler.bottomContainerName);
            a.innerHTML = b
        };
        ja.prototype.destroyMessagePreviewContainer =
            function() {
                this.messagePreview && this.messagePreview.documentRef && this.messagePreview.documentRef.parentNode && this.messagePreview.documentRef.parentNode.removeChild(this.messagePreview.documentRef);
                this.messagePreview = null;
                d.viewHandler.messagePreview = null
            };
        O.prototype = new X;
        O.prototype.constructor = O;
        O.prototype.parent = X.prototype;
        O.prototype.begin = function() {
            document.body.appendChild(this.iframeContainer.elementReferrer);
            if ("symbian" === this.browser || "ie" === this.browser || "opera" === this.browser || "android2.3" ===
                this.browser) this.clickEvent = "click";
            this.minifiedWidget.buildView();
            q.buildView();
            this.chatContainer = q.container;
            this.noZoomMetaTag = document.createElement("meta");
            this.noZoomMetaTag.name = "viewport";
            this.parent.begin.call(this);
            this.renderMinifiedBox();
            if (l.isTouchDevice() && ("android" === D.mobileBrowserName || "android2" === D.mobileBrowserName || "android2.3" === D.mobileBrowserName)) {
                var a = this.chatContainer.getElementById("chatContainer"),
                    b = this.chatContainer.getElementById("menuScrollable");
                this.addOverflowScroll(a);
                this.addOverflowScroll(b);
                a.style.overflow = "hidden";
                b.style.overflow = "hidden"
            }
            d.audioPlayer.initAudioPlayer()
        };
        O.prototype.shapeChanged = function() {
            (this.isMinifiedRound = "round" === f.mobileWidget() ? !0 : !1) ? this.minifiedBoxHeight = this.minifiedBoxWidth = this.defaultHeight = this.defaultWidth = 60: (this.defaultWidth = 110, this.defaultHeight = 68, this.minifiedBoxWidth = 110, this.minifiedBoxHeight = 68)
        };
        O.prototype.handleEndChat = function() {
            q.chatEnded();
            this.chatContainer.hide();
            this.isMaximized = !1;
            this.iframeContainer.restyle("right",
                "0px");
            this.show()
        };
        O.prototype.show = function() {
            var a = document.querySelector("meta[name=viewport]") || document.querySelector("meta[name=VIEWPORT]");
            this.isMaximized ? (this.iframeContainer.massRestyle({
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px"
            }), this.isMobileOptimizedWebsite() || null === this.noZoomMetaTag || (this.metaContent || "" !== this.noZoomMetaTag.content ? this.metaContent && !this.hasNoScale && a && a.setAttribute("content", this.metaContent + ", user-scalable=no") : (this.noZoomMetaTag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
                this.noZoomMetaTag.parentNode || document.getElementsByTagName("head")[0].appendChild(this.noZoomMetaTag))), this.isVisibilityToggled || (this.iframeContainer.show(), this.chatContainer.show()), this.minifiedWidget.container.hide(), "max" !== y.chatWindowState() && d.sessionHandler.notifyWindowState("max"), d.viewHandler.newMessageNotSeen && setTimeout(function() {
                d.viewHandler.checkUnseenMessages()
            }, 0)) : (this.isMobileOptimizedWebsite() ? (this.getZoom(), this.renderMinifiedBox()) : this.metaContent && !this.hasNoScale ?
                a && a.setAttribute("content", this.metaContent) : this.noZoomMetaTag.parentNode && (this.noZoomMetaTag.content = "", document.getElementsByTagName("head")[0].removeChild(this.noZoomMetaTag)), l.blurElements(q.container.documentRef.body.getElementsByTagName("input")), l.blurElements(q.container.documentRef.body.getElementsByTagName("textarea")), this.isVisibilityToggled || (this.minifiedWidget.container.show(), this.showWidget()), this.resetOriginalStyle(), this.indicator.initIndicator(), "min" !== y.chatWindowState() &&
                d.sessionHandler.notifyWindowState("min"), this.resizeHandler(), v.triggerApiHandlers("onChatMinimized"));
            this.isVisibilityToggled || (this.updateViewByStatus(y.pageStatus()), this.parent.show.call(this))
        };
        O.prototype.hideWidget = function() {
            this.isMaximized ? (this.isPopupFocused && d.socketManager.sendToConnector("popupOnFocus", !1), this.chatContainer.hide()) : (null !== this.originalDocumentStyle && (this.iframeContainer.documentRef.body.style.cssText = this.originalDocumentStyle), this.minifiedWidget.container.hide());
            this.iframeContainer.hide();
            v.triggerApiHandlers("onChatHidden")
        };
        O.prototype.showWidget = function() {
            this.iframeContainer.show();
            null !== this.originalDocumentStyle && (this.iframeContainer.documentRef.body.style.cssText = this.originalDocumentStyle, this.originalDocumentStyle = null, k.scrollTo(this.scrollLeft, this.scrollTop));
            if (this.isMaximized) {
                this.scrollLeft = void 0 !== k.pageXOffset ? k.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                this.scrollTop = void 0 !== k.pageYOffset ?
                    k.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                this.scrollToBottom();
                this.originalDocumentStyle = this.iframeContainer.documentRef.body.style.cssText;
                for (var a = "height min-height max-height width min-width max-width".split(" "), b = 0; b < a.length; b++) this.iframeContainer.documentRef.body.style.setProperty(a[b], "100%", "important");
                this.iframeContainer.documentRef.body.style.setProperty("overflow", "hidden", "important");
                this.iframeContainer.documentRef.body.style.setProperty("position",
                    "fixed", "important");
                q.container.show()
            } else {
                if (f.hideWidgetOnLoad) {
                    this.hideWidget();
                    return
                }
                this.minifiedWidget.container.show();
                this.resizeIframeHeight()
            }
            this.iframeContainer.show()
        };
        O.prototype.init = function() {
            this.checkMetaContent();
            this.addResizeEvents();
            this.resizeHandler()
        };
        O.prototype.getZoom = function() {
            this.zoom = screen.width / k.innerWidth
        };
        O.prototype.addResizeEvents = function(a) {
            var b = this;
            var c = function(e) {
                b.resizeHandler()
            };
            d.eventHandler.listen(k, "resize", c, "mobileresize");
            d.eventHandler.listen(k,
                "scroll", c, "mobilescroll");
            a && d.eventHandler.listen(k, "touchmove", c)
        };
        O.prototype.checkMetaContent = function() {
            var a = {},
                b = this.metaContent;
            if (b) {
                b = b.replace(/ /g, "");
                b = b.split(",");
                for (var c = 0, e = b.length; c < e; c++) {
                    var g = b[c].split("=");
                    a[g[0]] = g[1]
                }
                this.hasInitialScale = "1.0" === a["initial-scale"];
                this.hasViewportHeightWidth = !(!a.width && !a.height);
                this.minAndMaxScalesAreEqual = a["minimum-scale"] && a["maximum-scale"] && a["minimum-scale"] === a["maximum-scale"];
                this.initialAndMaxScalesAreEqual = a["initial-scale"] &&
                    a["maximum-scale"] && a["initial-scale"] === a["maximum-scale"];
                this.hasNoScale = "no" === a["user-scalable"] || "0" === a["user-scalable"]
            }
        };
        O.prototype.ifScrollbarDown = function() {
            if (this.isMaximized) return this.parent.ifScrollbarDown.call(this);
            var a;
            if (!document) return !1;
            if (a = document.body) {
                var b = document.documentElement.clientHeight + 10;
                return 80 > a.scrollHeight - ((a.scrollTop || document.documentElement.scrollTop) + b)
            }
        };
        O.prototype.resizeHandler = function() {
            var a = this;
            "offline" === y.pageStatus() && f.hideWidgetOnOffline ||
                this.isMaximized || (clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    var b = a.isLandscape(),
                        c = a.ifScrollbarDown();
                    "offline" === y.pageStatus() && f.hideWidgetOnOffline || (a.landscape !== b && c && setTimeout(function() {
                        a.scrollToBottom()
                    }, 200), a.landscape = b, a.isMobileOptimizedWebsite() && "opera" !== D.mobileBrowserName && "android2.3" !== D.mobileBrowserName || (a.getZoom(), a.renderMinifiedBox()))
                }, 100))
        };
        O.prototype.getMetaContent = function() {
            var a, b = document.getElementsByTagName("meta"),
                c = "";
            var e = 0;
            for (a = b.length; e < a; e++) b[e].getAttribute("name") && "viewport" === b[e].getAttribute("name").toLowerCase() && (c = b[e].getAttribute("content"));
            return c
        };
        O.prototype.isLandscape = function() {
            return screen.height < screen.width || k.innerHeight < k.innerWidth
        };
        O.prototype.isMobileOptimizedWebsite = function() {
            this.checkMetaContent();
            return this.minAndMaxScalesAreEqual && (this.hasViewportHeightWidth || this.hasNoScale) || this.initialAndMaxScalesAreEqual
        };
        O.prototype.resizeMobileRectangleWidget = function() {
            var a =
                this.minifiedWidget.container.getElementById("tawk-minified-mobile-text"),
                b = this.minifiedWidget.container.getElementById("tawkchat-chat-indicator"),
                c = this.minifiedWidget.container.getElementById("tawkchat-minified-wrapper"),
                e = "safari" !== D.mobileBrowserName ? screen.width : screen.height;
            "rectangle" === f.mobileWidget() && (a.style.width = "", this.minifiedBoxWidth = a.offsetWidth + 41, 110 > this.minifiedBoxWidth ? this.minifiedBoxWidth = 110 : !this.isLandscape() && this.minifiedBoxWidth > screen.width ? (this.minifiedBoxWidth =
                screen.width - 41, a.style.width = "calc(100% - 41px)") : this.isLandscape() && this.minifiedBoxWidth > e && (this.minifiedBoxWidth = e - 41, a.style.width = "calc(100% - 41px)"), !this.isLandscape() && this.minifiedBoxWidth > screen.width - 41 ? this.minifiedBoxWidth = screen.width - 41 : this.isLandscape() && this.minifiedBoxWidth > e - 41 && (this.minifiedBoxWidth = e - 41 - 10), c.style.width = this.minifiedBoxWidth + "px", f.isRTL() ? b.style.right = this.minifiedBoxWidth - 17 + "px" : b.style.left = this.minifiedBoxWidth - 17 + "px")
        };
        O.prototype.scaleContent =
            function(a) {
                if (!this.isMaximized) {
                    var b = f.isRTL() ? "right" : "left";
                    this.resizeMobileRectangleWidget();
                    var c = this.minifiedBoxHeight,
                        e = this.minifiedBoxWidth,
                        g = this.minifiedWidget.container.getElementById("tawkchat-minified-box"),
                        h = "scale(" + a + ")";
                    h = "-moz-transform : " + h + "; -webkit-transform : " + h + "; -o-transform : " + h + "; -ms-transform : " + h + "; transform : " + h + ";";
                    b = "-moz-transform-origin : bottom " + b + "; -webkit-transform-origin : bottom " + b + "; -o-transform-origin : bottom " + b + "; -ms-transform-origin : bottom " +
                        b + "; transform-origin : bottom" + b;
                    a && g && (c = Math.ceil(c * a) + 15 * a, e = Math.ceil(e * a) + 15 * a, this.minifiedWidget.container.massRestyle({
                        height: c + "px !important",
                        width: e + "px !important",
                        "min-height": c + "px !important",
                        "min-width": e + "px !important",
                        "max-height": c + "px !important",
                        "max-width": e + "px !important"
                    }), g.style.cssText += h + b, f.isRTL() && !g.classList.contains("rtl-direction") ? g.classList.add("rtl-direction") : !f.isRTL() && g.classList.contains("rtl-direction") && g.classList.remove("rtl-direction"));
                    this.updateWidgetPosition(c)
                }
            };
        O.prototype.popup = function() {
            var a = "https://tawk.to/chat/" + sa.pageId + "/";
            this.indicator.hide();
            this.chatContainer.hide();
            this.isMaximized = !1;
            this.show();
            q.closeMenu();
            if (this.myWin && !this.myWin.closed) return this.myWin.focus();
            f.whiteLabel().whitelabeled && f.whiteLabel().popoutBaseUrl && (a = f.whiteLabel().popoutBaseUrl + "/chat/");
            this.myWin = "nokia" === D.mobileBrowserName ? k.open(a + $_Tawk_WidgetId + "?$_tawk_sk=" + y.sessionKey + "&$_tawk_tk=" + y.transferKey + "&v=" + y.serverVersion, "Tawk", "height=500, width=450, resizable=yes, toolbar=no, location=no, menubar=no, personalbar=no") :
                k.open(a + $_Tawk_WidgetId + "?$_tawk_sk=" + y.sessionKey + "&$_tawk_tk=" + y.transferKey + "&v=" + y.serverVersion)
        };
        O.prototype.maximize = function() {
            "firefox" === D.mobileBrowserName && !this.isMobileOptimizedWebsite() || "pop" === f.onClickAction ? this.popup() : (this.messagePreview && this.messagePreview.hide(), this.hasChatStarted || (f.showPreChatForm = this.isTherePreChat), this.indicator.hide(), this.minifiedWidget.container.hide(), this.originalIframeContainerStyle || (this.originalIframeContainerStyle = this.iframeContainer.elementReferrer.style.cssText),
                this.iframeContainer.restyle("margin", "0px !important"), this.isMaximized = !0, this.show())
        };
        O.prototype.resetOriginalStyle = function() {
            this.originalIframeContainerStyle && (this.iframeContainer.elementReferrer.style.cssText = this.originalIframeContainerStyle)
        };
        O.prototype.resizeIframeHeight = function() {
            if (!this.isMaximized && this.iframeContainer && this.minifiedWidget.container.elementReferrer && this.isIEWidget) {
                var a = this.minifiedWidget.container.getElementById("tawkchat-status-text-container").offsetHeight;
                this.minifiedWidget.container.restyle("height", a + "px");
                this.iframeContainer.restyle("marginTop", "-" + a / 2 + "px");
                this.iframeContainer.restyle("height", a + "px")
            }
        };
        O.prototype.renderBottomWidget = function() {
            this.isMaximized || (this.isBottomWidget = !0, this.minifiedWidget.container.template = U["mobile-bottom-" + f.mobileWidget()], this.iframeContainer.restyle("position", "fixed"), this.updateWidgetPosition())
        };
        O.prototype.handleIndicatorToggle = function(a) {
            var b = this.minifiedWidget.container.getElementById("tawkchat-chat-indicator"),
                c = this.minifiedWidget.container.getElementById("tawkchat-minified-wrapper");
            this.isIndicatorOn = a;
            c.className = a ? c.className + " indicator-on " : c.className.replace("indicator-on", "");
            this.isMobileOptimizedWebsite() ? this.scaleContent(1) : this.renderMinifiedBox();
            b.style.visibility = "visible"
        };
        O.prototype.updateViewByStatus = function(a, b) {
            this.isMaximized ? this.parent.updateViewByStatus.call(this, a) : this.iframeContainer.elementReferrer && ("offline" === a && f.hideWidgetOnOffline ? this.hideWidget() : this.showWidget(),
                this.resizeHandler())
        };
        O.prototype.updateWidgetPosition = function(a) {
            var b = {},
                c = {};
            a = a || this.minifiedBoxHeight;
            this.iframeContainer && (f.isCenterPositioned() ? (b.top = "50% !important", b.bottom = "auto !important", b.margin = this.isMinifiedRound ? -.5 * a + "px 0 0 0 !important" : -.5 * a - (this.defaultHeight - 37) / 2 + "px 0 0 0 !important", c.bottom = "auto !important") : (b.margin = "0 !important", f.isTopPositioned() ? (b.top = "0px !important", b.bottom = "auto !important", c.top = this.isMinifiedRound ? "5px !important" : "-26px !important") :
                (b.bottom = "0px !important", b.top = "auto !important", c.bottom = this.isMinifiedRound ? "14px !important" : "0px !important")), f.isRightPositioned() ? (b.right = "0px !important", b.left = "auto !important", c.right = this.isMinifiedRound ? "5px !important" : "0px !important") : (b.left = "0px !important", b.right = "auto !important", c.left = this.isMinifiedRound ? "20px !important" : "15px !important"), this.iframeContainer.massRestyle(b), this.minifiedWidget.container.massRestyle(c))
        };
        O.prototype.addOverflowScroll = function(a) {
            var b =
                0,
                c = this;
            d.eventHandler.listen(a, "touchstart", function(e) {
                b = a.scrollTop + e.touches[0].pageY
            }, "mobiletouchstart" + a.id);
            d.eventHandler.listen(a, "touchmove", function(e) {
                d.eventHandler.cancelEvent(e);
                20 >= e.touches[0].pageY || 0 > b - e.touches[0].pageY || (a.scrollTop = b - e.touches[0].pageY, q.isScrollbarDown = c.ifScrollbarDown())
            }, "mobiletouchmove" + a.id)
        };
        O.prototype.resetView = function() {
            var a;
            if (a = this.chatContainer) {
                if (a = a.getElementById("chatWrapper")) {
                    var b = a.lastChild;
                    a.innerHTML = "";
                    a.appendChild(b)
                }
                this.show()
            }
        };
        O.prototype.renderAgentMinimizedWidget = function(a) {
            var b = this.minifiedWidget.container.getElementById("agent-profile-image"),
                c = this.minifiedWidget.container.getElementById("tawkchat-status-text-container"),
                e = this.minifiedWidget.container.getElementById("tawkchat-status-agent-container");
            if (a) {
                if (a = N.agentProfiles[a], a = a.pi ? y.agentImgUrl + "/" + a.pi : "") "round" === f.mobileWidget() && (c.style.display = "none"), b.style.backgroundImage = "url('" + a + "')", e.style.display = "block"
            } else c.style.display = "inherit", b.style.backgroundImage =
                null, e.style.display = "none"
        };
        O.prototype.handleRestartChat = function() {
            d.formHandler.closeForm();
            q.chatStarted()
        };
        O.prototype.toggleWidget = function() {
            d.sessionHandler.notifyWindowState(this.isMaximized ? "min" : "max")
        };
        O.prototype.toggleVisibility = function() {
            this.scrollToBottom();
            (this.isVisibilityToggled = !this.isVisibilityToggled) ? this.hideWidget(): this.showWidget()
        };
        O.prototype.isWidgetHidden = function() {
            return !this.iframeContainer.isVisible
        };
        ba.prototype = new O;
        ba.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        ba.prototype.renderMinifiedBox = function() {
            var a = (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(.2 > a ? .2 : a)
        };
        Z.prototype = new O;
        Z.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        Z.prototype.isLandscape = function() {
            return 0 !== k.orientation
        };
        Z.prototype.getZoom = function() {
            this.zoom = (this.isLandscape() ? screen.height : screen.width) / k.innerWidth
        };
        Z.prototype.renderMinifiedBox = function() {
            var a = (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(a, !1)
        };
        V.prototype = new O;
        V.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        V.prototype.renderMinifiedBox = function() {
            var a = (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(a, !0)
        };
        Q.prototype = new O;
        Q.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents(!0);
            this.resizeHandler()
        };
        Q.prototype.isLandscape = function() {
            return 0 !== k.orientation
        };
        Q.prototype.getZoom = function() {
            this.isLandscape() ? this.screenWidth = screen.height :
                this.screenWidth = screen.width;
            this.zoom = this.screenWidth / k.innerWidth
        };
        Q.prototype.renderMinifiedBox = function() {
            var a = this.isMobileOptimizedWebsite() ? (.2 * this.screenWidth / this.minifiedBoxWidth).toFixed(2) : (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(a, !0)
        };
        F.prototype = new O;
        F.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        F.prototype.renderMinifiedBox = function() {
            this.scaleContent()
        };
        K.prototype = new O;
        K.prototype.init = function() {
            this.renderBottomWidget();
            this.checkMetaContent();
            this.addResizeEvents();
            this.resizeHandler()
        };
        K.prototype.renderMinifiedBox = function() {
            var a = (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(a, !0)
        };
        A.prototype = new O;
        A.prototype.init = function() {
            if ("ie" === this.browser) {
                var a = document.createElement("meta");
                a.httpEquiv = "X-UA-Compatible";
                a.setAttribute("content", "IE=edge");
                document.getElementsByTagName("head")[0].appendChild(a)
            }
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        A.prototype.renderMinifiedBox =
            function() {
                var a = (1 / this.zoom.toFixed(2)).toFixed(2);
                this.scaleContent(.2 > a ? .2 : a)
            };
        da.prototype = new O;
        da.prototype.init = function() {
            this.renderBottomWidget();
            this.addResizeEvents();
            this.resizeHandler()
        };
        da.prototype.renderMinifiedBox = function() {
            var a = (1 / this.zoom.toFixed(2)).toFixed(2);
            this.scaleContent(.2 > a ? .2 : a)
        };
        var Ha = X.extend({
            init: function() {
                var a = this;
                this._super(this);
                this.clickEvent = "touchend";
                this.iframeContainer = new ca(l.getRandomName(), "border: 0 none; padding: 0; margin: 0; z-index: 9999999; width: 100%; height: 100%; display: none; position : fixed; top :0; bottom : 0; min-width: 0 !important; min-height: 0 !important; max-width: none !important; max-height: none !important;");
                q = new Ia(this.tawktoLinkName, this.bottomContainerName);
                this.indicator = new Da;
                this.iframeContainer.addChildViews([q.container]);
                this.iframeContainer.buildView();
                var b = document.getElementsByTagName("head")[0];
                var c = document.createDocumentFragment();
                var e = l.createElement(document, "style", {
                    type: "text/css"
                });
                var g = document.createTextNode(d.ResetStyle + "" + d.MaximizedStyle + f.maxStyle());
                e.styleSheet ? e.styleSheet.cssText = g.nodeValue : e.appendChild(g);
                c.appendChild(e);
                b.appendChild(c);
                this.chatContainer = q.container;
                q.wrapper.addClass("mobile");
                N.rating.subscribe(function(h) {
                    a.changeRating(h)
                });
                y.pageStatus.subscribe(function(h) {
                    a.updateViewByStatus(h)
                });
                f.maxStyle.subscribe(function() {
                    q && q.container.elementReferrer && q.container.insertCssFile(f.maxStyle(), !0)
                });
                d.chatHandler.hasChatStarted.subscribe(function(h) {
                    q.toggleEndChatOption(h)
                })
            },
            show: function() {
                q.show();
                this.updateViewByStatus(y.pageStatus());
                this._super();
                d.socketManager.sendToConnector("popupOnFocus", !0)
            },
            updateViewByStatus: function(a) {
                this._super(a);
                q && "preChatForm" !== d.formHandler.currentForm && "offlineForm" !== d.formHandler.currentForm && f.isPopup && (a = Ca.getShortMessage(a), document.title = a ? sa.pageName() + " - " + l.rawDecode(a) : sa.pageName())
            },
            handleEndChat: function() {
                q.chatEnded();
                this.hideWidget()
            },
            handleRestartChat: function() {
                q.chatStarted()
            }
        });
        Ha.prototype.begin = function() {
            var a = D.mobileBrowserName;
            document.body.appendChild(this.iframeContainer.elementReferrer);
            if ("symbian" === a || "ie" === a || "opera" === a || "android2.3" === a) this.clickEvent = "click";
            q.buildView();
            if (l.isTouchDevice() && ("android" === D.mobileBrowserName || "android2" === D.mobileBrowserName || "android2.3" === D.mobileBrowserName)) {
                a = this.chatContainer.getElementById("chatContainer");
                var b = this.chatContainer.getElementById("menuScrollable");
                this.addOverflowScroll(a);
                this.addOverflowScroll(b);
                a.style.overflow = "hidden";
                b.style.overflow = "hidden"
            }
            d.audioPlayer.initAudioPlayer()
        };
        Ha.prototype.hideWidget = function() {
            d.socketManager.sendToConnector("popupOnFocus", !1);
            setTimeout(function() {
                1 < k.history.length ?
                    k.history.back() : k.close()
            }, 200)
        };
        Ha.prototype.showWidget = function() {
            this.scrollToBottom();
            this.iframeContainer.show()
        };
        Ha.prototype.resetView = function() {
            var a;
            if (a = this.chatContainer) {
                if (a = a.getElementById("chatWrapper")) {
                    var b = a.lastChild;
                    a.innerHTML = "";
                    a.appendChild(b)
                }
                this.show()
            }
        };
        Ha.prototype.addOverflowScroll = function(a) {
            var b = 0,
                c = this;
            d.eventHandler.listen(a, "touchstart", function(e) {
                b = a.scrollTop + e.touches[0].pageY
            }, "mobiletouchstart" + a.id);
            d.eventHandler.listen(a, "touchmove", function(e) {
                d.eventHandler.cancelEvent(e);
                20 >= e.touches[0].pageY || 0 > b - e.touches[0].pageY || (a.scrollTop = b - e.touches[0].pageY, q.isScrollbarDown = c.ifScrollbarDown())
            }, "mobiletouchmove" + a.id)
        };
        Ha.prototype.addEmojiToInput = function(a) {
            q.addEmojiToInput(a)
        };
        Ha.prototype.closeEmojiSelection = function() {
            q.closeEmojiSelection()
        };
        R.prototype.resetTimeout = function() {
            var a = this;
            clearTimeout(this.inactivityTimeout);
            clearTimeout(this.awayTimeout);
            this.awayTimeout = setTimeout(function() {
                !a.away && d && (a.away = !0, d && d.socketManager && z.connected && d.socketManager.sendToConnector("notifySocketStatusUpdate",
                    "away"))
            }, 6E5);
            d && !d.socketManager.isForcedDisconnect() && (this.inactivityTimeout = setTimeout(function() {
                a.inactivityTimeoutHandler()
            }, 12E5))
        };
        R.prototype.inactivityTimeoutHandler = function() {
            d && (d.socketManager.disconnectConnector(), f.isEmbedded ? d.formHandler.openForm("inactivityOverlay") : y.chatWindowState("min"), D.mobileBrowserName ? (d.eventHandler.listen(d.viewHandler.chatContainer.documentRef, "touchmove", this.reconnectOnActivity, "acitmmousemove"), d.eventHandler.listen(d.viewHandler.chatContainer.documentRef,
                d.viewHandler.clickEvent, this.reconnectOnActivity, "acitmclick"), d.eventHandler.listen(d.viewHandler.chatContainer.documentRef, "keydown", this.reconnectOnActivity, "acitmkeydown"), d.eventHandler.listen(document, "touchmove", this.reconnectOnActivity, "acitmousemove"), d.eventHandler.listen(document, d.viewHandler.clickEvent, this.reconnectOnActivity, "acitclick"), d.eventHandler.listen(document, "keydown", this.reconnectOnActivity, "acitkeydown")) : (d.eventHandler.listen(document, "mousemove", this.reconnectOnActivity,
                "acitmousemove"), d.eventHandler.listen(document, "click", this.reconnectOnActivity, "acitclick"), d.eventHandler.listen(document, "keydown", this.reconnectOnActivity, "acitkeydown"), document.onfocusin ? d.eventHandler.listen(document, "focusin", this.reconnectOnActivity, "acitfocus") : d.eventHandler.listen(k, "focus", this.reconnectOnActivity, "acitfocus")), d.viewHandler.indicator.pageTitleNotification.off())
        };
        R.prototype.cleanUp = function() {
            clearInterval(this.interval);
            clearTimeout(this.inactivityTimeout);
            clearTimeout(this.awayTimeout)
        };
        R.prototype.setupListeners = function() {
            D.mobileBrowserName ? (d.eventHandler.listen(d.viewHandler.chatContainer.documentRef, "touchmove", this.onActivityHandler, "acmmousemove"), d.eventHandler.listen(d.viewHandler.chatContainer.documentRef, d.viewHandler.clickEvent, this.onActivityHandler, "acmclick"), d.eventHandler.listen(d.viewHandler.chatContainer.documentRef, "keydown", this.onActivityHandler, "acmkeydown"), d.eventHandler.listen(document, "touchmove", this.onActivityHandler, "acmousemove"), d.eventHandler.listen(document,
                d.viewHandler.clickEvent, this.onActivityHandler, "acclick"), d.eventHandler.listen(document, "keydown", this.onActivityHandler, "ackeydown")) : f.isPopup ? (document.onfocusin ? (d.eventHandler.listen(document, "focusin", this.popupOnFocusHandler, "acfocus"), d.eventHandler.listen(document, "focusout", this.popupOnBlurHandler, "acblur")) : (d.eventHandler.listen(k, "focus", this.popupOnFocusHandler, "acfocus"), d.eventHandler.listen(k, "blur", this.popupOnBlurHandler, "acblur")), d.eventHandler.listen(document, "click", this.popupOnFocusHandler,
                "acphclick"), d.eventHandler.listen(document, "keydown", this.popupOnFocusHandler, "acphkeydown")) : (d.eventHandler.listen(document, "mousemove", this.onActivityHandler, "acmousemove"), d.eventHandler.listen(document, "click", this.onActivityHandler, "acclick"), d.eventHandler.listen(document, "keydown", this.onActivityHandler, "ackeydown"))
        };
        T.prototype.setup = function() {
            this.clear();
            null === this.originalPageStatus && (this.originalPageStatus = y.pageStatus());
            f.schedule ? (this.utcOffset = -1 * ((new Date).getTime() - f.scheduleTimezone.utc),
                this.calculate()) : y.pageStatus(this.originalPageStatus)
        };
        T.prototype.calculate = function() {
            var a = this;
            this.clear();
            if (f.schedule)
                if (0 === f.schedule.length) this.goOffline();
                else {
                    var b = new Date;
                    var c = -6E4 * b.getTimezoneOffset();
                    c = f.scheduleTimezone.tzo - c;
                    var e = new Date(b.getTime() + this.utcOffset + c);
                    b = e.getDay();
                    c = 60 * e.getHours() + e.getMinutes();
                    e = 60 * c + e.getSeconds();
                    for (var g = 0; g < f.schedule.length; g++) {
                        var h = f.schedule[g];
                        if (h.day === b) {
                            if (c >= h.start && c < h.end) {
                                var m = h;
                                break
                            }
                            if (c < h.start) {
                                var n = h;
                                break
                            }
                        }
                    }
                    void 0 !==
                        m ? (this.goOnline(), m = 60 * m.end - e) : (this.goOffline(), m = void 0 !== n ? 60 * n.start - e : 86400 - e + 1);
                    void 0 !== m && (this.setupTimeout = setTimeout(function() {
                        a.calculate()
                    }, 1E3 * m))
                }
        };
        T.prototype.goOnline = function() {
            null !== this.agentCountSubscription && (d.agents.totalAgents.unsubscribe(this.agentCountSubscription), this.agentCountSubscription = null);
            "offline" !== this.originalPageStatus && y.pageStatus(this.originalPageStatus)
        };
        T.prototype.goOffline = function() {
            0 !== d.agents.totalAgents() ? (null !== this.agentCountSubscription &&
                d.agents.totalAgents.unsubscribe(this.agentCountSubscription), this.agentCountSubscription = d.agents.totalAgents.subscribe(function(a) {
                    0 === a && y.pageStatus("offline")
                })) : y.pageStatus("offline")
        };
        T.prototype.clear = function() {
            clearTimeout(this.setupTimeout);
            this.setupTimeout = null;
            null !== this.agentCountSubscription && (d.agents.totalAgents.unsubscribe(this.agentCountSubscription), this.agentCountSubscription = null)
        };
        T.prototype.cleanUp = function() {
            this.clear();
            this.originalPageStatus = null
        };
        T.prototype.convertOldScheduleFormat =
            function(a) {
                var b = [];
                if (!a || Array.isArray(a)) return a;
                Object.keys(a).forEach(function(c) {
                    var e = a[c];
                    0 === e.start && 0 === e.end || b.push({
                        day: parseInt(c, 10),
                        start: Math.floor(e.start / 6E4),
                        end: Math.floor(e.end / 6E4)
                    })
                });
                return b
            };
        H.prototype.register = function() {
            this.registerStarted = !0;
            this.clearTimers();
            this.prepareData()
        };
        H.prototype.prepareData = function() {
            var a = "";
            if (d) {
                var b = ya.getSessionInformation();
                var c = y.sessionKey || void 0;
                b.length && (a = b[0]);
                var e = (new Date).getTimezoneOffset();
                if (-900 > e || 900 < e) e =
                    0;
                if (this.registerData) this.registerData.k = c, this.registerData.d = a;
                else {
                    var g = d.browserData.getReferredSearchEngine();
                    this.registerData = {
                        a: sa.pageId || "",
                        k: c,
                        w: f.widgetId,
                        d: a,
                        mb: D.mobileBrowserName ? 1 : 0,
                        m: e,
                        s: g,
                        q: "",
                        r: document.referrer,
                        p: document.location.href
                    }
                }
                this.registerData.cf = 3 === b.length && "cf" === b[2] ? 1 : 0;
                d.main.maximize && (this.registerData.h = "max");
                this.registerData.wv = -1;
                f.isPopup && y.transferKey && y.sessionKey && (this.registerData.tk = y.transferKey);
                d.main.previousSessionKey = this.registerData.k;
                this.getUUID()
            }
        };
        H.prototype.getUUID = function() {
            var a = !1,
                b = Infinity,
                c = d.punycode.toASCII(k.location.hostname);
            "www." === c.substring(0, 4) && (c = c.replace("www.", ""));
            var e = ya.getStoredUUID();
            for (var g = 0, h = e.length; g < h; g++) {
                var m = ya.parseSessionInformation(e[g]);
                if (4 === m.length) {
                    var n = m[0];
                    var x = m[1];
                    var E = m[2];
                    m = m[3];
                    if ("e" === n) {
                        if (c === x) {
                            var L = E;
                            var B = m;
                            break
                        }
                    } else "p" === n && (n = c.match(x)) && c.substr(n.index) === x && n.index < b && (b = n.index, L = E, B = m, a = !0)
                }
            }
            this.registerData && (this.registerData.u = L, this.registerData.uv =
                B, a && (this.registerData.uw = !0));
            this.startRegister()
        };
        H.prototype.abort = function() {
            null !== this.previousRegisterCall && (Ra.abort(this.previousRegisterCall), this.previousRegisterCall = null)
        };
        H.prototype.setupRegisterTimeout = function() {
            var a = this;
            clearTimeout(this.requestCancelTimeout);
            this.requestCancelTimeout = setTimeout(function() {
                a.abort();
                a.retryRegister()
            }, 9E4)
        };
        H.prototype.startRegister = function() {
            var a = ya.getHTTPCookie("TawkConnectionTime");
            a = parseInt(a.length ? a[0] : null, 10);
            !a || 1E3 < (new Date).getTime() -
                (new Date(a)).getTime() ? (ya.setHTTPCookie("TawkConnectionTime", (new Date).getTime(), !0), this.connectionCookieInterval = setInterval(function() {
                    ya.setHTTPCookie("TawkConnectionTime", (new Date).getTime(), !0)
                }, 100), this.doRegister()) : this.delayRegister()
        };
        H.prototype.delayRegister = function() {
            var a = this;
            clearTimeout(this.registerDelayTimeout);
            this.registerDelayTimeout = setTimeout(function() {
                a.register()
            }, 1E3)
        };
        H.prototype.doRegister = function() {
            var a = y.visitorAppServer + "/register/",
                b = this,
                c = ya.getLocalStorage("twk_token");
            this.registerStart = (new Date).getTime();
            this.setupRegisterTimeout();
            a += this.registerStart;
            this.previousRegisterCall = Ra.xhrRequest(a, {
                params: this.registerData,
                headers: {
                    "X-Tawk-Token": c && "undefined" !== c ? c : null
                }
            }, function(e, g) {
                if (e || !e && !g) return b.clearTimers(), b.retryRegister();
                d && d.main.begin(JSON.parse(l.trim(g)))
            })
        };
        H.prototype.retryRegister = function() {
            var a = this;
            if (null === this.retryRegisterTimeout)
                if (this.retryCount >= this.maxRetrycount) this.clearTimers(), d && d.main.hideWidget();
                else {
                    this.retryCount++;
                    var b = this.getRetryWaitDelay();
                    this.retryRegisterTimeout = setTimeout(function() {
                        a.register()
                    }, b)
                }
        };
        H.prototype.resetRetryCount = function() {
            this.retryCount = 0;
            this.retryDelay = 10
        };
        H.prototype.getRetryWaitDelay = function() {
            var a = Math.random() * (this.maxRandom - this.minRandom) + this.minRandom;
            if (null === this.retryDelay) this.retryDelay = this.retryInitialDelay;
            else {
                var b = this.retryDelay * this.retryMultiplier;
                this.retryDelay = this.retryDelay > this.maxDelay || b > this.maxDelay ? this.maxDelay : b
            }
            return 1E3 * Math.round(this.retryDelay *
                a)
        };
        H.prototype.clearTimers = function() {
            this.abort();
            clearTimeout(this.requestCancelTimeout);
            clearTimeout(this.registerDelayTimeout);
            clearTimeout(this.retryRegisterTimeout);
            clearInterval(this.connectionCookieInterval);
            ya.setHTTPCookie("TawkConnectionTime", 0, !0);
            this.connectionCookieInterval = this.requestCancelTimeout = this.registerDelayTimeout = this.retryRegisterTimeout = null
        };
        w.prototype.processPrechatForm = function(a) {
            f.showPreChatForm = a.states.prechat && a.states.prechat.handlers ? a.states.prechat.handlers.form :
                !1;
            if (f.showPreChatForm) {
                f.prechatOptions = {};
                var b = [];
                a.states.prechat.header.length && (f.prechatOptions.text = a.states.prechat.header[0].content.value);
                for (var c = 0; c < a.states.prechat.body.length; c++) {
                    var e = a.states.prechat.body[c];
                    "form" === e.type && e.content && e.content.fields && (b = e.content.fields, f.prechatOptions.fields = [])
                }
                for (c = 0; c < b.length; c++) a = b[c], f.prechatOptions.fields.push({
                    label: a.label,
                    type: a.context || a.type,
                    isRequired: a.required,
                    selections: a.options
                })
            }
        };
        w.prototype.processOfflineForm = function(a) {
            var b = {};
            if (a.states && a.states.offline) {
                var c = [];
                a.states.offline.minimizedText && (b.shortMessage = a.states.offline.minimizedText);
                a.states.offline.header.length && (b.text = a.states.offline.header[0].content.value);
                for (var e = 0; e < a.states.offline.body.length; e++) {
                    var g = a.states.offline.body[e];
                    "form" === g.type && g.content && g.content.fields && (c = g.content.fields, b.fields = [])
                }
                for (e = 0; e < c.length; e++) a = c[e], b.fields.push({
                    label: a.label,
                    type: a.context || a.type,
                    isRequired: a.required,
                    selections: a.options
                })
            }
            b.shortMessage ||
                (b.shortMessage = d.languageParser.translate("form", "SendMessage"));
            b.text || (b.text = d.languageParser.translate("form", "OfflineFormMessage"));
            b.fields && b.fields.length || (b.fields = [{
                label: d.languageParser.translate("form", "name"),
                isRequired: !0,
                type: "name"
            }, {
                label: d.languageParser.translate("form", "email"),
                isRequired: !0,
                type: "email"
            }, {
                label: d.languageParser.translate("form", "message"),
                isRequired: !0,
                type: "message"
            }]);
            f.offlineOptions = b
        };
        w.prototype.getPrechatFields = function() {
            return f.prechatOptions.fields
        };
        w.prototype.getOfflineFields = function() {
            return f.offlineOptions.fields
        };
        w.prototype.getShortMessage = function(a) {
            var b = null;
            "online" === a && f.onlineGreeting ? b = f.onlineGreeting.shortMessage : "away" === a && f.awayGreeting ? b = f.awayGreeting.shortMessage : "offline" === a && f.offlineOptions && (b = f.offlineOptions.shortMessage);
            return l.rawEncode(b)
        };
        w.prototype.getLongMessage = function(a) {
            var b = null;
            "online" === a && f.onlineGreeting ? b = f.onlineGreeting.longMessage : "away" === a && f.awayGreeting ? b = f.awayGreeting.longMessage :
                f.offlineOptions && (b = f.offlineOptions.text);
            return l.transformGreetings(b)
        };
        w.prototype.getWidgetSettings = function(a) {
            var b = this,
                c = y.visitorAppServer + "/v1/widget-settings",
                e = {
                    propertyId: sa.pageId,
                    widgetId: f.widgetId
                };
            this.settingsVersion && (e.sv = this.settingsVersion);
            Ra.get(c, e, function(g, h) {
                if (g || h && h.error) return a(!0);
                b.processNewSettings(JSON.parse(l.trim(h)));
                a()
            })
        };
        w.prototype.processNewSettings = function(a) {
            var b, c = 14,
                e = "",
                g = "",
                h = "";
            var m = b = 60;
            var n = a.data.widget;
            if (!(n.version < f.widgetVersion)) {
                this.settingsVersion =
                    a.data.settingsVersion;
                Tawk_API.embedded && (f.isEmbedded = !0);
                sa.pageName(a.data.propertyName);
                f.widgetVersion = n.version;
                f.onClickAction = n.behavior.click;
                f.hideWidgetOnLoad = !n.visibility.desktop.show;
                f.hideWidgetOnOffline = !n.visibility.all.showWhenOffline;
                f.showWaitTime = n.notification.all.estimatedWaitTime;
                f.locale = n.language;
                f.onlineGreeting = {
                    longMessage: n.states.online.header.length ? n.states.online.header[0].content.value : "",
                    shortMessage: n.states.online.minimizedText
                };
                for (var x = 0; x < n.states.online.body.length; x++) {
                    var E =
                        n.states.online.body[x];
                    if ("chat" === E.type) {
                        f.onlineGreeting.actionMessage = E.content.inputPlaceholder;
                        break
                    }
                }
                f.awayGreeting = {
                    longMessage: n.states.away.header.length ? n.states.away.header[0].content.value : "",
                    shortMessage: n.states.away.minimizedText
                };
                for (x = 0; x < n.states.away.body.length; x++)
                    if (E = n.states.away.body[x], "chat" === E.type) {
                        f.awayGreeting.actionMessage = E.content.inputPlaceholder;
                        break
                    }
                f.schedule = null;
                n.scheduler && n.scheduler.schedule && (f.schedule = d.scheduler.convertOldScheduleFormat(n.scheduler.schedule));
                f.showAgentTyping = n.notification.all.agentTyping;
                f.showVisitorTyping(n.notification.all.visitorTyping);
                f.soundOn(n.notification.all.sound);
                f.showUploads(n.features.uploads);
                f.showRating(n.features.rating);
                f.showEmoji(n.features.emoji);
                f.showMessagePreview(n.notification.desktop.preview);
                f.showUnreadInTab(n.notification.all.tab);
                f.isRTL(0 <= l.rtlLangTab.indexOf(f.locale));
                f.chatPosition(n.visibility.desktop.position);
                f.whiteLabel(a.data.branding);
                f.webRTCSettings(a.data.webrtc);
                "rectangle" === n.minimized.desktop.type ?
                    (f.widgetOffsetX = 10, f.widgetOffsetY = 0) : (f.widgetOffsetX = 20, f.widgetOffsetY = 20);
                D.mobileBrowserName ? f.mobileWidget(n.minimized.mobile.type || "round") : f.desktopWidget(n.minimized.desktop.type || "round");
                f.maximizedDimensions({
                    width: parseInt(n.maximized.desktop.width, 10) || 350,
                    height: parseInt(n.maximized.desktop.height, 10) || 520
                });
                f.isDesktopRectangle() && (b = parseInt(n.minimized.desktop.width, 10) || 320, m = parseInt(n.minimized.desktop.height, 10) || 40);
                f.chatBubble(n.bubble);
                f.headerBgColor = "#03a84e";
                f.headerTxtColor =
                    "#ffffff";
                f.agentTextBgColor = l.shadeColor(f.headerBgColor, -.1);
                f.agentTextColor = "#ffffff";
                f.visitorTextBgColor = "#e5e5e5";
                f.visitorTextColor = "#33333";
                n.theme && (n.theme.header && (f.headerBgColor = n.theme.header.background, f.headerTxtColor = n.theme.header.text), n.theme.agent && (f.agentTextBgColor = n.theme.agent.messageBackground, f.agentTextColor = n.theme.agent.messageText), n.theme.visitor && (f.visitorTextBgColor = n.theme.visitor.messageBackground, f.visitorTextColor = n.theme.visitor.messageText));
                f.minimizedDimensions({
                    width: b,
                    height: m,
                    position: f.chatPosition()
                });
                f.topCorner = "undefined" !== typeof n.minimized.desktop.borderRadiusTop ? n.minimized.desktop.borderRadiusTop : f.isTopPositioned() ? 0 : 8;
                f.bottomCorner = "undefined" !== typeof n.minimized.desktop.borderRadiusBottom ? n.minimized.desktop.borderRadiusBottom : f.isTopPositioned() ? 8 : 0;
                if (f.isEmbedded || f.isPopup) f.topCorner = 0, f.bottomCorner = 0;
                this.processPrechatForm(n);
                this.processOfflineForm(n);
                d && (a = ".theme-background-color{background-color: " + f.headerBgColor + ";}", b = ".theme-text-color{color: " +
                    f.headerTxtColor + ";}", f.showEmoji() && (c += 30), f.showRating() && (c += 30), f.showUploads() && (c += 30), d.MinifiedStyle && (m = f.topCorner + "px " + f.topCorner + "px " + f.bottomCorner + "px " + f.bottomCorner + "px !important;", messagePreviewRadius = f.topCorner + "px " + f.topCorner + "px " + f.topCorner + "px " + f.topCorner + "px !important;", bottomBorderRadius = ".bottom-border-corner{border-bottom-left-radius:" + f.bottomCorner + "px !important; border-bottom-right-radius:" + f.bottomCorner + "px !important;}", topBorderRadius = ".top-border-corner{border-top-left-radius:" +
                        f.topCorner + "px !important; border-top-right-radius:" + f.topCorner + "px !important;}", g = g + a + b + (".border-corner{border-radius : " + m + "-moz-border-radius : " + m + "-webkit-border-radius : " + m + "}"), g += topBorderRadius, g += bottomBorderRadius, g += "#tooLongMsgNotification {background-color: " + f.headerBgColor + "; color : " + f.headerTxtColor + "}", g += "#file-upload-drop-icon {color:" + f.headerBgColor + ";}", g += "#tawkchat-status-container{left: 10px;}", g += "#short-message, #maximizeChat, #minimizeChatMinifiedBtn{line-height: " +
                        f.minimizedDimensions().height + "px;}", g += "#tawkchat-message-preview-messages-container .messageBody {background-color: #fff !important; color : #333 !important;}", g += "#textareaContainer.additionalPadding{padding-right: " + c + "px;}", g += ".rtl-direction #textareaContainer.additionalPadding{padding-left: " + c + "px;padding-right: 14px;}", g += "#chat-icon-svg { fill:" + f.headerTxtColor + "};", f.minStyle(g), d.MinifiedStyle += " " + d.CommonStyle), d.MaximizedStyle && (a = ".theme-background-color{background-color: " + f.headerBgColor +
                        ";}", b = ".theme-text-color{color: " + f.headerTxtColor + ";}", e = e + a + b + ("#tooLongMsgNotification {background-color: " + f.headerBgColor + "; color : " + f.headerTxtColor + "}"), e += "#file-upload-drop-icon {color:" + f.headerBgColor + ";}", e += "#chatMenuControls li:hover {background-color: " + f.headerBgColor + ";color: " + f.headerTxtColor + "}", e += "#formContainer>#emailTranscriptForm .form-header-icon, #changeNameForm .form-header-icon, #chatEndedForm .form-header-icon, #preChatForm .longFormContainer .form-header-icon {background-color:" +
                        f.headerBgColor + ";}", e += "#formContainer>#emailTranscriptForm::before, #changeNameForm::before, #chatEndedForm::before, #endChatForm::before {background-color:" + f.headerBgColor + "; border-color: " + f.headerBgColor + ";}", e += "#formSubmit, #formSubmit-pc {background-color:" + f.headerBgColor + ";}", e = f.isDesktopRectangle() ? e + ("#textareaWrapper, #actionsContainer{border-radius : 0px 0px " + f.bottomCorner + "px " + f.bottomCorner + "px !important ;}") : e + "#textareaWrapper, #actionsContainer{border-radius : 0px 0px 5px 5px !important ;}",
                        e += "button.theme-background-color:hover{background-color: " + l.shadeColor(f.headerBgColor, -.3) + "!important;}", e += ".agentChatContainer .message{background-color: " + f.agentTextBgColor + " !important; color : " + f.agentTextColor + " !important;}", e += ".agentTypingIndicator .dot{background-color: " + f.agentTextColor + " !important;}", e += ".visitorChatContainer .message, .visitorChatContainer .messageWrapper.error .message {background-color: " + f.visitorTextBgColor + " !important; color : " + f.visitorTextColor + " !important;}",
                        e += ".upload-data {background-color: " + f.visitorTextBgColor + " !important; color : " + f.visitorTextColor + " !important;}", e += ".headerBoxLink .headerBoxIcon{color:" + f.headerTxtColor + ";}", e += ".message.agentTypingIndicator::before,.message.agentTypingIndicator::after {border-color: transparent " + f.agentTextBgColor + " transparent transparent;}", e += ".visitorChatContainer .messageWrapper .message::after {border-color: transparent transparent transparent " + f.visitorTextBgColor + ";}", e += ".agentChatContainer .messageWrapper .message::before,.agentChatContainer .messageWrapper .message::after {border-color: transparent " +
                        f.agentTextBgColor + " transparent transparent;}", e += ".upload-data::before, .upload-data::after {border-color: transparent transparent transparent " + f.visitorTextBgColor + ";}", e += ".agentNameCentered{color:" + f.headerTxtColor + ";}", e += "#textareaContainer.additionalPadding{padding-right: " + c + "px;}", e += ".rtl-direction #textareaContainer.additionalPadding{padding-left: " + c + "px;padding-right: 14px;}", e += "#actionsContainer.mobile-typing #textareaContainer{padding-right: " + (c + 27) + "px;}", e += ".rtl-direction #actionsContainer.mobile-typing #textareaContainer{padding-left: " +
                        (c + 27) + "px;}", f.maxStyle(e), d.MaximizedStyle += " " + d.CommonStyle), d.MinifiedMobileStyle && (bottomBorderRadius = ".bottom-border-corner{border-bottom-left-radius:" + f.bottomCorner + "px !important; border-bottom-right-radius:" + f.bottomCorner + "px !important;}", topBorderRadius = ".top-border-corner{border-top-left-radius:" + f.topCorner + "px !important; border-top-right-radius:" + f.topCorner + "px !important;}", h = h + a + b + topBorderRadius, h += bottomBorderRadius, h += "#chat-icon-svg { fill:" + f.headerTxtColor + "};", f.mobMinStyle(h),
                        d.MinifiedMobileStyle += " " + d.CommonStyle));
                n.consent && (f.consentOption = {
                    text: n.consent.message,
                    buttons: [{
                        textReplace: l.rawEncode(n.consent.actions.accept),
                        placeholder: "__CUSTOM_SUBMIT_BUTTON__"
                    }, {
                        textReplace: l.rawEncode(n.consent.actions.reject),
                        placeholder: "__CUSTOM_CLOSE_BUTTON__"
                    }]
                }, n.consent.policy && n.consent.policy.url && (f.consentOption.text += "\n[" + n.consent.policy.text + "](" + n.consent.policy.url + ")"));
                l.updateFonts()
            }
        };
        var Ca = new w;
        p.prototype.updateVisitorUUID = function(a) {
            var b = JSON.parse(a.uuids);
            ea.uuid = a.uuid;
            ea.uuidVer = a.uver || 0;
            b && (Object.keys(b.e).forEach(function(c) {
                ea.uuids.push({
                    isExact: !0,
                    domain: c,
                    uuid: b.e[c]
                })
            }), Object.keys(b.p).forEach(function(c) {
                ea.uuids.push({
                    isExact: !1,
                    domain: c,
                    uuid: b.p[c]
                })
            }));
            ya.storeUUID()
        };
        p.prototype.updateVisitorInformation = function(a) {
            a.n && l.isString(a.n) && ea.name(a.n);
            a.te && l.isString(a.te) && (ea.transcriptEmail = a.te);
            a.e && l.isString(a.e) && ea.email(a.e);
            a.vid && (ea.visitorId = a.vid);
            a.dpt && l.isString(a.dpt) && (N.chatDepartment = a.dpt);
            a.pcfs && y.prechatFormSubmitted(!0)
        };
        p.prototype.setNameFromForm = function(a) {
            d.visitorHandler.setNameValue(a);
            v.triggerApiHandlers("onVisitorNameChanged", a.name)
        };
        p.prototype.getNameValue = function() {
            return ea.name() === ea.displayName() ? ea.name() : ""
        };
        p.prototype.setNameValue = function(a) {
            ea.name(l.rawEncode(a.name))
        };
        p.prototype.getTranscriptEmailValue = function() {
            return ea.transcriptEmail
        };
        p.prototype.getEmailValue = function() {
            return ea.email() || ea.transcriptEmail
        };
        p.prototype.setEmailValue = function(a) {
            ea.email(a.email)
        };
        p.prototype.setTranscriptValue =
            function(a) {
                a.name && ea.name(l.rawEncode(a.name));
                ea.transcriptEmail = a.transcriptEmail
            };
        p.prototype.sendNavigationEvent = function() {
            var a = this;
            setTimeout(function() {
                var b = {
                    u: k.location.href,
                    t: document.title
                };
                d && (d.viewHandler && d.viewHandler.indicator && 0 < d.viewHandler.indicator.unansweredMessages && (b.t = d.viewHandler.indicator.originalPageTitle), document.referrer && a.referrer !== document.referrer && (a.referrer = document.referrer, b.r = document.referrer), d.socketManager.sendToConnector("nav", b))
            }, 500)
        };
        P.prototype.closeBubble =
            function() {
                y.chatBubbleClosed(!0);
                d.socketManager.sendToConnector("notifyChatBubbleClosed")
            };
        P.prototype.getDeparmentOptions = function() {
            var a, b = [],
                c = y.departments;
            c.sort(function(h, m) {
                h = l.rawDecode(h.n).toLowerCase();
                m = l.rawDecode(m.n).toLowerCase();
                return h < m ? -1 : h > m ? 1 : 0
            });
            var e = 0;
            for (a = c.length; e < a; e++) {
                var g = c[e];
                b.push({
                    text: g.n + " (" + d.languageParser.translate("status", g.st) + ")",
                    value: g.did,
                    selected: N.chatDepartment === g.did
                })
            }
            return b
        };
        P.prototype.getDeparmentName = function(a) {
            var b, c = y.departments;
            var e = 0;
            for (b = c.length; e < b; e++)
                if (c[e].did === a) return l.rawDecode(c[e].n);
            return a
        };
        P.prototype.formatFormData = function(a, b) {
            var c, e = {
                questions: []
            };
            if (b) {
                var g = 0;
                for (c = b.length; g < c; g++) {
                    var h = b[g];
                    "name" === h.type && (e.name = a[h.id]);
                    "email" === h.type && (e.email = a[h.id]);
                    if ("department" === h.type) {
                        if (!a[h.id] || "0" == a[h.id]) continue;
                        e.department = a[h.id];
                        a[h.id] = this.getDeparmentName(a[h.id])
                    }
                    a[h.id] && 0 !== a[h.id].length && (l.isArray(a[h.id]) ? e.questions.push({
                            label: l.rawDecode(h.label),
                            answer: a[h.id].join(", ")
                        }) :
                        e.questions.push({
                            label: l.rawDecode(h.label),
                            answer: a[h.id]
                        }))
                }
            }
            return e
        };
        P.prototype.formatPrechatData = function(a, b) {
            var c = this,
                e = this.formatFormData(a, Ca.getPrechatFields());
            d.socketManager.sendToConnector("notifyPrechat", e, function(g) {
                if (g) return b(g, e);
                v.triggerApiHandlers("onPrechatSubmit", e.questions);
                d.viewHandler.indicator.pageTitleNotification.off();
                c.handlePrechatSave(e, b)
            })
        };
        P.prototype.handlePrechatSave = function(a, b) {
            var c, e = "";
            a.name && d.visitorHandler.setNameValue(a);
            a.email && d.visitorHandler.setEmailValue(a);
            y.prechatFormSubmitted(!0);
            if (0 === a.questions.length) return b(null, a);
            if (0 < a.questions.length) {
                var g = 0;
                for (c = a.questions.length; g < c; g++) e += l.rawDecode(a.questions[g].label) + " : " + a.questions[g].answer, g !== c - 1 && (e += "\r\n")
            }
            d.chatHandler.sendMessageToServer(e, null, function(h) {
                h.error || (d.chatHandler.prepareMessage({
                    ut: "v",
                    t: "c",
                    m: l.rawEncode(e),
                    co: new Date,
                    uid: ea.visitorId
                }, !1, !1, !0), d.viewHandler.addWaitTime());
                b(h.error, a)
            })
        };
        P.prototype.formatOfflineData = function(a, b) {
            var c = this.formatFormData(a,
                Ca.getOfflineFields());
            c.questions.unshift({
                label: d.languageParser.translate("form", "SubmittedFrom"),
                answer: k.location.href
            });
            d.socketManager.sendToConnector("notifyOfflineMessage", c, function(e) {
                if (e) return b(e, c);
                v.triggerApiHandlers("onOfflineSubmit", c);
                b(null, c)
            })
        };
        P.prototype.visitorChatDismiss = function(a) {
            if (d.chatHandler.messages) {
                var b = Object.keys(d.chatHandler.messages);
                (b = d.chatHandler.messages[b[b.length - 1]]) && b.co && (b = (new Date(b.co)).getTime(), d.socketManager.sendToConnector("visitorChatDismiss", {
                    timestamp: b
                }, function(c) {
                    if (c) return a(c);
                    a(null)
                }))
            }
        };
        P.prototype.notifyWindowState = function(a) {
            y.chatWindowState(a);
            d.socketManager.sendToConnector("notifyWindowState", a)
        };
        P.prototype.addEvent = function(a, b, c) {
            "function" === typeof b && (c = b, b = null);
            c = c || function() {};
            var e = this.secureWrapper({});
            e.name = a;
            e.data = b;
            d.socketManager.sendToConnector("addEvent", e, c)
        };
        P.prototype.setAttributes = function(a, b, c) {
            c = c || function() {};
            b ? (v.visitor = v.visitor || {}, a.name && (v.visitor.name = a.name), a.email && (v.visitor.email =
                a.email), a.hash && (v.visitor.hash = a.hash)) : a = this.secureWrapper(a);
            d.socketManager.sendToConnector("setAttributes", a, function(e) {
                e || (a.name && d.visitorHandler.setNameValue(a), a.email && d.visitorHandler.setEmailValue(a));
                c(e)
            })
        };
        P.prototype.addTags = function(a, b) {
            b = b || function() {};
            var c = this.secureWrapper({});
            c.tags = a;
            d.socketManager.sendToConnector("addTags", c, b)
        };
        P.prototype.removeTags = function(a, b) {
            b = b || function() {};
            var c = this.secureWrapper({});
            c.tags = a;
            d.socketManager.sendToConnector("removeTags",
                c, b)
        };
        P.prototype.secureWrapper = function(a) {
            "undefined" === a && (a = {});
            v && v.visitor && (v.visitor.email && (a.email = v.visitor.email), v.visitor.hash && (a.hash = v.visitor.hash));
            return a
        };
        P.prototype.setVisitorAttributes = function() {
            var a = {};
            v && v.visitor && (v.visitor.name && (a.name = v.visitor.name), v.visitor.email && (a.email = v.visitor.email), this.setAttributes(a, !1))
        };
        G.prototype.parseHistory = function(a) {
            var b, c;
            (new Date).getTime();
            var e = c = 0;
            this.noRedraw = !0;
            N.chatEndVersion = 1;
            var g = 0;
            for (b = N.chatHistory.length; g <
                b; g++) "CHAT_ENDED" === N.chatHistory[g].m && (c = g + 1, N.chatEndVersion++);
            var h = 0 < N.chatOrder ? this.messages[N.chatOrder] : null;
            g = c;
            for (b = N.chatHistory.length; g < b; g++) c = N.chatHistory[g], c.md && (!c.md || c.md.ao) || a && h && h.timeStamp > (new Date(c.co)).getTime() || ("v" !== c.ut || this.visitorHasMessaged || "c" !== c.t || (e = (new Date).getTime() - l.getMilliseconds(c.co)), "WEBRTC_CALL" === c.m && c.md && c.md.webrtc ? (this.hasWebRTCall = !0, d.viewHandler.subscribeCallUpdate(c.md.clid, !0)) : this.prepareMessage(c, !0, !1, !1));
            this.noRedraw = !1;
            this.visitorHasMessaged && !this.agentHasMessaged && f.showWaitTime && (y.waitTime = y.waitTime < e ? 6E4 : y.waitTime - e, d.viewHandler.addWaitTime());
            this.hasChatStarted(this.visitorHasMessaged || this.agentHasMessaged)
        };
        G.prototype.handleIndicator = function() {
            d.viewHandler.indicator.show();
            D.mobileBrowserName && (d.viewHandler.hasChatStarted = !0)
        };
        G.prototype.handleMessageFromServer = function(a) {
            var b = null;
            if (a.md && a.md.ao) return N.chatVersion = a.cver;
            if ("offline" === y.pageStatus())
                if ("a" === a.ut) y.pageStatus("online");
                else return;
            if (!N.chatSynced) return N.chatBuffer.push(a);
            this.hasChatEnded && this.startNewChat();
            "WEBRTC_CALL" === a.m && a.md && a.md.webrtc ? this.hasWebRTCall = !0 : "CHAT_ENDED" !== a.m || this.hasChatEnded ? ("v" === a.ut && "c" === a.t && d.viewHandler.addWaitTime(), f.isPopup || "c" !== a.t || d.viewHandler.isMaximized || "v" === a.ut || f.isEmbedded || !D.mobileBrowserName || (d.viewHandler.hasChatStarted = !0), N.chatVersion = a.cver, "s" === a.ut || "c" !== a.t || this.hasChatStarted() || (this.hasChatStarted(!0), v.triggerApiHandlers("onChatStarted", {
                chatId: N.chatId
            })), "c" === a.t ? "a" === a.ut ? a.md && a.md.file ? v.triggerApiHandlers("onFileUpload", "https://tawkto.link/" + a.md.file.name) : v.triggerApiHandlers("onChatMessageAgent", a.m) : "s" === a.ut && v.triggerApiHandlers("onChatMessageSystem", a.m) : "n" === a.t && ("AGENT_JOIN_CONVERSATION" === a.m ? (a.md && a.md.pi && a.md.pi.length && (b = "https://s3.amazonaws.com/talk-pi/" + a.md.pi), v.triggerApiHandlers("onAgentJoinChat", {
                name: a.n,
                position: a.md.pst,
                image: b,
                id: a.uid
            })) : "AGENT_LEFT_CONVERSATION" === a.m && v.triggerApiHandlers("onAgentLeaveChat", {
                name: a.n,
                id: a.uid
            })), this.prepareMessage(a, !1), d.scheduler.calculate()) : (N.chatId = a.md.nchid, this.endChat(a.md.cev))
        };
        G.prototype.prepareMessage = function(a, b, c, e) {
            var g, h = !0;
            if ("n" === a.t && "v" === a.ut) "VISITOR_RATING" === a.m && this.changeRating(a.md.rt, !0);
            else {
                if ("v" === a.ut) {
                    var m = ea.displayName();
                    var n = a.uid
                } else if (m = a.n, "a" === a.ut) n = N.profiles[a.md.rsc];
                else if ("s" === a.ut && a.md) var x = a.md.pi;
                "n" !== a.t || "AGENT_JOIN_CONVERSATION" !== a.m && "AGENT_LEFT_CONVERSATION" !== a.m || (h = !1, d.agents.updateAgentPresence(a.m,
                    a.md, a.n, a.md.rsc, !c));
                h && (g || (g = this.parseText(a.m)), void 0 === b && (b = !0), a.timeStamp = (new Date(a.co)).getTime(), a.messageId = d.viewHandler.appendMessage({
                    message: g,
                    name: m,
                    type: a.t,
                    time: a.co,
                    data: a.md,
                    isPending: !1,
                    senderType: a.ut,
                    ownerId: n,
                    dontPlaySound: b,
                    profileImg: x,
                    reDisplay: e,
                    timeStamp: a.timeStamp
                }), e || N.chatOrder++, this.messages[N.chatOrder] = a)
            }
        };
        G.prototype.parseText = function(a) {
            if (a) return a = a.replace(l.regLineBreaks, l.br), a = this.createUrl(a.split(/\s/), " ")
        };
        G.prototype.createUrl = function(a,
            b) {
            function c(n) {
                return d.chatHandler.parseUrl(n)
            }

            function e(n) {
                return d.chatHandler.parseEmail(n)
            }
            var g;
            var h = 0;
            for (g = a.length; h < g; h++)
                if (-1 !== a[h].indexOf(l.br)) {
                    var m = a[h].split(l.regBr);
                    a[h] = this.createUrl(m, l.br)
                } else a[h].match(l.regEmailMatch) ? a[h] = a[h].replace(l.regEmailMatch, e) : (a[h] = a[h].replace(l.regMatchUrl, c), a[h] = a[h].replace(l.regMatchIp, c));
            return a.join(b)
        };
        G.prototype.parseUrl = function(a) {
            var b = "";
            if ("undefined" !== typeof la && la.unifyUnicode(a) !== a) return a;
            a.match(l.regEmailMatch) &&
                (b = "mailto:");
            if ("mailto:" === b) {
                var c = a.match(l.regEmailMatch)[0]; - 1 !== c.indexOf("mailto") && (b = "");
                return a.replace(l.regEmailMatch, '<a href="' + (b + c) + '" title="' + (b + c) + '" style="word-wrap:break-word; white-space:normal;>' + c + "</a> ")
            }
            0 !== a.toLowerCase().indexOf("http") && 0 !== a.toLowerCase().indexOf("ftp") && (b = "http://");
            return '<a target="_blank" href="' + (b + a) + '" title="' + (b + a) + '" style="word-wrap:break-word; white-space:normal;">' + a + "</a> "
        };
        G.prototype.parseEmail = function(a) {
            var b = "";
            if ("undefined" !==
                typeof la && la.unifyUnicode(a) !== a) return a; - 1 === a.indexOf("mailto") && (b = "mailto:");
            return '<a href="' + (b + a) + '" title="' + (b + a) + '">' + a + "</a> "
        };
        G.prototype.sendTextPreview = function(a) {
            var b = this;
            var c = d.eventHandler.getTargetElement(a);
            if (13 === a.keyCode && !a.shiftKey && !D.mobileBrowserName) {
                d.eventHandler.cancelEvent(a);
                var e = l.trim(c.value);
                c.value = "";
                return this.sendMessage(e)
            }!this.keyDownTimeout && f.showVisitorTyping() && (this.keyDownTimeout = setTimeout(function() {
                e = l.trim(c.value);
                "undefined" !== typeof la &&
                    (e = la.toShort(e));
                d.socketManager.sendToConnector("notifyMessagePreview", e);
                clearTimeout(b.keyDownTimeout);
                b.keyDownTimeout = 0
            }, 1E3))
        };
        G.prototype.sendMessage = function(a, b, c) {
            var e = (new Date).getTime();
            a = l.trim(a);
            clearTimeout(this.keyDownTimeout);
            this.keyDownTimeout = 0;
            if (!a) return c ? c() : !1;
            "undefined" !== typeof la && (a = la.toShort(a));
            this.previousText && this.previousTextTime && this.previousText === a && 500 > e - this.previousTextTime && d.loggingHandler.logIncident("Double message occured", {
                previousText: this.previousText,
                currentText: a,
                currentT: e,
                previousT: this.previousTextTime
            });
            this.previousTextTime = e;
            this.previousText = a;
            b = !!b;
            b = d.viewHandler.appendMessage({
                message: this.parseText(l.rawEncode(a)),
                name: ea.displayName(),
                type: "c",
                time: new Date,
                isPending: !0,
                senderType: "v",
                ownerId: ea.visitorId,
                dontPlaySound: b
            });
            this.sendMessageToServer(a, b, c)
        };
        G.prototype.sendMessageToServer = function(a, b, c) {
            var e = this,
                g;
            c = c || function(h) {
                d.viewHandler.handleAcknowledgment(h)
            };
            d.socketManager.sendToConnector("sendChatMessage", a, function(h,
                m, n) {
                h || (g = ++N.chatOrder, e.messages[g] = {
                    ut: "v",
                    t: "c",
                    m: l.rawEncode(a),
                    co: m,
                    messageId: b,
                    uid: ea.visitorId
                }, N.chatVersion = n, e.hasChatStarted() || "offline" === y.pageStatus() || (e.hasChatStarted(!0), v.triggerApiHandlers("onChatStarted", {
                    chatId: N.chatId
                })), v.triggerApiHandlers("onChatMessageVisitor", a));
                c({
                    error: h,
                    messageId: b,
                    order: g
                })
            })
        };
        G.prototype.conversationUpdate = function(a) {
            a = a || {};
            var b, c = a.cver || 0,
                e = a.c || [];
            var g = N.chatBuffer;
            N.chatSynced = !0;
            if (!(N.chatVersion >= c)) {
                a = 0;
                for (b = g.length; a < b; a++) g[a].cver >
                    c && e.push(g[a]);
                a = 0;
                for (b = e.length; a < b; a++) g = e[a], g.md && g.md.ao || this.prepareMessage(g, !1);
                this.visitorHasMessaged && !this.agentHasMessaged && f.showWaitTime && d.viewHandler.addWaitTime();
                N.chatVersion = c;
                this.isScrollbar = d.viewHandler.isChatScrollbar();
                d.viewHandler.scrollToBottom()
            }
        };
        G.prototype.handleAgentTyping = function(a) {
            var b = N.profiles[a];
            b && N.agentProfiles[b] && !this.agentsTyping[a] && (this.agentsTyping[a] = !0, this.agentProfilesTyping[b] ? this.agentProfilesTyping[b]++ : (this.agentProfilesTyping[b] =
                1, d.viewHandler.appendAgentIsTypingElement(b)))
        };
        G.prototype.handleAgentStoppedTyping = function(a) {
            var b = N.profiles[a];
            this.agentsTyping[a] && delete this.agentsTyping[a];
            !this.agentProfilesTyping[b] || 0 < --this.agentProfilesTyping[b] || (delete this.agentProfilesTyping[b], d.viewHandler.removeAgentTypingElement(b))
        };
        G.prototype.changeRating = function(a, b) {
            N.rating() === a && (a = 0);
            N.rating(a);
            b || (d.socketManager.sendToConnector("setRating", a), v.triggerApiHandlers("onChatSatisfaction", N.rating()))
        };
        G.prototype.toggleSound =
            function(a) {
                var b = !f.soundOn();
                void 0 !== a && (b = a);
                f.soundOn(b);
                void 0 === a && d.socketManager.sendToConnector("toggleSound", b)
            };
        G.prototype.clearChatMessages = function() {
            this.agentHasMessaged = this.visitorHasMessaged = !1;
            this.messageBuffer = [];
            this.messages = {};
            this.agentsTyping = [];
            this.agentProfilesTyping = [];
            this.lastMessageOwner = null;
            N.chatOrder = 0;
            N.chatSynced = !1;
            N.chatBuffer = []
        };
        G.prototype.startNewChat = function() {
            this.clearChatMessages();
            d.viewHandler.removeWaitTime();
            d.viewHandler.resetView();
            d.viewHandler.handleRestartChat();
            N.chatSynced = !0;
            D.mobileBrowserName || ("max" === y.chatWindowState() ? d.viewHandler.maximizeWidget() : d.viewHandler.minimizeWidget());
            this.hasChatEnded = !1
        };
        G.prototype.endChat = function(a) {
            d.viewHandler.handleEndChat();
            d.agents.clearAgents();
            this.hasChatEnded = !0;
            this.hasChatStarted(!1);
            N.chatEndVersion = a;
            v.triggerApiHandlers("onChatEnded")
        };
        G.prototype.sendFileMessage = function(a) {
            var b = this,
                c = {
                    fileName: a.filename,
                    name: a.name,
                    type: a.extension,
                    mimeType: a.mimeType,
                    size: a.size
                };
            d.socketManager.sendToConnector("fileUploadMessage",
                c,
                function(e, g, h) {
                    e || (d.viewHandler.fileUploaded(a.handle), c.fileName = l.rawEncode(c.fileName), messageId = d.viewHandler.appendMessage({
                        message: "FILE",
                        name: ea.displayName(),
                        type: "c",
                        time: g,
                        isPending: !1,
                        senderType: "v",
                        ownerId: ea.visitorId,
                        dontPlaySound: !0,
                        data: {
                            file: c
                        }
                    }), chatOrder = ++N.chatOrder, b.messages[chatOrder] = {
                        ut: "v",
                        t: "c",
                        m: "FILE",
                        co: g,
                        messageId: messageId,
                        uid: ea.visitorId,
                        md: {
                            file: c
                        }
                    }, N.chatVersion = h, v.triggerApiHandlers("onFileUpload", "https://tawkto.link/" + c.name))
                })
        };
        G.prototype.isChatOngoing =
            function() {
                return !this.hasChatEnded && this.visitorHasMessaged && 0 < d.agents.totalAgents()
            };
        G.prototype.isVisitorEngaged = function() {
            return !this.hasChatEnded && this.visitorHasMessaged
        };
        G.prototype.triggerEndChat = function() {
            var a = this;
            d.socketManager.sendToConnector("endVisitorChat", {}, function(b, c) {
                b || (N.chatId = c.nextChatId, a.endChat(c.chatEndVersion))
            })
        };
        G.prototype.getMessageObjectById = function(a) {
            var b = null,
                c;
            for (c in this.messages)
                if (this.messages[c].messageId === a) {
                    b = this.messages[c];
                    break
                }
            return b
        };
        M.prototype.updateAgentPresence = function(a, b, c, e, g) {
            if (!f.showAgentBar) return !0;
            if ("AGENT_JOIN_CONVERSATION" !== a && "AGENT_LEFT_CONVERSATION" !== a) return !1;
            switch (a) {
                case "AGENT_JOIN_CONVERSATION":
                    return this.addAgentToList(b, c, e, g);
                case "AGENT_LEFT_CONVERSATION":
                    return this.removeAgentFromList(b, e, g)
            }
        };
        M.prototype.addAgentToList = function(a, b, c, e) {
            var g = N.agents[c];
            if (g)
                if (g.seq.time < a.seq.time || g.seq.time === a.seq.time && g.seq.inc < a.seq.inc) {
                    g.seq = a.seq;
                    if (g.pid === a.pid) return !1;
                    this.changeAgentProfile(g.pid,
                        e);
                    g.pid = a.pid;
                    N.profiles[c] = a.pid
                } else return !1;
            else N.agents[c] = a, N.profiles[c] = a.pid;
            if (!a.pid) return !1;
            this.totalAgents(this.totalAgents() + 1);
            if ("undefined" !== typeof N.agentProfiles[a.pid]) return N.agentProfiles[a.pid].pi = a.pi, N.agentProfiles[a.pid].count++, !1;
            b = {
                pi: a.pi,
                pst: a.pst || "",
                pid: a.pid,
                n: b,
                count: 1
            };
            N.agentProfiles[a.pid] = b;
            e && d.viewHandler.appendAgent(b);
            return !0
        };
        M.prototype.changeAgentProfile = function(a, b) {
            var c = N.agentProfiles[a];
            this.decrementProfileCount(a, b) && b && (a = {
                message: d.languageParser.translate("chat",
                    "AGENT_LEFT_CONVERSATION", {
                        n: "<b>" + c.n + "</b>"
                    }),
                name: "",
                type: "n",
                time: new Date,
                isPending: !1,
                senderType: "a",
                ownerId: "",
                dontPlaySound: !0
            }, N.chatOrder++, d.chatHandler.messages[N.chatOrder] = a, d.viewHandler.appendMessage(a))
        };
        M.prototype.removeAgentFromList = function(a, b, c) {
            var e = N.agents[b];
            if (!e) return N.agents[b] = a, !1;
            b = e.pid;
            if (e.seq.time < a.seq.time || e.seq.time === a.seq.time && e.seq.inc < a.seq.inc) e.seq = a.seq, e.pid = null;
            else return !1;
            this.totalAgents(this.totalAgents() - 1);
            return this.decrementProfileCount(b,
                c)
        };
        M.prototype.decrementProfileCount = function(a, b) {
            var c = N.agentProfiles[a];
            if (c) return c.count--, 1 > c.count ? (delete N.agentProfiles[a], b && d.viewHandler.removeAgent(a), !0) : !1
        };
        M.prototype.clearAgents = function() {
            this.agentsCount = 0;
            this.totalAgents(0);
            N.agentProfiles = {};
            N.agents = {};
            N.profiles = {};
            d.viewHandler.clearAgentFooter();
            d.viewHandler.clearAgentHeader();
            d.viewHandler.closeAgentList()
        };
        W.prototype.initConnector = function() {
            this.socketConnector.init()
        };
        W.prototype.sendToConnector = function(a, b, c) {
            if (z.connected)
                if (void 0 !==
                    c || "function" === typeof b) this.safeCallback(a, b, c);
                else try {
                    this.socketConnector.emit(a, b, c)
                } catch (e) {
                    ma.handleError("Unable to emit to socket connector in sendToConnector for command : " + a + " with data :" + JSON.stringify(b), e.fileName, e.lineNumber, e.stack)
                } else this.addToStack(a, b, c)
        };
        W.prototype.addToStack = function(a, b, c) {
            "sendChatMessage" === a && delete this.events.notifyMessagePreview;
            "notifyMessagePreview" === a ? this.events[a] = {
                command: a,
                data: b,
                callback: c
            } : this.stack.push({
                command: a,
                data: b,
                callback: c
            })
        };
        W.prototype.clearStack = function() {
            var a = this;
            this.stack.forEach(function(c) {
                a.sendToConnector(c.command, c.data, c.callback)
            });
            for (var b in this.events) a.sendToConnector(a.events[b].command, a.events[b].data, a.events[b].callback);
            this.stack = [];
            this.events = {}
        };
        W.prototype.safeCallback = function(a, b, c) {
            "function" === typeof b && (c = b, b = null);
            var e = setTimeout(function() {
                c(!0);
                throw Error("Socket server did not execute the callback for " + a + " with data : " + JSON.stringify(b));
            }, 35E3);
            var g = function() {
                clearTimeout(e);
                g = function() {};
                c.apply(null, arguments)
            };
            try {
                null === b ? this.socketConnector.emit(a, g) : this.socketConnector.emit(a, b, g)
            } catch (h) {
                ma.handleError("Unable to emit to socket connector in safeCallback for command : " + a + " with data :" + JSON.stringify(b), h.fileName, h.lineNumber, h.stack)
            }
        };
        W.prototype.disconnectConnector = function() {
            this.socketConnector.disconnectSocket()
        };
        W.prototype.connectorListeningOn = function(a) {
            return 0 !== this.socketConnector.listeners(a).length
        };
        W.prototype.isForcedDisconnect = function() {
            return this.socketConnector.forceDisconnected
        };
        I.prototype.load = function() {
            var a = this;
            sa.pageId = $_Tawk_AccountKey;
            f.widgetId = $_Tawk_WidgetId;
            "undefined" !== typeof sa.pageId && "undefined" !== typeof f.widgetId && (this.init(), this.isDocumentReady || (d.eventHandler.listen(document, "DOMContentLoaded", function() {
                a.init()
            }, "domloaded"), d.eventHandler.listen(document, "readystatechange", function() {
                ("complete" === document.readyState || "interactive" === document.readyState && document.body) && a.init()
            }, "domstatechange"), d.eventHandler.listen(k, "load", function() {
                    a.init()
                },
                "windowload")), d.eventEmitter.on("removeWidget", function(b) {
                a.removeWidget()
            }), d.eventEmitter.on("submitConsent", function(b) {
                a.registerWithConsent()
            }))
        };
        I.prototype.init = function() {
            var a;
            if ("XMLHttpRequest" in k && "withCredentials" in new XMLHttpRequest && t.cookieEnabled && !this.isDocumentReady) {
                this.isDocumentReady = !0;
                var b = l.parseQueryString();
                if (!b.$_tawk_beacon && "operamini" !== D.mobileBrowserName) {
                    if (a = l.getReloadedScript()) a = l.parseQueryString(a.src), y.restarted = a.restarted, this.maximize = a.maximized;
                    mb();
                    v.isPopup && (y.transferKey = b.$_tawk_tk, y.sessionKey = b.$_tawk_sk, f.isPopup = !0);
                    v.embedded && (f.isEmbedded = !0, D.mobileBrowserName = null);
                    d.sessionHandler.setVisitorAttributes();
                    v.triggerApiHandlers("onBeforeLoad");
                    this.bootStrap()
                }
            }
        };
        I.prototype.bootStrap = function() {
            this.dataIsReady = this.viewIsReady = !1;
            setTimeout(function() {
                za.register()
            }, 0);
            this.getWidgetSettings()
        };
        I.prototype.getWidgetSettings = function() {
            var a = this;
            this.settingIsReady = !1;
            Ca.getWidgetSettings(function(b) {
                b || (a.settingIsReady = !0,
                    a.extractRegisterData())
            })
        };
        I.prototype.initializeView = function() {
            d.viewHandler || (D.mobileBrowserName ? (f.isPopup ? d.viewHandler = new Ha : this.initRenderer(D.mobileBrowserName), d.formHandler = new fa) : (d.formHandler = new fa, d.viewHandler = new ub), d.viewHandler && (this.viewIsReady = !0, d.activityManager.initActivityReset(), d.viewHandler.begin()))
        };
        I.prototype.initRenderer = function(a) {
            switch (a) {
                case "chrome":
                    d.viewHandler = new ba(a);
                    break;
                case "safari":
                    d.viewHandler = new Z(a);
                    break;
                case "opera":
                    d.viewHandler = new V(a);
                    break;
                case "android":
                    d.viewHandler = new Q(a);
                    break;
                case "android2.3":
                    d.viewHandler = new F(a);
                    break;
                case "android2":
                    d.viewHandler = new A(a);
                    break;
                case "firefox":
                    d.viewHandler = new K(a);
                    break;
                case "ie":
                    d.viewHandler = 10 > D.version ? new A(a) : new da(a);
                    break;
                case "blackberry":
                    d.viewHandler = new A(a);
                    break;
                case "nokia":
                    d.viewHandler = new A(a);
                    break;
                case "uc":
                    d.viewHandler = new Q(a)
            }
            d.viewHandler && d.viewHandler.init()
        };
        I.prototype.begin = function(a) {
            za.registerStarted = !1;
            za.clearTimers();
            za.registerTime = (new Date).getTime() -
                za.registerStart;
            za.registerStart = null;
            a && a.error ? "USER_ERROR" === a.error || "SERVER_DOWN" === a.error ? this.hideWidget() : za.retryRegister() : this.started ? this.reinited(a) : this.extractRegisterData(a)
        };
        I.prototype.extractRegisterData = function(a) {
            if (this.registerData || a)
                if (a && (this.registerData = a), this.settingIsReady) {
                    if (Ca.settingsVersion !== this.registerData.settingsVersion) return Ca.settingsVersion = this.registerData.settingsVersion, this.getWidgetSettings();
                    this.initializeView();
                    this.registerData.rcf && f.consentOption ?
                        (this.needConsent = !0, f.showConsentForm = !0) : (this.needConsent = !1, f.showConsentForm = !1);
                    "max" !== f.onClickAction || D.mobileBrowserName || (this.maximize = "max" === this.registerData.cw, y.chatWindowState(this.registerData.cw));
                    y.criticalVersion = this.registerData.cjsv || 0;
                    y.visitorSocketServer = this.registerData.vss;
                    y.sessionKey = this.registerData.sk;
                    y.transferKey = this.registerData.tk;
                    y.transferedSession = !!this.registerData.ts;
                    y.serverVersion = this.registerData.jsv || 0;
                    this.needConsent || (d.visitorHandler.updateVisitorUUID(this.registerData),
                        d.visitorHandler.updateVisitorInformation(this.registerData));
                    f.soundOn() && f.soundOn(this.registerData.sdo);
                    f.scheduleTimezone = this.registerData.wstz;
                    y.prechatFormSubmitted(!!this.registerData.pcfs);
                    y.departments = l.isArray(this.registerData.dptst) ? this.registerData.dptst.reverse() : [];
                    y.pageStatusVersion = this.registerData.asver || 0;
                    y.waitTime = this.registerData.ewt ? 1E3 * this.registerData.ewt : 6E4;
                    y.pageStatus(this.registerData.ast || "offline");
                    y.chatBubbleClosed(!!this.registerData.bblc);
                    N.chatVersion =
                        this.registerData.cver || 0;
                    N.chatDepartment = this.registerData.dpt || "any";
                    N.chatHistory = this.registerData.c || [];
                    N.chatId = this.registerData.chid;
                    y.lastMessageTimestamp = this.registerData.lmst;
                    this.registerData.tkn && ya.setLocalStorage("twk_token", this.registerData.tkn);
                    this.dataIsReady = !0;
                    this.setupDone()
                }
        };
        I.prototype.initBuildChat = function() {
            d.chatHandler.parseHistory();
            d.viewHandler.applyWhiteLabelSettings();
            this.showWidget();
            this.needConsent || (d.socketManager.initConnector(), delete z.init);
            z.ready = !0;
            v.triggerApiHandlers("onLoad")
        };
        I.prototype.reinited = function(a) {
            var b = y.sessionKey;
            this.extractRegisterData(a);
            b !== a.sk ? (d.chatHandler.clearChatMessages(), d.viewHandler.resetView(), d.agents.clearAgents()) : (y.visitorSocketServer = a.vss, y.sessionKey = a.sk, y.transferKey = a.tk, y.transferedSession = !!a.ts, y.serverVersion = a.jsv || 0, d.visitorHandler.updateVisitorUUID(a));
            d.scheduler.setup();
            d.viewHandler.updateViewByStatus(y.pageStatus());
            d.chatHandler.parseHistory(!0);
            d.socketManager.initConnector()
        };
        I.prototype.criticalRefresh =
            function(a, b, c) {
                var e = this,
                    g = (new Date).getTime(),
                    h = "https://embed.tawk.to/" + sa.pageId + "/" + $_Tawk_WidgetId + "?refresh=true&";
                if (f.isPopup) return k.location.reload(!!b);
                this.dataIsReady = this.viewIsReady = !1;
                this.removeWidget();
                b && (h += "restarted=true&");
                c && (h += "maximized=true&");
                h += "v=" + a || y.serverVersion || y.currentVersion;
                delete z.downloaded;
                l.insertScript(h, "TawkScript-" + g);
                var m = setInterval(function() {
                        k.$_Tawk.startTime !== e.startTime && (d = null, clearInterval(m), clearTimeout(e.versionReloadTimeout))
                    },
                    200)
            };
        I.prototype.removeWidget = function() {
            var a;
            d && d.viewHandler && d.viewHandler.iframeContainer && (a = document.getElementById(d.viewHandler.iframeContainer.elementId));
            za.clearTimers();
            d.eventHandler.clearEvents();
            d.activityManager.cleanUp();
            d.socketManager.disconnectConnector();
            d.eventEmitter.removeAllListeners();
            d.scheduler.cleanUp();
            clearTimeout(l.checkWhiteLabelRef);
            d.viewHandler.messagePreview && d.viewHandler.messagePreview.hide();
            "undefined" !== typeof l.messagePreviewCheckWhiteLabelRef && clearTimeout(l.messagePreviewCheckWhiteLabelRef);
            a && a.parentNode.removeChild(a)
        };
        I.prototype.setupDone = function(a) {
            this.started || (a && (d.languageParser.language = z.language, this.waitingForLanguage = !1), this.dataIsReady && this.settingIsReady && (this.initBuildChat(), this.started = !0))
        };
        I.prototype.showWidget = function() {
            d.scheduler.setup();
            !f.isPopup && f.hideWidgetOnLoad || d.viewHandler.show()
        };
        I.prototype.hideWidget = function() {
            d && d.viewHandler && d.viewHandler.hideWidget()
        };
        I.prototype.registerWithConsent = function() {
            this.maximize = !0;
            ya.storeSessionInformation(!1,
                "cf");
            za.register()
        };
        z.languageUpdater = function() {
            if (d && d.main && d.main.waitingForLanguage) {
                d.main.setupDone(!0);
                try {
                    d.eventEmitter.emit("localeChanged"), l.updateFonts()
                } catch (a) {
                    ma.handleError("Unable to emit locale changed", a.fileName, a.lineNumber, a.stack)
                }
            }
        };
        C.prototype.translate = function(a, b, c, e) {
            var g = [];
            var h = this.language || e;
            if (!h[a]) return this.notFoundCallback(Error("Missing context : {" + a + "}, {" + b + "}")), b;
            e = h[a][b];
            if (!e) return this.notFoundCallback(Error("Missing key : {" + a + "}, {" + b + "}")),
                b;
            b = e.pluralVars ? e.pluralVars.length : 0;
            var m = e.vars ? e.vars.length : 0;
            if (0 < b) {
                for (a = 0; a < b; a++) g.push(h.pluralFormFunction(c[e.pluralVars[a]]));
                g = e.message[g.join("_")];
                for (a = 0; a < b; a++) g = g.replace(new RegExp("#" + e.pluralVars[a], "g"), this.escapeStringReplacePlacement(c[e.pluralVars[a]]))
            } else g = e.message;
            if (0 < m)
                for (a = 0; a < m; a++) g = g.replace(new RegExp("#" + e.vars[a], "g"), this.escapeStringReplacePlacement(c[e.vars[a]]));
            return g
        };
        C.prototype.escapeStringReplacePlacement = function(a) {
            return "string" === typeof a ?
                a.replace(/\$/g, "$$$") : a
        };
        C.prototype.hasTranslation = function(a, b, c) {
            c = c || this.language;
            return !!(c && c[a] && c[a][b])
        };
        "undefined" !== typeof module && (module.exports = C);
        d.eventEmitter = new EventEmitter;
        d.eventEmitter.on("error", function(a) {
            ma.handleError("EventEmitter on error", a.fileName, a.lineNumber, a.stack)
        });
        d.loggingHandler = new Ma;
        d.eventHandler = new Fa;
        d.activityManager = new R;
        d.scheduler = new T;
        d.main = new I;
        d.languageParser = new C(z.language);
        d.socketManager = new W;
        d.sessionHandler = new P;
        d.chatHandler =
            new G;
        d.agents = new M;
        d.visitorHandler = new p;
        d.audioPlayer = new Xa;
        var za = new H;
        d.fileUploadHandler = new Wa;
        if (void 0 !== z.downloaded) d.eventHandler.clearEvents(), d.eventEmitter.removeAllListeners(), d = null;
        else {
            z.downloaded = !0;
            if ("undefined" !== typeof k.Prototype && "string" === typeof k.Prototype.Version && 1.7 > parseFloat(k.Prototype.Version.substr(0, 3), 10) && "undefined" !== typeof Array.prototype.toJSON) {
                var vb = JSON.stringify;
                JSON.stringify = function(a) {
                    var b = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                    a = vb(a);
                    Array.prototype.toJSON = b;
                    return a
                }
            }
            var wb = k.history.pushState,
                xb = k.history.replaceState;
            k.history.pushState = function(a, b, c) {
                wb.apply(history, arguments);
                var e = c && "string" === typeof c ? c.indexOf("#max-widget") : -1;
                d && d.visitorHandler && -1 === e && d.visitorHandler.sendNavigationEvent()
            };
            k.history.replaceState = function(a, b, c) {
                xb.apply(history, arguments);
                d && d.visitorHandler && d.visitorHandler.sendNavigationEvent()
            };
            d.main.load()
        }
    } catch (a) {
        if (ma) ma.handleError(a.message, "tawk.js", a.lineNumber || a.line, a.stack);
        else throw Error("tawk : " + a.message);
    }
}).call(this, window.$_Tawk);