import Component from "../component";
declare class Debug implements Component {
    name: string;
    entityId: string;
    constructor(entityId: string);
}
export default Debug;
