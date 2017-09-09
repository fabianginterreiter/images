import * as React from "react";
import {connect} from "react-redux";
import {removeAlbumFromImage, loadAlbum, updateEntry} from "../actions";
import Ajax from "../libs/Ajax";
import {t} from "../libs/Translation";
import {Album, Image, AlbumImage} from "../types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import AlbumView from "./AlbumView";

interface AlbumProps {
  album: Album;
  entries: AlbumImage[];
  params: {
    id: number;
  };
  selection: Image[];
  images: Image[];
  removeAlbumFromImage(image: Image, album: Album): void;
  updateEntry(entry: AlbumImage): void;
}

class AlbumComponent extends React.Component<AlbumProps, {
  show: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  public render() {
    if (!this.props.album) {
      return <span />;
    }

    return (
      <div>
        {this.state.show && (<AlbumView images={this.props.images} entries={this.props.entries}
          album={this.props.album}
          onClose={() => this.setState({show:false})}/>)}
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.props.album.name}
          <ImagesNav images={this.props.images}>
            <a onClick={this.handleRemoveFromAlbum.bind(this)}>
              <i className="fa fa-times" /><span className="min500"> {t("album.remove")}</span>
            </a>
            <a onClick={() => this.setState({show:true})}>Show</a>
          </ImagesNav>
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }

  private handleRemoveFromAlbum() {
    this.props.selection.forEach((image) => this.props.removeAlbumFromImage(image, this.props.album));
  }

  private handleMakeBig() {
    const entries = this.props.entries.filter((entry) => (this.props.selection.find((image) => image.id === entry.image_id)));

    entries.forEach((entry) => entry.big = !entry.big);

    entries.forEach((entry) => this.props.updateEntry(entry));
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    album: state.albums.find((album) => album.id === parseInt(ownProps.params.id, 10)),
    entries: state.album,
    images: state.images,
    selection: state.selection
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(loadAlbum(ownProps.params.id));
  return {
    removeAlbumFromImage: (image: Image, album: Album) => dispatch(removeAlbumFromImage(image, album)),
    updateEntry: (entry: AlbumImage) => dispatch(updateEntry(entry))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);
