export declare enum Key {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight"
}
export default class Keyboard {
    state: Map<string, boolean>;
    constructor();
    press(key: string): void;
    release(key: string): void;
    pressed(key: Key): boolean;
}
