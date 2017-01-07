var React = require('react');

const ImagesStore = require('../stores/ImagesStore');
const SelectionStore = require('../stores/SelectionStore');

class SelectAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: ImagesStore.getObject().length > 0
    };
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this, (images) => this.setState({
      visible: images.length > 0
    }));
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);
  }

  handleSelectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
    ImagesStore.dispatch();
  }

  render() {
    if (!this.state.visible) {
      return (<li />);
    }

    return (
      <li onClick={this.handleSelectAll.bind(this)} className="btn"><i className="fa fa-check-square-o" /><span className="min500"> Select All</span></li>
    );
  }
}

module.exports = SelectAll;