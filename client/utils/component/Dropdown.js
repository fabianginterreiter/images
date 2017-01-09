"use strict"

import React from 'react'

class Dropdown extends React.Component {
  render() {
    if (!this.props.open) {
      return (<span />);
    }

    return (
      <div>
        <div className="click" onClick={this.props.onCancel} />
        <div className="menu">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Dropdown;