import Component from "../component";

/**
 * Holds a rotation (in radians or degrees, that’s up to you)
 */
class Rotation implements Component {
  name = "rotation";
  /**
   */
  angle: number;

  /**
   */
  constructor(angle: number = 0) {
    this.angle = angle;
  }
}

export default Rotation;
