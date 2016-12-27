var Dispatcher = require('./Dispatcher');
var $ = require("jquery");

class KeyUpListener extends Dispatcher {
  constructor() {
    super({});
  }

  handle(image) {
    let selection = this.getObject();
    if (selection[image.id]) {
      delete selection[image.id];
    } else {
      selection[image.id] = image;
    }
    this.setObject(selection);
  }

  isSelected(image) {
    return this.getObject()[image.id] ? true : false;
  }

  clear() {
    this.setObject({});
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.getObject()).length;
  }

}

module.exports = new KeyUpListener();