import * as PIXI from "pixi.js";
import Component from "./component";
import Entity from "./entity";
import { LogicSystem } from "./logic-system";
import { RenderSystem } from "./render-system";
import Keyboard, { Key } from "./keyboard";
import { makeEntities } from "./make-entities";
import MouseClick from "./events/mouse-click";
import debugEntities from "./debug/debug-entities";

const defaultRenderConfig = {
  fps: 60,
  debug: false,
};

type RenderConfig = typeof defaultRenderConfig;

type RenderState = {
  fps: number;
  previous: number;
  frameDuration: number;
  lag: number;
};

type Filter = Array<new (...args: any) => Component>;

/**
 * A World ties everything together
 * Usage:
 *
 * ```
 * const pixi = new PIXI.Application({ width: 600, height: 400});
 * const entityList = [list(), full(), of(), entities()]
 * const settings = {
 *     fps: 60,
 *     debug: false
 * }
 * const world = new World(pixi.view, entityList, [myUpdateSystem], [myRenderSystem], settings);
 * world.start()
 * ```
 *
 */
export default class World {
  pixi: PIXI.Application;
  logicSystems: LogicSystem[];
  renderSystems: RenderSystem[];
  entities: Map<Filter, Map<string, Entity>>;
  renderState: RenderState;
  debug: Boolean;
  /**
   * Contains the current mouse position
   */
  mouse: { x: number; y: number; pressed: boolean };
  /**
   * Contains current keyboard state, with keys pressed and so on
   */
  keyboard: Keyboard;

  elapsedTime: number;

  /**
   * Main constructor
   */
  constructor(
    pixi: PIXI.Application,
    entities: Entity[],
    logicSystems: LogicSystem[],
    renderSystems: RenderSystem[],
    renderConfig: RenderConfig = defaultRenderConfig
  ) {
    this.debug = renderConfig.debug;
    this.pixi = pixi;
    this.mouse = { x: -100, y: -100, pressed: false };
    if (this.debug) {
      pixi.stage.addChild(debugContainer());
      this.logicSystems = logicSystems.concat(debugEntities);
    } else {
      this.logicSystems = logicSystems;
    }
    this.renderSystems = renderSystems;
    this.entities = new Map();
    this.keyboard = new Keyboard();
    this.elapsedTime = 0;

    this.renderState = {
      fps: renderConfig.fps,
      previous: 0,
      frameDuration: 1000 / renderConfig.fps,
      lag: 0,
    };

    entities.forEach((entity) => {
      entity.register(this);
    });

    this.createEntityMapping(makeEntities(entities));
    this.createMouseListener();
    this.createKeyboardListener();
  }

  /**
   * Adds an entity to an already instantiated world. Updates system filters.
   */
  addEntity(entity: Entity) {
    entity.register(this);
    this.entities.forEach((entities, filter) => {
      if (matches(entity, filter)) {
        entities.set(entity.id, entity);
      }
    });
  }

  /**
   * Removes an entity from an already instantiated world.
   */
  removeEntity(entity: Entity) {
    this.entities.forEach((value) => {
      value.delete(entity.id);
    });
  }

  /**
   * Starts the game loop. Runs until stopped.
   */
  start() {
    this.elapsedTime = performance.now();
    log(this.debug, "Starting rendering", this.renderState);
    this.tick();
  }

  tick(timestamp?: number) {
    if (!timestamp) {
      timestamp = 0;
    }
    // Calculate time since last frame
    let elapsed = timestamp - this.renderState.previous;

    // Handle case where time since last frame is unreasonably high
    if (elapsed > 1000) {
      elapsed = this.renderState.frameDuration;
    }

    // Add elapsed time to lag counter
    this.renderState.lag += elapsed;

    let count = 0;
    while (this.renderState.lag >= this.renderState.frameDuration) {
      count += 1;
      this.logicSystems.forEach((system) => {
        const entities = Object.entries(system.filter).reduce((acc, cur) => {
          const key = cur[0];
          const filters = cur[1];
          const entities = Array.from(this.entities.get(filters)!.values());
          acc[key] = entities;
          return acc;
        }, {} as Record<string, Entity[]>);
        return system.tick(entities, this);
      });

      this.renderState.lag -= this.renderState.frameDuration;
    }

    const lagOffset = this.renderState.lag / this.renderState.frameDuration;

    this.renderSystems.forEach((system) => {
      const entities = Object.entries(system.filter).reduce((acc, cur) => {
        const key = cur[0];
        const filters = cur[1];
        const entities = Array.from(this.entities.get(filters)!.values());
        acc[key] = entities;
        return acc;
      }, {} as Record<string, Entity[]>);
      return system.tick(entities, lagOffset, this);
    });

    this.renderState.previous = timestamp;
    requestAnimationFrame((n) => this.tick(n));
  }

  /**
   * Gets time elapsed since engine was started
   */
  currentElapsedTime(): number {
    return performance.now() - this.elapsedTime;
  }

  createEntityMapping(entities: Record<string, Entity>) {
    log(this.debug, "Mapping logic systems");
    this.logicSystems.forEach((system) => {
      log(this.debug, "Creating mapping for system");
      Object.entries(system.filter).forEach(([key, filter]) => {
        log(this.debug, `Mapping for ${key}`);
        const entityMap = new Map();
        filterEntities(entities, filter).forEach((entity) => {
          entityMap.set(entity.id, entity);
        });
        this.entities.set(filter, entityMap);
      });
    });

    log(this.debug, "Mapping render systems");
    this.renderSystems.forEach((system) => {
      log(this.debug, "Creating mapping for system");
      Object.entries(system.filter).forEach(([key, filter]) => {
        log(this.debug, `Mapping for ${key}`);
        const entityMap = new Map();
        filterEntities(entities, filter).forEach((entity) => {
          entityMap.set(entity.id, entity);
        });
        this.entities.set(filter, entityMap);
      });
    });
  }

  createMouseListener() {
    const canvasRect = this.pixi.view.getBoundingClientRect();
    this.pixi.view.addEventListener("mousemove", (ev) => {
      this.mouse.x = ev.clientX - canvasRect.left;
      this.mouse.y = ev.clientY - canvasRect.top;
    });

    this.pixi.view.addEventListener("mousedown", () => {
      this.mouse.pressed = true;
    });

    this.pixi.view.addEventListener("mouseup", () => {
      this.mouse.pressed = false;
    });

    this.pixi.view.addEventListener("click", () => {
      const e = new Entity();
      e.add(new MouseClick(this.mouse.x, this.mouse.y));
      this.addEntity(e);
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

function filterEntities(
  entities: Record<string, Entity>,
  filter: Filter
): Entity[] {
  return Object.values(entities).filter((entity: Entity) =>
    matches(entity, filter)
  );
}

function matches(entity: Entity, filter: Filter): boolean {
  return filter.every((component) => entity.has(component));
}

function log(debug: Boolean, ...msg: any[]) {
  if (debug) {
    const messages: any[] = msg.map((m) => {
      if (typeof m === "object") {
        return JSON.stringify(m);
      } else if (typeof m === "string") {
        return m;
      } else {
        return String(m);
      }
    });
    console.log.call(null, messages);
  }
}

function debugContainer(): PIXI.Container {
  const container = new PIXI.Container();
  container.name = "debug-container";
  container.zIndex = Number.MAX_SAFE_INTEGER;
  return container;
}
