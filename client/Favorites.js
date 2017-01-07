"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');
const ImagesNav = require('./components/ImagesNav');

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

module.exports = Favorites;