"use strict"

import React from 'react'
import { browserHistory } from 'react-router'
import NavigationsState from '../states/NavigationsState'
import Title from './Title'
import { KeyUpListener } from '../utils/Utils'

class Searchbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      s: ''
    }
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);    
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) { //ESC
      this.setState({
        open:false
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    browserHistory.push(`/images/search?s=${this.refs.search.value}`);

    this.setState({
      open: false
    })
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

      this.refs.search.select();
    }
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleClickcatcherClick() {
    this.setState({
      open: false
    });
  }

  handleChange(e) {
    this.setState({
      s: e.target.value
    });
  }

  renderBar() {
    if (!this.state.open) {
      return null;
    } 

    return (
      <div>
        <div className="click" onClick={this.handleClickcatcherClick.bind(this)} />
        <div className="searchbar">
        
        <nav>
          <ul className="form">
            <li className="info">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref="search" placeholder="Search" value={this.state.s} onChange={this.handleChange.bind(this)} />
              </form>
            </li>
          </ul>

          <ul className="right">
            <li className="btn" onClick={this.handleClose.bind(this)}><i className="fa fa-times" /></li>
          </ul>
        </nav>
      </div>
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