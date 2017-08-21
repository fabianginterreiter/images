import { combineReducers } from "redux";
import users from "./users";
import session from "./session";

const imagesApp = combineReducers({
  users, session
})

export default imagesApp
