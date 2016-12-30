"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Dates extends React.Component {

  componentDidMount() {
    var url = '/api/images';
    if (this.props.params.year) {
      url += '?year=' + this.props.params.year;

      if (this.props.params.month) {
        url += '&month=' + this.props.params.month;

        if (this.props.params.day) {
          url += '&day=' + this.props.params.day;
        }
      }
    }

    ImagesStore.load(url);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Dates;