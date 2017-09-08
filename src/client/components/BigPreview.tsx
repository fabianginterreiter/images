import * as React from "react";
import {Image} from "../types";

export default class BigPreview extends React.Component<{
  image: Image;
  width: number;
  renderContent(image: Image);
}, {}> {
  public render() {
    if (!this.props.image) {
      return <span />;
    }

    const style = {
      width: this.props.width + "px",
      height: this.props.width / this.props.image.proportion + "px"
    };

    return (<div className="container">
      <div className="item">
        <img ref="image" src={`/show/${this.props.image.path}`}
          alt={this.props.image.filename} style={style} />
        {this.props.renderContent(this.props.image)}
      </div>
    </div>);
  }
}
