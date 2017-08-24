import {SET_IMAGES, LIKE_IMAGE, UNLIKE_IMAGE} from "../actionTypes"

export default function images(state = [], action) {
  switch (action.type) {
    case SET_IMAGES:
      return action.images;
    case LIKE_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, liked: true};
        } else {
          return image;
        }
      });
    case UNLIKE_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, liked: false};
        } else {
          return image;
        }
      });
    default:
      return state;
  }
}
