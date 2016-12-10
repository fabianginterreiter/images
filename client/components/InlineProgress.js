var React = require('react');
var moment = require('moment');

class InlineProgress extends React.Component {
  render() {
    var date = moment(this.props.date);
    
    return (
      <div className="inlineProgress">
        <div className="green" style={{width: this.props.progress + '%'}} />
      </div>
    );
  }
}

module.exports = InlineProgress;