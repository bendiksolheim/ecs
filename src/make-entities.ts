import { Entity } from "./index";

export function makeEntities(entities: Entity[]): Record<string, Entity> {
  const initial: Record<string, Entity> = {};
  return entities.reduce((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, initial);
}
