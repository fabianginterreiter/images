import $ from "jquery";
import Dispatcher from "../Dispatcher";

class ResizeListener extends Dispatcher<Event> {
  constructor() {
    super(null);

    window.addEventListener("resize", this.setObject.bind(this), true);
  }

}

export default new ResizeListener();
