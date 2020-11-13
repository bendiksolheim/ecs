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
            const bounds = debugged.get(Displayable).ref.getBounds();
            const ref = debug.get(Displayable).ref;
            ref.x = bounds.x;
            ref.y = bounds.y;
            ref.width = bounds.width;
            ref.height = bounds.height;
            // const pos = debug.get(Position);
            // const rot = debug.get(Rotation);
            // const siz = debug.get(Size);
            // debugged.ifHas(Position, (position) => {
            //   pos.x = position.x;
            //   pos.y = position.y;
            // });
            // debugged.ifHas(Rotation, (rotation) => {
            //   rot.angle = rotation.angle;
            // });
            // debugged.ifHas(Size, (size) => {
            //   siz.width = size.width;
            //   siz.height = size.height;
            // });
        }
        else {
            const bounds = debugged.get(Displayable).ref.getBounds();
            const g = new PIXI.Graphics();
            g.lineStyle(1, 0xff0000, 1, 0);
            g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            const entity = new PixiEntity();
            entity.addDisplayObject(g, world.pixi.stage.getChildByName("debug-container"));
            entity.add(new Debug(debugged.id));
            world.addEntity(entity);
        }
    });
});
