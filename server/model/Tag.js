"use strict"
const Image = require('./Image');
const ImageTag = require('./ImageTag');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,

  images: function() {
    return this.belongsToMany(Image);
  },
});