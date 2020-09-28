/**
 * Enum used to define keyboard keys
 */
export enum Key {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Escape = "Escape",
  Enter = "Enter",
  Space = " ",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z",
  Æ = "æ",
  Ø = "ø",
  Å = "å",
  COMMA = ",",
  PERIOD = ".",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  ZERO = "0",
  PLUS = "+",
  MINUS = "-",
}

type Entries<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T];
function reverseEnum<E extends Record<keyof E, string | number>>(
  e: E
): { [K in E[keyof E]]: Extract<Entries<E>, [any, K]>[0] };
function reverseEnum(
  e: Record<string | number, string | number>
): Record<string | number, string | number> {
  const ret: Record<string | number, string | number> = {};
  Object.keys(e).forEach((k) => {
    const v = e[k];
    ret[v] = k;
  });
  return ret;
}

const reverseMapping: Record<string, string> = reverseEnum(Key);

/**
 * Keeps track of keyboard state, and can be asked for pressed keys
 * Intended to be accessed through a World instance:
 *
 * ```
 * if (world.keyboard.pressed(Key.Up)) {
 *   console.log("Arrow up pressed")
 * }
 *```
 */
export default class Keyboard {
  state: Map<string, boolean>;

  constructor() {
    this.state = new Map();
  }

  press(key: string) {
    this.state.set(key, true);
  }

  release(key: string) {
    this.state.set(key, false);
  }

  /**
   * @param key A key to query for state
   * @returns true | false depending on if key is pressed
   */
  pressed(key: Key): boolean {
    return this.state.get(key) || false;
  }
}
