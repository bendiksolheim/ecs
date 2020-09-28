import Component from "../component";

/**
 * Holds a position with x and y coordinates
 */
class Position implements Component {
  name = "position";
  /**
   */
  x: number;
  /**
   */
  y: number;

  /**
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Position;
