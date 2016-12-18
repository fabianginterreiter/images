var UploadStore = require('../stores/UploadStore');
var React = require('react');
var InlineProgress = require('./InlineProgress');

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  componentDidMount() {
    UploadStore.addChangeListener(this, (files) => (this.setState({files:files})));
  }

  componentWillUnmount() {
    UploadStore.removeChangelistener(this);
  }

  handleStart() {
    UploadStore.upload();
  }

  handleCancel() {
    this.setState({
      uploads: false
    });

    UploadStore.setObject([]);
  }

  render() {
    if (this.state.files.length === 0) {
      return (<span />);
    }

    var files = [];

    this.state.files.forEach(function(file) {
      if (file.error) {
        files.push(<li key={file.name}>{file.name} <span className="error">✘</span></li>);  
      } else if (file.complete) {
        files.push(<li key={file.name}>{file.name} <span className="success">✔</span></li>);
      } else if (file.started) {
        files.push(<li key={file.name}>{file.name} <InlineProgress progress={file.process} /></li>);
      } else {
        files.push(<li key={file.name}>{file.name}</li>);
      }
    });

    return (
      <div>
        <div className="dimming" />
        <div className="modal">
          <div className="title">Upload</div>
          <div className="body">
            <ul>{files}</ul>
          </div>
          <div className="bottom">
            <button onClick={this.handleStart.bind(this)}>Upload</button>
            <button onClick={this.handleCancel.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Uploader;