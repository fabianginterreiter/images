var Options = require('./Options');
var React = require('react');

var OptionsList = require('./OptionsList');

var ImagesStore = require('../stores/ImagesStore');

class Navigations extends React.Component {
  constructor(props) {
    super(props, 'left');
    this.state = {
      open: false,
      values: []
    }
    this.selected = 'all';
  }

  componentDidMount() {
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
    this.close();
  }

  isSelected(option) {
    return this.selected === option.key;
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  render() {
    var style = {};
    var clickCatcher = (<span />);

    if (this.state.open) {
      style.width = '300px';

      clickCatcher = (<div className="click" onClick={this.close.bind(this)} />);
    }

    return (
      <div style={{position: 'relative'}}>
        <div onClick={this.open.bind(this)}>Images</div>
        {clickCatcher}
        <div className="panel left" style={style}>
          <div onClick={this.close.bind(this)} className="title">Images</div>
          <div style={{clear:'both'}} />
          <OptionsList values={this.state.values} onClick={this.handleClick.bind(this)} selected={this.isSelected.bind(this)} />
        </div>
      </div>);
  }
}

module.exports = Navigations;