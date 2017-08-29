import * as $ from "jquery";
import * as React from "react";
import KeyUpListener from "../listener/KeyUpListener";

interface QuickeditProps {
  value: string;
  onCancel(): void;
  onChange(value: string): void;
}

interface QuickeditState {
  value: string;
}

export default class Quickedit extends React.Component<QuickeditProps, QuickeditState> {
  constructor(props: QuickeditProps) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  public render() {
    return (<form onSubmit={this.handleSubmit.bind(this)} className="quickedit">
      <input type="text" value={this.state.value} onBlur={this.handleBlur.bind(this)}
      autoFocus onChange={this.handleChange.bind(this)} />
    </form>);
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  private handleKeyUp(event) {
    switch (event.keyCode) {
      case 27: {
        if (this.props.onCancel) {
          this.props.onCancel();
        }
        break;
      }
    }
  }

  private handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  private handleBlur(event) {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  private handleSubmit(e) {
    e.preventDefault();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
}
