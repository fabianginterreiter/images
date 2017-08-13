import Ajax from "../libs/Ajax";
import {User} from "../types/types";
import {Dispatcher, sort} from "../utils/Utils";

class UsersStore extends Dispatcher<User[]> {
  constructor() {
    super([]);
    Ajax.get("/api/users").then((users) => (this.setObject(users)));
  }

  public setObject(users: User[]) {
    sort(users, "name", true).then((result) => super.setObject(result));
  }
}

export default new UsersStore();
