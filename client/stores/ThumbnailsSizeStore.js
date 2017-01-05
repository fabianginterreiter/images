var Utils = require('../utils/Utils');

var cookie = require('react-cookie');

class ThumbnailsSizeStore extends Utils.Dispatcher {
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