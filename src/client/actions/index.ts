import {SET_SESSION, DELETE_SESSION} from "../actionTypes";

import {User} from "../types/types";

export const addUser = (user: User) => {
  return {
    type: "ADD_USER",
    user: user
  }
}

export const setUsers = (users: User[]) => {
  return {
    type: "SET_USERS",
    users: users
  }
}

export const setSession = (user: User) => {
  return {
    type: SET_SESSION,
    user: user
  }
}

export const deleteSession = () => {
  return {
    type: DELETE_SESSION
  }
}
