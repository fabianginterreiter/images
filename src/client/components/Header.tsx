import * as React from "react"
import * as $ from "jquery"
import UploadStore from "../stores/UploadStore"
import Title from "./Title"
import Searchbar from "./Searchbar"
import NavigationsState from "../states/NavigationsState"
import OptionsStore from "../stores/OptionsStore"

export default class Header extends React.Component<{},{}> {
  constructor(props) {
    super(props);
  }

  private handleClick() {
    $("#fileSelect").click();
  }

  private handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  private handleOpenSettings() {
    OptionsStore.setObject(true);
  }

  render() {
    return (
      <header>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <Title />
        </div>

        <nav>
          <a className="right" onClick={this.handleOpenSettings.bind(this)}>
            <span><i className="fa fa-cog" /><span className="min500"> Settings</span></span>
          </a>
          <a className="right" onClick={this.handleClick.bind(this)}>
            <input type="file" name="images" multiple={true} id="fileSelect" style={{display:"none"}} onChange={this.handleFileSelect.bind(this)} />
            <i className="fa fa-cloud-upload" /><span className="min500"> Upload</span>
          </a>
          <Searchbar />
        </nav>
      </header>
    );
  }
};
