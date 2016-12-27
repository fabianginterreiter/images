var assert = require('assert');

describe('ImageInfo', function() {
  describe('Getting Image Information', function() {
    it('Should return the valid information', function(done) {
      require('../server/lib/ImageInfo')('test/IMG_4351.jpg').then(function(result) {
        assert.equal(600, result.width);
        assert.equal(400, result.height);

        assert.equal("2016", result.date.getFullYear());

        assert.equal(true, result.horizontal);

        done();
      });
    });
  });
});