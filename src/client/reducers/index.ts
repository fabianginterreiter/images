import { combineReducers } from "redux";
import users from "./users";
import session from "./session";
import options from "./options";

const imagesApp = combineReducers({
  users, session, options
})

export default imagesApp
