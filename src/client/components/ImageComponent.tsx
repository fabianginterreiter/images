import * as $ from "jquery";
import * as React from "react";
import ViewPointStore from "../stores/ViewPointStore";
import {Image} from "../types/types";

interface ImageComponentProps {
  style: Object;
  image: Image;
}

interface ImageComponentState {
  visible: boolean;
}

export default class ImageComponent extends React.Component<ImageComponentProps, ImageComponentState> {
  private offsetTop: number;

  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  componentDidMount() {
    return;
    //ViewPointStore.addChangeListener(this, this.handleScroll.bind(this));
    //this.offsetTop = $(this.refs.child).offset().top - 1000;
    //this.handleScroll(ViewPointStore.getObject());
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      this.offsetTop = $(this.refs.child).offset().top - 1000;
    }
  }

  componentWillUnmount() {
    //ViewPointStore.removeChangeListener(this);
  }

  handleScroll(view) {
    if (!this.state.visible && this.offsetTop < view) {
      this.setState({
        visible: true
      });
      //ViewPointStore.removeChangeListener(this);
    }
  }

  render() {
    if (!this.state.visible) {
      return (
        <div style={this.props.style} className="preloaded" ref="child" />
      );
    }
    return (<img src={"/thumbs/" + this.props.image.path} alt={this.props.image.filename} style={this.props.style} />);
  }
}
