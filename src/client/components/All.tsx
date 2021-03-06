import * as React from "react";
import {connect} from "react-redux";
import {loadImagesWithOffset} from "../actions";
import Ajax from "../libs/Ajax";
import {Image} from "../types";
import Images from "./Images";

class All extends React.Component<{
  images: Image[];
  numberOfImages: number;
}, {}> {
  public render() {
    return (
      <Images images={this.props.images} reload={true} size={this.props.numberOfImages} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images,
    numberOfImages: state.stats.numberOfImages
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadImagesWithOffset("/api/images"));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(All);
