import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import { location } from "react-router";
import {addAlbum, addAlbumToImage, addTag, addTagToImage, removeAlbumFromImage, removeTag} from "../../actions";
import Ajax from "../../libs/Ajax";
import * as ListUtils from "../../libs/ListUtils";
import {Album, Image, Person, Tag} from "../../types/types";
import { Dropdown, OptionsList, SelectDialogStore, SingleSelectDialogStore } from "../../utils/Utils";

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
  addAlbum(album: Album): void;
  removeAlbumFromImage(image: Image, album: Album): void;
  addAlbumToImage(image: Image, album: Album): void;
}, SelectionOptionsState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
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
            return Promise.resolve(tag);
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

  private persist(album: Album) {
    if (album.id) {
      return Promise.resolve(album);
    } else {
      return Ajax.post("/api/albums", album).then((object) => {
        this.props.addAlbum(object);
        return object;
      });
    }
  }

  private handleAlbums() {
    const images: Image[] = this.props.selection;

    const val = {};
    images.forEach((image) => image.albums.forEach((album) => val[album.id] = val[album.id] ? val[album.id] + 1 : 1));

    const options = this.props.albums.map((album) => {
      return {
        id: album.id,
        marked: 0 < val[album.id] && val[album.id] < images.length,
        name: album.name,
        selected: val[album.id] === images.length
      };
    });

    SingleSelectDialogStore.open("Manage albums", options).then((result) => {
      this.persist({
        id: result.id,
        name: result.name,
        public: false
      }).then((album: Album) => {
        images.filter((image: Image) => (!image.albums.find((a) => album.id === a.id)))
          .forEach((image: Image) => this.props.addAlbumToImage(image, album));
      });
    });
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
    addAlbum: (album: Album) => dispatch(addAlbum(album)),
    addAlbumToImage: (image: Image, album: Album) => dispatch(addAlbumToImage(image, album)),
    addTag: (tag: Tag) => dispatch(addTag(tag)),
    addTagToImage: (image: Image, tag: Tag) => dispatch(addTagToImage(image, tag)),
    removeAlbumFromImage: (image: Image, album: Album) => dispatch(removeAlbumFromImage(image, album)),
    removeTag: (image: Image, tag: Tag) => dispatch(removeTag(image, tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionOptions);
