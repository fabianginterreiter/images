import cookie from "react-cookie";
import {SET_SHOW_DATE, SET_THUMBNAIL_SIZE} from "../actionTypes";

export const setThumbnailSize = (size: number) => {
  cookie.save("thumbnailsSize", size);
  return {
    type: SET_THUMBNAIL_SIZE,
    size
  };
};

export const setShowDate = (show: boolean) => {
  cookie.save("showDate", show ? "true" : "false");
  return {
    type: SET_SHOW_DATE,
    show
  };
};
