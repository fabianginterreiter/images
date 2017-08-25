import * as React from "react";
import {connect} from "react-redux";
import ImagesStore from "../stores/ImagesStore";
import {Image} from "../types/types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import {loadImages} from "../actions/images";

class Favorites extends React.Component<{
  images: Image[];
}, {}> {

  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-heart-o" aria-hidden="true" /> Favorites
          <ImagesNav />
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadImages("/api/images?liked=true"));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
