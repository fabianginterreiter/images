var React = require('react');

var NavigationsState = require('../states/NavigationsState');
var UserState = require('../states/UserState');
var Uploader = require('./Uploader');
var DragAndDropUpload = require('./DragAndDropUpload');
var ImagesStore = require('../stores/ImagesStore');
var Header = require('./Header');
var UsersManagement = require('./UsersManagement');
var Navigations = require('./Navigations');


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
      contentClass += ' open';
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
      </div>
    );
  }
};

module.exports = ImagesApp;