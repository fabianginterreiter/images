var Utils = require('../utils/Utils');
var $ = require("jquery");

class ResizeListener extends Utils.Dispatcher {
  constructor() {
    super(null);
    
    window.addEventListener('resize', this.setObject.bind(this), true);
  }

}

module.exports = new ResizeListener();