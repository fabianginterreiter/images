"use strict"

import State from '../states/State'
import Ajax from '../libs/Ajax'
import { Cookies } from '../utils/Utils'
import NavigationsStore from '../stores/NavigationsStore'
import OptionsStore from '../stores/OptionsStore'

class UserState extends State {
  constructor() {
    super({
      user:null
    });
  }

  getUser() {
    return this.getObject().user;
  }

  load() {
    return Ajax.get('/api/session').then((user) => (this.setState({user:user})));
  }

  setUser(user) {
    Ajax.get("/api/session/" + user.id).then(() => {
      this.setState({user:user})
      NavigationsStore.load();
    });
  }

  clear() {
    Cookies.clear();
    Ajax.delete('/api/session').then(() => (this.setState({user:null})));
    OptionsStore.setObject(false);
  }
}

module.exports = new UserState();