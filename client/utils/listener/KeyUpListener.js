"use strict"

const Dispatcher = require('../Dispatcher');
const $ = require("jquery");

class KeyUpListener extends Dispatcher {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

module.exports = new KeyUpListener();