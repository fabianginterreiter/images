var sizeOf = require('image-size');
var ExifImage = require('exif').ExifImage;

module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    var result = {};

    sizeOf(file, function (err, dimensions) {
      if (err) {
        return reject(err);
      }

      result.width = dimensions.width;
      result.height = dimensions.height;

      new ExifImage({ image : file }, function (err, exifData) {
        if (err) {
          return reject(err);
        }

        result.date = new Date(exifData.exif.CreateDate.replace(':', '.').replace(':', '.'));

        resolve(result);
      });
    });

  });
}