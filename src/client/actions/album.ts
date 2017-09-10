import {SET_ALBUM, SET_IMAGES, SET_IMAGE_SERVICE, SET_NUMBER_OF_IMAGES, UPDATE_ENTRY} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {AlbumImage} from "../types";

export const loadAlbum = (id) => {
  return (dispatch) => setTimeout(() => {
    dispatch({
      id,
      type: SET_IMAGE_SERVICE
    });

    Ajax.get(`/api/albums/${id}/entries`).then((entries) => {
      dispatch({
        entries,
        type: SET_ALBUM
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

export const updateOrder = (entries: AlbumImage[]) => {
  return (dispatch) => {
    entries.filter((entry, index) => {
      const order = (index + 1) * 10;
      if (entry.order !== order) {
        entry.order = order;
        return true;
      } else {
        return false;
      }
    }).map((entry) => Ajax.put(`/api/albums/${entry.album_id}/entries/${entry.id}`, entry).then(() => dispatch({
      entry,
      type: UPDATE_ENTRY
    })));
  }
}
