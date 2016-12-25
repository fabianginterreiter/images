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
      qb.select('tags.*');

      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }

      qb.count('images_tags.tag_id AS count')
      qb.leftJoin('images_tags', function() {
        this.on('tags.id', 'images_tags.tag_id');
      });
      qb.groupBy('tags.id');

      qb.orderBy('name','asc');
    }).fetchAll().then((result) => (result.toJSON()));
  }

  update() {
    return new Tag({id:this.params.id}).save({name:this.body.name}, {patch: true}).then((result) => (result.toJSON()));
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