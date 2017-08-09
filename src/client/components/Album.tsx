import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"
import ImagesNav from "./ImagesNav"
import SelectionStore from "../stores/SelectionStore"
import Ajax from "../libs/Ajax"
import * as types from "../types/types"

interface AlbumParamProps {
  readonly albumId: number;
}

interface AlbumProps {
  readonly params: AlbumParamProps;
}

interface AlbumState {
  readonly album: types.Album;
}

export default class Album extends React.Component<AlbumProps, AlbumState> {

  constructor(props) {
    super(props);

    this.state = {
      album: {
        name: undefined
      }
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
    ImagesStore.deleteFromAlbum(SelectionStore.getSelected(), {id:this.props.params.albumId}).then(() => {
      ImagesStore.reload();
    });
  }

  render() {
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
