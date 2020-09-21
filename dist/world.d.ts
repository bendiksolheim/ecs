import Component from "./component";
import Entity from "./entity";
import { LogicSystem } from "./logic-system";
import { RenderSystem } from "./render-system";
import Keyboard from "./keyboard";
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
    constructor(canvas: HTMLCanvasElement, entities: Record<string, Entity>, logicSystems: LogicSystem[], renderSystems: RenderSystem[]);
    add(entity: Entity): void;
    removeEntity(id: string): void;
    tick(): void;
    createEntityMapping(entities: Record<string, Entity>): void;
    createMouseListener(): void;
    createKeyboardListener(): void;
}
export {};
