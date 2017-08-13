import * as $ from "jquery";
import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import NavigationsStore from "../stores/NavigationsStore";
import {Album} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit, sort } from "../utils/Utils";

interface AlbumsState {
  albums: Album[];
}

export default class Albums extends React.Component<{}, AlbumsState> {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }

  public componentDidMount() {
    Ajax.get("/api/albums?own=true").then((albums) => this.setState({albums}));
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
        data={this.state.albums}
        render={this._renderRow.bind(this)}
        order={this.order.bind(this)}
        name={"name"} asc={true} />
    </div>);
  }

  private handleEdit(album: Album) {
    album.edit = true;
    this.forceUpdate();
  }

  private handleChange(album: Album, value: string) {
    album.edit = false;

    if (album.name === value) {
      return this.forceUpdate();
    }

    album.name = value;

    this.save(album);
  }

  private save(album: Album) {
    Ajax.put(`/api/albums/${album.id}`, album).then(() => this.forceUpdate());
  }

  private handleVisibility(album: Album) {
    album.public = !album.public;
    this.save(album);
  }

  private handleCancel(album: Album) {
    album.edit = false;
    this.forceUpdate();
  }

  private handleDelete(album: Album) {
    DialogStore.open("Delete Person", "Do you really want to delete the Album?")
    .then(() => Ajax.delete(`/api/albums/${album.id}`)).then(() => {
      for (let index = 0; index < this.state.albums.length; index++) {
        if (this.state.albums[index].id === album.id) {
          this.state.albums.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    });
  }

  private _renderText(album: Album) {
    if (album.edit) {
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
      <td onClick={this.handleVisibility.bind(this, album)} className="option">
        <input type="checkbox" checked={album.public} />
      </td>
      <td onClick={this.handleEdit.bind(this, album)} className="option"><i className="fa fa-pencil-square-o" /></td>
      <td onClick={this.handleDelete.bind(this, album)} className="option"><i className="fa fa-trash-o" /></td>
    </tr>);
  }

  private order(name, asc) {
    sort(this.state.albums, name, asc).then((albums) => this.setState({
      albums
    }));
  }
}
