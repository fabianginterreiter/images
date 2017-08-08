import bookshelf from "./bookshelf";
import Image from "./Image";
import User from "./User";

export default class Like extends bookshelf.Model<Like> {
  get tableName() { return "likes"; }

  get hasTimestamps() {
    return true;
  }

  public user() {
    return this.belongsTo(User);
  }

  public images() {
    return this.belongsTo(Image);
  }
}
