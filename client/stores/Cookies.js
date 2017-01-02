const cookie = require('react-cookie');

class Cookies {
  constructor() {
    this.values = {};

    //console.log(cookie.select(/.+/));
  }

  set(name, value) {
    console.log('Set [' + name + '] to: [' + value + ']');
    this.values[name] = value;
    cookie.save(name, value, { path: '/' });
  }

  get(name) {
    if (this.values[name]) {
      return this.values[name];
    }

    let value = cookie.load(name);

    if (value) {
      this.values[name] = value;
      return value;
    }

    return null;
  }

  remove(name) {
    console.log("Remove Cookie: [" + name + ']');
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

module.exports = new Cookies();