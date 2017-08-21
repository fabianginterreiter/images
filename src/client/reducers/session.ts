import {SET_SESSION, DELETE_SESSION} from "../actionTypes";

export default function session(state = null, action) {
  switch (action.type) {
    case SET_SESSION:
      return action.user;
    case DELETE_SESSION:
      return null;
    default:
      return state
  }
}
