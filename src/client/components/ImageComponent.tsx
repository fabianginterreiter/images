import * as React from "react";
import {Image} from "../types";

interface ImageComponentProps {
  style: Object;
  image: Image;
}

export default class ImageComponent extends React.Component<ImageComponentProps, {}> {
  public render() {
    return (<img src={"/thumbs/" + this.props.image.path} alt={this.props.image.filename} style={this.props.style} />);
  }
}
