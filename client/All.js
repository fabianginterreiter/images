"use strict"

import React from 'react'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'

class All extends React.Component {

  componentDidMount() {
    ImagesStore.load('/api/images');
  }

  render() {
    return (
      <Images />
    );
  }
}

module.exports = All;