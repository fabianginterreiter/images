"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'

class Search extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/search?s=Fabian%20Tanja');
    console.log(this.params.query.s);
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = Search;