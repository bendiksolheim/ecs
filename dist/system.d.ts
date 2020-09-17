import Component from "./component";
import Entity from "./entity";
import World from "./world";
export interface SystemInitializer {
    (filter: Array<new (...args: any) => Component>, tick: (entities: Entity[], world: World) => void): System;
}
declare const system: SystemInitializer;
export declare type System = {
    filter: Array<new (...args: any) => Component>;
    tick: (entity: Entity[], world: World) => void;
};
export default system;
