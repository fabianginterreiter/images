var React = require('react');

var $ = require("jquery");

var OptionsList = require('./OptionsList');
var Dropdown = require('./Dropdown');
var ImagesStore = require('../stores/ImagesStore');

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      values: [],
      images: []
    };
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  close() {
    this.setState({
      visible: false
    });
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this, (images) => (this.setState({images:images})));

    fetch('/api/options', {
      accept: 'application/json',
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      var options = [];

      options.push({
        key: 'selectAll',
        type: 'action',
        name: 'Select All'
      });

      options.push({
        key: 'unselectAll',
        type: 'action',
        name: 'Unselect All',
        selected: true
      });

      options.push({
        type: 'divider'
      });

      result.forEach((option) => (options.push(option)));

      options.push({
        type: 'divider'
      });

      options.push({
        key: 'delete',
        type: 'action',
        name: 'Delete',
        selected: true
      });

      this.setState({
        values: options
      });
    }.bind(this));
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);    
  }

  handleClick(option) {
    var images = ImagesStore.getSelected();

    switch (option.key) {
      case 'delete': {
        images.forEach(function(image) {
          ImagesStore.delete(image);
        });

        break;
      }

      case 'selectAll': {
        ImagesStore.getObject().forEach((image) => (image.selected = true));
        ImagesStore.dispatch();
        this.close();
        break;
      }

      case 'unselectAll': {
        ImagesStore.getObject().forEach((image) => (image.selected = false));
        ImagesStore.dispatch();
        this.close();
        break;
      }
    }
  }

  isActive(object) {
    return !object.selected || this.selected;
  }

  render() {
    this.selected = ImagesStore.hasSelected();

    return (
      <li onClick={this.toggle.bind(this)} className="btn">
        <i className="icon-reorder" />
        <Dropdown open={this.state.visible} onCancel={this.close.bind(this)}>
          <OptionsList values={this.state.values} active={this.isActive.bind(this)} onClick={this.handleClick.bind(this)} />
        </Dropdown>
      </li>
    );
  }
}

module.exports = Options;