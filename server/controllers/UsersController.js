"use strict"

var User = require('../model/User');

class UserController {
  create(name) {
    return new User({
      name: name
    }).save().then((result) => (result.toJSON()));
  }

  get(id) {
    return new User({id:id}).fetch().then((result) => (result.toJSON()));
  }

  index() {
    return User.fetchAll().then((result) => (result.toJSON()));
  }

  destroy(id) {
    return new User({id:id}).fetch().then(function(result) {
      return new User({id:id}).destroy().then(function() {
        return result.toJSON();
      });
    });
  }
}

module.exports = new UserController();