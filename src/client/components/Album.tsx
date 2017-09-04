import * as React from "react";
import {connect} from "react-redux";
import {loadImages, removeAlbumFromImage} from "../actions";
import Ajax from "../libs/Ajax";
import {Album, Image} from "../types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import {t} from "../libs/Translation";

interface AlbumProps {
  album: Album;
  params: {
    id: number;
  };
  selection: Image[];
  images: Image[];
  removeAlbumFromImage(image: Image, album: Album): void;
}

class AlbumComponent extends React.Component<AlbumProps, {}> {
  public render() {
    if (!this.props.album) {
      return <span />;
    }

    return (
      <div>
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.props.album.name}
          <ImagesNav images={this.props.images}>
            <a onClick={this.handleRemoveFromAlbum.bind(this)}>
              <i className="fa fa-times" /><span className="min500"> {t("album.remove")}</span>
            </a>
          </ImagesNav>
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }

  private handleRemoveFromAlbum() {
    this.props.selection.forEach((image) => this.props.removeAlbumFromImage(image, this.props.album));
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    album: state.albums.find((album) => album.id === parseInt(ownProps.params.id, 10)),
    images: state.images,
    selection: state.selection
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(loadImages(`/api/images?album=${ownProps.params.id}`));
  return {
    removeAlbumFromImage: (image: Image, album: Album) => dispatch(removeAlbumFromImage(image, album))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);
