"use strict"

require('./Image');
require('./Album');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'albums_images',
  hasTimestamps: true
});