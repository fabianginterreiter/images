import {ConfigurationObject, DatabaseConfiguration} from "../types/configuration";

export default class Configuration {
  private config: ConfigurationObject;

  public constructor(config: ConfigurationObject) {
    this.config = config;
  }

  public setPath(path) {
    this.config.path = path;
  }

  public getPath() {
    return this.config.path;
  }

  public getImagesPath() {
    return this.config.path + "/images";
  }

  public getCachePath() {
    return this.config.path + "/cache";
  }

  public getPreviewPath() {
    return this.config.path + "/cache/preview";
  }

  public getThumbnailPath() {
    return this.config.path + "/cache/thumbnails";
  }

  public getSessionConfig(session) {
    const result = {
      cookie: {
        maxAge: null,
        secure: false
      },
      resave: false,
      saveUninitialized: false,
      secret: "key",
      secure: false,
      store: null
    };

    if (this.config.redis && process.env.NODE_ENV === "production") {
      const RedisStore = require("connect-redis")(session);
      result.store = new RedisStore();
    }

    return result;
  }

  public getDatabaseConfiguration(): DatabaseConfiguration {
    if (this.config.database) {
      return this.config.database;
    } else {
      return {
        client: "sqlite3",
        connection: {
          filename: this.config.path + "/data.sqlite3"
        },
        useNullAsDefault: true,
        debug: false
      };
    }
  }
}
