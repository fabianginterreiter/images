import * as React from "react";
import ImagesStore from "../stores/ImagesStore";
import { Image } from "../types/types";
import {connect} from "react-redux";
import {like} from "../actions/images";
import {unlike} from "../actions/images";

interface LikeProps {
  image: Image;
  like(image: Image): void;
  unlike(image: Image): void;
}

class Like extends React.Component<LikeProps, {}> {
  public render() {
    const className = this.props.image.liked ? "fa fa-heart" : "fa fa-heart-o";

    return (
      <span className="like" onClick={ImagesStore.like.bind(ImagesStore, this.props.image)}>
        <i className={className} aria-hidden="true" />
      </span>
    );
  }

  private handleClick() {
    if (this.props.image.liked) {
      this.props.unlike(this.props.image);
    } else {
      this.props.like(this.props.image);
    }
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    like: (image: Image) => dispatch(like(image)),
    unlike: (image: Image) => dispatch(unlike(image))
  }
}

export default connect()(Like);
