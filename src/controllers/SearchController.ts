import ImagesExtention from "../lib/ImagesExtention";
import bookshelf from "../model/bookshelf";
import Image from "../model/Image";
import ImagePerson from "../model/ImagePerson";
import BaseController from "./BaseController";

export default class SearchController extends BaseController {
  private words: string[];

  constructor(req) {
    super(req);

    this.words = this.query.s.split(" ");
  }

  public index() {
    return new Image().query((qb) => {
      qb.select("image_id", "images.*", "count");

      this.createJoin(qb, this.createSearchQuery());

      qb.limit(100);
    }).fetchAll({withRelated: ["user", "tags", "albums", "persons"]})
    .then((result) => result.toJSON())
    .then((images) => ImagesExtention(images))
    .catch(console.log);
  }

  public createJoin(qb, subquery) {
    // because qb.join(subquery, "images.id", "image_id") does not create parenthesis
    // around the subquery, we have to handle this as a joinRaw
    qb.joinRaw("inner join(" + subquery.toQuery() + ') on "images"."id" = "image_id"');
  }

  public createSearchQuery() {
    return bookshelf.knex.select("image_id")
      .count("image_id AS count")
      .from((s1) => {
          this.createSelectForPersons(s1)
          .unionAll((s2) => this.createSelectForTags(s2))
          .unionAll((s3) => this.createSelectForAlbums(s3));
      })
      .groupBy("image_id")
      .orderBy("count", "desc");
  }

  public createSelectForPersons(s1) {
    return s1.select("image_id")
      .from("images_persons")
      .join("persons", "persons.id", "images_persons.person_id")
      .where((w1) => {
        const w = w1.where("persons.name", "like", "%" + this.words[0] + "%");
        for (let index = 1; index < this.words.length; index++) {
          w.orWhere("persons.name", "like", "%" + this.words[index] + "%");
        }
      });
  }

  public createSelectForTags(s2) {
    return s2.select("image_id")
      .from("images_tags")
      .join("tags", "tags.id", "images_tags.tag_id")
      .where((w2) => {
        const w = w2.where("tags.name", "like", "%" + this.words[0] + "%");
        for (let index = 1; index < this.words.length; index++) {
          w.orWhere("tags.name", "like", "%" + this.words[index] + "%");
        }
      });
  }

  public createSelectForAlbums(s3) {
    return s3.select("image_id")
      .from("albums_images")
      .join("albums", "albums.id", "albums_images.album_id")
      .where((w3) => {
        const w = w3.where("albums.name", "like", "%" + this.words[0] + "%");
        for (let index = 1; index < this.words.length; index++) {
          w.orWhere("albums.name", "like", "%" + this.words[index] + "%");
        }
      });
  }
}
