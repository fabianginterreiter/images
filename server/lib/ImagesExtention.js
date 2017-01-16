const ImageExtention = require('./ImageExtention')

module.exports = function(images) {
  images.forEach((image) => ImageExtention(image));
  return images;
}