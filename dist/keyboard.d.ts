/**
 * Enum used to define keyboard keys
 */
export declare enum Key {
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
    Æ = "\u00E6",
    Ø = "\u00F8",
    Å = "\u00E5",
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
    MINUS = "-"
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
