"use strict"

import Utils from '../utils/Utils'

class State extends Utils.Dispatcher {
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

module.exports = State;