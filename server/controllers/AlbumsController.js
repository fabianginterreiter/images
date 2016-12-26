"use strict"

var Album = require('../model/Album');

var BaseController = require('./BaseController');
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
}

module.exports = AlbumsController;