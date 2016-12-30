"use strict"

const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const browserHistory = require('react-router').browserHistory;
const Redirect = require('react-router').Redirect;
const IndexRoute = require('react-router').IndexRoute;
const IndexRedirect = require('react-router').IndexRedirect;

const ImagesApp = require('./components/ImagesApp');
const Images = require('./components/Images');
const Persons = require('./components/Persons');
const Tags = require('./components/Tags');
const Albums = require('./components/Albums');
const UsersManagement = require('./components/UsersManagement');
const Trash = require('./components/Trash');

const Init = require('./components/Init');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Init}>
      <Route path="images" components={ImagesApp}>
        <Route path="dates/:year/:month/:day" component={Images} />
        <Route path="dates/:year/:month" component={Images} />
        <Route path="dates/:year" component={Images} />
        <Route path="tags/:id" component={Images} />
        <Route path="persons/:id" component={Images} />
        <Route path="albums/:albumId" component={Images} />
        <Route path="favorites" component={Images} />
        <Route path="persons" component={Persons} />
        <Route path="tags" component={Tags} />
        <Route path="albums" component={Albums} />
        <Route path="selected" component={Images} />
        <Route path="trash" component={Trash} />
        <IndexRoute component={Images} />
      </Route>
      <Route path="profiles" component={UsersManagement} />
    </Route>
  </Router>,
  document.getElementById('app')
);