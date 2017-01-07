"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');
const ImagesNav = require('./components/ImagesNav');

class Albums extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load('/api/images?album=' + newProps.params.albumId);
    fetch('/api/albums/' + newProps.params.albumId).then((result) => result.json()).then((album) => this.setState({album:album}));
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-book" aria-hidden="true" /> {this.state.album.name}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}

module.exports = Albums;