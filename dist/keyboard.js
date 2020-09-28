/**
 * Enum used to define keyboard keys
 */
export var Key;
(function (Key) {
    Key["Up"] = "ArrowUp";
    Key["Down"] = "ArrowDown";
    Key["Left"] = "ArrowLeft";
    Key["Right"] = "ArrowRight";
    Key["Escape"] = "Escape";
    Key["Enter"] = "Enter";
    Key["Space"] = " ";
    Key["A"] = "a";
    Key["B"] = "b";
    Key["C"] = "c";
    Key["D"] = "d";
    Key["E"] = "e";
    Key["F"] = "f";
    Key["G"] = "g";
    Key["H"] = "h";
    Key["I"] = "i";
    Key["J"] = "j";
    Key["K"] = "k";
    Key["L"] = "l";
    Key["M"] = "m";
    Key["N"] = "n";
    Key["O"] = "o";
    Key["P"] = "p";
    Key["Q"] = "q";
    Key["R"] = "r";
    Key["S"] = "s";
    Key["T"] = "t";
    Key["U"] = "u";
    Key["V"] = "v";
    Key["W"] = "w";
    Key["X"] = "x";
    Key["Y"] = "y";
    Key["Z"] = "z";
    Key["\u00C6"] = "\u00E6";
    Key["\u00D8"] = "\u00F8";
    Key["\u00C5"] = "\u00E5";
    Key["COMMA"] = ",";
    Key["PERIOD"] = ".";
    Key["ONE"] = "1";
    Key["TWO"] = "2";
    Key["THREE"] = "3";
    Key["FOUR"] = "4";
    Key["FIVE"] = "5";
    Key["SIX"] = "6";
    Key["SEVEN"] = "7";
    Key["EIGHT"] = "8";
    Key["NINE"] = "9";
    Key["ZERO"] = "0";
    Key["PLUS"] = "+";
    Key["MINUS"] = "-";
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
