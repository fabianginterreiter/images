import {SET_IMAGES, LIKE_IMAGE, UNLIKE_IMAGE, ADD_TAG_TO_IMAGE, REMOVE_TAG} from "../actionTypes"

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
    case ADD_TAG_TO_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          image.tags = [...image.tags, action.tag];
        }
        return image;
      });
    case REMOVE_TAG:
      return state.map((image) => {
        if (image.id === action.image.id) {
          image.tags = image.tags.filter((tag) => (tag.id === action.tag.id));
        }
        return image;
      });
    default:
      return state;
  }
}
