import * as React from "react"
import * as $ from "jquery"
import UploadStore from "../stores/UploadStore"

export default class Empty extends React.Component<{}, {}> {

  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  render() {
    return (
      <div className="empty" onClick={this.handleClick.bind(this)}>
        <input type="file" name="images" multiple={true} id="fileSelect" style={{display:"none"}} onChange={this.handleFileSelect.bind(this)} />
        <i className="icon-upload" /> Upload
      </div>
    );
  }
};
