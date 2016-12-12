var fs = require('fs-extra');

var assert = require('assert');

var sinon = require('sinon');

var tmp = require('tmp');

var bookshelf = require('../server/model/bookshelf');
var Image = require('../server/model/Image');

var path = null;

var id = null;

var config = require('../server/config');

var ImagesController = require('../server/controllers/ImagesController');

describe('API', function() {
  before(function(done) {
    fs.copySync('test/IMG_4351.jpg', 'test/3064de21f8ff5226705f390d6ff4f324.jpg');

    require('../server/model/bookshelf').knex.migrate.latest().then(function() {
      tmp.dir(function _tempDirCreated(err, p, cleanupCallback) {
        if (err) throw err;
        path = p;
        config.setPath(path);
        done();
      });
    });
  });

  describe('Getting Image Information', function() {
    it('Should return the valid information', function(done) {
      require('../server/lib/ImageInfo')('test/IMG_4351.jpg').then(function(result) {
        assert.equal(600, result.width);
        assert.equal(400, result.height);

        assert.equal("2016", result.date.getFullYear());

        done();
      });
    });
  });

  describe('Upload an image', function() {
    it('should return a json with the complete information', function(done) {

      var file = {
        "fieldname":"images",
        "originalname":"IMG_4351.jpg",
        "encoding":"7bit",
        "mimetype":"image/jpeg",
        "destination":"test/",
        "filename":"3064de21f8ff5226705f390d6ff4f324.jpg",
        "path":"test/3064de21f8ff5226705f390d6ff4f324.jpg",
        "size":263388};

      ImagesController.create(file).then(function(result) {
        
        assert.equal('IMG_4351.jpg', result.filename);
        assert.equal(263388, result.size);
        assert.equal(600, result.width);
        assert.equal(400, result.height);

        assert.equal('2016/9/IMG_4351.jpg', result.path);

        var stats = fs.statSync(config.getImagesPath() + '/' + result.path);

        assert.equal(263388, stats.size);
        stats = fs.statSync(config.getThumbnailPath() + '/' + result.path);
        assert.equal(15499, stats.size);

        assert.equal(true, fs.existsSync(config.getPreviewPath() + '/' + result.path));

        assert.equal(false, fs.existsSync('test/3064de21f8ff5226705f390d6ff4f324.jpg'));

        id = result.id;

        done();        
      }).catch(function(e) {
        throw new Error(e);
      });
    });
  });

  describe('Load Images', function() {
    it('should return the json', function(done) {
      ImagesController.index().then(function(images) {
        assert.equal(1, images.length);

        var image = images[0];

        assert.equal('IMG_4351.jpg', image.filename);
        assert.equal(263388, image.size);
        assert.equal(600, image.width);
        assert.equal(400, image.height);

        done();
      }).catch(function(e) {
        throw new Error(e);
      });
    });
  });

  describe('Get Dates', function() {
    it('should return all the years and months', function(done) {
      bookshelf.knex('images').distinct('year', 'month').select().orderBy('year', 'month').then(function(result) {
        assert.equal(1, result.length);
        assert.equal(2016, result[0].year);
        assert.equal(9, result[0].month);
        done();
      });
    });
  });

  describe('Delete Image', function() {
    it ('should delete the image', function(done) {
      ImagesController.destroy(id).then(function(result) {
        assert.equal(id, result.id);

        assert.equal(false, fs.existsSync(path + '/images/' + result.path));
        assert.equal(false, fs.existsSync(path + '/cache/' + result.path));
        assert.equal(false, fs.existsSync(path + '/thumbs/' + result.path));

        done();
      }).catch(function(e) {
        throw new Error(e);
      });
    });
  });

  describe('Check after deleting', function() {
    it ('should return nothing', function(done) {
      ImagesController.index().then(function(images) {
        assert.equal(0, images.length);
        done();
      });
    });
  });
});
