import * as React from "react";
import * as ReactRedux from "react-redux";
import {setThumbnailSize} from "../actions";

interface ThumbnailsResizerProps {
  size: number;
  setThumbnailSize(size: string): void;
}

class ThumbnailsResizer extends React.Component<ThumbnailsResizerProps, {}> {
  render() {
    return (
      <input type="range" min="80" max="200" step="40"
      value={this.props.size}
      onChange={(event) => this.props.setThumbnailSize(event.target.value)} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.options.thumbnailsSize
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setThumbnailSize: (size: string) => dispatch(setThumbnailSize(parseInt(size)))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ThumbnailsResizer);
