"use strict"

const React = require('react');

const $ = require("jquery");

const OptionsList = require('../../utils/Utils').OptionsList;
const Dropdown = require('../../utils/Utils').Dropdown;
const ImagesStore = require('../../stores/ImagesStore');
const DialogStore = require('../../utils/Utils').DialogStore;
const SelectDialogStore = require('../../utils/Utils').SelectDialogStore;
const SingleSelectDialogStore = require('../../utils/Utils').SingleSelectDialogStore;
const SelectionStore = require('../../stores/SelectionStore');

const location = require('react-router').location;

class SelectionOptions extends React.Component {
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
      key: 'selectTag',
      type: 'action',
      name: 'Set Tags',
      selected: true
    });

    options.push({
      key: 'selectAlbum',
      type: 'action',
      name: 'Set Albums',
      selected: true
    });

    options.push({
      key: 'removeAlbum',
      type: 'action',
      name: 'Remove from Albums',
      selected: true
    });

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
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);    
  }

  handleClick(option) {
    var images = SelectionStore.getSelected();

    switch (option.key) {
      case 'delete': {

        DialogStore.open('Delete Images', 'Do you really want to delete all selected images?').then(() => {
          images.forEach(function(image) {
            ImagesStore.delete(image);
          });
        });

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
          SelectionStore.getSelected().forEach((image) => {
            image.tags.forEach((tag) => {
              var e = getElement(tags, tag.id);
              if (e) {
                e.__count = e.__count ? e.__count + 1 : 1;
              }
            });
          });

          tags.forEach((tag) => {
            if (tag.__count && tag.__count > 0) {
              if (tag.__count === SelectionStore.size()) {
                tag.selected = true;
              } else {
                tag.marked = true;
              }
            }
          });

          return SelectDialogStore.open('Manage Tags', tags);
        }).then((tags) => {
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
            ImagesStore.addTags(SelectionStore.getSelected(), tags)
          } else {
            Promise.all(promises).then(() => ImagesStore.addTags(SelectionStore.getSelected(), tags));
          }
        }).catch((e) => console.log(e));
        break;
      }  

      case 'selectAlbum': {
        var getElement = function(list, id) {
          for (var index = 0; index < list.length; index++) {
            if (list[index].id === id) {
              return list[index];
            }
          }

          return null;
        }

        fetch('/api/albums',{
          credentials: 'include'
        }).then((result) => result.json()).then((albums) => {
          SelectionStore.getSelected().forEach((image) => {
            image.albums.forEach((album) => {
              var e = getElement(albums, album.id);
              if (e) {
                e.__count = e.__count ? e.__count + 1 : 1;
              }
            });
          });

          albums.forEach((album) => {
            if (album.__count && album.__count > 0) {
              if (album.__count === SelectionStore.size()) {
                album.selected = true;
              } else {
                album.marked = true;
              }
            }
          });

          return SingleSelectDialogStore.open('Manage albums', albums);
        }).then((album) => {
          if (!album.id) {
             return fetch('/api/albums', {
              method: "POST",
              body: JSON.stringify(album), 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
              },
              credentials: 'include'
            }).then((result) => (result.json())).then((result) => (album.id = result.id)).then(() => {
              ImagesStore.addAlbums(SelectionStore.getSelected(), album);
            });
          } else {
            ImagesStore.addAlbums(SelectionStore.getSelected(), album);
          }
        }).catch((e) => console.log(e));
        break;
      }

      case 'removeAlbum': {
        ImagesStore.deleteFromAlbum(SelectionStore.getSelected(), {id:this.props.params.albumId}).then(() => {
          ImagesStore.reload();
        });
        break;
      }
    }
  }

  isActive(object) {
    if (object.key === 'removeAlbum') {
      return this.selected && this.props.params.albumId;
    }

    return !object.selected || this.selected;
  }

  render() {
    this.selected = !SelectionStore.isEmpty();

    return (
      <li onClick={this.toggle.bind(this)} className="btn">
        <i className="fa fa-bars" />
        <Dropdown open={this.state.visible} onCancel={this.close.bind(this)}>
          <OptionsList values={this.state.values} active={this.isActive.bind(this)} onClick={this.handleClick.bind(this)} />
        </Dropdown>
      </li>
    );
  }
}

module.exports = SelectionOptions;