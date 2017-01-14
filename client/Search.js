"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'

class Search extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/search?s=' + this.props.location.query.s);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Search;