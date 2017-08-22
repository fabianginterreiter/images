import * as React from "react";
import ImagesStore from "../../stores/ImagesStore";
import SelectionOptions from "./SelectionOptions";
import { browserHistory } from "react-router";
import Title from "../Title";
import { DialogStore } from "../../utils/Utils";
import * as ReactRedux from "react-redux";
import {openNavigation, clear} from "../../actions";
import {Image} from "../../types/types";

interface SelectionProps {
  openNavigation(): void;
  clear(): void;
  selection: Image[]
}

class Selection extends React.Component<SelectionProps, {}> {
  handleShow() {
    browserHistory.push("/images/selected");
  }

  handleDelete() {
    let images: Image[] = this.props.selection;
    DialogStore.open("Delete Images", "Do you really want to delete all selected images?").then(() => {
      images.forEach(function(image) {
        ImagesStore.delete(image);
      });
    });
  }

  render() {
    if (this.props.selection.length === 0) {
      return (<span />);
    }

    return (
      <header className="selection">
        <div className="title" onClick={() => this.props.openNavigation()}>
          <Title />
        </div>

        <nav>
          <div onClick={this.handleShow.bind(this)}><i className="fa fa-check-square-o" aria-hidden="true" /> {this.props.selection.length} <span className="min500"> selected</span></div>
          <div onClick={() => this.props.clear()}><i className="fa fa-times" aria-hidden="true" /><span className="min500"> Clear</span></div>

          <div className="right" onClick={this.handleDelete.bind(this)}><i className="fa fa-trash-o" aria-hidden="true" /><span className="min500"> Delete</span></div>
          <SelectionOptions />
        </nav>
      </header>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavigation: () => dispatch(openNavigation()),
    clear: () => dispatch(clear())
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Selection);
