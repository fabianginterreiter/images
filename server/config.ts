import * as settings from '../config';
import * as Configuration from './lib/Configuration';

const development = 'development';

const configurations = {
  development: {
    path: 'data'
  },
  production: settings,
  test: {
    database: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      }
    }
  }
};

const env = process.env.NODE_ENV || development;

let config = null;

if (configurations[env]) {
  config = new Configuration(configurations[env]);
} else {
  config = new Configuration(configurations[development]);
}

module.exports = config;
