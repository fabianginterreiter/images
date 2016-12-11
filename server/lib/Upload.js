var fs = require('fs-extra');

var sizeOf = require('image-size');

var sharp = require('sharp');

var ExifImage = require('exif').ExifImage;

var Image = require('../model/Image');

var config = require('../config');

var ImageInfo = require('./ImageInfo');

function copy(file, image) {
  var directory = image.year + '/' + image.month;

  image.path = directory + '/' + image.filename;

  return new Promise(function(resolve, reject) {
    fs.ensureDir(config.getImagesPath() + '/' + directory, function(err) {
      if (err) {
        return reject(err);
      }

      fs.copy(file, config.getImagesPath() + '/' + image.path, function(err) {
        if (err) {
          return reject(err);
        }

        fs.unlink(file, function(err) {
          if (err) {
            return reject(err);
          }

          resolve(image);
        });
      });
    });
  });
};

function thumb(image, target, width, height) {
  var directory = image.year + '/' + image.month;

  return new Promise(function(resolve, reject) {
    fs.ensureDir(target + '/' + directory, function(err) {
      if (err) {
        return reject(err);
      }

      sharp(config.getImagesPath() + '/' + image.path)
        .resize(width, height)
        .max().toFile(target + '/' + image.path, function(err) {
          if (err) {
            return reject(err);
          }

          resolve(image);
        });
    });
  });
}

module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    ImageInfo(file.path).then(function(info) {
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

      return copy(file.path, result);
    }).then(function(result) {
      return thumb(result, config.getThumbnailPath(), 400, 200);
    }).then(function(result) {
      return thumb(result, config.getPreviewPath(), 2000, 2000);
    }).then(function(result) {
      return new Image(result).save();
    }).then((result) => (resolve(result.toJSON()))).catch(reject);
  });
};