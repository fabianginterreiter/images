"use strict"

const bookshelf = require('./bookshelf');
const User = require('./User');
const Tag = require('./Tag') 
const Person = require('./Person');
const ImageTag = require('./ImageTag') 

module.exports = bookshelf.model('Image', {
  tableName: 'images',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  },

  albums: function() {
    return this.belongsToMany('Album');
  },

  tags: function() {
    return this.belongsToMany(Tag);
  },

  persons: function() {
    return this.belongsToMany(Person).withPivot(['top', 'left', 'height', 'width']);
  }
});