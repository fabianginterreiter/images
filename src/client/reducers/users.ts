import {ADD_USER, SET_USERS} from "../actionTypes"

export default function users(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [
          ...state,
          action.user
      ].sort((a, b) => a.name.localeCompare(b.name))
    case SET_USERS:
      return action.users.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return state
  }
}
