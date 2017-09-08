import {ADD_IMAGES, LOAD_MORE_IMAGES, REACHED_END, SET_IMAGE_SERVICE, SET_IMAGES} from "../actionTypes";

export default function session(state = {
  end: false,
  loading: false,
  offset: 0,
  reload: false,
  url: null
}, action) {
  switch (action.type) {
    case SET_IMAGE_SERVICE:
      return {path: action.path, loading: true, offset: 0, end: false, reload: action.reload};
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
