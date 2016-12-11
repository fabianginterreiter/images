var fs = require('fs-extra');
var sharp = require('sharp');

var config = require('../config');

module.exports = function(image, target, width, height) {
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