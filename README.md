# Node.js: bitwise-operation

`bitwise-operation` is a JavaScript library that provides useful bitwise operation helpers without converting integer to an array.

## Installation

**Node.js** `npm install --save bitwise-operation`

**Require.js** `require(["bitwise"], ...`

**Require in Node** `var Bitwise = require('bitwise-operation');`  
**Import in Node** `import { Bitwise } from "bitwise-operation";`

**Broser** `<script src="/node_modules/bitwise-operation/bitwise.js"></script>`

## Methods

- [Bitwise](#bitwise)
- [chain](#chain)
- [not](#not)
- [and](#and)
- [nand](#nand)
- [or](#or)
- [nor](#nor)
- [xor](#xor)
- [xnor](#xnor)
- [mask](#mask)
- [clear](#mask)
- [length](#length)
- [set](#set)
- [unset](#unset)
- [get](#get)
- [toggle](#toggle)
- [swap](#swap)
- [equals](#equals)
- [setValue](#setvalue)
- [setRange](#setrange)
- [unsetRange](#unsetrange)
- [toggleRange](#togglerange)
- [copy](#copy)
- [valueOf](#valueof)
- [toString](#tostring)
- [toArray](#toarray)
- [cardinality](#cardinality)

### Bitwise()

**new Bitwise(value)**

Create a bitwise object to chain operations.

Example:

```ts
import { Bitwise } from "bitwise-operation";

new Bitwise(0b1011);

var value = new Bitwise([1, 1, 0, 1]);
value.valueOf(); // 0b1011

new Bitwise("1011");
```

### chain()

**Bitwise.chain(value)**

Create a bitwise object to chain operations.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0100).and(0b1100).or(0b0010).valueOf();
// => 0b0110
```

### not()

**Bitwise.not(value)**  
**Bitwise.chain(value).not()**

Performs a logical **NOT** of this target bit set.

Truth table:  
| a | NOT a |  
| --|-------|  
| 0 | 1 |  
| 1 | 0 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.not(0b1010);
Bitwise.chain(0b1010).not().valueOf();

// => 0b0101
```

### and()

**Bitwise.and(...values)**  
**Bitwise.chain(value).and(value)**

Performs a logical **AND** of this target bit set with the argument bit set.

Truth table:  
| a | b | a AND b |  
|---|---|---------|  
| 0 | 0 | 0 |  
| 0 | 1 | 0 |  
| 1 | 0 | 0 |  
| 1 | 1 | 1 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.and(0b0111, Bitwise(0b0101), 0b1100);

Bitwise.chain(0b0111).and(Bitwise(0b0101)).and(0b1100).valueOf();

// => 0b0100
```

### nand()

**Bitwise.nand(...values)**  
**Bitwise.chain(value).nand(value)**

Clears all of the bits in this BitSet whose corresponding bit is set in the specified BitSet.

Truth table:  
| a | b | a NAND b |  
|---|---|----------|  
| 0 | 0 | 1 |  
| 0 | 1 | 1 |  
| 1 | 0 | 1 |  
| 1 | 1 | 0 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.nand(0b0010, 0b0110);

Bitwise.chain(0b0010).nand(0b0110).valueOf();

// => 0b1101
```

Alias: **andNot()**

### or()

**Bitwise.or(...values)**  
**Bitwise.chain(value).or(value)**

Performs a logical **OR** of this bit set with the bit set argument.

Truth table:  
| a | b | a OR b |  
|---|---|--------|  
| 0 | 0 | 0 |  
| 0 | 1 | 1 |  
| 1 | 0 | 1 |  
| 1 | 1 | 1 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.or(0b0010, 0b0110);

Bitwise.chain(0b0010).or(0b0110).valueOf();

// => 0b0110
```

### nor()

**Bitwise.nor(...values)**  
**Bitwise.chain(value).nor(value)**

Performs a logical **NOR** of this bit set with the bit set argument.

Truth table:  
| a | b | a NOR b |  
|---|---|---------|  
| 0 | 0 | 1 |  
| 0 | 1 | 0 |  
| 1 | 0 | 0 |  
| 1 | 1 | 0 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.nor(0b0010, 0b0110);

Bitwise.chain(0b0010).nor(0b0110).valueOf();

// => 0b1001
```

### xor()

**Bitwise.xor(...values)**  
**Bitwise.chain(value).xor(value)**

Performs a logical **XOR** of this bit set with the bit set argument.

Truth table:  
| a | b | a XOR b |  
|---|---|---------|  
| 0 | 0 | 0 |  
| 0 | 1 | 1 |  
| 1 | 0 | 1 |  
| 1 | 1 | 0 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.xor(0b0010, 0b0110);

Bitwise.chain(0b0010).xor(0b0110).valueOf();

// => 0b0100
```

### xnor()

**Bitwise.xnor(...values)**  
**Bitwise.chain(value).xnor(value)**

Performs a logical **XNOR** of this bit set with the bit set argument.

Truth table:  
| a | b | a XNOR b |  
|---|---|----------|  
| 0 | 0 | 1 |  
| 0 | 1 | 0 |  
| 1 | 0 | 0 |  
| 1 | 1 | 1 |

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.xor(0b0010, 0b0110);

Bitwise.chain(0b0010).xor(0b0110).valueOf();

// => 0b1011
```

Alias: **nxor()**

### mask()

**Bitwise.mask([fromIndex= 0,] toIndex)**  
**Bitwise.chain(value).mask([fromIndex= 0,] toIndex)**

Sets the bits not in the specified fromIndex (inclusive) to the specified toIndex (inclusive) to false.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.mask(1, 5); // => 0b00011110

Bitwise.chain(0b1011011)
  .mask(1, 5) // => 0b00011110
  .valueOf();
// Equal to: Bitwise.chain(0b1011011).and(Bitwise.mask(1, 5)).valueOf()

// => 0b00011010
```

### clear()

**Bitwise.chain(value).clear([fromIndex= 0,] toIndex)**

Sets the bits from the specified fromIndex (inclusive) to the specified toIndex (inclusive) to false.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b1011011).clear(1, 5).valueOf();

// => 0b1000001
```

### length()

**Bitwise.chain(value).length()**

Returns the "logical size" of this Bitwise: the index of the highest set bit in the Bitwise plus one.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b1011011).length();

// => 7
```

Alias: **size()**

### set()

**Bitwise.chain(value).set(idx [, value = true])**

Sets the bit at the specified index to the specified value (default `true`)

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0001).set(2).valueOf();

// => 0b0101
```

### unset()

**Bitwise.chain(value).set(idx)**

Sets the bit at the specified index to `false`

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).unset(0).valueOf();

// => 0b0100
```

### get()

**Bitwise.chain(value).get(idx)**

Returns the value of the bit with the specified index

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0001).get(0);

// => true
```

### toggle()

**Bitwise.toggle(value, ...idx)**  
**Bitwise.chain(value).toggle(idx)**

Sets the bit at the specified index to the complement of its current value.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.toggle(0b0001, 1);

Bitwise.chain(0b0001).toggle(1).valueOf();

// => 0b0011
```

### swap()

**Bitwise.toggle(value, ...[idx1, idx2])**  
**Bitwise.chain(value).swap(idx1, idx2)**

Swap bits to index `idx1` and `idx2`

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.swap(0b0101, [1, 2]);

Bitwise.chain(0b0101).swap(1, 2).valueOf();

// => 0b0011
```

### equals()

**Bitwise.chain(value).equals(value)**

Compares this object against the specified object

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).equals(0b0111);

// => false
```

### setValue()

**Bitwise.chain(value).setValue(value)**

Replaces the current value of the object with the new value

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).setValue(0b0111).valueOf();

// => 0b0111
```

### setRange()

**Bitwise.chain(value).setRange(fromIndex, toIndex )**

Sets the bits from the specified `fromIndex` (inclusive) to the specified `toIndex` (inclusive) to `true`.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).setRange(1, 2).valueOf();

// => 0b0111
```

### unsetRange()

**Bitwise.chain(value).unsetRange(fromIndex, toIndex )**

Sets the bits from the specified `fromIndex` (inclusive) to the specified `toIndex` (inclusive) to `false`.

Example:

```js
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).unsetRange(1, 2).valueOf();

// => 0b0001
```

### toggleRange()

**Bitwise.chain(value).toggleRange(fromIndex, toIndex )**

Sets each bit from the specified fromIndex (inclusive) to the specified toIndex (inclusive) to the complement of its current value.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).toggleRange(1, 2).valueOf();

// => 0b0011
```

### copy()

**Bitwise.chain(value).copy()**

Cloning this Bitwise produces a new Bitwise that is equal to it.

Example:

```ts
import { Bitwise } from "bitwise-operation";

var a = Bitwise(0b0001);
var b = a;
var c = a.copy();

a.toggle(1);

a.valueOf(); // => 0b0011
b.valueOf(); // => 0b0011
c.valueOf(); // => 0b0001
```

Alias: **clone()**

### valueOf()

**Bitwise.chain(value).valueOf()**

Return the current value of this Bitwise.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).valueOf();

// => 0b0101
```

### toString()

**Bitwise.chain(value).toString()**  
**Bitwise.chain(value).toString(length, separator)**

Returns a string representation of this Bitwise.

Example:

```ts
import { Bitwise } from "bitwise-operation";

Bitwise.chain(0b0101).toString();

// => "0101"

Bitwise.chain(571).toString(4, " ");

// => "10 0011 1011"
```

### toArray()

**Bitwise.chain(value).toArray()**

Returns a array representation of this Bitwise.

Example:

```ts
import { Bitwise } from "bitwise-operation";

var bitwise = Bitwise(571);

bitwise.toString(4, " ");
// => "10 0011 1011"

bitwise.toArray();
// => [ 1, 1, 0, 1, 1, 1, 0, 0, 0, 1 ]
```

### cardinality()

**Bitwise.chain(value).cardinality()**

Returns the number of bits set to true in this Bitwise.

Example:

```ts
import { Bitwise } from "bitwise-operation";

var bitwise = Bitwise(571);

bitwise.toString(4, " ");
// => "10 0011 1011"

bitwise.cardinality();
// => 6
```
