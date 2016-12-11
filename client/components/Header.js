var React = require('react');

var ThumbnailsResizer = require('../components/ThumbnailsResizer');
var Options = require('../components/Options');

var NavigationsState = require('../states/NavigationsState');
var UploadStore = require('../stores/UploadStore');

var $ = require("jquery");

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
            <li onClick={this.handleClick.bind(this)} className="btn">
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