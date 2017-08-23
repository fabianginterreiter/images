import {SET_THUMBNAIL_SIZE,SET_SHOW_DATE} from "../actionTypes";
import cookie from "react-cookie";

export const setThumbnailSize = (size: number) => {
  cookie.save("thumbnailsSize", size);
  return {
    type: SET_THUMBNAIL_SIZE,
    size: size
  }
}

export const setShowDate = (show: boolean) => {
  cookie.save("showDate", show ? "true" : "false");
  return {
    type: SET_SHOW_DATE,
    show: show
  }
}
