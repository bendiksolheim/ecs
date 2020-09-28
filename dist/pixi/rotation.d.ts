import Component from "../component";
/**
 * Holds a rotation (in radians or degrees, that’s up to you)
 */
declare class Rotation implements Component {
    name: string;
    /**
     */
    angle: number;
    /**
     */
    constructor(angle?: number);
}
export default Rotation;
