"use strict"

import Utils from '../utils/Utils';
import Ajax from '../libs/Ajax'

class UsersStore extends Utils.Dispatcher {
  constructor() {
    super([]);
    Ajax.get('/api/users').then((users) => (this.setObject(users)));
  }
};

module.exports = new UsersStore();