/**
 * Enum used to define keyboard keys
 */
export declare enum Key {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight"
}
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
    constructor();
    press(key: string): void;
    release(key: string): void;
    /**
     * @param key A key to query for state
     * @returns true | false depending on if key is pressed
     */
    pressed(key: Key): boolean;
}
