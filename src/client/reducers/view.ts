import {CLOSE_NAVIGATION, CLOSE_OPTIONS_PANEL, OPEN_NAVIGATION, OPEN_OPTIONS_PANEL, SET_PIN_NAVIGATION, SET_WIDTH} from "../actionTypes";

export default function options(state = {
  open: false,
  pinned: false,
  optionsPanelOpen: false,
  width: 0
}, action) {
  switch (action.type) {
    case OPEN_NAVIGATION:
      return {
        ...state,
        open: true
      };
      case CLOSE_NAVIGATION:
        return {
          ...state,
          open: false
        };
    case SET_PIN_NAVIGATION:
      return {
        ...state,
        pinned: action.pin
      };
    case OPEN_OPTIONS_PANEL:
      return {
        ...state,
        optionsPanelOpen: true
      };
    case CLOSE_OPTIONS_PANEL:
      return {
        ...state,
        optionsPanelOpen: false
      };

    case SET_WIDTH:
      return {...state, width: action.width};
    default:
      return state;
  }
}
