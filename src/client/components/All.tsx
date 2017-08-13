import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import Images from "./Images";

export class All extends React.Component<{}, {}> {
  public componentDidMount() {
    ImagesStore.load("/api/images");
  }

  public render() {
    return (
      <Images />
    );
  }
}
