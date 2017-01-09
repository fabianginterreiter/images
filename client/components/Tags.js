"use strict"

import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import{ Quickedit, DialogStore } from '../utils/Utils'
import NavigationsStore from '../stores/NavigationsStore'
import Ajax from '../libs/Ajax'

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    Ajax.get('/api/tags').then((tags) => this.setState({tags:tags}));
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

    Ajax.put('/api/tags/' + tag.id, tag).then(() => {
      this.forceUpdate();
    });
  }

  handleCancel(tag) {
    tag.edit = false;
    this.forceUpdate();
  }

  handleDelete(tag) {
    DialogStore.open('Delete Tag', 'Do you really want to delete the Tags?')
    .then((result) => Ajax.delete('/api/tags/' + tag.id)).then(() => {
      for (var index = 0; index < this.state.tags.length; index++) {
        if (this.state.tags[index].id === tag.id) {
          this.state.tags.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    }).catch((e) => console.log(e));
  }

  _renderText(tag) {
    if (tag.edit) {
      return (<Quickedit 
        value={tag.name} 
        onChange={(value) => this.handleChange(tag, value)} 
        onCancel={() => this.handleCancel(tag)} />);
    }

    return (<Link to={`/images/tags/${tag.id}`}>{tag.name} ({tag.count})</Link>);
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-tags" aria-hidden="true" /> Tags</h1>
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
            <td onClick={this.handleEdit.bind(this, tag)} className="option"><i className="fa fa-pencil-square-o" /></td>
            <td onClick={this.handleDelete.bind(this, tag)} className="option"><i className="fa fa-trash-o" /></td>
          </tr>))}
        </tbody>
      </table>
    </div>);
  }
}

module.exports = Tags;