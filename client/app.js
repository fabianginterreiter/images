var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;

var ImagesApp = require('./components/ImagesApp');
var Images = require('./components/Images');
var Persons = require('./components/Persons');
var Tags = require('./components/Tags');
var UsersManagement = require('./components/UsersManagement');

var Init = require('./components/Init');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Init}>
      <Route path="images" components={ImagesApp}>
        <Route path="dates/:year/:month/:day" component={Images} />
        <Route path="dates/:year/:month" component={Images} />
        <Route path="dates/:year" component={Images} />
        <Route path="tags/:id" component={Images} />
        <Route path="persons/:id" component={Images} />
        <Route path="albums/:id" component={Images} />
        <Route path="favorites" component={Images} />
        <Route path="persons" component={Persons} />
        <Route path="tags" component={Tags} />
        <IndexRoute component={Images} />
      </Route>
      <Route path="profiles" component={UsersManagement} />
    </Route>
  </Router>,
  document.getElementById('app')
);