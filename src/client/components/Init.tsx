import * as React from "react";
import { browserHistory } from "react-router";
import UserState from "../states/UserState";

interface InitProps {
  location: {
    pathname: string;
  };
}

interface InitState {
  initializing: boolean;
}

export default class Init extends React.Component<InitProps, InitState> {
  constructor(props) {
    super(props);

    this.state = {
      initializing: true
    };
  }

  public componentDidMount() {
    UserState.addChangeListener(this, this.handleUserChange.bind(this));

    UserState.load().then(function() {
      this.setState({
        initializing: false
      });
    }.bind(this));
  }

  public componentWillUnmount() {
    UserState.removeChangeListener(this);
  }

  public render() {
    if (this.state.initializing) {
      return (<span>Loading</span>);
    }

    if (this.props.location.pathname === "/") {
      this.handleUserChange();
    }

    return (
      <div>{this.props.children}</div>
    );
  }

  private handleUserChange() {
    if (UserState.getUser()) {
      if (this.props.location.pathname.startsWith("/images")) {
        return;
      }

      browserHistory.push("/images");
    } else {
      browserHistory.push("/profiles");
    }
  }
}
