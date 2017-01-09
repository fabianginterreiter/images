"use strict"

import React from 'react'

import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import ImagesNav from './components/ImagesNav'

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
    fetch('/api/tags/' + newProps.params.id).then((result) => result.json()).then((tag) => this.setState({tag:tag}));
  }

  handleEdit() {
    this.setState({
      edit: true
    });
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-tag" aria-hidden="true" /> {this.state.tag.name}
          <ImagesNav>
            <button onClick={this.handleEdit.bind(this)} className="primary">Edit</button>
          </ImagesNav>
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Tags;