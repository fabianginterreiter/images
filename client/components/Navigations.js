"use strict"

const Options = require('./Options');
const React = require('react');
const OptionsList = require('./OptionsList');
const ImagesStore = require('../stores/ImagesStore');
const NavigationsStore = require('../stores/NavigationsStore');
const NavigationsState = require('../states/NavigationsState');
const UserState = require('../states/UserState');
const history = require('react-router').browserHistory;
const Panel = require('./Panel');

class Navigations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: NavigationsStore.getObject(),
      query: ''
    }
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this, function() {
      if (NavigationsState.getObject().open) {
        this.setState({
          query: ''
        });
      } else {
        this.forceUpdate();  
      }
    }.bind(this));

    NavigationsStore.addChangeListener(this, (navigations) => this.setState({values:navigations}));
  }

  componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
    NavigationsStore.removeChangeListener(this);
  }

  handleClick(option) {
    history.push(option.link);

    NavigationsState.close();
  }

  handleSearchChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  isSelected(option) {
    return this.props.location.pathname === option.link;
  }

  handleChangeUser() {
    UserState.clear();
    NavigationsState.close();
  }

  render() {
    var open = (NavigationsState.getObject().open || NavigationsState.getObject().pinned);

    var clickCatcher = (NavigationsState.getObject().open && !NavigationsState.getObject().pinned);

    var pinClass = "badge min500";
    if (NavigationsState.getObject().pinned) {
      pinClass += " selected";
    }

    return (
      <Panel open={open} clickCatcher={clickCatcher} onClickCatcherClick={NavigationsState.close.bind(NavigationsState)} side='left'>
        <div className="title">
          <span onClick={NavigationsState.close.bind(NavigationsState)}><i className="icon-camera-retro"></i> Images</span>
          <input type="text" onChange={this.handleSearchChange.bind(this)} value={this.state.query} placeholder="Search" />
          <div className={pinClass} onClick={NavigationsState.pin.bind(NavigationsState)}><i className="icon-pushpin icon-large"></i></div>
        </div>
        <div style={{clear:'both'}} />
        <div className="body">
          <OptionsList values={this.state.values} onClick={this.handleClick.bind(this)} selected={this.isSelected.bind(this)} query={this.state.query} />
        </div>
        <div className="footer">
          <div className="profile" onClick={this.handleChangeUser.bind(this)}><i className="icon-user"></i> {UserState.getUser().name}</div>
        </div>
      </Panel>);
  }
}

module.exports = Navigations;