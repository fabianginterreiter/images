import {LOAD_MORE_IMAGES, SET_IMAGE_SERVICE, SET_IMAGES, ADD_IMAGES, REACHED_END} from "../actionTypes";

export default function session(state = {
  url: null,
  offset: 0,
  loading: false,
  end: false
}, action) {
  switch (action.type) {
    case SET_IMAGE_SERVICE:
      return {path: action.path, loading: true, offset: 0, end: false};
    case LOAD_MORE_IMAGES:
      return {...state, offset: action.offset, loading: true};
    case ADD_IMAGES:
      return {...state, loading: false, end: action.images.length < 100};
    case SET_IMAGES:
      return {...state, loading: false, end: action.images.length < 100};
    default:
      return state;
  }
}
