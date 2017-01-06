"use strict"

const React = require('react');

class Title extends React.Component {
  render() {
    return (
      <span><i className="fa fa-camera-retro" aria-hidden="true" /> Images</span>
    );
  }
}

module.exports = Title;