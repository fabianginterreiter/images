import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions";
import Ajax from "../libs/Ajax";
import ImagesStore from "../stores/ImagesStore";
import {Image} from "../types/types";
import Images from "./Images";

class All extends React.Component<{
  images: Image[];
}, {}> {

  public render() {
    return (
      <Images images={this.props.images} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadImages("/api/images"));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(All);
