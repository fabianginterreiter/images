var Dispatcher = require('./Dispatcher');

var $ = require("jquery");

class ImagesStore extends Dispatcher {
  constructor() {
    super([]);
  }

  getSelected() {
    var images = [];

    super.getObject().forEach(function(image) {
      if (image.selected) {
        images.push(image);
      }
    });

    return images;
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

  load(service) {
    fetch(service, {
      accept: 'application/json',
      credentials: 'include'
    }).then(function(response) {
      return response.json();
    }).then(function(images) {
      this.setObject(images);
    }.bind(this));
  }

  hasSelected() {
    return this.getSelected().length > 0;
  }

  delete(image) {
    // console.log("Delete: " + image.id);

    $.ajax({
      url: '/api/images/' + image.id,
      type: 'DELETE',
      success: function(result) {
        var index = this.getIndex(image);
        if (index === -1) {
          return;
        }

        this.getObject().splice(index, 1);
        this.dispatch();
      }.bind(this)
    });
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