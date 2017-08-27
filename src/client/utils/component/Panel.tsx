import * as React from "react";

interface PanelProps {
  clickCatcher: boolean;
  open: boolean;
  side: string;
  footer?: boolean;
  header?: boolean;
  onClickCatcherClick(): void;
}

export default class Panel extends React.Component<PanelProps, {}> {
  public render() {
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
