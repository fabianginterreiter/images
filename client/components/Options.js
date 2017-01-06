"use strict"

const React = require('react');
const $ = require("jquery");
const ThumbnailsResizer = require('../components/ThumbnailsResizer');
const location = require('react-router').location;
const Panel = require('../utils/Utils').Panel;
const UserState = require('../states/UserState');

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

  render() {
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
              
              <li><a>Size: <ThumbnailsResizer /></a></li>
            </ul>
          </div>

          <div className="footer">
            <div className="profile" onClick={UserState.clear.bind(UserState)}><i className="icon-user"></i> {UserState.getUser().name}</div>
          </div>
        </Panel>
      </li>
    );
  }
}

module.exports = Options;