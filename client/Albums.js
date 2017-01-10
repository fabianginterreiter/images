"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import ImagesNav from './components/ImagesNav'
import SelectionStore from './stores/SelectionStore'

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
            <a onClick={this.handleRemoveFromAlbum.bind(this)}>Remove</a>
          </ImagesNav>
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Albums;