var React = require('react');

var ThumbnailsResizer = require('../components/ThumbnailsResizer');
var Options = require('../components/Options');

var NavigationsState = require('../states/NavigationsState');
var UploadStore = require('../stores/UploadStore');

var $ = require("jquery");

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

module.exports = Empty;