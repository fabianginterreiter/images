import * as React from 'react'

class InlineProgress extends React.Component {
  render() {
    return (
      <div className="inlineProgress">
        <div className="green" style={{width: this.props.progress + '%'}} />
      </div>
    );
  }
}

export default InlineProgress;
