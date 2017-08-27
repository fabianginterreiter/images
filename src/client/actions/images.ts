import {SET_IMAGES, LIKE_IMAGE, UNLIKE_IMAGE, ADD_TAG_TO_IMAGE, REMOVE_TAG, ADD_ALBUM_TO_IMAGE, REMOVE_ALBUM_FROM_IMAGE} from "../actionTypes";
import {Image, Tag, Album, Person} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadImages = (service: string) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setImages([]));
      Ajax.get(service).then((images) => dispatch(setImages(images)));
    }, 0);
  };
};

export const setImages = (images: Image[]) => {
  return {
    images,
    type: SET_IMAGES
  };
};

export const like = (image: Image) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/like`).then(() => dispatch({
    image,
    type: LIKE_IMAGE
  }));
};

export const unlike = (image: Image) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/unlike`).then(() => dispatch({
    image,
    type: UNLIKE_IMAGE
  }));
};

export const addTagToImage = (image: Image, tag: Tag) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/tags`, tag).then(() => dispatch({
    image,
    tag,
    type: ADD_TAG_TO_IMAGE
  }));
};

export const removeTag = (image: Image, tag: Tag) => {
  return (dispatch) => Ajax.delete(`/api/images/${image.id}/tags/${tag.id}`).then(() => dispatch({
    image,
    tag,
    type: REMOVE_TAG
  }));
};

export const addAlbumToImage = (image: Image, album: Album) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/albums`, album).then(() => dispatch({
    album,
    image,
    type: ADD_ALBUM_TO_IMAGE
  }));
};

export const removeAlbumFromImage = (image: Image, album: Album) => {
  return (dispatch) => Ajax.delete(`/api/images/${image.id}/albums/${album.id}`).then(() => dispatch({
    album,
    image,
    type: REMOVE_ALBUM_FROM_IMAGE
  }));
};
