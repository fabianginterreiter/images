"use strict"

import React from 'react'
import ImagesStore from '../stores/ImagesStore'
import SelectionStore from '../stores/SelectionStore'

class ImagesNav extends React.Component {
  handleSelectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
    ImagesStore.dispatch();
  }

  handleUnselectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.unselect(image)));
    ImagesStore.dispatch(); 
  }

  render() {
    return (
      <nav className="group">
        <button onClick={this.handleSelectAll.bind(this)}><i className="fa fa-check-square-o" /><span className="min500"> Select All</span></button>
        <button onClick={this.handleUnselectAll.bind(this)}><i className="fa fa-square-o" /><span className="min500"> Unselect All</span></button>
        {this.props.children}
      </nav>
    );
  }
}

module.exports = ImagesNav;