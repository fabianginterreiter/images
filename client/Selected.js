"use strict"

import React from 'react'
import { browserHistory } from 'react-router'
import Images from './components/Images'
import ImagesStore from './stores/ImagesStore'
import SelectionStore from './stores/SelectionStore'

class Selected extends React.Component {

  componentDidMount() {
    if (SelectionStore.isEmpty()) {
      browserHistory.push('/images');
    }

    ImagesStore.setObject(SelectionStore.getSelected());
  }

  render() {
    return (
      <div>
        <h1><i className="icon-check" /> Selection</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Selected;