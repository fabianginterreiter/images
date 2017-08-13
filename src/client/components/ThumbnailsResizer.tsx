import * as React from "react";
import ThumbnailsSizeStore from "../stores/ThumbnailsSizeStore";

interface ThumbnailsResizerState {
  size: number;
}

export default class ThumbnailsResizer extends React.Component<{}, ThumbnailsResizerState> {
  constructor(props) {
    super(props);

    this.state = {
      size: ThumbnailsSizeStore.getObject()
    };
  }

  componentDidMount() {
    ThumbnailsSizeStore.addChangeListener(this, (size) => (this.setState({size})));
  }

  componentWillUnmount() {
    ThumbnailsSizeStore.removeChangeListener(this);
  }

  handleChange(event) {
    ThumbnailsSizeStore.setObject(event.target.value);
  }

  render() {
    return (
      <input type="range" min="80" max="200" step="40" value={this.state.size} onChange={this.handleChange.bind(this)} />
    );
  }
}
