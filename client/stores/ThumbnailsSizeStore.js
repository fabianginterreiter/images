var Dispatcher = require('./Dispatcher');

var cookie = require('react-cookie');

class ThumbnailsSizeStore extends Dispatcher {
  constructor() {
    var c = cookie.load('thumbnailsSize');
    super(c ? c : 200);
  }

  setObject(value) {
    super.setObject(value);
    cookie.save('thumbnailsSize', value);
  }
}

module.exports = new ThumbnailsSizeStore();