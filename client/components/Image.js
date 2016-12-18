var React = require('react');

var $ = require("jquery");

var ViewPointStore = require('../stores/ViewPointStore');

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }
  }

  componentDidMount() {
    return;
    this.viewPointStoreId = ViewPointStore.addChangeListener(this.handleScroll.bind(this));
    this.offsetTop = $(this.refs.child).offset().top - 1000;
    this.handleScroll(ViewPointStore.getObject());
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      this.offsetTop = $(this.refs.child).offset().top - 1000;
    }
  }

  componentWillUnmount() {
    if (!this.state.visible) {
      ViewPointStore.removeChangeListener(this.viewPointStoreId);
    }
  }

  handleScroll(view) {
    if (!this.state.visible && this.offsetTop < view) {
      this.setState({
        visible: true
      });
      ViewPointStore.removeChangeListener(this.viewPointStoreId);
    }
  }

  render() {
    if (!this.state.visible) {
      return (
        <div style={this.props.style} className="preloaded" ref="child" />
      );
    }
     return (<img src={'/thumbs/' + this.props.image.path} alt={this.props.image.filename} style={this.props.style} />);
  }
}

module.exports = Image;