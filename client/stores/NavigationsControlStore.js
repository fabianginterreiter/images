var Dispatcher = require('./Dispatcher');

var cookie = require('react-cookie');

class NavigationsControlStore extends Dispatcher {
  constructor() {
    var c = cookie.load('thumbnailsSize');
    super({open:false});
  }

  open() {
    super.setObject({
      open:true
    });
  }

  close() {
    super.setObject({
      open:false
    });
  }
}

module.exports = new NavigationsControlStore();