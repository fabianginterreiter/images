import { combineReducers } from "redux";
import users from "./users";
import session from "./session";
import options from "./options";
import view from "./view";
import albums from "./albums";

const imagesApp = combineReducers({
  users, session, options, view, albums
})

export default imagesApp
