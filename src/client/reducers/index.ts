import { combineReducers } from "redux";
import users from "./users";
import session from "./session";
import options from "./options";
import view from "./view";

const imagesApp = combineReducers({
  users, session, options, view
})

export default imagesApp
