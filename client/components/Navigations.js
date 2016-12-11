var Options = require('./Options');
var React = require('react');

var OptionsList = require('./OptionsList');

var ImagesStore = require('../stores/ImagesStore');
var NavigationsState = require('../states/NavigationsState');

class Navigations extends React.Component {
  constructor(props) {
    super(props, 'left');
    this.state = {
      values: []
    }
    this.selected = 'all';
  }

  componentDidMount() {
    NavigationsState.addChangeListener(function() {
      this.forceUpdate();
    }.bind(this));

    fetch('/api/navigations', {
      accept: 'application/json',
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      var navigations = [];

      navigations.push({
        key: 'all',
        type: 'action',
        name: 'All',
        service: '/api/images'
      });

      navigations.push({
        type: 'divider'
      });

      result.forEach((option) => (navigations.push(option)));

      this.setState({
        values: navigations
      });
    }.bind(this));
  }

  handleClick(option) {
    ImagesStore.load(option.service);
    this.selected = option.key;
    NavigationsState.close();
  }

  isSelected(option) {
    return this.selected === option.key;
  }

  render() {
    var style = {};
    var clickCatcher = (<span />);

    if (NavigationsState.getObject().open || NavigationsState.getObject().pinned) {
      style.width = '300px';
    }

    if (NavigationsState.getObject().open && !NavigationsState.getObject().pinned) {
      clickCatcher = (<div className="click" onClick={NavigationsState.close.bind(NavigationsState)} />);
    }

    var pinClass = "badge";
    if (NavigationsState.getObject().pinned) {
      pinClass += " selected";
    }

    return (
      <div>
        {clickCatcher}
        <div className="panel left" style={style}>
          <div className="title">
            <span onClick={NavigationsState.close.bind(NavigationsState)}>Images</span>
            <div className={pinClass} onClick={NavigationsState.pin.bind(NavigationsState)}><i className="icon-pushpin"></i></div>
          </div>
          <div style={{clear:'both'}} />
          <OptionsList values={this.state.values} onClick={this.handleClick.bind(this)} selected={this.isSelected.bind(this)} />
          <div className="footer">
          </div>
        </div>
      </div>);
  }
}

module.exports = Navigations;