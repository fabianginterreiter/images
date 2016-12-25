"use strict"

const React = require('react');

const $ = require("jquery");

const OptionsList = require('./OptionsList');
const Dropdown = require('./Dropdown');
const ImagesStore = require('../stores/ImagesStore');
const DialogStore = require('../stores/DialogStore');
const SelectDialogStore = require('../stores/SelectDialogStore');

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

      options.push({
        key: 'selectTag',
        type: 'action',
        name: 'Set Tags',
        selected: false
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

        DialogStore.open('Delete Images', 'Do you really want to delete all selected images?').then((result) => {
          if (result) {
            images.forEach(function(image) {
              ImagesStore.delete(image);
            });
          }
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

      case 'selectTag': {
        fetch('/api/tags').then((result) => result.json()).then((tags) => {
          tags[0].marked = true;
          tags[1].selected = true;
          return tags;
        }).then((tags) => SelectDialogStore.open('Delete Images', tags))
        .then((result) => {
          console.log(result);
        });
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