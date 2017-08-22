import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import { DialogStore } from "../utils/Utils";
import Images from "./Images";
import ImagesNav from "./ImagesNav";
import {connect} from "react-redux";
import {Image} from "../types/types";

class Trash extends React.Component<{
  isSelected(image: Image): boolean
}, {}> {
  componentDidMount() {
    ImagesStore.load("/api/images?trash=true");
  }

  private handleClear(): void {
    DialogStore.open("Delete Images", "Do you really want to delete all selected images?", {
      type: "danger"
    }).then((result) => {
      if (result) {
        fetch("/api/trash/clear", {
          method: "DELETE",
          credentials: "include"
        }).then(() => {
        });
      }
    });
  }

  private handleRevert(): void {
    let promises = [];

    ImagesStore.getObject().forEach((image) => {
      if (this.props.isSelected(image)) {
        promises.push(ImagesStore.revert(image));
      }
    });

    Promise.all(promises).then(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-trash-o"/> Trash
          <ImagesNav>
            <button className="danger" onClick={this.handleClear.bind(this)}><i className="fa fa-times-circle" aria-hidden="true"/><span className="min500"> Clear</span></button>
            <button className="success" onClick={this.handleRevert.bind(this)}><i className="fa fa-undo" aria-hidden="true" /><span className="min500"> Revert</span></button>
          </ImagesNav>
        </h1>
        <Images options={{
          hideLike: true,
          hideFullscreen: true
        }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSelected: (image: Image) => state.selection.findIndex(obj => obj.id === image.id) >= 0
  }
}

export default connect(mapStateToProps)(Trash);
