import cookie from "react-cookie";
import {SET_SHOW_DATE, SET_THUMBNAIL_SIZE} from "../actionTypes";

export const setThumbnailSize = (size: number) => {
  cookie.save("thumbnailsSize", size);
  return {
    size,
    type: SET_THUMBNAIL_SIZE
  };
};

export const setShowDate = (show: boolean) => {
  cookie.save("showDate", show ? "true" : "false");
  return {
    show,
    type: SET_SHOW_DATE
  };
};
