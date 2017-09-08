import * as React from "react";
import {connect} from "react-redux";
import {select, unselect} from "../actions";
import {getLanguage, t} from "../libs/Translation";
import {Image} from "../types";

class ImagesNav extends React.Component<{
  images: Image[];
  select(image: Image);
  unselect(image: Image);
}, {}> {
  public render() {
    return (
      <nav className="group">
        <a onClick={this.handleSelectAll.bind(this)}>
          <i className="fa fa-check-square-o" /><span className="min500"> {t("images.selectAll")}</span>
        </a>
        <a onClick={this.handleUnselectAll.bind(this)}>
          <i className="fa fa-square-o" /><span className="min500"> {t("images.unselectAll")}</span>
        </a>
        {this.props.children}
      </nav>
    );
  }

  private handleSelectAll() {
    this.props.images.forEach((image) => (this.props.select(image)));
  }

  private handleUnselectAll() {
    this.props.images.forEach((image) => (this.props.unselect(image)));
  }
}

const mapStateToProps = (state) => {
  return {
    language: getLanguage(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (image: Image) => dispatch(select(image)),
    unselect: (image: Image) => dispatch(unselect(image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesNav);
