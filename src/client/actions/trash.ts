import {CLEAR_TRASH, SET_TRASH} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {Album, Image, Person, Service, Tag} from "../types";

export const loadTrash = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        images: [],
        type: SET_TRASH
      });
      Ajax.get("/api/images?trash=true").then((images) => dispatch({
        images,
        type: SET_TRASH
      }));
    }, 0);
  };
};

export const clearTrash = () => {
  return (dispatch) => Ajax.delete("/api/trash/clear").then(() => dispatch({
    type: CLEAR_TRASH
  }));
};
