import Component from "./component";
import Entity from "./entity";
import World from "./world";
export interface LogicSystemInitializer {
    (filter: Array<new (...args: any) => Component>, tick: (entities: Entity[], world: World) => void): LogicSystem;
}
declare const logicSystem: LogicSystemInitializer;
export declare type LogicSystem = {
    filter: Array<new (...args: any) => Component>;
    tick: (entity: Entity[], world: World) => void;
};
export default logicSystem;