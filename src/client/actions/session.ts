import {SET_SESSION, DELETE_SESSION} from "../actionTypes";
import {User} from "../types/types";

export const setSession = (user: User) => {
  return {
    type: SET_SESSION,
    user: user
  }
}

export const deleteSession = () => {
  return {
    type: DELETE_SESSION
  }
}
