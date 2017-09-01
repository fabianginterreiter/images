import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {removeAlbumFromImage} from "../actions";
import {Image, Album} from "../types";

interface AlbumsListProps {
  image: Image;
  hideEmptyList?: boolean;
  removeAlbumFromImage(image: Image, person: Album): void;
}

class AlbumsList extends React.Component<AlbumsListProps, {}> {
  public render() {
    if (this.props.hideEmptyList && this.props.image.albums.length === 0) {
      return <span />;
    }

    return (
      <div className="tags">
        <h4><i className="fa fa-users" aria-hidden="true" /> Albums</h4>
        <ul>
          {
            this.props.image.albums.map((album) => (<li key={album.id}>
              <Link to={`/images/albums/${album.id}`}>{album.name}</Link>
              <span className="badge">
                <i className="fa fa-times" aria-hidden="true" onClick={this.handleDeletePerson.bind(this, album)} />
              </span>
            </li>))
          }
        </ul>
      </div>
    );
  }

  private handleDeletePerson(album: Album) {
    this.props.removeAlbumFromImage(this.props.image, album);
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAlbumFromImage: (image: Image, album: Album) => dispatch(removeAlbumFromImage(image, album))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
