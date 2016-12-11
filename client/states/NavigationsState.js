var State = require('../states/State');

var cookie = require('react-cookie');

class NavigationsState extends State {
  constructor() {
    var c = cookie.load('thumbnailsSize');
    super({
      open:false,
      pinned: true
    });
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open:false
    });
  }
}

module.exports = new NavigationsState();