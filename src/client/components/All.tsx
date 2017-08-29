import * as React from "react";
import {connect} from "react-redux";
import {loadImagesWithOffset} from "../actions";
import Ajax from "../libs/Ajax";
import {Image} from "../types/types";
import Images from "./Images";

class All extends React.Component<{
  images: Image[];
}, {}> {

  public render() {
    return (
      <Images images={this.props.images} reload={true} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadImagesWithOffset("/api/images"));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(All);
