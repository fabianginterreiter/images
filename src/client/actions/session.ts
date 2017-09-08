import {DELETE_SESSION, SET_SESSION} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {User} from "../types";
import {loadAlbums, loadPersons, loadTags} from "./index";

export const setSession = (user: User) => {
  return (dispatch) => {
    dispatch({
      type: SET_SESSION,
      user
    });

    setTimeout(() => {
      dispatch(loadAlbums());
      dispatch(loadPersons());
      dispatch(loadTags());
    }, 0);
  };
};

export const deleteSession = () => {
  return (dispatch) => Ajax.delete("/api/session").then(() => dispatch({
    type: DELETE_SESSION
  }));
};
