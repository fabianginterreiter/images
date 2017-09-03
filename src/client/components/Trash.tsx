import * as React from "react";
import {connect} from "react-redux";
import {loadTrash, revertImage, clearTrash} from "../actions";
import {Image} from "../types";
import { DialogStore } from "../utils/Utils";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import { browserHistory } from "react-router";
import Ajax from "../libs/Ajax";

class Trash extends React.Component<{
  images: Image[];
  clearTrash(): void;
  isSelected(image: Image): boolean
  revertImage(image: Image): void;
}, {}> {
  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-trash-o"/> Trash
          <ImagesNav images={this.props.images}>
            <button className="danger" onClick={this.handleClear.bind(this)}>
              <i className="fa fa-times-circle" aria-hidden="true"/><span className="min500"> Clear</span>
            </button>
            <button className="success" onClick={this.handleRevert.bind(this)}>
              <i className="fa fa-undo" aria-hidden="true" /><span className="min500"> Revert</span>
            </button>
          </ImagesNav>
        </h1>
        <Images options={{
          hideFullscreen: true,
          hideLike: true
        }} images={this.props.images} />
      </div>
    );
  }

  private handleClear(): void {
    DialogStore.open("Delete Images", "Do you really want to delete all selected images?", {
      type: "danger"
    }).then((result) => {
      if (result) {
        this.props.clearTrash();
      }
    });
  }

  private handleRevert(): void {
    this.props.images.forEach((image) => {
      if (this.props.isSelected(image)) {
        this.props.revertImage(image);
      }
    });

    browserHistory.push("/images/selected");
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.trash,
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(loadTrash());
  return {
    clearTrash: () => dispatch(clearTrash()),
    revertImage: (image: Image) => dispatch(revertImage(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
