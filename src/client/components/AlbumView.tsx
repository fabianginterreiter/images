import * as React from "react";
import {connect} from "react-redux";
import {Album, Image, AlbumImage} from "../types";
import Thumbnails from "./Thumbnails";
import BigPreview from "./BigPreview";
import {setView} from "../actions";

class AlbumView extends React.Component<{
  entries: AlbumImage[];
  images: Image[];
  album: Album;
  onClose(): void;
  setView(index: number): void;
}, {}> {
  public render() {

    const width = 600;

    const images = [];

    let temp = [];

    let box = 0;

    this.props.entries.forEach((entry: AlbumImage) => {
      const image = this.props.images.find((image) => image.id === entry.image_id);

      if (!image) {
        return;
      }

      if (entry.big) {
        if (temp.length > 0) {
          images.push(<Thumbnails key={"b" + (++box)} images={temp} width={width} renderContent={(image) => this.renderContent(image)} />);
          temp = [];
        }

        images.push(<BigPreview key={"b" + (++box)} image={image} width={width} renderContent={(image) => this.renderContent(image)} />);
      } else {
        temp.push(image);
      }
    });

    if (temp.length > 0) {
      images.push(<Thumbnails key={"b" + (++box)} images={temp} width={width} renderContent={(image) => this.renderContent(image)}/>);
    }

    return (
      <div className="album">
        <div className="close" onClick={() => this.props.onClose()}>Close</div>
        <div className="content" style={{width: width + "px"}}>
          <h1>
            <i className="fa fa-book" aria-hidden="true" /> {this.props.album.name}
          </h1>
          {images}
        </div>
      </div>
    );
  }

  private renderContent(image: Image) {
    return <div className="entry" onClick={(event) => this.handleClick(event, image)}></div>;
  }

  private handleClick(event, image: Image) {
    if ("entry" !== event.target.className) {
      return;
    }

    const idx = this.props.images.findIndex((obj) => obj.id === image.id);

    this.props.setView(idx);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setView: (idx:number) => dispatch(setView(idx))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
