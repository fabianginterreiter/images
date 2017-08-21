import * as React from "react";
import SelectionStore from "../../stores/SelectionStore";
import ImagesStore from "../../stores/ImagesStore";
import SelectionOptions from "./SelectionOptions";
import { browserHistory } from "react-router";
import Title from "../Title";
import { DialogStore } from "../../utils/Utils";
import * as ReactRedux from "react-redux";
import {openNavigation} from "../../actions";

interface SelectionProps {
  openNavigation(): void;
}

class Selection extends React.Component<SelectionProps, {}> {
  componentDidMount() {
    SelectionStore.addChangeListener(this, (selection) => (this.setState({selection:selection})));
  }

  componentWillUnmount() {
    SelectionStore.removeChangeListener(this);
  }

  handleShow() {
    browserHistory.push("/images/selected");
  }

  handleDelete() {
    var images = SelectionStore.getSelected();
    DialogStore.open("Delete Images", "Do you really want to delete all selected images?").then(() => {
      images.forEach(function(image) {
        ImagesStore.delete(image);
      });
    });
  }

  render() {
    if (SelectionStore.isEmpty()) {
      return (<span />);
    }

    return (
      <header className="selection">
        <div className="title" onClick={() => this.props.openNavigation()}>
          <Title />
        </div>

        <nav>
          <div onClick={this.handleShow.bind(this)}><i className="fa fa-check-square-o" aria-hidden="true" /> {SelectionStore.size()} <span className="min500"> selected</span></div>
          <div onClick={SelectionStore.clear.bind(SelectionStore)}><i className="fa fa-times" aria-hidden="true" /><span className="min500"> Clear</span></div>

          <div className="right" onClick={this.handleDelete.bind(this)}><i className="fa fa-trash-o" aria-hidden="true" /><span className="min500"> Delete</span></div>
          <SelectionOptions />
        </nav>
      </header>
    );
  }
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavigation: () => dispatch(openNavigation())
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Selection);
