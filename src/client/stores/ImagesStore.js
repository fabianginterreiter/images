"use strict"

import {Dispatcher} from '../utils/Utils';
import NavigationsStore from './NavigationsStore'
import $ from 'jquery'
import Ajax from '../libs/Ajax'

class ImagesStore extends Dispatcher {
  constructor() {
    super(null);
  }

  like(image) {
    if (image.liked) {
      Ajax.put('/api/images/' + image.id + '/unlike').then(() => {
        image.liked = false;
        this.dispatch();
      });
    } else {
      Ajax.put('/api/images/' + image.id + '/like').then(() => {
        image.liked = true;
        this.dispatch();
      });
    }
  }

  addTag(image, tag, mass) {
    var newEntry = !tag.id;
    return Ajax.put('/api/images/' + image.id + '/tags', tag).then((tag) => {
      image.tags.push(tag);
      this.dispatch();

      if (newEntry && !mass) {
        NavigationsStore.load();
      }

      return tag;
    });
  }

  addTags(images, tags) {
    var getElement = function(list, id) {
      for (var index = 0; index < list.length; index++) {
        if (list[index].id === id) {
          return list[index];
        }
      }

      return null;
    }

    var promises = [];

    tags.forEach((tag) => {
      if (tag.marked) {
        return;
      }

      images.forEach((image) => {
        var e = getElement(image.tags, tag.id);
        if (e && !tag.selected) {
          promises.push(this.deleteTag(image, tag, true));
        } else if (!e && tag.selected) {
          promises.push(this.addTag(image, tag, true));
        }
      });
    });

    return Promise.all(promises).then(() => {
      return NavigationsStore.load();
    });
  }

  addAlbum(image, album, mass) {
    var newEntry = !album.id;
    return Ajax.put('/api/images/' + image.id + '/albums', album).then((album) => {
      image.albums.push(album);
      this.dispatch();

      if (newEntry && !mass) {
        NavigationsStore.load();
      }

      return album;
    });
  }

  addAlbums(images, album) {
    var getElement = function(list, id) {
      for (var index = 0; index < list.length; index++) {
        if (list[index].id === id) {
          return list[index];
        }
      }

      return null;
    }

    var promises = [];

    images.forEach((image) => {
      var e = getElement(image.albums, album.id);
      if (!e) {
        promises.push(this.addAlbum(image, album, true));
      }
    });

    return Promise.all(promises).then(() => {
      return NavigationsStore.load();
    });
  }

  deleteFromAlbum(images, album) {
    var promises = [];

    images.forEach((image) => {
      promises.push(this.deleteAlbum(image, album, true));
    });

    return Promise.all(promises);
  }

  deleteAlbum(image, album, mass) {
    return Ajax.delete('/api/images/' + image.id + '/albums/' + album.id).then(() => {
      if (!mass) {
        NavigationsStore.load();
      }

      for (var index = 0; index < image.albums.length; index++) {
        if (image.albums[index].id === album.id) {
          image.albums.splice(index, 1);
          break;
        }
      }

      this.dispatch();

      return album;
    });
  }

  deleteTag(image, tag, mass) {
    return Ajax.delete('/api/images/' + image.id + '/tags/' + tag.id).then(() => {
      if (!mass) {
        NavigationsStore.load();
      }

      for (var index = 0; index < image.tags.length; index++) {
        if (image.tags[index].id === tag.id) {
          image.tags.splice(index, 1);
          break;
        }
      }

      this.dispatch();

      return tag;
    });
  }

  addPerson(image, person) {
    var newEntry = !person.id;
    Ajax.put('/api/images/' + image.id + '/persons', person).then((person) => {
      image.persons.push(person);
      this.dispatch();

      if (newEntry) {
        NavigationsStore.load();
      }
    });
  }

  deletePerson(image, person) {
    Ajax.delete('/api/images/' + image.id + '/persons/' + person.idf).then(() => {
      NavigationsStore.load();
      for (var index = 0; index < image.persons.length; index++) {
        if (image.persons[index].id === person.id) {
          image.persons.splice(index, 1);
          break;
        }
      }
      this.dispatch();
    });
  }

  load(service) {
    this.setObject(null);
    this.service = service + (service.indexOf('?') > 0 ? '&' : '?');
    this.offset = 0;
    this.limit = 50;
    this.loading = 0;
    Ajax.get(this.service + 'limit=' + this.limit + '&offset=' + this.offset).then((images) => {
      this.loading = false;
      this.setObject(images);
    });
  }

  more() {
    if (this.limit > 0 && !this.loading) {
      this.loading = true;
      this.offset += this.limit;
      console.log(this.service + 'limit=' + this.limit + '&offset=' + this.offset);
       Ajax.get(this.service + 'limit=' + this.limit + '&offset=' + this.offset).then((images) => {
         if (images.length < this.limit) {
           this.limit = 0;
         }
         this.setObject(this.getObject().concat(images));
         this.loading = false;
       });
    }
  }

  reload() {
    if (this.service) {
      this.load(this.service);
    }
  }

  delete(image) {
    Ajax.delete('/api/images/' + image.id).then(() => {
      var index = this.getIndex(image);
      if (index === -1) {
        return;
      }

      this.getObject().splice(index, 1);
      this.dispatch();
    });
  }

  revert(image) {
    return Ajax.put('/api/images/' + image.id + '/revert').then(() => (image.deleted = false));
  }

  getIndex(image) {
    for (var index = 0; index < super.getObject().length; index++) {
      if (super.getObject()[index].id === image.id) {
        return index;
      }
    }

    return -1;
  }
}

export default new ImagesStore();
