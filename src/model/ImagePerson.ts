import bookshelf from "./bookshelf";

export default class ImagePerson extends bookshelf.Model<ImagePerson> {
  get tableName() { return "images_persons"; }

  get hasTimestamps() {
    return true;
  }
}
