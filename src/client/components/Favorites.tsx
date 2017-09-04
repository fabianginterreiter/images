import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions/images";
import {Image} from "../types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import {t, getLanguage} from "../libs/Translation";

class Favorites extends React.Component<{
  images: Image[];
  translate(key: string): string;
}, {}> {

  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-heart-o" aria-hidden="true" /> {t("navigations.favorites")}
          <ImagesNav images={this.props.images} />
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images,
    language: getLanguage(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadImages("/api/images?liked=true"));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
