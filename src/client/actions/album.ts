import {SET_ALBUM, SET_IMAGES, SET_IMAGE_SERVICE, SET_NUMBER_OF_IMAGES, UPDATE_ENTRY} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {AlbumImage} from "../types";

export const loadAlbum = (id) => {
  return (dispatch) => setTimeout(() => {
    dispatch({
      id,
      type: SET_IMAGE_SERVICE
    });

    Ajax.get(`/api/albums/${id}/images`).then((result) => {
      dispatch({
        entries: result.entries,
        images: result.images,
        type: SET_ALBUM
      });

      dispatch({
        numberOfImages: result.images.length,
        type: SET_NUMBER_OF_IMAGES
      });
    });
  }, 0);
};

export const updateEntry = (entry: AlbumImage) => {
  return (dispatch) => Ajax.put(`/api/albums/${entry.album_id}/entries/${entry.id}`, entry).then(() => {
    dispatch({
      entry,
      type: UPDATE_ENTRY
    });
  });
};

export const updateDisplay = (entry: AlbumImage) => {
  return {
    entry,
    type: UPDATE_ENTRY
  }
}
