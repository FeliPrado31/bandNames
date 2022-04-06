const { v4 } = require("uuid");
class Band {
  constructor(name) {
    this.id = v4();
    this.name = name;
    this.votes = 0;
  }
}

module.exports = Band;
