import Component from "../component";
/**
 * Holds a size in a 2D plane (width and height)
 */
declare class Size implements Component {
    name: string;
    /**
     */
    width: number;
    /**
     */
    height: number;
    /**
     */
    constructor(width: number, height: number);
}
export default Size;
