"use strict"

const React = require('react');

const Images = require('./Images');
const DialogStore = require('../stores/DialogStore');

class Trash extends React.Component {
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

  render() {
    return (
      <div>
        <h1>Trash</h1>
        <button className="danger" onClick={this.handleClear.bind(this)}>Clear</button>
        <Images location={this.props.location} />
      </div>
    );
  }
}

module.exports = Trash;