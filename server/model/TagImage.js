"use strict"

require('./Image');
require('./Tag');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'tag_images',
  hasTimestamps: true,

  image: function() {
    return this.belongsTo(Image);
  },

  tag: function() {
    return this.belongsTo(Tag);
  }
});