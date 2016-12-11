var assert = require('assert');
var Configuration = require('../server/lib/Configuration');

describe('Test Configuration', function() {
  describe('Test Creating Configuration with only path', function() {
    it('Should return correct values', function() {
      var config = new Configuration({
        path: '/home/user/images'
      });

      assert.equal('/home/user/images', config.getPath());
      assert.equal('/home/user/images/images', config.getImagesPath());
      assert.equal('/home/user/images/cache', config.getCachePath());
      assert.equal('/home/user/images/cache/preview', config.getPreviewPath());
      assert.equal('/home/user/images/cache/thumbnails', config.getThumbnailPath());

      assert.equal('sqlite3', config.getDatabaseConfiguration().client);
      assert.equal('/home/user/images/data.sqlite3', config.getDatabaseConfiguration().connection.filename);
    });
  });

  describe('Test Changing Path', function() {
    it('Should return correct values', function() {
      var config = new Configuration({
        path: '/home/user/images'
      });

      assert.equal('/home/user/images', config.getPath());
      assert.equal('/home/user/images/images', config.getImagesPath());

      config.setPath('/other/path');

      assert.equal('/other/path', config.getPath());
      assert.equal('/other/path/images', config.getImagesPath());
    });
  });

  describe('Test Creating Configuration with specific Database', function() {
    it('Should return correct values', function() {
      var config = new Configuration({
        database: {
          client: 'sqlite3',
          connection: {
            filename: ':memory:'
          }
        }
      });

      assert.equal('sqlite3', config.getDatabaseConfiguration().client);
      assert.equal(':memory:', config.getDatabaseConfiguration().connection.filename);
    });
  });
});