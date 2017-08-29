import * as React from "react";
import {connect} from "react-redux";
import {select, unselect} from "../actions";
import {Image} from "../types/types";

class ImagesNav extends React.Component<{
  images: Image[];
  select(image: Image);
  unselect(image: Image);
}, {}> {
  public render() {
    return (
      <nav className="group">
        <a onClick={this.handleSelectAll.bind(this)}>
          <i className="fa fa-check-square-o" /><span className="min500"> Select All</span>
        </a>
        <a onClick={this.handleUnselectAll.bind(this)}>
          <i className="fa fa-square-o" /><span className="min500"> Unselect All</span>
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
    images: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (image: Image) => dispatch(select(image)),
    unselect: (image: Image) => dispatch(unselect(image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesNav);
