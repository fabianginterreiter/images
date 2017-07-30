"use strict"

import React from 'react'
import Images from './Images'
import ImagesStore from '../stores/ImagesStore'
import ImagesNav from './ImagesNav'
import { DialogStore } from '../utils/Utils'
import SelectionStore from '../stores/SelectionStore'

class Trash extends React.Component {
  componentDidMount() {
    ImagesStore.load('/api/images?trash=true');
  }

  handleClear() {
    DialogStore.open('Delete Images', 'Do you really want to delete all selected images?', {
      type: 'danger'
    }).then((result) => {
      if (result) {
        fetch('/api/trash/clear', {
          method: "DELETE",
          credentials: 'include'
        }).then(() => {
        });
      }
    });
  }

  handleRevert() {
    var promises = [];

    ImagesStore.getObject().forEach((image) => {
      if (SelectionStore.isSelected(image)) {
        promises.push(ImagesStore.revert(image));
      }
    });

    Promise.all(promises).then(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-trash-o"/> Trash
          <ImagesNav>
            <button className="danger" onClick={this.handleClear.bind(this)}><i className="fa fa-times-circle" aria-hidden="true"/><span className="min500"> Clear</span></button>
            <button className="success" onClick={this.handleRevert.bind(this)}><i className="fa fa-undo" aria-hidden="true" /><span className="min500"> Revert</span></button>
          </ImagesNav>
        </h1>
        <Images options={{
          hideLike:true,
          hideFullscreen:true
        }} />
      </div>
    );
  }
}

module.exports = Trash;
