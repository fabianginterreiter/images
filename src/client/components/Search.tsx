import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions";
import {getLanguage, t} from "../libs/Translation";
import {Image} from "../types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

interface SearchProps {
  images: Image[];
  location: {
    query: {
      s: string;
    }
  };
}

class Search extends React.Component<SearchProps, {}> {
  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-search" aria-hidden="true" /> {t("search.title")}: {this.props.location.query.s}
          <ImagesNav />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(loadImages(`/api/search?s=${ownProps.location.query.s}`));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
