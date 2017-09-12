import Album from "../model/Album";
import AlbumImage from "../model/AlbumImage";
import BaseController from "./BaseController";
import Image from "../model/Image";
import ImagesExtention from "../lib/ImagesExtention";

export default class AlbumsController extends BaseController {
  public create() {
    return new Album({
      name: this.body.name,
      user_id: this.session.user
    }).save().then((result) => (result.toJSON()));
  }

  public get() {
    return new Album({id: this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  public index() {
    return new Album().query((qb) => {
      qb.select("albums.*");

      if (this.query.q) {
        qb.where("name", "LIKE", this.query.q);
      }

      if (this.query.own) {
        qb.where("albums.user_id", this.session.user);
      } else {
        qb.where("albums.user_id", this.session.user).orWhere("albums.public", ">", 0);
      }

      qb.count("albums_images.album_id AS count");
      qb.leftJoin("albums_images", function() {
        this.on("albums.id", "albums_images.album_id");
      });
      qb.groupBy("albums.id");

      qb.orderBy("name", "asc");
    }).fetchAll({withRelated: ["user"]}).then((result) => (result.toJSON()));
  }

  public update() {
    return new Album({id: this.params.id}).fetch().then((album) => {
      if (album.get("user_id").toString() !== this.session.user.toString()) {
        throw new Error("Illegal Access");
      }

      return new Album({id: this.params.id}).save({
        name: this.body.name,
        public: this.body.public
      }, {patch: true}).then((result) => (result.toJSON()));
    });
  }

  public destroy() {
    return new Album({id: this.params.id}).fetch().then((result) => {
      return new Album({id: this.params.id}).destroy().then(() => {
        return result.toJSON();
      });
    });
  }

  public addAlbum() {
    const album = this.body;

    if (album.id) {
      return new AlbumImage().query((qb) => {
        qb.count("album_id AS count");
        qb.where("album_id", album.id);
      }).fetch((result) => result.toJSON()).then((a) => {
        return new AlbumImage({
          album_id: album.id,
          image_id: this.params.id,
          order: (a.get("count") + 1) * 10,
          big: false
        }).save().then(() => album);
      });
    } else {
      return new Album({
        name: album.name,
        user_id: this.session.user
      }).save().then((result) => {
        return new AlbumImage({
          album_id: result.get("id"),
          image_id: this.params.id,
          order: 10
        }).save().then(() => result.toJSON());
      });
    }
  }

  public deleteAlbum() {
    return new AlbumImage().where({image_id: this.params.id, album_id: this.params.album_id}).destroy();
  }

  public entries() {
    return new AlbumImage().where({album_id: this.params.id})
    .orderBy("albums_images.order")
    .fetchAll()
    .then((result) => result.toJSON()).then((entries) => {
      entries.forEach((entry) => entry.big = entry.big === 1);
      return entries;
    });
  }

  public order() {
    return new AlbumImage().query((qb) => {
      qb.select("albums_images.*");

      qb.join("images", function() {
        this.on("images.id", "albums_images.image_id");
      });

      qb.where("albums_images.album_id", this.params.id);

      qb.orderBy("images.date");
    }).fetchAll().then((result) => result.toJSON()).then((entries) => {
      return Promise.all(entries.map((entry, idx) => new AlbumImage({
        id: entry.id
      }).save({
        order: (idx + 1) * 10
      }).then(() => entry)));
    })
  }

  public updateEntry() {
    return new AlbumImage({
      id: this.params.id
    }).save({
      big: this.body.big,
      order: this.body.order,
      text: this.body.text
    }).then((result) => result.toJSON());
  }

  public deleteEntry() {
    return new AlbumImage({id:this.params.entry_id}).destroy();
  }

  public addEntry() {
    return new AlbumImage({
      album_id: this.body.album_id,
      image_id: this.body.image_id,
      order: this.body.order,
      big: this.body.big,
      text: this.body.text
    }).save().then((result) => result.toJSON());
  }


}
