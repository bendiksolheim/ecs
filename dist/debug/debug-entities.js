import * as PIXI from "pixi.js";
import PixiEntity from "../pixi/pixi-entity";
import logicSystem from "../logic-system";
import Displayable from "../pixi/displayable";
import Debug from "./debug";
import Debugged from "./debugged";
export default logicSystem({
    debug: [Debug, Displayable],
    debugged: [Debugged, Displayable],
}, (entities, world) => {
    entities.debugged.forEach((debugged) => {
        const debug = entities.debug.find((d) => d.get(Debug).entityId === debugged.id);
        if (debug) {
            const debuggedRef = debugged.get(Displayable).ref;
            const bounds = debuggedRef.getBounds();
            const ref = debug.get(Displayable).ref;
            ref.clear();
            ref.lineStyle(1, 0xff0000, 1, 0);
            ref.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            ref.visible = isVisible(debuggedRef);
        }
        else if (debugged.get(Displayable).ref.children.length === 0) {
            const bounds = debugged.get(Displayable).ref.getBounds();
            const g = new PIXI.Graphics();
            g.name = `${debugged.get(Displayable).ref.name}-debug`;
            g.lineStyle(1, 0xff0000, 1, 0);
            g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            const entity = new PixiEntity();
            entity.add(new Debug(debugged.id));
            entity.addDisplayObject(g, world.pixi.stage.getChildByName("debug-container"));
            world.addEntity(entity);
        }
    });
});
function isVisible(ref) {
    let cur = ref;
    do {
        if (!cur.visible) {
            return false;
        }
        cur = cur.parent;
    } while (cur !== null);
    return true;
}
