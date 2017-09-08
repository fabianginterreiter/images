import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import {deleteImage, like, loadMoreImages, setView, toggle, unlike} from "../actions";
import {Image, Service} from "../types";
import { DialogStore, KeyUpListener, OptionsList, Panel, ResizeListener } from "../utils/Utils";
import Faces from "./Faces";
import ImageDetails from "./ImageDetails";
import Like from "./Like";

interface FullscreenProps {
  images: Image[];
  size: number;
  number: number;
  view: number;
  service: Service;
  reload: boolean;
  toggle(image: Image): void;
  isSelected(image: Image): boolean;
  like(image: Image): void;
  unlike(image: Image): void;
  deleteImage(image: Image): void;
  setView(index: number): void;
  loadMoreImages(service: Service): void;
}

interface FullscreenState {
  show: boolean;
  menu: boolean;
  style: {
    width: number;
    height: number;
    left: number;
  };
}

class Fullscreen extends React.Component<FullscreenProps, FullscreenState> {
  private timeout;

  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      show: false,
      style: {
        height: 0,
        left: 0,
        width: 0
      }
    };
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleImageLoad.bind(this));
    $("body").css("overflow", "hidden");
    this._show();
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);
    $("body").css("overflow", "auto");
    clearTimeout(this.timeout);
  }

  public render() {
    if (this.props.view < 0) {
      return <span />;
    }

    const image = this.props.images[this.props.view];

    let titleClass = "title";

    if (this.state.show) {
      titleClass += " show";
    }

    let checkBoxClass = null;
    if (this.props.isSelected(image)) {
        checkBoxClass = "fa fa-check-square-o";
      } else {
        checkBoxClass = "fa fa-square-o";
      }

    return (
      <div className="fullscreen" onMouseMove={this.handleMouseMove.bind(this)}>
        <img ref="image" src={`/show/${image.path}`}
          alt={image.filename} onLoad={this.handleImageLoad.bind(this)} />
        <Faces style={this.state.style} image={image} show={this.state.show} />
        {this.props.number !== 1 && <div className="previous turning" onClick={() => this.handlePrevious()}><i className="fa fa-chevron-left" aria-hidden="true" /></div>}
        {this.props.number !== this.props.size && <div className="next turning" onClick={() => this.handleNext()}><i className="fa fa-chevron-right" aria-hidden="true" /></div>}
        <div className={titleClass}>
          <div onClick={() => this.handleClose()} className="close">✕</div>
          {this.getTitle(image)} ({this.props.number}/{this.props.size})
          <div className="options">
            <Like image={image} />
            <i className={checkBoxClass} onClick={() => this.props.toggle(image)} />
            <a href={`/org/${image.path}`} download={image.filename}>
              <i className="fa fa-download" aria-hidden="true" />
            </a>
            <i className="fa fa-bars" onClick={this.toggleMenu.bind(this)} />
          </div>
        </div>

        <ImageDetails image={image} handleClosePanel={this.toggleMenu.bind(this)} visible={this.state.menu} />
      </div>
    );
  }

  private getTitle(image: Image) {
    if (image.title === image.filename) {
      return image.title;
    } else {
      return `${image.title} (${image.filename})`;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    const image = this.props.images[this.props.view];

    switch (e.keyCode) {
      case 32: { // space
        this._show();
        if (image.liked) {
          this.props.unlike(image);
        } else {
          this.props.like(image);
        }
        break;
      }

      case 66: { // b
        this._show();
        this.props.toggle(image);
        break;
      }

      case 27: {
        this.handleClose();
        break;
      }

      case 37: {
        this.handlePrevious();
        break;
      }

      case 39: {
        this.handleNext();
        break;
      }

      case 79: { // o
        this.setState({
          menu: !this.state.menu
        });
        break;
      }
    }
  }

  private handleClose() {
    this.props.setView(-1);
  }

  private handleNext() {
    if (this.props.view < this.props.images.length - 1) {
      this.props.setView(this.props.view + 1);

      if (this.props.view === this.props.images.length - 5) {
        this.loadMore();
      }
    }
  }

  private handlePrevious() {
    if (this.props.view > 0) {
      this.props.setView(this.props.view - 1);
    }
  }

  private _hide() {
    if (this.state.menu) {
      return;
    }

    this.setState({
      show: false
    });
  }

  private handleMouseMove() {
    this._show();
  }

  private _show() {
    this.setState({
      show: true
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this._hide.bind(this), 1000);
  }

  private toggleMenu() {
    if (this.state.menu) {
      this._hide();
      this.setState({
        menu: false
      });
    } else {
      this.setState({
        show: true,
        menu: true
      });
    }
  }

  private loadMore() {
    if (this.props.reload) {
      this.props.loadMoreImages(this.props.service);
    }
  }

  private handleImageLoad() {
    const img = this.refs.image as HTMLImageElement;
    this.setState({
      style: {
        width: img.width,
        height: img.height,
        left: img.offsetLeft
      }
    });
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images,
    reload: state.service.reload,
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0,
    view: state.fullscreen,
    service: state.service,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreImages: (service: Service) => dispatch(loadMoreImages(service)),
    deleteImage: (image: Image) => dispatch(deleteImage(image)),
    toggle: (image: Image) => dispatch(toggle(image)),
    like: (image: Image) => dispatch(like(image)),
    unlike: (image: Image) => dispatch(unlike(image)),
    setView: (index: number) => dispatch(setView(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fullscreen);
