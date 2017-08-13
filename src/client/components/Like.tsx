import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import { Image } from "../types/types";

interface LikeProps {
  image: Image;
}

export default class Like extends React.Component<LikeProps, {}> {
  render() {
    const className = this.props.image.liked ? "fa fa-heart" : "fa fa-heart-o";

    return (
      <span className="like" onClick={ImagesStore.like.bind(ImagesStore, this.props.image)}>
        <i className={className} aria-hidden="true" />
      </span>
    );
  }
}
