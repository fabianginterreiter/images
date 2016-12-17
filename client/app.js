var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;

var ImagesApp = require('./components/ImagesApp');
var Images = require('./components/Images');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" components={ImagesApp}>
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