import * as React from 'react';
import * as moment from 'moment';

import UserState from '../states/UserState';
import UsersStore from '../stores/UsersStore';

import Ajax from '../libs/Ajax';

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

  handleCreateUser(e) {
    e.preventDefault();

    var data = new FormData();
    data.append( "name", this.refs.name.value );
    Ajax.post("/api/users", {
          name:this.refs.name.value
    }).then(function(user) {
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
          <form onSubmit={this.handleCreateUser.bind(this)}>
            <input type="text" placeholder="Create" ref="name" autoFocus />
            <button onClick={this.handleCreateUser.bind(this)} className="primary">Create</button>
          </form>
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
                <div><i className="fa fa-user fa-3x" /></div>
                <div>{user.name}</div>
              </div>))
          }
            <div onClick={this.openCreate.bind(this)}>
              <div><i className="fa fa-user-plus fa-3x" /></div>
              <div>Create</div>
            </div>
        </div>

        {createUser}
      </div>
    );
  }
}

export default UsersManagement;