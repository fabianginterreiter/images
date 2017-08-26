import * as React from 'react'
import * as $ from "jquery"
import { location } from 'react-router'
import { OptionsList, Dropdown, SelectDialogStore, SingleSelectDialogStore } from '../../utils/Utils'
import ImagesStore from '../../stores/ImagesStore'
import Ajax from '../../libs/Ajax'
import * as ListUtils from '../../libs/ListUtils'
import {Tag, Album, Person, Image} from "../../types/types";
import {connect} from "react-redux";
import {addTag, removeTag, addTagToImage} from "../../actions";

interface SelectionOptionsState {
  visible: boolean;
}

class SelectionOptions extends React.Component<{
  selection: Image[];
  tags: Tag[];
  albums: Album[];
  addTagToImage(image: Image, tag: Tag): void;
  removeTag(image: Image, tag: Tag): void;
  addTag(tag: Tag): void;
}, SelectionOptionsState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  private close() {
    this.setState({
      visible: false
    });
  }

  private handleTags() {
    const images: Image[] = this.props.selection;

    const val = {};
    images.forEach((image) => image.tags.forEach((tag) => val[tag.id] = val[tag.id] ? val[tag.id] + 1 : 1));

    const options = this.props.tags.map((tag) => {
      return {
        id: tag.id,
        marked: 0 < val[tag.id] && val[tag.id] < images.length,
        name: tag.name,
        selected: val[tag.id] === images.length
      };
    });

    SelectDialogStore.open("Manage Tags", options).then((result) => {
      const c = result.filter((tag) => tag.selected).map((obj) => {
        return {
          id: obj.id,
          name: obj.name
        };
      });

      Promise.all(
        c.map((tag) => {
          if (tag.id) {
            return Promise.resolve(tag)
          } else {
            return Ajax.post("/api/tags", tag).then((r) => {
              tag.id = r.id;
              this.props.addTag(tag);
              return tag;
            });
          }
        })
      )
      .then(() => {
        images.forEach((image) => {
          image.tags.filter((tag) => (!c.find((o) => o.id === tag.id)))
            .forEach((tag) => this.props.removeTag(image, tag));
          c.filter((o) => !image.tags.find((tag) => tag.id === o.id))
            .forEach((tag) => this.props.addTagToImage(image, tag));
        });
      });
    });
  }

  private handleAlbums() {
    const images: Image[] = this.props.selection;

    Ajax.get('/api/albums').then((albums: Album[]) => {
      this.props.selection.forEach((image: Image) => {
        image.albums.forEach((album: Album) => {
          var e = ListUtils.find(albums, album.id) as Album;
          if (e) {
            e.__count = e.__count ? e.__count + 1 : 1;
          }
        });
      });

      albums.forEach((album: Album) => {
        if (album.__count && album.__count > 0) {
          if (album.__count === this.props.selection.length) {
            album.selected = true;
          } else {
            album.marked = true;
          }
        }
      });

      return SingleSelectDialogStore.open('Manage albums', albums);
    }).then((album: Album) => {
      if (!album.id) {
        Ajax.post('/api/albums', album)
          .then((result) => ImagesStore.addAlbums(this.props.selection, result));
      } else {
        ImagesStore.addAlbums(this.props.selection, album);
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

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    selection: state.selection,
    tags: state.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag: (tag: Tag) => dispatch(addTag(tag)),
    addTagToImage: (image: Image, tag: Tag) => dispatch(addTagToImage(image, tag)),
    removeTag: (image: Image, tag: Tag) => dispatch(removeTag(image, tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionOptions);
