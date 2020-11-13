import Entity from "../entity";
import World from "../world";
import * as PIXI from "pixi.js";
import Position from "./position";
import Displayable from "./displayable";
import Rotation from "./rotation";
import Size from "./size";
import Pivot from "./pivot";
import Debugged from "../debug/debugged";

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
  addDisplayObject(obj: PIXI.Container, container: PIXI.Container) {
    container.addChild(obj);

    this.add(new Position(obj.x, obj.y));
    this.add(new Displayable(obj));
    this.add(new Rotation(obj.rotation));
    this.add(new Size(obj.width, obj.height));
    this.add(new Pivot(obj.pivot.x, obj.pivot.y));
    this.add(new Debugged());
  }
}

export default PixiEntity;
