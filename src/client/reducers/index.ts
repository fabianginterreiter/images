import { combineReducers } from "redux";
import albums from "./albums";
import images from "./images";
import options from "./options";
import persons from "./persons";
import selection from "./selection";
import session from "./session";
import tags from "./tags";
import uploads from "./uploads";
import users from "./users";
import view from "./view";

const imagesApp = combineReducers({
  users, session, options, view, albums, tags, persons, selection, images, uploads
});

export default imagesApp;
