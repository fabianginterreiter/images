import {ADD_TAG, ADD_TAG_TO_IMAGE, DELETE_TAG, REMOVE_TAG, SAVE_TAG, SET_TAGS, SORT_TAGS} from "../actionTypes";

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
    case ADD_TAG_TO_IMAGE:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return {...tag, count: tag.count + 1};
        }
        return tag;
      });
    case REMOVE_TAG:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return {...tag, count: tag.count - 1};
        }
        return tag;
     });
    default:
      return state;
  }
}
