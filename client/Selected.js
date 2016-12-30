"use strict"

const React = require('react');

const history = require('react-router').browserHistory;

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');
const SelectionStore = require('./stores/SelectionStore');

class Selected extends React.Component {

  componentDidMount() {
    if (SelectionStore.isEmpty()) {
      history.push('/images');
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