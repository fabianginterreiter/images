var React = require('react');

class Panel extends React.Component {
  render() {
    var clickCatcher = (<span />);

    if (this.props.clickCatcher) {
      clickCatcher = (<div className="click" onClick={this.props.onClickCatcherClick} />);
    }

    var className = 'panel ' + this.props.side;

    if (this.props.open) {
      className += ' open';
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

module.exports = Panel;