import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"

export interface AllProps { }

export class All extends React.Component<AllProps, undefined> {

  componentDidMount() {
    ImagesStore.load("/api/images");
  }

  render() {
    return (
      <Images />
    );
  }
}
