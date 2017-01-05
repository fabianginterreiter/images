"use strict"

const React = require('react');
const NavigationsState = require('../states/NavigationsState');
const UserState = require('../states/UserState');
const Uploader = require('./Uploader');
const DragAndDropUpload = require('./DragAndDropUpload');
const ImagesStore = require('../stores/ImagesStore');
const Header = require('./Header');
const UsersManagement = require('./UsersManagement');
const Navigations = require('./Navigations');

const Selection = require('./selections/Selection');

const Main = require('../utils/Utils').Main;

class ImagesApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this, this.handleNavigationChange.bind(this));
  }

  componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
  }

  handleNavigationChange() {
    this.forceUpdate();
  }

  render() {
    if (!UserState.getUser()) {
      return (<div>Not User</div>);
    }

    var contentClass = 'content';
    var pinned = '';      
    if (NavigationsState.getObject().pinned) {
      contentClass += ' pinned';
      pinned = 'pinned';
    }


    return (
      <div>
        <Navigations location={this.props.location} />

        <div className={contentClass}>
          <Selection className={pinned} params={this.props.params}  />
          <Header params={this.props.params} />
          <div className="main">
            {this.props.children}
          </div>
        </div>

        <Uploader />
        <DragAndDropUpload />
        <Main />
      </div>
    );
  }
};

module.exports = ImagesApp;