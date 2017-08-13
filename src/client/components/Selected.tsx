import * as React from "react";
import { browserHistory } from "react-router";
import ImagesStore from "../stores/ImagesStore";
import SelectionStore from "../stores/SelectionStore";
import Images from "./Images";

export default class Selected extends React.Component<{}, {}> {

  componentDidMount() {
    if (SelectionStore.isEmpty()) {
      browserHistory.push("/images");
    }

    ImagesStore.setObject(SelectionStore.getSelected());
  }

  render() {
    return (
      <div>
        <h1><i className="icon-check" /> Selection</h1>
        <Images />
      </div>
    );
  }
}
