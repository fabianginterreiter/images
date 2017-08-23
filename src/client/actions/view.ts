import {OPEN_NAVIGATION,
  CLOSE_NAVIGATION, SET_PIN_NAVIGATION, OPEN_OPTIONS_PANEL,
  CLOSE_OPTIONS_PANEL
} from "../actionTypes";

import cookie from "react-cookie";

export const openNavigation = () => {
  return {
    type: OPEN_NAVIGATION
  }
}

export const closeNavigation = () => {
  return {
    type: CLOSE_NAVIGATION
  }
}

export const setPinNavigation = (pin: boolean) => {
  cookie.save("pinned", pin ? "true" : "false");
  return {
    type: SET_PIN_NAVIGATION,
    pin: pin
  }
}

export const openOptionsPanel = () => {
  return {
    type: OPEN_OPTIONS_PANEL
  }
}

export const closeOptionsPanel = () => {
  return {
    type: CLOSE_OPTIONS_PANEL
  }
}
