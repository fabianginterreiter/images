import * as React from "react";
import * as ReactRedux from "react-redux";
import { browserHistory } from "react-router";

interface InitProps {
  location: {
    pathname: string;
  };
  isLoggedIn(): boolean;
}

class Init extends React.Component<InitProps, {}> {
  constructor(props) {
    super(props);

    this.componentWillReceiveProps(props);
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
      if (props.location.pathname !== "/images") {
        browserHistory.push("/images");
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
  };
};
export default ReactRedux.connect(mapStateToProps)(Init);
