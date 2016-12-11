var Options = require('./Options');
var React = require('react');

var OptionsList = require('./OptionsList');

var ImagesStore = require('../stores/ImagesStore');
var NavigationsControlStore = require('../stores/NavigationsControlStore');

class Navigations extends React.Component {
  constructor(props) {
    super(props, 'left');
    this.state = {
      values: []
    }
    this.selected = 'all';
  }

  componentDidMount() {
    NavigationsControlStore.addChangeListener(function() {
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
    NavigationsControlStore.close();
  }

  isSelected(option) {
    return this.selected === option.key;
  }

  render() {
    var style = {};
    var clickCatcher = (<span />);

    if (NavigationsControlStore.getObject().open) {
      style.width = '300px';
      clickCatcher = (<div className="click" onClick={NavigationsControlStore.close.bind(NavigationsControlStore)} />);
    }

    return (
      <div>
        {clickCatcher}
        <div className="panel left" style={style}>
          <div onClick={NavigationsControlStore.close.bind(NavigationsControlStore)} className="title">Images</div>
          <div style={{clear:'both'}} />
          <OptionsList values={this.state.values} onClick={this.handleClick.bind(this)} selected={this.isSelected.bind(this)} />
          <div className="footer">
            PIN
          </div>
        </div>
      </div>);
  }
}

module.exports = Navigations;