import {ADD_ALBUM, DELETE_ALBUM, SAVE_ALBUM,
  SET_ALBUMS, SORT_ALBUMS} from "../actionTypes";
import {Album} from "../types/types";

const sort = (a: Album, b: Album) => a.name.localeCompare(b.name);

export default function albums(state = [], action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums.sort(sort);
    case SORT_ALBUMS:
      return state.sort((a, b) => {
        if (a[action.key] < b[action.key]) {
          return action.asc ? -1 : 1;
        } else if (a[action.key] > b[action.key]) {
          return action.asc ? 1 : -1;
        }
        return 0;
      });
    case SAVE_ALBUM:
      return state.map((album) => {
        if (album.id === action.album.id) {
          return action.album;
        }
        return album;
      });
    case DELETE_ALBUM:
      return state.filter((album) => (album.id !== action.album.id));
    case ADD_ALBUM:
      return [...state, action.album].sort(sort);
    default:
      return state;
  }
}
