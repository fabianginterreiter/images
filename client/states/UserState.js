var State = require('../states/State');

class UserState extends State {
  constructor() {
    super({
      user:null
    });
  }

  getUser() {
    return this.getObject().user;
  }

  setUser(user) {
    fetch("/api/session/" + user.id,
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(() => (this.setState({user:user})));
  }

  clear() {
    fetch('/api/session',
    {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }).then(() => (this.setState({user:null})));
  }
}

module.exports = new UserState();