"use strict"

const React = require('react');

const Images = require('./Images');
const DialogStore = require('../stores/DialogStore');
const SelectionStore = require('../stores/SelectionStore');
const ImagesStore = require('../stores/ImagesStore');

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
        <h1><i className="icon-trash"/> Trash</h1>
        <button className="danger" onClick={this.handleClear.bind(this)}>Clear</button>
        <button className="success" onClick={this.handleRevert.bind(this)}>Revert</button>
        <Images location={this.props.location} />
      </div>
    );
  }
}

module.exports = Trash;