import { Component } from "..";
/**
 * Pixi pivot point
 */
declare class Pivot implements Component {
    name: string;
    /**
     */
    x: number;
    /**
     */
    y: number;
    constructor(x: number, y: number);
}
export default Pivot;
