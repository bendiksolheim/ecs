import { Component } from "..";

/**
 * Pixi pivot point
 */
class Pivot implements Component {
  name = "pivot";
  /**
   */
  x: number;
  /**
   */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Pivot;
