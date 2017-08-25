import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions";
import Ajax from "../libs/Ajax";
import ImagesStore from "../stores/ImagesStore";
import {Album, Image} from "../types/types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

interface AlbumProps {
  album: Album;
  params: {
    albumId: number;
  };
  selection: Image[];
  images: Image[];
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
          <ImagesNav>
            <a onClick={this.handleRemoveFromAlbum.bind(this)}>
              <i className="fa fa-times" /><span className="min500"> Remove</span>
            </a>
          </ImagesNav>
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }

  private handleRemoveFromAlbum() {
    ImagesStore.deleteFromAlbum(this.props.selection, this.props.album).then(() => {
      ImagesStore.reload();
    });
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);
