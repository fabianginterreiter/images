import * as React from 'react'

class Panel extends React.Component {
  render() {
    var clickCatcher = (<span />);

    if (this.props.clickCatcher && this.props.open) {
      clickCatcher = (<div className="click" onClick={this.props.onClickCatcherClick} />);
    }

    var className = 'panel ' + this.props.side;

    if (this.props.open) {
      className += ' open';
    }

    if (this.props.footer) {
      className += ' hasFooter';
    }

    if (this.props.header) {
      className += ' hasHeader';
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

export default Panel;
