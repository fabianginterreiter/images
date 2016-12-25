"use strict"

const React = require('react');
const $ = require("jquery");
const Link = require('react-router').Link;
const Quickedit = require('./Quickedit');
const DialogStore = require('../stores/DialogStore');
const NavigationsStore = require('../stores/NavigationsStore');

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    fetch('/api/tags').then((result) => result.json()).then((tags) => this.setState({tags:tags}));
  }

  componentWillUnmount() {
  }

  handleEdit(tag) {
    tag.edit = true;
    this.forceUpdate();
  }

  handleChange(tag, value) {
    tag.edit = false;

    if (tag.name === value) {
      return this.forceUpdate();
    }

    tag.name = value;

    fetch('/api/tags/' + tag.id, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify(tag),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.forceUpdate();
    });
  }

  handleCancel(tag) {
    tag.edit = false;
    this.forceUpdate();
  }

  handleDelete(tag) {
    DialogStore.open('Delete Tag', 'Do you really want to delete the Tags?').then((result) => {
      if (result) {
        fetch('/api/tags/' + tag.id, {
          method: "DELETE",
          credentials: 'include'
        }).then(() => {
          for (var index = 0; index < this.state.tags.length; index++) {
            if (this.state.tags[index].id === tag.id) {
              this.state.tags.splice(index, 1);
              break;
            }
          }
          this.forceUpdate();
          NavigationsStore.load();
        });
      }
    });
  }

  _renderText(tag) {
    if (tag.edit) {
      return (<Quickedit 
        value={tag.name} 
        onChange={(value) => this.handleChange(tag, value)} 
        onCancel={() => this.handleCancel(tag)} />);
    }

    return (<Link to={`/images/tags/${tag.id}`}>{tag.name}</Link>);
  }

  render() {
    return (<div className="settings">
      <h1>Tags</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="option">Edit</th>
            <th className="option">Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tags.map((tag) => (<tr key={tag.id}>
            <td>{this._renderText(tag)}</td>
            <td onClick={this.handleEdit.bind(this, tag)} className="option"><i className="icon-cog" /></td>
            <td onClick={this.handleDelete.bind(this, tag)} className="option"><i className="icon-trash" /></td>
          </tr>))}
        </tbody>
      </table>
    </div>);
  }
}

module.exports = Tags;