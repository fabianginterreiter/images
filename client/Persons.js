"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import ImagesNav from './components/ImagesNav'

class Persons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      person: {}
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load('/api/images?person=' + newProps.params.id);
    fetch('/api/persons/' + newProps.params.id).then((result) => result.json()).then((person) => this.setState({person:person}));
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-user" aria-hidden="true" /> {this.state.person.name}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Persons;