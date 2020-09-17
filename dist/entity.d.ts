import Component from "./component";
export default class Entity {
    id: string;
    components: Map<new () => Component, Component>;
    constructor();
    add(component: Component): void;
    remove(component: new (...args: any) => Component): void;
    has(component: new (...args: any) => Component): boolean;
    get<C extends Component>(component: new (...args: any) => C): C;
    print(): void;
}
