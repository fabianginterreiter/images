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

  load() {
    fetch('/api/session', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }).then(function(response) {
      if (response.status === 200) {
        return response.json();  
      } else {
        return null;
      }
    }).then(function(user) {
      this.setUser(user);
    }.bind(this));
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