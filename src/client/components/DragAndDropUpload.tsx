import * as $ from "jquery";
import * as React from "react";
import UploadStore from "../stores/UploadStore";

interface DragAndDropUploadState {
  over: boolean;
}

export default class DragAndDropUpload extends React.Component<{}, DragAndDropUploadState> {
  constructor(props) {
    super(props);

    this.state = {
      over: false
    };
  }

  public componentDidMount() {
    $(window).on("dragover dragenter", function() {
      this.setState({
        over: true
      });
    }.bind(this));
  }

  public render() {
    if (!this.state.over) {
      return <span />;
    } else {
      return (<div className="drag" onDragOver={this.preventDefault} onDrop={this.handleDrop.bind(this)} />);
    }
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
}
