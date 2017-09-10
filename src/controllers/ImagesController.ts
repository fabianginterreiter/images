import config from "../lib/Configuration";
import CopyImageFile from "../lib/CopyImageFile";
import ImageExtention from "../lib/ImageExtention";
import * as ImageInfo from "../lib/ImageInfo";
import ImagesExtention from "../lib/ImagesExtention";
import ResizeImage from "../lib/ResizeImage";
import Image from "../model/Image";
import User from "../model/User";
import BaseController from "./BaseController";

export default class ImagesController extends BaseController {
  public create() {
    return ImageInfo(this.file.path).then((info) => {
      const result = {
        filename: this.file.originalname,
        title: this.file.originalname,
        size: this.file.size,

        width: info.width,
        height: info.height,
        date: info.date,

        year: info.date.getFullYear(),
        month: info.date.getMonth() + 1,
        day: info.date.getDate(),

        horizontal: info.horizontal,

        user_id: this.session.user
      };

      return CopyImageFile(this.file.path, result);
    }).then((result) => {
      return ResizeImage(result, config.getThumbnailPath(), 1000, 200);
    }).then((result) => {
      return ResizeImage(result, config.getPreviewPath(), 2000, 2000);
    }).then((result) => {
      return new Image(result).save();
    }).then((result) => (result.toJSON()))
    .catch(console.log);
  }

  public get() {
    return this.getImage(this.params.id);
  }

  public index() {
    const query = this.query;

    return new Image().query((qb) => {
      const userId = this.session.user;

      qb.select("images.*");
      qb.select("likes.user_id AS liked");
      if (this.query.liked) {
        qb.join("likes", function() {
          this.on("images.id", "likes.image_id");
          this.on("likes.user_id", userId + "");
        });
      } else {
        qb.leftJoin("likes", function() {
          this.on("images.id", "likes.image_id");
          this.on("likes.user_id", userId + "");
        });
      }

      if (query.tag) {
        qb.join("images_tags", function() {
          this.on("images.id", "images_tags.image_id"),
          this.on("images_tags.tag_id", query.tag);
        });
      }

      if (query.person) {
        qb.join("images_persons", function() {
          this.on("images.id", "images_persons.image_id"),
          this.on("images_persons.person_id", query.person);
        });
      }

      if (query.album) {
        qb.join("albums_images", function() {
          this.on("images.id", "albums_images.image_id"),
          this.on("albums_images.album_id", query.album);
        });
      }

      if (this.query.year) {
        qb.where({year: this.query.year});
      }

      if (this.query.month) {
        qb.where({month: this.query.month});
      }

      if (this.query.day) {
        qb.where({day: this.query.day});
      }

      if (this.query.trash && this.query.trash === "true") {
        qb.where("images.deleted", true);
      } else {
        qb.where("images.deleted", false);
      }

      if (this.query.limit) {
        qb.limit(this.query.limit);
      }

      if (this.query.offset) {
        qb.offset(this.query.offset);
      }

      if (this.query.orderBy) {
        qb.orderBy(this.query.orderBy, "ASC");
      } else {
        qb.orderBy("date", "DESC");
      }
    }).fetchAll({withRelated: ["user", "tags", "albums", "persons"]})
    .then((images) => (images.toJSON())).then((images) => ImagesExtention(images))
    .catch(console.log);
  }

  public destroy() {
    return new Image({
      id: this.params.id
    }).save({
      deleted: true
    }, {
      patch: true
    }).then((result) => (result.toJSON()));
  }

  public revert() {
    return new Image({
      id: this.params.id
    }).save({
      deleted: false
    }, {
      patch: true
    }).then((result) => (result.toJSON()));
  }

  public count() {
    return new Image().query((qb) => {
      qb.count("id AS count");
      qb.where("images.deleted", false);
    }).fetch((result) => (result.toJSON()));
  }

  public update() {
    return new Image({
      id: this.params.id
    }).save({
      title: this.body.title
    }, {
      patch: true
    }).then(() => this.getImage(this.params.id));
  }

  private getImage(id: number) {
    return new Image().query((qb) => {
      qb.select("images.*");

      qb.select("likes.user_id AS liked");
      const userId = this.session.user;
      qb.leftJoin("likes", function() {
        this.on("images.id", "likes.image_id");
        this.on("likes.user_id", userId + "");
      });

      qb.where("images.id", id);
    }).fetch({withRelated: ["user", "tags"]}).then((image) => {
      return image.toJSON();
    }).then((image) => ImageExtention(image));
  }
}
