import {SET_SHOW_DATE, SET_THUMBNAIL_SIZE} from "../actionTypes";

export default function options(state = {
  thumbnailsSize: 200,
  showDate: false
}, action) {
  switch (action.type) {
    case SET_SHOW_DATE:
      return {
        thumbnailsSize: state.thumbnailsSize,
        showDate: action.show
      }
    case SET_THUMBNAIL_SIZE:
      return {
        thumbnailsSize: action.size,
        showDate: state.showDate
      }
    default:
      return state
  }
}
