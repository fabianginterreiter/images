import {Dispatcher} from '../utils/Utils';
import * as $ from 'jquery';
import {Image} from "../types/types";

class KeyUpListener extends Dispatcher<Map<number, Image>> {
  constructor() {
    super(new Map<number, Image>());
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
    this.setObject(new Map<number, Image>());
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.getObject()).length;
  }

}

export default new KeyUpListener();
