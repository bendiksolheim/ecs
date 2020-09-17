export default class Entity {
    constructor() {
        this.id = randomId();
        this.components = new Map();
    }
    add(component) {
        const i = component.constructor;
        this.components.set(i, component);
    }
    remove(component) {
        this.components.delete(component);
    }
    has(component) {
        return this.components.has(component);
    }
    get(component) {
        return this.components.get(component);
    }
    print() {
        const components = [...this.components];
        console.log(JSON.stringify({ id: this.id, components }, null, 4));
    }
}
let counter = 0;
function randomId() {
    let _counter = counter;
    counter += 1;
    return (Date.now().toString(16) +
        ((Math.random() * 100000000) | 0).toString(16) +
        _counter);
}
