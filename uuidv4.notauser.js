const uuidv4 = (() => {
    let uuidv4;
    (function () {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = {
                        exports: {}
                    }; e[i][0].call(p.exports, function (r) {
                        var n = e[i][1][r]; return o(n || r)
                    }, p, p.exports, r, e, n, t)
                } return n[i].exports
            } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o
        } return r
    })()({

        1: [function (require, module, exports) {

            /**
             * Convert array of 16 byte values to UUID string format of the form:
             * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
             */
            var byteToHex = [];
            for (var i = 0; i < 256; ++i) {
                byteToHex[i] = (i + 0x100).toString(16).substr(1);
            }

            function bytesToUuid(buf, offset) {

                var i = offset || 0;
                var bth = byteToHex;
                return bth[buf[i++]] + bth[buf[i++]] +
                    bth[buf[i++]] + bth[buf[i++]] + '-' +
                    bth[buf[i++]] + bth[buf[i++]] + '-' +
                    bth[buf[i++]] + bth[buf[i++]] + '-' +
                    bth[buf[i++]] + bth[buf[i++]] + '-' +
                    bth[buf[i++]] + bth[buf[i++]] +
                    bth[buf[i++]] + bth[buf[i++]] +
                    bth[buf[i++]] + bth[buf[i++]];
            }

            module.exports = bytesToUuid;

        }, {}],
        2: [function (require, module, exports) {

            (function (global) {

                (function () {

                    // Unique ID creation requires a high quality random # generator.  In the
                    // browser this is a little complicated due to unknown quality of Math.random()
                    // and inconsistent support for the `crypto` API.  We do the best we can via
                    // feature-detection
                    var rng;

                    var crypto = global.crypto || global.msCrypto; // for IE 11
                    if (crypto && crypto.getRandomValues) {
                        // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
                        var rnds8 = new Uint8Array(16);
                        rng = function whatwgRNG() {

                            crypto.getRandomValues(rnds8);
                            return rnds8;
                        };
                    }

                    if (!rng) {
                        // Math.random()-based (RNG)
                        //
                        // If all else fails, use Math.random().  It's fast, but is of unspecified
                        // quality.
                        var rnds = new Array(16);
                        rng = function () {

                            for (var i = 0, r; i < 16; i++) {
                                if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
                                rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
                            }

                            return rnds;
                        };
                    }

                    module.exports = rng;

                }).call(this)
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}], 3: [function (require, module, exports) {

            var rng = require('./lib/rng');
            var bytesToUuid = require('./lib/bytesToUuid');

            function v4(options, buf, offset) {

                var i = buf && offset || 0;

                if (typeof (options) == 'string') {
                    buf = options == 'binary' ? new Array(16) : null;
                    options = null;
                }
                options = options || {};

                var rnds = options.random || (options.rng || rng)();

                // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
                rnds[6] = (rnds[6] & 0x0f) | 0x40;
                rnds[8] = (rnds[8] & 0x3f) | 0x80;

                // Copy bytes to buffer, if provided
                if (buf) {
                    for (var ii = 0; ii < 16; ++ii) {
                        buf[i + ii] = rnds[ii];
                    }
                }

                return buf || bytesToUuid(rnds);
            }

            module.exports = v4;

        }, { "./lib/bytesToUuid": 1, "./lib/rng": 2 }], 4: [function (require, module, exports) {
            uuidv4 = require('uuid/v4');
        }, { "uuid/v4": 3 }]
    }, {}, [4]);
    return uuidv4;
})();

