import * as moment from "moment";
import * as React from "react";
import * as ReactRedux from "react-redux";
import {addUser, setSession} from "../actions";
import Ajax from "../libs/Ajax";
import {User} from "../types";

interface UsersManagementProps {
  users: User[];
  addUser(user: User): void;
  setSession(user: User): void;
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

    const data = new FormData();
    data.append( "name", (this.refs.name as HTMLFormElement).value );
    Ajax.post("/api/users", {
          name: (this.refs.name as HTMLFormElement).value
    }).then((user) => {
      this.props.addUser(user);
      this.props.setSession(user);
    });
  }

  private handleUserSelect(user: User): void {
    Ajax.get("/api/session/" + user.id).then(() => {
        this.props.setSession(user);
    });
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user: User) => dispatch(addUser(user)),
    setSession: (user: User) => dispatch(setSession(user))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
