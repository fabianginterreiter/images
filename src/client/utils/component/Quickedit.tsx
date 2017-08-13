import * as React from "react"
import * as $ from "jquery"
import KeyUpListener from "../listener/KeyUpListener"

interface QuickeditProps {
  value: string;
  onCancel():void;
  onChange(value:string):void;
}

interface QuickeditState {
  value: string;
}

export default class Quickedit extends React.Component<QuickeditProps, QuickeditState> {
  constructor(props: QuickeditProps) {
    super(props);

    this.state = {
      value: props.value
    }
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 27: {
        if (this.props.onCancel) {
          this.props.onCancel();
        }
        break;
      }
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleBlur(event) {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    return (<form onSubmit={this.handleSubmit.bind(this)} className="quickedit">
      <input type="text" value={this.state.value} onBlur={this.handleBlur.bind(this)} autoFocus onChange={this.handleChange.bind(this)} />
    </form>);
  }
}
