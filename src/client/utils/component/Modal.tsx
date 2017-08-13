import * as React from "react"
import KeyUpListener from "../listener/KeyUpListener"

interface ModalProps {
  onCancel():void;
}

interface ModalState {

}

export default class Modal extends React.Component<ModalProps, ModalState> {
  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  handleKeyUp(event) {
    if (this.props.onCancel && event.keyCode === 27) { //ESC
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div>
        <div className="dimming" />
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}
