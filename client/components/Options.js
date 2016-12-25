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
        selected: true
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
        var getElement = function(list, id) {
          for (var index = 0; index < list.length; index++) {
            if (list[index].id === id) {
              return list[index];
            }
          }

          return null;
        }

        fetch('/api/tags').then((result) => result.json()).then((tags) => {
          ImagesStore.getSelected().forEach((image) => {
            image.tags.forEach((tag) => {
              var e = getElement(tags, tag.id);
              if (e) {
                e.__count = e.__count ? e.__count + 1 : 1;
              }
            });
          });

          tags.forEach((tag) => {
            if (tag.__count && tag.__count > 0) {
              if (tag.__count === ImagesStore.getSelected().length) {
                tag.selected = true;
              } else {
                tag.marked = true;
              }
            }
          });

          return tags;
        }).then((tags) => {
          SelectDialogStore.open('Manage Tags', tags).then((result) => {
            if (result) {
              var promises = [];

              tags.forEach((tag) => {
                if (tag.id || !tag.selected) {
                  return;
                }

                promises.push(fetch('/api/tags', {
                  method: "POST",
                  body: JSON.stringify(tag), 
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                }).then((result) => (result.json())).then((result) => (tag.id = result.id)));
              });

              if (promises.length === 0) {
                ImagesStore.addTags(ImagesStore.getSelected(), tags)
              } else {
                Promise.all(promises).then(() => ImagesStore.addTags(ImagesStore.getSelected(), tags));
              }
            }
          });
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