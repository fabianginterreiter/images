"use strict"

var Utils = require('../utils/Utils');
const Ajax = require('../libs/Ajax');
const $ = require("jquery");

class UsersStore extends Utils.Dispatcher {
  constructor() {
    super([]);
    Ajax.get('/api/users').then((users) => (this.setObject(users)));
  }
};

module.exports = new UsersStore();