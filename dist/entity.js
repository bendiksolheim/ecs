/**
 * Bundles together one or more components to create a game entity
 * Usage:
 *
 * ```
 * const entity = new Entity();
 * entity.add(new Health(20));
 * ```
 */
export default class Entity {
    /**
     */
    constructor() {
        this.id = randomId();
        this.components = new Map();
    }
    /**
     * Add a component to this entity.
     */
    add(component) {
        const i = component.constructor;
        this.components.set(i, component);
        if (this.world) {
            this.world.removeEntity(this);
            this.world.addEntity(this);
        }
    }
    /**
     * Remove a component from this entity.
     */
    remove(component) {
        this.components.delete(component);
        if (this.world) {
            this.world.removeEntity(this);
            this.world.addEntity(this);
        }
    }
    /**
     * @param component The constructor of a component
     * @returns true | false depending on if this entity has the specified component
     */
    has(component) {
        return this.components.has(component);
    }
    /**
     * Executes the provided function if this entity has the specified component
     *
     * @param component The constructor of a component
     * @param fn A function to be executed if the entity has the component
     */
    ifHas(component, fn) {
        if (this.has(component)) {
            fn(this.get(component));
        }
    }
    /**
     * Returns the component instance for the specified component. Useful if you
     * need to modify values on the component
     *
     * @param component The constructor of a component
     * @returns Returns the component instance
     */
    get(component) {
        return this.components.get(component);
    }
    register(world) {
        this.world = world;
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
