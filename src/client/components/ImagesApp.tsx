import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import { Main, ScrollUp } from "../utils/Utils";
import DragAndDropUpload from "./DragAndDropUpload";
import Header from "./Header";
import Navigations from "./Navigations";
import OptionsPanel from "./options/OptionsPanel";
import Selection from "./selections/Selection";
import Uploader from "./Uploader";
import UsersManagement from "./UsersManagement";
import * as ReactRedux from "react-redux";
import {setImages} from "../actions";

interface ImagesAppProps {
  location: {
    pathname: string;
  };
  pinned: boolean;
  isLoggedIn(): boolean;
}

class ImagesApp extends React.Component<ImagesAppProps, {}> {
  constructor(props) {
    super(props);
  }

  public componentWillReceiveProps(props) {
    this.handleNavigationChange();
  }

  public render() {
    if (!this.props.isLoggedIn()) {
      return (<div>Not User</div>);
    }

    let contentClass = "content";
    let pinned = "";
    if (this.props.pinned) {
      contentClass += " pinned";
      pinned = "pinned";
    }

    return (
      <div>
        <Navigations location={this.props.location} />
        <OptionsPanel />

        <div className={contentClass}>
          <Selection />
          <Header />
          <div className="main">
            {this.props.children}
          </div>
        </div>

        <Uploader />
        <DragAndDropUpload />
        <Main />

        <ScrollUp />
      </div>
    );
  }

  private handleNavigationChange() {
    this.forceUpdate();
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: () => state.session !== null,
    pinned: state.view.pinned
  }
}

export default ReactRedux.connect(mapStateToProps)(ImagesApp);
