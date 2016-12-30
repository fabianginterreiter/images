"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Albums extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    }
  }

  componentDidMount() {
    ImagesStore.load('/api/images?album=' + this.props.params.albumId);
    fetch('/api/albums/' + this.props.params.albumId).then((result) => result.json()).then((album) => this.setState({album:album}));
  }

  render() {
    return (
      <div>
        <h1>{this.state.album.name}</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Albums;