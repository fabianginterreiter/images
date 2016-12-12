var assert = require('assert');

var controller = require('../server/controllers/UsersController.js');

var id1 = 0;
var id2 = 0;

describe('Test User Management', function() {
  describe('Test Creating User', function() {
    it('Should Create new User', function(done) {
      controller.create({name:'Fabian'}).then(function(user) {
        assert.equal('Fabian', user.name);
        assert.equal(true, user.id > 0);
        id1 = user.id;
        done();
      });
    });
  });

  describe('Test Getting User', function() {
    it('Should get the correct user', function(done) {
      controller.get(id1).then(function(user) {
        assert.equal('Fabian', user.name);
        assert.equal(id1, user.id);
        done();
      });
    });
  });

  describe('Test Creating User', function() {
    it('Should Create new User', function(done) {
      controller.create({name:'Marius'}).then(function(user) {
        assert.equal('Marius', user.name);
        assert.equal(true, user.id > 0);
        id2 = user.id;
        done();
      });
    });
  });

  describe('Getting all Users', function() {
    it('Should return a list with two entries', function(done) {
      controller.index().then(function(users) {
        assert.equal(2, users.length);
        assert.equal('Fabian', users[0].name);
        assert.equal(id1, users[0].id);
        done();
      });
    });
  });

  describe('Delete a user', function() {
    it('Should return the user object', function(done) {
      controller.destroy(id1).then(function(user) {
        assert.equal('Fabian', user.name);
        assert.equal(id1, user.id);
        done();
      });
    });
  });

  describe('Getting all Users', function() {
    it('Should return a list with one entries', function(done) {
      controller.index().then(function(users) {
        assert.equal(1, users.length);
        assert.equal('Marius', users[0].name);
        assert.equal(id2, users[0].id);
        done();
      });
    });
  });
});