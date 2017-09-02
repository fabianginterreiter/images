import * as $ from "jquery";
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router";
import {connect} from "react-redux";
import {toggle} from "../actions";
import {deleteImage, like, unlike} from "../actions/images";
import {Image} from "../types";
import { DialogStore, KeyUpListener, OptionsList, Panel, ResizeListener } from "../utils/Utils";
import Faces from "./Faces";
import Like from "./Like";
import PersonsList from "./PersonsList";
import TagsList from "./TagsList";
import AlbumsList from "./AlbumsList";

interface FullscreenProps {
  image: Image;
  size: number;
  number: number;
  previous(): void;
  next(): void;
  handleClose(): void;
  toggle(image: Image): void;
  isSelected(image: Image): boolean;
  like(image: Image): void;
  unlike(image: Image): void;
  deleteImage(image: Image): void;
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
    let titleClass = "title";

    if (this.state.show) {
      titleClass += " show";
    }

    const options = [{
        key: "delete",
        type: "action",
        name: "Delete"
      }];

    let checkBoxClass = null;
    if (this.props.isSelected(this.props.image)) {
        checkBoxClass = "fa fa-check-square-o";
      } else {
        checkBoxClass = "fa fa-square-o";
      }

    return (
      <div className="fullscreen" onMouseMove={this.handleMouseMove.bind(this)}>
        <img ref="image" src={`/show/${this.props.image.path}`}
          alt={this.props.image.filename} onLoad={this.handleImageLoad.bind(this)} />
        <Faces style={this.state.style} image={this.props.image} show={this.state.show} />
        {this.props.number !== 1 && <div className="previous turning" onClick={this.props.previous}><i className="fa fa-chevron-left" aria-hidden="true" /></div>}
        {this.props.number !== this.props.size && <div className="next turning" onClick={this.props.next}><i className="fa fa-chevron-right" aria-hidden="true" /></div>}
        <div className={titleClass}>
          <div onClick={this.props.handleClose} className="close">✕</div>
          {this.props.image.title} ({this.props.number}/{this.props.size})
          <div className="options">
            <Like image={this.props.image} />&nbsp;
            <i className={checkBoxClass} onClick={() => this.props.toggle(this.props.image)} />
            <i className="fa fa-bars" onClick={this.toggleMenu.bind(this)} />
            <a href={`/org/${this.props.image.path}`} download={this.props.image.filename}>
              <i className="fa fa-download" aria-hidden="true" />
            </a>
          </div>
        </div>
        <Panel open={this.state.menu} clickCatcher={this.state.menu}
          side="right" onClickCatcherClick={this.toggleMenu.bind(this)} header={true}>
          <div className="title">
          </div>
          <div className="body">
            <div>Filename: {this.props.image.filename}</div>
            <div>Resolution: {this.props.image.width}/{this.props.image.height}</div>
            <div>Date: <Link to={`/images/dates/${moment(this.props.image.date).format("YYYY/MM/DD")}`}>{moment(this.props.image.date).format("YYYY MMMM DD HH:mm:ss")}</Link></div>

            <OptionsList values={options} onClick={this.handleClick.bind(this)} />
            <TagsList image={this.props.image} />
            <PersonsList image={this.props.image} hideEmptyList={true} />
            <AlbumsList image={this.props.image} hideEmptyList={true} />
          </div>
        </Panel>
      </div>
    );
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    switch (e.keyCode) {
      case 32: { // space
        this._show();
        if (this.props.image.liked) {
          this.props.unlike(this.props.image);
        } else {
          this.props.like(this.props.image);
        }
        break;
      }

      case 66: { // b
        this._show();
        this.props.toggle(this.props.image);
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

  private handleClick(option) {
    switch (option.key) {
      case "delete": {
        DialogStore.open("Delete Image", "Do you really want to delete the image?")
        .then(() => this.props.deleteImage(this.props.image));
        break;
      }
    }
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
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteImage: (image: Image) => dispatch(deleteImage(image)),
    toggle: (image: Image) => dispatch(toggle(image)),
    like: (image: Image) => dispatch(like(image)),
    unlike: (image: Image) => dispatch(unlike(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fullscreen);
