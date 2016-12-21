"use strict"

const React = require('react');
const ThumbnailsResizer = require('../components/ThumbnailsResizer');
const Options = require('../components/Options');
const NavigationsState = require('../states/NavigationsState');
const UploadStore = require('../stores/UploadStore');
const $ = require("jquery");

class Header extends React.Component {
  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  render() {
    return (
      <header>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <i className="icon-camera-retro"></i> Images
        </div>

        <nav>
          <ul className="right">
            <li className="btn"><ThumbnailsResizer /></li>
            <li onClick={this.handleClick.bind(this)} className="btn min500">
              <input type="file" name="images" multiple="multiple" id="fileSelect" style={{display:'none'}} onChange={this.handleFileSelect.bind(this)} />
              <i className="icon-upload" /> Upload
            </li>
            <Options />
          </ul>
        </nav>
      </header>
    );
  }
}

module.exports = Header;