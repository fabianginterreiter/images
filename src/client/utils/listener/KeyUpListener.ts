import * as $ from "jquery";
import Dispatcher from "../Dispatcher";

class KeyUpListener extends Dispatcher<Event> {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

export default new KeyUpListener();
