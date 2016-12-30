"use strict"

const React = require('react');

const Images = require('./components/Images');
const ImagesStore = require('./stores/ImagesStore');

class Tags extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tag: {}
    }
  }

  componentDidMount() {
    ImagesStore.load('/api/images?tag=' + this.props.params.id);
    fetch('/api/tags/' + this.props.params.id).then((result) => result.json()).then((tag) => this.setState({tag:tag}));
  }

  render() {
    return (
      <div>
        <h1>{this.state.tag.name}</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Tags;