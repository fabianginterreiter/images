"use strict"

var Tag = require('../model/Tag');
var TagImage = require('../model/TagImage');

var BaseController = require('./BaseController');

class UserController extends BaseController {
  create() {
    return new Tag({
      name: this.body.name
    }).save().then((result) => (result.toJSON()));
  }

  get() {
    return new Tag({id:this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  addImage() {
    return new TagImage({
      tag_id: this.params.id,
      image_id: this.params.image_id
    }).save();
  }

  removeImage() {
    return TagImage.where({
      tag_id: this.params.id,
      image_id: this.params.image_id
    }).destroy();
  }

  index() {
    return Tag.query((qb) => {
      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }
    }).fetchAll().then((result) => (result.toJSON()));
  }

  destroy() {
    return new Tag({id:this.params.id}).fetch().then(function(result) {
      return new Tag({id:this.params.id}).destroy().then(function() {
        return result.toJSON();
      });
    }.bind(this));
  }
}

module.exports = UserController;