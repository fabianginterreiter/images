var path = 'data';

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: path + '/data.sqlite3'
    }
  }
};
