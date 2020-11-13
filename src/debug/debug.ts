import Component from "../component";

class Debug implements Component {
  name = "debug";
  entityId: string;

  constructor(entityId: string) {
    this.entityId = entityId;
  }
}

export default Debug;
