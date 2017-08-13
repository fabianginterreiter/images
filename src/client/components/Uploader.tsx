import ImagesStore from '../stores/ImagesStore';
import UploadStore from '../stores/UploadStore';
import * as React from 'react';
import { Modal, InlineProgress } from '../utils/Utils';
import {ExtendedFile} from "../types/types";

interface UploaderProps {

}

interface UploaderState {
  files: ExtendedFile[];
  started: boolean;
  uploads: boolean;
}

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      started: false,
      uploads: false
    };
  }

  componentDidMount() {
    UploadStore.addChangeListener(this, (files) => (this.setState({files:files})));
  }

  componentWillUnmount() {
    UploadStore.removeChangeListener(this);
  }

  handleStart() {
    UploadStore.upload();
    this.setState({
      started: true
    });
  }

  handleCancel() {
    this.setState({
      uploads: false
    });

    UploadStore.cancel();
    UploadStore.setObject([]);
  }

  handleOpen() {
    var images = [];

    this.state.files.forEach((file) => images.push(file.image));

    ImagesStore.setObject(images);
    UploadStore.setObject([]);
  }

  __renderButtons() {
    var buttons = [];

    if (!this.state.started) {
      buttons.push(<button key='UploadButton' onClick={this.handleStart.bind(this)}>Upload</button>)
      buttons.push(<button key='CancelButton' onClick={this.handleCancel.bind(this)}>Cancel</button>)
    } else {
      if (!UploadStore.isUploading()) {
        buttons.push(<button key='ShowButton' onClick={this.handleOpen.bind(this)}>Show</button>)
        buttons.push(<button key='CloseButton' onClick={this.handleCancel.bind(this)}>Close</button>)
      } else {
        buttons.push(<button key='CancelUploading' onClick={this.handleCancel.bind(this)}>Cancel</button>)
      }
    }

    return (<div className="bottom">{buttons}</div>)
  }

  render() {
    if (this.state.files.length === 0) {
      return (<span />);
    }

    var files = [];

    this.state.files.forEach((file) => {
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
      <Modal onCancel={this.handleCancel.bind(this)}>
        <div className="title">Upload</div>
        <div className="body">
          <ul>{files}</ul>
        </div>
        {this.__renderButtons()}
      </Modal>
    );
  }
}
