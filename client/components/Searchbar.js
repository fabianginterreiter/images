"use strict"

import React from 'react'
import { browserHistory } from 'react-router'
import NavigationsState from '../states/NavigationsState'
import Title from './Title'

class Searchbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    browserHistory.push(`/images/search?s=${this.refs.search.value}`);
  }

  handleOpen() {
    this.setState({
      open: true
    });

    this.opened = true;
  }

  componentDidUpdate() {
    if (this.opened) {
      this.opened = false;
      console.log("Set Focus on Searchbar");
      this.refs.search.focus();
    }
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  renderBar() {
    if (!this.state.open) {
      return null;
    } 

    return (<div className="searchbar">
      <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
        <Title />
      </div>

      <nav>
        <ul className="form">
          <li className="info">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" ref="search" placeholder="Search" />
            </form>
          </li>
        </ul>

        <ul className="right">
          <li className="btn" onClick={this.handleClose.bind(this)}><i className="fa fa-times" /></li>
        </ul>
      </nav>
    </div>);
  }

  render() {
    return (
      <li>
        <span onClick={this.handleOpen.bind(this)}><i className="fa fa-search" /><span className="min500"> Search</span></span>

        {this.renderBar()}
      </li>
    );
  }
}

module.exports = Searchbar;