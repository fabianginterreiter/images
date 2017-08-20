import * as moment from "moment";
import * as React from "react";
import Ajax from "../libs/Ajax";
import UserState from "../states/UserState";
import {User} from "../types/types";
import * as ReactRedux from "react-redux";
import {addUser} from "../actions";

interface UsersManagementProps {
  users: User[];
  addUser(user: User): void;
}

interface UsersManagementState {
  open: boolean;
}

class UsersManagement extends React.Component<UsersManagementProps, UsersManagementState> {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
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
            this.props.users.map((user, idx) => (
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
    }).then((user) => {
      this.props.addUser(user);

      // UserState.setUser(user);
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

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user: User) => dispatch(addUser(user))
  }
}


export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
