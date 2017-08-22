import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import {connect} from "react-redux";
import {Image} from "../types/types"
import {select, unselect} from "../actions"

class ImagesNav extends React.Component<{
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
    ImagesStore.getObject().forEach((image) => (this.props.select(image)));
    ImagesStore.dispatch();
  }

  private handleUnselectAll() {
    ImagesStore.getObject().forEach((image) => (this.props.unselect(image)));
    ImagesStore.dispatch();
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    select: (image: Image) => dispatch(select(image)),
    unselect: (image: Image) => dispatch(unselect(image)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesNav);
