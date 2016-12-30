"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Albums extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/images?album=' + this.props.params.albumId);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Albums;