import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"

export class All extends React.Component<{}, {}> {
  componentDidMount() {
    ImagesStore.load("/api/images");
  }

  render() {
    return (
      <Images />
    );
  }
}
