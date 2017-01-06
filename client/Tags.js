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
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load('/api/images?tag=' + newProps.params.id);
    fetch('/api/tags/' + newProps.params.id).then((result) => result.json()).then((tag) => this.setState({tag:tag}));
  }

  render() {
    return (
      <div>
        <h1><i className="fa fa-tags" aria-hidden="true" /> {this.state.tag.name}</h1>
        <Images />
      </div>
    );
  }
}

module.exports = Tags;