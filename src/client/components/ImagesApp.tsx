import * as React from "react";
import * as ReactRedux from "react-redux";
import {setImages} from "../actions";
import {setWidth} from "../actions";
import { Main, ResizeListener, ScrollUp } from "../utils/Utils";
import DragAndDropUpload from "./DragAndDropUpload";
import Fullscreen from "./Fullscreen";
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
  pinned: boolean;
  width: number;
  isLoggedIn(): boolean;
  isFullscreen(): boolean;
  setWidth(width: number): boolean;
}

class ImagesApp extends React.Component<ImagesAppProps, {}> {
  private resizeTimer;
  private pinned: boolean;

  constructor(props) {
    super(props);

    this.pinned = props.pinned;
  }

  public componentDidMount() {
    this.props.setWidth(document.getElementById("main").clientWidth);
    ResizeListener.addChangeListener(this, this.handleResize.bind(this));
  }

  public componentWillUnmount() {
    ResizeListener.removeChangeListener(this);
  }

  public componentWillReceiveProps(props) {
    this.handleNavigationChange();

    if (this.pinned !== props.pinned) {
      this.handleResize();
    }

    this.pinned = props.pinned;
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
          <div className="main" id="main">
            {this.props.children}
          </div>
        </div>

        <Uploader />
        <DragAndDropUpload />
        <Main />
        {this.props.isFullscreen() && <Fullscreen />}
        <ScrollUp />
      </div>
    );
  }

  private handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      const container = document.getElementById("main");
      if (!container) {
        return;
      }
      const width: number = container.clientWidth;

      if (width !== this.props.width && width) {
        this.props.setWidth(width);
      }
    }, 300);
  }

  private handleNavigationChange() {
    this.forceUpdate();
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: () => state.session !== null,
    pinned: state.view.pinned,
    isFullscreen: () => state.fullscreen >= 0,
    width: state.view.width
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWidth: (width: number) => dispatch(setWidth(width))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ImagesApp);
