"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Tags extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/images?tag=' + this.props.params.id);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Tags;