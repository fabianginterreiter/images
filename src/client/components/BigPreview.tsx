import * as React from "react";
import {connect} from "react-redux";
import {Image} from "../types";
import ImageComponent from "./ImageComponent";

class BigPreview extends React.Component<{
  image: Image;
  width: number;
  renderContent(image: Image);
}, {}> {
  public render() {
    if (!this.props.image) {
      return <span />;
    }

    const style = {
      width: this.props.width + "px",
      height: this.props.width / this.props.image.proportion + "px"
    };

    return (<div className="container">
      <div className="item">
        <img ref="image" src={`/show/${this.props.image.path}`}
          alt={this.props.image.filename} style={style} />
        {this.props.renderContent ? this.props.renderContent(this.props.image) : <ImageComponent image={this.props.image} />}
      </div>
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0,
    showDate: state.options.showDate,
    thumbnailsSize: state.options.thumbnailsSize,
    allImages: state.images,
    width: ownProps.width || state.view.width
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BigPreview);
