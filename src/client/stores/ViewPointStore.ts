import {Dispatcher} from "../utils/Utils";

class ViewPointStore extends Dispatcher<number> {
  constructor() {
    super(0);

    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  public handleScroll(e) {
    super.setObject(screen.height + document.body.scrollTop);
  }
}

export default new ViewPointStore();
