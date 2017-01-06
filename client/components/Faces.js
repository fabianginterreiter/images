"use strict"

const React = require('react');
const ThumbnailsResizer = require('../components/ThumbnailsResizer');
const Options = require('../components/Options');
const NavigationsState = require('../states/NavigationsState');
const UploadStore = require('../stores/UploadStore');
const $ = require("jquery");
const AutoComplete = require('../utils/Utils').AutoComplete;
const ImagesStore = require('../stores/ImagesStore');
const Link = require('react-router').Link;

class Faces extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: null,
      create: null
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

      if (event.target.className.includes('resizer')) {
        console.log("RESIZER");


      }

      return;
    }

    this.offsetLeft = event.target.offsetLeft;
    this.offsetTop = event.target.offsetTop

    this.startTime = new Date().getTime();

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
      if (event.target.className.includes('resizer')) {
        console.log("RESIZER");
      }

      return;
    }

    var position = this.getMousePosition(event);


    var width = Math.max(position.x, this.state.startX) - Math.min(position.x, this.state.startX);
    var height = Math.max(position.y, this.state.startY) - Math.min(position.y, this.state.startY);
    var length = Math.max(width, height);
    var x = this.state.startX < position.x ? this.state.startX : this.state.startX - length;
    var y = this.state.startY < position.y ? this.state.startY : this.state.startY - length;

    this.setState({
      selection: {
        left: x,
        top: y,
        width: length,
        height: length
      }
    });
  }

  handleMouseUp(event) {
    event.preventDefault();

    if (!this.state.selection) {
      if (event.target.className.includes('resizer')) {
        console.log("RESIZER");
      }

      return;
    }

    var time = new Date().getTime() - this.startTime;

    if (time < 300) {
      return this.setState({
        selection: null
      })
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

    return (<div className="face"><div className="border borderCreate" style={this.state.selection} /></div>);
  }

  _renderCreate() {
    if (!this.state.create) {
      
      return (<span />);
    }

    let style = {
      top: (this.state.create.top + this.state.create.height + 10) + 'px',
      left: this.state.create.left + 'px'
    };

    return (
      <div className="face">
        <div className="clickCatcher" onClick={this.handleCancelCreation.bind(this)} />
        <div className="border borderCreate" style={this.state.create}>
          <div className="resizer top" />
          <div className="resizer bottom" />
          <div className="resizer left" />
          <div className="resizer right" />
        </div>
        <div className="field" style={style}>
           <AutoComplete service='/api/persons' onSelect={this.handleAddPerson.bind(this)} ignore={this.props.image.tags} placeholder='Add Person' onBlur={this.handleCancelCreation.bind(this)} focus={true} />
        </div>
      </div>);
  }

  handleCancelCreation() {
    this.setState({
      create:null,
      selection:null
    });
  }

  _renderPersons() {
    var persons = [];

    this.props.image.persons.forEach((person) => persons.push(this._renderPerson(person)))

    return persons;
  }

  _renderPerson(person) {
    var style = {
      top: person._pivot_top + '%',
      left: person._pivot_left + '%',
      width: person._pivot_width + '%',
      height: person._pivot_height + '%'
    }

    let style2 = {
      top: (this.props.style.height * (((person._pivot_top) + (person._pivot_height))/100) + 10) + 'px',
      left: (person._pivot_left) + '%',
    };

    return (<div key={person.id} className="face">
      <Link to={`/images/persons/${person.id}`}><div className="border s" style={style}><div /></div></Link>
      <div style={style2} className="name">
        <Link to={`/images/persons/${person.id}`}>{person.name}</Link>&nbsp;
        <span className="remove"><i className="icon-remove" onClick={(e) => this.handleDeletePerson(e, person)} /></span>
      </div>
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

    ImagesStore.addPerson(this.props.image, object);

    this.setState({
      create: null
    });
  }

  handleDeletePerson(e, person) {
    e.preventDefault();
    ImagesStore.deletePerson(this.props.image, person);
  }

  render() {
    var className = 'faces' + (this.props.show || this.state.create || this.state.selection ? ' show' : '');

    return (
      <div className={className} style={this.props.style} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}>
        {this._renderSelection()}
        {this._renderCreate()}
        {this._renderPersons()}
      </div>
    );
  }
}

module.exports = Faces;