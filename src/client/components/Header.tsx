import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import {addFilesToUploads, openNavigation, openOptionsPanel} from "../actions";
import Searchbar from "./Searchbar";
import Title from "./Title";
import {t, getLanguage} from "../libs/Translation";

interface HeaderProps {
  openNavigation(): void;
  openOptionsPanel(): void;
  addFilesToUploads(files): void;
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
            <span><i className="fa fa-cog" /><span className="min500"> {t("header.settings")}</span></span>
          </a>
          <a className="right" onClick={this.handleClick.bind(this)}>
            <input type="file" name="images" multiple={true} id="fileSelect"
              style={{display: "none"}} onChange={this.handleFileSelect.bind(this)} />
            <i className="fa fa-cloud-upload" /><span className="min500"> {t("header.upload")}</span>
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
    this.props.addFilesToUploads(event.target.files);
  }

  private handleOpenSettings() {
    this.props.openOptionsPanel();
  }
}

const mapStateToProps = (state) => {
  return {
    language: getLanguage(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNavigation: () => dispatch(openNavigation()),
    openOptionsPanel: () => dispatch(openOptionsPanel()),
    addFilesToUploads: (files) => dispatch(addFilesToUploads(files))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
