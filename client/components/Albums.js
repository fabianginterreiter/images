"use strict"

const React = require('react');
const $ = require("jquery");
const Link = require('react-router').Link;
const Quickedit = require('../utils/Utils').Quickedit;
const DialogStore = require('../utils/Utils').DialogStore;
const NavigationsStore = require('../stores/NavigationsStore');
const Ajax = require('../libs/Ajax');

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
    }).catch((e) => console.log(e));
  }

  _renderText(album) {
    if (album.edit) {
      return (<Quickedit 
        value={album.name} 
        onChange={(value) => this.handleChange(album, value)} 
        onCancel={() => this.handleCancel(album)} />);
    }

    return (<Link to={`/images/albums/${album.id}`}>{album.name} ({album.count})</Link>);
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-book" aria-hidden="true" /> Albums</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="option">Public</th>
            <th className="option">Edit</th>
            <th className="option">Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.albums.map((album) => (<tr key={album.id}>
            <td>{this._renderText(album)}</td>
            <td onClick={this.handleVisibility.bind(this, album)} className="option">
              <input type="checkbox" checked={album.public} />
            </td>
            <td onClick={this.handleEdit.bind(this, album)} className="option"><i className="fa fa-pencil-square-o" /></td>
            <td onClick={this.handleDelete.bind(this, album)} className="option"><i className="fa fa-trash-o" /></td>
          </tr>))}
        </tbody>
      </table>
    </div>);
  }
}

module.exports = Albums;