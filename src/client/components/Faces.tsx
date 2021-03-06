import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {addPersonToImage, removePersonToImage} from "../actions";
import { Image, Person } from "../types";
import { AutoComplete } from "../utils/Utils";

interface FacesProps {
  image: Image;
  style: {
    height: number;
    width: number;
  };
  show: boolean;
  addPersonToImage(image: Image, person: Person): void;
  removePersonToImage(image: Image, person: Person): void;
}

interface FacesState {
  selection: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  create: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  startX?: number;
  startY?: number;
}

class Faces extends React.Component<FacesProps, FacesState> {

  private offsetLeft: number;
  private offsetTop: number;
  private startTime: number;

  constructor(props: FacesProps) {
    super(props);

    this.state = {
      create: null,
      selection: null
    };
  }

  public render() {
    const className = "faces" + (this.props.show || this.state.create || this.state.selection ? " show" : "") + (this.state.selection ? " top" : "");

    return (
      <div className={className} style={this.props.style}
        onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}>
        {this._renderSelection()}
        {this._renderCreate()}
        {this._renderPersons()}
      </div>
    );
  }

  private getMousePosition(event) {
    return {
      x: event.clientX - this.offsetLeft,
      y: event.clientY - this.offsetTop,
    };
  }

  private handleMouseDown(event) {
    if (this.state.selection || this.state.create) {

      if (event.target.className.includes("resizer")) {
        // console.log("RESIZER");
      }

      return;
    }

    this.offsetLeft = event.target.offsetLeft;
    this.offsetTop = event.target.offsetTop;

    this.startTime = new Date().getTime();

    const position = this.getMousePosition(event);

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

  private handleMouseMove(event) {
    if (!this.state.selection) {
      if (event.target.className.includes("resizer")) {
        // console.log("RESIZER");
      }

      return;
    }

    const position = this.getMousePosition(event);

    const width = Math.max(position.x, this.state.startX) - Math.min(position.x, this.state.startX);
    const height = Math.max(position.y, this.state.startY) - Math.min(position.y, this.state.startY);
    const length = Math.max(width, height);
    const x = this.state.startX < position.x ? this.state.startX : this.state.startX - length;
    const y = this.state.startY < position.y ? this.state.startY : this.state.startY - length;

    this.setState({
      selection: {
        left: x,
        top: y,
        width: length,
        height: length
      }
    });
  }

  private handleMouseUp(event) {
    event.preventDefault();

    if (!this.state.selection) {
      if (event.target.className.includes("resizer")) {
        // console.log("RESIZER");
      }

      return;
    }

    const time = new Date().getTime() - this.startTime;

    if (time < 300) {
      return this.setState({
        selection: null
      });
    }

    const selection = this.state.selection;

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

  private _renderSelection() {
    if (!this.state.selection) {
      return (<span />);
    }

    return (<div className="face"><div className="border borderCreate" style={this.state.selection} /></div>);
  }

  private _renderCreate() {
    if (!this.state.create) {

      return (<span />);
    }

    const style = {
      top: (this.state.create.top + this.state.create.height + 10) + "px",
      left: this.state.create.left + "px"
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
           <AutoComplete service="/api/persons" onSelect={this.handleAddPerson.bind(this)}
           ignore={this.props.image.persons} placeholder="Add Person"
           onBlur={this.handleCancelCreation.bind(this)} focus={true} />
        </div>
      </div>);
  }

  private handleCancelCreation() {
    this.setState({
      create: null,
      selection: null
    });
  }

  private _renderPersons() {
    const persons = [];

    this.props.image.persons.forEach((person) => persons.push(this._renderPerson(person)));

    return persons;
  }

  private _renderPerson(person: Person) {
    const style = {
      top: person._pivot_top + "%",
      left: person._pivot_left + "%",
      width: person._pivot_width + "%",
      height: person._pivot_height + "%"
    };

    const style2 = {
      top: (this.props.style.height * (((person._pivot_top) + (person._pivot_height)) / 100) + 10) + "px",
      left: (person._pivot_left) + "%",
    };

    return (<div key={person.id} className="face">
      <Link to={`/images/persons/${person.id}`}><div className="border s" style={style}><div /></div></Link>
      <div style={style2} className="name">
        <Link to={`/images/persons/${person.id}`}>{person.name}</Link>&nbsp;
        <span className="remove"><i className="fa fa-times"
          onClick={(e) => this.handleDeletePerson(e, person)} /></span>
      </div>
    </div>);
  }

  private handleAddPerson(person: Person) {
    const object = {
      top: (this.state.create.top / this.props.style.height * 100),
      left: (this.state.create.left / this.props.style.width * 100),
      width: (this.state.create.width / this.props.style.width * 100),
      height: (this.state.create.height / this.props.style.height * 100),
      id: person.id,
      name: person.name
    };

    this.props.addPersonToImage(this.props.image, object);

    this.setState({
      create: null
    });
  }

  private handleDeletePerson(e, person: Person) {
    e.preventDefault();
    this.props.removePersonToImage(this.props.image, person);
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPersonToImage: (image: Image, person: Person) => dispatch(addPersonToImage(image, person)),
    removePersonToImage: (image: Image, person: Person) => dispatch(removePersonToImage(image, person))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Faces);
