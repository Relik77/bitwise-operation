Node.js: bitwise-operation
=================


`bitwise-operation` is a JavaScript library that provides useful bitwise operation helpers without converting integer to an array.



Installation
------------
**Node.js** `npm install --save bitwise-operation`

**Require.js** `require(["bitwise"], ...`

**Require in Node** `var Bitwise = require('bitwise-operation');`

**Broser** `<script src="/node_modules/bitwise-operation/bitwise.js"></script>`


Methods
-------
- [Bitwise](#Bitwise)
- [and](#and)
- [or](#or)
- [xor](#xor)
- [nand](#nand)
- [not](#not)
- [mask](#mask)
- [clear](#mask)
- [length](#length)
- [set](#set)
- [unset](#unset)
- [get](#get)
- [toggle](#toggle)
- [swap](#swap)
- [equals](#equals)
- [setValue](#setValue)
- [setRange](#setRange)
- [unsetRange](#unsetRange)
- [toggleRange](#toggleRange)
- [copy](#copy)
- [valueOf](#valueOf)
- [toString](#toString)


### Bitwise()

**new Bitwise(value)**

**Bitwise(value)**

Create a bitwise object to chain operations.


Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0100)
   .and(0b1100)
    .or(0b0010)
    .valueOf();

=> 0b0110
```


### and()

**Bitwise.and(...values)**

**Bitwise(value).and(value)**

Performs a logical **AND** of this target bit set with the argument bit set.

Truth table:
a | b | a AND b
--|--|--
0 | 0 | 0
0 | 1 | 0
1 | 0 | 0
1 | 1 | 1

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise.and(0b0111, Bitwise(0b0101), 0b1100)

Bitwise(0b0111)
   .and(Bitwise(0b0101))
   .and(0b1100)
   .valueOf();

=> 0b0100
```

### or()

**Bitwise.or(...values)**

**Bitwise(value).or(value)**

Performs a logical **OR** of this bit set with the bit set argument.

Truth table:
a | b | a OR b
--|--|--
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 1

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise.or(0b0010, 0b0110)
       .value();

Bitwise(0b0010)
    .or(0b0110)
    .valueOf();

=> 0b0110
```

### xor()

**Bitwise.xor(...values)**

**Bitwise(value).xor(value)**

Performs a logical **XOR** of this bit set with the bit set argument.

Truth table:
a | b | a XOR b
--|--|--
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise.xor(0b0010, 0b0110)
       .value();

Bitwise(0b0010)
   .xor(0b0110)
   .valueOf();

=> 0b0100
```

### nand()

**Bitwise.nand(...values)**

**Bitwise(value).nand(value)**

Clears all of the bits in this BitSet whose corresponding bit is set in the specified BitSet.

Truth table:
a | b | a NAND b
--|--|--
0 | 0 | 1
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise.nand(0b0010, 0b0110)
       .value();

Bitwise(0b0010)
  .nand(0b0110)
  .valueOf();

=> 0b1101
```
Alias: **andNot()**

### not()

**Bitwise(value).not()**

Performs a logical **NOT** of this target bit set.

Truth table:
a | NOT a
--|--
0 | 1
1 | 0

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b1010)
  .not()
  .valueOf();

=> 0b0101
```

### mask()

**Bitwise.mask([fromIndex= 0,] toIndex)**

**Bitwise(value).mask([fromIndex= 0,] toIndex)**

Sets the bits not in the specified fromIndex (inclusive) to the specified toIndex (inclusive) to false.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b1011011)
  .mask(1, 5) // => 0b00011110
  .valueOf();

=> 0b00011010
```

### clear()

**Bitwise(value).clear([fromIndex= 0,] toIndex)**

Sets the bits from the specified fromIndex (inclusive) to the specified toIndex (inclusive) to false.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b1011011)
  .clear(1, 5)
  .valueOf();

=> 0b1000001
```

### length()

**Bitwise(value).length()**

Returns the "logical size" of this Bitwise: the index of the highest set bit in the Bitwise plus one.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b1011011)
  .length();

=> 7
```
Alias: **size()**

### set()

**Bitwise(value).set(idx [, value = true])**

Sets the bit at the specified index to the specified value (default `true`)

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0001)
  .set(2)
  .valueOf();

=> 0b0101
```

### unset()

**Bitwise(value).set(idx)**

Sets the bit at the specified index to `false`

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
  .unset(0)
  .valueOf();

=> 0b0100
```

### get()

**Bitwise(value).get(idx)**

Returns the value of the bit with the specified index

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0001)
  .get(0)
  .valueOf();

=> true
```

### toggle()

**Bitwise(value).toggle(idx)**

Sets the bit at the specified index to the complement of its current value.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0001)
  .toggle(1)
  .valueOf();

=> 0b0011
```

### swap()

**Bitwise(value).swap(idx1, idx2)**

Swap bits to index `idx1` and `idx2`

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
  .swap(1, 2)
  .valueOf();

=> 0b0011
```

### equals()

**Bitwise(value).equals(value)**

Compares this object against the specified object

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .equals(0b0111);

=> false
```

### setValue()

**Bitwise(value).setValue(value)**

Replaces the current value of the object with the new value

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .setValue(0b0111);

=> 0b0111
```

### setRange()

**Bitwise(value).setRange(fromIndex, toIndex )**

Sets the bits from the specified `fromIndex` (inclusive) to the specified `toIndex` (inclusive) to `true`.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .setRange(1, 2);

=> 0b0111
```

### unsetRange()

**Bitwise(value).unsetRange(fromIndex, toIndex )**

Sets the bits from the specified `fromIndex` (inclusive) to the specified `toIndex` (inclusive) to `false`.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .unsetRange(1, 2);

=> 0b0001
```

### toggleRange()

**Bitwise(value).toggleRange(fromIndex, toIndex )**

Sets each bit from the specified fromIndex (inclusive) to the specified toIndex (inclusive) to the complement of its current value.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .toggleRange(1, 2);

=> 0b0011
```

### copy()

**Bitwise(value).copy()**

Cloning this Bitwise produces a new Bitwise that is equal to it.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .toggleRange(1, 2);

=> 0b0011
```
Alias: **clone()**

### valueOf()

**Bitwise(value).valueOf()**

Return the current value of this Bitwise.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .valueOf();

=> 0b0101
```

### toString()

**Bitwise(value).toString()**

Returns a string representation of this bit set.

Example:

```js
var Bitwise = require('bitwise-operation')

Bitwise(0b0101)
   .toString();

=> "0101"
```
