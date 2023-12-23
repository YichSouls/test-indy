class PromocodeType {
  constructor(_id, name, avantage, restrictions) {
    this._id = id;
    this.name = name;
    this.avantage = avantage;
    this.restriction = new RestrictionNode ('@and', restrictions, null);
  }
}

class RestrictionNode {
  constructor(type, conditions, next) {
    this.type = type;
    this.conditions = conditions;
    this._next = next;
  }

  set next([node]) {
    this._next = node;
  }

  get next() {
    return this._next;
  }
}

