import ImageTag from "../model/ImageTag";
import Tag from "../model/Tag";
import BaseController from "./BaseController";

export default class TagsController extends BaseController {
  public create() {
    return new Tag({
      name: this.body.name
    }).save().then((result) => (result.toJSON()));
  }

  public get() {
    return new Tag({id: this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  public index() {
    return new Tag().query((qb) => {
      qb.select("tags.*");

      if (this.query.q) {
        qb.where("name", "LIKE", this.query.q);
      }

      qb.count("images_tags.tag_id AS count");
      qb.leftJoin("images_tags", function() {
        this.on("tags.id", "images_tags.tag_id");
      });
      qb.groupBy("tags.id");

      qb.orderBy("name", "asc");
    }).fetchAll().then((result) => (result.toJSON()));
  }

  public update() {
    return new Tag({id: this.params.id}).save({name: this.body.name},
      {patch: true}).then((result) => (result.toJSON()));
  }

  public destroy() {
    return new Tag({id: this.params.id}).fetch().then((result) => {
      return new Tag({id: this.params.id}).destroy().then(() => {
        return result.toJSON();
      });
    });
  }

  public addTag() {
    const tag = this.body;

    if (tag.id) {
      return new ImageTag({
        image_id: this.params.id,
        tag_id: tag.id
      }).save().then(() => tag);
    } else {
      return new Tag({
        name: tag.name
      }).save().then((tag2) => {
        return new ImageTag({
          image_id: this.params.id,
          tag_id: tag2.get("id")
        }).save().then(() => tag2.toJSON());
      });
    }
  }

  public deleteTag() {
    return new ImageTag().where({
      image_id: this.params.id,
      tag_id: this.params.tag_id
    }).destroy().then(() => {
      return new Tag().query((qb) => {
        qb.whereNotExists(function() {
          this.select("images_tags.id").from("images_tags").whereRaw("tags.id = images_tags.tag_id");
        });
      }).destroy();
    });
  }
}
