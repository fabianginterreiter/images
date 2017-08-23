import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import Images from "./Images";
import {connect} from "react-redux";
import {Image} from "../types/types";
import {loadImages} from "../actions";
import Ajax from "../libs/Ajax";

class All extends React.Component<{
  loadImages(service: string);
}, {}> {
  public componentDidMount() {
    this.props.loadImages("/api/images");
  }

  public render() {
    return (
      <Images />
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadImages: (service: string) => dispatch(loadImages(service))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(All);
