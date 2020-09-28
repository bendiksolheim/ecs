import Entity from "../entity";
import Position from "./position";
import Displayable from "./displayable";
import Rotation from "./rotation";
import Size from "./size";
/**
 * A special entity which automatically adds the components Position,
 * Displayable, Rotation and Size, and has the ability to add an object
 * to a Pixi container.
 */
class PixiEntity extends Entity {
    /**
     * Makes this entity a renderable entity added to a pixi container.
     * The Displayable component should not be mutated in a logic system.
     * Instead, mutate Position, Rotatin and Size in logic systems and copy the values into the Displayable component in a render system.
     */
    addDisplayObject(obj, container) {
        container.addChild(obj);
        this.add(new Position(obj.x, obj.y));
        this.add(new Displayable(obj));
        this.add(new Rotation(obj.rotation));
        this.add(new Size(obj.width, obj.height));
    }
}
export default PixiEntity;