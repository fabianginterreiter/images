import * as React from "react";
import * as $ from "jquery";
import {connect} from "react-redux";
import {Album, Image, AlbumImage} from "../types";
import Thumbnails from "./Thumbnails";
import BigPreview from "./BigPreview";
import {setView, updateEntry, updateDisplay} from "../actions";

class AlbumView extends React.Component<{
  entries: AlbumImage[];
  images: Image[];
  album: Album;
  onClose(): void;
  setView(index: number): void;
  updateEntry(entry: AlbumImage): void;
  updateDisplay(entry: AlbumImage): void;
}, {
  edit: boolean;
  dragging?: {
    entry: AlbumImage;
    target?: AlbumImage;
  }
}> {
  public constructor(props) {
    super(props);
    this.state = {edit:false, dragging: null};
  }

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
        <div className="close" onClick={() => this.props.onClose()}><i className="fa fa-times" aria-hidden="true"/> Close</div>
        <div className="edit" onClick={() => this.setState({edit:!this.state.edit})}><i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit</div>
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
    if (this.state.edit) {
      const entry = this.props.entries.find((entry) => image.id === entry.image_id);

      return <div className="entry" draggable={true}
        onDragStart={() => this.handleDragStart(entry)}
        onDragOver={(event) => this.handleDragOver(event, entry)}
        onDragEnd={() => this.handleDragEnd(entry)}>
        <div className="big" onClick={() => this.handleMakeBig(image)}>
          {entry.big ? <i className="fa fa-compress" aria-hidden="true" /> : <i className="fa fa-expand" aria-hidden="true" />}
        </div>
      </div>;
    }
    return <div className="entry" onClick={(event) => this.handleClick(event, image)} />;
  }

  private handleDragStart(entry: AlbumImage) {
    console.log("Start: " + entry.id);
    this.setState({
      dragging: {entry}
    });
  }

  private handleDragOver(event, entry: AlbumImage) {
    if (this.state.dragging.entry.id === entry.id) {
      return;
    }

    if (this.state.dragging.target && this.state.dragging.target.id === entry.id) {
      return;
    }

    this.setState({
      dragging: {...this.state.dragging, target: entry}
    });

    this.state.dragging.entry.order = entry.order - 1;

    this.props.updateDisplay(this.state.dragging.entry);
  }

  private handleDragEnd(entry: AlbumImage) {
    this.props.updateEntry(this.state.dragging.entry);
    this.setState({
      dragging: null
    });
  }

  private handleClick(event, image: Image) {
    if ("entry" !== event.target.className) {
      return;
    }

    const idx = this.props.images.findIndex((obj) => obj.id === image.id);

    this.props.setView(idx);
  }

  private handleMakeBig(image: Image) {
    const entry = this.props.entries.find((entry) => image.id === entry.image_id);

    entry.big = !entry.big;

    this.props.updateEntry(entry);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setView: (idx:number) => dispatch(setView(idx)),
    updateEntry: (entry: AlbumImage) => dispatch(updateEntry(entry)),
    updateDisplay: (entry: AlbumImage) => dispatch(updateDisplay(entry))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
