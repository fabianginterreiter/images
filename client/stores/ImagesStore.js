const Dispatcher = require('./Dispatcher');
const NavigationsStore = require('./NavigationsStore');
const $ = require("jquery");
const Ajax = require('../libs/Ajax');

class ImagesStore extends Dispatcher {
  constructor() {
    super([]);
  }

  like(image) {
    if (image.liked) {
      fetch('/api/images/' + image.id + '/unlike', {
        method: "PUT",
        credentials: 'include'
      }).then(() => {
        image.liked = false;
        this.dispatch();
      });
    } else {
      fetch('/api/images/' + image.id + '/like', {
        method: "PUT",
        credentials: 'include'
      }).then(() => {
        image.liked = true;
        this.dispatch();
      });
    }
  }

  addTag(image, tag, mass) {
    var newEntry = !tag.id;
    return fetch('/api/images/' + image.id + '/tags', {
      method: "PUT",
      body: JSON.stringify(tag), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((result) => result.json()).then((tag) => {
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
    return fetch('/api/images/' + image.id + '/albums', {
      method: "PUT",
      body: JSON.stringify(album), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }).then((result) => result.json()).then((album) => {
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
    return fetch('/api/images/' + image.id + '/albums/' + album.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => { 
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
    return fetch('/api/images/' + image.id + '/tags/' + tag.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => { 
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
    fetch('/api/images/' + image.id + '/persons', {
      method: "PUT",
      body: JSON.stringify(person), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((result) => result.json()).then((person) => {
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
    this.service = service;
    Ajax.get(service).then((images) => this.setObject(images));
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

module.exports = new ImagesStore();