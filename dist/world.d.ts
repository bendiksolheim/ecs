import Component from "./component";
import Entity from "./entity";
import { LogicSystem } from "./logic-system";
import { RenderSystem } from "./render-system";
import Keyboard from "./keyboard";
declare const defaultRenderConfig: {
    fps: number;
    debug: boolean;
};
declare type RenderConfig = typeof defaultRenderConfig;
declare type RenderState = {
    fps: number;
    previous: number;
    frameDuration: number;
    lag: number;
};
declare type Filter = Array<new (...args: any) => Component>;
/**
 * A World ties everything together
 * Usage:
 *
 * ```
 * const pixi = new PIXI.Application({ width: 600, height: 400});
 * const entityList = [list(), full(), of(), entities()]
 * const settings = {
 *     fps: 60,
 *     debug: false
 * }
 * const world = new World(pixi.view, entityList, [myUpdateSystem], [myRenderSystem], settings);
 * world.start()
 * ```
 *
 */
export default class World {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    logicSystems: LogicSystem[];
    renderSystems: RenderSystem[];
    entities: Map<Filter, Map<string, Entity>>;
    renderState: RenderState;
    debug: Boolean;
    /**
     * Contains the current mouse position
     */
    mouse: {
        x: number;
        y: number;
    };
    /**
     * Contains current keyboard state, with keys pressed and so on
     */
    keyboard: Keyboard;
    /**
     * Main constructor
     */
    constructor(canvas: HTMLCanvasElement, entities: Entity[], logicSystems: LogicSystem[], renderSystems: RenderSystem[], renderConfig?: RenderConfig);
    /**
     * Adds an entity to an already instantiated world. Updates system filters.
     */
    addEntity(entity: Entity): void;
    /**
     * Removes an entity from an already instantiated world.
     */
    removeEntity(id: string): void;
    /**
     * Starts the game loop. Runs until stopped.
     */
    start(): void;
    tick(timestamp?: number): void;
    createEntityMapping(entities: Record<string, Entity>): void;
    createMouseListener(): void;
    createKeyboardListener(): void;
}
export {};
