import Keyboard from "./keyboard";
export default class World {
    constructor(canvas, entities, logicSystems, renderSystems) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.mouse = { x: -100, y: -100 };
        this.logicSystems = logicSystems;
        this.renderSystems = renderSystems;
        this.entities = new Map();
        this.keyboard = new Keyboard();
        this.createEntityMapping(entities);
        this.createMouseListener();
        this.createKeyboardListener();
    }
    add(entity) {
        this.entities.forEach((entities, filter) => {
            if (matches(entity, filter)) {
                entities.set(entity.id, entity);
            }
        });
    }
    removeEntity(id) {
        this.entities.forEach((value) => {
            value.delete(id);
        });
    }
    /*boundingBox(): Rect {
      return rect(0, 0, this.canvas.width, this.canvas.height);
    }*/
    tick() {
        this.logicSystems.forEach((system) => {
            const entities = Array.from(this.entities.get(system.filter).values());
            return system.tick(entities, this);
        });
        this.renderSystems.forEach((system) => {
            const entities = Array.from(this.entities.get(system.filter).values());
            return system.tick(entities, 0, this);
        });
    }
    createEntityMapping(entities) {
        this.logicSystems.forEach((system) => {
            const entityMap = new Map();
            filterEntities(entities, system.filter).forEach((entity) => {
                entityMap.set(entity.id, entity);
            });
            this.entities.set(system.filter, entityMap);
        });
        this.renderSystems.forEach((system) => {
            const entityMap = new Map();
            filterEntities(entities, system.filter).forEach((entity) => {
                entityMap.set(entity.id, entity);
            });
            this.entities.set(system.filter, entityMap);
        });
    }
    createMouseListener() {
        const canvasRect = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener("mousemove", (ev) => {
            this.mouse.x = ev.clientX - canvasRect.left;
            this.mouse.y = ev.clientY - canvasRect.top;
        });
    }
    createKeyboardListener() {
        document.body.addEventListener("keydown", (ev) => {
            this.keyboard.press(ev.key);
        });
        document.body.addEventListener("keyup", (ev) => {
            this.keyboard.release(ev.key);
        });
    }
}
function filterEntities(entities, filter) {
    return Object.values(entities).filter((entity) => matches(entity, filter));
}
function matches(entity, filter) {
    return filter.every((component) => entity.has(component));
}
