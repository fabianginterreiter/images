var Image = require('../model/Image');

var fs = require('fs');

module.exports = function(id, path) {
  return new Promise(function(resolve, reject) {
    new Image({'id': id}).fetch()
    .then(function(image) {
      return new Image({'id': id}).destroy().then(function() {
        fs.unlink(path + '/images/' + image.get('path'), function(err) {
          if (err) {
            return reject(err);
          }

          fs.unlink(path + '/thumbs/' + image.get('path'), function(err) {
            if (err) {
              return reject(err);
            }

            fs.unlink(path + '/cache/' + image.get('path'), function(err) {
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