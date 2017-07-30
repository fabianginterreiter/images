"use strict"

import {Dispatcher} from '../utils/Utils';

class State extends Dispatcher {
  constructor(state) {
    super(state ? state : {});
  }

  setState(state) {
    for (var key in state) {
      this.getObject()[key] = state[key];
    };

    this.dispatch();
  }
}

export default State;
