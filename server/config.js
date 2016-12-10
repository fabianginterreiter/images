"use strict"

var path = 'data';

var configurations = {
  test: {
    database: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      }
    }
  },

  development: {
    path: 'data'
  },

  production: require('../config')
};

var Configuration = require('./lib/Configuration');

var env = process.env.NODE_ENV || 'development';

var config = null;

if (configurations[env]) {
  config = new Configuration(configurations[env]);
} else {
  config = new Configuration(configurations['development']);
}

module.exports = config;