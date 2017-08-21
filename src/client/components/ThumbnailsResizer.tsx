import * as React from "react";
import * as ReactRedux from "react-redux";
import {setThumbnailSize} from "../actions";

interface ThumbnailsResizerProps {
  size: number;
  setThumbnailSize(size: number): void;
}

class ThumbnailsResizer extends React.Component<ThumbnailsResizerProps, {}> {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.props.setThumbnailSize(event.target.value);
  }

  render() {
    return (
      <input type="range" min="80" max="200" step="40" value={this.props.size} onChange={this.handleChange.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.options.thumbnailsSize
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setThumbnailSize: (size: number) => dispatch(setThumbnailSize(size))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ThumbnailsResizer);
