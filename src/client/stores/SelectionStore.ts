import * as $ from "jquery";
import {Image} from "../types/types";
import {Dispatcher} from "../utils/Utils";

class KeyUpListener extends Dispatcher<Map<number, Image>> {
  constructor() {
    super(new Map<number, Image>());
  }

  public handle(image: Image) {
    const selection = this.getObject();
    if (selection[image.id]) {
      delete selection[image.id];
    } else {
      selection[image.id] = image;
    }
    this.setObject(selection);
  }

  public select(image: Image) {
    const selection = this.getObject();
    if (!selection[image.id]) {
      selection[image.id] = image;
      this.setObject(selection);
    }
  }

  public unselect(image: Image) {
    const selection = this.getObject();
    if (selection[image.id]) {
      delete selection[image.id];
      this.setObject(selection);
    }
  }

  public isSelected(image: Image) {
    return this.getObject()[image.id] ? true : false;
  }

  public getSelected(): Image[] {
    const images = [];
    for (const key in this.getObject()) {
      images.push(this.getObject()[key]);
    }
    return images;
  }

  public clear(): void {
    this.setObject(new Map<number, Image>());
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public size(): number {
    return Object.keys(this.getObject()).length;
  }

}

export default new KeyUpListener();
