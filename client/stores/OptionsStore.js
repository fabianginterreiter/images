"use strict"

import Utils from '../utils/Utils'
import cookie from 'react-cookie'

class OptionsStore extends Utils.Dispatcher {
  constructor() {
    super(false);
  }
}

module.exports = new OptionsStore();