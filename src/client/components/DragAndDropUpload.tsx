import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import {addFilesToUploads, openNavigation, openOptionsPanel} from "../actions";

interface DragAndDropUploadState {
  over: boolean;
}

class DragAndDropUpload extends React.Component<{
  addFilesToUploads(files): void;
}, DragAndDropUploadState> {
  constructor(props) {
    super(props);

    this.state = {
      over: false
    };
  }

  public componentDidMount() {
    $(window).on("dragover dragenter", () => {
      this.setState({
        over: true
      });
    });
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
    this.props.addFilesToUploads(e.dataTransfer.files);
    this.setState({
      over: false
    });
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFilesToUploads: (files) => dispatch(addFilesToUploads(files))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDropUpload);
