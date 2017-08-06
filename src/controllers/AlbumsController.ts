import Album from "../model/Album";
import AlbumImage from "../model/AlbumImage";
import BaseController from "./BaseController";

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
    return Album.query((qb) => {
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
      if (album.get("user_id") != this.session.user) {
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
      return new AlbumImage({
        album_id: album.id,
        image_id: this.params.id
      }).save().then(() => album);
    } else {
      return new Album({
        name: album.name,
        user_id: this.session.user
      }).save().then((album) => {
        return new AlbumImage({
          album_id: album.get("id"),
          image_id: this.params.id
        }).save().then(() => album.toJSON());
      });
    }
  }

  public deleteAlbum() {
    return AlbumImage.where({image_id: this.params.id, album_id: this.params.album_id}).destroy();
  }
}
