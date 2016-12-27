"use strict"

const BaseController = require('./BaseController');

const User = require('../model/User');

class UserController extends BaseController {
  create() {
    return new User({
      name: this.body.name
    }).save().then((result) => (result.toJSON()));
  }

  get() {
    return new User({id:this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  index() {
    return User.fetchAll().then((result) => (result.toJSON()));
  }

  destroy() {
    return new User({id:this.params.id}).fetch().then(function(result) {
      return new User({id:this.params.id}).destroy().then(function() {
        return result.toJSON();
      });
    }.bind(this));
  }
}

module.exports = UserController;