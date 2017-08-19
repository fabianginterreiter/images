import Configuration from "./lib/Configuration";
import {ConfigurationObject, DatabaseConfiguration} from "./types/configuration";

interface ConfigurationsObject {
  development: ConfigurationObject;
  production: ConfigurationObject;
  test: ConfigurationObject;
}

const defaultEnv = "production";

const configurations: ConfigurationsObject = {
  development: {
    database: null,
    path: "data",
    redis: false
  },
  production: {
    database: null,
    path: "data",
    redis: true
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

const env = process.env.NODE_ENV || defaultEnv;

console.log(`Environment: ${env}`);

let config: Configuration = null;

if (configurations[env]) {
  config = new Configuration(configurations[env]);
} else {
  config = new Configuration(configurations[defaultEnv]);
}

export default config;
