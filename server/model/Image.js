"use strict"

let bookshelf = require('./bookshelf');
let User = require('./User');
let Tag = require('./Tag') 
let Album = require('./Album') 
const Person = require('./Person');
let ImageTag = require('./ImageTag') 

module.exports = bookshelf.Model.extend({
  tableName: 'images',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  },

  tags: function() {
    return this.belongsToMany(Tag);
  },

  albums: function() {
    return this.belongsToMany(Album, 'albums_images', 'image_id', 'album_id');
  },

  persons: function() {
    return this.belongsToMany(Person).withPivot(['top', 'left', 'height', 'width']);
  }
});