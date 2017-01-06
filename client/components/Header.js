"use strict"

const React = require('react');
const Options = require('../components/Options');
const NavigationsState = require('../states/NavigationsState');
const UploadStore = require('../stores/UploadStore');
const $ = require("jquery");
const ImagesStore = require('../stores/ImagesStore');
const SelectionStore = require('../stores/SelectionStore');

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  handleSelectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
    ImagesStore.dispatch();
  }

  render() {
    return (
      <header>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <i className="icon-camera-retro"></i> Images
        </div>

        <nav>
          <ul className="right">
            <li onClick={this.handleSelectAll.bind(this)} className="btn"><i className="icon-check" /><span className="min500"> Select All</span></li>
            <li onClick={this.handleClick.bind(this)} className="btn">
              <input type="file" name="images" multiple="multiple" id="fileSelect" style={{display:'none'}} onChange={this.handleFileSelect.bind(this)} />
              <i className="icon-upload" /><span className="min500"> Upload</span>
            </li>
            <Options params={this.props.params} />
          </ul>
        </nav>
      </header>
    );
  }
}

module.exports = Header;