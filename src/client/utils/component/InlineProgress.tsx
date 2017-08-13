import * as React from "react"

interface InlineProgressProps {
  progress: number;
}

export default class InlineProgress extends React.Component<InlineProgressProps, {}> {
  render() {
    return (
      <div className="inlineProgress">
        <div className="green" style={{width: this.props.progress + "%"}} />
      </div>
    );
  }
}
