import {IConfigurationObject, IDatabaseConfiguration} from './types/configuration';
import Configuration from './lib/Configuration';

interface IConfigurationsObject {
  development: IConfigurationObject
  production: IConfigurationObject
  test: IConfigurationObject
}

const settings = {
    path: '../data',
    redis: true
};

const development = 'development';

const configurations: IConfigurationsObject = {
  development: {
    database: null,
    path: 'data',
    redis: false
  },
  production: {
    database: null,
    path: settings.path,
    redis: settings.redis
  },
  test: {
    database: {
      client: 'sqlite3',
      useNullAsDefault: false,
      connection: {
        filename: ':memory:'
      }
    },
    path: null,
    redis: false
  }
};

const env = process.env.NODE_ENV || development;

let config: Configuration = null;

if (configurations[env]) {
  config = new Configuration(configurations[env]);
} else {
  config = new Configuration(configurations[development]);
}

export default config;
