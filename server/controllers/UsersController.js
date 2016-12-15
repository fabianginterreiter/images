"use strict"

var User = require('../model/User');

var BaseController = require('./BaseController');

class UserController extends BaseController {
  create() {
    console.log(this.body);
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