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
