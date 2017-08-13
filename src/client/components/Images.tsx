import * as React from "react"
import * as $ from "jquery"
import * as moment from "moment"
import Image from "./Image"
import Fullscreen from "./Fullscreen"
import Like from "./Like"
import Empty from "./Empty"
import ImagesStore from "../stores/ImagesStore"
import ThumbnailsSizeStore from "../stores/ThumbnailsSizeStore"
import NavigationsState from "../states/NavigationsState"
import SelectionStore from "../stores/SelectionStore"
import { Link } from "react-router"
import ShowDateStore from "../stores/ShowDateStore"
import {KeyUpListener, ResizeListener, ScrollListener} from "../utils/Utils";
import * as types from "../types/types";

interface ImagesProps {
  options?: {
    hideFullscreen: boolean;
    hideLike: boolean;
  }
}

interface ImagesState {
  images: types.Image[];
  view: number;
  width: number;
  size: number;
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  private bundledImages;
  private lastSelection: number;
  private width: number;
  private resizeTimer;

  constructor(props: ImagesProps) {
    super(props);

    this.bundledImages = [];

    this.state = {
      view: -1,
      width: -1,
      images: [],
      size: ThumbnailsSizeStore.getObject()
    };

    this.lastSelection = -1;
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this, (images) => this.setState({images:images}));
    ThumbnailsSizeStore.addChangeListener(this, (size) => (this.setState({size:size})));
    NavigationsState.addChangeListener(this, this.handlePinningNavigation.bind(this));
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleResize.bind(this));
    SelectionStore.addChangeListener(this, () => this.forceUpdate());
    ShowDateStore.addChangeListener(this, () => this.forceUpdate());
    ScrollListener.addChangeListener(this, this.handleScroll.bind(this));

    this.width = document.getElementById("container").clientWidth;
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);
    ThumbnailsSizeStore.removeChangeListener(this);
    NavigationsState.removeChangeListener(this);
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);
    ScrollListener.removeChangeListener(this);
    SelectionStore.removeChangeListener(this);
    ShowDateStore.removeChangeListener(this);
  }

  private handlePinningNavigation() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      var container = document.getElementById("container");
      if (!container) {
        return;
      }

      var width = container.clientWidth;

      if (width !== this.width) {
        this.width = width;
        this.forceUpdate();
      }
    }.bind(this), 500);
  }

  private handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      var container = document.getElementById("container");
      if (!container) {
        return;
      }
      var width = container.clientWidth;

      if (width !== this.width) {
        this.width = width;
        this.forceUpdate();
      }
    }.bind(this), 100);
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

  private handleClick(idx, event) {
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

  private handleSelect(idx, event) {
    if (event.shiftKey && this.lastSelection >= 0) {
      if (SelectionStore.isSelected(this.state.images[idx])) {
        for (var index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.unselect(this.state.images[index]);
        }
      } else {
        for (var index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.select(this.state.images[index]);
        }
      }
    } else {
      SelectionStore.handle(this.state.images[idx]);
    }

    this.lastSelection = idx;
  }

  private handleDateSelect(idx) {
    var date = this.state.images[idx].year + "" + this.state.images[idx].month + "" + this.state.images[idx].day;

    var hasNotSelected = false;

    var index = idx;

    for (; index < this.state.images.length; index++) {
      var newDate = this.state.images[index].year + "" + this.state.images[index].month + "" + this.state.images[index].day;

      if (newDate !== date) {
        break;
      }

      if (!SelectionStore.isSelected(this.state.images[index])) {
        hasNotSelected = true;
      }
    }

    for (var i = idx; i < index; i++) {
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

  private _calcuateDisplayWidth(imgs: types.Image[]) {
    var date = null;
    var sum = 0;
    var images = [];

    if (!this.width) {
      return;
    }

    var max = this.width / ThumbnailsSizeStore.getObject();

    imgs.forEach(function(image) {
      image.displayWidth = 0;

      sum += image.proportion;
      images.push(image);

      if (sum > max) {
        var widthSize = (this.width - 2 * 1 * images.length) / sum;
        images.forEach(function(image) {
          image.displayWidth = image.proportion * widthSize;
          image.displayHeight = image.displayWidth / image.proportion;
        });

        sum = 0;
        images = [];
      }
    }.bind(this));
  }

  private renderLikeButton(image: types.Image) {
    if (this.props.options && this.props.options.hideLike) {
      return null;
    }

    return (<Like image={image} />);
  }

  render() {
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

    var view = (<span></span>);

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

    var elements = [];

    var lastDate = "";

    this._calcuateDisplayWidth(this.state.images);

    this.state.images.forEach((image, idx) => {
      var newDate = image.year + "" + image.month + "" + image.day;

      var className = "item";

      var style = image.displayWidth > 0 ? {width: image.displayWidth + "px", height: image.displayHeight + "px"} : {height: ThumbnailsSizeStore.getObject() + "px"};

      var checkBoxClass = null;

      if (SelectionStore.isSelected(image)) {
        className += " selected";
        checkBoxClass = "fa fa-check-square";
      } else {
        checkBoxClass = "fa fa-check-square-o"
      }

      if (ShowDateStore.getObject() && lastDate !== newDate) {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <div style={{width: image.displayWidth + "px"}}><i className="fa fa-check-square-o" onClick={this.handleDateSelect.bind(this, idx)} /> <Link to={`/images/dates/${image.year}/${image.month}/${image.day}`}>{newDate}</Link> </div>
            <div className="imgBorder">
              <Image image={image} style={style} />
              <div className="select" onClick={this.handleSelect.bind(this, idx)}><i className={checkBoxClass} aria-hidden="true" /></div>
              {this.renderLikeButton(image)}
              <div className="mark" />
            </div>
          </div>);

        lastDate = newDate;
      } else {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <Image image={image} style={style} />
            <div className="select" onClick={this.handleSelect.bind(this, idx)}><i className={checkBoxClass} aria-hidden="true" /></div>
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
    )
  }
}
