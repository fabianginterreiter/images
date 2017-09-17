import { HtmlRenderer, Parser } from "commonmark";
import * as $ from "jquery";
import * as React from "react";
import {connect} from "react-redux";
import {removeEntry, setImages, setView, updateDisplay, updateEntry, updateOrder} from "../actions";
import {Album, AlbumImage, Image} from "../types";
import { KeyUpListener } from "../utils/Utils";
import BigPreview from "./BigPreview";
import Thumbnails from "./Thumbnails";
import Markdown from "./Markdown";

class AlbumView extends React.Component<{
  entries: AlbumImage[];
  images: Image[];
  album: Album;
  view: number;
  onClose(): void;
  setView(index: number): void;
  updateEntry(entry: AlbumImage): void;
  updateDisplay(entry: AlbumImage): void;
  updateOrder(entries: AlbumImage[]): void;
  setImages(images: Image[]): void;
  removeEntry(entry: AlbumImage): void;
}, {
  edit: boolean;
  dragging?: {
    entry: AlbumImage;
    target?: AlbumImage;
  }
}> {
  private parser;
  private renderer;

  public constructor(props) {
    super(props);
    this.state = {edit: false, dragging: null};

    this.parser = new Parser();
    this.renderer = new HtmlRenderer();
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  public componentWillUnmount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  public render() {

    const width = 600;

    const images = [];

    let temp = [];

    let box = 0;

    this.props.entries.forEach((entry: AlbumImage) => {
      const image = this.props.images.find((object: Image) => object.id === entry.image_id);

      if (!image) {

        if (entry.text !== null) {
          if (temp.length > 0) {
            images.push(<Thumbnails key={"b" + (++box)}
              images={temp} width={width}
              renderContent={(object: Image) => this.renderContent(object)} />);
            temp = [];
          }

          ++box;

          images.push(this.renderText(entry, box));
        }

        return;
      }

      if (entry.big) {
        if (temp.length > 0) {
          images.push(<Thumbnails key={"b" + (++box)} images={temp} width={width}
            renderContent={(object) => this.renderContent(object)} />);
          temp = [];
        }

        images.push(<BigPreview key={"b" + (++box)} image={image} width={width}
          renderContent={(object) => this.renderContent(object)} />);
      } else {
        temp.push(image);
      }
    });

    if (temp.length > 0) {
      images.push(<Thumbnails key={"b" + (++box)} images={temp} width={width}
        renderContent={(object) => this.renderContent(object)}/>);
    }

    return (
      <div className="album">
        <div className="close" onClick={() => this.props.onClose()}>
          <i className="fa fa-times" aria-hidden="true"/> Close
        </div>
        {this.state.edit ?
          <div className="editButton" onClick={() => this.handleStopEditMode()}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" /> Stop
          </div>
          : <div className="editButton" onClick={() => this.handleStartEditMode()}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
          </div>}
        <div className={"content" + (this.state.edit ? " editMode" : "")} style={{width: width + "px"}}>
          <h1>
            <i className="fa fa-book" aria-hidden="true" /> {this.props.album.name}
          </h1>
          {images}
        </div>
      </div>
    );
  }

  private renderText(entry: AlbumImage, b: number) {
    if (this.state.edit) {
      return <div key={b} className="container">
        <div className="item textbox" draggable={true}
        onDragStart={() => this.handleDragStart(entry)}
        onDragOver={(event) => this.handleDragOver(event, entry)}
        onDragEnd={() => this.handleDragEnd()}>
          <Markdown value={entry.text}
            edit={true}
            onChange={(value) => this.handleChange(value, entry)}/>
          <div className="buttonsRight">
            <span onClick={() => this.handleDelete(entry)} className="deleteButton">Delete</span>
          </div>
        </div>
      </div>;
    }

    return <div key={b} className="container">
      <div className="item textbox">
        <Markdown value={entry.text} />
      </div>
    </div>;
  }

  private renderContent(image: Image) {
    if (this.state.edit) {
      const entry = this.props.entries.find((entry) => image.id === entry.image_id);

      return <div className="entry" draggable={true}
        onDragStart={() => this.handleDragStart(entry)}
        onDragOver={(event) => this.handleDragOver(event, entry)}
        onDragEnd={() => this.handleDragEnd()}>
        <div className="buttonsLeft">
          <span className="bigButton" onClick={() => this.handleMakeBig(entry)}>
            {entry.big ? <i className="fa fa-compress" aria-hidden="true" /> :
              <i className="fa fa-expand" aria-hidden="true" />}
          </span>
          <span className="addTextButton" onClick={() => this.handleAddText(entry)}>Text</span>
        </div>
        <div className="buttonsRight">
          <span onClick={() => this.handleDelete(entry)} className="deleteButton">Delete</span>
        </div>
      </div>;
    }
    return <div className="entry" onClick={(event) => this.handleClick(event, image)} />;
  }

  private handleChange(value: string, entry: AlbumImage) {
    entry.text = value;

    this.props.updateEntry(entry);
  }

  private handleDelete(entry: AlbumImage) {
    this.props.removeEntry(entry);
  }

  private handleKeyUp(event) {
    switch (event.keyCode) {
      case 27:
        if (this.props.view >= 0) {
          break;
        }

        if (this.state.edit) {
          this.setState({
            edit: false
          });
          break;
        }

        return this.props.onClose();
    }
  }

  private handleDragStart(entry: AlbumImage) {
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

  private handleDragEnd() {
    this.props.updateOrder(this.props.entries);

    this.setState({
      dragging: null
    });

    this.props.setImages(this.props.entries.filter((entry) => entry.image_id > 0).map((entry) =>
      this.props.images.find((image) => entry.image_id === image.id)));
  }

  private handleClick(event, image: Image) {
    if ("entry" !== event.target.className) {
      return;
    }

    const idx = this.props.images.findIndex((obj) => obj.id === image.id);

    this.props.setView(idx);
  }

  private handleMakeBig(entry: AlbumImage) {
    entry.big = !entry.big;

    this.props.updateEntry(entry);
  }

  private handleStartEditMode() {
    this.setState({
      edit: true
    });
  }

  private handleStopEditMode() {
    this.setState({
      edit: false
    });
  }

  private handleAddText(entry: AlbumImage) {
    this.props.updateOrder([...this.props.entries, {
      album_id: this.props.album.id,
      big: false,
      id: 0,
      image_id: 0,
      order: entry.order - 1,
      text: "Hello"
    }]);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    view: state.fullscreen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeEntry: (entry: AlbumImage) => dispatch(removeEntry(entry)),
    setImages: (images: Image[]) => dispatch(setImages(images)),
    setView: (idx: number) => dispatch(setView(idx)),
    updateDisplay: (entry: AlbumImage) => dispatch(updateDisplay(entry)),
    updateEntry: (entry: AlbumImage) => dispatch(updateEntry(entry)),
    updateOrder: (entries: AlbumImage[]) => dispatch(updateOrder(entries))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
