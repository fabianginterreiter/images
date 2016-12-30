var React = require('react');
var moment = require('moment');

var UserState = require('../states/UserState');
var UsersStore = require('../stores/UsersStore');

class UsersManagement extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: UsersStore.getObject(),
      open: false
    }
  }

  componentDidMount() {
    UsersStore.addChangeListener(this, (users) => (this.setState({users:users})));
  }

  componentWillUnmount() {
    UsersStore.removeChangeListener(this);
  }

  handleCreateUser() {
    var data = new FormData();
    data.append( "name", this.refs.name.value );
    fetch("/api/users",
    {
        method: "POST",
        body: JSON.stringify({
          name:this.refs.name.value
        }), 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }).then((response) => (response.json())).then(function(user) {
      var users = UsersStore.getObject();
      users.push(user);
      UsersStore.setObject(users)
      UserState.setUser(user);
    });
  }

  handleUserSelect(user) {
    UserState.setUser(user);
  }

  openCreate() {
    this.setState({
      open: true
    });
  }

  render() {
    var createUser = (<span />);

    if (this.state.open) {
      createUser = (
        <div className="group">
          <input type="text" placeholder="Create" ref="name" />
          <button onClick={this.handleCreateUser.bind(this)} className="primary">Create</button>
        </div>
        );
    }

    return (
      <div className="users">
        <h1>Select Profile</h1>
        <div className="list">
          {
            this.state.users.map((user, idx) => (
              <div key={user.id} onClick={this.handleUserSelect.bind(this, user)}>
                <div><i className="icon-user icon-3x" /></div>
                <div>{user.name}</div>
              </div>))
          }
            <div onClick={this.openCreate.bind(this)}>
              <div><i className="icon-plus-sign-alt icon-3x" /></div>
              <div>Create</div>
            </div>
        </div>

        {createUser}
      </div>
    );
  }
}

module.exports = UsersManagement;