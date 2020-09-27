export function makeEntities(entities) {
    const initial = {};
    return entities.reduce((prev, cur) => {
        prev[cur.id] = cur;
        return prev;
    }, initial);
}
