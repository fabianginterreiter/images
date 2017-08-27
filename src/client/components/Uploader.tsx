import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import UploadStore from "../stores/UploadStore";
import {ExtendedFile, Image} from "../types/types";
import { InlineProgress, Modal } from "../utils/Utils";
import {connect} from "react-redux";
import {cancelUpload, setImages, setUploadError, setUploadStart,
  setUploadComplete, setUploadProgress} from "../actions";

interface UploaderState {
  started: boolean;
  uploads: boolean;
}

class Uploader extends React.Component<{
  files: ExtendedFile[];
  cancelUpload(): void;
  setImages(images: Image[]): void;
  setUploadError(file: ExtendedFile): void;
  setUploadStart(file: ExtendedFile): void;
  setUploadComplete(file: ExtendedFile, image: Image): void;
  setUploadProgress(file: ExtendedFile, progress: number): void;
}, UploaderState> {
  private uploader: UploadStore = new UploadStore();

  constructor(props) {
    super(props);

    this.state = {
      started: false,
      uploads: false
    };
  }

  public render() {
    if (this.props.files.length === 0) {
      return (<span />);
    }

    let files = [];

    this.props.files.forEach((file) => {
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

  private handleStart() {
    this.uploader.setErrorHandler(this.props.setUploadError);
    this.uploader.setStartedHandler(this.props.setUploadStart);
    this.uploader.setCompleteHandler(this.props.setUploadComplete);
    this.uploader.setProgressHandler(this.props.setUploadProgress);

    this.uploader.upload(this.props.files);
    this.setState({
      started: true
    });
  }

  private handleCancel() {
    this.setState({
      uploads: false
    });

    this.uploader.cancel();
    this.props.cancelUpload();
  }

  private handleOpen(): void {
    this.props.setImages(this.props.files.map((file) => file.image));
  }

  private __renderButtons() {
    let buttons = [];

    if (!this.state.started) {
      buttons.push(<button key="UploadButton" onClick={this.handleStart.bind(this)}>Upload</button>);
      buttons.push(<button key="CancelButton" onClick={this.handleCancel.bind(this)}>Cancel</button>);
    } else {
      if (!this.uploader.isUploading()) {
        buttons.push(<button key="ShowButton" onClick={this.handleOpen.bind(this)}>Show</button>);
        buttons.push(<button key="CloseButton" onClick={this.handleCancel.bind(this)}>Close</button>);
      } else {
        buttons.push(<button key="CancelUploading" onClick={this.handleCancel.bind(this)}>Cancel</button>);
      }
    }

    return (<div className="bottom">{buttons}</div>);
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.uploads.files,
    status: state.uploads.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelUpload: () => dispatch(cancelUpload()),
    setImages: (images: Image[]) => dispatch(setImages(images)),
    setUploadError: (file: ExtendedFile) => dispatch(setUploadError(file)),
    setUploadStart: (file: ExtendedFile) => dispatch(setUploadStart(file)),
    setUploadComplete: (file: ExtendedFile, image: Image) => dispatch(setUploadComplete(file, image)),
    setUploadProgress: (file: ExtendedFile, progress: number) => dispatch(setUploadProgress(file, progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
