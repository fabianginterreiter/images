import {CLOSE_NAVIGATION, CLOSE_OPTIONS_PANEL, OPEN_NAVIGATION, OPEN_OPTIONS_PANEL, SET_PIN_NAVIGATION} from "../actionTypes";

export default function options(state = {
  open: false,
  pinned: false,
  optionsPanelOpen: false
},                              action) {
  switch (action.type) {
    case OPEN_NAVIGATION:
      return {
        pinned: state.pinned,
        open: true,
        optionsPanelOpen: state.optionsPanelOpen
      };
      case CLOSE_NAVIGATION:
        return {
          pinned: state.pinned,
          open: false,
          optionsPanelOpen: state.optionsPanelOpen
        };
    case SET_PIN_NAVIGATION:
      return {
        pinned: action.pin,
        open: state.open,
        optionsPanelOpen: state.optionsPanelOpen
      };
    case OPEN_OPTIONS_PANEL:
      return {
        pinned: state.pinned,
        open: state.open,
        optionsPanelOpen: true
      };
    case CLOSE_OPTIONS_PANEL:
      return {
        pinned: state.pinned,
        open: state.open,
        optionsPanelOpen: false
      };
    default:
      return state;
  }
}
