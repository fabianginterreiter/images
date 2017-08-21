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
import imagesApp from "./reducers"
import * as ReactRedux from "react-redux";
import { createStore } from "Redux";
import { addUser, setUsers, setSession, setThumbnailSize, setShowDate } from "./actions";
import Ajax from "./libs/Ajax"
import cookie from "react-cookie";

const { Router, Route, browserHistory, Redirect, IndexRoute, IndexRedirect } = ReactRouter;

let store = createStore(imagesApp);

store.dispatch(setThumbnailSize(cookie.load("thumbnailsSize") ? cookie.load("thumbnailsSize") : 200));
store.dispatch(setShowDate(cookie.load("showDate") === "true"));
Ajax.get("/api/users").then(users => store.dispatch(setUsers(users)));
Ajax.get("/api/session").then((user) => {
  store.dispatch(setSession((user)))

  ReactDOM.render(
    <ReactRedux.Provider store={store}>
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
      </Router>
    </ReactRedux.Provider>,
    document.getElementById("app")
  );

});
