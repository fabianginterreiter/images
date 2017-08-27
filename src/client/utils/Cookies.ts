import * as cookie from "react-cookie";

class Cookies {
  private values: object;

  constructor() {
    this.values = {};

    const cookies = cookie.select(/.+/);
    for (let name in cookies) {
      this.values[name] = cookies[name];
    }
  }

  public set(name, value) {
    this.values[name] = value;
    cookie.save(name, value, { path: "/" });
  }

  public get(name) {
    return this.values[name];
  }

  public remove(name) {
    cookie.remove(name, { path: "/" });
    delete this.values[name];
  }

  public clear() {
    const cookies = cookie.select(/.+/);

    for (let key in cookies) {
      this.remove(key);
    }
  }
}

export default new Cookies();
