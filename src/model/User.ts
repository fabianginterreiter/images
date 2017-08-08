import bookshelf from "./bookshelf";

export default class User extends bookshelf.Model<User> {
  get tableName() { return "users"; }

  get hasTimestamps() {
    return true;
  }
}
