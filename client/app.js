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

const Dates = require('./Dates');

const Init = require('./components/Init');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Init}>
      <Route path="images" components={ImagesApp}>
        <Route path="dates/:year/:month/:day" component={Dates} />
        <Route path="dates/:year/:month" component={Dates} />
        <Route path="dates/:year" component={Dates} />
        <Route path="tags/:id" component={require('./Tags')} />
        <Route path="persons/:id" component={require('./Persons')} />
        <Route path="albums/:albumId" component={require('./Albums')} />
        <Route path="favorites" component={require('./Favorites')} />
        <Route path="persons" component={Persons} />
        <Route path="tags" component={Tags} />
        <Route path="albums" component={Albums} />
        <Route path="selected" component={require('./Selected')} />
        <Route path="trash" component={require('./Trash')} />
        <IndexRoute component={require('./All')} />
      </Route>
      <Route path="profiles" component={UsersManagement} />
    </Route>
  </Router>,
  document.getElementById('app')
);