var Utils = require('../utils/Utils');

var $ = require("jquery");

class ViewPointStore extends Utils.Dispatcher {
  constructor() {
    super(0);

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    super.setObject(screen.height + document.body.scrollTop);
  }
};

module.exports = new ViewPointStore();