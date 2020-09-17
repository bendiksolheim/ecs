import Component from "./component";
import Entity from "./entity";
import { System } from "./system";
import Keyboard from "./keyboard";
declare type Filter = Array<new (...args: any) => Component>;
export default class World {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    mouse: {
        x: number;
        y: number;
    };
    systems: System[];
    entities: Map<Filter, Map<string, Entity>>;
    keyboard: Keyboard;
    constructor(canvas: HTMLCanvasElement, entities: Record<string, Entity>, systems: System[]);
    add(entity: Entity): void;
    removeEntity(id: string): void;
    tick(): void;
    createEntityMapping(entities: Record<string, Entity>): void;
    createMouseListener(): void;
    createKeyboardListener(): void;
}
export {};
