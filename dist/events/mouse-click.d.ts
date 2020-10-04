import Component from "../component";
/**
 * A component used to store mouse coordinates in case of mouse click
 */
declare class MouseClick implements Component {
    name: string;
    /**
     * Mouse X coordinate
     */
    x: number;
    /**
     * Mouse Y coordinate
     */
    y: number;
    constructor(x: number, y: number);
}
export default MouseClick;
