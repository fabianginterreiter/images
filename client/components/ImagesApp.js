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

    this.state = {
      user: null
    };
  }

  handleUserChange() {
    var user = UserState.getUser();

    console.log("Set User to: " + (user ? user.name : 'null'));

    this.setState({
      user: user
    });

    if (!user) {
      var history = require('react-router').hashHistory;
      history.push('/profiles');
    }
  }

  componentDidMount() {
    UserState.addChangeListener(this.handleUserChange.bind(this));
    NavigationsState.addChangeListener(this.handleNavigationChange.bind(this));
    UserState.load();
  }

  handleNavigationChange() {
    this.forceUpdate();
  }

  render() {
    if (!this.state.user) {
      return (<UsersManagement />);
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