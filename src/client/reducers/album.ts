import {SET_ALBUM, SET_IMAGE_SERVICE, UPDATE_ENTRY, REMOVE_ALBUM_FROM_IMAGE} from "../actionTypes";

export default function options(state = [], action) {
  switch (action.type) {
    case SET_ALBUM:
      return action.entries.sort((a, b) => a.order - b.order);;
    case SET_IMAGE_SERVICE:
      return [];
    case UPDATE_ENTRY:
      return state.map((entry) => {
        if (entry.id === action.entry.id) {
          return {...action.entry};
        }
        return entry;
      }).sort((a, b) => a.order - b.order);
    case REMOVE_ALBUM_FROM_IMAGE:
      return state.filter((entry) => action.image.id !== entry.image_id);
    default:
      return state;
  }
}