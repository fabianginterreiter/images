import bookshelf from "./bookshelf";
import Image from "./Image";

export default class Person extends bookshelf.Model<Person> {
  get tableName() { return "persons"; }

  get hasTimestamps() {
    return true;
  }

  public images() {
    return this.belongsToMany(Image);
  }
}
