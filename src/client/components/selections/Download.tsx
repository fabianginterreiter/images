import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import { location } from "react-router";
import {addAlbum, addAlbumToImage, addTag, addTagToImage, removeAlbumFromImage, removeTag} from "../../actions";
import Ajax from "../../libs/Ajax";
import {Album, Image, Person, Tag} from "../../types";
import { Dropdown, OptionsList, SelectDialogStore, SingleSelectDialogStore } from "../../utils/Utils";

interface DownloadState {
  visible: boolean;
}

class Download extends React.Component<{
  selection: Image[];
}, DownloadState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    return (
      <div onClick={this.toggle.bind(this)} className="right">
        <span><i className="fa fa-download" aria-hidden="true" /> <span className="min500"> Download</span></span>
        <Dropdown open={this.state.visible} onCancel={this.close.bind(this)}>
          <ul className="options">
            <li><a onClick={() => this.handleDownload()}>Original Size</a></li>
            <li className="divider" />
            <li><a onClick={() => this.handleDownloadResize(1920)}>1920</a></li>
            <li><a onClick={() => this.handleDownloadResize(1200)}>1200</a></li>
          </ul>
        </Dropdown>
      </div>
    );
  }

  private toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  private close() {
    this.setState({
      visible: false
    });
  }

  private handleDownload() {
    const ids = this.props.selection.map((image) => image.id).join("+");
    window.location.href = `/api/download/images/${ids}`;
  }

  private handleDownloadResize(max: number) {
    const ids = this.props.selection.map((image) => image.id).join("+");
    window.location.href = `/api/download/images/${ids}?width=${max}&height=${max}`;
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  };
};

export default connect(mapStateToProps)(Download);
