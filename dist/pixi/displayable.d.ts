import Component from "../component";
import * as PIXI from "pixi.js";
/**
 * Holds a PIXI.Container instance
 */
declare class Displayable implements Component {
    name: string;
    /**
     */
    ref: PIXI.Container;
    /**
     */
    constructor(ref: PIXI.Container);
}
export default Displayable;
