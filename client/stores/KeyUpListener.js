const Utils = require('../utils/Utils');
var $ = require("jquery");

class KeyUpListener extends Utils.Dispatcher {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

module.exports = new KeyUpListener();