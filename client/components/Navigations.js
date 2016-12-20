var Options = require('./Options');
var React = require('react');

var OptionsList = require('./OptionsList');

var ImagesStore = require('../stores/ImagesStore');
var NavigationsState = require('../states/NavigationsState');
var UserState = require('../states/UserState');
var history = require('react-router').browserHistory;

class Navigations extends React.Component {
  constructor(props) {
    super(props, 'left');
    this.state = {
      values: []
    }
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this, function() {
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
        service: '/api/images',
        link: '/images'
      });

      navigations.push({
        key: 'favorites',
        type: 'action',
        name: 'Favorites',
        service: '/api/images/favorites',
        link: '/images/favorites'
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

  componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
  }

  handleClick(option) {
    history.push(option.link);

    NavigationsState.close();
  }

  isSelected(option) {
    return this.props.location.pathname === option.link;
  }

  handleChangeUser() {
    UserState.clear();
    NavigationsState.close();
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

    var pinClass = "badge min500";
    if (NavigationsState.getObject().pinned) {
      pinClass += " selected";
    }

    return (
      <div>
        {clickCatcher}
        <div className="panel left" style={style}>
          <div className="title">
            <span onClick={NavigationsState.close.bind(NavigationsState)}><i className="icon-camera-retro"></i> Images</span>
            <div className={pinClass} onClick={NavigationsState.pin.bind(NavigationsState)}><i className="icon-pushpin icon-large"></i></div>
          </div>
          <div style={{clear:'both'}} />
          <div className="body">
            <OptionsList values={this.state.values} onClick={this.handleClick.bind(this)} selected={this.isSelected.bind(this)} />
          </div>
          <div className="footer">
            <div className="profile" onClick={this.handleChangeUser.bind(this)}><i className="icon-user"></i> {UserState.getUser().name}</div>
          </div>
        </div>
      </div>);
  }
}

module.exports = Navigations;