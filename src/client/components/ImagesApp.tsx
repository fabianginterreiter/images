import * as React from "react";
import NavigationsState from "../states/NavigationsState";
import UserState from "../states/UserState";
import ImagesStore from "../stores/ImagesStore";
import { Main, ScrollUp } from "../utils/Utils";
import DragAndDropUpload from "./DragAndDropUpload";
import Header from "./Header";
import Navigations from "./Navigations";
import OptionsPanel from "./options/OptionsPanel";
import Selection from "./selections/Selection";
import Uploader from "./Uploader";
import UsersManagement from "./UsersManagement";

interface ImagesAppProps {
  location: {
    pathname: string;
  };
}

export default class ImagesApp extends React.Component<ImagesAppProps, {}> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    NavigationsState.addChangeListener(this, this.handleNavigationChange.bind(this));
  }

  public componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
  }

  public render() {
    if (!UserState.getUser()) {
      return (<div>Not User</div>);
    }

    let contentClass = "content";
    let pinned = "";
    if (NavigationsState.getObject().pinned) {
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
