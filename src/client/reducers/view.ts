import {SET_PIN_NAVIGATION, OPEN_NAVIGATION, CLOSE_NAVIGATION} from "../actionTypes";

export default function options(state = {
  open: false,
  pinned: false
}, action) {
  switch (action.type) {
    case OPEN_NAVIGATION:
      return {
        pinned: state.pinned,
        open: true
      }
      case CLOSE_NAVIGATION:
        return {
          pinned: state.pinned,
          open: false
        }
    case SET_PIN_NAVIGATION:
      return {
        pinned: action.pin,
        open: state.open
      }
    default:
      return state
  }
}
