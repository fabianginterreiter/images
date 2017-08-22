import { combineReducers } from "redux";
import users from "./users";
import session from "./session";
import options from "./options";
import view from "./view";
import albums from "./albums";
import tags from "./tags";
import persons from "./persons";

const imagesApp = combineReducers({
  users, session, options, view, albums, tags, persons
})

export default imagesApp
