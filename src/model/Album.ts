import bookshelf from "./bookshelf";
import Image from "./Image";
import User from "./User";

export default class Album extends bookshelf.Model<Album> {
  get tableName() { return "albums"; }

  get hasTimestamps() {
    return true;
  }

  public user() {
    return this.belongsTo(User);
  }

  public images() {
    return this.belongsToMany(Image);
  }
}
