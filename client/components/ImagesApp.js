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

const Dialog = require('./Dialog');
const SelectDialog = require('./SelectDialog');
const SingleSelectDialog = require('./SingleSelectDialog');

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
      
    if (NavigationsState.getObject().pinned) {
      contentClass += ' pinned';
    }
    
    return (
      <div>
        <Navigations location={this.props.location} />

        <div className={contentClass}>
          <Header />
          {this.props.children}
        </div>

        <Uploader />
        <DragAndDropUpload />
        <Dialog />
        <SelectDialog />
        <SingleSelectDialog />
      </div>
    );
  }
};

module.exports = ImagesApp;