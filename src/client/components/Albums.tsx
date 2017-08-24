import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import NavigationsStore from "../stores/NavigationsStore";
import {Album} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit } from "../utils/Utils";
import * as ReactRedux from "react-redux";
import {sortAlbums, saveAlbum, deleteAlbum} from "../actions";

interface AlbumsProps {
  albums: Album[];
  sort(key:string, asc: boolean);
  save(album: Album);
  delete(album: Album);
}

interface AlbumsState {
  edit: number;
}

class Albums extends React.Component<AlbumsProps, AlbumsState> {
  constructor(props) {
    super(props);

    this.state = {
      edit: 0
    }
  }

  public render() {
    return (<div className="settings">
      <h1><i className="fa fa-book" aria-hidden="true" /> Albums</h1>

      <ExtendedTable columns={[
        {title: "Name", name: "name"},
        {title: "Images", name: "count", className: "option"},
        {title: "Public", className: "option"},
        {title: "Edit", className: "option"},
        {title: "Delete", className: "option"}]}
        data={this.props.albums}
        render={this._renderRow.bind(this)}
        order={this.order.bind(this)}
        name={"name"} asc={true} />
    </div>);
  }

  private handleEdit(album: Album) {
    this.setState({
      edit: album.id
    });
  }

  private handleChange(album: Album, value: string) {
    this.setState({
      edit: 0
    })

    if (album.name === value) {
      return this.forceUpdate();
    }

    album.name = value;

    this.props.save(album);
  }

  private handleVisibility(album: Album) {
    album.public = !album.public;
    this.props.save(album);
  }

  private handleCancel(album: Album) {
    this.setState({
      edit: 0
    })
  }

  private handleDelete(album: Album) {
    DialogStore.open("Delete Person", "Do you really want to delete the Album?")
    .then(() => this.props.delete(album));
  }

  private _renderText(album: Album) {
    if (album.id === this.state.edit) {
      return (<Quickedit
        value={album.name}
        onChange={(value) => this.handleChange(album, value)}
        onCancel={() => this.handleCancel(album)} />);
    }

    return (<Link to={`/images/albums/${album.id}`}>{album.name}</Link>);
  }

  private _renderRow(album) {
    return (<tr key={album.id}>
      <td>{this._renderText(album)}</td>
      <td>{album.count}</td>
      <td onClick={() => this.handleVisibility(album)} className="option">
        <input type="checkbox" defaultChecked={album.public} />
      </td>
      <td onClick={this.handleEdit.bind(this, album)} className="option"><i className="fa fa-pencil-square-o" /></td>
      <td onClick={this.handleDelete.bind(this, album)} className="option"><i className="fa fa-trash-o" /></td>
    </tr>);
  }

  private order(name, asc) {
    this.props.sort(name, asc);
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.albums
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (key:string, asc:boolean) => dispatch(sortAlbums(key, asc)),
    save: (album: Album) => dispatch(saveAlbum(album)),
    delete: (album: Album) => dispatch(deleteAlbum(album))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Albums);
