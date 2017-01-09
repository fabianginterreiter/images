"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import ImagesNav from './components/ImagesNav'

class Albums extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load('/api/images?album=' + newProps.params.albumId);
    fetch('/api/albums/' + newProps.params.albumId).then((result) => result.json()).then((album) => this.setState({album:album}));
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.state.album.name}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Albums;