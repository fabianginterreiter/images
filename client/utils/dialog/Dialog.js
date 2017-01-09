"use strict"

import React from 'react'
import DialogStore from './DialogStore'

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options:{}};
  }

  componentDidMount() {
    DialogStore.addChangeListener(this, (options) => (this.setState({options:options})));
  }

  componentWillUnmount() {
    DialogStore.removeChangeListener(this);    
  }

  handleCancel() {
    this.state.options.reject(false);
    DialogStore.setObject({});
  }

  handleOk() {
    this.state.options.resolve(true);
    DialogStore.setObject({});
  }

  render() {
    if (!this.state.options.open) {
      return (<span />);
    }

    var icon = null;

    if (this.state.options.icon) {
      icon = (<i className={this.state.options.icon} />);
    }

    return (
      <div>
        <div className="dimming" onClick={this.handleCancel.bind(this)} />
        <div className="dialog">
          <div className="title">
            {icon} 
            {this.state.options.title}
          </div>
          <div className="body">{this.state.options.text}</div>
          <div className="bottom">
            <button onClick={this.handleOk.bind(this)} className={this.state.options.type}>OK</button>
            <button onClick={this.handleCancel.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dialog;