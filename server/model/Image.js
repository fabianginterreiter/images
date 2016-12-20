"use strict"

let bookshelf = require('./bookshelf');
let User = require('./User');
let Like = require('./Like') 

module.exports = bookshelf.Model.extend({
  tableName: 'images',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});