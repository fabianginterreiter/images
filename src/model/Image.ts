import Album from "./Album";
import bookshelf from "./bookshelf";
import ImageTag from "./ImageTag";
import Person from "./Person";
import Tag from "./Tag";
import User from "./User";

export default class Image extends bookshelf.Model<Image> {
  get tableName() {
    return "images";
  }

  get hasTimestamps() {
    return true;
  }

  public user() {
    return this.belongsTo(User);
  }

  public albums() {
    return this.belongsToMany(Album);
  }

  public tags() {
    return this.belongsToMany(Tag);
  }

  public persons() {
    return this.belongsToMany(Person).withPivot(["top", "left", "height", "width"]);
  }
}
