import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import {openNavigation, openOptionsPanel, addFilesToUploads} from "../actions";

class Empty extends React.Component<{
  addFilesToUploads(files): void;
}, {}> {
  public render() {
    return (
      <div className="empty" onClick={this.handleClick.bind(this)}>
        <input type="file" name="images" multiple={true} id="fileSelect"
          style={{display: "none"}} onChange={this.handleFileSelect.bind(this)} />
        <i className="icon-upload" /> Upload
      </div>
    );
  }

  private handleClick() {
    $("#fileSelect").click();
  }

  private handleFileSelect(event) {
    this.props.addFilesToUploads(event.target.files);
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

export default connect(mapStateToProps, mapDispatchToProps)(Empty);
