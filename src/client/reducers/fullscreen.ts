import {SET_VIEW} from "../actionTypes";

export default function options(state = -1, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.index;
    default:
      return state;
  }
}
