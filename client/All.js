"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class All extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/images');
  }

  render() {
    return (
      <Images date={false} />
    );
  }
}

module.exports = All;