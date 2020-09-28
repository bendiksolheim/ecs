import Entity from "../entity";
import * as PIXI from "pixi.js";
/**
 * A special entity which automatically adds the components Position,
 * Displayable, Rotation and Size, and has the ability to add an object
 * to a Pixi container.
 */
declare class PixiEntity extends Entity {
    /**
     * Makes this entity a renderable entity added to a pixi container.
     * The Displayable component should not be mutated in a logic system.
     * Instead, mutate Position, Rotatin and Size in logic systems and copy the values into the Displayable component in a render system.
     */
    addDisplayObject(obj: PIXI.Container, container: PIXI.Container): void;
}
export default PixiEntity;
