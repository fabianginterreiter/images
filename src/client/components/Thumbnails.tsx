import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {Image} from "../types";
import Like from "./Like";
import ImageComponent from "./ImageComponent";
import {select, unselect} from "../actions";

class Thumbnails extends React.Component<{
  images: Image[];
  allImages: Image[];
  width: number;
  thumbnailsSize: number;
  showDate: boolean;
  renderContent(image: Image);
  isSelected(image: Image): boolean;
  select(image: Image): void;
  unselect(image: Image): void;
},{}> {
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
              <i className="fa fa-check-square-o" onClick={() => this.handleDateSelect(image.year, image.month, image.day)} />
              <Link to={`/images/dates/${image.year}/${image.month}/${image.day}`}>{newDate}</Link>
            </div>
            <div className="imgBorder">
              <img src={"/thumbs/" + image.path} alt={image.filename} style={style} />
              <ImageComponent image={image} />
            </div>
          </div>);

        lastDate = newDate;
      } else {
        elements.push(
          <div className="item" key={image.id}>
            <img src={"/thumbs/" + image.path} alt={image.filename} style={style} />
            <ImageComponent image={image} />
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

  private handleDateSelect(year: number, month: number, day: number) {
    const images = this.props.allImages.filter((image) => (image.year === year && image.month === month && image.day === day));

    if (images.find((image) => this.props.isSelected(image))) {
      images.forEach((image) => this.props.unselect(image));
    } else {
      images.forEach((image) => this.props.select(image));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSelected: (image: Image) => state.selection.findIndex((obj) => obj.id === image.id) >= 0,
    showDate: state.options.showDate,
    thumbnailsSize: state.options.thumbnailsSize,
    allImages: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (image: Image) => dispatch(select(image)),
    unselect: (image: Image) => dispatch(unselect(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnails);
