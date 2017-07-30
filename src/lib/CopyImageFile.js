var fs = require('fs-extra');

var config = require('../config');

module.exports = function(file, image) {
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