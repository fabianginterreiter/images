import {CLEAR_SELECTION, SELECT, TOGGLE_SELECTION, UNSELECT} from "../actionTypes";
import {Image} from "../types/types";

export const select = (image: Image) => {
  return {
    type: SELECT,
    image
  };
};

export const unselect = (image: Image) => {
  return {
    type: UNSELECT,
    image
  };
};

export const toggle = (image: Image) => {
  return {
    type: TOGGLE_SELECTION,
    image
  };
};

export const clear = () => {
  return {
    type: CLEAR_SELECTION
  };
};
