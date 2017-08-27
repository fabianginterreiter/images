import $ from "jquery";
import Ajax from "../libs/Ajax";
import * as ListUtils from "../libs/ListUtils";
import {Album, Image, Person, Tag} from "../types/types";
import {Dispatcher} from "../utils/Utils";

class ImagesStore extends Dispatcher<Image[]> {
  private service: string;
  private offset: number;
  private limit: number;
  private loading: boolean;

  constructor() {
    super(null);
  }

  public addPerson(image: Image, person: Person) {
    Ajax.put(`/api/images/${image.id}/persons`, person).then((result) => {
      image.persons.push(result);
      this.dispatch();
    });
  }

  public deletePerson(image: Image, person: Person) {
    Ajax.delete(`/api/images/${image.id}/persons/${person.id}`).then(() => {
      for (let index = 0; index < image.persons.length; index++) {
        if (image.persons[index].id === person.id) {
          image.persons.splice(index, 1);
          break;
        }
      }
      this.dispatch();
    });
  }

  public load(service: string) {
    this.setObject(null);
    this.service = service + (service.indexOf("?") > 0 ? "&" : "?");
    this.offset = 0;
    this.limit = 50;
    this.loading = false;
    Ajax.get(this.service + "limit=" + this.limit + "&offset=" + this.offset).then((images) => {
      this.loading = false;
      this.setObject(images);
    });
  }

  public more() {
    if (this.limit > 0 && !this.loading) {
      this.loading = true;
      this.offset += this.limit;
      Ajax.get(this.service + "limit=" + this.limit + "&offset=" + this.offset).then((images) => {
        if (images.length < this.limit) {
          this.limit = 0;
        }
        this.setObject(this.getObject().concat(images));
        this.loading = false;
      });
    }
  }

  private getIndex(image: Image) {
    for (let index = 0; index < super.getObject().length; index++) {
      if (super.getObject()[index].id === image.id) {
        return index;
      }
    }

    return -1;
  }
}

export default new ImagesStore();
