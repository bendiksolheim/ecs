import Component from "./component";
import Entity from "./entity";
import { LogicSystem } from "./logic-system";
import { RenderSystem } from "./render-system";
import Keyboard from "./keyboard";
declare const defaultRenderConfig: {
    fps: number;
};
declare type RenderConfig = typeof defaultRenderConfig;
declare type RenderState = {
    fps: number;
    previous: number;
    frameDuration: number;
    lag: number;
};
declare type Filter = Array<new (...args: any) => Component>;
export default class World {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    mouse: {
        x: number;
        y: number;
    };
    logicSystems: LogicSystem[];
    renderSystems: RenderSystem[];
    entities: Map<Filter, Map<string, Entity>>;
    keyboard: Keyboard;
    renderState: RenderState;
    constructor(canvas: HTMLCanvasElement, entities: Record<string, Entity>, logicSystems: LogicSystem[], renderSystems: RenderSystem[], renderConfig?: RenderConfig);
    add(entity: Entity): void;
    removeEntity(id: string): void;
    start(): void;
    tick(timestamp?: number): void;
    createEntityMapping(entities: Record<string, Entity>): void;
    createMouseListener(): void;
    createKeyboardListener(): void;
}
export {};
