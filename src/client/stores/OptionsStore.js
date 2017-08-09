"use strict"

import {Dispatcher} from '../utils/Utils';
import cookie from 'react-cookie';

class OptionsStore extends Dispatcher {
  constructor() {
    super(false);
  }
}

export default new OptionsStore();
