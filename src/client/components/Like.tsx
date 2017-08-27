import * as React from "react";
import {connect} from "react-redux";
import {like, unlike} from "../actions/images";
import {Image} from "../types/types";

interface LikeProps {
  image: Image;
  like(image: Image): void;
  unlike(image: Image): void;
}

class Like extends React.Component<LikeProps, {}> {
  public render() {
    const className = this.props.image.liked ? "fa fa-heart" : "fa fa-heart-o";

    return (
      <span className="like" onClick={() => this.handleClick()}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like: (image: Image) => dispatch(like(image)),
    unlike: (image: Image) => dispatch(unlike(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);
