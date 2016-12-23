"use strict"

const React = require('react');
const ThumbnailsResizer = require('../components/ThumbnailsResizer');
const Options = require('../components/Options');
const NavigationsState = require('../states/NavigationsState');
const UploadStore = require('../stores/UploadStore');
const $ = require("jquery");
const AutoComplete = require('./AutoComplete');

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
    var width = Math.abs(position.x - this.state.startX);
    var height = Math.abs(position.y - this.state.startY);

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

    let style = {
      top: (this.state.create.top + this.state.create.height) + 'px',
      left: (this.state.create.left + this.state.create.width / 2 - 100) + 'px',
      background: 'green',
      width: '200px',
      height: '20px',
      position: 'absolute'
    };

    return (
      <div>
        <div className="face" style={this.state.create} />
        <div style={style}>
           <AutoComplete service='/api/tags' onSelect={this.handleAddPerson.bind(this)} ignore={this.props.image.tags} placeholder='Add Person' />
        </div>
      </div>);
  }

  _renderPersons() {
    var persons = [];

    if (!this.props.image.persons || !this.props.show) {
      return persons;
    }

    this.props.image.persons.forEach((person) => persons.push(this._renderPerson(person)))

    return persons;
  }

  _renderPerson(person) {
    var style = {
      top: person.top + '%',
      left: person.left + '%',
      width: person.width + '%',
      height: person.height + '%'
    }

    let style2 = {
      top: (person.top + person.height) + '%',
      left: (person.left) + '%',
      background: 'green',
      width: '200px',
      height: '20px',
      position: 'absolute',
      textAlign: 'left'
    };

    return (<div>
      <div className="face" style={style} />
      <div style={style2}>{person.name}</div>
    </div>);
  }

  handleAddPerson(person) {
    var object = {
      top: (this.state.create.top / this.props.style.height * 100),
      left: (this.state.create.left / this.props.style.width * 100),
      width: (this.state.create.width / this.props.style.width * 100),
      height: (this.state.create.height / this.props.style.height * 100),
      id: person.id,
      name: person.name
    }

    if (!this.props.image.persons) {
      this.props.image.persons = [];
    }

    this.props.image.persons.push(object);

    this.setState({
      create: null
    });
  }

  render() {
    return (
      <div className="faces" style={this.props.style} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}>
        {this._renderSelection()}
        {this._renderCreate()}
        {this._renderPersons()}
      </div>
    );
  }
}

module.exports = Faces;