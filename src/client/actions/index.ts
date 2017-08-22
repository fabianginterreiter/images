import {SET_SESSION, DELETE_SESSION, SET_THUMBNAIL_SIZE,
  SET_SHOW_DATE, SET_USERS, ADD_USER, OPEN_NAVIGATION,
  CLOSE_NAVIGATION, SET_PIN_NAVIGATION, OPEN_OPTIONS_PANEL,
  CLOSE_OPTIONS_PANEL, SET_ALBUMS, SORT_ALBUMS, SAVE_ALBUM} from "../actionTypes";

import {User, Album} from "../types/types";
import cookie from "react-cookie";
import Ajax from "../libs/Ajax";

export const addUser = (user: User) => {
  return {
    type: ADD_USER,
    user: user
  }
}

export const setUsers = (users: User[]) => {
  return {
    type: SET_USERS,
    users: users
  }
}

export const setSession = (user: User) => {
  return {
    type: SET_SESSION,
    user: user
  }
}

export const deleteSession = () => {
  return {
    type: DELETE_SESSION
  }
}

export const setThumbnailSize = (size: number) => {
  cookie.save("thumbnailsSize", size);
  return {
    type: SET_THUMBNAIL_SIZE,
    size: size
  }
}

export const setShowDate = (show: boolean) => {
  cookie.save("showDate", show ? "true" : "false");
  return {
    type: SET_SHOW_DATE,
    show: show
  }
}

export const openNavigation = () => {
  return {
    type: OPEN_NAVIGATION
  }
}

export const closeNavigation = () => {
  return {
    type: CLOSE_NAVIGATION
  }
}

export const setPinNavigation = (pin: boolean) => {
  cookie.save("pinned", pin ? "true" : "false");
  return {
    type: SET_PIN_NAVIGATION,
    pin: pin
  }
}

export const openOptionsPanel = () => {
  return {
    type: OPEN_OPTIONS_PANEL
  }
}

export const closeOptionsPanel = () => {
  return {
    type: CLOSE_OPTIONS_PANEL
  }
}

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
