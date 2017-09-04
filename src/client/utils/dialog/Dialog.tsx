import * as React from "react";
import DialogStore from "./DialogStore";
import {DialogStoreOption} from "./DialogStore";
import {t} from "../../libs/Translation";

interface DialgoState {
  options: DialogStoreOption;
}

class Dialog extends React.Component<{}, DialgoState> {
  constructor(props) {
    super(props);
    this.state = {options: undefined};
  }

  public componentDidMount() {
    DialogStore.addChangeListener(this, (options) => (this.setState({options})));
  }

  public componentWillUnmount() {
    DialogStore.removeChangeListener(this);
  }

  public handleCancel() {
    this.state.options.reject(false);
    DialogStore.setObject(undefined);
  }

  public handleOk() {
    this.state.options.resolve(true);
    DialogStore.setObject(undefined);
  }

  public render() {
    if (!this.state.options || !this.state.options.open) {
      return (<span />);
    }

    let icon = null;

    if (this.state.options.icon) {
      icon = (<i className={this.state.options.icon} />);
    }

    return (
      <div>
        <div className="dimming" onClick={this.handleCancel.bind(this)} />
        <div className="dialog">
          <div className="title">
            {icon}
            {this.state.options.title}
          </div>
          <div className="body">{this.state.options.text}</div>
          <div className="bottom">
            <button onClick={this.handleOk.bind(this)} className={this.state.options.type}>{t("utils.dialog.ok")}</button>
            <button onClick={this.handleCancel.bind(this)}>{t("utils.dialog.cancel")}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
