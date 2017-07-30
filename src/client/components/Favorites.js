"use strict"

import * as React from 'react'
import Images from './Images'
import ImagesStore from '../stores/ImagesStore'
import ImagesNav from './ImagesNav'

class Favorites extends React.Component {

  componentDidMount() {
    return ImagesStore.load('/api/images?liked=true');
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-heart-o" aria-hidden="true" /> Favorites
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}

export default Favorites;
