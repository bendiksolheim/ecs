import Component from "./component";
import Entity from "./entity";
import World from "./world";

/**
 * A Filter is the constructor of a Component
 */
type Filter = new (...args: any) => Component;
type Filters = Record<string, Array<Filter>>;

/**
 * Initializer for a logic system. A logic system performs some kind of game logic
 * in your game, e.g. checks for collission. A logic system is executed N times per frame
 * depending on what you set your FPS to be. An FPS value of 60 means it is executed on average
 * once per frame, while an FPS value of 120 will execute it twice.
 * Usage:
 *
 * ```
 * const logicSystem = logicystem(
 *     { myEntities: [ComponentOne, ComponentTwo] },
 *     (entities: Record<string, Entity[]>, world: World) => {
 *         entities.myEntities.forEach(entity => {
 *             console.log(entity.has(ComponentOne)); // -> true
 *             console.log(entity.has(ComponentTwo)); // -> true
 *         });
 *     }
 * );
 * ```
 */
function logicSystem(
  filter: Filters,
  tick: (entities: Record<keyof typeof filter, Entity[]>, world: World) => void
): LogicSystem {
  return {
    filter,
    tick,
  };
}

export type LogicSystem = {
  filter: Filters;
  tick: (entities: Record<string, Entity[]>, world: World) => void;
};

export default logicSystem;
