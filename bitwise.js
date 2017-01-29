//     Bitwise.js 1.0.4
//     Bitwise may be freely distributed under the MIT license.

(function() {
    /**
     * @param value
     * @returns {Bitwise}
     * @constructor
     */
    function Bitwise(value) {
        var self = this,
            idx = 0;

        if (!(self instanceof Bitwise)) return new Bitwise(value);
        if (Array.isArray(value)) {
            self.value = 0;
            value.forEach(function(value, idx) {
                self.value |= (value ? 1 : 0) << idx;
            });
        } else if (typeof value == "string") {
            self.value = 0;
            for (var i = value.length - 1; i >= 0; i--) {
                if (value[i] == "1" || value[i] == "0") {
                    self.value |= (value[i] == "1" ? 1 : 0) << idx;
                    idx++;
                }
            }
        } else {
            self.value = value || 0;
        }
    }

    // Current version.
    Bitwise.VERSION = '1.0.4';

    Bitwise.and = function() {
        var args = Array.prototype.slice.call(arguments),
            bitwise = args.shift();

        if (!(bitwise instanceof Bitwise)) bitwise = new Bitwise(bitwise);
        while (args.length > 0) {
            bitwise.and(args.shift());
        }
        return bitwise;
    };

    Bitwise.or = function() {
        var args = Array.prototype.slice.call(arguments),
            bitwise = args.shift();

        if (!(bitwise instanceof Bitwise)) bitwise = new Bitwise(bitwise);
        while (args.length > 0) {
            bitwise.or(args.shift());
        }
        return bitwise;
    };

    Bitwise.xor = function() {
        var args = Array.prototype.slice.call(arguments),
            bitwise = args.shift();

        if (!(bitwise instanceof Bitwise)) bitwise = new Bitwise(bitwise);
        while (args.length > 0) {
            bitwise.xor(args.shift());
        }
        return bitwise;
    };

    Bitwise.nand = function() {
        var args = Array.prototype.slice.call(arguments),
            bitwise = args.shift();

        if (!(bitwise instanceof Bitwise)) bitwise = new Bitwise(bitwise);
        while (args.length > 0) {
            bitwise.nand(args.shift());
        }
        return bitwise;
    };

    Bitwise.mask = function(from, to) {
        var args = Array.prototype.slice.call(arguments);

        to = args.pop();
        from = args.pop() || 0;
        return Bitwise().setRange(from, to);
    };


    Bitwise.prototype.valueOf = function valueOf() {
        return this.value;
    };

    Bitwise.prototype.copy = function() {
        return new Bitwise(this.value);
    };
    Bitwise.prototype.clone = Bitwise.prototype.copy;

    Bitwise.prototype.toString = function(length, separator) {
        var args = Array.prototype.slice.call(arguments),
            value = this.value.toString(2);

        if (args.length < 2) return value;
        return value.replace(new RegExp("\\B(?=(\\d{" + length + "})+(?!\\d))", "g"), separator);
    };

    Bitwise.prototype.toArray = function() {
        var value = this.value,
            array = [];

        if (value == 0) return [0];

        while (value > 0) {
            array.push(value & 1 > 0 ? 1 : 0);
            value = value >> 1;
        }
        return array;
    };

    Bitwise.prototype.cardinality = function() {
        return this.toString().match(/(1)/g).length;
    };

    Bitwise.prototype.length = function() {
        if (this.value >= 0 && Number.isSafeInteger(this.value)) return this.toString().length;
        return Number.MAX_SAFE_INTEGER.toString(2).length;
    };
    Bitwise.prototype.size = Bitwise.prototype.length;

    Bitwise.prototype.not = function() {
        this.value = ~this.value;
        return this;
    };

    Bitwise.prototype.and = function(value) {
        if (value instanceof Bitwise) value = value.valueOf();
        this.value &= value;
        return this;
    };

    Bitwise.prototype.or = function(value) {
        if (value instanceof Bitwise) value = value.valueOf();
        this.value |= value;
        return this;
    };

    Bitwise.prototype.xor = function(value) {
        this.value = this.copy().or(value).and(this.copy().and(value).not()).valueOf();
        return this;
    };

    Bitwise.prototype.nand = function(value) {
        if (!(value instanceof Bitwise)) value = new Bitwise(value);
        this.and(value).not();
        return this;
    };
    Bitwise.prototype.andNot = Bitwise.prototype.nand;

    Bitwise.prototype.set = function(idx, value) {
        if (value === false) return this.unset(idx);
        if (idx < 0) return;

        this.value |= 1 << idx;
        return this;
    };

    Bitwise.prototype.unset = function(idx) {
        if (idx < 0) return this;

        this.value &= ~(1 << idx);
        return this;
    };

    Bitwise.prototype.get = function(idx) {
        if (idx < 0) return false;

        return (this.value & (1 << idx)) > 0;
    };

    Bitwise.prototype.toggle = function(idx) {
        this.set(idx, !this.get(idx));
        return this;
    };

    Bitwise.prototype.swap = function(idx1, idx2) {
        if (idx1 < 0 || idx2 < 0) return this;

        var tmp = this.copy();
        this.set(idx2, tmp.get(idx1));
        this.set(idx1, tmp.get(idx2));

        return this;
    };

    Bitwise.prototype.equals = function(value) {
        if (value instanceof Bitwise) value = value.valueOf();
        return (this.value & value) == value;
    };

    Bitwise.prototype.setValue = function(value) {
        if (value instanceof Bitwise) value = value.valueOf();
        this.value = value;
        return this;
    };

    Bitwise.prototype.setRange = function(from, to) {
        if (from < 0 || to < 0) return this;

        this.value |= Bitwise.xor((1 << from) - 1, (1 << to << 1) - 1).valueOf();
        return this;
    };

    Bitwise.prototype.unsetRange = function(from, to) {
        if (from < 0 || to < 0) return this;

        this.value &= Bitwise.xor((1 << from) - 1, (1 << to << 1) - 1).not().valueOf();
        return this;
    };

    Bitwise.prototype.toggleRange = function(from, to) {
        if (from < 0 || to < 0) return this;

        var mask = Bitwise.mask(from, to);

        this.value = this.copy().not().and(mask).or(this.copy().and(mask.copy().not())).valueOf();
        return this;
    };

    Bitwise.prototype.mask = function(from, to) {
        this.and(Bitwise.mask.apply(Bitwise, arguments));
        return this;
    };

    Bitwise.prototype.clear = function(from, to) {
        this.and(Bitwise.mask.apply(Bitwise, arguments).not());
        return this;
    };

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Export the Bitwise object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `Bitwise` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Bitwise;
        }
        exports.Bitwise = Bitwise;
    } else {
        root.Bitwise = Bitwise;
    }

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, bitwise registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('bitwise', [], function() {
            return Bitwise;
        });
    }
}.call(this));
