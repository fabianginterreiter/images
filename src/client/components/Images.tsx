import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {loadMoreImages, select, setView, toggle, unselect} from "../actions";
import {Image, Service} from "../types";
import {KeyUpListener, ResizeListener, ScrollListener} from "../utils/Utils";
import Empty from "./Empty";
import Like from "./Like";
import Thumbnails from "./Thumbnails";

interface ImagesProps {
  options?: {
    hideFullscreen: boolean;
    hideLike: boolean;
  };
  pinned: boolean;
  images: Image[];
  offset: number;
  loading: boolean;
  reload?: boolean;
  service: Service;
  size?: number;
  select(image: Image): void;
  setView(index: number): void;
  unselect(image: Image): void;
  toggle(image: Image): void;
  isSelected(image: Image): boolean;
  loadMoreImages(service: Service): void;
}

interface ImagesState {
}

class Images extends React.Component<ImagesProps, ImagesState> {
  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ScrollListener.addChangeListener(this, this.handleScroll.bind(this));
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
    ScrollListener.removeChangeListener(this);
  }

  public render() {
    if (this.props.images.length === 0 && !this.props.loading) {
      return (<div id="container">
        <Empty />
      </div>);
    }

    return (
      <div id="container">
        <Thumbnails images={this.props.images} />
        {this.props.loading && <div>Loading</div>}
      </div>
    );
  }

  private loadMore() {
    if (this.props.reload) {
      this.props.loadMoreImages(this.props.service);
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    switch (e.keyCode) {
      case 65: {
        if (e.ctrlKey) {
          this.props.images.forEach((image) => this.props.select(image));
        }
        break;
      }
    }
  }

  private handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 700) {
      this.loadMore();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0,
    loading: state.service.loading,
    pinned: state.view.pinned,
    reload: state.service.reload,
    service: state.service,
    offset: state.service.offset
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreImages: (service: Service) => dispatch(loadMoreImages(service)),
    select: (image: Image) => dispatch(select(image)),
    setView: (index: number) => dispatch(setView(index)),
    toggle: (image: Image) => dispatch(toggle(image)),
    unselect: (image: Image) => dispatch(unselect(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
