import { combineReducers } from "redux";
import albums from "./albums";
import images from "./images";
import options from "./options";
import persons from "./persons";
import selection from "./selection";
import service from "./service";
import session from "./session";
import tags from "./tags";
import uploads from "./uploads";
import users from "./users";
import view from "./view";
import stats from "./stats";
import trash from "./trash";
import fullscreen from "./fullscreen";
import {localizeReducer} from "../libs/Translation";

const imagesApp = combineReducers({
  users, session, options, view, albums, tags, persons, selection, images, uploads, service, stats, trash, localizeReducer, fullscreen
});

export default imagesApp;
