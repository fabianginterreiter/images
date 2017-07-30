"use strict"

import Dispatcher from '../Dispatcher'
import $ from 'jquery'

class KeyUpListener extends Dispatcher {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

export default new KeyUpListener();
