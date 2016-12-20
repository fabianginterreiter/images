var assert = require('assert');

var TagsController = require('../server/controllers/TagsController');
var ImagesController = require('../server/controllers/ImagesController');
var Image = require('../server/model/Image');

var id1 = 0;
var id2 = 0;

describe('Test tag Management', function() {
  describe('Test Creating tag', function() {
    it('Should Create new tag', function(done) {
      new TagsController({
        body:{name:'Apple'}
      }).create().then(function(tag) {
        assert.equal('Apple', tag.name);
        assert.equal(true, tag.id > 0);
        id1 = tag.id;
        done();
      });
    });
  });

  describe('Test Getting tag', function() {
    it('Should get the correct tag', function(done) {
      new TagsController({
        params: {
          id:id1
        }
      }).get().then(function(tag) {
        assert.equal('Apple', tag.name);
        assert.equal(id1, tag.id);
        done();
      });
    });
  });

  describe('Test Creating tag', function() {
    it('Should Create new tag', function(done) {
      new TagsController({
        body:{name:'Lake'}
      }).create().then(function(tag) {
        assert.equal('Lake', tag.name);
        assert.equal(true, tag.id > 0);
        id2 = tag.id;
        done();
      });
    });
  });

  describe('Getting all tags', function() {
    it('Should return a list with two entries', function(done) {
      new TagsController({}).index().then(function(tags) {
        assert.equal(2, tags.length);
        assert.equal('Apple', tags[0].name);
        assert.equal('Lake', tags[1].name);
        assert.equal(id1, tags[0].id);
        done();
      });
    });
  });

  describe('Getting one tag', function() {
    it('Should return a list with one entry', function(done) {
      new TagsController({
        query: {
          q:'La%'
        }
      }).index().then(function(tags) {
        assert.equal(1, tags.length);
        assert.equal('Lake', tags[0].name);
        done();
      });
    });
  });

  describe('Getting one tag', function() {
    it('Should return a list with one entry', function(done) {
      new TagsController({
        query: {
          q:'Ap%'
        }
      }).index().then(function(tags) {
        assert.equal(1, tags.length);
        assert.equal('Apple', tags[0].name);
        done();
      });
    });
  });

  describe('Getting no tags', function() {
    it('Should return a list with no entries', function(done) {
      new TagsController({
        query: {
          q:'OTHER'
        }
      }).index().then(function(tags) {
        assert.equal(0, tags.length);
        done();
      });
    });
  });

  describe('Adding one image', function() {
    it('Should add one image', function(done) {
      new Image({filename:'test.jpg'}).save().then((image) => {
        new TagsController({
          params: {
            id:id1,
            image_id:image.get('id')
          }
        }).addImage().then(() => done());
      })
    });
  });

  describe('Load Images which the user likes', function() {
    it('should return no images', function(done) {
      new ImagesController({
        query:{tag:id1}
      }).index().then(function(images) {
        assert.equal(1, images.length);
        assert.equal('test.jpg', images[0].filename);
        done();
      });
    });
  });

  describe('Delete a tag', function() {
    it('Should return the tag object', function(done) {
      new TagsController({
        params: { id:id1}
      }).destroy().then(function(tag) {
        assert.equal('Apple', tag.name);
        assert.equal(id1, tag.id);
        done();
      });
    });
  });

  describe('Getting all tags', function() {
    it('Should return a list with one entries', function(done) {
      new TagsController({}).index().then(function(tags) {
        assert.equal(1, tags.length);
        assert.equal('Lake', tags[0].name);
        assert.equal(id2, tags[0].id);
        done();
      });
    });
  });
});