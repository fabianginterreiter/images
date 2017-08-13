import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

export default class Favorites extends React.Component<{}, {}> {

  public componentDidMount() {
    return ImagesStore.load("/api/images?liked=true");
  }

  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-heart-o" aria-hidden="true" /> Favorites
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}
