import Component from "./component";
import Entity from "./entity";
import World from "./world";
export interface RenderSystemInitializer {
    (filter: Array<new (...args: any) => Component>, tick: (entities: Entity[], lag: number, world: World) => void): RenderSystem;
}
declare const renderSystem: RenderSystemInitializer;
export declare type RenderSystem = {
    filter: Array<new (...args: any) => Component>;
    tick: (entity: Entity[], lag: number, world: World) => void;
};
export default renderSystem;
