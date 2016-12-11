var Image = require('../model/Image');

var fs = require('fs');

var config = require('../config');

module.exports = function(id) {
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
    }).catch(function(err) {
      console.log(err);
      reject(err);
    });
  });
}