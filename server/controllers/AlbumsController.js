"use strict"

const BaseController = require('./BaseController');

const Album = require('../model/Album');
const AlbumImage = require('../model/AlbumImage');

class AlbumsController extends BaseController {
  create() {
    return new Album({
      name: this.body.name,
      user_id: this.session.user
    }).save().then((result) => (result.toJSON()));
  }

  get() {
    return new Album({id:this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  index() {
    return Album.query((qb) => {
      qb.select('albums.*');

      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }

      if (this.query.own) {
        qb.where('albums.user_id', this.session.user);
      } else {
        qb.where('albums.user_id', this.session.user).orWhere('albums.public', '>', 0)  
      }

      qb.count('albums_images.album_id AS count')
      qb.leftJoin('albums_images', function() {
        this.on('albums.id', 'albums_images.album_id');
      });
      qb.groupBy('albums.id');

      qb.orderBy('name','asc');
    }).fetchAll({withRelated: ['user']}).then((result) => (result.toJSON()));
  }

  update() {
    return new Album({id:this.params.id}).fetch().then((album) => {
      console.log(album.get('user_id') + " # " + this.session.user);
      if (album.get('user_id') != this.session.user) {
        throw new Error('Illegal Access');
      }

      return new Album({id:this.params.id}).save({
        name:this.body.name,
        public:this.body.public
      }, {patch: true}).then((result) => (result.toJSON()));
    });
  }

  destroy() {
    return new Album({id:this.params.id}).fetch().then(function(result) {
      return new Album({id:this.params.id}).destroy().then(function() {
        return result.toJSON();
      });
    }.bind(this));
  }

  addAlbum() {
    var album = this.body;

    if (album.id) {
      return new AlbumImage({
        album_id: album.id,
        image_id: this.params.id
      }).save().then(() => album);
    } else {
      return new Album({
        name:album.name,
        user_id: this.session.user
      }).save().then((album) => {
        return new AlbumImage({
          album_id: album.get('id'),
          image_id: this.params.id
        }).save().then(() => album.toJSON());
      });
    }
  }

  deleteAlbum() {
    return AlbumImage.where({image_id:this.params.id, album_id:this.params.album_id}).destroy();
  }
}

module.exports = AlbumsController;