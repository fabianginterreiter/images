"use strict"

const React = require('react');

const $ = require("jquery");

const OptionsList = require('./OptionsList');
const Dropdown = require('./Dropdown');
const ImagesStore = require('../stores/ImagesStore');
const DialogStore = require('../stores/DialogStore');
const SelectDialogStore = require('../stores/SelectDialogStore');
const SingleSelectDialogStore = require('../stores/SingleSelectDialogStore');
const SelectionStore = require('../stores/SelectionStore');

const location = require('react-router').location;

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

    this.setState({
      values: options
    });
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);    
  }

  handleClick(option) {
    var images = SelectionStore.getSelected();

    switch (option.key) {
      case 'selectAll': {
        ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
        ImagesStore.dispatch();
        this.close();
        break;
      }

      case 'unselectAll': {
        ImagesStore.getObject().forEach((image) => (SelectionStore.unselect(image)));
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
    this.selected = !SelectionStore.isEmpty();

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