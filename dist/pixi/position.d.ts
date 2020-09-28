import Component from "../component";
/**
 * Holds a position with x and y coordinates
 */
declare class Position implements Component {
    name: string;
    /**
     */
    x: number;
    /**
     */
    y: number;
    /**
     */
    constructor(x: number, y: number);
}
export default Position;
