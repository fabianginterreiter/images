import Dispatcher from "../Dispatcher"
import $ from "jquery"

class ScrollListener extends Dispatcher<Event> {
  constructor() {
    super(null);

    window.addEventListener("scroll", this.setObject.bind(this));
  }

}

export default new ScrollListener();
