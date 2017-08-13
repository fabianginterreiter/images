import cookie from "react-cookie";
import {Dispatcher} from "../utils/Utils";

class OptionsStore extends Dispatcher<boolean> {
  constructor() {
    super(false);
  }
}

export default new OptionsStore();
