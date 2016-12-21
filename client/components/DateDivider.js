"use strict"

const React = require('react');
const moment = require('moment');

class DateDivider extends React.Component {
  render() {
    var date = moment(this.props.date);
    
    return (
      <span onClick={this.props.onClick} className="dateText">{date.format('DD MMM YYYY')}</span>
    );
  }
}

module.exports = DateDivider;