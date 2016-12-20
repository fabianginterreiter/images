"use strict"

let bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: true
});