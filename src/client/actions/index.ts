import cookie from "react-cookie";
import { setPinNavigation } from "./view";
import {setShowDate, setThumbnailSize} from "./options";

export * from "./session";
export * from "./selection";
export * from "./albums";
export * from "./tags";
export * from "./persons";
export * from "./users";
export * from "./view";
export * from "./options";
export * from "./images";
export * from "./uploads";

export const loadCookieValues = () => {
  return (dispatch) => {
    dispatch(setThumbnailSize(cookie.load("thumbnailsSize") ? cookie.load("thumbnailsSize") : 200));
    dispatch(setShowDate(cookie.load("showDate") === "true"));
    dispatch(setPinNavigation(cookie.load("pinned") === "true"));
  }
}
