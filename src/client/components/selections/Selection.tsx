import * as React from "react";
import * as ReactRedux from "react-redux";
import { browserHistory } from "react-router";
import {clear, deleteImage, openNavigation} from "../../actions";
import {Image} from "../../types";
import { DialogStore } from "../../utils/Utils";
import Title from "../Title";
import SelectionOptions from "./SelectionOptions";

interface SelectionProps {
  selection: Image[];
  clear(): void;
  deleteImage(image: Image): void;
  openNavigation(): void;
}

class Selection extends React.Component<SelectionProps, {}> {
  public render() {
    if (this.props.selection.length === 0) {
      return (<span />);
    }

    return (
      <header className="selection">
        <div className="title" onClick={() => this.props.openNavigation()}>
          <Title />
        </div>

        <nav>
          <div onClick={this.handleShow.bind(this)}>
            <i className="fa fa-check-square-o" aria-hidden="true" /> {this.props.selection.length}
            <span className="min500"> selected</span>
          </div>
          <div onClick={() => this.props.clear()}>
            <i className="fa fa-times" aria-hidden="true" />
            <span className="min500"> Clear</span>
          </div>

          <div className="right" onClick={this.handleDelete.bind(this)}>
            <i className="fa fa-trash-o" aria-hidden="true" /><span className="min500"> Delete</span>
          </div>
          <SelectionOptions />
          <div className="right" onClick={() => this.handleDownload()}>
            <i className="fa fa-download" aria-hidden="true" /> <span className="min500"> Download</span>
          </div>
        </nav>
      </header>
    );
  }

  private handleShow() {
    browserHistory.push("/images/selected");
  }

  private handleDelete() {
    DialogStore.open("Delete Images", "Do you really want to delete all selected images?").then(() => {
      this.props.selection.forEach((image) => this.props.deleteImage(image));
    });
  }

  private handleDownload() {
    const ids = this.props.selection.map((image) => image.id).join("+");
    console.log(ids);

    window.location.href = `/api/download/images/${ids}`;
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(clear()),
    deleteImage: (image: Image) => dispatch(deleteImage(image)),
    openNavigation: () => dispatch(openNavigation())
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Selection);
