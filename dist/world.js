import Keyboard from "./keyboard";
const defaultRenderConfig = {
    fps: 60,
    debug: false,
};
export default class World {
    constructor(canvas, entities, logicSystems, renderSystems, renderConfig = defaultRenderConfig) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.mouse = { x: -100, y: -100 };
        this.logicSystems = logicSystems;
        this.renderSystems = renderSystems;
        this.entities = new Map();
        this.keyboard = new Keyboard();
        this.renderState = {
            fps: renderConfig.fps,
            previous: 0,
            frameDuration: renderConfig.fps / 1000,
            lag: 0,
        };
        this.debug = renderConfig.debug;
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
    start() {
        log(this.debug, "Starting rendering", this.renderState);
        this.tick();
    }
    tick(timestamp) {
        if (!timestamp) {
            timestamp = 0;
        }
        // Calculate time since last frame
        let elapsed = timestamp - this.renderState.previous;
        log(this.debug, "Elapsed", elapsed);
        // Handle case where time since last frame is unreasonably high
        if (elapsed > 1000) {
            elapsed = this.renderState.frameDuration;
        }
        // Add elapsed time to lag counter
        this.renderState.lag += elapsed;
        log(this.debug, "Frame", this.renderState);
        let count = 0;
        while (this.renderState.lag >= this.renderState.frameDuration) {
            count += 1;
            this.logicSystems.forEach((system) => {
                const entities = Array.from(this.entities.get(system.filter).values());
                return system.tick(entities, this);
            });
            this.renderState.lag -= this.renderState.frameDuration;
        }
        log(this.debug, "Update ran", count, "times");
        const lagOffset = this.renderState.lag / this.renderState.frameDuration;
        this.renderSystems.forEach((system) => {
            const entities = Array.from(this.entities.get(system.filter).values());
            return system.tick(entities, lagOffset, this);
        });
        this.renderState.previous = timestamp;
        requestAnimationFrame((n) => this.tick(n));
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
function log(debug, ...msg) {
    if (debug) {
        const messages = msg.map((m) => {
            if (typeof m === "object") {
                return JSON.stringify(m);
            }
            else if (typeof m === "string") {
                return m;
            }
            else {
                return String(m);
            }
        });
        console.log.apply(undefined, messages);
    }
}
