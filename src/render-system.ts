import Component from "./component";
import Entity from "./entity";
import World from "./world";

/**
 * A Filter is the constructor of a Component
 */
type Filter = new (...args: any) => Component;

export interface RenderSystemInitializer {
  (
    filter: Array<Filter>,
    tick: (entities: Entity[], lag: number, world: World) => void
  ): RenderSystem;
}

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
 *     [Renderable],
 *     (entities: Entity[], lag: number, world: World) {
 *         entities.forEach(entity => {
 *             console.log(entity.has(Renderable)); // -> true
 *         })
 *     }
 * )
 * ```
 */
const renderSystem: RenderSystemInitializer = (filter, tick) => {
  return {
    filter,
    tick,
  };
};

export type RenderSystem = {
  filter: Array<new (...args: any) => Component>;
  tick: (entity: Entity[], lag: number, world: World) => void;
};

export default renderSystem;
