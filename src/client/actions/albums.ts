import {SET_ALBUMS, SORT_ALBUMS, SAVE_ALBUM, DELETE_ALBUM} from "../actionTypes";
import {Album} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadAlbums = () => {
  return (dispatch) => Ajax.get("/api/albums").then((albums) => dispatch({
    albums,
    type: SET_ALBUMS
  }));
};

export const sortAlbums = (key: string, asc: boolean) => {
  return {
    asc,
    key,
    type: SORT_ALBUMS
  };
};

export const saveAlbum = (album: Album) => {
  return (dispatch) => Ajax.put(`/api/albums/${album.id}`, album).then(() => dispatch({
    album,
    type: SAVE_ALBUM
  }));
};

export const deleteAlbum = (album: Album) => {
  return (dispatch) => Ajax.delete(`/api/albums/${album.id}`).then(() => dispatch({
    album,
    type: DELETE_ALBUM
  }));
};
