"use strict"

var Tag = require('../model/Tag');

var BaseController = require('./BaseController');

class TagsController extends BaseController {
  create() {
    return new Tag({
      name: this.body.name
    }).save().then((result) => (result.toJSON()));
  }

  get() {
    return new Tag({id:this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  index() {
    return Tag.query((qb) => {
      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }

      qb.orderBy('name','asc');
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

module.exports = TagsController;