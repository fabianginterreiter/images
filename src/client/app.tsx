import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import Album from "./components/Album";
import Albums from "./components/Albums";
import { All } from "./components/All";
import Dates from "./components/Dates";
import DateView from "./components/DateView";
import Favorites from "./components/Favorites";
import Images from "./components/Images";
import ImagesApp from "./components/ImagesApp";
import Init from "./components/Init";
import Person from "./components/Person";
import Persons from "./components/Persons";
import Search from "./components/Search";
import Selected from "./components/Selected";
import Tag from "./components/Tag";
import Tags from "./components/Tags";
import Trash from "./components/Trash";
import UsersManagement from "./components/UsersManagement";

const { Router, Route, browserHistory, Redirect, IndexRoute, IndexRedirect } = ReactRouter;

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
  document.getElementById("app")
);