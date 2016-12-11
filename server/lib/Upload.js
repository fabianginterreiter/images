var Image = require('../model/Image');

var config = require('../config');

var ImageInfo = require('./ImageInfo');
var CopyImageFile = require('./CopyImageFile');
var ResizeImage = require('./ResizeImage');

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

      return CopyImageFile(file.path, result);
    }).then(function(result) {
      return ResizeImage(result, config.getThumbnailPath(), 400, 200);
    }).then(function(result) {
      return ResizeImage(result, config.getPreviewPath(), 2000, 2000);
    }).then(function(result) {
      return new Image(result).save();
    }).then((result) => (resolve(result.toJSON()))).catch(reject);
  });
};