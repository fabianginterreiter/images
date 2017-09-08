import * as React from "react";
import {connect} from "react-redux";
import {loadMoreImages, select, setView, toggle, unselect} from "../actions";
import {Image, Service} from "../types";
import Like from "./Like";

class ImageComponent extends React.Component<{
  options?: {
    hideFullscreen: boolean;
    hideLike: boolean;
  };
  image: Image;
  images: Image[];
  selection: Image[];
  select(image: Image): void;
  setView(index: number): void;
  unselect(image: Image): void;
  toggle(image: Image): void;
  isSelected(image: Image): boolean;
  loadMoreImages(service: Service): void;
}, {}> {
  public render() {
    let checkBoxClass = null;
    let className = "";

    if (this.props.isSelected(this.props.image)) {
      className += "selected";
      checkBoxClass = "fa fa-check-square";
    } else {
      checkBoxClass = "fa fa-check-square-o";
    }

    return <div className={className} onClick={(event) => this.handleClick(event, this.props.image)}>
      <div className="mark" />
      <div className="select" onClick={(event) => this.handleSelect(event, this.props.image)}>
        <i className={checkBoxClass} aria-hidden="true" />
      </div>
      {this.renderLikeButton(this.props.image)}
    </div>;
  }

  private handleClick(event, image: Image) {
    if ("mark" !== event.target.className) {
      return;
    }

    if (this.props.options && this.props.options.hideFullscreen) {
      return;
    }

    const idx = this.props.images.findIndex((obj) => obj.id === image.id);

    this.props.setView(idx);
  }

  private handleSelect(event, image: Image) {
    const idx = this.props.images.findIndex((obj) => obj.id === image.id);

    const lastSelection = this.props.selection.length === 0 ? -1 : this.props.images.findIndex((obj) => obj.id === this.props.selection[this.props.selection.length - 1].id);

    if (event.shiftKey && lastSelection >= 0) {
      for (let index = Math.min(lastSelection, idx); index <= Math.max(lastSelection, idx); index++) {
        if (!this.props.isSelected(this.props.images[index])) {
          this.props.select(this.props.images[index]);
        }
      }
    } else {
      this.props.toggle(this.props.images[idx]);
    }
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
    loading: state.service.loading,
    pinned: state.view.pinned,
    images: state.images,
    selection: state.selection,
    reload: state.service.reload,
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
    setView: (index: number) => dispatch(setView(index)),
    toggle: (image: Image) => dispatch(toggle(image)),
    unselect: (image: Image) => dispatch(unselect(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageComponent);
