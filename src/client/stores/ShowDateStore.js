"use strict"

import {Dispatcher} from '../utils/Utils';
import cookie from 'react-cookie'

class ShowDateStore extends Dispatcher {
  constructor() {
    var c = cookie.load('showDate');
    super(c === 'true');
  }

  setObject(value) {
    super.setObject(value);
    cookie.save('showDate', value.toString());
  }

  change() {
    this.setObject(!this.getObject());
  }
}

export default new ShowDateStore();
