import * as $ from "jquery";
import * as React from "react";
import UploadStore from "../stores/UploadStore";
import Searchbar from "./Searchbar";
import Title from "./Title";
import * as ReactRedux from "react-redux";
import {openNavigation, openOptionsPanel} from "../actions";

interface HeaderProps {
  openNavigation():void;
  openOptionsPanel():void;
}

class Header extends React.Component<HeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <header>
        <div className="title" onClick={() => this.props.openNavigation()}>
          <Title />
        </div>

        <nav>
          <a className="right" onClick={this.handleOpenSettings.bind(this)}>
            <span><i className="fa fa-cog" /><span className="min500"> Settings</span></span>
          </a>
          <a className="right" onClick={this.handleClick.bind(this)}>
            <input type="file" name="images" multiple={true} id="fileSelect"
              style={{display: "none"}} onChange={this.handleFileSelect.bind(this)} />
            <i className="fa fa-cloud-upload" /><span className="min500"> Upload</span>
          </a>
          <Searchbar />
        </nav>
      </header>
    );
  }

  private handleClick() {
    $("#fileSelect").click();
  }

  private handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  private handleOpenSettings() {
    this.props.openOptionsPanel();
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavigation: () => dispatch(openNavigation()),
    openOptionsPanel: () => dispatch(openOptionsPanel())
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header);
