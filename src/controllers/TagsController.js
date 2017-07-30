"use strict"

const BaseController = require('./BaseController');

const Tag = require('../model/Tag');
const ImageTag = require('../model/ImageTag');

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

  addTag() {
    var tag = this.body;

    if (tag.id) {
      return new ImageTag({
        tag_id: tag.id,
        image_id: this.params.id
      }).save().then(() => tag);
    } else {
      return new Tag({
        name:tag.name
      }).save().then((tag) => {
        return new ImageTag({
          tag_id: tag.get('id'),
          image_id: this.params.id
        }).save().then(() => tag.toJSON());
      });
    }
  }

  deleteTag() {
    return ImageTag.where({
      image_id:this.params.id, 
      tag_id:this.params.tag_id
    }).destroy().then(() => {
      return Tag.query((qb) => {
        qb.whereNotExists(function() {
          this.select('images_tags.id').from('images_tags').whereRaw('tags.id = images_tags.tag_id');
        });
      }).destroy();
    });
  }
}

module.exports = TagsController;