import {SET_IMAGES, LIKE_IMAGE, UNLIKE_IMAGE} from "../actionTypes";
import {Image} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadImages = (service: string) => {
  return (dispatch) => {
    Ajax.get(service).then(images => dispatch(setImages(images)));
  }
}

export const setImages = (images: Image[]) => {
  return {
    type: SET_IMAGES,
    images: images
  }
}

export const like = (image: Image) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/like`).then(() => dispatch({
    type: LIKE_IMAGE,
    image: image
  }));
}

export const unlike = (image: Image) => {
  return (dispatch) => Ajax.put(`/api/images/${image.id}/unlike`).then(() => dispatch({
    type: UNLIKE_IMAGE,
    image: image
  }));
}
