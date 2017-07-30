"use strict"

const bookshelf = require('./bookshelf');

const User = require('./User');

module.exports = bookshelf.model('Album', {
  tableName: 'albums',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo(User);
  },

  images: function() {
    return this.belongsToMany('Image');
  }
});