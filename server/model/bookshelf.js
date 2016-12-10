var knex = require('knex')(require('../config').getDatabaseConfiguration());

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;