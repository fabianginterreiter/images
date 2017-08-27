import { combineReducers } from "redux";
import users from "./users";
import session from "./session";
import options from "./options";
import view from "./view";
import albums from "./albums";
import tags from "./tags";
import persons from "./persons";
import selection from "./selection";
import images from "./images";
import uploads from "./uploads";

const imagesApp = combineReducers({
  users, session, options, view, albums, tags, persons, selection, images, uploads
});

export default imagesApp
