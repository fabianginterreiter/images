import {SET_SESSION, DELETE_SESSION} from "../actionTypes";
import {User} from "../types/types";
import Ajax from "../libs/Ajax";

export const setSession = (user: User) => {
  return {
    type: SET_SESSION,
    user: user
  }
}

export const deleteSession = () => {
  return (dispatch) => Ajax.delete("/api/session").then(() => dispatch({
    type: DELETE_SESSION
  }));
}
