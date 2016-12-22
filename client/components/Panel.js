var React = require('react');

class Panel extends React.Component {
  render() {
    var clickCatcher = (<span />);

    if (this.props.clickCatcher) {
      clickCatcher = (<div className="click" onClick={this.props.onClickCatcherClick} />);
    }

    var style = {};

    if (this.props.open) {
      style.width = '300px';
    }

    return (
      <div>
        {clickCatcher}
        <div className={'panel ' + this.props.side} style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Panel;