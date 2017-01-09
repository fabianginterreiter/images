"use strict"

import React from 'react'
import $ from 'jquery'
import UploadStore from '../stores/UploadStore'

class DragAndDropUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      over: false
    }
  }

  componentDidMount() {
    $(window).on('dragover dragenter', function() {
      this.setState({
        over: true
      })
    }.bind(this));
  }

   preventDefault(event) {
    event.preventDefault();
  }

  handleDrop(e) {
    e.preventDefault();
    UploadStore.setFiles(e.dataTransfer.files);
    this.setState({
      over: false
    });
  };

  render() {
    if (!this.state.over) {
      return (
        <span>
        </span>
      );  
    } else {
      return (<div className="drag" onDragOver={this.preventDefault} onDrop={this.handleDrop.bind(this)} />);
    }
  }
}

module.exports = DragAndDropUpload;