"use strict"

const Image = require('../model/Image');
const Like = require('../model/Like');

var fs = require('fs');
var config = require('../config');

var ImageInfo = require('../lib/ImageInfo');
var CopyImageFile = require('../lib/CopyImageFile');
var ResizeImage = require('../lib/ResizeImage');
var BaseController = require('./BaseController');

class ImagesController extends BaseController {
  create() {
    return ImageInfo(this.file.path).then(function(info) {
      var result = {
        filename: this.file.originalname, 
        size: this.file.size
      };

      result.width = info.width;
      result.height = info.height;
      result.date = info.date;

      result.year = result.date.getFullYear();
      result.month = result.date.getMonth() + 1;
      result.day = result.date.getDate();

      result.user_id = this.session.user;

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
    var userId = this.session.user;
    console.log(userId);
    var imageId = this.params.id;

    return Image.query(function(qb) {
      qb.debug(true);

      qb.select('images.*', 'likes.user_id AS liked');

      qb.where('images.id', imageId);

      qb.leftJoin('likes', function() {
        this.on('images.id', 'likes.image_id')
        this.on('likes.user_id', userId);
      });
    }).fetch({withRelated: ['user']}).then((image) => {
      console.log(image.toJSON());
      return image.toJSON()
    }).then((image) => this.__transform(image));
  }

  __transform(image) {
    image.liked = image.liked > 0;
    return image;
  }

  like() {
    return new Like({image_id:this.params.id, user_id:this.session.user}).save().then((result) => (result.toJSON()));
  }

  unlike() {
    return Like.where({image_id:this.params.id, user_id:this.session.user}).destroy();
  }

  index() {
    var userId = this.session.user;

    return Image.query(function(qb) {
      if (this.query.liked) {
        qb.join('likes', function() {
          this.on('images.id', 'likes.image_id')
          this.on('likes.user_id', userId);
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

      qb.orderBy('date','DESC'); 
    }.bind(this)).fetchAll({withRelated: ['user']}).then((images) => (images.toJSON()));
  }

  destroy() {
    var id = this.params.id;
    return new Promise(function(resolve, reject) {
      new Image({'id': id}).fetch({withRelated: ['user']})
      .then(function(image) {
        return new Image({'id': id}).destroy().then(function() {
          fs.unlink(config.getImagesPath() + '/' + image.get('path'), function(err) {
            if (err) {
              return reject(err);
            }

            fs.unlink(config.getThumbnailPath() + '/' + image.get('path'), function(err) {
              if (err) {
                return reject(err);
              }

              fs.unlink(config.getPreviewPath() + '/' + image.get('path'), function(err) {
                if (err) {
                  return reject(err);
                }

                resolve(image.toJSON());
              });
            });
          });
        });
      });
    });
  }
}

module.exports = ImagesController;