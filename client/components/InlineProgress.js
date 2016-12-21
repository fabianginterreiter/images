"use strict"

const React = require('react');

class InlineProgress extends React.Component {
  render() {
    return (
      <div className="inlineProgress">
        <div className="green" style={{width: this.props.progress + '%'}} />
      </div>
    );
  }
}

module.exports = InlineProgress;