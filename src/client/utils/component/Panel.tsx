import * as React from "react";

interface PanelProps {
  clickCatcher: boolean;
  open: boolean;
  onClickCatcherClick(): void;
  side: string;
  footer?: boolean;
  header?: boolean;
}

interface PanelState {

}

export default class Panel extends React.Component<PanelProps, PanelState> {
  render() {
    let clickCatcher = (<span />);

    if (this.props.clickCatcher && this.props.open) {
      clickCatcher = (<div className="click" onClick={this.props.onClickCatcherClick} />);
    }

    let className = "panel " + this.props.side;

    if (this.props.open) {
      className += " open";
    }

    if (this.props.footer) {
      className += " hasFooter";
    }

    if (this.props.header) {
      className += " hasHeader";
    }

    return (
      <div className="panelm">
        {clickCatcher}
        <div className={className}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
