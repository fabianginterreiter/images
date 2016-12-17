var React = require('react');
var ReactDOM = require('react-dom');

var Images = require('./components/Images');

var Navigations = require('./components/Navigations');

var Uploader = require('./components/Uploader');
var DragAndDropUpload = require('./components/DragAndDropUpload');
var ImagesStore = require('./stores/ImagesStore');
var Header = require('./components/Header');

var UsersManagement = require('./components/UsersManagement');

var NavigationsState = require('./states/NavigationsState');
var UserState = require('./states/UserState');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;

class ImgApp extends React.Component {
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
  }

  componentDidMount() {
    UserState.addChangeListener(this.handleUserChange.bind(this));
    NavigationsState.addChangeListener(this.handleNavigationChange.bind(this));

    fetch('/api/session', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }).then(function(response) {
      if (response.status === 200) {
        return response.json();  
      } else {
        return null;
      }
    }).then(function(user) {
      UserState.setUser(user);
    }.bind(this));
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

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" components={ImgApp}>
      <Route path="images">
        <Route path="dates/:year/:month/:day" component={Images} />
        <Route path="dates/:year/:month" component={Images} />
        <Route path="dates/:year" component={Images} />
        <IndexRoute component={Images} />
      </Route>
      <IndexRedirect to="/images" />
    </Route>
  </Router>,
  document.getElementById('app')
);