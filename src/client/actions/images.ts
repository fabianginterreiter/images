import {ADD_ALBUM_TO_IMAGE, ADD_IMAGES, ADD_PERSON_TO_IMAGE, ADD_TAG_TO_IMAGE, DELETE_IMAGE,
  LIKE_IMAGE, LOAD_MORE_IMAGES, REMOVE_ALBUM_FROM_IMAGE, REMOVE_PERSON_TO_IMAGE,
  REMOVE_TAG, REVERT_IMAGE, SET_IMAGE_SERVICE, SET_IMAGE_TITLE, SET_IMAGES, SET_NUMBER_OF_IMAGES, UNLIKE_IMAGE} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {Album, Image, Person, Service, Tag} from "../types";

export const loadImages = (path: string) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        path,
        type: SET_IMAGE_SERVICE
      });

      Ajax.get(path).then((images) => {
        dispatch(setImages(images));
        dispatch({
          numberOfImages: images.length,
          type: SET_NUMBER_OF_IMAGES
        });
      });
    }, 0);
  };
};

export const loadImagesWithOffset = (path: string) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        path,
        offset: 0,
        reload: true,
        type: SET_IMAGE_SERVICE
      });

      Ajax.get(path + (path.indexOf("?") > 0 ? "&" : "?") + "limit=100").then((images) => dispatch(setImages(images)));
      Ajax.get("/api/images/count").then((result) => dispatch({
        numberOfImages: result.count,
        type: SET_NUMBER_OF_IMAGES
      }));
    }, 0);
  };
};

export const loadMoreImages = (service: Service) => {
  return (dispatch) => {
    if (service.loading || service.end) {
      return dispatch({type: "NOTHING"});
    }

    const nextOffset = service.offset + 100;

    dispatch({
      offset: nextOffset,
      type: LOAD_MORE_IMAGES
    });

    Ajax.get(service.path + (service.path.indexOf("?") > 0 ? "&" : "?") + "limit=100&offset=" + nextOffset).then((images) => {
      dispatch({
        type: ADD_IMAGES,
        images
      });
    });
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
  return (dispatch) => Ajax.put(`/api/images/${image.id}/tags`, tag).then((result) => dispatch({
    image,
    tag: result,
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

export const addImagesToAlbum = (images: Image[], album: Album) => {
  return (dispatch) => {
    const load = (index: number) => index < images.length && Ajax.put(`/api/images/${images[index].id}/albums`, album).then(() => {
        dispatch({
        album,
        image: images[index],
        type: ADD_ALBUM_TO_IMAGE
      });
        load(index + 1);
    });

    load(0);
  };
};

export const removeAlbumFromImage = (image: Image, album: Album) => {
  return (dispatch) => Ajax.delete(`/api/images/${image.id}/albums/${album.id}`).then(() => dispatch({
    album,
    image,
    type: REMOVE_ALBUM_FROM_IMAGE
  }));
};

export const addPersonToImage = (image: Image, person: Person) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/persons`, person).then((result) => dispatch({
    image,
    person: result,
    type: ADD_PERSON_TO_IMAGE
  }));
};

export const removePersonToImage = (image: Image, person: Person) => {
  return (dispatch) => Ajax.delete(`/api/images/${image.id}/persons/${person.id}`).then(() => dispatch({
    image,
    person,
    type: REMOVE_PERSON_TO_IMAGE
  }));
};

export const deleteImage = (image: Image) => {
  return (dispatch) => Ajax.delete(`/api/images/${image.id}`).then(() => dispatch({
    image,
    type: DELETE_IMAGE
  }));
};

export const revertImage = (image: Image) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/revert`).then(() => dispatch({
    image,
    type: REVERT_IMAGE
  }));
};

export const setImageTitle = (image: Image, title: string) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}`, {...image, title}).then((result) => dispatch({
    image: result,
    type: SET_IMAGE_TITLE
  }));
};
