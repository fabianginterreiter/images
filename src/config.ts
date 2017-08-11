import Configuration from "./lib/Configuration";
import {ConfigurationObject, DatabaseConfiguration} from "./types/configuration";

interface ConfigurationsObject {
  development: ConfigurationObject;
  production: ConfigurationObject;
  test: ConfigurationObject;
}

const settings = {
    path: "../data",
    redis: true
};

const development = "development";

const configurations: ConfigurationsObject = {
  development: {
    database: null,
    path: "data",
    redis: false
  },
  production: {
    database: null,
    path: settings.path,
    redis: settings.redis
  },
  test: {
    database: {
      client: "sqlite3",
      connection: {
        filename: ":memory:"
      },
      useNullAsDefault: false
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