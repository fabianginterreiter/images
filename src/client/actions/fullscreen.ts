import {SET_VIEW} from "../actionTypes";

export const setView = (index: number) => {
  return {
    index,
    type: SET_VIEW
  };
};
