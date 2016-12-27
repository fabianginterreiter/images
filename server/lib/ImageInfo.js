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

        console.log(exifData);

        // http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
        result.horizontal = !exifData.image.Orientation || exifData.image.Orientation < 5;

        resolve(result);
      });
    });

  });
}