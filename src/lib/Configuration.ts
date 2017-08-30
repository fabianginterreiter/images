import {ConfigurationObject, DatabaseConfiguration} from "../types/configuration";
import * as fs from "fs-extra";

interface Data {
  data: string;
  cache: string;
  redis: boolean;
}

class Configuration {
  private config: Data;
  private environment: string;
  private production: boolean;

  public constructor(config: Data) {
    this.config = config;
    this.environment = process.env.NODE_ENV || 'production';
    console.log(`Environment: ${this.environment}`);
    this.production = this.environment === 'production';
  }

  public getPath() {
    return this.config.data;
  }

  public getImagesPath() {
    return this.config.data + "/images";
  }

  public getCachePath() {
    return this.config.cache;
  }

  public getPreviewPath() {
    return this.config.cache + "/preview";
  }

  public getThumbnailPath() {
    return this.config.cache + "/thumbnails";
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

    if (this.config.redis && this.production) {
      console.log("Use Redis");
      const RedisStore = require("connect-redis")(session);
      result.store = new RedisStore();
    }

    return result;
  }

  public getDatabaseConfiguration(): DatabaseConfiguration {
    return {
      client: "sqlite3",
      connection: {
        filename: this.config.data + "/data.sqlite3"
      },
      useNullAsDefault: true,
      debug: false
    };
  }
}

export default new Configuration(JSON.parse(fs.readFileSync(__dirname + "/../config.json", "utf8")));
