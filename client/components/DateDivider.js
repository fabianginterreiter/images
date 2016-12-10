var React = require('react');
var moment = require('moment');

class DateDivider extends React.Component {
  render() {
    var date = moment(this.props.date);
    
    return (
      <span onClick={this.props.onClick}>{date.format('DD MMM YYYY')}</span>
    );
  }
}

module.exports = DateDivider;