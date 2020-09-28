/**
 * Enum used to define keyboard keys
 */
export enum Key {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
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
