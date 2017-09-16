import {ADD_ENTRY, REMOVE_ENTRY, SET_ALBUM, SET_IMAGE_SERVICE, SET_IMAGES, SET_NUMBER_OF_IMAGES, UPDATE_ENTRY} from "../actionTypes";
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
  };
};

export const updateOrder = (entries: AlbumImage[]) => {
  return (dispatch) => {
    entries.sort((a, b) => a.order - b.order).filter((entry, index) => {
      const order = (index + 1) * 10;
      if (entry.order !== order) {
        entry.order = order;
        return true;
      } else {
        return false;
      }
    }).map((entry) => {
      if (entry.id) {
        Ajax.put(`/api/albums/${entry.album_id}/entries/${entry.id}`, entry).then(() => dispatch({
          entry,
          type: UPDATE_ENTRY
        }));
      } else {
        Ajax.post(`/api/albums/${entry.album_id}/entries`, entry).then((result) => {
          dispatch({
            entry: result,
            type: ADD_ENTRY
          });
        });
      }
    });
  };
};

export const removeEntry = (entry: AlbumImage) => {
  return (dispatch) => {
    Ajax.delete(`/api/albums/${entry.album_id}/entries/${entry.id}`).then(() => dispatch({
      entry,
      type: REMOVE_ENTRY
    }));
  };
};
