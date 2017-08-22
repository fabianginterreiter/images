import {SET_SESSION, DELETE_SESSION, SET_THUMBNAIL_SIZE,
  SET_SHOW_DATE, SET_USERS, ADD_USER, OPEN_NAVIGATION,
  CLOSE_NAVIGATION, SET_PIN_NAVIGATION, OPEN_OPTIONS_PANEL,
  CLOSE_OPTIONS_PANEL, SET_ALBUMS, SORT_ALBUMS, SAVE_ALBUM, DELETE_ALBUM,
  SET_TAGS, SORT_TAGS, SAVE_TAG, DELETE_TAG,
  SET_PERSONS, SORT_PERSONS, SAVE_PERSON, DELETE_PERSON,
  SELECT, UNSELECT, TOGGLE_SELECTION, CLEAR_SELECTION
} from "../actionTypes";

import {User, Album, Person, Tag, Image} from "../types/types";
import cookie from "react-cookie";
import Ajax from "../libs/Ajax";

export const select = (image: Image) => {
  return {
    type: SELECT,
    image: image
  }
}

export const unselect = (image: Image) => {
  return {
    type: UNSELECT,
    image: image
  }
}

export const toggle = (image: Image) => {
  return {
    type: TOGGLE_SELECTION,
    image: image
  }
}

export const clear = () => {
  return {
    type: CLEAR_SELECTION
  }
}

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

export const deleteAlbum = (album: Album) => {
  return (dispatch) => Ajax.delete(`/api/albums/${album.id}`).then(() => dispatch({
    type: DELETE_ALBUM,
    album: album
  }));
}

export const loadTags = () => {
  return (dispatch) => Ajax.get("/api/tags").then((tags) => dispatch({
    type: SET_TAGS,
    tags: tags
  }))
}

export const sortTags = (key: string, asc: boolean) => {
  return {
    type: SORT_TAGS,
    key: key,
    asc: asc
  }
}

export const saveTag = (tag: Tag) => {
  return (dispatch) => Ajax.put(`/api/tags/${tag.id}`, tag).then(() => dispatch({
    type: SAVE_TAG,
    tag: tag
  }))
}

export const deleteTag = (tag: Tag) => {
  return (dispatch) => Ajax.delete(`/api/tags/${tag.id}`).then(() => dispatch({
    type: DELETE_TAG,
    tag: tag
  }));
}


export const loadPersons = () => {
  return (dispatch) => Ajax.get("/api/persons").then((persons) => dispatch({
    type: SET_PERSONS,
    persons: persons
  }))
}

export const sortPersons = (key: string, asc: boolean) => {
  return {
    type: SORT_PERSONS,
    key: key,
    asc: asc
  }
}

export const savePerson = (person: Person) => {
  return (dispatch) => Ajax.put(`/api/persons/${person.id}`, person).then(() => dispatch({
    type: SAVE_PERSON,
    person: person
  }))
}

export const deletePerson = (person: Person) => {
  return (dispatch) => Ajax.delete(`/api/persons/${person.id}`).then(() => dispatch({
    type: DELETE_PERSON,
    person: person
  }));
}
