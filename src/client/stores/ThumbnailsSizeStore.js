"use strict"

import {Dispatcher} from '../utils/Utils';
import cookie from 'react-cookie'

class ThumbnailsSizeStore extends Dispatcher {
  constructor() {
    var c = cookie.load('thumbnailsSize');
    super(c ? c : 200);
  }

  setObject(value) {
    super.setObject(value);
    cookie.save('thumbnailsSize', value);
  }
}

export default new ThumbnailsSizeStore();
