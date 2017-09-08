import { combineReducers } from "redux";
import {localizeReducer} from "../libs/Translation";
import albums from "./albums";
import fullscreen from "./fullscreen";
import images from "./images";
import options from "./options";
import persons from "./persons";
import selection from "./selection";
import service from "./service";
import session from "./session";
import stats from "./stats";
import tags from "./tags";
import trash from "./trash";
import uploads from "./uploads";
import users from "./users";
import view from "./view";

const imagesApp = combineReducers({
  users, session, options, view, albums, tags, persons, selection, images, uploads, service, stats, trash, localizeReducer, fullscreen
});

export default imagesApp;
