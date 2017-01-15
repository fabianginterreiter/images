"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect, IndexRoute, IndexRedirect } from 'react-router'
import ImagesApp from './components/ImagesApp'
import Images from './components/Images'
import Persons from './components/Persons'
import Tags from './components/Tags'
import Albums from './components/Albums'
import UsersManagement from './components/UsersManagement'
import Dates from './Dates'
import Init from './components/Init'

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
        <Route path="dates" component={require('./components/Dates')} />
        <Route path="selected" component={require('./Selected')} />
        <Route path="trash" component={require('./Trash')} />
        <Route path="search" component={require('./Search')} />
        <IndexRoute component={require('./All')} /> 
      </Route>
      <Route path="profiles" component={UsersManagement} />
    </Route>
  </Router>,
  document.getElementById('app')
);