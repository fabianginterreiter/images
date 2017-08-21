import * as React from "react";
import { browserHistory } from "react-router";
import * as ReactRedux from "react-redux";

interface InitProps {
  location: {
    pathname: string;
  };
  isLoggedIn(): boolean;
}

class Init extends React.Component<InitProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>{this.props.children}</div>
    );
  }

  public componentWillReceiveProps(props) {
    if (props.isLoggedIn()) {
      if (props.location.pathname.startsWith("/images")) {
        return;
      }
      if (props.location.pathname !== "/images/") {
        browserHistory.push("/images/");
      }
    } else {
      if (props.location.pathname !== "/profiles") {
        browserHistory.push("/profiles");
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: () => state.session !== null
  }
}
export default ReactRedux.connect(mapStateToProps)(Init);
