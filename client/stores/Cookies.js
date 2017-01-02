const cookie = require('react-cookie');

class Cookies {
  constructor() {
    this.values = {};

    let cookies = cookie.select(/.+/);
    for (var name in cookies) {
      this.values[name] = cookies[name];
    }
  }

  set(name, value) {
    console.log('Set [' + name + '] to: [' + value + ']');
    this.values[name] = value;
    cookie.save(name, value, { path: '/' });
  }

  get(name) {
    return this.values[name];
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