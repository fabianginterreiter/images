import * as React from "react";

interface DropdownProps {
  open: boolean;
  onCancel(): void;
}

export default class Dropdown extends React.Component<DropdownProps, {}> {
  render() {
    if (!this.props.open) {
      return (<span />);
    }

    return (
      <div>
        <div className="click" onClick={this.props.onCancel} />
        <div className="menu">
          {this.props.children}
        </div>
      </div>
    );
  }
}
