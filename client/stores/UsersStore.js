"use strict"

const Dispatcher = require('./Dispatcher');
const Ajax = require('../libs/Ajax');
const $ = require("jquery");

class UsersStore extends Dispatcher {
  constructor() {
    super([]);
    Ajax.get('/api/users').then((users) => (this.setObject(users)));
  }
};

module.exports = new UsersStore();