"use strict"

var Image = require('../model/Image');
var fs = require('fs');
var config = require('../config');

var ImageInfo = require('../lib/ImageInfo');
var CopyImageFile = require('../lib/CopyImageFile');
var ResizeImage = require('../lib/ResizeImage');

class ImagesController {
  create(file) {
    return ImageInfo(file.path).then(function(info) {
      var result = {
        filename: file.originalname, 
        size: file.size
      };

      result.width = info.width;
      result.height = info.height;
      result.date = info.date;

      result.year = result.date.getFullYear();
      result.month = result.date.getMonth() + 1;
      result.day = result.date.getDate();

      return CopyImageFile(file.path, result);
    }).then(function(result) {
      return ResizeImage(result, config.getThumbnailPath(), 1000, 200);
    }).then(function(result) {
      return ResizeImage(result, config.getPreviewPath(), 2000, 2000);
    }).then(function(result) {
      return new Image(result).save();
    }).then((result) => (result.toJSON()));
  }

  get(id) {
    return new Image({id:id}).fetch().then((image) => (image.toJSON()));
  }

  index(params) {
    if (!params) {
      params = [];
    }

    return Image.query(function(qb) {
      var where = {};

      if (params.year) {
        where.year = params.year;
      }

      if (params.month) {
        where.month = params.month;
      }

      if (params.day) {
        where.day = params.day;
      }

      qb.where(where);

      qb.orderBy('date','DESC'); 
    }).fetchAll().then((images) => (images.toJSON()));
  }

  destroy(id) {
    return new Promise(function(resolve, reject) {
      new Image({'id': id}).fetch()
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

module.exports = new ImagesController();