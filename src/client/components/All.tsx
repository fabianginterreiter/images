import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"

interface AllProps {
}

interface AllState {
}

export class All extends React.Component<AllProps, AllState> {

  componentDidMount() {
    ImagesStore.load("/api/images");
  }

  render() {
    return (
      <Images />
    );
  }
}
