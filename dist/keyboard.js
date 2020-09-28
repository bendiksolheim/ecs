/**
 * Enum used to define keyboard keys
 */
export var Key;
(function (Key) {
    Key["Up"] = "ArrowUp";
    Key["Down"] = "ArrowDown";
    Key["Left"] = "ArrowLeft";
    Key["Right"] = "ArrowRight";
})(Key || (Key = {}));
function reverseEnum(e) {
    const ret = {};
    Object.keys(e).forEach((k) => {
        const v = e[k];
        ret[v] = k;
    });
    return ret;
}
const reverseMapping = reverseEnum(Key);
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
    constructor() {
        this.state = new Map();
    }
    press(key) {
        this.state.set(key, true);
    }
    release(key) {
        this.state.set(key, false);
    }
    /**
     * @param key A key to query for state
     * @returns true | false depending on if key is pressed
     */
    pressed(key) {
        return this.state.get(key) || false;
    }
}
