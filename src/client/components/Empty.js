"use strict"

import * as React from 'react'
import * as $ from 'jquery'
import UploadStore from '../stores/UploadStore'

class Empty extends React.Component {

  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  render() {
    return (
      <div className="empty" onClick={this.handleClick.bind(this)}>
        <input type="file" name="images" multiple="multiple" id="fileSelect" style={{display:'none'}} onChange={this.handleFileSelect.bind(this)} />
        <i className="icon-upload" /> Upload
      </div>
    );
  }
}

export default Empty;
