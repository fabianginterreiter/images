import {SET_TAGS, SORT_TAGS, SAVE_TAG, DELETE_TAG, ADD_TAG} from "../actionTypes"

export default function tags(state = [], action) {
  switch (action.type) {
    case SET_TAGS:
      return action.tags.sort((a, b) => a.name.localeCompare(b.name));
    case SORT_TAGS:
      return state.sort((a, b) => {
        if (a[action.key] < b[action.key]) {
          return action.asc ? -1 : 1;
        } else if (a[action.key] > b[action.key]) {
          return action.asc ? 1 : -1;
        }
        return 0;
      });
    case SAVE_TAG:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return tag.album;
        }
        return tag;
      });
    case DELETE_TAG:
      return state.filter((tag) => (tag.id !== action.tag.id));
    case ADD_TAG:
      return [...state, action.tag];
    default:
      return state;
  }
}
