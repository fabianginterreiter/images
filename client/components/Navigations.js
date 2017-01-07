"use strict"

const Options = require('./Options');
const React = require('react');
const OptionsList = require('../utils/Utils').OptionsList;
const ImagesStore = require('../stores/ImagesStore');
const NavigationsStore = require('../stores/NavigationsStore');
const NavigationsState = require('../states/NavigationsState');
const UserState = require('../states/UserState');
const history = require('react-router').browserHistory;
const Panel = require('../utils/Utils').Panel;
const Title = require('./Title');

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

  handleSettingClick(option) {
    history.push(option.settings);
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
  }

  render() {
    var open = (NavigationsState.getObject().open || NavigationsState.getObject().pinned);

    var clickCatcher = (NavigationsState.getObject().open && !NavigationsState.getObject().pinned);

    var pinClass = null;
    if (NavigationsState.getObject().pinned) {
      pinClass = "fa fa-toggle-on";
    } else {
      pinClass = "fa fa-toggle-off";
    }

    return (
      <Panel open={open} clickCatcher={clickCatcher} onClickCatcherClick={NavigationsState.close.bind(NavigationsState)} side='left' header={true}>
        <div className="title">
          <span onClick={NavigationsState.close.bind(NavigationsState)}><Title /></span>
          <input type="text" onChange={this.handleSearchChange.bind(this)} value={this.state.query} placeholder="Search" />
          <div className="badge min500" onClick={NavigationsState.pin.bind(NavigationsState)}><i className={pinClass} aria-hidden="true" /></div>
        </div>
        <div style={{clear:'both'}} />
        <div className="body">
          <OptionsList values={this.state.values} 
            onClick={this.handleClick.bind(this)} 
            onSettingsClick={this.handleSettingClick.bind(this)}
            selected={this.isSelected.bind(this)} 
            query={this.state.query} />
        </div>
      </Panel>);
  }
}

module.exports = Navigations;