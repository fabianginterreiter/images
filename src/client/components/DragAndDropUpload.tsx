import * as React from 'react'
import * as $ from 'jquery'
import UploadStore from '../stores/UploadStore'

interface DragAndDropUploadState {
  over: boolean;
}

export default class DragAndDropUpload extends React.Component<{}, DragAndDropUploadState> {
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

  private preventDefault(event) {
    event.preventDefault();
  }

  private handleDrop(e) {
    e.preventDefault();
    UploadStore.setFiles(e.dataTransfer.files);
    this.setState({
      over: false
    });
  }

  render() {
    if (!this.state.over) {
      return <span />;
    } else {
      return (<div className="drag" onDragOver={this.preventDefault} onDrop={this.handleDrop.bind(this)} />);
    }
  }
}
