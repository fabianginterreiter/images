import * as $ from "jquery";
import {Component} from "react";
import OptionsStore from "../stores/OptionsStore";
import UploadStore from "../stores/UploadStore";
import Searchbar from "./Searchbar";
import Title from "./Title";
import {connect} from "react-redux";
import {openNavigation} from "../actions";

interface HeaderProps {
  openNavigation():void;
}

class Header extends Component<HeaderProps, {}> {
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
    OptionsStore.setObject(true);
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavigation: () => dispatch(openNavigation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
