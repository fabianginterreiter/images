"use strict" 

class Configuration {
  constructor(config) {
    this.config = config;
  }

  setPath(path) {
    this.config.path = path;
  }

  getPath() {
    return this.config.path;
  }

  getImagesPath() {
    return this.config.path + '/images';
  }

  getCachePath() {
    return this.config.path + '/cache';
  }

  getPreviewPath() {
    return this.config.path + '/cache/preview';
  }

  getThumbnailPath() {
    return this.config.path + '/cache/thumbnails';
  }

  getSessionConfig(session) {
    var result = {
      secret: 'key',
      secure: false,
      resave: false,
      saveUninitialized: false,
      cookie: { 
        path: '/', 
        httpOnly: true, 
        secure: false, 
        maxAge: null 
      }
    };

    if (this.config.redis) {
      var RedisStore = require('connect-redis')(session);
      result.store = new RedisStore();
    }

    return result;
  }

  getDatabaseConfiguration() {
    if (this.config.database) {
      return this.config.database;
    } else {
      return {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
          filename: this.config.path + '/data.sqlite3'
        }
      }
    }
  }
}

module.exports = Configuration;