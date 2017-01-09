"use strict"

import React from 'react'
import UserState from '../states/UserState'
import { browserHistory } from 'react-router'

class Init extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initializing: true
    }
  }

  handleUserChange() {
    if (UserState.getUser()) {
      if (this.props.location.pathname.startsWith('/images')) {
        return;
      }
      
      browserHistory.push('/images');
    } else {
      browserHistory.push('/profiles');
    }
  }

  componentDidMount() {
    UserState.addChangeListener(this, this.handleUserChange.bind(this));

    UserState.load().then(function() {
      this.setState({
        initializing: false
      });
    }.bind(this));
  }

  componentWillUnmount() {
    UserState.removeChangeListener(this);
  }

  render() {
    if (this.state.initializing) {
      return (<span>Loading</span>);
    }

    if (this.props.location.pathname === '/') {
      this.handleUserChange();
    }

    return (
      <div>{this.props.children}</div>
    );
  }
}

module.exports = Init;