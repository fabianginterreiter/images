var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/data.sqlite3'
  },
  useNullAsDefault: true
}); // require('../config').getDatabaseConfiguration()

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;
