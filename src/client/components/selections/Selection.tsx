import * as React from "react";
import * as ReactRedux from "react-redux";
import { browserHistory } from "react-router";
import {clear, deleteImage, openNavigation, unselect} from "../../actions";
import {Image} from "../../types";
import { DialogStore } from "../../utils/Utils";
import Title from "../Title";
import SelectionOptions from "./SelectionOptions";
import Download from "./Download";
import {t} from "../../libs/Translation";

interface SelectionProps {
  selection: Image[];
  clear(): void;
  deleteImage(image: Image): void;
  openNavigation(): void;
  unselect(image: Image): void;
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
            <span className="min500"> {t("selection.selected")}</span>
          </div>
          <div onClick={() => this.props.clear()}>
            <i className="fa fa-times" aria-hidden="true" />
            <span className="min500"> {t("selection.clear")}</span>
          </div>

          <div className="right" onClick={this.handleDelete.bind(this)}>
            <i className="fa fa-trash-o" aria-hidden="true" /><span className="min500"> {t("selection.delete")}</span>
          </div>
          <SelectionOptions />
          <Download />
        </nav>
      </header>
    );
  }

  private handleShow() {
    browserHistory.push("/images/selected");
  }

  private handleDelete() {
    DialogStore.open(t("selection.deleteConfirm.title"), t("selection.deleteConfirm.message")).then(() => {
      this.props.selection.forEach((image) => this.props.deleteImage(image) && this.props.unselect(image));
    });
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
    openNavigation: () => dispatch(openNavigation()),
    unselect: (image: Image) => dispatch(unselect(image))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Selection);
