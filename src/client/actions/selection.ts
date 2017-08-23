import {SELECT, UNSELECT, TOGGLE_SELECTION, CLEAR_SELECTION} from "../actionTypes";
import {Image} from "../types/types";

export const select = (image: Image) => {
  return {
    type: SELECT,
    image: image
  }
}

export const unselect = (image: Image) => {
  return {
    type: UNSELECT,
    image: image
  }
}

export const toggle = (image: Image) => {
  return {
    type: TOGGLE_SELECTION,
    image: image
  }
}

export const clear = () => {
  return {
    type: CLEAR_SELECTION
  }
}
