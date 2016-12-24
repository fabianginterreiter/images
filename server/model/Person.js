"use strict"
const Image = require('./Image');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'persons',
  hasTimestamps: true,

  images: function() {
    return this.belongsToMany(Image);
  },
});