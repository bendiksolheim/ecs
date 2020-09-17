# Pixi-ecs

Simple entity component system written in Typescript, specially written to work well with Pixi.js as renderer.

## Usage

See https://github.com/bendiksolheim/space-race for an example game using this library

```
import { Component, Event, system, World, Key} from "ecs";
```

### Component

```
class Health implements Component {
    name: "health";
    health: number;

    constructor(health: number) {
        this.health = health;
    }
}
```

### Entity

```
const player = new Entity();
player.add(new Health(100));

player.has(Health); // -> true
const health = player.get(Health);
console.log(health.health); // -> 100
```

### system

```
const mySystem = system(
    [ComponentOne, ComponentTwo],
    (entities: Entity[], world: World) => {
        entities.forEach(entity => {
            console.log(entity.has(ComponentOne)); // -> true
            console.log(entity.has(ComponentTwo)); // -> true
        });
    }
);
```

### World

```
const world = new World(myCanvas, entities, [mySystem]);
world.tick()
```

