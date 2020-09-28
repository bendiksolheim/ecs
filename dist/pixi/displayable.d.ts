import Component from "../component";
import * as PIXI from "pixi.js";
/**
 * Holds a PIXI.DisplayObject instance
 */
declare class Displayable implements Component {
    name: string;
    /**
     */
    ref: PIXI.DisplayObject;
    /**
     */
    constructor(ref: PIXI.DisplayObject);
}
export default Displayable;
