"use strict"

import * as React from 'react'
import NavigationsState from '../states/NavigationsState'
import UserState from '../states/UserState'
import Uploader from './Uploader'
import DragAndDropUpload from './DragAndDropUpload'
import ImagesStore from '../stores/ImagesStore'
import Header from './Header'
import UsersManagement from './UsersManagement'
import Navigations from './Navigations'
import Selection from './selections/Selection'
import { Main, ScrollUp } from '../utils/Utils'
import OptionsPanel from './options/OptionsPanel'

class ImagesApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this, this.handleNavigationChange.bind(this));
  }

  componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
  }

  handleNavigationChange() {
    this.forceUpdate();
  }

  render() {
    if (!UserState.getUser()) {
      return (<div>Not User</div>);
    }

    var contentClass = 'content';
    var pinned = '';
    if (NavigationsState.getObject().pinned) {
      contentClass += ' pinned';
      pinned = 'pinned';
    }


    return (
      <div>
        <Navigations location={this.props.location} />
        <OptionsPanel />

        <div className={contentClass}>
          <Selection className={pinned} params={this.props.params}  />
          <Header params={this.props.params} />
          <div className="main">
            {this.props.children}
          </div>
        </div>

        <Uploader />
        <DragAndDropUpload />
        <Main />

        <ScrollUp />
      </div>
    );
  }
};

export default ImagesApp;
