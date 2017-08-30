import * as $ from "jquery";
import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {loadMoreImages, select, toggle, unselect} from "../actions";
import {Image, Service} from "../types";
import {KeyUpListener, ResizeListener, ScrollListener} from "../utils/Utils";
import Empty from "./Empty";
import Fullscreen from "./Fullscreen";
import ImageComponent from "./ImageComponent";
import Like from "./Like";

interface ImagesProps {
  options?: {
    hideFullscreen: boolean;
    hideLike: boolean;
  };
  thumbnailsSize: number;
  showDate: boolean;
  pinned: boolean;
  images: Image[];
  offset: number;
  reload?: boolean;
  service: Service;
  select(image: Image): void;
  unselect(image: Image): void;
  toggle(image: Image): void;
  isSelected(image: Image): boolean;
  loadMoreImages(service: Service): void;
}

interface ImagesState {
  view: number;
  width: number;
}

class Images extends React.Component<ImagesProps, ImagesState> {
  private lastSelection: number;
  private resizeTimer;
  private pinned: boolean;

  constructor(props: ImagesProps) {
    super(props);

    this.state = {
      view: -1,
      width: -1
    };

    this.lastSelection = -1;

    this.pinned = props.pinned;
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleResize.bind(this));
    ScrollListener.addChangeListener(this, this.handleScroll.bind(this));

    this.setState({
      width: document.getElementById("container").clientWidth
    });
  }

  public componentWillReceiveProps(props) {
    if (this.pinned !== props.pinned) {
      this.handleResize();
    }

    this.pinned = props.pinned;
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);
    ScrollListener.removeChangeListener(this);
  }

  public render() {
    if (!this.props.images) {
      return (<div id="container">
        Loading
      </div>);
    }

    if (this.props.images.length === 0) {
      return (<div id="container">
        <Empty />
      </div>);
    }

    let view = (<span></span>);

    if (this.state.view >= 0) {
      view = (
        <Fullscreen
          image={this.props.images[this.state.view]}
          next={this.handleNext.bind(this)}
          previous={this.handlePrevious.bind(this)}
          handleClose={this.handleFullscreenClose.bind(this)}
          number={this.state.view + 1} size={this.props.images.length} />
      );
    }

    const elements = [];

    let lastDate = "";

    this._calcuateDisplayWidth(this.props.images);

    this.props.images.forEach((image: Image, idx: number) => {
      const newDate = image.year + "" + image.month + "" + image.day;

      let className = "item";

      const style = image.displayWidth > 0 ? {
        height: image.displayHeight + "px",
        width: image.displayWidth + "px"
      } : {
        height: this.props.thumbnailsSize + "px"
      };

      let checkBoxClass = null;

      if (this.props.isSelected(image)) {
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
              <div className="select" onClick={(e) => this.handleSelect(idx, e)}>
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
        <div className={"container size" + this.props.thumbnailsSize}>
          {elements}
        </div>
      </div>
    );
  }

  private loadMore() {
    if (this.props.reload) {
      this.props.loadMoreImages(this.props.service);
    }
  }

  private handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      const container = document.getElementById("container");
      if (!container) {
        return;
      }
      const width: number = container.clientWidth;

      if (width !== this.state.width && width) {
        this.setState({
          width
        });
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
          this.props.images.forEach((image) => this.props.select(image));
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
    if (this.state.view < this.props.images.length - 1) {
      this.setState({
        view: this.state.view + 1
      }, () => {
        if (this.state.view === this.props.images.length - 5) {
          this.loadMore();
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
      if (this.props.isSelected(this.props.images[idx])) {
        for (let index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          this.props.unselect(this.props.images[index]);
        }
      } else {
        for (let index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          this.props.select(this.props.images[index]);
        }
      }
    } else {
      this.props.toggle(this.props.images[idx]);
    }

    this.lastSelection = idx;
  }

  private handleDateSelect(idx: number) {
    const date = this.props.images[idx].year + "" + this.props.images[idx].month + "" + this.props.images[idx].day;

    let hasNotSelected = false;

    let index = idx;

    for (; index < this.props.images.length; index++) {
      const newDate = this.props.images[index].year + ""
        + this.props.images[index].month + ""
        + this.props.images[index].day;

      if (newDate !== date) {
        break;
      }

      if (!this.props.isSelected(this.props.images[index])) {
        hasNotSelected = true;
      }
    }

    for (let i = idx; i < index; i++) {
      if (hasNotSelected) {
        this.props.select(this.props.images[i]);
      } else {
        this.props.unselect(this.props.images[i]);
      }
    }

    this.forceUpdate();
  }

  private handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 700) {
      this.loadMore();
    }
  }

  private _calcuateDisplayWidth(imgs: Image[]) {
    let sum = 0;
    let images = [];

    if (!this.state.width) {
      return;
    }

    const max = this.state.width / this.props.thumbnailsSize;

    imgs.forEach((image: Image) => {
      image.displayWidth = 0;

      sum += image.proportion;
      images.push(image);

      if (sum > max) {
        const widthSize = (this.state.width - 2 * 1 * images.length) / sum;
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
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0,
    pinned: state.view.pinned,
    service: state.service,
    showDate: state.options.showDate,
    thumbnailsSize: state.options.thumbnailsSize,
    offset: state.service.offset
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreImages: (service: Service) => dispatch(loadMoreImages(service)),
    select: (image: Image) => dispatch(select(image)),
    toggle: (image: Image) => dispatch(toggle(image)),
    unselect: (image: Image) => dispatch(unselect(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
