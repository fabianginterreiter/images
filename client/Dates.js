"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');
const moment = require('moment');

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

  renderTitle() {
    var date = moment().year(this.props.params.year);

    if (this.props.params.month) {
      date.month(this.props.params.month - 1);

      if (this.props.params.day) {
        date.date(this.props.params.day);
        return date.format('MMMM D. YYYY')
      }

      return date.format('MMMM YYYY');
    }
    
    return date.format('YYYY');
  }

  render() {
    return (
      <div>
        <h1>{this.renderTitle()}</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Dates;