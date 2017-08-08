import bookshelf from "./bookshelf";

export default class ImageTag extends bookshelf.Model<ImageTag> {
  get tableName() { return "images_tags"; }

  get hasTimestamps() {
    return true;
  }
}
