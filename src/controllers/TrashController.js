"use strict"

const BaseController = require('./BaseController');

const Image = require('../model/Image');

const fs = require('fs');
const config = require('../config');


class TrashController extends BaseController {
  clear() {
    return Image.where('deleted', true).fetchAll().then((results) => {
      var promises = [];

      results.forEach((result) => {
        promises.push(this.deleteImage(result.get('id')));
      });

      return Promise.all(promises);
    });
  }

  deleteImage(id) {
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

module.exports = TrashController;