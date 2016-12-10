var React = require('react');
var moment = require('moment');

var ThumbnailsSizeStore = require('../stores/ThumbnailsSizeStore');

class ThumbnailsResizer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      size: ThumbnailsSizeStore.getObject()
    }
  }

  componentDidMount() {
    ThumbnailsSizeStore.addChangeListener((size) => (this.setState({size:size})));
  }

  handleChange(event) {
    ThumbnailsSizeStore.setObject(event.target.value)
  }

  render() {
    return (
      <input type="range" min="80" max="200" step="40" value={this.state.size} onChange={this.handleChange.bind(this)} />
    );
  }
}

module.exports = ThumbnailsResizer;