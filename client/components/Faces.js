"use strict"

const React = require('react');
const ThumbnailsResizer = require('../components/ThumbnailsResizer');
const Options = require('../components/Options');
const NavigationsState = require('../states/NavigationsState');
const UploadStore = require('../stores/UploadStore');
const $ = require("jquery");

class Faces extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: null
    }
  }

  getMousePosition(event) {
    return {
      x: event.clientX - this.offsetLeft,
      y: event.clientY - this.offsetTop,
    }
  }

  handleMouseDown(event) {
    if (this.state.selection || this.state.create) {
      return;
    }

    this.offsetLeft = event.target.offsetLeft;
    this.offsetTop = event.target.offsetTop

    var position = this.getMousePosition(event);

    this.setState({
      startX: position.x,
      startY: position.y,

      selection: {
        left: position.x,
        top: position.y,
        width: 0,
        height: 0
      }
    });
  }

  handleMouseMove(event) {
    if (!this.state.selection) {
      return;
    }

    var position = this.getMousePosition(event);

    var x = Math.min(position.x, this.state.startX);
    var y = Math.min(position.y, this.state.startY);
    var width = Math.max(position.x, this.state.startX) - x;
    var height = Math.max(position.y, this.state.startY) - y;

    this.setState({
      selection: {
        left: x,
        top: y,
        width: Math.max(width, height),
        height: Math.max(width, height)
      }
    });
  }

  handleMouseUp(event) {
    event.preventDefault();

    if (!this.state.selection) {
      return;
    }

    var selection = this.state.selection;

    this.setState({
      selection: null,
      create: {
        top: selection.top,
        left: selection.left,
        width: selection.width,
        height: selection.height
      }
    });
  }

  _renderSelection() {
    if (!this.state.selection) {
      return (<span />);
    }

    return (<div className="face" style={this.state.selection} />);
  }

  _renderCreate() {
    if (!this.state.create) {
      return (<span />);
    }

    return (<div className="face" style={this.state.create} />);
  }

  render() {
    return (
      <div className="faces" style={this.props.style} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}>
        {this._renderSelection()}
        {this._renderCreate()}
      </div>
    );
  }
}

module.exports = Faces;