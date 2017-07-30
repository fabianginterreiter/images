import * as cookie from 'react-cookie'

class Cookies {
  private values: object;

  constructor() {
    this.values = {};

    let cookies = cookie.select(/.+/);
    for (var name in cookies) {
      this.values[name] = cookies[name];
    }
  }

  set(name, value) {
    this.values[name] = value;
    cookie.save(name, value, { path: '/' });
  }

  get(name) {
    return this.values[name];
  }

  remove(name) {
    cookie.remove(name, { path: '/' });
    delete this.values[name];
  }

  clear() {
    var cookies = cookie.select(/.+/);

    for (var key in cookies) {
      this.remove(key);
    }
  }
}

export default new Cookies();
