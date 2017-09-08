import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {Image} from "../types";
import Like from "./Like";
import * as Lozad from "Lozad";

class Thumbnails extends React.Component<{
  images: Image[];
  width: number;
  thumbnailsSize: number;
  showDate: boolean;
  renderContent(image: Image);
  onDateSelect(year: number, month: number, day: number);
},{}> {

  public componentDidUpdate() {
    const lozad = new Lozad();
    lozad.activate();
  }

  public render() {
    const elements = [];

    let lastDate = "";

    this._calcuateDisplayWidth(this.props.images);

    this.props.images.forEach((image: Image, idx: number) => {
      const newDate = image.year + "" + image.month + "" + image.day;

      const style = image.displayWidth > 0 ? {
        height: image.displayHeight + "px",
        width: image.displayWidth + "px"
      } : {
        height: this.props.thumbnailsSize + "px"
      };

      if (this.props.showDate && lastDate !== newDate) {
        elements.push(
          <div className="item" key={image.id} >
            <div style={{width: image.displayWidth + "px"}}>
              <i className="fa fa-check-square-o" onClick={() => this.props.onDateSelect(image.year, image.month, image.day)} />
              <Link to={`/images/dates/${image.year}/${image.month}/${image.day}`}>{newDate}</Link>
            </div>
            <div className="imgBorder">
              <img src={"/thumbs/" + image.path} alt={image.filename} style={style} />
              {this.props.renderContent(image)}
            </div>
          </div>);

        lastDate = newDate;
      } else {
        elements.push(
          <div className="item" key={image.id}>
            <img data-src={"/thumbs/" + image.path} className="lozad" alt={image.filename} style={style} />
            {this.props.renderContent(image)}
          </div>);
      }
    });

    return (<div className={"container size" + this.props.thumbnailsSize}>
      {elements}
    </div>);
  }

  private _calcuateDisplayWidth(imgs: Image[]) {
    let sum = 0;
    let images = [];

    if (!this.props.width) {
      return;
    }

    const max = this.props.width / this.props.thumbnailsSize;

    imgs.forEach((image: Image) => {
      image.displayWidth = 0;

      sum += image.proportion;
      images.push(image);

      if (sum > max) {
        const widthSize = (this.props.width - 2 * 1 * images.length) / sum;
        images.forEach((object: Image) => {
          object.displayWidth = object.proportion * widthSize;
          object.displayHeight = object.displayWidth / object.proportion;
        });

        sum = 0;
        images = [];
      }
    });
  }
}

const mapStateToProps = (state) => {
  return {
    showDate: state.options.showDate,
    thumbnailsSize: state.options.thumbnailsSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnails);
