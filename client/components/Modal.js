"use strict"

const React = require('react');
const Utils = require('../utils/Utils');

class Modal extends React.Component {
  componentDidMount() {
    Utils.KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    Utils.KeyUpListener.removeChangeListener(this);    
  }

  handleKeyUp(event) {
    if (this.props.onCancel && event.keyCode === 27) { //ESC
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div>
        <div className="dimming" />
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Modal;