import {Dispatcher, sort} from "../utils/Utils";
import Ajax from "../libs/Ajax";
import {User} from "../types/types";

class UsersStore extends Dispatcher<User[]> {
  constructor() {
    super([]);
    Ajax.get("/api/users").then((users) => (this.setObject(users)));
  }

  setObject(users) {
    sort(users, "name", true).then((users) => super.setObject(users));
  }
};

export default new UsersStore();
