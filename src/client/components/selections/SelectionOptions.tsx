import * as React from 'react'
import * as $ from "jquery"
import { location } from 'react-router'
import { OptionsList, Dropdown, SelectDialogStore, SingleSelectDialogStore } from '../../utils/Utils'
import ImagesStore from '../../stores/ImagesStore'
import SelectionStore from '../../stores/SelectionStore'
import Ajax from '../../libs/Ajax'
import * as ListUtils from '../../libs/ListUtils'
import {Tag, Album, Person, Image} from "../../types/types";

interface SelectionOptionsState {
  visible: boolean;
}

export default class SelectionOptions extends React.Component<{}, SelectionOptionsState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
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

  handleTags() {
    var images = SelectionStore.getSelected();

    Ajax.get('/api/tags').then((tags) => {
      SelectionStore.getSelected().forEach((image) => {
        image.tags.forEach((tag) => {
          var e = ListUtils.find(image.tags, tag.id) as Tag;
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
        promises.push(Ajax.post('/api/tags', tag).then((result) => (tag.id = result.id)));
      });

      if (promises.length === 0) {
        ImagesStore.addTags(SelectionStore.getSelected(), tags)
      } else {
        Promise.all(promises).then(() => ImagesStore.addTags(SelectionStore.getSelected(), tags));
      }
    }).catch((e) => console.log(e));
  }

  handleAlbums() {
    var images = SelectionStore.getSelected();

    Ajax.get('/api/albums').then((albums) => {
      SelectionStore.getSelected().forEach((image) => {
        image.albums.forEach((album) => {
          var e = ListUtils.find(albums, album.id) as Album;
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
        Ajax.post('/api/albums', album)
          .then((result) => ImagesStore.addAlbums(SelectionStore.getSelected(), result));
      } else {
        ImagesStore.addAlbums(SelectionStore.getSelected(), album);
      }
    }).catch((e) => console.log(e));
  }

  render() {
    return (
      <div onClick={this.toggle.bind(this)} className="right">
        <span><i className="fa fa-plus" aria-hidden="true" /><span className="min500"> Add</span></span>
        <Dropdown open={this.state.visible} onCancel={this.close.bind(this)}>
          <ul className="options">
            <li><a onClick={this.handleTags.bind(this)}><i className="fa fa-tags" /> Manage Tags</a></li>
            <li><a onClick={this.handleAlbums.bind(this)}><i className="fa fa-book" /> Add to Album</a></li>
          </ul>
        </Dropdown>
      </div>
    );
  }
}
