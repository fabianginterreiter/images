"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Persons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      person: {}
    }
  }

  componentDidMount() {
    ImagesStore.load('/api/images?person=' + this.props.params.id);
    fetch('/api/persons/' + this.props.params.id).then((result) => result.json()).then((person) => this.setState({person:person}));
  }

  render() {
    return (
      <div>
        <h1>{this.state.person.name}</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Persons;