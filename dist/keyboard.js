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
    pressed(key) {
        return this.state.get(key) || false;
    }
}
