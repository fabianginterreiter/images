import cookie from "react-cookie";
import {Dispatcher} from "../utils/Utils";

class ShowDateStore extends Dispatcher<boolean> {
  constructor() {
    super(cookie.load("showDate") === "true");
  }

  public setObject(value: boolean): void {
    super.setObject(value);
    cookie.save("showDate", value.toString());
  }

  public change(): void {
    this.setObject(!this.getObject());
  }
}

export default new ShowDateStore();
