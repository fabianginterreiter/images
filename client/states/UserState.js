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
    return fetch('/api/session', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }).then(function(response) {
      console.log(response);
      if (response.ok) {
        return response.json();  
      } else {
        return null;
      }
    }).then((user) => (this.setState({user:user})));
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