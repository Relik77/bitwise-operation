(function() {
    var Bitwise = typeof require == 'function' ? require('..') : window.Bitwise;

    QUnit.module('Utils');

    QUnit.test('Bitwise', function(assert) {
        assert.strictEqual(Bitwise(24).valueOf(), 24);
        assert.strictEqual(Bitwise('10010110').valueOf(), 0b10010110);
        assert.strictEqual(Bitwise('1a01t011 011...').valueOf(), 0b101011011);
        assert.strictEqual(Bitwise([0, 1, 0, 1, 1, 0, 1, 0, 1, 1]).valueOf(), 0b1101011010);
    });

    QUnit.test('valueOf', function(assert) {
        assert.strictEqual(Bitwise(27).valueOf(), 27);
    });

    QUnit.test('toString', function(assert) {
        assert.strictEqual(Bitwise(0b10010110).toString(), '10010110');
        assert.strictEqual(Bitwise(0b1010010110).toString(4, ' '), '10 1001 0110');
        assert.strictEqual(Bitwise(0b1010010110).toString(3, '.'), '1.010.010.110');
        assert.ok(Bitwise(Bitwise(0b1010010110).toString(3, ' ')).equals(0b1010010110));
        assert.notOk(Bitwise(Bitwise(0b1010010110).toString(3, 1)).equals(0b1010010110));
    });

    QUnit.test('toArray', function(assert) {
        assert.deepEqual(Bitwise(0b10010110).toArray(), [0, 1, 1, 0, 1, 0, 0, 1]);
    });

    QUnit.test('cardinality', function(assert) {
        assert.strictEqual(Bitwise(0b10010110).cardinality(), 4);
    });

    QUnit.test('mask', function(assert) {
        assert.strictEqual(Bitwise.mask(1, 7), 0b11111110);
        assert.strictEqual(Bitwise.mask(3), 0b1111);
    });

    QUnit.test('equals', function(assert) {
        assert.ok(Bitwise(0b100101).equals(0b100101));
        assert.notOk(Bitwise(0b100101).equals(0b101));
        assert.notOk(Bitwise(0b101).equals(0b100101));
        assert.ok(Bitwise(19).equals(Bitwise(19)));
        assert.notOk(Bitwise(7).equals(21));
    });

    QUnit.test('setValue', function(assert) {
        assert.ok(Bitwise(7).setValue(21).equals(21));
    });

    QUnit.test('copy', function(assert) {
        var a = Bitwise(7);
        var b = a;
        var c = a.copy();

        assert.strictEqual(a, b);
        assert.notStrictEqual(a, c);
        assert.ok(a.valueOf() == b.valueOf());
        assert.ok(a.equals(b));

        a.toggle(5);
        assert.ok(a.equals(b));
        assert.notOk(a.equals(c));

        c.setValue(a);
        assert.ok(a.equals(c));
        assert.notStrictEqual(a, c);
    });

    QUnit.module('Operators');

    QUnit.test('not', function(assert) {
        assert.strictEqual(Bitwise.not(1), -2);
        assert.strictEqual(Bitwise.not(5), -6);
        assert.strictEqual(Bitwise(12).not().valueOf(), -13);
    });

    QUnit.test('and', function(assert) {
        assert.strictEqual(Bitwise.and(0b0010, 0b0110), 0b0010);
        assert.strictEqual(Bitwise(0b1110).and(0b0101).valueOf(), 0b0100);
    });

    QUnit.test('nand', function(assert) {
        assert.strictEqual(Bitwise.nand(0b0010, 0b0110), -3);
        assert.strictEqual(Bitwise.andNot(0b0010, 0b0110), -3);
        assert.strictEqual(Bitwise(0b1110).nand(0b0101).valueOf(), -5);
        assert.strictEqual(Bitwise(0b1110).andNot(0b0101).valueOf(), -5);
    });

    QUnit.test('or', function(assert) {
        assert.strictEqual(Bitwise.or(0b0010, 0b0110), 0b0110);
        assert.strictEqual(Bitwise(0b1110).or(0b0101).valueOf(), 0b1111);
    });

    QUnit.test('nor', function(assert) {
        assert.strictEqual(Bitwise.nor(0b0010, 0b0110), -7);
        assert.strictEqual(Bitwise(0b1110).nor(0b0101).valueOf(), -16);
    });

    QUnit.test('xor', function(assert) {
        assert.strictEqual(Bitwise.xor(0b0010, 0b0110), 0b0100);
        assert.strictEqual(Bitwise(0b1110).xor(0b0101).valueOf(), 0b1011);
    });

    QUnit.test('xnor', function(assert) {
        assert.strictEqual(Bitwise.xnor(0b0010, 0b0110), -5);
        assert.strictEqual(Bitwise(0b1110).xnor(0b0101).valueOf(), -12);
    });


    QUnit.module('Functions');

    QUnit.test('mask', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).mask(2, 5).valueOf(), 0b10100);
    });

    QUnit.test('clear', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).clear(2, 5).valueOf(), 0b011000010);
    });

    QUnit.test('length', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).length(), 8);
    });

    QUnit.test('unset', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).unset(0).valueOf(), 0b011010110);
        assert.strictEqual(Bitwise(0b011010110).unset(1).valueOf(), 0b011010100);
    });

    QUnit.test('set', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).set(0).valueOf(), 0b011010111);
        assert.strictEqual(Bitwise(0b011010110).set(1).valueOf(), 0b011010110);
        assert.strictEqual(Bitwise(0b011010110).set(1, false).valueOf(), 0b011010100);
    });

    QUnit.test('get', function(assert) {
        assert.ok(Bitwise(0b011010110).get(1));
        assert.notOk(Bitwise(0b011010110).get(0));
    });

    QUnit.test('toggle', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).toggle(1).valueOf(), 0b011010100);
        assert.strictEqual(Bitwise(0b011010110).toggle(0).valueOf(), 0b011010111);
        assert.strictEqual(Bitwise.toggle(0b011010110, 1), 0b011010100);
        assert.strictEqual(Bitwise.toggle(0b011010110, 1, 4), 0b011000100);
    });

    QUnit.test('swap', function(assert) {
        assert.strictEqual(Bitwise(0b011010110).swap(0, 1).valueOf(), 0b011010101);
        assert.strictEqual(Bitwise.swap(0b011010110, [1, 0]), 0b011010101);
        assert.strictEqual(Bitwise.swap(0b011010110, [0, 1], [2, 8]), 0b111010001);
        assert.strictEqual(Bitwise(0b011010110).swap(1, 4).valueOf(), 0b011010110);
    });

    QUnit.test('setRange', function(assert) {
        assert.strictEqual(Bitwise(0b101101001).setRange(1, 4).valueOf(), 0b101111111);
    });

    QUnit.test('unsetRange', function(assert) {
        assert.strictEqual(Bitwise(0b101101001).unsetRange(2, 7).valueOf(), 0b100000001);
    });

    QUnit.test('toggleRange', function(assert) {
        assert.strictEqual(Bitwise(0b101101001).toggleRange(1, 3).valueOf(), 0b101100111);
    });
}());