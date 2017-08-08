import * as ImagesExtention from "../lib/ImagesExtention";
import bookshelf from "../model/bookshelf";
import Image from "../model/Image";
import ImagePerson from "../model/ImagePerson";
import BaseController from "./BaseController";

export default class SearchController extends BaseController {
  public index() {
    const words = this.query.s.split(" ");

    return new Image().query((qb) => {
      qb.select("image_id", "images.*", "count");

      qb.join(bookshelf.knex.select("image_id")
        .count("image_id AS count")
        .from((s7) => {
          s7.select("image_id")
            .from("images_persons")
            .join("persons", "persons.id", "images_persons.person_id")
            .where((s0) => {
              const w = s0.where("persons.name", "like", "%" + words[0] + "%");
              for (let index = 1; index < words.length; index++) {
                w.orWhere("persons.name", "like", "%" + words[index] + "%");
              }
            })
            .unionAll((s2) => {
              s2.select("image_id")
                .from("images_tags")
                .join("tags", "tags.id", "images_tags.tag_id")
                .where((s5) => {
                  const w = s5.where("tags.name", "like", "%" + words[0] + "%");
                  for (let index = 1; index < words.length; index++) {
                    w.orWhere("tags.name", "like", "%" + words[index] + "%");
                  }
                });
            })
            .unionAll((s3) => {
              s3.select("image_id")
                .from("albums_images")
                .join("albums", "albums.id", "albums_images.album_id")
                .where((s4) => {
                  const w = s4.where("albums.name", "like", "%" + words[0] + "%");
                  for (let index = 1; index < words.length; index++) {
                    w.orWhere("albums.name", "like", "%" + words[index] + "%");
                  }
                });
            });
        })
        .groupBy("image_id")
        .orderBy("count", "desc")
      , "images.id", "image_id");
      qb.limit(100);
    }).fetchAll({withRelated: ["user", "tags", "albums", "persons"]})
    .then((result) => result.toJSON())
    .then((images) => ImagesExtention(images));
  }

}
