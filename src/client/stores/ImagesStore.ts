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

  public addAlbum(image: Image, album: Album, mass: boolean) {
    return Ajax.put(`/api/images/${image.id}/albums`, album).then((result) => {
      image.albums.push(result);
      this.dispatch();

      return album;
    });
  }

  public addAlbums(images: Image[], album: Album) {
    const promises = [];

    images.forEach((image) => {
      const e = ListUtils.find(image.albums, album.id);
      if (!e) {
        promises.push(this.addAlbum(image, album, true));
      }
    });

    return Promise.all(promises);
  }

  public deleteFromAlbum(images: Image[], album: Album) {
    const promises = [];

    images.forEach((image) => {
      promises.push(this.deleteAlbum(image, album, true));
    });

    return Promise.all(promises);
  }

  public deleteAlbum(image: Image, album: Album, mass: boolean) {
    return Ajax.delete(`/api/images/${image.id}/albums/${album.id}`).then(() => {
      for (let index = 0; index < image.albums.length; index++) {
        if (image.albums[index].id === album.id) {
          image.albums.splice(index, 1);
          break;
        }
      }

      this.dispatch();

      return album;
    });
  }

  public deleteTag(image: Image, tag: Tag, mass: boolean = false) {
    return Ajax.delete(`/api/images/${image.id}/tags/${tag.id}`).then(() => {
      for (let index = 0; index < image.tags.length; index++) {
        if (image.tags[index].id === tag.id) {
          image.tags.splice(index, 1);
          break;
        }
      }

      this.dispatch();

      return tag;
    });
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

  public reload() {
    if (this.service) {
      this.load(this.service);
    }
  }

  public delete(image: Image) {
    Ajax.delete(`/api/images/${image.id}`).then(() => {
      const index = this.getIndex(image);
      if (index === -1) {
        return;
      }

      this.getObject().splice(index, 1);
      this.dispatch();
    });
  }

  public revert(image: Image) {
    return Ajax.put(`/api/images/${image.id}/revert`).then(() => (image.deleted = false));
  }

  public getIndex(image: Image) {
    for (let index = 0; index < super.getObject().length; index++) {
      if (super.getObject()[index].id === image.id) {
        return index;
      }
    }

    return -1;
  }
}

export default new ImagesStore();
