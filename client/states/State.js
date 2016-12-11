var Dispatcher = require('../stores/Dispatcher');

var cookie = require('react-cookie');

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

module.exports = State;