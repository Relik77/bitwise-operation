type BitwiseValue = number | string | Array<0 | 1> | Bitwise;

export class Bitwise {
  private value: number = 0;

  public static VERSION = "2.0.1";

  constructor(value: BitwiseValue = 0) {
    if (value instanceof Bitwise) return value;

    if (Array.isArray(value)) {
      value.forEach((bit, idx) => {
        this.value |= (bit ? 1 : 0) << idx;
      });
    } else if (typeof value == "string") {
      let idx = 0;
      for (let i = value.length - 1; i >= 0; i--) {
        if (value[i] === "1" || value[i] === "0") {
          this.value |= (value[i] === "1" ? 1 : 0) << idx;
          idx++;
        }
      }
    } else {
      this.value = value;
    }
  }

  public static chain(value: BitwiseValue = 0) {
    return new Bitwise(value);
  }

  public static not(value: number) {
    return ~value;
  }

  public static and(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.and(value);
      }
    }
    return bitwise.valueOf();
  }

  public static nand(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.nand(value);
      }
    }
    return bitwise.valueOf();
  }

  public static andNot(value: BitwiseValue, ...values: BitwiseValue[]) {
    return this.nand(value, ...values);
  }

  public static or(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.or(value);
      }
    }
    return bitwise.valueOf();
  }

  public static nor(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.nor(value);
      }
    }
    return bitwise.valueOf();
  }

  public static xor(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.xor(value);
      }
    }
    return bitwise.valueOf();
  }

  public static xnor(value: BitwiseValue, ...values: BitwiseValue[]) {
    const bitwise = new Bitwise(value);
    while (values.length > 0) {
      let value = values.shift();
      if (value !== undefined) {
        bitwise.xnor(value);
      }
    }
    return bitwise.valueOf();
  }

  public static nxor(value: BitwiseValue, ...values: BitwiseValue[]) {
    return this.xnor(value, ...values);
  }

  public static toggle(value: BitwiseValue, ...idx: number[]) {
    const bitwise = new Bitwise(value);
    while (idx.length > 0) {
      let index = idx.shift();
      if (index !== undefined) {
        bitwise.toggle(index);
      }
    }
    return bitwise.valueOf();
  }

  public static swap(value: BitwiseValue, ...idx: [number, number][]) {
    const bitwise = new Bitwise(value);
    while (idx.length > 0) {
      let indexes = idx.shift();
      if (indexes !== undefined) {
        bitwise.swap(...indexes);
      }
    }

    return bitwise.valueOf();
  }

  public static mask(to: number): number;
  public static mask(from: number, to: number): number;
  public static mask(from: number, to?: number): number {
    if (to === undefined) {
      to = from;
      from = 0;
    }
    return new Bitwise(0).setRange(from, to).valueOf();
  }

  not() {
    this.value = ~this.value;
    return this;
  }

  and(value: BitwiseValue) {
    const bitwise = new Bitwise(value);
    this.value &= bitwise.valueOf();
    return this;
  }

  nand(value: BitwiseValue) {
    this.and(value).not();
    return this;
  }

  andNot(value: BitwiseValue) {
    return this.nand(value);
  }

  or(value: BitwiseValue) {
    const bitwise = new Bitwise(value);
    this.value |= bitwise.valueOf();
    return this;
  }

  nor(value: BitwiseValue) {
    this.or(value).not();
    return this;
  }

  xor(value: BitwiseValue) {
    this.value = this.copy()
      .or(value)
      .and(this.copy().and(value).not())
      .valueOf();
    return this;
  }

  xnor(value: BitwiseValue) {
    this.xor(value).not();
    return this;
  }

  nxor(value: BitwiseValue) {
    return this.xnor(value);
  }

  set(idx: number, value: boolean = true) {
    if (value === false) return this.unset(idx);
    if (idx < 0) return this;

    this.value |= 1 << idx;
    return this;
  }

  unset(idx: number) {
    if (idx < 0) return this;

    this.value &= ~(1 << idx);
    return this;
  }

  get(idx: number) {
    if (idx < 0) return false;
    return (this.value & (1 << idx)) > 0;
  }

  toggle(idx: number) {
    this.set(idx, !this.get(idx));
    return this;
  }

  swap(idx1: number, idx2: number) {
    if (idx1 < 0 || idx2 < 0) return this;

    let tmp = this.copy();
    this.set(idx2, tmp.get(idx1));
    this.set(idx1, tmp.get(idx2));

    return this;
  }

  setRange(from: number, to: number) {
    if (from < 0 || to < 0) return this;

    this.value |= Bitwise.xor((1 << from) - 1, ((1 << to) << 1) - 1);
    return this;
  }

  unsetRange(from: number, to: number) {
    if (from < 0 || to < 0) return this;

    this.value &= ~Bitwise.xor((1 << from) - 1, ((1 << to) << 1) - 1);
    return this;
  }

  toggleRange(from: number, to: number) {
    if (from < 0 || to < 0) return this;

    const mask = Bitwise.mask(from, to);

    this.value = this.copy()
      .not()
      .and(mask)
      .or(this.copy().and(Bitwise.not(mask)))
      .valueOf();
    return this;
  }

  mask(from: number, to: number) {
    this.and(Bitwise.mask(from, to));
    return this;
  }

  clear(from: number, to: number) {
    this.and(Bitwise.not(Bitwise.mask(from, to)));
    return this;
  }

  equals(value: BitwiseValue) {
    const bitwise = new Bitwise(value);
    return this.value === bitwise.value;
  }

  setValue(value: BitwiseValue) {
    const bitwise = new Bitwise(value);
    this.value = bitwise.value;
    return this;
  }

  copy() {
    return new Bitwise(this.value);
  }

  clone() {
    return this.copy();
  }

  valueOf() {
    return this.value;
  }

  toString(length?: number, separator: string = " "): string {
    let value = this.value.toString(2);

    if (length === undefined) return value;
    return value.replace(
      new RegExp("\\B(?=(\\d{" + length + "})+(?!\\d))", "g"),
      separator
    );
  }

  toArray(): Array<0 | 1> {
    let value = this.value;
    let array: Array<0 | 1> = [];

    if (value === 0) return [0];

    while (value > 0) {
      array.push((value & 1) > 0 ? 1 : 0);
      value = value >> 1;
    }
    return array;
  }

  cardinality(): number {
    const match = this.toString().match(/(1)/g);
    if (!match) return 0;
    return match.length;
  }

  length(): number {
    if (this.value >= 0 && Number.isSafeInteger(this.value))
      return this.toString().length;
    return Number.MAX_SAFE_INTEGER.toString(2).length;
  }

  size() {
    return this.length();
  }
}
