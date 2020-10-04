import Component from "../component";

/**
 * A component used to store mouse coordinates in case of mouse click
 */
class MouseClick implements Component {
  name = "mouse-click";
  /**
   * Mouse X coordinate
   */
  x: number;
  /**
   * Mouse Y coordinate
   */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default MouseClick;
