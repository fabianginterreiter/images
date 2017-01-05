var Dispatcher = require('./Dispatcher');
var $ = require("jquery");

class ResizeListener extends Dispatcher {
  constructor() {
    super(null);
    
    window.addEventListener('resize', this.setObject.bind(this), true);
  }

}

module.exports = new ResizeListener();