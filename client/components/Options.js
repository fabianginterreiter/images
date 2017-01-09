"use strict"

import React from 'react'
import $ from 'jquery'

import ThumbnailsResizer from '../components/ThumbnailsResizer'
import { location } from 'react-router'
import { Panel } from '../utils/Utils'
import UserState from '../states/UserState'
import ShowDateStore from '../stores/ShowDateStore'

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showDate: ShowDateStore.getObject()
    };
  }

  componentDidMount() {
    ShowDateStore.addChangeListener(this, () => this.forceUpdate());
  }

  componentWillUnmount() {
    ShowDateStore.removeChangeListener(this);
  }

  toggle() {
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
        <i className="fa fa-bars" onClick={this.toggle.bind(this)} />

        <Panel open={this.state.visible} clickCatcher={this.state.visible} onClickCatcherClick={this.toggle.bind(this)} side='right' header={true} footer={true}>
          <div className="title" onClick={this.toggle.bind(this)}>
            Settings
            <span className="badge"><i className="fa fa-bars" /></span>
          </div>

          <div className="body">
            <ul className="options">
              <li><a>Size: <ThumbnailsResizer /></a></li>
              <li><a><label><input type="checkbox" checked={ShowDateStore.getObject()} onChange={ShowDateStore.change.bind(ShowDateStore)} /> Show Dates</label></a></li>
            </ul>
          </div>

          <div className="footer">
            <div className="profile" onClick={UserState.clear.bind(UserState)}><i className="fa fa-user"></i> {UserState.getUser().name}</div>
          </div>
        </Panel>
      </li>
    );
  }
}

module.exports = Options;