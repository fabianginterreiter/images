import {SET_ALBUMS, SORT_ALBUMS, SAVE_ALBUM, DELETE_ALBUM} from "../actionTypes"

export default function albums(state = [], action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums.sort((a, b) => a.name.localeCompare(b.name));
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
    default:
      return state;
  }
}
