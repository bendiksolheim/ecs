import Component from "../component";
import * as PIXI from "pixi.js";

/**
 * Holds a PIXI.DisplayObject instance
 */
class Displayable implements Component {
  name = "displayable";
  /**
   */
  ref: PIXI.DisplayObject;

  /**
   */
  constructor(ref: PIXI.DisplayObject) {
    this.ref = ref;
  }
}

export default Displayable;
