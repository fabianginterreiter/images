var fs = require('fs-extra');

var sizeOf = require('image-size');

var sharp = require('sharp');

var ExifImage = require('exif').ExifImage;

var Image = require('../model/Image');

var config = require('../config');

module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    var result = {
      filename: file.originalname, 
      size: file.size
    };

    sizeOf(file.path, function (err, dimensions) {
      if (err) {
        console.log(err);
        return reject(err);
      }

      result.width = dimensions.width;
      result.height = dimensions.height;

      new ExifImage({ image : file.path }, function (err, exifData) {
        if (err) {
          console.log(err);
          return reject(err);
        }

        result.date = new Date(exifData.exif.CreateDate.replace(':', '.').replace(':', '.'));

        result.year = result.date.getFullYear();
        result.month = result.date.getMonth() + 1;
        result.day = result.date.getDate();

        new Image(result).save().then(function(data) {


          fs.ensureDir(config.getImagesPath() + '/' + result.year + '/' + result.month, function(err) {
            if (err) {
              return reject(err);
            }

            var subpath = result.year + '/' + result.month + '/' + data.get('id') + '.jpg';

            fs.copy(file.path, config.getImagesPath() + '/' + subpath, function(err) {
              if (err) {
                return reject(err);
              }

              data.set('path', subpath);

              data.save().then(function(data) {
                
                fs.ensureDir(config.getThumbnailPath() + '/' + result.year + '/' + result.month, function(err) {
                  if (err) {
                    return reject(err);
                  }

                  sharp(config.getImagesPath() + '/' + subpath)
                  .resize(400, 200)
                  .max().toFile(config.getThumbnailPath() + '/' + subpath, function(err) {
                    if (err) {
                      return reject(err);
                    }

                    fs.ensureDir(config.getPreviewPath() + '/' + result.year + '/' + result.month, function(err) {
                      if (err) {
                        return reject(err);
                      }

                       sharp(config.getImagesPath() + '/' + subpath)
                      .resize(2000, 2000)
                      .max().toFile(config.getPreviewPath() + '/' + subpath, function(err) {
                        if (err) {
                          return reject(err);
                        }

                        fs.unlink(file.path, function(err) {
                          if (err) {
                            return reject(err);
                          }

                          resolve(data.toJSON());
                        });
                      });
                    });
                  });
                });
              }).catch(function(err) {
                reject(err);
              });
            });
          });
        });
      });
    });
  });
};