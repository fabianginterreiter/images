import {CLEAR_TRASH, DELETE_IMAGE, REVERT_IMAGE, SET_TRASH} from "../actionTypes";

export default function options(state = [], action) {
  switch (action.type) {
    case DELETE_IMAGE:
      return [...state, action.image];
    case CLEAR_TRASH:
      return [];
    case SET_TRASH:
      return action.images;
    case REVERT_IMAGE:
      return state.filter((image) => image.id !== action.image.id);
    default:
      return state;
  }
}
