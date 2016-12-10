var React = require('react');

var $ = require("jquery");

// http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously

var UploadStore = require('../stores/UploadStore');

class Upload extends React.Component {
  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  render() {
    return (
      <span>
        <input type="file" name="images" multiple="multiple" id="fileSelect" style={{visibility:'hidden'}} onChange={this.handleFileSelect.bind(this)} />
        <button onClick={this.handleClick.bind(this)}>Upload</button>
      </span>
    );
  }
}

module.exports = Upload;