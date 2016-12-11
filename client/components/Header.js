var React = require('react');

var ThumbnailsResizer = require('../components/ThumbnailsResizer');
var Options = require('../components/Options');

var NavigationsState = require('../states/NavigationsState');

var $ = require("jquery");

class Header extends React.Component {
  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  handleOptions() {

  }

  render() {
    return (
      <header>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <i className="icon-camera-retro"></i> Images
        </div>

        <nav>
          <ul className="left">
            <li><ThumbnailsResizer /></li>
          </ul>

          <ul className="right">
            <li onClick={this.handleClick.bind(this)}>
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