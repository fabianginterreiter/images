"use strict"

const React = require('react');

const $ = require("jquery");

const OptionsList = require('./OptionsList');
const Dropdown = require('./Dropdown');
const ImagesStore = require('../stores/ImagesStore');
const SelectionStore = require('../stores/SelectionStore');
const ThumbnailsResizer = require('../components/ThumbnailsResizer');

const location = require('react-router').location;

const Panel = require('../utils/Utils').Panel;

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  toggle() {
    console.log("jetzt");

    this.setState({
      visible: !this.state.visible
    });
  }

  close() {
    this.setState({
      visible: false
    });
  }

  handleSelectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
    ImagesStore.dispatch();
    this.close();
  }

  render() {
    this.selected = !SelectionStore.isEmpty();

    return (
      <li className="btn">


        <i className="icon-reorder" onClick={this.toggle.bind(this)} />

        <Panel open={this.state.visible} clickCatcher={this.state.visible} onClickCatcherClick={this.toggle.bind(this)} side='right'>
          <div className="title" onClick={this.toggle.bind(this)}>
            Settings
            <span className="badge"><i className="icon-reorder" /></span>
          </div>

          <div className="body">
            <ul className="options">
              <li onClick={this.handleSelectAll.bind(this)}><a>Select All</a></li>
              <li><a>Size: <ThumbnailsResizer /></a></li>
            </ul>
          </div>

          <div className="footer" />

        </Panel>
      </li>
    );
  }
}

module.exports = Options;