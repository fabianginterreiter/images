import {User} from "../types/types";

export const addUser = (user: User) => {
  return {
    type: "ADD_USER",
    user: user
  }
}
