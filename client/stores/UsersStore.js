var Dispatcher = require('./Dispatcher');

var $ = require("jquery");

class UsersStore extends Dispatcher {
  constructor() {
    super([]);
    fetch('/api/users').then((response) => (response.json())).then((users) => (this.setObject(users)));
  }
};

module.exports = new UsersStore();