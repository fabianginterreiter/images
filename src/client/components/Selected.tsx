import * as React from "react";
import { browserHistory } from "react-router";
import ImagesStore from "../stores/ImagesStore";
import Images from "./Images";
import {connect} from "react-redux";
import {Image} from "../types/types";

class Selected extends React.Component<{
  selection: Image[]
}, {}> {

  public componentDidMount() {
    if (this.props.selection.length === 0) {
      browserHistory.push("/images");
    }
  }

  public render() {
    return (
      <div>
        <h1><i className="icon-check" /> Selection</h1>
        <Images images={this.props.selection} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  };
};

export default connect(mapStateToProps)(Selected);
