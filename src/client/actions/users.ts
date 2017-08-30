import {ADD_USER, SET_USERS} from "../actionTypes";

import cookie from "react-cookie";
import Ajax from "../libs/Ajax";
import {Album, Image, Person, Tag, User} from "../types";

export const addUser = (user: User) => {
  return {
    type: ADD_USER,
    user
  };
};

export const setUsers = (users: User[]) => {
  return {
    type: SET_USERS,
    users
  };
};
