import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"
import ImagesNav from "./ImagesNav"
import SelectionStore from "../stores/SelectionStore"
import Ajax from "../libs/Ajax"
import {Album} from "../types/types"

interface AlbumProps {
  params: {
    albumId: number;
  };
}

interface AlbumState {
  album: Album;
}

export default class AlbumComponent extends React.Component<AlbumProps, AlbumState> {

  constructor(props: AlbumProps) {
    super(props);

    this.state = {
      album: undefined
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load("/api/images?album=" + newProps.params.albumId);
    Ajax.get("/api/albums/" + newProps.params.albumId).then((album) => this.setState({album:album}));
  }

  handleRemoveFromAlbum() {
    ImagesStore.deleteFromAlbum(SelectionStore.getSelected(), this.state.album).then(() => {
      ImagesStore.reload();
    });
  }

  render() {
    if (!this.state.album) {
      return <span />
    }

    return (
      <div>
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.state.album.name}
          <ImagesNav>
            <a onClick={this.handleRemoveFromAlbum.bind(this)}><i className="fa fa-times" /><span className="min500"> Remove</span></a>
          </ImagesNav>
        </h1>
        <Images />
      </div>
    );
  }
}
