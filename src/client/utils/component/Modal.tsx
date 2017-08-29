import * as React from "react";
import KeyUpListener from "../listener/KeyUpListener";

interface ModalProps {
  onCancel(): void;
}

export default class Modal extends React.Component<ModalProps, {}> {
  public render() {
    return (
      <div>
        <div className="dimming" />
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  private handleKeyUp(event) {
    if (this.props.onCancel && event.keyCode === 27) { // ESC
      this.props.onCancel();
    }
  }
}
