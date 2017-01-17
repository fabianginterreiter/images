"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import ImagesNav from './components/ImagesNav'
import{ Quickedit, DialogStore } from './utils/Utils'
import Ajax from './libs/Ajax'
import { browserHistory } from 'react-router'

class Tags extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tag: {},
      edit: false
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load('/api/images?tag=' + newProps.params.id);
    Ajax.get('/api/tags/' + newProps.params.id).then((tag) => this.setState({tag:tag}));
  }

  handleEdit() {
    this.setState({
      edit: true
    });
  }

  handleChange(value) {
    if (this.state.tag.name === value) {
      this.setState({
        edit: false
      })
    } else {
      this.state.tag.name = value;
      Ajax.put('/api/tags/' + this.state.tag.id, this.state.tag).then((tag) => {
        this.setState({
          tag:tag,
          edit:false
        });
      });
    }
  }

  renderTitle() {
    if (this.state.edit) {
      return (<Quickedit 
        value={this.state.tag.name} 
        onChange={this.handleChange.bind(this)} 
        onCancel={() => this.setState({edit:false})} />);
    }

    return this.state.tag.name;
  }

  handleDelete() {
    DialogStore.open('Delete Tag', 'Do you really want to delete the Tags?')
    .then((result) => Ajax.delete('/api/tags/' + this.state.tag.id)).then(() => {
      browserHistory.push('/images');
    }).catch((e) => console.log(e));
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-tag" aria-hidden="true" /> {this.renderTitle()}
          <ImagesNav>
            <a onClick={this.handleEdit.bind(this)} className="primary"><i className="fa fa-pencil-square-o" /><span className="min500"> Edit</span></a>
            <a onClick={this.handleDelete.bind(this)} className="warning"><i className="fa fa-trash-o" /><span className="min500"> Delete</span></a>
          </ImagesNav>
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Tags;