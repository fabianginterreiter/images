import {DELETE_SESSION, SET_SESSION} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {User} from "../types/types";

export const setSession = (user: User) => {
  return {
    type: SET_SESSION,
    user
  };
};

export const deleteSession = () => {
  return (dispatch) => Ajax.delete("/api/session").then(() => dispatch({
    type: DELETE_SESSION
  }));
};
