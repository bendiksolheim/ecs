# Pixi-ecs

Simple entity component system written in Typescript, specially written to work well with Pixi.js as renderer.

## Usage

See https://github.com/bendiksolheim/space-race for an example game using this library

```
import { Component, Event, logicSystem, renderSystem, World, Key} from "ecs";
```

### Component

A component has noe logic, it serves only as a place to keep state

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

An entity is a collection of components, which together make up a game entity.

```
const player = new Entity();
player.add(new Health(100));

player.has(Health); // -> true
const health = player.get(Health);
console.log(health.health); // -> 100
```

### System

Systems are functions which are called once or more per frame to progress your game.
Together, they make up your render loop.

There are two types of systems: logic systems and render systems. This is done to separate
logic updates from rendering. Logic systems are fixed timestep, and can be called multiple
times per frame, while render systems are run exactly once, in the end of the frame.

```
const logicSystem = logicystem(
    [ComponentOne, ComponentTwo],
    (entities: Entity[], world: World) => {
        entities.forEach(entity => {
            console.log(entity.has(ComponentOne)); // -> true
            console.log(entity.has(ComponentTwo)); // -> true
        });
    }
); 
```
 
 Render systems are given a lag value, representing "how far into" the frame we are. Use
 this if you want to compensate for frame lag.

```
const renderSystem = renderSystem(
    [Renderable],
    (entities: Entity[], lag: number, world: World) {
        entities.forEach(entity => {
            console.log(entity.has(Renderable)); // -> true
        })
    }
)
```

### World

A world couples everything together and has the logic for actually running your game.


```
const pixi = new PIXI.Application({ width: 600, height: 400});
const entityList = [list(), full(), of(), entities()]
const settings = {
    fps: 60,
    debug: false
}
const world = new World(pixi.view, entityList, [myUpdateSystem], [myRenderSystem], settings);
world.start()
```

## Resources

- [Fixed timestep](https://jsbin.com/rojitufojo/1/edit?html,js,output)
