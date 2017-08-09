import bookshelf from "./bookshelf";
import Image from "./Image";

export default class Tag extends bookshelf.Model<Tag> {
  get tableName() { return "tags"; }

  get hasTimestamps() {
    return true;
  }

  public images() {
    return this.belongsToMany(Image);
  }
}
