import cookie from "react-cookie";
import {Dispatcher} from "../utils/Utils";

class ThumbnailsSizeStore extends Dispatcher<number> {
  constructor() {
    super(cookie.load("thumbnailsSize") ? cookie.load("thumbnailsSize") : 200);
  }

  public setObject(value: number): void {
    super.setObject(value);
    cookie.save("thumbnailsSize", value);
  }
}

export default new ThumbnailsSizeStore();
