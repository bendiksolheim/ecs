import Component from "../component";
import * as PIXI from "pixi.js";

/**
 * Holds a PIXI.Container instance
 */
class Displayable implements Component {
  name = "displayable";
  /**
   */
  ref: PIXI.Container;

  /**
   */
  constructor(ref: PIXI.Container) {
    this.ref = ref;
  }
}

export default Displayable;
