const Utils = require('../utils/Utils');
var $ = require("jquery");

class KeyUpListener extends Utils.Dispatcher {
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

  select(image) {
    let selection = this.getObject();
    if (!selection[image.id]) {
      selection[image.id] = image;
      this.setObject(selection);
    }
  }

  unselect(image) {
    let selection = this.getObject();
    if (selection[image.id]) {
      delete selection[image.id];
      this.setObject(selection);
    }
  }

  isSelected(image) {
    return this.getObject()[image.id] ? true : false;
  }

  getSelected() {
    let images = [];
    for (var key in this.getObject()) {
      images.push(this.getObject()[key]);
    }
    return images;
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