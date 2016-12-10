

  var React = require('react');
var moment = require('moment');

var InlineProgress = require('./InlineProgress');

var $ = require("jquery");

// http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously

var UploadStore = require('../stores/UploadStore');

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