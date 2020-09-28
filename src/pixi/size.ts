import Component from "../component";

/**
 * Holds a size in a 2D plane (width and height)
 */
class Size implements Component {
  name = "size";
  /**
   */
  width: number;
  /**
   */
  height: number;

  /**
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export default Size;
