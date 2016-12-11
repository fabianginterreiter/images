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