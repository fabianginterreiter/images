import * as moment from "moment";
import * as React from "react";
import Ajax from "../libs/Ajax";
import UserState from "../states/UserState";
import UsersStore from "../stores/UsersStore";
import {User} from "../types/types";

interface UsersManagementState {
  open: boolean;
  users: User[];
}

export default class UsersManagement extends React.Component<{}, UsersManagementState> {
  constructor(props) {
    super(props);

    this.state = {
      users: UsersStore.getObject(),
      open: false
    };
  }

  public componentDidMount() {
    UsersStore.addChangeListener(this, (users) => (this.setState({users})));
  }

  public componentWillUnmount() {
    UsersStore.removeChangeListener(this);
  }

  public render() {
    let createUser = (<span />);

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

  private handleCreateUser(e) {
    e.preventDefault();

    let data = new FormData();
    data.append( "name", (this.refs.name as HTMLFormElement).value );
    Ajax.post("/api/users", {
          name: (this.refs.name as HTMLFormElement).value
    }).then(function(user) {
      let users = UsersStore.getObject();
      users.push(user);
      UsersStore.setObject(users);
      UserState.setUser(user);
    });
  }

  private handleUserSelect(user: User): void {
    UserState.setUser(user);
  }

  private openCreate(): void {
    this.setState({
      open: true
    });
  }
}
