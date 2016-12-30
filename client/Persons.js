"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Persons extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/images?person=' + this.props.params.id);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Persons;