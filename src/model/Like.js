"use strict"

require('./Image');
require('./User');

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'likes',
  hasTimestamps: true,

  image: function() {
    return this.belongsTo(Image);
  },

  user: function() {
    return this.belongsTo(User);
  }
});