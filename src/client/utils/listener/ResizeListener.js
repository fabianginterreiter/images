"use strict"

import Dispatcher from '../Dispatcher'
import $ from 'jquery'

class ResizeListener extends Dispatcher {
  constructor() {
    super(null);

    window.addEventListener('resize', this.setObject.bind(this), true);
  }

}

export default new ResizeListener();
