import * as React from "react";
import Ajax from "../libs/Ajax";
import ImagesStore from "../stores/ImagesStore";
import {Album, Image} from "../types/types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import {connect} from "react-redux";

interface AlbumProps {
  params: {
    albumId: number;
  };
  selection: Image[]
}

interface AlbumState {
  album: Album;
}

class AlbumComponent extends React.Component<AlbumProps, AlbumState> {

  constructor(props: AlbumProps) {
    super(props);

    this.state = {
      album: undefined
    };
  }

  public componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  public componentWillReceiveProps(newProps) {
    ImagesStore.load(`/api/images?album=${newProps.params.albumId}`);
    Ajax.get(`/api/albums/${newProps.params.albumId}`).then((album) => this.setState({album}));
  }

  public render() {
    if (!this.state.album) {
      return <span />;
    }

    return (
      <div>
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.state.album.name}
          <ImagesNav>
            <a onClick={this.handleRemoveFromAlbum.bind(this)}>
              <i className="fa fa-times" /><span className="min500"> Remove</span>
            </a>
          </ImagesNav>
        </h1>
        <Images />
      </div>
    );
  }

  private handleRemoveFromAlbum() {
    ImagesStore.deleteFromAlbum(this.props.selection, this.state.album).then(() => {
      ImagesStore.reload();
    });
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(AlbumComponent);
