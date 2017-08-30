import {CLEAR_SELECTION, SELECT, TOGGLE_SELECTION, UNSELECT} from "../actionTypes";

export default function selection(state = [], action) {
  switch (action.type) {
    case SELECT:
      return [
          ...state,
          action.image
      ];
    case UNSELECT:
      return state.filter((image) => (image.id !== action.image.id));
    case CLEAR_SELECTION:
      return [];
    case TOGGLE_SELECTION:
      return state.find((image) => image.id === action.image.id) ?
        state.filter((image) => (image.id !== action.image.id)) :
        [...state, action.image];
    default:
      return state;
  }
}
