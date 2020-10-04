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
function logicSystem(filter, tick) {
    return {
        filter,
        tick,
    };
}
export default logicSystem;
