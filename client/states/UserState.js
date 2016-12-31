"use strict"

const State = require('../states/State');
const Ajax = require('../libs/Ajax');

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
    Ajax.get("/api/session/" + user.id).then(() => (this.setState({user:user})));
  }

  clear() {
    Ajax.delete('/api/session').then(() => (this.setState({user:null})));
  }
}

module.exports = new UserState();