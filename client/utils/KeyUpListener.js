const Dispatcher = require('./Dispatcher');
var $ = require("jquery");

class KeyUpListener extends Dispatcher {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

module.exports = new KeyUpListener();