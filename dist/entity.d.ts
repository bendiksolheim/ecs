import Component from "./component";
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
    id: string;
    components: Map<new () => Component, Component>;
    /**
     */
    constructor();
    /**
     * Add a component to this entity.
     */
    add(component: Component): void;
    /**
     * Remove a component from this entity.
     */
    remove(component: new (...args: any) => Component): void;
    /**
     * @param component The constructor of a component
     * @returns true | false depending on if this entity has the specified component
     */
    has(component: new (...args: any) => Component): boolean;
    /**
     * Executes the provided function if this entity has the specified component
     *
     * @param component The constructor of a component
     * @param fn A function to be executed if the entity has the component
     */
    ifHas<C extends Component>(component: new (...args: any) => C, fn: (c: C) => void): void;
    /**
     * Returns the component instance for the specified component. Useful if you
     * need to modify values on the component
     *
     * @param component The constructor of a component
     * @returns Returns the component instance
     */
    get<C extends Component>(component: new (...args: any) => C): C;
    print(): void;
}
