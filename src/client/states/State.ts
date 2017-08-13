import {Dispatcher} from "../utils/Utils";

class State<T> extends Dispatcher<T> {
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
