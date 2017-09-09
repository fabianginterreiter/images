import Album from "./Album";
import bookshelf from "./bookshelf";
import Image from "./Image";

export default class AlbumImage extends bookshelf.Model<AlbumImage> {
  get tableName() { return "albums_images"; }

  get hasTimestamps() {
    return true;
  }

  public image() {
    return this.belongsTo(Image);
  }
}
