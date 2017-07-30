"use strict"

import React from 'react'
import $ from 'jquery'

import ThumbnailsResizer from '../ThumbnailsResizer'
import { location } from 'react-router'
import { Panel } from '../../utils/Utils'
import UserState from '../../states/UserState'
import OptionsStore from '../../stores/OptionsStore'
import ShowDateStore from '../../stores/ShowDateStore'

class OptionsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    OptionsStore.addChangeListener(this, () => (this.forceUpdate()));
  }

  componentWillUnmount() {
    OptionsStore.removeChangeListener(this);    
  }

  close() {
    OptionsStore.setObject(false);
  }

  render() {
    return (
        <Panel open={OptionsStore.getObject()} clickCatcher={OptionsStore.getObject()} onClickCatcherClick={this.close.bind(this)} side='right' header={true} footer={true}>
          <div className="title" onClick={this.close.bind(this)}>
            Settings
            <span className="badge"><i className="fa fa-cog" /></span>
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
    );
  }
}

module.exports = OptionsPanel;