import {SET_ALBUMS, SORT_ALBUMS, SAVE_ALBUM, DELETE_ALBUM} from "../actionTypes";
import {Album} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadAlbums = () => {
  return (dispatch) => Ajax.get("/api/albums").then((albums) => dispatch({
    type: SET_ALBUMS,
    albums: albums
  }))
}

export const sortAlbums = (key: string, asc: boolean) => {
  return {
    type: SORT_ALBUMS,
    key: key,
    asc: asc
  }
}

export const saveAlbum = (album: Album) => {
  return (dispatch) => Ajax.put(`/api/albums/${album.id}`, album).then(() => dispatch({
    type: SAVE_ALBUM,
    album: album
  }))
}

export const deleteAlbum = (album: Album) => {
  return (dispatch) => Ajax.delete(`/api/albums/${album.id}`).then(() => dispatch({
    type: DELETE_ALBUM,
    album: album
  }));
}
