"use strict"

const Image = require('../model/Image');

var config = require('../config');

var ImageInfo = require('../lib/ImageInfo');
var CopyImageFile = require('../lib/CopyImageFile');
var ResizeImage = require('../lib/ResizeImage');
var BaseController = require('./BaseController');
const ImageExtention = require('../lib/ImageExtention');
const ImagesExtention = require('../lib/ImagesExtention');

class ImagesController extends BaseController {
  create() {
    return ImageInfo(this.file.path).then(function(info) {
      var result = {
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
    }.bind(this)).then(function(result) {
      return ResizeImage(result, config.getThumbnailPath(), 1000, 200);
    }).then(function(result) {
      return ResizeImage(result, config.getPreviewPath(), 2000, 2000);
    }).then(function(result) {
      return new Image(result).save();
    }).then((result) => (result.toJSON()));
  }

  get() {
    return Image.query((qb) => {
      qb.select('images.*')

      qb.select('likes.user_id AS liked');
      var userId = this.session.user;
      qb.leftJoin('likes', function() {
        this.on('images.id', 'likes.image_id')
        this.on('likes.user_id', userId);
      });

      qb.where('images.id', this.params.id);
    }).fetch({withRelated: ['user', 'tags']}).then((image) => {
      return image.toJSON()
    }).then((image) => ImageExtention(image));
  }

  index() {
    return Image.query((qb) => {
      var query = this.query;

      qb.select('images.*');

      var userId = this.session.user;
      qb.select('likes.user_id AS liked');
      if (this.query.liked) {
        qb.join('likes', function() {
          this.on('images.id', 'likes.image_id')
          this.on('likes.user_id', userId);
        });
      } else {
        qb.leftJoin('likes', function() {
          this.on('images.id', 'likes.image_id')
          this.on('likes.user_id', userId);
        });
      }

      if (query.tag) {
        qb.join('images_tags', function() {
          this.on('images.id', 'images_tags.image_id'),
          this.on('images_tags.tag_id', query.tag);
        });
      }

      if (query.person) {
        qb.join('images_persons', function() {
          this.on('images.id', 'images_persons.image_id'),
          this.on('images_persons.person_id', query.person);
        });
      }

      if (query.album) {
        qb.join('albums_images', function() {
          this.on('images.id', 'albums_images.image_id'),
          this.on('albums_images.album_id', query.album);
        });
      }

      var where = {};

      if (this.query.year) {
        where.year = this.query.year;
      }

      if (this.query.month) {
        where.month = this.query.month;
      }

      if (this.query.day) {
        where.day = this.query.day;
      }

      qb.where(where);

      if (this.query.trash && this.query.trash === 'true') {
        qb.where('images.deleted', true);
      } else {
        qb.where('images.deleted', false);
      }

      qb.orderBy('date','DESC'); 
    }).fetchAll({withRelated: ['user', 'tags', 'albums', 'persons']})
    .then((images) => (images.toJSON())).then((images) => ImagesExtention(images))
  }

  destroy() {
    return new Image({
      id:this.params.id
    }).save({
      deleted:true
    }, {
      patch: true
    }).then((result) => (result.toJSON()));
  }

  revert() {
    return new Image({
      id:this.params.id
    }).save({
      deleted:false
    }, {
      patch: true
    }).then((result) => (result.toJSON()));
  }
}

module.exports = ImagesController;