"use strict"

import Utils from '../utils/Utils'
import cookie from 'react-cookie'

class ShowDateStore extends Utils.Dispatcher {
  constructor() {
    var c = cookie.load('showDate');
    super(c === 'true');
  }

  setObject(value) {
    console.log("Set Value to: " + value);
    super.setObject(value);
    cookie.save('showDate', value.toString());
  }

  change() {
    this.setObject(!this.getObject());
  }
}

module.exports = new ShowDateStore();