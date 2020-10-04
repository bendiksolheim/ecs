import Component from "./component";
import Entity from "./entity";
import World from "./world";
/**
 * A Filter is the constructor of a Component
 */
declare type Filter = new (...args: any) => Component;
declare type Filters = Record<string, Array<Filter>>;
/**
 * Initializer for a render system. A render system performs some kind of rendering
 * in your game. Where a logic system may be run N times per game frame, a render
 * system will always be executed exactly once, and always after every logic system.
 * A render system should ideally not calculate stuff, only perform rendering.
 *
 * A render system is passed a `lag` parameter. This parameter tells how "far into"
 * the frame you are. It is a value between 0 (start of frame) and 1 (end of frame).
 * This can be used to compensate for the time your logic systems has spent during
 * a frame.
 * ```
 * const renderSystem = renderSystem(
 *     { renderable: [Renderable] },
 *     (entities: Record<string, Entity[]>, lag: number, world: World) {
 *         entities.renderable.forEach(entity => {
 *             console.log(entity.has(Renderable)); // -> true
 *         })
 *     }
 * )
 * ```
 */
declare function renderSystem(filter: Filters, tick: (entities: Record<keyof typeof filter, Entity[]>, lag: number, world: World) => void): RenderSystem;
export declare type RenderSystem = {
    filter: Filters;
    tick: (entity: Record<string, Entity[]>, lag: number, world: World) => void;
};
export default renderSystem;
