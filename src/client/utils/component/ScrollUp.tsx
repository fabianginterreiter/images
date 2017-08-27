import * as React from "react";
import ScrollListener from "../listener/ScrollListener";

interface ScrollUpState {
  visible: boolean;
}

export default class ScrollUp extends React.Component<{}, ScrollUpState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    ScrollListener.addChangeListener(this, this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    ScrollListener.removeChangeListener(this);
  }

  handleScroll(event) {
    if (document.body.scrollTop === 0) {
      if (this.state.visible) {
        this.setState({
          visible: false
        });
      }
    } else {
      if (!this.state.visible) {
        this.setState({
          visible: true
        });
      }
    }
  }

  handleClick() {
    window.scrollTo(0, 0);
  }

  render() {
    let style = {
      visibility: this.state.visible ? "visible" : "hidden"
    };

    return (
      <div className="scrollup" style={style} onClick={this.handleClick.bind(this)}>
        <i className="fa fa-arrow-circle-up" aria-hidden="true" />
      </div>
    );
  }
}
