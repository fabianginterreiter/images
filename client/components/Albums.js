"use strict"

import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Ajax from '../libs/Ajax'
import NavigationsStore from '../stores/NavigationsStore'
import { Quickedit, DialogStore, ExtendedTable } from '../utils/Utils'

class Albums extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    Ajax.get('/api/albums?own=true').then((albums) => this.setState({albums:albums}));
  }

  componentWillUnmount() {
  }

  handleEdit(album) {
    album.edit = true;
    this.forceUpdate();
  }

  handleChange(album, value) {
    album.edit = false;

    if (album.name === value) {
      return this.forceUpdate();
    }

    album.name = value;

    this.save(album);
  }

  save(album) {
    Ajax.put('/api/albums/' + album.id, album).then(() => this.forceUpdate());
  }

  handleVisibility(album) {
    album.public = !album.public;

    this.save(album);
  }

  handleCancel(album) {
    album.edit = false;
    this.forceUpdate();
  }

  handleDelete(album) {
    DialogStore.open('Delete Person', 'Do you really want to delete the Album?')
    .then(() => Ajax.delete('/api/albums/' + album.id)).then(() => {
      for (var index = 0; index < this.state.albums.length; index++) {
        if (this.state.albums[index].id === album.id) {
          this.state.albums.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    })
  }

  _renderText(album) {
    if (album.edit) {
      return (<Quickedit
        value={album.name}
        onChange={(value) => this.handleChange(album, value)}
        onCancel={() => this.handleCancel(album)} />);
    }

    return (<Link to={`/images/albums/${album.id}`}>{album.name}</Link>);
  }

  _renderRow(album) {
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

  order(name, asc) {
    var albums = this.state.albums.sort((a,b) => {
      if (a[name] < b[name]) {
        return asc ? -1 : 1;
      } else if (a[name] > b[name]) {
        return asc ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      albums:albums
    });
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-book" aria-hidden="true" /> Albums</h1>

      <ExtendedTable columns={[
        {title:'Name', name: 'name'},
        {title:'Images', name: 'count', className:'option'},
        {title:'Public', className:'option'},
        {title:'Edit', className:'option'},
        {title:'Delete', className:'option'}]} data={this.state.albums} render={this._renderRow.bind(this)} order={this.order.bind(this)} name={'name'} asc={true} />
    </div>);
  }
}

module.exports = Albums;
