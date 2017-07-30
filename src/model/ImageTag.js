"use strict"

require('./Image');
require('./Tag');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'images_tags',
  hasTimestamps: true
});