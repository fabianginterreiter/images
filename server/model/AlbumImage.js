"use strict"

const Image = require('./Image');
const Album = require('./Album');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'albums_images',
  hasTimestamps: true
});