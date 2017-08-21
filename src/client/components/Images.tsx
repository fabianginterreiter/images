import * as $ from "jquery";
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router";
import ImagesStore from "../stores/ImagesStore";
import SelectionStore from "../stores/SelectionStore";
import {Image} from "../types/types";
import {KeyUpListener, ResizeListener, ScrollListener} from "../utils/Utils";
import Empty from "./Empty";
import Fullscreen from "./Fullscreen";
import ImageComponent from "./ImageComponent";
import Like from "./Like";
import * as ReactRedux from "react-redux";

interface ImagesProps {
  options?: {
    hideFullscreen: boolean;
    hideLike: boolean;
  };
  thumbnailsSize: number;
  showDate: boolean;
  pinned: boolean;
}

interface ImagesState {
  images: Image[];
  view: number;
  width: number;
  size: number;
}

class Images extends React.Component<ImagesProps, ImagesState> {
  private lastSelection: number;
  private width: number;
  private resizeTimer;

  constructor(props: ImagesProps) {
    super(props);

    this.state = {
      images: [],
      size: this.props.thumbnailsSize,
      view: -1,
      width: -1
    };

    this.lastSelection = -1;
  }

  public componentDidMount() {
    ImagesStore.addChangeListener(this, (images) => this.setState({images}));
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleResize.bind(this));
    SelectionStore.addChangeListener(this, () => this.forceUpdate());
    ScrollListener.addChangeListener(this, this.handleScroll.bind(this));

    this.width = document.getElementById("container").clientWidth;
  }

  componentWillReceiveProps(props) {
    this.handleResize();
  }

  public componentWillUnmount() {
    ImagesStore.removeChangeListener(this);
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);
    ScrollListener.removeChangeListener(this);
    SelectionStore.removeChangeListener(this);
  }

  public render() {
    if (!this.state.images) {
      return (<div id="container">
        Loading
      </div>);
    }

    if (this.state.images.length === 0) {
      return (<div id="container">
        <Empty />
      </div>);
    }

    let view = (<span></span>);

    if (this.state.view >= 0) {
      view = (
        <Fullscreen
          image={this.state.images[this.state.view]}
          next={this.handleNext.bind(this)}
          previous={this.handlePrevious.bind(this)}
          handleClose={this.handleFullscreenClose.bind(this)}
          number={this.state.view + 1} size={this.state.images.length} />
      );
    }

    const elements = [];

    let lastDate = "";

    this._calcuateDisplayWidth(this.state.images);

    this.state.images.forEach((image: Image, idx: number) => {
      const newDate = image.year + "" + image.month + "" + image.day;

      let className = "item";

      const style = image.displayWidth > 0 ? {
        height: image.displayHeight + "px",
        width: image.displayWidth + "px"
      } : {
        height: this.props.thumbnailsSize + "px"
      };

      let checkBoxClass = null;

      if (SelectionStore.isSelected(image)) {
        className += " selected";
        checkBoxClass = "fa fa-check-square";
      } else {
        checkBoxClass = "fa fa-check-square-o";
      }

      if (this.props.showDate && lastDate !== newDate) {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <div style={{width: image.displayWidth + "px"}}>
              <i className="fa fa-check-square-o" onClick={this.handleDateSelect.bind(this, idx)} />
              <Link to={`/images/dates/${image.year}/${image.month}/${image.day}`}>{newDate}</Link>
            </div>
            <div className="imgBorder">
              <ImageComponent image={image} style={style} />
              <div className="select" onClick={this.handleSelect.bind(this, idx)}>
                <i className={checkBoxClass} aria-hidden="true" />
              </div>
              {this.renderLikeButton(image)}
              <div className="mark" />
            </div>
          </div>);

        lastDate = newDate;
      } else {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <ImageComponent image={image} style={style} />
            <div className="select" onClick={this.handleSelect.bind(this, idx)}>
              <i className={checkBoxClass} aria-hidden="true" />
            </div>
            {this.renderLikeButton(image)}
            <div className="mark" />
          </div>);
      }
    });

    return (
      <div id="container">
        {view}
        <div className={"container size" + this.state.size}>
          {elements}
        </div>
      </div>
    );
  }

  private handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      const container = document.getElementById("container");
      if (!container) {
        return;
      }
      const width = container.clientWidth;

      if (width !== this.width) {
        this.width = width;
        this.forceUpdate();
      }
    }, 300);
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    switch (e.keyCode) {
      case 27: {
        this.handleFullscreenClose();
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

      case 65: {
        if (e.ctrlKey) {
          this.state.images.forEach((image) => SelectionStore.select(image));
        }
        break;
      }
    }
  }

  private handleFullscreenClose() {
    this.setState({
      view: -1
    });
  }

  private handleNext() {
    if (this.state.view < this.state.images.length - 1) {
      this.setState({
        view: this.state.view + 1
      }, () => {
        if (this.state.view === this.state.images.length - 5) {
          ImagesStore.more();
        }
      });
    }
  }

  private handlePrevious() {
    if (this.state.view > 0) {
      this.setState({
        view: this.state.view - 1
      });
    }
  }

  private handleClick(idx: number, event) {
    if ("mark" !== event.target.className) {
      return;
    }

    if (this.props.options && this.props.options.hideFullscreen) {
      return;
    }

    this.setState({
      view: idx
    });
  }

  private handleSelect(idx: number, event) {
    if (event.shiftKey && this.lastSelection >= 0) {
      if (SelectionStore.isSelected(this.state.images[idx])) {
        for (let index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.unselect(this.state.images[index]);
        }
      } else {
        for (let index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.select(this.state.images[index]);
        }
      }
    } else {
      SelectionStore.handle(this.state.images[idx]);
    }

    this.lastSelection = idx;
  }

  private handleDateSelect(idx: number) {
    const date = this.state.images[idx].year + "" + this.state.images[idx].month + "" + this.state.images[idx].day;

    let hasNotSelected = false;

    let index = idx;

    for (; index < this.state.images.length; index++) {
      const newDate = this.state.images[index].year + ""
        + this.state.images[index].month + ""
        + this.state.images[index].day;

      if (newDate !== date) {
        break;
      }

      if (!SelectionStore.isSelected(this.state.images[index])) {
        hasNotSelected = true;
      }
    }

    for (let i = idx; i < index; i++) {
      if (hasNotSelected) {
        SelectionStore.select(this.state.images[i]);
      } else {
        SelectionStore.unselect(this.state.images[i]);
      }
    }

    this.forceUpdate();
  }

  private handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 700) {
      ImagesStore.more();
    }
  }

  private _calcuateDisplayWidth(imgs: Image[]) {
    let sum = 0;
    let images = [];

    if (!this.width) {
      return;
    }

    const max = this.width / this.props.thumbnailsSize;

    imgs.forEach((image: Image) => {
      image.displayWidth = 0;

      sum += image.proportion;
      images.push(image);

      if (sum > max) {
        const widthSize = (this.width - 2 * 1 * images.length) / sum;
        images.forEach((object: Image) => {
          object.displayWidth = object.proportion * widthSize;
          object.displayHeight = object.displayWidth / object.proportion;
        });

        sum = 0;
        images = [];
      }
    });
  }

  private renderLikeButton(image: Image) {
    if (this.props.options && this.props.options.hideLike) {
      return null;
    }

    return (<Like image={image} />);
  }
}

const mapStateToProps = (state) => {
  return {
    thumbnailsSize: state.options.thumbnailsSize,
    showDate: state.options.showDate,
    pinned: state.view.pinned
  }
}

export default ReactRedux.connect(mapStateToProps)(Images);
