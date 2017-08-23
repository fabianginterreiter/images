import {SET_USERS, ADD_USER} from "../actionTypes";

import {User, Album, Person, Tag, Image} from "../types/types";
import cookie from "react-cookie";
import Ajax from "../libs/Ajax";

export const addUser = (user: User) => {
  return {
    type: ADD_USER,
    user: user
  }
}

export const setUsers = (users: User[]) => {
  return {
    type: SET_USERS,
    users: users
  }
}
