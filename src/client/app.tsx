"use strict"

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect, IndexRoute, IndexRedirect } from 'react-router'
import * as ImagesApp from './components/ImagesApp'
import * as Images from './components/Images'
import * as All from './components/All'
import * as Favorites from './components/Favorites'
import * as Persons from './components/Persons'
import * as Tags from './components/Tags'
import * as Albums from './components/Albums'
import * as Person from './components/Person'
import * as Tag from './components/Tag'
import * as Album from './components/Album'
import * as UsersManagement from './components/UsersManagement'
import * as Dates from './components/Dates'
import * as DateView from './components/DateView'
import * as Init from './components/Init'
import * as Search from './components/Search'
import * as Trash from './components/Trash'
import * as Selected from './components/Selected'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Init}>
      <Route path="images" components={ImagesApp}>
        <Route path="dates/:year/:month/:day" component={DateView} />
        <Route path="dates/:year/:month" component={DateView} />
        <Route path="dates/:year" component={DateView} />
        <Route path="tags/:id" component={Tag} />
        <Route path="persons/:id" component={Person} />
        <Route path="albums/:albumId" component={Album} />
        <Route path="favorites" component={Favorites} />
        <Route path="persons" component={Persons} />
        <Route path="tags" component={Tags} />
        <Route path="albums" component={Albums} />
        <Route path="dates" component={Dates} />
        <Route path="selected" component={Selected} />
        <Route path="trash" component={Trash} />
        <Route path="search" component={Search} />
        <IndexRoute component={All} />
      </Route>
      <Route path="profiles" component={UsersManagement} />
    </Route>
  </Router>,
  document.getElementById('app')
);
